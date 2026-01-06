import { createFolder, getAllFolders } from '../db/queries.js';
import multer from 'multer';

const storageGet = async (req, res) => {
    const userId  = req.user.id;
    const folders = await getAllFolders(userId);
    
    res.render('storage', { folders });     
};

//TODO: add file validation
const fileUploadPost = [   
    (req, res, next) => {
        const upload = multer({ dest: 'uploads/' }).single('uploadedFile');

        upload(req, res, (error) => {
            if (error instanceof multer.MulterError) {
                // A Multer error occurred when uploading.
                console.error('Multer error: ' + error);
            } else if (error) {
                // An unknown error occurred when uploading.
                console.error('Unknown error when uploading file: ' + error);
            };           
        });

        res.redirect('/storage');      
    }  
];
//TODO: add folder name validation
const createFolderPost = [
    async (req, res, next) => {
        const userId  = req.user.id;
        const { newFolderName } = req.body;

        try {
            await createFolder(userId, newFolderName);           
            res.redirect('/storage');

        } catch (error) {
            next(error);
        }      
    }
];

const folderGet = async (req, res) => {
    const { userId } = req.user;
    const { folderId } = req.params.folderId;

    res.render('storage')



}

export { 
    storageGet,
    fileUploadPost,
    createFolderPost,
    folderGet 
};