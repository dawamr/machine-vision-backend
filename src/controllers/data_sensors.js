const dataSensor = require('../models').data_sensor;
const resp = require('../views/response');
const pagination = require('../utils/pagination');
const sequelize = require('sequelize');


module.exports = {
  create(req, res) {
    return dataSensor
      .create({
        sensor_id: req.body.sensor_id,
        value: req.body.value,
      })
      .then(result => {
        resp.ok(true, "Success add data sensor.", result.dataValues, res)
      })
      .catch((error) => {
        resp.ok(false, "Failed add data sensor.", null, res.status(400));
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
    if ((req.query.search != undefined) && (req.query.search.length > 0)) {
      options.value = sequelize.where(sequelize.col('data_sensor.value'), '=', req.query.search);
    }
    if ((req.query.sensor_id != undefined) && (req.query.sensor_id.length > 0)) {
      options.sensor_id = sequelize.where(sequelize.col('data_sensor.sensor_id'), '=', req.query.sensor_id);
    }

    let {
      offsetResult,
      perPageResult,
      showPageResult
    } = pagination.builder(perPage, page);

    return dataSensor
      .findAndCountAll({
        where: options,
        order: [
          [orderBy, sortBy]
        ],
        limit: perPageResult,
        offset: offsetResult,
      })
      .then(dataSensorResult => {
        let totalPage = Math.ceil(dataSensorResult.count / perPage);
        let data = resp.paging(dataSensorResult.rows, parseInt(showPageResult), parseInt(perPageResult), totalPage, dataSensorResult.count);

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
      options.value = sequelize.where(sequelize.col('data_sensor.value'), '=', req.query.search);
    }
    if ((req.query.sensor_id != undefined) && (req.query.sensor_id.length > 0)) {
      options.sensor_id = sequelize.where(sequelize.col('data_sensor.sensor_id'), '=', req.query.sensor_id);
    }

    return dataSensor
      .findAll({
        where: options,
        order: [
          [orderBy, sortBy]
        ],
      })
      .then(dataSensorResult => {
        resp.ok(true, "Get list data sensor.", dataSensorResult, res);
      })
      .catch((error) => {
        resp.ok(false, "Failed get list data sensor.", null, res.status(400));
        console.log(error);
      });
  },

  detail(req, res) {
    return dataSensor
      .findByPk(req.params.id)
      .then(dataSensorResult => {
        if (!dataSensorResult) {
          resp.ok(false, "Data sensor not found.", null, res.status(400));
        }
        resp.ok(true, "Get data sensor.", dataSensorResult, res);
      })
      .catch((error) => {
        resp.ok(false, "Failed get daata sensor.", null, res.status(400));
        console.log(error);
      });
  },

  update(req, res) {
    return dataSensor
      .findByPk(req.params.id)
      .then(dataSensor => {
        if (!dataSensor) {
          resp.ok(false, "Data sensor not found.", null, res.status(400));
        }
        return dataSensor
          .update({
            sensor_id: req.body.sensor_id || dataSensor.sensor_id,
            value: req.body.value || dataSensor.value,
          })
          .then(dataSensor => {
            resp.ok(true, "Success update data sensor.", dataSensor.dataValues, res);
          })
          .catch((error) => {
            resp.ok(false, "Failed update data sensor.", null, res.status(400));
            console.log(error);
          });
      })
      .catch((error) => {
        resp.ok(false, "Failed update data sensor.", null, res.status(400));
        console.log(error);
      });
  },

  delete(req, res) {
    return dataSensor
      .findByPk(req.params.id)
      .then(dataSensor => {
        if (!dataSensor) {
          resp.ok(false, "Data sensor not found.", null, res.status(400));
        }

        return dataSensor
          .destroy()
          .then(dataSensor => {
            resp.ok(true, "Success delete data sensor.", dataSensor.dataValues, res);
          })
          .catch((error) => {
            resp.ok(false, "Failed delete data sensor.", null, res.status(400));
            console.log(error);
          });
      })
      .catch((error) => {
        resp.ok(false, "Failed delete data sensor.", null, res.status(400));
        console.log(error);
      });
  }
};