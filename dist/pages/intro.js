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
        /**
         * 用户点击右上角分享
         */

    }, {
        key: 'onShareAppMessage',
        value: function onShareAppMessage(res) {
            if (res.from === 'button') {
                // 来自页面内转发按钮
                console.log(res.target);
            }
            return {
                title: '高效管理商家小程序的一站式服务工具',
                path: '/pages/intro',
                imageUrl: 'https://static.58.com/lbg/shangjiaxcxht/zhushou/img/share.png',
                success: function success(data) {
                    console.log(data);
                },
                fail: function fail(err) {
                    console.log(err);
                }
            };
        }
    }]);

    return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/intro'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImludHJvLmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJidXNpbmVzcyIsInNyYyIsIm5hbWUiLCJhZHZhbnRhZ2UiLCJ0aXRsZSIsInRleHQiLCJtZXRob2RzIiwiY2FsbFBhc3Nwb3J0Iiwid2VweSIsIm5hdmlnYXRlVG9NaW5pUHJvZ3JhbSIsImFwcElkIiwicGF0aCIsImV4dHJhRGF0YSIsImVudlZlcnNpb24iLCJzdWNjZXNzIiwicmVzIiwiY29uc29sZSIsImxvZyIsImNvbXBsZXRlIiwicmVzcCIsImVyck1zZyIsInNob3dNb2RhbCIsImNvbnRlbnQiLCJwcmV2aWV3IiwibGFyZ2VTcmMiLCJyZXBsYWNlIiwicHJldmlld0ltYWdlIiwiY3VycmVudCIsInVybHMiLCJmcm9tIiwidGFyZ2V0IiwiaW1hZ2VVcmwiLCJmYWlsIiwiZXJyIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFDQTs7OztBQUVBOzs7Ozs7Ozs7Ozs7SUFFcUJBLEs7Ozs7Ozs7Ozs7Ozs7O3dMQUNqQkMsTSxHQUFTO0FBQ0xDLG9DQUF3QjtBQURuQixTLFFBR1RDLEksR0FBTztBQUNIQyxzQkFBVSxDQUFDO0FBQ1BDLHFCQUFLLCtEQURFO0FBRVBDLHNCQUFNO0FBRkMsYUFBRCxFQUdQO0FBQ0NELHFCQUFLLCtEQUROO0FBRUNDLHNCQUFNO0FBRlAsYUFITyxFQU1QO0FBQ0NELHFCQUFLLCtEQUROO0FBRUNDLHNCQUFNO0FBRlAsYUFOTyxFQVNQO0FBQ0NELHFCQUFLLCtEQUROO0FBRUNDLHNCQUFNO0FBRlAsYUFUTyxFQVlQO0FBQ0NELHFCQUFLLCtEQUROO0FBRUNDLHNCQUFNO0FBRlAsYUFaTyxFQWVQO0FBQ0NELHFCQUFLLCtEQUROO0FBRUNDLHNCQUFNO0FBRlAsYUFmTyxFQWtCUDtBQUNDRCxxQkFBSywrREFETjtBQUVDQyxzQkFBTTtBQUZQLGFBbEJPLEVBcUJQO0FBQ0NELHFCQUFLLCtEQUROO0FBRUNDLHNCQUFNO0FBRlAsYUFyQk8sRUF3QlA7QUFDQ0QscUJBQUssK0RBRE47QUFFQ0Msc0JBQU07QUFGUCxhQXhCTyxDQURQO0FBNkJIQyx1QkFBVyxDQUFDO0FBQ1JDLHVCQUFPLE1BREM7QUFFUkMsc0JBQU07QUFGRSxhQUFELEVBR1I7QUFDQ0QsdUJBQU8sTUFEUjtBQUVDQyxzQkFBTTtBQUZQLGFBSFEsRUFNUjtBQUNDRCx1QkFBTyxNQURSO0FBRUNDLHNCQUFNO0FBRlAsYUFOUSxFQVNSO0FBQ0NELHVCQUFPLE1BRFI7QUFFQ0Msc0JBQU07QUFGUCxhQVRRLEVBWVI7QUFDQ0QsdUJBQU8sTUFEUjtBQUVDQyxzQkFBTTtBQUZQLGFBWlEsRUFlUjtBQUNDRCx1QkFBTyxPQURSO0FBRUNDLHNCQUFNO0FBRlAsYUFmUTtBQTdCUixTLFFBaURQQyxPLEdBQVU7QUFDTkMsd0JBRE0sMEJBQ1M7QUFDWCxvQkFBSUMsZUFBS0MscUJBQVQsRUFBZ0M7QUFDNUJELG1DQUFLQyxxQkFBTCxDQUEyQjtBQUN2QkMsK0JBQU8sb0JBRGdCO0FBRXZCQyw4QkFBTSxtQkFGaUI7QUFHdkJDLG1DQUFXLEVBSFk7QUFJdkJDLG9DQUFZLFNBSlc7QUFLdkJDLCtCQUx1QixtQkFLZkMsR0FMZSxFQUtWO0FBQ1RDLG9DQUFRQyxHQUFSLENBQVlGLEdBQVosRUFBaUIsT0FBakI7QUFDSCx5QkFQc0I7QUFRdkJHLGdDQVJ1QixvQkFRZEMsSUFSYyxFQVFSO0FBQ1hILG9DQUFRQyxHQUFSLENBQVlFLEtBQUtDLE1BQWpCO0FBQ0g7QUFWc0IscUJBQTNCO0FBWUgsaUJBYkQsTUFhTztBQUNIWixtQ0FBS2EsU0FBTCxDQUFlO0FBQ1hqQiwrQkFBTyxJQURJO0FBRVhrQixpQ0FBUztBQUZFLHFCQUFmO0FBSUg7QUFDSixhQXJCSztBQXNCTkMsbUJBdEJNLG1CQXNCRXRCLEdBdEJGLEVBc0JPO0FBQ1Qsb0JBQU11QixXQUFXdkIsSUFBSXdCLE9BQUosQ0FBWSxNQUFaLEVBQW9CLFlBQXBCLENBQWpCO0FBQ0FqQiwrQkFBS2tCLFlBQUwsQ0FBa0I7QUFDZEMsNkJBQVNILFFBREssRUFDSztBQUNuQkksMEJBQU0sQ0FBQ0osUUFBRCxDQUZRLENBRUk7QUFGSixpQkFBbEI7QUFJSDtBQTVCSyxTOzs7Ozs7Ozs7Ozs7dUNBK0JBLG1COzs7QUFDTlIsd0NBQVFDLEdBQVIsQ0FBWSxRQUFaOzs7Ozs7Ozs7Ozs7Ozs7O0FBRUo7Ozs7OzswQ0FHa0JGLEcsRUFBSztBQUNuQixnQkFBSUEsSUFBSWMsSUFBSixLQUFhLFFBQWpCLEVBQTJCO0FBQ3ZCO0FBQ0FiLHdCQUFRQyxHQUFSLENBQVlGLElBQUllLE1BQWhCO0FBQ0g7QUFDRCxtQkFBTztBQUNIMUIsdUJBQU8sbUJBREo7QUFFSE8sc0JBQU0sY0FGSDtBQUdIb0IsMEJBQVUsK0RBSFA7QUFJSGpCLHVCQUpHLG1CQUlLZixJQUpMLEVBSVc7QUFDVmlCLDRCQUFRQyxHQUFSLENBQVlsQixJQUFaO0FBQ0gsaUJBTkU7QUFPSGlDLG9CQVBHLGdCQU9HQyxHQVBILEVBT1E7QUFDUGpCLDRCQUFRQyxHQUFSLENBQVlnQixHQUFaO0FBQ0g7QUFURSxhQUFQO0FBV0g7Ozs7RUExRzhCekIsZUFBSzBCLEk7O2tCQUFuQnRDLEsiLCJmaWxlIjoiaW50cm8uanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XHJcblxyXG5pbXBvcnQgeyBzbGVlcCB9IGZyb20gJy4uL3V0aWxzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICAgIGNvbmZpZyA9IHtcclxuICAgICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn6aaW6aG1JyxcclxuICAgIH07XHJcbiAgICBkYXRhID0ge1xyXG4gICAgICAgIGJ1c2luZXNzOiBbe1xyXG4gICAgICAgICAgICBzcmM6ICdodHRwczovL3N0YXRpYy41OC5jb20vbGJnL3NoYW5namlheGN4aHQvemh1c2hvdS9pbWcvY29kZTEucG5nJyxcclxuICAgICAgICAgICAgbmFtZTogJ+WutuijheacjeWKoScsXHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBzcmM6ICdodHRwczovL3N0YXRpYy41OC5jb20vbGJnL3NoYW5namlheGN4aHQvemh1c2hvdS9pbWcvY29kZTIucG5nJyxcclxuICAgICAgICAgICAgbmFtZTogJ+S8muWxleetluWIkicsXHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBzcmM6ICdodHRwczovL3N0YXRpYy41OC5jb20vbGJnL3NoYW5namlheGN4aHQvemh1c2hvdS9pbWcvY29kZTMucG5nJyxcclxuICAgICAgICAgICAgbmFtZTogJ+WBpei6q+WfueiurScsXHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBzcmM6ICdodHRwczovL3N0YXRpYy41OC5jb20vbGJnL3NoYW5namlheGN4aHQvemh1c2hvdS9pbWcvY29kZTQucG5nJyxcclxuICAgICAgICAgICAgbmFtZTogJ+i0p+i/kOeJqea1gScsXHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBzcmM6ICdodHRwczovL3N0YXRpYy41OC5jb20vbGJnL3NoYW5namlheGN4aHQvemh1c2hvdS9pbWcvY29kZTUucG5nJyxcclxuICAgICAgICAgICAgbmFtZTogJ+iJuuacr+WfueiurScsXHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBzcmM6ICdodHRwczovL3N0YXRpYy41OC5jb20vbGJnL3NoYW5namlheGN4aHQvemh1c2hvdS9pbWcvY29kZTYucG5nJyxcclxuICAgICAgICAgICAgbmFtZTogJ+eUteiEkeenn+i1gScsXHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBzcmM6ICdodHRwczovL3N0YXRpYy41OC5jb20vbGJnL3NoYW5namlheGN4aHQvemh1c2hvdS9pbWcvY29kZTcucG5nJyxcclxuICAgICAgICAgICAgbmFtZTogJ+e7tOS/ruacjeWKoScsXHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBzcmM6ICdodHRwczovL3N0YXRpYy41OC5jb20vbGJnL3NoYW5namlheGN4aHQvemh1c2hvdS9pbWcvY29kZTgucG5nJyxcclxuICAgICAgICAgICAgbmFtZTogJ+WutuaUv+S/nea0gScsXHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBzcmM6ICdodHRwczovL3N0YXRpYy41OC5jb20vbGJnL3NoYW5namlheGN4aHQvemh1c2hvdS9pbWcvY29kZTkucG5nJyxcclxuICAgICAgICAgICAgbmFtZTogJ+WVhuWKoeacjeWKoScsXHJcbiAgICAgICAgfV0sXHJcbiAgICAgICAgYWR2YW50YWdlOiBbe1xyXG4gICAgICAgICAgICB0aXRsZTogJ+iHquW4pua1gemHjycsXHJcbiAgICAgICAgICAgIHRleHQ6ICflvq7kv6HotoU55Lq/5pel5rS777yM6IGa5oui5aSn6YeP5r2c5Zyo55So5oi3JyxcclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIHRpdGxlOiAn5L6/5o235YWl5Y+jJyxcclxuICAgICAgICAgICAgdGV4dDogJzUwK+WFpeWPo++8jOW+ruS/oeWGhei9u+advui3s+i9rOWwj+eoi+W6jycsXHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICB0aXRsZTogJ+eqgeegtOWcsOWfnycsXHJcbiAgICAgICAgICAgIHRleHQ6ICfpmYTov5E1a23oh6rliqjlrqLmtYHvvIzmianlpKfovpDlsITojIPlm7QnLFxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgICAgdGl0bGU6ICfnpL7kuqToo4Llj5gnLFxyXG4gICAgICAgICAgICB0ZXh0OiAn5Z+65LqO5b6u5L+h56S+5Lqk77yM5a6e546w5bm/5Lyg5pKt5ZKM5rao55So5oi3JyxcclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIHRpdGxlOiAn5b6u5L+h55Sf5oCBJyxcclxuICAgICAgICAgICAgdGV4dDogJ+WFrOS8l+WPt+Wwj+eoi+W6j+i/numAmu+8jOa1gemHj+WinumVv+WkmumAlOW+hCcsXHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICB0aXRsZTogJ+S9v+eUqOaXoOmXqOanmycsXHJcbiAgICAgICAgICAgIHRleHQ6ICfml6DpnIDkuIvovb3ml6DpnIDms6jlhozvvIzljbPlvIDljbPnlKjpmr7luqbkvY4nLFxyXG4gICAgICAgIH1dLFxyXG4gICAgfTtcclxuICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgICAgY2FsbFBhc3Nwb3J0KCkge1xyXG4gICAgICAgICAgICBpZiAod2VweS5uYXZpZ2F0ZVRvTWluaVByb2dyYW0pIHtcclxuICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUb01pbmlQcm9ncmFtKHtcclxuICAgICAgICAgICAgICAgICAgICBhcHBJZDogJ3d4MmE5YzZlZWIxYzQ0YTI4NCcsXHJcbiAgICAgICAgICAgICAgICAgICAgcGF0aDogJ3BhZ2VzL2luZGV4L2luZGV4JyxcclxuICAgICAgICAgICAgICAgICAgICBleHRyYURhdGE6IHt9LFxyXG4gICAgICAgICAgICAgICAgICAgIGVudlZlcnNpb246ICdyZWxlYXNlJyxcclxuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMsICfmiZPlvIDmiJDlip/vvIEnKTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlKHJlc3ApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcC5lcnJNc2cpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHdlcHkuc2hvd01vZGFsKHtcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ+aPkOekuicsXHJcbiAgICAgICAgICAgICAgICAgICAgY29udGVudDogJ+W9k+WJjeW+ruS/oeeJiOacrOi/h+S9ju+8jOaXoOazleS9v+eUqOivpeWKn+iDve+8jOivt+WNh+e6p+WIsOacgOaWsOW+ruS/oeeJiOacrOWQjumHjeivleOAgicsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcHJldmlldyhzcmMpIHtcclxuICAgICAgICAgICAgY29uc3QgbGFyZ2VTcmMgPSBzcmMucmVwbGFjZSgnLnBuZycsICdfbGFyZ2UucG5nJyk7XHJcbiAgICAgICAgICAgIHdlcHkucHJldmlld0ltYWdlKHtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnQ6IGxhcmdlU3JjLCAvLyDlvZPliY3mmL7npLrlm77niYfnmoRodHRw6ZO+5o6lXHJcbiAgICAgICAgICAgICAgICB1cmxzOiBbbGFyZ2VTcmNdLCAvLyDpnIDopoHpooTop4jnmoTlm77niYdodHRw6ZO+5o6l5YiX6KGoXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICB9O1xyXG4gICAgYXN5bmMgb25Mb2FkKCkge1xyXG4gICAgICAgIGF3YWl0IHNsZWVwKCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ29uTG9hZCcpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDnlKjmiLfngrnlh7vlj7PkuIrop5LliIbkuqtcclxuICAgICAqL1xyXG4gICAgb25TaGFyZUFwcE1lc3NhZ2UocmVzKSB7XHJcbiAgICAgICAgaWYgKHJlcy5mcm9tID09PSAnYnV0dG9uJykge1xyXG4gICAgICAgICAgICAvLyDmnaXoh6rpobXpnaLlhoXovazlj5HmjInpkq5cclxuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzLnRhcmdldCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHRpdGxlOiAn6auY5pWI566h55CG5ZWG5a625bCP56iL5bqP55qE5LiA56uZ5byP5pyN5Yqh5bel5YW3JyxcclxuICAgICAgICAgICAgcGF0aDogJy9wYWdlcy9pbnRybycsXHJcbiAgICAgICAgICAgIGltYWdlVXJsOiAnaHR0cHM6Ly9zdGF0aWMuNTguY29tL2xiZy9zaGFuZ2ppYXhjeGh0L3podXNob3UvaW1nL3NoYXJlLnBuZycsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3MoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGZhaWwgKGVycikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59XHJcbiJdfQ==