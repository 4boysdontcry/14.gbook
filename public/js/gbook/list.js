/* ******************************* img-modal ************************************ */
function onImgModal(el){
  var src = $(el).attr('src');
  $('.modal-wrapper').show(function(){
    $(this).addClass('active');
    $(this).find('img').attr('src', src)
  });
}

function onDelete(id){
  if(confirm('삭제하시겠습니까?')){
    location.href='/gbook/remove/'+id;
  }
}