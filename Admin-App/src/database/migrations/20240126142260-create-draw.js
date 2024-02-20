'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Draws', {
        drawId: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
          },
          productId: {
            type: Sequelize.UUID,
            allowNull: false
          },
          startDate: {
            type: Sequelize.DATE
          },
          endDate: {
            type: Sequelize.DATE
          },
          isPlayed: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
          },
          winnerCount: {
            type: Sequelize.INTEGER,
            allowNull: false
          },
          winnerFound: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
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
    await queryInterface.dropTable('Draws');
  }
};