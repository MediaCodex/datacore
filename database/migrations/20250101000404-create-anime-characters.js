'use strict'

const { timestamps } = require('../attributes')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Main Table
     */
    await queryInterface.createTable('anime_characters', {
      anime_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'anime',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      character_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'characters',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      is_main: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      ...timestamps
    })

    /**
     * Indexes
     */
    await queryInterface.addIndex('anime_characters', ['anime_id'])
    await queryInterface.addIndex('anime_characters', ['character_id'])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('anime_characters')
    await queryInterface.sequelize.query(
      `DROP TYPE IF EXISTS "enum_anime_characters_role";`
    )
  }
}
