'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * @desc uploader的Promise版本
 * @tempFilePath 路径
 * @params 参数, type标识上传文件的类型：
 * 视频上传到 /wosMeidaUpload
 * 图片上传到 /fileUpload
 * 其他文件上传到 /wosFileUpload
 * 默认为其他类型文件
 * @noLoading 是否不要加载中弹窗
 */

var uploadUrl = 'https://yaofa.58.com/fileUpload';

exports.default = function (tempFilePath) {
    for (var _len = arguments.length, props = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        props[_key - 1] = arguments[_key];
    }

    var params = props[0],
        noLoading = props[1];


    var formData = params && params.data || {};
    var name = params && params.name || 'content';
    var type = params && params.type || 'image';

    if (type === 'video') {
        uploadUrl = 'https://yaofa.58.com/wosMeidaUpload';
    }

    switch (type) {
        case 'image':
            uploadUrl = 'https://yaofa.58.com/fileUpload';
            break;
        case 'video':
            uploadUrl = 'https://yaofa.58.com/wosMeidaUpload';
            break;
        default:
            uploadUrl = 'https://yaofa.58.com/wosFileUpload';
            break;
    }

    !noLoading && wx.showLoading && wx.showLoading({ title: '上传中', mask: true });
    return new Promise(function (resolve, reject) {
        wx.uploadFile({
            url: uploadUrl,
            name: name,
            formData: formData,
            filePath: tempFilePath,
            success: function success(_ref) {
                var data = _ref.data;

                var nData = JSON.parse(data);
                console.log(nData);
                if (nData.state === 100) {
                    resolve(nData.data);
                } else {
                    reject('上传失败');
                }
            },
            fail: function fail() {
                reject('上传失败');
            },
            complete: function complete() {
                !noLoading && wx.hideLoading && wx.hideLoading();
            }
        });
    });
};