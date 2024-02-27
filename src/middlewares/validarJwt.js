const { response, request } = require('express');
import { getConnection } from "../database/database"
const jwt = require('jsonwebtoken');

const validarJWT = async (req = request, res = response, next) => {

    const token = req.header('token');

    if (!token){
        return res.status(401).json({
            msg: "No hay token en la peticion"
        });
    }

    try{

        const {uid, permisos} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        
        const connection= await getConnection()

        const usuarios = await connection.query("SELECT * FROM usuarios WHERE id_usuario = ?", uid)

        const usuario = usuarios[0];

        if (usuarios.length === 0){
            return res.status(401).json({
                msg: 'Token no válido - Usuario no existente en la BD'
            })
        }

        if (usuario.estado_usuario == 0) {
            return res.status(401).json({ 
                message: "Token no válido - El usuario está inactivo." 
            });
        }

        req.usuario = usuario;

        req.permisos = permisos;

        console.log("AJA: ",req.usuario, "Permisos: ", req.permisos);

        next();

    }catch(error){
        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        })
    }

}

module.exports = {
    validarJWT
}