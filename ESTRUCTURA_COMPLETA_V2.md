# ESTRUCTURA_COMPLETA_V2.md
# Revolution505 Tech Solutions — Landing Page Premium Definitiva

> **Misión:** Ser la agencia de desarrollo web más impresionante visualmente en México.
> Superar a BastianSoft, Pixyhub, Vexus Agency y Creative Studio en UX, conversión y credibilidad.
>
> **WhatsApp Business:** +52 442 372 3972
> **URL base WA:** `https://wa.me/524423723972?text=`
> **Stack:** React 19 + Vite 7 + Tailwind v4 + TypeScript + GSAP 3.15 + Framer Motion 12 + HLS.js

---

## ANÁLISIS COMPETIDORES → CÓMO SUPERARLOS

| Competidor | Lo mejor que tienen | Cómo lo superamos |
|---|---|---|
| **BastianSoft** | Precios transparentes, city pages, planes bien estructurados, WhatsApp en múltiples secciones | Calculadora dinámica de precios (no solo tabla), city pages con SEO local, WhatsApp contextual con mensaje prellenado según sección |
| **Pixyhub** | Portafolio visual fuerte, blog técnico, diseño moderno limpio | Portafolio cinematográfico con hover videos, filtros por industria, antes/después. Blog con búsqueda. |
| **Vexus Agency** | City pages masivas, branding audaz, precios visibles | City pages interactivas con mapa, experiencia multimedia superior, pricing más sofisticado |
| **Creative Studio** | Copy enfocado en dolor, testimonios con métricas, metodología clara | Testimonios con métricas animadas (contador), simulador de resultados por industria, proceso visual timeline |
| **Soft Restaurant** | Página SaaS de producto profesional | Sección dedicada a sistemas (POS, CRM, Reservas) con demos visuales de las pantallas reales |

**Nuestra ventaja diferencial:** Experiencia cinematográfica oscura + carga ultra rápida + calculadora interactiva + configurador guiado + sistemas propios demostrados con screenshots reales.

---

## DESIGN SYSTEM GLOBAL

### Paleta de Colores
```css
/* Variables base (ya en index.css) */
--bg:      0 0% 4%    → hsl: #0a0a0a  (fondo negro profundo)
--surface: 0 0% 8%    → hsl: #141414  (cards, superficies)
--text:    0 0% 96%   → hsl: #f5f5f5  (texto principal)
--muted:   0 0% 53%   → hsl: #878787  (texto secundario)
--stroke:  0 0% 12%   → hsl: #1f1f1f  (bordes)
--accent:  217 91% 60% → #3b82f6      (azul Revolution505)

/* Accent gradient */
linear-gradient(90deg, #3b82f6 0%, #60a5fa 100%)

/* Azul hover más intenso */
linear-gradient(90deg, #2563eb 0%, #3b82f6 100%)
```

### Tipografía
```
font-display: 'Instrument Serif', serif → Headlines, displays, números grandes, citas
font-body:    'Inter', sans-serif        → Todo el texto, labels, botones, navegación
```

### Espaciado de Secciones
- `py-24 md:py-32 lg:py-40` para secciones principales
- `max-w-7xl mx-auto px-6 md:px-10 lg:px-16` para contenedores internos

### Animaciones (Heredadas + Nuevas)
```css
/* Heredadas */
.animate-scroll-down     → indicador de scroll hero
.animate-role-fade-in    → palabras rotando
.animate-gradient-shift  → bordes con gradiente animado
.animate-marquee-scroll  → footer marquee CSS
.accent-gradient         → fondo azul Revolution505
.accent-gradient-text    → texto con clip gradiente
.cosmic-gradient         → fondo degradado sutil

/* Nuevas a agregar en index.css */
@keyframes float-up      → elementos flotando suavemente (SVGs de fondo)
@keyframes pulse-glow    → punto verde disponibilidad
@keyframes counter-tick  → números de stats subiendo
@keyframes shimmer       → efecto skeleton loading en cards
@keyframes slide-in-left → timeline items desde la izquierda
@keyframes morph-blur    → blob de fondo que cambia forma
```

---

## SECCIONES DETALLADAS

---

### 1. LOADING SCREEN — "Ultra Premium"
**Archivo:** `src/components/redesign/LoadingScreen.tsx` ✅ (ya implementada, mejorar)

**Concepto:** Primera impresión cinematográfica. El usuario ve la marca antes que cualquier contenido.

**Layout:**
```
┌─────────────────────────────────────────────┐
│ Revolution505                    [top-left]  │
│                                             │
│          [palabra rotando]                  │
│        Transformamos / Diseñamos            │
│         Convertimos / Escalamos             │
│                                             │
│  ████████████████░░░░░░    087  [bottom]    │
└─────────────────────────────────────────────┘
```

**Mejoras sobre versión actual:**
- Añadir línea sutil horizontal que cruza la pantalla a mitad de animación (GSAP line reveal)
- Efecto de "glitch" muy sutil al cambiar palabras (transform skew 0.5deg por 80ms)
- Tagline debajo de palabras: `"tech solutions"` en text-xs text-muted tracking-[0.5em]
- Logo SVG de Revolution505 en top-left (usar `/assets/logo-r.png`) en lugar de solo texto
- Transición de salida: `clip-path: inset(0 0 100% 0)` wipe up al completar (GSAP)

**Código clave:**
```tsx
// Palabras rotando
const words = ['Transformamos', 'Diseñamos', 'Convertimos', 'Escalamos', 'Dominamos']
// Intervalo: 900ms por palabra
// AnimatePresence mode="wait": y:20→0→-20 con ease easeOut

// Exit animation (GSAP wipe):
gsap.to(overlayRef.current, {
  clipPath: 'inset(0 0 100% 0)',
  duration: 0.6,
  ease: 'power3.inOut',
  delay: 0.1,
  onComplete: onComplete
})
```

---

### 2. NAVBAR — Pill Flotante Premium
**Archivo:** `src/components/redesign/Navbar.tsx` ✅ (ya implementada)

**Mejoras necesarias:**
- Indicador visual de sección activa mejorado (barra azul debajo del link, 2px)
- Añadir número de WhatsApp visible en desktop: `(442) 372-3972` con ícono verde pulsante
- Al hacer hover en logo: tooltip "Revolution505 Tech Solutions" aparece abajo

**Links definitivos:**
```tsx
const links = [
  { label: 'Servicios',   href: '#servicios'   },
  { label: 'Portafolio',  href: '#portafolio'  },
  { label: 'Sistemas',    href: '#sistemas'     },
  { label: 'Precios',     href: '#precios'      },
  { label: 'Nosotros',    href: '#proceso'      },
]
```

**Botón CTA definitivo:**
```tsx
// Desktop: "Cotizar Proyecto" con gradient border hover
// Mobile: ícono WhatsApp verde sin texto
href="https://wa.me/524423723972?text=Hola%2C%20me%20interesa%20cotizar%20un%20proyecto%20web.%20%C2%BFPueden%20ayudarme%3F"
```

---

### 3. HERO SECTION — Cinematográfico
**Archivo:** `src/components/redesign/HeroSection.tsx` ✅ (ya implementada)

**Mejoras de alta prioridad:**

