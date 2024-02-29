import { Router } from "express";
import { methods as ventasControllers } from "../controllers/ventas.controllers";
import { validarJWT } from "../middlewares/validarJwt";
import { tienePermiso } from "../middlewares/validarRoles"; 
import { validarAdministrador } from "../middlewares/validarRoles"; 

const router = Router();

router.get("/clientes", ventasControllers.getClientes);
router.get("/pedidos", validarJWT, tienePermiso(11), ventasControllers.getPedidos);

router.get("/clientes/:id_cliente", ventasControllers.getCliente);
router.get("/pedidos/:id_pedido", validarJWT, tienePermiso(11), ventasControllers.getPedido);

router.post("/clientes", ventasControllers.postCliente);
router.post("/pedidos", validarJWT, tienePermiso(11), ventasControllers.postPedido);

router.put("/clientes/:id_cliente", ventasControllers.updateCliente);
router.put("/pedidos/:id_pedido", validarJWT, tienePermiso(11), ventasControllers.updatePedido);

router.delete("/clientes/:id_cliente", ventasControllers.deleteCliente);
router.delete("/pedidos/:id_pedido", validarJWT, tienePermiso(11), ventasControllers.deletePedido);

export default router;