const Reason = require('../models').downtime_reason;
const reason = require('../models').downtime_reason;
const Category = require('../models').downtime_category;
const resp = require('../views/response');
const pagination = require('../utils/pagination');
const sequelize = require('sequelize');
const Op = sequelize.Op;

module.exports = {
    create(req, res, next) {
        let reasonObj = req.body;
        return Reason
            .create(reasonObj)
            .then(result => {
                return Reason.findByPk(result.dataValues.id, {
                        include: [{
                            model: Category,
                        }]
                    })
                    .then(newData => {
                        req.data = newData;
                        next();
                    })
            }, (err) => {
                next(err);
            })
    },

    listAll(req, res, next) {
      let orderBy = 'created_at';
      let sortBy = 'desc';
      let options = {};

      if ((req.query.order_by != undefined) && (req.query.order_by.length > 0)) {
        orderBy = req.query.order_by;
      }
      if ((req.query.sort_by != undefined) && (req.query.sort_by.length > 0)) {
        sortBy = req.query.sort_by;
      }
      if ((req.query.line_id != undefined) && (req.query.line_id.length > 0)){
        options.line_id = sequelize.where(sequelize.col('line_id'), '=', req.query.line_id);
      }
      if ((req.query.process_id != undefined) && (req.query.process_id.length > 0)) {
        options.process_id = sequelize.where(sequelize.col('process_id'), '=', req.query.process_id);
      }
      if ((req.query.category_id != undefined) && (req.query.category_id.length > 0)) {
        options.category_id = sequelize.where(sequelize.col('category_id'), '=', req.query.category_id);
      }
      if ((req.query.impact != undefined) && (req.query.impact.length > 0)){
        options.impact = sequelize.where(sequelize.fn('LOWER', sequelize.col('impact')), 'LIKE', '%' + req.query.impact.toLowerCase() + '%');
      }

      return Reason
        .findAll({
            where: options,
            include: [{
                model: Category,
            }],
            order: [
              [orderBy, sortBy]
            ],
        })
        .then(result => {
            resp.ok(true, "Get list data downtime reason.", result, res);

        }, (err) => {
            resp.ok(false, "Failed get list data downtime reason..", null, res.status(400));
            console.log(error);        
        })
    },

    list(req, res, next) {
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
        if ((req.query.line_id != undefined) && (req.query.line_id.length > 0)){
          options.line_id = sequelize.where(sequelize.col('line_id'), '=', req.query.line_id);
        }
        if ((req.query.process_id != undefined) && (req.query.process_id.length > 0)) {
          options.process_id = sequelize.where(sequelize.col('process_id'), '=', req.query.process_id);
        }
        if ((req.query.category_id != undefined) && (req.query.category_id.length > 0)) {
          options.category_id = sequelize.where(sequelize.col('category_id'), '=', req.query.category_id);
        }
        if ((req.query.impact != undefined) && (req.query.impact.length > 0)){
          options.impact = sequelize.where(sequelize.fn('LOWER', sequelize.col('impact')), 'LIKE', '%' + req.query.impact.toLowerCase() + '%');
        }

        let { offsetResult, perPageResult, showPageResult } = pagination.builder(perPage, page);

        return Reason
        .findAndCountAll({
            where: options,
            include: [{
                model: Category,
            }],
            order: [
                [orderBy, sortBy]
            ],
            limit:  perPageResult,
            offset: offsetResult,
        })
        .then(Reason => {
            let totalPage = Math.ceil(Reason.count / perPage);
            let data = resp.paging(Reason.rows, parseInt(showPageResult), parseInt(perPageResult), totalPage, Reason.count);

            resp.ok(true, "Get list data downtime reason.", data, res);
        })
        .catch((error) => {
            resp.ok(false, "Failed get list data downtime reason..", null, res.status(400));
            console.log(error);
        });
    
    },

    detail(req, res, next) {
        return Reason
            .findOne({
                where: {
                    id: req.params.id
                },
                include: [{
                    model: Category,
                }]
            }).then(result => {
                if (result) {
                    req.data = result;
                    next();
                } else {
                    category
                    let err = Error('Reason not found');
                    next(err);
                }
            }).catch((err) => {
                next(err);
            });
    },

    update(req, res, next) {
        let reasonObj = req.body;
        console.log(req.params.id)
        return Reason
            .findByPk(req.params.id)
            .then(Reason => {
                if (!Reason) {
                    let err = Error('Reason not found');
                    next(err);
                }

                return Reason
                    .update(reasonObj)
                    .then(Result => {
                        return reason.findByPk(Result.dataValues.id, {
                                include: [{
                                    model: Category,
                                }]
                            })
                            .then(newData => {
                                req.data = newData;
                                next();
                            })
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
        return Reason
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