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
            console.log('onlainch');
            _wepy2.default.setStorageSync('ppu', 'UID=48917864286479&UN=zf3e85&TT=d81202a65af05aa8cb1ea5f6d92254d1&PBODY=JhH_NY6a8n2PvW6ZgBv_B1CwuIJH84mNnuJt4PxcpEQDl5QPvba4IdoMpCpk_GxpEfRtc9RPAvrK6G4o9J3zhKHmVv33iBDKO8EVnmRq6yp2ETgstCBISr9016TKao2yDyUeZG32vv_2yuyG01uAnqTlUL1vaRpLJ3fRd9NqySA&VER=1');
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJwYWdlcyIsIndpbmRvdyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJ1c2UiLCJjb25zb2xlIiwibG9nIiwid2VweSIsInNldFN0b3JhZ2VTeW5jIiwib3B0aW9ucyIsInBhdGgiLCJzY2VuZSIsInJlZmVycmVySW5mbyIsImV4dHJhRGF0YSIsIkpTT04iLCJwYXJzZSIsInBwdSIsInVuZGVmaW5lZCIsInNldFRpbWVvdXQiLCJyZUxhdW5jaCIsInVybCIsImFwcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7QUFDQTs7Ozs7QUFHSSxzQkFBYztBQUFBOztBQUFBOztBQUFBLGNBSWRBLE1BSmMsR0FJTDtBQUNMQyxtQkFBTyxDQUNILFlBREcsRUFDVztBQUNkLHlCQUZHLEVBRVk7QUFDZix3QkFIRyxFQUdXO0FBQ2QsMkJBSkcsRUFJYztBQUNqQiw4QkFMRyxFQUtpQjtBQUNwQix3QkFORyxFQU1XO0FBQ2QsNEJBUEcsRUFPZTtBQUNsQiwyQkFSRyxFQVFjO0FBQ2pCLHVCQVRHLEVBU1U7QUFDYix5QkFWRyxFQVdILGtCQVhHLEVBV2lCO0FBQ3BCLDRCQVpHLEVBWWU7QUFDbEIscUNBYkcsRUFhd0I7QUFDM0IsZ0NBZEcsRUFjbUI7QUFDdEIsaUNBZkcsRUFlb0I7QUFDdkIsNEJBaEJHLEVBZ0JlO0FBQ2xCLGtDQWpCRyxFQWlCcUI7QUFDeEIsZ0NBbEJHLEVBa0JtQjtBQUN0QixpQ0FuQkcsRUFtQm9CO0FBQ3ZCLHFDQXBCRyxFQW9Cd0I7QUFDM0IsNkJBckJHLEVBcUJnQjtBQUNuQixtQ0F0QkcsRUFzQnNCO0FBQ3pCLHFDQXZCRyxFQXVCd0I7QUFDM0IsNkJBeEJHLEVBd0JnQjtBQUNuQiwrQkF6QkcsRUF5QmtCO0FBQ3JCLDRCQTFCRyxDQURGO0FBNkJMQyxvQkFBUTtBQUNKQyxxQ0FBcUIsT0FEakI7QUFFSkMsOENBQThCLE1BRjFCO0FBR0pDLHdDQUF3QixRQUhwQjtBQUlKQyx3Q0FBd0I7QUFKcEI7QUE3QkgsU0FKSzs7QUFFVixjQUFLQyxHQUFMLENBQVMsV0FBVDtBQUZVO0FBR2I7Ozs7bUNBcUNXO0FBQ1JDLG9CQUFRQyxHQUFSLENBQVksVUFBWjtBQUNBQywyQkFBS0MsY0FBTCxDQUFvQixLQUFwQixFQUEyQiwwUEFBM0I7QUFDSDs7OytCQUNPQyxPLEVBQVM7QUFBQSxnQkFDTEMsSUFESyxHQUNJRCxPQURKLENBQ0xDLElBREs7O0FBRWJMLG9CQUFRQyxHQUFSLENBQVlJLElBQVo7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBSUQsUUFBUUUsS0FBUixLQUFrQixJQUFsQixJQUEwQkQsU0FBUyxhQUF2QyxFQUFzRDtBQUNsRCxvQkFBSSxDQUFDRCxRQUFRRyxZQUFiLEVBQTJCO0FBQ3ZCUCw0QkFBUUMsR0FBUixDQUFZLHdCQUFaO0FBQ0g7QUFDRCxvQkFBSSxDQUFDRyxRQUFRRyxZQUFSLENBQXFCQyxTQUExQixFQUFxQztBQUNqQ1IsNEJBQVFDLEdBQVIsQ0FBWSxrQ0FBWjtBQUNIO0FBTmlELG9CQU81Q08sU0FQNEMsR0FPOUJKLFFBQVFHLFlBUHNCLENBTzVDQyxTQVA0Qzs7QUFRbEQsb0JBQUksUUFBT0EsU0FBUCx5Q0FBT0EsU0FBUCxPQUFxQixRQUF6QixFQUFtQztBQUMvQkEsZ0NBQVlDLEtBQUtDLEtBQUwsQ0FBV0YsU0FBWCxDQUFaO0FBQ0g7O0FBRUQsb0JBQUlBLFVBQVVHLEdBQVYsS0FBa0JDLFNBQXRCLEVBQWlDO0FBQUU7QUFDL0JaLDRCQUFRQyxHQUFSLHdDQUF3Qk8sVUFBVUcsR0FBbEM7QUFDQVQsbUNBQUtDLGNBQUwsQ0FBb0IsS0FBcEIsRUFBMkJLLFVBQVVHLEdBQXJDO0FBQ0FFLCtCQUFXLFlBQU07QUFDYlgsdUNBQUtZLFFBQUwsQ0FBYztBQUNWQyxpQ0FBSztBQURLLHlCQUFkO0FBR0gscUJBSkQsRUFJRyxJQUpIO0FBS0g7QUFDSjtBQUNKOzs7O0VBekV3QmIsZUFBS2MsRyIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XHJcbmltcG9ydCAnd2VweS1hc3luYy1mdW5jdGlvbic7XHJcbi8vIGltcG9ydCB7IGFsZXJ0IH0gZnJvbSAnLi91dGlscyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIHdlcHkuYXBwIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy51c2UoJ3Byb21pc2lmeScpO1xyXG4gICAgfVxyXG4gICAgY29uZmlnID0ge1xyXG4gICAgICAgIHBhZ2VzOiBbXHJcbiAgICAgICAgICAgICdwYWdlcy9ob21lJywgLy8g55m76ZmG5LmL5ZCO55qE5Li76aG1XHJcbiAgICAgICAgICAgICdwYWdlcy9pbnRybycsIC8vIOayoeacieeZu+mZhueahOS7i+e7jemhtemdolxyXG4gICAgICAgICAgICAncGFnZXMvbXlNcCcsIC8vIOaIkeeahOWwj+eoi+W6j1xyXG4gICAgICAgICAgICAncGFnZXMvQXBwSW5mbycsIC8vIOWwj+eoi+W6j+S/oeaBr1xyXG4gICAgICAgICAgICAncGFnZXMvVXBsb2FkSW5mbycsIC8vIOS4iuS8oOe0oOadkOmmlumhtVxyXG4gICAgICAgICAgICAncGFnZXMvc2VuZCcsIC8vIOa1i+ivleaOiOadg+mhtemdouS4k+eUqO+8jOWLv+WIoFxyXG4gICAgICAgICAgICAncGFnZXMvcHJvZ3Jlc3MnLCAvLyDlrozmiJDluqbpobXpnaJcclxuICAgICAgICAgICAgJ3BhZ2VzL0FwcEVkaXQnLCAvLyDlsI/nqIvluo/nvJbovpFcclxuICAgICAgICAgICAgJ3BhZ2VzL2J1eScsIC8vIOi0reS5sOmhtemdolxyXG4gICAgICAgICAgICAncGFnZXMvaW5kZXgnLFxyXG4gICAgICAgICAgICAncGFnZXMvbm90aWNlTGlzdCcsIC8vIOa2iOaBr+mAmuefpemhtemdolxyXG4gICAgICAgICAgICAncGFnZXMvcmVnaXN0ZWQnLCAvLyDlvZPliY3lsI/nqIvluo/lt7Lms6jlhoxcclxuICAgICAgICAgICAgJ3BhZ2VzL3JlZ2lzdE1haW5BY2NvdW50JywgLy8g5Li75L2T6LSm5oi35L+h5oGvXHJcbiAgICAgICAgICAgICdwYWdlcy9yZWdpc3RNYW5hZ2UnLCAvLyDnrqHnkIblkZjkv6Hmga9cclxuICAgICAgICAgICAgJ3BhZ2VzL3JlZ2lzdFN1Y2Nlc3MnLCAvLyDms6jlhozlrozmiJBcclxuICAgICAgICAgICAgJ3BhZ2VzL2ZlZWRiYWNrJywgLy8g5oSP6KeB5Y+N6aaIXHJcbiAgICAgICAgICAgICdwYWdlcy9mZWVkYmFja0RldGFpbCcsIC8vIOaEj+ingeWPjemmiOS8mOmAieOAgeW+ruS/oemXrumimOS7i+e7jVxyXG4gICAgICAgICAgICAncGFnZXMvUG9wUXVlc3Rpb25zJywgLy8g5oSP6KeB5Y+N6aaI5LyY6YCJ44CB5b6u5L+h6Zeu6aKY5LuL57uNXHJcbiAgICAgICAgICAgICdwYWdlcy9VcGxvYWRBcnRpY2xlJywgLy8g5LiK5Lyg5paH56ugXHJcbiAgICAgICAgICAgICdwYWdlcy9VcGxvYWRJbmZvU3VjY2VzcycsIC8vIOe0oOadkOS4iuS8oOaIkOWKn1xyXG4gICAgICAgICAgICAncGFnZXMvVmlkZW9QbGF5JywgLy8g6KeG6aKR5pKt5pS+6aG16Z2iXHJcbiAgICAgICAgICAgICdwYWdlcy9vcmRlck5vdGljZUxpc3QnLCAvLyDorqLljZXmj5DphpLpobXpnaJcclxuICAgICAgICAgICAgJ3BhZ2VzL2FjY291bnROb3RpY2VMaXN0JywgLy8g5YWl6LSm5o+Q6YaS6aG16Z2iXHJcbiAgICAgICAgICAgICdwYWdlcy9PcmRlckxpc3QnLCAvLyDorqLljZXliJfooahcclxuICAgICAgICAgICAgJ3BhZ2VzL09yZGVyRGV0YWlsJywgLy8g6K6i5Y2V6K+m5oOFXHJcbiAgICAgICAgICAgICdwYWdlcy9wdXJjaGFzZScsXHJcbiAgICAgICAgXSxcclxuICAgICAgICB3aW5kb3c6IHtcclxuICAgICAgICAgICAgYmFja2dyb3VuZFRleHRTdHlsZTogJ2xpZ2h0JyxcclxuICAgICAgICAgICAgbmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvcjogJyNmZmYnLFxyXG4gICAgICAgICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAnV2VDaGF0JyxcclxuICAgICAgICAgICAgbmF2aWdhdGlvbkJhclRleHRTdHlsZTogJ2JsYWNrJyxcclxuICAgICAgICB9LFxyXG4gICAgfVxyXG4gICAgb25MYXVuY2ggKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdvbmxhaW5jaCcpO1xyXG4gICAgICAgIHdlcHkuc2V0U3RvcmFnZVN5bmMoJ3BwdScsICdVSUQ9NDg5MTc4NjQyODY0NzkmVU49emYzZTg1JlRUPWQ4MTIwMmE2NWFmMDVhYThjYjFlYTVmNmQ5MjI1NGQxJlBCT0RZPUpoSF9OWTZhOG4yUHZXNlpnQnZfQjFDd3VJSkg4NG1ObnVKdDRQeGNwRVFEbDVRUHZiYTRJZG9NcENwa19HeHBFZlJ0YzlSUEF2cks2RzRvOUozemhLSG1WdjMzaUJES084RVZubVJxNnlwMkVUZ3N0Q0JJU3I5MDE2VEthbzJ5RHlVZVpHMzJ2dl8yeXV5RzAxdUFucVRsVUwxdmFScExKM2ZSZDlOcXlTQSZWRVI9MScpO1xyXG4gICAgfVxyXG4gICAgb25TaG93IChvcHRpb25zKSB7XHJcbiAgICAgICAgY29uc3QgeyBwYXRoIH0gPSBvcHRpb25zO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHBhdGgpO1xyXG4gICAgICAgIC8vIGNvbnN0IHBhZ2VzID0gZ2V0Q3VycmVudFBhZ2VzKCk7XHJcbiAgICAgICAgLy8gY29uc3QgY3VyclBhZ2UgPSBwYWdlc1twYWdlcy5sZW5ndGggLSAxXTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZygnY3VyclBhZ2UnLCBjdXJyUGFnZS5yb3V0ZSk7XHJcbiAgICAgICAgaWYgKG9wdGlvbnMuc2NlbmUgPT09IDEwMzggJiYgcGF0aCA9PT0gJ3BhZ2VzL2ludHJvJykge1xyXG4gICAgICAgICAgICBpZiAoIW9wdGlvbnMucmVmZXJyZXJJbmZvKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnb3B0aW9ucy5yZWZlcnJlckluZm/kuLrnqbonKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIW9wdGlvbnMucmVmZXJyZXJJbmZvLmV4dHJhRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ29wdGlvbnMucmVmZXJyZXJJbmZvLmV4dHJhRGF0YeS4uuepuicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCB7IGV4dHJhRGF0YSB9ID0gb3B0aW9ucy5yZWZlcnJlckluZm87XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZXh0cmFEYXRhICE9PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgICAgICAgZXh0cmFEYXRhID0gSlNPTi5wYXJzZShleHRyYURhdGEpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZXh0cmFEYXRhLnBwdSAhPT0gdW5kZWZpbmVkKSB7IC8vIOWmguaenOiOt+WPlnBwdeaIkOWKn1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYOiOt+WPllBQVeaIkOWKn++8gSAke2V4dHJhRGF0YS5wcHV9YCk7XHJcbiAgICAgICAgICAgICAgICB3ZXB5LnNldFN0b3JhZ2VTeW5jKCdwcHUnLCBleHRyYURhdGEucHB1KTtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHdlcHkucmVMYXVuY2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6ICcvcGFnZXMvaG9tZScsXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9LCAxMDAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=