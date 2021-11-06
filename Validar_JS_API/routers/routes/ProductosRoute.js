const router = require('express').Router();

const Validaciones = require('../../validations/ValidationProductos')

const ProductosController = require('../../controllers/ProductosController')

router.get('/', ProductosController.getProductos);

router.post('/', Validaciones.validationProducto, ProductosController.setProducto);

router.get('/:id', ProductosController.getProducto);

router.put('/', Validaciones.validationProducto, ProductosController.updateProducto);

router.delete('/:id', ProductosController.deleteProducto);

module.exports = router;