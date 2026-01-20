const checkAuthentication = (req, res, next)  => {
    if (req.isAuthenticated()) {
        return res.redirect('/storage');
    };
    
    next();
};

export default checkAuthentication;