#### 3.1 Background mejorado
No depender solo del HLS externo — tener un fallback rico:
```
Layer 1 (más abajo): cosmic-gradient base
Layer 2: Grid de puntos sutiles (SVG pattern, opacity-[0.03])
Layer 3: Blob animado con CSS morph (posición aleatoria, blur-3xl, bg-accent/5)
Layer 4: Video HLS (cuando carga)
Layer 5: Overlay negro/20
Layer 6: Fade top y fade bottom al bg
```

**SVG Grid Pattern (inline en CSS):**
```css
.dot-grid {
  background-image: radial-gradient(circle, hsl(var(--muted)) 1px, transparent 1px);
  background-size: 32px 32px;
  opacity: 0.04;
}
```

#### 3.2 Headline definitivo
```
TECNOLOGÍA DE VANGUARDIA · MÉXICO 2026  [eyebrow, texto-muted]

  Transformamos                          [font-display italic, 9xl]
  Ideas en Realidad                      [accent-gradient-text]

  Creamos [Páginas Web / Sistemas /      [roles rotando]
           Tiendas Online / Soluciones]  que convierten.
```

#### 3.3 Social Proof instantáneo (debajo del headline, antes de los CTAs)
```
┌────────────┬────────────┬────────────────────┐
│ ★★★★★      │ 95+        │ ⚡ Respuesta        │
│ 5/5 Google │ Proyectos  │ en < 2 horas       │
└────────────┴────────────┴────────────────────┘
```
Implementar como 3 pills horizontales con `border border-stroke/50 bg-surface/30 backdrop-blur-sm`.

#### 3.4 CTAs definitivos
```tsx
// Primario: bg-text-primary text-bg → hover bg-bg text-text-primary + gradient border
<button onClick={() => scrollTo('calculadora')}>
  Calcular mi Proyecto →
</button>

// Secundario: border-stroke → hover gradient border
<a href="https://wa.me/524423723972?text=Hola%21%20Vi%20su%20p%C3%A1gina%20y%20quiero%20saber%20m%C3%A1s%20sobre%20sus%20servicios.">
  Hablar por WhatsApp ↗
</a>
```

#### 3.5 GSAP Entrance
```tsx
// Timeline (después del loading screen, delay 0)
tl
  .fromTo('.hero-name',    { opacity:0, y:50 },                { opacity:1, y:0, duration:1.2 }, 0.1)
  .fromTo('.hero-blur-in', { opacity:0, filter:'blur(10px)', y:20 }, { opacity:1, filter:'blur(0)', y:0, duration:1, stagger:0.1 }, 0.3)
  .fromTo('.hero-proof',   { opacity:0, y:15 },                { opacity:1, y:0, duration:0.8, stagger:0.08 }, 0.9)
```

#### 3.6 Logos de Clientes (Scrolling ticker debajo del hero)
```
┌─────────────────────────────────────────────────────┐
│ CLIENTES QUE CONFÍAN EN NOSOTROS                    │
│ [AMQ] [FlyZZ] [Spartan] [Peña Abogados] [AtakGG]   │  ← scroll infinito
└─────────────────────────────────────────────────────┘
```
Implementar con CSS `animate-marquee-scroll` (ya existe). Logos disponibles en `/assets/`.

---

### 4. CALCULADORA INTELIGENTE DE PROYECTOS ⭐ KILLER FEATURE
**Archivo NUEVO:** `src/components/redesign/CalculadoraSection.tsx`
**ID:** `id="calculadora"`

**Concepto:** Supera a TODOS los competidores. Ninguno tiene esto. El usuario configura su proyecto y obtiene precio, tiempo estimado y paquete recomendado — todo en tiempo real.

#### 4.1 Layout General
```
┌─────────────────────────────────────────────────────────────────┐
│  CALCULADORA                              Estimación Instantánea│
│  Diseña tu proyecto                                             │
│  en tiempo real                                                 │
│─────────────────────────────────────────────────────────────────│
│                          │                                      │
│  [Paso 1] ¿Qué necesitas?│   RESUMEN EN VIVO                   │
│  ● Página Web            │   ┌──────────────────────────────┐  │
│  ○ Tienda Online         │   │ 💰 Inversión estimada        │  │
│  ○ Sistema POS           │   │   $12,500 – $18,500 MXN      │  │
│  ○ Sistema CRM           │   │                              │  │
│  ○ Reservas              │   │ ⏱ Tiempo de entrega          │  │
│  ○ Landing Page          │   │   12 – 15 días hábiles       │  │
│                          │   │                              │  │
│  [Paso 2] ¿Cuántas pág.? │   │ 📦 Paquete recomendado       │  │
│  ●─────────────○── 5     │   │   Profesional                │  │
│   1    3    5    10      │   │                              │  │
│                          │   │ ✅ Incluye:                  │  │
│  [Paso 3] ¿Extras?       │   │   • Diseño UX/UI             │  │
│  ☑ Blog/Noticias         │   │   • SEO on-page              │  │
│  ☐ Tienda online         │   │   • Panel admin              │  │
│  ☑ Panel administrable   │   │   • Hosting 1 año            │  │
│  ☐ Multilenguaje         │   └──────────────────────────────┘  │
│  ☐ Integraciones API     │                                      │
│                          │   [Cotizar en WhatsApp →]           │
│  [Paso 4] ¿Urgencia?     │   [Agendar llamada gratuita]        │
│  ● Normal (2-3 semanas)  │                                      │
│  ○ Rápido (+30%)         │                                      │
│  ○ Urgente (+60%)        │                                      │
└─────────────────────────────────────────────────────────────────┘
```

#### 4.2 Lógica de Precios
```tsx
const basePrice: Record<ProjectType, [number, number]> = {
  landing:    [4_500,  7_500],
  web:        [8_500,  15_000],
  ecommerce:  [14_000, 25_000],
  pos:        [18_000, 35_000],
  crm:        [22_000, 45_000],
  reservas:   [16_000, 28_000],
}

const extras = {
  blog:       [1_500, 2_500],
  multisite:  [2_000, 4_000],
  admin:      [2_000, 3_500],
  multilang:  [3_000, 5_000],
  api:        [3_500, 8_000],
}

const urgencyMultiplier = { normal: 1, fast: 1.3, urgent: 1.6 }
const pageMultiplier = (pages: number) => 1 + (pages - 1) * 0.08

// Precio final: basePrice × pageMultiplier × urgencyMultiplier + extras
// Mostrar como rango: [min, max] formateado con Intl.NumberFormat
```

#### 4.3 Mensaje WhatsApp Prellenado (Automático)
```tsx
const buildWhatsAppMessage = (config: ProjectConfig) => {
  const msg = `
🚀 *Solicitud de Cotización — Revolution505*

📋 *Tipo de proyecto:* ${config.type}
📄 *Páginas/módulos:* ${config.pages}
⚡ *Urgencia:* ${config.urgency}
✅ *Extras requeridos:*
${config.extras.map(e => `  • ${e}`).join('\n')}

💰 *Rango estimado por calculadora:* $${formatPrice(config.minPrice)} – $${formatPrice(config.maxPrice)} MXN
⏱ *Tiempo estimado:* ${config.deliveryDays} días hábiles

