'use strict'

const { timestamps } = require('../attributes')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('people', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        primaryKey: true,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true
      },
      born: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      height: {
        type: Sequelize.SMALLINT,
        allowNull: true
      },
      socials: {
        type: Sequelize.JSONB,
        allowNull: false,
        defaultValue: {}
      },
      ...timestamps
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('people')
  }
}
