const {Schema, model} = require('mongoose');

const lessonSchema = Schema({
    
    type: {
        type: String,
        require: [true,'El tipo de lesson es obligatorio'],
    },
    ovamessage:{
        type: String,
        require: [true,'El ovamessage es obligatorio'],
    },
    ovaside:{
        type: String,
        require: [true,'El ovaside es obligatorio'],
    },
    id_section: {
        type: Schema.Types.ObjectId,
        ref: 'Section',
        require: [true,'El id de la section es obligatorio'],
    },
    
});

lessonSchema.methods.toJSON = function(){
    const { __v, _id,...lesson }=this.toObject();
    lesson.uid = _id
    return lesson;
}

module.exports = model('Lesson',lessonSchema);