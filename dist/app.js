'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

require('./npm/wepy-async-function/index.js');

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
        }
    }, {
        key: 'onShow',
        value: function onShow(options) {
            var path = options.path;

            console.log(path);
            // const pages = getCurrentPages();
            // const currPage = pages[pages.length - 1];
            // console.log('currPage', currPage.route);
            if (options.scene === 1038 && path === 'pages/intro') {
                if (!options.referrerInfo) {
                    console.log('options.referrerInfo为空');
                }
                if (!options.referrerInfo.extraData) {
                    console.log('options.referrerInfo.extraData为空');
                }
                var extraData = options.referrerInfo.extraData;

                if ((typeof extraData === 'undefined' ? 'undefined' : _typeof(extraData)) !== 'object') {
                    extraData = JSON.parse(extraData);
                }
                if (extraData.ppu !== undefined) {
                    // 如果获取ppu成功
                    console.log('\u83B7\u53D6PPU\u6210\u529F\uFF01 ' + extraData.ppu);
                    _wepy2.default.setStorageSync('ppu', extraData.ppu);
                    setTimeout(function () {
                        _wepy2.default.reLaunch({
                            url: '/pages/home'
                        });
                    }, 1000);
                }
            }
        }
    }]);

    return _class;
}(_wepy2.default.app);


