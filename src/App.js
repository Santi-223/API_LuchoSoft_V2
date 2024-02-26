import express from "express";
import morgan from "morgan";
import cors from "cors";

// Importar las rutas
import comprasRoutes from "./routes/compras.routes";
import configuracionRoutes from "./routes/configuracion.routes";
import authRoutes from "./routes/auth.routes";

const app = express();

// Configuraciones
app.set("port", 4000);

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Rutas
app.use("/compras", comprasRoutes);
app.use("/configuracion", configuracionRoutes);
app.use("/auth", authRoutes);

export default app;

