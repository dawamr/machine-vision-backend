const Promise = require('bluebird');
const _ = require('lodash');
const AuthenticationService = require('./AuthenticationService');
const UserModel = require('../models').user;

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
        where: {
          id: id
        }
      }).then(user => {
        if (user) {
          resolve(user);
        } else {
          let err = Error('Data tidak ditemukan');
          reject(err);
        }
      }).catch(function (err) {
        reject(err);
      });
    });
  };

  const byIdWithMember = (id) => {
    return new Promise((resolve, reject) => {
      UserModel.findOne({
        where: {
          id: id
        }
      }).then(user => {
        resolve(user);
      }).catch(function (err) {
        reject(err);
      });
    });
  }

  const getAll = () => {
    return new Promise((resolve, reject) => {
      UserModel.findAll({
        where: {
          role_id: '2'
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

  const getOneWhere = (where) => {
    return new Promise((resolve, reject) => {
      UserModel.findOne({
        where: where
      })
        .then(user => {
          resolve(user);
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
    let memberData = _.clone(_.omitBy(memberObj, _.isNil));
    const filter = {
      where: {
        id: parseInt(id)
      },
    }
    if (data.password) {
      data.password = AuthenticationService.createHash(data.password);
    }

    return new Promise((resolve, reject) => {
      UserModel.findOne(filter)
        .then(user => {
          if (!user) reject(new Error("user tidak ditemukan"));
          if (user.member) {
            user.member.updateAttributes(memberData).then(result => {
              user.updateAttributes(data).then((userUpdated) => {
                resolve(userUpdated);
              });
            });
          } else {
            user.updateAttributes(data).then((userUpdated) => {
              resolve(userUpdated);
            });
          }
        });
    })
  };
  //TODO: support order/sort
  const list = (params) => {
    let paramsObj = _.clone(_.pickBy(params, _.identity));

    delete paramsObj.page;
    delete paramsObj.pageSize;
    const allowedSort = ['userId', 'name', 'created', 'updated'];

    const allowedSortType = ['asc', 'desc'];
    let sortKey = 'userId';
    let sortType = 'asc';
    if (paramsObj.sort) {
      const tmp = paramsObj.sort.split(':');
      sortKey = paramsObj.sort;
      sortType = 'asc';
      if (tmp.length > 1) {
        sortKey = tmp[0];
        sortType = tmp[1].toLowerCase();
        if (allowedSortType.indexOf(sortType) < 0) sortType = 'asc';
      } else {
        sortType = 'asc';
      }
      if (allowedSort.indexOf(sortKey) < 0) sortKey = 'userId';
    }
    delete paramsObj.sort;

    let queryParams = paramsObj.query;
    delete paramsObj.query;

    const created = paramsObj.created;
    delete paramsObj.created;

    return new Promise((resolve, reject) => {
      UserModel.findAndCountAll({
        where: {
          name: {
            $like: (queryParams.name) ? '%' + queryParams.name + '%' : '%'
          },
          username: {
            $like: (queryParams.username) ? '%' + queryParams.username + '%' : '%'
          },
          username: {
            $like: (queryParams.username) ? '%' + queryParams.username + '%' : '%'
          }
        },
        order: sortKey + " " + sortType,
        offset: (params.page - 1) * params.pageSize,
        limit: params.pageSize
      })
        .then(users => {
          resolve(users);
        })
        .catch(err => {
          // throw err;
          reject(err);
        });
    })
  };

  const getByUsernameOrusername = (params) => {
    return new Promise((resolve, reject) => {
      UserModel.findOne({
        where: {
          $or: {
            username: params.username,
            username: params.username
          }
        }
      })
        .then(users => {
          resolve(users);
        })
        .catch(err => {
          // throw err;
          reject(err);
        });
    })
  };

  const getByusername = (username) => {
    return new Promise((resolve, reject) => {
      UserModel.findOne({
        where: {
          username: username
        }
      })
        .then(user => {
          resolve(user);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

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

  return {
    byId,
    create,
    update,
    list,
    remove,
    byIdWithMember,
    getByUsernameOrusername,
    getByusername,
    getOneWhere,
    getAll
  }

}

module.exports = UserService();
