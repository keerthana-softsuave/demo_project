const {createPool} = require("mysql2")

const pool = createPool( {
    port : 3306,
    host : "localhost",
    user : 'root',
    password : 'root',
    database : 'usertest'

}
)


module.exports= pool;