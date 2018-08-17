/*eslint-disable */

'use strict';


var $errorPop = $('div.tips-error');
var Page = {
    ppu: '',
    id: '',
    mpId: '',
    group: '',
    name: '',
    saveStatus: '',
    test: '',
    pop: function pop(cont) {
        var NONE = 'none',
            $ele = $('div.mask,div._dialog'),
            $tips2 = $('._dialog p.dialog-content');
        $tips2.text(cont);
        $ele.removeClass(NONE);
    },
    toast: function toast(tar, cont) {
        var mask = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        var $ele = void 0;
        $ele = mask ? $('div.win2') : $('div.mask,div.win2');
        var NONE = 'none',
            $tips2 = $('div.tips2');

        $tips2.addClass(NONE); // 这一步的目的是为了防止目前有在显示的窗口冲突
        $ele.removeClass(NONE);
        // 如果包含错误信息的文字描述
        if (cont) {
            $('.error-infor').html(cont);
        }
        tar.removeClass(NONE);
        // 提示消失
        setTimeout(function () {
            $ele.addClass(NONE);
            $tips2.addClass(NONE);
        }, 2000);
    },
    getKey: function getKey(key) {
        var reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)', 'i');
        // search    从问号 (?) 开始的 URL（查询部分）
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return decodeURIComponent(r[2]);
        }
        return null;
    },
    init: function init() {
        Page.ppu = decodeURIComponent(Page.getKey('ppu'));
        Page.id = Page.getKey('id');
        Page.group = Page.getKey('group');
        Page.mpId = Page.getKey('mpId');
        $('.item-file-div').removeClass('none');
        if (Page.id && Page.id != 'undefined') {
            document.title = '商品编辑';
            Page.loadGoodData();
        }
    },
    initEvent: function initEvent() {
        // 初始化商品编辑框
        window.editor = ZEditor('#editor', {
            selectImage: function selectImage(cb) {
                // 商品详情内容编辑
                $('.icon-tupian-btn').on('change', function () {
                    // 上传中
                    var NONE = 'none',
                        $ele = $('div.mask,div.win2'),
                        $tips2 = $('div.tips2'),
                        $uploading = $('.tips-submiting');
                    $('.tips-submiting p').text('上传中');

                    $tips2.addClass(NONE);
                    $ele.removeClass(NONE);
                    $uploading.removeClass(NONE);
                    var self = this;
                    var formData = new FormData();
                    formData.append('source', $(self).get(0).files[0]);
                    document.domain = '58.com';
                    $.ajax({
                        url: 'https://yaofa.58.com/fileUpload',
                        type: 'POST',
                        data: formData,
                        contentType: false,
                        processData: false,
                        success: function success(data) {
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
                        error: function error(e) {
                            $ele.addClass(NONE);
                            $uploading.addClass(NONE);

                            Page.toast($errorPop, e);
                        }
                    });
                });
            }
        });
        $(".icon-bold").on("click", function () {
            if ($(this).attr("src").indexOf('unbold') > 1) {
                $(this).attr("src", '//static.58.com/lbg/shangjiaxcxht/zhushou/img/bold.png');
                $(".zeditor-content").find('p').css('font-weight', 'bold');
            } else {
                $(this).attr("src", '//static.58.com/lbg/shangjiaxcxht/zhushou/img/unbold.png');
                $(".zeditor-content").find('p').css('font-weight', 'normal');
            }
        });
        // 上传头图
        $('#item-file-btn').on('change', function () {
            var self = this,
                formData = new FormData(),

            // 上传中
            NONE = 'none',
                $ele = $('div.mask,div.win2'),
                $tips2 = $('div.tips2'),
                $uploading = $('.tips-submiting');
            $('.tips-submiting p').text('上传中');

            $tips2.addClass(NONE);
            $ele.removeClass(NONE);
            $uploading.removeClass(NONE);

            formData.append('sources', $(self).get(0).files[0]);
            $.ajax({
                url: 'https://yaofa.58.com/fileUpload',
                type: 'POST',
                data: formData,
                contentType: false,
                processData: false,
                success: function success(res) {
                    var res = JSON.parse(res);
                    var src = res.data.sources;
                    $ele.addClass(NONE);
                    $uploading.addClass(NONE);
                    if (src) {
                        $('#cover').attr('src', 'https://pic1.58cdn.com.cn' + src);
                        $('.item-upload-img').removeClass('none');
                        $('.item-file-div').addClass('none');
                    } else {
                        Page.toast($errorPop, res.msg);
                    }
                },
                error: function error(e) {
                    $ele.addClass(NONE);
                    $uploading.addClass(NONE);

                    Page.toast($errorPop, e);
                }
            });
        });
        // 重新上传
        $('.exchange-img').on('click', function () {
            $('.item-upload-img').attr('src', '').addClass('none');
            $('.item-file-div').removeClass('none');
        });
        $('.save-btn').on('click', function () {
          
            var group = Page.group,
                title = $('._title').val(),
                description = $('.zeditor-content').html(),
                stock = $('._source').val(),
                price = $('.item-input._author').val(),
                temp = $('.zeditor-content').find('p'),
                content = $('.zeditor-content').html(),
                pics = $('#cover').attr('src') ? $('#cover').attr('src').split('.cn')[1].replace(/([/])\1+/g, '$1') : '';
            if (!title) {
                Page.toast($errorPop, '请填写商品标题');
                return;
            }
            if (!pics) {
                Page.toast($errorPop, '请上传商品头图');
                return;
            }
            if (!Page.group) {
                Page.toast($errorPop, '请选择所属分组');
                return;
            }
            if (temp.length == 1 && temp.html() == '<br>') {
                Page.toast($errorPop, '请编辑商品内容');
                return;
            }
            if (title.length > 15) {
                Page.toast($errorPop, '商品标题不能多于15个字');
                return;
            }
            if (content.length >= 20000) {
                Page.toast($errorPop, '商品内容不得大于20000个字符');
                return;
            }
         
            var url = "";
            if (Page.id && Page.id != 'undefined') {
                url = '/goods/modify';
            } else {
                url = '/goods/insert';
            }
            var data = {
                groupId: group,
                title: title,
                pics: 'http://pic1.58cdn.com.cn/' + pics,
                stock: stock || '未知',
                price: price || '0',
                description: description,
                test: Page.test || 'test',
                mpId: Page.mpId
            };
           
            if (Page.id) {
                Object.assign(data, {
                    goodId: Page.id
                });
            }
            $.ajax({
                url: url,
                type: 'POST',
                data: data,
                headers: {
                    'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
                    PPU: Page.ppu || 'wanghongyue',
                    reqfrom: 'biz_assistant'
                },
                success: function success(res) {
                    var res = JSON.parse(res);
                    if (res.state == 100) {
                        Page.toast($('div.tips-success'));
                        setTimeout(function () {
                            wx.miniProgram.navigateBack({
                                delta: 1
                            });
                        }, 2000);
                    } else {
                        Page.toast($errorPop, res.msg);
                    }
                }
            });
        });
        $('._cancel-btn').on('click', function () {
            $('.mask,._dialog,.dialog-create-group').addClass('none');
            $('.dialog-content-input').val('');
        });
        $('.item-chose').on('click', function () {
            $('.mask,.group-dialog').removeClass('none');
        });
        $('._create-btn').on('click', function () {
            var num = $('.group-dialog-list').find('.group-dialog-item').length;
            if (num >= 10) {
                Page.toast($errorPop, '分组数量达到最大（10个），无法创建更多。');
                return;
            }
            $('.group-dialog').addClass('none');
            $('.dialog-create-group').removeClass('none');
        });
    },
    loadGoodData: function loadGoodData() {
        $.ajax({
            url: '/goods/get',
            data: {
                goodId: Page.id,
                test: Page.test
            },
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
                PPU: Page.ppu || 'wanghongyue',
                reqfrom: 'biz_assistant'
            },
            success: function success(res) {
                var res = JSON.parse(res);
                console.log(res);
                $('.group-dialog-list').html('');
                if (res.state == 100) {
                    $('._title').val(res.data.title);
                    $('.zeditor-content').html(res.data.description);
                    $('._source').val(res.data.stock);
                    $('.item-input._author').val(res.data.price);
                    $('#cover').attr('src', res.data.pics);
                    $(".item-upload-img").removeClass('none');
                    $(".item-file-div").addClass('none');
                } else {
                    Page.toast($errorPop, res.msg);
                }
            }
        });
    }
};
if (typeof Object.assign != 'function') {
    // Must be writable: true, enumerable: false, configurable: true
    Object.defineProperty(Object, "assign", {
      value: function assign(target, varArgs) { // .length of function is 2
        'use strict';
        if (target == null) { // TypeError if undefined or null
          throw new TypeError('Cannot convert undefined or null to object');
        }
  
        var to = Object(target);
  
        for (var index = 1; index < arguments.length; index++) {
          var nextSource = arguments[index];
  
          if (nextSource != null) { // Skip over if undefined or null
            for (var nextKey in nextSource) {
              // Avoid bugs when hasOwnProperty is shadowed
              if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                to[nextKey] = nextSource[nextKey];
              }
            }
          }
        }
        return to;
      },
      writable: true,
      configurable: true
    });
  }
Page.init();
Page.initEvent();