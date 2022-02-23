const jwt = require("jsonwebtoken");

module.exports = async(req, res, next) =>{
    try {
        let token = req.headers.authorization.split(' ')[1]
        if(!token){
            return res.status(403).send("No token - authenticate")
        }
        let verify = jwt.verify(token, process.env.SECRET || 'secretbox')
        req.user = verify.user;
        next();
    } catch (e) {
        res.status(500).send(e.message)
    }
}


   