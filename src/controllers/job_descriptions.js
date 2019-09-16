const jobDescription = require('../models').job_description;
const jobDescription2 = require('../models').job_description;
const department = require('../models').department;
const sector = require('../models').sector;
const resp = require('../views/response');
const pagination = require('../utils/pagination');
const sequelize = require('sequelize');
const Op = sequelize.Op;


module.exports = {
  create(req, res){
    return jobDescription
      .create({
        name: req.body.name,
        department_id: req.body.department_id,
        sector_id: req.body.sector_id,
        order: req.body.order,
      })
      .then(jobDescriptionCreated => {
        return jobDescription
          .findByPk(jobDescriptionCreated.id, {
            include: [{
              model: department,
            }, {
              model: sector,
            }],
          })
          .then(jobDescriptionResult => {
            if (!jobDescriptionResult) {
              resp.ok(false, "Failed create job description.", null, res.status(400));
            }
            resp.ok(true, "Success create job description.", jobDescriptionResult, res);
          })
          .catch((error) => {
            resp.ok(false, "Failed create job description.", null, res.status(400));
            console.log(error);
          });
      })
      .catch((error) => {
        resp.ok(false, "Failed create job description.", null, res.status(400));
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
      options.name = sequelize.where(sequelize.fn('LOWER', sequelize.col('job_description.name')), 'LIKE', '%' + req.query.search + '%');
    }

    let { offsetResult, perPageResult, showPageResult } = pagination.builder(perPage, page);

    return jobDescription
      .findAndCountAll({
        include: [{
          model: department,
        }, {
          model: sector,
        }],
        where: options,
        order: [
          [orderBy, sortBy]
        ],
        limit:  perPageResult,
        offset: offsetResult,
      })
      .then(jobDescriptionResult => {
        let totalPage = Math.ceil(jobDescriptionResult.count / perPage);
        let data = resp.paging(jobDescriptionResult.rows, parseInt(showPageResult), parseInt(perPageResult), totalPage, jobDescriptionResult.count);

        resp.ok(true, "Get list data job description.", data, res);
      })
      .catch((error) => {
        resp.ok(false, "Failed get list data job description.", null, res.status(400));
        console.log(error);
      });
  },

  listAll(req, res) {

    return jobDescription
      .findAll({
        include: [{
          model: department,
        }, {
          model: sector,
        }],
        where: {
          name: {
            [Op.like]: (req.query.name) ? '%' + req.query.name + '%' : '%'
          }
        }
      })
      .then(jobDescriptionResult => {
        resp.ok(true, "Get all data job description.", jobDescriptionResult, res);
      })
      .catch((error) => {
        resp.ok(false, "Failed get all data job description.", null, res.status(400));
        console.log(error);
      });
  },

  detail(req, res) {
    return jobDescription
      .findByPk(req.params.id, {
        include: [{
          model: department,
        }, {
          model: sector,
        }],
      })
      .then(jobDescriptionResult => {
        if (!jobDescriptionResult) {
          resp.ok(false, "job description not found.", null, res.status(400));
        }
        resp.ok(true, "Get data job description.", jobDescriptionResult, res);
      })
      .catch((error) => {
        resp.ok(false, "Failed get job description.", null, res.status(400));
        console.log(error);
      });
  },

  update(req, res) {
    return jobDescription
      .findByPk(req.params.id)
      .then(jobDescription => {
        if (!jobDescription) {
          resp.ok(false, "Job description not found.", null, res.status(400));
        }
        return jobDescription
          .update({
            name: req.body.name || jobDescription.name,
            department_id: req.body.department_id || jobDescription.department_id,
            sector_id: req.body.sector_id || jobDescription.sector_id,
          })
          .then(jobDescription => { 
            return jobDescription2
              .findByPk(jobDescription.id, {
                include: [{
                  model: department,
                }, {
                  model: sector,
                }],
              })
              .then(jobDescription2 => {
                if (!jobDescription2) {
                  resp.ok(false, "Failed update job description.", null, res.status(400));
                }
                resp.ok(true, "Success update job description.", jobDescription2.dataValues, res);
              })
              .catch((error) => {
                resp.ok(false, "Failed update job description.", null, res.status(400));
                console.log(error);
                reject(error)
              });
          })
          .catch((error) => {
            resp.ok(false, "Failed update job description.", null, res.status(400));
            console.log(error);
          });
      })
      .catch((error) => {
        resp.ok(false, "Failed update job description.", null, res.status(400));
        console.log(error);
      });
  },

  delete(req, res) {
    return jobDescription
      .findByPk(req.params.id)
      .then(jobDescription => {
        if (!jobDescription) {
          resp.ok(false, "Job description not found.", null, res.status(400));
        }

        return jobDescription
          .destroy()
          .then(jobDescription => {
            resp.ok(true, "Success delete job description.", jobDescription.dataValues, res);
          })
          .catch((error) => {
            resp.ok(false, "Failed delete job description.", null, res.status(400));
            console.log(error);
          });
      })
      .catch((error) => {
        resp.ok(false, "Failed delete job description.", null, res.status(400));
        console.log(error);
      });
  }
};
