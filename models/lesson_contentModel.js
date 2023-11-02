const {Schema, model} = require('mongoose');

const lesson_contentSchema = Schema({
    
    order: {
        type: Number,
        require: [true,'El order es obligatorio'],
    },
    type:{
        type: String,
        require: [true,'El type es obligatorio'],
    },
    content:{
        type: String,
        require: [true,'El content es obligatorio'],
    },
    id_lesson: {
        type: Schema.Types.ObjectId,
        ref: 'Lesson',
        require: [true,'El id de la lesson es obligatorio'],
    },
    
});

lesson_contentSchema.methods.toJSON = function(){
    const { __v, _id,...lesson_content }=this.toObject();
    lesson_content.uid = _id
    return lesson_content;
}

module.exports = model('Lesson_content',lesson_contentSchema);