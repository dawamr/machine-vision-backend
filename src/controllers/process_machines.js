const processMachine = require('../models').process_machine;
const process = require('../models').process;
const resp = require('../views/response');
const pagination = require('../utils/pagination');
const sequelize = require('sequelize');

module.exports = {
  create(req, res, next){
    let processObj = req.body;
    return process
    .create(processObj)
    .then(process => {
      return processMachine
      .create({
        process_id: process.dataValues.id,
        machine_id: processObj.machine_id
      })
      .then(result => {
        req.data = process
        next();
      })
    })
    .catch(err => {
      next(err);
    })
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

    return processMachine
      .findAndCountAll({
        where: options,
        order: [
          [orderBy, sortBy]
        ],
        limit:  perPageResult,
        offset: offsetResult,
      })
      .then(processMachineResult => {
        let totalPage = Math.ceil(processMachineResult.count / perPage);
        let data = resp.paging(processMachineResult.rows, parseInt(showPageResult), parseInt(perPageResult), totalPage, processMachineResult.count);

        resp.ok(true, "Get list data process machine.", data, res);
      })
      .catch((error) => {
        resp.ok(false, "Failed get list data process machine.", null, res.status(400));
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

    return processMachine
      .findAll({
        where: options,
        order: [
          [orderBy, sortBy]
        ],
      })
      .then(processMachineResult => {
        resp.ok(true, "Get all data process machine.", processMachineResult, res);
      })
      .catch((error) => {
        resp.ok(false, "Failed get all data process machine.", null, res.status(400));
        console.log(error);
      });
  },

  detail(req, res) {
    return processMachine
      .findByPk(req.params.id)
      .then(processMachineResult => {
        console.log(processMachineResult);
        if (!processMachineResult) {
          resp.ok(false, "Process machine not found.", null, res.status(400));
        }
        resp.ok(true, "Get data process machine.", processMachineResult, res);
      })
      .catch((error) => {
        resp.ok(false, "Failed get process machine.", null, res.status(400));
        console.log(error);
      });
  },

  update(req, res) {
    return processMachine
      .findByPk(req.params.id)
      .then(processMachine => {
        if (!processMachine) {
          resp.ok(false, "Process machine not found.", null, res.status(400));
        }

        return processMachine
          .update({
            line_id: req.body.line_id || processMachine.line_id,
            process_id: req.body.process_id || processMachine.process_id,
            machine_id: req.body.machine_id || processMachine.machine_id,
          })
          .then(processMachine => {
            resp.ok(true, "Success update process machine.", processMachine.dataValues, res);
          })
          .catch((error) => {
            resp.ok(false, "Failed update process machine.", null, res.status(400));
            console.log(error);
          });
      })
      .catch((error) => {
        resp.ok(false, "Failed update process machine.", null, res.status(400));
        console.log(error);
      });
  },

  delete(req, res) {
    return processMachine
      .findByPk(req.params.id)
      .then(processMachine => {
        if (!processMachine) {
          resp.ok(false, "Process machine not found.", null, res.status(400));
        }

        return processMachine
          .destroy()
          .then(processMachine => {
            resp.ok(true, "Success delete process machine.", processMachine.dataValues, res);
          })
          .catch((error) => {
            resp.ok(false, "Failed delete process machine.", null, res.status(400));
            console.log(error);
          });
      })
      .catch((error) => {
        resp.ok(false, "Failed delete process machine.", null, res.status(400));
        console.log(error);
      });
  }
};
