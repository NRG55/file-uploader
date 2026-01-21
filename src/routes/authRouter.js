import express from 'express';
import validateSignup from '../middlewares/validators/validateSignup.js';
import validateLogin from '../middlewares/validators/validateLogin.js';
import checkAuthentication from '../middlewares/checkAuthentication.js';
import {    
    handleSignupValidation,
    signupGet,
    signupPost,
    handleLoginValidation,
    loginGet,        
    loginPost,
    logoutGet,  
} from '../controllers/authController.js';

const authRouter = express.Router();

authRouter.get('/sign-up', checkAuthentication, signupGet);
authRouter.post('/sign-up', validateSignup, handleSignupValidation, signupPost);

authRouter.get('/log-in', checkAuthentication, loginGet);
authRouter.post('/log-in', validateLogin, handleLoginValidation, loginPost);

authRouter.get('/log-out', logoutGet);

export default authRouter;