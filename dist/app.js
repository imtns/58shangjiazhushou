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


// 回调小程序类型
var CALLBACKAPPS = {
    wx2a9c6eeb1c44a284: 'Login', // 从58验证
    wx67b75e86c9daef45: 'OpenPay', // 开通支付小程序
    wxee214e01d07c9db0: 'ToMymp' // 从同镇小程序个人中心-> 管理我的小程序
};

var _class = function (_wepy$app) {
    _inherits(_class, _wepy$app);

    function _class() {
        _classCallCheck(this, _class);

        var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this));

        _this.config = {
            pages: ['pages/home', // 登陆之后的主页
            'pages/templateList', 'pages/reserve/reserve', 'pages/edit/coupon', 'pages/edit/consumer', 'pages/edit/text', 'pages/edit/order', 'pages/edit/imageSwiper', 'pages/edit/video', 'pages/edit/title', 'pages/edit/article', 'pages/edit/images', 'pages/contact/contact', 'pages/news/news', 'pages/product/product', 'pages/intro', // 没有登陆的介绍页面
            'pages/myMp', // 我的小程序
            'pages/AppInfo', // 小程序信息
            'pages/UploadInfo', // 上传素材首页
            'pages/resourceManage', // 素材管理
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
            'pages/articleComponentCreate', // 文章添加(不选分组)
            'pages/articleComponentAdd', // 文章添加(选分组)
            'pages/articleComponentlist', // 文章列表
            'pages/articleComponentDetail', // 文章详情
            'pages/articleChoseGroup', // 选择分组
            'pages/orderComponentDetail', // 预约预览页面
            'pages/paymentRecord', // 收款记录
            'pages/payChoseTime', // 选择时间
            'pages/orderComponentlist', // 预约列表
            'pages/orderComponentGroup', // 预约分组
            'pages/couponManage', // 优惠券管理
            'pages/couponEdit', // 优惠券编辑页
            'pages/couponType', // 优惠券类型
            'pages/couponValidTime', // 优惠券生效时间
            'pages/couponService', // 优惠券适用产品
            'pages/couponPreview', // 优惠券预览
            'pages/orderComponentEdit', // 预约编辑
            'pages/OpenPay', // 开通支付
            'pages/CateSelector', // 类目选择
            'pages/multiSelector', // 多级选择页面
            'pages/followPublic', // 关注公众号页
            'pages/purchase'],
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
            console.log('onlaunch');
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
            //
            // 赋值场景值、referrer信息
            var scene = options.scene,
                _options$referrerInfo = options.referrerInfo,
                referrerInfo = _options$referrerInfo === undefined ? {} : _options$referrerInfo,
                path = options.path;
            var appId = referrerInfo.appId;

            var fromAppId = appId;
            // action:通过fromAppId和scene返回当前小程序处理
            console.log('referrerInfo', referrerInfo);
            var action = scene === 1038 || scene === '1038' ? CALLBACKAPPS[fromAppId] : '';

            // 1037进入 从别的小程序进入
            action = scene === 1037 || scene === '1037' ? CALLBACKAPPS[fromAppId] : action;
            // 登陆已经上线保持原有判断逻辑
            // 条件1：scene：1038从另一个小程序返回
            if (scene === 1038 && path === 'pages/intro' && fromAppId === 'wx2a9c6eeb1c44a284') {
                action = 'Login';
            }
            // 从小程序返回场景处理
            action && _scene2.default['Do' + action].call(this, referrerInfo.extraData);
        }
    }]);

    return _class;
}(_wepy2.default.app);


