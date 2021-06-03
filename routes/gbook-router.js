// Dynamic Router들은 동적 화면 구성에 필요한 module들을 연결하여 관리하고,
// client의 요청을 받으면(get) 화면을 구성할 정보를 가져오며,
// client가 전송한 데이터를 DB에 저장(post)하는 파일이다. (client와 server 사이에서 연결을 담당한다.)
const express = require('express');
const router = express.Router();
const { pool } = require('../modules/mysql-init');
const { upload } = require('../modules/multer-init');
const { error, alert, transDate, transFrontSrc, makePager } = require('../modules/utils');


const ejs = {
    tabTitle: 'Express 방명록',
    pageTitle: 'Express를 활용한 방명록 서비스',
    pageDesc: 'express, ejs, multer, mysql 등을 사용한 방명록',
}


router.get(['/', '/list', '/list/:page'], async (req, res, next) => {
	try {
		let sql, values;
		sql = 'SELECT COUNT(id) FROM gbook';		// gbook에 저장된 행렬의 id 개수를 세서 가져옴
		const [[r]] = await pool.execute(sql);		// id개수를 r에 받아서 넣음
		let [totalRecord] = Object.values(r);		// 그 r을 다시 구조분해할당으로 totalRecord에 넣음
		let page = req.params.page || 1;
		let pager = makePager(page, totalRecord, 4, 3);
		// makePager에 현재 페이지와 게시글의 총개수, 몇개씩 볼지, 페이지 목록은 몇개 만들지 던져서 페이저 생성
		sql = `SELECT G.*, F.savename FROM gbook G LEFT JOIN gbookfile F ON G.id = F.gid ORDER BY G.id DESC LIMIT ?, ?`;
		values = [String(pager.startIdx), String(pager.listCnt)];
		const [r2] = await pool.execute(sql, values);		// mysql의 gbook에 저장된 데이터를 읽어와서
		r2.forEach(v => v.createdAt = transDate(v.createdAt, 'YMD-KO'));		// 날짜를 넣고
		r2.forEach(v => v.savename = transFrontSrc(v.savename));		// 이미지를 가져와서
		res.render('gbook/gbook', { ...ejs, lists: r2, pager });		// lists에 데이터를 뿌리고 화면을 생성
	}
	catch(err) {
		next(error(err));
	}
});

router.post('/create', upload.single('upfile'), async (req, res, next) => {
	try {
		let sql, values;
		// gbook 저장
		let { writer, content } = req.body;		// body에서 입력한 데이터를 가져옴
		sql = 'INSERT INTO gbook SET writer=?, content=?';		// mysql 입력명령
		values = [writer, content];		// 넣을 데이터 지정
		const [r] = await pool.execute(sql, values);		// 입력 명령과 지정한 데이터를 mysql DB에 저장
    //gbookfile 저장
		if(req.file) {
			let { originalname, filename, size, mimetype } = req.file;		// client가 업로드한 파일을 sql에 저장
			sql = 'INSERT INTO gbookfile SET oriname=?, savename=?, size=?, type=?, gid=?';
			values = [originalname, filename, size, mimetype, r.insertId];
			const [r2] = await pool.execute(sql, values);
		}
		res.send(alert('저장되었습니다.', '/gbook'));
	}
	catch(err) {
		next(error(err));
// utils 에서 받아온 error코드(404, 500 코드)를 담아 err을 error-mw에 넘기고, error-mw에서 error 메세지 구성하고, error.ejs에서 에러화면구성후 출력
	}
});

module.exports = router;