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
            'pages/templateList', 'pages/index/index', 'pages/edit/coupon', 'pages/edit/consumer', 'pages/edit/text', 'pages/edit/order', 'pages/edit/imageSwiper', 'pages/edit/video', 'pages/edit/title', 'pages/edit/article', 'pages/edit/images', 'pages/contact/contact', 'pages/news/news', 'pages/product/product', 'pages/article/article', 'pages/intro', // 没有登陆的介绍页面
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJDQUxMQkFDS0FQUFMiLCJ3eDJhOWM2ZWViMWM0NGEyODQiLCJ3eDY3Yjc1ZTg2YzlkYWVmNDUiLCJ3eGVlMjE0ZTAxZDA3YzlkYjAiLCJjb25maWciLCJwYWdlcyIsIndpbmRvdyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJ1c2UiLCJjb25zb2xlIiwibG9nIiwib3B0aW9ucyIsInNjZW5lIiwicmVmZXJyZXJJbmZvIiwicGF0aCIsImFwcElkIiwiZnJvbUFwcElkIiwiYWN0aW9uIiwiRG9NaW5pUHJvZ3JhbUJhY2siLCJjYWxsIiwiZXh0cmFEYXRhIiwid2VweSIsImFwcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFDQTs7OztBQUNBOztBQUVBOzs7Ozs7Ozs7OztBQURBOzs7QUFHQTtBQUNBLElBQU1BLGVBQWU7QUFDakJDLHdCQUFvQixPQURILEVBQ1k7QUFDN0JDLHdCQUFvQixTQUZILEVBRWM7QUFDL0JDLHdCQUFvQixRQUhILENBR2E7QUFIYixDQUFyQjs7Ozs7QUFPSSxzQkFBYztBQUFBOztBQUFBOztBQUFBLGNBS2RDLE1BTGMsR0FLTDtBQUNMQyxtQkFBTyxDQUNILFlBREcsRUFDVztBQUNkLGdDQUZHLEVBR0gsbUJBSEcsRUFNSCxtQkFORyxFQU9ILHFCQVBHLEVBUUgsaUJBUkcsRUFTSCxrQkFURyxFQVVILHdCQVZHLEVBV0gsa0JBWEcsRUFZSCxrQkFaRyxFQWFILG9CQWJHLEVBY0gsbUJBZEcsRUFlSCx1QkFmRyxFQWdCSCxpQkFoQkcsRUFpQkgsdUJBakJHLEVBb0JILHVCQXBCRyxFQXVCSCxhQXZCRyxFQXVCWTtBQUNmLHdCQXhCRyxFQXdCVztBQUNkLDJCQXpCRyxFQXlCYztBQUNqQiw4QkExQkcsRUEwQmlCO0FBQ3BCLGtDQTNCRyxFQTJCcUI7QUFDeEIs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QUFLQyxHIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcclxuaW1wb3J0ICd3ZXB5LWFzeW5jLWZ1bmN0aW9uJztcclxuLy8gaW1wb3J0IHsgYWxlcnQgfSBmcm9tICcuL3V0aWxzJztcclxuaW1wb3J0IERvTWluaVByb2dyYW1CYWNrIGZyb20gJy4vdXRpbHMvc2NlbmUnO1xyXG5cclxuLy8g5Zue6LCD5bCP56iL5bqP57G75Z6LXHJcbmNvbnN0IENBTExCQUNLQVBQUyA9IHtcclxuICAgIHd4MmE5YzZlZWIxYzQ0YTI4NDogJ0xvZ2luJywgLy8g5LuONTjpqozor4FcclxuICAgIHd4NjdiNzVlODZjOWRhZWY0NTogJ09wZW5QYXknLCAvLyDlvIDpgJrmlK/ku5jlsI/nqIvluo9cclxuICAgIHd4ZWUyMTRlMDFkMDdjOWRiMDogJ1RvTXltcCcsIC8vIOS7juWQjOmVh+Wwj+eoi+W6j+S4quS6uuS4reW/gy0+IOeuoeeQhuaIkeeahOWwj+eoi+W6j1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyB3ZXB5LmFwcCB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMudXNlKCdwcm9taXNpZnknKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25maWcgPSB7XHJcbiAgICAgICAgcGFnZXM6IFtcclxuICAgICAgICAgICAgJ3BhZ2VzL2hvbWUnLCAvLyDnmbvpmYbkuYvlkI7nmoTkuLvpobVcclxuICAgICAgICAgICAgJ3BhZ2VzL3RlbXBsYXRlTGlzdCcsXHJcbiAgICAgICAgICAgICdwYWdlcy9pbmRleC9pbmRleCcsXHJcblxyXG5cclxuICAgICAgICAgICAgJ3BhZ2VzL2VkaXQvY291cG9uJyxcclxuICAgICAgICAgICAgJ3BhZ2VzL2VkaXQvY29uc3VtZXInLFxyXG4gICAgICAgICAgICAncGFnZXMvZWRpdC90ZXh0JyxcclxuICAgICAgICAgICAgJ3BhZ2VzL2VkaXQvb3JkZXInLFxyXG4gICAgICAgICAgICAncGFnZXMvZWRpdC9pbWFnZVN3aXBlcicsXHJcbiAgICAgICAgICAgICdwYWdlcy9lZGl0L3ZpZGVvJyxcclxuICAgICAgICAgICAgJ3BhZ2VzL2VkaXQvdGl0bGUnLFxyXG4gICAgICAgICAgICAncGFnZXMvZWRpdC9hcnRpY2xlJyxcclxuICAgICAgICAgICAgJ3BhZ2VzL2VkaXQvaW1hZ2VzJyxcclxuICAgICAgICAgICAgJ3BhZ2VzL2NvbnRhY3QvY29udGFjdCcsXHJcbiAgICAgICAgICAgICdwYWdlcy9uZXdzL25ld3MnLFxyXG4gICAgICAgICAgICAncGFnZXMvcHJvZHVjdC9wcm9kdWN0JyxcclxuXHJcblxyXG4gICAgICAgICAgICAncGFnZXMvYXJ0aWNsZS9hcnRpY2xlJyxcclxuXHJcblxyXG4gICAgICAgICAgICAncGFnZXMvaW50cm8nLCAvLyDmsqHmnInnmbvpmYbnmoTku4vnu43pobXpnaJcclxuICAgICAgICAgICAgJ3BhZ2VzL215TXAnLCAvLyDmiJHnmoTlsI/nqIvluo9cclxuICAgICAgICAgICAgJ3BhZ2VzL0FwcEluZm8nLCAvLyDlsI/nqIvluo/kv6Hmga9cclxuICAgICAgICAgICAgJ3BhZ2VzL1VwbG9hZEluZm8nLCAvLyDkuIrkvKDntKDmnZDpppbpobVcclxuICAgICAgICAgICAgJ3BhZ2VzL3Jlc291cmNlTWFuYWdlJywgLy8g57Sg5p2Q566h55CGXHJcbiAgICAgICAgICAgICdwYWdlcy9zZW5kJywgLy8g5rWL6K+V5o6I5p2D6aG16Z2i5LiT55So77yM5Yu/5YigXHJcbiAgICAgICAgICAgICdwYWdlcy9wcm9ncmVzcycsIC8vIOWujOaIkOW6pumhtemdolxyXG4gICAgICAgICAgICAncGFnZXMvQXBwRWRpdCcsIC8vIOWwj+eoi+W6j+e8lui+kVxyXG4gICAgICAgICAgICAncGFnZXMvYnV5JywgLy8g6LSt5Lmw6aG16Z2iXHJcbiAgICAgICAgICAgICdwYWdlcy9pbmRleCcsXHJcbiAgICAgICAgICAgICdwYWdlcy9ub3RpY2VMaXN0JywgLy8g5raI5oGv6YCa55+l6aG16Z2iXHJcbiAgICAgICAgICAgICdwYWdlcy9yZWdpc3RlZCcsIC8vIOW9k+WJjeWwj+eoi+W6j+W3suazqOWGjFxyXG4gICAgICAgICAgICAncGFnZXMvcmVnaXN0TWFpbkFjY291bnQnLCAvLyDkuLvkvZPotKbmiLfkv6Hmga9cclxuICAgICAgICAgICAgJ3BhZ2VzL3JlZ2lzdE1hbmFnZScsIC8vIOeuoeeQhuWRmOS/oeaBr1xyXG4gICAgICAgICAgICAncGFnZXMvcmVnaXN0U3VjY2VzcycsIC8vIOazqOWGjOWujOaIkFxyXG4gICAgICAgICAgICAncGFnZXMvZmVlZGJhY2snLCAvLyDmhI/op4Hlj43ppohcclxuICAgICAgICAgICAgJ3BhZ2VzL2ZlZWRiYWNrRGV0YWlsJywgLy8g5oSP6KeB5Y+N6aaI5LyY6YCJ44CB5b6u5L+h6Zeu6aKY5LuL57uNXHJcbiAgICAgICAgICAgICdwYWdlcy9Qb3BRdWVzdGlvbnMnLCAvLyDmhI/op4Hlj43ppojkvJjpgInjgIHlvq7kv6Hpl67popjku4vnu41cclxuICAgICAgICAgICAgJ3BhZ2VzL1VwbG9hZEFydGljbGUnLCAvLyDkuIrkvKDmlofnq6BcclxuICAgICAgICAgICAgJ3BhZ2VzL1VwbG9hZEluZm9TdWNjZXNzJywgLy8g57Sg5p2Q5LiK5Lyg5oiQ5YqfXHJcbiAgICAgICAgICAgICdwYWdlcy9WaWRlb1BsYXknLCAvLyDop4bpopHmkq3mlL7pobXpnaJcclxuICAgICAgICAgICAgJ3BhZ2VzL29yZGVyTm90aWNlTGlzdCcsIC8vIOiuouWNleaPkOmGkumhtemdolxyXG4gICAgICAgICAgICAncGFnZXMvYWNjb3VudE5vdGljZUxpc3QnLCAvLyDlhaXotKbmj5DphpLpobXpnaJcclxuICAgICAgICAgICAgJ3BhZ2VzL09yZGVyTGlzdCcsIC8vIOiuouWNleWIl+ihqFxyXG4gICAgICAgICAgICAncGFnZXMvT3JkZXJEZXRhaWwnLCAvLyDorqLljZXor6bmg4VcclxuICAgICAgICAgICAgJ3BhZ2VzL2FydGljbGVDb21wb25lbnRDcmVhdGUnLCAvLyDmlofnq6Dmt7vliqAo5LiN6YCJ5YiG57uEKVxyXG4gICAgICAgICAgICAncGFnZXMvYXJ0aWNsZUNvbXBvbmVudEFkZCcsIC8vIOaWh+eroOa3u+WKoCjpgInliIbnu4QpXHJcbiAgICAgICAgICAgICdwYWdlcy9hcnRpY2xlQ29tcG9uZW50bGlzdCcsIC8vIOaWh+eroOWIl+ihqFxyXG4gICAgICAgICAgICAncGFnZXMvYXJ0aWNsZUNvbXBvbmVudERldGFpbCcsIC8vIOaWh+eroOivpuaDhVxyXG4gICAgICAgICAgICAncGFnZXMvYXJ0aWNsZUNob3NlR3JvdXAnLCAvLyDpgInmi6nliIbnu4RcclxuICAgICAgICAgICAgJ3BhZ2VzL29yZGVyQ29tcG9uZW50RGV0YWlsJywgLy8g6aKE57qm6aKE6KeI6aG16Z2iXHJcbiAgICAgICAgICAgICdwYWdlcy9wYXltZW50UmVjb3JkJywgLy8g5pS25qy+6K6w5b2VXHJcbiAgICAgICAgICAgICdwYWdlcy9wYXlDaG9zZVRpbWUnLCAvLyDpgInmi6nml7bpl7RcclxuICAgICAgICAgICAgJ3BhZ2VzL29yZGVyQ29tcG9uZW50bGlzdCcsIC8vIOmihOe6puWIl+ihqFxyXG4gICAgICAgICAgICAncGFnZXMvb3JkZXJDb21wb25lbnRHcm91cCcsIC8vIOmihOe6puWIhue7hFxyXG4gICAgICAgICAgICAncGFnZXMvY291cG9uTWFuYWdlJywgLy8g5LyY5oOg5Yi4566h55CGXHJcbiAgICAgICAgICAgICdwYWdlcy9jb3Vwb25FZGl0JywgLy8g5LyY5oOg5Yi457yW6L6R6aG1XHJcbiAgICAgICAgICAgICdwYWdlcy9jb3Vwb25UeXBlJywgLy8g5LyY5oOg5Yi457G75Z6LXHJcbiAgICAgICAgICAgICdwYWdlcy9jb3Vwb25WYWxpZFRpbWUnLCAvLyDkvJjmg6DliLjnlJ/mlYjml7bpl7RcclxuICAgICAgICAgICAgJ3BhZ2VzL2NvdXBvblNlcnZpY2UnLCAvLyDkvJjmg6DliLjpgILnlKjkuqflk4FcclxuICAgICAgICAgICAgJ3BhZ2VzL2NvdXBvblByZXZpZXcnLCAvLyDkvJjmg6DliLjpooTop4hcclxuICAgICAgICAgICAgJ3BhZ2VzL29yZGVyQ29tcG9uZW50RWRpdCcsIC8vIOmihOe6pue8lui+kVxyXG4gICAgICAgICAgICAncGFnZXMvT3BlblBheScsIC8vIOW8gOmAmuaUr+S7mFxyXG4gICAgICAgICAgICAncGFnZXMvQ2F0ZVNlbGVjdG9yJywgLy8g57G755uu6YCJ5oupXHJcbiAgICAgICAgICAgICdwYWdlcy9tdWx0aVNlbGVjdG9yJywgLy8g5aSa57qn6YCJ5oup6aG16Z2iXHJcbiAgICAgICAgICAgICdwYWdlcy9mb2xsb3dQdWJsaWMnLCAvLyDlhbPms6jlhazkvJflj7fpobVcclxuICAgICAgICAgICAgJ3BhZ2VzL3B1cmNoYXNlJyxcclxuICAgICAgICBdLFxyXG4gICAgICAgIHdpbmRvdzoge1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kVGV4dFN0eWxlOiAnbGlnaHQnLFxyXG4gICAgICAgICAgICBuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yOiAnI2ZmZicsXHJcbiAgICAgICAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICdXZUNoYXQnLFxyXG4gICAgICAgICAgICBuYXZpZ2F0aW9uQmFyVGV4dFN0eWxlOiAnYmxhY2snLFxyXG4gICAgICAgIH0sXHJcbiAgICB9XHJcbiAgICBvbkxhdW5jaCAoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ29ubGF1bmNoJyk7XHJcbiAgICB9XHJcbiAgICBvblNob3cgKG9wdGlvbnMpIHtcclxuICAgICAgICAvLyBjb25zdCB7IHBhdGggfSA9IG9wdGlvbnM7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2cocGF0aCk7XHJcbiAgICAgICAgLy8gY29uc3QgcGFnZXMgPSBnZXRDdXJyZW50UGFnZXMoKTtcclxuICAgICAgICAvLyBjb25zdCBjdXJyUGFnZSA9IHBhZ2VzW3BhZ2VzLmxlbmd0aCAtIDFdO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdjdXJyUGFnZScsIGN1cnJQYWdlLnJvdXRlKTtcclxuICAgICAgICAvLyBpZiAob3B0aW9ucy5zY2VuZSA9PT0gMTAzOCAmJiBwYXRoID09PSAncGFnZXMvaW50cm8nKSB7XHJcbiAgICAgICAgLy8gICAgIGlmICghb3B0aW9ucy5yZWZlcnJlckluZm8pIHtcclxuICAgICAgICAvLyAgICAgICAgIGNvbnNvbGUubG9nKCdvcHRpb25zLnJlZmVycmVySW5mb+S4uuepuicpO1xyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gICAgIGlmICghb3B0aW9ucy5yZWZlcnJlckluZm8uZXh0cmFEYXRhKSB7XHJcbiAgICAgICAgLy8gICAgICAgICBjb25zb2xlLmxvZygnb3B0aW9ucy5yZWZlcnJlckluZm8uZXh0cmFEYXRh5Li656m6Jyk7XHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyAgICAgbGV0IHsgZXh0cmFEYXRhIH0gPSBvcHRpb25zLnJlZmVycmVySW5mbztcclxuICAgICAgICAvLyAgICAgaWYgKHR5cGVvZiBleHRyYURhdGEgIT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgLy8gICAgICAgICBleHRyYURhdGEgPSBKU09OLnBhcnNlKGV4dHJhRGF0YSk7XHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyAgICAgaWYgKGV4dHJhRGF0YS5wcHUgIT09IHVuZGVmaW5lZCkgeyAvLyDlpoLmnpzojrflj5ZwcHXmiJDlip9cclxuICAgICAgICAvLyAgICAgICAgIGNvbnNvbGUubG9nKGDojrflj5ZQUFXmiJDlip/vvIEgJHtleHRyYURhdGEucHB1fWApO1xyXG4gICAgICAgIC8vICAgICAgICAgd2VweS5zZXRTdG9yYWdlU3luYygncHB1JywgZXh0cmFEYXRhLnBwdSk7XHJcbiAgICAgICAgLy8gICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAvLyAgICAgICAgICAgICB3ZXB5LnJlTGF1bmNoKHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgdXJsOiAnL3BhZ2VzL2hvbWUnLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIC8vICAgICAgICAgfSwgMTAwMCk7XHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy9cclxuICAgICAgICAvLyDotYvlgLzlnLrmma/lgLzjgIFyZWZlcnJlcuS/oeaBr1xyXG4gICAgICAgIGNvbnN0IHsgc2NlbmUsIHJlZmVycmVySW5mbyA9IHt9LCBwYXRoIH0gPSBvcHRpb25zO1xyXG4gICAgICAgIGNvbnN0IHsgYXBwSWQgfSA9IHJlZmVycmVySW5mbztcclxuICAgICAgICBjb25zdCBmcm9tQXBwSWQgPSBhcHBJZDtcclxuICAgICAgICAvLyBhY3Rpb2466YCa6L+HZnJvbUFwcElk5ZKMc2NlbmXov5Tlm57lvZPliY3lsI/nqIvluo/lpITnkIZcclxuICAgICAgICBjb25zb2xlLmxvZygncmVmZXJyZXJJbmZvJywgcmVmZXJyZXJJbmZvKTtcclxuICAgICAgICBsZXQgYWN0aW9uID0gc2NlbmUgPT09IDEwMzggfHwgc2NlbmUgPT09ICcxMDM4JyA/IENBTExCQUNLQVBQU1tmcm9tQXBwSWRdIDogJyc7XHJcblxyXG4gICAgICAgIC8vIDEwMzfov5vlhaUg5LuO5Yir55qE5bCP56iL5bqP6L+b5YWlXHJcbiAgICAgICAgYWN0aW9uID0gc2NlbmUgPT09IDEwMzcgfHwgc2NlbmUgPT09ICcxMDM3JyA/IENBTExCQUNLQVBQU1tmcm9tQXBwSWRdIDogYWN0aW9uO1xyXG4gICAgICAgIC8vIOeZu+mZhuW3sue7j+S4iue6v+S/neaMgeWOn+acieWIpOaWremAu+i+kVxyXG4gICAgICAgIC8vIOadoeS7tjHvvJpzY2VuZe+8mjEwMzjku47lj6bkuIDkuKrlsI/nqIvluo/ov5Tlm55cclxuICAgICAgICBpZiAoc2NlbmUgPT09IDEwMzggJiYgcGF0aCA9PT0gJ3BhZ2VzL2ludHJvJyAmJiBmcm9tQXBwSWQgPT09ICd3eDJhOWM2ZWViMWM0NGEyODQnKSB7XHJcbiAgICAgICAgICAgIGFjdGlvbiA9ICdMb2dpbic7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIOS7juWwj+eoi+W6j+i/lOWbnuWcuuaZr+WkhOeQhlxyXG4gICAgICAgIGFjdGlvbiAmJiBEb01pbmlQcm9ncmFtQmFja1tgRG8ke2FjdGlvbn1gXS5jYWxsKHRoaXMsIHJlZmVycmVySW5mby5leHRyYURhdGEpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==