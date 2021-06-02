/*  *********************** global *********************** */
const express = require('express');
const app = express();
const path = ('path')
require('dotenv').config();
require('./modules/server-init')(app, 3000);


/*  ***********************  middlewares *********************** */
const { createError, error404, error500 } = require('./modules/error-mw');


/*  *********************** views *********************** */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));
app.locals.pretty = true;


/*  *********************** req.body *********************** */
app.use(express.json());
app.use(express.urlencoded({extended: false}))


/*  *********************** Router : Static *********************** */
app.use('/', express.static(path.join(__dirname, './public')));
app.use('/uploads', express.static(path.join(__dirname, './storages')));


/*  *********************** Router : Dynamic *********************** */



/*  *********************** Router : Error *********************** */
app.use(error404);
app.use(error500);
