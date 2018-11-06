
var $errorPop = $('div.tips-error');
var Page = {
    ppu: '',
    //id: '',
    test: '',
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
        // Page.id = Page.getKey('id');
        // if (Page.id) {
        //     // 编辑,数据回填
        //     Page.loadData();
        //     document.title = '文章编辑';
        // } else {
        //     // 默认
        //     $('.item-file-div').removeClass('none');
        // }
    },
    initEvent: function () {
        //初始化文章编辑框
        window.editor = ZEditor('#editor', {
            selectImage: function (cb) {
                //商品详情内容编辑
                $(".icon-tupian-btn").on("change", function () {
                    // 上传中
                    var NONE = 'none',
                        $ele = $('div.mask,div.win2'),
                        $tips2 = $('div.tips2'),
                        $uploading = $('.tips-submiting');
                        $('.tips-submiting p').text('上传中');

                        $tips2.addClass(NONE);
                        $ele.removeClass(NONE);
                        $uploading.removeClass(NONE);
                        self = this,
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
                            $ele.addClass(NONE);
                            $uploading.addClass(NONE);
                            if (data.state == 100) {
                                var url = '//pic1.58cdn.com.cn' + data.data.source;
                                    cb(url + '?w=750');
                                $('.icon-tupian-btn').replaceWith('<input type="file" class="icon-tupian icon-tupian-btn" data-type="image">');
                            } else {
                                Page.toast($errorPop, data.msg);
                            }
                        },
                        error: function(e) {
                            $ele.addClass(NONE);
                            $uploading.addClass(NONE);
                            Page.toast($errorPop, e);
                        }
                    });
                });
            }
        });
        $('.save-btn').on('click', function() {
           var temp = $('.zeditor-content' ).find('p'),
           content = $(".zeditor-content").html();
           if (temp.length == 1 && temp.html() == '<br>') {
                Page.toast($errorPop, '请编辑文章内容');
                return;
            };
            if (content.length >= 20000) {
                Page.toast($errorPop, '文章内容不得大于20000个字符');
                return;
            };
            console.log(content);
            localStorage.setItem('content',content);
            setTimeout(function() {
                wx.miniProgram.navigateBack({
                    url: '/pages/orderComponentEdit?group=' + Page.group + '&name=' + Page.name
                });
            },2000);
            //this.setStorage('order-detail',content);
        })
        $('.mask,._sure-btn').on('click', function() {
            $('.mask,.dialog').addClass('none');
        });
        $("._font-style").on("click", function(){
            console.log('1111');
            $("._font-style").toggleClass("active");
        });
    },
    loadData: function() {
        
    }
};
Page.init();
Page.initEvent();