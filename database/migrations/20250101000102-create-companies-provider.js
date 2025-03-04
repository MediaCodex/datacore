'use strict'

const { timestamps } = require('../attributes')
const { globalEnums } = require('../helpers')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Main table
     */
    await queryInterface.createTable('companies_provider', {
      company_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'companies',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      region: {
        type: globalEnums.region,
        allowNull: true
      },
      affiliate_code: {
        type: Sequelize.STRING,
        allowNull: true
      },
      affiliate_template: {
        type: Sequelize.STRING,
        allowNull: true
      },
      ...timestamps
    })

    /**
     * Indexes
     */
    await queryInterface.addIndex(
      'companies_provider',
      ['company_id', 'region'],
      {
        unique: true
      }
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('companies_provider')
  }
}
