import { check, validationResult } from "express-validator";
import userRepo from "../../repos/users.js";


const validations = {
    requireEmail : check('email').trim().normalizeEmail().isEmail()
    .withMessage('Must be a valid email')
    .custom(async email =>{
        const existingUser = await userRepo.getOneBy({email});
        if(existingUser){
            throw new Error('email in use')
        } 
    }),

    requirePassword : check('password').trim().isLength({min:4, max:20})
    .withMessage('Must be between 4 and 20 characters'),

    requireConfirmPassword : check('confirmPassword').trim().isLength({min:4, max:20})
    .custom(async (confirmPassword,{ req })=>{
        if(confirmPassword !== req.body.password){
            throw new Error('password must match')
        }
    })
}

export default validations;