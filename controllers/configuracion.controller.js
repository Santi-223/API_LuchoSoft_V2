import { getConnection } from "../database/database";
const jwt = require('jsonwebtoken');
const cloudinary = require("cloudinary").v2;
const fs = require('fs');

const getToken = async (req, res) => {
    try {
        res.json('Token valido');
    } catch (error) {
        res.status(500);
    }

};

const getPermisos = async (req, res) => {
    try {
        const connection = await getConnection()
        const result = await connection.query("SELECT * FROM permisos")
        console.log(result)
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.msg)
    }

};

const consultPermiso = async (req, res) => {
    try {
        console.log(req.params)
        const { id_permiso } = req.params
        const connection = await getConnection()
        const result = await connection.query("SELECT * FROM permisos WHERE id_permiso = ?", id_permiso)
        console.log(result)
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.msg)
    }

};

const postPermiso = async (req, res) => {
    try {
        const { id_permiso, nombre_permiso, estado_permiso } = req.body;

        if (id_permiso == "" || nombre_permiso == "" || estado_permiso == "") {
            return res.status(400).json({ msg: "Error, por favor digite todos los datos." })
        }
        const permisos = { id_permiso, nombre_permiso, estado_permiso }
        const connection = await getConnection()
        const result = await connection.query("INSERT INTO permisos SET ?", permisos)
        // res.json({msg: "Registrado con éxito :D."})
        console.log("Registrado con éxito")
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.msg)
    }

};

const updatePermiso = async (req, res) => {
    try {
        console.log(req.params)
        const { id_permiso } = req.params
        const { nombre_permiso, estado_permiso } = req.body;

        if (nombre_permiso == ""
            || estado_permiso == "") {
            return res.status(400).json({ msg: "Error, por favor digite todos los datos." })
        }
        const permisos = { nombre_permiso, estado_permiso }
        const connection = await getConnection()
        const result = await connection.query("UPDATE permisos SET ? WHERE id_permiso = ?", [permisos, id_permiso])
        console.log(result)
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.msg)
    }

};

const deletePermiso = async (req, res) => {
    try {
        console.log(req.params)
        const { id_permiso } = req.params

        const connection = await getConnection()
        const result = await connection.query("DELETE FROM permisos WHERE id_permiso = ?", id_permiso)
        console.log(result)
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.msg)
    }

};

const getRoles = async (req, res) => {
    try {
        const connection = await getConnection()
        const result = await connection.query("SELECT * FROM roles")
        console.log(result)
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.msg)
    }

};

const consultRol = async (req, res) => {
    try {
        console.log(req.params)
        const { id_rol } = req.params
        const connection = await getConnection()
        const result = await connection.query("SELECT * FROM roles WHERE id_rol = ?", id_rol)
        console.log(result)
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.msg)
    }

};

const postRol = async (req, res) => {
    try {
        const { nombre_rol, descripcion_rol, estado_rol } = req.body;

        if (nombre_rol == "" || descripcion_rol == "" || estado_rol == "") {
            return res.status(400).json({ msg: "Error, por favor digite todos los datos." })
        }
        const roles = { nombre_rol, descripcion_rol, estado_rol }
        const connection = await getConnection()
        const result = await connection.query("INSERT INTO roles SET ?", roles)

        // Obtener el ID del rol insertado
        const idRolInsertado = result.insertId;

        console.log("Rol registrado exitosamente con ID:", idRolInsertado);

        // Devolver el ID del rol como parte de la respuesta
        res.status(201).json({ result, id_rol: idRolInsertado });
    } catch (error) {
        res.status(500);
        res.send(error.msg)
    }

};

const updateRol = async (req, res) => {
    try {
        console.log(req.params)
        const { id_rol } = req.params
        const { nombre_rol, descripcion_rol, estado_rol } = req.body;

        if (nombre_rol == "" || descripcion_rol == ""
            || estado_rol == "") {
            return res.status(400).json({ msg: "Error, por favor digite todos los datos." })
        }
        const roles = { nombre_rol, descripcion_rol, estado_rol }
        const connection = await getConnection()
        const result = await connection.query("UPDATE roles SET ? WHERE id_rol = ?", [roles, id_rol])
        console.log(result)
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.msg)
    }

};

const updateEstadoRol = async (req, res) => {
    try {
        console.log(req.params);
        const { id_rol } = req.params;
        const { estado_rol } = req.body;

        // Obtener el estado inverso
        const nuevoEstado = estado_rol;

        const connection = await getConnection()
        // Actualizar el estado en la base de datos
        const result = await connection.query("UPDATE roles SET estado_rol = ? WHERE id_rol = ?", [nuevoEstado, id_rol]);
        console.log(result);

        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error interno del servidor." });
    }
};

