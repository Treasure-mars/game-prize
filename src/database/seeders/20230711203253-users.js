'use strict'
const dotenv = require('dotenv')
const { v4: uuid } = require('uuid')
const bcrypt = require('bcrypt')

dotenv.config()
const saltRounds = Number(process.env.SALTROUNDS)

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          userId: uuid(),
          firstName: 'Nambaje',
          lastName: 'Edwin',
          email: 'nambajedwin@gmail.com',
          phoneNumber: '250787415987',
          password: await bcrypt.hash('12345', saltRounds),
          isVerified: true,
          role: 'admin',
          roleId: '725d6846-3443-4f25-8a22-8c20e034aa29',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {})
  }
}
