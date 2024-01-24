'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize){
        await queryInterface.createTable('RolePermissions', {
            roleId: {
                type: Sequelize.UUID,
                allowNull: false,
                primaryKey: true
              },
              permissionId: {
                type: Sequelize.UUID,
                allowNull: false,
                primaryKey: true
              },
              createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Date.now()
              },
              updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Date.now()
              }
        })
    },
    async down(queryInterface, Sequelize){
        await queryInterface.dropTable('RolePermissions')
    }
}