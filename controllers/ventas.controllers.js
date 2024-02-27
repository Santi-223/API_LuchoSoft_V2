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
        if (id_pedido == undefined ||observaciones ==undefined || fecha_venta== undefined || fecha_pedido==undefined || estado_pedido == undefined || total_venta == undefined || total_pedido == undefined||id_cliente==undefined || id_usuario == undefined){
            res.status(500).json({message: "mala petición. Por favor llenar los campos"})
        }
        
        const pedido = {id_pedido, observaciones, fecha_venta, fecha_pedido, estado_pedido, total_venta, total_pedido,id_cliente, id_usuario}
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
    deletePedido
}