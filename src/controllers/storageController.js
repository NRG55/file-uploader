import multer from 'multer';

const upload = multer({ dest: 'uploads/' }).single('uploadedFile');

const storageGet = (req, res) => {
        res.render('storage');     
};

//TODO: add file validation
const fileUploadPost = [   
    (req, res, next) => {
        upload(req, res, (error) => {
            if (error instanceof multer.MulterError) {
                // A Multer error occurred when uploading.
                console.error('Multer error: ' + error);
            } else if (error) {
                // An unknown error occurred when uploading.
                console.error('Unknown error when uploading file: ' + error);
            };           
        });

        res.redirect('/storage');      
    }  
];

export { 
    storageGet,
    fileUploadPost 
};