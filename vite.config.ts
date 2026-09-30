import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

const SITEMAP_PATHS = [
  '/',
  '/energia-solar',
  '/calentadores-solares',
  '/conservacion-de-agua',
  '/productos-energia',
  '/auditoria-energetica',
  '/ingenieria',
  '/nosotros',
  '/contacto',
  '/privacidad',
  '/terminos',
]

function seoFiles(origin: string): Plugin {
  const base = origin.replace(/\/$/, '')
  const robots = `User-agent: *
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: GPTBot
Allow: /

Sitemap: ${base}/sitemap.xml
`
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${SITEMAP_PATHS.map((p) => `  <url><loc>${p === '/' ? `${base}/` : `${base}${p}`}</loc><changefreq>weekly</changefreq></url>`).join('\n')}
</urlset>
`
  return {
    name: 'eco-seo-files',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url === '/robots.txt' || req.url?.startsWith('/robots.txt?')) {
          res.setHeader('Content-Type', 'text/plain; charset=utf-8')
          res.end(robots)
          return
        }
        if (req.url === '/sitemap.xml' || req.url?.startsWith('/sitemap.xml?')) {
          res.setHeader('Content-Type', 'application/xml; charset=utf-8')
          res.end(xml)
          return
        }
        next()
      })
    },
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robots })
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: xml })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const origin = (env.VITE_SITE_URL || 'https://www.ecostorepr.com').replace(/\/$/, '')
  return {
    plugins: [react(), seoFiles(origin)],
    base: '/',
    resolve: {
      alias: {
        '@ds': path.resolve(__dirname, 'src/design-system'),
      },
    },
  }
})
