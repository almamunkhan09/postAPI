const jwt = require ('jsonwebtoken');
const varifyUser = (req,res,next)=> {
    const {authorization }= req.headers;
    try{

        const token = authorization.split(' ')[1];
        const decoded = jwt.verify(token, 'khan0902044');
        const {username,email} = decoded;

        req.username = username;
        req.email = email;
        next();

    }
    catch{
        next('Authorizartion failed')
    }

}


module.exports = varifyUser;