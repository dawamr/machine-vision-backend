const processMachine = require('../models').process_machine;
const process = require('../models').process;
const machine = require('../models').machine;
const line = require('../models').line;
const productCategory = require('../models').product_category;
const sector = require('../models').sector;
const resp = require('../views/response');
const pagination = require('../utils/pagination');
const sequelize = require('sequelize');
const model = require('../models');
const db = model.sequelize;
const createProcessResult = {};

module.exports =  {
  createProcess(req, res){
    return db.transaction(t => { 
      return process
        .create({
          name: req.body.process_name,
          line_id: req.body.line_id,
        }, {transaction: t})
        .then(process => {
          
          return machine
            .create({
              name: req.body.machine_name,
            }, {transaction: t})
            .then(machine => {
              
              return processMachine
                .create({
                  process_id: process.dataValues.id,
                  machine_id: machine.dataValues.id,
                  from_machine_id: req.body.from_machine_id,
                }, {transaction: t});
              });
          });
    }).then(() => {
      
      return line
        .findByPk(req.body.line_id, {
          include: [{
            model: sector,
          }, {
            model: productCategory,
          },
          {
            model: process,
            attributes: [['id', 'process_id'],['name','process_name']],
            include: [{
              model: machine,
              attributes: [['id', 'machine_id'],['name', 'machine_name']],
              through: {
                model: processMachine
              }
            }]
          }],
        })
        .then(lineResult => {
          if (!lineResult) {
            resp.ok(false, "Line not found.", null, res.status(400));
          }
          resp.ok(true, "Success create process, machine, process_machine and get data line.", lineResult, res);
        })
        .catch((error) => {
          resp.ok(false, "Failed get data line.", null, res.status(400));
          console.log(error);
        });

    }).catch(error => {
      resp.ok(false, "Failed create process, machine and process_machine", null, res.status(400));
      console.log(error);
    });
  },

  createMachine(req, res){
    return db.transaction(t => { 
      return machine
        .create({
          name: req.body.machine_name,
          }, {transaction: t})
        .then(machine => {
          
          return processMachine
            .create({
              process_id: req.body.process_id,
              machine_id: machine.dataValues.id,
              from_machine_id: req.body.from_machine_id,
            }, {transaction: t});
          });
    }).then(() => {

      return line
        .findByPk(req.body.line_id, {
          include: [{
            model: sector,
          }, {
            model: productCategory,
          },
          {
            model: process,
            attributes: [['id', 'process_id'],['name','process_name']],
            include: [{
              model: machine,
              attributes: [['id', 'machine_id'],['name', 'machine_name']],
              through: {
                model: processMachine
              }
            }]
          }],
        })
        .then(lineResult => {
          if (!lineResult) {
            resp.ok(false, "Line not found.", null, res.status(400));
          }
          resp.ok(true, "Success create machine, process_machine and get data line.", lineResult, res);
        })
        .catch((error) => {
          resp.ok(false, "Failed get data line.", null, res.status(400));
          console.log(error);
        });

    }).catch(error => {
      resp.ok(false, "Failed create machine and process_machine", null, res.status(400));
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

  listMachine(req, res) {
    let orderBy = 'created_at';
    let sortBy = 'desc';
    let options = {};
    options.process_id = 0

    if ((req.query.order_by != undefined) && (req.query.order_by.length > 0)) {
      orderBy = req.query.order_by;
    }
    if ((req.query.sort_by != undefined) && (req.query.sort_by.length > 0)) {
      sortBy = req.query.sort_by;
    }
    if ((req.query.process_id != undefined) && (req.query.process_id.length > 0)) {
      options.process_id = sequelize.where(sequelize.col('process_id'), '=', req.query.process_id);
    }

    return machine
      .findAll({
        order: [
          [orderBy, sortBy]
        ],
        attributes: [['id', 'machine_id'],['name', 'machine_name']],
        include: [{
          model: processMachine,
          where: options,
          attributes: [],
          required: true,
         }],
          
      })
      .then(processMachineResult => {
        resp.ok(true, "Get all data machine.", processMachineResult, res);
      })
      .catch((error) => {
        resp.ok(false, "Failed get all data machine.", null, res.status(400));
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
            machine_id: req.body.machine_id || processMachine.machine_id,
          })
          .then(processMachine => {
            return process
              .findByPk(processMachine.process_id)
              .then(process => {
                if (!process) {
                  resp.ok(false, "Process machine not found.", null, res.status(400));
                }

                return process
                  .update({
                    name: req.body.process_name || process.name,
                  })
                  .then(process => {
                    let result = {
                      process: process,
                      process_machine: processMachine
                    }
        
                    data = result;
                    resp.ok(true, "Success update process and process machine.", data, res);
                  })
                  .catch((error) => {
                    resp.ok(false, "Failed update process.", null, res.status(400));
                    console.log(error);
                  })
                })
              .catch((error) => {
                resp.ok(false, "Failed get process.", null, res.status(400));
                console.log(error);
              })
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
