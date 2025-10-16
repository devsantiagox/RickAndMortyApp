# 🚀 Configuración de Vercel

Esta guía te ayudará a desplegar tu aplicación en Vercel con todas las variables de entorno correctas.

## 📋 Prerequisitos

1. ✅ Cuenta de Vercel (gratis): https://vercel.com/signup
2. ✅ MongoDB Atlas configurado (ver `MONGODB_SETUP.md`)
3. ✅ Código en GitHub, GitLab o Bitbucket
4. ✅ Variables de entorno listas

## 🔑 Variables de Entorno Requeridas

Necesitas configurar estas variables en Vercel:

### 1. MONGODB_URI
**Descripción**: Connection string de MongoDB Atlas  
**Valor**: `mongodb+srv://username:password@cluster.mongodb.net/rick-and-morty-auth?retryWrites=true&w=majority`  
**Ambiente**: Production, Preview, Development

**Cómo obtenerla**:
1. Ve a [MongoDB Atlas](https://cloud.mongodb.com/)
2. Navega a tu cluster → Connect
3. Selecciona "Connect your application"
4. Copia el connection string
5. Reemplaza `<password>` con tu contraseña real
6. Asegúrate de incluir el nombre de la base de datos: `/rick-and-morty-auth`

**Ejemplo**:
```
mongodb+srv://rickmorty_admin:MySecurePass123@rick-morty-cluster.abc123.mongodb.net/rick-and-morty-auth?retryWrites=true&w=majority
```

### 2. JWT_SECRET
**Descripción**: Clave secreta para firmar los tokens JWT  
**Valor**: Una cadena aleatoria de al menos 32 caracteres  
**Ambiente**: Production, Preview, Development

**Cómo generarla**:
```bash
# En tu terminal local
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Ejemplo de salida**:
```
a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2
```

### 3. NEXT_PUBLIC_API_URL (Opcional)
**Descripción**: URL de la API de Rick and Morty  
**Valor**: `https://rickandmortyapi.com/api`  
**Ambiente**: Production, Preview, Development

**Nota**: Esta ya está configurada por defecto en el código, pero puedes sobrescribirla si necesitas.

## 🚀 Pasos de Despliegue

### Método 1: Desde el Dashboard de Vercel (Recomendado)

#### Paso 1: Importar Proyecto

1. Ve a [Vercel Dashboard](https://vercel.com/dashboard)
2. Haz clic en "Add New..." → "Project"
3. Selecciona tu repositorio de GitHub/GitLab/Bitbucket
4. Si no aparece, haz clic en "Adjust GitHub App Permissions"
5. Selecciona el repositorio `RickAndMortyApp`

#### Paso 2: Configurar el Proyecto

1. **Framework Preset**: Next.js (detectado automáticamente)
2. **Root Directory**: `./` (raíz del proyecto)
3. **Build Command**: `npm run build` (por defecto)
4. **Output Directory**: `.next` (por defecto)

#### Paso 3: Agregar Variables de Entorno

1. Haz clic en "Environment Variables"
2. Agrega cada variable:

   **Variable 1:**
   - Key: `MONGODB_URI`
   - Value: `mongodb+srv://tu-usuario:tu-password@tu-cluster.mongodb.net/rick-and-morty-auth?retryWrites=true&w=majority`
   - Environments: ✓ Production, ✓ Preview, ✓ Development

   **Variable 2:**
   - Key: `JWT_SECRET`
   - Value: `[tu-jwt-secret-generado]`
   - Environments: ✓ Production, ✓ Preview, ✓ Development

   **Variable 3 (Opcional):**
   - Key: `NEXT_PUBLIC_API_URL`
   - Value: `https://rickandmortyapi.com/api`
   - Environments: ✓ Production, ✓ Preview, ✓ Development

3. Haz clic en "Deploy"

#### Paso 4: Verificar Despliegue

1. Espera 1-3 minutos mientras Vercel construye tu aplicación
2. Una vez completado, haz clic en "Visit" para ver tu sitio
3. Prueba registrarte y hacer login

### Método 2: Desde la CLI de Vercel

#### Instalar Vercel CLI

```bash
npm install -g vercel
```

#### Iniciar Sesión

```bash
vercel login
```

#### Desplegar

```bash
# Desde la raíz del proyecto
cd C:/Users/devsantiagox/Projects/RickAndMortyApp

# Desplegar (primera vez)
vercel

# Seguir los prompts:
# ? Set up and deploy "~/Projects/RickAndMortyApp"? [Y/n] y
# ? Which scope do you want to deploy to? [tu-username]
# ? Link to existing project? [y/N] n
# ? What's your project's name? rick-and-morty-app
# ? In which directory is your code located? ./
```

#### Agregar Variables de Entorno

```bash
# MONGODB_URI
vercel env add MONGODB_URI production
# [Pega tu MongoDB URI cuando te lo pida]

vercel env add MONGODB_URI preview
# [Pega tu MongoDB URI cuando te lo pida]

# JWT_SECRET
vercel env add JWT_SECRET production
# [Pega tu JWT Secret cuando te lo pida]

vercel env add JWT_SECRET preview
# [Pega tu JWT Secret cuando te lo pida]
```

#### Redesplegar con Variables

```bash
# Desplegar a producción
vercel --prod
```

## 🔧 Configuración Avanzada

### Dominios Personalizados

1. Ve a tu proyecto en Vercel
2. Settings → Domains
3. Agrega tu dominio personalizado
4. Sigue las instrucciones de DNS

### Variables de Entorno por Rama

**Production**:
- Se usa en la rama `main` o `master`
- URL: `https://tu-proyecto.vercel.app`

**Preview**:
- Se usa en todas las demás ramas (como `develop`)
- URL: `https://tu-proyecto-git-branch-name.vercel.app`

**Development**:
- Se usa cuando ejecutas `vercel dev` localmente

### Configurar MongoDB Atlas para Vercel

1. **Network Access en MongoDB Atlas**:
   - Ve a Network Access
   - Haz clic en "Add IP Address"
   - Selecciona "Allow Access from Anywhere" (0.0.0.0/0)
   - O agrega las IPs de Vercel: https://vercel.com/guides/how-to-allowlist-deployment-ip-address

2. **Database Access**:
   - Asegúrate de que tu usuario tenga permisos de "Read and write to any database"

## 🧪 Probar la Conexión en Vercel

Una vez desplegado:

1. Abre tu sitio en Vercel
2. Ve a la página de registro
3. Crea una cuenta de prueba
4. Intenta hacer login

### Ver Logs

1. Ve a tu proyecto en Vercel
2. Click en el deployment
3. Click en "Functions" → "Logs"
4. Verás los logs de conexión a MongoDB

## 🐛 Troubleshooting

### Error: "MongoServerError: bad auth"

**Problema**: Credenciales incorrectas en `MONGODB_URI`

**Solución**:
1. Ve a Environment Variables en Vercel
2. Edita `MONGODB_URI`
3. Verifica que la contraseña sea correcta
4. Si tiene caracteres especiales, encodéalos:
   - `@` → `%40`
   - `!` → `%21`
   - `#` → `%23`

### Error: "Cannot connect to MongoDB"

**Problema**: IP bloqueada en Atlas

**Solución**:
1. Ve a MongoDB Atlas → Network Access
2. Agrega "0.0.0.0/0" para permitir todas las IPs
3. O agrega las IPs específicas de Vercel

### Error: "Invalid JWT Secret"

**Problema**: `JWT_SECRET` no configurado o muy corto

**Solución**:
1. Genera un nuevo secret:
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```
2. Agrégalo en Vercel Environment Variables

### Build Falla con Linting Errors

**Problema**: ESLint encuentra errores

**Solución Temporal** (no recomendado para producción):
1. Ve a `next.config.ts`
2. Agrega:
   ```typescript
   const nextConfig: NextConfig = {
     eslint: {
       ignoreDuringBuilds: true,
     },
   };
   ```

**Solución Correcta**:
1. Ejecuta `npm run lint` localmente
2. Corrige todos los errores
3. Haz commit y push

### Redeploy Después de Cambios

Cada push a GitHub automáticamente redespliega:

```bash
git add .
git commit -m "Fix: actualizar variables"
git push origin main
```

O redespliega manualmente desde el dashboard de Vercel.

## 📊 Monitoreo

### Analytics

Vercel incluye analytics gratis:
1. Ve a tu proyecto → Analytics
2. Verás métricas de:
   - Visitantes únicos
   - Page views
   - Top páginas
   - Países

### Logs

1. Ve a tu proyecto → Deployments
2. Click en cualquier deployment
3. Functions → Logs para ver logs en tiempo real

### Error Monitoring

Considera integrar:
- **Sentry**: Error tracking
- **LogRocket**: Session replay
- **Vercel Log Drains**: Envía logs a servicios externos

## 🔒 Seguridad

### Checklist de Seguridad

- ✅ `MONGODB_URI` en variables de entorno (no en código)
- ✅ `JWT_SECRET` único y complejo
- ✅ `.env.local` en `.gitignore`
- ✅ MongoDB Atlas con autenticación habilitada
- ✅ HTTPS habilitado (automático en Vercel)
- ✅ CORS configurado correctamente
- ✅ Rate limiting en endpoints sensibles

### Rotación de Secrets

**Cada 3-6 meses**:
1. Genera un nuevo `JWT_SECRET`
2. Actualiza en Vercel Environment Variables
3. Redespliega

**Si hay compromiso**:
1. Cambia `MONGODB_URI` y contraseña de MongoDB
2. Cambia `JWT_SECRET`
3. Actualiza en Vercel inmediatamente
4. Redespliega
5. Todos los usuarios deberán hacer login nuevamente

## 🎯 Mejores Prácticas

1. **Usa Preview Deployments**: Cada PR crea un deployment de preview
2. **Protege Production**: Usa la rama `main` solo para código probado
3. **Monitorea Logs**: Revisa logs regularmente para detectar problemas
4. **Backups**: Configura backups automáticos en MongoDB Atlas
5. **Dominios**: Usa dominios personalizados para profesionalismo
6. **Environment-specific Config**: Usa diferentes MongoDB clusters para preview/prod

## 📚 Recursos

- [Vercel Documentation](https://vercel.com/docs)
- [Environment Variables Guide](https://vercel.com/docs/concepts/projects/environment-variables)
- [Next.js on Vercel](https://vercel.com/docs/frameworks/nextjs)
- [MongoDB Atlas + Vercel](https://www.mongodb.com/developer/products/atlas/nextjs-with-mongodb/)

## ✅ Checklist Final

- [ ] MongoDB Atlas configurado con Network Access abierto
- [ ] `MONGODB_URI` agregado en Vercel (Production, Preview, Development)
- [ ] `JWT_SECRET` generado y agregado en Vercel
- [ ] Proyecto desplegado exitosamente
- [ ] Registro y login funcionando
- [ ] Logs revisados sin errores
- [ ] Dominio personalizado configurado (opcional)
- [ ] Analytics habilitado

¡Tu aplicación está lista en producción! 🎉

## 🚀 URL de Ejemplo

Una vez desplegado, tu app estará disponible en:
- **Production**: `https://rick-and-morty-app.vercel.app`
- **Preview**: `https://rick-and-morty-app-git-develop-username.vercel.app`

Comparte el link y disfruta! 🌟

