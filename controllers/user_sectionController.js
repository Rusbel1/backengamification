const{response,request}= require('express');
const {User_section} = require('../models')



const User_sectionPost = async(req = request, res = response)=>{
    try {
        
      const {id_usuario,
             id_section} = req.body;

        const data ={
            id_usuario,
            id_section
        }
            
        const user_section = new User_section(data);           

        //Guardar en DB
        await user_section.save();
        return res.json({
            msg:'user_section creada con exito'
        });

    } catch (error) {
        console.log(error);
        return res.status(401);
    }
 }

 const User_sectionGet = async(req = request, res = response)=>{
    try {
        const user_section = await User_section.find({}).populate('id_usuario').populate('id_section');

        return res.json(user_section)
        
    } catch (error) {
        console.log(error);
        return res.status(401);
    }
}
const User_sectionGetByUsuario = async(req = request, res = response)=>{
    try {
        const {idUsuario} = req.params
        const user_sectionByid = await User_section.find({id_usuario:idUsuario}).populate('id_usuario').populate('id_section');
        if(!user_sectionByid){
            return res.status(400).json({
                msg:`El id de usuario id:${idUsuario} no existe en la db`
            })
        }
        return res.json(user_sectionByid)
        
    } catch (error) {
        console.log(error);
        return res.status(401);
    }
}

const User_sectionGetBySection = async(req = request, res = response)=>{
    try {
        const {idSection} = req.params
        const section_sectionByid = await User_section.find({id_section:idSection}).populate('id_usuario').populate('id_section');
        if(!section_sectionByid){
            return res.status(400).json({
                msg:`El id de usuario id:${idSection} no existe en la db`
            })
        }
        return res.json(section_sectionByid)
        
    } catch (error) {
        console.log(error);
        return res.status(401);
    }
}

const User_sectionGetById = async(req = request, res = response)=>{
    try {
        const {id} = req.params
        const user_section = await Usuario.findById(id).populate('id_usuario').populate('id_section');
        if(!user_section){
            return res.json({
                msg:`No se encuentra el id:${id} en la db`
            })
        }
        return res.json(user_section)
        
    } catch (error) {
        console.log(error);
        return res.status(401);
    }
}

 const User_sectionPut = async(req = request, res = response)=>{
    try {
        
        const {id} = req.params;
        const user_section = await User_section.findById(id).populate('id_usuario').populate('id_section');
        
        if(!user_section){
            return res.json({
                msg: `La user_section con ${id} no no se encuentra en la db`
            })
        }
        const {id_usuario,
               id_section,
               completed} = req.body;

            const data ={id_usuario,
                id_section,
                completed}
            
       
            //Encriptar contraseña
            await User_section.findByIdAndUpdate(id, data);
            console.log(data);
        res.json({
            msg: 'Ha sido cambiado con exito',
        })

    } catch (error) {
        console.log(error);
        return res.status(401);
    }
 }

 const User_sectionDelete = async(req = request, res = response)=>{
try {
    
    const {id}= req.params;
     const existe = await User_section.findById(id)
     if(!existe){
        return res.status(400).json({
            msg:'El usuario no existe en la db'
        })
     }  
    //Convertimos el estado del usuario en false
    await User_section.findByIdAndDelete(id);


  return res.json({
        msg: 'usuario borrado con exito'
   })
} catch (error) {
    console.log(error);
}
}



module.exports = {
    User_sectionPost,
    User_sectionDelete,
    User_sectionPut,
    User_sectionGetById,
    User_sectionGetBySection,
    User_sectionGetByUsuario,
    User_sectionGet

}