'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.filteremoji = exports.previewImage = exports.picSrcDomain = exports.toastSync = exports.notSupportTips = exports.toast = exports.alertP = exports.alert = exports.sleep = exports.isEmpty = exports.getNetStatus = undefined;

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _globalService = require('./globalService.js');

var _globalService2 = _interopRequireDefault(_globalService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports.globalService = _globalService2.default;

var getNetStatus = exports.getNetStatus = function getNetStatus() {
    return new Promise(function (resolve, reject) {
        wx.getNetworkType({
            success: function success(_ref) {
                var networkType = _ref.networkType;

                /**
                     * 0 网络不可用
                     * 1 wifi条件下，可以直接播放、上传
                     * 2 移动网络环境
                     */
                var status = 0;

                if (~['unknown', 'none'].indexOf(networkType)) {
                    status = 0;
                } else if (~['wifi'].indexOf(networkType)) {
                    status = 1;
                } else if (~['2g', '3g', '4g'].indexOf(networkType)) {
                    status = 2;
                }

                resolve(status);
            },
            fail: function fail(err) {
                reject(err);
            }
        });
    });
};

var isEmpty = exports.isEmpty = function isEmpty(v) {
    if (v === '' || v === null || v === undefined) {
        return true;
    }

    return false;
};

var sleep = exports.sleep = function sleep() {
    var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 300;
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve();
        }, time);
    });
};

// alert
var alert = exports.alert = function alert(content, title, callBack) {
    // showCancel设为false，然后在success里判断用户点的确定还是取消？
    _wepy2.default.showModal({
        showCancel: false,
        title: title || '注意',
        content: content,
        success: function success(res) {
            if (res.confirm) {
                console.log('用户点击确定');
                callBack && callBack();
            } else if (res.cancel) {
                console.log('用户点击取消');
            }
        }
    });
};

// alert的Promise版本
var alertP = exports.alertP = function alertP() {
    for (var _len = arguments.length, props = Array(_len), _key = 0; _key < _len; _key++) {
        props[_key] = arguments[_key];
    }

    var content = props[0],
        _props$ = props[1],
        title = _props$ === undefined ? '注意' : _props$;

    return new Promise(function (resolve, reject) {
        wx.showModal({
            title: title,
            content: content,
            success: function success(res) {
                resolve(res);
            },
            fail: function fail(err) {
                reject(err);
            }
        });
    });
};

// toast
var toast = exports.toast = function toast(title) {
    var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1500;

    _wepy2.default.showToast({
        title: title,
        icon: 'none',
        duration: duration
    });
};
// 不支持提示
var notSupportTips = exports.notSupportTips = function notSupportTips() {
    wx.showModal({
        title: '提示',
        content: '此微信版本过低，请先升级微信。',
        success: function success(res) {
            wx.setEnableDebug({ enableDebug: !res.confirm });
        }
    });
};
var toastSync = exports.toastSync = function toastSync(title) {
    return _wepy2.default.showToast({
        title: title.toString(),
        icon: 'none',
        duration: 2000
    });
};

