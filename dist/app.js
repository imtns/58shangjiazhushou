'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _aldStat = require('./utils/ald-stat.js');

var _aldStat2 = _interopRequireDefault(_aldStat);

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
            'pages/VideoPlay'],
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJwYWdlcyIsIndpbmRvdyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJ1c2UiLCJjb25zb2xlIiwibG9nIiwib3B0aW9ucyIsInBhdGgiLCJzY2VuZSIsInJlZmVycmVySW5mbyIsImV4dHJhRGF0YSIsIkpTT04iLCJwYXJzZSIsInBwdSIsInVuZGVmaW5lZCIsIndlcHkiLCJzZXRTdG9yYWdlU3luYyIsInNldFRpbWVvdXQiLCJyZUxhdW5jaCIsInVybCIsImFwcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7OztBQUNBOzs7OztBQUdJLHNCQUFjO0FBQUE7O0FBQUE7O0FBQUEsY0FJZEEsTUFKYyxHQUlMO0FBQ0xDLG1CQUFPLENBQ0gsWUFERyxFQUNXO0FBQ2QseUJBRkcsRUFFWTtBQUNmLHdCQUhHLEVBR1c7QUFDZCwyQkFKRyxFQUljO0FBQ2pCLDhCQUxHLEVBS2lCO0FBQ3BCLHdCQU5HLEVBTVc7QUFDZCw0QkFQRyxFQU9lO0FBQ2xCLDJCQVJHLEVBUWM7QUFDakIsdUJBVEcsRUFTVTtBQUNiLHlCQVZHLEVBV0gsa0JBWEcsRUFXaUI7QUFDcEIsNEJBWkcsRUFZZTtBQUNsQixxQ0FiRyxFQWF3QjtBQUMzQixnQ0FkRyxFQWNtQjtBQUN0QixpQ0FmRyxFQWVvQjtBQUN2Qiw0QkFoQkcsRUFnQmU7QUFDbEIsa0NBakJHLEVBaUJxQjtBQUN4QixnQ0FsQkcsRUFrQm1CO0FBQ3RCLGlDQW5CRyxFQW1Cb0I7QUFDdkIscUNBcEJHLEVBb0J3QjtBQUMzQiw2QkFyQkcsQ0FERjtBQXdCTEMsb0JBQVE7QUFDSkMscUNBQXFCLE9BRGpCO0FBRUpDLDhDQUE4QixNQUYxQjtBQUdKQyx3Q0FBd0IsUUFIcEI7QUFJSkMsd0NBQXdCO0FBSnBCO0FBeEJILFNBSks7O0FBRVYsY0FBS0MsR0FBTCxDQUFTLFdBQVQ7QUFGVTtBQUdiOzs7O21DQWdDVztBQUNSQyxvQkFBUUMsR0FBUixDQUFZLFVBQVo7QUFDSDs7OytCQUNPQyxPLEVBQVM7QUFBQSxnQkFDTEMsSUFESyxHQUNJRCxPQURKLENBQ0xDLElBREs7O0FBRWJILG9CQUFRQyxHQUFSLENBQVlFLElBQVo7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBSUQsUUFBUUUsS0FBUixLQUFrQixJQUFsQixJQUEwQkQsU0FBUyxhQUF2QyxFQUFzRDtBQUNsRCxvQkFBSSxDQUFDRCxRQUFRRyxZQUFiLEVBQTJCO0FBQ3ZCTCw0QkFBUUMsR0FBUixDQUFZLHdCQUFaO0FBQ0g7QUFDRCxvQkFBSSxDQUFDQyxRQUFRRyxZQUFSLENBQXFCQyxTQUExQixFQUFxQztBQUNqQ04sNEJBQVFDLEdBQVIsQ0FBWSxrQ0FBWjtBQUNIO0FBTmlELG9CQU81Q0ssU0FQNEMsR0FPOUJKLFFBQVFHLFlBUHNCLENBTzVDQyxTQVA0Qzs7QUFRbEQsb0JBQUksUUFBT0EsU0FBUCx5Q0FBT0EsU0FBUCxPQUFxQixRQUF6QixFQUFtQztBQUMvQkEsZ0NBQVlDLEtBQUtDLEtBQUwsQ0FBV0YsU0FBWCxDQUFaO0FBQ0g7QUFDRCxvQkFBSUEsVUFBVUcsR0FBVixLQUFrQkMsU0FBdEIsRUFBaUM7QUFBRTtBQUMvQlYsNEJBQVFDLEdBQVIsd0NBQXdCSyxVQUFVRyxHQUFsQztBQUNBRSxtQ0FBS0MsY0FBTCxDQUFvQixLQUFwQixFQUEyQk4sVUFBVUcsR0FBckM7QUFDQUksK0JBQVcsWUFBTTtBQUNiRix1Q0FBS0csUUFBTCxDQUFjO0FBQ1ZDLGlDQUFLO0FBREsseUJBQWQ7QUFHSCxxQkFKRCxFQUlHLElBSkg7QUFLSDtBQUNKO0FBQ0o7Ozs7RUFsRXdCSixlQUFLSyxHIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IGFsZHN0YXQgZnJvbSAnLi91dGlscy9hbGQtc3RhdCc7XG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbmltcG9ydCAnd2VweS1hc3luYy1mdW5jdGlvbic7XG4vLyBpbXBvcnQgeyBhbGVydCB9IGZyb20gJy4vdXRpbHMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIHdlcHkuYXBwIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy51c2UoJ3Byb21pc2lmeScpO1xuICAgIH1cbiAgICBjb25maWcgPSB7XG4gICAgICAgIHBhZ2VzOiBbXG4gICAgICAgICAgICAncGFnZXMvaG9tZScsIC8vIOeZu+mZhuS5i+WQjueahOS4u+mhtVxuICAgICAgICAgICAgJ3BhZ2VzL2ludHJvJywgLy8g5rKh5pyJ55m76ZmG55qE5LuL57uN6aG16Z2iXG4gICAgICAgICAgICAncGFnZXMvbXlNcCcsIC8vIOaIkeeahOWwj+eoi+W6j1xuICAgICAgICAgICAgJ3BhZ2VzL0FwcEluZm8nLCAvLyDlsI/nqIvluo/kv6Hmga9cbiAgICAgICAgICAgICdwYWdlcy9VcGxvYWRJbmZvJywgLy8g5LiK5Lyg57Sg5p2Q6aaW6aG1XG4gICAgICAgICAgICAncGFnZXMvc2VuZCcsIC8vIOa1i+ivleaOiOadg+mhtemdouS4k+eUqO+8jOWLv+WIoFxuICAgICAgICAgICAgJ3BhZ2VzL3Byb2dyZXNzJywgLy8g5a6M5oiQ5bqm6aG16Z2iXG4gICAgICAgICAgICAncGFnZXMvQXBwRWRpdCcsIC8vIOWwj+eoi+W6j+e8lui+kVxuICAgICAgICAgICAgJ3BhZ2VzL2J1eScsIC8vIOi0reS5sOmhtemdolxuICAgICAgICAgICAgJ3BhZ2VzL2luZGV4JyxcbiAgICAgICAgICAgICdwYWdlcy9ub3RpY2VMaXN0JywgLy8g5raI5oGv6YCa55+l6aG16Z2iXG4gICAgICAgICAgICAncGFnZXMvcmVnaXN0ZWQnLCAvLyDlvZPliY3lsI/nqIvluo/lt7Lms6jlhoxcbiAgICAgICAgICAgICdwYWdlcy9yZWdpc3RNYWluQWNjb3VudCcsIC8vIOS4u+S9k+i0puaIt+S/oeaBr1xuICAgICAgICAgICAgJ3BhZ2VzL3JlZ2lzdE1hbmFnZScsIC8vIOeuoeeQhuWRmOS/oeaBr1xuICAgICAgICAgICAgJ3BhZ2VzL3JlZ2lzdFN1Y2Nlc3MnLCAvLyDms6jlhozlrozmiJBcbiAgICAgICAgICAgICdwYWdlcy9mZWVkYmFjaycsIC8vIOaEj+ingeWPjemmiFxuICAgICAgICAgICAgJ3BhZ2VzL2ZlZWRiYWNrRGV0YWlsJywgLy8g5oSP6KeB5Y+N6aaI5LyY6YCJ44CB5b6u5L+h6Zeu6aKY5LuL57uNXG4gICAgICAgICAgICAncGFnZXMvUG9wUXVlc3Rpb25zJywgLy8g5oSP6KeB5Y+N6aaI5LyY6YCJ44CB5b6u5L+h6Zeu6aKY5LuL57uNXG4gICAgICAgICAgICAncGFnZXMvVXBsb2FkQXJ0aWNsZScsIC8vIOS4iuS8oOaWh+eroFxuICAgICAgICAgICAgJ3BhZ2VzL1VwbG9hZEluZm9TdWNjZXNzJywgLy8g57Sg5p2Q5LiK5Lyg5oiQ5YqfXG4gICAgICAgICAgICAncGFnZXMvVmlkZW9QbGF5JywgLy8g6KeG6aKR5pKt5pS+6aG16Z2iXG4gICAgICAgIF0sXG4gICAgICAgIHdpbmRvdzoge1xuICAgICAgICAgICAgYmFja2dyb3VuZFRleHRTdHlsZTogJ2xpZ2h0JyxcbiAgICAgICAgICAgIG5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3I6ICcjZmZmJyxcbiAgICAgICAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICdXZUNoYXQnLFxuICAgICAgICAgICAgbmF2aWdhdGlvbkJhclRleHRTdHlsZTogJ2JsYWNrJyxcbiAgICAgICAgfSxcbiAgICB9XG4gICAgb25MYXVuY2ggKCkge1xuICAgICAgICBjb25zb2xlLmxvZygnb25sYWluY2gnKTtcbiAgICB9XG4gICAgb25TaG93IChvcHRpb25zKSB7XG4gICAgICAgIGNvbnN0IHsgcGF0aCB9ID0gb3B0aW9ucztcbiAgICAgICAgY29uc29sZS5sb2cocGF0aCk7XG4gICAgICAgIC8vIGNvbnN0IHBhZ2VzID0gZ2V0Q3VycmVudFBhZ2VzKCk7XG4gICAgICAgIC8vIGNvbnN0IGN1cnJQYWdlID0gcGFnZXNbcGFnZXMubGVuZ3RoIC0gMV07XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdjdXJyUGFnZScsIGN1cnJQYWdlLnJvdXRlKTtcbiAgICAgICAgaWYgKG9wdGlvbnMuc2NlbmUgPT09IDEwMzggJiYgcGF0aCA9PT0gJ3BhZ2VzL2ludHJvJykge1xuICAgICAgICAgICAgaWYgKCFvcHRpb25zLnJlZmVycmVySW5mbykge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdvcHRpb25zLnJlZmVycmVySW5mb+S4uuepuicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFvcHRpb25zLnJlZmVycmVySW5mby5leHRyYURhdGEpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnb3B0aW9ucy5yZWZlcnJlckluZm8uZXh0cmFEYXRh5Li656m6Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgeyBleHRyYURhdGEgfSA9IG9wdGlvbnMucmVmZXJyZXJJbmZvO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBleHRyYURhdGEgIT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgZXh0cmFEYXRhID0gSlNPTi5wYXJzZShleHRyYURhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGV4dHJhRGF0YS5wcHUgIT09IHVuZGVmaW5lZCkgeyAvLyDlpoLmnpzojrflj5ZwcHXmiJDlip9cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhg6I635Y+WUFBV5oiQ5Yqf77yBICR7ZXh0cmFEYXRhLnBwdX1gKTtcbiAgICAgICAgICAgICAgICB3ZXB5LnNldFN0b3JhZ2VTeW5jKCdwcHUnLCBleHRyYURhdGEucHB1KTtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgd2VweS5yZUxhdW5jaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6ICcvcGFnZXMvaG9tZScsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIl19