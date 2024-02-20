'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Payments', {
        paymentId: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
          },
          productId: {
            type: Sequelize.UUID,
            allowNull: false
          },
          userId: {
            type: Sequelize.UUID,
            allowNull: false
          },
          transactionId: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUID
          },
          paymentAmount: Sequelize.FLOAT,
          paymentStatus: Sequelize.STRING,
          gatewayResponse: Sequelize.STRING,
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
    await queryInterface.dropTable('Payments');
  }
};