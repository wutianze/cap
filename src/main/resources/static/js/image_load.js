// <!--//网页内容加载事件：网页中的所有内容全部加载完成会执行-->
//window.onload方式将是一个良好的选择。window.onload是一个事件，当文档内容完全加载完成会触发该事件。

//onresize 事件会在窗口或框架被调整大小时发生。
window.onload = function(){
    //获取网页中所有的图片容器
    var _shows = document.getElementsByClassName("show");
    //获取网页展示内容区域的宽度
    // var _client_width = document.getElementById("container").offsetWidth;
// ===========================================
//         获取宽度，自动更改列
    var _cw = document.body.offsetWidth;
    var _container = document.getElementById('container');
    _container.style.width = _cw * 0.8 + "px";

    var _client_width = _container.offsetWidth;
    console.log(_client_width);

    for(let i=0;i<_shows.length;i++){
        let show = _shows[i];
        console.log("width: " + show.width);
        let times = show.width/300;
        console.log("width2: " + show.width);
        console.log("times: " + times);
        console.log("height before: " + show.height);
        show.height = show.height/times;
        console.log("height after: " + show.height);
        // console.log("width before: " + show.width);
        // show.width = show.width/times;
        // console.log("width after: " + show.width);
    }
}