¿Pueden enviarme una propuesta formal?
  `.trim()
  
  return `https://wa.me/524423723972?text=${encodeURIComponent(msg)}`
}
```

#### 4.4 Animaciones de la Calculadora
```tsx
// Panel de resumen:
// - Precio anima con framer-motion animate number (0 → valor)
// - Al cambiar tipo de proyecto: slide out/in con AnimatePresence
// - Progress bar del rango de precio: anima width
// - Cards de tipo de proyecto: hover 3D tilt sutil (perspective transform)
// - Toggle de extras: checkbox animado con spring

// GSAP para la sección completa:
// whileInView: columna izquierda viene desde x:-40, columna derecha desde x:40
```

#### 4.5 Diseño Visual
```tsx
// Contenedor: bg-surface border border-stroke rounded-3xl
// Panel izquierdo (configuración): bg-bg/50
// Panel derecho (resumen): bg-surface border-l border-stroke
// Cards de tipo: rounded-2xl border border-stroke hover:border-accent/50
//                transition-all, icono SVG 32px + label + descripción breve
// Slider de páginas: custom styled range con accent-gradient
// Checkboxes: custom con accent color, spring animation al toggle
```

---

### 5. CONFIGURADOR "DISEÑA TU PÁGINA EN MINUTOS"
**Archivo NUEVO:** `src/components/redesign/ConfiguradorSection.tsx`
**ID:** `id="configurador"`

**Concepto:** Flujo guiado visual tipo "quiz". 5 preguntas, animación tipo slide entre preguntas, genera propuesta visual al final. Supera a BastianSoft que solo tiene formulario estático.

#### 5.1 Flujo de Preguntas
```
Pregunta 1/5: ¿Cuál es tu giro?
  [🍕 Restaurante] [⚖️ Despacho] [🛍 Retail] [💊 Salud]
  [🏗 Construcción] [💻 Tecnología] [🎨 Creativo] [📦 Otro]

Pregunta 2/5: ¿Qué objetivo principal tiene tu sitio?
  [📞 Generar llamadas] [🛒 Vender en línea] [📋 Mostrar portafolio]
  [📅 Agendar citas]   [📍 Presencia local]  [🎯 Otro]

Pregunta 3/5: ¿Tienes logo e identidad visual?
  [✅ Sí, tengo todo]  [🔧 Tengo logo básico]  [❌ Necesito todo]

Pregunta 4/5: ¿Cuándo necesitas estar en línea?
  [⚡ En 1 semana]  [📅 En 2-3 semanas]  [🗓 En 1 mes]  [🔮 Sin prisa]

Pregunta 5/5: ¿Cuál es tu presupuesto aproximado?
  [💚 $5K-$10K]  [💛 $10K-$20K]  [🔵 $20K-$40K]  [🔑 Lo que sea necesario]
```

#### 5.2 Resultado / Propuesta Generada
```
┌──────────────────────────────────────────────────────┐
│  🎯 Tu Propuesta Revolution505                       │
│─────────────────────────────────────────────────────│
│                                                      │
│  Para [Restaurante] que quiere [Agendar citas]       │
│  con identidad [completa] y entrega en [2-3 semanas] │
│                                                      │
│  ┌──────────────────────────────────────────────┐   │
│  │  📦 Recomendamos: Plan Profesional           │   │
│  │  💰 Inversión: $12,500 MXN                   │   │
│  │  ⏱ Entrega: 12 días hábiles                 │   │
│  │                                              │   │
│  │  Incluye:                                    │   │
│  │  ✅ Diseño UI/UX personalizado para tu giro  │   │
│  │  ✅ Sistema de reservas integrado            │   │
│  │  ✅ Menú digital interactivo                 │   │
│  │  ✅ Google Business Profile configurado      │   │
│  │  ✅ SEO local La Piedad / Morelia            │   │
│  └──────────────────────────────────────────────┘   │
│                                                      │
│  [📲 Enviar a Revolution505 por WhatsApp]            │
│  [🔄 Volver a configurar]                            │
└──────────────────────────────────────────────────────┘
```

#### 5.3 Mensaje WhatsApp del Configurador
```tsx
const buildConfigMessage = (answers: ConfigAnswers) => {
  const msg = `
🎯 *Configurador Revolution505 — Mi Propuesta*

🏢 *Giro:* ${answers.industry}
🎯 *Objetivo:* ${answers.goal}
🎨 *Identidad visual:* ${answers.brand}
📅 *Tiempo deseado:* ${answers.timeline}
💰 *Presupuesto:* ${answers.budget}

📦 *Paquete sugerido:* ${answers.recommendedPlan}

Me interesa avanzar con esta propuesta. ¿Pueden contactarme?
  `.trim()
  
  return `https://wa.me/524423723972?text=${encodeURIComponent(msg)}`
}
```

#### 5.4 Animaciones del Configurador
```tsx
// Transición entre preguntas: x:100→0 (slide de derecha)
// Progress bar superior: width anima al avanzar
// Cards de respuesta: hover scale-[1.02] + border accent
// Seleccionada: border-accent bg-accent/10 con checkmark animado (spring)
// Resultado: fade-in + scale 0.95→1 con Framer Motion
// Número de pregunta: AnimatePresence mode="wait"
```

---

### 6. PORTAFOLIO CINEMATOGRÁFICO — Selected Works
**Archivo:** `src/components/redesign/SelectedWorks.tsx` (MEJORAR)

**Concepto:** Superar a Pixyhub con presentación más impactante, filtros y detalles de proyecto.

#### 6.1 Header de Sección
```tsx
// Eyebrow: w-8 h-px bg-stroke + "Portafolio" texto
// Headline: "Proyectos que *Hablan*" (italic en display)
// Filtros: [Todos] [Web] [E-commerce] [Sistemas] [Streaming]
// Animación: filtros con AnimatePresence, cards con layout animation
```

#### 6.2 Bento Grid (12 columnas)
```
Mobile: 1 columna, stack vertical
Tablet: 2 columnas
Desktop: grid-cols-12 con spans alternados

