import prisma from "../config/prisma.js";
import bcrypt from "bcryptjs";

/* -------------- USER -------------- */

const addUser = async (username, password) => {       
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

export {
    addUser, 
    getUserByUsername,
    getUserById
};