const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const auth = require('../middleware/auth.js');


async function login({email,password},callback){
    const user = await User.findOne({email});

    if(user != null){
        if(bcrypt.compareSync(password,user.password)){
            const token = auth.generateAccessToken(email);
            return callback(null,{...user.toJSON(),token})
        }
        else{
            return callback({
                message : "Invalid Email/Password"
            });
        }
    }
    else{
        return callback({
            message : "Invalid Email/Password"
        });
    }
}

async function register(params,callback){
    if(params.email === undefined){ 
        return callback({message : "Email Required"});
    }
    const user = new User(params);
    user.save()
    .then((response) =>{
        return response(null,response);
    })
    .catch((error)=>{
        return callback(error);
    });
}

module.exports = {
   login,
   register
};