'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tokens', {
          referenceId: {
            type: Sequelize.UUID,
            allowNull: false,
            primaryKey: true
          },
          userId: {
            type: Sequelize.UUID,
            allowNull: false
          },
          productId: {
            type: Sequelize.UUID,
            allowNull: false
          },
          drawId: {
            type: Sequelize.UUID,
            allowNull: false
          },
          tokenId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            unique: true
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
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Tokens');
  }
};