// Dynamic Router들은 동적 화면 구성에 필요한 module들을 연결하여 관리하고,
// client의 요청을 받으면 화면을 구성할 정보를 가져오며,
// client가 전송한 데이터를 DB에 저장하는 파일이다. (client와 server 사이에서 연결을 담당한다.)
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
		sql = 'SELECT COUNT(id) FROM gbook';
		const [[r]] = await pool.execute(sql);
		let [totalRecord] = Object.values(r);
		let page = req.params.page || 1;
		let pager = makePager(page, totalRecord, 4, 3);
		sql = `SELECT G.*, F.savename FROM gbook G LEFT JOIN gbookfile F ON G.id = F.gid ORDER BY G.id DESC LIMIT ?, ?`;
		values = [String(pager.startIdx), String(pager.listCnt)];
		const [r2] = await pool.execute(sql, values);
		r2.forEach(v => v.createdAt = transDate(v.createdAt, 'YMD-KO'));
		r2.forEach(v => v.savename = transFrontSrc(v.savename));
		res.render('gbook/gbook', { ...ejs, lists: r2, pager });
	}
	catch(err) {
		next(error(err));
	}
});

router.post('/create', upload.single('upfile'), async (req, res, next) => {
	try {
		let sql, values; 

		// gbook 저장
		let { writer, content } = req.body;
		sql = 'INSERT INTO gbook SET writer=?, content=?';
		values = [writer, content];
		const [r] = await pool.execute(sql, values);

    //gbookfile 저장
		if(req.file) {
			let { originalname, filename, size, mimetype } = req.file;
			sql = 'INSERT INTO gbookfile SET oriname=?, savename=?, size=?, type=?, gid=?';
			values = [originalname, filename, size, mimetype, r.insertId];
			const [r2] = await pool.execute(sql, values);
		}
		res.send(alert('저장되었습니다.', '/gbook'));
		// res.redirect('/gbook?toast=C');
	}
	catch(err) {
		next(error(err));
// utils 에서 받아온 error코드(404, 500 코드)를 담아 err을 error-mw에 넘기고, error-mw에서 error 메세지 구성하고, error.ejs에서 에러화면구성후 출력
	}
});

module.exports = router;