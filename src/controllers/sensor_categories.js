const sensorCategory = require('../models').sensor_category;
const sensor = require('../models').sensor;
const resp = require('../views/response');
const pagination = require('../utils/pagination');
const sequelize = require('sequelize');


module.exports = {
  create(req, res){
    return sensorCategory
      .create({
        name: req.body.name,
      })
      .then(sensorCategory => {
        resp.ok(true, "Success create sensor_category.", sensorCategory.dataValues, res);
      })
      .catch((error) => {
        resp.ok(false, "Failed create sensor_category.", null, res.status(400));
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
      options.name = sequelize.where(sequelize.fn('LOWER', sequelize.col('sensor_category.name')), 'LIKE', '%' + req.query.search.toLowerCase() + '%');
    }

    let { offsetResult, perPageResult, showPageResult } = pagination.builder(perPage, page);

    return sensorCategory
      .findAndCountAll({
        include: [{
          model: sensor,
        }],
        where: options,
        order: [
          [orderBy, sortBy]
        ],
        limit:  perPageResult,
        offset: offsetResult,
      })
      .then(sensorCategoryResult => {
        let totalPage = Math.ceil(sensorCategoryResult.count / perPage);
        let data = resp.paging(sensorCategoryResult.rows, parseInt(showPageResult), parseInt(perPageResult), totalPage, sensorCategoryResult.count);

        resp.ok(true, "Get list data sensor_category.", data, res);
      })
      .catch((error) => {
        resp.ok(false, "Failed get list data sensor_category.", null, res.status(400));
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
      options.name = sequelize.where(sequelize.fn('LOWER', sequelize.col('sensor_category.name')), 'LIKE', '%' + req.query.search.toLowerCase() + '%');
    }
    return sensorCategory
      .findAll({
        include: [{
          model: sensor,
        }],
        where: options,
        order: [
          [orderBy, sortBy]
        ],
      })
      .then(sensorCategoryResult => {
        resp.ok(true, "Get list data sensor_category.", sensorCategoryResult, res);
      })
      .catch((error) => {
        resp.ok(false, "Failed get list data sensor_category.", null, res.status(400));
        console.log(error);
      });
  },

  detail(req, res) {
    return sensorCategory
      .findByPk(req.params.id, {
        include: [{
          model: sensor,
        }],
      })
      .then(sensorCategoryResult => {
        console.log(sensorCategoryResult);
        if (!sensorCategoryResult) {
          resp.ok(false, "sensorCategory not found.", null, res.status(400));
        }
        resp.ok(true, "Get data sensor_category.", sensorCategoryResult, res);
      })
      .catch((error) => {
        resp.ok(false, "Failed get sensor_category.", null, res.status(400));
        console.log(error);
      });
  },

  update(req, res) {
    return sensorCategory
      .findByPk(req.params.id)
      .then(sensorCategory => {
        if (!sensorCategory) {
          resp.ok(false, "sensor_category not found.", null, res.status(400));
        }
        return sensorCategory
          .update({
            name: req.body.name || sensorCategory.name,
          })
          .then(sensorCategory => {
            resp.ok(true, "Success update sensor_category.", sensorCategory.dataValues, res);
          })
          .catch((error) => {
            resp.ok(false, "Failed update sensor_category.", null, res.status(400));
            console.log(error);
          });
      })
      .catch((error) => {
        resp.ok(false, "Failed update sensor_category.", null, res.status(400));
        console.log(error);
      });
  },

  delete(req, res) {
    return sensorCategory
      .findByPk(req.params.id)
      .then(sensorCategory => {
        if (!sensorCategory) {
          resp.ok(false, "sensor_category not found.", null, res.status(400));
        }

        return sensorCategory
          .destroy()
          .then(sensorCategory => {
            resp.ok(true, "Success delete sensor_category.", sensorCategory.dataValues, res);
          })
          .catch((error) => {
            resp.ok(false, "Failed delete sensor_category.", null, res.status(400));
            console.log(error);
          });
      })
      .catch((error) => {
        resp.ok(false, "Failed delete sensor_category.", null, res.status(400));
        console.log(error);
      });
  }
};