Proyecto 1 (AMQ Group):       col-span-12 md:col-span-7 → aspecto 16:9 horizontal
Proyecto 2 (FlyZZ):           col-span-12 md:col-span-5 → aspecto cuadrado
Proyecto 3 (Spartan TV):      col-span-12 md:col-span-5 → aspecto cuadrado
Proyecto 4 (Peña Abogados):   col-span-12 md:col-span-7 → aspecto 16:9 horizontal
Proyecto 5 (Revolution POS):  col-span-12              → banner ancho, aspecto 21:9
```

#### 6.3 Datos de Proyectos (Completos)
```tsx
const projects = [
  {
    id: 'amq',
    title: 'AMQ Group',
    subtitle: 'Corporativo + CRM',
    category: 'web',
    description: 'Plataforma empresarial completa con panel de administración y CRM integrado para gestión de clientes.',
    image: '/assets/amq-pag.png',
    logo: '/assets/amq-logo.png',
    tags: ['React', 'TypeScript', 'CRM'],
    result: '+340% leads orgánicos',
    duration: '18 días',
    colSpan: 'md:col-span-7',
  },
  {
    id: 'flyzz',
    title: 'FlyZZ Services',
    subtitle: 'Sistema POS + Web',
    category: 'sistemas',
    description: 'Sistema de punto de venta con tienda en línea integrada y reportes en tiempo real.',
    image: '/assets/flyzz-pag.png',
    logo: '/assets/FLYZZ-logo.png',
    tags: ['POS', 'E-commerce', 'Dashboard'],
    result: '+200% eficiencia operativa',
    duration: '22 días',
    colSpan: 'md:col-span-5',
  },
  {
    id: 'spartan',
    title: 'Spartan TV',
    subtitle: 'Plataforma Streaming',
    category: 'sistemas',
    description: 'Sistema completo de gestión de contenido IPTV con panel de clientes y control de accesos.',
    image: '/assets/spartan-pag.png',
    tags: ['Streaming', 'Panel Admin', 'IPTV'],
    result: '500+ suscriptores activos',
    duration: '30 días',
    colSpan: 'md:col-span-5',
  },
  {
    id: 'pena',
    title: 'Peña Abogados',
    subtitle: 'Despacho Legal Online',
    category: 'web',
    description: 'Presencia profesional para despacho jurídico con sistema de consultas y blog legal.',
    image: '/assets/pena-pag.png',
    logo: '/assets/pena-logo.png',
    tags: ['WordPress', 'SEO Local', 'Blog'],
    result: 'Top 3 Google La Piedad',
    duration: '10 días',
    colSpan: 'md:col-span-7',
  },
]
```

#### 6.4 Hover Effect (Cinematográfico)
```tsx
// Al hacer hover en card:
// 1. Imagen hace scale-[1.05] con transition duration-700
// 2. Aparece overlay bg-bg/75 backdrop-blur-lg (opacity 0→1)
// 3. Desde abajo sube: pill con gradient border + "Ver Proyecto → Título"
// 4. Tags del proyecto aparecen en esquina superior derecha
// 5. Métrica de resultado aparece en esquina inferior izquierda

// Ejemplo del overlay:
<div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-bg/75 backdrop-blur-lg flex flex-col justify-between p-6">
  {/* Resultado */}
  <div className="flex items-center gap-2">
    <span className="text-xs text-accent font-medium">RESULTADO</span>
    <span className="text-sm text-text-primary font-medium">{project.result}</span>
  </div>
  {/* Tags */}
  <div className="flex flex-wrap gap-2">
    {project.tags.map(tag => (
      <span className="px-2 py-1 rounded-full bg-surface/80 text-[10px] text-muted border border-stroke">{tag}</span>
    ))}
  </div>
  {/* CTA Pill */}
  <div className="relative group/pill self-start">
    <span className="absolute inset-[-1px] rounded-full animate-gradient-shift" style={{ background: 'linear-gradient(90deg, #3b82f6, #60a5fa, #3b82f6)', backgroundSize: '200% 100%' }} />
    <span className="relative z-10 flex items-center gap-2 px-4 py-2 rounded-full bg-bg text-sm text-text-primary">
      Ver Proyecto <em className="font-display italic">{project.title}</em>
    </span>
  </div>
</div>
```

---

### 7. NUESTROS SISTEMAS — Productos Propios
**Archivo NUEVO:** `src/components/redesign/SistemasSection.tsx`
**ID:** `id="sistemas"`

**Concepto:** Superar a Soft Restaurant mostrando los sistemas propios de Revolution505 con screenshots reales (ya tenemos las imágenes) y demos interactivos.

#### 7.1 Layout
```
Eyebrow: "Desarrollo de Sistemas"
Headline: "Software hecho *para ti*"
Subtext: Sistemas propietarios para PyMEs mexicanas. Sin licencias anuales, sin letra pequeña.

[Tabs]: [🍽 POS Restaurante] [💊 POS Farmacia] [📅 Reservas] [👥 CRM] [📦 Inventario]

[Panel activo: screenshots + features + CTA]
```

#### 7.2 Sistemas con Assets Disponibles
```tsx
const systems = [
  {
    id: 'restaurante',
    icon: '🍽',
    name: 'POS Restaurante',
    tagline: 'Control total de tu cocina y comedor',
    description: 'Sistema completo: cobro rápido, control de mesas, órdenes a cocina en tiempo real, reportes diarios y gestión de meseros.',
    screenshots: [
      '/assets/restaurante-dashboard.png',
      '/assets/restaurante-mesas.png',
      '/assets/restaurante-cocina.png',
      '/assets/restaurante-cobro.png',
    ],
    features: [
      'Gestión de mesas en tiempo real',
      'Impresión automática a cocina',
      'Control de meseros y comisiones',
      'Reportes de ventas diarias',
      'Compatible con impresoras térmicas',
      'Modo sin internet (offline)',
    ],
    whatsapp: 'https://wa.me/524423723972?text=Hola%2C%20me%20interesa%20el%20Sistema%20POS%20Restaurante.%20%C2%BFPueden%20darme%20m%C3%A1s%20informaci%C3%B3n%3F',
    price: 'Desde $18,000 MXN',
  },
  {
    id: 'pos-general',
    name: 'POS General / Farmacia',
    screenshots: ['/assets/pos-atagg-dashboard.png', '/assets/pos-lqc-interface.png'],
    features: [
      'Control de inventario en tiempo real',
      'Gestión de clientes y puntos',
      'Múltiples métodos de pago',
      'Alertas de stock mínimo',
      'Reportes por turno y vendedor',
      'Compatible con lectores de código de barras',
    ],
    whatsapp: 'https://wa.me/524423723972?text=Hola%2C%20me%20interesa%20el%20Sistema%20POS%20para%20mi%20negocio.%20%C2%BFTienen%20una%20demo%3F',
    price: 'Desde $14,000 MXN',
  },
]
```

#### 7.3 Presentación Visual
```tsx
// Screenshots en un "device mockup" (laptop frame o tablet frame SVG)
// Galería con dots de navegación y auto-slide cada 3s (Framer Motion)
// Features list: aparecen con stagger animation al tab quedar activo
// Badge "✅ Sistema propio - Sin mensualidades" visible y prominente
// CTA de cada sistema → WhatsApp con mensaje específico del sistema
```

---

### 8. PROCESO DE TRABAJO — Visual Timeline
**Archivo:** `src/components/redesign/ProcesoSection.tsx` (MEJORAR)

**Concepto:** Superar a BastianSoft/Creative Studio con timeline visual animado.

#### 8.1 Layout Timeline
```
[01] ─────── [02] ─────── [03] ─────── [04]
  Diagnóstico   Diseño UI   Desarrollo   Lanzamiento
  1-2 días     3-5 días    5-12 días    1-2 días

