
const line = require('../models').line;
const line2 = require('../models').line;
const productCategory = require('../models').product_category;
const sector = require('../models').sector;
const process_machine = require('../models').process_machine;
const machine = require('../models').machine;
const process = require('../models').process;
const resp = require('../views/response');
const pagination = require('../utils/pagination');
const sequelize = require('sequelize');
const Op = sequelize.Op;


module.exports = {
  create(req, res) {
    return line
      .create({
        name: req.body.name,
        sector_id: req.body.sector_id,
        product_category_id: req.body.product_category_id
      })
      .then(result => {
        return line.findOne({
            where: {
              id: result.dataValues.id
            },
            include: [{
              model: sector,
            },
            {
              model: productCategory,
            }],
          })
          .then(newData => {
            req.data = newData;
            resp.ok(true, "Success add data line.", req.data, res)
          })
      })
      .catch((error) => {
        resp.ok(false, "Failed add data line.", null, res.status(400));
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
      options.name = sequelize.where(sequelize.fn('LOWER', sequelize.col('line.name')), 'LIKE', '%' + req.query.search.toLowerCase() + '%');
    }
    if ((req.query.sector_id != undefined) && (req.query.sector_id.length > 0)) {
      options.sector_id = sequelize.where(sequelize.col('line.sector_id'), '=', req.query.sector_id);
    }

    let { offsetResult, perPageResult, showPageResult } = pagination.builder(perPage, page);

    return line
      .findAndCountAll({
        include: [{
          model: sector,
        }, {
          model: productCategory,
        }],
        where: options,
        order: [
          [orderBy, sortBy]
        ],
        limit:  perPageResult,
        offset: offsetResult,
      })
      .then(lineResult => {
        let totalPage = Math.ceil(lineResult.count / perPage);
        let data = resp.paging(lineResult.rows, parseInt(showPageResult), parseInt(perPageResult), totalPage, lineResult.count);

        resp.ok(true, "Get list data line.", data, res);
      })
      .catch((error) => {
        resp.ok(false, "Failed get list data line.", null, res.status(400));
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
      options.name = sequelize.where(sequelize.fn('LOWER', sequelize.col('line.name')), 'LIKE', '%' + req.query.search.toLowerCase() + '%');
    }
    if ((req.query.sector_id != undefined) && (req.query.sector_id.length > 0)) {
      options.sector_id = sequelize.where(sequelize.col('line.sector_id'), '=', req.query.sector_id);
    }

    return line
      .findAll({
        include: [{
          model: sector,
        }, {
          model: productCategory,
        }],
        where: options,
        order: [
          [orderBy, sortBy]
        ],
      })
      .then(lineResult => {
        resp.ok(true, "Get all data line.", lineResult, res);
      })
      .catch((error) => {
        resp.ok(false, "Failed get all data lin.", nulle, res.status(400));
        console.log(error);
      });
  },

  detail(req, res) {
    return line
      .findByPk(req.params.id, {
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
              ['delta_t_gr','delta_t_gr'],
              ['sensor_total_status','sensor_total_status'],
              ['sensor_reject_status','sensor_reject_status'],
              ['sensor_good_status','sensor_good_status'],
            ],
            through: {
              model: process_machine
            }
          }]
        }],
      })
      .then(lineResult => {
        if (!lineResult) {
          resp.ok(false, "Line not found.", null, res.status(400));
        }
        resp.ok(true, "Get data line.", lineResult, res);
      })
      .catch((error) => {
        resp.ok(false, "Failed get data line.", null, res.status(400));
        console.log(error);
      });
  },

  update(req, res) {
    return line
      .findByPk(req.params.id)
      .then(line => {
        if (!line) {
          resp.ok(false, "Job line not found.", null, res.status(400));
        }
        return line
          .update({
            name: req.body.name || line.name,
            sector_id: req.body.sector_id || line.sector_id,
            product_category_id: req.body.product_category_id || line.product_category_id,
          })
          .then(line => { 
            return line2
              .findByPk(line.id, {
                include: [{
                  model: sector,
                }, {
                  model: productCategory,
                }],
              })
              .then(line2 => {
                if (!line2) {
                  resp.ok(false, "Failed update line.", null, res.status(400));
                }
                resp.ok(true, "Success update line.", line2.dataValues, res);
              })
              .catch((error) => {
                resp.ok(false, "Failed update line.", null, res.status(400));
                console.log(error);
                reject(error)
              });
          })
          .catch((error) => {
            resp.ok(false, "Failed update line.", null, res.status(400));
            console.log(error);
          });
      })
      .catch((error) => {
        resp.ok(false, "Failed update line.", null, res.status(400));
        console.log(error);
      });
  },

  delete(req, res, next) {
    return line
      .destroy({
        where: {
          id: req.params.id
        }
      })
      .then((lineResult) => {
        req.data = !!lineResult;
        next();
      })
      .catch(err => {
        next(err);
      });
  },
  
  filter(req, res, next) {
    let lineId = 1;
    let sectorId = 1;

    if(req.body.line_id != undefined){
      lineId = req.body.line_id
    }
    if(req.body.sector_id != undefined){
      sectorId = req.body.sector_id
    }

    return line
    .findAll({
      where:{
        id: lineId,
        sector_id: sectorId
      },
      include: [{
        model: process,
        attributes: [['id', 'process_id'],['name','process_name']],
        include: [{
          model: machine,
          attributes: [['id', 'machine_id'],['name', 'machine_name']],
          through: {
            model: process_machine
          }
        }]
      }]
    })
    .then(resultLine => {
      req.data = resultLine;
      next();
    }, (err) => {
      next(err)
    });
  }

};
