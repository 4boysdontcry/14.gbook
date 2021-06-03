const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

const storeOptions = {
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME
};


const options = {
  secret: process.env.SESSION_SALT,   // client에게 나눠줄 인증키를 암호화시켜서 준다
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },   // http로 통신하는 경우 false, https로 통신하면 true(유료)
  store: new MySQLStore(storeOptions)
}


module.exports = () => session(options);    // middleware