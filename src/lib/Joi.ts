const Joi = require('@hapi/joi')

Joi.validate = (param, schema, options = {
  convert: true,
  noDefaults: true,
  abortEarly: false,
  stripUnknown: true,
  allowUnknown: false
}) => {
  const {value, error} = schema.validate(param, options)
  if (error) {
    throw error
  }
  // 返回处理过的参数
  return value
}

export default Joi
