'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RolePermission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Role, { foreignKey: 'roleId', as: 'rolePermission' });
  this.belongsTo(models.Permission, { foreignKey: 'permissionId', as: 'permissionRole' });
    }
  }
  RolePermission.init({
    roleId: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    permissionId: {
      type: DataTypes.UUID,
      primaryKey: true
    }
  }, {
    sequelize,
    modelName: 'RolePermission',
  });
  return RolePermission;
};