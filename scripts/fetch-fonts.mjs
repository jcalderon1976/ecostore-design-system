import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const outDir = path.join(root, 'public', 'fonts')
const cssUrl =
  'https://fonts.googleapis.com/css2?family=Outfit:wght@500;600;700;800&family=Inter:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&family=Caveat:wght@600;700&display=swap'

const css = await fetch(cssUrl, {
  headers: {
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
  },
}).then((r) => {
  if (!r.ok) throw new Error(`Fonts CSS ${r.status}`)
  return r.text()
})

const blocks = css.split(/\/\* /).filter((b) => b.startsWith('latin */') || b.startsWith('latin\n'))
const faces = []

for (const block of css.split('/* ')) {
  if (!block.startsWith('latin */')) continue
  const family = block.match(/font-family:\s*'([^']+)'/)?.[1]
  const style = block.match(/font-style:\s*(\w+)/)?.[1] ?? 'normal'
  const weight = block.match(/font-weight:\s*(\d+)/)?.[1]
  const url = block.match(/url\((https:[^)]+\.woff2)\)/)?.[1]
  if (!family || !weight || !url) continue
  const slug = family.toLowerCase().replace(/\s+/g, '-')
  const file = `${slug}-${weight}${style === 'italic' ? '-italic' : ''}.woff2`
  faces.push({ family, style, weight, url, file })
}

await mkdir(outDir, { recursive: true })

const seen = new Set()
const unique = faces.filter((f) => {
  const k = f.file
  if (seen.has(k)) return false
  seen.add(k)
  return true
})

for (const face of unique) {
  const bin = Buffer.from(await fetch(face.url).then((r) => r.arrayBuffer()))
  await writeFile(path.join(outDir, face.file), bin)
  console.log(`${face.file}  ${(bin.length / 1024).toFixed(1)} KB`)
}

const cssOut = unique
  .map(
    (f) => `@font-face {
  font-family: '${f.family}';
  font-style: ${f.style};
  font-weight: ${f.weight};
  font-display: swap;
  src: url('/fonts/${f.file}') format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}`,
  )
  .join('\n\n')

await writeFile(path.join(outDir, 'fonts.css'), `${cssOut}\n`)
console.log(`wrote ${unique.length} faces (dedupe variable fonts before committing)`)
