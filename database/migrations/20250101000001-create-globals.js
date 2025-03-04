'use strict'

// NOTE: stored here instead of via the json file to ensure migrations are consistent
// prettier-ignore
const iso639_1 = [
  'aa', 'ab', 'ae', 'af', 'ak', 'am', 'an', 'ar', 'as', 'av',
  'ay', 'az', 'ba', 'be', 'bg', 'bh', 'bi', 'bm', 'bn', 'bo',
  'br', 'bs', 'ca', 'ce', 'ch', 'co', 'cr', 'cs', 'cu', 'cv',
  'cy', 'da', 'de', 'dv', 'dz', 'ee', 'el', 'en', 'eo', 'es',
  'et', 'eu', 'fa', 'ff', 'fi', 'fj', 'fo', 'fr', 'fy', 'ga',
  'gd', 'gl', 'gn', 'gu', 'gv', 'ha', 'he', 'hi', 'ho', 'hr',
  'ht', 'hu', 'hy', 'hz', 'ia', 'id', 'ie', 'ig', 'ii', 'ik',
  'io', 'is', 'it', 'iu', 'ja', 'jv', 'ka', 'kg', 'ki', 'kj',
  'kk', 'kl', 'km', 'kn', 'ko', 'kr', 'ks', 'ku', 'kv', 'kw',
  'ky', 'la', 'lb', 'lg', 'li', 'ln', 'lo', 'lt', 'lu', 'lv',
  'mg', 'mh', 'mi', 'mk', 'ml', 'mn', 'mr', 'ms', 'mt', 'my',
  'na', 'nb', 'nd', 'ne', 'ng', 'nl', 'nn', 'no', 'nr', 'nv',
  'ny', 'oc', 'oj', 'om', 'or', 'os', 'pa', 'pi', 'pl', 'ps',
  'pt', 'qu', 'rm', 'rn', 'ro', 'ru', 'rw', 'sa', 'sc', 'sd',
  'se', 'sg', 'si', 'sk', 'sl', 'sm', 'sn', 'so', 'sq', 'sr',
  'ss', 'st', 'su', 'sv', 'sw', 'ta', 'te', 'tg', 'th', 'ti',
  'tk', 'tl', 'tn', 'to', 'tr', 'ts', 'tt', 'ty', 'ug', 'uk',
  'ur', 'uz', 've', 'vi', 'vo', 'wa', 'wo', 'xh', 'yi', 'yo',
  'za', 'zh', 'zu'
];

// prettier-ignore
const iso3166_alpha2 = [
  "AF", "AX", "AL", "DZ", "AS", "AD", "AO", "AI", "AQ", "AG",
  "AR", "AM", "AW", "AU", "AT", "AZ", "BS", "BH", "BD", "BB",
  "BY", "BE", "BZ", "BJ", "BM", "BT", "BO", "BA", "BW", "BV",
  "BR", "IO", "BN", "BG", "BF", "BI", "KH", "CM", "CA", "CV",
  "KY", "CF", "TD", "CL", "CN", "CX", "CC", "CO", "KM", "CG",
  "CD", "CK", "CR", "CI", "HR", "CU", "CY", "CZ", "DK", "DJ",
  "DM", "DO", "EC", "EG", "SV", "GQ", "ER", "EE", "ET", "FK",
  "FO", "FJ", "FI", "FR", "GF", "PF", "TF", "GA", "GM", "GE",
  "DE", "GH", "GI", "GR", "GL", "GD", "GP", "GU", "GT", "GG",
  "GN", "GW", "GY", "HT", "HM", "VA", "HN", "HK", "HU", "IS",
  "IN", "ID", "IR", "IQ", "IE", "IM", "IL", "IT", "JM", "JP",
  "JE", "JO", "KZ", "KE", "KI", "KR", "KP", "KW", "KG", "LA",
  "LV", "LB", "LS", "LR", "LY", "LI", "LT", "LU", "MO", "MK",
  "MG", "MW", "MY", "MV", "ML", "MT", "MH", "MQ", "MR", "MU",
  "YT", "MX", "FM", "MD", "MC", "MN", "ME", "MS", "MA", "MZ",
  "MM", "NA", "NR", "NP", "NL", "AN", "NC", "NZ", "NI", "NE",
  "NG", "NU", "NF", "MP", "NO", "OM", "PK", "PW", "PS", "PA",
  "PG", "PY", "PE", "PH", "PN", "PL", "PT", "PR", "QA", "RE",
  "RO", "RU", "RW", "BL", "SH", "KN", "LC", "MF", "PM", "VC",
  "WS", "SM", "ST", "SA", "SN", "RS", "SC", "SL", "SG", "SK",
  "SI", "SB", "SO", "ZA", "GS", "ES", "LK", "SD", "SR", "SJ",
  "SZ", "SE", "CH", "SY", "TW", "TJ", "TZ", "TH", "TL", "TG",
  "TK", "TO", "TT", "TN", "TR", "TM", "TC", "TV", "UG", "UA",
  "AE", "GB", "US", "UM", "UY", "UZ", "VU", "VE", "VN", "VG",
  "VI", "WF", "EH", "YE", "ZM", "ZW"
];

const toEnum = (values) => {
  return values.map((val) => "'" + val + "'").join(', ')
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      CREATE TYPE enum_iso639_1 AS ENUM (${toEnum(iso639_1)});
    `)

    await queryInterface.sequelize.query(`
      CREATE TYPE enum_iso3166_alpha2 AS ENUM (${toEnum(iso3166_alpha2)});
    `)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`DROP TYPE enum_iso639_1;`)
    await queryInterface.sequelize.query(`DROP TYPE enum_iso3166_alpha2;`)
  }
}
