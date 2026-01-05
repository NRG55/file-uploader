import { Router } from "express";
import { 
    storageGet,
    fileUploadPost
 } from "../controllers/storageController.js";

const storageRouter = Router();

storageRouter.get('/', storageGet);
storageRouter.post('/file/upload', fileUploadPost);

export default storageRouter;