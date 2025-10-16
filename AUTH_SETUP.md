# 🔐 Sistema de Autenticación - Rick and Morty App

## 📋 Resumen

Se ha implementado un sistema completo de autenticación con las siguientes tecnologías:

- **Zustand**: State management con middleware Redux-style
- **JWT**: Autenticación basada en tokens
- **MongoDB**: Base de datos para usuarios
- **Mongoose**: ODM para MongoDB
- **bcryptjs**: Encriptación de contraseñas
- **Next.js 15**: API Routes y Middleware

## 🚀 Configuración Inicial

### 1. Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/rick-and-morty-auth
# O usa MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/rick-and-morty-auth?retryWrites=true&w=majority

# JWT Secret (IMPORTANTE: Cambia esto en producción)
JWT_SECRET=tu-clave-secreta-super-segura-2024

# JWT Expiration
JWT_EXPIRES_IN=7d
```

### 2. Opciones de Base de Datos

#### Opción A: MongoDB Local

1. Instala MongoDB: https://www.mongodb.com/try/download/community
2. Inicia MongoDB:
   ```bash
   mongod
   ```
3. Usa la URI local en `.env.local`:
   ```
   MONGODB_URI=mongodb://localhost:27017/rick-and-morty-auth
   ```

#### Opción B: MongoDB Atlas (Recomendado para producción)

1. Crea una cuenta gratis en: https://www.mongodb.com/cloud/atlas
2. Crea un cluster
3. Obtén tu connection string
4. Actualiza `.env.local` con tu URI de Atlas

### 3. Iniciar la Aplicación

```bash
npm run dev
```

La aplicación estará disponible en: http://localhost:3000

## 📁 Estructura de Archivos Creados

```
src/
├── app/
│   ├── api/
│   │   └── auth/
│   │       ├── login/route.ts       # API endpoint para login
│   │       ├── register/route.ts    # API endpoint para registro
│   │       └── me/route.ts          # API endpoint para verificar usuario
│   └── auth/
│       └── page.tsx                 # Página de login/registro
├── components/
│   └── auth/
│       ├── LoginForm.tsx            # Formulario de login
│       ├── RegisterForm.tsx         # Formulario de registro
│       ├── AuthButton.tsx           # Botón de autenticación en header
│       └── AuthProvider.tsx         # Provider para inicializar auth
├── store/
│   └── authStore.ts                 # Zustand store con middleware Redux
├── models/
│   └── User.ts                      # Modelo de MongoDB para usuarios
├── lib/
│   ├── mongodb.ts                   # Conexión a MongoDB
│   └── jwt.ts                       # Utilidades para JWT
├── types/
│   └── auth.ts                      # Tipos TypeScript para auth
└── middleware.ts                    # Middleware de Next.js para proteger rutas
```

## 🎯 Características Implementadas

### 1. Zustand Store con Middleware Redux

El store de autenticación incluye:
- **Redux DevTools**: Integración con Redux DevTools para debugging
- **Persistencia**: Los datos se guardan en localStorage
- **Acciones Síncronas y Asíncronas**: Similar a Redux con actions y thunks
- **Selectores**: Para acceso optimizado al estado

```typescript
// Ejemplo de uso del store
import { useAuthStore } from '@/store/authStore';

