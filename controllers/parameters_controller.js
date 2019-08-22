const parameters_index = require('../models').parameters_index;

module.exports = {
    create(req,res){
        // var cat = {
        //     model: parameters_index,
        //     as: 'category',
        //     attributes: ['name'],
        // }
        // if (req.query.filter_cat != undefined) {
        //     cat.where = {
        //         id: req.query.filter_cat
        //     }
        // }
        return parameters_index
        .create({
            name : req.body.name
            
        }
        )
        .then(err_parameters => res.status(201).send(err_parameters))
        .catch(err => res.status(400).send(err))
    },
    update(req,res){
        return parameters_index
        .update({ 
            
               })
        .then(err_parameters => res.status(201).send(err_parameters))
        .catch(err => res.status(400).send(err))
    },
    destroy(req,res){
        return parameters_index
        .destroy({

        })
        .then(err_parameters => res.status(201).send(err_parameters))
        .catch(err => res.status(400).send(err))
    },
    list(req,res){
        return parameters_index
        .findAll({

        })
        .then(err_parameters => res.status(201).send(err_parameters))
        // .paginate({page, pageSize})
        .catch(err => res.status(400).send(err))
    },
    search(req,res){
        return parameters_index
        .findAll({
        })

    }
};