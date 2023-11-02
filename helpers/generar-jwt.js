const jwt = require('jsonwebtoken');

const generarJWT =(idUser)=>{
    return new Promise((resolve,reject)=>{

        const payload = {idUser};
        
        jwt.sign(payload,process.env.SECRET_KEY,{
            expiresIn: '24h'
        },(err,token)=>{
            if(err){
                console.log(err);
                reject('No se pudo generar el Token');
            }else{
                resolve(token)
            }
        });

    })
}

module.exports={
    generarJWT
}