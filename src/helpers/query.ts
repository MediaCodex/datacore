import { Op } from 'sequelize'
import { isUuid } from '.'

export const idOrSlug = (value: string, allowSlug = false) => {
  // slug, but probably ID
  if (allowSlug && isUuid(value)) {
    return { [Op.or]: [{ id: value }, { slug: value }] }
  }

  // slug, invalid ID
  if (allowSlug) {
    return { [Op.or]: [{ slug: value }, { id: value }] }
  }

  // ID only
  return { value }
}

export const orArray = (field: string, values: any[]) => {
  return { [Op.or]: values.map((value) => ({ [field]: value })) }
}
