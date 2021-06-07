/* ******************************* img-modal ************************************ */
function onImgModal(el){
  var src = $(el).attr('src');
  $('.modal-wrapper').show(function(){
    $(this).addClass('active');
    $(this).find('img').attr('src', src)
  });
}

function onDelete(id){    // list.ejs의 버튼에서 element(v.id)를 id라는 이름으로 받아와서
  if(confirm('삭제하시겠습니까?')){
    location.href='/gbook/remove/'+id;    // remove페이지로 보낸다.
  }
}