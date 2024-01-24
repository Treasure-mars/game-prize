'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize){
        await queryInterface.createTable('Permissions', {
            permissionId: {
              type: Sequelize.UUID,
              defaultValue: Sequelize.UUIDV4,
              primaryKey: true
            },
            name: Sequelize.STRING,
            description: Sequelize.STRING,
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
        await queryInterface.dropTable('Permissions')
    }
}