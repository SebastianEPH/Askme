const express = require('express');
const path = require('path')
const morgan = require('morgan')  // Libs for middlewares
const app = express();
const mysql = require('mysql')
const myConnection = require('express-myconnection')

// importing routers
const customerRouters= require('./routers/customer')

//Settings
app.set('port',process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

// middlewares
app.use(morgan('dev'));  // Muestra informacion de peticiones entrantes en consola. solo devs
app.use(myConnection(mysql, {
    host: 'b6hziqljw9smv3obfjhs-mysql.services.clever-cloud.com',
    user: 'ulyugioq1g443gfp',
    password: '5duWivMKnEn48Nr9axMq',
    port: '3306',
    database: 'b6hziqljw9smv3obfjhs'
}, 'single'))

// routers
app.use('/', customerRouters)

//Static files
app.use(express.static(path.join(__dirname, 'public')))


// Start the server
app.listen(app.get('port'),()=>{
    console.log("Server on port 3000")
})
