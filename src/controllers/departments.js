const department = require('../models').department;
const resp = require('../views/response');
const pagination = require('../utils/pagination');
const sequelize = require('sequelize')

module.exports = {
  create(req, res){
    return department
      .create({
        name: req.body.name,
        order: req.body.order,
      })
      .then(department => {
        resp.ok(true, "Success create department.", department.dataValues, res)
      })
      .catch((error) => {
        resp.ok(false, "Failed create department.", null, res.status(400))
        console.log(error)
      });
  },

  list(req, res) {
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
      options.name = sequelize.where(sequelize.fn('LOWER', sequelize.col('name')), 'LIKE', '%' + req.query.search + '%');
    }

    let { offsetResult, perPageResult, showPageResult } = pagination.builder(perPage, page);

    return department
      .findAndCountAll({
        where: options,
        order: [
          [orderBy, sortBy]
        ],
        limit:  perPageResult,
        offset: offsetResult,
      })
      .then(departmentResult => {
        let totalPage = Math.ceil(departmentResult.count / perPage)
        let data = resp.paging(departmentResult.rows, parseInt(showPageResult), parseInt(perPageResult), totalPage, departmentResult.count);

        resp.ok(true, "Get list data department.", data, res);
      })
      .catch((error) => {
        resp.ok(false, "Failed get list data department.", null, res.status(400))
        console.log(error)
      });
  },

  listAll(req, res) {
    let orderBy = 'created_at';
    let sortBy = 'desc';
    let options = {};

    if ((req.query.order_by != undefined) && (req.query.order_by.length > 0)) {
      orderBy = req.query.order_by;
    }
    if ((req.query.sort_by != undefined) && (req.query.sort_by.length > 0)) {
      sortBy = req.query.sort_by;
    }
    if ((req.query.search != undefined) && (req.query.search.length > 0)){
      options.name = sequelize.where(sequelize.fn('LOWER', sequelize.col('name')), 'LIKE', '%' + req.query.search + '%');
    }

    return department
      .findAll({
        where: options,
        order: [
          [orderBy, sortBy]
        ],
      })
      .then(departmentResult => {
        resp.ok(true, "Get all data department.", departmentResult, res)
      })
      .catch((error) => {
        resp.ok(false, "Failed get all data department.", null, res.status(400))
        console.log(error)
      });
  },

  detail(req, res) {
    return department
      .findByPk(req.params.id)
      .then(departmentResult => {
        if (!departmentResult) {
          resp.ok(false, "Department not found.", null, res.status(400))
        }
        resp.ok(true, "Get data department.", departmentResult, res)
      })
      .catch((error) => {
        resp.ok(false, "Failed get department.", null, res.status(400))
        console.log(error)
      });
  },

  update(req, res) {
    return department
      .findByPk(req.params.id)
      .then(department => {
        if (!department) {
          resp.ok(false, "Department not found.", null, res.status(400))
        }

        return department
          .update({
            name: req.body.name || departmentResult.name,
          })
          .then(department => {
            resp.ok(true, "Success update department.", department.dataValues, res)
          })
          .catch((error) => {
            resp.ok(false, "Failed update department.", null, res.status(400))
            console.log(error)
          });
      })
      .catch((error) => {
        resp.ok(false, "Failed update department.", null, res.status(400))
        console.log(error)
      });
  },

  delete(req, res) {
    return department
      .findByPk(req.params.id)
      .then(department => {
        if (!department) {
          resp.ok(false, "Department not found.", null, res.status(400))
        }

        return department
          .destroy()
          .then(department => {
            resp.ok(true, "Success delete department.", department.dataValues, res)
          })
          .catch((error) => {
            resp.ok(false, "Failed delete department.", null, res.status(400))
            console.log(error)
          });
      })
      .catch((error) => {
        resp.ok(false, "Failed delete department.", null, res.status(400))
        console.log(error)
      });
  }
};
