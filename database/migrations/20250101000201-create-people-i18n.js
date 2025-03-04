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
    await queryInterface.createTable('people_i18n', {
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
        allowNull: false
      },
      slug: {
        type: Sequelize.STRING
      },
      given_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      family_name: {
        type: Sequelize.STRING,
        allowNull: true
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      ...timestamps
    })

    /**
     * Indexes
     */
    await queryInterface.addIndex('people_i18n', ['person_id', 'locale'], {
      unique: true
    })
    await queryInterface.addIndex('people_i18n', ['slug', 'locale'], {
      unique: true
    })

    /**
     * Additional checks
     */
    await addSlugCheck('people_i18n')
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('people_i18n')
  }
}
