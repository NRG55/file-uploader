import prisma from "../middlewares/prisma.js";
import bcrypt from "bcryptjs";

/* -------------- USER -------------- */

const createUser = async (username, password) => {       
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            username,
            password: hashedPassword
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

const createFolder = async (userId, folderName) => { 
    const folder = await prisma.folder.create({
        data: {
            name: folderName,
            user: {
                connect: {
                    id: userId
                }
            }
        }
    });

    return folder;  
};

const getAllFolders = async (userId) => { 
    const folders = await prisma.folder.findMany({
        where: {
            userId
        }
    });

    return folders;  
}; 

export {
    createUser, 
    getUserByUsername,
    getUserById,
    createFolder,
    getAllFolders
};