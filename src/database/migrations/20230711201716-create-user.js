'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      userId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      roleId: {
        type: Sequelize.UUID,
        allowNull: false
      },
      mustChangePassword: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      organization: {
        type: Sequelize.STRING,
        allowNull: true
      },
      isVerified: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      isLoggedIn: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      channel: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'webapp'
      },
      profilePicture: {
        type: Sequelize.STRING,
        allowNull: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      phoneNumber: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      role: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'buyer'
      },
      otp: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      otpExpiration: {
        type: Sequelize.DATE,
        allowNull: true
      },
      resetToken: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      resetTokenExpires: {
        type: Sequelize.DATE,
        allowNull: true
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
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users')
  }
}
