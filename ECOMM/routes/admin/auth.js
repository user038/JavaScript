import repo from "../../repos/users.js";
import express from "express";
import signup from "../../views/admin/auth/signup.js";
import signin from "../../views/admin/auth/signin.js";
import { validationResult} from "express-validator";
import validations from "./validators.js";

const  router = express.Router();


router.get('/signup',(req,res)=>{
    res.send(signup({ req }));
})

router.get('/signout',(req,res)=>{
    req.session = null;
    res.send('signed out');
})

router.get('/signin',(req,res)=>{
    res.send(signin({ req }))
})

router.post('/signin',[

],async(req,res)=>{
    const {email, password} = req.body;
    const user = await repo.getOneBy({email});
    if(!user){
        res.send("Account doesn't exists")
        return;
    }
    
    const validPass = await repo.comparePass(user.password,password);
    if(!validPass){
        res.send("Password is wrong")
        return;
    }
    req.session.userId = user.id;
    res.send(` <div>signed in</div>`);
})

router.post('/signup',
[
    validations.requireEmail,
    validations.requirePassword,
    validations.requireConfirmPassword
    
],async(req,res)=>{
    const errors = validationResult(req);
    console.log(errors);
    if(!errors.isEmpty()){
        return res.send(signup({req,errors}))
    }
    const {email, password, confirmPassword} = req.body;
    const user = await repo.create({email,password});
    req.session.userId = user.id;
    res.send(` <div> Account created </div>`);
})

export default router;