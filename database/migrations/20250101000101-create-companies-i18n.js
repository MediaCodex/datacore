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
    await queryInterface.createTable('companies_i18n', {
      company_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'companies',
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
      name: {
        type: Sequelize.STRING,
        allowNull: false
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
    await queryInterface.addIndex('companies_i18n', ['company_id', 'locale'], {
      unique: true
    })
    await queryInterface.addIndex('companies_i18n', ['slug', 'locale'], {
      unique: true
    })

    /**
     * Additional checks
     */
    await addSlugCheck('companies_i18n')
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('companies_i18n')
  }
}
