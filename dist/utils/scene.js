'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    DoLogin: function DoLogin(extraData) {
        var extraDataJSON = (typeof extraData === 'undefined' ? 'undefined' : _typeof(extraData)) === 'object' ? _extends({}, extraData) : JSON.parse(extraData);
        if (extraDataJSON.ppu !== undefined) {
            // 如果获取ppu成功
            console.log('\u83B7\u53D6PPU\u6210\u529F\uFF01 ' + extraDataJSON.ppu);
            _wepy2.default.setStorageSync('ppu', extraDataJSON.ppu);
            setTimeout(function () {
                _wepy2.default.reLaunch({
                    url: '/pages/home'
                });
            }, 1000);
        }
    },
    DoOpenPay: function DoOpenPay(extraData) {
        var code = extraData.code;
        // 开通支付失败
        // 返回商家助手小程序首页

        if (code !== 0) {
            setTimeout(function () {
                _wepy2.default.reLaunch({
                    url: '/pages/home'
                });
            }, 1000);
        }
    }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjZW5lLmpzIl0sIm5hbWVzIjpbIkRvTG9naW4iLCJleHRyYURhdGEiLCJleHRyYURhdGFKU09OIiwiSlNPTiIsInBhcnNlIiwicHB1IiwidW5kZWZpbmVkIiwiY29uc29sZSIsImxvZyIsIndlcHkiLCJzZXRTdG9yYWdlU3luYyIsInNldFRpbWVvdXQiLCJyZUxhdW5jaCIsInVybCIsIkRvT3BlblBheSIsImNvZGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7Ozs7O2tCQUVlO0FBQ1hBLFdBRFcsbUJBQ0hDLFNBREcsRUFDUTtBQUNmLFlBQU1DLGdCQUFpQixRQUFPRCxTQUFQLHlDQUFPQSxTQUFQLE9BQXFCLFFBQXRCLGdCQUF1Q0EsU0FBdkMsSUFBcURFLEtBQUtDLEtBQUwsQ0FBV0gsU0FBWCxDQUEzRTtBQUNBLFlBQUlDLGNBQWNHLEdBQWQsS0FBc0JDLFNBQTFCLEVBQXFDO0FBQUU7QUFDbkNDLG9CQUFRQyxHQUFSLHdDQUF3Qk4sY0FBY0csR0FBdEM7QUFDQUksMkJBQUtDLGNBQUwsQ0FBb0IsS0FBcEIsRUFBMkJSLGNBQWNHLEdBQXpDO0FBQ0FNLHVCQUFXLFlBQU07QUFDYkYsK0JBQUtHLFFBQUwsQ0FBYztBQUNWQyx5QkFBSztBQURLLGlCQUFkO0FBR0gsYUFKRCxFQUlHLElBSkg7QUFLSDtBQUNKLEtBWlU7QUFhWEMsYUFiVyxxQkFhRGIsU0FiQyxFQWFVO0FBQUEsWUFDVGMsSUFEUyxHQUNBZCxTQURBLENBQ1RjLElBRFM7QUFFakI7QUFDQTs7QUFDQSxZQUFJQSxTQUFTLENBQWIsRUFBZ0I7QUFDWkosdUJBQVcsWUFBTTtBQUNiRiwrQkFBS0csUUFBTCxDQUFjO0FBQ1ZDLHlCQUFLO0FBREssaUJBQWQ7QUFHSCxhQUpELEVBSUcsSUFKSDtBQUtIO0FBQ0o7QUF4QlUsQyIsImZpbGUiOiJzY2VuZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgRG9Mb2dpbihleHRyYURhdGEpIHtcbiAgICAgICAgY29uc3QgZXh0cmFEYXRhSlNPTiA9ICh0eXBlb2YgZXh0cmFEYXRhID09PSAnb2JqZWN0JykgPyB7IC4uLmV4dHJhRGF0YSB9IDogSlNPTi5wYXJzZShleHRyYURhdGEpO1xuICAgICAgICBpZiAoZXh0cmFEYXRhSlNPTi5wcHUgIT09IHVuZGVmaW5lZCkgeyAvLyDlpoLmnpzojrflj5ZwcHXmiJDlip9cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGDojrflj5ZQUFXmiJDlip/vvIEgJHtleHRyYURhdGFKU09OLnBwdX1gKTtcbiAgICAgICAgICAgIHdlcHkuc2V0U3RvcmFnZVN5bmMoJ3BwdScsIGV4dHJhRGF0YUpTT04ucHB1KTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHdlcHkucmVMYXVuY2goe1xuICAgICAgICAgICAgICAgICAgICB1cmw6ICcvcGFnZXMvaG9tZScsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgRG9PcGVuUGF5KGV4dHJhRGF0YSkge1xuICAgICAgICBjb25zdCB7IGNvZGUgfSA9IGV4dHJhRGF0YTtcbiAgICAgICAgLy8g5byA6YCa5pSv5LuY5aSx6LSlXG4gICAgICAgIC8vIOi/lOWbnuWVhuWutuWKqeaJi+Wwj+eoi+W6j+mmlumhtVxuICAgICAgICBpZiAoY29kZSAhPT0gMCkge1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgd2VweS5yZUxhdW5jaCh7XG4gICAgICAgICAgICAgICAgICAgIHVybDogJy9wYWdlcy9ob21lJyxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICB9XG4gICAgfSxcbn07XG4iXX0=