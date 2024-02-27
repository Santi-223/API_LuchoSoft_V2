const jwt = require('jsonwebtoken')

const generarJWT = (uid = "", permisos = []) => {


    return new Promise((resolve, reject) => {

        const payload = { uid, permisos };

        jwt.sign( payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '2m'
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
    generarJWT
}