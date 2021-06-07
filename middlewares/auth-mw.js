const {alert} = require('../modules/utils');


const isGuest = (req, res, next) => {
    if(!req.session.user) next();
    else res.send(alert('현재 로그인 상태입니다.', '/'))
}

const isDorment = (req, res, next) => {
    // if(req.session.user)
}

const isUser = (req, res, next) => {
    // if(req.session.user)
}

const isVip = (req, res, next) => {
    // if(req.session.user)
}

const isAdmin = (req, res, next) => {
    // if(req.session.user)
}


module.exports = {isGuest, isDorment, isUser, isVip, isAdmin};