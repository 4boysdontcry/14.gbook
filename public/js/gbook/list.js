/* ******************************* img-modal ************************************ */
function onImgModal(el){
  var src = $(el).attr('src');
  $('.modal-wrapper').show(function(){
    $(this).addClass('active');
    $(this).find('img').attr('src', src)
  });
}
