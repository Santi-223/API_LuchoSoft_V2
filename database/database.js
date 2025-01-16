import mysql from "mysql2/promise";
import config from "../config";

// Conexión a la base de datos
const connection = mysql.createPool({
    host: config.host,
    port: config.port,
    database: config.database,
    user: config.user,
    password: config.password,
    waitForConnections: true,
    connectionLimit: 30,  // Límite de conexiones simultáneas
    queueLimit: 30
});

const getConnection = () => {
    return connection;
};

export { getConnection };
