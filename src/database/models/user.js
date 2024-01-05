'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Roles, { foreignKey: 'roleId', as: 'userRole' })
    }
  }
  users.init(
    {
      userId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: true
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: true
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      isLoggedIn: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      channel: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'webapp'
      },
      organization: {
        type: DataTypes.STRING,
        allowNull: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      mustChangePassword: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'player'
      },
      roleId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Roles',
          key: 'roleId'
        }
      },
      otp: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      otpExpiration: {
        type: DataTypes.DATE,
        allowNull: true
      },
      resetToken: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      resetTokenExpires: {
        type: DataTypes.DATE,
        allowNull: true
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
      modelName: 'users'
    }
  )
  users.beforeValidate(async (user, options) => {
    const roleExists = await sequelize.models.Roles.findOne({
      where: { name: user.role }
    })

    if (!roleExists) {
      throw new Error(`Invalid role: ${user.role}`)
    } else {
      user.roleId = roleExists.roleId
    }
  })
  return users
}
