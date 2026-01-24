import expressSession from 'express-session';
import prisma from './prisma.js';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import "dotenv/config";

const prismaSessionStore = new PrismaSessionStore(
    prisma, 
    {
        checkPeriod: 2 * 60 * 1000,  // 2 minutes
        dbRecordIdIsSessionId: true,
        dbRecordIdFunction: undefined,
    }
);

export default () => expressSession({
    store: prismaSessionStore,
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 } // 7 days
});