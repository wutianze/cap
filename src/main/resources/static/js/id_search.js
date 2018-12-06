$(".id_search").click(function(){
    content = $(this).siblings('input');
    let show = $('.picture_show');
    show.removeAttr('hidden');
    $(this).removeClass('id_search_before');
    $(this).addClass('id_search_after');
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
    res = res.replace("\t","$");
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