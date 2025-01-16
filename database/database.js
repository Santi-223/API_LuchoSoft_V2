import mysql from "mysql2/promise";
import config from "../config";

// Conexión a la base de datos con un wrapper para manejar el resultado
const connection = mysql.createPool({
    host: config.host,
    port: config.port || 3306,  // Puerto por defecto 3306 si no se especifica
    database: config.database,
    user: config.user,
    password: config.password,
    waitForConnections: true,
    connectionLimit: 30,  // Límite de conexiones simultáneas
    queueLimit: 30
});

const getConnection = async () => {
    const conn = await connection.getConnection();
    const originalQuery = conn.query.bind(conn);

    // Envolvemos query para devolver solo los resultados
    conn.query = async (...args) => {
        const [rows] = await originalQuery(...args);
        return rows;
    };

    return conn;
};

export { getConnection };
