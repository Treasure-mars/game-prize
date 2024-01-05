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
    }
  }
  RolePermissions.init({
    roleId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    permissionId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
  }, {
    sequelize,
    modelName: 'RolePermissions',
  });
  return RolePermissions;
};