const FormSubCategory = require('./../models/').form_sub_category;

module.exports = {

    list(req, res) {
        return FormSubCategory
        .findAll({
        include: 'category',
        order: [
            ['createdAt', 'DESC'],
            ],
        })
        .then(list => res.status(200).send(list))
        .catch(error => res.status(400).send(error));
    },

    create(req,res){
        return FormSubCategory
        .create({
          name: req.body.name,
        })
        .then(create => res.status(201).send(create))
        .catch(error => res.status(400).send(error));
    },



}