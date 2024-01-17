'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Permission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      this.belongsToMany(models.Role, {
        through: models.RolePermissions,
        foreignKey: { name: 'permissionId', allowNull: true },
        as: 'rolePermissions'
      })
    }
  }
  Permission.init(
    {
      permissionId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      name: DataTypes.STRING,
      description: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Permissions'
    }
  )
  return Permission
}
