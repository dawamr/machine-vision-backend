const productCategory = require('../models').product_category;
const product = require('../models').product;
const resp = require('../views/response');
const pagination = require('../utils/pagination');
const sequelize = require('sequelize');
const Op = sequelize.Op;


module.exports = {
  create(req, res){
    return productCategory
      .create({
        name: req.body.name,
      })
      .then(productCategory => {
        resp.ok(true, "Success create product_category.", productCategory.dataValues, res);
      })
      .catch((error) => {
        resp.ok(false, "Failed create product_category.", null, res.status(400));
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
      options.name = sequelize.where(sequelize.fn('LOWER', sequelize.col('product_category.name')), 'LIKE', '%' + req.query.search.toLowerCase() + '%');
    }

    let { offsetResult, perPageResult, showPageResult } = pagination.builder(perPage, page);

    return productCategory
      .findAndCountAll({
        include: [{
          model: product,
        }],
        where: options,
        order: [
          [orderBy, sortBy]
        ],
        limit:  perPageResult,
        offset: offsetResult,
      })
      .then(productCategoryResult => {
        let totalPage = Math.ceil(productCategoryResult.count / perPage);
        let data = resp.paging(productCategoryResult.rows, parseInt(showPageResult), parseInt(perPageResult), totalPage, productCategoryResult.count);

        resp.ok(true, "Get list data product_category.", data, res);
      })
      .catch((error) => {
        resp.ok(false, "Failed get list data product_category.", null, res.status(400));
        console.log(error);
      });
  },

  listAll(req, res, next) {
    return productCategory
      .findAll({where: {
        name: {
          [Op.like]: (req.query.search) ? '%' + req.query.search + '%' : '%'
        }
      }
    })
      .then(processMachineResult => {
        resp.ok(true, "Get all data product_category.", processMachineResult, res);
      })
      .catch((error) => {
        resp.ok(false, "Failed get all data product_category.", null, res.status(400));
        console.log(error);
      });
  },

  detail(req, res) {
    return productCategory
      .findByPk(req.params.id, {
        include: [{
          model: product,
        }],
      })
      .then(productCategoryResult => {
        console.log(productCategoryResult);
        if (!productCategoryResult) {
          resp.ok(false, "productCategory not found.", null, res.status(400));
        }
        resp.ok(true, "Get data product_category.", productCategoryResult, res);
      })
      .catch((error) => {
        resp.ok(false, "Failed get product_category.", null, res.status(400));
        console.log(error);
      });
  },

  update(req, res) {
    return productCategory
      .findByPk(req.params.id)
      .then(productCategory => {
        if (!productCategory) {
          resp.ok(false, "Product_category not found.", null, res.status(400));
        }
        return productCategory
          .update({
            name: req.body.name || productCategory.name,
          })
          .then(productCategory => {
            resp.ok(true, "Success update product_category.", productCategory.dataValues, res);
          })
          .catch((error) => {
            resp.ok(false, "Failed update product_category.", null, res.status(400));
            console.log(error);
          });
      })
      .catch((error) => {
        resp.ok(false, "Failed update product_category.", null, res.status(400));
        console.log(error);
      });
  },

  delete(req, res) {
    return productCategory
      .findByPk(req.params.id)
      .then(productCategory => {
        if (!productCategory) {
          resp.ok(false, "Product_category not found.", null, res.status(400));
        }

        return productCategory
          .destroy()
          .then(productCategory => {
            resp.ok(true, "Success delete product_category.", productCategory.dataValues, res);
          })
          .catch((error) => {
            resp.ok(false, "Failed delete product_category.", null, res.status(400));
            console.log(error);
          });
      })
      .catch((error) => {
        resp.ok(false, "Failed delete product_category.", null, res.status(400));
        console.log(error);
      });
  }
};
