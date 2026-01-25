import cloudinary from '../config/cloudinary.js';
import { Readable } from 'stream';
import { 
    createFolder, 
    renameFolder, 
    deleteFolder, 
    renameFile, 
    deleteFile, 
    getFolder, 
    getStorageId, 
    createFile,
    getFileById 
} from '../db/queries.js';
import { 
    getFolderWithParentFolders, 
    getFoldersTree, 
    getUniqueFileName,
    getUniqueFolderName 
} from '../services/storageService.js';

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
const createFolderPost = async (req, res, next) => {
    const userId  = req.user.id;
    const newFolderName = req.body.newFolderName;
    const parentFolderId  = Number(req.params.parentFolderId);

    try {
        const uniqueFolderName = await getUniqueFolderName(userId, parentFolderId, newFolderName);

        await createFolder(userId, parentFolderId, uniqueFolderName);

        res.redirect(`/storage/${parentFolderId}`);

    } catch (error) {
        next(error);
    };      
};

const renameFolderPost =  async (req, res, next) => {        
    const folderId = Number(req.params.folderId);
    const newFolderName = req.body.newFolderName;
    const parentFolderId  = Number(req.params.parentFolderId);

    try {
        await renameFolder(folderId, newFolderName);

        res.redirect(`/storage/${parentFolderId}`);

    } catch (error) {
        next(error);
    };      
};

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
const fileUploadPost = async (req, res, next) => {
    const userId  = req.user.id;        
    const parentFolderId  = Number(req.params.parentFolderId);
    const file = req.file;

    if (!file) {
        return res.status(400).render('error', {                
            errorMessages: ['Upload failed: no file were uploaded.'],
        });
    };

    const uniqueFileName = await getUniqueFileName(userId, parentFolderId, file.originalname)

    try {
        const uploadResult = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                    {
                        folder: `file-uploader/folder-${userId}`,
                        resource_type: 'auto',                            
                        public_id: uniqueFileName,
                    },
                    (error, result) => {
                        if (error) {
                            console.log(error)
                            reject(error);
                        } else {
                            resolve(result);
                        };
                    }
            );
    
            stream.end(file.buffer);
        });

        await createFile(
            userId, 
            parentFolderId, 
            uniqueFileName, 
            file.size, 
            file.mimetype, 
            uploadResult.secure_url,
            uploadResult.public_id 
        )

        res.redirect(`/storage/${parentFolderId}`);

    } catch (error) {
        next(error);
    };              
};

const renameFilePost = async (req, res, next) => {        
    const fileId = Number(req.params.fileId);
    const newFileName = req.body.newFileName;
    const parentFolderId  = Number(req.params.parentFolderId);

    try {
        await renameFile(fileId, newFileName);

        res.redirect(`/storage/${parentFolderId}`);

    } catch (error) {
        next(error);
    };      
};

const deleteFileGet = async (req, res, next) => {        
    const fileId = Number(req.params.fileId);   
    const parentFolderId  = Number(req.params.parentFolderId);

    try {
        const file = await getFileById(fileId);
        //  by default cloudinary the destroy method is defaulted to be applied for the resource_type: 'image' 
        await cloudinary.uploader.destroy(file.publicId, { resource_type: "raw" }).then(result => console.log(result));
        await deleteFile(fileId);

        res.redirect(`/storage/${parentFolderId}`);

    } catch (error) {
        next(error);
    };      
};

const downloadFileGet = async (req, res, next) => {        
    const fileId = Number(req.params.fileId); 

    try {
        const file = await getFileById(fileId);
        
        if(!file) {
            return res.status(400).render('error', {                
                    errorMessages: ['Download failed: file does not exist.'],
                });
        };

        const response = await fetch(file.url);
        const stream = Readable.fromWeb(response.body);       

        res.set({
            'content-type': `${file.mimeType}`,
            'content-length': `${file.size}`,
            'content-disposition': `attachment; filename='${file.name}'`
        });

        stream.pipe(res);

        } catch (error) {
            console.log(error)
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
    downloadFileGet,
    folderGet 
};