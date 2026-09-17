# EcoStore Design System

Sistema de diseño en **React 18 + TypeScript + CSS Modules**, derivado de la página de contacto de EcoStore
("Tu tienda de Eficiencia Energética y agua"). Sin dependencias de UI externas.

```
src/design-system/
├── tokens/        tokens.css (CSS vars, fuente de verdad) · tokens.ts (espejo JS)
├── styles/        base.css (reset + tipografía global) · index.css (entry)
├── icons/         Íconos SVG inline (línea, rellenos, redes)
├── utils/         cx()
├── components/    Primitivos y patrones (cada uno con su .module.css)
└── index.ts       Exportación única: import { Button } from '@ds'
```

## 1. Principios

| Principio                                                       | Cómo se aplica                                                                                                                                                                                                                                  |
| --------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Verde manda, naranja acentúa, lima destaca, celeste suaviza** | `primary` = verde 600 en CTAs. Naranja para teléfono, pines e íconos de ilustración. Lima solo para 1 palabra del título, barra del eyebrow y anillos sobre fondo oscuro. Celeste pastel para fondos de sección ligeros e ilustración de línea. |
| **Pasteles como fondo, nunca como acción**                      | `mint`, `sky` y `peach` son superficies. Los botones y enlaces siguen siendo verde. La excepción es `accent` (durazno) para promos.                                                                                                             |
| **Redondeado y amable**                                         | Un radio por nivel: 12px controles, 20px tarjetas, 28px contenedores. Íconos siempre dentro de círculos.                                                                                                                                        |
| **Sombras teñidas, sin bordes duros**                           | Las tarjetas usan sombra de dos capas teñida con verde 900, no borde gris. Las burbujas de ilustración usan sombra teñida de celeste.                                                                                                           |
| **Aire generoso**                                               | 96px entre secciones (128px en secciones grandes). Saltos grandes entre niveles tipográficos.                                                                                                                                                   |
| **Confianza rápida**                                            | Cada sección visible incluye una señal de confianza (gratis, 20 años, 24h, candado).                                                                                                                                                            |
| **Solo tokens**                                                 | Ningún componente usa valores hardcoded. Todo pasa por `--eco-*`.                                                                                                                                                                               |
| **Accesible por defecto**                                       | Focus visible en verde, `aria-*` cableado en formularios, contraste AA en texto.                                                                                                                                                                |

## 2. Tokens

### Color

| Alias semántico             | Token       | Hex       | Uso                                                   |
| --------------------------- | ----------- | --------- | ----------------------------------------------------- |
| `--eco-color-primary`       | green-600   | `#1E7F35` | Botones primarios, íconos sólidos                     |
| `--eco-color-primary-hover` | green-700   | `#176A2C` | Hover                                                 |
| `--eco-color-text-brand`    | green-600   | `#1E7F35` | Teléfono/email en tarjetas, nav activo                |
| `--eco-color-bg-mint`       | green-50    | `#EEF7F0` | Fondo de la tarjeta de formulario, IconCircle soft    |
| `--eco-color-bg-inverse`    | green-900   | `#0D3A19` | Footer                                                |
| `--eco-color-highlight`     | lime-400    | `#A8E84A` | "Personalizada", barra del eyebrow, anillos del hero  |
| `--eco-color-accent`        | orange-500  | `#F5A623` | Sol del logo, teléfono e íconos naranja del footer    |
| `--eco-color-accent-strong` | orange-600  | `#E88F1A` | Íconos naranja sobre blanco (burbujas de ilustración) |
| `--eco-color-bg-sky`        | sky-50      | `#EEF6FC` | Fondo de secciones pastel, hero claro                 |
| `--eco-color-bg-peach`      | orange-50   | `#FFF5E8` | Badges y tarjetas durazno                             |
| `--eco-color-secondary`     | sky-400     | `#5BB4E5` | Líneas de ilustración, acentos celestes               |
| `--eco-color-text`          | neutral-800 | `#1F2624` | Títulos y texto fuerte                                |
| `--eco-color-text-body`     | neutral-600 | `#4B5651` | Párrafos (un paso más claro que los títulos)          |
| `--eco-color-text-muted`    | neutral-500 | `#6B7772` | Texto secundario                                      |
| `--eco-color-border-soft`   | neutral-100 | `#F1F5F1` | Borde casi invisible de tarjetas                      |
| `--eco-danger-500`          | —           | `#D93F3F` | Errores de formulario                                 |

