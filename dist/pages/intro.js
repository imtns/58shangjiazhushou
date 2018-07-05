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
