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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJwYWdlcyIsIndpbmRvdyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJ1c2UiLCJjb25zb2xlIiwibG9nIiwid2VweSIsInNldFN0b3JhZ2VTeW5jIiwib3B0aW9ucyIsInNjZW5lIiwicmVmZXJyZXJJbmZvIiwicGF0aCIsImFjdGlvbiIsImV4dHJhRGF0YSIsImFwcElkIiwiRG9NaW5pUHJvZ3JhbUJhY2siLCJjYWxsIiwiYXBwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUNBOzs7O0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7O0FBREE7Ozs7OztBQUlJLHNCQUFjO0FBQUE7O0FBQUE7O0FBQUEsY0FJZEEsTUFKYyxHQUlMO0FBQ0xDLG1CQUFPLENBQ0gsWUFERyxFQUNXO0FBQ2QseUJBRkcsRUFFWTtBQUNmLHdCQUhHLEVBR1c7QUFDZCwyQkFKRyxFQUljO0FBQ2pCLDhCQUxHLEVBS2lCO0FBQ3BCLHdCQU5HLEVBTVc7QUFDZCw0QkFQRyxFQU9lO0FBQ2xCLDJCQVJHLEVBUWM7QUFDakIsdUJBVEcsRUFTVTtBQUNiLHlCQVZHLEVBV0gsa0JBWEcsRUFXaUI7QUFDcEIsNEJBWkcsRUFZZTtBQUNsQixxQ0FiRyxFQWF3QjtBQUMzQixnQ0FkRyxFQWNtQjtBQUN0QixpQ0FmRyxFQWVvQjtBQUN2Qiw0QkFoQkcsRUFnQmU7QUFDbEIsa0NBakJHLEVBaUJxQjtBQUN4QixnQ0FsQkcsRUFrQm1CO0FBQ3RCLGlDQW5CRyxFQW1Cb0I7QUFDdkIscUNBcEJHLEVBb0J3QjtBQUMzQiw2QkFyQkcsRUFxQmdCO0FBQ25CLG1DQXRCRyxFQXNCc0I7QUFDekIscUNBdkJHLEVBdUJ3QjtBQUMzQiw2QkF4QkcsRUF3QmdCO0FBQ25CLCtCQXpCRyxFQXlCa0I7QUFDckIsMkJBMUJHLENBREY7QUE2QkxDLG9CQUFRO0FBQ0pDLHFDQUFxQixPQURqQjtBQUVKQyw4Q0FBOEIsTUFGMUI7QUFHSkMsd0NBQXdCLFFBSHBCO0FBSUpDLHdDQUF3QjtBQUpwQjtBQTdCSCxTQUpLOztBQUVWLGNBQUtDLEdBQUwsQ0FBUyxXQUFUO0FBRlU7QUFHYjs7OzttQ0FxQ1c7QUFDUkMsb0JBQVFDLEdBQVIsQ0FBWSxVQUFaO0FBQ0E7QUFDQUMsMkJBQUtDLGNBQUwsQ0FBb0IsS0FBcEIsRUFBMkIsMFBBQTNCO0FBQ0g7OzsrQkFDT0MsTyxFQUFTO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBM0JhLGdCQTRCTEMsS0E1QkssR0E0QnlCRCxPQTVCekIsQ0E0QkxDLEtBNUJLO0FBQUEsZ0JBNEJFQyxZQTVCRixHQTRCeUJGLE9BNUJ6QixDQTRCRUUsWUE1QkY7QUFBQSxnQkE0QmdCQyxJQTVCaEIsR0E0QnlCSCxPQTVCekIsQ0E0QmdCRyxJQTVCaEI7QUE2QmI7O0FBQ0EsZ0JBQUlDLFNBQVVGLGdCQUFnQkEsYUFBYUcsU0FBN0IsSUFBMENILGFBQWFHLFNBQWIsQ0FBdUJELE1BQWxFLElBQTZFLEVBQTFGO0FBQ0E7QUFDQSxnQkFBSUgsVUFBVSxJQUFWLElBQWtCRSxTQUFTLGFBQTNCLElBQTRDRCxhQUFhSSxLQUFiLEtBQXVCLG9CQUF2RSxFQUE2RjtBQUN6RkYseUJBQVMsT0FBVDtBQUNIO0FBQ0Q7QUFDQSxnQkFBSUgsVUFBVSxJQUFWLElBQWtCRyxNQUF0QixFQUE4QjtBQUMxQkcsdUNBQXVCSCxNQUF2QixFQUFpQ0ksSUFBakMsQ0FBc0MsSUFBdEMsRUFBNENOLGFBQWFHLFNBQXpEO0FBQ0g7QUFDSjs7OztFQXJGd0JQLGVBQUtXLEciLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbmltcG9ydCAnd2VweS1hc3luYy1mdW5jdGlvbic7XG4vLyBpbXBvcnQgeyBhbGVydCB9IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IERvTWluaVByb2dyYW1CYWNrIGZyb20gJy4vdXRpbHMvc2NlbmUnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIHdlcHkuYXBwIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy51c2UoJ3Byb21pc2lmeScpO1xuICAgIH1cbiAgICBjb25maWcgPSB7XG4gICAgICAgIHBhZ2VzOiBbXG4gICAgICAgICAgICAncGFnZXMvaG9tZScsIC8vIOeZu+mZhuS5i+WQjueahOS4u+mhtVxuICAgICAgICAgICAgJ3BhZ2VzL2ludHJvJywgLy8g5rKh5pyJ55m76ZmG55qE5LuL57uN6aG16Z2iXG4gICAgICAgICAgICAncGFnZXMvbXlNcCcsIC8vIOaIkeeahOWwj+eoi+W6j1xuICAgICAgICAgICAgJ3BhZ2VzL0FwcEluZm8nLCAvLyDlsI/nqIvluo/kv6Hmga9cbiAgICAgICAgICAgICdwYWdlcy9VcGxvYWRJbmZvJywgLy8g5LiK5Lyg57Sg5p2Q6aaW6aG1XG4gICAgICAgICAgICAncGFnZXMvc2VuZCcsIC8vIOa1i+ivleaOiOadg+mhtemdouS4k+eUqO+8jOWLv+WIoFxuICAgICAgICAgICAgJ3BhZ2VzL3Byb2dyZXNzJywgLy8g5a6M5oiQ5bqm6aG16Z2iXG4gICAgICAgICAgICAncGFnZXMvQXBwRWRpdCcsIC8vIOWwj+eoi+W6j+e8lui+kVxuICAgICAgICAgICAgJ3BhZ2VzL2J1eScsIC8vIOi0reS5sOmhtemdolxuICAgICAgICAgICAgJ3BhZ2VzL2luZGV4JyxcbiAgICAgICAgICAgICdwYWdlcy9ub3RpY2VMaXN0JywgLy8g5raI5oGv6YCa55+l6aG16Z2iXG4gICAgICAgICAgICAncGFnZXMvcmVnaXN0ZWQnLCAvLyDlvZPliY3lsI/nqIvluo/lt7Lms6jlhoxcbiAgICAgICAgICAgICdwYWdlcy9yZWdpc3RNYWluQWNjb3VudCcsIC8vIOS4u+S9k+i0puaIt+S/oeaBr1xuICAgICAgICAgICAgJ3BhZ2VzL3JlZ2lzdE1hbmFnZScsIC8vIOeuoeeQhuWRmOS/oeaBr1xuICAgICAgICAgICAgJ3BhZ2VzL3JlZ2lzdFN1Y2Nlc3MnLCAvLyDms6jlhozlrozmiJBcbiAgICAgICAgICAgICdwYWdlcy9mZWVkYmFjaycsIC8vIOaEj+ingeWPjemmiFxuICAgICAgICAgICAgJ3BhZ2VzL2ZlZWRiYWNrRGV0YWlsJywgLy8g5oSP6KeB5Y+N6aaI5LyY6YCJ44CB5b6u5L+h6Zeu6aKY5LuL57uNXG4gICAgICAgICAgICAncGFnZXMvUG9wUXVlc3Rpb25zJywgLy8g5oSP6KeB5Y+N6aaI5LyY6YCJ44CB5b6u5L+h6Zeu6aKY5LuL57uNXG4gICAgICAgICAgICAncGFnZXMvVXBsb2FkQXJ0aWNsZScsIC8vIOS4iuS8oOaWh+eroFxuICAgICAgICAgICAgJ3BhZ2VzL1VwbG9hZEluZm9TdWNjZXNzJywgLy8g57Sg5p2Q5LiK5Lyg5oiQ5YqfXG4gICAgICAgICAgICAncGFnZXMvVmlkZW9QbGF5JywgLy8g6KeG6aKR5pKt5pS+6aG16Z2iXG4gICAgICAgICAgICAncGFnZXMvb3JkZXJOb3RpY2VMaXN0JywgLy8g6K6i5Y2V5o+Q6YaS6aG16Z2iXG4gICAgICAgICAgICAncGFnZXMvYWNjb3VudE5vdGljZUxpc3QnLCAvLyDlhaXotKbmj5DphpLpobXpnaJcbiAgICAgICAgICAgICdwYWdlcy9PcmRlckxpc3QnLCAvLyDorqLljZXliJfooahcbiAgICAgICAgICAgICdwYWdlcy9PcmRlckRldGFpbCcsIC8vIOiuouWNleivpuaDhVxuICAgICAgICAgICAgJ3BhZ2VzL09wZW5QYXknLCAvLyDlvIDpgJrmlK/ku5hcbiAgICAgICAgXSxcbiAgICAgICAgd2luZG93OiB7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kVGV4dFN0eWxlOiAnbGlnaHQnLFxuICAgICAgICAgICAgbmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvcjogJyNmZmYnLFxuICAgICAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ1dlQ2hhdCcsXG4gICAgICAgICAgICBuYXZpZ2F0aW9uQmFyVGV4dFN0eWxlOiAnYmxhY2snLFxuICAgICAgICB9LFxuICAgIH1cbiAgICBvbkxhdW5jaCAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdvbmxhaW5jaCcpO1xuICAgICAgICAvLyDliJjlvLrotbfnmoRwcHUu5rWL6K+V5L2/55So77yM5LiK57q/6K6w5b6X5Yig6ZmkXG4gICAgICAgIHdlcHkuc2V0U3RvcmFnZVN5bmMoJ3BwdScsICdVSUQ9NDg5MTc4NjQyODY0NzkmVU49emYzZTg1JlRUPWQ4MTIwMmE2NWFmMDVhYThjYjFlYTVmNmQ5MjI1NGQxJlBCT0RZPUpoSF9OWTZhOG4yUHZXNlpnQnZfQjFDd3VJSkg4NG1ObnVKdDRQeGNwRVFEbDVRUHZiYTRJZG9NcENwa19HeHBFZlJ0YzlSUEF2cks2RzRvOUozemhLSG1WdjMzaUJES084RVZubVJxNnlwMkVUZ3N0Q0JJU3I5MDE2VEthbzJ5RHlVZVpHMzJ2dl8yeXV5RzAxdUFucVRsVUwxdmFScExKM2ZSZDlOcXlTQSZWRVI9MScpO1xuICAgIH1cbiAgICBvblNob3cgKG9wdGlvbnMpIHtcbiAgICAgICAgLy8gY29uc3QgeyBwYXRoIH0gPSBvcHRpb25zO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhwYXRoKTtcbiAgICAgICAgLy8gY29uc3QgcGFnZXMgPSBnZXRDdXJyZW50UGFnZXMoKTtcbiAgICAgICAgLy8gY29uc3QgY3VyclBhZ2UgPSBwYWdlc1twYWdlcy5sZW5ndGggLSAxXTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ2N1cnJQYWdlJywgY3VyclBhZ2Uucm91dGUpO1xuICAgICAgICAvLyBpZiAob3B0aW9ucy5zY2VuZSA9PT0gMTAzOCAmJiBwYXRoID09PSAncGFnZXMvaW50cm8nKSB7XG4gICAgICAgIC8vICAgICBpZiAoIW9wdGlvbnMucmVmZXJyZXJJbmZvKSB7XG4gICAgICAgIC8vICAgICAgICAgY29uc29sZS5sb2coJ29wdGlvbnMucmVmZXJyZXJJbmZv5Li656m6Jyk7XG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vICAgICBpZiAoIW9wdGlvbnMucmVmZXJyZXJJbmZvLmV4dHJhRGF0YSkge1xuICAgICAgICAvLyAgICAgICAgIGNvbnNvbGUubG9nKCdvcHRpb25zLnJlZmVycmVySW5mby5leHRyYURhdGHkuLrnqbonKTtcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gICAgIGxldCB7IGV4dHJhRGF0YSB9ID0gb3B0aW9ucy5yZWZlcnJlckluZm87XG4gICAgICAgIC8vICAgICBpZiAodHlwZW9mIGV4dHJhRGF0YSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgLy8gICAgICAgICBleHRyYURhdGEgPSBKU09OLnBhcnNlKGV4dHJhRGF0YSk7XG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vICAgICBpZiAoZXh0cmFEYXRhLnBwdSAhPT0gdW5kZWZpbmVkKSB7IC8vIOWmguaenOiOt+WPlnBwdeaIkOWKn1xuICAgICAgICAvLyAgICAgICAgIGNvbnNvbGUubG9nKGDojrflj5ZQUFXmiJDlip/vvIEgJHtleHRyYURhdGEucHB1fWApO1xuICAgICAgICAvLyAgICAgICAgIHdlcHkuc2V0U3RvcmFnZVN5bmMoJ3BwdScsIGV4dHJhRGF0YS5wcHUpO1xuICAgICAgICAvLyAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAvLyAgICAgICAgICAgICB3ZXB5LnJlTGF1bmNoKHtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIHVybDogJy9wYWdlcy9ob21lJyxcbiAgICAgICAgLy8gICAgICAgICAgICAgfSk7XG4gICAgICAgIC8vICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH1cbiAgICAgICAgLy8g6LWL5YC85Zy65pmv5YC844CBcmVmZXJyZXLkv6Hmga9cbiAgICAgICAgY29uc3QgeyBzY2VuZSwgcmVmZXJyZXJJbmZvLCBwYXRoIH0gPSBvcHRpb25zO1xuICAgICAgICAvLyBhY3Rpb246KOW/hemhuynot7PovazlsI/nqIvluo/ku7vliqHliqjkvZzmoIfor4ZcbiAgICAgICAgbGV0IGFjdGlvbiA9IChyZWZlcnJlckluZm8gJiYgcmVmZXJyZXJJbmZvLmV4dHJhRGF0YSAmJiByZWZlcnJlckluZm8uZXh0cmFEYXRhLmFjdGlvbikgfHwgJyc7XG4gICAgICAgIC8vIOeZu+mZhuW3sue7j+S4iue6v+S/neaMgeWOn+acieWIpOaWremAu+i+kVxuICAgICAgICBpZiAoc2NlbmUgPT09IDEwMzggJiYgcGF0aCA9PT0gJ3BhZ2VzL2ludHJvJyAmJiByZWZlcnJlckluZm8uYXBwSWQgPT09ICd3eDJhOWM2ZWViMWM0NGEyODQnKSB7XG4gICAgICAgICAgICBhY3Rpb24gPSAnTG9naW4nO1xuICAgICAgICB9XG4gICAgICAgIC8vIOWwj+eoi+W6j+i/lOWbnuWAvOWkhOeQhlxuICAgICAgICBpZiAoc2NlbmUgPT09IDEwMzggJiYgYWN0aW9uKSB7XG4gICAgICAgICAgICBEb01pbmlQcm9ncmFtQmFja1tgRG8ke2FjdGlvbn1gXS5jYWxsKHRoaXMsIHJlZmVycmVySW5mby5leHRyYURhdGEpO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19