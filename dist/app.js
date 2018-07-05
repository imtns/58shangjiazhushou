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
    wxf03e52adc4b13448: 'ToMymp' // 从同镇小程序个人中心-> 管理我的小程序
};

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
            // wepy.setStorageSync('ppu', 'UID=48917864286479&UN=zf3e85&TT=d81202a65af05aa8cb1ea5f6d92254d1&PBODY=JhH_NY6a8n2PvW6ZgBv_B1CwuIJH84mNnuJt4PxcpEQDl5QPvba4IdoMpCpk_GxpEfRtc9RPAvrK6G4o9J3zhKHmVv33iBDKO8EVnmRq6yp2ETgstCBISr9016TKao2yDyUeZG32vv_2yuyG01uAnqTlUL1vaRpLJ3fRd9NqySA&VER=1');
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
            var fromAppId = referrerInfo.appId;

            // action:通过fromAppId和scene返回当前小程序处理

            console.log('action', CALLBACKAPPS[fromAppId]);
            console.log('scene', scene);
            var action = scene === 1038 || scene === '1038' ? CALLBACKAPPS[fromAppId] : '';
            console.log('action', action);
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
