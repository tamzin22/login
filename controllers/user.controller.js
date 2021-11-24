const bcrypt = require('bcrypt');
const userService = require('../services/users.services');

exports.register = (req,res,next)=>{
    const {password} = req.body;
    const salt = bcrypt.genSalt(10);

    req.body.password = bcrypt.hashSync(password,salt);

    userService.register(req,res,(error,result)=>{
        if(err){
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data : result,
        });
    });
}

exports.login = (req,res,next) => {
    const{email,password} = req.body;

    userService.login({email,password},(error,result)=>{
        if(err){
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data : result,
        });
    });
}

exports.userProfile = (req,res,next) =>{
    return res.status(200).json({message : 'Authorized User'});
}