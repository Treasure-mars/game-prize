'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
        productId: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUID,
            primaryKey: true
        },
        productName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        description: Sequelize.STRING,
        isAvailable: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        },
        isCallNeeded: Sequelize.BOOLEAN,
        productCost: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        drawPeriod: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        playAmount: {
            type: Sequelize.INTEGER,
            allowNull: false
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
    await queryInterface.dropTable('Products');
  }
};