var token = $("meta[name='_csrf']").attr("content");
var header = $("meta[name='_csrf_header']").attr("content");
$(document).ajaxSend(function(e, xhr, options) {
    xhr.setRequestHeader(header, token);
});

$(".id_search").click(function(){
    content = $($(this).siblings('input')).val();
    let show = $('.picture_show');
    console.log(content);
    show.removeAttr('hidden');
    $(this).removeClass('id_search_before');
    $(this).addClass('id_search_after');
    $.ajax({
        url: '/search',
        type: 'POST',
        data: {
            'id': content,
            'content':"",
            'provider': "",
            'place': "",
            'starttime': "",
            'endtime': ""
        },
        success: function (res) {
            picture_detail(res);
            let show = $('.picture_show');
            show.removeAttr('hidden');
        }
    }).done(function (res) {
    }).fail(function (res) {
    });
});



// "{\"id\":\"1\", \"provider\":\"哈哈哈\", \"label\":\"a\tb\", \"dateTime\":\"2018-05-12\", \"place\":\"雁栖湖\", \"description\":\"秋天拍的\", \"published\":\"0\", \"copyright\":\"0\", \"imgPath\":\"../images/1.png\"}"



function picture_detail(res){
    res = res.replace("\\t","$");
    res = eval('(' + res + ')');
    res = res[0];
    console.log(res);
    let detail_id = $(".detail_id");
    detail_id.text(res.id);
    let detail_author = $('.detail_author');
    detail_author.text(res.provider);
    let detail_label = $('.detail_label');
    detail_label.empty();
    let tags = res.label.split("$");
    for(let I = 0; I < tags.length-1; I++){
        console.log(tags[I]);
        let tag = $("<a></a>").text(tags[I]);
        tag.addClass("ui label");
        detail_label.append(tag);
    }
    let detail_date = $('.detail_date');
    detail_date.text(res.dateTime);
    let detail_place = $('.detail_place');
    detail_place.text(res.place);
    let detail_description = $('.detail_description');
    detail_description.text(res.description);
    let detail_published = $('.detail_published');
    if(res.published == '0'){
        detail_published.text('已发布');
    }else{
        detail_published.text('未发布');
    }
    let detail_copyright = $('.detail_copyright');
    if(res.copyright == '0'){
        detail_copyright.text('有版权');
    }else{
        detail_copyright.text('无版权');
    }
    let show_detail = $('.show_detail');
    console.log(res.imgPath);
    show_detail.attr("src", res.imgPath);
}

$('.delbutton').click(function(){
    let detail_id = $(".detail_id");
    detail_id = detail_id.text();
    swal({
            title: "确定删除吗？",
            text: "你将无法恢复该文件，你的行为将被记录！",
            icon: "warning",
            buttons: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "确定删除！",
            dangerMode: true,
        }).then(function(willDelete){
            if(willDelete) {
                $.ajax({
                    url: '/deleteImg',
                    type: 'POST',
                    data: {
                        'id': detail_id
                    },
                    success: function (res) {
                        swal("删除！", "文件已经被删除。", "success");
                    }
                }).done(function (res) {
                }).fail(function (res) {
                });
            }else{
                swal("已取消");
            }
        });
});