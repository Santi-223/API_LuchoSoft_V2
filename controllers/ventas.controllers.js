import {getConnection} from "../database/database";

//---------------------------CLIENTES-----------------------------------------------------------
const getClientes = async (req, res)=>{
    try{
        const connection = await getConnection();
        const result = await connection.query("SELECT id_cliente, nombre_cliente, telefono_cliente, direccion_cliente, cliente_frecuente, estado_cliente FROM clientes");
        res.json(result);
    } catch(error){
        res.status(500);
        res.send(error.message)
    }
};

const getCliente = async (req, res)=>{
    try{
        console.log(req.params);
        const { id_cliente } = req.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT id_cliente, nombre_cliente, telefono_cliente, direccion_cliente, cliente_frecuente, estado_cliente FROM clientes WHERE id_cliente = ?", id_cliente);
        res.json(result);
    } catch(error){
        res.status(500);
        res.send(error.message)
    }
};

const postCliente = async (req, res)=>{
    try{
        const{id_cliente, nombre_cliente, telefono_cliente, direccion_cliente, cliente_frecuente, estado_cliente} = req.body;
        if (id_cliente == undefined ||nombre_cliente ==undefined || telefono_cliente== undefined || direccion_cliente==undefined || cliente_frecuente == undefined || estado_cliente == undefined){
            res.status(500).json({message: "mala petición. Por favor llenar los campos"})
        }
        
        const cliente = {id_cliente, nombre_cliente, telefono_cliente, direccion_cliente, cliente_frecuente, estado_cliente}
        const connection = await getConnection();
        await connection.query("INSERT INTO clientes SET ?", cliente);
        res.json({message: "Cliente añadido"})
        
    } catch(error){
        res.status(500);
        res.send(error.message)
    }
};

const updateCliente = async (req, res)=>{
    try{
        const { id_cliente } = req.params;
        const{nombre_cliente, telefono_cliente, direccion_cliente, cliente_frecuente, estado_cliente} = req.body;
        if (nombre_cliente ==undefined || telefono_cliente== undefined || direccion_cliente==undefined || cliente_frecuente == undefined || estado_cliente == undefined){
            res.status(500).json({message: "mala petición. Por favor llenar los campos"})
        }

        const cliente = {id_cliente, nombre_cliente, telefono_cliente, direccion_cliente, cliente_frecuente, estado_cliente}
        const connection = await getConnection();
        const result = await connection.query("UPDATE clientes SET ? WHERE id_cliente = ?", [cliente, id_cliente]);
        res.json(result);
    } catch(error){
        res.status(500);
        res.send(error.message)
    }
};

const deleteCliente = async (req, res)=>{
    try{
        console.log(req.params);
        const { id_cliente } = req.params;
        const connection = await getConnection();
        const result = await connection.query("DELETE FROM clientes WHERE id_cliente = ?", id_cliente);
        res.json(result);
    } catch(error){
        res.status(500);
        res.send(error.message)
    }
};

//------------------------------------PEDIDOS---------------------------------------------------
const getPedidos = async (req, res)=>{
    try{
        const connection = await getConnection();
        const result = await connection.query("SELECT id_pedido, observaciones, fecha_venta, fecha_pedido, estado_pedido, total_venta, total_pedido,id_cliente, id_usuario FROM pedidos");
        res.json(result);
    } catch(error){
        res.status(500);
        res.send(error.message)
    }
};

const getPedido = async (req, res)=>{
    try{
        console.log(req.params);
        const { id_pedido } = req.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT id_pedido, observaciones, fecha_venta, fecha_pedido, estado_pedido, total_venta, total_pedido,id_cliente, id_usuario FROM pedidos WHERE id_pedido = ?", id_pedido);
        res.json(result);
    } catch(error){
        res.status(500);
        res.send(error.message)
    }
};

const postPedido = async (req, res)=>{
    try{
        const{id_pedido, observaciones, fecha_venta, fecha_pedido, estado_pedido, total_venta, total_pedido,id_cliente, id_usuario} = req.body;
        if (observaciones ==undefined || fecha_venta== undefined || fecha_pedido==undefined || estado_pedido == undefined || total_venta == undefined || total_pedido == undefined||id_cliente==undefined || id_usuario == undefined){
            res.status(500).json({message: "mala petición. Por favor llenar los campos"})
        }
        // const fecha_venta_formateada = new Date(req.body.fecha_venta).getFullYear() + '-' + (new Date(req.body.fecha_venta).getMonth() + 1) + '-' + new Date(req.body.fecha_venta).getDate();
        // const fecha_pedido_formateada = new Date(req.body.fecha_pedido).getFullYear() + '-' + (new Date(req.body.fecha_pedido).getMonth() + 1) + '-' + new Date(req.body.fecha_pedido).getDate();
        const fecha_venta_formateada = new Date(req.body.fecha_venta).getFullYear() + '-' + (new Date(req.body.fecha_venta).getMonth() + 1) + '-' + new Date(req.body.fecha_venta).getDate();
        const fecha_pedido_formateada = new Date(req.body.fecha_pedido).getFullYear() + '-' + (new Date(req.body.fecha_pedido).getMonth() + 1) + '-' + new Date(req.body.fecha_pedido).getDate();
        
        const pedido = {id_pedido, observaciones, fecha_venta: fecha_venta_formateada, fecha_pedido: fecha_pedido_formateada, estado_pedido, total_venta, total_pedido,id_cliente, id_usuario}
        const connection = await getConnection();
        await connection.query("INSERT INTO pedidos SET ?", pedido);
        res.json({message: "Pedido añadido"})
        
    } catch(error){
        res.status(500);
        res.send(error.message)
    }
};

