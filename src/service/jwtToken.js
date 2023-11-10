const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")

const tokenGeneration = (userId, deviceId) => {
    securityKey = "kashgfldgf"
    userDetails = {
        Id: userId,
        dId: deviceId
    }
    const token = jwt.sign(userDetails, securityKey, { expiresIn: "600s" })
    return token
}

const passwordHash = (password) => {
    
    const salt = bcrypt.genSaltSync(10);
    const pwd = bcrypt.hashSync(password, salt)
    return pwd

}

const compare = (password, resultPassword)=>{
    let pwd = bcrypt.compareSync(password, resultPassword);
    return pwd
}


module.exports = {
    tokenGeneration,
    passwordHash,
    compare
}