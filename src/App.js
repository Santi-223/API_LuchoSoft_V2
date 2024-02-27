import express from "express";
import morgan from "morgan";
import cors from "cors";

// Importar las rutas
import comprasRoutes from "./routes/compras.routes";
import configuracionRoutes from "./routes/configuracion.routes";
import ventaRoutes from "./routes/ventas.routes";
import venta2Routes from "./routes/ventas2.routes";
import ordenRoutes from "./routes/orden.routes";
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
app.use("/ventas", ventaRoutes);
app.use("/ventas2", venta2Routes);
app.use("/orden", ordenRoutes);
app.use("/auth", authRoutes);

export default app;

