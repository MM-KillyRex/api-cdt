const Joi = require('@hapi/joi')

/**
 * 
 * @param {[{id:string}]} groups Array with following structure {id: 'G12'}
 * @returns {boolean} Boolean validation
 */
const validate = (groups) => {
  const schema = Joi.object().keys({
    id: Joi.string().required()
  })

  const results = groups.map(g => schema.validate(g))
  for (let i = 0; i < results.length; i++) {
    if (results[i].error) return false
  }
  return true
}

module.exports = {
  validate
}