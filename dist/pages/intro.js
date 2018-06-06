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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImludHJvLmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJidXNpbmVzcyIsInNyYyIsIm5hbWUiLCJhZHZhbnRhZ2UiLCJ0aXRsZSIsInRleHQiLCJtZXRob2RzIiwiY2FsbFBhc3Nwb3J0Iiwid2VweSIsIm5hdmlnYXRlVG9NaW5pUHJvZ3JhbSIsImFwcElkIiwicGF0aCIsImV4dHJhRGF0YSIsImVudlZlcnNpb24iLCJzdWNjZXNzIiwicmVzIiwiY29uc29sZSIsImxvZyIsImNvbXBsZXRlIiwicmVzcCIsImVyck1zZyIsInNob3dNb2RhbCIsImNvbnRlbnQiLCJwcmV2aWV3IiwibGFyZ2VTcmMiLCJyZXBsYWNlIiwicHJldmlld0ltYWdlIiwiY3VycmVudCIsInVybHMiLCJmcm9tIiwidGFyZ2V0IiwiaW1hZ2VVcmwiLCJmYWlsIiwiZXJyIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFDQTs7OztBQUVBOzs7Ozs7Ozs7Ozs7SUFFcUJBLEs7Ozs7Ozs7Ozs7Ozs7O3dMQUNqQkMsTSxHQUFTO0FBQ0xDLG9DQUF3QjtBQURuQixTLFFBR1RDLEksR0FBTztBQUNIQyxzQkFBVSxDQUFDO0FBQ1BDLHFCQUFLLCtEQURFO0FBRVBDLHNCQUFNO0FBRkMsYUFBRCxFQUdQO0FBQ0NELHFCQUFLLCtEQUROO0FBRUNDLHNCQUFNO0FBRlAsYUFITyxFQU1QO0FBQ0NELHFCQUFLLCtEQUROO0FBRUNDLHNCQUFNO0FBRlAsYUFOTyxFQVNQO0FBQ0NELHFCQUFLLCtEQUROO0FBRUNDLHNCQUFNO0FBRlAsYUFUTyxFQVlQO0FBQ0NELHFCQUFLLCtEQUROO0FBRUNDLHNCQUFNO0FBRlAsYUFaTyxFQWVQO0FBQ0NELHFCQUFLLCtEQUROO0FBRUNDLHNCQUFNO0FBRlAsYUFmTyxFQWtCUDtBQUNDRCxxQkFBSywrREFETjtBQUVDQyxzQkFBTTtBQUZQLGFBbEJPLEVBcUJQO0FBQ0NELHFCQUFLLCtEQUROO0FBRUNDLHNCQUFNO0FBRlAsYUFyQk8sRUF3QlA7QUFDQ0QscUJBQUssK0RBRE47QUFFQ0Msc0JBQU07QUFGUCxhQXhCTyxDQURQO0FBNkJIQyx1QkFBVyxDQUFDO0FBQ1JDLHVCQUFPLE1BREM7QUFFUkMsc0JBQU07QUFGRSxhQUFELEVBR1I7QUFDQ0QsdUJBQU8sTUFEUjtBQUVDQyxzQkFBTTtBQUZQLGFBSFEsRUFNUjtBQUNDRCx1QkFBTyxNQURSO0FBRUNDLHNCQUFNO0FBRlAsYUFOUSxFQVNSO0FBQ0NELHVCQUFPLE1BRFI7QUFFQ0Msc0JBQU07QUFGUCxhQVRRLEVBWVI7QUFDQ0QsdUJBQU8sTUFEUjtBQUVDQyxzQkFBTTtBQUZQLGFBWlEsRUFlUjtBQUNDRCx1QkFBTyxPQURSO0FBRUNDLHNCQUFNO0FBRlAsYUFmUTtBQTdCUixTLFFBaURQQyxPLEdBQVU7QUFDTkMsd0JBRE0sMEJBQ1M7QUFDWCxvQkFBSUMsZUFBS0MscUJBQVQsRUFBZ0M7QUFDNUJELG1DQUFLQyxxQkFBTCxDQUEyQjtBQUN2QkMsK0JBQU8sb0JBRGdCO0FBRXZCQyw4QkFBTSxtQkFGaUI7QUFHdkJDLG1DQUFXLEVBSFk7QUFJdkJDLG9DQUFZLFNBSlc7QUFLdkJDLCtCQUx1QixtQkFLZkMsR0FMZSxFQUtWO0FBQ1RDLG9DQUFRQyxHQUFSLENBQVlGLEdBQVosRUFBaUIsT0FBakI7QUFDSCx5QkFQc0I7QUFRdkJHLGdDQVJ1QixvQkFRZEMsSUFSYyxFQVFSO0FBQ1hILG9DQUFRQyxHQUFSLENBQVlFLEtBQUtDLE1BQWpCO0FBQ0g7QUFWc0IscUJBQTNCO0FBWUgsaUJBYkQsTUFhTztBQUNIWixtQ0FBS2EsU0FBTCxDQUFlO0FBQ1hqQiwrQkFBTyxJQURJO0FBRVhrQixpQ0FBUztBQUZFLHFCQUFmO0FBSUg7QUFDSixhQXJCSztBQXNCTkMsbUJBdEJNLG1CQXNCRXRCLEdBdEJGLEVBc0JPO0FBQ1Qsb0JBQU11QixXQUFXdkIsSUFBSXdCLE9BQUosQ0FBWSxNQUFaLEVBQW9CLFlBQXBCLENBQWpCO0FBQ0FqQiwrQkFBS2tCLFlBQUwsQ0FBa0I7QUFDZEMsNkJBQVNILFFBREssRUFDSztBQUNuQkksMEJBQU0sQ0FBQ0osUUFBRCxDQUZRLENBRUk7QUFGSixpQkFBbEI7QUFJSDtBQTVCSyxTOzs7Ozs7Ozs7Ozs7dUNBK0JBLG1COzs7QUFDTlIsd0NBQVFDLEdBQVIsQ0FBWSxRQUFaOzs7Ozs7Ozs7Ozs7Ozs7O0FBRUo7Ozs7OzswQ0FHa0JGLEcsRUFBSztBQUNuQixnQkFBSUEsSUFBSWMsSUFBSixLQUFhLFFBQWpCLEVBQTJCO0FBQ3ZCO0FBQ0FiLHdCQUFRQyxHQUFSLENBQVlGLElBQUllLE1BQWhCO0FBQ0g7QUFDRCxtQkFBTztBQUNIMUIsdUJBQU8sbUJBREo7QUFFSE8sc0JBQU0sY0FGSDtBQUdIb0IsMEJBQVUsK0RBSFA7QUFJSGpCLHVCQUpHLG1CQUlLZixJQUpMLEVBSVc7QUFDVmlCLDRCQUFRQyxHQUFSLENBQVlsQixJQUFaO0FBQ0gsaUJBTkU7QUFPSGlDLG9CQVBHLGdCQU9HQyxHQVBILEVBT1E7QUFDUGpCLDRCQUFRQyxHQUFSLENBQVlnQixHQUFaO0FBQ0g7QUFURSxhQUFQO0FBV0g7Ozs7RUExRzhCekIsZUFBSzBCLEk7O2tCQUFuQnRDLEsiLCJmaWxlIjoiaW50cm8uanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuXG5pbXBvcnQgeyBzbGVlcCB9IGZyb20gJy4uL3V0aWxzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+mmlumhtScsXG4gICAgfTtcbiAgICBkYXRhID0ge1xuICAgICAgICBidXNpbmVzczogW3tcbiAgICAgICAgICAgIHNyYzogJ2h0dHBzOi8vc3RhdGljLjU4LmNvbS9sYmcvc2hhbmdqaWF4Y3hodC96aHVzaG91L2ltZy9jb2RlMS5wbmcnLFxuICAgICAgICAgICAgbmFtZTogJ+WutuijheacjeWKoScsXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHNyYzogJ2h0dHBzOi8vc3RhdGljLjU4LmNvbS9sYmcvc2hhbmdqaWF4Y3hodC96aHVzaG91L2ltZy9jb2RlMi5wbmcnLFxuICAgICAgICAgICAgbmFtZTogJ+S8muWxleetluWIkicsXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHNyYzogJ2h0dHBzOi8vc3RhdGljLjU4LmNvbS9sYmcvc2hhbmdqaWF4Y3hodC96aHVzaG91L2ltZy9jb2RlMy5wbmcnLFxuICAgICAgICAgICAgbmFtZTogJ+WBpei6q+WfueiurScsXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHNyYzogJ2h0dHBzOi8vc3RhdGljLjU4LmNvbS9sYmcvc2hhbmdqaWF4Y3hodC96aHVzaG91L2ltZy9jb2RlNC5wbmcnLFxuICAgICAgICAgICAgbmFtZTogJ+i0p+i/kOeJqea1gScsXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHNyYzogJ2h0dHBzOi8vc3RhdGljLjU4LmNvbS9sYmcvc2hhbmdqaWF4Y3hodC96aHVzaG91L2ltZy9jb2RlNS5wbmcnLFxuICAgICAgICAgICAgbmFtZTogJ+iJuuacr+WfueiurScsXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHNyYzogJ2h0dHBzOi8vc3RhdGljLjU4LmNvbS9sYmcvc2hhbmdqaWF4Y3hodC96aHVzaG91L2ltZy9jb2RlNi5wbmcnLFxuICAgICAgICAgICAgbmFtZTogJ+eUteiEkeenn+i1gScsXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHNyYzogJ2h0dHBzOi8vc3RhdGljLjU4LmNvbS9sYmcvc2hhbmdqaWF4Y3hodC96aHVzaG91L2ltZy9jb2RlNy5wbmcnLFxuICAgICAgICAgICAgbmFtZTogJ+e7tOS/ruacjeWKoScsXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHNyYzogJ2h0dHBzOi8vc3RhdGljLjU4LmNvbS9sYmcvc2hhbmdqaWF4Y3hodC96aHVzaG91L2ltZy9jb2RlOC5wbmcnLFxuICAgICAgICAgICAgbmFtZTogJ+WutuaUv+S/nea0gScsXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHNyYzogJ2h0dHBzOi8vc3RhdGljLjU4LmNvbS9sYmcvc2hhbmdqaWF4Y3hodC96aHVzaG91L2ltZy9jb2RlOS5wbmcnLFxuICAgICAgICAgICAgbmFtZTogJ+WVhuWKoeacjeWKoScsXG4gICAgICAgIH1dLFxuICAgICAgICBhZHZhbnRhZ2U6IFt7XG4gICAgICAgICAgICB0aXRsZTogJ+iHquW4pua1gemHjycsXG4gICAgICAgICAgICB0ZXh0OiAn5b6u5L+h6LaFOeS6v+aXpea0u++8jOiBmuaLouWkp+mHj+a9nOWcqOeUqOaItycsXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRpdGxlOiAn5L6/5o235YWl5Y+jJyxcbiAgICAgICAgICAgIHRleHQ6ICc1MCvlhaXlj6PvvIzlvq7kv6HlhoXovbvmnb7ot7PovazlsI/nqIvluo8nLFxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0aXRsZTogJ+eqgeegtOWcsOWfnycsXG4gICAgICAgICAgICB0ZXh0OiAn6ZmE6L+RNWtt6Ieq5Yqo5a6i5rWB77yM5omp5aSn6L6Q5bCE6IyD5Zu0JyxcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdGl0bGU6ICfnpL7kuqToo4Llj5gnLFxuICAgICAgICAgICAgdGV4dDogJ+WfuuS6juW+ruS/oeekvuS6pO+8jOWunueOsOW5v+S8oOaSreWSjOa2qOeUqOaItycsXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRpdGxlOiAn5b6u5L+h55Sf5oCBJyxcbiAgICAgICAgICAgIHRleHQ6ICflhazkvJflj7flsI/nqIvluo/ov57pgJrvvIzmtYHph4/lop7plb/lpJrpgJTlvoQnLFxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0aXRsZTogJ+S9v+eUqOaXoOmXqOanmycsXG4gICAgICAgICAgICB0ZXh0OiAn5peg6ZyA5LiL6L295peg6ZyA5rOo5YaM77yM5Y2z5byA5Y2z55So6Zq+5bqm5L2OJyxcbiAgICAgICAgfV0sXG4gICAgfTtcbiAgICBtZXRob2RzID0ge1xuICAgICAgICBjYWxsUGFzc3BvcnQoKSB7XG4gICAgICAgICAgICBpZiAod2VweS5uYXZpZ2F0ZVRvTWluaVByb2dyYW0pIHtcbiAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG9NaW5pUHJvZ3JhbSh7XG4gICAgICAgICAgICAgICAgICAgIGFwcElkOiAnd3gyYTljNmVlYjFjNDRhMjg0JyxcbiAgICAgICAgICAgICAgICAgICAgcGF0aDogJ3BhZ2VzL2luZGV4L2luZGV4JyxcbiAgICAgICAgICAgICAgICAgICAgZXh0cmFEYXRhOiB7fSxcbiAgICAgICAgICAgICAgICAgICAgZW52VmVyc2lvbjogJ3JlbGVhc2UnLFxuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzKHJlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzLCAn5omT5byA5oiQ5Yqf77yBJyk7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlKHJlc3ApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3AuZXJyTXNnKTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgd2VweS5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6ICflvZPliY3lvq7kv6HniYjmnKzov4fkvY7vvIzml6Dms5Xkvb/nlKjor6Xlip/og73vvIzor7fljYfnuqfliLDmnIDmlrDlvq7kv6HniYjmnKzlkI7ph43or5XjgIInLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBwcmV2aWV3KHNyYykge1xuICAgICAgICAgICAgY29uc3QgbGFyZ2VTcmMgPSBzcmMucmVwbGFjZSgnLnBuZycsICdfbGFyZ2UucG5nJyk7XG4gICAgICAgICAgICB3ZXB5LnByZXZpZXdJbWFnZSh7XG4gICAgICAgICAgICAgICAgY3VycmVudDogbGFyZ2VTcmMsIC8vIOW9k+WJjeaYvuekuuWbvueJh+eahGh0dHDpk77mjqVcbiAgICAgICAgICAgICAgICB1cmxzOiBbbGFyZ2VTcmNdLCAvLyDpnIDopoHpooTop4jnmoTlm77niYdodHRw6ZO+5o6l5YiX6KGoXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICB9O1xuICAgIGFzeW5jIG9uTG9hZCgpIHtcbiAgICAgICAgYXdhaXQgc2xlZXAoKTtcbiAgICAgICAgY29uc29sZS5sb2coJ29uTG9hZCcpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDnlKjmiLfngrnlh7vlj7PkuIrop5LliIbkuqtcbiAgICAgKi9cbiAgICBvblNoYXJlQXBwTWVzc2FnZShyZXMpIHtcbiAgICAgICAgaWYgKHJlcy5mcm9tID09PSAnYnV0dG9uJykge1xuICAgICAgICAgICAgLy8g5p2l6Ieq6aG16Z2i5YaF6L2s5Y+R5oyJ6ZKuXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMudGFyZ2V0KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdGl0bGU6ICfpq5jmlYjnrqHnkIbllYblrrblsI/nqIvluo/nmoTkuIDnq5nlvI/mnI3liqHlt6XlhbcnLFxuICAgICAgICAgICAgcGF0aDogJy9wYWdlcy9pbnRybycsXG4gICAgICAgICAgICBpbWFnZVVybDogJ2h0dHBzOi8vc3RhdGljLjU4LmNvbS9sYmcvc2hhbmdqaWF4Y3hodC96aHVzaG91L2ltZy9zaGFyZS5wbmcnLFxuICAgICAgICAgICAgc3VjY2VzcyhkYXRhKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZmFpbCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgfVxufVxuIl19