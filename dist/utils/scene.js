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

    // 同镇跳转过来先进入到首页面，初始化当前小程序后到我的小程序页面
    DoToMymp: function DoToMymp(extraData) {
        var extraDataJSON = (typeof extraData === 'undefined' ? 'undefined' : _typeof(extraData)) === 'object' ? _extends({}, extraData) : JSON.parse(extraData);
        if (extraDataJSON.ppu !== undefined) {
            // 如果获取ppu成功
            console.log('\u83B7\u53D6PPU\u6210\u529F\uFF01 ' + extraDataJSON.ppu);
            _wepy2.default.setStorageSync('ppu', extraDataJSON.ppu);
            setTimeout(function () {
                _wepy2.default.navigateTo({
                    url: '/pages/myMp'
                });
            }, 1000);
        }
    },
    DoOpenPay: function DoOpenPay(extraData) {
        if (!extraData) return;
        var code = extraData.code;
        // 开通支付失败
        // 返回商家助手小程序首页

        console.log('code:', code);
        if (code !== '0') {
            console.log('OpenPay:1');
            setTimeout(function () {
                _wepy2.default.reLaunch({
                    url: '/pages/home'
                });
            }, 1000);
        } else {
            console.log('OpenPay:0');
            // 支付开通验证成功后，调用同意协议接口
            _wepy2.default.setStorageSync('OpenPay', '0');
        }
    }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjZW5lLmpzIl0sIm5hbWVzIjpbIkRvTG9naW4iLCJleHRyYURhdGEiLCJleHRyYURhdGFKU09OIiwiSlNPTiIsInBhcnNlIiwicHB1IiwidW5kZWZpbmVkIiwiY29uc29sZSIsImxvZyIsIndlcHkiLCJzZXRTdG9yYWdlU3luYyIsInNldFRpbWVvdXQiLCJyZUxhdW5jaCIsInVybCIsIkRvVG9NeW1wIiwibmF2aWdhdGVUbyIsIkRvT3BlblBheSIsImNvZGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7Ozs7O2tCQUdlO0FBQ1hBLFdBRFcsbUJBQ0hDLFNBREcsRUFDUTtBQUNmLFlBQU1DLGdCQUFpQixRQUFPRCxTQUFQLHlDQUFPQSxTQUFQLE9BQXFCLFFBQXRCLGdCQUF1Q0EsU0FBdkMsSUFBcURFLEtBQUtDLEtBQUwsQ0FBV0gsU0FBWCxDQUEzRTtBQUNBLFlBQUlDLGNBQWNHLEdBQWQsS0FBc0JDLFNBQTFCLEVBQXFDO0FBQUU7QUFDbkNDLG9CQUFRQyxHQUFSLHdDQUF3Qk4sY0FBY0csR0FBdEM7QUFDQUksMkJBQUtDLGNBQUwsQ0FBb0IsS0FBcEIsRUFBMkJSLGNBQWNHLEdBQXpDO0FBQ0FNLHVCQUFXLFlBQU07QUFDYkYsK0JBQUtHLFFBQUwsQ0FBYztBQUNWQyx5QkFBSztBQURLLGlCQUFkO0FBR0gsYUFKRCxFQUlHLElBSkg7QUFLSDtBQUNKLEtBWlU7O0FBYVg7QUFDQUMsWUFkVyxvQkFjRmIsU0FkRSxFQWNTO0FBQ2hCLFlBQU1DLGdCQUFpQixRQUFPRCxTQUFQLHlDQUFPQSxTQUFQLE9BQXFCLFFBQXRCLGdCQUF1Q0EsU0FBdkMsSUFBcURFLEtBQUtDLEtBQUwsQ0FBV0gsU0FBWCxDQUEzRTtBQUNBLFlBQUlDLGNBQWNHLEdBQWQsS0FBc0JDLFNBQTFCLEVBQXFDO0FBQUU7QUFDbkNDLG9CQUFRQyxHQUFSLHdDQUF3Qk4sY0FBY0csR0FBdEM7QUFDQUksMkJBQUtDLGNBQUwsQ0FBb0IsS0FBcEIsRUFBMkJSLGNBQWNHLEdBQXpDO0FBQ0FNLHVCQUFXLFlBQU07QUFDYkYsK0JBQUtNLFVBQUwsQ0FBZ0I7QUFDWkYseUJBQUs7QUFETyxpQkFBaEI7QUFHSCxhQUpELEVBSUcsSUFKSDtBQUtIO0FBQ0osS0F6QlU7QUEwQlhHLGFBMUJXLHFCQTBCRGYsU0ExQkMsRUEwQlU7QUFDakIsWUFBSSxDQUFDQSxTQUFMLEVBQWdCO0FBREMsWUFFVGdCLElBRlMsR0FFQWhCLFNBRkEsQ0FFVGdCLElBRlM7QUFHakI7QUFDQTs7QUFDQVYsZ0JBQVFDLEdBQVIsQ0FBWSxPQUFaLEVBQXFCUyxJQUFyQjtBQUNBLFlBQUlBLFNBQVMsR0FBYixFQUFrQjtBQUNkVixvQkFBUUMsR0FBUixDQUFZLFdBQVo7QUFDQUcsdUJBQVcsWUFBTTtBQUNiRiwrQkFBS0csUUFBTCxDQUFjO0FBQ1ZDLHlCQUFLO0FBREssaUJBQWQ7QUFHSCxhQUpELEVBSUcsSUFKSDtBQUtILFNBUEQsTUFPTztBQUNITixvQkFBUUMsR0FBUixDQUFZLFdBQVo7QUFDQTtBQUNBQywyQkFBS0MsY0FBTCxDQUFvQixTQUFwQixFQUErQixHQUEvQjtBQUNIO0FBQ0o7QUE1Q1UsQyIsImZpbGUiOiJzY2VuZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAgIERvTG9naW4oZXh0cmFEYXRhKSB7XHJcbiAgICAgICAgY29uc3QgZXh0cmFEYXRhSlNPTiA9ICh0eXBlb2YgZXh0cmFEYXRhID09PSAnb2JqZWN0JykgPyB7IC4uLmV4dHJhRGF0YSB9IDogSlNPTi5wYXJzZShleHRyYURhdGEpO1xyXG4gICAgICAgIGlmIChleHRyYURhdGFKU09OLnBwdSAhPT0gdW5kZWZpbmVkKSB7IC8vIOWmguaenOiOt+WPlnBwdeaIkOWKn1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhg6I635Y+WUFBV5oiQ5Yqf77yBICR7ZXh0cmFEYXRhSlNPTi5wcHV9YCk7XHJcbiAgICAgICAgICAgIHdlcHkuc2V0U3RvcmFnZVN5bmMoJ3BwdScsIGV4dHJhRGF0YUpTT04ucHB1KTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB3ZXB5LnJlTGF1bmNoKHtcclxuICAgICAgICAgICAgICAgICAgICB1cmw6ICcvcGFnZXMvaG9tZScsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSwgMTAwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8vIOWQjOmVh+i3s+i9rOi/h+adpeWFiOi/m+WFpeWIsOmmlumhtemdou+8jOWIneWni+WMluW9k+WJjeWwj+eoi+W6j+WQjuWIsOaIkeeahOWwj+eoi+W6j+mhtemdolxyXG4gICAgRG9Ub015bXAoZXh0cmFEYXRhKSB7XHJcbiAgICAgICAgY29uc3QgZXh0cmFEYXRhSlNPTiA9ICh0eXBlb2YgZXh0cmFEYXRhID09PSAnb2JqZWN0JykgPyB7IC4uLmV4dHJhRGF0YSB9IDogSlNPTi5wYXJzZShleHRyYURhdGEpO1xyXG4gICAgICAgIGlmIChleHRyYURhdGFKU09OLnBwdSAhPT0gdW5kZWZpbmVkKSB7IC8vIOWmguaenOiOt+WPlnBwdeaIkOWKn1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhg6I635Y+WUFBV5oiQ5Yqf77yBICR7ZXh0cmFEYXRhSlNPTi5wcHV9YCk7XHJcbiAgICAgICAgICAgIHdlcHkuc2V0U3RvcmFnZVN5bmMoJ3BwdScsIGV4dHJhRGF0YUpTT04ucHB1KTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICAgICAgICAgIHVybDogJy9wYWdlcy9teU1wJyxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9LCAxMDAwKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgRG9PcGVuUGF5KGV4dHJhRGF0YSkge1xyXG4gICAgICAgIGlmICghZXh0cmFEYXRhKSByZXR1cm47XHJcbiAgICAgICAgY29uc3QgeyBjb2RlIH0gPSBleHRyYURhdGE7XHJcbiAgICAgICAgLy8g5byA6YCa5pSv5LuY5aSx6LSlXHJcbiAgICAgICAgLy8g6L+U5Zue5ZWG5a625Yqp5omL5bCP56iL5bqP6aaW6aG1XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2NvZGU6JywgY29kZSk7XHJcbiAgICAgICAgaWYgKGNvZGUgIT09ICcwJykge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnT3BlblBheToxJyk7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgd2VweS5yZUxhdW5jaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgdXJsOiAnL3BhZ2VzL2hvbWUnLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0sIDEwMDApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdPcGVuUGF5OjAnKTtcclxuICAgICAgICAgICAgLy8g5pSv5LuY5byA6YCa6aqM6K+B5oiQ5Yqf5ZCO77yM6LCD55So5ZCM5oSP5Y2P6K6u5o6l5Y+jXHJcbiAgICAgICAgICAgIHdlcHkuc2V0U3RvcmFnZVN5bmMoJ09wZW5QYXknLCAnMCcpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbn07XHJcbiJdfQ==