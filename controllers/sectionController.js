const{response,request}= require('express');
const {Section} = require('../models');



const sectionPost = async(req = request, res = response)=>{
    try {
        
      const {title,
            slug,
            description,
            points_value
            } = req.body;

        const data ={title,
            slug,
            description,
            points_value
            }
            
        const section = new Section(data);           

        //Guardar en DB
        await section.save();
        return res.json({
            msg:'Section creado con exito'
        });

    } catch (error) {
        console.log(error);
        return res.status(401);
    }
 }

 const sectionGet = async(req = request, res = response)=>{
    try {
        const sections = await Section.find({});

        return res.json(sections)
        
    } catch (error) {
        console.log(error);
        return res.status(401);
    }
}

const sectionGetById = async(req = request, res = response)=>{
    try {
        const {id} = req.params
        const section = await Section.findById(id);
        if(!section){
            return res.json({
                msg:`No se encuentra el section id:${id} en la db`
            })
        }
        return res.json(section)
        
    } catch (error) {
        console.log(error);
        return res.status(401);
    }
}

const sectionPut = async(req = request, res = response)=>{
    try {
        
        const {id} = req.params;
        const section = await Section.findById(id);
        
        if(!section){
            return res.json({
                msg: `El section ${id} no no se encuentra en la db`
            })
        }
        const {title,
            slug,
            description,
            points_value
            } = req.body;

        const data ={title,
            slug,
            description,
            points_value
            }
        
            await Section.findByIdAndUpdate(id, data);
            console.log(data);
        return res.json({
            msg: 'Ha section ha sido cambiado con exito',
        })

    } catch (error) {
        console.log(error);
        return res.status(401);
    }
 }

 const sectionDelete = async(req = request, res = response)=>{
try {
    
    const {id}= req.params;
     const section = await Section.findById(id)
     if(!section){
        return res.status(400).json({
            msg:'El usuario no existe en la db'
        })
     }  
    //Convertimos el estado del usuario en false
    await Section.findByIdAndDelete(id);


  return res.json({
        msg: 'usuario borrado con exito'
   })
} catch (error) {
    console.log(error);
}
}



module.exports = {
    sectionGet,
    sectionGetById,
    sectionPut,
    sectionDelete,
    sectionPost
}