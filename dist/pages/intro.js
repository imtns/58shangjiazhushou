'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _utils = require('./../utils/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Index = function (_wepy$page) {
    _inherits(Index, _wepy$page);

    function Index() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Index);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            navigationBarTitleText: '首页'
        }, _this.data = {
            business: [{
                src: 'https://static.58.com/lbg/shangjiaxcxht/zhushou/img/code1.png',
                name: '家装服务'
            }, {
                src: 'https://static.58.com/lbg/shangjiaxcxht/zhushou/img/code2.png',
                name: '会展策划'
            }, {
                src: 'https://static.58.com/lbg/shangjiaxcxht/zhushou/img/code3.png',
                name: '健身培训'
            }, {
                src: 'https://static.58.com/lbg/shangjiaxcxht/zhushou/img/code4.png',
                name: '货运物流'
            }, {
                src: 'https://static.58.com/lbg/shangjiaxcxht/zhushou/img/code5.png',
                name: '艺术培训'
            }, {
                src: 'https://static.58.com/lbg/shangjiaxcxht/zhushou/img/code6.png',
                name: '电脑租赁'
            }, {
                src: 'https://static.58.com/lbg/shangjiaxcxht/zhushou/img/code7.png',
                name: '维修服务'
            }, {
                src: 'https://static.58.com/lbg/shangjiaxcxht/zhushou/img/code8.png',
                name: '家政保洁'
            }, {
                src: 'https://static.58.com/lbg/shangjiaxcxht/zhushou/img/code9.png',
                name: '商务服务'
            }],
            advantage: [{
                title: '自带流量',
                text: '微信超9亿日活，聚拢大量潜在用户'
            }, {
                title: '便捷入口',
                text: '50+入口，微信内轻松跳转小程序'
            }, {
                title: '突破地域',
                text: '附近5km自动客流，扩大辐射范围'
            }, {
                title: '社交裂变',
                text: '基于微信社交，实现广传播和涨用户'
            }, {
                title: '微信生态',
                text: '公众号小程序连通，流量增长多途径'
            }, {
                title: '使用无门槛',
                text: '无需下载无需注册，即开即用难度低'
            }]
        }, _this.methods = {
            callPassport: function callPassport() {
                if (_wepy2.default.navigateToMiniProgram) {
                    _wepy2.default.navigateToMiniProgram({
                        appId: 'wx2a9c6eeb1c44a284',
                        path: 'pages/index/index',
                        extraData: {},
                        envVersion: 'release',
                        success: function success(res) {
                            console.log(res, '打开成功！');
                        },
                        complete: function complete(resp) {
                            console.log(resp.errMsg);
                        }
                    });
                } else {
                    _wepy2.default.showModal({
                        title: '提示',
                        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
                    });
                }
            },
            preview: function preview(src) {
                var largeSrc = src.replace('.png', '_large.png');
                _wepy2.default.previewImage({
                    current: largeSrc, // 当前显示图片的http链接
                    urls: [largeSrc] // 需要预览的图片http链接列表
                });
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Index, [{
        key: 'onLoad',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return (0, _utils.sleep)();

                            case 2:
                                console.log('onLoad');

                            case 3:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function onLoad() {
                return _ref2.apply(this, arguments);
            }

            return onLoad;
        }()
    }]);

    return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/intro'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImludHJvLmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJidXNpbmVzcyIsInNyYyIsIm5hbWUiLCJhZHZhbnRhZ2UiLCJ0aXRsZSIsInRleHQiLCJtZXRob2RzIiwiY2FsbFBhc3Nwb3J0Iiwid2VweSIsIm5hdmlnYXRlVG9NaW5pUHJvZ3JhbSIsImFwcElkIiwicGF0aCIsImV4dHJhRGF0YSIsImVudlZlcnNpb24iLCJzdWNjZXNzIiwicmVzIiwiY29uc29sZSIsImxvZyIsImNvbXBsZXRlIiwicmVzcCIsImVyck1zZyIsInNob3dNb2RhbCIsImNvbnRlbnQiLCJwcmV2aWV3IiwibGFyZ2VTcmMiLCJyZXBsYWNlIiwicHJldmlld0ltYWdlIiwiY3VycmVudCIsInVybHMiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUNBOzs7O0FBRUE7Ozs7Ozs7Ozs7OztJQUVxQkEsSzs7Ozs7Ozs7Ozs7Ozs7d0xBQ2pCQyxNLEdBQVM7QUFDTEMsb0NBQXdCO0FBRG5CLFMsUUFHVEMsSSxHQUFPO0FBQ0hDLHNCQUFVLENBQUM7QUFDUEMscUJBQUssK0RBREU7QUFFUEMsc0JBQU07QUFGQyxhQUFELEVBR1A7QUFDQ0QscUJBQUssK0RBRE47QUFFQ0Msc0JBQU07QUFGUCxhQUhPLEVBTVA7QUFDQ0QscUJBQUssK0RBRE47QUFFQ0Msc0JBQU07QUFGUCxhQU5PLEVBU1A7QUFDQ0QscUJBQUssK0RBRE47QUFFQ0Msc0JBQU07QUFGUCxhQVRPLEVBWVA7QUFDQ0QscUJBQUssK0RBRE47QUFFQ0Msc0JBQU07QUFGUCxhQVpPLEVBZVA7QUFDQ0QscUJBQUssK0RBRE47QUFFQ0Msc0JBQU07QUFGUCxhQWZPLEVBa0JQO0FBQ0NELHFCQUFLLCtEQUROO0FBRUNDLHNCQUFNO0FBRlAsYUFsQk8sRUFxQlA7QUFDQ0QscUJBQUssK0RBRE47QUFFQ0Msc0JBQU07QUFGUCxhQXJCTyxFQXdCUDtBQUNDRCxxQkFBSywrREFETjtBQUVDQyxzQkFBTTtBQUZQLGFBeEJPLENBRFA7QUE2QkhDLHVCQUFXLENBQUM7QUFDUkMsdUJBQU8sTUFEQztBQUVSQyxzQkFBTTtBQUZFLGFBQUQsRUFHUjtBQUNDRCx1QkFBTyxNQURSO0FBRUNDLHNCQUFNO0FBRlAsYUFIUSxFQU1SO0FBQ0NELHVCQUFPLE1BRFI7QUFFQ0Msc0JBQU07QUFGUCxhQU5RLEVBU1I7QUFDQ0QsdUJBQU8sTUFEUjtBQUVDQyxzQkFBTTtBQUZQLGFBVFEsRUFZUjtBQUNDRCx1QkFBTyxNQURSO0FBRUNDLHNCQUFNO0FBRlAsYUFaUSxFQWVSO0FBQ0NELHVCQUFPLE9BRFI7QUFFQ0Msc0JBQU07QUFGUCxhQWZRO0FBN0JSLFMsUUFpRFBDLE8sR0FBVTtBQUNOQyx3QkFETSwwQkFDUztBQUNYLG9CQUFJQyxlQUFLQyxxQkFBVCxFQUFnQztBQUM1QkQsbUNBQUtDLHFCQUFMLENBQTJCO0FBQ3ZCQywrQkFBTyxvQkFEZ0I7QUFFdkJDLDhCQUFNLG1CQUZpQjtBQUd2QkMsbUNBQVcsRUFIWTtBQUl2QkMsb0NBQVksU0FKVztBQUt2QkMsK0JBTHVCLG1CQUtmQyxHQUxlLEVBS1Y7QUFDVEMsb0NBQVFDLEdBQVIsQ0FBWUYsR0FBWixFQUFpQixPQUFqQjtBQUNILHlCQVBzQjtBQVF2QkcsZ0NBUnVCLG9CQVFkQyxJQVJjLEVBUVI7QUFDWEgsb0NBQVFDLEdBQVIsQ0FBWUUsS0FBS0MsTUFBakI7QUFDSDtBQVZzQixxQkFBM0I7QUFZSCxpQkFiRCxNQWFPO0FBQ0haLG1DQUFLYSxTQUFMLENBQWU7QUFDWGpCLCtCQUFPLElBREk7QUFFWGtCLGlDQUFTO0FBRkUscUJBQWY7QUFJSDtBQUNKLGFBckJLO0FBc0JOQyxtQkF0Qk0sbUJBc0JFdEIsR0F0QkYsRUFzQk87QUFDVCxvQkFBTXVCLFdBQVd2QixJQUFJd0IsT0FBSixDQUFZLE1BQVosRUFBb0IsWUFBcEIsQ0FBakI7QUFDQWpCLCtCQUFLa0IsWUFBTCxDQUFrQjtBQUNkQyw2QkFBU0gsUUFESyxFQUNLO0FBQ25CSSwwQkFBTSxDQUFDSixRQUFELENBRlEsQ0FFSTtBQUZKLGlCQUFsQjtBQUlIO0FBNUJLLFM7Ozs7Ozs7Ozs7Ozt1Q0ErQkEsbUI7OztBQUNOUix3Q0FBUUMsR0FBUixDQUFZLFFBQVo7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFyRjJCVCxlQUFLcUIsSTs7a0JBQW5CakMsSyIsImZpbGUiOiJpbnRyby5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5cbmltcG9ydCB7IHNsZWVwIH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn6aaW6aG1JyxcbiAgICB9O1xuICAgIGRhdGEgPSB7XG4gICAgICAgIGJ1c2luZXNzOiBbe1xuICAgICAgICAgICAgc3JjOiAnaHR0cHM6Ly9zdGF0aWMuNTguY29tL2xiZy9zaGFuZ2ppYXhjeGh0L3podXNob3UvaW1nL2NvZGUxLnBuZycsXG4gICAgICAgICAgICBuYW1lOiAn5a626KOF5pyN5YqhJyxcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgc3JjOiAnaHR0cHM6Ly9zdGF0aWMuNTguY29tL2xiZy9zaGFuZ2ppYXhjeGh0L3podXNob3UvaW1nL2NvZGUyLnBuZycsXG4gICAgICAgICAgICBuYW1lOiAn5Lya5bGV562W5YiSJyxcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgc3JjOiAnaHR0cHM6Ly9zdGF0aWMuNTguY29tL2xiZy9zaGFuZ2ppYXhjeGh0L3podXNob3UvaW1nL2NvZGUzLnBuZycsXG4gICAgICAgICAgICBuYW1lOiAn5YGl6Lqr5Z+56K6tJyxcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgc3JjOiAnaHR0cHM6Ly9zdGF0aWMuNTguY29tL2xiZy9zaGFuZ2ppYXhjeGh0L3podXNob3UvaW1nL2NvZGU0LnBuZycsXG4gICAgICAgICAgICBuYW1lOiAn6LSn6L+Q54mp5rWBJyxcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgc3JjOiAnaHR0cHM6Ly9zdGF0aWMuNTguY29tL2xiZy9zaGFuZ2ppYXhjeGh0L3podXNob3UvaW1nL2NvZGU1LnBuZycsXG4gICAgICAgICAgICBuYW1lOiAn6Im65pyv5Z+56K6tJyxcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgc3JjOiAnaHR0cHM6Ly9zdGF0aWMuNTguY29tL2xiZy9zaGFuZ2ppYXhjeGh0L3podXNob3UvaW1nL2NvZGU2LnBuZycsXG4gICAgICAgICAgICBuYW1lOiAn55S16ISR56ef6LWBJyxcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgc3JjOiAnaHR0cHM6Ly9zdGF0aWMuNTguY29tL2xiZy9zaGFuZ2ppYXhjeGh0L3podXNob3UvaW1nL2NvZGU3LnBuZycsXG4gICAgICAgICAgICBuYW1lOiAn57u05L+u5pyN5YqhJyxcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgc3JjOiAnaHR0cHM6Ly9zdGF0aWMuNTguY29tL2xiZy9zaGFuZ2ppYXhjeGh0L3podXNob3UvaW1nL2NvZGU4LnBuZycsXG4gICAgICAgICAgICBuYW1lOiAn5a625pS/5L+d5rSBJyxcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgc3JjOiAnaHR0cHM6Ly9zdGF0aWMuNTguY29tL2xiZy9zaGFuZ2ppYXhjeGh0L3podXNob3UvaW1nL2NvZGU5LnBuZycsXG4gICAgICAgICAgICBuYW1lOiAn5ZWG5Yqh5pyN5YqhJyxcbiAgICAgICAgfV0sXG4gICAgICAgIGFkdmFudGFnZTogW3tcbiAgICAgICAgICAgIHRpdGxlOiAn6Ieq5bim5rWB6YePJyxcbiAgICAgICAgICAgIHRleHQ6ICflvq7kv6HotoU55Lq/5pel5rS777yM6IGa5oui5aSn6YeP5r2c5Zyo55So5oi3JyxcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdGl0bGU6ICfkvr/mjbflhaXlj6MnLFxuICAgICAgICAgICAgdGV4dDogJzUwK+WFpeWPo++8jOW+ruS/oeWGhei9u+advui3s+i9rOWwj+eoi+W6jycsXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRpdGxlOiAn56qB56C05Zyw5Z+fJyxcbiAgICAgICAgICAgIHRleHQ6ICfpmYTov5E1a23oh6rliqjlrqLmtYHvvIzmianlpKfovpDlsITojIPlm7QnLFxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0aXRsZTogJ+ekvuS6pOijguWPmCcsXG4gICAgICAgICAgICB0ZXh0OiAn5Z+65LqO5b6u5L+h56S+5Lqk77yM5a6e546w5bm/5Lyg5pKt5ZKM5rao55So5oi3JyxcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdGl0bGU6ICflvq7kv6HnlJ/mgIEnLFxuICAgICAgICAgICAgdGV4dDogJ+WFrOS8l+WPt+Wwj+eoi+W6j+i/numAmu+8jOa1gemHj+WinumVv+WkmumAlOW+hCcsXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRpdGxlOiAn5L2/55So5peg6Zeo5qebJyxcbiAgICAgICAgICAgIHRleHQ6ICfml6DpnIDkuIvovb3ml6DpnIDms6jlhozvvIzljbPlvIDljbPnlKjpmr7luqbkvY4nLFxuICAgICAgICB9XSxcbiAgICB9O1xuICAgIG1ldGhvZHMgPSB7XG4gICAgICAgIGNhbGxQYXNzcG9ydCgpIHtcbiAgICAgICAgICAgIGlmICh3ZXB5Lm5hdmlnYXRlVG9NaW5pUHJvZ3JhbSkge1xuICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUb01pbmlQcm9ncmFtKHtcbiAgICAgICAgICAgICAgICAgICAgYXBwSWQ6ICd3eDJhOWM2ZWViMWM0NGEyODQnLFxuICAgICAgICAgICAgICAgICAgICBwYXRoOiAncGFnZXMvaW5kZXgvaW5kZXgnLFxuICAgICAgICAgICAgICAgICAgICBleHRyYURhdGE6IHt9LFxuICAgICAgICAgICAgICAgICAgICBlbnZWZXJzaW9uOiAncmVsZWFzZScsXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3MocmVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMsICfmiZPlvIDmiJDlip/vvIEnKTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgY29tcGxldGUocmVzcCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcC5lcnJNc2cpO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB3ZXB5LnNob3dNb2RhbCh7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgICAgICAgICAgICAgY29udGVudDogJ+W9k+WJjeW+ruS/oeeJiOacrOi/h+S9ju+8jOaXoOazleS9v+eUqOivpeWKn+iDve+8jOivt+WNh+e6p+WIsOacgOaWsOW+ruS/oeeJiOacrOWQjumHjeivleOAgicsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHByZXZpZXcoc3JjKSB7XG4gICAgICAgICAgICBjb25zdCBsYXJnZVNyYyA9IHNyYy5yZXBsYWNlKCcucG5nJywgJ19sYXJnZS5wbmcnKTtcbiAgICAgICAgICAgIHdlcHkucHJldmlld0ltYWdlKHtcbiAgICAgICAgICAgICAgICBjdXJyZW50OiBsYXJnZVNyYywgLy8g5b2T5YmN5pi+56S65Zu+54mH55qEaHR0cOmTvuaOpVxuICAgICAgICAgICAgICAgIHVybHM6IFtsYXJnZVNyY10sIC8vIOmcgOimgemihOiniOeahOWbvueJh2h0dHDpk77mjqXliJfooahcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgIH07XG4gICAgYXN5bmMgb25Mb2FkKCkge1xuICAgICAgICBhd2FpdCBzbGVlcCgpO1xuICAgICAgICBjb25zb2xlLmxvZygnb25Mb2FkJyk7XG4gICAgfVxufVxuIl19