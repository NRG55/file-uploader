import { Router } from 'express';
import logoutGet from '../controllers/logoutController.js';

const logoutRouter = Router();

logoutRouter.get('/', logoutGet);

export default logoutRouter;