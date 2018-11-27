$(".submit").click(function(){
	let user = document.getElementById("username");
	user = $(user).val();
	let password = document.getElementById("password");
	password = $(password).val();
	console.log(user.length);
	console.log(password.length);
	document.cookie = 'mod=none';

	if(user.length == 0 || password.length == 0){
		swal("不合法", "账号和密码不能为空", "error");
		return;
	}

	if(user.indexOf(" ") == -1 && password.indexOf(" ") == -1){
		$.ajax({
		    url: '/login',
		    type: 'POST',
		    cache: false,
		    data: {'username':user, 
		    	   'password':password
		    	},
		    processData: false,
		    contentType: false,
		    success:function(res){
            	if(data.trim()=="SEARCH"){
            		document.cookie = 'mod=search';
            		document.cookie = 'log='.concat(sha256(password));
            		window.location.href = "index.html";
            	}else if(data.trim()=="ALL"){
            		document.cookie = 'mod=all';
            		document.cookie = 'log='.concat(sha256(password));
            		window.location.href = "index.html";
            	}else{
			    	$("#errormessage").removeClass("hidden");
				}
        	}
		}).done(function(res) {
		}).fail(function(res) {
		});
	}else{
		swal("不合法", "账号或者密码中存在不合法字符", "error");
	}
});

$(".func").click(function(){
	swal("登陆", "请先进行登陆");
});