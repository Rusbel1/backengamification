const {Schema, model} = require('mongoose');

const sectionSchema = Schema({
    
    title: {
        type: String,
        require: [true,'El titulo es obligatorio'],
    },
    slug:{
        type: String,
        require: [true,'El slug es obligatorio'],
    },
    description:{
        type: String,
        require: [true,'La description es obligatorio'],
    },
    points_value:{
        type:Number,
        require: [true,'El points_value es obligatorio'],
    }
    
});

sectionSchema.methods.toJSON = function(){
    const { __v, _id,...section }=this.toObject();
    section.uid = _id
    return section;
}

module.exports = model('Section',sectionSchema);