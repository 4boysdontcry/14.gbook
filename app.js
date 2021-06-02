// app.js는 어떤 페이지를 구성하는 모든 구성들을 한 파일에 담아 관리함
/**************** Global ******************/
const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();
require('./modules/server-init')(app, 3000);


/**************** Middlewares ******************/
const { createError, error404, error500 } = require('./middlewares/error-mw');


/**************** Views ******************/
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));
app.locals.pretty = true;


/**************** req.body ******************/
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


/**************** Router: static ******************/
app.use('/', express.static(path.join(__dirname, './public')));
app.use('/uploads', express.static(path.join(__dirname, './storages')));


/**************** Router: dynamic ******************/   // 동적화면을 만들어주는 라우터들을 연결하여 관리
const gbookRouter = require('./routes/gbook-router');

app.use('/gbook', gbookRouter);


/**************** Router: error ******************/
app.use(error404);
app.use(error500);