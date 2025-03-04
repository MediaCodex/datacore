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
    await queryInterface.createTable('anime_i18n', {
      anime_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'anime',
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
    await queryInterface.addIndex('anime_i18n', ['anime_id', 'locale'], {
      unique: true
    })
    await queryInterface.addIndex('anime_i18n', ['slug', 'locale'], {
      unique: true
    })

    /**
     * Additional checks
     */
    await addSlugCheck('anime_i18n')
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('anime_i18n')
  }
}
