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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBheUNob3NlVGltZS5qcyJdLCJuYW1lcyI6WyJQYXlDaG9zZVRpbWUiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsIm1vbnRoIiwic3RhcnREYXRlIiwiZW5kRGF0ZSIsImNob3NlTW9udGgiLCJjdXJyZW50RGF0ZSIsImNvbnNvbGUiLCJsb2ciLCJnZXRDdXJyZW50IiwiZSIsInR5cGUiLCJjdXJyZW50VGFyZ2V0IiwiZGF0YXNldCIsIiRhcHBseSIsInZhbCIsImRldGFpbCIsInZhbHVlIiwidGltZVpvbmUiLCJnZXREYXlzIiwid2VweSIsInJlZGlyZWN0VG8iLCJ1cmwiLCJzdGFydFRlbXAiLCJEYXRlIiwiZ2V0VGltZSIsImVuZFRlbXAiLCJkYXRlIiwibkRhdGUiLCJzcGxpdCIsInllYXIiLCJkYXlzIiwiZ2V0RGF0ZSIsInN0YXJ0RGF5IiwiZW5kRGF5IiwiZ2V0RnVsbFllYXIiLCJnZXRNb250aCIsImRheSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQ0E7Ozs7QUFFQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxZOzs7Ozs7Ozs7Ozs7OztzTUFDakJDLE0sR0FBUztBQUNMQyxvQ0FBd0I7QUFEbkIsUyxRQUdUQyxJLEdBQU87QUFDSEMsbUJBQU8sS0FESjtBQUVIQyx1QkFBVyxLQUZSO0FBR0hDLHFCQUFTLEtBSE47QUFJSEMsd0JBQVksR0FKVDtBQUtIQyx5QkFBYTtBQUxWLFM7Ozs7Ozs7Ozs7Ozt1Q0FRRyxtQjs7O0FBQ05DLHdDQUFRQyxHQUFSLENBQVksUUFBWjtBQUNBLHFDQUFLQyxVQUFMOzs7Ozs7Ozs7Ozs7Ozs7Ozs7a0NBRU1DLEMsRUFBRztBQUFBLGdCQUNEQyxJQURDLEdBQ1FELEVBQUVFLGFBQUYsQ0FBZ0JDLE9BRHhCLENBQ0RGLElBREM7O0FBRVQsaUJBQUtOLFVBQUwsR0FBa0JNLElBQWxCO0FBQ0EsaUJBQUtULEtBQUwsR0FBYSxLQUFiO0FBQ0EsaUJBQUtDLFNBQUwsR0FBaUIsS0FBakI7QUFDQSxpQkFBS0MsT0FBTCxHQUFlLEtBQWY7QUFDQSxpQkFBS1UsTUFBTDtBQUNIOzs7b0NBQ1dKLEMsRUFBRztBQUNYLGdCQUFNSyxNQUFNTCxFQUFFTSxNQUFGLENBQVNDLEtBQXJCO0FBQ0EsZ0JBQU1DLFdBQVcsS0FBS0MsT0FBTCxDQUFhSixHQUFiLENBQWpCO0FBQ0FLLDJCQUFLQyxVQUFMLENBQWdCO0FBQ1pDLGtEQUFnQ0osU0FBUyxDQUFULENBQWhDLGlCQUF1REEsU0FBUyxDQUFUO0FBRDNDLGFBQWhCO0FBR0g7Ozt3Q0FDZVIsQyxFQUFHO0FBQ2YsZ0JBQU1LLE1BQU1MLEVBQUVNLE1BQUYsQ0FBU0MsS0FBckI7QUFDQSxpQkFBS2QsU0FBTCxHQUFpQlksR0FBakI7QUFDQSxpQkFBS0QsTUFBTDtBQUNIOzs7c0NBQ2FKLEMsRUFBRztBQUFBLGdCQUNMUCxTQURLLEdBQ1MsSUFEVCxDQUNMQSxTQURLOztBQUViLGdCQUFJQSxjQUFjLEtBQWxCLEVBQXlCO0FBQ3JCLGtDQUFNLFNBQU47QUFDQTtBQUNIO0FBQ0QsZ0JBQU1vQixZQUFZLElBQUlDLElBQUosQ0FBU3JCLFNBQVQsRUFBb0JzQixPQUFwQixFQUFsQjtBQUNBLGdCQUFNVixNQUFNTCxFQUFFTSxNQUFGLENBQVNDLEtBQXJCO0FBQ0EsZ0JBQU1TLFVBQVUsSUFBSUYsSUFBSixDQUFTVCxHQUFULEVBQWNVLE9BQWQsRUFBaEI7QUFDQSxnQkFBSUYsWUFBWUcsT0FBaEIsRUFBeUI7QUFDckIsa0NBQU0sY0FBTjtBQUNBO0FBQ0g7QUFDRCxpQkFBS3ZCLFNBQUwsR0FBb0JBLFNBQXBCO0FBQ0EsaUJBQUtDLE9BQUwsR0FBa0JXLEdBQWxCO0FBQ0EsaUJBQUtELE1BQUw7QUFDQU0sMkJBQUtDLFVBQUwsQ0FBZ0I7QUFDWkMsa0RBQWdDLEtBQUtuQixTQUFyQyxpQkFBMEQsS0FBS0M7QUFEbkQsYUFBaEI7QUFHSDs7O2dDQUNPdUIsSSxFQUFNO0FBQ1YsZ0JBQU1DLFFBQVFELEtBQUtFLEtBQUwsQ0FBVyxHQUFYLENBQWQ7QUFDQSxnQkFBTUMsT0FBT0YsTUFBTSxDQUFOLElBQVcsRUFBWCxXQUFzQkEsTUFBTSxDQUFOLENBQXRCLFVBQXdDQSxNQUFNLENBQU4sQ0FBckQ7QUFDQSxnQkFBTTFCLFFBQVEwQixNQUFNLENBQU4sQ0FBZDtBQUNBLGdCQUFNRyxPQUFPLElBQUlQLElBQUosQ0FBU00sSUFBVCxFQUFlNUIsS0FBZixFQUFzQixDQUF0QixFQUF5QjhCLE9BQXpCLEVBQWI7QUFDQSxnQkFBTUMsV0FBVyxJQUFqQjtBQUNBLGdCQUFNQyxTQUFTSCxJQUFmO0FBQ0F4QixvQkFBUUMsR0FBUixDQUFZc0IsSUFBWixFQUFrQjVCLEtBQWxCLEVBQXlCK0IsUUFBekIsRUFBbUNDLE1BQW5DO0FBQ0EsbUJBQU8sQ0FBSUosSUFBSixTQUFZNUIsS0FBWixTQUFxQitCLFFBQXJCLGdCQUE2Q0gsSUFBN0MsU0FBcUQ1QixLQUFyRCxTQUE4RGdDLE1BQTlELGVBQVA7QUFDSDtBQUNEOzs7O3FDQUNhO0FBQ1QsZ0JBQU1QLE9BQU8sSUFBSUgsSUFBSixFQUFiO0FBQ0EsZ0JBQU1NLE9BQU9ILEtBQUtRLFdBQUwsRUFBYjtBQUNBLGdCQUFNakMsUUFBU3lCLEtBQUtTLFFBQUwsS0FBa0IsQ0FBbkIsR0FBd0IsRUFBeEIsVUFBa0NULEtBQUtTLFFBQUwsS0FBa0IsQ0FBcEQsSUFBNERULEtBQUtTLFFBQUwsS0FBa0IsQ0FBNUY7QUFDQSxnQkFBTUMsTUFBTVYsS0FBS0ssT0FBTCxLQUFpQixFQUFqQixTQUEwQkwsS0FBS0ssT0FBTCxFQUExQixHQUE2Q0wsS0FBS0ssT0FBTCxFQUF6RDtBQUNBLGlCQUFLMUIsV0FBTCxHQUFzQndCLElBQXRCLFNBQThCNUIsS0FBOUIsU0FBdUNtQyxHQUF2QztBQUNBLGlCQUFLdkIsTUFBTDtBQUNIOzs7O0VBMUVxQ00sZUFBS2tCLEk7O2tCQUExQnhDLFkiLCJmaWxlIjoicGF5Q2hvc2VUaW1lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xyXG5cclxuaW1wb3J0IHsgc2xlZXAsIGFsZXJ0IH0gZnJvbSAnLi4vdXRpbHMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGF5Q2hvc2VUaW1lIGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICAgIGNvbmZpZyA9IHtcclxuICAgICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5pS25qy+6K6w5b2VJyxcclxuICAgIH1cclxuICAgIGRhdGEgPSB7XHJcbiAgICAgICAgbW9udGg6ICfor7fpgInmi6knLFxyXG4gICAgICAgIHN0YXJ0RGF0ZTogJ+ivt+mAieaLqScsXHJcbiAgICAgICAgZW5kRGF0ZTogJ+ivt+mAieaLqScsXHJcbiAgICAgICAgY2hvc2VNb250aDogJzInLFxyXG4gICAgICAgIGN1cnJlbnREYXRlOiAnJyxcclxuICAgIH1cclxuICAgIGFzeW5jIG9uTG9hZCgpIHtcclxuICAgICAgICBhd2FpdCBzbGVlcCgpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdvbkxvYWQnKTtcclxuICAgICAgICB0aGlzLmdldEN1cnJlbnQoKTtcclxuICAgIH1cclxuICAgIGNob3NlVHlwZShlKSB7XHJcbiAgICAgICAgY29uc3QgeyB0eXBlIH0gPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldDtcclxuICAgICAgICB0aGlzLmNob3NlTW9udGggPSB0eXBlO1xyXG4gICAgICAgIHRoaXMubW9udGggPSAn6K+36YCJ5oupJztcclxuICAgICAgICB0aGlzLnN0YXJ0RGF0ZSA9ICfor7fpgInmi6knO1xyXG4gICAgICAgIHRoaXMuZW5kRGF0ZSA9ICfor7fpgInmi6knO1xyXG4gICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICB9XHJcbiAgICBzZWxlY3RNb250aChlKSB7XHJcbiAgICAgICAgY29uc3QgdmFsID0gZS5kZXRhaWwudmFsdWU7XHJcbiAgICAgICAgY29uc3QgdGltZVpvbmUgPSB0aGlzLmdldERheXModmFsKTtcclxuICAgICAgICB3ZXB5LnJlZGlyZWN0VG8oe1xyXG4gICAgICAgICAgICB1cmw6IGBwYXltZW50UmVjb3JkP3N0YXJ0RGF0ZT0ke3RpbWVab25lWzBdfSZlbmREYXRlPSR7dGltZVpvbmVbMV19YCxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHNlbGVjdFN0YXJ0RGF0ZShlKSB7XHJcbiAgICAgICAgY29uc3QgdmFsID0gZS5kZXRhaWwudmFsdWU7XHJcbiAgICAgICAgdGhpcy5zdGFydERhdGUgPSB2YWw7XHJcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgIH1cclxuICAgIHNlbGVjdEVuZERhdGUoZSkge1xyXG4gICAgICAgIGNvbnN0IHsgc3RhcnREYXRlIH0gPSB0aGlzO1xyXG4gICAgICAgIGlmIChzdGFydERhdGUgPT09ICfor7fpgInmi6knKSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KCfor7fpgInmi6notbflp4vml7bpl7QnKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBzdGFydFRlbXAgPSBuZXcgRGF0ZShzdGFydERhdGUpLmdldFRpbWUoKTtcclxuICAgICAgICBjb25zdCB2YWwgPSBlLmRldGFpbC52YWx1ZTtcclxuICAgICAgICBjb25zdCBlbmRUZW1wID0gbmV3IERhdGUodmFsKS5nZXRUaW1lKCk7XHJcbiAgICAgICAgaWYgKHN0YXJ0VGVtcCA+IGVuZFRlbXApIHtcclxuICAgICAgICAgICAgYWxlcnQoJ+i1t+Wni+aXtumXtOS4jeiDveaZmuS6jue7k+adn+aXtumXtCcpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc3RhcnREYXRlID0gYCR7c3RhcnREYXRlfSAwMDowMDowMGA7XHJcbiAgICAgICAgdGhpcy5lbmREYXRlID0gYCR7dmFsfSAyNDowMDowMGA7XHJcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICB3ZXB5LnJlZGlyZWN0VG8oe1xyXG4gICAgICAgICAgICB1cmw6IGBwYXltZW50UmVjb3JkP3N0YXJ0RGF0ZT0ke3RoaXMuc3RhcnREYXRlfSZlbmREYXRlPSR7dGhpcy5lbmREYXRlfWAsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBnZXREYXlzKGRhdGUpIHtcclxuICAgICAgICBjb25zdCBuRGF0ZSA9IGRhdGUuc3BsaXQoJy0nKTtcclxuICAgICAgICBjb25zdCB5ZWFyID0gbkRhdGVbMF0gPCAxMCA/IGAyMDAke25EYXRlWzBdfWAgOiBgMjAke25EYXRlWzBdfWA7XHJcbiAgICAgICAgY29uc3QgbW9udGggPSBuRGF0ZVsxXTtcclxuICAgICAgICBjb25zdCBkYXlzID0gbmV3IERhdGUoeWVhciwgbW9udGgsIDApLmdldERhdGUoKTtcclxuICAgICAgICBjb25zdCBzdGFydERheSA9ICcwMSc7XHJcbiAgICAgICAgY29uc3QgZW5kRGF5ID0gZGF5cztcclxuICAgICAgICBjb25zb2xlLmxvZyh5ZWFyLCBtb250aCwgc3RhcnREYXksIGVuZERheSk7XHJcbiAgICAgICAgcmV0dXJuIFtgJHt5ZWFyfS0ke21vbnRofS0ke3N0YXJ0RGF5fSAwMDowMDowMGAsIGAke3llYXJ9LSR7bW9udGh9LSR7ZW5kRGF5fSAyNDowMDowMGBdO1xyXG4gICAgfVxyXG4gICAgLy8g6I635Y+W5b2T5YmN5pel5pyfXHJcbiAgICBnZXRDdXJyZW50KCkge1xyXG4gICAgICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgIGNvbnN0IHllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKCk7XHJcbiAgICAgICAgY29uc3QgbW9udGggPSAoZGF0ZS5nZXRNb250aCgpICsgMSkgPCAxMCA/IGAwJHsoZGF0ZS5nZXRNb250aCgpICsgMSl9YCA6IChkYXRlLmdldE1vbnRoKCkgKyAxKTtcclxuICAgICAgICBjb25zdCBkYXkgPSBkYXRlLmdldERhdGUoKSA8IDEwID8gYDAke2RhdGUuZ2V0RGF0ZSgpfWAgOiBkYXRlLmdldERhdGUoKTtcclxuICAgICAgICB0aGlzLmN1cnJlbnREYXRlID0gYCR7eWVhcn0tJHttb250aH0tJHtkYXl9YDtcclxuICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==