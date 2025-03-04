'use strict'

const { timestamps } = require('../attributes')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Main Table
     */
    await queryInterface.createTable('anime_people', {
      anime_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'anime',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      person_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'people',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      role: {
        type: Sequelize.STRING,
        allowNull: false
      },
      ...timestamps
    })

    /**
     * Indexes
     */
    await queryInterface.addIndex('anime_people', ['anime_id'])
    await queryInterface.addIndex('anime_people', ['person_id'])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('anime_people')
  }
}
