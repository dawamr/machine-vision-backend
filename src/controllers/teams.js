const team = require('../models').team;
const user = require('../models').user;
const resp = require('../views/response');
const pagination = require('../utils/pagination');
const sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
  create(req, res){
    return team
      .create({
        name: req.body.name,
        order: req.body.order,
      })
      .then(team => {
        resp.ok(true, "Success create team.", team.dataValues, res);
      })
      .catch((error) => {
        resp.ok(false, "Failed create team.", null, res.status(400));
        console.log(error);
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
      options.name = sequelize.where(sequelize.fn('LOWER', sequelize.col('team.name')), 'LIKE', '%' + req.query.search + '%');
    }

    let { offsetResult, perPageResult, showPageResult } = pagination.builder(perPage, page);

    return team
      .findAndCountAll({
        include: [{
          model: user,
          as: 'users',
        }],
        where: options,
        order: [
          [orderBy, sortBy]
        ],
        limit:  perPageResult,
        offset: offsetResult,
      })
      .then(teamResult => {
        let totalPage = Math.ceil(teamResult.count / perPage);
        let data = resp.paging(teamResult.rows, parseInt(showPageResult), parseInt(perPageResult), totalPage, teamResult.count);

        resp.ok(true, "Get list data team.", data, res);
      })
      .catch((error) => {
        resp.ok(false, "Failed get list data team.", null, res.status(400));
        console.log(error);
      });
  },

  listAll(req, res) {
    return team
      .findAll({
        include: [{
          model: user,
          as: 'users',
        }],
        where: {
          name: {
            [Op.like]: (req.query.name) ? '%' + req.query.name + '%' : '%'
          }
        }
      })
      .then(teamResult => {
        resp.ok(true, "Get all data team.", teamResult, res);
      })
      .catch((error) => {
        resp.ok(false, "Failed get all data team.", null, res.status(400));
        console.log(error);
      });
  },

  detail(req, res) {
    return team
      .findByPk(
        req.params.id, 
        {
          include: [{
            model: user,
            as: 'users',
          }],
        }
      )
      .then(teamResult => {
        if (!teamResult) {
          resp.ok(false, "team not found.", null, res.status(400));
        }
        resp.ok(true, "Get data team.", teamResult, res);
      })
      .catch((error) => {
        resp.ok(false, "Failed get team.", null, res.status(400));
        console.log(error);
      });
  },

  update(req, res) {
    return team
      .findByPk(req.params.id)
      .then(team => {
        if (!team) {
          resp.ok(false, "team not found.", null, res.status(400));
        }

        return team
          .update({
            name: req.body.name || teamResult.name,
            order: req.body.order || team.order,
          })
          .then(team => {
            resp.ok(true, "Success update team.", team.dataValues, res);
          })
          .catch((error) => {
            resp.ok(false, "Failed update team.", null, res.status(400));
            console.log(error);
          });
      })
      .catch((error) => {
        resp.ok(false, "Failed update team.", null, res.status(400));
        console.log(error);
      });
  },

  delete(req, res) {
    return team
      .findByPk(req.params.id)
      .then(team => {
        if (!team) {
          resp.ok(false, "team not found.", null, res.status(400));
        }

        return team
          .destroy()
          .then(team => {
            resp.ok(true, "Success delete team.", team.dataValues, res);
          })
          .catch((error) => {
            resp.ok(false, "Failed delete team.", null, res.status(400));
            console.log(error);
          });
      })
      .catch((error) => {
        resp.ok(false, "Failed delete team.", null, res.status(400));
        console.log(error);
      });
  }
};
