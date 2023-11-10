const { tokenGeneration, passwordHash,compare } = require('../service/jwtToken')
const jwt = require("jsonwebtoken");
const {validateEmail, validatePassword, validatePhoneNumber} = require("../service/validate")
const pool = require("../config/connect");

const registration = (req, res) => {
    const { roles, name, deviceId, email, password, phoneNumber } = req.body;
    const validatedEmail = validateEmail(email)
    const validatedPassword = validatePassword(password)
    const validatedPhoneNumber = validatePhoneNumber(phoneNumber) 
    if(validatedEmail){
        if(validatedPassword){
            if(validatedPhoneNumber){
    const pwd = passwordHash(password)
    pool.query(`insert into user (roles, name, deviceId, email, password, phoneNumber)
    values('${roles}','${name}','${deviceId}', '${email}', '${pwd}','${phoneNumber}')`, (err, result) => {
        if (err)
            return res.status(400).send({ error: "This mail already have account, Please enter another" })
        if (result.affectedRows) {
            pool.query(`select * from user where email = '${email}'`, (err, result) => {
                if (err)
                    return res.status(400).send({ error: err })
                else {
                    token = tokenGeneration(result[0].id, result[0].deviceId);
                    console.log(token)
                    sessionTable(result[0].id, token, result[0].deviceId, res)
                    return res.status(200).send({ "Message": "sucessfully registered" })
                }
            })
        }
    })
    }
    else 
    return res.status(400).send({Message : "Please enter appropriate phoneNumber"})
}
    else
    return res.status(400).send({Message : "Please enter appropriate password"})
}
    else
    return res.status(400).send({"Message" : "Please enter appropriate email"})
}

const login = (req, res) => {
    const { email, password } = req.body;
    if (email && password) {
        pool.query(`select * from user where email= '${email}'`, (err, result) => {
            if (result[0].length !== 0) {
                let comparePassword = compare(password,result[0].password)
                if (comparePassword) {
                    token = tokenGeneration(result[0].id, result[0].deviceId);
                    sessionTable(result[0].id, token, result[0].deviceId, res)
                } else {
                    return res.status(400).send({ error: "Incorrect Password" })
                }
            }
            else
                return res.status(400).send({ error: "This email don't have any account, Please register before you login" })
        })
    }
}

const sessionTable = (userId, token, deviceId, res) => {
    pool.query(`insert into session (userId,token,deviceId)
    values('${userId}', '${token}','${deviceId}')`, (err, result) => {
        if (err) {
            return err
        } else {
            console.log(result)
            return res.status(200).send({ Token: token })
        }
    })

}

const logout = (req, res) => {
    const bearerHeader = req.headers['authorization']
    if (bearerHeader !== undefined) {
        const bearer = bearerHeader.split(" ")
        const token = bearer[1]
        const decodedToken = jwt.decode(token);
        console.log(decodedToken)
        const deviceId = decodedToken.dId
        pool.query(`delete from session where deviceId = '${deviceId}'`, (err, result) => {
            if (err)
                return res.status(400).send({ Error: err })
            else
                return res.status(200).send({ "Result": "sucessfully logged out" })
        })
    }
    else {
        res.status(400).send({ Message: "Invalid Token" })
    }

}

const edit = (req, res) => {
    const salt = bcrypt.genSaltSync(10);
    const { userId, editor, name, email, password } = req.body
    const pwd = bcrypt.hashSync(password, salt)
    if (editor === "superAadmin") {
        pool.query(`update user set name = '${name}', email='${email}', password ='${pwd}' 
        where id = '${userId}'`, (err, result) => {
            console.log(result)
            if (err)
                return res.status(400).send({ Error: err })
            else
                return res.status(200).send({ Message: "Sucessfully edited" })
        })
    }
    else if (editor === "admin") {
        pool.query(`update user set name = '${name}', email = '${email}', password='${pwd}' 
        where not roles= "superAadmin" AND id = '${userId}' `, (err, result) => {
            console.log(result)
            if (result.affectedRows === 0)
                return res.status(400).send({ Message: "Admin don't have Permissions to edit superAdmin details" })
            if (err)
                return res.status(400).send({ Error: err })
            else
                return res.status(200).send({ Message: "Sucessfully edited" })
        })

    }

    else if (editor === "user") {
        pool.query(`update user set name = '${name}', email ='${email}',password='${pwd}'
        where not (roles = "superAadmin" or roles = "admin") and id ='${userId}'`,
            (err, result) => {
                console.log(result)
                if (err)
                    return res.status(400).send({ error: err })
                else if (result.affectedRows == 0)
                    return res.status(400).send({ Message: "user don't have permissions to edit superAdmin and admid details" })
                else
                    return res.status(200).send({ Message: "Sucessfully edited" })
            })

    }

}

module.exports = {
    registration,
    login,
    logout,
    edit
}