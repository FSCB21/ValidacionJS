const { check } = require('express-validator');

const validateParam = (param) =>{
    return check(param)
            .exists()
            .not()
            .isEmpty()
            .withMessage('Debe registrar un valor')
}

const validateNumber = (param) =>{
    return check(param)
            .isFloat()
            .withMessage('Debe ser un numero')
} 

const validateString = (param) =>{
    return check(param)
            .isAlpha('es-ES',{ignore: ' '})
            .withMessage('Solo puede tener caracteres de la A a la Z')
}

const validateLength = (param, options) =>{
    return check(param)
            .isLength({min: options.min, max: options.max})
            .withMessage(`Tiene que tener minimo ${options.min} y maximo ${options.max} caracteres`)
}

module.exports ={
    validateParam,
    validateNumber,
    validateString,
    validateLength
}