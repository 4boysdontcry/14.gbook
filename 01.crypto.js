/* 
암호화(encrypt): 평문 -> 암호
복호화(decrypt): 암호 -> 평문

1. crypto(단방향): 한번 암호화 하면 복호화 할 수 없는 기술 => 비밀번호 암호화 - node의 자체 암호화 모듈
2. cipher: 복호화가 가능한 기술 => 보안통신
*/

const crypto = require('crypto');
const bcrypt = require('bcrypt');

let salt = 'GJHytju8sABEa9!@#!723dawqge7094LFKN@!#!@';

let pass =  '1111';
let sha512 = crypto.createHash('sha512').update(pass+salt).digest('base64');
console.log(sha512);

let pass2 = '1112';
let sha5122 = crypto.createHash('sha512').update(pass2+salt).digest('base64');
if(sha512 === sha5122) console.log('로그인 되었습니다.');
else console.log('비밀번호를 확인하세요');




let hash = null;
const genPass = async (pass) => {       // 사용자의 비밀번호를 암호화
    hash = await bcrypt.hash(pass, 4);     // 인자의 첫번째 자리: 비밀번호, 두번째: 암호화 횟수(10회 이하로)
    console.log(hash);
}

const comparePass = async (pass) => {       // 암호화 된 비밀번호와 사용자가 입력한 비밀번호를 비교해서 매칭
    let compare = await bcrypt.compare(pass, hash);
    console.log(compare);
}
genPass('1234');
setTimeout(function(){comparePass('1235')}, 1000);