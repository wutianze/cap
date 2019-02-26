console.log("hhh");
// var token = $("meta[name='_csrf']").attr("content");
// var header = $("meta[name='_csrf_header']").attr("content");
// $(document).ajaxSend(function(e, xhr, options) {
//     xhr.setRequestHeader(header, token);
// });

init_picture();
initRecord();

function init_picture() {
	console.log("init_picture");
	let key = "";

	let author = "";

	let place = "";

	let starttime = "";

	let endtime = "";

	$.ajax({
	    url: '/search',
	    type: 'POST',
	    data: {'content':key,
				'provider':author,
				'place':place,
				'starttime':starttime,
				'endtime':endtime
			},
	    success:function(res){
            show_picture(res);
        }
	}).done(function(res) {
	}).fail(function(res) {
	});
}

$("#search").click(function(){
	console.log("search");
	let key = document.getElementById("key");
	key = $(key).val();
	console.log(key);
	setRecord("key", key);

	let author = document.getElementById("author");
	author = $(author).val();
	console.log(author);
	setRecord("author", author);

	let place = document.getElementById("place");
	place = $(place).val();
	console.log(place);
	setRecord("place", place);

	let starttime = document.getElementById("startdate");
	starttime = $(starttime).val();
	console.log(starttime);

	let endtime = document.getElementById("enddate");
	endtime = $(endtime).val();
	console.log(endtime);

	// if(key.length == 0 && author.length == 0 && place.length == 0 && 
	// 	starttime.length == 0 && endtime.length == 0){
	// 	swal("错误", "至少有一项不为空", "error");
	// 	return;
	// }
	if(endtime < starttime){
		swal("错误", "开始日期不能大于结束日期", "error");
		// console.log("错误");
		return;
	}

	$.ajax({
	    url: '/search',
	    type: 'POST',
	    data: {'content':key,
				'provider':author,
				'place':place,
				'starttime':starttime,
				'endtime':endtime
			},
	    success:function(res){
            show_picture(res);
        }
	}).done(function(res) {
	}).fail(function(res) {
	});
});

$('.prebutton').click(function(){
	content = $(this).text();
	// console.log($(this).text());
	insert = $(this).prevAll(".input");
	insert = insert[0];
	// console.log(insert);
	insert = $(insert).children();
	insert = insert[0];
	// console.log(insert);
	$(insert).val(content);
});

// 测试数据
// '[{\"id\":\"0\", \"imgPath\":\"images/9.png\", \"imgLabel\":\"a\tb\tc\", \"imgDes\":\"describe1\"}, {\"id\":\"1\", \"imgPath\":\"../images/8.png\", \"imgLabel\":\"d\tb\te\", \"imgDes\":\"describe2\"}, {\"id\":\"2\", \"imgPath\":\"../images/7.png\", \"imgLabel\":\"r\tj\th\", \"imgDes\":\"describe3\"}, {\"id\":\"3\", \"imgPath\":\"../images/6.png\", \"imgLabel\":\"z\tx\to\", \"imgDes\":\"describe4\"}, {\"id\":\"4\", \"imgPath\":\"../images/5.png\", \"imgLabel\":\"q\tw\tp\", \"imgDes\":\"describe5\"} ]'

function show_picture(res) {
	let picture_contain = $("#container");
	picture_contain.empty();
	res = eval('(' + res + ')');
	$.each(res, function(i, item) {
		let div = $("<div></div>");
		div.addClass("image label p");

		let image = $("<img>");
		image.attr("src", item.imgPath);
		image.addClass("show");
		image.attr("id", item.id);

		let label = $("<div></div>");
		label.addClass("labels");
		let tags = item.label.split("\\t");
		for(let i = 0; i < tags.length; i++){
			let tag = $("<a></a>").text(tags[i]);
			tag.addClass("ui label");
			label.append(tag);
		}

		let des = $("<p></p>").text(item.imgDes);

		div.append(image);
		div.append(label);
		div.append(des);

		picture_contain.append(div);
    });
}

