'use strict'

const { timestamps } = require('../attributes')
const { globalEnums } = require('../helpers')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Main table
     */
    await queryInterface.createTable('anime_episodes_i18n', {
      episode_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'anime_episodes',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      locale: {
        type: globalEnums.locale,
        allowNull: false
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
    await queryInterface.addIndex(
      'anime_episodes_i18n',
      ['episode_id', 'locale'],
      {
        unique: true
      }
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('anime_episodes_i18n')
  }
}
