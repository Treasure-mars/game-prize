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
    await queryInterface.bulkInsert('rolepermissions', [
      {
        roleId: '725d6846-3443-4f25-8a22-8c20e034aa29',
        permissionId: '7069cc93-9443-4541-bf61-b180a6f7b5d8',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        roleId: '725d6846-3443-4f25-8a22-8c20e034aa29',
        permissionId: 'aeddbd7c-c096-4f13-a252-acd017e5045b',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        roleId: '725d6846-3443-4f25-8a22-8c20e034aa29',
        permissionId: '1f36b118-fbb9-414b-b017-a8d0bceb6239',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        roleId: '725d6846-3443-4f25-8a22-8c20e034aa29',
        permissionId: 'e9a314b5-d3e9-4602-9377-7cfb5e8c8d27',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        roleId: '725d6846-3443-4f25-8a22-8c20e034aa29',
        permissionId: '0508c7ef-127d-4a3b-87db-db65c291fd68',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        roleId: '725d6846-3443-4f25-8a22-8c20e034aa29',
        permissionId: '8ae88659-0625-43e0-a1e6-5ff0631866ad',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        roleId: '725d6846-3443-4f25-8a22-8c20e034aa29',
        permissionId: '46e669c6-c8f5-424b-8035-7cbe48642a9a',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        roleId: '725d6846-3443-4f25-8a22-8c20e034aa29',
        permissionId: '409b330d-b0fa-41f7-bf1e-eb90ef03820e',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        roleId: '04d06e63-adc2-42bd-bd52-6abfa6f90ea1',
        permissionId: '409b330d-b0fa-41f7-bf1e-eb90ef03820e',
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
    await queryInterface.bulkDelete('rolepermissions', null, {})
  }
}
