import { Router } from "express";
import { methods as comprasController } from "../controllers/compras.controller";


const router = Router();

router.get("/compras", comprasController.getCompra);
router.get("/proveedores", comprasController.getProveedor);
router.get("/categoria_insumos", comprasController.getCatInsumos);
router.get("/insumos", comprasController.getInsumos);
router.get("/compras_insumos", comprasController.getComprasInsumo);

router.get("/compras/:id_compra", comprasController.consultCompra)
router.get("/proveedores/:id_proveedor", comprasController.consultProveedor)
router.get("/categoria_insumos/:id_categoria_insumos", comprasController.consultCatInsumos)
router.get("/insumos/:id_insumo", comprasController.consultInsumos)
router.get("/compras_insumos/:id_compras_insumos", comprasController.consultComprasInsumo)

router.post("/compras", comprasController.postCompra)
router.post("/proveedores", comprasController.postProveedor)
router.post("/categoria_insumos", comprasController.postCatInsumos)
router.post("/insumos", comprasController.postInsumos)
router.post("/compras_insumos", comprasController.postComprasInsumo)

router.delete("/compras/:id_compra", comprasController.deleteCompra)
router.delete("/proveedores/:id_proveedor", comprasController.deleteProveedor)
router.delete("/categoria_insumos/:id_categoria_insumos", comprasController.deleteCatInsumos)
router.delete("/insumos/:id_insumo", comprasController.deleteInsumos)
router.delete("/compras_insumos/:id_compras_insumos", comprasController.deleteComprasInsumo)

router.put("/compras/:id_compra", comprasController.updateCompra)
router.put("/proveedores/:id_proveedor", comprasController.updateProveedor)
router.put("/categoria_insumos/:id_categoria_insumos", comprasController.updateCatInsumos)
router.put("/insumos/:id_insumo", comprasController.updateInsumos)
router.put("/compras_insumos/:id_compras_insumos", comprasController.updateComprasInsumo)



export default router;

