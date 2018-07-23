'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.filteremoji = exports.picSrcDomain = exports.toastSync = exports.notSupportTips = exports.toast = exports.alertP = exports.alert = exports.sleep = exports.isEmpty = exports.getNetStatus = undefined;

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

// 过滤微信表情
var filteremoji = exports.filteremoji = function filteremoji(content) {
    var ranges = ['\uD83C[\uDF00-\uDFFF]', '\uD83D[\uDC00-\uDE4F]', '\uD83D[\uDE80-\uDEFF]'];
    var emojireg = content.replace(new RegExp(ranges.join('|'), 'g'), '');
    return emojireg;
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJnbG9iYWxTZXJ2aWNlIiwiZ2V0TmV0U3RhdHVzIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJ3eCIsImdldE5ldHdvcmtUeXBlIiwic3VjY2VzcyIsIm5ldHdvcmtUeXBlIiwic3RhdHVzIiwiaW5kZXhPZiIsImZhaWwiLCJlcnIiLCJpc0VtcHR5IiwidiIsInVuZGVmaW5lZCIsInNsZWVwIiwidGltZSIsInNldFRpbWVvdXQiLCJhbGVydCIsImNvbnRlbnQiLCJ0aXRsZSIsImNhbGxCYWNrIiwid2VweSIsInNob3dNb2RhbCIsInNob3dDYW5jZWwiLCJyZXMiLCJjb25maXJtIiwiY29uc29sZSIsImxvZyIsImNhbmNlbCIsImFsZXJ0UCIsInByb3BzIiwidG9hc3QiLCJkdXJhdGlvbiIsInNob3dUb2FzdCIsImljb24iLCJub3RTdXBwb3J0VGlwcyIsInNldEVuYWJsZURlYnVnIiwiZW5hYmxlRGVidWciLCJ0b2FzdFN5bmMiLCJ0b1N0cmluZyIsInBpY1NyY0RvbWFpbiIsIm4iLCJwYXJzZUludCIsIk1hdGgiLCJyYW5kb20iLCJmaWx0ZXJlbW9qaSIsInJhbmdlcyIsImVtb2ppcmVnIiwicmVwbGFjZSIsIlJlZ0V4cCIsImpvaW4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7QUFFQUEsT0FBT0MsT0FBUCxDQUFlQyxhQUFmLEdBQStCQSx1QkFBL0I7O0FBRU8sSUFBTUMsc0NBQWUsU0FBZkEsWUFBZSxHQUFNO0FBQzlCLFdBQU8sSUFBSUMsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUNwQ0MsV0FBR0MsY0FBSCxDQUFrQjtBQUNkQyxtQkFEYyx5QkFDVztBQUFBLG9CQUFmQyxXQUFlLFFBQWZBLFdBQWU7O0FBQ3JCOzs7OztBQUtBLG9CQUFJQyxTQUFTLENBQWI7O0FBRUEsb0JBQUksQ0FBQyxDQUFDLFNBQUQsRUFB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QUNiLElBQUlDLE9BQXBCLEVBQWxCO0FBQ0g7QUFMUSxLQUFiO0FBT0gsQ0FSTTtBQVNBLElBQU1hLGdDQUFZLFNBQVpBLFNBQVksQ0FBQ25CLEtBQUQ7QUFBQSxXQUFXRSxlQUFLWSxTQUFMLENBQWU7QUFDL0NkLGVBQU9BLE1BQU1vQixRQUFOLEVBRHdDO0FBRS9DTCxjQUFNLE1BRnlDO0FBRy9DRixrQkFBVTtBQUhxQyxLQUFmLENBQVg7QUFBQSxDQUFsQjs7QUFNUDtBQUNPLElBQU1RLHNDQUFlLFNBQWZBLFlBQWUsR0FBTTtBQUM5QixRQUFNQyxJQUFJQyxTQUFTQyxLQUFLQyxNQUFMLEtBQWdCLENBQXpCLElBQThCLENBQXhDO0FBQ0EsMkJBQXFCSCxDQUFyQjtBQUNILENBSE07O0FBS1A7QUFDTyxJQUFNSSxvQ0FBYyxTQUFkQSxXQUFjLENBQUMzQixPQUFELEVBQWE7QUFDcEMsUUFBTTRCLFNBQVMsQ0FDWCx1QkFEVyxFQUVYLHVCQUZXLEVBR1gsdUJBSFcsQ0FBZjtBQUtBLFFBQU1DLFdBQVc3QixRQUFROEIsT0FBUixDQUFnQixJQUFJQyxNQUFKLENBQVdILE9BQU9JLElBQVAsQ0FBWSxHQUFaLENBQVgsRUFBNkIsR0FBN0IsQ0FBaEIsRUFBbUQsRUFBbkQsQ0FBakI7QUFDQSxXQUFPSCxRQUFQO0FBQ0gsQ0FSTSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xyXG5pbXBvcnQgZ2xvYmFsU2VydmljZSBmcm9tICcuL2dsb2JhbFNlcnZpY2UnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMuZ2xvYmFsU2VydmljZSA9IGdsb2JhbFNlcnZpY2U7XHJcblxyXG5leHBvcnQgY29uc3QgZ2V0TmV0U3RhdHVzID0gKCkgPT4ge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICB3eC5nZXROZXR3b3JrVHlwZSh7XHJcbiAgICAgICAgICAgIHN1Y2Nlc3MoeyBuZXR3b3JrVHlwZSB9KSB7XHJcbiAgICAgICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICAgICAqIDAg572R57uc5LiN5Y+v55SoXHJcbiAgICAgICAgICAgICAgICAgKiAxIHdpZmnmnaHku7bkuIvvvIzlj6/ku6Xnm7TmjqXmkq3mlL7jgIHkuIrkvKBcclxuICAgICAgICAgICAgICAgICAqIDIg56e75Yqo572R57uc546v5aKDXHJcbiAgICAgICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgICAgIGxldCBzdGF0dXMgPSAwO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh+Wyd1bmtub3duJywgJ25vbmUnXS5pbmRleE9mKG5ldHdvcmtUeXBlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1cyA9IDA7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKH5bJ3dpZmknXS5pbmRleE9mKG5ldHdvcmtUeXBlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1cyA9IDE7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKH5bJzJnJywgJzNnJywgJzRnJ10uaW5kZXhPZihuZXR3b3JrVHlwZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXMgPSAyO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJlc29sdmUoc3RhdHVzKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZmFpbChlcnIpIHtcclxuICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgaXNFbXB0eSA9ICB2ID0+IHtcclxuICAgIGlmICh2ID09PSAnJyB8fCB2ID09PSBudWxsIHx8IHYgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBmYWxzZTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBzbGVlcCA9ICh0aW1lID0gMzAwKSA9PiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7IHJlc29sdmUoKTsgfSwgdGltZSk7XHJcbn0pO1xyXG5cclxuLy8gYWxlcnRcclxuZXhwb3J0IGNvbnN0IGFsZXJ0ID0gKGNvbnRlbnQsIHRpdGxlLCBjYWxsQmFjaykgPT4ge1xyXG4gICAgLy8gc2hvd0NhbmNlbOiuvuS4umZhbHNl77yM54S25ZCO5Zyoc3VjY2Vzc+mHjOWIpOaWreeUqOaIt+eCueeahOehruWumui/mOaYr+WPlua2iO+8n1xyXG4gICAgd2VweS5zaG93TW9kYWwoe1xyXG4gICAgICAgIHNob3dDYW5jZWw6IGZhbHNlLFxyXG4gICAgICAgIHRpdGxlOiB0aXRsZSB8fCAn5rOo5oSPJyxcclxuICAgICAgICBjb250ZW50LFxyXG4gICAgICAgIHN1Y2Nlc3MocmVzKSB7XHJcbiAgICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+eUqOaIt+eCueWHu+ehruWumicpO1xyXG4gICAgICAgICAgICAgICAgY2FsbEJhY2sgJiYgY2FsbEJhY2soKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChyZXMuY2FuY2VsKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn55So5oi354K55Ye75Y+W5raIJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgfSk7XHJcbn07XHJcblxyXG4vLyBhbGVydOeahFByb21pc2XniYjmnKxcclxuZXhwb3J0IGNvbnN0IGFsZXJ0UCA9ICguLi5wcm9wcykgPT4ge1xyXG4gICAgY29uc3QgW2NvbnRlbnQsIHRpdGxlID0gJ+azqOaEjyddID0gcHJvcHM7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgIHd4LnNob3dNb2RhbCh7XHJcbiAgICAgICAgICAgIHRpdGxlLFxyXG4gICAgICAgICAgICBjb250ZW50LFxyXG4gICAgICAgICAgICBzdWNjZXNzKHJlcykge1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShyZXMpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBmYWlsKGVycikge1xyXG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuLy8gdG9hc3RcclxuZXhwb3J0IGNvbnN0IHRvYXN0ID0gKHRpdGxlLCBkdXJhdGlvbiA9IDE1MDApID0+IHtcclxuICAgIHdlcHkuc2hvd1RvYXN0KHtcclxuICAgICAgICB0aXRsZSxcclxuICAgICAgICBpY29uOiAnbm9uZScsXHJcbiAgICAgICAgZHVyYXRpb24sXHJcbiAgICB9KTtcclxufTtcclxuICAgIC8vIOS4jeaUr+aMgeaPkOekulxyXG5leHBvcnQgY29uc3Qgbm90U3VwcG9ydFRpcHMgPSAoKSA9PiB7XHJcbiAgICB3eC5zaG93TW9kYWwoe1xyXG4gICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcclxuICAgICAgICBjb250ZW50OiAn5q2k5b6u5L+h54mI5pys6L+H5L2O77yM6K+35YWI5Y2H57qn5b6u5L+h44CCJyxcclxuICAgICAgICBzdWNjZXNzKHJlcykge1xyXG4gICAgICAgICAgICB3eC5zZXRFbmFibGVEZWJ1Zyh7IGVuYWJsZURlYnVnOiAhcmVzLmNvbmZpcm0gfSk7XHJcbiAgICAgICAgfSxcclxuICAgIH0pO1xyXG59O1xyXG5leHBvcnQgY29uc3QgdG9hc3RTeW5jID0gKHRpdGxlKSA9PiB3ZXB5LnNob3dUb2FzdCh7XHJcbiAgICB0aXRsZTogdGl0bGUudG9TdHJpbmcoKSxcclxuICAgIGljb246ICdub25lJyxcclxuICAgIGR1cmF0aW9uOiAyMDAwLFxyXG59KTtcclxuXHJcbi8vIOWbvueJh+Wfn+WQjVxyXG5leHBvcnQgY29uc3QgcGljU3JjRG9tYWluID0gKCkgPT4ge1xyXG4gICAgY29uc3QgbiA9IHBhcnNlSW50KE1hdGgucmFuZG9tKCkgKiA4KSArIDE7XHJcbiAgICByZXR1cm4gYGh0dHBzOi8vcGljJHtufS41OGNkbi5jb20uY25gO1xyXG59O1xyXG5cclxuLy8g6L+H5ruk5b6u5L+h6KGo5oOFXHJcbmV4cG9ydCBjb25zdCBmaWx0ZXJlbW9qaSA9IChjb250ZW50KSA9PiB7XHJcbiAgICBjb25zdCByYW5nZXMgPSBbXHJcbiAgICAgICAgJ1xcdWQ4M2NbXFx1ZGYwMC1cXHVkZmZmXScsXHJcbiAgICAgICAgJ1xcdWQ4M2RbXFx1ZGMwMC1cXHVkZTRmXScsXHJcbiAgICAgICAgJ1xcdWQ4M2RbXFx1ZGU4MC1cXHVkZWZmXScsXHJcbiAgICBdO1xyXG4gICAgY29uc3QgZW1vamlyZWcgPSBjb250ZW50LnJlcGxhY2UobmV3IFJlZ0V4cChyYW5nZXMuam9pbignfCcpLCAnZycpLCAnJyk7XHJcbiAgICByZXR1cm4gZW1vamlyZWc7XHJcbn07Il19