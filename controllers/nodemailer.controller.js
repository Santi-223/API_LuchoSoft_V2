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
                from: '"luchosoft3@gmail.com" <luchosoft3@gmail.com>', // sender address
                to: email, // list of receivers
                subject: "Recuperación de contraseña.", // Subject line
                text: "Hello world?", // plain text body
                html: `<div style="background-color: rgba(102, 22, 22, 0.103); border-radius: 5vw;">
    <div>
        <center>
            <img style="width: 80vw; max-width: 400px; margin-top: 3vw;" src="https://res.cloudinary.com/donirviw7/image/upload/v1718740318/coydyew7jwirfbfxth7d.png">
            <div style="margin-top: 3vw;">
                <h1 style="font-family:Roboto;">Recuperar contraseña</h1>
                <p style="font-family:Roboto;">Para recuperar tu contraseña haz <a href='https://luchosoftreact.onrender.com/#/recuperarContrasena2/${token}'>click aquí.</a></p>
            </div>
        </center>

    </div>
    <footer style="padding-top: 5vw; padding-bottom: 3vw; text-align: center;">
        <p>&copy; 2024 LuchoSoft. Todos los derechos reservados.</p>
    </footer>
</div>

`
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
