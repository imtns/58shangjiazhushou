'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

require('./npm/wepy-async-function/index.js');

var _scene = require('./utils/scene.js');

var _scene2 = _interopRequireDefault(_scene);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import { alert } from './utils';


var _class = function (_wepy$app) {
    _inherits(_class, _wepy$app);

    function _class() {
        _classCallCheck(this, _class);

        var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this));

        _this.config = {
            pages: ['pages/home', // 登陆之后的主页
            'pages/intro', // 没有登陆的介绍页面
            'pages/myMp', // 我的小程序
            'pages/AppInfo', // 小程序信息
            'pages/UploadInfo', // 上传素材首页
            'pages/send', // 测试授权页面专用，勿删
            'pages/progress', // 完成度页面
            'pages/AppEdit', // 小程序编辑
            'pages/buy', // 购买页面
            'pages/index', 'pages/noticeList', // 消息通知页面
            'pages/registed', // 当前小程序已注册
            'pages/registMainAccount', // 主体账户信息
            'pages/registManage', // 管理员信息
            'pages/registSuccess', // 注册完成
            'pages/feedback', // 意见反馈
            'pages/feedbackDetail', // 意见反馈优选、微信问题介绍
            'pages/PopQuestions', // 意见反馈优选、微信问题介绍
            'pages/UploadArticle', // 上传文章
            'pages/UploadInfoSuccess', // 素材上传成功
            'pages/VideoPlay', // 视频播放页面
            'pages/orderNoticeList', // 订单提醒页面
            'pages/accountNoticeList', // 入账提醒页面
            'pages/OrderList', // 订单列表
            'pages/OrderDetail', // 订单详情
            'pages/OpenPay'],
            window: {
                backgroundTextStyle: 'light',
                navigationBarBackgroundColor: '#fff',
                navigationBarTitleText: 'WeChat',
                navigationBarTextStyle: 'black'
            }
        };

        _this.use('promisify');
        return _this;
    }

    _createClass(_class, [{
        key: 'onLaunch',
        value: function onLaunch() {
            console.log('onlainch');
            // 刘强起的ppu.测试使用，上线记得删除
            _wepy2.default.setStorageSync('ppu', 'UID=48917864286479&UN=zf3e85&TT=d81202a65af05aa8cb1ea5f6d92254d1&PBODY=JhH_NY6a8n2PvW6ZgBv_B1CwuIJH84mNnuJt4PxcpEQDl5QPvba4IdoMpCpk_GxpEfRtc9RPAvrK6G4o9J3zhKHmVv33iBDKO8EVnmRq6yp2ETgstCBISr9016TKao2yDyUeZG32vv_2yuyG01uAnqTlUL1vaRpLJ3fRd9NqySA&VER=1');
        }
    }, {
        key: 'onShow',
        value: function onShow(options) {
            // const { path } = options;
            // console.log(path);
            // const pages = getCurrentPages();
            // const currPage = pages[pages.length - 1];
            // console.log('currPage', currPage.route);
            // if (options.scene === 1038 && path === 'pages/intro') {
            //     if (!options.referrerInfo) {
            //         console.log('options.referrerInfo为空');
            //     }
            //     if (!options.referrerInfo.extraData) {
            //         console.log('options.referrerInfo.extraData为空');
            //     }
            //     let { extraData } = options.referrerInfo;
            //     if (typeof extraData !== 'object') {
            //         extraData = JSON.parse(extraData);
            //     }
            //     if (extraData.ppu !== undefined) { // 如果获取ppu成功
            //         console.log(`获取PPU成功！ ${extraData.ppu}`);
            //         wepy.setStorageSync('ppu', extraData.ppu);
            //         setTimeout(() => {
            //             wepy.reLaunch({
            //                 url: '/pages/home',
            //             });
            //         }, 1000);
            //     }
            // }
            // 赋值场景值、referrer信息
            var scene = options.scene,
                referrerInfo = options.referrerInfo,
                path = options.path;
            // action:(必须)跳转小程序任务动作标识

            var action = referrerInfo && referrerInfo.extraData && referrerInfo.extraData.action || '';
            // 登陆已经上线保持原有判断逻辑
            if (scene === 1038 && path === 'pages/intro' && referrerInfo.appId === 'wx2a9c6eeb1c44a284') {
                action = 'Login';
            }
            // 小程序返回值处理
            if (scene === 1038 && action) {
                _scene2.default['Do' + action].call(this, referrerInfo.extraData);
            }
        }
    }]);

    return _class;
}(_wepy2.default.app);


