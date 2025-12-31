import { prisma } from './lib/prisma.js';

async function main() {
    const user = await prisma.user.create({
        data: {
            username: 'TestUser',
            password: 'TestPassword',
        }
    });

    console.log('Created user:', user);

    const users = await prisma.user.findMany({});

    console.log('All users:', users);
};

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (error) => {
        console.error(error)
        await prisma.$disconnect();
        /*  
            Calling process.exit() will force the process to exit as quickly as possible even if there are still asynchronous operations pending that have not yet completed fully.

            exit(0) - No more async operations are pending. 
            exit(1) - Uncaught Fatal Exception: There was an uncaught exception, and it was not handled by a domain or an uncaughtException event handler.
        */      
        process.exit(1);
    });