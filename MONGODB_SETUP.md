# 🍃 Configuración de MongoDB

Esta guía te ayudará a configurar MongoDB para el sistema de autenticación de la aplicación.

## 📋 Opciones de Configuración

### Opción 1: MongoDB Local (Desarrollo)

#### Windows

1. **Descargar MongoDB**
   - Ve a https://www.mongodb.com/try/download/community
   - Descarga MongoDB Community Server
   - Ejecuta el instalador

2. **Instalar como Servicio de Windows**
   - Durante la instalación, selecciona "Run service as Network Service user"
   - MongoDB se iniciará automáticamente

3. **Verificar Instalación**
   ```bash
   mongod --version
   ```

4. **Iniciar MongoDB (si no está como servicio)**
   ```bash
   mongod
   ```

#### macOS

1. **Instalar con Homebrew**
   ```bash
   brew tap mongodb/brew
   brew install mongodb-community
   ```

2. **Iniciar MongoDB**
   ```bash
   brew services start mongodb-community
   ```

3. **Verificar**
   ```bash
   mongosh
   ```

#### Linux (Ubuntu/Debian)

1. **Importar la clave pública**
   ```bash
   wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
   ```

2. **Crear archivo de lista**
   ```bash
   echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
   ```

3. **Instalar MongoDB**
   ```bash
   sudo apt-get update
   sudo apt-get install -y mongodb-org
   ```

4. **Iniciar MongoDB**
   ```bash
   sudo systemctl start mongod
   sudo systemctl enable mongod
   ```

#### Configuración en .env.local

```env
MONGODB_URI=mongodb://localhost:27017/rick-and-morty-auth
```

### Opción 2: MongoDB Atlas (Producción) ⭐ Recomendado

MongoDB Atlas es un servicio de base de datos en la nube gratuito y fácil de usar.

#### Paso 1: Crear Cuenta

1. Ve a https://www.mongodb.com/cloud/atlas
2. Haz clic en "Try Free"
3. Registra tu cuenta (puedes usar Gmail)

#### Paso 2: Crear un Cluster

1. Selecciona el plan **FREE** (M0 Sandbox)
2. Elige el proveedor de nube:
   - **AWS** (recomendado)
   - **Google Cloud**
   - **Azure**
3. Selecciona una región cercana (ejemplo: `us-east-1`)
4. Dale un nombre a tu cluster (ejemplo: `rick-morty-cluster`)
5. Haz clic en "Create Cluster"
6. Espera 3-5 minutos mientras se crea

#### Paso 3: Configurar Acceso a la Base de Datos

1. **Crear Usuario de Base de Datos**
   - Ve a "Database Access" en el menú lateral
   - Haz clic en "Add New Database User"
   - Método de autenticación: **Password**
   - Username: `rickmorty_admin` (o el que prefieras)
   - Password: Genera una contraseña segura (guárdala!)
   - Privilegios: **Atlas Admin** o **Read and write to any database**
   - Haz clic en "Add User"

2. **Configurar Acceso de Red**
   - Ve a "Network Access" en el menú lateral
   - Haz clic en "Add IP Address"
   - Opciones:
     - **Para desarrollo**: Haz clic en "Allow Access from Anywhere" (0.0.0.0/0)
     - **Para producción**: Agrega tu IP específica
   - Haz clic en "Confirm"

#### Paso 4: Obtener Connection String

1. Ve a "Database" en el menú lateral
2. Haz clic en "Connect" en tu cluster
3. Selecciona "Connect your application"
4. Driver: **Node.js**
5. Version: **4.1 or later**
6. Copia el connection string:
   ```
   mongodb+srv://username:<password>@cluster.mongodb.net/?retryWrites=true&w=majority
   ```

#### Paso 5: Configurar en .env.local

```env
MONGODB_URI=mongodb+srv://rickmorty_admin:TU_PASSWORD_AQUI@rick-morty-cluster.xxxxx.mongodb.net/rick-and-morty-auth?retryWrites=true&w=majority
```

**Reemplaza:**
- `rickmorty_admin` → tu username
- `TU_PASSWORD_AQUI` → tu password (sin `<>`)
- `rick-morty-cluster.xxxxx` → tu cluster name
- `rick-and-morty-auth` → nombre de tu base de datos

#### Ejemplo Real

```env
MONGODB_URI=mongodb+srv://rickmorty_admin:SuperSecure123@rick-morty-cluster.abc123.mongodb.net/rick-and-morty-auth?retryWrites=true&w=majority
```

## 🧪 Probar la Conexión

Una vez configurado, prueba la conexión:

```bash
node scripts/test-db.js
```

**Salida esperada:**
```
🔍 Probando conexión a MongoDB...
📍 URI: mongodb+srv://***:***@...
✅ ¡Conexión exitosa a MongoDB!

📚 Colecciones existentes:
   (Ninguna - La base de datos está vacía)

✨ Todo funciona correctamente!

🔌 Conexión cerrada.
```

## 🔧 Herramientas Útiles

### MongoDB Compass (GUI para MongoDB)

