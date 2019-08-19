const team = require('../models').team;
const resp = require('../constant/constant')
  const { check, validationResult } = require('express-validator');

module.exports = {
  create(req, res){
    return team
      .create({
        name: req.body.name,
        order: req.body.order,
      })
      .then(team => {
        resp.ok(true, "Success create team.", team.dataValues, res)
      })
      .catch((error) => {
        resp.ok(false, "Failed create team.", null, res)
        console.log(error)
      });
  },
  list(req, res) {
    return team
      .findAll()
      .then(team => {
        resp.ok(true, "Get all data team.", team, res)
      })
      .catch((error) => {
        resp.ok(false, "Failed get data team.", null, res)
        console.log(error)
      });
  },
  detail(req, res) {
    return team
      .findByPk(req.params.id)
      .then(team => {
        if (!team) {
          resp.ok(false, "Team not found.", null, res)
        }
        resp.ok(true, "Get all data team.", team, res)
      })
      .catch((error) => {
        resp.ok(false, "Failed get team.", null, res)
        console.log(error)
      });
  },
  update(req, res) {
    return team
      .findByPk(req.params.id)
      .then(team => {
        if (!team) {
          resp.ok(false, "Team not found.", null, res)
        }
        return team
          .update({
            name: req.body.name || team.name,
            order: req.body.order || team.order,
          })
          .then(team => {
            resp.ok(true, "Success update team.", team.dataValues, res)
          })
          .catch((error) => {
            resp.ok(false, "Failed update team.", null, res)
            console.log(error)
          });
      })
      .catch((error) => {
        resp.ok(false, "Failed update team.", null, res)
        console.log(error)
      });
  }
};