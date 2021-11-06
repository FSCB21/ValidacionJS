const ProductosModel = require('../database/models/ProductosModel')
const { validationResult } = require('express-validator');
const { getPagination, getPagingData } = require('../helpers/paginationHelper');
const { findByPk } = require('../database/models/ProductosModel');

const getProductos = async(req,res) => {
    const { page, size} = req.query;
    const { limit, offset } = getPagination(page, size);
    const productos = await ProductosModel.findAndCountAll({limit, offset })

    const respuesta = getPagingData(productos, page, limit)

     res.json(respuesta);
}

const setProducto = async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {nombre, modelo, precio} = req.body

    await ProductosModel.create({
        nombre: nombre,
        modelo: modelo,
        precio: precio
    }).catch(err=>{
        res.json({err:'Error al crear el producto'});
   });
    
   res.json({success:'Producto Creado Con Exito'});
}

const getProducto = async (req,res) =>{
    const producto = await ProductosModel.findByPk(req.params.id)
     res.json(producto);
}

const updateProducto = async(req, res) => {
    await ProductosModel.update({
        nombre: req.body.nombre,
        modelo: req.body.modelo,
        precio: req.body.precio
    },{
        where:{id:req.body.id}
    }).catch(err=>{
        res.json({err:"Error al actualizar el producto"});
    });

     res.json({success:'Se Ha Actualizado El Producto'});
}

const deleteProducto = async(req,res) => {
    await ProductosModel.destroy({
        where:{id:req.params.id}
    }).catch(err=>{
        res.json({err:"Error al borrar el producto"});
    });

    res.json({success:"Se a borrado el producto con exito"});
}

module.exports = {
    getProductos,
    setProducto,
    getProducto,
    updateProducto,
    deleteProducto
}