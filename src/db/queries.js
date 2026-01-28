import prisma from "../config/prisma.js";
import bcrypt from "bcryptjs";

/* -------------- USER -------------- */

const createUser = async (username, password) => {       
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            username,
            password: hashedPassword,
            folders: {
                create: {
                    name: "My Storage"
                }
            }
        }
    });

    return user;  
};

const getUserByUsername = async (username) => {    
    const user = await prisma.user.findUnique({
        where: {
            username
        }
    });

    return user;
};

const getUserById = async (id) => {    
    const user = await prisma.user.findUnique({
        where: {
            id
        }
    });

    return user;
};

/* -------------- FOLDER -------------- */

const createFolder = async (userId, parentFolderId, folderName) => { 
    const folder = await prisma.folder.create({
        data: {
            userId: userId,
            parentFolderId: parentFolderId,
            name: folderName,
        }
    });

    return folder;  
};

const renameFolder = async (folderId, folderName) => { 
    const folder = await prisma.folder.update({
        where: {
            id: folderId,
        },
        data: {
            name: folderName,
        },
    });

    return folder; 
};

const deleteFolder = async (folderId) => {
    return await prisma.folder.delete({
        where: {
            id: folderId,
        }       
    });   
};

// Root folder id
const getStorageId = async (userId) => {   
    const storage = await prisma.folder.findFirst({
        where: {
            userId: userId,
            parentFolderId: null           
        }      
    });

    return storage.id;
}

const getFolder = async (userId, folderId) => {
    const folder = await prisma.folder.findFirst({
        where: {
            id: folderId,
            userId: userId
        },
        include: {
            parentFolder: true,
            childFolders: { orderBy: { createdAt: 'asc' } },
            files: { orderBy: { createdAt: 'asc' } }
        }       
    });

    return folder;
}

const createSharedLink = async (userId, folderId, expiresAt) => { 
    const sharedLink = await prisma.sharedLink.create({
        data: {
            userId,
            folderId,
            expiresAt
        }
    });

    return sharedLink;  
};


/* -------------- FILE -------------- */

const createFile = async (userId, folderId, fileName, size, mimeType, url, publicId) => {   
    const file = await prisma.file.create({
        data: {
            name: fileName,            
            userId: userId,            
            folderId: folderId,
            size: size,
            mimeType: mimeType,
            url: url,
            publicId: publicId
        }
    });

    return file;  
};

const getFileById = async (fileId) => {
    const file = await prisma.file.findFirst({
        where: {
            id: fileId            
        }
    });

    return file;
};

const renameFile = async (fileId, fileName) => { 
    const file = await prisma.file.update({
        where: {
            id: fileId,
        },
        data: {
            name: fileName,
        },
    });

    return file; 
};

const deleteFile = async (fileId) => {
    return await prisma.file.delete({
        where: {
            id: fileId,
        }       
    });   
};

export {
    createUser, 
    getUserByUsername,
    getUserById,
    createFolder,
    renameFolder,
    deleteFolder,
    renameFile,
    deleteFile,
    getStorageId,
    getFolder,   
    createFile,
    getFileById,
    createSharedLink
};