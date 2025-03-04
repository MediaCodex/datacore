'use strict'

const { timestamps } = require('../attributes')
const { globalEnums } = require('../helpers')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Main table
     */
    await queryInterface.createTable('characters_people', {
      character_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'characters',
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
      locale: {
        type: globalEnums.locale,
        allowNull: true
      },
      ...timestamps
    })

    /**
     * Indexes
     */
    await queryInterface.addIndex('characters_people', ['character_id'])
    await queryInterface.addIndex('characters_people', ['person_id'])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('characters_people')
  }
}