Escalas completas: `green 50–950`, `lime 300–500`, `orange 50–700`, `sky 50–600`, `neutral 0–900`.

**Paleta pastel** (tomada de la pieza "La eficiencia no tiene que ser complicada"): `sky-50` como fondo, `sky-300` para líneas de plano/ilustración, burbujas blancas con sombra `--eco-shadow-sky` e ícono `orange-600`. Se usa en `Section background="sky"`, `Hero variant="light"`, `Card variant="sky" | "peach"` e `IconCircle tone="bubble" | "peach" | "skySoft"`.

### Tipografía

| Rol                                    | Fuente                   | Peso            |
| -------------------------------------- | ------------------------ | --------------- |
| Títulos (`--eco-font-heading`)         | Outfit                   | 700             |
| Acento editorial (`--eco-font-accent`) | Instrument Serif itálica | 400, vía `<Em>` |
| Cuerpo (`--eco-font-body`)             | Inter                    | 400–600         |
| Firma manuscrita (`--eco-font-script`) | Caveat                   | 700             |

**Regla del acento**: una sola palabra o frase corta por título va en `<Em>` (serif itálica, 8% más grande). Es la firma tipográfica del sitio. Nunca dos acentos en el mismo título ni acento en texto de cuerpo.

Escala: `xs 12 · sm 14 · md 16 · lg 18 · xl 20 · 2xl 24 · 3xl 30 · 4xl 44 · 5xl 56 · 6xl 72 · 7xl 88`. Display llega a 72px con line-height 0.98.
`Heading` usa `clamp()` en display/h1/h2, tracking `-0.03em` en display/h1 y `text-wrap: balance`. El cuerpo activa `ss01`/`cv11` de Inter.

### Espaciado

Base 4px: `space-1 (4) … space-32 (128)`. Contenedor máx. 1200px, padding lateral 24px (16px en móvil). `Section` usa 96px vertical por defecto, 128px en `size="lg"`.

### Radios · Sombras · Motion

| Radio |                   | Sombra              |                         | Motion |                          |
| ----- | ----------------- | ------------------- | ----------------------- | ------ | ------------------------ |
| sm    | 8px chips         | xs                  | 1 capa, sutil           | fast   | 120ms                    |
| md    | 12px controles    | sm                  | 2 capas, tarjetas       | normal | 200ms                    |
| lg    | 20px tarjetas     | md                  | 2 capas, elevated       | slow   | 320ms                    |
| xl    | 28px contenedores | lg                  | 2 capas, floating       | ease   | `cubic-bezier(.2,0,0,1)` |
| full  | pill              | brand / brand-hover | CTA verde               |        | reduced-motion → 0ms     |
|       |                   | sky                 | burbujas de ilustración |        |                          |

Todas las sombras van teñidas con `green-900` (o `sky-600` en `sky`), nunca negro puro.

## 3. Componentes

### Primitivos

