# EcoStore Design System

Design system en React + TypeScript + CSS Modules basado en la página de contacto de EcoStore.

```bash
npm install
npm run dev        # showcase en http://localhost:5173
npm run typecheck
npm run build
```

- Documentación completa: [docs/DESIGN-SYSTEM.md](docs/DESIGN-SYSTEM.md)
- Código del sistema: `src/design-system/` (alias `@ds`)
- Páginas (entregables): `src/pages/Inicio.tsx` (página principal con hero parallax), `src/pages/Contacto.tsx`, `src/pages/Nosotros.tsx`, `src/pages/Auditoria.tsx` (Servicios · Auditoría energética), `src/pages/Ingenieria.tsx` (Servicios · Ingeniería) `src/pages/ProductosEnergia.tsx` y `src/pages/ProductosAgua.tsx` (Productos · Eficiencia Energética y de agua, carrusel de productos desde `public/images/energia/` y `public/images/agua/`). El catálogo Energía/Agua compartido vive en `src/pages/sections/SolutionsCatalog.tsx`. Datos compartidos (contacto, navegación, footer) en `src/pages/site.ts`. Fotos en `public/images/`, logos en `public/logo.png` / `public/logo-inverse.png`
- Showcase: `src/showcase/SystemPage.tsx` (tokens y componentes) y `src/showcase/ContactPage.tsx` (demo premium con patrones adicionales)
- Vistas por hash: `#inicio` (por defecto, también sin hash), `#productos-energia`, `#productos-agua`, `#servicios`, `#ingenieria`, `#nosotros`, `#contacto`, `#design-system`, `#page` (demo). Los enlaces del navbar y footer cambian de página.
