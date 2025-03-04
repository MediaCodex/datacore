'use strict'

/**
 * @param {import("sequelize").QueryInterface} queryInterface
 * @param {require("sequelize").Sequelize} Sequelize
 */
const upHelpers = (queryInterface, Sequelize) => ({
  /**
   * Add a separate CHECK constraint for slug character validation
   *
   * @param {string} table
   * @param {string} [slug=slug]
   *
   * @returns {Promise}
   */
  addSlugCheck: (table, field = 'slug') =>
    queryInterface.addConstraint(table, {
      fields: [field],
      type: 'check',
      name: `check_${field}_characters`,
      where: {
        [field]: { [Sequelize.Op.regexp]: '^[\\p{L}0-9]+(?:-[\\p{L}0-9]+)*$' }
      }
    })
})

const globalEnums = {
  locale: "enum_iso639_1",
  region: "enum_iso3166_alpha2"
}

module.exports = { upHelpers, globalEnums }
