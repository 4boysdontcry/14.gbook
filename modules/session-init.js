// session은 데이터베이스가 가지는 인증키. (클라이언트의 인증키와 비교하여 일치하면 접근 허용하는 방식)

const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
// 세션을 메모리에 저장하지 않고 mysql DB에 저장하기 위해 사용함 (mysql에 알아서 session 테이블을 만들어서 쿠키를 저장)

const storeOptions = {    // 이 내용을 가지고 DB 사용자 권한에 접근(접속)하여 저장
	host: process.env.DB_HOST,    // 민감한 정보이기 때문에 dotenv에 넣어서 저장
	port: process.env.DB_PORT,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME
};


const options = {
  secret: process.env.SESSION_SALT,   // SESSION_SALT : client에게 나눠줄 인증키를 암호화시켜서 준다
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },   // http로 통신하는 경우
  store: new MySQLStore(storeOptions)
}


module.exports = () => { return session(options); };    // app.js에 함수를 리턴한다. options을 넣어서