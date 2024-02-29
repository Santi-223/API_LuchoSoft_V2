import {getConnection} from "../database/database";


//---------------------------ORDEN PRODUCCION-----------------------------------------------------------

const getOrdenes_produccion = async (req, res)=>{
    try{
        const connection = await getConnection();
        const result = await connection.query("SELECT id_orden_de_produccion, descripcion_orden, fecha_orden, id_usuario FROM ordenes_de_produccion");
        res.json(result);
    } catch(error){
        res.status(500);
        res.send(error.message)
    }
};

const getOrden_produccion = async (req, res)=>{
    try{
        console.log(req.params);
        const { id_orden_de_produccion } = req.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT id_orden_de_produccion, descripcion_orden, fecha_orden, id_usuario FROM ordenes_de_produccion WHERE id_orden_de_produccion = ?", id_orden_de_produccion);
        res.json(result);
    } catch(error){
        res.status(500);
        res.send(error.message)
    }
};

const postOrden_produccion = async (req, res)=>{
    try{
        const{id_orden_de_produccion, descripcion_orden, fecha_orden, id_usuario} = req.body;
        if (id_orden_de_produccion == undefined ||descripcion_orden ==undefined || fecha_orden== undefined || id_usuario==undefined){
            res.status(500).json({message: "mala petición. Por favor llenar los campos"})
        }
        
        const orden = {id_orden_de_produccion, descripcion_orden, fecha_orden, id_usuario}
        const connection = await getConnection();
        await connection.query("INSERT INTO ordenes_de_produccion SET ?", orden);
        res.json({message: "Orden de produccion añadida"})
        
    } catch(error){
        res.status(500);
        res.send(error.message)
    }
};

const updateOrden_produccion = async (req, res)=>{
    try{
        const { id_orden_de_produccion } = req.params;
        const{descripcion_orden, fecha_orden, id_usuario} = req.body;
        if (descripcion_orden ==undefined || fecha_orden== undefined || id_usuario==undefined){
            res.status(500).json({message: "mala petición. Por favor llenar los campos"})
        }

        const orden = {id_orden_de_produccion, descripcion_orden, fecha_orden, id_usuario}
        const connection = await getConnection();
        const result = await connection.query("UPDATE ordenes_de_produccion SET ? WHERE id_orden_de_produccion = ?", [orden, id_orden_de_produccion]);
        res.json(result);
    } catch(error){
        res.status(500);
        res.send(error.message)
    }
};

const deleteOrden_produccion= async (req, res)=>{
    try{
        console.log(req.params);
        const { id_orden_de_produccion } = req.params;
        const connection = await getConnection();
        const result = await connection.query("DELETE FROM ordenes_de_produccion WHERE id_orden_de_produccion = ?", id_orden_de_produccion);
        res.json(result);
    } catch(error){
        res.status(500);
        res.send(error.message)
    }
};




export const methods = {
    getOrdenes_produccion,
    getOrden_produccion,
    postOrden_produccion,
    updateOrden_produccion,
    deleteOrden_produccion
}