const {alert} = require('../modules/utils');
const {pool} = require('../modules/mysql-init')


const isGuest = (req, res, next) => {
    if(!req.session.user) next();
    else res.send(alert('현재 로그인 상태입니다.', '/'))
}

const isDorment = (req, res, next) => {
    if(req.session.user && req.session.user.grade === 1) next();
    else res.send(alert('휴면회원 전용 페이지 입니다.', '/'))
}

const isUser = (req, res, next) => {
    if(req.session.user) next();
    else res.send(alert('로그인 후 이용 가능합니다.', '/'))
}

const isVip = (req, res, next) => {
    if(req.session.user && req.session.user.grade === 3) next();
    else res.send(alert('VIP회원 전용 페이지 입니다.', '/'))
}

const isAdmin = (req, res, next) => {
    if(req.session.user && req.session.user.grade === 9) next();
    else res.send(alert('관리자 전용 페이지 입니다.', '/'))
}


module.exports = {isGuest, isDorment, isUser, isVip, isAdmin};