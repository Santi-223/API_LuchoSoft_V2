import { Router } from "express";
import { methods as configuracionController } from "../controllers/configuracion.controller";
import { validarJWT } from "../middlewares/validarJwt";
import { tienePermiso } from "../middlewares/validarRoles"; 

const router = Router();

router.get("/permisos", configuracionController.getPermisos);
router.get("/roles", configuracionController.getRoles);
router.get("/roles_permisos", configuracionController.getRolesPermisos);
router.get("/usuarios", configuracionController.getUsuarios);

router.get("/permisos/:id_permiso", configuracionController.consultPermiso)
router.get("/roles/:id_rol", configuracionController.consultRol)
router.get("/roles_permisos/:id_roles_permisos", configuracionController.consultRolesPermisos)
router.get("/usuarios/:id_usuario", configuracionController.consultUsuario)

router.post("/permisos", configuracionController.postPermiso)
router.post("/roles", configuracionController.postRol)
router.post("/roles_permisos", configuracionController.postRolesPermisos)
router.post("/usuarios", configuracionController.postUsuario)

router.put("/permisos/:id_permiso", configuracionController.updatePermiso)
router.put("/roles/:id_rol", configuracionController.updateRol)
router.put("/estadoRoles/:id_rol", configuracionController.updateEstadoRol)
router.put("/roles_permisos/:id_roles_permisos", configuracionController.updateRolesPermisos)
router.put("/usuarios/:id_usuario", configuracionController.updateUsuario)
router.put("/contrasenaUsuarios/:id_usuario", configuracionController.updateContraseña)
router.put("/estadoUsuarios/:id_usuario", configuracionController.updateEstadoUsuario)

router.delete("/permisos/:id_permiso", validarJWT, tienePermiso(1), configuracionController.deletePermiso)
router.delete("/roles/:id_rol", validarJWT, tienePermiso(1), configuracionController.deleteRol)
router.delete("/roles_permisos/:id_roles_permisos", validarJWT, tienePermiso(1), configuracionController.deleteRolesPermisos)
router.delete("/usuarios/:id_usuario", validarJWT, tienePermiso(3), configuracionController.deleteUsuario)

export default router;
//arle
// r