[Línea horizontal animada que se llena de izquierda a derecha al hacer scroll]
```

#### 8.2 Datos de Pasos (Mejorados)
```tsx
const steps = [
  {
    num: '01',
    icon: '🔍',
    title: 'Diagnóstico',
    duration: '1-2 días',
    desc: 'Analizamos tu negocio, competencia local y objetivos. Entregamos un brief detallado con la estrategia digital recomendada.',
    deliverable: 'Brief de proyecto',
    color: '#3b82f6',
  },
  {
    num: '02',
    icon: '🎨',
    title: 'Diseño UI/UX',
    duration: '3-5 días',
    desc: 'Creamos prototipos interactivos en Figma. Ves cómo se verá tu sitio antes de que escribamos una sola línea de código.',
    deliverable: 'Prototipo Figma',
    color: '#60a5fa',
  },
  {
    num: '03',
    icon: '⚙️',
    title: 'Desarrollo',
    duration: '5-12 días',
    desc: 'Programamos con React, TypeScript y Tailwind. Entregas semanales para que siempre sepas el avance.',
    deliverable: 'Revisiones semanales',
    color: '#93c5fd',
  },
  {
    num: '04',
    icon: '🚀',
    title: 'Lanzamiento',
    duration: '1-2 días',
    desc: 'Publicamos, configuramos SEO, Analytics y te capacitamos en 2 horas para gestionar tu sitio de forma independiente.',
    deliverable: 'Sitio en producción',
    color: '#bfdbfe',
  },
]
```

#### 8.3 Animaciones
```tsx
// Línea de progreso: GSAP ScrollTrigger scrub
// Al entrar en viewport: tl.to('.process-line', { width: '100%', duration: 2, ease: 'none' })
// Cada step aparece con stagger cuando la línea los "alcanza"
// Hover en cada step: expand con más detalles (AnimatePresence)
// Número grande detrás de cada card: opacity 0.06, font-display italic
```

---

### 9. CASOS DE ÉXITO + TESTIMONIOS CON MÉTRICAS
**Archivo:** `src/components/redesign/TestimoniosSection.tsx` (MEJORAR SIGNIFICATIVAMENTE)

**Concepto:** Superar a Creative Studio. No solo testimonios — métricas reales animadas.

#### 9.1 Stats Animados (Counters)
```tsx
// Sección de stats antes de los testimonios
// Números suben de 0 al valor final cuando entran en viewport
const stats = [
  { value: 95,  suffix: '+', label: 'Proyectos entregados',     icon: '📦' },
  { value: 100, suffix: '%', label: 'Clientes satisfechos',     icon: '⭐' },
  { value: 3,   suffix: '+', label: 'Años de experiencia',      icon: '📅' },
  { value: 24,  suffix: 'h', label: 'Tiempo de respuesta máx.', icon: '⚡' },
]

// Animación: cuando section entra al viewport (IntersectionObserver o framer-motion useInView)
// useEffect → intervalo que incrementa de 0 al valor en 2 segundos
// Formato: Intl.NumberFormat para separadores de miles
```

#### 9.2 Testimonios con Métricas Reales
```tsx
const testimonials = [
  {
    name: 'Alejandro Suárez',
    role: 'Director General',
    company: 'AMQ Group',
    avatar: '/assets/amq-logo.png',
    content: 'Revolution505 transformó nuestra presencia digital. En los primeros 3 meses duplicamos los leads desde la web.',
    metric: { value: '+340%', label: 'Leads orgánicos' },
    rating: 5,
    projectType: 'Sitio corporativo + CRM',
  },
  {
    name: 'Regina Romero',
    role: 'CEO & Fundadora',
    company: 'FlyZZ Services',
    avatar: '/assets/FLYZZ-logo.png',
    content: 'El sistema POS que nos desarrollaron cambió completamente nuestra operación diaria. Ahora procesamos el doble en el mismo tiempo.',
    metric: { value: '+200%', label: 'Eficiencia operativa' },
    rating: 5,
    projectType: 'Sistema POS + Web',
  },
  {
    name: 'Samir T.',
    role: 'Fundador',
    company: 'Spartan TV',
    avatar: null,
    content: 'La implementación del panel de streaming fue impecable. Gran equipo, comunicación constante y resultados que superaron mis expectativas.',
    metric: { value: '500+', label: 'Suscriptores activos' },
    rating: 5,
    projectType: 'Plataforma streaming',
  },
]
```

#### 9.3 Diseño Visual
```tsx
// Card de testimonio: bg-surface border border-stroke rounded-3xl p-8
// Cita: text-base text-muted leading-relaxed (no text-sm — más legible)
// Métrica destacada: font-display italic text-4xl accent-gradient-text
// Logo/avatar: esquina superior derecha, 40px
// Stars: ★★★★★ en amber/yellow
// Badge de tipo de proyecto: pill pequeño en top-left
// Hover: border-accent/20 shadow-lg shadow-accent/5
```

---

### 10. CITY PAGES TEASER — SEO Local
**Archivo NUEVO:** `src/components/redesign/CitySection.tsx`
**ID:** `id="ciudades"`

**Concepto:** Superar a Vexus Agency con city pages estéticamente impresionantes + SEO.

#### 10.1 Layout Visual
```
SERVIMOS EN TODA MÉXICO
Presencia local donde más nos necesitas

┌────────────────┬──────────────────┬────────────────┐
│  📍 La Piedad  │   📍 Morelia      │  📍 Michoacán   │
│  Michoacán     │   Capital         │  Todo el estado│
│                │                  │                │
│  ★★★★★         │  ★★★★★           │  ★★★★★         │
│  12 proyectos  │  8 proyectos     │  25+ proyectos │
│                │                  │                │
│  [Ver más →]   │  [Ver más →]     │  [Ver más →]   │
└────────────────┴──────────────────┴────────────────┘

                 ┌───────────────────┐
                 │  📍 México (CDMX) │
                 │  Nacional         │
                 │                  │
                 │  Proyectos remote │
                 │  [Ver más →]      │
                 └───────────────────┘
```

#### 10.2 Datos de Ciudades
```tsx
const cities = [
  {
    name: 'La Piedad',
    state: 'Michoacán',
    emoji: '📍',
    projects: 12,
    specialty: 'Comercios locales, restaurantes, despachos',
    slug: '/desarrollo-web-la-piedad',
    whatsapp: 'https://wa.me/524423723972?text=Hola%2C%20soy%20de%20La%20Piedad%20y%20me%20interesa%20crear%20una%20p%C3%A1gina%20web%20para%20mi%20negocio.',
    keywords: ['desarrollo web La Piedad', 'páginas web La Piedad Michoacán'],
  },
  {
    name: 'Morelia',
    state: 'Michoacán',
    emoji: '📍',
    projects: 8,
    specialty: 'Empresas medianas, educación, salud',
    slug: '/desarrollo-web-morelia',
    whatsapp: 'https://wa.me/524423723972?text=Hola%2C%20soy%20de%20Morelia%20y%20me%20interesa%20cotizar%20un%20proyecto%20web.',
    keywords: ['agencia web Morelia', 'desarrollo web Morelia Michoacán'],
  },
  {
    name: 'Todo Michoacán',
    state: 'Michoacán',
    emoji: '🗺',
    projects: 25,
    specialty: 'Atendemos todo el estado de Michoacán',
    slug: '/desarrollo-web-michoacan',
    whatsapp: 'https://wa.me/524423723972?text=Hola%2C%20soy%20de%20Michoac%C3%A1n%20y%20me%20interesa%20saber%20m%C3%A1s%20sobre%20sus%20servicios.',
    keywords: ['agencia digital Michoacán', 'páginas web Michoacán'],
  },
  {
    name: 'Nacional',
    state: 'México',
    emoji: '🇲🇽',
    projects: 15,
    specialty: 'Proyectos 100% remote en todo México',
    slug: '/desarrollo-web-mexico',
    whatsapp: 'https://wa.me/524423723972?text=Hola%2C%20me%20interesa%20cotizar%20un%20proyecto%20web%20con%20Revolution505.',
    keywords: ['agencia web México', 'desarrollo web México'],
  },
]
```

#### 10.3 SEO Local (Implementación)
```html
<!-- En cada city page route: -->
<title>Desarrollo Web en La Piedad, Michoacán — Revolution505</title>
<meta name="description" content="Agencia de desarrollo web en La Piedad Michoacán. Páginas profesionales desde $6,500. +12 proyectos locales. Llama: (442) 372-3972" />
<meta name="geo.region" content="MX-MI" />
<meta name="geo.placename" content="La Piedad, Michoacán" />
<link rel="canonical" href="https://revolution505.com/desarrollo-web-la-piedad" />

