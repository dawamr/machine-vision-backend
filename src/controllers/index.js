const form_category = require('./form-category');
const form_sub_category = require('./form-sub-category');
const form_form = require('./form-form');
const form_action = require('./form-action');
const departments = require('./departments');
const shifts = require('./shifts');
const plants = require('./plants');
const teams = require('./teams');
const products = require('./products');
const product_categories = require('./product_categories');
const job_descriptions = require('./job_descriptions');
const sectors = require('./sectors');
const line = require('./line');
const process_machines = require('./process_machines');
const machines = require('./machines');
const parameters_index = require('./parameters_controller');
const parameter_category = require('./parameter_category_controller');
const users = require('./users');
const category = require('./category');

module.exports = {
  form_category,
  form_sub_category,
  form_form,
  form_action,
  departments,
  shifts,
  plants,
  teams,
  products,
  product_categories,
  job_descriptions,
  sectors,
  line,
  process_machines,
  machines,   
  parameters_index,
  parameter_category,
  machines,
  users,
  category
};
