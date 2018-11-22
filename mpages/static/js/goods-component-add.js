/*eslint-disable */

'use strict';

var $errorPop = $('div.tips-error');
var skuRemoved = [];
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
    Page.test = 'test';
    $('.item-file-div').removeClass('none');
    if (Page.id && Page.id != 'undefined') {
      document.title = '商品编辑';
      Page.loadGoodData();
    }
    Page.getGroup();
  },
  initEvent: function initEvent() {
    // 初始化商品编辑框
    window.editor = ZEditor('#editor', {
      selectImage: function selectImage(cb) {
        // 商品详情内容编辑
        $('.icon-tupian-btn').on('click', function () {
          wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success(res) {
              // 上传中
              var NONE = "none",
                $ele = $("div.mask,div.win2"),
                $tips2 = $("div.tips2"),
                $uploading = $(".tips-submiting");
              $(".tips-submiting p").text("上传中");
              wx.uploadImage({
                localId: res.localIds.toString(), // 需要上传的图片的本地ID，由chooseImage接口获得
                isShowProgressTips: 1, // 默认为1，显示进度提示
                success: function (response) {
                  $tips2.addClass(NONE);
                  $ele.removeClass(NONE);
                  $uploading.removeClass(NONE);
                  $.ajax({
                    type: 'POST',
                    url: '/fileUpload',
                    data: {
                      mediaId: response.serverId,
                    },
                    success: function success(res) {
                      var res = JSON.parse(res);
                      var src = res.data.mediaUrl;
                      $ele.addClass(NONE);
                      $uploading.addClass(NONE);
                      if (src) {
                        $ele.addClass(NONE);
                        $uploading.addClass(NONE);
                        if (src) {
                          var url = "//pic1.58cdn.com.cn" + src;
                          cb(url + "?w=750");
                        } else {
                          Page.toast($errorPop, data.msg);
                        }
                      } else {
                        Page.toast($errorPop, res.msg);
                      }
                    },
                    error: function error(err) {
                      $ele.addClass(NONE);
                      $uploading.addClass(NONE);
                      Page.toast($errorPop, e);
                    }
                  });
                }
              });
            },
          });

        });
      }
    });
    $("#pName").on('keyup', function (e) {
      if (e.target.value.length >= 15) {
        e.target.value = e.target.value.substr(0, 15);
      }
    });
    $(".icon-bold").on("click", function () {
      if ($(this).attr("src").indexOf('unbold') > 1) {
        $(this).attr("src", '//static.58.com/lbg/shangjiaxcxht/zhushou/img/bold.png');
        $(".zeditor-content").css('font-weight', 'bold');
        $(".zeditor-content").find('p').css('font-weight', 'bold');
      } else {
        $(this).attr("src", '//static.58.com/lbg/shangjiaxcxht/zhushou/img/unbold.png');
        $(".zeditor-content").find('p').css('font-weight', 'normal');
      }
    });
    $("input[type=radio][name=size]").on('change', function (event) {
      if ($(this).val() == 'single') {
        $(".item-flex-s").hide();
        $(".item-price").show();
      } else {
        $(".item-flex-s").show();
        $(".item-price").hide();
      }
    });
    $(".add-size").on("click", function () {
      if ($(".size-info-wrapper").length > 9) {
        Page.toast($errorPop, '规格最多添加10个');
        return;
      }
      var insertContent = '<div class="size-info-wrapper">' + '<div class="size-info"><div class="info-line">' + '<span>名称</span>' + '<input type="text" class="size-name" value="" placeholder="例/大份">' + '</div>' + '<div class="info-line">' + '<span>价格</span>' + '<input type="number" class="size-price" value="" placeholder="请输入"><span></span>' + '</div>' + '<div class="info-line">' + '<span>库存</span>' + '<input type="number" class="size-stock" value="" placeholder="请输入"><span></span>' + '</div>' + '</div>' + '<div class="delete"></div>' + '</div>';
      $(insertContent).insertBefore($(this));
      $(".size-info-wrapper .delete").on("click", function () {
        $(this).parent().remove();
      });
    });

    // 上传头图
    $('#item-file-btn').on('click', function () {
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success(res) {
          // 上传中
          var NONE = "none",
            $ele = $("div.mask,div.win2"),
            $tips2 = $("div.tips2"),
            $uploading = $(".tips-submiting");
          $('.tips-submiting p').text('上传中');
          wx.uploadImage({
            localId: res.localIds.toString(), // 需要上传的图片的本地ID，由chooseImage接口获得
            isShowProgressTips: 1, // 默认为1，显示进度提示
            success: function (response) {
              $tips2.addClass(NONE);
              $ele.removeClass(NONE);
              $uploading.removeClass(NONE);

              $.ajax({
                type: 'POST',
                url: '/fileUpload',
                data: {
                  mediaId: response.serverId,
                },
                success: function success(res) {
                  var res = JSON.parse(res);
                  var src = res.data.mediaUrl;
                  $ele.addClass(NONE);
                  $uploading.addClass(NONE);
                  if (src) {
                    $('#cover').attr('src', 'https://pic1.58cdn.com.cn' + src + '?w=120');
                    $('.item-upload-img').removeClass('none');
                    $('.item-file-div').addClass('none');
                  } else {
                    Page.toast($errorPop, res.msg);
                  }
                }
              });
            }
          });
        },
      })
    });
    // 重新上传
    $('.exchange-img').on('click', function () {
      $('.item-upload-img').attr('src', '').addClass('none');
      $('.item-file-div').removeClass('none');
    });
    $('.save-btn').on('click', function () {

      var group = Page.group,
        title = $('._title').val().trim(),
        description = $('.zeditor-content').html(),
        stock = $('._source').val() || 0,
        price = $('.item-input._author').val() || 0,
        temp = $('.zeditor-content').find('p'),
        content = $('.zeditor-content').html(),
        pics = $('#cover').attr('src') ? $('#cover').attr('src').split('.cn')[1].replace(/([/])\1+/g, '$1') : '',
        sku = [],
        skuType = 1;
      if (Number(price) > 999999) {
        Page.toast($errorPop, '商品价格不能大于99999');
        return;
      }
      if (Number(stock) > 999999) {
        Page.toast($errorPop, '商品库存不能大于99999');
        return;
      }
      if (!title) {
        Page.toast($errorPop, '请填写商品标题');
        return;
      }
      if ($('input[name=size]:checked').val() == 'multi' && $(".size-info-wrapper").length < 1) {
        Page.toast($errorPop, '请添加规格');
        return;
      }
      if (!pics) {
        Page.toast($errorPop, '请上传商品头图');
        return;
      }
      if (!Page.group || Page.group == 'undefined') {
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
      var check = false;
      $(".size-info-wrapper").forEach(function (item) {
        if ($(item).find(".size-price").val() == '' || $(item).find(".size-name").val() == '' || $(item).find(".size-stock").val() == '') {
          check = true;
        }
      });
      if (check) {
        Page.toast($errorPop, '库存内容不能为空');
        return;
      }
      if ($('input[name=size]:checked').val() == 'multi') {
        skuType = 2;
        $(".size-info-wrapper").forEach(function (item) {
          var skuObj = {
            id: $(item).attr("id"),
            price: $(item).find(".size-price").val(),
            skuName: $(item).find(".size-name").val(),
            stock: $(item).find(".size-stock").val()
          };
          sku.push(skuObj);
          skuRemoved.forEach(function (item) {
            $.ajax({
              url: '/goods/sku/del',
              type: 'POST',
              data: {
                id: item
              },
              headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
                PPU: Page.ppu || 'wanghongyue',
                reqfrom: 'biz_assistant'
              },
              success: function success(res) {
                console.log(res);
              }
            });
          });
        });
      } else {
        sku = null;
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
        test: Page.test || '',
        mpId: Page.mpId,
        skuType: skuType,
      };
      console.log(data);
      if (Page.id && Page.id != 'undefined') {
        Object.assign(data, {
          goodId: Page.id
        });
      }
      if ($('input[name=size]:checked').val() == 'multi') {
        Object.assign(data, {
          skuParams: JSON.stringify(sku)
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
    $('._sure-create').on('click', function () {
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
        url: '/goods/addGroup',
        data: {
          name: name,
          test: Page.test,
          mpId: Page.mpId
        },
        headers: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
          PPU: Page.ppu || 'wanghongyue',
          reqfrom: 'biz_assistant'
        },
        success: function success(res) {
          var res = JSON.parse(res);
          if (res.state == 100) {
            $('.mask,.group-dialog').removeClass('none');
            // location.reload();
            Page.getGroup();
          } else {
            Page.toast($errorPop, res.msg);
          }
        }
      });
      $('.mask,.dialog-create-group').addClass('none');
      $('.dialog-content-input').val('');
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
    $('.group-dialog-list').attr('cursor', 'pointer').on('touchstart', '.group-dialog-item', function () {
      var flag = $(this).hasClass('selected');
      if (!flag) {
        var name = $(this).data('name'),
          group = $(this).data('id');
        Page.group = group;
        $(this).addClass('selected').siblings('.group-dialog-item').removeClass('selected');
        $('._chose-btn').data('name', name).data('group', group);
      } else {
        $(this).removeClass('selected');
      }
    });
    $('._chose-btn').on('click', function () {
      var name = $(this).data('name'),
        group = $(this).data('group');
      if (!name) {
        Page.toast($errorPop, '请选择商品分组！');
        return;
      }
      $('.item-chose').text(name);
      Page.name = name;
      Page.group = group;
      $('.mask,.group-dialog').addClass('none');
      $(this).data(name, '');
      $(this).data(group, '');
    });
  },
  getGroup: function getGroup() {
    $.ajax({
      url: '/goods/groups/specail',
      data: {
        mpId: Page.mpId,
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
          var data = res.data,
            html = '';
          for (var i = 0; i < data.length; i++) {
            if (Page.group && Page.group == data[i].data.id) {
              $('.item-chose').text(data[i].data.name);
            }
            html += '<div class="group-dialog-item" data-id="' + data[i].data.id + '" data-name="' + data[i].data.name + '">' + data[i].data.name + '</div>';
          }
          $('.group-dialog-list').html(html);
        } else {
          Page.toast($errorPop, res.msg);
        }
      }
    });
  },
  sizeWrap: function (sku) {
    var html = '';
    sku.forEach(function (item) {
      html += '<div class="size-info-wrapper" id="' + item.id + '">' + '<div class="size-info">' + '<div class="info-line">' + '<span>名称</span>' + '<input type="text" class="size-name" value="' + item.skuName + '">' + '</div>' + '<div class="info-line">' + '<span>价格</span>' + '<input type="number" class="size-price" value="' + item.price + '">' + '</div>' + '<div class="info-line">' + '<span>库存</span>' + '<input type="number" class="size-stock" value="' + item.stock + '">' + '</div>' + '</div>' + '<div class="delete"></div>' + '</div>';
    });
    $(html).insertAfter($("#size-text"));
    $(".size-info-wrapper .delete").on("click", function () {
      console.log($(this).parent().attr("id"));
      skuRemoved.push($(this).parent().attr("id"));
      $(this).parent().remove();
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
        if (res.data.sku && res.data.sku.length > 0 && res.data.skuHave == 1) {
          Page.sizeWrap(res.data.sku);
          $("#radio-1").attr('checked', 'checked');
          $(".item-flex-s").show();
          $(".item-price").hide();
        } else {
          $("#radio-2").attr('checked', 'checked');
          $(".item-flex-s").hide();
          $(".item-price").show();
        }
        if (res.state == 100) {
          $('._title').val(res.data.title);
          window.editor.appendFromParent(res.data.description);
          $('._source').val(res.data.stock);
          if (res.data.description.indexOf('bold') > -1) {
            $(".icon-bold").attr("src", '//static.58.com/lbg/shangjiaxcxht/zhushou/img/bold.png');
          }
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
    value: function assign(target, varArgs) {
      // .length of function is 2
      'use strict';

      if (target == null) {
        // TypeError if undefined or null
        throw new TypeError('Cannot convert undefined or null to object');
      }

      var to = Object(target);

      for (var index = 1; index < arguments.length; index++) {
        var nextSource = arguments[index];

        if (nextSource != null) {
          // Skip over if undefined or null
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
