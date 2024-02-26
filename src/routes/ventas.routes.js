import { Router } from "express";
import { methods as ventasControllers } from "../constrollers/ventas.controllers";
const router = Router();

router.get("/clientes", ventasControllers.getClientes);
router.get("/pedidos", ventasControllers.getPedidos);

router.get("/clientes/:id_cliente", ventasControllers.getCliente);
router.get("/pedidos/:id_pedido", ventasControllers.getPedido);

router.post("/clientes", ventasControllers.postCliente);
router.post("/pedidos", ventasControllers.postPedido);

router.put("/clientes/:id_cliente", ventasControllers.updateCliente);
router.put("/pedidos/:id_pedido", ventasControllers.updatePedido);

router.delete("/clientes/:id_cliente", ventasControllers.deleteCliente);
router.delete("/pedidos/:id_pedido", ventasControllers.deletePedido);

export default router;