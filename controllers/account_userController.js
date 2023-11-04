const{response,request}= require('express');
const {User_account} = require('../models')
const brcryptjs = require('bcryptjs');



const user_accPost = async(req = request, res = response)=>{
    try {
        
      const {mail,
            password} = req.body;

        const data ={mail,
            password}
            
        const user_account = new User_account(data);
       
        //Encriptar contraseña
         const salt =  brcryptjs.genSaltSync();
         user_account.password = brcryptjs.hashSync(password,salt);

        //Guardar en DB
        await user_account.save();
        return res.json({
            msg:`Usuario con mail:${mail} se ha creado exitosamente`
        });

    } catch (error) {
        console.log(error);
        return res.status(401);
    }
 }
const user_accGet = async(req = request, res = response)=>{
    try {

        const allAcc= await User_account.find({});

        return res.json(allAcc)
        
    } catch (error) {
        console.log(error);
        return res.status(401);
    }
}

const user_accGetById= async(req = request, res = response)=>{
    try {
        const {id} = req.params
        const acc= await User_account.findById(id);
        if(!acc){
            return res.status(400).json({
                msg:`Usuario con id:${id} no se encuentra en la db`
            })
        }
        return res.json(acc)
        
    } catch (error) {
        console.log(error);
        return res.status(401);
    }
}

 const user_accPut = async(req = request, res = response)=>{
    try {
        
        const {id} = req.params;
        const user_acc = await User_account.findById(id);
        
        if(!user_acc.mail){
            return res.json({
                msg: `El usuario${nombre1} ha sido borrado previamente`
            })
        }
        const {mail,
               password} = req.body

            const data ={
                mail,
                password
            }
            
       
            //Encriptar contraseña
             const salt =  brcryptjs.genSaltSync();
             data.password = brcryptjs.hashSync(password,salt);
             await User_account.findByIdAndUpdate(id, data);
            console.log(data);
        return res.json({
            msg: 'Ha sido cambiado con exito',
        })

    } catch (error) {
        console.log(error);
        return res.status(401);
    }
 }

 const user_accDelete = async(req = request, res = response)=>{
try {
    
    const {id}= req.params;
     const existe = await User_account.findById(id)
     if(!existe){
        return res.status(400).json({
            msg:'El usuario no existe en la db'
        })
     }  
    //Convertimos el estado del usuario en false
    await User_account.findByIdAndDelete(id);


  return res.json({
        msg: 'usuario borrado con exito'
   })
} catch (error) {
    console.log(error);
}
}

module.exports = {
    user_accGet,
    user_accPut,
    user_accDelete,
    user_accPost,
    user_accGetById
}