'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _utils = require('./../utils/index.js');

var _ajaxOrder = require('./../utils/ajaxOrder.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var OrderList = function (_wepy$page) {
    _inherits(OrderList, _wepy$page);

    function OrderList() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, OrderList);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = OrderList.__proto__ || Object.getPrototypeOf(OrderList)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            navigationBarTitleText: '订单管理'
        }, _this.data = {
            statusSet: ['待接单', '待服务', '已评价', '已取消', '已删除'],
            sendParams: {
                pageNum: 1,
                pageSize: 5,
                status: '0'
            },
            orderList: {
                data: [],
                pageNum: 1,
                pageSize: 5
            }
        }, _this.methods = {
            bindClickTab: function bindClickTab(status) {
                var resetParams = {
                    pageNum: 1,
                    pageSize: 5,
                    status: status
                };
                var resetOrderList = {
                    data: [],
                    pageNum: 1,
                    pageSize: 5
                };
                this.sendParams = Object.assign({}, this.sendParams, resetParams);
                this.orderList = Object.assign({}, resetOrderList);
                this.getOrderList();
            },
            bindLoadDown: function bindLoadDown(pageNum) {
                var total = this.orderList.recordsTotal;

                if (this.orderList.data.length === total) return;
                this.sendParams = Object.assign({}, this.sendParams, { pageNum: pageNum });
                this.getOrderList();
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(OrderList, [{
        key: 'parseOrderList',
        value: function parseOrderList(orders) {
            var regDateTime = /(\d{4})-([0-1]?\d{1})-([0-3]?\d{1}) ([0-2]?\d{1}):([0-5]?\d{1}):([0-5]?\d{1}).*/;
            return orders.map(function (item) {
                var ret = item;
                ret.mpLogo = (0, _utils.picSrcDomain)() + item.mpLogo;
                ret.createTime = item.createTime.replace(regDateTime, '$2.$3 $4:$5');
                ret.startTime = item.startTime.replace(regDateTime, '$2.$3 $4:$5');
                ret.endTime = item.endTime.replace(regDateTime, '$2.$3 $4:$5');
                return ret;
            });
        }
    }, {
        key: 'getOrderList',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var _ref3, _ref4, e, res, data;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return (0, _ajaxOrder.get)('/consumerAppointment/queryPageForUser', this.sendParams);

                            case 2:
                                _ref3 = _context.sent;
                                _ref4 = _slicedToArray(_ref3, 2);
                                e = _ref4[0];
                                res = _ref4[1];

                                if (!e) {
                                    _context.next = 9;
                                    break;
                                }

                                (0, _utils.toast)(e);
                                return _context.abrupt('return');

                            case 9:
                                data = this.parseOrderList(res.data);

                                this.orderList = Object.assign({}, res, {
                                    data: [].concat(this.orderList.data, data)
                                });
                                this.$apply();

                            case 12:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function getOrderList() {
                return _ref2.apply(this, arguments);
            }

            return getOrderList;
        }()
    }, {
        key: 'onLoad',
        value: function () {
            var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.next = 2;
                                return this.getOrderList();

                            case 2:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function onLoad() {
                return _ref5.apply(this, arguments);
            }

            return onLoad;
        }()
    }]);

    return OrderList;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(OrderList , 'pages/OrderList'));
