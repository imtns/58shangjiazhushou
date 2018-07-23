
var $errorPop = $('div.tips-error');
var Page = {
    ppu: '',
    id: '',
    group: '',
    name: '',
    saveStatus: '',
    test: 'test',
    pop:function(cont) {
        var NONE = 'none',
            $ele = $('div.mask,div._dialog'),
            $tips2 = $('._dialog p.dialog-content');
            $tips2.text(cont);
            $ele.removeClass(NONE);
    },
    toast: function(tar, cont, mask = false) {
        var $ele;
        $ele = mask ? $('div.win2') : $('div.mask,div.win2');
        var NONE = 'none',
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
        Page.id = page.getKey('id');
        $('.item-file-div').removeClass('none');
        Page.loadGroupData();
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
            if (!Page.group) {
                Page.toast($errorPop, '请选择所属分组');
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
                                url: '/pages/edit/article?id=' + Page.id
                            });
                        },2000);
                    } else {
                        Page.toast($errorPop, res.msg);
                    }
                }
            });
        })
        $('._cancel-btn').on('click', function() {
            $('.mask,._dialog,.dialog-create-group').addClass('none');
            $('.dialog-content-input').val('');
        });
        $('.item-chose').on('click', function() {
            $('.mask,.group-dialog').removeClass('none');
        })
        $('._create-btn').on('click', function() {
            $('.group-dialog').addClass('none');
            $('.dialog-create-group').removeClass('none');
        })
        // 请求添加分组
        $('._sure-create').on('click', function() {
            var name = $('.dialog-content-input').val();
            if (!name) {
                Page.toast($errorPop, '请输入分组名称！', true);
                return;
            }
            if (name.length > 15) {
                Page.toast($errorPop, '分组名称不得超过15个字！', true);
                return;
            }
            $.ajax({
                url: '/businessArticle/addgroup',
                data: {
                    name:name,
                    test: Page.test,
                },
                headers: {
                    'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
                    PPU: Page.ppu || 'wanghongyue',
                    reqfrom: 'biz_assistant',
                },
                success:function(res) {
                    var res = JSON.parse(res);
                    if(res.state == 100){
                        $('.mask,.group-dialog').removeClass('none');
                        location.reload();
                    }else{
                        Page.toast($errorPop, res.msg);
                    }
                }
            });
            $('.mask,.dialog-create-group').addClass('none');
            $('.dialog-content-input').val('');
        });
        // 选择分组
        $('.group-dialog-list').attr('cursor','pointer').on('touchstart', '.group-dialog-item', function() {
            var flag = $(this).hasClass('selected');
            if (!flag) {
                var name = $(this).data('name'),
                    group = $(this).data('id');
                $(this).addClass('selected').siblings('.group-dialog-item').removeClass('selected');
                $('._chose-btn').data('name', name).data('group', group);
            } else {
                $(this).removeClass('selected')
            }
        })
        $('._chose-btn').on('click', function() {
            var name = $(this).data('name'),
                group = $(this).data('group');
            if (!name) {
                Page.toast($errorPop, '请选择文章分组！');
                return;
            }
            $('.item-chose').text(name);
            Page.name = name;
            Page.group = group;
            $('.mask,.group-dialog').addClass('none');
            $(this).data(name,'');
            $(this).data(group,'');
        });
    },
    loadGroupData: function() {
        $.ajax({
            url: '/businessArticle/groups',
            data: {
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
                    var data = res.data,
                        html = '';
                    for(var i=0 ;i<data.length;i++) {
                        html += '<div class="group-dialog-item" data-id="'+data[i].id+'" data-name="'+data[i].name+'">' + data[i].name + '</div>';
                    }
                    $('.group-dialog-list').html(html);
                } else {
                    Page.toast($errorPop, res.msg);
                }
            }
        });
    }
};
Page.init();
Page.initEvent();