const deleteRol = async (req, res) => {
    try {
        console.log(req.params)
        const { id_rol } = req.params

        const connection = await getConnection()

        // Verificar si hay usuarios con el id_rol especificado
        const vfc = await connection.query("SELECT COUNT(*) AS count FROM usuarios WHERE id_rol = ?", id_rol);

        if (vfc[0].count > 0) {
            // Si se encuentra al menos un usuario con el id_rol, devuelve un error
            return res.status(400).json({ msg: 'No se puede eliminar el rol porque hay usuarios asociados.' });
        }

        // Si no hay usuarios con el id_rol, procede con las eliminaciones
        await connection.query("DELETE FROM roles_permisos WHERE id_rol = ?", id_rol);
        await connection.query("DELETE FROM roles WHERE id_rol = ?", id_rol);

        res.json({ msg: 'Rol eliminado correctamente' });
    } catch (error) {
        res.status(500).send(error.msg);
    }
};


const getRolesPermisos = async (req, res) => {
    try {
        const connection = await getConnection()
        const result = await connection.query("SELECT * FROM roles_permisos")
        console.log(result)
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.msg)
    }

};

const consultRolesPermisos = async (req, res) => {
    try {
        console.log(req.params)
        const { id_roles_permisos } = req.params
        const connection = await getConnection()
        const result = await connection.query("SELECT * FROM roles_permisos WHERE id_roles_permisos = ?", id_roles_permisos)
        console.log(result)
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.msg)
    }

};

const postRolesPermisos = async (req, res) => {
    try {
        const { fecha_roles_permisos, id_rol, id_permiso } = req.body;


        const roles_permisos = { fecha_roles_permisos, id_rol, id_permiso }
        const connection = await getConnection()
        const result = await connection.query("INSERT INTO roles_permisos SET ?", roles_permisos)
        // res.json({msg: "Registrado con éxito :D."})
        console.log("Registrado con éxito")
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.msg)
    }

};

const updateRolesPermisos = async (req, res) => {
    try {
        console.log(req.params)
        const { id_roles_permisos } = req.params
        const { fecha_roles_permisos, id_rol, id_permiso } = req.body;

        if (fecha_roles_permisos == "" || id_rol == ""
            || id_permiso == "") {
            return res.status(400).json({ msg: "Error, por favor digite todos los datos." })
        }
        const roles_permisos = { fecha_roles_permisos, id_rol, id_permiso }
        const connection = await getConnection()
        const result = await connection.query("UPDATE roles_permisos SET ? WHERE id_roles_permisos = ?", [roles_permisos, id_roles_permisos])
        console.log(result)
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.msg)
    }

};

const deleteRolesPermisos = async (req, res) => {
    try {
        console.log(req.params)
        const { id_roles_permisos } = req.params

        const connection = await getConnection()
        const result = await connection.query("DELETE FROM roles_permisos WHERE id_roles_permisos = ?", id_roles_permisos)
        console.log(result)
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.msg)
    }

};

const getUsuarios = async (req, res) => {
    try {
        const connection = await getConnection()
        const result = await connection.query("SELECT * FROM usuarios")
        console.log(result)
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.msg)
    }

};

const consultUsuario = async (req, res) => {
    try {
        console.log(req.params)
        const { id_usuario } = req.params
        const connection = await getConnection()
        const result = await connection.query("SELECT * FROM usuarios WHERE id_usuario = ?", id_usuario)
        console.log(result)
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.msg)
    }

};

const sendImage = async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path);

        console.log('url de la img: ', result.url)

        // Eliminar la imagen local después de subirla a Cloudinary
        fs.unlink(req.file.path, (err) => {
            if (err) {
                console.error('Error al eliminar la imagen local:', err);
            } else {
                console.log('Imagen local eliminada');
            }
        });

        res.status(200).json(result);
    } catch (error) {
        console.log('Error:', error);
        res.status(400).send(error.message);
    }
};

const postUsuario = async (req, res) => {
    try {

        var imagen_usuario

        // Verificar si el archivo fue subido
        if (!req.file) {
            imagen_usuario = 'https://instalacionesherman.com/wp-content/uploads/2018/04/Imagen_por_defecto-600x450.png'
        } else {
            const result2 = await cloudinary.uploader.upload(req.file.path);
            console.log('url de la img: ', result2.url);

            // Eliminar la imagen local después de subirla a Cloudinary
            fs.unlink(req.file.path, (err) => {
                if (err) {
                    console.error('Error al eliminar la imagen local:', err);
                } else {
                    console.log('Imagen local eliminada');
                }
            });


            imagen_usuario = result2.url;
        }

        const { id_usuario, nombre_usuario, email, contrasena, telefono_usuario, direccion_usuario, estado_usuario, id_rol } = req.body;

        if (id_usuario == "" || nombre_usuario == "" || email == ""
            || contrasena == "" || telefono_usuario == "" || direccion_usuario == "" || estado_usuario == "" || id_rol == "") {
            return res.status(400).json({ msg: "Error, por favor digite todos los datos." })
        }

        const contraseña = contrasena

        const usuarios = { id_usuario, imagen_usuario, nombre_usuario, email, contraseña, telefono_usuario, direccion_usuario, estado_usuario, id_rol }
        const connection = await getConnection()
        const result = await connection.query("INSERT INTO usuarios SET ?", usuarios)
        // res.json({msg: "Registrado con éxito :D."})
        console.log("Registrado con éxito")
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error)
    }

};

