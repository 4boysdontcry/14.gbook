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

function onUpdate(id) {    // ajax 통신 - 저장된 데이터를 수정해야 하므로 DB와의 통신이 필요함
	$.get('/gbook/view/'+id).then(onGet).catch(onErr);
	function onGet(r) {
		var id = r.data.id;
		var writer = r.data.writer;
		var content = r.data.content;
		var savename = r.data.savename;
		$('.form-wrapper').addClass('active');
		$('.form-wrapper').find('input[name="id"]').val(id);
		$('.form-wrapper').find('input[name="writer"]').val(writer);
		$('.form-wrapper').find('input[name="content"]').val(content);
		$('.form-wrapper').find('.img-wrap img').attr('src', savename);
	}
	function onErr(err) {
		console.log(err);
	}
}

