import { body } from 'express-validator';

const invalidCharacters = /[<>:"/\\|?*]/;

const validateFolder = [
    body('newFolderName')
        .trim()
        .notEmpty().withMessage('Folder name is required')     
        .isLength({ min: 1, max: 32 }).withMessage('Folder name must be between 1 and 32 characters')
        .custom(value => {
            if (invalidCharacters.test(value)) {
                throw new Error(`Folder name cannot contain any of the following characters: < > : " / \\ | ? *`);
            }
            return true;
        })      
];

export default validateFolder;