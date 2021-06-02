const createError = require('http-errors');

const error404 = ((req, res, next) => {
	// 경로를 못찾으면 도착
	next(createError(404, '요청하신 페이지를 찾을 수 없습니다.'));		// http-errors의 createError method를 이용하여 404에러시 나올 메세지 구성
});

const error500 = (err, req, res, next) => {
	// 모든 에러의 종착점
	// console.log('===========ERROR==========');
	// res.json({ code: err.status, message: err.message });
	const ejs = {
    status: err.status === 404 ? 404 : 500, 		// 404가 아닌 모든 에러를 500에러로 판단하여 메세지를 출력하게 한다.
    message: err.code || err.message, 
    tabTitle: `ERROR ${err.status === 404 ? 404 : 500}`,
    description: err.description || err.message
	}
	res.render('error/error', ejs);		// 변수 ejs를 담아서 views폴더의 error.ejs에 보내주면, error.ejs가 변수 ejs의 내용을 받아 동적 화면 구성
};


module.exports = { createError, error404, error500 };