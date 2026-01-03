import { body } from 'express-validator';
import { getUserByUsername } from '../../db/queries.js';

const emptyError = 'cannot be empty.';
const usernameLengthError = 'must be between 1 and 16 characters.';
const passwordLengthError = 'must be between 5 and 16 characters.';

const validateSignup = [    
    body('username')
        .trim()
        .notEmpty().withMessage(`Username ${usernameLengthError}`)
        .isLength({ min: 1, max: 16 }).withMessage(`Username ${usernameLengthError}`)
        .custom(async (value) => {         
                    const user = await getUserByUsername(value);

                    if (user) {
                        throw new Error();
                    };                         
                }).withMessage('User already exists.'),
    body('password')
        .trim()
        .notEmpty().withMessage(`Password ${emptyError}`)
        .isLength({ min: 5, max: 16 }).withMessage(`Password ${passwordLengthError}`),
    body('passwordConfirmation')
        .trim()
        .notEmpty().withMessage(`Password ${emptyError}`)
        .isLength({ min: 5, max: 16 }).withMessage(`Password ${passwordLengthError}`)
        .custom((value, { req }) => {
                    return value === req.body.password;          
                }).withMessage('Passwords do not match.'),
];

export default validateSignup;