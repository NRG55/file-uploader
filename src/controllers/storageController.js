import { createFolder, getFolder, getStorageId, createFile } from '../db/queries.js';
import { getFolderAndParentFolders } from '../services/storageService.js';

const storageGet = async (req, res, next) => {
    try {
        const storageId = await getStorageId(req.user.id);

        res.redirect(`/storage/${storageId}`);

    } catch (error) {
        next(error);
    };    
};

//TODO: add file validation
const fileUploadPost = [   
    async (req, res, next) => {
        const userId  = req.user.id;
        const fileName = req.file.originalname;
        const parentFolderId  = Number(req.params.parentFolderId);

        try {
            await createFile(userId, fileName, parentFolderId)

            res.redirect(`/storage/${parentFolderId}`);

        } catch (error) {
            next(error);
        };              
    } 
];

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

const folderGet = async (req, res, next) => {
    const userId = req.user.id;
    const folderId = Number(req.params.folderId);
    const foldersArray = await getFolderAndParentFolders(folderId); // [{id: 1, name: 'folder name'}, ...]

    try {
        const folder = await getFolder(userId, folderId);

        res.render('storage', { folder, foldersArray });

    } catch (error) {
        next(error);
    };  
}

export {
    storageGet,   
    fileUploadPost,
    createFolderPost,
    folderGet 
};