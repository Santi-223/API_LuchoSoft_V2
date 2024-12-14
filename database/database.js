import mysql from 'mysql2/promise';
import config from '../config';

let connectionPool;

async function initializeConnectionPool() {
  try {
    connectionPool = await mysql.createPool({
      host: config.host || 'autorack.proxy.rlwy.net',
      user: config.user || 'root',
      password: config.password || 'OVEHaGCbtnIGFicSpvhpAdVcjWgqjdIY',
      database: config.database || 'LuchoSoft',
      port: config.port || 34063,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
    console.log('Pool de conexión inicializado con éxito');
  } catch (error) {
    console.error('Error al inicializar el pool de conexión:', error.message);
    throw error;
  }
}

async function getConnection() {
  if (!connectionPool) {
    await initializeConnectionPool();
  }
  return connectionPool.getConnection();
}

export { getConnection };
