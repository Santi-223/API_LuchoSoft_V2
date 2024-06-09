import { getConnection } from "../database/database";
import { generarJWT } from "../helpers/generarJWT";

const login = async (req, res) => {
    try {
        const { email, contraseña } = req.body;

        const connection = await getConnection();
        const usuarios = await connection.query("SELECT * FROM usuarios WHERE email = ?", email);

        const usuario = usuarios[0]; // Tomamos el primer usuario encontrado

        const id_rol = usuario.id_rol;

        // Ejecutar la consulta con el id_rol proporcionado
        const rows = await connection.query("SELECT id_permiso FROM roles_permisos WHERE id_rol = ?", id_rol);

        // Almacenar los id_permiso en un array
        const permisos = rows.map(row => row.id_permiso);

        console.log('Los id_permiso para el id_rol', id_rol, 'son:', permisos);

        if (usuarios.length === 0) {
            res.status(400).json({ msg: "El email no se encuentra registrado." });
            return; // Agregamos un return para salir de la función en este punto si no se encuentra el usuario
        }


        if (usuario.estado_usuario == 0) {
            res.status(400).json({ msg: "El usuario está inactivo." });
            return;
        }

        if (usuario.contraseña != contraseña){
            res.status(400).json({msg: "La contraseña es incorrecta."})
            return;
        }

        const { contraseña: _, ...usuarioSinContraseña } = usuario;

        //Json web token

        const token = await generarJWT(usuario.id_usuario, usuarioSinContraseña, permisos)


        // Si llegamos aquí, significa que el usuario fue encontrado
        res.json({ token });

    } catch (error) {
        res.status(500).send(error.msg);
    }
};

export const methods = {
    login
};
