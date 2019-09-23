const processMachine = require('../models').process_machine;
const process = require('../models').process;
const process2 = require('../models').process;
const machine = require('../models').machine;
const resp = require('../views/response');
const pagination = require('../utils/pagination');
const sequelize = require('sequelize');
const model = require('../models');
const db = model.sequelize;

module.exports =  {
  createProcess(req, res){
    let machineID;
    let processID;

    return db.transaction(t => { 
      return process
        .create({
          name: req.body.process_name,
          line_id: req.body.line_id,
        }, {transaction: t})
        .then(process => {
          processID = process.id;

          return machine
            .create({
              name: req.body.machine_name,
            }, {transaction: t})
            .then(machine => {
              machineID = machine.dataValues.id;

              return processMachine
                .create({
                  process_id: processID,
                  machine_id: machineID,
                  from_machine_id: req.body.from_machine_id,
                }, {transaction: t})
                .then(processMachine => {
                  processMachineID = processMachine.id;
                });
              });
          });
    }).then(() => {

      return process
        .findByPk(processID, {
          attributes: [['id', 'process_id'],['name','process_name']],
          include: [{
            model: machine,
            attributes: [
              ['id', 'machine_id'],
              ['name', 'machine_name'],
              ['image','image'],
              ['manufacturer','manufacturer'],
              ['build_year','build_year'],
              ['asset_number','asset_number'],
              ['cycle_time','cycle_time'],
              ['delta_t_tg','delta_t_tg'],
              ['delta_t_tr','delta_t_tr'],
              ['sensor_total_status','sensor_total_status'],
              ['sensor_reject_status','sensor_reject_status'],
              ['sensor_good_status','sensor_good_status'],
            ],
            through: {
              model: processMachine
            },
          }],
        })
        .then(process => {
          if (!process) {
            resp.ok(false, "Process not found.", null, res.status(400));
          }
          
          resp.ok(true, "Success create process, machine and process_machine.", process, res);

        })
        .catch((error) => {
          resp.ok(false, "Failed get data process.", null, res.status(400));
          console.log(error);
        });

    }).catch(error => {
      resp.ok(false, "Failed create process, machine and process_machine", null, res.status(400));
      console.log(error);
    });
  },

  createMachine(req, res){
    let processMachineID;
    let machineID;

    return db.transaction(t => { 
      return machine
        .create({
          name: req.body.machine_name,
          }, {transaction: t})
        .then(machine => {
          machineID = machine.dataValues.id;

          return processMachine
            .create({
              process_id: req.body.process_id,
              machine_id: machine.dataValues.id,
              from_machine_id: req.body.from_machine_id,
            }, {transaction: t})
            .then(processMachine => {
              processMachineID = processMachine.id
            });
          });
    }).then(() => {

      let newResponseMachine = {}
      let newProcessMachine = {}

      return machine
        .findByPk(machineID, {
          attributes: [
            ['id', 'machine_id'],
            ['name', 'machine_name'],
            ['image','image'],
            ['manufacturer','manufacturer'],
            ['build_year','build_year'],
            ['asset_number','asset_number'],
            ['cycle_time','cycle_time'],
            ['delta_t_tg','delta_t_tg'],
            ['delta_t_tr','delta_t_tr'],
            ['sensor_total_status','sensor_total_status'],
            ['sensor_reject_status','sensor_reject_status'],
            ['sensor_good_status','sensor_good_status'],
          ],
          include: [{
            model: processMachine,
            where: { id: processMachineID },
          }],
        })
        .then(machine => {
          if (!machine) {
            resp.ok(false, "Machine not found.", null, res.status(400));
          }

          if (machine.process_machines != 'undefined' && machine.process_machines.length > 0) {
            newProcessMachine = machine.process_machines[0];
            newResponseMachine.machine_id = machine.dataValues.machine_id;
            newResponseMachine.machine_name = machine.dataValues.machine_name;
            newResponseMachine.process_machine = newProcessMachine;

            resp.ok(true, "Success create machine and process_machine.", newResponseMachine, res);
          
          } else {
            resp.ok(true, "Success create machine and process_machine.", machine, res);
          }
        })
        .catch((error) => {
          resp.ok(false, "Failed get data machine.", null, res.status(400));
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

  updateProcess(req, res) {
    return process
      .findByPk(req.params.process_id)
      .then(process => {
        if (!process) {
          resp.ok(false, "Process not found.", null, res.status(400));
        }

        return process
          .update({
            name: req.body.process_name || process.name,
          })
          .then(() => {

            return process2
              .findByPk(req.params.process_id, {
                attributes: [['id', 'process_id'],['name','process_name']],
                include: [{
                  model: machine,
                  attributes: [
                    ['id', 'machine_id'],
                    ['name', 'machine_name'],
                    ['image','image'],
                    ['manufacturer','manufacturer'],
                    ['build_year','build_year'],
                    ['asset_number','asset_number'],
                    ['cycle_time','cycle_time'],
                    ['delta_t_tg','delta_t_tg'],
                    ['delta_t_tr','delta_t_tr'],
                    ['sensor_total_status','sensor_total_status'],
                    ['sensor_reject_status','sensor_reject_status'],
                    ['sensor_good_status','sensor_good_status'],
                  ],
                  through: {
                    model: processMachine,
                  },
                }],
              })
              .then(processResult => {
                if (!processResult) {
                  resp.ok(false, "Process not found.", null, res.status(400));
                }
                
                resp.ok(true, "Success update process.", processResult, res);

              })
              .catch((error) => {
                resp.ok(false, "Failed get data process.", null, res.status(400));
                console.log(error);
              });

          })
          .catch((error) => {
            resp.ok(false, "Failed update process.", null, res.status(400));
            console.log(error);
          });
      })
      .catch((error) => {
        resp.ok(false, "Failed get process.", null, res.status(400));
        console.log(error);
      });
  },

  updateMachine(req, res) {
    let machineID;

    return db.transaction(t => { 
      return processMachine
        .findByPk(req.params.process_machine_id)
        .then(processMachine => {
          if (!processMachine) {
            resp.ok(false, "Process machine not found.", null, res.status(400));
          }
          machineID = processMachine.machine_id;

          return processMachine
            .update({
              from_machine_id: req.body.from_machine_id || processMachine.from_machine_id,
            }, {transaction: t})
            .then(() => {

              return machine
                .findByPk(machineID)
                .then(machine => {
                  if (!machine) {
                    resp.ok(false, "Machine not found.", null, res.status(400));
                  }
                  
                  return machine
                    .update({
                      name: req.body.machine_name || machine.name,
                    }, {transaction: t});
                });
            });
        });
    })
    .then(() => {
      let newResponseMachine = {}
      let newProcessMachine = {}

      return machine
        .findByPk(machineID, {
          attributes: [
            ['id', 'machine_id'],
            ['name', 'machine_name'],
            ['image','image'],
            ['manufacturer','manufacturer'],
            ['build_year','build_year'],
            ['asset_number','asset_number'],
            ['cycle_time','cycle_time'],
            ['delta_t_tg','delta_t_tg'],
            ['delta_t_tr','delta_t_tr'],
            ['sensor_total_status','sensor_total_status'],
            ['sensor_reject_status','sensor_reject_status'],
            ['sensor_good_status','sensor_good_status'],
          ],
          include: [{
            model: processMachine,
            where: { id: req.params.process_machine_id },
          }],
        })
        .then(machine => {
          if (!machine) {
            resp.ok(false, "Machine not found.", null, res.status(400));
          }

          if (machine.process_machines != 'undefined' && machine.process_machines.length > 0) {
            newProcessMachine = machine.process_machines[0];
            newResponseMachine.machine_id = machine.dataValues.machine_id;
            newResponseMachine.machine_name = machine.dataValues.machine_name;
            newResponseMachine.process_machine = newProcessMachine;

            resp.ok(true, "Success update machine and process_machine.", newResponseMachine, res);
          
          } else {
            resp.ok(true, "Success update machine and process_machine.", machine, res);
          }
        })
        .catch((error) => {
          resp.ok(false, "Failed get data machine.", null, res.status(400));
          console.log(error);
        });
    })
    .catch(error => {
      resp.ok(false, "Failed get machine", null, res.status(400));
      console.log(error);
    });
  },

  deleteProcess(req, res) {
    return process
      .findByPk(req.params.process_id)
      .then(process => {
        if (!process) {
          resp.ok(false, "Process not found.", null, res.status(400));
        }

        return process
          .destroy()
          .then(process => {
            resp.ok(true, "Success delete process.", process.dataValues, res);
          })
          .catch((error) => {
            resp.ok(false, "Failed delete process.", null, res.status(400));
            console.log(error);
          });
      })
      .catch((error) => {
        resp.ok(false, "Failed delete process.", null, res.status(400));
        console.log(error);
      });
  }
};
