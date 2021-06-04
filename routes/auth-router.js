const express = require('express');
const router = express.Router();
const { pool } = require('../modules/mysql-init');
const { upload } = require('../modules/multer-init');
const { error, alert, transDate, transFrontSrc, makePager } = require('../modules/utils');


const ejs = {
  tabTitle: 'Express 방명록',
  pageTitle: 'Express를 활용한 회원인증 서비스',
  pageDesc: '',
  pageMode: ''
}

router.get('/idchk/:userid', async (req, res, next) => {
  try {
    let sql;
    let userid = req.params.userid;   // 주소줄로 들어온 userid를 받는거
    sql = 'SELECT userid FROM users WHERE userid=?';    // select는 배열로 리턴해줌 구조분해 두번하는 이유
    const [r] = await pool.execute(sql, [userid]);
    if(r.length === 0) res.status(200).json({ validation: true })   // json으로 인증에 대한 결과를 답변해줌
    else res.status(200).json({ validation: false })
  }
  catch(err){
    res.status(500).json({ error: err });
  }
})

router.get('/signin', (req, res, next) => {
  res.render('auth/join', {...ejs, pageMode: 'LOGIN', pageDesc: '아직 회원이 아니시라면 아래 버튼을 클릭하여 가입 해주세요.'});
});

router.post('/signin', (req, res, next) => {
  res.send('로그인 처리');
});


router.get('/signout', (req, res, next) => {
  res.send('로그아웃 처리');
});


router.get('/join', (req, res, next) => {
  res.render('auth/join', {...ejs, pageDesc: '기존 회원이시면 아래 버튼을 클릭하여 로그인 해주세요.'});
});

router.post('/join', (req, res, next) => {
  res.send('회원가입 처리');
});


module.exports = router;