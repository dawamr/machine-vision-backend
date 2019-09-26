const Reason = require('../models').downtime_reason;
const reason = require('../models').downtime_reason;
const Category = require('../models').downtime_category;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
    create(req, res, next) {
        let reasonObj = req.body;
        return Reason
            .create(reasonObj)
            .then(result => {
                return Reason.findByPk(result.dataValues.id, {
                        include: [{
                            model: Category,
                            attributes: [
                                ['name', 'category_name']
                            ]
                        }]
                    })
                    .then(newData => {
                        req.data = newData;
                        next();
                    })
            }, (err) => {
                next(err);
            })
    },

    listAll(req, res, next) {
        if ((req.query.category_id != null) && (req.query.impact != undefined)) {
            return Reason
                .findAll({
                    where: {
                        category_id: req.query.category_id,
                        impact: {
                            [Op.like]: (req.query.impact) ? '%' + req.query.impact + '%' : '%'
                        }
                    },
                    include: [{
                        model: Category,
                        attributes: [
                            ['name', 'category_name']
                        ],
                    }]
                })
                .then(result => {
                    req.data = result;
                    next();
                }, (err) => {
                    next(err);
                })
        }
        if (req.query.impact != undefined) {
            return Reason
                .findAll({
                    where: {
                        impact: {
                            [Op.like]: (req.query.impact) ? '%' + req.query.impact + '%' : '%'
                        }
                    },
                    include: [{
                        model: Category,
                    }]
                })
                .then(result => {
                    req.data = result;
                    next();
                }, (err) => {
                    next(err);
                })
        }
        if (req.query.category_id != null) {
            return Reason
                .findAll({
                    where: {
                        category_id: req.query.category_id
                    },
                    include: [{
                        model: Category,
                    }]
                })
                .then(result => {
                    req.data = result;
                    next();
                }, (err) => {
                    next(err);
                })
        }
         else {
            return Reason
                .findAll({ include: [{
                    model: Category,
                }]})
                .then(result => {
                    req.data = result;
                    next();
                }, (err) => {
                    next(err);
                })
        }

    },

    list(req, res, next) {

        let orderBy = 'created_at';
        let sortBy = 'desc';

        let paramsObj = {
            query: req.query,
            impact: req.body.impact,
            pageSize: req.query.limit,
            page: req.query.page,
            sort: req.query.sort,
        };

        if ((paramsObj.sort != undefined) && (paramsObj.sort.length > 0)) {
            sortType = paramsObj.sort;
        }
        let queryParams = paramsObj.query;

        return Reason
            .findAndCountAll({
                where: {
                    impact: {
                        [Op.like]: (queryParams.impact) ? '%' + queryParams.impact + '%' : '%'
                    }
                },
                include: [{
                    model: Category,
                    attributes: [
                        ['name', 'category_name']
                    ]
                }],
                order: [
                    [orderBy, sortBy]
                ],
                offset: (paramsObj.page - 1) * paramsObj.pageSize,
                limit: paramsObj.pageSize
            })
            .then((result) => {
                if (result) {
                    req.data = result.rows;
                    next();
                }
            })
            .catch(err => {
                next(err)
            });
    },

    detail(req, res, next) {
        return Reason
            .findOne({
                where: {
                    id: req.params.id
                },
                include: [{
                    model: Category,
                    attributes: [
                        ['name', 'category_name']
                    ]
                }]
            }).then(result => {
                if (result) {
                    req.data = result;
                    next();
                } else {
                    category
                    let err = Error('Reason not found');
                    next(err);
                }
            }).catch((err) => {
                next(err);
            });
    },

    update(req, res, next) {
        let reasonObj = req.body;
        console.log(req.params.id)
        return Reason
            .findByPk(req.params.id)
            .then(Reason => {
                if (!Reason) {
                    let err = Error('Reason not found');
                    next(err);
                }

                return Reason
                    .update(reasonObj)
                    .then(Result => {
                        return reason.findByPk(Result.dataValues.id, {
                                include: [{
                                    model: Category,
                                    attributes: [
                                        ['name', 'category_name']
                                    ]
                                }]
                            })
                            .then(newData => {
                                req.data = newData;
                                next();
                            })
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
        return Reason
            .destroy({
                where: {
                    id: req.params.id
                }
            })
            .then((result) => {
                req.data = !!result;
                next();
            })
            .catch(err => {
                next(err);
            });
    },
}