| Componente                                         | Props clave                                                                                                                                                                      | Notas                                                                                                                                                                                                                                                                                                                     |
| -------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Button`                                           | `variant` primary/secondary/outline/ghost/accent/sky/inverse/glass · `size` · `shape` pill/rounded · `arrow` · `leadingIcon` · `trailingIcon` · `loading` · `fullWidth` · `href` | Píldora por defecto (CTAs); `rounded` en formularios. `arrow` añade flecha que se desplaza 3px en hover. `glass` para hero y fotografía.                                                                                                                                                                                  |
| `Input` / `Textarea`                               | `invalid` + props nativas                                                                                                                                                        | Altura 44px, focus ring verde.                                                                                                                                                                                                                                                                                            |
| `Select`                                           | `options[]` · `placeholder` · `invalid`                                                                                                                                          | Chevron custom, `appearance: none`.                                                                                                                                                                                                                                                                                       |
| `Checkbox`                                         | `label`                                                                                                                                                                          | Caja custom 20px, check animado.                                                                                                                                                                                                                                                                                          |
| `FormField`                                        | `label` · `hint` · `error` · `required`                                                                                                                                          | Inyecta `id`, `aria-describedby`, `invalid` al hijo.                                                                                                                                                                                                                                                                      |
| `InlineGroup`                                      | `label`                                                                                                                                                                          | Fieldset horizontal ("Me interesa: …").                                                                                                                                                                                                                                                                                   |
| `Card`                                             | `variant` outlined/elevated/floating/mint/sky/peach/glass/glassLight/ink · `padding` · `interactive`                                                                             | Sin borde duro: sombra teñida. `glass` sobre oscuro, `glassLight` sobre pastel, `ink` malla verde. `data-icon-hover` hace que su IconCircle pase a sólido en hover.                                                                                                                                                       |
| `Em` / `Lead` / `Label`                            | `tone` inherit/highlight/brand/accent · `inverse`                                                                                                                                | Acento serif itálico, párrafo de apertura y etiqueta de sección.                                                                                                                                                                                                                                                          |
| `IconCircle`                                       | `tone` soft/solid/ring/outline/outlineInverse/accent/peach/skySoft/bubble/bubbleGreen · `size` sm/md/lg/xl                                                                       | Todos los íconos van dentro de uno. `bubble` = blanco con sombra celeste e ícono naranja (ilustración).                                                                                                                                                                                                                   |
| `Heading`                                          | `level` display/h1–h5 · `as` · `tone` default/brand/inverse/accent/sky · `align`                                                                                                 | `level` es visual; `as` es semántico.                                                                                                                                                                                                                                                                                     |
| `Highlight`                                        | `brand`                                                                                                                                                                          | Palabra en lima (o verde con `brand`).                                                                                                                                                                                                                                                                                    |
| `Text`                                             | `size` · `tone` default/strong/muted/… · `weight` · `as`                                                                                                                         | `default` usa `text-body` (neutral-600); `strong` usa neutral-800.                                                                                                                                                                                                                                                        |
| `Eyebrow`                                          | `inverse` · `bar` · `plain`                                                                                                                                                      | Pill con barra lima a la izquierda. `plain` quita el fondo.                                                                                                                                                                                                                                                               |
| `Reveal`                                           | `delay` · `once` · `as`                                                                                                                                                          | Fade + 14px al entrar en viewport. Escalonar con `delay={i * 60}`. Respeta reduced-motion.                                                                                                                                                                                                                                |
| `Script`                                           | —                                                                                                                                                                                | Caveat rotado -6°.                                                                                                                                                                                                                                                                                                        |
| `Container` / `Section` / `Stack` / `Row` / `Grid` | `background` · `size` · `gap` · `columns` / `minColumn`                                                                                                                          | Layout sin CSS ad hoc.                                                                                                                                                                                                                                                                                                    |
| `Logo`                                             | `height` · `inverse` · `src`                                                                                                                                                     | Vector fiel al logotipo oficial (hoja + cable con enchufe sobre la O de ECO, sol como O de STORE). Colores propios del logo, no tokens: verde `#1E9E2E`, verde oscuro `#0E4D1F`, naranja `#F7941D`, amarillo `#FFD500`. `inverse` para fondos oscuros. `src` usa el archivo original (`/public/logo.svg`) si se prefiere. |
| `SocialLinks`                                      | `links[]` · `tone` · `size` · `shape`                                                                                                                                            | Con `aria-label` por red.                                                                                                                                                                                                                                                                                                 |

### Superficies premium

| Token                                                          | Uso                                                                                         |
| -------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| `--eco-mesh-dark`                                              | Malla de degradados verde para hero oscuro, CtaBand y Card `ink`. Siempre con grano al 35%. |
| `--eco-mesh-light`                                             | Malla celeste para hero claro.                                                              |
| `--eco-glass-bg*` / `--eco-glass-border*` / `--eco-glass-blur` | Cristal: Navbar, Card `glass`/`glassLight`, Button `glass`.                                 |
| `--eco-hairline` / `--eco-hairline-inverse`                    | Líneas de 1px al 8% para separar sin cajas: StatBar, SectionHeader, Steps, Accordion.       |
| `--eco-ring-inset`                                             | Anillo interior blanco al 20% en imágenes y paneles oscuros.                                |

### Patrones

