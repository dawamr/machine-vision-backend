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
const line = require('./lines');
const process_machines = require('./process_machines');
const machines = require('./machines');
const parameters_index = require('./parameters_controller');
const parameter_category = require('./parameter_category_controller');
const users = require('./users');
const category = require('./downtime_categories');
const form_create = require('./form_create');
const sensors = require('./sensors');
const sensor_categories = require('./sensor_categories');
const data_sensors = require('./data_sensors');
const cal_formula = require('./calculator_formula');
const cal_script = require('./calculator_script');
const cal_io = require('./calculator_io');


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
  category,
  form_create,
  sensors,
  sensor_categories,
  data_sensors,
  cal_formula,
  cal_script,
  cal_io
};
