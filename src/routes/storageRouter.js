import { Router } from "express";
import { 
    storageGet,
    fileUploadPost,
    createFolderPost,
    folderGet
 } from "../controllers/storageController.js";

const storageRouter = Router();

storageRouter.get('/', storageGet);
storageRouter.post('/file/upload', fileUploadPost);
storageRouter.post('/folder/create', createFolderPost);

storageRouter.get('/folder/:folderId', folderGet);

export default storageRouter;