// 图片域名
var picSrcDomain = exports.picSrcDomain = function picSrcDomain() {
    var n = parseInt(Math.random() * 8) + 1;
    return 'https://pic' + n + '.58cdn.com.cn';
};
var previewImage = exports.previewImage = function previewImage(imgs, index) {
    var urls = imgs.map(function (img) {
        var url = img.split('?')[0];
        return url + '?w=750&h=1000';
    });
    wx.previewImage({ current: urls[index], urls: urls });
};
// 过滤微信表情
var filteremoji = exports.filteremoji = function filteremoji(content) {
    var ranges = ['\uD83C[\uDF00-\uDFFF]', '\uD83D[\uDC00-\uDE4F]', '\uD83D[\uDE80-\uDEFF]'];
    var emojireg = content.replace(new RegExp(ranges.join('|'), 'g'), '');
    return emojireg;
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJnbG9iYWxTZXJ2aWNlIiwiZ2V0TmV0U3RhdHVzIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJ3eCIsImdldE5ldHdvcmtUeXBlIiwic3VjY2VzcyIsIm5ldHdvcmtUeXBlIiwic3RhdHVzIiwiaW5kZXhPZiIsImZhaWwiLCJlcnIiLCJpc0VtcHR5IiwidiIsInVuZGVmaW5lZCIsInNsZWVwIiwidGltZSIsInNldFRpbWVvdXQiLCJhbGVydCIsImNvbnRlbnQiLCJ0aXRsZSIsImNhbGxCYWNrIiwid2VweSIsInNob3dNb2RhbCIsInNob3dDYW5jZWwiLCJyZXMiLCJjb25maXJtIiwiY29uc29sZSIsImxvZyIsImNhbmNlbCIsImFsZXJ0UCIsInByb3BzIiwidG9hc3QiLCJkdXJhdGlvbiIsInNob3dUb2FzdCIsImljb24iLCJub3RTdXBwb3J0VGlwcyIsInNldEVuYWJsZURlYnVnIiwiZW5hYmxlRGVidWciLCJ0b2FzdFN5bmMiLCJ0b1N0cmluZyIsInBpY1NyY0RvbWFpbiIsIm4iLCJwYXJzZUludCIsIk1hdGgiLCJyYW5kb20iLCJwcmV2aWV3SW1hZ2UiLCJpbWdzIiwiaW5kZXgiLCJ1cmxzIiwibWFwIiwidXJsIiwiaW1nIiwic3BsaXQiLCJjdXJyZW50IiwiZmlsdGVyZW1vamkiLCJyYW5nZXMiLCJlbW9qaXJlZyIsInJlcGxhY2UiLCJSZWdFeHAiLCJqb2luIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7O0FBRUFBLE9BQU9DLE9BQVAsQ0FBZUMsYUFBZixHQUErQkEsdUJBQS9COztBQUVPLElBQU1DLHNDQUFlLFNBQWZBLFlBQWU7QUFBQSxXQUFNLElBQUlDLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDL0RDLFdBQUdDLGNBQUgsQ0FBa0I7QUFDZEMsbUJBRGMseUJBQ1c7QUFBQSxvQkFBZkMsV0FBZSxRQUFmQSxX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LENBUk0iLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcclxuaW1wb3J0IGdsb2JhbFNlcnZpY2UgZnJvbSAnLi9nbG9iYWxTZXJ2aWNlJztcclxuXHJcbm1vZHVsZS5leHBvcnRzLmdsb2JhbFNlcnZpY2UgPSBnbG9iYWxTZXJ2aWNlO1xyXG5cclxuZXhwb3J0IGNvbnN0IGdldE5ldFN0YXR1cyA9ICgpID0+IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgIHd4LmdldE5ldHdvcmtUeXBlKHtcclxuICAgICAgICBzdWNjZXNzKHsgbmV0d29ya1R5cGUgfSkge1xyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICAgICAqIDAg572R57uc5LiN5Y+v55SoXHJcbiAgICAgICAgICAgICAgICAgKiAxIHdpZmnmnaHku7bkuIvvvIzlj6/ku6Xnm7TmjqXmkq3mlL7jgIHkuIrkvKBcclxuICAgICAgICAgICAgICAgICAqIDIg56e75Yqo572R57uc546v5aKDXHJcbiAgICAgICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgbGV0IHN0YXR1cyA9IDA7XHJcblxyXG4gICAgICAgICAgICBpZiAoflsndW5rbm93bicsICdub25lJ10uaW5kZXhPZihuZXR3b3JrVHlwZSkpIHtcclxuICAgICAgICAgICAgICAgIHN0YXR1cyA9IDA7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoflsnd2lmaSddLmluZGV4T2YobmV0d29ya1R5cGUpKSB7XHJcbiAgICAgICAgICAgICAgICBzdGF0dXMgPSAxO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKH5bJzJnJywgJzNnJywgJzRnJ10uaW5kZXhPZihuZXR3b3JrVHlwZSkpIHtcclxuICAgICAgICAgICAgICAgIHN0YXR1cyA9IDI7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJlc29sdmUoc3RhdHVzKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGZhaWwoZXJyKSB7XHJcbiAgICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgIH0sXHJcbiAgICB9KTtcclxufSk7XHJcblxyXG5leHBvcnQgY29uc3QgaXNFbXB0eSA9IHYgPT4ge1xyXG4gICAgaWYgKHYgPT09ICcnIHx8IHYgPT09IG51bGwgfHwgdiA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHNsZWVwID0gKHRpbWUgPSAzMDApID0+IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHsgcmVzb2x2ZSgpOyB9LCB0aW1lKTtcclxufSk7XHJcblxyXG4vLyBhbGVydFxyXG5leHBvcnQgY29uc3QgYWxlcnQgPSAoY29udGVudCwgdGl0bGUsIGNhbGxCYWNrKSA9PiB7XHJcbiAgICAvLyBzaG93Q2FuY2Vs6K6+5Li6ZmFsc2XvvIznhLblkI7lnKhzdWNjZXNz6YeM5Yik5pat55So5oi354K555qE56Gu5a6a6L+Y5piv5Y+W5raI77yfXHJcbiAgICB3ZXB5LnNob3dNb2RhbCh7XHJcbiAgICAgICAgc2hvd0NhbmNlbDogZmFsc2UsXHJcbiAgICAgICAgdGl0bGU6IHRpdGxlIHx8ICfms6jmhI8nLFxyXG4gICAgICAgIGNvbnRlbnQsXHJcbiAgICAgICAgc3VjY2VzcyhyZXMpIHtcclxuICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn55So5oi354K55Ye756Gu5a6aJyk7XHJcbiAgICAgICAgICAgICAgICBjYWxsQmFjayAmJiBjYWxsQmFjaygpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHJlcy5jYW5jZWwpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfnlKjmiLfngrnlh7vlj5bmtognKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICB9KTtcclxufTtcclxuXHJcbi8vIGFsZXJ055qEUHJvbWlzZeeJiOacrFxyXG5leHBvcnQgY29uc3QgYWxlcnRQID0gKC4uLnByb3BzKSA9PiB7XHJcbiAgICBjb25zdCBbY29udGVudCwgdGl0bGUgPSAn5rOo5oSPJ10gPSBwcm9wcztcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgd3guc2hvd01vZGFsKHtcclxuICAgICAgICAgICAgdGl0bGUsXHJcbiAgICAgICAgICAgIGNvbnRlbnQsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3MocmVzKSB7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKHJlcyk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGZhaWwoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59O1xyXG5cclxuLy8gdG9hc3RcclxuZXhwb3J0IGNvbnN0IHRvYXN0ID0gKHRpdGxlLCBkdXJhdGlvbiA9IDE1MDApID0+IHtcclxuICAgIHdlcHkuc2hvd1RvYXN0KHtcclxuICAgICAgICB0aXRsZSxcclxuICAgICAgICBpY29uOiAnbm9uZScsXHJcbiAgICAgICAgZHVyYXRpb24sXHJcbiAgICB9KTtcclxufTtcclxuICAgIC8vIOS4jeaUr+aMgeaPkOekulxyXG5leHBvcnQgY29uc3Qgbm90U3VwcG9ydFRpcHMgPSAoKSA9PiB7XHJcbiAgICB3eC5zaG93TW9kYWwoe1xyXG4gICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcclxuICAgICAgICBjb250ZW50OiAn5q2k5b6u5L+h54mI5pys6L+H5L2O77yM6K+35YWI5Y2H57qn5b6u5L+h44CCJyxcclxuICAgICAgICBzdWNjZXNzKHJlcykge1xyXG4gICAgICAgICAgICB3eC5zZXRFbmFibGVEZWJ1Zyh7IGVuYWJsZURlYnVnOiAhcmVzLmNvbmZpcm0gfSk7XHJcbiAgICAgICAgfSxcclxuICAgIH0pO1xyXG59O1xyXG5leHBvcnQgY29uc3QgdG9hc3RTeW5jID0gKHRpdGxlKSA9PiB3ZXB5LnNob3dUb2FzdCh7XHJcbiAgICB0aXRsZTogdGl0bGUudG9TdHJpbmcoKSxcclxuICAgIGljb246ICdub25lJyxcclxuICAgIGR1cmF0aW9uOiAyMDAwLFxyXG59KTtcclxuXHJcbi8vIOWbvueJh+Wfn+WQjVxyXG5leHBvcnQgY29uc3QgcGljU3JjRG9tYWluID0gKCkgPT4ge1xyXG4gICAgY29uc3QgbiA9IHBhcnNlSW50KE1hdGgucmFuZG9tKCkgKiA4KSArIDE7XHJcbiAgICByZXR1cm4gYGh0dHBzOi8vcGljJHtufS41OGNkbi5jb20uY25gO1xyXG59O1xyXG5leHBvcnQgY29uc3QgcHJldmlld0ltYWdlID0gKGltZ3MsIGluZGV4KSA9PiB7XHJcbiAgICBjb25zdCB1cmxzID0gaW1ncy5tYXAoaW1nID0+IHtcclxuICAgICAgICBjb25zdCB1cmwgPSBpbWcuc3BsaXQoJz8nKVswXTtcclxuICAgICAgICByZXR1cm4gYCR7dXJsfT93PTc1MCZoPTEwMDBgO1xyXG4gICAgfSk7XHJcbiAgICB3eC5wcmV2aWV3SW1hZ2UoeyBjdXJyZW50OiB1cmxzW2luZGV4XSwgdXJscyB9KTtcclxufTtcclxuLy8g6L+H5ruk5b6u5L+h6KGo5oOFXHJcbmV4cG9ydCBjb25zdCBmaWx0ZXJlbW9qaSA9IChjb250ZW50KSA9PiB7XHJcbiAgICBjb25zdCByYW5nZXMgPSBbXHJcbiAgICAgICAgJ1xcdWQ4M2NbXFx1ZGYwMC1cXHVkZmZmXScsXHJcbiAgICAgICAgJ1xcdWQ4M2RbXFx1ZGMwMC1cXHVkZTRmXScsXHJcbiAgICAgICAgJ1xcdWQ4M2RbXFx1ZGU4MC1cXHVkZWZmXScsXHJcbiAgICBdO1xyXG4gICAgY29uc3QgZW1vamlyZWcgPSBjb250ZW50LnJlcGxhY2UobmV3IFJlZ0V4cChyYW5nZXMuam9pbignfCcpLCAnZycpLCAnJyk7XHJcbiAgICByZXR1cm4gZW1vamlyZWc7XHJcbn07XHJcbiJdfQ==