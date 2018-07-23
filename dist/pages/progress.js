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

var Index = function (_wepy$page) {
    _inherits(Index, _wepy$page);

    function Index() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Index);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
            business: {
                current: {
                    expiryDate: '2018-29-23'
                }
            },
            progress: []
        }, _this.config = {
            navigationBarTitleText: '完成度'
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
    }, {
        key: 'onShow',
        value: function onShow() {
            this.loadData();
        }
    }, {
        key: 'loadData',
        value: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                var subData, _ref4, data, mpInfo;

                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                subData = {
                                    mpid: _wepy2.default.getStorageSync('current_mpid') || ''
                                };

                                if (subData.mpid) {
                                    _context2.next = 4;
                                    break;
                                }

                                (0, _utils.alert)('无法获取当前小程序的appid', '提示');
                                return _context2.abrupt('return');

                            case 4:
                                _context2.next = 6;
                                return (0, _ajax.post)('/mplogic/pgdetail', subData);

                            case 6:
                                _ref4 = _context2.sent;
                                data = _ref4.data;
                                _context2.next = 10;
                                return (0, _ajax.post)('/mplogic/index', subData);

                            case 10:
                                mpInfo = _context2.sent;

                                this.business = Object.assign({}, this.business, {
                                    current: mpInfo.data.mpinfo
                                });
                                this.progress = data.map(function (item) {
                                    var myitem = item;
                                    if (myitem.successTime) {
                                        myitem.successTime = myitem.successTime.split(':')[0] + ':' + myitem.successTime.split(':')[1];
                                    }
                                    if (myitem.nodeType === 8 && myitem.status === 2) {
                                        myitem.content = '审核失败';
                                    } else if (myitem.nodeType === 8 && myitem.status === 1) {
                                        myitem.content = '审核成功';
                                    }
                                    return myitem;
                                });
                                this.$apply();

                            case 14:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function loadData() {
                return _ref3.apply(this, arguments);
            }

            return loadData;
        }()
    }]);

    return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/progress'));
