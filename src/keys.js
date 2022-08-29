const env = require("dotenv")
env.config()
module.exports ={
    database: {
        host: process.env.DB_MYSQL_HOST,
        user: process.env.DB_MYSQL_USERNAME,
        password: process.env.DB_MYSQL_PASSWORD,
        port: process.env.DB_MYSQL_PORT,
        database: process.env.DB_MYSQL_DATABASE
    }
}
