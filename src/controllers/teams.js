const team = require('../models').team;
const resp = require('../views/response');
const pagination = require('../utils/pagination');
const sequelize = require('sequelize')

module.exports = {
  create(req, res){
    return team
      .create({
        name: req.body.name,
        order: req.body.order,
      })
      .then(team => {
        resp.ok(true, "Success create team.", team.dataValues, res)
      })
      .catch((error) => {
        resp.ok(false, "Failed create team.", null, res)
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

    return team
      .findAndCountAll({
        where: options,
        order: [
          [orderBy, sortBy]
        ],
        limit:  perPageResult,
        offset: offsetResult,
      })
      .then(team => {
        let totalPage = Math.ceil(team.count / perPage)
        resp.paging(true, "Get list data team.", team.rows, parseInt(showPageResult), parseInt(perPageResult), totalPage, team.count, res)
      })
      .catch((error) => {
        resp.ok(false, "Failed get list data team.", null, res)
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

    return team
      .findAll({
        where: options,
        order: [
          [orderBy, sortBy]
        ],
      })
      .then(team => {
        resp.ok(true, "Get all data team.", team, res)
      })
      .catch((error) => {
        resp.ok(false, "Failed get all data team.", null, res)
        console.log(error)
      });
  },
  detail(req, res) {
    return team
      .findByPk(req.params.id)
      .then(team => {
        if (!team) {
          resp.ok(false, "Team not found.", null, res)
        }
        resp.ok(true, "Get data team.", team, res)
      })
      .catch((error) => {
        resp.ok(false, "Failed get team.", null, res)
        console.log(error)
      });
  },
  update(req, res) {
    return team
      .findByPk(req.params.id)
      .then(team => {
        if (!team) {
          resp.ok(false, "Team not found.", null, res)
        }
        return team
          .update({
            name: req.body.name || team.name,
            order: req.body.order || team.order,
          })
          .then(team => {
            resp.ok(true, "Success update team.", team.dataValues, res)
          })
          .catch((error) => {
            resp.ok(false, "Failed update team.", null, res)
            console.log(error)
          });
      })
      .catch((error) => {
        resp.ok(false, "Failed update team.", null, res)
        console.log(error)
      });
  },
  delete(req, res) {
    return team
      .findByPk(req.params.id)
      .then(team => {
        if (!team) {
          resp.ok(false, "Team not found.", null, res)
        }
        return team
          .destroy()
          .then(team => {
            resp.ok(true, "Success delete team.", team.dataValues, res)
          })
          .catch((error) => {
            resp.ok(false, "Failed delete team.", null, res)
            console.log(error)
          });
      })
      .catch((error) => {
        resp.ok(false, "Failed delete team.", null, res)
        console.log(error)
      });
  }
};