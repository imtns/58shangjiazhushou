'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _ajax = require('./../utils/ajax.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Registed = function (_wepy$page) {
    _inherits(Registed, _wepy$page);

    function Registed() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Registed);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Registed.__proto__ || Object.getPrototypeOf(Registed)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            navigationBarTitleText: '注册'
        }, _this.data = {
            currentApp: [],
            otherlist: [],
            current_mpid: ''
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Registed, [{
        key: 'onLoad',
        value: function onLoad() {}
    }, {
        key: 'onShow',
        value: function onShow() {
            try {
                this.current_mpid = _wepy2.default.getStorageSync('current_mpid') || '';
            } catch (e) {
                console.log(e);
            }
            this.otherlist = [];
            this.currentApp = [];
            this.$apply();
            this.loadList();
        }
    }, {
        key: 'toregist',
        value: function toregist(e) {
            var _e$currentTarget$data = e.currentTarget.dataset.id,
                id = _e$currentTarget$data === undefined ? '' : _e$currentTarget$data;

            _wepy2.default.setStorageSync('registMappid', id);
            _wepy2.default.navigateTo({
                url: './registMainAccount'
            });
        }
    }, {
        key: 'loadList',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var _this2 = this;

                var _ref3, data, mpinfos;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.prev = 0;
                                _context.next = 3;
                                return (0, _ajax.get)('/mplogic/mysignmplist');

                            case 3:
                                _ref3 = _context.sent;
                                data = _ref3.data;
                                mpinfos = data.mpinfos;

                                if (!(mpinfos.length <= 0)) {
                                    _context.next = 8;
                                    break;
                                }

                                return _context.abrupt('return');

                            case 8:
                                mpinfos.forEach(function (appinfo) {
                                    var ele = appinfo;
                                    if (ele.headImg && ele.headImg.indexOf('http') === -1) {
                                        ele.headImg = 'https://pic1.58cdn.com.cn' + ele.headImg;
                                    }
                                    if (ele.id === _this2.current_mpid) {
                                        _this2.currentApp.push(ele);
                                    } else if (ele.nickName !== '') {
                                        _this2.otherlist.push(ele);
                                    }
                                });
                                this.$apply();
                                _context.next = 15;
                                break;

                            case 12:
                                _context.prev = 12;
                                _context.t0 = _context['catch'](0);

                                console.log(_context.t0);

                            case 15:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[0, 12]]);
            }));

            function loadList() {
                return _ref2.apply(this, arguments);
            }

            return loadList;
        }()
    }]);

    return Registed;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Registed , 'pages/registed'));
