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
            'pages/OrderDetail'],
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJwYWdlcyIsIndpbmRvdyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJ1c2UiLCJjb25zb2xlIiwibG9nIiwib3B0aW9ucyIsInBhdGgiLCJzY2VuZSIsInJlZmVycmVySW5mbyIsImV4dHJhRGF0YSIsIkpTT04iLCJwYXJzZSIsInBwdSIsInVuZGVmaW5lZCIsIndlcHkiLCJzZXRTdG9yYWdlU3luYyIsInNldFRpbWVvdXQiLCJyZUxhdW5jaCIsInVybCIsImFwcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7QUFDQTs7Ozs7QUFHSSxzQkFBYztBQUFBOztBQUFBOztBQUFBLGNBSWRBLE1BSmMsR0FJTDtBQUNMQyxtQkFBTyxDQUNILFlBREcsRUFDVztBQUNkLHlCQUZHLEVBRVk7QUFDZix3QkFIRyxFQUdXO0FBQ2QsMkJBSkcsRUFJYztBQUNqQiw4QkFMRyxFQUtpQjtBQUNwQix3QkFORyxFQU1XO0FBQ2QsNEJBUEcsRUFPZTtBQUNsQiwyQkFSRyxFQVFjO0FBQ2pCLHVCQVRHLEVBU1U7QUFDYix5QkFWRyxFQVdILGtCQVhHLEVBV2lCO0FBQ3BCLDRCQVpHLEVBWWU7QUFDbEIscUNBYkcsRUFhd0I7QUFDM0IsZ0NBZEcsRUFjbUI7QUFDdEIsaUNBZkcsRUFlb0I7QUFDdkIsNEJBaEJHLEVBZ0JlO0FBQ2xCLGtDQWpCRyxFQWlCcUI7QUFDeEIsZ0NBbEJHLEVBa0JtQjtBQUN0QixpQ0FuQkcsRUFtQm9CO0FBQ3ZCLHFDQXBCRyxFQW9Cd0I7QUFDM0IsNkJBckJHLEVBcUJnQjtBQUNuQixtQ0F0QkcsRUFzQnNCO0FBQ3pCLHFDQXZCRyxFQXVCd0I7QUFDM0IsNkJBeEJHLEVBd0JnQjtBQUNuQiwrQkF6QkcsQ0FERjtBQTRCTEMsb0JBQVE7QUFDSkMscUNBQXFCLE9BRGpCO0FBRUpDLDhDQUE4QixNQUYxQjtBQUdKQyx3Q0FBd0IsUUFIcEI7QUFJSkMsd0NBQXdCO0FBSnBCO0FBNUJILFNBSks7O0FBRVYsY0FBS0MsR0FBTCxDQUFTLFdBQVQ7QUFGVTtBQUdiOzs7O21DQW9DVztBQUNSQyxvQkFBUUMsR0FBUixDQUFZLFVBQVo7QUFDSDs7OytCQUNPQyxPLEVBQVM7QUFBQSxnQkFDTEMsSUFESyxHQUNJRCxPQURKLENBQ0xDLElBREs7O0FBRWJILG9CQUFRQyxHQUFSLENBQVlFLElBQVo7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBSUQsUUFBUUUsS0FBUixLQUFrQixJQUFsQixJQUEwQkQsU0FBUyxhQUF2QyxFQUFzRDtBQUNsRCxvQkFBSSxDQUFDRCxRQUFRRyxZQUFiLEVBQTJCO0FBQ3ZCTCw0QkFBUUMsR0FBUixDQUFZLHdCQUFaO0FBQ0g7QUFDRCxvQkFBSSxDQUFDQyxRQUFRRyxZQUFSLENBQXFCQyxTQUExQixFQUFxQztBQUNqQ04sNEJBQVFDLEdBQVIsQ0FBWSxrQ0FBWjtBQUNIO0FBTmlELG9CQU81Q0ssU0FQNEMsR0FPOUJKLFFBQVFHLFlBUHNCLENBTzVDQyxTQVA0Qzs7QUFRbEQsb0JBQUksUUFBT0EsU0FBUCx5Q0FBT0EsU0FBUCxPQUFxQixRQUF6QixFQUFtQztBQUMvQkEsZ0NBQVlDLEtBQUtDLEtBQUwsQ0FBV0YsU0FBWCxDQUFaO0FBQ0g7QUFDRCxvQkFBSUEsVUFBVUcsR0FBVixLQUFrQkMsU0FBdEIsRUFBaUM7QUFBRTtBQUMvQlYsNEJBQVFDLEdBQVIsd0NBQXdCSyxVQUFVRyxHQUFsQztBQUNBRSxtQ0FBS0MsY0FBTCxDQUFvQixLQUFwQixFQUEyQk4sVUFBVUcsR0FBckM7QUFDQUksK0JBQVcsWUFBTTtBQUNiRix1Q0FBS0csUUFBTCxDQUFjO0FBQ1ZDLGlDQUFLO0FBREsseUJBQWQ7QUFHSCxxQkFKRCxFQUlHLElBSkg7QUFLSDtBQUNKO0FBQ0o7Ozs7RUF0RXdCSixlQUFLSyxHIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcclxuaW1wb3J0ICd3ZXB5LWFzeW5jLWZ1bmN0aW9uJztcclxuLy8gaW1wb3J0IHsgYWxlcnQgfSBmcm9tICcuL3V0aWxzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgd2VweS5hcHAge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLnVzZSgncHJvbWlzaWZ5Jyk7XHJcbiAgICB9XHJcbiAgICBjb25maWcgPSB7XHJcbiAgICAgICAgcGFnZXM6IFtcclxuICAgICAgICAgICAgJ3BhZ2VzL2hvbWUnLCAvLyDnmbvpmYbkuYvlkI7nmoTkuLvpobVcclxuICAgICAgICAgICAgJ3BhZ2VzL2ludHJvJywgLy8g5rKh5pyJ55m76ZmG55qE5LuL57uN6aG16Z2iXHJcbiAgICAgICAgICAgICdwYWdlcy9teU1wJywgLy8g5oiR55qE5bCP56iL5bqPXHJcbiAgICAgICAgICAgICdwYWdlcy9BcHBJbmZvJywgLy8g5bCP56iL5bqP5L+h5oGvXHJcbiAgICAgICAgICAgICdwYWdlcy9VcGxvYWRJbmZvJywgLy8g5LiK5Lyg57Sg5p2Q6aaW6aG1XHJcbiAgICAgICAgICAgICdwYWdlcy9zZW5kJywgLy8g5rWL6K+V5o6I5p2D6aG16Z2i5LiT55So77yM5Yu/5YigXHJcbiAgICAgICAgICAgICdwYWdlcy9wcm9ncmVzcycsIC8vIOWujOaIkOW6pumhtemdolxyXG4gICAgICAgICAgICAncGFnZXMvQXBwRWRpdCcsIC8vIOWwj+eoi+W6j+e8lui+kVxyXG4gICAgICAgICAgICAncGFnZXMvYnV5JywgLy8g6LSt5Lmw6aG16Z2iXHJcbiAgICAgICAgICAgICdwYWdlcy9pbmRleCcsXHJcbiAgICAgICAgICAgICdwYWdlcy9ub3RpY2VMaXN0JywgLy8g5raI5oGv6YCa55+l6aG16Z2iXHJcbiAgICAgICAgICAgICdwYWdlcy9yZWdpc3RlZCcsIC8vIOW9k+WJjeWwj+eoi+W6j+W3suazqOWGjFxyXG4gICAgICAgICAgICAncGFnZXMvcmVnaXN0TWFpbkFjY291bnQnLCAvLyDkuLvkvZPotKbmiLfkv6Hmga9cclxuICAgICAgICAgICAgJ3BhZ2VzL3JlZ2lzdE1hbmFnZScsIC8vIOeuoeeQhuWRmOS/oeaBr1xyXG4gICAgICAgICAgICAncGFnZXMvcmVnaXN0U3VjY2VzcycsIC8vIOazqOWGjOWujOaIkFxyXG4gICAgICAgICAgICAncGFnZXMvZmVlZGJhY2snLCAvLyDmhI/op4Hlj43ppohcclxuICAgICAgICAgICAgJ3BhZ2VzL2ZlZWRiYWNrRGV0YWlsJywgLy8g5oSP6KeB5Y+N6aaI5LyY6YCJ44CB5b6u5L+h6Zeu6aKY5LuL57uNXHJcbiAgICAgICAgICAgICdwYWdlcy9Qb3BRdWVzdGlvbnMnLCAvLyDmhI/op4Hlj43ppojkvJjpgInjgIHlvq7kv6Hpl67popjku4vnu41cclxuICAgICAgICAgICAgJ3BhZ2VzL1VwbG9hZEFydGljbGUnLCAvLyDkuIrkvKDmlofnq6BcclxuICAgICAgICAgICAgJ3BhZ2VzL1VwbG9hZEluZm9TdWNjZXNzJywgLy8g57Sg5p2Q5LiK5Lyg5oiQ5YqfXHJcbiAgICAgICAgICAgICdwYWdlcy9WaWRlb1BsYXknLCAvLyDop4bpopHmkq3mlL7pobXpnaJcclxuICAgICAgICAgICAgJ3BhZ2VzL29yZGVyTm90aWNlTGlzdCcsIC8vIOiuouWNleaPkOmGkumhtemdolxyXG4gICAgICAgICAgICAncGFnZXMvYWNjb3VudE5vdGljZUxpc3QnLCAvLyDlhaXotKbmj5DphpLpobXpnaJcclxuICAgICAgICAgICAgJ3BhZ2VzL09yZGVyTGlzdCcsIC8vIOiuouWNleWIl+ihqFxyXG4gICAgICAgICAgICAncGFnZXMvT3JkZXJEZXRhaWwnLCAvLyDorqLljZXor6bmg4VcclxuICAgICAgICBdLFxyXG4gICAgICAgIHdpbmRvdzoge1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kVGV4dFN0eWxlOiAnbGlnaHQnLFxyXG4gICAgICAgICAgICBuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yOiAnI2ZmZicsXHJcbiAgICAgICAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICdXZUNoYXQnLFxyXG4gICAgICAgICAgICBuYXZpZ2F0aW9uQmFyVGV4dFN0eWxlOiAnYmxhY2snLFxyXG4gICAgICAgIH0sXHJcbiAgICB9XHJcbiAgICBvbkxhdW5jaCAoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ29ubGFpbmNoJyk7XHJcbiAgICB9XHJcbiAgICBvblNob3cgKG9wdGlvbnMpIHtcclxuICAgICAgICBjb25zdCB7IHBhdGggfSA9IG9wdGlvbnM7XHJcbiAgICAgICAgY29uc29sZS5sb2cocGF0aCk7XHJcbiAgICAgICAgLy8gY29uc3QgcGFnZXMgPSBnZXRDdXJyZW50UGFnZXMoKTtcclxuICAgICAgICAvLyBjb25zdCBjdXJyUGFnZSA9IHBhZ2VzW3BhZ2VzLmxlbmd0aCAtIDFdO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdjdXJyUGFnZScsIGN1cnJQYWdlLnJvdXRlKTtcclxuICAgICAgICBpZiAob3B0aW9ucy5zY2VuZSA9PT0gMTAzOCAmJiBwYXRoID09PSAncGFnZXMvaW50cm8nKSB7XHJcbiAgICAgICAgICAgIGlmICghb3B0aW9ucy5yZWZlcnJlckluZm8pIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdvcHRpb25zLnJlZmVycmVySW5mb+S4uuepuicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghb3B0aW9ucy5yZWZlcnJlckluZm8uZXh0cmFEYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnb3B0aW9ucy5yZWZlcnJlckluZm8uZXh0cmFEYXRh5Li656m6Jyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IHsgZXh0cmFEYXRhIH0gPSBvcHRpb25zLnJlZmVycmVySW5mbztcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBleHRyYURhdGEgIT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgICAgICBleHRyYURhdGEgPSBKU09OLnBhcnNlKGV4dHJhRGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGV4dHJhRGF0YS5wcHUgIT09IHVuZGVmaW5lZCkgeyAvLyDlpoLmnpzojrflj5ZwcHXmiJDlip9cclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGDojrflj5ZQUFXmiJDlip/vvIEgJHtleHRyYURhdGEucHB1fWApO1xyXG4gICAgICAgICAgICAgICAgd2VweS5zZXRTdG9yYWdlU3luYygncHB1JywgZXh0cmFEYXRhLnBwdSk7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB3ZXB5LnJlTGF1bmNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiAnL3BhZ2VzL2hvbWUnLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSwgMTAwMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19