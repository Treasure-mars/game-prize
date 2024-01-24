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
    await queryInterface.bulkInsert('Permissions', [
      {
        permissionId: '7069cc93-9443-4541-bf61-b180a6f7b5d8',
        name: 'VIEW_USERS',
        description: 'Views All Users',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        permissionId: 'aeddbd7c-c096-4f13-a252-acd017e5045b',
        name: 'VIEW_PRODUCTS',
        description: 'Views All Products',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        permissionId: '1f36b118-fbb9-414b-b017-a8d0bceb6239',
        name: 'VIEW_ROLES',
        description: 'Views All Roles',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        permissionId: 'e9a314b5-d3e9-4602-9377-7cfb5e8c8d27',
        name: 'ADD_ROLE',
        description: 'Adding new role',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        permissionId: '0508c7ef-127d-4a3b-87db-db65c291fd68',
        name: 'ADD_PRODUCT',
        description: 'Adding new product',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        permissionId: '8ae88659-0625-43e0-a1e6-5ff0631866ad',
        name: 'ADD_USER',
        description: 'Adding new user',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        permissionId: '46e669c6-c8f5-424b-8035-7cbe48642a9a',
        name: 'EDIT_PRODUCT',
        description: 'Editing product (make available or unavailable)',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        permissionId: "409b330d-b0fa-41f7-bf1e-eb90ef03820e",
        name: "MAKE_DRAW",
        description: "Making product draws",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        permissionId: "41a1dfd3-1247-454c-b336-42e1d9a9f37a",
        name: "CONFIRM_WINNER",
        description: "Confirming product draw winner",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        permissionId: "ffdd3736-9935-4df5-a780-9558accda78c",
        name: "VIEW_REPORT",
        description: "Viewing report & analytics",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        permissionId: "684b9bc7-274b-402a-8927-0f7b0a4d41f7",
        name: "VIEW_TESTIMONIALS",
        description: "Viewing & adding testimonials",
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
    await queryInterface.bulkDelete('Permissions', null, {})
  }
}
