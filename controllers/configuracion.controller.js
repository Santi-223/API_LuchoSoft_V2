import { getConnection } from "../database/database"

const getToken = async(req, res) => {
    try{
        res.json('Token valido');
    }catch(error){
        res.status(500);
    }

};

const getPermisos = async(req, res) => {
    try{
        const connection= await getConnection()
        const result=await connection.query("SELECT * FROM permisos")
        console.log(result)
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.msg)
    }

};

const consultPermiso = async(req, res) => {
    try{
        console.log(req.params)
        const {id_permiso}=req.params
        const connection= await getConnection()
        const result=await connection.query("SELECT * FROM permisos WHERE id_permiso = ?", id_permiso)
        console.log(result)
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.msg)
    }

};

const postPermiso = async(req, res) => {
    try{
        const {id_permiso, nombre_permiso, estado_permiso} = req.body;

        if (id_permiso == "" || nombre_permiso == "" || estado_permiso == "") {
            return res.status(400).json({msg: "Error, por favor digite todos los datos."})
        }
        const permisos = {id_permiso, nombre_permiso, estado_permiso}
        const connection= await getConnection()
        const result = await connection.query("INSERT INTO permisos SET ?", permisos )
        // res.json({msg: "Registrado con éxito :D."})
        console.log("Registrado con éxito")
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.msg)
    }

};

const updatePermiso = async(req, res) => {
    try{
        console.log(req.params)
        const {id_permiso}=req.params
        const {nombre_permiso, estado_permiso} = req.body;

        if (nombre_permiso == ""
            || estado_permiso == "") {
            return res.status(400).json({msg: "Error, por favor digite todos los datos."})
        }
        const permisos = { nombre_permiso, estado_permiso}
        const connection= await getConnection()
        const result=await connection.query("UPDATE permisos SET ? WHERE id_permiso = ?", [permisos, id_permiso])
        console.log(result)
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.msg)
    }

};

const deletePermiso = async(req, res) => {
    try{
        console.log(req.params)
        const {id_permiso}=req.params
        
        const connection= await getConnection()
        const result=await connection.query("DELETE FROM permisos WHERE id_permiso = ?", id_permiso)
        console.log(result)
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.msg)
    }

};

const getRoles = async(req, res) => {
    try{
        const connection= await getConnection()
        const result=await connection.query("SELECT * FROM roles")
        console.log(result)
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.msg)
    }

};

const consultRol = async(req, res) => {
    try{
        console.log(req.params)
        const {id_rol}=req.params
        const connection= await getConnection()
        const result=await connection.query("SELECT * FROM roles WHERE id_rol = ?", id_rol)
        console.log(result)
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.msg)
    }

};

const postRol = async(req, res) => {
    try{
        const {nombre_rol, descripcion_rol, estado_rol} = req.body;

        if (nombre_rol == "" || descripcion_rol == "" || estado_rol == "") {
            return res.status(400).json({msg: "Error, por favor digite todos los datos."})
        }
        const roles = {nombre_rol, descripcion_rol, estado_rol}
        const connection= await getConnection()
        const result = await connection.query("INSERT INTO roles SET ?", roles )
        
        // Obtener el ID del rol insertado
        const idRolInsertado = result.insertId;

        console.log("Rol registrado exitosamente con ID:", idRolInsertado);

        // Devolver el ID del rol como parte de la respuesta
        res.status(201).json({result, id_rol: idRolInsertado });
    }catch(error){
        res.status(500);
        res.send(error.msg)
    }

};

const updateRol = async(req, res) => {
    try{
        console.log(req.params)
        const {id_rol}=req.params
        const { nombre_rol, descripcion_rol, estado_rol } = req.body;

        if ( nombre_rol == "" || descripcion_rol == ""
            || estado_rol == "") {
            return res.status(400).json({msg: "Error, por favor digite todos los datos."})
        }
        const roles = { nombre_rol, descripcion_rol, estado_rol }
        const connection= await getConnection()
        const result=await connection.query("UPDATE roles SET ? WHERE id_rol = ?", [roles, id_rol])
        console.log(result)
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.msg)
    }

};

const updateEstadoRol = async (req, res) => {
    try {
        console.log(req.params);
        const { id_rol } = req.params;
        const {estado_rol} = req.body;
    
        // Obtener el estado inverso
        const nuevoEstado = estado_rol;

        const connection= await getConnection()
        // Actualizar el estado en la base de datos
        const result = await connection.query("UPDATE roles SET estado_rol = ? WHERE id_rol = ?", [nuevoEstado, id_rol]);
        console.log(result);

        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error interno del servidor." });
    }
};

const deleteRol = async(req, res) => {
    try{
        console.log(req.params)
        const {id_rol}=req.params
        
        const connection= await getConnection()
        
        await connection.query("DELETE FROM roles WHERE id_rol = ?", id_rol)

        await connection.query("DELETE FROM roles_permisos WHERE id_rol = ?", id_rol);

        res.json({ msg: 'Rol eliminado correctamente' });
    }catch(error){
        res.status(500);
        res.send(error.msg)
    }

};

const getRolesPermisos = async(req, res) => {
    try{
        const connection= await getConnection()
        const result=await connection.query("SELECT * FROM roles_permisos")
        console.log(result)
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.msg)
    }

};

