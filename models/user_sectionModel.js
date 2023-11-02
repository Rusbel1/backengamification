const {Schema, model} = require('mongoose');

const user_sectionSchema = Schema({
    
    id_usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        require: [true,'El id del usuario es obligatorio'],
    },
    id_section: {
        type: Schema.Types.ObjectId,
        ref: 'Section',
        require: [true,'El id de la section es obligatorio'],
    },
    completed:{
        type: Boolean,
        default: false,
    }
    
});

user_sectionSchema.methods.toJSON = function(){
    const { __v, _id,...user_section }=this.toObject();
    user_section.uid = _id
    return user_section;
}

module.exports = model('User_section',user_sectionSchema);