'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _ajax = require('./../utils/ajax.js');

var _utils = require('./../utils/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PaymentRecord = function (_wepy$page) {
    _inherits(PaymentRecord, _wepy$page);

    function PaymentRecord() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, PaymentRecord);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = PaymentRecord.__proto__ || Object.getPrototypeOf(PaymentRecord)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            navigationBarTitleText: '收款记录'
        }, _this.data = {
            timeZone: '总共',
            sendParams: {
                group: 3,
                page: 1,
                pageSize: 10,
                startDate: '',
                endDate: ''
            },
            listData: [],
            isLoading: true,
            title: '没有收款记录',
            amountTotal: ''
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(PaymentRecord, [{
        key: 'onLoad',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(option) {
                var _option$startDate, startDate, _option$endDate, endDate;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                console.log('onLoad', option);
                                _option$startDate = option.startDate, startDate = _option$startDate === undefined ? '' : _option$startDate, _option$endDate = option.endDate, endDate = _option$endDate === undefined ? '' : _option$endDate;

                                Object.assign(this.sendParams, {
                                    startDate: startDate,
                                    endDate: endDate
                                });
                                this.timeZone = startDate && endDate ? startDate.split(' ')[0] + ' ' + endDate.split(' ')[0] : '总共';
                                this.$apply();
                                this.loadData();

                            case 6:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function onLoad(_x) {
                return _ref2.apply(this, arguments);
            }

            return onLoad;
        }()
    }, {
        key: 'choseTime',
        value: function choseTime() {
            _wepy2.default.navigateTo({
                url: 'payChoseTime'
            });
        }
    }, {
        key: 'loadData',
        value: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                var _ref4, data, msglist, amountTotal;

                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.prev = 0;

                                console.log('loadData', this.sendParams);
                                _context2.next = 4;
                                return (0, _ajax.get)('/mplogic/getgroupmsglist', this.sendParams);

                            case 4:
                                _ref4 = _context2.sent;
                                data = _ref4.data;
                                msglist = data.msglist, amountTotal = data.amountTotal;

                                if (!(this.sendParams.pageSize === 1 && (msglist.length === 0 || !msglist))) {
                                    _context2.next = 11;
                                    break;
                                }

                                // 没有数据
                                (0, _utils.toast)('没有数据');
                                this.isLoading = false;
                                return _context2.abrupt('return');

                            case 11:
                                if (this.sendParams.pageSize > 1 && msglist.length < this.sendParams.pageSize) {
                                    // 没有更多数据
                                    (0, _utils.toast)('没有更多数据');
                                    this.isLoading = false;
                                }
                                msglist.forEach(function (item) {
                                    var content = item.content;

                                    Object.assign(item, {
                                        content: JSON.parse(content)
                                    });
                                });
                                this.listData = this.listData.concat(msglist);
                                this.amountTotal = amountTotal;
                                this.$apply();
                                _context2.next = 21;
                                break;

                            case 18:
                                _context2.prev = 18;
                                _context2.t0 = _context2['catch'](0);

                                console.log(_context2.t0);

                            case 21:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this, [[0, 18]]);
            }));

            function loadData() {
                return _ref3.apply(this, arguments);
            }

            return loadData;
        }()
    }, {
        key: 'onReachBottom',
        value: function onReachBottom() {
            if (!this.isLoading) return;
            var page = this.sendParams.page + 1;
            this.sendParams.page = page;
            this.$apply();
            this.loadData(this.curTab);
        }
    }, {
        key: 'resetTime',
        value: function resetTime() {
            this.startDate = '';
            this.endDate = '';
            this.$apply();
            this.loadData();
        }
    }]);

    return PaymentRecord;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(PaymentRecord , 'pages/paymentRecord'));
