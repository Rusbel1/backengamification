const{response,request}= require('express');
const {Lesson_content} = require('../models');

const lesson_contentPost = async(req = request, res = response)=>{
    try {
        
      const {order,
            type,
            content,
            id_lesson
            } = req.body;

        const data = {order,
            type,
            content,
            id_lesson
            }
            
        const lesson_content = new Lesson_content(data);           

        //Guardar en DB
        await lesson_content.save();
        return res.json({
            msg:'lesson_content creado con exito'
        });

    } catch (error) {
        console.log(error);
        return res.status(401);
    }
 }

 const lesson_contentGet = async(req = request, res = response)=>{
    try {
        const lesson_contents = await Lesson_content.find({});

        return res.json(lesson_contents)
        
    } catch (error) {
        console.log(error);
        return res.status(401);
    }
}

const lesson_contentGetById = async(req = request, res = response)=>{
    try {
        const {id} = req.params
        const lesson_content = await Lesson_content.findById(id).populate('id_lesson');
        if(!lesson_content){
            return res.json({
                msg:`No se encuentra la lesson id:${id} en la db`
            })
        }
        return res.json(lesson_content)
        
    } catch (error) {
        console.log(error);
        return res.status(401);
    }
}

const lesson_contentGetByIdLesson = async(req = request, res = response)=>{
    try {
        const {idLesson} = req.params
        const lesson_content = await Lesson_content.find({id_lesson:idLesson}).populate('id_lesson');
        if(!lesson_content){
            return res.json({
                msg:`No se encuentra la lesson id:${id} en la db`
            })
        }
        return res.json(lesson_content)
        
    } catch (error) {
        console.log(error);
        return res.status(401);
    }
}

const lesson_contentPut = async(req = request, res = response)=>{
    try {
        
        const {id} = req.params;
        const lesson_content = await Lesson_content.findById(id);
        
        if(!lesson_content){
            return res.json({
                msg: `La lesson_content ${id} no no se encuentra en la db`
            })
        }
        const {order,
            type,
            content,
            id_lesson
            } = req.body;

        const data = {order,
            type,
            content,
            id_lesson
            }
        
            await Lesson_content.findByIdAndUpdate(id, data);
            console.log(data);
        return res.json({
            msg: 'La Lesson_content ha sido cambiado con exito',
        })

    } catch (error) {
        console.log(error);
        return res.status(401);
    }
 }

 const lesson_contentDelete = async(req = request, res = response)=>{
try {
    
    const {id}= req.params;
     const lesson_content = await Lesson_content.findById(id)
     if(!lesson_content){
        return res.status(400).json({
            msg:'la lesson_content no existe en la db'
        })
     }  
    //Convertimos el estado del usuario en false
    await Lesson_content.findByIdAndDelete(id);

  return res.json({
        msg: 'usuario borrado con exito'
   })
} catch (error) {
    console.log(error);
}
}



module.exports = {
    lesson_contentGet,
    lesson_contentGetById,
    lesson_contentPut,
    lesson_contentDelete,
    lesson_contentGetByIdLesson,
    lesson_contentPost
}