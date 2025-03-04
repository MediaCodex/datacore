'use strict'

const { timestamps } = require('../attributes')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('companies', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        primaryKey: true,
        allowNull: false
      },
      
      website: {
        type: Sequelize.STRING,
        allowNull: true
      },
      headquarters: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      founded: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      defunct: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      parent_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'companies',
          key: 'id'
        },
        onDelete: 'SET NULL'
      },
      ...timestamps
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('companies')
  }
}
