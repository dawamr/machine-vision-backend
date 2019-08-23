const moment = require('moment');
const config = require('./../config/setting');
const JWTService = require('../service/JWTService');
const bcrypt = require('bcrypt-nodejs');
const AuthenticationService = require('../service/AuthenticationService');
const UserService = require('../service/UserService');
const fs = require('fs-extra');
const randomstring = require("randomstring");
const RefreshTokenService = require("../service/RefreshTokenService");

function UserController() {

  const login = (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;

    AuthenticationService.authenticate(username, password)
      .then((user) => {
        let user_id = user.get('user_id');
        console.log(user);
        let payload = {
          iss: req.hostname,
          sub: user_id,
          data: user
        };
        user = user.toJSON();
        req.data = user;
        req.token = JWTService.encode(payload);

        const refreshToken = {
          refresh_token: randomstring.generate(),
          token: req.token,
          user_id: user_id,
        }

        return RefreshTokenService.insert(refreshToken);
      })
      .then(refreshToken => {

          req.refresh_token = refreshToken.refresh_token;
          return next();
        
      })
      .catch(err => {
        // throw err;
        next(err);
      });
  };


  const create = async (req, res, next) => {
    let userObj = req.body;

    try {

      const user = await UserService.create(userObj)
      if (user) {
        let id = user.id
        let payload = {
          iss: req.hostname,
          sub: id,
          data: user
        };

        let token = JWTService.encode(payload);

        let refreshToken = {
          refresh_token: randomstring.generate(),
          token: token,
          user_id: id,
        }

        refreshToken = await RefreshTokenService.insert(refreshToken);

        req.data = user;
        req.token = token;
        req.refresh_token = refreshToken.refresh_token;
        next();
      }
    } catch (error) {
      // throw error;
      next(error);
    }
  };

  return {
    login,
    create
  };
}

module.exports = UserController();
