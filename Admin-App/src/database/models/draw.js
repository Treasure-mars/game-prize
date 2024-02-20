'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Draw extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      this.belongsTo(models.Token, { foreignKey: 'drawId', as: 'drawToken' })
    }
  }
  Draw.init(
    {
      drawId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      productId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Product',
          key: 'productId'
        }
      },
      startDate: {
        type: DataTypes.DATE
      },
      endDate: {
        type: DataTypes.DATE
      },
      isPlayed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
<<<<<<< HEAD:Admin-App/src/database/models/draw.js
      winnerCount: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
=======
>>>>>>> 380ac2c4b321506e853d71d64c5bc8449ea5fb2f:src/database/models/draw.js
      winnerFound: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
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
      modelName: 'Draw'
    }
  )
  return Draw
}
