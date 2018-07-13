'use strict';

var uploadUrl = 'https://yaofa.58.com/fileUpload';

module.exports.uploader = function (tempFilePath) {
    for (var _len = arguments.length, props = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        props[_key - 1] = arguments[_key];
    }

    var params = props[0],
        callback = props[1],
        noLoading = props[2];

    if (typeof params === 'function') {
        noLoading = callback;
        callback = params;
        params = {};
    }

    var formData = params && params.data || {};
    var name = params && params.name || 'content';

    !noLoading && wx.showLoading && wx.showLoading({ title: '上传中', mask: true });
    return wx.uploadFile({
        url: uploadUrl,
        name: name,
        formData: formData,
        filePath: tempFilePath,
        success: function success(_ref) {
            var data = _ref.data;

            var nData = JSON.parse(data);
            console.log(nData);
            if (nData.state === 100) {
                callback && callback(null, nData.data);
            } else {
                callback('上传失败');
            }
        },
        fail: function fail() {
            callback('上传失败');
        },
        complete: function complete() {
            !noLoading && wx.hideLoading && wx.hideLoading();
        }
    });
};