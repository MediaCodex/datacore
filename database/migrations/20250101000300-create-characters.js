'use strict'

const { timestamps } = require('../attributes')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('characters', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        primaryKey: true,
        allowNull: false
      },
      born: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      age: {
        type: Sequelize.SMALLINT,
        allowNull: true
      },
      height: {
        type: Sequelize.SMALLINT,
        allowNull: true
      },
      ...timestamps
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('characters')
  }
}
