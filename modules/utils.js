const createError = require('http-errors');

// error 경고창
const error = (err) => {
    console.log(err);
    return createError(500, { code: err.code || undefined, message: err.sqlMessage || err });
}

// multer - filefilter
const imgExt = ['jpg', 'jpeg', 'png', 'gif'];
const docExt = ['ppt', 'pptx', 'xls', 'xlsx', 'doc', 'docx', 'pages', 'numbers', 'key', 'pdf', 'hwp'];
const allowExt = [...imgExt, ...docExt, 'zip', 'alz'];


module.exports = { error, createError, imgExt, docExt, allowExt };