<!-- Schema markup: LocalBusiness -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Revolution505 Tech Solutions",
  "telephone": "+524423723972",
  "address": { "@type": "PostalAddress", "addressLocality": "La Piedad", "addressRegion": "Michoacán", "addressCountry": "MX" },
  "priceRange": "$$$",
  "openingHours": "Mo-Sa 09:00-19:00"
}
</script>
```

---

### 11. SIMULADOR DE RESULTADOS
**Archivo NUEVO:** `src/components/redesign/SimuladorSection.tsx`
**ID:** `id="simulador"`

**Concepto:** Ningún competidor tiene esto. El usuario selecciona su industria y ve métricas proyectadas animadas de lo que podría lograr con una web profesional.

#### 11.1 Selector de Industria
```tsx
const industries = [
  { id: 'restaurante',   label: 'Restaurante',         icon: '🍕' },
  { id: 'retail',        label: 'Tienda / Retail',      icon: '🛍' },
  { id: 'servicios',     label: 'Servicios',            icon: '🔧' },
  { id: 'salud',         label: 'Salud / Clínica',      icon: '💊' },
  { id: 'legal',         label: 'Despacho Legal',       icon: '⚖️' },
  { id: 'construccion',  label: 'Construcción',         icon: '🏗' },
  { id: 'educacion',     label: 'Educación',            icon: '📚' },
  { id: 'tecnologia',    label: 'Tecnología',           icon: '💻' },
]
```

#### 11.2 Métricas Proyectadas por Industria
```tsx
const projections: Record<string, Projection> = {
  restaurante: {
    newClients:    { value: '+45%',  label: 'Nuevos clientes mensuales',   icon: '👥' },
    googleRank:    { value: 'Top 3', label: 'Posición en Google local',    icon: '🔍' },
    reservations:  { value: '+120%', label: 'Reservas digitales',          icon: '📅' },
    revenue:       { value: '+30%',  label: 'Aumento de ingresos estimado', icon: '💰' },
    source: 'Basado en datos de 8 restaurantes clientes de Revolution505',
  },
  retail: {
    newClients:    { value: '+60%',  label: 'Visitas a tienda o web',      icon: '👥' },
    googleRank:    { value: 'Top 5', label: 'Posición en Google local',    icon: '🔍' },
    sales:         { value: '+85%',  label: 'Ventas online vs sin web',    icon: '🛒' },
    revenue:       { value: '+40%',  label: 'Aumento de ingresos estimado', icon: '💰' },
    source: 'Basado en datos de 12 tiendas clientes de Revolution505',
  },
  // ... demás industrias
}
```

#### 11.3 Visualización de Métricas
```tsx
// 4 cards de métricas (2x2 grid en mobile, 4 columnas en desktop)
// Cada card:
//   - Número grande animado (counter de 0 al valor en 2s)
//   - Icono + label
//   - Mini bar chart animado (GSAP width de 0 a porcentaje)
// Al cambiar industria: AnimatePresence con exit/enter animation
// Disclaimer: "Estimaciones basadas en proyectos reales de Revolution505"
// CTA: "¿Quieres estos resultados? Cotiza gratis →" → WhatsApp
```

#### 11.4 Mensaje WhatsApp del Simulador
```tsx
const buildSimulatorMessage = (industry: string, projection: Projection) => {
  const msg = `
📊 *Simulador de Resultados — Revolution505*

🏢 *Mi industria:* ${industry}
📈 *Proyección que vi:*
  • ${projection.newClients.label}: ${projection.newClients.value}
  • ${projection.googleRank.label}: ${projection.googleRank.value}
  • Aumento de ingresos estimado: ${projection.revenue.value}

Me interesa lograr estos resultados para mi negocio.
¿Pueden contactarme para una consulta gratuita?
  `.trim()
  return `https://wa.me/524423723972?text=${encodeURIComponent(msg)}`
}
```

---

### 12. PRECIOS TRANSPARENTES
**Archivo:** `src/components/redesign/PreciosSection.tsx` (MEJORAR)

**Concepto:** Superar a BastianSoft siendo MÁS transparentes y persuasivos.

#### 12.1 Planes Actualizados
```tsx
const plans = [
  {
    name: 'Esencial',
    emoji: '⚡',
    price: '6,500',
    originalPrice: null,
    desc: 'Para negocios que inician su presencia digital',
    delivery: '7 días hábiles',
    highlight: false,
    features: [
      'Landing page 1 página',
      'Diseño responsive (móvil + escritorio)',
      'Formulario de contacto',
      'SEO básico on-page',
      'Botón WhatsApp integrado',
      'Hosting + dominio 1 año incluidos',
    ],
    notIncluded: ['Blog', 'Panel admin', 'Integraciones'],
    whatsapp: 'https://wa.me/524423723972?text=Hola%2C%20me%20interesa%20el%20Plan%20Esencial%20%246%2C500.%20%C2%BFCu%C3%A1ndo%20podemos%20hablar%3F',
  },
  {
    name: 'Profesional',
    emoji: '🚀',
    price: '12,500',
    originalPrice: '15,000',
    desc: 'La opción más elegida por PyMEs en México',
    delivery: '12 días hábiles',
    highlight: true,
    badge: 'MÁS POPULAR',
    features: [
      'Sitio web hasta 5 páginas',
      'Diseño UX/UI personalizado',
      'SEO on-page completo + Schema markup',
      'Blog integrado',
      'Panel administrable (CMS)',
      'Integración WhatsApp + Redes Sociales',
      'Google Analytics + Search Console',
      'Capacitación 2h incluida',
      'Hosting + dominio 1 año incluidos',
      '30 días de soporte post-entrega',
    ],
    notIncluded: [],
    whatsapp: 'https://wa.me/524423723972?text=Hola%2C%20me%20interesa%20el%20Plan%20Profesional%20%2412%2C500.%20%C2%BFEst%C3%A1n%20disponibles%20para%20una%20llamada%3F',
  },
  {
    name: 'Premium',
    emoji: '💎',
    price: '22,500',
    originalPrice: null,
    desc: 'Solución completa para empresas que quieren dominar',
    delivery: '20 días hábiles',
    highlight: false,
    features: [
      'Sitio hasta 12 páginas + landing dedicadas',
      'Diseño UX/UI premium con micro-animaciones',
      'SEO avanzado + Google Business Profile',
      'E-commerce o reservas integrado',
      'CRM básico integrado',
      'Panel admin completo',
      'Correos corporativos ilimitados',
      'Integraciones API (WhatsApp Business, Mailchimp)',
      'Reportes mensuales de rendimiento',
      'Capacitación + soporte 60 días prioritario',
    ],
    notIncluded: [],
    whatsapp: 'https://wa.me/524423723972?text=Hola%2C%20me%20interesa%20el%20Plan%20Premium%20%2422%2C500.%20%C2%BFPodemos%20agendar%20una%20llamada%20de%20diagn%C3%B3stico%3F',
  },
]
```

#### 12.2 Comparativa Visual
```tsx
// Toggle: [Proyectos] vs [Sistemas]
// Al cambiar: AnimatePresence con slide

