import { validationResult, matchedData } from 'express-validator';
import passport from '../middlewares/passport.js';

const handleSignupValidation = (req, res, next) => {
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

    next();
};

const signupGet = (req, res) => {
    res.render('sign_up', { data: {} });
};

const signupPost = async (req, res, next) => {
    try {
        const { username, password } = matchedData(req);          

        await createUser(username, password);          
        // auto login after registration
        const user = await getUserByUsername(username);

        req.login(user, (error) => {
            if (error) {
                return next(error);
            };

            res.redirect('/storage');               
        });          

    } catch (error) {
        next(error);
    };   
};

const handleLoginValidation = (req, res, next) => {
    const errors = validationResult(req);
            
    if (!errors.isEmpty()) {
        return res
            .status(400)
            .render('log_in', 
                {
                    errors: errors.array(),
                    data: req.body
                }
            );
    };
    
    next();    
};

const loginGet = (req, res) => {
    res.render('log_in', { data: {} });
};

const loginPost = (req, res, next) => {
    passport.authenticate('local', (error, user, info) => {
        if (error) {
            return next(error);
        };

        if (!user) {
            return res.render('log_in', { errors: [{ msg: info.message }], data: req.body });
        };

        req.login(user, (error) => {
            if (error) {
                return next(error);
            };

            res.redirect('/storage');
        })
    })(req, res, next);
};

const logoutGet = (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);

        req.session.destroy((err) => {
        if (err) return next(err);

        res.clearCookie('connect.sid');
        res.redirect('/');
        });
    });
};

export {
    handleSignupValidation,
    signupGet,
    signupPost,
    handleLoginValidation,
    loginGet,
    loginPost,
    logoutGet
}