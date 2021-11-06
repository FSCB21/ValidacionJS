const { Model, DataTypes } = require('sequelize');
const sequelize = require('../conDB');

class ProductosModel extends Model {}
ProductosModel.init({
    
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true 
    },

    nombre:{
        type: DataTypes.STRING(50),
        allowNull: false
    },

    modelo:{
        type: DataTypes.STRING(50),
        allowNull: false
    },
    
    precio: DataTypes.DOUBLE
    
}, {
    sequelize,
    modelName: "Productos",
    timestamps: false,
    freezeTableName: true
});

module.exports = ProductosModel;