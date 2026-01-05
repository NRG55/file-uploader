import { Router } from "express";
import { 
    storageGet,
    fileUploadPost,
    createFolderPost
 } from "../controllers/storageController.js";

const storageRouter = Router();

storageRouter.get('/', storageGet);
storageRouter.post('/file/upload', fileUploadPost);
storageRouter.post('/folder/create', createFolderPost);

export default storageRouter;