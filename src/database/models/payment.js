'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      this.belongsTo(models.Product, {
        foreignKey: 'productId', as: 'productPayed'
      })
    }
  }
  Payment.init(
    {
      paymentId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      productId: {
        type: DataTypes.UUID,
        references: {
          model: 'Product',
          key: 'productId'
        }
      },
      userId: {
        type: DataTypes.UUID,
        references: {
          model: 'users',
          key: 'userId'
        }
      },
      transactionId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      paymentAmount: DataTypes.FLOAT,
      paymentStatus: DataTypes.STRING,
      gatewayResponse: DataTypes.STRING,
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
      modelName: 'Payment'
    }
  )
  return Payment
}
