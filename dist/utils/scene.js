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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjZW5lLmpzIl0sIm5hbWVzIjpbIkRvTG9naW4iLCJleHRyYURhdGEiLCJleHRyYURhdGFKU09OIiwiSlNPTiIsInBhcnNlIiwicHB1IiwidW5kZWZpbmVkIiwiY29uc29sZSIsImxvZyIsIndlcHkiLCJzZXRTdG9yYWdlU3luYyIsInNldFRpbWVvdXQiLCJyZUxhdW5jaCIsInVybCIsIkRvVG9NeW1wIiwibmF2aWdhdGVUbyIsIkRvT3BlblBheSIsImNvZGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7Ozs7O2tCQUdlO0FBQ1hBLFdBRFcsbUJBQ0hDLFNBREcsRUFDUTtBQUNmLFlBQU1DLGdCQUFpQixRQUFPRCxTQUFQLHlDQUFPQSxTQUFQLE9BQXFCLFFBQXRCLGdCQUF1Q0EsU0FBdkMsSUFBcURFLEtBQUtDLEtBQUwsQ0FBV0gsU0FBWCxDQUEzRTtBQUNBLFlBQUlDLGNBQWNHLEdBQWQsS0FBc0JDLFNBQTFCLEVBQXFDO0FBQUU7QUFDbkNDLG9CQUFRQyxHQUFSLHdDQUF3Qk4sY0FBY0csR0FBdEM7QUFDQUksMkJBQUtDLGNBQUwsQ0FBb0IsS0FBcEIsRUFBMkJSLGNBQWNHLEdBQXpDO0FBQ0FNLHVCQUFXLFlBQU07QUFDYkYsK0JBQUtHLFFBQUwsQ0FBYztBQUNWQyx5QkFBSztBQURLLGlCQUFkO0FBR0gsYUFKRCxFQUlHLElBSkg7QUFLSDtBQUNKLEtBWlU7O0FBYVg7QUFDQUMsWUFkVyxvQkFjRmIsU0FkRSxFQWNTO0FBQ2hCLFlBQU1DLGdCQUFpQixRQUFPRCxTQUFQLHlDQUFPQSxTQUFQLE9BQXFCLFFBQXRCLGdCQUF1Q0EsU0FBdkMsSUFBcURFLEtBQUtDLEtBQUwsQ0FBV0gsU0FBWCxDQUEzRTtBQUNBLFlBQUlDLGNBQWNHLEdBQWQsS0FBc0JDLFNBQTFCLEVBQXFDO0FBQUU7QUFDbkNDLG9CQUFRQyxHQUFSLHdDQUF3Qk4sY0FBY0csR0FBdEM7QUFDQUksMkJBQUtDLGNBQUwsQ0FBb0IsS0FBcEIsRUFBMkJSLGNBQWNHLEdBQXpDO0FBQ0FNLHVCQUFXLFlBQU07QUFDYkYsK0JBQUtNLFVBQUwsQ0FBZ0I7QUFDWkYseUJBQUs7QUFETyxpQkFBaEI7QUFHSCxhQUpELEVBSUcsSUFKSDtBQUtIO0FBQ0osS0F6QlU7QUEwQlhHLGFBMUJXLHFCQTBCRGYsU0ExQkMsRUEwQlU7QUFDakIsWUFBSSxDQUFDQSxTQUFMLEVBQWdCO0FBREMsWUFFVGdCLElBRlMsR0FFQWhCLFNBRkEsQ0FFVGdCLElBRlM7QUFHakI7QUFDQTs7QUFDQVYsZ0JBQVFDLEdBQVIsQ0FBWSxPQUFaLEVBQXFCUyxJQUFyQjtBQUNBLFlBQUlBLFNBQVMsR0FBYixFQUFrQjtBQUNkVixvQkFBUUMsR0FBUixDQUFZLFdBQVo7QUFDQUcsdUJBQVcsWUFBTTtBQUNiRiwrQkFBS0csUUFBTCxDQUFjO0FBQ1ZDLHlCQUFLO0FBREssaUJBQWQ7QUFHSCxhQUpELEVBSUcsSUFKSDtBQUtILFNBUEQsTUFPTztBQUNITixvQkFBUUMsR0FBUixDQUFZLFdBQVo7QUFDQTtBQUNBQywyQkFBS0MsY0FBTCxDQUFvQixTQUFwQixFQUErQixHQUEvQjtBQUNIO0FBQ0o7QUE1Q1UsQyIsImZpbGUiOiJzY2VuZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBEb0xvZ2luKGV4dHJhRGF0YSkge1xuICAgICAgICBjb25zdCBleHRyYURhdGFKU09OID0gKHR5cGVvZiBleHRyYURhdGEgPT09ICdvYmplY3QnKSA/IHsgLi4uZXh0cmFEYXRhIH0gOiBKU09OLnBhcnNlKGV4dHJhRGF0YSk7XG4gICAgICAgIGlmIChleHRyYURhdGFKU09OLnBwdSAhPT0gdW5kZWZpbmVkKSB7IC8vIOWmguaenOiOt+WPlnBwdeaIkOWKn1xuICAgICAgICAgICAgY29uc29sZS5sb2coYOiOt+WPllBQVeaIkOWKn++8gSAke2V4dHJhRGF0YUpTT04ucHB1fWApO1xuICAgICAgICAgICAgd2VweS5zZXRTdG9yYWdlU3luYygncHB1JywgZXh0cmFEYXRhSlNPTi5wcHUpO1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgd2VweS5yZUxhdW5jaCh7XG4gICAgICAgICAgICAgICAgICAgIHVybDogJy9wYWdlcy9ob21lJyxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICB9XG4gICAgfSxcbiAgICAvLyDlkIzplYfot7Povazov4fmnaXlhYjov5vlhaXliLDpppbpobXpnaLvvIzliJ3lp4vljJblvZPliY3lsI/nqIvluo/lkI7liLDmiJHnmoTlsI/nqIvluo/pobXpnaJcbiAgICBEb1RvTXltcChleHRyYURhdGEpIHtcbiAgICAgICAgY29uc3QgZXh0cmFEYXRhSlNPTiA9ICh0eXBlb2YgZXh0cmFEYXRhID09PSAnb2JqZWN0JykgPyB7IC4uLmV4dHJhRGF0YSB9IDogSlNPTi5wYXJzZShleHRyYURhdGEpO1xuICAgICAgICBpZiAoZXh0cmFEYXRhSlNPTi5wcHUgIT09IHVuZGVmaW5lZCkgeyAvLyDlpoLmnpzojrflj5ZwcHXmiJDlip9cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGDojrflj5ZQUFXmiJDlip/vvIEgJHtleHRyYURhdGFKU09OLnBwdX1gKTtcbiAgICAgICAgICAgIHdlcHkuc2V0U3RvcmFnZVN5bmMoJ3BwdScsIGV4dHJhRGF0YUpTT04ucHB1KTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICAgICAgICAgIHVybDogJy9wYWdlcy9teU1wJyxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBEb09wZW5QYXkoZXh0cmFEYXRhKSB7XG4gICAgICAgIGlmICghZXh0cmFEYXRhKSByZXR1cm47XG4gICAgICAgIGNvbnN0IHsgY29kZSB9ID0gZXh0cmFEYXRhO1xuICAgICAgICAvLyDlvIDpgJrmlK/ku5jlpLHotKVcbiAgICAgICAgLy8g6L+U5Zue5ZWG5a625Yqp5omL5bCP56iL5bqP6aaW6aG1XG4gICAgICAgIGNvbnNvbGUubG9nKCdjb2RlOicsIGNvZGUpO1xuICAgICAgICBpZiAoY29kZSAhPT0gJzAnKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnT3BlblBheToxJyk7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB3ZXB5LnJlTGF1bmNoKHtcbiAgICAgICAgICAgICAgICAgICAgdXJsOiAnL3BhZ2VzL2hvbWUnLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnT3BlblBheTowJyk7XG4gICAgICAgICAgICAvLyDmlK/ku5jlvIDpgJrpqozor4HmiJDlip/lkI7vvIzosIPnlKjlkIzmhI/ljY/orq7mjqXlj6NcbiAgICAgICAgICAgIHdlcHkuc2V0U3RvcmFnZVN5bmMoJ09wZW5QYXknLCAnMCcpO1xuICAgICAgICB9XG4gICAgfSxcbn07XG4iXX0=