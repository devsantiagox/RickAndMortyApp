# 🚀 Inicio Rápido - Sistema de Autenticación

## ⚡ 5 Minutos para Empezar

### Paso 1: Crear `.env.local`

Crea el archivo `.env.local` en la raíz del proyecto:

```env
# MongoDB (elige una opción)
MONGODB_URI=mongodb://localhost:27017/rick-and-morty-auth

# JWT
JWT_SECRET=mi-super-secreto-2024-cambiar-en-produccion
JWT_EXPIRES_IN=7d
```

### Paso 2: Instalar MongoDB

**Opción A - MongoDB Atlas (Más fácil, recomendado)**
1. Ve a https://www.mongodb.com/cloud/atlas
2. Crea una cuenta gratis
3. Crea un cluster (FREE tier)
4. Obtén el connection string
5. Actualiza `MONGODB_URI` en `.env.local`

**Opción B - MongoDB Local**
- Windows: Descarga de https://www.mongodb.com/try/download/community
- Mac: `brew install mongodb-community`
- Linux: `sudo apt install mongodb`

📖 **Guía detallada**: Ver [MONGODB_SETUP.md](./MONGODB_SETUP.md)

### Paso 3: Probar la Conexión

```bash
node scripts/test-db.js
```

Deberías ver: ✅ ¡Conexión exitosa a MongoDB!

### Paso 4: Iniciar la Aplicación

```bash
npm run dev
```

### Paso 5: Probar el Sistema

1. **Abrir la app**: http://localhost:3000
2. **Ir a autenticación**: http://localhost:3000/auth
3. **Crear cuenta**:
   - Nombre: Tu nombre
   - Email: tu@email.com
   - Password: mínimo 6 caracteres
4. **¡Listo!** Deberías ver tu nombre en el header

## 🎯 ¿Qué Puedes Hacer Ahora?

### ✅ Funcionalidades Disponibles

1. **Registrarse** - Crear una nueva cuenta
2. **Iniciar Sesión** - Acceder con tu cuenta
3. **Ver Perfil** - Tu información en el header
4. **Cerrar Sesión** - Salir de tu cuenta
5. **Persistencia** - Tu sesión se mantiene al recargar

### 🔄 Usando el Store de Zustand

```typescript
import { useAuthStore } from '@/store/authStore';

function MyComponent() {
  const { user, login, logout, register } = useAuthStore();
  
  // Login
  await login({ email: 'user@example.com', password: 'pass123' });
  
  // Register
  await register({ 
    name: 'Juan', 
    email: 'juan@example.com', 
    password: 'pass123' 
  });
  
  // Logout
  logout();
  
  // Verificar auth
  if (user) {
    console.log('Usuario autenticado:', user.name);
  }
}
```

### 🛠️ Redux DevTools

1. Instala la extensión: [Chrome](https://chrome.google.com/webstore/detail/redux-devtools)
2. Abre DevTools → Pestaña "Redux"
3. Ve las acciones en tiempo real:
   - `auth/loginStart`
   - `auth/loginSuccess`
   - `auth/logout`

## 📁 Archivos Importantes Creados

```
Sistema de Autenticación
├── 📂 Backend
│   ├── src/app/api/auth/register/route.ts  # Registro
│   ├── src/app/api/auth/login/route.ts     # Login
│   ├── src/app/api/auth/me/route.ts        # Verificar usuario
│   ├── src/models/User.ts                   # Modelo de MongoDB
│   ├── src/lib/mongodb.ts                   # Conexión DB
│   └── src/lib/jwt.ts                       # Utilidades JWT
│
├── 📂 Frontend
│   ├── src/components/auth/LoginForm.tsx
│   ├── src/components/auth/RegisterForm.tsx
│   ├── src/components/auth/AuthButton.tsx
│   └── src/app/auth/page.tsx
│
├── 📂 State Management
│   └── src/store/authStore.ts               # Zustand + Redux
│
├── 📂 Seguridad
│   └── src/middleware.ts                    # Protección de rutas
│
└── 📂 Documentación
    ├── AUTH_SETUP.md                        # Guía completa
    ├── ZUSTAND_REDUX_GUIDE.md              # Guía de Zustand
    ├── MONGODB_SETUP.md                    # Guía de MongoDB
    └── QUICK_START.md                      # Este archivo
```

## 🧪 Probar las APIs Directamente

### Registro

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "password": "password123"
  }'
```

### Login

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "juan@example.com",
    "password": "password123"
  }'
```

### Verificar Usuario

```bash
curl http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer TU_TOKEN_AQUI"
```

## 🎨 Personalizar el Sistema

### Cambiar Tiempo de Expiración del Token

En `.env.local`:
```env
JWT_EXPIRES_IN=1d   # 1 día
JWT_EXPIRES_IN=12h  # 12 horas
JWT_EXPIRES_IN=30d  # 30 días
```

### Proteger Rutas Adicionales

En `src/middleware.ts`:
```typescript
const protectedRoutes = [
  '/profile',
  '/favorites',
  '/dashboard',
  '/admin',     // Agregar nueva ruta
];
```

### Personalizar UI

Los formularios están en:
- `src/components/auth/LoginForm.tsx`
- `src/components/auth/RegisterForm.tsx`

Usan Tailwind CSS, modifica las clases para cambiar estilos.

## 🐛 Problemas Comunes

### "Cannot connect to MongoDB"

**Solución**:
```bash
# Verificar que MongoDB esté corriendo
# Windows: Servicios → MongoDB → Iniciar
# Mac: brew services start mongodb-community
# Linux: sudo systemctl start mongod

# O usar MongoDB Atlas (más fácil)
```

### "JWT secret not found"

**Solución**:
- Verifica que existe `.env.local`
- Verifica que `JWT_SECRET` está definido
- Reinicia el servidor: `npm run dev`

### "Email already exists"

**Solución**:
- El email ya está registrado
- Usa otro email o inicia sesión

## 📚 Documentación Completa

- 📖 [AUTH_SETUP.md](./AUTH_SETUP.md) - Configuración detallada
- 🔄 [ZUSTAND_REDUX_GUIDE.md](./ZUSTAND_REDUX_GUIDE.md) - Guía de Zustand
- 🍃 [MONGODB_SETUP.md](./MONGODB_SETUP.md) - Configuración de MongoDB
- 📘 [README.md](./README.md) - Información general del proyecto

## 💡 Siguientes Pasos

1. ✅ Crear tu primera cuenta
2. ✅ Explorar Redux DevTools
3. ✅ Ver el código del store en `src/store/authStore.ts`
4. ✅ Probar las APIs con Postman o curl
5. ✅ Personalizar la UI según tus necesidades
6. ✅ Agregar más funcionalidades (perfil, favoritos, etc.)

## 🎉 ¡Listo!

Tu aplicación Rick and Morty ahora tiene:
- ✅ Registro de usuarios
- ✅ Login con JWT
- ✅ State management profesional con Zustand
- ✅ Middleware Redux DevTools
- ✅ Base de datos MongoDB
- ✅ Protección de rutas
- ✅ UI moderna y responsive

**¿Tienes dudas?** Revisa la documentación completa en los archivos `.md`

**¿Encontraste un bug?** Revisa la sección de Troubleshooting

¡Disfruta tu aplicación! 🚀

