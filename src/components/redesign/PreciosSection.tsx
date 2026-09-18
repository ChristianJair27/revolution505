import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, ArrowRight, X, Shield, Mail } from 'lucide-react'
import CasoProcesoBlock from './CasoProcesoBlock'
import { WA, CONTACT_MAILTO, CONTACT_EMAIL } from '../../constants/whatsapp'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ─────────────────────────────────────────────────────────────────────────────
// Types & data
// ─────────────────────────────────────────────────────────────────────────────
type TabType = 'web' | 'sistemas'

interface Plan {
  id:            string
  name:          string
  emoji:         string
  price:         number
  originalPrice?: number
  desc:          string
  delivery:      string
  highlight:     boolean
  badge?:        string
  features:      string[]
  notIncluded:   string[]
  wa:            string
}

const WEB_PLANS: Plan[] = [
  {
    id:          'esencial',
    name:        'Esencial',
    emoji:       '⚡',
    price:       6_500,
    desc:        'Para negocios que inician su presencia digital',
    delivery:    '5-7 días hábiles',
    highlight:   false,
    features: [
      'Landing page 1 página de alta conversión',
      'Diseño responsive (móvil + escritorio)',
      'Formulario de contacto + botón WhatsApp',
      'SEO básico on-page',
      'Hosting + dominio .com.mx 1 año',
    ],
    notIncluded: ['Blog', 'Panel admin', 'Google Analytics'],
    wa: WA.planBasico,
  },
  {
    id:            'profesional',
    name:          'Profesional',
    emoji:         '🚀',
    price:         12_500,
    originalPrice: 15_000,
    desc:          'La opción más elegida por PyMEs en Querétaro',
    delivery:      '10-15 días hábiles',
    highlight:     true,
    badge:         'MÁS POPULAR',
    features: [
      'Sitio web hasta 5 páginas',
      'Diseño UX/UI personalizado',
      'SEO on-page completo + Schema markup',
      'Blog integrado',
      'Panel administrable (CMS)',
      'Google Analytics + Search Console',
      'Integración WhatsApp + Redes Sociales',
      'Capacitación 2h incluida',
      'Hosting + dominio 1 año incluidos',
      '30 días soporte post-entrega',
    ],
    notIncluded:   [],
    wa: WA.planPro,
  },
  {
    id:       'premium',
    name:     'Premium',
    emoji:    '💎',
    price:    22_500,
    desc:     'Solución completa para empresas que quieren dominar su mercado',
    delivery: '20-25 días hábiles',
    highlight: false,
    features: [
      'Sitio hasta 12 páginas + landings dedicadas',
      'Diseño UX/UI premium con micro-animaciones',
      'SEO avanzado + Google Business Profile',
      'E-commerce o sistema de reservas integrado',
      'Panel admin completo',
      'Correos corporativos ilimitados',
      'Integraciones API (WhatsApp Business, CRM)',
      'Reportes mensuales de rendimiento',
      'Capacitación + 60 días soporte prioritario',
    ],
    notIncluded: [],
    wa: WA.planPremium,
  },
]

const SISTEMA_PLANS: Plan[] = [
  {
    id:       'pos',
    name:     'Sistema POS',
    emoji:    '🖥',
    price:    18_000,
    desc:     'POS restaurante desde $18,000 (general desde $14,000 en /sistemas)',
    delivery: '20-30 días hábiles',
    highlight: false,
    features: [
      'Control de inventario en tiempo real',
      'Emisión de tickets y cobros rápidos',
      'Reportes de ventas diarios/mensuales',
      'Multi-usuario con permisos por rol',
      'Compatible con impresoras térmicas',
      'Modo offline (sin internet)',
      'Sin mensualidades — código tuyo',
    ],
    notIncluded: ['Multi-sucursal'],
    wa: WA.sistPOS,
  },
  {
    id:       'reservas',
    name:     'Sis. Reservas',
    emoji:    '📅',
    price:    16_000,
    desc:     'Agenda digital para clínicas, restaurantes y servicios',
    delivery: '18-25 días hábiles',
    highlight: true,
    badge:    'MÁS PEDIDO',
    features: [
      'Calendario de citas en tiempo real',
      'Confirmaciones automáticas por WhatsApp',
      'Panel admin + vista para clientes',
      'Recordatorios automáticos de citas',
      'Sync con Google Calendar (opcional)',
      'Reportes de ocupación',
      'Sin mensualidades — código tuyo',
    ],
    notIncluded: [],
    wa: WA.sistReservas,
  },
  {
    id:       'crm',
    name:     'CRM Empresarial',
    emoji:    '👥',
    price:    22_000,
    desc:     'Gestión completa de clientes, pipeline y ventas',
    delivery: '25-35 días hábiles',
    highlight: false,
    features: [
      'Base de datos completa de clientes',
      'Pipeline de ventas visual (Kanban)',
      'Seguimiento de tareas y oportunidades',
      'Dashboard ejecutivo con métricas',
      'Historial de interacciones',
      'Reportes de conversión',
      'Sin mensualidades — código tuyo',
    ],
    notIncluded: [],
    wa: WA.sistCRM,
  },
]

const fmt = (n: number) => new Intl.NumberFormat('es-MX').format(n)
