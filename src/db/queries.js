import prisma from "../middlewares/prisma.js";
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
            files: true
        }       
    });

    return folder;
}

/* -------------- FILE -------------- */

const createFile = async (userId, fileName, folderId) => {   
    const file = await prisma.file.create({
        data: {
            name: fileName,            
            userId: userId,            
            folderId: folderId,            
        }
    });

    return file;  
};

export {
    createUser, 
    getUserByUsername,
    getUserById,
    createFolder,
    renameFolder,
    deleteFolder,
    getStorageId,
    getFolder,   
    createFile
};