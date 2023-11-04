const{response,request}= require('express');
const {Usuario} = require('../models')
const brcryptjs = require('bcryptjs');



const usuariosPost = async(req = request, res = response)=>{
    try {
        
      const {id_account_user,
            first_name,
            second_name,
            first_lastname,
            second_lastname,
            points_user} = req.body;

        const data ={
            id_account_user,
            first_name,
            second_name,
            first_lastname,
            second_lastname,
            points_user
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
        const allAcc= await Usuario.find({});

        return res.json(allAcc)
        
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
        res.json({
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
    usuariosPut,
    usuariosDelete,
    usuariosPost
}