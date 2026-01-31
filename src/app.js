import 'dotenv/config';
import express from 'express';
import path from 'path';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import session from './config/session.js';
import passport from './config/passport.js';
import indexRouter from './routes/indexRouter.js';
import storageRouter from './routes/storageRouter.js';
import authRouter from './routes/authRouter.js';
import addCurrentUserToLocals from './middlewares/addCurrentUserToLocals.js';
import notAuthRedirectToHomepage from './middlewares/notAuthRedirectToHomepage.js';
    
const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({ extended: true }));

app.use(session()); // Express session with Prisma session store
app.use(passport.session());

app.use(addCurrentUserToLocals);

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/storage', notAuthRedirectToHomepage, storageRouter);

app.use((error, req, res, next) => {
    console.log(error);    
    res.status(500).render('error', { errors: error.message  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, (error) => {
    if (error) {
        console.error('Server error: ', error);
        throw error;
    };
    console.log(`Express app is listening on port ${PORT}`);    
});