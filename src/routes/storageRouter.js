import { Router } from "express";
import upload from "../config/multer.js";
import {     
    storageGet,
    fileUploadPost,
    createFolderPost,
    renameFolderPost,
    deleteFolderGet,
    renameFilePost,
    deleteFileGet,
    folderGet
 } from "../controllers/storageController.js";
 

const storageRouter = Router();

storageRouter.get('/', storageGet);
storageRouter.post('/:parentFolderId/upload-file', upload.single('uploadedFile'), fileUploadPost);
storageRouter.post('/:parentFolderId/create-folder', createFolderPost);
storageRouter.post('/:parentFolderId/rename-folder/:folderId', renameFolderPost);
storageRouter.get('/:parentFolderId/delete-folder/:folderId', deleteFolderGet);

storageRouter.post('/:parentFolderId/rename-file/:fileId', renameFilePost);
storageRouter.get('/:parentFolderId/delete-file/:fileId', deleteFileGet);

storageRouter.get('/:folderId', folderGet);

export default storageRouter;