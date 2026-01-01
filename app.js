import 'dotenv/config';
import express from 'express';
import path from 'path';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import expressSessionWithPrismaSessionStore from './config/session.js';
import indexRouter from './routes/indexRouter.js';
    
const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.use(expressSessionWithPrismaSessionStore());

app.use('/', indexRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, (error) => {
    if (error) {
        console.error('Server error: ', error);
        throw error;
    };
    console.log(`Express app is listening on port ${PORT}`);    
});