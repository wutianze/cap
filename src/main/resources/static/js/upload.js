var token = $("meta[name='_csrf']").attr("content");
var header = $("meta[name='_csrf_header']").attr("content");
$(document).ajaxSend(function(e, xhr, options) {
    xhr.setRequestHeader(header, token);
});
window.onload = function(){
	console.log("hello");
	console.log($(".deletetag"));
}

addDeleteTag = function() {
  $(".deletetag").click(function(){
   console.log($(this).parent());
   $(this).parent().remove();
  });
}

showfile = function() {
	let img_file = document.getElementById("embedpollfileinput");
	let fileObj = img_file.files[0];
	let filemessage = document.getElementById("filemessage");
	$(filemessage).removeClass("hidden");
	$(filemessage).text(fileObj.name);
}

clear = function() {
	let img_author = document.getElementById("imageauthor");
	$(img_author).val('');

	let shoot_place = document.getElementById("shootplace");
	$(shoot_place).val('');

	let shoot_time = document.getElementById("shootdate");
	$(shoot_time).val('');

	let img_label_obj = document.getElementsByClassName("tagshow");
	$(img_label_obj).remove();

	let img_describe = document.getElementById("imagedescribe");
	$(img_describe).val('');

	let publish = document.getElementById("publish");
	publish.checked = 0;

	let copyright = document.getElementById("copyright");
	copyright.checked = 0;

	let filemessage = document.getElementById("filemessage");
	$(filemessage).attr("hidden", "true");
}

// function showfile(this){
// 	let img_file = document.getElementById("embedpollfileinput");
// 	let fileObj = img_file.files[0];
// 	let filemessage = document.getElementById("filemessage");
// 	$(filemessage).removeClass("hidden");
// 	$(filemessage).text(fileObj.name);
// }

$(".addlabel").click(function(){
	const addlabel = $(this).parent().find(".labelinput");
	content = addlabel.val();
	console.log(content.length);
	let labelshow = $(this).parent().prev()
	console.log(labelshow);
	let tagshow = $("<div></div>").text(content);
	tagshow.addClass("ui tag label tagshow");
	let i = $("<i></i>");
	i.addClass("delete icon deletetag");
	tagshow.append(i);
	labelshow.append(tagshow);
	addDeleteTag();
	addlabel.val("");
});

$(".submit").click(function(){
    let formdata = new FormData();
	// let img_name = document.getElementById("imagename");
	// img_name = $(img_name).val();
	// console.log(img_name);

	let img_author = document.getElementById("imageauthor");
	img_author = $(img_author).val();
	console.log(img_author);

	let shoot_place = document.getElementById("shootplace");
	shoot_place = $(shoot_place).val();
	console.log(shoot_place);

	let shoot_time = document.getElementById("shootdate");
	shoot_time = $(shoot_time).val();
	console.log(shoot_time);

	let img_label_obj = document.getElementsByClassName("tagshow");
	let img_labels = "";
	// console.log(img_label_obj.length);
	for(let i = 0; i < img_label_obj.length; i ++){
		let label = img_label_obj[i];
		// console.log($(label).text());
		img_labels = img_labels + $(label).text().trim() + "\\t";
	}
	console.log(img_labels);

	let img_describe = document.getElementById("imagedescribe");
	img_describe = $(img_describe).val();
	console.log(img_describe);

	let publish = document.getElementById("publish");
	if(publish.checked){
		publish = 1;
	}else{
		publish = 0;
	}
	console.log(publish);

	let copyright = document.getElementById("copyright");
	if(copyright.checked){
		copyright = 1;
	}else{
		copyright = 0;
	}
	console.log(copyright);

	let img_file = document.getElementById("embedpollfileinput");
	let fileObj = img_file.files[0];
	console.log(fileObj);
	
	// formdata.append("imgName", img_name);
	formdata.append("provider", img_author);
	formdata.append("place", shoot_place);
	formdata.append("dateTime", shoot_time);
	formdata.append("label", img_labels);
	formdata.append("description", img_describe);
	formdata.append("published", publish);
	formdata.append("copyright", copyright);
	formdata.append("imgFile", fileObj);
	if(img_author.length == 0 || img_labels.length == 0 || fileObj == undefined){
		swal("失败", "红*字段和图片不能为空", "error");
		return;
	}

	let show = $('#uploadprocessshow');
    show.removeAttr('hidden');

	$.ajax({
	    url: '/uploadImg',
	    type: 'POST',
	    cache:false,
	    data: formdata,
	    contentType:false,
	    processData:false,
	    xhr: function(){
	        myXhr = $.ajaxSettings.xhr();
	        if(myXhr.upload){
	          myXhr.upload.addEventListener('progress',function(e) {
	            if (e.lengthComputable) {
	              var percent = Math.floor(e.loaded/e.total*100);
	              if(percent <= 100) {
	                $("#uploadprocess").progress('set progress', percent);
	              }
	            }
	          }, false);
	        }
	        return myXhr;
	    },
	}).done(function(res) {
		clear();
		swal("完成", "上传成功","success");
	}).fail(function(res) {
		swal("失败", "上传失败，请重试", "error");
	});

	show.attr("hidden", "true");
});

$("#shoottime").calendar({
	type: 'date',
	formatter: { // 自定义日期的格式
        date: function(date, settings) {
            if (!date) return '';

            var year  = date.getFullYear();
            var month = date.getMonth() + 1;
            var day   = date.getDate();

            month = month < 10 ? '0'+month : month;
            day   = day   < 10 ? '0'+day   : day;

            return year + '-' + month + '-' + day;
        }
    }
});

// window.onload = function(){
// 	let cookies = document.cookie.split(';');
// 	let mod = 0;

// 	for (var i = 0; i < cookies.length; i++) {
//   		key = cookies[i].split('=')[0];
//   		value = cookies[i].split('=')[0];
//   		if(key == 'mod' && value != 'all'){
//   			swal({ 
// 			  title: "登陆", 
// 			  text: "请先进行登陆", 
// 			  showCancelButton: true, 
// 			  confirmButtonColor: "#DD6B55",
// 			  confirmButtonText: "确定", 
// 			  closeOnConfirm: false
// 			},
// 			function(){
// 			  window.location.href = "./login.html";
// 			});
//   		}
//   		if(key == 'mod')
//   			mod = 1;
// 	}
// 	if(mod == 0){
// 		swal({ 
// 		  title: "登陆", 
// 		  text: "请先进行登陆", 
// 		  showCancelButton: true, 
// 		  confirmButtonColor: "#DD6B55",
// 		  confirmButtonText: "确定", 
// 		  closeOnConfirm: false
// 		}).then(
// 			function(){
// 			  	window.location.href = "./login.html";
// 			}
// 		);
// 	}
// };

addDeleteTag();
