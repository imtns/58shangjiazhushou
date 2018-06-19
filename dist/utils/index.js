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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbInNsZWVwIiwidGltZSIsIlByb21pc2UiLCJyZXNvbHZlIiwic2V0VGltZW91dCIsImFsZXJ0IiwiY29udGVudCIsInRpdGxlIiwiY2FsbEJhY2siLCJ3ZXB5Iiwic2hvd01vZGFsIiwic2hvd0NhbmNlbCIsInN1Y2Nlc3MiLCJyZXMiLCJjb25maXJtIiwiY29uc29sZSIsImxvZyIsImNhbmNlbCIsInRvYXN0Iiwic2hvd1RvYXN0IiwiaWNvbiIsImR1cmF0aW9uIiwidG9hc3RTeW5jIiwidG9TdHJpbmciLCJwaWNTcmNEb21haW4iLCJuIiwicGFyc2VJbnQiLCJNYXRoIiwicmFuZG9tIiwiZmlsdGVyZW1vamkiLCJyYW5nZXMiLCJlbW9qaXJlZyIsInJlcGxhY2UiLCJSZWdFeHAiLCJqb2luIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7OztBQUVPLElBQU1BLHdCQUFRLFNBQVJBLEtBQVE7QUFBQSxRQUFDQyxJQUFELHVFQUFRLEdBQVI7QUFBQSxXQUFnQixJQUFJQyxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFhO0FBQzFEQyxtQkFBVyxZQUFNO0FBQUVEO0FBQVksU0FBL0IsRUFBaUNGLElBQWpDO0FBQ0gsS0FGb0MsQ0FBaEI7QUFBQSxDQUFkOztBQUlQO0FBQ08sSUFBTUksd0JBQVEsU0FBUkEsS0FBUSxDQUFDQyxPQUFELEVBQVVDLEtBQVYsRUFBaUJDLFFBQWpCLEVBQThCO0FBQy9DQyxtQkFBS0MsU0FBTCxDQUFlO0FBQ1hDLG9CQUFZLEtBREQ7QUFFWEosZUFBT0EsU0FBUyxJQUZMO0FBR1hELHdCQUhXO0FBSVhNLGVBSlcsbUJBSUhDLEdBSkcsRUFJRTtBQUNULGdCQUFJQSxJQUFJQyxPQUFSLEVBQWlCO0FBQ2JDLHdCQUFRQyxHQUFSLENBQVksUUFBWjtBQUNBUiw0QkFBWUEsVUFBWjtBQUNILGFBSEQsTUFHTyxJQUFJSyxJQUFJSSxNQUFSLEVBQWdCO0FBQ25CRix3QkFBUUMsR0FBUixDQUFZLFFBQVo7QUFDSDtBQUNKO0FBWFUsS0FBZjtBQWFILENBZE07O0FBZ0JQO0FBQ08sSUFBTUUsd0JBQVEsU0FBUkEsS0FBUSxDQUFDWCxLQUFELEVBQVc7QUFDNUJFLG1CQUFLVSxTQUFMLENBQWU7QUFDWFosb0JBRFc7QUFFWGEsY0FBTSxNQUZLO0FBR1hDLGtCQUFVO0FBSEMsS0FBZjtBQUtILENBTk07QUFPQSxJQUFNQyxnQ0FBWSxTQUFaQSxTQUFZLENBQUNmLEtBQUQ7QUFBQSxXQUFXRSxlQUFLVSxTQUFMLENBQWU7QUFDL0NaLGVBQU9BLE1BQU1nQixRQUFOLEVBRHdDO0FBRS9DSCxjQUFNLE1BRnlDO0FBRy9DQyxrQkFBVTtBQUhxQyxLQUFmLENBQVg7QUFBQSxDQUFsQjs7QUFNUDtBQUNPLElBQU1HLHNDQUFlLFNBQWZBLFlBQWUsR0FBTTtBQUM5QixRQUFNQyxJQUFJQyxTQUFTQyxLQUFLQyxNQUFMLEtBQWdCLENBQXpCLElBQThCLENBQXhDO0FBQ0EsMkJBQXFCSCxDQUFyQjtBQUNILENBSE07O0FBS1A7QUFDTyxJQUFNSSxvQ0FBYyxTQUFkQSxXQUFjLENBQUN2QixPQUFELEVBQWE7QUFDcEMsUUFBTXdCLFNBQVMsQ0FDWCx1QkFEVyxFQUVYLHVCQUZXLEVBR1gsdUJBSFcsQ0FBZjtBQUtBLFFBQU1DLFdBQVd6QixRQUFRMEIsT0FBUixDQUFnQixJQUFJQyxNQUFKLENBQVdILE9BQU9JLElBQVAsQ0FBWSxHQUFaLENBQVgsRUFBNkIsR0FBN0IsQ0FBaEIsRUFBbUQsRUFBbkQsQ0FBakI7QUFDQSxXQUFPSCxRQUFQO0FBQ0gsQ0FSTSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xyXG5cclxuZXhwb3J0IGNvbnN0IHNsZWVwID0gKHRpbWUgPSAzMDApID0+IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHsgcmVzb2x2ZSgpOyB9LCB0aW1lKTtcclxufSk7XHJcblxyXG4vLyBhbGVydFxyXG5leHBvcnQgY29uc3QgYWxlcnQgPSAoY29udGVudCwgdGl0bGUsIGNhbGxCYWNrKSA9PiB7XHJcbiAgICB3ZXB5LnNob3dNb2RhbCh7XHJcbiAgICAgICAgc2hvd0NhbmNlbDogZmFsc2UsXHJcbiAgICAgICAgdGl0bGU6IHRpdGxlIHx8ICfms6jmhI8nLFxyXG4gICAgICAgIGNvbnRlbnQsXHJcbiAgICAgICAgc3VjY2VzcyhyZXMpIHtcclxuICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn55So5oi354K55Ye756Gu5a6aJyk7XHJcbiAgICAgICAgICAgICAgICBjYWxsQmFjayAmJiBjYWxsQmFjaygpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHJlcy5jYW5jZWwpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfnlKjmiLfngrnlh7vlj5bmtognKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICB9KTtcclxufTtcclxuXHJcbi8vIHRvYXN0XHJcbmV4cG9ydCBjb25zdCB0b2FzdCA9ICh0aXRsZSkgPT4ge1xyXG4gICAgd2VweS5zaG93VG9hc3Qoe1xyXG4gICAgICAgIHRpdGxlLFxyXG4gICAgICAgIGljb246ICdub25lJyxcclxuICAgICAgICBkdXJhdGlvbjogMjAwMCxcclxuICAgIH0pO1xyXG59O1xyXG5leHBvcnQgY29uc3QgdG9hc3RTeW5jID0gKHRpdGxlKSA9PiB3ZXB5LnNob3dUb2FzdCh7XHJcbiAgICB0aXRsZTogdGl0bGUudG9TdHJpbmcoKSxcclxuICAgIGljb246ICdub25lJyxcclxuICAgIGR1cmF0aW9uOiAyMDAwLFxyXG59KTtcclxuXHJcbi8vIOWbvueJh+Wfn+WQjVxyXG5leHBvcnQgY29uc3QgcGljU3JjRG9tYWluID0gKCkgPT4ge1xyXG4gICAgY29uc3QgbiA9IHBhcnNlSW50KE1hdGgucmFuZG9tKCkgKiA4KSArIDE7XHJcbiAgICByZXR1cm4gYGh0dHBzOi8vcGljJHtufS41OGNkbi5jb20uY25gO1xyXG59O1xyXG5cclxuLy8g6L+H5ruk5b6u5L+h6KGo5oOFXHJcbmV4cG9ydCBjb25zdCBmaWx0ZXJlbW9qaSA9IChjb250ZW50KSA9PiB7XHJcbiAgICBjb25zdCByYW5nZXMgPSBbXHJcbiAgICAgICAgJ1xcdWQ4M2NbXFx1ZGYwMC1cXHVkZmZmXScsXHJcbiAgICAgICAgJ1xcdWQ4M2RbXFx1ZGMwMC1cXHVkZTRmXScsXHJcbiAgICAgICAgJ1xcdWQ4M2RbXFx1ZGU4MC1cXHVkZWZmXScsXHJcbiAgICBdO1xyXG4gICAgY29uc3QgZW1vamlyZWcgPSBjb250ZW50LnJlcGxhY2UobmV3IFJlZ0V4cChyYW5nZXMuam9pbignfCcpLCAnZycpLCAnJyk7XHJcbiAgICByZXR1cm4gZW1vamlyZWc7XHJcbn07XHJcbiJdfQ==