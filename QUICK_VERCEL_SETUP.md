# ⚡ Guía Rápida: Variables de Entorno en Vercel

## 🎯 Resumen

Ya tienes tu código en Vercel. Ahora solo necesitas configurar las variables de entorno para que funcione correctamente.

## 📝 Variables Requeridas

### En Vercel Dashboard

Ve a tu proyecto en Vercel → **Settings** → **Environment Variables** y agrega:

#### 1️⃣ MONGODB_URI

**Valor**: El connection string de MongoDB Atlas que ya tienes configurado

```
mongodb+srv://tu-usuario:tu-password@tu-cluster.mongodb.net/rick-and-morty-auth?retryWrites=true&w=majority
```

**Ambientes**: ✓ Production, ✓ Preview, ✓ Development

**Dónde conseguirlo**:
- Ya lo tienes en tu MongoDB Atlas
- O copia el mismo que usas localmente

#### 2️⃣ JWT_SECRET

**Valor**: Una cadena aleatoria de seguridad (genera una nueva para producción)

**Generar una nueva**:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Ambientes**: ✓ Production, ✓ Preview, ✓ Development

**Importante**: Usa una DIFERENTE a la de desarrollo local por seguridad

#### 3️⃣ NEXT_PUBLIC_API_URL (Opcional)

**Valor**: 
```
https://rickandmortyapi.com/api
```

**Ambientes**: ✓ Production, ✓ Preview, ✓ Development

**Nota**: Esta es opcional, ya está configurada por defecto en el código.

## 🚀 Pasos Rápidos

1. **Abre Vercel Dashboard**: https://vercel.com/dashboard
2. **Selecciona tu proyecto**: `RickAndMortyApp`
3. **Settings** → **Environment Variables**
4. **Agrega las 2 variables obligatorias**:
   - `MONGODB_URI` (copia de Atlas)
   - `JWT_SECRET` (genera una nueva)
5. **Guarda** y haz clic en **Redeploy**

## ✅ Verificar que Funciona

1. Espera que termine el deployment (1-3 min)
2. Abre tu sitio: `https://tu-proyecto.vercel.app`
3. Prueba registrarte y hacer login
4. ✨ Si funciona, ¡listo!

## 🐛 Si Algo Falla

### Ver Logs
1. Deployment → Functions → Logs
2. Busca errores de MongoDB o JWT

### Errores Comunes

**"MongoServerError: bad auth"**
→ `MONGODB_URI` incorrecta, verifica la contraseña

**"Cannot connect to MongoDB"**
→ MongoDB Atlas → Network Access → Agrega "0.0.0.0/0"

**"Invalid JWT"**
→ `JWT_SECRET` no configurado o muy corto

## 📚 Más Información

- Guía completa: Ver `VERCEL_SETUP.md`
- Configuración de MongoDB: Ver `MONGODB_SETUP.md`

---

**¿Necesitas las variables?**

Ejecuta esto localmente para generar un `JWT_SECRET` nuevo:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Para `MONGODB_URI`, copia el que ya tienes en MongoDB Atlas o del archivo `.env.local` local.

