"use strict"
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        static associate(models){     
        }
    }
    Product.init(
        {
            productId: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUID,
                primaryKey: true
            },
            productName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            description: DataTypes.STRING,
            isAvailable: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            },
            isCallNeeded: DataTypes.BOOLEAN,
            productCost: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            drawPeriod: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            playAmount: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: Date.now()
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: Date.now()
            }
        },
        {
            sequelize,
            modelName: 'Product'
        }
    )
    return Product
}