import { getConnection } from "../database/database"

const getPermisos = async(req, res) => {
    try{
        const connection= await getConnection()
        const result=await connection.query("SELECT * FROM permisos")
        console.log(result)
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.message)
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
        res.send(error.message)
    }

};

const postPermiso = async(req, res) => {
    try{
        const {id_permiso, nombre_permiso, estado_permiso} = req.body;

        if (id_permiso == "" || nombre_permiso == "" || estado_permiso == "") {
            return res.status(400).json({message: "Error, por favor digite todos los datos."})
        }
        const permisos = {id_permiso, nombre_permiso, estado_permiso}
        const connection= await getConnection()
        const result = await connection.query("INSERT INTO permisos SET ?", permisos )
        // res.json({message: "Registrado con éxito :D."})
        console.log("Registrado con éxito")
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.message)
    }

};

const updatePermiso = async(req, res) => {
    try{
        console.log(req.params)
        const {id_permiso}=req.params
        const {nombre_permiso, estado_permiso} = req.body;

        if (nombre_permiso == ""
            || estado_permiso == "") {
            return res.status(400).json({message: "Error, por favor digite todos los datos."})
        }
        const permisos = { nombre_permiso, estado_permiso}
        const connection= await getConnection()
        const result=await connection.query("UPDATE permisos SET ? WHERE id_permiso = ?", [permisos, id_permiso])
        console.log(result)
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.message)
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
        res.send(error.message)
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
        res.send(error.message)
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
        res.send(error.message)
    }

};

const postRol = async(req, res) => {
    try{
        const {nombre_rol, descripcion_rol, estado_rol} = req.body;

        if (nombre_rol == "" || descripcion_rol == "" || estado_rol == "") {
            return res.status(400).json({message: "Error, por favor digite todos los datos."})
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
        res.send(error.message)
    }

};

const updateRol = async(req, res) => {
    try{
        console.log(req.params)
        const {id_rol}=req.params
        const { nombre_rol, descripcion_rol, estado_rol } = req.body;

        if ( nombre_rol == "" || descripcion_rol == ""
            || estado_rol == "") {
            return res.status(400).json({message: "Error, por favor digite todos los datos."})
        }
        const roles = { nombre_rol, descripcion_rol, estado_rol }
        const connection= await getConnection()
        const result=await connection.query("UPDATE roles SET ? WHERE id_rol = ?", [roles, id_rol])
        console.log(result)
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.message)
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
        res.status(500).json({ message: "Error interno del servidor." });
    }
};

const deleteRol = async(req, res) => {
    try{
        console.log(req.params)
        const {id_rol}=req.params
        
        const connection= await getConnection()
        const result=await connection.query("DELETE FROM roles WHERE id_rol = ?", id_rol)
        console.log(result)
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.message)
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
        res.send(error.message)
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
        res.send(error.message)
    }

};

const postRolesPermisos = async(req, res) => {
    try{
        const { fecha_roles_permisos, id_rol, id_permiso } = req.body;


        const roles_permisos = { fecha_roles_permisos, id_rol, id_permiso }
        const connection= await getConnection()
        const result = await connection.query("INSERT INTO roles_permisos SET ?", roles_permisos )
        // res.json({message: "Registrado con éxito :D."})
        console.log("Registrado con éxito")
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.message)
    }

};

const updateRolesPermisos = async(req, res) => {
    try{
        console.log(req.params)
        const {id_roles_permisos}=req.params
        const { fecha_roles_permisos, id_rol, id_permiso } = req.body;

        if ( fecha_roles_permisos == "" || id_rol == ""
            || id_permiso == "") {
            return res.status(400).json({message: "Error, por favor digite todos los datos."})
        }
        const roles_permisos = { fecha_roles_permisos, id_rol, id_permiso }
        const connection= await getConnection()
        const result=await connection.query("UPDATE roles_permisos SET ? WHERE id_roles_permisos = ?", [roles_permisos, id_roles_permisos])
        console.log(result)
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.message)
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
        res.send(error.message)
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
        res.send(error.message)
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
        res.send(error.message)
    }

};

const postUsuario = async(req, res) => {
    try{
        const { id_usuario, imagen_usuario, nombre_usuario, email, contraseña, telefono_usuario, direccion_usuario, estado_usuario, id_rol } = req.body;

        if ( id_usuario == "" || nombre_usuario == "" || email == ""
            || contraseña == "" || telefono_usuario == "" || direccion_usuario == "" || estado_usuario == "" || id_rol == "") {
            return res.status(400).json({message: "Error, por favor digite todos los datos."})
        }
        const usuarios = { id_usuario, imagen_usuario, nombre_usuario, email, contraseña, telefono_usuario, direccion_usuario, estado_usuario, id_rol }
        const connection= await getConnection()
        const result = await connection.query("INSERT INTO usuarios SET ?", usuarios )
        // res.json({message: "Registrado con éxito :D."})
        console.log("Registrado con éxito")
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.message)
    }

};

const updateUsuario = async(req, res) => {
    try{
        console.log(req.params)
        const {id_usuario}=req.params
        const {imagen_usuario, nombre_usuario, email, contraseña, telefono_usuario, direccion_usuario, estado_usuario, id_rol} = req.body;

        if ( nombre_usuario == "" || email == ""
            || contraseña == "" || telefono_usuario == "" || direccion_usuario == "" || estado_usuario == "" || id_rol == "") {
            return res.status(400).json({message: "Error, por favor digite todos los datos."})
        }
        const usuarios = { imagen_usuario, nombre_usuario, email, contraseña, telefono_usuario, direccion_usuario, estado_usuario, id_rol }
        const connection= await getConnection()
        const result=await connection.query("UPDATE usuarios SET ? WHERE id_usuario = ?", [usuarios, id_usuario])
        console.log(result)
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.message)
    }

};

<<<<<<< HEAD
const updateContraseña = async(req, res) => {
    try{
        console.log(req.params)
        const {id_usuario}=req.params
        const {contraseña} = req.body;

        if (id_usuario == "" || contraseña == "") {
            return res.status(400).json({message: "Error, por favor digite todos los datos."})
        }
        const connection= await getConnection()
        const result=await connection.query("UPDATE usuarios SET contraseña = ? WHERE id_usuario = ?", [contraseña, id_usuario])
        console.log(result)
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.message)
    }

};

=======
>>>>>>> origin/Santiago
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
        res.status(500).json({ message: "Error interno del servidor." });
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
        res.send(error.message)
    }

};

export const methods = {
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
<<<<<<< HEAD
    updateContraseña,
=======
>>>>>>> origin/Santiago
    updateEstadoUsuario,
    deleteUsuario

}