| Patrón                        | Compone                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Dónde aparece                                                                                                                                      |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Stat` / `StatBar`            | Cifra con contador + etiqueta, separadas por hairlines                                                                                                                                                                                                                                                                                                                                                                                                         | Barra bajo el hero (20+ años, 5,400+ propiedades, 32%, 24h)                                                                                        |
| `SectionHeader`               | Hairline + etiqueta izquierda + título/lead derecha; `align="center"`                                                                                                                                                                                                                                                                                                                                                                                          | Cabecera de cada sección                                                                                                                           |
| `Steps`                       | Proceso numerado con duración por paso                                                                                                                                                                                                                                                                                                                                                                                                                         | "De la primera llamada al primer ahorro"                                                                                                           |
| `Quote`                       | Testimonial en serif itálica + autor + estrellas                                                                                                                                                                                                                                                                                                                                                                                                               | Junto al FAQ                                                                                                                                       |
| `Accordion`                   | FAQ con hairlines, "+" que rota, altura animada                                                                                                                                                                                                                                                                                                                                                                                                                | Preguntas frecuentes                                                                                                                               |
| `CtaBand`                     | Malla verde + hoja marca de agua + CTA inverso + nota                                                                                                                                                                                                                                                                                                                                                                                                          | Antes del footer                                                                                                                                   |
| `MapEmbed`                    | Iframe de Google Maps con esquinas redondeadas, sombra teñida, carga diferida y tarjeta superpuesta (`overlay`)                                                                                                                                                                                                                                                                                                                                                | Bajo las tarjetas de contacto, con dirección, horario y "Cómo llegar"                                                                              |
| `ParallaxHero`                | Hero con capas a distinta velocidad. El progreso de scroll (0→1) se escribe en `--p` y cada capa se traslada `calc(var(--p) * y%)`; sin librerías, con rAF y reduced-motion. `layers` (nodo, y, estilo) y `children` como capa de contenido                                                                                                                                                                                                                    | Hero de la página principal: foto, velo, sol, texto fantasma, productos en primer plano                                                            |
| `FigurineCarousel`            | Hero-carrusel de productos: ítem activo grande al centro, vecinos desenfocados, uno al fondo; fondo de marca por ítem, texto fantasma gigante en Outfit, flechas circulares, contador y enlace grande. Transición de 650 ms, teclado y precarga. `photo: true` muestra fotografías sin transparencia como tarjeta redondeada                                                                                                                                   | Hero de Productos · Eficiencia Energética y de agua                                                                                                |
| `CategoryBand`                | Cabecera de categoría del catálogo: ícono sólido, título en mayúsculas, tagline y nota con hoja. `tone` green/sky                                                                                                                                                                                                                                                                                                                                              | "ENERGÍA" y "AGUA" en el catálogo "ECO lo tiene"                                                                                                    |
| `SolutionCard`                | Imagen sobre malla pastel, título y lista con checks. `imageFit` contain (recortes con alpha) o cover (fotografías). `size="sm"` para filas de 6–7                                                                                                                                                                                                                                                                                                             | Catálogo "ECO lo tiene" de todas las páginas (`pages/sections/SolutionsCatalog`, dentro de `SiteClose`)                                            |
| `Navbar`                      | Cristal sticky con sombra al hacer scroll, links en píldora, submenús (`NavItem.children`) con hover, clic y teclado, teléfono, CTA con flecha, menú móvil con grupos                                                                                                                                                                                                                                                                                          | Cabecera. "Productos" despliega Eficiencia Energética y Conservación de agua; "Servicios" despliega Auditoría energética y Servicios de ingeniería |
| `Hero`                        | `variant` dark (malla + grano + hairline lima) / light (malla celeste) · `actions` · `aside` · secuencia de entrada escalonada                                                                                                                                                                                                                                                                                                                                 | Hero con composición visual (dark); pieza pastel (light)                                                                                           |
| `TrustItem` / `TrustList`     | IconCircle ring (dark) o bubble (light) + título tabular + descripción                                                                                                                                                                                                                                                                                                                                                                                         | "100% Gratis · Asesoría experta · Respuesta rápida"                                                                                                |
| `SectionTitle`                | Hojas + Heading + subtítulo                                                                                                                                                                                                                                                                                                                                                                                                                                    | "Múltiples formas de contactarnos"                                                                                                                 |
| `ContactCard`                 | Card + IconCircle soft + valor verde + meta                                                                                                                                                                                                                                                                                                                                                                                                                    | 4 tarjetas de contacto                                                                                                                             |
| `Checklist` / `ChecklistCard` | Card floating + checks verdes + sello hoja                                                                                                                                                                                                                                                                                                                                                                                                                     | "¿Qué incluye tu evaluación gratuita?"                                                                                                             |
| `Footer`                      | Marca (logo apilado inverso + descripción) + hasta 2 columnas de enlaces + contacto y redes, línea legal con enlaces y botón "volver arriba". La rejilla se adapta al número de columnas vía `--cols`. Animaciones: entrada escalonada al entrar en viewport, línea lima que se dibuja, halo que respira (14 s), hoja flotante (9 s), subrayado deslizante en enlaces. Todo respeta reduced-motion. Props `columns`, `contact`, `social`, `legal`, `copyright` | Cierre de todas las páginas, junto al catálogo, vía `pages/sections/SiteClose`                                                                      |

## 4. Estados y accesibilidad

- **Focus**: anillo `0 0 0 4px rgba(46,158,62,.35)` en botones, inputs, checkboxes y redes. `outline` verde global en `:focus-visible`.
- **Hover**: botones oscurecen un paso; cards `interactive` elevan 2px; links del nav dibujan subrayado.
- **Disabled**: opacidad 0.55 + `cursor: not-allowed`; inputs con fondo neutral-100.
- **Error**: borde `danger-500`, mensaje con `role="alert"`, `aria-invalid="true"`.
- **Loading**: `aria-busy`, spinner, contenido oculto pero conservando ancho.
- **Reduced motion**: todas las duraciones pasan a 0ms.
- Íconos son `aria-hidden` salvo que reciban `title`. Navbar móvil usa `aria-expanded` / `aria-controls`.

## 5. Uso

```tsx
// main.tsx
import "@ds/styles/index.css";

