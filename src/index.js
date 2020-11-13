const express = require('express');
const path = require('path')
const morgan = require('morgan')  // Libs for middlewares
const app = express();

//Settings
app.set('port',process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

// middlewares
app.use(morgan('dev'));
// router


app.listen(app.get('port'),()=>{
    console.log("Server on port 3000")
})
