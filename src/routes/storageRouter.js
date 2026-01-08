import { Router } from "express";
import upload from "../middlewares/multer.js";
import {     
    storageGet,
    fileUploadPost,
    createFolderPost,
    folderGet
 } from "../controllers/storageController.js";
 

const storageRouter = Router();

storageRouter.get('/', storageGet);
storageRouter.post('/:parentFolderId/upload-file', upload.single('uploadedFile'), fileUploadPost);
storageRouter.post('/:parentFolderId/create-folder', createFolderPost);

storageRouter.get('/:folderId', folderGet);

export default storageRouter;