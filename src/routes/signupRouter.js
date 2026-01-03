import { Router } from 'express';
import { signupGet, signupPost } from '../controllers/signupController.js';

const signupRouter = Router();

signupRouter.get('/', signupGet);
signupRouter.post('/', signupPost);

export default signupRouter;