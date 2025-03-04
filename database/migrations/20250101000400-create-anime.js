'use strict'

const { timestamps } = require('../attributes')
const { upHelpers } = require('../helpers')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { addSlugCheck } = upHelpers(queryInterface, Sequelize)

    /**
     * Main table
     */
    await queryInterface.createTable('anime', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        primaryKey: true,
        allowNull: false
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      episodes: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      episode_duration: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false
      },
      aired: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      premiered: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      source_type: {
        type: Sequelize.ENUM(
          'original',
          'novel',
          'light-novel',
          'web-novel',
          'manga',
          '4-koma',
          'game',
          'visual-novel',
          'music',
          'doujinshi',
          'other'
        ),
        allowNull: false
      },
      source_id_type: {
        type: Sequelize.ENUM('manga', 'book', 'game'),
        allowNull: true
      },
      source_id: {
        type: Sequelize.UUID,
        allowNull: true
      },
      genres: {
        type: Sequelize.ARRAY(Sequelize.UUID),
        allowNull: true
      },
      total_duration: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      content_ratings: {
        type: Sequelize.JSONB,
        allowNull: false
      },
      is_adult: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      ...timestamps
    })

    /**
     * additional checks
     */
    await queryInterface.addConstraint('anime', {
      fields: ['source_id', 'source_id_type'],
      type: 'check',
      name: 'check_source_id_integrity',
      where: Sequelize.literal(
        'source_id IS NOT NULL AND source_id_type IS NOT NULL OR source_id IS NULL AND source_id_type IS NULL'
      )
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('anime')
  }
}
