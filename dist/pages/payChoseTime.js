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

var PayChoseTime = function (_wepy$page) {
    _inherits(PayChoseTime, _wepy$page);

    function PayChoseTime() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, PayChoseTime);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = PayChoseTime.__proto__ || Object.getPrototypeOf(PayChoseTime)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            navigationBarTitleText: '收款记录'
        }, _this.data = {
            month: '请选择',
            startDate: '请选择',
            endDate: '请选择',
            choseMonth: '2',
            currentDate: ''
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(PayChoseTime, [{
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
                                this.getCurrent();

                            case 4:
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
        key: 'choseType',
        value: function choseType(e) {
            var type = e.currentTarget.dataset.type;

            this.choseMonth = type;
            this.month = '请选择';
            this.startDate = '请选择';
            this.endDate = '请选择';
            this.$apply();
        }
    }, {
        key: 'selectMonth',
        value: function selectMonth(e) {
            var val = e.detail.value;
            var timeZone = this.getDays(val);
            _wepy2.default.redirectTo({
                url: 'paymentRecord?startDate=' + timeZone[0] + '&endDate=' + timeZone[1]
            });
        }
    }, {
        key: 'selectStartDate',
        value: function selectStartDate(e) {
            var val = e.detail.value;
            this.startDate = val;
            this.$apply();
        }
    }, {
        key: 'selectEndDate',
        value: function selectEndDate(e) {
            var startDate = this.startDate;

            if (startDate === '请选择') {
                (0, _utils.alert)('请选择起始时间');
                return;
            }
            var startTemp = new Date(startDate).getTime();
            var val = e.detail.value;
            var endTemp = new Date(val).getTime();
            if (startTemp > endTemp) {
                (0, _utils.alert)('起始时间不能晚于结束时间');
                return;
            }
            this.startDate = startDate + ' 00:00:00';
            this.endDate = val + ' 24:00:00';
            this.$apply();
            _wepy2.default.redirectTo({
                url: 'paymentRecord?startDate=' + this.startDate + '&endDate=' + this.endDate
            });
        }
    }, {
        key: 'getDays',
        value: function getDays(date) {
            var nDate = date.split('-');
            var year = nDate[0] < 10 ? '200' + nDate[0] : '20' + nDate[0];
            var month = nDate[1];
            var days = new Date(year, month, 0).getDate();
            var startDay = '01';
            var endDay = days;
            console.log(year, month, startDay, endDay);
            return [year + '-' + month + '-' + startDay + ' 00:00:00', year + '-' + month + '-' + endDay + ' 24:00:00'];
        }
        // 获取当前日期

    }, {
        key: 'getCurrent',
        value: function getCurrent() {
            var date = new Date();
            var year = date.getFullYear();
            var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
            var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
            this.currentDate = year + '-' + month + '-' + day;
            this.$apply();
        }
    }]);

    return PayChoseTime;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(PayChoseTime , 'pages/payChoseTime'));