const updateUsuario = async (req, res) => {
    try {
        var imagen_usuario

        // Verificar si el archivo fue subido
        if (!req.file) {
            try {
                console.log(req.params)
                const { id_usuario } = req.params
                const connection = await getConnection()
                const result = await connection.query("SELECT * FROM usuarios WHERE id_usuario = ?", id_usuario)
                console.log(result)
                imagen_usuario = result[0].imagen_usuario
            } catch (error) {
                res.status(500);
                res.send(error.msg)
            }
        } else {
            const result2 = await cloudinary.uploader.upload(req.file.path);
            console.log('url de la img: ', result2.url);

            // Eliminar la imagen local después de subirla a Cloudinary
            fs.unlink(req.file.path, (err) => {
                if (err) {
                    console.error('Error al eliminar la imagen local:', err);
                } else {
                    console.log('Imagen local eliminada');
                }
            });


            imagen_usuario = result2.url;
        }

        console.log(req.params)
        const { id_usuario } = req.params
        const {nombre_usuario, email, contrasena, telefono_usuario, direccion_usuario, estado_usuario, id_rol } = req.body;

        if (nombre_usuario == "" || email == ""
            || contrasena == "" || telefono_usuario == "" || direccion_usuario == "" || estado_usuario == "" || id_rol == "") {
            return res.status(400).json({ msg: "Error, por favor digite todos los datos." })
        }

        const contraseña = contrasena

        const usuarios = { imagen_usuario, nombre_usuario, email, contraseña, telefono_usuario, direccion_usuario, estado_usuario, id_rol }
        const connection = await getConnection()
        const result = await connection.query("UPDATE usuarios SET ? WHERE id_usuario = ?", [usuarios, id_usuario])
        console.log(result)
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.msg)
    }

};

const updateContraseña = async (req, res) => {
    try {
        console.log(req.params)
        const { id_usuario } = req.params
        const { contraseña } = req.body;

        if (id_usuario == "" || contraseña == "") {
            return res.status(400).json({ msg: "Error, por favor digite todos los datos." })
        }
        const connection = await getConnection()
        const result = await connection.query("UPDATE usuarios SET contraseña = ? WHERE id_usuario = ?", [contraseña, id_usuario])
        console.log(result)
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.msg)
    }

};

const recuperarContrasena = async (req, res) => {
    try {
        const token = req.header('token');
        const { nuevaContraseña } = req.body;
        const { email } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        console.log("email en token: ", email)

        if (!token || !nuevaContraseña || !email) {
            return res.status(400).json({ msg: "Error, por favor digite todos los datos." })
        }

        const connection = await getConnection()

        const vfc = await connection.query("SELECT COUNT(*) AS count FROM usuarios WHERE email = ?", email);

        if (vfc[0].count > 0) {

            const result = await connection.query("UPDATE usuarios SET contraseña = ? WHERE email = ?", [nuevaContraseña, email])
            console.log(result)
            return res.json({ msg: 'La contraseña se ha restablecido exitosamente' });

        } else {

            return res.status(400).json({ msg: "Error, el email no se encuentra registrado." })

        }

    } catch (error) {
        res.status(500);
        res.send(error.msg)
    }

};

const updateEstadoUsuario = async (req, res) => {
    try {
        console.log(req.params);
        const { id_usuario } = req.params;
        const { estado_usuario } = req.body;

        // Obtener el estado inverso
        const nuevoEstado = estado_usuario;

        const connection = await getConnection()
        // Actualizar el estado en la base de datos
        const result = await connection.query("UPDATE usuarios SET estado_usuario = ? WHERE id_usuario = ?", [nuevoEstado, id_usuario]);
        console.log(result);

        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error interno del servidor." });
    }
};


const deleteUsuario = async (req, res) => {
    try {
        console.log(req.params)
        const { id_usuario } = req.params

        const connection = await getConnection()
        const result = await connection.query("DELETE FROM usuarios WHERE id_usuario = ?", id_usuario)
        const usuarioAutenticado = req.usuario;
        console.log(result)
        res.json({ result, usuarioAutenticado });
    } catch (error) {
        res.status(500);
        res.send(error.msg)
    }

};

export const methods = {
    getToken,
    getPermisos,
    consultPermiso,
    postPermiso,
    updatePermiso,
    deletePermiso,
    getRoles,
    consultRol,
    postRol,
    updateRol,
    updateEstadoRol,
    deleteRol,
    getRolesPermisos,
    consultRolesPermisos,
    postRolesPermisos,
    updateRolesPermisos,
    deleteRolesPermisos,
    getUsuarios,
    consultUsuario,
    postUsuario,
    updateUsuario,
    recuperarContrasena,
    updateContraseña,
    updateEstadoUsuario,
    deleteUsuario,
    sendImage

}