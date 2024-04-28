import {getConnection} from "../database/database";


//---------------------------ORDEN PRODUCCION-----------------------------------------------------------

const getOrdenes_produccion = async (req, res)=>{
    try{
        const connection = await getConnection();
        const result = await connection.query("SELECT id_orden_de_produccion, descripcion_orden, fecha_orden, id_usuario FROM ordenes_de_produccion");
        res.json(result);
    } catch(error){
        res.status(500);
        res.send(error.msg)
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
        res.send(error.msg)
    }
};

const postOrden_produccion = async (req, res)=>{
    try{
        const{descripcion_orden, fecha_orden, id_usuario} = req.body;
        if (descripcion_orden ==undefined || fecha_orden== undefined || id_usuario==undefined){
            res.status(500).json({msg: "mala petición. Por favor llenar los campos"})
        }
        
        const orden = {descripcion_orden, fecha_orden, id_usuario}
        const connection = await getConnection();
        const result= await connection.query("INSERT INTO ordenes_de_produccion SET ?", orden);
        console.log("Orden de produccion añadida")
        const idOrdenInsertada = result.insertId;
        res.json({ id_orden_de_produccion: idOrdenInsertada, msg: `Orden registrada con éxito. ID de orden: ${idOrdenInsertada}` });
        
    } catch(error){
        res.status(500);
        res.send(error.msg)
    }
};

const updateOrden_produccion = async (req, res)=>{
    try{
        const { id_orden_de_produccion } = req.params;
        const{descripcion_orden, fecha_orden, id_usuario} = req.body;
        if (descripcion_orden ==undefined || fecha_orden== undefined || id_usuario==undefined){
            res.status(500).json({msg: "mala petición. Por favor llenar los campos"})
        }

        const orden = {id_orden_de_produccion, descripcion_orden, fecha_orden, id_usuario}
        const connection = await getConnection();
        const result = await connection.query("UPDATE ordenes_de_produccion SET ? WHERE id_orden_de_produccion = ?", [orden, id_orden_de_produccion]);
        res.json(result);
    } catch(error){
        res.status(500);
        res.send(error.msg)
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
        res.send(error.msg)
    }
};



//---------------------------ORDEN INSUMOS-----------------------------------------------------------




const getOrdenesInsumo = async(req, res) => {
    try{
        const connection= await getConnection()
        const result=await connection.query("SELECT * FROM orden_insumos")
        console.log(result)
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.msg)
    }

};

const consultOrdenesInsumo = async(req, res) => {
    try{
        console.log(req.params)
        const {id_orden_insumos}=req.params
        const connection= await getConnection()
        const result=await connection.query("SELECT * FROM orden_insumos WHERE id_orden_insumos = ?", id_orden_insumos)
        console.log(result)
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.msg)
    }

};

const postOrdenesInsumo = async(req, res) => {
    try{
        const { descripcion_orden_insumos, cantidad_insumo_orden_insumos, id_orden_de_produccion , id_insumo } = req.body;

        if ( descripcion_orden_insumos == undefined || cantidad_insumo_orden_insumos == undefined || id_orden_de_produccion == undefined
            || id_insumo == undefined) {
            res.status(400).json({msg: "Error, por favor digite todos los datos."})
        }

        const ordenes_insumos = { descripcion_orden_insumos, cantidad_insumo_orden_insumos, id_orden_de_produccion , id_insumo }
        const connection= await getConnection()
        const result = await connection.query("INSERT INTO orden_insumos SET ?", ordenes_insumos )
        // res.json({msg: "Registrado con éxito :D."})
        console.log("Registrado con éxito")
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.msg)
    }

};

const deleteOrdenesInsumo = async(req, res) => {
    try{
        console.log(req.params)
        const {id_orden_insumos}=req.params
        
        const connection= await getConnection()
        const result=await connection.query("DELETE FROM orden_insumos WHERE id_orden_insumos = ?", id_orden_insumos)
        console.log(result)
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.msg)
    }

};

const updateOrdenesInsumo = async(req, res) => {
    try{
        console.log(req.params)
        const {id_orden_insumos}=req.params
        const { descripcion_orden_insumos, cantidad_insumo_orden_insumos, id_orden_de_produccion , id_insumo } = req.body;

        if ( descripcion_orden_insumos == undefined || cantidad_insumo_orden_insumos == undefined
            || id_orden_de_produccion == undefined || id_insumo == undefined) {
            res.status(400).json({msg: "Error, por favor digite todos los datos."})
        }
        const ordenes_insumos = { descripcion_orden_insumos, cantidad_insumo_orden_insumos, id_orden_de_produccion , id_insumo }
        const connection= await getConnection()
        const result=await connection.query("UPDATE orden_insumos SET ? WHERE id_orden_insumos = ?", [ordenes_insumos, id_orden_insumos])
        console.log(result)
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.msg)
    }

};



export const methods = {
    getOrdenes_produccion,
    getOrden_produccion,
    getOrdenesInsumo,
    consultOrdenesInsumo,
    postOrden_produccion,
    postOrdenesInsumo,
    updateOrden_produccion,
    updateOrdenesInsumo,
    deleteOrden_produccion,
    deleteOrdenesInsumo
}