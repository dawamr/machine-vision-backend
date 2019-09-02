const Reason = require('../models').reason;
const Category = require('../models').category;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
    create(req, res, next) {
        let reasonObj = req.body;
        return Reason
            .create(reasonObj)
            .then(reason => {
                return CategoryReason
                    .create({
                        reason_id: reason.dataValues.id,
                        category_id: reasonObj.category_id
                    })
                    .then(result => {
                        req.data = reason;
                        next();
                    }, (err) => {
                        next(err);
                    })
            })
            .catch(err => {
                next(err);
            })
    },

    listAll(req, res, next) {
        return Reason
            .findAll({
                include: [{
                    model: Category,
                    through: CategoryReason,
                    attributes: [
                        ['name', 'category_name']
                    ]
                }]
            })
            .then(result => {
                req.data = result;
                next();
            }, (err) => {
                next(err);
            })
    },

    list(req, res, next) {

        let orderBy = 'created_at';
        let sortBy = 'desc';

        let paramsObj = {
            query: req.query,
            name: req.body.name,
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
                    name: {
                        [Op.like]: (queryParams.name) ? '%' + queryParams.name + '%' : '%'
                    }
                },
                include: [{
                    model: Category,
                    through: CategoryReason,
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
                    through: CategoryReason,
                    attributes: [
                        ['name', 'category_name']
                    ]
                }]
            }).then(result => {
                if (result) {
                    req.data = result;
                    next();
                } else {
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
                    .then(reason => {
                        console.log(Reason.dataValues.id);
                        // if (reasonObj.category_id != undefined) {
                        //     return CategoryReason
                        //         .update({
                        //             category_id: reasonObj.category_id
                        //         })
                        //         .then(result => {
                        //             req.data = Reason;
                        //             next();
                        //         }, (err) => {
                        //             next(err);
                        //         })
                        // }
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