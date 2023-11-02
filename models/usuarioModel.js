const { Schema, model } = require('mongoose');

const usuarioSchema = Schema({
    id_account_user:{
        type: Schema.Types.ObjectId,
        ref:'Account_user',
        require:true
    },
    first_name: {
        type: String,
        required: [true, 'El primer nombre es obligatorio'],

    },
    second_name: {
        type: String,
    },
    first_lastname: {
        type: String,
        required: [true, 'El primer apellido es obligatorio'],
    },
    apellido2: {
        type: String,
    }, 
    points_user:{
        type: Number,
        default:0
    }
    
});

usuarioSchema.methods.toJSON = function () {
    const { __v, password, _id, ...usuario } = this.toObject();
    usuario.uid = _id
    return usuario;
}


module.exports = model('Usuario', usuarioSchema);

