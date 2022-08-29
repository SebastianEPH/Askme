const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash')
const session = require('express-session')
const MysqlStore = require('express-mysql-session')
const {database} = require('./keys')
const passport = require('passport')
//Initializations
const app = express();
require('./lib/passport')

// Settings
app.set('port', process.env.SERVER_PORT);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs', // Extensión del archivo
    helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs')

app.use(session({
    secret: 'texto_session',    // Cómo guardara las sesiones
    resave: false, // false: para que no se vuelva a renovar la sesión
    saveUninitialized: false, // false: para que no se vuelva a establecer la sesión
    store: new MysqlStore(database) //  No guardar los datos dentro del servidor, si no dentro de la base de datos
}))
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());



app.use((req, res, next) => {
    app.locals.success = req.flash('success') // <== Texto de ventana emergente | Exito |
    app.locals.warning = req.flash('warning')   // <== Texto de ventana emergente | Advertencia |
    app.locals.user = req.user;
    app.locals.exam = req.exam;
    next();
});

// Routers
app.use(require('./routes/index'));
app.use(require('./routes/routes_auth'));
app.use('/question', require('./routes/data_question'));
app.use('/exam', require('./routes/data_exam'));
app.use('/graphics', require('./routes/graphics'));


// Public <= Código y archivos que el navegador puede acceder
app.use(express.static(path.join(__dirname, 'public')))


//starting the server
app.listen(process.env.SERVER_PORT, () => {
    console.log('RUN SERVER ON PORT ', process.env.SERVER_PORT);
});