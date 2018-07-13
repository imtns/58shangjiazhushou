var Page = {
    pop:function(cont) {
        var NONE = 'none',
            $ele = $('div.mask,div.dialog'),
            $tips2 = $('.dialog p.content');
            $tips2.text(cont);
            $ele.removeClass(NONE);
    },
    getKey: function (key) {
        var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)", "i");
        //search    从问号 (?) 开始的 URL（查询部分）
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return decodeURIComponent(r[2]);
        } else {
            return null;
        }
    },
    initEvent: function () {
        //初始化文章编辑框
        window.editor = ZEditor('#editor', {
            selectImage: function (cb) {
                //商品详情内容编辑
                $(".icon-tupian-btn").on("change", function () {
                    console.log('111111');
                    var self = this,
                        formData = new FormData();
                    formData.append('source',$(self).get(0).files[0]);
                    console.log(formData);
                    document.domain = '58.com';
                    $.ajax({
                        url: 'http://yaofa.58.com/fileUpload',
                        type: 'POST',
                        data: formData,
                        contentType: false,
                        processData: false,
                        success: function(data) {
                            if (data.state == 100) {
                                console.log(data);
                                var host = '//pic1.58cdn.com.cn',
                                    url = data.data.sources;
                                    cb(url + '?w=750');
                            } else {
                                console.log(data.msg);
                                Page.pop(data.msg);
                            }
                        }
                    });
                });
            }
        });
        // 上传头图
        $('#item-file-btn').on('change', function() {
            var self = this,
            formData = new FormData();
            formData.append('sources', $(self).get(0).files[0]);
            $.ajax({
                url: '/fileUpload',
                type: 'POST',
                data: formData,
                contentType: false,
                processData: false,
                success: function(res) {
                    var src= res.data.sources;
                    if (src) {
                        $('#cover').attr('src', "http://pic1.58cdn.com.cn" + src);
                        $('.item-upload-img').removeClass('none');
                        $('.item-file-div').addClass('none');
                    } else {
                        Page.pop('图片上传失败');
                    }
                    
                }
            });
        });
        // 重新上传
        $('.exchange-img').on('click', function() {
            $('.item-upload-img').attr('src', '').addClass('none');
            $('.item-file-div').removeClass('none');
        });
        $('.save-btn').on('click', function() {
            var group = Page.getKey('group'),
                title = $('._title').val(),
                intro = $('._content').find('p:first-child').text().substring(0, 20),
                source = $('_source').val(),
                author = $('._author').val(),
                temp = $('._content' ).find(),
                content = $("._content").html(),
                cover = $('#cover').attr('src') ? $('#cover').attr('src').split(".cn")[1].replace(/([/])\1+/g, "$1") : '';
            if (!title || title.length > 15) {
                Page.pop("文章标题为空或多于15个字");
                return;
            };
            if (!cover) {
                Page.pop("请上传文章头图");
                return;
            }
            if (temp.length == 1 && temp.html == '<br>') {
                Page.pop("请编辑文章内容");
                return;
            };
            if (content.length >= 20000) {
                Page.pop("文章内容不得大于20000个字符");
                return;
            };
            $.post('/businessArticle/insert',{
                group: group,
                title: title,
                cover: cover,
                intro: intro,
                source: source || '未知',
                author: author || '未知',
                content: content
                },function (res) {
                    if (res.state == 100) {
                        location.href = '/html/article-component-list/'+ location.pathname.split('/')[3] +'?group=' + queryString.getKey('group') + '&name=' + queryString.getKey('name');
                    }
                }
            )
        })
        $('.mask,._sure-btn').on('click', function() {
            $('.mask,.dialog').addClass('none');
        });
    }
};
Page.initEvent();