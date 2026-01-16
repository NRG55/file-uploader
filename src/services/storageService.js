import prisma from '../middlewares/prisma.js';

export const getFolderWithParentFolders = async (folderId) => {
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

export const getFoldersTree = async (userId) => {
    const folders = await prisma.folder.findMany({
        where: { userId }
    });

    const foldersMap = new Map();

    for (const folder of folders) {
        foldersMap.set(folder.id, 
            { 
                id: folder.id, 
                name: folder.name, 
                childFolders: [], 
                files: [] 
            }
        );
    };

    const foldersTreeArray = [];

    for (const folder of folders) {
        const currentFolder = foldersMap.get(folder.id);
        const files = await prisma.file.findMany({
            where: { folderId: folder.id }
        });

        if (files && files.length > 0) {
            currentFolder.files.push(...files);
        };

        if (folder.parentFolderId) {
            const parentFolder = foldersMap.get(folder.parentFolderId);

            if (parentFolder) {
                parentFolder.childFolders.push(currentFolder);
            };            

        } else { 
            // parentFolderId = null; (this is a root folder)
            foldersTreeArray.push(currentFolder);
        };
    };  

    return foldersTreeArray;
};