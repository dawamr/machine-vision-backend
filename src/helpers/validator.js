const Validator = require('fastest-validator')
const valid = new Validator({
  messages: {
    required: 'The {field} can not be empty.',
    stringMin: 'The {field} at least {expected} character long.',
    stringLength: 'The {field} not a valid length.',
    number: 'The {field} not a valid format.'
  }
})
const registerSchema = {
  name: {
    type: 'string',
    min: 3
  },
  username: {
    type: 'username'
  },
  password: {
    type: 'string',
    min: 6
  }
}
const loginSchema = {
  username: {
    type: 'username'
  },
  password: {
    type: 'string',
    min: 6
  }
}

valid.compile(
  registerSchema,
  loginSchema,
)
module.exports = {
  valid,
  registerSchema,
  loginSchema,

}
