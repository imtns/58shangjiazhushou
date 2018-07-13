'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _ajaxP = require('./../utils/ajaxP.js');

var _utils = require('./../utils/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var OrderDetail = function (_wepy$page) {
    _inherits(OrderDetail, _wepy$page);

    function OrderDetail() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, OrderDetail);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = OrderDetail.__proto__ || Object.getPrototypeOf(OrderDetail)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            navigationBarTitleText: '订单管理'
        }, _this.data = {
            fontClass: ['active', 'active', 'active', 'cancel', 'finish'],
            statusSet: ['待接单', '待服务', '已评价', '已取消', '已删除'],
            contentSet: ['顾客已下单，请尽快与顾客联系', '您已接单，请在约定时间联系顾客', '顾客已评价您的服务', '顾客已取消订单', ''],
            order: {},
            submitSuccess: false
        }, _this.methods = {
            bindPhoneCall: function () {
                var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(mobile) {
                    var userid, sendParams, _ref3, _ref4, e, phoneNumber;

                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    userid = this.order.userid;
                                    sendParams = { sign: userid + '#' + mobile, from: 'OrderDetail' };
                                    _context.next = 4;
                                    return (0, _ajaxP.get)('/other/encrypt/phone', sendParams);

                                case 4:
                                    _ref3 = _context.sent;
                                    _ref4 = _slicedToArray(_ref3, 2);
                                    e = _ref4[0];
                                    phoneNumber = _ref4[1];

                                    if (!e) {
                                        _context.next = 11;
                                        break;
                                    }

                                    (0, _utils.toast)(e);
                                    return _context.abrupt('return');

                                case 11:
                                    _wepy2.default.makePhoneCall({ phoneNumber: phoneNumber });

                                case 12:
                                case 'end':
                                    return _context.stop();
                            }
                        }
                    }, _callee, this);
                }));

                function bindPhoneCall(_x) {
                    return _ref2.apply(this, arguments);
                }

                return bindPhoneCall;
            }(),
            bindSubmitOrder: function bindSubmitOrder() {
                this.submitOrder();
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(OrderDetail, [{
        key: 'submitOrder',
        value: function () {
            var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                var id, _ref6, _ref7, e;

                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                id = this.order.id;
                                _context2.next = 3;
                                return (0, _ajaxP.post)('/consumerAppointment/accept/' + id);

                            case 3:
                                _ref6 = _context2.sent;
                                _ref7 = _slicedToArray(_ref6, 1);
                                e = _ref7[0];

                                if (!e) {
                                    _context2.next = 9;
                                    break;
                                }

                                (0, _utils.toast)(e);
                                return _context2.abrupt('return');

                            case 9:
                                this.submitSuccess = true;
                                this.$apply();

                            case 11:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function submitOrder() {
                return _ref5.apply(this, arguments);
            }

            return submitOrder;
        }()
    }, {
        key: 'parseOrder',
        value: function parseOrder(data) {
            var ret = data || {};
            var adressJson = JSON.parse(data.consumerAddressJson);
            try {
                var reg = /(\d{4})-([0-1]{0,1}\d{1})-([0-3]{0,1}\d{1}) ([0-6]{0,1}\d{1}):([0-6]{0,1}\d{1}):([0-6]{0,1}\d{1}).+/;
                ret.createTime = data.createTime.replace(reg, '$2.$3 $4:$5');
                ret.startTime = data.startTime.replace(reg, '$2.$3 $4:$5');
                ret.endTime = data.endTime.replace(reg, '$2.$3 $4:$5');
                ret.consumerName = adressJson.name;
                ret.consumerMobile = adressJson.telephone;
                ret.consumerAddress = '' + adressJson.provinceStr + adressJson.cityStr + '\n            ' + adressJson.areaStr + adressJson.address;
            } catch (e) {
                (0, _utils.toast)(e);
            }
            return ret;
        }
    }, {
        key: 'onLoad',
        value: function () {
            var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(options) {
                var id, _ref9, _ref10, e, data, order;

                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                id = options.id;
                                _context3.next = 3;
                                return (0, _ajaxP.get)('/consumerAppointment/get/' + id);

                            case 3:
                                _ref9 = _context3.sent;
                                _ref10 = _slicedToArray(_ref9, 2);
                                e = _ref10[0];
                                data = _ref10[1];

                                if (!e) {
                                    _context3.next = 10;
                                    break;
                                }

                                (0, _utils.toast)(e);
                                return _context3.abrupt('return');

                            case 10:
                                order = this.parseOrder(data);

                                this.order = Object.assign({}, order);
                                this.$apply();

                            case 13:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function onLoad(_x2) {
                return _ref8.apply(this, arguments);
            }

            return onLoad;
        }()
    }]);

    return OrderDetail;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(OrderDetail , 'pages/OrderDetail'));
