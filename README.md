# 🚀 Aplicación de Personajes de Rick and Morty

Una aplicación web moderna desarrollada con Next.js 15, React 18 y Tailwind CSS que muestra los personajes de la serie Rick and Morty utilizando la API oficial. Diseñada y desarrollada por **Santiago Ruiz**.

## ✨ Características Principales

- 🏠 **Página Principal**: Lista de todos los personajes con paginación inteligente
- 👤 **Detalle de Personaje**: Página individual con información completa y animaciones
- 📱 **Completamente Responsive**: Diseño adaptativo para móviles, tablets y desktop
- ⚡ **Rendimiento Optimizado**: Next.js 15 con App Router y Server-Side Rendering
- 🎨 **Diseño Moderno**: Interfaz elegante con Tailwind CSS y animaciones fluidas
- 🌟 **Splash Screen**: Pantalla de carga con animaciones personalizadas
- 🍔 **Navegación Móvil**: Menú hamburguesa para dispositivos móviles
- 🇪🇸 **Interfaz en Español**: Completamente localizada para usuarios hispanohablantes

## 🛠️ Stack Tecnológico

- **Next.js 15** - Framework de React con App Router
- **React 18** - Biblioteca de UI con hooks modernos
- **TypeScript** - Tipado estático para mayor seguridad
- **Tailwind CSS** - Framework de CSS con diseño responsive
- **Rick and Morty API** - API externa para datos de personajes
- **Server-Side Rendering** - Optimización SEO y rendimiento

## Instalación

1. Clona el repositorio:
```bash
git clone <repository-url>
cd rick-and-morty-app
```

2. Instala las dependencias:
```bash
npm install
```

3. Ejecuta el servidor de desarrollo:
```bash
npm run dev
```

4. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Estructura del Proyecto

```
src/
├── app/
│   ├── character/[id]/
│   │   └── page.tsx          # Página de detalle del personaje
│   ├── globals.css           # Estilos globales
│   ├── layout.tsx            # Layout principal
│   └── page.tsx              # Página principal (home)
├── components/
│   ├── CharacterCard.tsx     # Tarjeta de personaje
│   └── Pagination.tsx        # Componente de paginación
├── lib/
│   └── api.ts                # Funciones para consumir la API
└── types/
    └── character.ts          # Tipos TypeScript
```

## 🎯 Funcionalidades Detalladas

### 🏠 Página Principal
- **Grid Responsive**: Cuadrícula adaptativa (1-2-3-4 columnas según pantalla)
- **Paginación Inteligente**: Navegación optimizada para móviles y desktop
- **Estados de Carga**: Spinner animado con mensajes contextuales
- **Manejo de Errores**: Página de error elegante con botón de reintento
- **Splash Screen**: Pantalla de carga con animaciones personalizadas
- **Navegación Fluida**: Transiciones suaves entre páginas

### 👤 Página de Detalle del Personaje
- **Información Completa**: Datos detallados del personaje
- **Imagen de Alta Calidad**: Optimizada con Next.js Image
- **Indicadores Visuales**: Estado del personaje con colores y animaciones
- **Secciones Organizadas**: Origen, ubicación, tipo y episodios
- **Lista de Episodios**: Grid responsive con chips animados
- **Navegación Intuitiva**: Botón de regreso con animaciones
- **Efectos Hover**: Interacciones visuales en la imagen del personaje

### 📱 Características Móviles
- **Menú Hamburguesa**: Navegación optimizada para móviles
- **Paginación Responsive**: Botones adaptativos para pantallas pequeñas
- **Grid Flexible**: Adaptación automática del contenido
- **Touch Friendly**: Botones y elementos optimizados para touch

## API Utilizada

La aplicación consume la [Rick and Morty API](https://rickandmortyapi.com/api) que proporciona:
- Lista paginada de personajes
- Información detallada de cada personaje
- Datos de episodios y ubicaciones

## Scripts Disponibles

- `npm run dev` - Ejecuta el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run start` - Ejecuta la aplicación en modo producción
- `npm run lint` - Ejecuta el linter de ESLint

## 🚀 Características Técnicas Avanzadas

### ⚡ Rendimiento y Optimización
- **Server-Side Rendering (SSR)** para mejor SEO y carga inicial
- **Client-Side Navigation** con Next.js App Router
- **Optimización de Imágenes** con Next.js Image y lazy loading
- **Hidratación Optimizada** para evitar errores de SSR
- **Código Splitting** automático para mejor rendimiento

### 🎨 Diseño y UX
- **Animaciones Fluidas** con Tailwind CSS y transiciones personalizadas
- **Gradientes Dinámicos** y efectos visuales modernos
- **Estados de Carga** con spinners animados y mensajes contextuales
- **Microinteracciones** en botones y elementos interactivos
- **Paleta de Colores** consistente y profesional

### 📱 Responsive Design
- **Mobile-First** approach con breakpoints optimizados
- **Grid Adaptativo** que se ajusta a cualquier pantalla
- **Navegación Móvil** con menú hamburguesa elegante
- **Touch Optimizations** para mejor experiencia táctil

### 🔧 Desarrollo
- **TypeScript** para mayor seguridad de tipos y mejor DX
- **Hooks Personalizados** para manejo de estado y efectos
- **Componentes Reutilizables** con props tipadas
- **Manejo de Errores** robusto con fallbacks elegantes
- **SEO Optimizado** con metadata personalizada

### 🌐 Internacionalización
- **Interfaz en Español** completamente localizada
- **HTML lang="es"** para mejor SEO en español
- **Textos Contextuales** adaptados al idioma
- **Navegación Localizada** con términos en español

## 👨‍💻 Desarrollador

**Santiago Ruiz** - Desarrollador Full Stack
- 🌐 **GitHub**: [@devsantiagox](https://github.com/devsantiagox)
- 🏆 **Especialización**: React, Next.js, TypeScript, Node.js
- 📍 **Ubicación**: Bogotá, Colombia

## 🎨 Mejoras Implementadas

### ✨ Experiencia de Usuario
- **Splash Screen Personalizado** con animaciones y branding
- **Header Elegante** con avatar animado y navegación responsive
- **Tarjetas de Personajes** con efectos hover y microinteracciones
- **Paginación Inteligente** que se adapta a móviles y desktop
- **Estados de Carga** con mensajes contextuales y animaciones

### 🎯 Optimizaciones Técnicas
- **Next.js 15** con App Router y optimizaciones de rendimiento
- **TypeScript** para mayor seguridad y mejor experiencia de desarrollo
- **Tailwind CSS** con diseño system consistente
- **Responsive Design** optimizado para todos los dispositivos
- **SEO Optimizado** con metadata personalizada

### 🌟 Características Únicas
- **Interfaz Completamente en Español** para usuarios hispanohablantes
- **Menú Hamburguesa** para navegación móvil elegante
- **Animaciones Fluidas** en todos los componentes
- **Gradientes Dinámicos** y efectos visuales modernos
- **Navegación Intuitiva** con transiciones suaves

## 🚀 Próximas Mejoras

- [ ] **Filtros de Búsqueda** por especie, estado y género
- [ ] **Favoritos** para guardar personajes preferidos
- [ ] **Modo Oscuro** con tema personalizable
- [ ] **PWA** para instalación como app móvil
- [ ] **Tests** unitarios y de integración