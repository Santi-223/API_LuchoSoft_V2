const nodemailer = require("nodemailer");
import { getConnection } from "../database/database"
import { generarJwtRecuperacion } from "../helpers/generarJWT";


const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: "luchosoft3@gmail.com",
        pass: "izrm ssdt rdsx tetf",
    },
});

const postCorreo = async (req, res) => {
    try {
        const { email } = req.body;
        const connection = await getConnection()

        if (email == undefined) {
            return res.status(400).json({ msg: "Error, email vacio." })
        }

        const usuarios = await connection.query("SELECT * FROM usuarios WHERE email = ?", email);

        const usuario = usuarios[0]; // Tomamos el primer usuario encontrado

        if (usuarios.length > 0) {

            if (usuario.estado_usuario == 0) {
                res.status(400).json({ msg: "El usuario está inactivo." });
                return;
            }

            const token = await generarJwtRecuperacion(email)

            await transporter.sendMail({
                from: '"Recuperar contraseña" <luchosoft3@gmail.com>', // sender address
                to: email, // list of receivers
                subject: "Recuperación de contraseña.", // Subject line
                text: "Hello world?", // plain text body
                html:`<b><a href='https://luchosoftreact.onrender.com/#/recuperarContrasena2/${token}'>http://localhost:5173/#/recuperarContrasena2/${token}</a></b>`, // html body
            });

            return res.json({ msg: 'El correo de recuperacion se ha enviado exitosamente.', token: token });
        } else {
            return res.status(400).json({ msg: "Error, el email no se encuentra registrado." })
        }


    } catch (error) {
        res.status(500).json({ error: 'mensaje de error' });
    }

};

export const methods = {
    postCorreo
}