App(require('./npm/wepy/lib/wepy.js').default.$createApp(_class, {"noPromiseAPI":["createSelectorQuery"]}));
require('./_wepylogs.js')

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJwYWdlcyIsIndpbmRvdyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJ1c2UiLCJjb25zb2xlIiwibG9nIiwid2VweSIsInNldFN0b3JhZ2VTeW5jIiwib3B0aW9ucyIsInNjZW5lIiwicmVmZXJyZXJJbmZvIiwicGF0aCIsImFjdGlvbiIsImV4dHJhRGF0YSIsImFwcElkIiwiRG9NaW5pUHJvZ3JhbUJhY2siLCJjYWxsIiwiYXBwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUNBOzs7O0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7O0FBREE7Ozs7OztBQUlJLHNCQUFjO0FBQUE7O0FBQUE7O0FBQUEsY0FJZEEsTUFKYyxHQUlMO0FBQ0xDLG1CQUFPLENBQ0gsWUFERyxFQUNXO0FBQ2QseUJBRkcsRUFFWTtBQUNmLHdCQUhHLEVBR1c7QUFDZCwyQkFKRyxFQUljO0FBQ2pCLDhCQUxHLEVBS2lCO0FBQ3BCLHdCQU5HLEVBTVc7QUFDZCw0QkFQRyxFQU9lO0FBQ2xCLDJCQVJHLEVBUWM7QUFDakIsdUJBVEcsRUFTVTtBQUNiLHlCQVZHLEVBV0gsa0JBWEcsRUFXaUI7QUFDcEIsNEJBWkcsRUFZZTtBQUNsQixxQ0FiRyxFQWF3QjtBQUMzQixnQ0FkRyxFQWNtQjtBQUN0QixpQ0FmRyxFQWVvQjtBQUN2Qiw0QkFoQkcsRUFnQmU7QUFDbEIsa0NBakJHLEVBaUJxQjtBQUN4QixnQ0FsQkcsRUFrQm1CO0FBQ3RCLGlDQW5CRyxFQW1Cb0I7QUFDdkIscUNBcEJHLEVBb0J3QjtBQUMzQiw2QkFyQkcsRUFxQmdCO0FBQ25CLG1DQXRCRyxFQXNCc0I7QUFDekIscUNBdkJHLEVBdUJ3QjtBQUMzQiw2QkF4QkcsRUF3QmdCO0FBQ25CLCtCQXpCRyxFQXlCa0I7QUFDckIsMkJBMUJHLENBREY7QUE2QkxDLG9CQUFRO0FBQ0pDLHFDQUFxQixPQURqQjtBQUVKQyw4Q0FBOEIsTUFGMUI7QUFHSkMsd0NBQXdCLFFBSHBCO0FBSUpDLHdDQUF3QjtBQUpwQjtBQTdCSCxTQUpLOztBQUVWLGNBQUtDLEdBQUwsQ0FBUyxXQUFUO0FBRlU7QUFHYjs7OzttQ0FxQ1c7QUFDUkMsb0JBQVFDLEdBQVIsQ0FBWSxVQUFaO0FBQ0E7QUFDQUMsMkJBQUtDLGNBQUwsQ0FBb0IsS0FBcEIsRUFBMkIsMFBBQTNCO0FBQ0g7OzsrQkFDT0MsTyxFQUFTO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBM0JhLGdCQTRCTEMsS0E1QkssR0E0QnlCRCxPQTVCekIsQ0E0QkxDLEtBNUJLO0FBQUEsZ0JBNEJFQyxZQTVCRixHQTRCeUJGLE9BNUJ6QixDQTRCRUUsWUE1QkY7QUFBQSxnQkE0QmdCQyxJQTVCaEIsR0E0QnlCSCxPQTVCekIsQ0E0QmdCRyxJQTVCaEI7QUE2QmI7O0FBQ0EsZ0JBQUlDLFNBQVVGLGdCQUFnQkEsYUFBYUcsU0FBN0IsSUFBMENILGFBQWFHLFNBQWIsQ0FBdUJELE1BQWxFLElBQTZFLEVBQTFGO0FBQ0E7QUFDQSxnQkFBSUgsVUFBVSxJQUFWLElBQWtCRSxTQUFTLGFBQTNCLElBQTRDRCxhQUFhSSxLQUFiLEtBQXVCLG9CQUF2RSxFQUE2RjtBQUN6RkYseUJBQVMsT0FBVDtBQUNIO0FBQ0Q7QUFDQSxnQkFBSUgsVUFBVSxJQUFWLElBQWtCRyxNQUF0QixFQUE4QjtBQUMxQkcsdUNBQXVCSCxNQUF2QixFQUFpQ0ksSUFBakMsQ0FBc0MsSUFBdEMsRUFBNENOLGFBQWFHLFNBQXpEO0FBQ0g7QUFDSjs7OztFQXJGd0JQLGVBQUtXLEciLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xyXG5pbXBvcnQgJ3dlcHktYXN5bmMtZnVuY3Rpb24nO1xyXG4vLyBpbXBvcnQgeyBhbGVydCB9IGZyb20gJy4vdXRpbHMnO1xyXG5pbXBvcnQgRG9NaW5pUHJvZ3JhbUJhY2sgZnJvbSAnLi91dGlscy9zY2VuZSc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIHdlcHkuYXBwIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy51c2UoJ3Byb21pc2lmeScpO1xyXG4gICAgfVxyXG4gICAgY29uZmlnID0ge1xyXG4gICAgICAgIHBhZ2VzOiBbXHJcbiAgICAgICAgICAgICdwYWdlcy9ob21lJywgLy8g55m76ZmG5LmL5ZCO55qE5Li76aG1XHJcbiAgICAgICAgICAgICdwYWdlcy9pbnRybycsIC8vIOayoeacieeZu+mZhueahOS7i+e7jemhtemdolxyXG4gICAgICAgICAgICAncGFnZXMvbXlNcCcsIC8vIOaIkeeahOWwj+eoi+W6j1xyXG4gICAgICAgICAgICAncGFnZXMvQXBwSW5mbycsIC8vIOWwj+eoi+W6j+S/oeaBr1xyXG4gICAgICAgICAgICAncGFnZXMvVXBsb2FkSW5mbycsIC8vIOS4iuS8oOe0oOadkOmmlumhtVxyXG4gICAgICAgICAgICAncGFnZXMvc2VuZCcsIC8vIOa1i+ivleaOiOadg+mhtemdouS4k+eUqO+8jOWLv+WIoFxyXG4gICAgICAgICAgICAncGFnZXMvcHJvZ3Jlc3MnLCAvLyDlrozmiJDluqbpobXpnaJcclxuICAgICAgICAgICAgJ3BhZ2VzL0FwcEVkaXQnLCAvLyDlsI/nqIvluo/nvJbovpFcclxuICAgICAgICAgICAgJ3BhZ2VzL2J1eScsIC8vIOi0reS5sOmhtemdolxyXG4gICAgICAgICAgICAncGFnZXMvaW5kZXgnLFxyXG4gICAgICAgICAgICAncGFnZXMvbm90aWNlTGlzdCcsIC8vIOa2iOaBr+mAmuefpemhtemdolxyXG4gICAgICAgICAgICAncGFnZXMvcmVnaXN0ZWQnLCAvLyDlvZPliY3lsI/nqIvluo/lt7Lms6jlhoxcclxuICAgICAgICAgICAgJ3BhZ2VzL3JlZ2lzdE1haW5BY2NvdW50JywgLy8g5Li75L2T6LSm5oi35L+h5oGvXHJcbiAgICAgICAgICAgICdwYWdlcy9yZWdpc3RNYW5hZ2UnLCAvLyDnrqHnkIblkZjkv6Hmga9cclxuICAgICAgICAgICAgJ3BhZ2VzL3JlZ2lzdFN1Y2Nlc3MnLCAvLyDms6jlhozlrozmiJBcclxuICAgICAgICAgICAgJ3BhZ2VzL2ZlZWRiYWNrJywgLy8g5oSP6KeB5Y+N6aaIXHJcbiAgICAgICAgICAgICdwYWdlcy9mZWVkYmFja0RldGFpbCcsIC8vIOaEj+ingeWPjemmiOS8mOmAieOAgeW+ruS/oemXrumimOS7i+e7jVxyXG4gICAgICAgICAgICAncGFnZXMvUG9wUXVlc3Rpb25zJywgLy8g5oSP6KeB5Y+N6aaI5LyY6YCJ44CB5b6u5L+h6Zeu6aKY5LuL57uNXHJcbiAgICAgICAgICAgICdwYWdlcy9VcGxvYWRBcnRpY2xlJywgLy8g5LiK5Lyg5paH56ugXHJcbiAgICAgICAgICAgICdwYWdlcy9VcGxvYWRJbmZvU3VjY2VzcycsIC8vIOe0oOadkOS4iuS8oOaIkOWKn1xyXG4gICAgICAgICAgICAncGFnZXMvVmlkZW9QbGF5JywgLy8g6KeG6aKR5pKt5pS+6aG16Z2iXHJcbiAgICAgICAgICAgICdwYWdlcy9vcmRlck5vdGljZUxpc3QnLCAvLyDorqLljZXmj5DphpLpobXpnaJcclxuICAgICAgICAgICAgJ3BhZ2VzL2FjY291bnROb3RpY2VMaXN0JywgLy8g5YWl6LSm5o+Q6YaS6aG16Z2iXHJcbiAgICAgICAgICAgICdwYWdlcy9PcmRlckxpc3QnLCAvLyDorqLljZXliJfooahcclxuICAgICAgICAgICAgJ3BhZ2VzL09yZGVyRGV0YWlsJywgLy8g6K6i5Y2V6K+m5oOFXHJcbiAgICAgICAgICAgICdwYWdlcy9PcGVuUGF5JywgLy8g5byA6YCa5pSv5LuYXHJcbiAgICAgICAgXSxcclxuICAgICAgICB3aW5kb3c6IHtcclxuICAgICAgICAgICAgYmFja2dyb3VuZFRleHRTdHlsZTogJ2xpZ2h0JyxcclxuICAgICAgICAgICAgbmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvcjogJyNmZmYnLFxyXG4gICAgICAgICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAnV2VDaGF0JyxcclxuICAgICAgICAgICAgbmF2aWdhdGlvbkJhclRleHRTdHlsZTogJ2JsYWNrJyxcclxuICAgICAgICB9LFxyXG4gICAgfVxyXG4gICAgb25MYXVuY2ggKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdvbmxhaW5jaCcpO1xyXG4gICAgICAgIC8vIOWImOW8uui1t+eahHBwdS7mtYvor5Xkvb/nlKjvvIzkuIrnur/orrDlvpfliKDpmaRcclxuICAgICAgICB3ZXB5LnNldFN0b3JhZ2VTeW5jKCdwcHUnLCAnVUlEPTQ4OTE3ODY0Mjg2NDc5JlVOPXpmM2U4NSZUVD1kODEyMDJhNjVhZjA1YWE4Y2IxZWE1ZjZkOTIyNTRkMSZQQk9EWT1KaEhfTlk2YThuMlB2VzZaZ0J2X0IxQ3d1SUpIODRtTm51SnQ0UHhjcEVRRGw1UVB2YmE0SWRvTXBDcGtfR3hwRWZSdGM5UlBBdnJLNkc0bzlKM3poS0htVnYzM2lCREtPOEVWbm1ScTZ5cDJFVGdzdENCSVNyOTAxNlRLYW8yeUR5VWVaRzMydnZfMnl1eUcwMXVBbnFUbFVMMXZhUnBMSjNmUmQ5TnF5U0EmVkVSPTEnKTtcclxuICAgIH1cclxuICAgIG9uU2hvdyAob3B0aW9ucykge1xyXG4gICAgICAgIC8vIGNvbnN0IHsgcGF0aCB9ID0gb3B0aW9ucztcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhwYXRoKTtcclxuICAgICAgICAvLyBjb25zdCBwYWdlcyA9IGdldEN1cnJlbnRQYWdlcygpO1xyXG4gICAgICAgIC8vIGNvbnN0IGN1cnJQYWdlID0gcGFnZXNbcGFnZXMubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ2N1cnJQYWdlJywgY3VyclBhZ2Uucm91dGUpO1xyXG4gICAgICAgIC8vIGlmIChvcHRpb25zLnNjZW5lID09PSAxMDM4ICYmIHBhdGggPT09ICdwYWdlcy9pbnRybycpIHtcclxuICAgICAgICAvLyAgICAgaWYgKCFvcHRpb25zLnJlZmVycmVySW5mbykge1xyXG4gICAgICAgIC8vICAgICAgICAgY29uc29sZS5sb2coJ29wdGlvbnMucmVmZXJyZXJJbmZv5Li656m6Jyk7XHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyAgICAgaWYgKCFvcHRpb25zLnJlZmVycmVySW5mby5leHRyYURhdGEpIHtcclxuICAgICAgICAvLyAgICAgICAgIGNvbnNvbGUubG9nKCdvcHRpb25zLnJlZmVycmVySW5mby5leHRyYURhdGHkuLrnqbonKTtcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vICAgICBsZXQgeyBleHRyYURhdGEgfSA9IG9wdGlvbnMucmVmZXJyZXJJbmZvO1xyXG4gICAgICAgIC8vICAgICBpZiAodHlwZW9mIGV4dHJhRGF0YSAhPT0gJ29iamVjdCcpIHtcclxuICAgICAgICAvLyAgICAgICAgIGV4dHJhRGF0YSA9IEpTT04ucGFyc2UoZXh0cmFEYXRhKTtcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vICAgICBpZiAoZXh0cmFEYXRhLnBwdSAhPT0gdW5kZWZpbmVkKSB7IC8vIOWmguaenOiOt+WPlnBwdeaIkOWKn1xyXG4gICAgICAgIC8vICAgICAgICAgY29uc29sZS5sb2coYOiOt+WPllBQVeaIkOWKn++8gSAke2V4dHJhRGF0YS5wcHV9YCk7XHJcbiAgICAgICAgLy8gICAgICAgICB3ZXB5LnNldFN0b3JhZ2VTeW5jKCdwcHUnLCBleHRyYURhdGEucHB1KTtcclxuICAgICAgICAvLyAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIHdlcHkucmVMYXVuY2goe1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICB1cmw6ICcvcGFnZXMvaG9tZScsXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gICAgICAgICB9LCAxMDAwKTtcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvLyDotYvlgLzlnLrmma/lgLzjgIFyZWZlcnJlcuS/oeaBr1xyXG4gICAgICAgIGNvbnN0IHsgc2NlbmUsIHJlZmVycmVySW5mbywgcGF0aCB9ID0gb3B0aW9ucztcclxuICAgICAgICAvLyBhY3Rpb246KOW/hemhuynot7PovazlsI/nqIvluo/ku7vliqHliqjkvZzmoIfor4ZcclxuICAgICAgICBsZXQgYWN0aW9uID0gKHJlZmVycmVySW5mbyAmJiByZWZlcnJlckluZm8uZXh0cmFEYXRhICYmIHJlZmVycmVySW5mby5leHRyYURhdGEuYWN0aW9uKSB8fCAnJztcclxuICAgICAgICAvLyDnmbvpmYblt7Lnu4/kuIrnur/kv53mjIHljp/mnInliKTmlq3pgLvovpFcclxuICAgICAgICBpZiAoc2NlbmUgPT09IDEwMzggJiYgcGF0aCA9PT0gJ3BhZ2VzL2ludHJvJyAmJiByZWZlcnJlckluZm8uYXBwSWQgPT09ICd3eDJhOWM2ZWViMWM0NGEyODQnKSB7XHJcbiAgICAgICAgICAgIGFjdGlvbiA9ICdMb2dpbic7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIOWwj+eoi+W6j+i/lOWbnuWAvOWkhOeQhlxyXG4gICAgICAgIGlmIChzY2VuZSA9PT0gMTAzOCAmJiBhY3Rpb24pIHtcclxuICAgICAgICAgICAgRG9NaW5pUHJvZ3JhbUJhY2tbYERvJHthY3Rpb259YF0uY2FsbCh0aGlzLCByZWZlcnJlckluZm8uZXh0cmFEYXRhKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19