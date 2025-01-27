'use strict'
const { generateRandomNumber } = require('../../helpers/randomNumberGenerator')
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Token extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      this.belongsToMany(models.Role, {
        through: models.RolePermission,
        foreignKey: { name: 'permissionId', allowNull: true },
        as: 'rolePermissions'
      })
    }
  }
  Token.init(
    {
      tokenId: {
        type: DataTypes.INTEGER,
        // allowNull: false,
        unique: true
      },
      userId: {
        type: DataTypes.UUID,
        references: {
          model: 'users',
          key: 'userId'
        }
      },
      productId: {
        type: DataTypes.UUID,
        references: {
          model: 'Products',
          key: 'productId'
        }
      },
      drawId: {
        type: DataTypes.UUID,
        references: {
          model: 'Draw',
          key: 'drawId'
        }
      },
      referenceId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
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
      modelName: 'Token',
      hooks: {
        beforeCreate: (token, options) => {
          token.tokenId = generateRandomNumber(60000000, 69999999);
        },
      }
    }
  )
  return Token
}
