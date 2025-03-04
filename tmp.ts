import alpha2 from './data/iso3166.json'
import iso639 from './data/iso639.json'

const formatArray = (arr: string[], chunkSize = 10) => {
  const chunks: string[][] = []
  for (let i = 0; i < arr.length; i += chunkSize) {
    chunks.push(arr.slice(i, i + chunkSize))
  }

  const formattedChunks = chunks
    .map((chunk) => `  ${chunk.map((item) => `'${item}'`).join(', ')}`)
    .join(',\n')
  const result = `const output = [\n${formattedChunks}\n];`

  // Write the output to a file
  console.log(result)
}

const main = () => {

  const foo = Object.keys(iso639.fallbacks)
  const bar = foo.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
  const baz = {}
  bar.map(cc => baz[cc] = iso639.fallbacks[cc])
  console.log(JSON.stringify(baz))
}

main()