App(require('./npm/wepy/lib/wepy.js').default.$createApp(_class, {"noPromiseAPI":["createSelectorQuery"]}));
require('./_wepylogs.js')

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJDQUxMQkFDS0FQUFMiLCJ3eDJhOWM2ZWViMWM0NGEyODQiLCJ3eDY3Yjc1ZTg2YzlkYWVmNDUiLCJ3eGVlMjE0ZTAxZDA3YzlkYjAiLCJjb25maWciLCJwYWdlcyIsIndpbmRvdyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJ1c2UiLCJjb25zb2xlIiwibG9nIiwib3B0aW9ucyIsInNjZW5lIiwicmVmZXJyZXJJbmZvIiwicGF0aCIsImFwcElkIiwiZnJvbUFwcElkIiwiYWN0aW9uIiwiRG9NaW5pUHJvZ3JhbUJhY2siLCJjYWxsIiwiZXh0cmFEYXRhIiwid2VweSIsImFwcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFDQTs7OztBQUNBOztBQUVBOzs7Ozs7Ozs7OztBQURBOzs7QUFHQTtBQUNBLElBQU1BLGVBQWU7QUFDakJDLHdCQUFvQixPQURILEVBQ1k7QUFDN0JDLHdCQUFvQixTQUZILEVBRWM7QUFDL0JDLHdCQUFvQixRQUhILENBR2E7QUFIYixDQUFyQjs7Ozs7QUFPSSxzQkFBYztBQUFBOztBQUFBOztBQUFBLGNBS2RDLE1BTGMsR0FLTDtBQUNMQyxtQkFBTyxDQUNILFlBREcsRUFDVztBQUNkLGdDQUZHLEVBR0gsdUJBSEcsRUFNSCxtQkFORyxFQU9ILHFCQVBHLEVBUUgsaUJBUkcsRUFTSCxrQkFURyxFQVVILHdCQVZHLEVBV0gsa0JBWEcsRUFZSCxrQkFaRyxFQWFILG9CQWJHLEVBY0gsbUJBZEcsRUFlSCx1QkFmRyxFQWdCSCxpQkFoQkcsRUFpQkgsdUJBakJHLEVBbUJILGFBbkJHLEVBbUJZO0FBQ2Ysd0JBcEJHLEVBb0JXO0FBQ2QsMkJBckJHLEVBcUJjO0FBQ2pCLDhCQXRCRyxFQXNCaUI7QUFDcEIsa0NBdkJHLEVBdUJxQjtBQUN4Qix3QkF4QkcsRUF3Qlc7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IjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xyXG5pbXBvcnQgJ3dlcHktYXN5bmMtZnVuY3Rpb24nO1xyXG4vLyBpbXBvcnQgeyBhbGVydCB9IGZyb20gJy4vdXRpbHMnO1xyXG5pbXBvcnQgRG9NaW5pUHJvZ3JhbUJhY2sgZnJvbSAnLi91dGlscy9zY2VuZSc7XHJcblxyXG4vLyDlm57osIPlsI/nqIvluo/nsbvlnotcclxuY29uc3QgQ0FMTEJBQ0tBUFBTID0ge1xyXG4gICAgd3gyYTljNmVlYjFjNDRhMjg0OiAnTG9naW4nLCAvLyDku441OOmqjOivgVxyXG4gICAgd3g2N2I3NWU4NmM5ZGFlZjQ1OiAnT3BlblBheScsIC8vIOW8gOmAmuaUr+S7mOWwj+eoi+W6j1xyXG4gICAgd3hlZTIxNGUwMWQwN2M5ZGIwOiAnVG9NeW1wJywgLy8g5LuO5ZCM6ZWH5bCP56iL5bqP5Liq5Lq65Lit5b+DLT4g566h55CG5oiR55qE5bCP56iL5bqPXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIHdlcHkuYXBwIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy51c2UoJ3Byb21pc2lmeScpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbmZpZyA9IHtcclxuICAgICAgICBwYWdlczogW1xyXG4gICAgICAgICAgICAncGFnZXMvaG9tZScsIC8vIOeZu+mZhuS5i+WQjueahOS4u+mhtVxyXG4gICAgICAgICAgICAncGFnZXMvdGVtcGxhdGVMaXN0JyxcclxuICAgICAgICAgICAgJ3BhZ2VzL3Jlc2VydmUvcmVzZXJ2ZScsXHJcblxyXG5cclxuICAgICAgICAgICAgJ3BhZ2VzL2VkaXQvY291cG9uJyxcclxuICAgICAgICAgICAgJ3BhZ2VzL2VkaXQvY29uc3VtZXInLFxyXG4gICAgICAgICAgICAncGFnZXMvZWRpdC90ZXh0JyxcclxuICAgICAgICAgICAgJ3BhZ2VzL2VkaXQvb3JkZXInLFxyXG4gICAgICAgICAgICAncGFnZXMvZWRpdC9pbWFnZVN3aXBlcicsXHJcbiAgICAgICAgICAgICdwYWdlcy9lZGl0L3ZpZGVvJyxcclxuICAgICAgICAgICAgJ3BhZ2VzL2VkaXQvdGl0bGUnLFxyXG4gICAgICAgICAgICAncGFnZXMvZWRpdC9hcnRpY2xlJyxcclxuICAgICAgICAgICAgJ3BhZ2VzL2VkaXQvaW1hZ2VzJyxcclxuICAgICAgICAgICAgJ3BhZ2VzL2NvbnRhY3QvY29udGFjdCcsXHJcbiAgICAgICAgICAgICdwYWdlcy9uZXdzL25ld3MnLFxyXG4gICAgICAgICAgICAncGFnZXMvcHJvZHVjdC9wcm9kdWN0JyxcclxuXHJcbiAgICAgICAgICAgICdwYWdlcy9pbnRybycsIC8vIOayoeacieeZu+mZhueahOS7i+e7jemhtemdolxyXG4gICAgICAgICAgICAncGFnZXMvbXlNcCcsIC8vIOaIkeeahOWwj+eoi+W6j1xyXG4gICAgICAgICAgICAncGFnZXMvQXBwSW5mbycsIC8vIOWwj+eoi+W6j+S/oeaBr1xyXG4gICAgICAgICAgICAncGFnZXMvVXBsb2FkSW5mbycsIC8vIOS4iuS8oOe0oOadkOmmlumhtVxyXG4gICAgICAgICAgICAncGFnZXMvcmVzb3VyY2VNYW5hZ2UnLCAvLyDntKDmnZDnrqHnkIZcclxuICAgICAgICAgICAgJ3BhZ2VzL3NlbmQnLCAvLyDmtYvor5XmjojmnYPpobXpnaLkuJPnlKjvvIzli7/liKBcclxuICAgICAgICAgICAgJ3BhZ2VzL3Byb2dyZXNzJywgLy8g5a6M5oiQ5bqm6aG16Z2iXHJcbiAgICAgICAgICAgICdwYWdlcy9BcHBFZGl0JywgLy8g5bCP56iL5bqP57yW6L6RXHJcbiAgICAgICAgICAgICdwYWdlcy9idXknLCAvLyDotK3kubDpobXpnaJcclxuICAgICAgICAgICAgJ3BhZ2VzL2luZGV4JyxcclxuICAgICAgICAgICAgJ3BhZ2VzL25vdGljZUxpc3QnLCAvLyDmtojmga/pgJrnn6XpobXpnaJcclxuICAgICAgICAgICAgJ3BhZ2VzL3JlZ2lzdGVkJywgLy8g5b2T5YmN5bCP56iL5bqP5bey5rOo5YaMXHJcbiAgICAgICAgICAgICdwYWdlcy9yZWdpc3RNYWluQWNjb3VudCcsIC8vIOS4u+S9k+i0puaIt+S/oeaBr1xyXG4gICAgICAgICAgICAncGFnZXMvcmVnaXN0TWFuYWdlJywgLy8g566h55CG5ZGY5L+h5oGvXHJcbiAgICAgICAgICAgICdwYWdlcy9yZWdpc3RTdWNjZXNzJywgLy8g5rOo5YaM5a6M5oiQXHJcbiAgICAgICAgICAgICdwYWdlcy9mZWVkYmFjaycsIC8vIOaEj+ingeWPjemmiFxyXG4gICAgICAgICAgICAncGFnZXMvZmVlZGJhY2tEZXRhaWwnLCAvLyDmhI/op4Hlj43ppojkvJjpgInjgIHlvq7kv6Hpl67popjku4vnu41cclxuICAgICAgICAgICAgJ3BhZ2VzL1BvcFF1ZXN0aW9ucycsIC8vIOaEj+ingeWPjemmiOS8mOmAieOAgeW+ruS/oemXrumimOS7i+e7jVxyXG4gICAgICAgICAgICAncGFnZXMvVXBsb2FkQXJ0aWNsZScsIC8vIOS4iuS8oOaWh+eroFxyXG4gICAgICAgICAgICAncGFnZXMvVXBsb2FkSW5mb1N1Y2Nlc3MnLCAvLyDntKDmnZDkuIrkvKDmiJDlip9cclxuICAgICAgICAgICAgJ3BhZ2VzL1ZpZGVvUGxheScsIC8vIOinhumikeaSreaUvumhtemdolxyXG4gICAgICAgICAgICAncGFnZXMvb3JkZXJOb3RpY2VMaXN0JywgLy8g6K6i5Y2V5o+Q6YaS6aG16Z2iXHJcbiAgICAgICAgICAgICdwYWdlcy9hY2NvdW50Tm90aWNlTGlzdCcsIC8vIOWFpei0puaPkOmGkumhtemdolxyXG4gICAgICAgICAgICAncGFnZXMvT3JkZXJMaXN0JywgLy8g6K6i5Y2V5YiX6KGoXHJcbiAgICAgICAgICAgICdwYWdlcy9PcmRlckRldGFpbCcsIC8vIOiuouWNleivpuaDhVxyXG4gICAgICAgICAgICAncGFnZXMvYXJ0aWNsZUNvbXBvbmVudENyZWF0ZScsIC8vIOaWh+eroOa3u+WKoCjkuI3pgInliIbnu4QpXHJcbiAgICAgICAgICAgICdwYWdlcy9hcnRpY2xlQ29tcG9uZW50QWRkJywgLy8g5paH56ug5re75YqgKOmAieWIhue7hClcclxuICAgICAgICAgICAgJ3BhZ2VzL2FydGljbGVDb21wb25lbnRsaXN0JywgLy8g5paH56ug5YiX6KGoXHJcbiAgICAgICAgICAgICdwYWdlcy9hcnRpY2xlQ29tcG9uZW50RGV0YWlsJywgLy8g5paH56ug6K+m5oOFXHJcbiAgICAgICAgICAgICdwYWdlcy9hcnRpY2xlQ2hvc2VHcm91cCcsIC8vIOmAieaLqeWIhue7hFxyXG4gICAgICAgICAgICAncGFnZXMvb3JkZXJDb21wb25lbnREZXRhaWwnLCAvLyDpooTnuqbpooTop4jpobXpnaJcclxuICAgICAgICAgICAgJ3BhZ2VzL3BheW1lbnRSZWNvcmQnLCAvLyDmlLbmrL7orrDlvZVcclxuICAgICAgICAgICAgJ3BhZ2VzL3BheUNob3NlVGltZScsIC8vIOmAieaLqeaXtumXtFxyXG4gICAgICAgICAgICAncGFnZXMvb3JkZXJDb21wb25lbnRsaXN0JywgLy8g6aKE57qm5YiX6KGoXHJcbiAgICAgICAgICAgICdwYWdlcy9vcmRlckNvbXBvbmVudEdyb3VwJywgLy8g6aKE57qm5YiG57uEXHJcbiAgICAgICAgICAgICdwYWdlcy9jb3Vwb25NYW5hZ2UnLCAvLyDkvJjmg6DliLjnrqHnkIZcclxuICAgICAgICAgICAgJ3BhZ2VzL2NvdXBvbkVkaXQnLCAvLyDkvJjmg6DliLjnvJbovpHpobVcclxuICAgICAgICAgICAgJ3BhZ2VzL2NvdXBvblR5cGUnLCAvLyDkvJjmg6DliLjnsbvlnotcclxuICAgICAgICAgICAgJ3BhZ2VzL2NvdXBvblZhbGlkVGltZScsIC8vIOS8mOaDoOWIuOeUn+aViOaXtumXtFxyXG4gICAgICAgICAgICAncGFnZXMvY291cG9uU2VydmljZScsIC8vIOS8mOaDoOWIuOmAgueUqOS6p+WTgVxyXG4gICAgICAgICAgICAncGFnZXMvY291cG9uUHJldmlldycsIC8vIOS8mOaDoOWIuOmihOiniFxyXG4gICAgICAgICAgICAncGFnZXMvb3JkZXJDb21wb25lbnRFZGl0JywgLy8g6aKE57qm57yW6L6RXHJcbiAgICAgICAgICAgICdwYWdlcy9PcGVuUGF5JywgLy8g5byA6YCa5pSv5LuYXHJcbiAgICAgICAgICAgICdwYWdlcy9DYXRlU2VsZWN0b3InLCAvLyDnsbvnm67pgInmi6lcclxuICAgICAgICAgICAgJ3BhZ2VzL211bHRpU2VsZWN0b3InLCAvLyDlpJrnuqfpgInmi6npobXpnaJcclxuICAgICAgICAgICAgJ3BhZ2VzL2ZvbGxvd1B1YmxpYycsIC8vIOWFs+azqOWFrOS8l+WPt+mhtVxyXG4gICAgICAgICAgICAncGFnZXMvcHVyY2hhc2UnLFxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgd2luZG93OiB7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmRUZXh0U3R5bGU6ICdsaWdodCcsXHJcbiAgICAgICAgICAgIG5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3I6ICcjZmZmJyxcclxuICAgICAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ1dlQ2hhdCcsXHJcbiAgICAgICAgICAgIG5hdmlnYXRpb25CYXJUZXh0U3R5bGU6ICdibGFjaycsXHJcbiAgICAgICAgfSxcclxuICAgIH1cclxuICAgIG9uTGF1bmNoICgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnb25sYXVuY2gnKTtcclxuICAgIH1cclxuICAgIG9uU2hvdyAob3B0aW9ucykge1xyXG4gICAgICAgIC8vIGNvbnN0IHsgcGF0aCB9ID0gb3B0aW9ucztcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhwYXRoKTtcclxuICAgICAgICAvLyBjb25zdCBwYWdlcyA9IGdldEN1cnJlbnRQYWdlcygpO1xyXG4gICAgICAgIC8vIGNvbnN0IGN1cnJQYWdlID0gcGFnZXNbcGFnZXMubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ2N1cnJQYWdlJywgY3VyclBhZ2Uucm91dGUpO1xyXG4gICAgICAgIC8vIGlmIChvcHRpb25zLnNjZW5lID09PSAxMDM4ICYmIHBhdGggPT09ICdwYWdlcy9pbnRybycpIHtcclxuICAgICAgICAvLyAgICAgaWYgKCFvcHRpb25zLnJlZmVycmVySW5mbykge1xyXG4gICAgICAgIC8vICAgICAgICAgY29uc29sZS5sb2coJ29wdGlvbnMucmVmZXJyZXJJbmZv5Li656m6Jyk7XHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyAgICAgaWYgKCFvcHRpb25zLnJlZmVycmVySW5mby5leHRyYURhdGEpIHtcclxuICAgICAgICAvLyAgICAgICAgIGNvbnNvbGUubG9nKCdvcHRpb25zLnJlZmVycmVySW5mby5leHRyYURhdGHkuLrnqbonKTtcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vICAgICBsZXQgeyBleHRyYURhdGEgfSA9IG9wdGlvbnMucmVmZXJyZXJJbmZvO1xyXG4gICAgICAgIC8vICAgICBpZiAodHlwZW9mIGV4dHJhRGF0YSAhPT0gJ29iamVjdCcpIHtcclxuICAgICAgICAvLyAgICAgICAgIGV4dHJhRGF0YSA9IEpTT04ucGFyc2UoZXh0cmFEYXRhKTtcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vICAgICBpZiAoZXh0cmFEYXRhLnBwdSAhPT0gdW5kZWZpbmVkKSB7IC8vIOWmguaenOiOt+WPlnBwdeaIkOWKn1xyXG4gICAgICAgIC8vICAgICAgICAgY29uc29sZS5sb2coYOiOt+WPllBQVeaIkOWKn++8gSAke2V4dHJhRGF0YS5wcHV9YCk7XHJcbiAgICAgICAgLy8gICAgICAgICB3ZXB5LnNldFN0b3JhZ2VTeW5jKCdwcHUnLCBleHRyYURhdGEucHB1KTtcclxuICAgICAgICAvLyAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIHdlcHkucmVMYXVuY2goe1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICB1cmw6ICcvcGFnZXMvaG9tZScsXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gICAgICAgICB9LCAxMDAwKTtcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvL1xyXG4gICAgICAgIC8vIOi1i+WAvOWcuuaZr+WAvOOAgXJlZmVycmVy5L+h5oGvXHJcbiAgICAgICAgY29uc3QgeyBzY2VuZSwgcmVmZXJyZXJJbmZvID0ge30sIHBhdGggfSA9IG9wdGlvbnM7XHJcbiAgICAgICAgY29uc3QgeyBhcHBJZCB9ID0gcmVmZXJyZXJJbmZvO1xyXG4gICAgICAgIGNvbnN0IGZyb21BcHBJZCA9IGFwcElkO1xyXG4gICAgICAgIC8vIGFjdGlvbjrpgJrov4dmcm9tQXBwSWTlkoxzY2VuZei/lOWbnuW9k+WJjeWwj+eoi+W6j+WkhOeQhlxyXG4gICAgICAgIGNvbnNvbGUubG9nKCdyZWZlcnJlckluZm8nLCByZWZlcnJlckluZm8pO1xyXG4gICAgICAgIGxldCBhY3Rpb24gPSBzY2VuZSA9PT0gMTAzOCB8fCBzY2VuZSA9PT0gJzEwMzgnID8gQ0FMTEJBQ0tBUFBTW2Zyb21BcHBJZF0gOiAnJztcclxuXHJcbiAgICAgICAgLy8gMTAzN+i/m+WFpSDku47liKvnmoTlsI/nqIvluo/ov5vlhaVcclxuICAgICAgICBhY3Rpb24gPSBzY2VuZSA9PT0gMTAzNyB8fCBzY2VuZSA9PT0gJzEwMzcnID8gQ0FMTEJBQ0tBUFBTW2Zyb21BcHBJZF0gOiBhY3Rpb247XHJcbiAgICAgICAgLy8g55m76ZmG5bey57uP5LiK57q/5L+d5oyB5Y6f5pyJ5Yik5pat6YC76L6RXHJcbiAgICAgICAgLy8g5p2h5Lu2Me+8mnNjZW5l77yaMTAzOOS7juWPpuS4gOS4quWwj+eoi+W6j+i/lOWbnlxyXG4gICAgICAgIGlmIChzY2VuZSA9PT0gMTAzOCAmJiBwYXRoID09PSAncGFnZXMvaW50cm8nICYmIGZyb21BcHBJZCA9PT0gJ3d4MmE5YzZlZWIxYzQ0YTI4NCcpIHtcclxuICAgICAgICAgICAgYWN0aW9uID0gJ0xvZ2luJztcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g5LuO5bCP56iL5bqP6L+U5Zue5Zy65pmv5aSE55CGXHJcbiAgICAgICAgYWN0aW9uICYmIERvTWluaVByb2dyYW1CYWNrW2BEbyR7YWN0aW9ufWBdLmNhbGwodGhpcywgcmVmZXJyZXJJbmZvLmV4dHJhRGF0YSk7XHJcbiAgICB9XHJcbn1cclxuIl19