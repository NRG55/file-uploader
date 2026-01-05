import 'dotenv/config';
import express from 'express';
import path from 'path';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import expressSessionWithPrismaSessionStore from './middlewares/session.js';
import passport from './middlewares/passport.js';
import indexRouter from './routes/indexRouter.js';
import signupRouter from './routes/signupRouter.js';
import loginRouter from './routes/loginRouter.js';
import logoutRouter from './routes/logoutRouter.js';
import storageRouter from './routes/storageRouter.js';
import addCurrentUserToLocals from './middlewares/addCurrentUserToLocals.js';
    
const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({ extended: true }));

app.use(expressSessionWithPrismaSessionStore());
app.use(passport.session());

app.use(addCurrentUserToLocals);

app.use('/', indexRouter);
app.use('/sign-up', signupRouter);
app.use('/log-in', loginRouter);
app.use('/log-out', logoutRouter);
app.use('/storage', storageRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, (error) => {
    if (error) {
        console.error('Server error: ', error);
        throw error;
    };
    console.log(`Express app is listening on port ${PORT}`);    
});