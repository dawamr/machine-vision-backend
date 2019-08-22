const shift = require('../models').shift;
const resp = require('../views/response');
const pagination = require('../utils/pagination');
const sequelize = require('sequelize')

module.exports = {
  create(req, res){
    let timeStart = new Date("01/01/2007 " + req.body.time_start).getTime();
    let timeEnd = new Date("01/01/2007 " + req.body.time_end).getTime();
    
    if (timeStart > timeEnd) {
      timeEnd = new Date("01/02/2007 " + req.body.time_end).getTime();
    }

    let duration = timeEnd - timeStart;  

    return shift
      .create({
        name: req.body.name,
        time_start: req.body.time_start,
        time_end: req.body.time_end,
        duration: duration,
      })
      .then(shift => {
        resp.ok(true, "Success create shift.", shift.dataValues, res)
      })
      .catch((error) => {
        resp.ok(false, "Failed create shift.", null, res.status(400))
        console.log(error)
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
      options.name = sequelize.where(sequelize.fn('LOWER', sequelize.col('name')), 'LIKE', '%' + req.query.search + '%');
    }

    let { offsetResult, perPageResult, showPageResult } = pagination.builder(perPage, page);

    return shift
      .findAndCountAll({
        where: options,
        order: [
          [orderBy, sortBy]
        ],
        limit:  perPageResult,
        offset: offsetResult,
      })
      .then(shift => {
        let totalPage = Math.ceil(shift.count / perPage)
        resp.paging(true, "Get list data shift.", shift.rows, parseInt(showPageResult), parseInt(perPageResult), totalPage, shift.count, res)
      })
      .catch((error) => {
        resp.ok(false, "Failed get list data shift.", null, res.status(400))
        console.log(error)
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

    return shift
      .findAll({
        where: options,
        order: [
          [orderBy, sortBy]
        ],
      })
      .then(shift => {
        resp.ok(true, "Get all data shift.", shift, res)
      })
      .catch((error) => {
        resp.ok(false, "Failed get all data shift.", null, res.status(400))
        console.log(error)
      });
  },
  detail(req, res) {
    return shift
      .findByPk(req.params.id)
      .then(shift => {
        if (!shift) {
          resp.ok(false, "Shift not found.", null, res.status(400))
        }
        resp.ok(true, "Get data shift.", shift, res)
      })
      .catch((error) => {
        resp.ok(false, "Failed get shift.", null, res.status(400))
        console.log(error)
      });
  },
  update(req, res) {
    return shift
      .findByPk(req.params.id)
      .then(shift => {
        if (!shift) {
          resp.ok(false, "Shift not found.", null, res.status(400))
        }
        return shift
          .update({
            name: req.body.name || shift.name,
            order: req.body.order || shift.order,
          })
          .then(shift => {
            resp.ok(true, "Success update shift.", shift.dataValues, res)
          })
          .catch((error) => {
            resp.ok(false, "Failed update shift.", null, res.status(400))
            console.log(error)
          });
      })
      .catch((error) => {
        resp.ok(false, "Failed update shift.", null, res.status(400))
        console.log(error)
      });
  },
  delete(req, res) {
    return shift
      .findByPk(req.params.id)
      .then(shift => {
        if (!shift) {
          resp.ok(false, "Shift not found.", null, res.status(400))
        }
        return shift
          .destroy()
          .then(shift => {
            resp.ok(true, "Success delete shift.", shift.dataValues, res)
          })
          .catch((error) => {
            resp.ok(false, "Failed delete shift.", null, res.status(400))
            console.log(error)
          });
      })
      .catch((error) => {
        resp.ok(false, "Failed delete shift.", null, res.status(400))
        console.log(error)
      });
  }
};
