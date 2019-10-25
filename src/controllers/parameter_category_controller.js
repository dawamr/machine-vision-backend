const parameter_category = require('../models').parameter_categories;
const resp = require('../views/response');
const pagination = require('../utils/pagination');
const sequelize = require('sequelize');
const Op = sequelize.Op;
// console.log(Object.keys(require('../models')));

module.exports = {
    create(req,res){
        // console.log(req.body.name)
        return parameter_category
        .create({
            name: req.body.name
        })
        .then(create => res.status(200).send(create))
        .catch(error => res.status(400).send(error));
    },
    list(req,res){
      let orderBy = 'createdAt';
      let sortBy = 'desc';
      let page = 1;
      let perPage = 10;
  
      if ((req.query.order_by != undefined) && (req.query.order_by.length > 0)) {
          orderBy = req.query.order_by;
      }
      if ((req.query.sort_by != undefined) && (req.query.sort_by.length > 0)) {
          sortBy = req.query.sort_by;
      }
      if(req.query.page != undefined && req.query.page .length >0){
          page = req.query.page
      }
      if(req.query.per_page != undefined && req.query.per_page .length >0){
          perPage = req.query.per_page
      }
      let { offsetResult, perPageResult, showPageResult } = pagination.builder(perPage, page);
  
      return parameter_category
      .findAndCountAll({
      order: [
          [orderBy, sortBy]
      ],
      limit: perPageResult,
      offset :offsetResult
      })
      .then(result => {
        let totalPage = Math.ceil(result.count / perPage);
        let data = resp.paging(result.rows, parseInt(showPageResult), parseInt(perPageResult), totalPage, result.count);
        resp.ok2(data, res);
    })
    .catch((error) => {
        resp.ok(false, `Failed get list data parameter ${req.query.level}.`, null, res.status(400));
        console.log(error);
    });
  },
  update(req, res) {
      return parameter_category
        .findByPk(req.params.id, 
        )
        .then(parameter_category => {
          if (!parameter_category) {
            return res.status(404).send({
              message: 'parameter category Not Found',
            });
          }
          return parameter_category
            .update({
              name: req.body.name || parameter_category.name,
            })
            .then(() => res.status(200).send(parameter_category))
            .catch((error) => res.status(400).send(error));
        })
        .catch((error) => res.status(400).send(error));
    },
    destroy(req, res) {
      return parameter_category
        .findByPk(req.params.id)
        .then(parameter_categories => {
          if (!parameter_categories) {
            return res.status(400).send({
              message: 'Parameter Category Not Found',
            });
          }
          return parameter_categories
            .destroy()
            .then(() => res.status(204).send())
            .catch((error) => res.status(400).send(error));
        })
        .catch((error) => res.status(400).send(error));
    },
    retrieve(req,res){
      return parameter_category
        .findOne({
            where: {
                id : req.params.id
            },
        })
        .then(parameter_id  => res.status(201).send(parameter_id))
        .catch(error => res.status(400).send(error));

  }, 
};