'use strict'

const { timestamps } = require('../attributes')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Main table
     */
    await queryInterface.createTable('people_companies', {
      person_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'people',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      company_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'companies',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      role: {
        type: Sequelize.STRING,
        allowNull: true
      },
      ...timestamps
    })

    /**
     * Indexes
     */
    await queryInterface.addIndex('people_companies', ['person_id'])
    await queryInterface.addIndex('people_companies', ['company_id'])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('people_companies')
  }
}