const updatePedido = async (req, res)=>{
    try{
        const { id_pedido } = req.params;
        const{ observaciones, fecha_venta, fecha_pedido, estado_pedido, total_venta, total_pedido,id_cliente, id_usuario} = req.body;
        if (observaciones ==undefined || fecha_venta== undefined || fecha_pedido==undefined || estado_pedido == undefined || total_venta == undefined || total_pedido == undefined||id_cliente==undefined || id_usuario == undefined){
            res.status(500).json({message: "mala petición. Por favor llenar los campos"})
        }

        const pedido = {id_pedido, observaciones, fecha_venta, fecha_pedido, estado_pedido, total_venta, total_pedido,id_cliente, id_usuario}
        const connection = await getConnection();
        const result = await connection.query("UPDATE pedidos SET ? WHERE id_pedido = ?", [pedido, id_pedido]);
        res.json(result);
    } catch(error){
        res.status(500);
        res.send(error.message)
    }
};

const deletePedido = async (req, res)=>{
    try{
        console.log(req.params);
        const { id_pedido } = req.params;
        const connection = await getConnection();
        const result = await connection.query("DELETE FROM pedidos WHERE id_pedido = ?", id_pedido);
        res.json(result);
    } catch(error){
        res.status(500);
        res.send(error.message)
    }
};

const getPedidosProductos = async(req, res) => {
    try{
        const connection= await getConnection()
        const result=await connection.query("SELECT * FROM pedidos_productos")
        console.log(result)
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.message)
    }

};

const consultPedidosProductos = async(req, res) => {
    try{
        console.log(req.params)
        const {id_pedidos_productos}=req.params
        const connection= await getConnection()
        const result=await connection.query("SELECT * FROM pedidos_productos WHERE id_pedidos_productos = ?", id_pedidos_productos)
        console.log(result)
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.message)
    }

};

const consultPedidosProductos2 = async(req, res) => {
    try{
        console.log(req.params)
        const {id_pedido}=req.params
        const connection= await getConnection()
        const result=await connection.query("SELECT * FROM pedidos_productos WHERE id_pedido = ?", id_pedido)
        console.log(result)
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.message)
    }

};

const postPedidosProductos = async(req, res) => {
    try{
        const { fecha_pedido_producto, cantidad_producto, subtotal , id_producto, id_pedido } = req.body;

        if ( cantidad_producto == undefined || subtotal == undefined || id_pedido == undefined
            || id_producto == undefined || fecha_pedido_producto == undefined) {
            res.status(400).json({message: "Error, por favor digite todos los datos."})
        }

        const pedidos_productos = { fecha_pedido_producto, cantidad_producto, subtotal , id_producto, id_pedido }
        const connection= await getConnection()
        const result = await connection.query("INSERT INTO pedidos_productos SET ?", pedidos_productos )
        // res.json({message: "Registrado con éxito :D."})
        console.log("Registrado con éxito")
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.message)
    }

};

const deletePedidosProductos = async(req, res) => {
    try{
        console.log(req.params)
        const {id_pedidos_productos}=req.params
        
        const connection= await getConnection()
        const result=await connection.query("DELETE FROM pedidos_productos WHERE id_pedidos_productos = ?", id_pedidos_productos)
        console.log(result)
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.message)
    }

};

const updatePedidosProductos = async(req, res) => {
    try{
        console.log(req.params)
        const {id_pedidos_productos}=req.params
        const { fecha_pedido_producto, cantidad_producto, subtotal , id_producto, id_pedido } = req.body;

        if ( cantidad_producto == undefined || subtotal == undefined || id_pedido == undefined
            || id_producto == undefined || fecha_pedido_producto == undefined) {
            res.status(400).json({message: "Error, por favor digite todos los datos."})
        }
        const pedidos_productos = { fecha_pedido_producto, cantidad_producto, subtotal , id_producto, id_pedido }
        const connection= await getConnection()
        const result=await connection.query("UPDATE pedidos_productos SET ? WHERE id_pedidos_productos = ?", [pedidos_productos, id_pedidos_productos])
        console.log(result)
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.message)
    }

};

export const methods = {
    getClientes,
    getPedidos,
    getCliente,
    getPedido,
    postCliente,
    postPedido,
    updateCliente,
    updatePedido,
    deleteCliente,
    deletePedido,
    getPedidosProductos,
    consultPedidosProductos,
    postPedidosProductos,
    deletePedidosProductos,
    updatePedidosProductos,
    consultPedidosProductos2
}