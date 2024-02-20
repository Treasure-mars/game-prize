'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert('Roles', [
      {
        roleId: '07299a4e-304c-4dd4-a079-ea7052156e57',
        name: 'player',
        description: 'This is a description for player role',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        roleId: '725d6846-3443-4f25-8a22-8c20e034aa29',
        name: 'admin',
        description: 'This is a description for admin role',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        roleId: '04d06e63-adc2-42bd-bd52-6abfa6f90ea1',
        name: 'drawer',
        description: 'This is a that should make draw in the system',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Roles', null, {})
  }
}
