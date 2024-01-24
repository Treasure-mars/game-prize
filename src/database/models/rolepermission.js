'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RolePermissions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Role, { foreignKey: 'roleId', as: 'permissionRole' })
      this.hasMany(models.Permissions, { foreignKey: 'permissionId', as: 'rolePermission' })
    }
  }
  RolePermissions.init({
    roleId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Role',
        key: 'roleId'
      }
    },
    permissionId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Permissions',
        key: 'permissionId'
      }
    },
  }, {
    sequelize,
    modelName: 'RolePermissions',
  });
  return RolePermissions;
};