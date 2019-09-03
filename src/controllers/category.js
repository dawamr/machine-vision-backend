const Category = require('../models').category;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
    create(req, res, next) {
        let categoryObj = req.body;
        return Category
            .create(categoryObj)
            .then(result => {
                req.data = result;
                next();
            }, (err) => {
                next(err)
            });
    },

    listAll(req, res, next) {
        return Category
        .findAll()
        .then(result => {
            req.data = result;
            next();
        }, (err) => {
            next(err);
        })
    },

    list(req, res, next) {

        let orderBy = 'created_at';
        let sortBy = 'desc';
    
        let paramsObj = {
          query: req.query,
          name:req.body.name,
          pageSize: req.query.limit,
          page: req.query.page,
          sort: req.query.sort,
        };
    
        if ((paramsObj.sort != undefined) && (paramsObj.sort.length > 0)) {
          sortType = paramsObj.sort;
        }
        let queryParams = paramsObj.query;
    
        return Category
          .findAndCountAll({
            where: {
              name: {
                [Op.like]: (queryParams.name) ? '%' + queryParams.name + '%' : '%'
              }
            },
            order: [ [orderBy , sortBy]],
            offset: (paramsObj.page - 1) * paramsObj.pageSize,
            limit: paramsObj.pageSize
          })
          .then((result) => {
            if (result) {
              req.data = result.rows;
              next();
            }
          })
          .catch(err => {
            next(err)
          });
      },

      detail(req, res, next) {
        return Category
          .findOne({
            where: {
              id: req.params.id
            }
          }).then(result => {
            if (result) {
              req.data = result;
              next();
            } else {
              let err = Error('Category not found');
              next(err);
            }
          }).catch((err) => {
            next(err);
          });
      },
    
      update(req, res, next) {
        let categoryObj = req.body;
        return Category
          .findByPk(req.params.id)
          .then(Category => {
            if (!Category){
            let err = Error('Category not found');
            next(err);}
    
            return Category
            .update(categoryObj)
                .then(result => {
                  req.data = result;
                  next();
              })
              .catch(err => {
                  next(err);
              });
          })
          .catch(err => {
            next(err);
          })
        
      },
    
      delete(req, res, next) {
        return Category
          .destroy({
            where: {
              id: req.params.id
            }
          })
          .then((result) => {
            req.data = !!result;
            next();
          })
          .catch(err => {
            next(err);
          });
      },
}