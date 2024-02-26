import { Router } from "express";
import { methods as ventasControllers } from "../constrollers/ventas2.controllers";
const router = Router();


router.get("/productos", ventasControllers.getProductos);
router.get("/categoria_productos", ventasControllers.getCategoria_productos);


router.get("/productos/:id_producto", ventasControllers.getProducto);
router.get("/categoria_productos/:id_categoria_productos", ventasControllers.getCategoria_producto);



router.post("/productos", ventasControllers.postProducto);
router.post("/categoria_productos", ventasControllers.postCategoria_producto);



router.put("/productos/:id_producto", ventasControllers.updateProducto);
router.put("/categoria_productos/:id_categoria_productos", ventasControllers.updateCategoria_producto);



router.delete("/productos/:id_producto", ventasControllers.deleteProducto);
router.delete("/categoria_productos/:id_categoria_productos", ventasControllers.deleteCategoria_producto);



export default router;