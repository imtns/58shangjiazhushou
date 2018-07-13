'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _utils = require('./../utils/index.js');

var _ajax = require('./../utils/ajax.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Feedback = function (_wepy$page) {
    _inherits(Feedback, _wepy$page);

    function Feedback() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Feedback);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Feedback.__proto__ || Object.getPrototypeOf(Feedback)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            navigationBarTitleText: '意见反馈'
        }, _this.data = {
            list: [{
                type: '1',
                text: '优享小程序介绍'
            }, {
                type: '2',
                text: '微信小程序介绍'
            }, {
                type: '3',
                text: '登录常见问题'
            }],
            content: ''
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Feedback, [{
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
    }, {
        key: 'input',
        value: function input(e) {
            var val = e.detail.value;
            this.content = val;
            this.$apply();
        }
    }, {
        key: 'submit',
        value: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                var con;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                con = (0, _utils.filteremoji)(this.content);

                                if (con.trim()) {
                                    _context2.next = 4;
                                    break;
                                }

                                (0, _utils.alert)('请编辑留言后提交！');
                                return _context2.abrupt('return');

                            case 4:
                                _context2.prev = 4;

                                this.content = '';
                                this.$apply();
                                console.log('3', this.content, '4', con);
                                _context2.next = 10;
                                return (0, _ajax.post)('/suggestion/submit', { content: con });

                            case 10:
                                (0, _utils.alert)('提交成功，谢谢您的建议！', '提示', function () {
                                    console.log('进入callback');
                                    _wepy2.default.redirectTo({
                                        url: 'home'
                                    });
                                });
                                _context2.next = 16;
                                break;

                            case 13:
                                _context2.prev = 13;
                                _context2.t0 = _context2['catch'](4);

                                console.log(_context2.t0);

                            case 16:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this, [[4, 13]]);
            }));

            function submit() {
                return _ref3.apply(this, arguments);
            }

            return submit;
        }()
    }, {
        key: 'tofeedbackDetail',
        value: function tofeedbackDetail(e) {
            var type = e.currentTarget.dataset.type;

            if (type === '3') {
                _wepy2.default.navigateTo({
                    url: './PopQuestions'
                });
            } else {
                _wepy2.default.navigateTo({
                    url: './feedbackDetail?type=' + type
                });
            }
        }
    }]);

    return Feedback;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Feedback , 'pages/feedback'));
