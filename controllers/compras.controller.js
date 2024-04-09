import { getConnection } from "../database/database"

const getCompra = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query(`
            SELECT c.id_compra, c.numero_compra, c.fecha_compra, c.total_compra, p.nombre_proveedor, c.estado_compra
            FROM compras c
            INNER JOIN proveedores p ON c.id_proveedor = p.id_proveedor
        `);
        console.log(result);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.msg);
    }
};


const consultCompra = async(req, res) => {
    try{
        console.log(req.params)
        const {id_compra}=req.params
        const connection= await getConnection()
        const result=await connection.query("SELECT * FROM compras WHERE id_compra = ?", id_compra)
        console.log(result)
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.msg)
    }

};

const postCompra = async(req, res) => {
    try{
        const {numero_compra, fecha_compra, estado_compra, total_compra, id_proveedor } = req.body;

        if (numero_compra == undefined || fecha_compra == undefined
            || estado_compra == undefined || total_compra == undefined || id_proveedor == undefined) {
            res.status(400).json({msg: "Error, por favor digite todos los datos."})
        }
        const compras = {numero_compra, fecha_compra, estado_compra, total_compra, id_proveedor }
        const connection= await getConnection()
        const result = await connection.query("INSERT INTO compras SET ?", compras )
        // res.json({msg: "Registrado con éxito :D."})
        console.log("Registrado con éxito")
        // Devuelve el ID de la compra que acabas de crear
        const idCompraInsertada = result.insertId;
        res.json({ id_compra: idCompraInsertada, msg: `Compra registrada con éxito. ID de compra: ${idCompraInsertada}` });
    }catch(error){
        res.status(500);
        res.send(error.msg)
    }

};


const deleteCompra = async(req, res) => {
    try{
        console.log(req.params)
        const {id_compra}=req.params
        
        const connection= await getConnection()
        const result=await connection.query("DELETE FROM compras WHERE id_compra = ?", id_compra)
        console.log(result)
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.msg)
    }

};

const updateCompra = async (req, res) => {
    try {
        const { id_compra } = req.params;
        const { estado_compra } = req.body;

        if (estado_compra === undefined) {
            res.status(400).json({ msg: "Error, por favor proporciona el nuevo estado de la compra." });
            return;
        }

        const connection = await getConnection();
        const result = await connection.query("UPDATE compras SET estado_compra = ? WHERE id_compra = ?", [estado_compra, id_compra]);
        console.log(result);

        res.json(result);
    } catch (error) {
        res.status(500).send(error.msg);
    }
};





const getProveedor = async(req, res) => {
    try{
        const connection= await getConnection()
        const result=await connection.query("SELECT * FROM proveedores")
        console.log(result)
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.msg)
    }

};

const postProveedor = async(req, res) => {
    try{
        const { id_proveedor, nombre_proveedor, telefono_proveedor, direccion_proveedor, estado_proveedor } = req.body;

        if ( nombre_proveedor == undefined || telefono_proveedor == undefined
            || direccion_proveedor == undefined || estado_proveedor == undefined) {
            res.status(400).json({msg: "Error, por favor digite todos los datos."})
        }
        const proveedor = { id_proveedor, nombre_proveedor, telefono_proveedor, direccion_proveedor, estado_proveedor }
        const connection= await getConnection()
        const result = await connection.query("INSERT INTO proveedores SET ?", proveedor )
        // res.json({msg: "Registrado con éxito :D."})
        console.log("Registrado con éxito")
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.msg)
    }


};

const consultProveedor = async(req, res) => {
    try{
        console.log(req.params)
        const {id_proveedor}=req.params
        const connection= await getConnection()
        const result=await connection.query("SELECT * FROM proveedores WHERE id_proveedor = ?", id_proveedor)
        console.log(result)
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.msg)
    }

};

const deleteProveedor = async(req, res) => {
    try{
        console.log(req.params)
        const {id_proveedor}=req.params
        
        const connection= await getConnection()
        const result=await connection.query("DELETE FROM proveedores WHERE id_proveedor = ?", id_proveedor)
        console.log(result)
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.msg)
    }

};

const updateProveedor = async(req, res) => {
    try{
        console.log(req.params)
        const {id_proveedor}=req.params
        const { nombre_proveedor, telefono_proveedor, direccion_proveedor, estado_proveedor } = req.body;

        if (nombre_proveedor == undefined || telefono_proveedor == undefined
            || direccion_proveedor == undefined || estado_proveedor == undefined) {
            res.status(400).json({msg: "Error, por favor digite todos los datos."})
        }
        const proveedores = { nombre_proveedor, telefono_proveedor, direccion_proveedor, estado_proveedor }
        const connection= await getConnection()
        const result=await connection.query("UPDATE proveedores SET ? WHERE id_proveedor = ?", [proveedores, id_proveedor])
        console.log(result)
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.msg)
    }

};

