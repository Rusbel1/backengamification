const{response,request}= require('express');
const {Usuario} = require('../models');



const usuariosPost = async(req = request, res = response)=>{
    try {
        
      const {id_account_user,
            first_name,
            second_name,
            first_lastname,
            second_lastname,
            } = req.body;

        const data ={
            id_account_user,
            first_name,
            second_name,
            first_lastname,
            second_lastname,
        }
            
        const usuario = new Usuario(data);           

        //Guardar en DB
        await usuario.save();
        return res.json({
            msg:'Uusario creado con exito'
        });

    } catch (error) {
        console.log(error);
        return res.status(401);
    }
 }

 const usuariosGet = async(req = request, res = response)=>{
    try {
        const allUser= await Usuario.find({}).populate('id_account_user');

        return res.json(allUser)
        
    } catch (error) {
        console.log(error);
        return res.status(401);
    }
}
const usuariosGetById = async(req = request, res = response)=>{
    try {
        const {id} = req.params
        const user = await Usuario.findById(id).populate('id_account_user');
        if(!user){
            return res.json({
                msg:`No se encuentra el id:${id} en la db`
            })
        }
        return res.json(user)
        
    } catch (error) {
        console.log(error);
        return res.status(401);
    }
}

const usuariosGetByIdAcc = async(req = request, res = response)=>{
    try {
        const {idAcc} = req.params
        const userAccount = await Usuario.findOne({id_account_user:idAcc}).populate('id_account_user');
        if(!userAccount){
            return res.json({
                msg:`No se encuentra el id:${id} en la db`
            })
        }
        return res.json(userAccount)
        
    } catch (error) {
        console.log(error);
        return res.status(401);
    }
}

 const usuariosPut = async(req = request, res = response)=>{
    try {
        
        const {id} = req.params;
        const usuario = await Usuario.findById(id);
        
        if(!usuario){
            return res.json({
                msg: `El usuario ${id} no no se encuentra en la db`
            })
        }
        const {id_account_user,
            first_name,
            second_name,
            first_lastname,
            second_lastname,
            points_user} = req.body

            const data ={id_account_user,
                first_name,
                second_name,
                first_lastname,
                second_lastname,
                points_user}
            
       
            //Encriptar contraseña
            await Usuario.findByIdAndUpdate(id, data);
            console.log(data);
        return res.json({
            msg: 'Ha sido cambiado con exito',
        })

    } catch (error) {
        console.log(error);
        return res.status(401);
    }
 }

 const usuariosDelete = async(req = request, res = response)=>{
try {
    
    const {id}= req.params;
     const existe = await Usuario.findById(id)
     if(!existe){
        return res.status(400).json({
            msg:'El usuario no existe en la db'
        })
     }  
    //Convertimos el estado del usuario en false
    await Usuario.findByIdAndDelete(id);


  return res.json({
        msg: 'usuario borrado con exito'
   })
} catch (error) {
    console.log(error);
}
}



module.exports = {
    usuariosGet,
    usuariosGetById,
    usuariosPut,
    usuariosDelete,
    usuariosGetByIdAcc,
    usuariosPost
}