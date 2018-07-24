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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJDQUxMQkFDS0FQUFMiLCJ3eDJhOWM2ZWViMWM0NGEyODQiLCJ3eDY3Yjc1ZTg2YzlkYWVmNDUiLCJ3eGVlMjE0ZTAxZDA3YzlkYjAiLCJjb25maWciLCJwYWdlcyIsIndpbmRvdyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJ1c2UiLCJjb25zb2xlIiwibG9nIiwib3B0aW9ucyIsInNjZW5lIiwicmVmZXJyZXJJbmZvIiwicGF0aCIsImFwcElkIiwiZnJvbUFwcElkIiwiYWN0aW9uIiwiRG9NaW5pUHJvZ3JhbUJhY2siLCJjYWxsIiwiZXh0cmFEYXRhIiwid2VweSIsImFwcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFDQTs7OztBQUNBOztBQUVBOzs7Ozs7Ozs7OztBQURBOzs7QUFHQTtBQUNBLElBQU1BLGVBQWU7QUFDakJDLHdCQUFvQixPQURILEVBQ1k7QUFDN0JDLHdCQUFvQixTQUZILEVBRWM7QUFDL0JDLHdCQUFvQixRQUhILENBR2E7QUFIYixDQUFyQjs7Ozs7QUFPSSxzQkFBYztBQUFBOztBQUFBOztBQUFBLGNBS2RDLE1BTGMsR0FLTDtBQUNMQyxtQkFBTyxDQUNILFlBREcsRUFDVztBQUNkLGdDQUZHLEVBR0gsbUJBSEcsRUFNSCxtQkFORyxFQU9ILHFCQVBHLEVBUUgsaUJBUkcsRUFTSCxrQkFURyxFQVVILHdCQVZHLEVBV0gsa0JBWEcsRUFZSCxrQkFaRyxFQWFILG9CQWJHLEVBY0gsbUJBZEcsRUFlSCx1QkFmRyxFQWdCSCxpQkFoQkcsRUFpQkgsdUJBakJHLEVBb0JILHVCQXBCRyxFQXVCSCxhQXZCRyxFQXVCWTtBQUNmLHdCQXhCRyxFQXdCVztBQUNkLDJCQXpCRyxFQXlCYztBQUNqQiw4QkExQkcsRUEwQmlCO0FBQ3BCLGtDQTNCRyxFQTJCcUI7QUFDeEIs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QUFLQyxHIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5pbXBvcnQgJ3dlcHktYXN5bmMtZnVuY3Rpb24nO1xuLy8gaW1wb3J0IHsgYWxlcnQgfSBmcm9tICcuL3V0aWxzJztcbmltcG9ydCBEb01pbmlQcm9ncmFtQmFjayBmcm9tICcuL3V0aWxzL3NjZW5lJztcblxuLy8g5Zue6LCD5bCP56iL5bqP57G75Z6LXG5jb25zdCBDQUxMQkFDS0FQUFMgPSB7XG4gICAgd3gyYTljNmVlYjFjNDRhMjg0OiAnTG9naW4nLCAvLyDku441OOmqjOivgVxuICAgIHd4NjdiNzVlODZjOWRhZWY0NTogJ09wZW5QYXknLCAvLyDlvIDpgJrmlK/ku5jlsI/nqIvluo9cbiAgICB3eGVlMjE0ZTAxZDA3YzlkYjA6ICdUb015bXAnLCAvLyDku47lkIzplYflsI/nqIvluo/kuKrkurrkuK3lv4MtPiDnrqHnkIbmiJHnmoTlsI/nqIvluo9cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgd2VweS5hcHAge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnVzZSgncHJvbWlzaWZ5Jyk7XG4gICAgfVxuXG4gICAgY29uZmlnID0ge1xuICAgICAgICBwYWdlczogW1xuICAgICAgICAgICAgJ3BhZ2VzL2hvbWUnLCAvLyDnmbvpmYbkuYvlkI7nmoTkuLvpobVcbiAgICAgICAgICAgICdwYWdlcy90ZW1wbGF0ZUxpc3QnLFxuICAgICAgICAgICAgJ3BhZ2VzL2luZGV4L2luZGV4JyxcblxuXG4gICAgICAgICAgICAncGFnZXMvZWRpdC9jb3Vwb24nLFxuICAgICAgICAgICAgJ3BhZ2VzL2VkaXQvY29uc3VtZXInLFxuICAgICAgICAgICAgJ3BhZ2VzL2VkaXQvdGV4dCcsXG4gICAgICAgICAgICAncGFnZXMvZWRpdC9vcmRlcicsXG4gICAgICAgICAgICAncGFnZXMvZWRpdC9pbWFnZVN3aXBlcicsXG4gICAgICAgICAgICAncGFnZXMvZWRpdC92aWRlbycsXG4gICAgICAgICAgICAncGFnZXMvZWRpdC90aXRsZScsXG4gICAgICAgICAgICAncGFnZXMvZWRpdC9hcnRpY2xlJyxcbiAgICAgICAgICAgICdwYWdlcy9lZGl0L2ltYWdlcycsXG4gICAgICAgICAgICAncGFnZXMvY29udGFjdC9jb250YWN0JyxcbiAgICAgICAgICAgICdwYWdlcy9uZXdzL25ld3MnLFxuICAgICAgICAgICAgJ3BhZ2VzL3Byb2R1Y3QvcHJvZHVjdCcsXG5cblxuICAgICAgICAgICAgJ3BhZ2VzL2FydGljbGUvYXJ0aWNsZScsXG5cblxuICAgICAgICAgICAgJ3BhZ2VzL2ludHJvJywgLy8g5rKh5pyJ55m76ZmG55qE5LuL57uN6aG16Z2iXG4gICAgICAgICAgICAncGFnZXMvbXlNcCcsIC8vIOaIkeeahOWwj+eoi+W6j1xuICAgICAgICAgICAgJ3BhZ2VzL0FwcEluZm8nLCAvLyDlsI/nqIvluo/kv6Hmga9cbiAgICAgICAgICAgICdwYWdlcy9VcGxvYWRJbmZvJywgLy8g5LiK5Lyg57Sg5p2Q6aaW6aG1XG4gICAgICAgICAgICAncGFnZXMvcmVzb3VyY2VNYW5hZ2UnLCAvLyDntKDmnZDnrqHnkIZcbiAgICAgICAgICAgICdwYWdlcy9zZW5kJywgLy8g5rWL6K+V5o6I5p2D6aG16Z2i5LiT55So77yM5Yu/5YigXG4gICAgICAgICAgICAncGFnZXMvcHJvZ3Jlc3MnLCAvLyDlrozmiJDluqbpobXpnaJcbiAgICAgICAgICAgICdwYWdlcy9BcHBFZGl0JywgLy8g5bCP56iL5bqP57yW6L6RXG4gICAgICAgICAgICAncGFnZXMvYnV5JywgLy8g6LSt5Lmw6aG16Z2iXG4gICAgICAgICAgICAncGFnZXMvaW5kZXgnLFxuICAgICAgICAgICAgJ3BhZ2VzL25vdGljZUxpc3QnLCAvLyDmtojmga/pgJrnn6XpobXpnaJcbiAgICAgICAgICAgICdwYWdlcy9yZWdpc3RlZCcsIC8vIOW9k+WJjeWwj+eoi+W6j+W3suazqOWGjFxuICAgICAgICAgICAgJ3BhZ2VzL3JlZ2lzdE1haW5BY2NvdW50JywgLy8g5Li75L2T6LSm5oi35L+h5oGvXG4gICAgICAgICAgICAncGFnZXMvcmVnaXN0TWFuYWdlJywgLy8g566h55CG5ZGY5L+h5oGvXG4gICAgICAgICAgICAncGFnZXMvcmVnaXN0U3VjY2VzcycsIC8vIOazqOWGjOWujOaIkFxuICAgICAgICAgICAgJ3BhZ2VzL2ZlZWRiYWNrJywgLy8g5oSP6KeB5Y+N6aaIXG4gICAgICAgICAgICAncGFnZXMvZmVlZGJhY2tEZXRhaWwnLCAvLyDmhI/op4Hlj43ppojkvJjpgInjgIHlvq7kv6Hpl67popjku4vnu41cbiAgICAgICAgICAgICdwYWdlcy9Qb3BRdWVzdGlvbnMnLCAvLyDmhI/op4Hlj43ppojkvJjpgInjgIHlvq7kv6Hpl67popjku4vnu41cbiAgICAgICAgICAgICdwYWdlcy9VcGxvYWRBcnRpY2xlJywgLy8g5LiK5Lyg5paH56ugXG4gICAgICAgICAgICAncGFnZXMvVXBsb2FkSW5mb1N1Y2Nlc3MnLCAvLyDntKDmnZDkuIrkvKDmiJDlip9cbiAgICAgICAgICAgICdwYWdlcy9WaWRlb1BsYXknLCAvLyDop4bpopHmkq3mlL7pobXpnaJcbiAgICAgICAgICAgICdwYWdlcy9vcmRlck5vdGljZUxpc3QnLCAvLyDorqLljZXmj5DphpLpobXpnaJcbiAgICAgICAgICAgICdwYWdlcy9hY2NvdW50Tm90aWNlTGlzdCcsIC8vIOWFpei0puaPkOmGkumhtemdolxuICAgICAgICAgICAgJ3BhZ2VzL09yZGVyTGlzdCcsIC8vIOiuouWNleWIl+ihqFxuICAgICAgICAgICAgJ3BhZ2VzL09yZGVyRGV0YWlsJywgLy8g6K6i5Y2V6K+m5oOFXG4gICAgICAgICAgICAncGFnZXMvYXJ0aWNsZUNvbXBvbmVudENyZWF0ZScsIC8vIOaWh+eroOa3u+WKoCjkuI3pgInliIbnu4QpXG4gICAgICAgICAgICAncGFnZXMvYXJ0aWNsZUNvbXBvbmVudEFkZCcsIC8vIOaWh+eroOa3u+WKoCjpgInliIbnu4QpXG4gICAgICAgICAgICAncGFnZXMvYXJ0aWNsZUNvbXBvbmVudGxpc3QnLCAvLyDmlofnq6DliJfooahcbiAgICAgICAgICAgICdwYWdlcy9hcnRpY2xlQ29tcG9uZW50RGV0YWlsJywgLy8g5paH56ug6K+m5oOFXG4gICAgICAgICAgICAncGFnZXMvYXJ0aWNsZUNob3NlR3JvdXAnLCAvLyDpgInmi6nliIbnu4RcbiAgICAgICAgICAgICdwYWdlcy9vcmRlckNvbXBvbmVudERldGFpbCcsIC8vIOmihOe6pumihOiniOmhtemdolxuICAgICAgICAgICAgJ3BhZ2VzL3BheW1lbnRSZWNvcmQnLCAvLyDmlLbmrL7orrDlvZVcbiAgICAgICAgICAgICdwYWdlcy9wYXlDaG9zZVRpbWUnLCAvLyDpgInmi6nml7bpl7RcbiAgICAgICAgICAgICdwYWdlcy9vcmRlckNvbXBvbmVudGxpc3QnLCAvLyDpooTnuqbliJfooahcbiAgICAgICAgICAgICdwYWdlcy9vcmRlckNvbXBvbmVudEdyb3VwJywgLy8g6aKE57qm5YiG57uEXG4gICAgICAgICAgICAncGFnZXMvY291cG9uTWFuYWdlJywgLy8g5LyY5oOg5Yi4566h55CGXG4gICAgICAgICAgICAncGFnZXMvY291cG9uRWRpdCcsIC8vIOS8mOaDoOWIuOe8lui+kemhtVxuICAgICAgICAgICAgJ3BhZ2VzL2NvdXBvblR5cGUnLCAvLyDkvJjmg6DliLjnsbvlnotcbiAgICAgICAgICAgICdwYWdlcy9jb3Vwb25WYWxpZFRpbWUnLCAvLyDkvJjmg6DliLjnlJ/mlYjml7bpl7RcbiAgICAgICAgICAgICdwYWdlcy9jb3Vwb25TZXJ2aWNlJywgLy8g5LyY5oOg5Yi46YCC55So5Lqn5ZOBXG4gICAgICAgICAgICAncGFnZXMvY291cG9uUHJldmlldycsIC8vIOS8mOaDoOWIuOmihOiniFxuICAgICAgICAgICAgJ3BhZ2VzL29yZGVyQ29tcG9uZW50RWRpdCcsIC8vIOmihOe6pue8lui+kVxuICAgICAgICAgICAgJ3BhZ2VzL09wZW5QYXknLCAvLyDlvIDpgJrmlK/ku5hcbiAgICAgICAgICAgICdwYWdlcy9DYXRlU2VsZWN0b3InLCAvLyDnsbvnm67pgInmi6lcbiAgICAgICAgICAgICdwYWdlcy9tdWx0aVNlbGVjdG9yJywgLy8g5aSa57qn6YCJ5oup6aG16Z2iXG4gICAgICAgICAgICAncGFnZXMvZm9sbG93UHVibGljJywgLy8g5YWz5rOo5YWs5LyX5Y+36aG1XG4gICAgICAgICAgICAncGFnZXMvcHVyY2hhc2UnLFxuICAgICAgICBdLFxuICAgICAgICB3aW5kb3c6IHtcbiAgICAgICAgICAgIGJhY2tncm91bmRUZXh0U3R5bGU6ICdsaWdodCcsXG4gICAgICAgICAgICBuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yOiAnI2ZmZicsXG4gICAgICAgICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAnV2VDaGF0JyxcbiAgICAgICAgICAgIG5hdmlnYXRpb25CYXJUZXh0U3R5bGU6ICdibGFjaycsXG4gICAgICAgIH0sXG4gICAgfVxuICAgIG9uTGF1bmNoICgpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ29ubGF1bmNoJyk7XG4gICAgfVxuICAgIG9uU2hvdyAob3B0aW9ucykge1xuICAgICAgICAvLyBjb25zdCB7IHBhdGggfSA9IG9wdGlvbnM7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHBhdGgpO1xuICAgICAgICAvLyBjb25zdCBwYWdlcyA9IGdldEN1cnJlbnRQYWdlcygpO1xuICAgICAgICAvLyBjb25zdCBjdXJyUGFnZSA9IHBhZ2VzW3BhZ2VzLmxlbmd0aCAtIDFdO1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnY3VyclBhZ2UnLCBjdXJyUGFnZS5yb3V0ZSk7XG4gICAgICAgIC8vIGlmIChvcHRpb25zLnNjZW5lID09PSAxMDM4ICYmIHBhdGggPT09ICdwYWdlcy9pbnRybycpIHtcbiAgICAgICAgLy8gICAgIGlmICghb3B0aW9ucy5yZWZlcnJlckluZm8pIHtcbiAgICAgICAgLy8gICAgICAgICBjb25zb2xlLmxvZygnb3B0aW9ucy5yZWZlcnJlckluZm/kuLrnqbonKTtcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gICAgIGlmICghb3B0aW9ucy5yZWZlcnJlckluZm8uZXh0cmFEYXRhKSB7XG4gICAgICAgIC8vICAgICAgICAgY29uc29sZS5sb2coJ29wdGlvbnMucmVmZXJyZXJJbmZvLmV4dHJhRGF0YeS4uuepuicpO1xuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyAgICAgbGV0IHsgZXh0cmFEYXRhIH0gPSBvcHRpb25zLnJlZmVycmVySW5mbztcbiAgICAgICAgLy8gICAgIGlmICh0eXBlb2YgZXh0cmFEYXRhICE9PSAnb2JqZWN0Jykge1xuICAgICAgICAvLyAgICAgICAgIGV4dHJhRGF0YSA9IEpTT04ucGFyc2UoZXh0cmFEYXRhKTtcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gICAgIGlmIChleHRyYURhdGEucHB1ICE9PSB1bmRlZmluZWQpIHsgLy8g5aaC5p6c6I635Y+WcHB15oiQ5YqfXG4gICAgICAgIC8vICAgICAgICAgY29uc29sZS5sb2coYOiOt+WPllBQVeaIkOWKn++8gSAke2V4dHJhRGF0YS5wcHV9YCk7XG4gICAgICAgIC8vICAgICAgICAgd2VweS5zZXRTdG9yYWdlU3luYygncHB1JywgZXh0cmFEYXRhLnBwdSk7XG4gICAgICAgIC8vICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIC8vICAgICAgICAgICAgIHdlcHkucmVMYXVuY2goe1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgdXJsOiAnL3BhZ2VzL2hvbWUnLFxuICAgICAgICAvLyAgICAgICAgICAgICB9KTtcbiAgICAgICAgLy8gICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gfVxuICAgICAgICAvL1xuICAgICAgICAvLyDotYvlgLzlnLrmma/lgLzjgIFyZWZlcnJlcuS/oeaBr1xuICAgICAgICBjb25zdCB7IHNjZW5lLCByZWZlcnJlckluZm8gPSB7fSwgcGF0aCB9ID0gb3B0aW9ucztcbiAgICAgICAgY29uc3QgeyBhcHBJZCB9ID0gcmVmZXJyZXJJbmZvO1xuICAgICAgICBjb25zdCBmcm9tQXBwSWQgPSBhcHBJZDtcbiAgICAgICAgLy8gYWN0aW9uOumAmui/h2Zyb21BcHBJZOWSjHNjZW5l6L+U5Zue5b2T5YmN5bCP56iL5bqP5aSE55CGXG4gICAgICAgIGNvbnNvbGUubG9nKCdyZWZlcnJlckluZm8nLCByZWZlcnJlckluZm8pO1xuICAgICAgICBsZXQgYWN0aW9uID0gc2NlbmUgPT09IDEwMzggfHwgc2NlbmUgPT09ICcxMDM4JyA/IENBTExCQUNLQVBQU1tmcm9tQXBwSWRdIDogJyc7XG5cbiAgICAgICAgLy8gMTAzN+i/m+WFpSDku47liKvnmoTlsI/nqIvluo/ov5vlhaVcbiAgICAgICAgYWN0aW9uID0gc2NlbmUgPT09IDEwMzcgfHwgc2NlbmUgPT09ICcxMDM3JyA/IENBTExCQUNLQVBQU1tmcm9tQXBwSWRdIDogYWN0aW9uO1xuICAgICAgICAvLyDnmbvpmYblt7Lnu4/kuIrnur/kv53mjIHljp/mnInliKTmlq3pgLvovpFcbiAgICAgICAgLy8g5p2h5Lu2Me+8mnNjZW5l77yaMTAzOOS7juWPpuS4gOS4quWwj+eoi+W6j+i/lOWbnlxuICAgICAgICBpZiAoc2NlbmUgPT09IDEwMzggJiYgcGF0aCA9PT0gJ3BhZ2VzL2ludHJvJyAmJiBmcm9tQXBwSWQgPT09ICd3eDJhOWM2ZWViMWM0NGEyODQnKSB7XG4gICAgICAgICAgICBhY3Rpb24gPSAnTG9naW4nO1xuICAgICAgICB9XG4gICAgICAgIC8vIOS7juWwj+eoi+W6j+i/lOWbnuWcuuaZr+WkhOeQhlxuICAgICAgICBhY3Rpb24gJiYgRG9NaW5pUHJvZ3JhbUJhY2tbYERvJHthY3Rpb259YF0uY2FsbCh0aGlzLCByZWZlcnJlckluZm8uZXh0cmFEYXRhKTtcbiAgICB9XG59XG4iXX0=