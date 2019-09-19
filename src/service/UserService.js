const Promise = require('bluebird');
const _ = require('lodash');
const AuthenticationService = require('./AuthenticationService');
const UserModel = require('../models').user;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const team = require('../models').team;

/**
 * UserService Service
 *
 * @returns {{byId: byId, create: create,getAll: getAll, update: update, list: list}}
 * @constructor
 */
function UserService() {

  /**
   *
   * @param id
   */
  const byId = (id) => {

    return new Promise((resolve, reject) => {
      UserModel.findOne({
        include: [{
          model: team,
        }],
        where: {
          id: id
        }
      }).then(user => {
        if (user) {
          resolve(user);
        } else {
          let err = Error('User not found');
          reject(err);
        }
      }).catch(function (err) {
        reject(err);
      });
    });
  };


  const getAll = () => {
    return new Promise((resolve, reject) => {
      UserModel.findAll({
          where: {
            name: {
              [Op.like]: (req.query.name) ? '%' + req.query.name + '%' : '%'
            }
          }
        })
        .then(users => {
          resolve(users);
        })
        .catch(err => {
          reject(err);
        })
    });
  }

  const create = (obj) => {
    let data = _.clone(_.omitBy(obj, _.isNil));
    data.password = AuthenticationService.createHash(data.password);

    return new Promise((resolve, reject) => {
      UserModel.create(data)
        .then(newUser => {
          resolve(newUser);
        }, (err) => {
          throw err;
          // reject(err);
        });
    });
  };

  const update = (id, obj, memberObj) => {
    let data = _.clone(_.omitBy(obj, _.isNil));
    const filter = {
      where: {
        id: id
      },
    }
    if (data.password) {
      data.password = AuthenticationService.createHash(data.password);
    }

    return new Promise((resolve, reject) => {
      UserModel.findOne(filter)
        .then(user => {
          if (!user) reject(new Error("user not found"));
          user.update(data).then((userUpdated) => {
            resolve(userUpdated);
          });
        });
    })
  };

  const remove = (id) => {
    return new Promise((resolve, reject) => {
      UserModel.destroy({
          where: {
            id: id
          }
        })
        .then(users => {
          resolve(users);
        })
        .catch(err => {
          // throw err;
          reject(err);
        });
    });
  };

  const list = (params) => {
    let paramsObj = _.clone(_.pickBy(params, _.identity));

    delete paramsObj.page;
    delete paramsObj.pageSize;
    let sortKey = 'createdAt';
    let sortType = 'desc';
    if ((paramsObj.sort != undefined) && (paramsObj.sort.length > 0)) {
      sortType = paramsObj.sort;
    }


    let queryParams = paramsObj.query;
    delete paramsObj.query;

    return new Promise((resolve, reject) => {
      UserModel.findAndCountAll({
          where: {
            name: {
              [Op.like]: (queryParams.name) ? '%' + queryParams.name + '%' : '%'
            },
            username: {
              [Op.like]: (queryParams.username) ? '%' + queryParams.username + '%' : '%'
            }
          },
          order: [
            [sortKey, sortType]
          ],
          offset: (params.page - 1) * params.pageSize,
          limit: params.pageSize
        })
        .then(users => {
          resolve(users);
        })
        .catch(err => {
          reject(err);
        });
    })
  };


  return {
    byId,
    create,
    update,
    remove,
    getAll,
    list
  }

}

module.exports = UserService();