const product = require('../models').product;
const productCategory = require('../models').product_category;
const resp = require('../views/response');
const pagination = require('../utils/pagination');
const sequelize = require('sequelize');

module.exports = {
  create(req, res){
    return product
      .create({
        name: req.body.name,
        product_category_id: req.body.product_category_id,
      })
      .then(product => {
        resp.ok(true, "Success create product.", product.dataValues, res);
      })
      .catch((error) => {
        resp.ok(false, "Failed create product.", null, res.status(400));
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
      options.name = sequelize.where(sequelize.fn('LOWER', sequelize.col('name')), 'LIKE', '%' + req.query.search + '%');
    }

    let { offsetResult, perPageResult, showPageResult } = pagination.builder(perPage, page);

    return product
      .findAndCountAll({
        include: [{
          model: productCategory,
        }],
        where: options,
        order: [
          [orderBy, sortBy]
        ],
        limit:  perPageResult,
        offset: offsetResult,
      })
      .then(productResult => {
        let totalPage = Math.ceil(productResult.count / perPage);
        let data = resp.paging(productResult.rows, parseInt(showPageResult), parseInt(perPageResult), totalPage, productResult.count);

        resp.ok(true, "Get list data product.", data, res);
      })
      .catch((error) => {
        resp.ok(false, "Failed get list data product.", null, res.status(400));
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

    return product
      .findAll({
        include: [{
          model: productCategory,
        }],
        where: options,
        order: [
          [orderBy, sortBy]
        ],
      })
      .then(productResult => {
        resp.ok(true, "Get all data product.", productResult, res);
      })
      .catch((error) => {
        resp.ok(false, "Failed get all data product.", null, res.status(400));
        console.log(error);
      });
  },

  detail(req, res) {
    return product
      .findByPk(req.params.id, {
        include: [{
          model: productCategory,
        }],
      })
      .then(productResult => {
        if (!productResult) {
          resp.ok(false, "product not found.", null, res.status(400));
        }
        resp.ok(true, "Get data product.", productResult, res);
      })
      .catch((error) => {
        resp.ok(false, "Failed get product.", null, res.status(400));
        console.log(error);
      });
  },

  update(req, res) {
    return product
      .findByPk(req.params.id)
      .then(product => {
        if (!product) {
          resp.ok(false, "product not found.", null, res.status(400));
        }

        return product
          .update({
            name: req.body.name || product.name,
            product_category_id: req.body.product_category_id || product.product_category_id,
          })
          .then(product => {
            resp.ok(true, "Success update product.", product.dataValues, res);
          })
          .catch((error) => {
            resp.ok(false, "Failed update product.", null, res.status(400));
            console.log(error);
          });
      })
      .catch((error) => {
        resp.ok(false, "Failed update product.", null, res.status(400));
        console.log(error);
      });
  },

  delete(req, res) {
    return product
      .findByPk(req.params.id)
      .then(product => {
        if (!product) {
          resp.ok(false, "product not found.", null, res.status(400));
        }

        return product
          .destroy()
          .then(product => {
            resp.ok(true, "Success delete product.", product.dataValues, res);
          })
          .catch((error) => {
            resp.ok(false, "Failed delete product.", null, res.status(400));
            console.log(error);
          });
      })
      .catch((error) => {
        resp.ok(false, "Failed delete product.", null, res.status(400));
        console.log(error);
      });
  }
};