$("#starttime").calendar({
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

$("#endtime").calendar({
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

$(".show").click(function(){
	content = $(this).id;
	let show = $('.picture_show');
    show.removeAttr('hidden');
	$.ajax({
	    url: '/image_detail',
	    type: 'POST',
	    cache: false,
	    data: {'id':content
			},
	    processData: false,
	    contentType: false,
	    success:function(res){
            picture_detail(res);
            let show = $('.picture_show');
            show.removeAttr('hidden');
        }
	}).done(function(res) {
	}).fail(function(res) {
	});
});

// "{\"id\":\"1\", \"provider\":\"哈哈哈\", \"label\":\"a\tb\", \"dateTime\":\"2018-05-12\", \"place\":\"雁栖湖\", \"description\":\"秋天拍的\", \"published\":\"0\", \"copyright\":\"0\", \"imgPath\":\"../images/1.png\"}"

function picture_detail(res){
	res = res.replace("\\t","$");
	console.log(res);
	JSON.parse(res, function(k, v) {
		console.log(k, v);
		if(k == 'id'){
			let detail_id = $(".detail_id");
			detail_id.text(v);
		}
		if(k == 'provider'){
			let detail_author = $('.detail_author');
			detail_author.text(v);
		}
		if(k == 'label'){
			let detail_label = $('.detail_label');
			detail_label.empty();
			let tags = v.split("$");
			for(let i = 0; i < tags.length; i++){
				console.log(tags[i]);
				let tag = $("<a></a>").text(tags[i]);
				tag.addClass("ui label");
				detail_label.append(tag);
			}
		}
		if(k == 'dateTime'){
			let detail_date = $('.detail_date');
			detail_date.text(v);
		}
		if(k == 'place'){
			let detail_place = $('.detail_place');
			detail_place.text(v);
		}
		if(k == 'description'){
			let detail_description = $('.detail_description');
			detail_description.text(v);
		}
		if(k == 'published'){
			let detail_published = $('.detail_published');
			if(v == '0'){
				detail_published.text('已发布');
			}else{
				detail_published.text('未发布');
			}
		}
		if(k == 'copyright'){
			let detail_copyright = $('.detail_copyright');
			if(v == '0'){
				detail_copyright.text('有版权');
			}else{
				detail_copyright.text('无版权');
			}
		}
		if(k == 'imgPath'){
			let show_detail = $('.show_detail');
			show_detail.attr("src", v);
		}
	});  
}

$('.delbutton').click(function(){
	let detail_id = $(".detail_id");
	detail_id = detail_id.text();
	swal({ 
	  title: "确定删除吗？", 
	  text: "你将无法恢复该文件，你的行为将被记录！", 
	  type: "warning",
	  showCancelButton: true, 
	  confirmButtonColor: "#DD6B55",
	  confirmButtonText: "确定删除！", 
	  closeOnConfirm: false
	}.then(
		function(){
			$.ajax({
			    url: '/delete_image',
			    type: 'POST',
			    cache: false,
			    data: {'id':detail_id
					},
			    processData: false,
			    contentType: false,
			    success:function(res){
		            swal("删除！", "文件已经被删除。", "success"); 
		        }
			}).done(function(res) {
			}).fail(function(res) {
			});
		})
	);
});

$('.detail_close').click(function(){
	let show = $('.picture_show');
	show.attr("hidden", "true");
});


/****************************************************
cookies 的操作部分
用来替换常用搜索内容
*****************************************************/

function getCookie(c_name){
	if (document.cookie.length>0){
		c_start=document.cookie.indexOf(c_name + "=");
		if (c_start!=-1){ 
			c_start=c_start + c_name.length+1;
			c_end=document.cookie.indexOf(";",c_start);
			if (c_end==-1) c_end=document.cookie.length;　　
			return unescape(document.cookie.substring(c_start,c_end));
		} 
	}
	return ""
}　

function setRecord(key, content){
	let old_content = getCookie(key);
	// old_content = "hhh";
	key_list = old_content.split("$");
	if(key_list.length == 3){
		for(let i = 0; i < 2; i++){
			key_list[i] = key_list[i+1];
		}
		key_list[2] = content;
		document.cookie = key + "=" + key_list.join("$");
		// console.log(key + "=" + key_list.join("$"));
	}else{
		if (old_content == "") key_list = new Array();
		key_list.push(content);
		document.cookie = key + "=" + key_list.join("$");
		// console.log(key_list.length);
		// console.log(key + "=" + key_list.join("$"));
	}
}

function initRecord(){
	let keys = getCookie("key");
	if(keys != ""){
		let key_list = keys.split("$");
		let key_text = $("#key").parent().siblings(".prebutton");
		for(let i = 0; i < key_list.length; i++){
			$(key_text[i]) = key_list[i];
		}
	}
	let authors = getCookie("author");
	if(authors != ""){
		let author_list = authors.split("$");
		let author_text = $("#author").parent().siblings(".prebutton");
		for(let i = 0; i < key_list.length; i++){
			$(author_text[i]) = author_list[i];
		}
	}
	let places = getCookie("place");
	if(places != ""){
		let place_list = places.split("$");
		let place_text = $("#place").parent().siblings(".prebutton");
		for(let i = 0; i < key_list.length; i++){
			$(place_text[i]) = place_list[i];
		}
	}
}　

// window.onload = function(){
// 	let cookies = document.cookie.split(';');
// 	let mod = 0;

// 	for (var i = 0; i < cookies.length; i++) {
//   		key = cookies[i].split('=')[0];
//   		value = cookies[i].split('=')[0];
//   		if(key == 'mod' && value != 'all'){
//   			$("#upload").remove();
//   		}
//   		if(key == 'mod'){
//   			mod = 1;
//   		}
// 	}
// 	if(mod == 0){
// 		$("#upload").remove();
// 	}
// };