import prisma from '../config/prisma.js';
import path from 'path';

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
};

export const getFoldersTree = async (userId) => {
    const folders = await prisma.folder.findMany({
        where: { userId },
        orderBy: { createdAt: 'asc'}
    });

    const foldersMap = new Map();

    for (const folder of folders) {
        foldersMap.set(folder.id, 
            { 
                id: folder.id, 
                name: folder.name,
                parentFolderId: folder.parentFolderId, 
                childFolders: [], 
                files: [] 
            }
        );
    };

    const foldersTreeArray = [];

    for (const folder of folders) {
        const currentFolder = foldersMap.get(folder.id);
        const files = await prisma.file.findMany({
            where: { folderId: folder.id },
            orderBy: { createdAt: 'asc'}
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

export const getChildFoldersIds = async (userId, folderId) => {   
    const folders = await prisma.folder.findMany({
        where: { userId }       
    });

    const foldersMap = new Map();

    for (const folder of folders) {
        foldersMap.set(folder.id, { id: folder.id, childFolders: [] });
    };  

    for (const folder of folders) {
        const currentFolder = foldersMap.get(folder.id);              

        if (folder.parentFolderId) {
            const parentFolder = foldersMap.get(folder.parentFolderId);

            if (parentFolder) {
                parentFolder.childFolders.push(currentFolder);
            };
        }; 
    };
   
    const parentFolder = foldersMap.get(folderId);
    const childFoldersArray = parentFolder.childFolders;
    const childFoldersIds = [];
    // recursive
    function getChildFolderIds (foldersArray) {
        for (const folder of foldersArray) {
            childFoldersIds.push(folder.id);

            if (folder.childFolders.length > 0) {
                getChildFolderIds(folder.childFolders);
            }
        }        
    };

    getChildFolderIds(childFoldersArray);
    
    return childFoldersIds;
};

export const getUniqueFileName = async (userId, folderId, fileName) => {
    const ext = path.extname(fileName);
    const baseName = path.basename(fileName, ext);

    let currentFileName = fileName;
    let counter = 1;
    let fileExist = true;

    while (fileExist) {
        const file = await prisma.file.findFirst({
            where: {
                name: currentFileName,
                userId,
                folderId,
            }
        });

        if (file) {
            currentFileName = `${baseName}(${counter})${ext}`;
            counter++;           
        } else {
            fileExist = false;
        };                
    };

    return currentFileName;
};

export const getUniqueFolderName = async (userId, parentFolderId, folderName) => {
    let currentFolderName = folderName;
    let counter = 1;
    let folderExist = true;

    while (folderExist) {
        const folder = await prisma.folder.findFirst({
            where: {
                name: currentFolderName,
                userId,
                parentFolderId
            }
        });

        if (folder) {
            currentFolderName = `${folderName}(${counter})`;
            counter++;           
        } else {
            folderExist = false;
        };                
    };

    return currentFolderName;
};