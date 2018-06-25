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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJwYWdlcyIsIndpbmRvdyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJ1c2UiLCJjb25zb2xlIiwibG9nIiwib3B0aW9ucyIsInBhdGgiLCJzY2VuZSIsInJlZmVycmVySW5mbyIsImV4dHJhRGF0YSIsIkpTT04iLCJwYXJzZSIsInBwdSIsInVuZGVmaW5lZCIsIndlcHkiLCJzZXRTdG9yYWdlU3luYyIsInNldFRpbWVvdXQiLCJyZUxhdW5jaCIsInVybCIsImFwcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7QUFDQTs7Ozs7QUFHSSxzQkFBYztBQUFBOztBQUFBOztBQUFBLGNBSWRBLE1BSmMsR0FJTDtBQUNMQyxtQkFBTyxDQUNILFlBREcsRUFDVztBQUNkLHlCQUZHLEVBRVk7QUFDZix3QkFIRyxFQUdXO0FBQ2QsMkJBSkcsRUFJYztBQUNqQiw4QkFMRyxFQUtpQjtBQUNwQix3QkFORyxFQU1XO0FBQ2QsNEJBUEcsRUFPZTtBQUNsQiwyQkFSRyxFQVFjO0FBQ2pCLHVCQVRHLEVBU1U7QUFDYix5QkFWRyxFQVdILGtCQVhHLEVBV2lCO0FBQ3BCLDRCQVpHLEVBWWU7QUFDbEIscUNBYkcsRUFhd0I7QUFDM0IsZ0NBZEcsRUFjbUI7QUFDdEIsaUNBZkcsRUFlb0I7QUFDdkIsNEJBaEJHLEVBZ0JlO0FBQ2xCLGtDQWpCRyxFQWlCcUI7QUFDeEIsZ0NBbEJHLEVBa0JtQjtBQUN0QixpQ0FuQkcsRUFtQm9CO0FBQ3ZCLHFDQXBCRyxFQW9Cd0I7QUFDM0IsNkJBckJHLEVBcUJnQjtBQUNuQixtQ0F0QkcsRUFzQnNCO0FBQ3pCLHFDQXZCRyxFQXVCd0I7QUFDM0IsNkJBeEJHLEVBd0JnQjtBQUNuQiwrQkF6QkcsQ0FERjtBQTRCTEMsb0JBQVE7QUFDSkMscUNBQXFCLE9BRGpCO0FBRUpDLDhDQUE4QixNQUYxQjtBQUdKQyx3Q0FBd0IsUUFIcEI7QUFJSkMsd0NBQXdCO0FBSnBCO0FBNUJILFNBSks7O0FBRVYsY0FBS0MsR0FBTCxDQUFTLFdBQVQ7QUFGVTtBQUdiOzs7O21DQW9DVztBQUNSQyxvQkFBUUMsR0FBUixDQUFZLFVBQVo7QUFDSDs7OytCQUNPQyxPLEVBQVM7QUFBQSxnQkFDTEMsSUFESyxHQUNJRCxPQURKLENBQ0xDLElBREs7O0FBRWJILG9CQUFRQyxHQUFSLENBQVlFLElBQVo7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBSUQsUUFBUUUsS0FBUixLQUFrQixJQUFsQixJQUEwQkQsU0FBUyxhQUF2QyxFQUFzRDtBQUNsRCxvQkFBSSxDQUFDRCxRQUFRRyxZQUFiLEVBQTJCO0FBQ3ZCTCw0QkFBUUMsR0FBUixDQUFZLHdCQUFaO0FBQ0g7QUFDRCxvQkFBSSxDQUFDQyxRQUFRRyxZQUFSLENBQXFCQyxTQUExQixFQUFxQztBQUNqQ04sNEJBQVFDLEdBQVIsQ0FBWSxrQ0FBWjtBQUNIO0FBTmlELG9CQU81Q0ssU0FQNEMsR0FPOUJKLFFBQVFHLFlBUHNCLENBTzVDQyxTQVA0Qzs7QUFRbEQsb0JBQUksUUFBT0EsU0FBUCx5Q0FBT0EsU0FBUCxPQUFxQixRQUF6QixFQUFtQztBQUMvQkEsZ0NBQVlDLEtBQUtDLEtBQUwsQ0FBV0YsU0FBWCxDQUFaO0FBQ0g7QUFDRCxvQkFBSUEsVUFBVUcsR0FBVixLQUFrQkMsU0FBdEIsRUFBaUM7QUFBRTtBQUMvQlYsNEJBQVFDLEdBQVIsd0NBQXdCSyxVQUFVRyxHQUFsQztBQUNBRSxtQ0FBS0MsY0FBTCxDQUFvQixLQUFwQixFQUEyQk4sVUFBVUcsR0FBckM7QUFDQUksK0JBQVcsWUFBTTtBQUNiRix1Q0FBS0csUUFBTCxDQUFjO0FBQ1ZDLGlDQUFLO0FBREsseUJBQWQ7QUFHSCxxQkFKRCxFQUlHLElBSkg7QUFLSDtBQUNKO0FBQ0o7Ozs7RUF0RXdCSixlQUFLSyxHIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5pbXBvcnQgJ3dlcHktYXN5bmMtZnVuY3Rpb24nO1xuLy8gaW1wb3J0IHsgYWxlcnQgfSBmcm9tICcuL3V0aWxzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyB3ZXB5LmFwcCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMudXNlKCdwcm9taXNpZnknKTtcbiAgICB9XG4gICAgY29uZmlnID0ge1xuICAgICAgICBwYWdlczogW1xuICAgICAgICAgICAgJ3BhZ2VzL2hvbWUnLCAvLyDnmbvpmYbkuYvlkI7nmoTkuLvpobVcbiAgICAgICAgICAgICdwYWdlcy9pbnRybycsIC8vIOayoeacieeZu+mZhueahOS7i+e7jemhtemdolxuICAgICAgICAgICAgJ3BhZ2VzL215TXAnLCAvLyDmiJHnmoTlsI/nqIvluo9cbiAgICAgICAgICAgICdwYWdlcy9BcHBJbmZvJywgLy8g5bCP56iL5bqP5L+h5oGvXG4gICAgICAgICAgICAncGFnZXMvVXBsb2FkSW5mbycsIC8vIOS4iuS8oOe0oOadkOmmlumhtVxuICAgICAgICAgICAgJ3BhZ2VzL3NlbmQnLCAvLyDmtYvor5XmjojmnYPpobXpnaLkuJPnlKjvvIzli7/liKBcbiAgICAgICAgICAgICdwYWdlcy9wcm9ncmVzcycsIC8vIOWujOaIkOW6pumhtemdolxuICAgICAgICAgICAgJ3BhZ2VzL0FwcEVkaXQnLCAvLyDlsI/nqIvluo/nvJbovpFcbiAgICAgICAgICAgICdwYWdlcy9idXknLCAvLyDotK3kubDpobXpnaJcbiAgICAgICAgICAgICdwYWdlcy9pbmRleCcsXG4gICAgICAgICAgICAncGFnZXMvbm90aWNlTGlzdCcsIC8vIOa2iOaBr+mAmuefpemhtemdolxuICAgICAgICAgICAgJ3BhZ2VzL3JlZ2lzdGVkJywgLy8g5b2T5YmN5bCP56iL5bqP5bey5rOo5YaMXG4gICAgICAgICAgICAncGFnZXMvcmVnaXN0TWFpbkFjY291bnQnLCAvLyDkuLvkvZPotKbmiLfkv6Hmga9cbiAgICAgICAgICAgICdwYWdlcy9yZWdpc3RNYW5hZ2UnLCAvLyDnrqHnkIblkZjkv6Hmga9cbiAgICAgICAgICAgICdwYWdlcy9yZWdpc3RTdWNjZXNzJywgLy8g5rOo5YaM5a6M5oiQXG4gICAgICAgICAgICAncGFnZXMvZmVlZGJhY2snLCAvLyDmhI/op4Hlj43ppohcbiAgICAgICAgICAgICdwYWdlcy9mZWVkYmFja0RldGFpbCcsIC8vIOaEj+ingeWPjemmiOS8mOmAieOAgeW+ruS/oemXrumimOS7i+e7jVxuICAgICAgICAgICAgJ3BhZ2VzL1BvcFF1ZXN0aW9ucycsIC8vIOaEj+ingeWPjemmiOS8mOmAieOAgeW+ruS/oemXrumimOS7i+e7jVxuICAgICAgICAgICAgJ3BhZ2VzL1VwbG9hZEFydGljbGUnLCAvLyDkuIrkvKDmlofnq6BcbiAgICAgICAgICAgICdwYWdlcy9VcGxvYWRJbmZvU3VjY2VzcycsIC8vIOe0oOadkOS4iuS8oOaIkOWKn1xuICAgICAgICAgICAgJ3BhZ2VzL1ZpZGVvUGxheScsIC8vIOinhumikeaSreaUvumhtemdolxuICAgICAgICAgICAgJ3BhZ2VzL29yZGVyTm90aWNlTGlzdCcsIC8vIOiuouWNleaPkOmGkumhtemdolxuICAgICAgICAgICAgJ3BhZ2VzL2FjY291bnROb3RpY2VMaXN0JywgLy8g5YWl6LSm5o+Q6YaS6aG16Z2iXG4gICAgICAgICAgICAncGFnZXMvT3JkZXJMaXN0JywgLy8g6K6i5Y2V5YiX6KGoXG4gICAgICAgICAgICAncGFnZXMvT3JkZXJEZXRhaWwnLCAvLyDorqLljZXor6bmg4VcbiAgICAgICAgXSxcbiAgICAgICAgd2luZG93OiB7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kVGV4dFN0eWxlOiAnbGlnaHQnLFxuICAgICAgICAgICAgbmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvcjogJyNmZmYnLFxuICAgICAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ1dlQ2hhdCcsXG4gICAgICAgICAgICBuYXZpZ2F0aW9uQmFyVGV4dFN0eWxlOiAnYmxhY2snLFxuICAgICAgICB9LFxuICAgIH1cbiAgICBvbkxhdW5jaCAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdvbmxhaW5jaCcpO1xuICAgIH1cbiAgICBvblNob3cgKG9wdGlvbnMpIHtcbiAgICAgICAgY29uc3QgeyBwYXRoIH0gPSBvcHRpb25zO1xuICAgICAgICBjb25zb2xlLmxvZyhwYXRoKTtcbiAgICAgICAgLy8gY29uc3QgcGFnZXMgPSBnZXRDdXJyZW50UGFnZXMoKTtcbiAgICAgICAgLy8gY29uc3QgY3VyclBhZ2UgPSBwYWdlc1twYWdlcy5sZW5ndGggLSAxXTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ2N1cnJQYWdlJywgY3VyclBhZ2Uucm91dGUpO1xuICAgICAgICBpZiAob3B0aW9ucy5zY2VuZSA9PT0gMTAzOCAmJiBwYXRoID09PSAncGFnZXMvaW50cm8nKSB7XG4gICAgICAgICAgICBpZiAoIW9wdGlvbnMucmVmZXJyZXJJbmZvKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ29wdGlvbnMucmVmZXJyZXJJbmZv5Li656m6Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIW9wdGlvbnMucmVmZXJyZXJJbmZvLmV4dHJhRGF0YSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdvcHRpb25zLnJlZmVycmVySW5mby5leHRyYURhdGHkuLrnqbonKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCB7IGV4dHJhRGF0YSB9ID0gb3B0aW9ucy5yZWZlcnJlckluZm87XG4gICAgICAgICAgICBpZiAodHlwZW9mIGV4dHJhRGF0YSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICBleHRyYURhdGEgPSBKU09OLnBhcnNlKGV4dHJhRGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZXh0cmFEYXRhLnBwdSAhPT0gdW5kZWZpbmVkKSB7IC8vIOWmguaenOiOt+WPlnBwdeaIkOWKn1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGDojrflj5ZQUFXmiJDlip/vvIEgJHtleHRyYURhdGEucHB1fWApO1xuICAgICAgICAgICAgICAgIHdlcHkuc2V0U3RvcmFnZVN5bmMoJ3BwdScsIGV4dHJhRGF0YS5wcHUpO1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB3ZXB5LnJlTGF1bmNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogJy9wYWdlcy9ob21lJyxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=