'use strict'

const { timestamps } = require('../attributes')
const { upHelpers, globalEnums } = require('../helpers')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { addSlugCheck } = upHelpers(queryInterface, Sequelize)

    /**
     * Main table
     */
    await queryInterface.createTable('anime_references', {
      anime_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'anime',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      provider_id: {
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
        allowNull: false
      },
      slug: {
        type: Sequelize.STRING
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      synopsis: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      ...timestamps
    })

    /**
     * Indexes
     */
    await queryInterface.addIndex('anime_references', ['anime_id'])
    await queryInterface.addIndex('anime_references', ['anime_id', 'region'], {
      unique: true
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('anime_references')
  }
}