// Feature comparison table (opcional, expandible):
// "Ver comparativa completa →" → accordion que muestra tabla comparativa

// Garantía visual prominente:
// 🛡 "Garantía de satisfacción 30 días. Si no quedas satisfecho, devolvemos el 50%."

// ROI Calculator inline:
// "¿Cuánto vale tu proyecto? Si consigues 3 clientes extra al mes gracias a tu web..."
// Input: ticket promedio → muestra ROI en meses
```

#### 12.3 Nota de Urgencia (Opcional)
```tsx
// "⚡ Disponibilidad limitada — Solo tomamos 4 proyectos al mes para garantizar calidad."
// Mostrar solo si hay demanda real — verificar con el cliente
```

---

### 13. FAQ INTERACTIVO
**Archivo NUEVO:** `src/components/redesign/FAQSection.tsx`
**ID:** `id="faq"`

**Concepto:** Accordion animado que resuelve objeciones de compra. Supera a competidores que no tienen FAQ visible.

#### 13.1 Preguntas Definitivas
```tsx
const faqs = [
  {
    q: '¿Cuánto tiempo tarda en estar lista mi página?',
    a: 'Dependiendo del plan: Esencial en 7 días hábiles, Profesional en 12 días y Premium en 20 días. Proyectos urgentes con cobertura del 30% adicional pueden acelerarse.',
  },
  {
    q: '¿Qué pasa si no me gusta el diseño?',
    a: 'Primero te presentamos prototipos en Figma antes de programar una sola línea. Tienes 2 rondas de revisiones incluidas. Si no quedas satisfecho con el diseño inicial, lo rehacemos sin costo adicional.',
  },
  {
    q: '¿Necesito saber de tecnología para administrar mi sitio?',
    a: 'No. Instalamos un panel administrable (CMS) y te capacitamos en 2 horas para que puedas actualizar textos, imágenes y publicar en tu blog sin ayuda técnica.',
  },
  {
    q: '¿El hosting y dominio están incluidos?',
    a: 'Sí, todos los planes incluyen hosting y dominio .com.mx por 1 año. Al segundo año, el costo de renovación es aproximadamente $1,500 MXN anuales.',
  },
  {
    q: '¿Pueden crear mi página si estoy en otra ciudad de México?',
    a: 'Trabajamos 100% de forma remota. Hemos entregado proyectos en CDMX, Guadalajara, Monterrey y toda la República. La comunicación es por WhatsApp, Zoom y correo.',
  },
  {
    q: '¿Qué diferencia hay entre una landing page y un sitio web?',
    a: 'Una landing page es una sola página enfocada en convertir (ideal para campañas o negocios nuevos). Un sitio web tiene múltiples páginas: inicio, servicios, portafolio, contacto, etc.',
  },
  {
    q: '¿Ofrecen mantenimiento después de la entrega?',
    a: 'El plan Profesional incluye 30 días y el Premium 60 días de soporte. Después ofrecemos planes de mantenimiento mensual desde $800 MXN.',
  },
  {
    q: '¿Pueden hacer mi sitio aparecer en Google?',
    a: 'Implementamos SEO on-page en todos los planes (optimización técnica, keywords locales, Schema markup). El posicionamiento orgánico toma 2-4 meses promedio para términos locales.',
  },
]
```

#### 13.2 Diseño del Accordion
```tsx
// Cada item: border-b border-stroke py-5
// Pregunta: flex items-center justify-between → text-base font-medium + icono [+]/[-]
// Respuesta: AnimatePresence con height 0→auto usando layout animation
// Icono: rotación 0°→45° al abrir (smooth 0.2s)
// CTA al final: "¿Tienes otra pregunta?" → WhatsApp
```

---

### 14. FOOTER — Marquee + CTA Final + Links
**Archivo:** `src/components/redesign/FooterSection.tsx` (MEJORAR)

#### 14.1 Layout Completo
```
┌─────────────────────────────────────────────────────────┐
│ ● ● ● ● ● ● ● ●  MARQUEE SCROLLING  ● ● ● ● ● ● ● ●  │
│ REVOLUTION505 • TECNOLOGÍA • MICHOACÁN • SOLUCIONES •  │  ← GSAP xPercent
├─────────────────────────────────────────────────────────┤
│                                                         │
│        ¿Listo para transformar                          │
│          tu negocio digital?                            │  ← CTA BIG
│                                                         │
│   [📲 Hablar por WhatsApp]  [📧 Enviar correo]         │
│                                                         │
│   📍 La Piedad, Michoacán, México                       │
│   🕐 Lun-Sáb 9:00 - 19:00                              │
├─────────────────────────────────────────────────────────┤
│  [R]  Revolution505          Servicios    Empresa       │
│  Tech Solutions              - Web        - Nosotros    │
│  La Piedad, Michoacán        - Sistemas   - Portafolio  │
│  (442) 372-3972              - E-commerce - Blog        │
│                              - SEO        - Contacto    │
├─────────────────────────────────────────────────────────┤
│  © 2026 Revolution505    [Privacy] [Terms]              │
│  ● Disponible para proyectos           [WA][FB][IG][LI] │
└─────────────────────────────────────────────────────────┘
```

#### 14.2 GSAP Marquee (Reemplazar CSS)
```tsx
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const MarqueeText = () => {
  const marqueeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(marqueeRef.current, {
        xPercent: -50,
        duration: 40,
        ease: 'none',
        repeat: -1,
      })
    })
    return () => ctx.revert()
  }, [])

  const text = 'REVOLUTION505 • DISEÑO PREMIUM • MICHOACÁN • TECNOLOGÍA • RESULTADOS REALES • '

  return (
    <div className="overflow-hidden py-6 border-b border-stroke">
      <div ref={marqueeRef} className="flex whitespace-nowrap">
        {Array.from({ length: 10 }).map((_, i) => (
          <span key={i} className="text-sm font-display italic text-muted mx-4 flex-shrink-0">
            {text}
          </span>
        ))}
      </div>
    </div>
  )
}
```

#### 14.3 Disponibilidad Visual
```tsx
// Punto verde pulsante:
<span className="relative flex h-2 w-2">
  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
</span>
<span className="text-xs text-muted">Disponible para proyectos</span>
```

#### 14.4 CTAs del Footer con WhatsApp
```tsx
// CTA Principal:
const footerWA = 'https://wa.me/524423723972?text=Hola%20Revolution505%2C%20vi%20su%20p%C3%A1gina%20y%20quiero%20hablar%20sobre%20mi%20proyecto.'

