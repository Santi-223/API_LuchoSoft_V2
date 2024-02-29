import { response } from "express";

const validarAdministrador = (req, res = response, next) => {

    if (!req.usuario) { // Verificar que req.usuario esté definidos
        return res.status(500).json({
            msg: "Debes validar el token antes de validar el rol."
        });
    }

    const {id_rol, nombre_usuario} = req.usuario;

        if(id_rol!=1){
            return res.status(401).json({
                msg: `${nombre_usuario} no es administrador, no puede acceder a esta función.`
            });
        }

    next();
}

const tienePermiso = (permiso) => {
    return (req, res, next) => {
        if (!req.usuario || !req.permisos) { // Verificar que req.usuario y req.usuario.permisos estén definidos
            return res.status(500).json({
                msg: "Debes validar el token antes de validar el rol."
            });
        }

        const permisosUsuario = req.permisos;

        if (!permisosUsuario.includes(permiso)) {
            return res.status(401).json({
                msg: `El servicio requiere el permiso: ${permiso}`
            });
        }

        next();
    };
};



module.exports = {
    validarAdministrador,
    tienePermiso
}