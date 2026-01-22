import { createFolder, renameFolder, deleteFolder, renameFile, deleteFile, getFolder, getStorageId, createFile } from '../db/queries.js';
import { getFolderWithParentFolders, getFoldersTree } from '../services/storageService.js';

const storageGet = async (req, res, next) => {
    try {
        const storageId = await getStorageId(req.user.id);

        res.redirect(`/storage/${storageId}`);

    } catch (error) {
        next(error);
    };    
};

// ------------------ FOLDER -------------------

//TODO: add folder name validation
const createFolderPost = [
    async (req, res, next) => {
        const userId  = req.user.id;
        const newFolderName = req.body.newFolderName;
        const parentFolderId  = Number(req.params.parentFolderId);

        try {
            await createFolder(userId, parentFolderId, newFolderName);

            res.redirect(`/storage/${parentFolderId}`);

        } catch (error) {
            next(error);
        };      
    }
];

const renameFolderPost = [
    async (req, res, next) => {        
        const folderId = Number(req.params.folderId);
        const newFolderName = req.body.newFolderName;
        const parentFolderId  = Number(req.params.parentFolderId);

        try {
            await renameFolder(folderId, newFolderName);

            res.redirect(`/storage/${parentFolderId}`);

        } catch (error) {
            next(error);
        };      
    }
];

const deleteFolderGet = async (req, res, next) => {        
    const folderId = Number(req.params.folderId);   
    const parentFolderId  = Number(req.params.parentFolderId);

    try {
        await deleteFolder(folderId);

        res.redirect(`/storage/${parentFolderId}`);

    } catch (error) {
        next(error);
    };      
};

const folderGet = async (req, res, next) => {
    const userId = req.user.id;
    const folderId = Number(req.params.folderId);
    const folderWithParentFoldersArray = await getFolderWithParentFolders(folderId); // [{id: 1, name: 'folder name'}, ...]
    const foldersTreeArray = await getFoldersTree(userId); // [{id: 1, name: 'folder name', childFolders: []}, ...]

    try {
        const folder = await getFolder(userId, folderId);

        res.render('storage', { 
                                folder,
                                parentFolderId: folderId, 
                                folderWithParentFoldersArray, 
                                foldersTreeArray 
                            });

    } catch (error) {
        next(error);
    };  
};

// ----------------- FILE ----------------------

//TODO: add file validation
const fileUploadPost = [   
    async (req, res, next) => {
        const userId  = req.user.id;
        const { originalname, size, mimetype } = req.file;
        const parentFolderId  = Number(req.params.parentFolderId);
        const url = 'test-url.com';

        try {
            await createFile(userId, parentFolderId, originalname, size, mimetype, url )

            res.redirect(`/storage/${parentFolderId}`);

        } catch (error) {
            next(error);
        };              
    } 
];

const renameFilePost = [
    async (req, res, next) => {        
        const fileId = Number(req.params.fileId);
        const newFileName = req.body.newFileName;
        const parentFolderId  = Number(req.params.parentFolderId);

        try {
            await renameFile(fileId, newFileName);

            res.redirect(`/storage/${parentFolderId}`);

        } catch (error) {
            next(error);
        };      
    }
];

const deleteFileGet = async (req, res, next) => {        
    const fileId = Number(req.params.fileId);   
    const parentFolderId  = Number(req.params.parentFolderId);

    try {
        await deleteFile(fileId);

        res.redirect(`/storage/${parentFolderId}`);

    } catch (error) {
        next(error);
    };      
};

export {
    storageGet,   
    fileUploadPost,
    createFolderPost,
    renameFolderPost,
    deleteFolderGet,
    renameFilePost,
    deleteFileGet,
    folderGet 
};