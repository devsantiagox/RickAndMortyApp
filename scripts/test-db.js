/**
 * Script para probar la conexión a MongoDB
 * Ejecutar con: node scripts/test-db.js
 */

const mongoose = require('mongoose');

// Cargar variables de entorno
require('dotenv').config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/rick-and-morty-auth';

async function testConnection() {
  console.log('🔍 Probando conexión a MongoDB...');
  console.log(`📍 URI: ${MONGODB_URI.replace(/\/\/.*:.*@/, '//***:***@')}`); // Ocultar credenciales
  
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ ¡Conexión exitosa a MongoDB!');
    
    // Probar creación de índice
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    
    console.log('\n📚 Colecciones existentes:');
    if (collections.length === 0) {
      console.log('   (Ninguna - La base de datos está vacía)');
    } else {
      collections.forEach(col => {
        console.log(`   - ${col.name}`);
      });
    }
    
    // Contar usuarios
    if (collections.some(col => col.name === 'users')) {
      const userCount = await db.collection('users').countDocuments();
      console.log(`\n👥 Total de usuarios registrados: ${userCount}`);
    }
    
    console.log('\n✨ Todo funciona correctamente!');
    
  } catch (error) {
    console.error('\n❌ Error al conectar a MongoDB:');
    console.error(error.message);
    console.log('\n💡 Soluciones:');
    console.log('   1. Verifica que MongoDB esté corriendo (si es local)');
    console.log('   2. Revisa la URI en .env.local');
    console.log('   3. Si usas Atlas, verifica tu IP en la whitelist');
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('\n🔌 Conexión cerrada.');
  }
}

testConnection();

