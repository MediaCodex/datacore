'use strict'

const { timestamps } = require('../attributes')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Main table
     */
    await queryInterface.createTable('anime_episodes', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        primaryKey: true,
        allowNull: false
      },
      anime_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'anime',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      episode_number: {
        type: Sequelize.SMALLINT,
        allowNull: false
      },
      season: {
        type: Sequelize.SMALLINT,
        allowNull: true
      },
      season_episode_number: {
        type: Sequelize.SMALLINT,
        allowNull: true
      },
      duration: {
        type: Sequelize.SMALLINT,
        allowNull: true,
      },
      ...timestamps
    })

    /**
     * Indexes
     */
    await queryInterface.addIndex('anime_episodes', ['anime_id'])

    /**
     * Additional checks
     */
    await queryInterface.addConstraint('anime_episodes', {
      fields: ['season', 'season_episode_number'],
      type: 'check',
      name: 'check_season_episode_number_consistency',
      where: Sequelize.literal(
        'season IS NOT NULL AND season_episode_number IS NOT NULL OR season IS NULL AND season_episode_number IS NULL'
      )
    })
    await queryInterface.addConstraint('anime_episodes', {
      fields: ['anime_id', 'episode_number'],
      type: 'unique',
      name: 'unique_anime_episode_number'
    })
    await queryInterface.addConstraint('anime_episodes', {
      fields: ['anime_id', 'season', 'season_episode_number'],
      type: 'unique',
      name: 'unique_anime_season_episode_number'
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('anime_episodes')
  }
}