// Email alternativo:
const emailCTA = 'mailto:hola@revolution505.com?subject=Consulta%20de%20proyecto&body=Hola%2C%20me%20interesa%20cotizar%20un%20proyecto%20web.'
```

---

## WHATSAPP MESSAGES DIRECTORY
Todos los mensajes prellenados del sitio — número: **+52 442 372 3972**

```tsx
export const WA_BASE = 'https://wa.me/524423723972?text='

export const WA_MESSAGES = {
  // Navbar CTA
  navbar: WA_BASE + encodeURIComponent('Hola, me interesa cotizar un proyecto web. ¿Están disponibles?'),

  // Hero CTA secundario
  hero: WA_BASE + encodeURIComponent('Hola Revolution505, vi su página web y quiero saber más sobre sus servicios.'),

  // Calculadora (dinámico — ver buildWhatsAppMessage())
  calculadora_base: WA_BASE + encodeURIComponent('Hola, usé su calculadora y quiero cotizar: '),

  // Configurador (dinámico — ver buildConfigMessage())
  configurador_base: WA_BASE + encodeURIComponent('Hola, completé el configurador y quiero avanzar con mi propuesta.'),

  // Planes
  plan_esencial:     WA_BASE + encodeURIComponent('Hola, me interesa el Plan Esencial ($6,500). ¿Cuándo podemos hablar?'),
  plan_profesional:  WA_BASE + encodeURIComponent('Hola, me interesa el Plan Profesional ($12,500). ¿Están disponibles?'),
  plan_premium:      WA_BASE + encodeURIComponent('Hola, me interesa el Plan Premium ($22,500). ¿Podemos agendar una llamada?'),

  // Sistemas
  sistema_restaurante: WA_BASE + encodeURIComponent('Hola, me interesa el Sistema POS para Restaurante. ¿Tienen una demo?'),
  sistema_pos:         WA_BASE + encodeURIComponent('Hola, me interesa el Sistema POS General. ¿Pueden darme información?'),

  // City pages
  la_piedad: WA_BASE + encodeURIComponent('Hola, soy de La Piedad y necesito una página web para mi negocio.'),
  morelia:   WA_BASE + encodeURIComponent('Hola, soy de Morelia y quiero cotizar un sitio web profesional.'),
  nacional:  WA_BASE + encodeURIComponent('Hola, me interesa sus servicios de desarrollo web. ¿Trabajan de forma remota?'),

  // Simulador (dinámico)
  simulador_base: WA_BASE + encodeURIComponent('Hola, usé el simulador de resultados y quiero esos resultados para mi negocio.'),

  // FAQ
  faq_custom: WA_BASE + encodeURIComponent('Hola, tengo una pregunta sobre sus servicios. ¿Podemos hablar?'),

  // Footer
  footer: WA_BASE + encodeURIComponent('Hola Revolution505, vi su página y quiero hablar sobre mi proyecto digital.'),

  // WhatsApp flotante
  floating: WA_BASE + encodeURIComponent('Hola Revolution505, ¿están disponibles para una consulta rápida?'),
}
```

---

## ESTRUCTURA DE ARCHIVOS FINAL

```
src/
├── components/
│   └── redesign/
│       ├── LoadingScreen.tsx        ✅ (mejorar exit animation)
│       ├── Navbar.tsx               ✅ (añadir WA number visible)
│       ├── HeroSection.tsx          ✅ (añadir social proof + client logos)
│       ├── ClientsMarquee.tsx       🆕 (logos clientes scrolling)
│       ├── CalculadoraSection.tsx   🆕 ⭐ KILLER FEATURE
│       ├── ConfiguradorSection.tsx  🆕 ⭐ DIFERENCIADOR
│       ├── SelectedWorks.tsx        🔄 (bento grid cinematográfico)
│       ├── SistemasSection.tsx      🆕 (POS, Reservas, CRM demo)
│       ├── ProcesoSection.tsx       🔄 (timeline animado)
│       ├── TestimoniosSection.tsx   🔄 (stats counters + métricas)
│       ├── CitySection.tsx          🆕 (SEO local)
│       ├── SimuladorSection.tsx     🆕 ⭐ DIFERENCIADOR
│       ├── PreciosSection.tsx       🔄 (garantía + ROI)
│       ├── FAQSection.tsx           🆕 (accordion animado)
│       ├── FooterSection.tsx        🔄 (GSAP marquee + disponibilidad)
│       └── WhatsAppButton.tsx       🔄 (con pulse animation)
├── constants/
│   └── whatsapp.ts                 🆕 (todos los mensajes WA)
├── hooks/
│   └── useCounterAnimation.ts      🆕 (para stats counters)
└── pages/
    └── Index.tsx                   🔄 (todas las secciones)
```

---

## ORDEN DE IMPLEMENTACIÓN RECOMENDADO

| Prioridad | Componente | Impacto Conversión | Tiempo Est. |
|---|---|---|---|
| 1 | `CalculadoraSection` | ⭐⭐⭐⭐⭐ | 4-5 horas |
| 2 | `SelectedWorks` bento upgrade | ⭐⭐⭐⭐ | 2 horas |
| 3 | `HeroSection` social proof | ⭐⭐⭐⭐ | 1 hora |
| 4 | `SistemasSection` | ⭐⭐⭐⭐ | 3 horas |
| 5 | `TestimoniosSection` stats | ⭐⭐⭐⭐ | 1.5 horas |
| 6 | `ConfiguradorSection` | ⭐⭐⭐⭐ | 3 horas |
| 7 | `FAQSection` | ⭐⭐⭐ | 1 hora |
| 8 | `SimuladorSection` | ⭐⭐⭐ | 2 horas |
| 9 | `CitySection` | ⭐⭐⭐ | 1 hora |
| 10 | `FooterSection` GSAP | ⭐⭐ | 1 hora |
| 11 | `ProcesoSection` timeline | ⭐⭐ | 1.5 horas |
| 12 | `ClientsMarquee` | ⭐⭐ | 0.5 horas |

---

## DEPENDENCIAS ADICIONALES RECOMENDADAS

```bash
# Ya instaladas — NO instalar nada más por ahora
# Todo puede hacerse con: gsap + framer-motion + lucide-react + tailwind

# Si se necesita en el futuro:
# npx @gsap/react → hook useGSAP (opcional, mejora DX)
```

---

## MÉTRICAS DE ÉXITO (KPIs)

```
Conversión objetivo:
- Tasa de click en CTAs WhatsApp: > 8%
- Tiempo en página: > 3 minutos
- Scroll depth: > 70%
- Uso de calculadora: > 25% de visitantes
- Bounce rate: < 40%

SEO Local:
- Posición Top 5 en "desarrollo web La Piedad"
- Posición Top 10 en "agencia web Michoacán"
- Core Web Vitals: LCP < 2.5s, FID < 100ms, CLS < 0.1
```

---

*Documento creado: 2026-06-03*
*Versión: 2.0 — Revolution505 Tech Solutions*
*Stack: React 19 + Vite 7 + Tailwind v4 + GSAP 3.15 + Framer Motion 12*
