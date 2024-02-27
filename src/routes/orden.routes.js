import { Router } from "express";
import { methods as ordenControllers } from "../controllers/orden.controllers";
const router = Router();


router.get("/orden_produccion", ordenControllers.getOrdenes_produccion);

router.get("/orden_produccion/:id_orden_de_produccion", ordenControllers.getOrden_produccion);


router.post("/orden_produccion", ordenControllers.postOrden_produccion);

router.put("/orden_produccion/:id_orden_de_produccion", ordenControllers.updateOrden_produccion);


router.delete("/orden_produccion/:id_orden_de_produccion", ordenControllers.deleteOrden_produccion);



export default router;