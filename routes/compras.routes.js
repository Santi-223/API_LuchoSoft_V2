import { Router } from "express";
import { methods as comprasController } from "../controllers/compras.controller";
import { validarJWT } from "../middlewares/validarJwt";
import { tienePermiso } from "../middlewares/validarRoles"; 

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

router.post("/compras", validarJWT, tienePermiso(1), comprasController.postCompra)
router.post("/proveedores", validarJWT, tienePermiso(1), comprasController.postProveedor)
router.post("/categoria_insumos", validarJWT, tienePermiso(1), comprasController.postCatInsumos)
router.post("/insumos", validarJWT, tienePermiso(1), comprasController.postInsumos)
router.post("/compras_insumos", validarJWT, tienePermiso(1), comprasController.postComprasInsumo)

router.delete("/compras/:id_compra", validarJWT, tienePermiso(1), comprasController.deleteCompra)
router.delete("/proveedores/:id_proveedor", validarJWT, tienePermiso(1), comprasController.deleteProveedor)
router.delete("/categoria_insumos/:id_categoria_insumos", validarJWT, tienePermiso(1), comprasController.deleteCatInsumos)
router.delete("/insumos/:id_insumo", validarJWT, tienePermiso(1), comprasController.deleteInsumos)
router.delete("/compras_insumos/:id_compras_insumos", validarJWT, tienePermiso(1), comprasController.deleteComprasInsumo)

router.put("/compras/:id_compra", validarJWT, tienePermiso(1), comprasController.updateCompra)
router.put("/proveedores/:id_proveedor", validarJWT, tienePermiso(1), comprasController.updateProveedor)
router.put("/categoria_insumos/:id_categoria_insumos", validarJWT, tienePermiso(3), comprasController.updateCatInsumos)
router.put("/insumos/:id_insumo", validarJWT, tienePermiso(1), comprasController.updateInsumos)
router.put("/compras_insumos/:id_compras_insumos", comprasController.updateComprasInsumo)

router.put("/estadoCatInsumos/:id_categoria_insumos", validarJWT, tienePermiso(1), comprasController.updateEstadoCatInsumos)
router.put("/estadoInsumo/:id_insumo", validarJWT, tienePermiso(1), comprasController.updateEstadoInsumos)
router.put("/estadoProveedor/:id_proveedor", validarJWT, tienePermiso(1), comprasController.updateEstadoProveedor)

//Arley ya no ta
export default router;

