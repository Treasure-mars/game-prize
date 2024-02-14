"use strict"
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Notification extends Model {
        static associate(models){     
        }
    }
    Notification.init(
        {
            notificationId: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false
            },
            userId: {
                type: DataTypes.UUID,
                references: {
                  model: 'users',
                  key: 'userId'
                }
            },
            message: DataTypes.STRING,
            gatewayResponse: DataTypes.STRING,
            status: DataTypes.STRING,
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
            modelName: 'Notification'
        }
    )
    return Notification
}