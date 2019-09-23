// console.log(Object.keys(require('../models')));
const formula = require('../models').calculator_formula;
const sector = require('../models').sector;
const line = require('../models').line;
const proses_machine = require('../models').process_machine;
const proses = require('../models').process;
const machine = require('../models').machine;

const Sequelize = require('sequelize');
const Op = Sequelize.Op

module.exports = {

    listAll(req, res){
        // let sensors = sensor.findAll({})
        // let lines = line.findAll({})
        line.findAll({
            attributes:['name'],
            include: [{
                model: sector,
              }]
        })
        .then(result => res.status(201).send(result))
        .catch(error => res.status(400).send(error));
        // Promise.all([sensors,lines])
        // .then(result => res.status(201).send(result))
        // .catch(error => res.status(400).send(error));
    }

}