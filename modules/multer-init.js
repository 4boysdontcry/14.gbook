const moment = require('moment');
const path = require('path');
const fs = require('fs-extra');
const { v4: uuid } = require('uuid');
const { allowExt } = require('../modules/utils');
const multer  = require('multer');       // middleware

// storage engine의 destination callback
const destination =  async (req, file, cb) => {
    try {
        let folder = path.join(__dirname, '../storages', moment().format('YYMMDD'));		// 폴더의 경로를 잡아줌
        await fs.ensureDirSync(folder);     // 폴더가 이미 있다면 그 폴더에 저장
        cb(null, folder);
    }
    catch(err) {
        cb(err);
    }
}

// storage engine의 filename callback
const filename = (req, file, cb) => {
    try{
        let filename = moment().format('YYMMDD') + '-' + uuid() + path.extname(file.originalname);		// 저장할 파일의 이름 구성
        cb(null, filename);
    }
    catch(err){
        cb(err);
    }
}


// storage engine 생성
const storage = multer.diskStorage({ destination, filename })

// file size 제한
const mega = 1024000;
const limits = { fileSize: mega * 50 }       // bytes 단위

// file type 제한
function fileFilter (req, file, cb) {
    try{
        let ext = path.extname(file.originalname).substr(1).toLowerCase()		// 확장자명을 file의 origianl name을 통해 가져오고, substr(1)을 통해 1번 자리의 글자부터 가져온다.(확장자의 '.' 을 빼기 위함) 이후 소문자로 바꿔 내가 util에 지정해놓은 ext들의 값과 일치시킨다.
        if(allowExt.includes(ext)) cb(null, true);      // allowExt에 포함된 확장자인지 확인
        else cb(null, false);
    }
    catch(err) {
        cb(err)		// error가 발생하면 err을 받아 콜백을 실행한다.
    }
}

// multer instance 생성
const upload = multer({ storage, limits, fileFilter });		// 변수 upload에 위의 함수와 변수들을 담는다.



module.exports = { multer, upload };		// 이 모듈을 내보내서 다른 파일에서 불러다 쓰게 해준다.ㄴ