const { validateResult } = require('../helpers/validateHelper');
const { validateParam, validateNumber, validateString, validateLength } = require('./validations');


const validationProducto=[
    validateParam('nombre'),
    validateString('nombre'),
    validateLength('nombre', {min:3, max:50}),
    validateParam('modelo'),
    validateLength('modelo', {min:2, max:50}),
    validateNumber('precio'),
    (req,res,next)=> validateResult(req,res,next)
]

module.exports = {
    validationProducto
}
