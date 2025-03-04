'use strict'

const { timestamps } = require('../attributes')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Main Table
     */
    await queryInterface.createTable('anime_companies', {
      anime_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'anime',
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
        type: Sequelize.ENUM('producer', 'licensor', 'studio'),
        allowNull: false
      },
      ...timestamps
    })

    /**
     * Indexes
     */
    await queryInterface.addIndex('anime_companies', ['anime_id'])
    await queryInterface.addIndex('anime_companies', ['company_id'])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('anime_companies')
    await queryInterface.sequelize.query(
      `DROP TYPE IF EXISTS "enum_anime_companies_role";`
    )
  }
}
