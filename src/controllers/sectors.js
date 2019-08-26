const sector = require('../models').sector;
const resp = require('../views/response');
const pagination = require('../utils/pagination');
const sequelize = require('sequelize');

module.exports = {
  create(req, res){
    return sector
      .create({
        name: req.body.name,
      })
      .then(sector => {
        resp.ok(true, "Success create sector.", sector.dataValues, res);
      })
      .catch((error) => {
        resp.ok(false, "Failed create sector.", null, res.status(400));
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
      options.name = sequelize.where(sequelize.fn('LOWER', sequelize.col('name')), 'LIKE', '%' + req.query.search + '%');
    }

    let { offsetResult, perPageResult, showPageResult } = pagination.builder(perPage, page);

    return sector
      .findAndCountAll({
        where: options,
        order: [
          [orderBy, sortBy]
        ],
        limit:  perPageResult,
        offset: offsetResult,
      })
      .then(sectorResult => {
        let totalPage = Math.ceil(sectorResult.count / perPage);
        let data = resp.paging(sectorResult.rows, parseInt(showPageResult), parseInt(perPageResult), totalPage, sectorResult.count);

        resp.ok(true, "Get list data sector.", data, res);
      })
      .catch((error) => {
        resp.ok(false, "Failed get list data sector.", null, res.status(400));
        console.log(error);
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

    return sector
      .findAll({
        where: options,
        order: [
          [orderBy, sortBy]
        ],
      })
      .then(sectorResult => {
        resp.ok(true, "Get all data sector.", sectorResult, res);
      })
      .catch((error) => {
        resp.ok(false, "Failed get all data sector.", null, res.status(400));
        console.log(error);
      });
  },

  detail(req, res) {
    return sector
      .findByPk(req.params.id)
      .then(sectorResult => {
        if (!sectorResult) {
          resp.ok(false, "sector not found.", null, res.status(400));
        }
        resp.ok(true, "Get data sector.", sectorResult, res);
      })
      .catch((error) => {
        resp.ok(false, "Failed get sector.", null, res.status(400));
        console.log(error);
      });
  },

  update(req, res) {
    return sector
      .findByPk(req.params.id)
      .then(sector => {
        if (!sector) {
          resp.ok(false, "sector not found.", null, res.status(400));
        }

        return sector
          .update({
            name: req.body.name || sector.name,
          })
          .then(sector => {
            resp.ok(true, "Success update sector.", sector.dataValues, res);
          })
          .catch((error) => {
            resp.ok(false, "Failed update sector.", null, res.status(400));
            console.log(error);
          });
      })
      .catch((error) => {
        resp.ok(false, "Failed update sector.", null, res.status(400));
        console.log(error);
      });
  },

  delete(req, res) {
    return sector
      .findByPk(req.params.id)
      .then(sector => {
        if (!sector) {
          resp.ok(false, "sector not found.", null, res.status(400));
        }

        return sector
          .destroy()
          .then(sector => {
            resp.ok(true, "Success delete sector.", sector.dataValues, res);
          })
          .catch((error) => {
            resp.ok(false, "Failed delete sector.", null, res.status(400));
            console.log(error);
          });
      })
      .catch((error) => {
        resp.ok(false, "Failed delete sector.", null, res.status(400));
        console.log(error);
      });
  }
};
