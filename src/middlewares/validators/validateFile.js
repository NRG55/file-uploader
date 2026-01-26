import { body } from 'express-validator';
import { fileTypeFromBuffer } from 'file-type';

const invalidCharacters = /[<>:"/\\|?*]/;
const allowedTypes = [
    'text/plain',
    'application/pdf',
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/svg+xml',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
];

const validateFile = [
    body('uploadedFile')        
        .custom(async (value, { req }) => {
            if (invalidCharacters.test(value)) {
                throw new Error(`File name cannot contain any of the following characters: < > : " / \\ | ? *`);
            };            

            if (!req.file) {
                throw new Error('File is required');
            };
            console.log(req.file)
            const fileType = await fileTypeFromBuffer(req.file.buffer);
            console.log(fileType)
            if (!allowedTypes.includes(req.file.mimetype)) {
                throw new Error(`File type is not supported. Allowed file types: TXT, PDF, JPG, PNG, WEBP, SVG, DOC, DOCX, XLS, XLSX.`)
            };

            if (req.file.size > 100 * 1024 * 1024) { // 100Mb
                throw new Error('File size exceeds 1MB limit');
            };

            return true;
        })      
];

export default validateFile;