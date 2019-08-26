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

  const detail = (req, res, next) => {
    let id = req.params.user_id;

    return UserService.byId(id)
      .then(user => {
        if (user) {
          req.data = user;
          return next();
        }
      })
      .catch(err => {
        return next(err);
      });
  };
  const update = (req, res, next) => {
    let id = req.params.user_id;
    let userObj = req.body;
    return UserService.update(id, userObj)
      .then((user) => {
        req.data = user;
        return next();
      })
      .catch(err => {
        return next(err);
      });
  };
  const remove = (req, res, next) => {
    const id = req.params.id;
    return UserService.remove(id)
      .then((users) => {
        req.data = !!users;
        return next();
      })
      .catch(err => {
        throw err;
      });
  };

  const all = (req, res, next) => {
    return UserService.getAll()
    .then((user) => {
      req.data = user;
      next();
    })
    .catch(err => {
      next(err);
    });
  }; 

  const list = (req, res, next) => {

    let params = {
      query: req.query,
      username: req.body.username,
      name:req.body.name,
      pageSize: req.query.limit,
      page: req.query.page,
      sort: req.query.sort,
    };
    return UserService.list(params)
      .then((users) => {
        if (users) {
          req.pagination = {
            page: params.page,
            pageSize: params.pageSize,
            rowCount: users.count,
            pageCount: 0
          };
          req.data = users.rows;
          return next();
        }
      })
      .catch(err => {
        throw err;
      });
  };


  return {
    login,
    create,
    detail,
    update,
    remove,
    all,
    list
  };
}

module.exports = UserController();
