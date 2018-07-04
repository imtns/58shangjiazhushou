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
            if (scene === 1038 && path === 'pages/intro') {
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJwYWdlcyIsIndpbmRvdyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJ1c2UiLCJjb25zb2xlIiwibG9nIiwib3B0aW9ucyIsInNjZW5lIiwicmVmZXJyZXJJbmZvIiwicGF0aCIsImFjdGlvbiIsImV4dHJhRGF0YSIsIkRvTWluaVByb2dyYW1CYWNrIiwiY2FsbCIsIndlcHkiLCJhcHAiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7QUFEQTs7Ozs7O0FBSUksc0JBQWM7QUFBQTs7QUFBQTs7QUFBQSxjQUlkQSxNQUpjLEdBSUw7QUFDTEMsbUJBQU8sQ0FDSCxZQURHLEVBQ1c7QUFDZCx5QkFGRyxFQUVZO0FBQ2Ysd0JBSEcsRUFHVztBQUNkLDJCQUpHLEVBSWM7QUFDakIsOEJBTEcsRUFLaUI7QUFDcEIsd0JBTkcsRUFNVztBQUNkLDRCQVBHLEVBT2U7QUFDbEIsMkJBUkcsRUFRYztBQUNqQix1QkFURyxFQVNVO0FBQ2IseUJBVkcsRUFXSCxrQkFYRyxFQVdpQjtBQUNwQiw0QkFaRyxFQVllO0FBQ2xCLHFDQWJHLEVBYXdCO0FBQzNCLGdDQWRHLEVBY21CO0FBQ3RCLGlDQWZHLEVBZW9CO0FBQ3ZCLDRCQWhCRyxFQWdCZTtBQUNsQixrQ0FqQkcsRUFpQnFCO0FBQ3hCLGdDQWxCRyxFQWtCbUI7QUFDdEIsaUNBbkJHLEVBbUJvQjtBQUN2QixxQ0FwQkcsRUFvQndCO0FBQzNCLDZCQXJCRyxFQXFCZ0I7QUFDbkIsbUNBdEJHLEVBc0JzQjtBQUN6QixxQ0F2QkcsRUF1QndCO0FBQzNCLDZCQXhCRyxFQXdCZ0I7QUFDbkIsK0JBekJHLEVBeUJrQjtBQUNyQiwyQkExQkcsQ0FERjtBQTZCTEMsb0JBQVE7QUFDSkMscUNBQXFCLE9BRGpCO0FBRUpDLDhDQUE4QixNQUYxQjtBQUdKQyx3Q0FBd0IsUUFIcEI7QUFJSkMsd0NBQXdCO0FBSnBCO0FBN0JILFNBSks7O0FBRVYsY0FBS0MsR0FBTCxDQUFTLFdBQVQ7QUFGVTtBQUdiOzs7O21DQXFDVztBQUNSQyxvQkFBUUMsR0FBUixDQUFZLFVBQVo7QUFDSDs7OytCQUNPQyxPLEVBQVM7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUEzQmEsZ0JBNEJMQyxLQTVCSyxHQTRCeUJELE9BNUJ6QixDQTRCTEMsS0E1Qks7QUFBQSxnQkE0QkVDLFlBNUJGLEdBNEJ5QkYsT0E1QnpCLENBNEJFRSxZQTVCRjtBQUFBLGdCQTRCZ0JDLElBNUJoQixHQTRCeUJILE9BNUJ6QixDQTRCZ0JHLElBNUJoQjtBQTZCYjs7QUFDQSxnQkFBSUMsU0FBVUYsZ0JBQWdCQSxhQUFhRyxTQUE3QixJQUEwQ0gsYUFBYUcsU0FBYixDQUF1QkQsTUFBbEUsSUFBNkUsRUFBMUY7QUFDQTtBQUNBLGdCQUFJSCxVQUFVLElBQVYsSUFBa0JFLFNBQVMsYUFBL0IsRUFBOEM7QUFDMUNDLHlCQUFTLE9BQVQ7QUFDSDtBQUNEO0FBQ0EsZ0JBQUlILFVBQVUsSUFBVixJQUFrQkcsTUFBdEIsRUFBOEI7QUFDMUJFLHVDQUF1QkYsTUFBdkIsRUFBaUNHLElBQWpDLENBQXNDLElBQXRDLEVBQTRDTCxhQUFhRyxTQUF6RDtBQUNIO0FBQ0o7Ozs7RUFuRndCRyxlQUFLQyxHIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcclxuaW1wb3J0ICd3ZXB5LWFzeW5jLWZ1bmN0aW9uJztcclxuLy8gaW1wb3J0IHsgYWxlcnQgfSBmcm9tICcuL3V0aWxzJztcclxuaW1wb3J0IERvTWluaVByb2dyYW1CYWNrIGZyb20gJy4vdXRpbHMvc2NlbmUnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyB3ZXB5LmFwcCB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMudXNlKCdwcm9taXNpZnknKTtcclxuICAgIH1cclxuICAgIGNvbmZpZyA9IHtcclxuICAgICAgICBwYWdlczogW1xyXG4gICAgICAgICAgICAncGFnZXMvaG9tZScsIC8vIOeZu+mZhuS5i+WQjueahOS4u+mhtVxyXG4gICAgICAgICAgICAncGFnZXMvaW50cm8nLCAvLyDmsqHmnInnmbvpmYbnmoTku4vnu43pobXpnaJcclxuICAgICAgICAgICAgJ3BhZ2VzL215TXAnLCAvLyDmiJHnmoTlsI/nqIvluo9cclxuICAgICAgICAgICAgJ3BhZ2VzL0FwcEluZm8nLCAvLyDlsI/nqIvluo/kv6Hmga9cclxuICAgICAgICAgICAgJ3BhZ2VzL1VwbG9hZEluZm8nLCAvLyDkuIrkvKDntKDmnZDpppbpobVcclxuICAgICAgICAgICAgJ3BhZ2VzL3NlbmQnLCAvLyDmtYvor5XmjojmnYPpobXpnaLkuJPnlKjvvIzli7/liKBcclxuICAgICAgICAgICAgJ3BhZ2VzL3Byb2dyZXNzJywgLy8g5a6M5oiQ5bqm6aG16Z2iXHJcbiAgICAgICAgICAgICdwYWdlcy9BcHBFZGl0JywgLy8g5bCP56iL5bqP57yW6L6RXHJcbiAgICAgICAgICAgICdwYWdlcy9idXknLCAvLyDotK3kubDpobXpnaJcclxuICAgICAgICAgICAgJ3BhZ2VzL2luZGV4JyxcclxuICAgICAgICAgICAgJ3BhZ2VzL25vdGljZUxpc3QnLCAvLyDmtojmga/pgJrnn6XpobXpnaJcclxuICAgICAgICAgICAgJ3BhZ2VzL3JlZ2lzdGVkJywgLy8g5b2T5YmN5bCP56iL5bqP5bey5rOo5YaMXHJcbiAgICAgICAgICAgICdwYWdlcy9yZWdpc3RNYWluQWNjb3VudCcsIC8vIOS4u+S9k+i0puaIt+S/oeaBr1xyXG4gICAgICAgICAgICAncGFnZXMvcmVnaXN0TWFuYWdlJywgLy8g566h55CG5ZGY5L+h5oGvXHJcbiAgICAgICAgICAgICdwYWdlcy9yZWdpc3RTdWNjZXNzJywgLy8g5rOo5YaM5a6M5oiQXHJcbiAgICAgICAgICAgICdwYWdlcy9mZWVkYmFjaycsIC8vIOaEj+ingeWPjemmiFxyXG4gICAgICAgICAgICAncGFnZXMvZmVlZGJhY2tEZXRhaWwnLCAvLyDmhI/op4Hlj43ppojkvJjpgInjgIHlvq7kv6Hpl67popjku4vnu41cclxuICAgICAgICAgICAgJ3BhZ2VzL1BvcFF1ZXN0aW9ucycsIC8vIOaEj+ingeWPjemmiOS8mOmAieOAgeW+ruS/oemXrumimOS7i+e7jVxyXG4gICAgICAgICAgICAncGFnZXMvVXBsb2FkQXJ0aWNsZScsIC8vIOS4iuS8oOaWh+eroFxyXG4gICAgICAgICAgICAncGFnZXMvVXBsb2FkSW5mb1N1Y2Nlc3MnLCAvLyDntKDmnZDkuIrkvKDmiJDlip9cclxuICAgICAgICAgICAgJ3BhZ2VzL1ZpZGVvUGxheScsIC8vIOinhumikeaSreaUvumhtemdolxyXG4gICAgICAgICAgICAncGFnZXMvb3JkZXJOb3RpY2VMaXN0JywgLy8g6K6i5Y2V5o+Q6YaS6aG16Z2iXHJcbiAgICAgICAgICAgICdwYWdlcy9hY2NvdW50Tm90aWNlTGlzdCcsIC8vIOWFpei0puaPkOmGkumhtemdolxyXG4gICAgICAgICAgICAncGFnZXMvT3JkZXJMaXN0JywgLy8g6K6i5Y2V5YiX6KGoXHJcbiAgICAgICAgICAgICdwYWdlcy9PcmRlckRldGFpbCcsIC8vIOiuouWNleivpuaDhVxyXG4gICAgICAgICAgICAncGFnZXMvT3BlblBheScsIC8vIOW8gOmAmuaUr+S7mFxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgd2luZG93OiB7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmRUZXh0U3R5bGU6ICdsaWdodCcsXHJcbiAgICAgICAgICAgIG5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3I6ICcjZmZmJyxcclxuICAgICAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ1dlQ2hhdCcsXHJcbiAgICAgICAgICAgIG5hdmlnYXRpb25CYXJUZXh0U3R5bGU6ICdibGFjaycsXHJcbiAgICAgICAgfSxcclxuICAgIH1cclxuICAgIG9uTGF1bmNoICgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnb25sYWluY2gnKTtcclxuICAgIH1cclxuICAgIG9uU2hvdyAob3B0aW9ucykge1xyXG4gICAgICAgIC8vIGNvbnN0IHsgcGF0aCB9ID0gb3B0aW9ucztcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhwYXRoKTtcclxuICAgICAgICAvLyBjb25zdCBwYWdlcyA9IGdldEN1cnJlbnRQYWdlcygpO1xyXG4gICAgICAgIC8vIGNvbnN0IGN1cnJQYWdlID0gcGFnZXNbcGFnZXMubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ2N1cnJQYWdlJywgY3VyclBhZ2Uucm91dGUpO1xyXG4gICAgICAgIC8vIGlmIChvcHRpb25zLnNjZW5lID09PSAxMDM4ICYmIHBhdGggPT09ICdwYWdlcy9pbnRybycpIHtcclxuICAgICAgICAvLyAgICAgaWYgKCFvcHRpb25zLnJlZmVycmVySW5mbykge1xyXG4gICAgICAgIC8vICAgICAgICAgY29uc29sZS5sb2coJ29wdGlvbnMucmVmZXJyZXJJbmZv5Li656m6Jyk7XHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyAgICAgaWYgKCFvcHRpb25zLnJlZmVycmVySW5mby5leHRyYURhdGEpIHtcclxuICAgICAgICAvLyAgICAgICAgIGNvbnNvbGUubG9nKCdvcHRpb25zLnJlZmVycmVySW5mby5leHRyYURhdGHkuLrnqbonKTtcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vICAgICBsZXQgeyBleHRyYURhdGEgfSA9IG9wdGlvbnMucmVmZXJyZXJJbmZvO1xyXG4gICAgICAgIC8vICAgICBpZiAodHlwZW9mIGV4dHJhRGF0YSAhPT0gJ29iamVjdCcpIHtcclxuICAgICAgICAvLyAgICAgICAgIGV4dHJhRGF0YSA9IEpTT04ucGFyc2UoZXh0cmFEYXRhKTtcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vICAgICBpZiAoZXh0cmFEYXRhLnBwdSAhPT0gdW5kZWZpbmVkKSB7IC8vIOWmguaenOiOt+WPlnBwdeaIkOWKn1xyXG4gICAgICAgIC8vICAgICAgICAgY29uc29sZS5sb2coYOiOt+WPllBQVeaIkOWKn++8gSAke2V4dHJhRGF0YS5wcHV9YCk7XHJcbiAgICAgICAgLy8gICAgICAgICB3ZXB5LnNldFN0b3JhZ2VTeW5jKCdwcHUnLCBleHRyYURhdGEucHB1KTtcclxuICAgICAgICAvLyAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIHdlcHkucmVMYXVuY2goe1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICB1cmw6ICcvcGFnZXMvaG9tZScsXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gICAgICAgICB9LCAxMDAwKTtcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvLyDotYvlgLzlnLrmma/lgLzjgIFyZWZlcnJlcuS/oeaBr1xyXG4gICAgICAgIGNvbnN0IHsgc2NlbmUsIHJlZmVycmVySW5mbywgcGF0aCB9ID0gb3B0aW9ucztcclxuICAgICAgICAvLyBhY3Rpb246KOW/hemhuynot7PovazlsI/nqIvluo/ku7vliqHliqjkvZzmoIfor4ZcclxuICAgICAgICBsZXQgYWN0aW9uID0gKHJlZmVycmVySW5mbyAmJiByZWZlcnJlckluZm8uZXh0cmFEYXRhICYmIHJlZmVycmVySW5mby5leHRyYURhdGEuYWN0aW9uKSB8fCAnJztcclxuICAgICAgICAvLyDnmbvpmYblt7Lnu4/kuIrnur/kv53mjIHljp/mnInliKTmlq3pgLvovpFcclxuICAgICAgICBpZiAoc2NlbmUgPT09IDEwMzggJiYgcGF0aCA9PT0gJ3BhZ2VzL2ludHJvJykge1xyXG4gICAgICAgICAgICBhY3Rpb24gPSAnTG9naW4nO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDlsI/nqIvluo/ov5Tlm57lgLzlpITnkIZcclxuICAgICAgICBpZiAoc2NlbmUgPT09IDEwMzggJiYgYWN0aW9uKSB7XHJcbiAgICAgICAgICAgIERvTWluaVByb2dyYW1CYWNrW2BEbyR7YWN0aW9ufWBdLmNhbGwodGhpcywgcmVmZXJyZXJJbmZvLmV4dHJhRGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==