const updateEstadoProveedor = async (req, res) => {
    try {
        console.log(req.params);
        const { id_proveedor } = req.params;
        const {estado_proveedor} = req.body;
    
        // Obtener el estado inverso
        const nuevoEstado = estado_proveedor;

        const connection= await getConnection()
        // Actualizar el estado en la base de datos
        const result = await connection.query("UPDATE proveedores SET estado_proveedor = ? WHERE id_proveedor = ?", [nuevoEstado, id_proveedor]);
        console.log(result);

        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error interno del servidor." });
    }
};

const getCatInsumos = async(req, res) => {
    try{
        const connection= await getConnection()
        const result=await connection.query("SELECT * FROM categoria_insumos")
        console.log(result)
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.msg)
    }

};

const consultCatInsumos = async(req, res) => {
    try{
        console.log(req.params)
        const {id_categoria_insumos}=req.params
        const connection= await getConnection()
        const result=await connection.query("SELECT * FROM categoria_insumos WHERE id_categoria_insumos = ?", id_categoria_insumos)
        console.log(result)
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.msg)
    }

};

const postCatInsumos = async(req, res) => {
    try{
        const {id_categoria_insumos, nombre_categoria_insumos, estado_categoria_insumos } = req.body;

        if (nombre_categoria_insumos == undefined || estado_categoria_insumos == undefined) {
            res.status(400).json({msg: "Error, por favor digite todos los datos."})
        }
        const categoria_insumos = { id_categoria_insumos, nombre_categoria_insumos, estado_categoria_insumos }
        const connection= await getConnection()
        const result = await connection.query("INSERT INTO categoria_insumos SET ?", categoria_insumos )
        // res.json({msg: "Registrado con éxito :D."})
        console.log("Registrado con éxito")
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.msg)
    }

};

const deleteCatInsumos = async(req, res) => {
    try{
        console.log(req.params)
        const {id_categoria_insumos}=req.params
        
        const connection= await getConnection()
        const result=await connection.query("DELETE FROM categoria_insumos WHERE id_categoria_insumos = ?", id_categoria_insumos)
        console.log(result)
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.msg)
    }

};

const updateCatInsumos = async(req, res) => {
    try{
        console.log(req.params)
        const {id_categoria_insumos}=req.params
        const { nombre_categoria_insumos, estado_categoria_insumos } = req.body;

        if ( id_categoria_insumos == undefined || nombre_categoria_insumos == undefined || estado_categoria_insumos == undefined) {
            res.status(400).json({msg: "Error, por favor digite todos los datos."})
        }
        const categoria_insumos = { nombre_categoria_insumos, estado_categoria_insumos }
        const connection= await getConnection()
        const result=await connection.query("UPDATE categoria_insumos SET ? WHERE id_categoria_insumos = ?", [categoria_insumos, id_categoria_insumos])
        console.log(result)
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.msg)
    }

};

const updateEstadoCatInsumos = async (req, res) => {
    try {
        console.log(req.params);
        const { id_categoria_insumos } = req.params;
        const {estado_categoria_insumos} = req.body;
    
        // Obtener el estado inverso
        const nuevoEstado = estado_categoria_insumos;

        const connection= await getConnection()
        // Actualizar el estado en la base de datos
        const result = await connection.query("UPDATE categoria_insumos SET estado_categoria_insumos = ? WHERE id_categoria_insumos = ?", [nuevoEstado, id_categoria_insumos]);
        console.log(result);

        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error interno del servidor." });
    }
};

const getInsumos = async(req, res) => {
    try{
        const connection= await getConnection()
        const result=await connection.query(`
            SELECT i.*, ci.nombre_categoria_insumos AS nombre_categoria
            FROM insumos i
            INNER JOIN categoria_insumos ci ON i.id_categoria_insumo = ci.id_categoria_insumos
        `);
        console.log(result)
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.msg)
    }
};


const consultInsumos = async(req, res) => {
    try{
        console.log(req.params)
        const {id_insumo}=req.params
        const connection= await getConnection()
        const result=await connection.query("SELECT * FROM insumos WHERE id_insumo = ?", id_insumo)
        console.log(result)
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.msg)
    }

};

const postInsumos = async(req, res) => {
    try{
        const { id_insumo, imagen_insumo, nombre_insumo, unidadesDeMedida_insumo, stock_insumo, estado_insumo, id_categoria_insumo } = req.body;

        if ( nombre_insumo == undefined || unidadesDeMedida_insumo == undefined
            || stock_insumo == undefined || estado_insumo == undefined || id_categoria_insumo == undefined) {
            res.status(400).json({msg: "Error, por favor digite todos los datos."})
        }
        const insumos = { id_insumo, imagen_insumo, nombre_insumo, unidadesDeMedida_insumo, stock_insumo, estado_insumo, id_categoria_insumo }
        const connection= await getConnection()
        const result = await connection.query("INSERT INTO insumos SET ?", insumos )
        // res.json({msg: "Registrado con éxito :D."})
        console.log("Registrado con éxito")
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.msg)
    }

};

