import { Router } from "express";
import { methods as ventasControllers } from "../controllers/ventas.controllers";
const router = Router();

router.get("/clientes", ventasControllers.getClientes);
router.get("/pedidos", ventasControllers.getPedidos);
router.get("/pedidos_productos", ventasControllers.getPedidosProductos);

router.get("/clientes/:id_cliente", ventasControllers.getCliente);
router.get("/pedidos/:id_pedido", ventasControllers.getPedido);
router.get("/pedidos_productos/:id_pedidos_productos", ventasControllers.consultPedidosProductos);

router.post("/clientes", ventasControllers.postCliente);
router.post("/pedidos", ventasControllers.postPedido);
router.post("/pedidos_productos", ventasControllers.postPedidosProductos);

router.put("/clientes/:id_cliente", ventasControllers.updateCliente);
router.put("/pedidos/:id_pedido", ventasControllers.updatePedido);
router.put("/pedidos_productos/:id_pedidos_productos", ventasControllers.updatePedidosProductos);

router.delete("/clientes/:id_cliente", ventasControllers.deleteCliente);
router.delete("/pedidos/:id_pedido", ventasControllers.deletePedido);
router.delete("/pedidos_productos/:id_pedidos_productos", ventasControllers.deletePedidosProductos);

export default router;