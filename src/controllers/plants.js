const plant = require('../models').plant;
const sector = require('../models').sector;
const line = require('../models').line;
const team = require('../models').team;
const resp = require('../views/response');
const pagination = require('../utils/pagination');
const sequelize = require('sequelize');

module.exports = {
  create(req, res){
    return plant
      .create({
        factory_name: req.body.factory_name,
        location: req.body.location,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        logo: req.body.logo,
        total_sector: req.body.total_sector,
        total_line: req.body.total_line,
        total_team: req.body.total_team,
        manufacturing_department: req.body.manufacturing_department,
        engineering_department: req.body.engineering_department,
        qc_department: req.body.qc_department,
        warehouse_department: req.body.warehouse_department,
      })
      .then(plant => {
        resp.ok(true, "Success create plant.", plant.dataValues, res);
      })
      .catch((error) => {
        resp.ok(false, "Failed create plant.", null, res.status(400));
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
      options.factory_name = sequelize.where(sequelize.fn('LOWER', sequelize.col('factory_name')), 'LIKE', '%' + req.query.search + '%');
    }

    let { offsetResult, perPageResult, showPageResult } = pagination.builder(perPage, page);

    return plant
      .findAndCountAll({
        where: options,
        order: [
          [orderBy, sortBy]
        ],
        limit:  perPageResult,
        offset: offsetResult,
      })
      .then(plantResult => {
        let totalPage = Math.ceil(plantResult.count / perPage);
        let data = resp.paging(plantResult.rows, parseInt(showPageResult), parseInt(perPageResult), totalPage, plantResult.count);

        resp.ok(true, "Get list data plant.", data, res);
      })
      .catch((error) => {
        resp.ok(false, "Failed get list data plant.", null, res.status(400));
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

    return plant
      .findAll({
        where: options,
        order: [
          [orderBy, sortBy]
        ],
      })
      .then(plantResult => {
        resp.ok(true, "Get all data plant.", plantResult, res);
      })
      .catch((error) => {
        resp.ok(false, "Failed get all data plant.", null, res.status(400));
        console.log(error);
      });
  },

  detail(req, res) {
    return plant
      .findByPk(req.params.id)
      .then(plantResult => {
        if (!plantResult) {
          resp.ok(false, "Plant not found.", null, res.status(400));
        }

        return sector
          .count()
          .then(sectorCount => {
            
            return line
              .count()
              .then(lineCount => {
                
                return team
                  .count()
                  .then(teamCount => {
                    plantResult.total_sector = sectorCount;
                    plantResult.total_line = lineCount;
                    plantResult.total_team = teamCount;

                    resp.ok(true, "Get data plant.", plantResult, res);
                  })
                  .catch((error) => {
                    resp.ok(false, "Failed count team.", null, res.status(400));
                    console.log(error);
                  });
              })
              .catch((error) => {
                resp.ok(false, "Failed count line.", null, res.status(400));
                console.log(error);
              });
          })
          .catch((error) => {
            resp.ok(false, "Failed count sector.", null, res.status(400));
            console.log(error);
          });
      })
      .catch((error) => {
        resp.ok(false, "Failed get plant.", null, res.status(400));
        console.log(error);
      });
  },

  update(req, res) {
    return plant
      .findByPk(req.params.id)
      .then(plant => {
        if (!plant) {
          resp.ok(false, "plant not found.", null, res.status(400));
        }

        return plant
          .update({
            factory_name: req.body.factory_name || plant.factory_name,
            location: req.body.location || plant.location,
            latitude: req.body.latitude || plant.latitude,
            longitude: req.body.longitude || plant.longitude,
            logo: req.body.logo || plant.logo,
            total_sector: req.body.total_sector || plant.total_sector,
            total_line: req.body.total_line || plant.total_line,
            total_team: req.body.total_team || plant.total_team,
            manufacturing_department: req.body.manufacturing_department || plant.manufacturing_department,
            engineering_department: req.body.engineering_department || plant.engineering_department,
            qc_department: req.body.qc_department || plant.qc_department,
            warehouse_department: req.body.warehouse_department || plant.warehouse_department,
          })
          .then(plant => {
            resp.ok(true, "Success update plant.", plant.dataValues, res);
          })
          .catch((error) => {
            resp.ok(false, "Failed update plant.", null, res.status(400));
            console.log(error);
          });
      })
      .catch((error) => {
        resp.ok(false, "Failed update plant.", null, res.status(400));
        console.log(error);
      });
  },

  delete(req, res) {
    return plant
      .findByPk(req.params.id)
      .then(plant => {
        if (!plant) {
          resp.ok(false, "plant not found.", null, res.status(400));
        }

        return plant
          .destroy()
          .then(plant => {
            resp.ok(true, "Success delete plant.", plant.dataValues, res);
          })
          .catch((error) => {
            resp.ok(false, "Failed delete plant.", null, res.status(400));
            console.log(error);
          });
      })
      .catch((error) => {
        resp.ok(false, "Failed delete plant.", null, res.status(400));
        console.log(error);
      });
  }
};