function MyComponent() {
  const { user, login, logout, isAuthenticated } = useAuthStore();
  
  // Usar las acciones
  await login({ email, password });
  logout();
}
```

### 2. API Routes

#### POST `/api/auth/register`
Registra un nuevo usuario

```json
{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "password": "password123"
}
```

#### POST `/api/auth/login`
Inicia sesión

```json
{
  "email": "juan@example.com",
  "password": "password123"
}
```

#### GET `/api/auth/me`
Verifica el usuario actual (requiere token en header)

```
Authorization: Bearer <token>
```

### 3. Middleware de Protección

Las siguientes rutas están protegidas y requieren autenticación:
- `/profile`
- `/favorites`
- `/dashboard`

Si intentas acceder sin autenticación, serás redirigido a `/auth`.

### 4. Componentes de UI

#### Formulario de Login
- Validación de email y contraseña
- Mostrar/ocultar contraseña
- Manejo de errores
- Loading states

#### Formulario de Registro
- Validación completa de campos
- Confirmación de contraseña
- Mensajes de error descriptivos
- Auto-login después del registro

#### Botón de Autenticación
- Muestra el estado del usuario
- Menú desplegable con opciones
- Responsive para mobile y desktop

## 🔧 Uso del Store Redux-Style

### Estructura del Store

```typescript
// Estado
{
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Acciones Síncronas (como reducers)
setUser(user)
setToken(token)
setLoading(isLoading)
setError(error)
clearError()

// Acciones Asíncronas (como thunks)
login(credentials)
register(data)
logout()
checkAuth()
```

### Selectores

```typescript
import { useAuthStore, selectUser, selectIsAuthenticated } from '@/store/authStore';

// Usando selectores
const user = useAuthStore(selectUser);
const isAuthenticated = useAuthStore(selectIsAuthenticated);

// O accediendo directamente
const { user, isAuthenticated } = useAuthStore();
```

### Redux DevTools

Con el ambiente en desarrollo, puedes usar Redux DevTools para:
- Ver todas las acciones dispatched
- Inspeccionar el estado en tiempo real
- Time-travel debugging

## 🔒 Seguridad

### Contraseñas
- Encriptadas con bcryptjs (10 rounds de salt)
- Nunca se retornan en las respuestas de la API
- Mínimo 6 caracteres

### JWT Tokens
- Firmados con clave secreta
- Expiran en 7 días por defecto
- Verificados en cada request protegido

### Base de Datos
- Emails únicos
- Índices en campos importantes
- Validación de datos con Mongoose

## 🧪 Pruebas

### Probar Registro
1. Ve a http://localhost:3000/auth
2. Haz clic en "Regístrate aquí"
3. Completa el formulario
4. Deberías ser redirigido al inicio con sesión iniciada

### Probar Login
1. Ve a http://localhost:3000/auth
2. Ingresa tus credenciales
3. Haz clic en "Iniciar Sesión"
4. Deberías ver tu nombre en el header

### Probar Logout
1. Haz clic en tu avatar/nombre en el header
2. Selecciona "Cerrar Sesión"
3. Deberías ser redirigido a la página de auth

## 📊 Estructura de la Base de Datos

### Colección: users

```javascript
{
  _id: ObjectId,
  name: String,        // 2-50 caracteres
  email: String,       // único, lowercase, validado
  password: String,    // hash bcrypt
  createdAt: Date,     // auto-generado
  updatedAt: Date      // auto-actualizado
}
```

## 🎨 Personalización

### Cambiar Tiempo de Expiración del Token

En `.env.local`:
```env
JWT_EXPIRES_IN=30d  # 30 días
JWT_EXPIRES_IN=24h  # 24 horas
JWT_EXPIRES_IN=60m  # 60 minutos
```

### Añadir Rutas Protegidas

En `src/middleware.ts`:
```typescript
const protectedRoutes = ['/profile', '/favorites', '/dashboard', '/tu-ruta'];
```

### Personalizar Colores y Estilos

Los componentes usan Tailwind CSS, puedes modificar:
- `src/components/auth/LoginForm.tsx`
- `src/components/auth/RegisterForm.tsx`
- `src/components/auth/AuthButton.tsx`

## 🐛 Troubleshooting

### Error: "Cannot connect to MongoDB"
- Verifica que MongoDB esté corriendo
- Revisa la URI en `.env.local`
- Si usas Atlas, verifica que tu IP esté en la whitelist

### Error: "JWT secret not found"
- Asegúrate de tener el archivo `.env.local` creado
- Verifica que `JWT_SECRET` esté definido
- Reinicia el servidor de desarrollo

### Error: "Email already exists"
- El email ya está registrado en la base de datos
- Usa otro email o inicia sesión con el existente

### El store no persiste los datos
- Verifica que el navegador soporte localStorage
- Revisa la consola del navegador por errores
- Limpia el localStorage: `localStorage.clear()`

## 📚 Recursos Adicionales

- [Zustand Documentation](https://docs.pmnd.rs/zustand)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [JWT.io](https://jwt.io/)
- [Mongoose Documentation](https://mongoosejs.com/docs/)

## 🎉 ¡Todo Listo!

Tu aplicación ahora tiene un sistema completo de autenticación con:
- ✅ Registro de usuarios
- ✅ Inicio de sesión
- ✅ Protección de rutas
- ✅ State management con Zustand
- ✅ Middleware Redux-style
- ✅ JWT tokens
- ✅ Base de datos MongoDB
- ✅ UI moderna y responsive

¡Disfruta tu aplicación de Rick and Morty con autenticación! 🚀

