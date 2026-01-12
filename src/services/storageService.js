import prisma from '../middlewares/prisma.js';

export const getFolderAndParentFolders = async (folderId) => {
    if (!folderId) {
        return [];
    };

    const foldersArray = [];
    let currentFolderId = folderId;

    while (currentFolderId) {
        const folder = await prisma.folder.findUnique({
            where: { id: currentFolderId },
            select: { 
                id: true,
                name: true,
                parentFolderId: true
             }
        });

        if (folder) {
            foldersArray.unshift({ id: folder.id, name: folder.name.toLowerCase() });
            currentFolderId = folder.parentFolderId;
        
        } else {
            currentFolderId = null;
        };
    };

    return foldersArray;
}