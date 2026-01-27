import { Router } from "express";
import upload from "../config/multer.js";
import validateFolder from "../middlewares/validators/validateFolder.js";
import validateFile from "../middlewares/validators/validateFile.js";
import {     
    storageGet,
    fileUploadPost,
    createFolderPost,
    renameFolderPost,
    deleteFolderGet,
    shareFolderPost,
    renameFilePost,
    deleteFileGet,
    downloadFileGet,
    folderGet,
    handleFolderValidation,
    handleFileValidation
 } from "../controllers/storageController.js";
 

const storageRouter = Router();

storageRouter.get('/', storageGet);

// --------------- FILE ---------------

storageRouter.post('/:parentFolderId/upload-file', upload.single('uploadedFile'), validateFile, handleFileValidation, fileUploadPost);
storageRouter.post('/:parentFolderId/rename-file/:fileId', renameFilePost);
storageRouter.get('/:parentFolderId/delete-file/:fileId', deleteFileGet);
storageRouter.get('/:parentFolderId/download-file/:fileId', downloadFileGet);

// --------------- FOLDER ---------------

storageRouter.post('/:parentFolderId/create-folder', validateFolder, handleFolderValidation, createFolderPost);
storageRouter.post('/:parentFolderId/rename-folder/:folderId', validateFolder, handleFolderValidation, renameFolderPost);
storageRouter.get('/:parentFolderId/delete-folder/:folderId', deleteFolderGet);
storageRouter.post('/:parentFolderId/share-folder/:folderId', shareFolderPost);



storageRouter.get('/:folderId', folderGet);

export default storageRouter;