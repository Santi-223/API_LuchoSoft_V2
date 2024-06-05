import { getConnection } from "../database/database";
const cloudinary = require("cloudinary").v2;
const fs = require('fs');

//---------------------------PRODUCTOS-----------------------------------------------------------
const getProductos = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT id_producto , imagen_producto , nombre_producto , descripcion_producto , estado_producto , precio_producto , id_categoria_producto  FROM productos");
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.msg)
    }
};

const getProducto = async (req, res) => {
    try {
        console.log(req.params);
        const { id_producto } = req.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT id_producto, imagen_producto, nombre_producto, descripcion_producto, estado_producto, precio_producto, id_categoria_producto FROM productos WHERE id_producto = ?", id_producto);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.msg)
    }
};

const postProducto = async (req, res) => {
    try {

        var imagen_producto

        // Verificar si el archivo fue subido
        if (!req.file) {
            imagen_producto = 'https://instalacionesherman.com/wp-content/uploads/2018/04/Imagen_por_defecto-600x450.png'
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


            imagen_producto = result2.url;
        }


        const { nombre_producto, descripcion_producto, estado_producto, precio_producto, id_categoria_producto } = req.body;
        /*
        if (nombre_producto == undefined || descripcion_producto == undefined || estado_producto == undefined || precio_producto == undefined || id_categoria_producto == undefined) {
            res.status(500).json({ msg: "mala petición. Por favor llenar los capos" })
        }
        */

        if (nombre_producto == "" || descripcion_producto == "" || estado_producto == "" || precio_producto == "" || id_categoria_producto == "") {
            res.status(500).json({ msg: "mala petición. Por favor llenar los capos" })
        }

        const producto = { imagen_producto, nombre_producto, descripcion_producto, estado_producto, precio_producto, id_categoria_producto }
        const connection = await getConnection();
        await connection.query("INSERT INTO productos SET ?", producto);
        res.json({ msg: "Producto añadido" })



    } catch (error) {
        res.status(500);
        res.send(error.msg)
    }
};

const updateProducto = async (req, res) => {
    try {
        var imagen_producto

        // Verificar si el archivo fue subido
        if (!req.file) {
            try {
                console.log(req.params)
                const { id_producto } = req.params
                const connection = await getConnection()
                const result = await connection.query("SELECT * FROM productos WHERE id_producto = ?", id_producto)
                console.log(result)
                imagen_producto = result[0].imagen_producto
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


            imagen_producto = result2.url;
        }




        const { id_producto } = req.params;
        const {nombre_producto, descripcion_producto, estado_producto, precio_producto, id_categoria_producto } = req.body;
        if (imagen_producto == undefined || nombre_producto == undefined || descripcion_producto == undefined || estado_producto == undefined || precio_producto == undefined || id_categoria_producto == undefined) {
            res.status(500).json({ msg: "mala petición. Por favor llenar los campos" })
        }

        const producto = { id_producto, imagen_producto, nombre_producto, descripcion_producto, estado_producto, precio_producto, id_categoria_producto }
        const connection = await getConnection();
        const result = await connection.query("UPDATE productos SET ? WHERE id_producto = ?", [producto, id_producto]);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.msg)
    }
};

const deleteProducto = async (req, res) => {
    try {
        console.log(req.params);
        const { id_producto } = req.params;
        const connection = await getConnection();
        const result = await connection.query("DELETE FROM productos WHERE id_producto = ?", id_producto);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.msg)
    }
};

const updateEstadoProductos = async (req, res) => {
    try {
        console.log(req.params);
        const { id_producto } = req.params;
        const { estado_producto } = req.body;

        // Obtener el estado inverso
        const nuevoEstado = estado_producto;

        const connection = await getConnection()
        // Actualizar el estado en la base de datos
        const result = await connection.query("UPDATE productos SET estado_producto = ? WHERE id_producto = ?", [nuevoEstado, id_producto]);
        console.log(result);

        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error interno del servidor." });
    }
};







//------------------------------------CATEGORIA DE PRODUCTOS---------------------------------------------------
const getCategoria_productos = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT id_categoria_productos , nombre_categoria_productos , estado_categoria_productos FROM categoria_productos ");
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.msg)
    }
};

const getCategoria_producto = async (req, res) => {
    try {
        console.log(req.params);
        const { id_categoria_productos } = req.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT id_categoria_productos, nombre_categoria_productos, estado_categoria_productos FROM categoria_productos WHERE id_categoria_productos = ?", id_categoria_productos);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.msg)
    }
};

const postCategoria_producto = async (req, res) => {
    try {
        const { nombre_categoria_productos, estado_categoria_productos } = req.body;
        if (nombre_categoria_productos == undefined || estado_categoria_productos == undefined) {
            res.status(500).json({ msg: "mala petición. Por favor llenar los campos" })
        }

        const categoria_producto = { nombre_categoria_productos, estado_categoria_productos }
        const connection = await getConnection();
        await connection.query("INSERT INTO categoria_productos SET ?", categoria_producto);
        res.json({ msg: "Categoria de producto añadido" })

    } catch (error) {
        res.status(500);
        res.send(error.msg)
    }
};

const updateCategoria_producto = async (req, res) => {
    try {
        const { id_categoria_productos } = req.params;
        const { nombre_categoria_productos, estado_categoria_productos } = req.body;
        if (nombre_categoria_productos == undefined || estado_categoria_productos == undefined) {
            res.status(500).json({ msg: "mala petición. Por favor llenar los campos" })
        }

        const categoria_producto = { id_categoria_productos, nombre_categoria_productos, estado_categoria_productos }
        const connection = await getConnection();
        const result = await connection.query("UPDATE categoria_productos SET ? WHERE id_categoria_productos = ?", [categoria_producto, id_categoria_productos]);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.msg)
    }
};

const deleteCategoria_producto = async (req, res) => {
    try {
        console.log(req.params);
        const { id_categoria_productos } = req.params;
        const connection = await getConnection();
        const result = await connection.query("DELETE FROM categoria_productos WHERE id_categoria_productos = ?", id_categoria_productos);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.msg)
    }
};


const updateEstadoCategorias = async (req, res) => {
    try {
        console.log(req.params);
        const { id_categoria_productos } = req.params;
        const { estado_categoria_productos } = req.body;

        // Obtener el estado inverso
        const nuevoEstado = estado_categoria_productos;

        const connection = await getConnection()
        // Actualizar el estado en la base de datos
        const result = await connection.query("UPDATE categoria_productos SET estado_categoria_productos = ? WHERE id_categoria_productos = ?", [nuevoEstado, id_categoria_productos]);
        console.log(result);

        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error interno del servidor." });
    }
};





export const methods = {
    getProductos,
    getCategoria_productos,
    getProducto,
    getCategoria_producto,
    postProducto,
    postCategoria_producto,
    updateProducto,
    updateCategoria_producto,
    deleteProducto,
    deleteCategoria_producto,
    updateEstadoProductos,
    updateEstadoCategorias
}