// cualquier componente
import {
  Section,
  Container,
  SectionTitle,
  Grid,
  ContactCard,
  PhoneIcon,
} from "@ds";

<Section>
  <Container>
    <SectionTitle title="Múltiples formas de contactarnos" leaves />
    <Grid minColumn="220px">
      <ContactCard
        icon={<PhoneIcon />}
        title="Llámanos"
        value="(787) 664-7676"
        href="tel:+17876647676"
        emphasize
        meta="Lun - Vie: 8:00am - 5:00pm"
      />
    </Grid>
  </Container>
</Section>;
```

## 6. Do / Don't

| ✅ Do                                                                     | ❌ Don't                                         |
| ------------------------------------------------------------------------- | ------------------------------------------------ |
| Un solo `Button variant="primary"` por vista principal.                   | Dos CTAs verdes compitiendo en la misma sección. |
| Lima solo para 1 palabra del título o detalles.                           | Bloques o botones en lima.                       |
| Naranja para datos de contacto, logo e íconos dentro de burbujas blancas. | Naranja sólido como fondo de botón principal.    |
| Celeste pastel como fondo de sección o ilustración de línea.              | Celeste en texto de cuerpo o como color de CTA.  |
| Alternar fondos blanco → sky/mint → verde oscuro para ritmo.              | Dos secciones pastel seguidas.                   |
| Íconos dentro de `IconCircle`.                                            | Íconos sueltos sin contenedor.                   |
| `FormField` alrededor de cada control.                                    | Inputs sin `id`/`label`/`aria-describedby`.      |
| Fondos: blanco → mint → verde oscuro para jerarquía.                      | Grises fríos o negros puros.                     |

## 7. Roadmap

- Agregar variante isotipo del `Logo` (solo la O con hoja y enchufe) para favicon y avatares.
- Fotografía real en `Hero` (`imageUrl`) y en el aside del formulario.
- Componentes pendientes: `Badge`, `Toast`, `Modal`, `Tabs`, `Accordion` (FAQ), `ProductCard`.
- Tema oscuro: los alias semánticos ya permiten un `[data-theme="dark"]` sin tocar componentes.
- Storybook o página de docs por componente.
