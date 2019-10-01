const machine = require('../models').machine;
const line = require('../models').line;
const resp = require('../views/response');
const pagination = require('../utils/pagination');
const sequelize = require('sequelize');
const op = sequelize.Op;

module.exports = {
  create(req, res){
    return machine
      .create({
        name: req.body.name,
        image: req.body.image,
        manufacturer: req.body.manufacturer,
        build_year: req.body.build_year,
        asset_number: req.body.asset_number,
        cycle_time: req.body.cycle_time,
        delta_t_tg: req.body.delta_t_tg,
        delta_t_tr: req.body.delta_t_tr,
        delta_t_gr: req.body.delta_t_gr,
        sensor_total_status: req.body.sensor_total_status,
        sensor_reject_status: req.body.sensor_reject_status,
        sensor_good_status: req.body.sensor_good_status,
      })
      .then(machine => {
        resp.ok(true, "Success create machine.", machine.dataValues, res);
      })
      .catch((error) => {
        resp.ok(false, "Failed create machine.", null, res.status(400));
        console.log(error);
      });
  },

  list(req, res) {
    let orderBy = 'created_at';
    let sortBy = 'desc';
    let page = 1;
    let perPage = 10;
    let options = {};
    let lineOptions = {};
    let required = false;

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

    return machine
      .findAndCountAll({
        where: options,
        order: [
          [orderBy, sortBy]
        ],
        limit:  perPageResult,
        offset: offsetResult,
      })
      .then(machineResult => {
        let totalPage = Math.ceil(machineResult.count / perPage);
        let data = resp.paging(machineResult.rows, parseInt(showPageResult), parseInt(perPageResult), totalPage, machineResult.count);

        resp.ok(true, "Get list data machine.", data, res);
      })
      .catch((error) => {
        resp.ok(false, "Failed get list data machine.", null, res.status(400));
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

    return machine
      .findAll({
        where: options,
        order: [
          [orderBy, sortBy]
        ],
      })
      .then(machineResult => {
        resp.ok(true, "Get all data machine.", machineResult, res);
      })
      .catch((error) => {
        resp.ok(false, "Failed get all data machine.", null, res.status(400));
        console.log(error);
      });
  },

  detail(req, res) {
    return machine
      .findByPk(req.params.id)
      .then(machineResult => {
        if (!machineResult) {
          resp.ok(false, "machine not found.", null, res.status(400));
        }
        resp.ok(true, "Get data machine.", machineResult, res);
      })
      .catch((error) => {
        resp.ok(false, "Failed get machine.", null, res.status(400));
        console.log(error);
      });
  },

  update(req, res) {
    return machine
      .findByPk(req.params.id)
      .then(machine => {
        if (!machine) {
          resp.ok(false, "Machine not found.", null, res.status(400));
        }

        return machine
          .update({
            name: req.body.name || machine.name,
            image: req.body.image || machine.image,
            manufacturer: req.body.manufacturer || machine.manufacturer,
            build_year: req.body.build_year || machine.build_year,
            asset_number: req.body.asset_number || machine.asset_number,
            cycle_time: req.body.cycle_time || machine.cycle_time,
            delta_t_tg: req.body.delta_t_tg || machine.delta_t_tg,
            delta_t_tr: req.body.delta_t_tr || machine.delta_t_tr,
            delta_t_gr: req.body.delta_t_gr || machine.delta_t_gr,
            sensor_total_status: req.body.sensor_total_status || machine.sensor_total_status,
            sensor_reject_status: req.body.sensor_reject_status || machine.sensor_reject_status,
            sensor_good_status: req.body.sensor_good_status || machine.sensor_good_status,
          })
          .then(machine => {
            resp.ok(true, "Success update machine.", machine.dataValues, res);
          })
          .catch((error) => {
            resp.ok(false, "Failed update machine.", null, res.status(400));
            console.log(error);
          });
      })
      .catch((error) => {
        resp.ok(false, "Failed update machine.", null, res.status(400));
        console.log(error);
      });
  },

  delete(req, res) {
    return machine
      .findByPk(req.params.id)
      .then(machine => {
        if (!machine) {
          resp.ok(false, "Machine not found.", null, res.status(400));
        }

        return machine
          .destroy()
          .then(machine => {
            resp.ok(true, "Success delete machine.", machine.dataValues, res);
          })
          .catch((error) => {
            resp.ok(false, "Failed delete machine.", null, res.status(400));
            console.log(error);
          });
      })
      .catch((error) => {
        resp.ok(false, "Failed delete machine.", null, res.status(400));
        console.log(error);
      });
  }
};
