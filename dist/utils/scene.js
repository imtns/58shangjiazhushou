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