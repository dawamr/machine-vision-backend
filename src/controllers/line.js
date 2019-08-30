
const line = require('../models').line;
const process_machine = require('../models').process_machine;
const machine = require('../models').machine;
const process = require('../models').process;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


module.exports = {
  create(req, res, next){
      let lineObj = req.body;
    return line
      .create(lineObj)
      .then(newPlant => {
          req.data = newPlant;
        next();
      }, (err) => {
        next(err)
      });
  },

  list(req, res, next) {

    let orderBy = 'created_at';
    let sortBy = 'desc';

    let paramsObj = {
      query: req.query,
      name:req.body.name,
      pageSize: req.query.limit,
      page: req.query.page,
      sort: req.query.sort,
    };

    if ((paramsObj.sort != undefined) && (paramsObj.sort.length > 0)) {
      sortType = paramsObj.sort;
    }
    let queryParams = paramsObj.query;

    return line
      .findAndCountAll({
        where: {
          name: {
            [Op.like]: (queryParams.name) ? '%' + queryParams.name + '%' : '%'
          }
        },
        order: [ [orderBy , sortBy]],
        offset: (paramsObj.page - 1) * paramsObj.pageSize,
        limit: paramsObj.pageSize
      })
      .then((lineResult) => {
        if (lineResult) {
          req.pagination = {
            page: paramsObj.page,
            pageSize: paramsObj.pageSize,
            rowCount: lineResult.count,
            pageCount: 0
          };
          req.data = lineResult.rows;
          next();
        }
      })
      .catch(err => {
        next(err)
      });
  },

  listAll(req, res, next) {
    return line
    .findAll()
    .then(resultLine => {
        req.data = resultLine;
        next();
      }, (err) => {
        next(err)
      });
  },

  detail(req, res, next) {
    return line
      .findOne({
        where: {
          id: req.params.id
        }
      }).then(line => {
        if (line) {
          req.data = line;
          next();
        } else {
          let err = Error('Line not found');
          next(err);
        }
      }).catch((err) => {
        next(err);
      });
  },

  update(req, res, next) {
    let lineObj = req.body;
    return line
      .findByPk(req.params.id)
      .then(line => {
        if (!line){
        let err = Error('Line not found');
        next(err);}

        return line
        .update(lineObj)
            .then(lineResult => {
              req.data = lineResult;
              next();
          })
          .catch(err => {
              next(err);
          });
      })
      .catch(err => {
        next(err);
      })
    
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
        model: machine,
        attributes: [['name','machine_name']],
        through: {
          model: process_machine
        }
      },{
        model: process,
        attributes: [['name','process_name']],
        through: {
          model: process_machine
        }
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
