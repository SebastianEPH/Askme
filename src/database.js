const mysql = require('mysql')          // Lib Mysql
const {promisify} =  require('util')
const {database} = require('./keys')    // Parentesis para solo obtener una parte de la propiedad  del objeto

const pool = mysql.createPool(database) // Trabaja con hilos
pool.getConnection((err, conn)=>{
    if (err){
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.log('DATABASE CONNECTION WAS CLOSED');
        }else if(err.code === 'ER_CON_COUNT_ERROR'){
            console.log('DATABASE HAS TO MANY CONNECTIONS')
        }else if(err.code === 'ECONNREFUSED'){
            console.log('DATABASE CONNECTION WAS REFUSED');
        }else{
            console.log('ERROR IN CONNECTING TO THE DATABASE')
        }
    }
    if(conn) {
        conn.release()
        console.log('DB IS CONNECTED');
    }

});
pool.query = promisify(pool.query)   // para poder usar Asing / Away // promesas || not callbacks
module.exports = pool;