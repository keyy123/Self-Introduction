const jwt = require("jsonwebtoken")

function getToken(user_id){
    const payload = {
        user:user_id
    }
    return jwt.sign(payload, process.env.SECRET, {expiresIn: "30m"})
}

module.exports = getToken 