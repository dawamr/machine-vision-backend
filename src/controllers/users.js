const JWTService = require('../service/JWTService');
const AuthenticationService = require('../service/AuthenticationService');
const UserService = require('../service/UserService');
const randomstring = require("randomstring");
const RefreshTokenService = require("../service/RefreshTokenService");
const resp = require('../views/response');
const pagination = require('../utils/pagination');
const user = require('../models').user;
const team = require('../models').team;
const sequelize = require('sequelize');


function UserController() {

  const login = (req, res, next) => {
    let username = 'implementor';
    let password = '123456';

    AuthenticationService.authenticate(username, password)
      .then((user) => {
        let user_id = user.get('user_id');
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
        req.data.token = req.token;
        req.data.refresh_token = refreshToken.refresh_token;
        resp.ok(true, "Success login.", req.data, res);
      })
      .catch(err => {
        resp.ok(false, "Failed login.", null, res);
      });
  };


  const create = async (req, res) => {
    let userObj = req.body;
    try {
      const user = await UserService.create(userObj)
      if (user) {
        resp.ok(true, "Success create user.", user, res);
      } else {
        resp.ok(false, "Failed create user.", null, res);
      }
    } catch (error) {
      resp.ok(false, "Failed create user.", null, res.status(400));
      console.log(error);
    }
  };

  const detail = (req, res) => {
    let id = req.params.id;

    return UserService.byId(id)
      .then(user => {
        if (user) {
          resp.ok(true, "Success get user.", user, res);
        } else {
          resp.ok(false, "User not found.", null, res);
        }
      })
      .catch(err => {
        resp.ok(false, "Failed get user.", null, res.status(400));
      });
  };

  const update = (req, res) => {
    let id = req.params.id;
    let userObj = req.body;
    return UserService.update(id, userObj)
      .then((user) => {
        resp.ok(true, "Success update user.", user, res);
      })
      .catch(err => {
        resp.ok(false, "Failed update user.", null, res.status(400));
      });
  };

  const remove = (req, res) => {
    const id = req.params.id;
    return UserService.remove(id)
      .then((user) => {
        if (user) {
          resp.ok(true, "Success delete user.", user, res);
        } else {
          resp.ok(false, "User not found.", null, res);
        }
      })
      .catch(err => {
        resp.ok(false, "Failed delete user.", null, res.status(400));
        reject(err);
      });
  };

  const all = (req, res) => {
    return UserService.getAll()
    .then((user) => {
      resp.ok(true, "Success get list all user.", user, res);
    })
    .catch(err => {
      resp.ok(false, "Failed get list all  user.", null, res.status(400));
    });
  }; 

  const list = (req, res) => {
    let orderBy = 'created_at';
    let sortBy = 'desc';
    let page = 1;
    let perPage = 10;
    let options = {};

    if ((req.query.order_by != undefined) && (req.query.order_by.length > 0)) {
      orderBy = req.query.order_by;
    }
    if ((req.query.sort_by != undefined) && (req.query.sort_by.length > 0)) {
      sortBy = req.query.sort_by;
    }
    if ((req.query.page != undefined) && (req.query.page.length > 0)) {
      page = req.query.page;
    }
    if ((req.query.per_page != undefined) && (req.query.per_page.length > 0)) {
      perPage = req.query.per_page;
    }
    if ((req.query.search != undefined) && (req.query.search.length > 0)){
      options.name = sequelize.where(sequelize.fn('LOWER', sequelize.col('user.name')), 'LIKE', '%' + req.query.search + '%');
    }

    let { offsetResult, perPageResult, showPageResult } = pagination.builder(perPage, page);

    return user
      .findAndCountAll({
        include: [{
          model: team,
        }],
        where: options,
        order: [
          [orderBy, sortBy]
        ],
        limit:  perPageResult,
        offset: offsetResult,
      })
      .then(userResult => {
        let totalPage = Math.ceil(userResult.count / perPage);
        let data = resp.paging(userResult.rows, parseInt(showPageResult), parseInt(perPageResult), totalPage, userResult.count);

        resp.ok(true, "Get list data user.", data, res);
      })
      .catch((error) => {
        resp.ok(false, "Failed get list data user.", null, res.status(400));
        console.log(error);
      });
  };

  const revokeRefreshToken = (req, res, next) => {
    const refreshToken = req.params.refresh_token;
    RefreshTokenService.revoke(refreshToken)
      .then(revoked => {
        req.data = revoked;
        next();
      })
      .catch(err => {
        throw err;
      });
  }

  return {
    login,
    create,
    detail,
    update,
    remove,
    all,
    list,
    revokeRefreshToken
  };
}

module.exports = UserController();
