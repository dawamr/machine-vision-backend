const sensor = require('../models').sensor;
const sensor2 = require('../models').sensor;
const sensorCategory = require('../models').sensor_category;
const resp = require('../views/response');
const pagination = require('../utils/pagination');
const sequelize = require('sequelize');


module.exports = {
  create(req, res) {
    return sensor
      .create({
        name: req.body.name,
        sensor_category_id: req.body.sensor_category_id
      })
      .then(result => {
        return sensor.findOne({
            where: {
              id: result.dataValues.id
            },
            include: [{
              model: sensorCategory,
            }]
          })
          .then(newData => {
            req.data = newData;
            resp.ok(true, "Success add data sensor.", req.data, res)
          })
      })
      .catch((error) => {
        resp.ok(false, "Failed add data sensor.", null, res.status(400));
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
    if ((req.query.search != undefined) && (req.query.search.length > 0)) {
      options.name = sequelize.where(sequelize.fn('LOWER', sequelize.col('sensor.name')), 'LIKE', '%' + req.query.search.toLowerCase() + '%');
    }
    if ((req.query.sensor_category_id != undefined) && (req.query.sensor_category_id.length > 0)) {
      options.sensor_category_id = sequelize.where(sequelize.col('sensor.sensor_category_id'), '=', req.query.sensor_category_id);
    }

    let {
      offsetResult,
      perPageResult,
      showPageResult
    } = pagination.builder(perPage, page);

    return sensor
      .findAndCountAll({
        include: [{
          model: sensorCategory,
        }],
        where: options,
        order: [
          [orderBy, sortBy]
        ],
        limit: perPageResult,
        offset: offsetResult,
      })
      .then(sensorResult => {
        let totalPage = Math.ceil(sensorResult.count / perPage);
        let data = resp.paging(sensorResult.rows, parseInt(showPageResult), parseInt(perPageResult), totalPage, sensorResult.count);

        resp.ok(true, "Get list data sensor.", data, res);
      })
      .catch((error) => {
        resp.ok(false, "Failed get list data sensor.", null, res.status(400));
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
    if ((req.query.search != undefined) && (req.query.search.length > 0)) {
      options.name = sequelize.where(sequelize.fn('LOWER', sequelize.col('sensor.name')), 'LIKE', '%' + req.query.search.toLowerCase() + '%');
    }
    if ((req.query.sensor_category_id != undefined) && (req.query.sensor_category_id.length > 0)) {
      options.sensor_category_id = sequelize.where(sequelize.col('sensor.sensor_category_id'), '=', req.query.sensor_category_id);
    }

    return sensor
      .findAll({
        include: [{
          model: sensorCategory,
        }],
        where: options,
        order: [
          [orderBy, sortBy]
        ],
      })
      .then(sensorResult => {
        resp.ok(true, "Get list data sensor.", sensorResult, res);
      })
      .catch((error) => {
        resp.ok(false, "Failed get list data sensor.", null, res.status(400));
        console.log(error);
      });
  },

  detail(req, res) {
    return sensor
      .findByPk(req.params.id, {
        include: [{
          model: sensorCategory,
        }],
      })
      .then(sensorResult => {
        if (!sensorResult) {
          resp.ok(false, "sensor not found.", null, res.status(400));
        }
        resp.ok(true, "Get data sensor.", sensorResult, res);
      })
      .catch((error) => {
        resp.ok(false, "Failed get sensor.", null, res.status(400));
        console.log(error);
      });
  },

  update(req, res) {
    return sensor
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then(sensor => {
        if (!sensor) {
          resp.ok(false, "sensor not found.", null, res.status(400));
        }

        return sensor
          .update({
            name: req.body.name || sensor.name,
            sensor_category_id: req.body.sensor_category_id || sensor.sensor_category_id,
          })
          .then(sensor => {
            return sensor2
              .findByPk(sensor.id, {
                include: [{
                  model: sensorCategory
                }]
              })
              .then(result => {
                resp.ok(true, "Success update sensor.", result.dataValues, res);
              })
          })
          .catch((error) => {
            resp.ok(false, "Failed update sensor.", null, res.status(400));
            console.log(error);
          });
      })
      .catch((error) => {
        resp.ok(false, "Failed update sensor.", null, res.status(400));
        console.log(error);
      });
  },

  delete(req, res) {
    return sensor
      .findByPk(req.params.id)
      .then(sensor => {
        if (!sensor) {
          resp.ok(false, "sensor not found.", null, res.status(400));
        }

        return sensor
          .destroy()
          .then(sensor => {
            resp.ok(true, "Success delete sensor.", sensor.dataValues, res);
          })
          .catch((error) => {
            resp.ok(false, "Failed delete sensor.", null, res.status(400));
            console.log(error);
          });
      })
      .catch((error) => {
        resp.ok(false, "Failed delete sensor.", null, res.status(400));
        console.log(error);
      });
  }
};