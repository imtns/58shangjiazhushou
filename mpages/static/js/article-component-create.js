var $errorPop = $('div.tips-error');
var Page = {
    ppu: '',
    group: '',
    id: '',
    name: '',
    saveStatus: '',
    test: 'test',
    toast: function(tar, cont) {
        var NONE = 'none',
            $ele = $('div.mask,div.win2'),
            $tips2 = $('div.tips2');

        $tips2.addClass(NONE); //这一步的目的是为了防止目前有在显示的窗口冲突
        $ele.removeClass(NONE);
        //如果包含错误信息的文字描述
        if (cont) {
            $('.error-infor').html(cont);
        }
        tar.removeClass(NONE);
        //提示消失
        setTimeout(function () {
            $ele.addClass(NONE);
            $tips2.addClass(NONE);
        }, 2000);
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
    init() {
        Page.ppu = decodeURIComponent(Page.getKey('ppu'));
        Page.group = Page.getKey('group');
        Page.id = Page.getKey('id');
        Page.name = Page.getKey('name');
        if (Page.id) {
            // 编辑,数据回填
            Page.loadData();
            document.title = '文章编辑';
        } else {
            // 默认
            $('.item-file-div').removeClass('none');
        }
    },
    initEvent: function () {
        //初始化文章编辑框
        window.editor = ZEditor('#editor', {
            selectImage: function (cb) {
                //商品详情内容编辑
                $(".icon-tupian-btn").on("change", function () {
                    var self = this,
                        formData = new FormData();
                    formData.append('source',$(self).get(0).files[0]);
                    document.domain = '58.com';
                    $.ajax({
                        url: '/fileUpload',
                        type: 'POST',
                        data: formData,
                        contentType: false,
                        processData: false,
                        success: function(data) {
                            var data = JSON.parse(data);
                            if (data.state == 100) {
                                var url = '//pic1.58cdn.com.cn' + data.data.source;
                                    cb(url + '?w=750');
                                $('.icon-tupian-btn').replaceWith('<input type="file" class="icon-tupian icon-tupian-btn" data-type="image">');
                            } else {
                                Page.toast($errorPop, data.msg);
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
                    var res = JSON.parse(res);
                    var src= res.data.sources;
                    if (src) {
                        $('#cover').attr('src', "https://pic1.58cdn.com.cn" + src);
                        $('.item-upload-img').removeClass('none');
                        $('.item-file-div').addClass('none');
                    } else {
                        Page.toast($errorPop, res.msg);
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
            var group = Page.group,
                title = $('._title').val(),
                intro = $('.zeditor-content').find('p:first-child').text().substring(0, 20),
                source = $('._source').val(),
                author = $('._author').val(),
                temp = $('.zeditor-content' ).find('p'),
                content = $(".zeditor-content").html(),
                cover = $('#cover').attr('src') ? $('#cover').attr('src').split(".cn")[1].replace(/([/])\1+/g, "$1") : '';
            if (!title) {
                Page.toast($errorPop, '请填写文章标题');
                return;
            };
            if (!cover) {
                Page.toast($errorPop, '请上传文章头图');
                return;
            }
            if (temp.length == 1 && temp.html() == '<br>') {
                Page.toast($errorPop, '请编辑文章内容');
                return;
            };
            if (title.length > 15) {
                Page.toast($errorPop, '文章标题不能多于15个字');
                return;
            };
            if (content.length >= 20000) {
                Page.toast($errorPop, '文章内容不得大于20000个字符');
                return;
            };
            var url;
            if (Page.id) {
                url = '/businessArticle/update/' + Page.id;
            } else {
                url = '/businessArticle/insert/';
            }
            $.ajax({
                url: url,
                type: 'POST',
                data: {
                    group: group,
                    title: title,
                    cover: cover,
                    intro: intro,
                    source: source || '未知',
                    author: author || '未知',
                    content: content,
                    test: Page.test,
                },
                headers: {
                    'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
                    PPU: Page.ppu || 'wanghongyue',
                    reqfrom: 'biz_assistant',
                },
                success: function(res) {
                    var res = JSON.parse(res);
                    if (res.state == 100) {
                        Page.toast($('div.tips-success'));
                        setTimeout(function() {
                            wx.miniProgram.navigateTo({
                                url: '/pages/articleComponentlist?group=' + Page.group + '&name=' + Page.name
                            });
                        },2000);
                    } else {
                        Page.toast($errorPop, res.msg);
                    }
                }
            });
        })
        $('.mask,._sure-btn').on('click', function() {
            $('.mask,.dialog').addClass('none');
        });
    },
    loadData: function() {
        $.ajax({
            url: '/businessArticle/detail/' + Page.id,
            data: {
                test: Page.test,
            },
            headers: {
                'content-type': 'application/json',
                PPU: Page.ppu || 'wanghongyue',
                reqfrom: 'biz_assistant',
            },
            success: function(data) {
                var data = JSON.parse(data);
                if (data.state == 100) {
                    var listData = data.data,
                        title = data.data.title,
                        content = data.data.content,
                        author = data.data.author,
                        source = data.data.source,
                        intro = data.data.intro,
                        cover = data.data.cover;
                        $('._title').val(title);
                        $('._author').val(author);
                        $('._source').val(source);
                        $("#editor .zeditor-content").html(content);
                        if (!cover) {
                            $('.item-file-div').removeClass('none');
                        } else {
                            $('.item-upload-img').removeClass('none').find('#cover').attr('src', 'https://pic1.58cdn.com.cn' + cover);
                        }
                } else {
                    Page.toast($errorPop, data.msg);
                }
            }
        });
    }
};
Page.init();
Page.initEvent();