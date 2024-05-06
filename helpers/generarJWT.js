const jwt = require('jsonwebtoken')

const generarJWT = (uid = "", usuario = null, permisos = []) => {


    return new Promise((resolve, reject) => {

        const payload = { uid, permisos, usuario };

        jwt.sign( payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '10m'
        }, (err, token) => {

            if(err){
                console.log(err)
                reject("No se pudo generar el token.");
            }else{
                resolve(token);
            }
        })
    })
}

const generarJwtRecuperacion = (email = "") => {


    return new Promise((resolve, reject) => {

        const payload = { email };

        jwt.sign( payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '10m'
        }, (err, token) => {

            if(err){
                console.log(err)
                reject("No se pudo generar el token.");
            }else{
                resolve(token);
            }
        })
    })
}

module.exports = {
    generarJWT,
    generarJwtRecuperacion
}