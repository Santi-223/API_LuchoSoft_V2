import { response } from "express";

const tienePermiso = (permiso) => {
    return (req, res, next) => {

        if (!req.usuario || !req.permisos) { // Verificar que req.usuario y req.usuario.permisos estén definidos
            return res.status(500).json({
                msg: "Debes validar el token antes de validar el rol."
            });
        }

        const permisosUsuario = req.permisos;

        console.log("permisos en vr", permisosUsuario)

        if (!permisosUsuario.includes(permiso)) {
            return res.status(401).json({
                msg: `El servicio requiere el permiso: ${permiso}`
            });
        }

        next();
    };
};



module.exports = {
    tienePermiso
}