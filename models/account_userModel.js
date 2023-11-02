const {Schema, model} = require('mongoose');

const account_userSchema = Schema({
    
    mail: {
        type: String,
        require: [true,'El mail es obligatorio'],
        unique: true,
    },
    password:{
        type: String,
        require: [true,'El password es obligatorio'],
    }
    
});

account_userSchema.methods.toJSON = function(){
    const { __v, _id,...account_user }=this.toObject();
    account_user.uid = _id
    return account_user;
}

module.exports = model('Account_user',account_userSchema);