App(require('./npm/wepy/lib/wepy.js').default.$createApp(_class, {"noPromiseAPI":["createSelectorQuery"]}));
require('./_wepylogs.js')

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJwYWdlcyIsIndpbmRvdyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJ1c2UiLCJjb25zb2xlIiwibG9nIiwib3B0aW9ucyIsInBhdGgiLCJzY2VuZSIsInJlZmVycmVySW5mbyIsImV4dHJhRGF0YSIsIkpTT04iLCJwYXJzZSIsInBwdSIsInVuZGVmaW5lZCIsIndlcHkiLCJzZXRTdG9yYWdlU3luYyIsInNldFRpbWVvdXQiLCJyZUxhdW5jaCIsInVybCIsImFwcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7QUFDQTs7Ozs7QUFHSSxzQkFBYztBQUFBOztBQUFBOztBQUFBLGNBSWRBLE1BSmMsR0FJTDtBQUNMQyxtQkFBTyxDQUNILFlBREcsRUFDVztBQUNkLHlCQUZHLEVBRVk7QUFDZix3QkFIRyxFQUdXO0FBQ2QsMkJBSkcsRUFJYztBQUNqQiw4QkFMRyxFQUtpQjtBQUNwQix3QkFORyxFQU1XO0FBQ2QsNEJBUEcsRUFPZTtBQUNsQiwyQkFSRyxFQVFjO0FBQ2pCLHVCQVRHLEVBU1U7QUFDYix5QkFWRyxFQVdILGtCQVhHLEVBV2lCO0FBQ3BCLDRCQVpHLEVBWWU7QUFDbEIscUNBYkcsRUFhd0I7QUFDM0IsZ0NBZEcsRUFjbUI7QUFDdEIsaUNBZkcsRUFlb0I7QUFDdkIsNEJBaEJHLEVBZ0JlO0FBQ2xCLGtDQWpCRyxFQWlCcUI7QUFDeEIsZ0NBbEJHLEVBa0JtQjtBQUN0QixpQ0FuQkcsRUFtQm9CO0FBQ3ZCLHFDQXBCRyxFQW9Cd0I7QUFDM0IsNkJBckJHLEVBcUJnQjtBQUNuQixtQ0F0QkcsRUFzQnNCO0FBQ3pCLHFDQXZCRyxFQXVCd0I7QUFDM0IsNkJBeEJHLEVBd0JnQjtBQUNuQiwrQkF6QkcsRUF5QmtCO0FBQ3JCLDJCQTFCRyxDQURGO0FBNkJMQyxvQkFBUTtBQUNKQyxxQ0FBcUIsT0FEakI7QUFFSkMsOENBQThCLE1BRjFCO0FBR0pDLHdDQUF3QixRQUhwQjtBQUlKQyx3Q0FBd0I7QUFKcEI7QUE3QkgsU0FKSzs7QUFFVixjQUFLQyxHQUFMLENBQVMsV0FBVDtBQUZVO0FBR2I7Ozs7bUNBcUNXO0FBQ1JDLG9CQUFRQyxHQUFSLENBQVksVUFBWjtBQUNIOzs7K0JBQ09DLE8sRUFBUztBQUFBLGdCQUNMQyxJQURLLEdBQ0lELE9BREosQ0FDTEMsSUFESzs7QUFFYkgsb0JBQVFDLEdBQVIsQ0FBWUUsSUFBWjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFJRCxRQUFRRSxLQUFSLEtBQWtCLElBQWxCLElBQTBCRCxTQUFTLGFBQXZDLEVBQXNEO0FBQ2xELG9CQUFJLENBQUNELFFBQVFHLFlBQWIsRUFBMkI7QUFDdkJMLDRCQUFRQyxHQUFSLENBQVksd0JBQVo7QUFDSDtBQUNELG9CQUFJLENBQUNDLFFBQVFHLFlBQVIsQ0FBcUJDLFNBQTFCLEVBQXFDO0FBQ2pDTiw0QkFBUUMsR0FBUixDQUFZLGtDQUFaO0FBQ0g7QUFOaUQsb0JBTzVDSyxTQVA0QyxHQU85QkosUUFBUUcsWUFQc0IsQ0FPNUNDLFNBUDRDOztBQVFsRCxvQkFBSSxRQUFPQSxTQUFQLHlDQUFPQSxTQUFQLE9BQXFCLFFBQXpCLEVBQW1DO0FBQy9CQSxnQ0FBWUMsS0FBS0MsS0FBTCxDQUFXRixTQUFYLENBQVo7QUFDSDtBQUNELG9CQUFJQSxVQUFVRyxHQUFWLEtBQWtCQyxTQUF0QixFQUFpQztBQUFFO0FBQy9CViw0QkFBUUMsR0FBUix3Q0FBd0JLLFVBQVVHLEdBQWxDO0FBQ0FFLG1DQUFLQyxjQUFMLENBQW9CLEtBQXBCLEVBQTJCTixVQUFVRyxHQUFyQztBQUNBSSwrQkFBVyxZQUFNO0FBQ2JGLHVDQUFLRyxRQUFMLENBQWM7QUFDVkMsaUNBQUs7QUFESyx5QkFBZDtBQUdILHFCQUpELEVBSUcsSUFKSDtBQUtIO0FBQ0o7QUFDSjs7OztFQXZFd0JKLGVBQUtLLEciLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xyXG5pbXBvcnQgJ3dlcHktYXN5bmMtZnVuY3Rpb24nO1xyXG4vLyBpbXBvcnQgeyBhbGVydCB9IGZyb20gJy4vdXRpbHMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyB3ZXB5LmFwcCB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMudXNlKCdwcm9taXNpZnknKTtcclxuICAgIH1cclxuICAgIGNvbmZpZyA9IHtcclxuICAgICAgICBwYWdlczogW1xyXG4gICAgICAgICAgICAncGFnZXMvaG9tZScsIC8vIOeZu+mZhuS5i+WQjueahOS4u+mhtVxyXG4gICAgICAgICAgICAncGFnZXMvaW50cm8nLCAvLyDmsqHmnInnmbvpmYbnmoTku4vnu43pobXpnaJcclxuICAgICAgICAgICAgJ3BhZ2VzL215TXAnLCAvLyDmiJHnmoTlsI/nqIvluo9cclxuICAgICAgICAgICAgJ3BhZ2VzL0FwcEluZm8nLCAvLyDlsI/nqIvluo/kv6Hmga9cclxuICAgICAgICAgICAgJ3BhZ2VzL1VwbG9hZEluZm8nLCAvLyDkuIrkvKDntKDmnZDpppbpobVcclxuICAgICAgICAgICAgJ3BhZ2VzL3NlbmQnLCAvLyDmtYvor5XmjojmnYPpobXpnaLkuJPnlKjvvIzli7/liKBcclxuICAgICAgICAgICAgJ3BhZ2VzL3Byb2dyZXNzJywgLy8g5a6M5oiQ5bqm6aG16Z2iXHJcbiAgICAgICAgICAgICdwYWdlcy9BcHBFZGl0JywgLy8g5bCP56iL5bqP57yW6L6RXHJcbiAgICAgICAgICAgICdwYWdlcy9idXknLCAvLyDotK3kubDpobXpnaJcclxuICAgICAgICAgICAgJ3BhZ2VzL2luZGV4JyxcclxuICAgICAgICAgICAgJ3BhZ2VzL25vdGljZUxpc3QnLCAvLyDmtojmga/pgJrnn6XpobXpnaJcclxuICAgICAgICAgICAgJ3BhZ2VzL3JlZ2lzdGVkJywgLy8g5b2T5YmN5bCP56iL5bqP5bey5rOo5YaMXHJcbiAgICAgICAgICAgICdwYWdlcy9yZWdpc3RNYWluQWNjb3VudCcsIC8vIOS4u+S9k+i0puaIt+S/oeaBr1xyXG4gICAgICAgICAgICAncGFnZXMvcmVnaXN0TWFuYWdlJywgLy8g566h55CG5ZGY5L+h5oGvXHJcbiAgICAgICAgICAgICdwYWdlcy9yZWdpc3RTdWNjZXNzJywgLy8g5rOo5YaM5a6M5oiQXHJcbiAgICAgICAgICAgICdwYWdlcy9mZWVkYmFjaycsIC8vIOaEj+ingeWPjemmiFxyXG4gICAgICAgICAgICAncGFnZXMvZmVlZGJhY2tEZXRhaWwnLCAvLyDmhI/op4Hlj43ppojkvJjpgInjgIHlvq7kv6Hpl67popjku4vnu41cclxuICAgICAgICAgICAgJ3BhZ2VzL1BvcFF1ZXN0aW9ucycsIC8vIOaEj+ingeWPjemmiOS8mOmAieOAgeW+ruS/oemXrumimOS7i+e7jVxyXG4gICAgICAgICAgICAncGFnZXMvVXBsb2FkQXJ0aWNsZScsIC8vIOS4iuS8oOaWh+eroFxyXG4gICAgICAgICAgICAncGFnZXMvVXBsb2FkSW5mb1N1Y2Nlc3MnLCAvLyDntKDmnZDkuIrkvKDmiJDlip9cclxuICAgICAgICAgICAgJ3BhZ2VzL1ZpZGVvUGxheScsIC8vIOinhumikeaSreaUvumhtemdolxyXG4gICAgICAgICAgICAncGFnZXMvb3JkZXJOb3RpY2VMaXN0JywgLy8g6K6i5Y2V5o+Q6YaS6aG16Z2iXHJcbiAgICAgICAgICAgICdwYWdlcy9hY2NvdW50Tm90aWNlTGlzdCcsIC8vIOWFpei0puaPkOmGkumhtemdolxyXG4gICAgICAgICAgICAncGFnZXMvT3JkZXJMaXN0JywgLy8g6K6i5Y2V5YiX6KGoXHJcbiAgICAgICAgICAgICdwYWdlcy9PcmRlckRldGFpbCcsIC8vIOiuouWNleivpuaDhVxyXG4gICAgICAgICAgICAncGFnZXMvT3BlblBheScsIC8vIOW8gOmAmuaUr+S7mFxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgd2luZG93OiB7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmRUZXh0U3R5bGU6ICdsaWdodCcsXHJcbiAgICAgICAgICAgIG5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3I6ICcjZmZmJyxcclxuICAgICAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ1dlQ2hhdCcsXHJcbiAgICAgICAgICAgIG5hdmlnYXRpb25CYXJUZXh0U3R5bGU6ICdibGFjaycsXHJcbiAgICAgICAgfSxcclxuICAgIH1cclxuICAgIG9uTGF1bmNoICgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnb25sYWluY2gnKTtcclxuICAgIH1cclxuICAgIG9uU2hvdyAob3B0aW9ucykge1xyXG4gICAgICAgIGNvbnN0IHsgcGF0aCB9ID0gb3B0aW9ucztcclxuICAgICAgICBjb25zb2xlLmxvZyhwYXRoKTtcclxuICAgICAgICAvLyBjb25zdCBwYWdlcyA9IGdldEN1cnJlbnRQYWdlcygpO1xyXG4gICAgICAgIC8vIGNvbnN0IGN1cnJQYWdlID0gcGFnZXNbcGFnZXMubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ2N1cnJQYWdlJywgY3VyclBhZ2Uucm91dGUpO1xyXG4gICAgICAgIGlmIChvcHRpb25zLnNjZW5lID09PSAxMDM4ICYmIHBhdGggPT09ICdwYWdlcy9pbnRybycpIHtcclxuICAgICAgICAgICAgaWYgKCFvcHRpb25zLnJlZmVycmVySW5mbykge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ29wdGlvbnMucmVmZXJyZXJJbmZv5Li656m6Jyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCFvcHRpb25zLnJlZmVycmVySW5mby5leHRyYURhdGEpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdvcHRpb25zLnJlZmVycmVySW5mby5leHRyYURhdGHkuLrnqbonKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgeyBleHRyYURhdGEgfSA9IG9wdGlvbnMucmVmZXJyZXJJbmZvO1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIGV4dHJhRGF0YSAhPT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgICAgICAgIGV4dHJhRGF0YSA9IEpTT04ucGFyc2UoZXh0cmFEYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZXh0cmFEYXRhLnBwdSAhPT0gdW5kZWZpbmVkKSB7IC8vIOWmguaenOiOt+WPlnBwdeaIkOWKn1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYOiOt+WPllBQVeaIkOWKn++8gSAke2V4dHJhRGF0YS5wcHV9YCk7XHJcbiAgICAgICAgICAgICAgICB3ZXB5LnNldFN0b3JhZ2VTeW5jKCdwcHUnLCBleHRyYURhdGEucHB1KTtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHdlcHkucmVMYXVuY2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6ICcvcGFnZXMvaG9tZScsXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9LCAxMDAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=