const deleteInsumos = async(req, res) => {
    try{
        console.log(req.params)
        const {id_insumo}=req.params
        
        const connection= await getConnection()
        const result=await connection.query("DELETE FROM insumos WHERE id_insumo = ?", id_insumo)
        console.log(result)
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.msg)
    }

};

const updateInsumos = async(req, res) => {
    try{
        console.log(req.params)
        const {id_insumo}=req.params
        const { imagen_insumo, nombre_insumo, unidadesDeMedida_insumo, stock_insumo, estado_insumo, id_categoria_insumo } = req.body;

        if ( id_insumo == undefined || nombre_insumo == undefined || unidadesDeMedida_insumo == undefined
            || stock_insumo == undefined || estado_insumo == undefined || id_categoria_insumo == undefined) {
            res.status(400).json({msg: "Error, por favor digite todos los datos."})
        }
        const insumos = { imagen_insumo, nombre_insumo, unidadesDeMedida_insumo, stock_insumo, estado_insumo, id_categoria_insumo }
        const connection= await getConnection()
        const result=await connection.query("UPDATE insumos SET ? WHERE id_insumo = ?", [insumos, id_insumo])
        console.log(result)
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.msg)
    }

};

const updateEstadoInsumos = async (req, res) => {
    try {
        console.log(req.params);
        const { id_insumo } = req.params;
        const {estado_insumo} = req.body;
    
        // Obtener el estado inverso
        const nuevoEstado = estado_insumo;

        const connection= await getConnection()
        // Actualizar el estado en la base de datos
        const result = await connection.query("UPDATE insumos SET estado_insumo = ? WHERE id_insumo = ?", [nuevoEstado, id_insumo]);
        console.log(result);

        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error interno del servidor." });
    }
};

const getComprasInsumo = async(req, res) => {
    try{
        const connection= await getConnection()
        const result=await connection.query("SELECT * FROM compras_insumos")
        console.log(result)
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.msg)
    }

};

const consultComprasInsumo = async(req, res) => {
    try{
        console.log(req.params)
        const {id_compras_insumos}=req.params
        const connection= await getConnection()
        const result=await connection.query("SELECT * FROM compras_insumos WHERE id_compras_insumos = ?", id_compras_insumos)
        console.log(result)
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.msg)
    }

};

const postComprasInsumo = async(req, res) => {
    try{
        const { cantidad_insumo_compras_insumos, precio_insumo_compras_insumos, id_compra , id_insumo } = req.body;

        if ( cantidad_insumo_compras_insumos == undefined || precio_insumo_compras_insumos == undefined || id_compra == undefined
            || id_insumo == undefined) {
            res.status(400).json({msg: "Error, por favor digite todos los datos."})
        }

        const compras_insumos = { cantidad_insumo_compras_insumos, precio_insumo_compras_insumos, id_compra , id_insumo }
        const connection= await getConnection()
        const result = await connection.query("INSERT INTO compras_insumos SET ?", compras_insumos )
        // res.json({msg: "Registrado con éxito :D."})
        console.log("Registrado con éxito")
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.msg)
    }

};

const deleteComprasInsumo = async(req, res) => {
    try{
        console.log(req.params)
        const {id_compras_insumos}=req.params
        
        const connection= await getConnection()
        const result=await connection.query("DELETE FROM compras_insumos WHERE id_compras_insumos = ?", id_compras_insumos)
        console.log(result)
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.msg)
    }

};

const updateComprasInsumo = async(req, res) => {
    try{
        console.log(req.params)
        const {id_compras_insumos}=req.params
        const { cantidad_insumo_compras_insumos, precio_insumo_compras_insumos, id_compra , id_insumo } = req.body;

        if ( cantidad_insumo_compras_insumos == undefined || precio_insumo_compras_insumos == undefined
            || id_compra == undefined || id_insumo == undefined) {
            res.status(400).json({msg: "Error, por favor digite todos los datos."})
        }
        const compras_insumos = { cantidad_insumo_compras_insumos, precio_insumo_compras_insumos, id_compra , id_insumo }
        const connection= await getConnection()
        const result=await connection.query("UPDATE compras_insumos SET ? WHERE id_compras_insumos = ?", [compras_insumos, id_compras_insumos])
        console.log(result)
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.msg)
    }

};



export const methods = {
    //COMPRAS
    getCompra,
    consultCompra,
    postCompra,
    deleteCompra,
    updateCompra,
    //PROVEEDORES
    getProveedor,
    consultProveedor,
    postProveedor,
    deleteProveedor,
    updateProveedor,
    updateEstadoProveedor,
    //CATEGIRÍA DE INSUMOS
    getCatInsumos,
    consultCatInsumos,
    postCatInsumos,
    deleteCatInsumos,
    updateCatInsumos,
    updateEstadoCatInsumos,
    //INSUMOS
    getInsumos,
    consultInsumos,
    postInsumos,
    deleteInsumos,
    updateInsumos,
    updateEstadoInsumos,
    //compras_insumos
    getComprasInsumo,
    consultComprasInsumo,
    postComprasInsumo,
    deleteComprasInsumo,
    updateComprasInsumo,
}