1. Descarga: https://www.mongodb.com/try/download/compass
2. Instala la aplicación
3. Conecta usando tu URI de MongoDB
4. Explora, crea y edita datos visualmente

### Extensión de VS Code

1. Instala "MongoDB for VS Code"
2. Conecta a tu base de datos
3. Ejecuta queries directamente desde VS Code

### mongosh (CLI)

**Conectar a MongoDB Local:**
```bash
mongosh
```

**Conectar a MongoDB Atlas:**
```bash
mongosh "mongodb+srv://cluster.xxxxx.mongodb.net/rick-and-morty-auth" --username rickmorty_admin
```

**Comandos útiles:**
```javascript
// Ver bases de datos
show dbs

// Usar una base de datos
use rick-and-morty-auth

// Ver colecciones
show collections

// Contar documentos
db.users.countDocuments()

// Ver usuarios
db.users.find().pretty()

// Eliminar todos los usuarios (CUIDADO!)
db.users.deleteMany({})
```

## 🔒 Seguridad

### En Desarrollo

- ✅ Usar MongoDB local o Atlas con acceso desde cualquier IP
- ✅ Usar passwords simples (pero no compartas el código)
- ✅ Archivo `.env.local` en `.gitignore`

### En Producción

- 🔐 Usar MongoDB Atlas
- 🔐 Configurar IPs específicas en Network Access
- 🔐 Usar passwords complejas (mínimo 16 caracteres)
- 🔐 Habilitar autenticación de 2 factores en Atlas
- 🔐 Rotar passwords regularmente
- 🔐 Usar variables de entorno en el servidor
- 🔐 Hacer backups regulares

## 🐛 Troubleshooting

### Error: "MongoServerError: bad auth"

**Problema**: Credenciales incorrectas

**Solución**:
- Verifica username y password
- Asegúrate de no tener caracteres especiales sin encodear
- Si tu password tiene caracteres especiales, encodéalos:
  ```javascript
  // Si tu password es: P@ssw0rd!
  // Usa: P%40ssw0rd%21
  ```

### Error: "MongoNetworkError: connection timed out"

**Problema**: No se puede conectar al servidor

**Solución Local**:
- Verifica que MongoDB esté corriendo
- Windows: Servicios → MongoDB Server → Iniciar
- Mac/Linux: `brew services start mongodb-community` o `sudo systemctl start mongod`

**Solución Atlas**:
- Verifica Network Access en Atlas
- Agrega tu IP actual
- Si usas VPN, agrega esa IP también

### Error: "MongoServerError: not authorized"

**Problema**: Usuario sin permisos

**Solución**:
- Ve a Database Access en Atlas
- Edita tu usuario
- Cambia privilegios a "Atlas Admin"
- Guarda los cambios

### Error: "Cannot read property 'db' of null"

**Problema**: No hay conexión activa

**Solución**:
- Verifica que `.env.local` existe
- Reinicia el servidor de desarrollo
- Verifica el formato de la URI

### Connection String no funciona

**Problema**: Formato incorrecto

**Solución**:
```env
# ❌ Incorrecto
MONGODB_URI=mongodb+srv://user:<password>@cluster...

# ✅ Correcto
MONGODB_URI=mongodb+srv://user:real_password_here@cluster...
```

## 📊 Estructura de la Base de Datos

### Base de Datos: `rick-and-morty-auth`

### Colección: `users`

```javascript
{
  _id: ObjectId("507f1f77bcf86cd799439011"),
  name: "Juan Pérez",
  email: "juan@example.com",
  password: "$2a$10$...", // Hash bcrypt
  createdAt: ISODate("2024-01-15T10:30:00Z"),
  updatedAt: ISODate("2024-01-15T10:30:00Z")
}
```

### Índices

```javascript
// Email único
{ email: 1 }, { unique: true }

// Creación ascendente
{ createdAt: 1 }
```

## 🎯 Mejores Prácticas

1. **Desarrollo**: Usa MongoDB local para rapidez
2. **Staging**: Usa Atlas con cluster compartido
3. **Producción**: Usa Atlas con cluster dedicado
4. **Backups**: Configura backups automáticos en Atlas
5. **Monitoreo**: Usa Atlas Performance Advisor
6. **Logs**: Habilita Database Profiler en desarrollo

## 📚 Recursos Adicionales

- [MongoDB Documentation](https://docs.mongodb.com/)
- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com/)
- [MongoDB University](https://university.mongodb.com/) - Cursos gratis
- [Mongoose Docs](https://mongoosejs.com/docs/)

## ✅ Checklist de Configuración

- [ ] MongoDB instalado/Atlas configurado
- [ ] Usuario de base de datos creado
- [ ] Network access configurado
- [ ] Connection string copiado
- [ ] `.env.local` creado con la URI
- [ ] `JWT_SECRET` configurado
- [ ] Conexión probada con `node scripts/test-db.js`
- [ ] Servidor de desarrollo iniciado
- [ ] Primera cuenta registrada exitosamente

¡Listo! Tu base de datos está configurada correctamente. 🎉