const consultRolesPermisos = async(req, res) => {
    try{
        console.log(req.params)
        const {id_roles_permisos}=req.params
        const connection= await getConnection()
        const result=await connection.query("SELECT * FROM roles_permisos WHERE id_roles_permisos = ?", id_roles_permisos)
        console.log(result)
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.msg)
    }

};

const postRolesPermisos = async(req, res) => {
    try{
        const { fecha_roles_permisos, id_rol, id_permiso } = req.body;


        const roles_permisos = { fecha_roles_permisos, id_rol, id_permiso }
        const connection= await getConnection()
        const result = await connection.query("INSERT INTO roles_permisos SET ?", roles_permisos )
        // res.json({msg: "Registrado con éxito :D."})
        console.log("Registrado con éxito")
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.msg)
    }

};

const updateRolesPermisos = async(req, res) => {
    try{
        console.log(req.params)
        const {id_roles_permisos}=req.params
        const { fecha_roles_permisos, id_rol, id_permiso } = req.body;

        if ( fecha_roles_permisos == "" || id_rol == ""
            || id_permiso == "") {
            return res.status(400).json({msg: "Error, por favor digite todos los datos."})
        }
        const roles_permisos = { fecha_roles_permisos, id_rol, id_permiso }
        const connection= await getConnection()
        const result=await connection.query("UPDATE roles_permisos SET ? WHERE id_roles_permisos = ?", [roles_permisos, id_roles_permisos])
        console.log(result)
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.msg)
    }

};

const deleteRolesPermisos = async(req, res) => {
    try{
        console.log(req.params)
        const {id_roles_permisos}=req.params
        
        const connection= await getConnection()
        const result=await connection.query("DELETE FROM roles_permisos WHERE id_roles_permisos = ?", id_roles_permisos)
        console.log(result)
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.msg)
    }

};

const getUsuarios = async(req, res) => {
    try{
        const connection= await getConnection()
        const result=await connection.query("SELECT * FROM usuarios")
        console.log(result)
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.msg)
    }

};

const consultUsuario = async(req, res) => {
    try{
        console.log(req.params)
        const {id_usuario}=req.params
        const connection= await getConnection()
        const result=await connection.query("SELECT * FROM usuarios WHERE id_usuario = ?", id_usuario)
        console.log(result)
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.msg)
    }

};

const postUsuario = async(req, res) => {
    try{
        const { id_usuario, imagen_usuario, nombre_usuario, email, contraseña, telefono_usuario, direccion_usuario, estado_usuario, id_rol } = req.body;

        if ( id_usuario == "" || nombre_usuario == "" || email == ""
            || contraseña == "" || telefono_usuario == "" || direccion_usuario == "" || estado_usuario == "" || id_rol == "") {
            return res.status(400).json({msg: "Error, por favor digite todos los datos."})
        }
        const usuarios = { id_usuario, imagen_usuario, nombre_usuario, email, contraseña, telefono_usuario, direccion_usuario, estado_usuario, id_rol }
        const connection= await getConnection()
        const result = await connection.query("INSERT INTO usuarios SET ?", usuarios )
        // res.json({msg: "Registrado con éxito :D."})
        console.log("Registrado con éxito")
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.msg)
    }

};

const updateUsuario = async(req, res) => {
    try{
        console.log(req.params)
        const {id_usuario}=req.params
        const {imagen_usuario, nombre_usuario, email, contraseña, telefono_usuario, direccion_usuario, estado_usuario, id_rol} = req.body;

        if ( nombre_usuario == "" || email == ""
            || contraseña == "" || telefono_usuario == "" || direccion_usuario == "" || estado_usuario == "" || id_rol == "") {
            return res.status(400).json({msg: "Error, por favor digite todos los datos."})
        }
        const usuarios = { imagen_usuario, nombre_usuario, email, contraseña, telefono_usuario, direccion_usuario, estado_usuario, id_rol }
        const connection= await getConnection()
        const result=await connection.query("UPDATE usuarios SET ? WHERE id_usuario = ?", [usuarios, id_usuario])
        console.log(result)
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.msg)
    }

};

const updateContraseña = async(req, res) => {
    try{
        console.log(req.params)
        const {id_usuario}=req.params
        const {contraseña} = req.body;

        if (id_usuario == "" || contraseña == "") {
            return res.status(400).json({msg: "Error, por favor digite todos los datos."})
        }
        const connection= await getConnection()
        const result=await connection.query("UPDATE usuarios SET contraseña = ? WHERE id_usuario = ?", [contraseña, id_usuario])
        console.log(result)
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.msg)
    }

};

const updateEstadoUsuario = async (req, res) => {
    try {
        console.log(req.params);
        const { id_usuario } = req.params;
        const {estado_usuario} = req.body;
    
        // Obtener el estado inverso
        const nuevoEstado = estado_usuario;

        const connection= await getConnection()
        // Actualizar el estado en la base de datos
        const result = await connection.query("UPDATE usuarios SET estado_usuario = ? WHERE id_usuario = ?", [nuevoEstado, id_usuario]);
        console.log(result);

        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error interno del servidor." });
    }
};


const deleteUsuario = async(req, res) => {
    try{
        console.log(req.params)
        const {id_usuario}=req.params
        
        const connection= await getConnection()
        const result=await connection.query("DELETE FROM usuarios WHERE id_usuario = ?", id_usuario)
        const usuarioAutenticado = req.usuario;
        console.log(result)
        res.json({result, usuarioAutenticado});
    }catch(error){
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
    updateContraseña,
    updateEstadoUsuario,
    deleteUsuario

}