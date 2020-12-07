const express = require('express');             // framework
const morgan = require('morgan');               // Informacion para developer
const exphbs = require('express-handlebars');    // Motor de plantillas
const path = require('path');                   // Junta paths
const flash = require('connect-flash')
const session = require('express-session')  
//Initializations
const app = express();   // is the app web

// Settings
app.set('port', process.env.PORT|| 3000 );
app.set('views', path.join(__dirname,'views')); //Obtiene la direción del archivo a ejecutar
app.engine('.hbs', exphbs({
    defaultLayout:'main',   // Archivo principal de las plantillas
    layoutsDir: path.join(app.get('views'), 'layouts'),         //junta paths
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs', // Extensión del archivo
    helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs')

//Middlewares , se ejecuta cada vez que un usuario haga una petición
app.use(morgan('dev')); // Muestra por consola las peticiones tipo http
app.use(express.urlencoded({
    extended:false  // Los datos que se enviarán son muy sencillas
}));
app.use(express.json()); // Acepta json
app.use(flash());   //Envía mensajes

// Global Valiables
app.use((req, res, next)=>{
    app.locals.success =  req.flash('success') // <==Almacenamos mensaje
    next();
});

// Routers
app.use(require('./routes/index'));  // No es necesario escribir la extension o el nombre si es index
app.use(require('./routes/authentication'));
app.use('/question', require('./routes/data_question'));


// Public <= Código y archivos que el navegador puede acceder
app.use(express.static(path.join(__dirname, 'public')))

//starting the server

app.listen(app.get('port'),()=>{
    console.log('Server on port ', app.get('port'));
});