'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.filteremoji = exports.picSrcDomain = exports.toastSync = exports.toast = exports.alert = exports.sleep = undefined;

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

// toast
var toast = exports.toast = function toast(title) {
    _wepy2.default.showToast({
        title: title,
        icon: 'none',
        duration: 2000
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbInNsZWVwIiwidGltZSIsIlByb21pc2UiLCJyZXNvbHZlIiwic2V0VGltZW91dCIsImFsZXJ0IiwiY29udGVudCIsInRpdGxlIiwiY2FsbEJhY2siLCJ3ZXB5Iiwic2hvd01vZGFsIiwic2hvd0NhbmNlbCIsInN1Y2Nlc3MiLCJyZXMiLCJjb25maXJtIiwiY29uc29sZSIsImxvZyIsImNhbmNlbCIsInRvYXN0Iiwic2hvd1RvYXN0IiwiaWNvbiIsImR1cmF0aW9uIiwidG9hc3RTeW5jIiwidG9TdHJpbmciLCJwaWNTcmNEb21haW4iLCJuIiwicGFyc2VJbnQiLCJNYXRoIiwicmFuZG9tIiwiZmlsdGVyZW1vamkiLCJyYW5nZXMiLCJlbW9qaXJlZyIsInJlcGxhY2UiLCJSZWdFeHAiLCJqb2luIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7OztBQUVPLElBQU1BLHdCQUFRLFNBQVJBLEtBQVE7QUFBQSxRQUFDQyxJQUFELHVFQUFRLEdBQVI7QUFBQSxXQUFnQixJQUFJQyxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFhO0FBQzFEQyxtQkFBVyxZQUFNO0FBQUVEO0FBQVksU0FBL0IsRUFBaUNGLElBQWpDO0FBQ0gsS0FGb0MsQ0FBaEI7QUFBQSxDQUFkOztBQUlQO0FBQ08sSUFBTUksd0JBQVEsU0FBUkEsS0FBUSxDQUFDQyxPQUFELEVBQVVDLEtBQVYsRUFBaUJDLFFBQWpCLEVBQThCO0FBQy9DQyxtQkFBS0MsU0FBTCxDQUFlO0FBQ1hDLG9CQUFZLEtBREQ7QUFFWEosZUFBT0EsU0FBUyxJQUZMO0FBR1hELHdCQUhXO0FBSVhNLGVBSlcsbUJBSUhDLEdBSkcsRUFJRTtBQUNULGdCQUFJQSxJQUFJQyxPQUFSLEVBQWlCO0FBQ2JDLHdCQUFRQyxHQUFSLENBQVksUUFBWjtBQUNBUiw0QkFBWUEsVUFBWjtBQUNILGFBSEQsTUFHTyxJQUFJSyxJQUFJSSxNQUFSLEVBQWdCO0FBQ25CRix3QkFBUUMsR0FBUixDQUFZLFFBQVo7QUFDSDtBQUNKO0FBWFUsS0FBZjtBQWFILENBZE07O0FBZ0JQO0FBQ08sSUFBTUUsd0JBQVEsU0FBUkEsS0FBUSxDQUFDWCxLQUFELEVBQVc7QUFDNUJFLG1CQUFLVSxTQUFMLENBQWU7QUFDWFosb0JBRFc7QUFFWGEsY0FBTSxNQUZLO0FBR1hDLGtCQUFVO0FBSEMsS0FBZjtBQUtILENBTk07QUFPQSxJQUFNQyxnQ0FBWSxTQUFaQSxTQUFZLENBQUNmLEtBQUQ7QUFBQSxXQUFXRSxlQUFLVSxTQUFMLENBQWU7QUFDL0NaLGVBQU9BLE1BQU1nQixRQUFOLEVBRHdDO0FBRS9DSCxjQUFNLE1BRnlDO0FBRy9DQyxrQkFBVTtBQUhxQyxLQUFmLENBQVg7QUFBQSxDQUFsQjs7QUFNUDtBQUNPLElBQU1HLHNDQUFlLFNBQWZBLFlBQWUsR0FBTTtBQUM5QixRQUFNQyxJQUFJQyxTQUFTQyxLQUFLQyxNQUFMLEtBQWdCLENBQXpCLElBQThCLENBQXhDO0FBQ0EsMkJBQXFCSCxDQUFyQjtBQUNILENBSE07O0FBS1A7QUFDTyxJQUFNSSxvQ0FBYyxTQUFkQSxXQUFjLENBQUN2QixPQUFELEVBQWE7QUFDcEMsUUFBTXdCLFNBQVMsQ0FDWCx1QkFEVyxFQUVYLHVCQUZXLEVBR1gsdUJBSFcsQ0FBZjtBQUtBLFFBQU1DLFdBQVd6QixRQUFRMEIsT0FBUixDQUFnQixJQUFJQyxNQUFKLENBQVdILE9BQU9JLElBQVAsQ0FBWSxHQUFaLENBQVgsRUFBNkIsR0FBN0IsQ0FBaEIsRUFBbUQsRUFBbkQsQ0FBakI7QUFDQSxXQUFPSCxRQUFQO0FBQ0gsQ0FSTSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuXG5leHBvcnQgY29uc3Qgc2xlZXAgPSAodGltZSA9IDMwMCkgPT4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHsgcmVzb2x2ZSgpOyB9LCB0aW1lKTtcbn0pO1xuXG4vLyBhbGVydFxuZXhwb3J0IGNvbnN0IGFsZXJ0ID0gKGNvbnRlbnQsIHRpdGxlLCBjYWxsQmFjaykgPT4ge1xuICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgICAgc2hvd0NhbmNlbDogZmFsc2UsXG4gICAgICAgIHRpdGxlOiB0aXRsZSB8fCAn5rOo5oSPJyxcbiAgICAgICAgY29udGVudCxcbiAgICAgICAgc3VjY2VzcyhyZXMpIHtcbiAgICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfnlKjmiLfngrnlh7vnoa7lrponKTtcbiAgICAgICAgICAgICAgICBjYWxsQmFjayAmJiBjYWxsQmFjaygpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChyZXMuY2FuY2VsKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+eUqOaIt+eCueWHu+WPlua2iCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgIH0pO1xufTtcblxuLy8gdG9hc3RcbmV4cG9ydCBjb25zdCB0b2FzdCA9ICh0aXRsZSkgPT4ge1xuICAgIHdlcHkuc2hvd1RvYXN0KHtcbiAgICAgICAgdGl0bGUsXG4gICAgICAgIGljb246ICdub25lJyxcbiAgICAgICAgZHVyYXRpb246IDIwMDAsXG4gICAgfSk7XG59O1xuZXhwb3J0IGNvbnN0IHRvYXN0U3luYyA9ICh0aXRsZSkgPT4gd2VweS5zaG93VG9hc3Qoe1xuICAgIHRpdGxlOiB0aXRsZS50b1N0cmluZygpLFxuICAgIGljb246ICdub25lJyxcbiAgICBkdXJhdGlvbjogMjAwMCxcbn0pO1xuXG4vLyDlm77niYfln5/lkI1cbmV4cG9ydCBjb25zdCBwaWNTcmNEb21haW4gPSAoKSA9PiB7XG4gICAgY29uc3QgbiA9IHBhcnNlSW50KE1hdGgucmFuZG9tKCkgKiA4KSArIDE7XG4gICAgcmV0dXJuIGBodHRwczovL3BpYyR7bn0uNThjZG4uY29tLmNuYDtcbn07XG5cbi8vIOi/h+a7pOW+ruS/oeihqOaDhVxuZXhwb3J0IGNvbnN0IGZpbHRlcmVtb2ppID0gKGNvbnRlbnQpID0+IHtcbiAgICBjb25zdCByYW5nZXMgPSBbXG4gICAgICAgICdcXHVkODNjW1xcdWRmMDAtXFx1ZGZmZl0nLFxuICAgICAgICAnXFx1ZDgzZFtcXHVkYzAwLVxcdWRlNGZdJyxcbiAgICAgICAgJ1xcdWQ4M2RbXFx1ZGU4MC1cXHVkZWZmXScsXG4gICAgXTtcbiAgICBjb25zdCBlbW9qaXJlZyA9IGNvbnRlbnQucmVwbGFjZShuZXcgUmVnRXhwKHJhbmdlcy5qb2luKCd8JyksICdnJyksICcnKTtcbiAgICByZXR1cm4gZW1vamlyZWc7XG59O1xuIl19