const createError = require('http-errors');
const moment = require('moment')

// multer - filefilter
const imgExt = ['jpg', 'jpeg', 'png', 'gif'];
const docExt = ['ppt', 'pptx', 'xls', 'xlsx', 'doc', 'docx', 'pages', 'numbers', 'key', 'pdf', 'hwp'];
const allowExt = [...imgExt, ...docExt, 'zip', 'alz'];


// error 경고창
const error = (err) => {
    console.log(err);
    return createError(500, { code: err.code || undefined, message: err.sqlMessage || err });
}


// 게시글 저장 메세지
const alert = (msg, loc='/') => `<script> alert('${msg}'); location.href='${loc}'; </script>`;

// 날짜 만들어주기
const transDate = (date, type) => {
    switch(type){
        case 'YMDHMS':
        return moment(date).format('YYYY-MM-DD HH:mm:ss')
        case 'MDHM':
        return moment(date).format('MM-DD HH:mm')
        case 'MDHMS':
        return moment(date).format('MM-DD HH:mm:ss')
        case 'YMD':
        return moment(date).format('YYYY-MM-DD')
        case 'YMDHM':
        return moment(date).format('YYYY-MM-DD HH:mm')
        case 'YMD-KO':
        return moment(date).format('YYYY년 M월 D일')
        case 'YMDHM-KO':
        return moment(date).format('YYYY년 M월 D일 H시 m분')
        case 'YMDHMS-KO':
        return moment(date).format('YYYY년 M월 D일 H시 m분 s초')
        default:
        return moment(date).format('YYYY-MM-DD HH:mm:ss')
    }
}
const transFrontSrc = name => name ? '/uploads/' + name.substr(0, 6) + '/' + name : null;
const transBackSrc = name => name ? '/storages/' + name.substr(0, 6) + '/' + name : null;


// pager 만들기
const makePager = (_page, _totalRecord, _listCnt=10, _pagerCnt=5) => {
	let page = Number(_page);
	let totalRecord = Number(_totalRecord);
	let listCnt = Number(_listCnt);
	let pagerCnt = Number(_pagerCnt);
	let totalPage = Math.ceil(totalRecord / listCnt);
	let startIdx = (page - 1) * listCnt;
	let startPage = Math.floor((page - 1) / pagerCnt) * pagerCnt + 1;
	let endPage = (startPage + pagerCnt - 1 > totalPage) ? totalPage : startPage + pagerCnt - 1;
	let nextPage = (page + 1 > totalPage) ? totalPage : page + 1;
	let prevPage = (page - 1 < 1) ? 1 : page - 1;
	let nextPager = (endPage + 1 > totalPage) ? totalPage : endPage + 1;
	let prevPager = (startPage - 1 < 1) ? 1 : startPage - 1;
	return { 
		page, 
		totalRecord, 
		listCnt, 
		pagerCnt, 
		totalPage,
		startIdx,
		startPage,
		endPage,
		nextPage,
		prevPage,
		nextPager,
		prevPager 
	}
}



module.exports = { alert, error, createError, imgExt, docExt, allowExt, transFrontSrc, transBackSrc, transDate, makePager };