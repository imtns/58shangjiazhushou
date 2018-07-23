'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.filteremoji = exports.picSrcDomain = exports.toastSync = exports.toast = exports.alertP = exports.alert = exports.sleep = exports.isEmpty = exports.getNetStatus = undefined;

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

// 过滤微信表情
var filteremoji = exports.filteremoji = function filteremoji(content) {
    var ranges = ['\uD83C[\uDF00-\uDFFF]', '\uD83D[\uDC00-\uDE4F]', '\uD83D[\uDE80-\uDEFF]'];
    var emojireg = content.replace(new RegExp(ranges.join('|'), 'g'), '');
    return emojireg;
};