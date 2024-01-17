'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      this.belongsToMany(models.Permissions, {
        through: models.RolePermissions,
        foreignKey: { name: 'roleId', allowNull: true },
        as: 'rolePermissions'
      })
      this.hasMany(models.users, { foreignKey: 'roleId', as: 'users' })
    }
  }
  Role.init(
    {
      roleId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      name: DataTypes.STRING,
      description: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Role'
    }
  )
  return Role
}
