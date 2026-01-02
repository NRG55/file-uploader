import { Router } from 'express';
import { loginGet, loginPost } from '../controllers/loginController.js';

const loginRouter = Router();

loginRouter.get('/', loginGet);
loginRouter.post('/', loginPost);

export default loginRouter;