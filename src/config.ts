const parseInt = (value?: string) => {
  const num = Number(value)
  if (!Number.isSafeInteger(num)) return undefined
  return num
}

export const webserver = {
  port: parseInt(process.env.PORT) ?? 3000,
  host: process.env.HOST
}

export const database = {
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_DATABASE || 'mediacodex',
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD
}

export const pagination = {
  defaultLimit: 100,
  maxLimit: 1000
}
