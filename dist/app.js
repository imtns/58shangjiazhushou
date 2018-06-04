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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJwYWdlcyIsIndpbmRvdyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJ1c2UiLCJjb25zb2xlIiwibG9nIiwib3B0aW9ucyIsInBhdGgiLCJzY2VuZSIsInJlZmVycmVySW5mbyIsImV4dHJhRGF0YSIsIkpTT04iLCJwYXJzZSIsInBwdSIsInVuZGVmaW5lZCIsIndlcHkiLCJzZXRTdG9yYWdlU3luYyIsInNldFRpbWVvdXQiLCJyZUxhdW5jaCIsInVybCIsImFwcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7QUFDQTs7Ozs7QUFHSSxzQkFBYztBQUFBOztBQUFBOztBQUFBLGNBSWRBLE1BSmMsR0FJTDtBQUNMQyxtQkFBTyxDQUNILFlBREcsRUFDVztBQUNkLHlCQUZHLEVBRVk7QUFDZix3QkFIRyxFQUdXO0FBQ2QsMkJBSkcsRUFJYztBQUNqQiw4QkFMRyxFQUtpQjtBQUNwQix3QkFORyxFQU1XO0FBQ2QsNEJBUEcsRUFPZTtBQUNsQiwyQkFSRyxFQVFjO0FBQ2pCLHVCQVRHLEVBU1U7QUFDYix5QkFWRyxFQVdILGtCQVhHLEVBV2lCO0FBQ3BCLDRCQVpHLEVBWWU7QUFDbEIscUNBYkcsRUFhd0I7QUFDM0IsZ0NBZEcsRUFjbUI7QUFDdEIsaUNBZkcsRUFlb0I7QUFDdkIsNEJBaEJHLEVBZ0JlO0FBQ2xCLGtDQWpCRyxFQWlCcUI7QUFDeEIsZ0NBbEJHLEVBa0JtQjtBQUN0QixpQ0FuQkcsRUFtQm9CO0FBQ3ZCLHFDQXBCRyxFQW9Cd0I7QUFDM0IsNkJBckJHLENBREY7QUF3QkxDLG9CQUFRO0FBQ0pDLHFDQUFxQixPQURqQjtBQUVKQyw4Q0FBOEIsTUFGMUI7QUFHSkMsd0NBQXdCLFFBSHBCO0FBSUpDLHdDQUF3QjtBQUpwQjtBQXhCSCxTQUpLOztBQUVWLGNBQUtDLEdBQUwsQ0FBUyxXQUFUO0FBRlU7QUFHYjs7OzttQ0FnQ1c7QUFDUkMsb0JBQVFDLEdBQVIsQ0FBWSxVQUFaO0FBQ0g7OzsrQkFDT0MsTyxFQUFTO0FBQUEsZ0JBQ0xDLElBREssR0FDSUQsT0FESixDQUNMQyxJQURLOztBQUViSCxvQkFBUUMsR0FBUixDQUFZRSxJQUFaO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQUlELFFBQVFFLEtBQVIsS0FBa0IsSUFBbEIsSUFBMEJELFNBQVMsYUFBdkMsRUFBc0Q7QUFDbEQsb0JBQUksQ0FBQ0QsUUFBUUcsWUFBYixFQUEyQjtBQUN2QkwsNEJBQVFDLEdBQVIsQ0FBWSx3QkFBWjtBQUNIO0FBQ0Qsb0JBQUksQ0FBQ0MsUUFBUUcsWUFBUixDQUFxQkMsU0FBMUIsRUFBcUM7QUFDakNOLDRCQUFRQyxHQUFSLENBQVksa0NBQVo7QUFDSDtBQU5pRCxvQkFPNUNLLFNBUDRDLEdBTzlCSixRQUFRRyxZQVBzQixDQU81Q0MsU0FQNEM7O0FBUWxELG9CQUFJLFFBQU9BLFNBQVAseUNBQU9BLFNBQVAsT0FBcUIsUUFBekIsRUFBbUM7QUFDL0JBLGdDQUFZQyxLQUFLQyxLQUFMLENBQVdGLFNBQVgsQ0FBWjtBQUNIO0FBQ0Qsb0JBQUlBLFVBQVVHLEdBQVYsS0FBa0JDLFNBQXRCLEVBQWlDO0FBQUU7QUFDL0JWLDRCQUFRQyxHQUFSLHdDQUF3QkssVUFBVUcsR0FBbEM7QUFDQUUsbUNBQUtDLGNBQUwsQ0FBb0IsS0FBcEIsRUFBMkJOLFVBQVVHLEdBQXJDO0FBQ0FJLCtCQUFXLFlBQU07QUFDYkYsdUNBQUtHLFFBQUwsQ0FBYztBQUNWQyxpQ0FBSztBQURLLHlCQUFkO0FBR0gscUJBSkQsRUFJRyxJQUpIO0FBS0g7QUFDSjtBQUNKOzs7O0VBbEV3QkosZUFBS0ssRyIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuaW1wb3J0ICd3ZXB5LWFzeW5jLWZ1bmN0aW9uJztcbi8vIGltcG9ydCB7IGFsZXJ0IH0gZnJvbSAnLi91dGlscyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgd2VweS5hcHAge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnVzZSgncHJvbWlzaWZ5Jyk7XG4gICAgfVxuICAgIGNvbmZpZyA9IHtcbiAgICAgICAgcGFnZXM6IFtcbiAgICAgICAgICAgICdwYWdlcy9ob21lJywgLy8g55m76ZmG5LmL5ZCO55qE5Li76aG1XG4gICAgICAgICAgICAncGFnZXMvaW50cm8nLCAvLyDmsqHmnInnmbvpmYbnmoTku4vnu43pobXpnaJcbiAgICAgICAgICAgICdwYWdlcy9teU1wJywgLy8g5oiR55qE5bCP56iL5bqPXG4gICAgICAgICAgICAncGFnZXMvQXBwSW5mbycsIC8vIOWwj+eoi+W6j+S/oeaBr1xuICAgICAgICAgICAgJ3BhZ2VzL1VwbG9hZEluZm8nLCAvLyDkuIrkvKDntKDmnZDpppbpobVcbiAgICAgICAgICAgICdwYWdlcy9zZW5kJywgLy8g5rWL6K+V5o6I5p2D6aG16Z2i5LiT55So77yM5Yu/5YigXG4gICAgICAgICAgICAncGFnZXMvcHJvZ3Jlc3MnLCAvLyDlrozmiJDluqbpobXpnaJcbiAgICAgICAgICAgICdwYWdlcy9BcHBFZGl0JywgLy8g5bCP56iL5bqP57yW6L6RXG4gICAgICAgICAgICAncGFnZXMvYnV5JywgLy8g6LSt5Lmw6aG16Z2iXG4gICAgICAgICAgICAncGFnZXMvaW5kZXgnLFxuICAgICAgICAgICAgJ3BhZ2VzL25vdGljZUxpc3QnLCAvLyDmtojmga/pgJrnn6XpobXpnaJcbiAgICAgICAgICAgICdwYWdlcy9yZWdpc3RlZCcsIC8vIOW9k+WJjeWwj+eoi+W6j+W3suazqOWGjFxuICAgICAgICAgICAgJ3BhZ2VzL3JlZ2lzdE1haW5BY2NvdW50JywgLy8g5Li75L2T6LSm5oi35L+h5oGvXG4gICAgICAgICAgICAncGFnZXMvcmVnaXN0TWFuYWdlJywgLy8g566h55CG5ZGY5L+h5oGvXG4gICAgICAgICAgICAncGFnZXMvcmVnaXN0U3VjY2VzcycsIC8vIOazqOWGjOWujOaIkFxuICAgICAgICAgICAgJ3BhZ2VzL2ZlZWRiYWNrJywgLy8g5oSP6KeB5Y+N6aaIXG4gICAgICAgICAgICAncGFnZXMvZmVlZGJhY2tEZXRhaWwnLCAvLyDmhI/op4Hlj43ppojkvJjpgInjgIHlvq7kv6Hpl67popjku4vnu41cbiAgICAgICAgICAgICdwYWdlcy9Qb3BRdWVzdGlvbnMnLCAvLyDmhI/op4Hlj43ppojkvJjpgInjgIHlvq7kv6Hpl67popjku4vnu41cbiAgICAgICAgICAgICdwYWdlcy9VcGxvYWRBcnRpY2xlJywgLy8g5LiK5Lyg5paH56ugXG4gICAgICAgICAgICAncGFnZXMvVXBsb2FkSW5mb1N1Y2Nlc3MnLCAvLyDntKDmnZDkuIrkvKDmiJDlip9cbiAgICAgICAgICAgICdwYWdlcy9WaWRlb1BsYXknLCAvLyDop4bpopHmkq3mlL7pobXpnaJcbiAgICAgICAgXSxcbiAgICAgICAgd2luZG93OiB7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kVGV4dFN0eWxlOiAnbGlnaHQnLFxuICAgICAgICAgICAgbmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvcjogJyNmZmYnLFxuICAgICAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ1dlQ2hhdCcsXG4gICAgICAgICAgICBuYXZpZ2F0aW9uQmFyVGV4dFN0eWxlOiAnYmxhY2snLFxuICAgICAgICB9LFxuICAgIH1cbiAgICBvbkxhdW5jaCAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdvbmxhaW5jaCcpO1xuICAgIH1cbiAgICBvblNob3cgKG9wdGlvbnMpIHtcbiAgICAgICAgY29uc3QgeyBwYXRoIH0gPSBvcHRpb25zO1xuICAgICAgICBjb25zb2xlLmxvZyhwYXRoKTtcbiAgICAgICAgLy8gY29uc3QgcGFnZXMgPSBnZXRDdXJyZW50UGFnZXMoKTtcbiAgICAgICAgLy8gY29uc3QgY3VyclBhZ2UgPSBwYWdlc1twYWdlcy5sZW5ndGggLSAxXTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ2N1cnJQYWdlJywgY3VyclBhZ2Uucm91dGUpO1xuICAgICAgICBpZiAob3B0aW9ucy5zY2VuZSA9PT0gMTAzOCAmJiBwYXRoID09PSAncGFnZXMvaW50cm8nKSB7XG4gICAgICAgICAgICBpZiAoIW9wdGlvbnMucmVmZXJyZXJJbmZvKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ29wdGlvbnMucmVmZXJyZXJJbmZv5Li656m6Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIW9wdGlvbnMucmVmZXJyZXJJbmZvLmV4dHJhRGF0YSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdvcHRpb25zLnJlZmVycmVySW5mby5leHRyYURhdGHkuLrnqbonKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCB7IGV4dHJhRGF0YSB9ID0gb3B0aW9ucy5yZWZlcnJlckluZm87XG4gICAgICAgICAgICBpZiAodHlwZW9mIGV4dHJhRGF0YSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICBleHRyYURhdGEgPSBKU09OLnBhcnNlKGV4dHJhRGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZXh0cmFEYXRhLnBwdSAhPT0gdW5kZWZpbmVkKSB7IC8vIOWmguaenOiOt+WPlnBwdeaIkOWKn1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGDojrflj5ZQUFXmiJDlip/vvIEgJHtleHRyYURhdGEucHB1fWApO1xuICAgICAgICAgICAgICAgIHdlcHkuc2V0U3RvcmFnZVN5bmMoJ3BwdScsIGV4dHJhRGF0YS5wcHUpO1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB3ZXB5LnJlTGF1bmNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogJy9wYWdlcy9ob21lJyxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=