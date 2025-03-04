import { z } from 'zod'

// PEGI: Europe (Pan-European Game Information)
const PEGI = z.enum(['3', '7', '12', '16', '18'])

// MPAA: United States (Motion Picture Association)
const MPAA = z.enum(['G', 'PG', 'PG-13', 'R', 'NC-17'])

// ESRB: United States and Canada (Entertainment Software Rating Board)
const ESRB = z.enum(['E', 'E10+', 'T', 'M', 'AO'])

// CERO: Japan (Computer Entertainment Rating Organization)
const CERO = z.enum(['A', 'B', 'C', 'D', 'Z'])

// BBFC: United Kingdom (British Board of Film Classification)
const BBFC = z.enum(['U', 'PG', '12', '12A', '15', '18'])

// USK: Germany (Unterhaltungssoftware Selbstkontrolle)
const USK = z.enum(['0', '6', '12', '16', '18'])

// ACB: Australia (Australian Classification Board)
const ACB = z.enum(['G', 'PG', 'M', 'MA15+', 'R18+', 'X18+'])

// CBFC: India (Central Board of Film Certification)
const CBFC = z.enum(['U', 'U/A', 'A', 'S'])

// GRAC: South Korea (Game Rating and Administration Committee)
const GRAC = z.enum(['All', '12', '15', '18'])

// RUSSIAN: Russia (Federal Service for Supervision of Communications)
const RUSSIAN = z.enum(['0+', '6+', '12+', '16+', '18+'])

// CNC: France (Centre national du cinéma et de l'image animée)
const CNC = z.enum(['U', '10', '12', '16', '18'])

// DJCTQ: Brazil (Department of Justice, Rating, Titles and Qualification)
const DJCTQ = z.enum(['L', '10', '12', '14', '16', '18'])

// Combine into an object with optional key-value pairs
export const ratingsSchema = z.object({
  pegi: PEGI.optional(), // Europe
  mpaa: MPAA.optional(), // United States
  esrb: ESRB.optional(), // United States and Canada
  cero: CERO.optional(), // Japan
  bbfc: BBFC.optional(), // United Kingdom
  usk: USK.optional(), // Germany
  acb: ACB.optional(), // Australia
  cbfc: CBFC.optional(), // India
  grac: GRAC.optional(), // South Korea
  russian: RUSSIAN.optional(), // Russia
  cnc: CNC.optional(), // France
  djctq: DJCTQ.optional() // Brazil
})

export type Ratings = z.infer<typeof ratingsSchema>
