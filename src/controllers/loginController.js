import validateLogin from '../middlewares/validators/validateLogin.js';
import { validationResult } from 'express-validator';
import passport from '../config/passport.js';

const loginGet = (req, res) => {
    res.render('log_in', { data: {} });
};

const loginPost = [
    validateLogin,
    (req, res, next) => {           
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

                res.redirect('/');
            })
        })(req, res, next);
    }
];

export { loginGet, loginPost };