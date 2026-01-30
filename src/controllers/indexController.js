import { getSharedLink, getFolder } from '../db/queries.js';
import { 
    getFolderWithParentFolders, 
    getFoldersTree   
} from '../services/storageService.js';

const indexPageGet = (req, res) => {
        res.render("index");     
};

const sharedFolderGet = async (req, res, next) => {
    const sharedLinkId = req.params.sharedLinkId;
    const paramsFolderId = Number(req.params.folderId);
    const isSharedFolder = true;
    let folderId;

    try {
        const sharedLink = await getSharedLink(sharedLinkId);
        const { userId, folderId: rootFolderId } = sharedLink;

        if (paramsFolderId) {
            folderId = paramsFolderId;
        } else {
            folderId = rootFolderId;
        };
    
        const folderWithParentFoldersArray = await getFolderWithParentFolders(folderId, rootFolderId); // [{id: 1, name: 'folder name'}, ...]
        const foldersTreeArray = await getFoldersTree(userId, rootFolderId); // [{id: 1, name: 'folder name', childFolders: []}, ...]
        const folder = await getFolder(userId, folderId);

        res.render('shared_folder', {
                                sharedLinkId,
                                rootFolderId,
                                isSharedFolder,                                 
                                folder,
                                parentFolderId: folderId, 
                                folderWithParentFoldersArray, 
                                foldersTreeArray 
                            });

    } catch (error) {
        next(error);
    };         
};

export {
    indexPageGet,
    sharedFolderGet
};