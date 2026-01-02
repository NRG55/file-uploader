import { addUser, getUserByUsername } from '../db/queries.js';
import validateSignup from '../middlewares/validators/validateSignup.js';
import { validationResult, matchedData } from 'express-validator';

const signupGet = (req, res) => {
    res.render('sign_up', { data: {} });
};

const signupPost = [
    validateSignup,
    async (req, res, next) => {
        try {

        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            return res
                .status(400)
                .render('sign_up',
                    { 
                        errors: errors.array(), 
                        data: req.body 
                    }
                );
        };        

        const { username, password } = matchedData(req);          

            await addUser(username, password);          
            // auto login after registration
            const user = await getUserByUsername(username);

            req.login(user, (error) => {
                if (error) {
                    return next(error);
                };

                res.redirect('/');               
            });          

        } catch (error) {
            next(error);
        };   
    }
];

export { signupGet, signupPost };