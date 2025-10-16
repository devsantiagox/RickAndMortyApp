# 🚀 Aplicación de Personajes de Rick and Morty

Una aplicación web moderna desarrollada con Next.js 15, React 18 y Tailwind CSS que muestra los personajes de la serie Rick and Morty utilizando la API oficial. Diseñada y desarrollada por **Santiago Ruiz**.

## ✨ Características Principales

- 🏠 **Página Principal**: Lista de todos los personajes con paginación inteligente
- 👤 **Detalle de Personaje**: Página individual con información completa y animaciones
- 🔐 **Sistema de Autenticación**: Registro y login con JWT y MongoDB
- 🔄 **State Management Redux-Style**: Zustand con middleware Redux DevTools
- 📱 **Completamente Responsive**: Diseño adaptativo para móviles, tablets y desktop
- ⚡ **Rendimiento Optimizado**: Next.js 15 con App Router y Server-Side Rendering
- 🎨 **Diseño Moderno**: Interfaz elegante con Tailwind CSS y animaciones fluidas
- 🌟 **Splash Screen**: Pantalla de carga con animaciones personalizadas
- 🍔 **Navegación Móvil**: Menú hamburguesa para dispositivos móviles
- 🇪🇸 **Interfaz en Español**: Completamente localizada para usuarios hispanohablantes

## 🛠️ Stack Tecnológico

- **Next.js 15** - Framework de React con App Router
- **React 19** - Biblioteca de UI con hooks modernos
- **TypeScript** - Tipado estático para mayor seguridad
- **Tailwind CSS** - Framework de CSS con diseño responsive
- **Zustand** - State management con middleware Redux
- **MongoDB** - Base de datos NoSQL para usuarios
- **Mongoose** - ODM para MongoDB
- **JWT** - Autenticación basada en tokens
- **bcryptjs** - Encriptación de contraseñas
- **Rick and Morty API** - API externa para datos de personajes
- **Server-Side Rendering** - Optimización SEO y rendimiento

## 🚀 Instalación

### 1. Clona el repositorio:
```bash
git clone <repository-url>
cd rick-and-morty-app
```

### 2. Instala las dependencias:
```bash
npm install
```

### 3. Configura las variables de entorno:

Crea un archivo `.env.local` en la raíz del proyecto:

```env
# MongoDB Connection (elige una opción)
# Opción A: MongoDB Local
MONGODB_URI=mongodb://localhost:27017/rick-and-morty-auth

# Opción B: MongoDB Atlas (recomendado)
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/rick-and-morty-auth?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=tu-clave-secreta-super-segura-cambiar-en-produccion
JWT_EXPIRES_IN=7d
```

### 4. (Opcional) Prueba la conexión a MongoDB:
```bash
node scripts/test-db.js
```

### 5. Ejecuta el servidor de desarrollo:
```bash
npm run dev
```

### 6. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

> 📖 **Nota**: Para instrucciones detalladas sobre el sistema de autenticación, consulta [AUTH_SETUP.md](./AUTH_SETUP.md)

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── api/
│   │   └── auth/
│   │       ├── login/route.ts       # API endpoint para login
│   │       ├── register/route.ts    # API endpoint para registro
│   │       └── me/route.ts          # API endpoint para verificar usuario
│   ├── auth/
│   │   └── page.tsx                 # Página de login/registro
│   ├── character/[id]/
│   │   └── page.tsx                 # Página de detalle del personaje
│   ├── globals.css                  # Estilos globales
│   ├── layout.tsx                   # Layout principal con AuthProvider
│   └── page.tsx                     # Página principal (home)
├── components/
│   ├── auth/
│   │   ├── LoginForm.tsx            # Formulario de login
│   │   ├── RegisterForm.tsx         # Formulario de registro
│   │   ├── AuthButton.tsx           # Botón de autenticación en header
│   │   └── AuthProvider.tsx         # Provider para inicializar auth
│   ├── CharacterCard.tsx            # Tarjeta de personaje
│   ├── Header.tsx                   # Header con navegación y auth
│   └── Pagination.tsx               # Componente de paginación
├── store/
│   └── authStore.ts                 # Zustand store con middleware Redux
├── models/
│   └── User.ts                      # Modelo de MongoDB para usuarios
├── lib/
│   ├── api.ts                       # Funciones para consumir la API
│   ├── mongodb.ts                   # Conexión a MongoDB
│   └── jwt.ts                       # Utilidades para JWT
├── types/
│   ├── auth.ts                      # Tipos TypeScript para auth
│   └── character.ts                 # Tipos TypeScript para personajes
└── middleware.ts                    # Middleware de Next.js para proteger rutas
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

## 📜 Scripts Disponibles

- `npm run dev` - Ejecuta el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run start` - Ejecuta la aplicación en modo producción
- `npm run lint` - Ejecuta el linter de ESLint
- `node scripts/test-db.js` - Prueba la conexión a MongoDB

## 🔐 Sistema de Autenticación

### Características Implementadas

- ✅ **Registro de Usuarios**: Crea cuenta con nombre, email y contraseña
- ✅ **Login**: Inicia sesión con email y contraseña
- ✅ **JWT Tokens**: Autenticación segura basada en tokens
- ✅ **MongoDB**: Base de datos para almacenar usuarios
- ✅ **Encriptación**: Contraseñas hasheadas con bcrypt
- ✅ **Zustand + Redux**: State management con Redux DevTools
- ✅ **Middleware**: Protección de rutas y verificación de tokens
- ✅ **Persistencia**: Estado guardado en localStorage
- ✅ **UI Moderna**: Formularios elegantes con validación

### Rutas Disponibles

- `/auth` - Página de login y registro
- `/api/auth/register` - API endpoint para registro
- `/api/auth/login` - API endpoint para login
- `/api/auth/me` - API endpoint para verificar usuario actual

### Uso Rápido

1. **Crear cuenta**: Ve a `/auth` y registra un nuevo usuario
2. **Iniciar sesión**: Ingresa tu email y contraseña
3. **Ver perfil**: Tu nombre aparecerá en el header
4. **Cerrar sesión**: Click en tu avatar y selecciona "Cerrar Sesión"

### Redux DevTools

El store de Zustand está integrado con Redux DevTools:
- Instala la [extensión de navegador](https://chrome.google.com/webstore/detail/redux-devtools)
- Abre DevTools → pestaña "Redux"
- Ve todas las acciones y cambios de estado en tiempo real

Para más información sobre el sistema de autenticación:
- 📖 [Guía de Configuración](./AUTH_SETUP.md)
- 🔄 [Guía de Zustand con Redux](./ZUSTAND_REDUX_GUIDE.md)

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

## ✨ Mejoras Recientes

- ✅ **Sistema de Autenticación Completo** con JWT y MongoDB
- ✅ **Zustand + Redux DevTools** para state management profesional
- ✅ **Middleware de Protección** para rutas seguras
- ✅ **UI Moderna de Auth** con validaciones y feedback
- ✅ **Persistencia de Sesión** con localStorage

## 🚀 Próximas Mejoras

- [ ] **Filtros de Búsqueda** por especie, estado y género
- [ ] **Favoritos** para guardar personajes preferidos (requiere auth)
- [ ] **Perfil de Usuario** con edición de datos
- [ ] **Modo Oscuro** con tema personalizable
- [ ] **PWA** para instalación como app móvil
- [ ] **Tests** unitarios y de integración
- [ ] **OAuth** con Google y GitHub
- [ ] **Roles de Usuario** (admin, user)