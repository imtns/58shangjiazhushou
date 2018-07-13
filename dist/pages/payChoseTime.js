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
            choseMonth: '1'
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
            _wepy2.default.reLaunch({
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
            _wepy2.default.reLaunch({
                url: 'paymentRecord?startDate=' + this.startDate + '&endDate=' + this.endDate
            });
        }
    }, {
        key: 'getDays',
        value: function getDays(date) {
            var nDate = date.split('-');
            var year = nDate[0];
            var month = nDate[1];
            var days = new Date(year, month, 0).getDate();
            var startDay = '01';
            var endDay = days;
            console.log(year, month, startDay, endDay);
            return [year + '-' + month + '-' + startDay + ' 00:00:00', year + '-' + month + '-' + endDay + ' 24:00:00'];
        }
    }, {
        key: 'formatDate',
        value: function formatDate(date) {
            var nDate = new Date(date);
            var year = nDate.getFullYear();
            var month = nDate.getMonth() + 1 < 10 ? '0' + (nDate.getMonth() + 1) : nDate.getMonth() + 1;
            var day = nDate.getDate();
            console.log(year, month, day);
            return year + ' - ' + month + ' - ' + day;
        }
    }]);

    return PayChoseTime;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(PayChoseTime , 'pages/payChoseTime'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBheUNob3NlVGltZS5qcyJdLCJuYW1lcyI6WyJQYXlDaG9zZVRpbWUiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsIm1vbnRoIiwic3RhcnREYXRlIiwiZW5kRGF0ZSIsImNob3NlTW9udGgiLCJjb25zb2xlIiwibG9nIiwiZSIsInR5cGUiLCJjdXJyZW50VGFyZ2V0IiwiZGF0YXNldCIsIiRhcHBseSIsInZhbCIsImRldGFpbCIsInZhbHVlIiwidGltZVpvbmUiLCJnZXREYXlzIiwid2VweSIsInJlTGF1bmNoIiwidXJsIiwic3RhcnRUZW1wIiwiRGF0ZSIsImdldFRpbWUiLCJlbmRUZW1wIiwiZGF0ZSIsIm5EYXRlIiwic3BsaXQiLCJ5ZWFyIiwiZGF5cyIsImdldERhdGUiLCJzdGFydERheSIsImVuZERheSIsImdldEZ1bGxZZWFyIiwiZ2V0TW9udGgiLCJkYXkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUNBOzs7O0FBRUE7Ozs7Ozs7Ozs7OztJQUVxQkEsWTs7Ozs7Ozs7Ozs7Ozs7c01BQ2pCQyxNLEdBQVM7QUFDTEMsb0NBQXdCO0FBRG5CLFMsUUFHVEMsSSxHQUFPO0FBQ0hDLG1CQUFPLEtBREo7QUFFSEMsdUJBQVcsS0FGUjtBQUdIQyxxQkFBUyxLQUhOO0FBSUhDLHdCQUFZO0FBSlQsUzs7Ozs7Ozs7Ozs7O3VDQU9HLG1COzs7QUFDTkMsd0NBQVFDLEdBQVIsQ0FBWSxRQUFaOzs7Ozs7Ozs7Ozs7Ozs7Ozs7a0NBRU1DLEMsRUFBRztBQUFBLGdCQUNEQyxJQURDLEdBQ1FELEVBQUVFLGFBQUYsQ0FBZ0JDLE9BRHhCLENBQ0RGLElBREM7O0FBRVQsaUJBQUtKLFVBQUwsR0FBa0JJLElBQWxCO0FBQ0EsaUJBQUtQLEtBQUwsR0FBYSxLQUFiO0FBQ0EsaUJBQUtDLFNBQUwsR0FBaUIsS0FBakI7QUFDQSxpQkFBS0MsT0FBTCxHQUFlLEtBQWY7QUFDQSxpQkFBS1EsTUFBTDtBQUNIOzs7b0NBQ1dKLEMsRUFBRztBQUNYLGdCQUFNSyxNQUFNTCxFQUFFTSxNQUFGLENBQVNDLEtBQXJCO0FBQ0EsZ0JBQU1DLFdBQVcsS0FBS0MsT0FBTCxDQUFhSixHQUFiLENBQWpCO0FBQ0FLLDJCQUFLQyxRQUFMLENBQWM7QUFDVkMsa0RBQWdDSixTQUFTLENBQVQsQ0FBaEMsaUJBQXVEQSxTQUFTLENBQVQ7QUFEN0MsYUFBZDtBQUdIOzs7d0NBQ2VSLEMsRUFBRztBQUNmLGdCQUFNSyxNQUFNTCxFQUFFTSxNQUFGLENBQVNDLEtBQXJCO0FBQ0EsaUJBQUtaLFNBQUwsR0FBaUJVLEdBQWpCO0FBQ0EsaUJBQUtELE1BQUw7QUFDSDs7O3NDQUNhSixDLEVBQUc7QUFBQSxnQkFDTEwsU0FESyxHQUNTLElBRFQsQ0FDTEEsU0FESzs7QUFFYixnQkFBSUEsY0FBYyxLQUFsQixFQUF5QjtBQUNyQixrQ0FBTSxTQUFOO0FBQ0E7QUFDSDtBQUNELGdCQUFNa0IsWUFBWSxJQUFJQyxJQUFKLENBQVNuQixTQUFULEVBQW9Cb0IsT0FBcEIsRUFBbEI7QUFDQSxnQkFBTVYsTUFBTUwsRUFBRU0sTUFBRixDQUFTQyxLQUFyQjtBQUNBLGdCQUFNUyxVQUFVLElBQUlGLElBQUosQ0FBU1QsR0FBVCxFQUFjVSxPQUFkLEVBQWhCO0FBQ0EsZ0JBQUlGLFlBQVlHLE9BQWhCLEVBQXlCO0FBQ3JCLGtDQUFNLGNBQU47QUFDQTtBQUNIO0FBQ0QsaUJBQUtyQixTQUFMLEdBQW9CQSxTQUFwQjtBQUNBLGlCQUFLQyxPQUFMLEdBQWtCUyxHQUFsQjtBQUNBLGlCQUFLRCxNQUFMO0FBQ0FNLDJCQUFLQyxRQUFMLENBQWM7QUFDVkMsa0RBQWdDLEtBQUtqQixTQUFyQyxpQkFBMEQsS0FBS0M7QUFEckQsYUFBZDtBQUdIOzs7Z0NBQ09xQixJLEVBQU07QUFDVixnQkFBTUMsUUFBUUQsS0FBS0UsS0FBTCxDQUFXLEdBQVgsQ0FBZDtBQUNBLGdCQUFNQyxPQUFPRixNQUFNLENBQU4sQ0FBYjtBQUNBLGdCQUFNeEIsUUFBUXdCLE1BQU0sQ0FBTixDQUFkO0FBQ0EsZ0JBQU1HLE9BQU8sSUFBSVAsSUFBSixDQUFTTSxJQUFULEVBQWUxQixLQUFmLEVBQXNCLENBQXRCLEVBQXlCNEIsT0FBekIsRUFBYjtBQUNBLGdCQUFNQyxXQUFXLElBQWpCO0FBQ0EsZ0JBQU1DLFNBQVNILElBQWY7QUFDQXZCLG9CQUFRQyxHQUFSLENBQVlxQixJQUFaLEVBQWtCMUIsS0FBbEIsRUFBeUI2QixRQUF6QixFQUFtQ0MsTUFBbkM7QUFDQSxtQkFBTyxDQUFJSixJQUFKLFNBQVkxQixLQUFaLFNBQXFCNkIsUUFBckIsZ0JBQTZDSCxJQUE3QyxTQUFxRDFCLEtBQXJELFNBQThEOEIsTUFBOUQsZUFBUDtBQUNIOzs7bUNBQ1VQLEksRUFBTTtBQUNiLGdCQUFNQyxRQUFRLElBQUlKLElBQUosQ0FBU0csSUFBVCxDQUFkO0FBQ0EsZ0JBQU1HLE9BQU9GLE1BQU1PLFdBQU4sRUFBYjtBQUNBLGdCQUFNL0IsUUFBU3dCLE1BQU1RLFFBQU4sS0FBbUIsQ0FBcEIsR0FBeUIsRUFBekIsVUFBa0NSLE1BQU1RLFFBQU4sS0FBbUIsQ0FBckQsSUFBMkRSLE1BQU1RLFFBQU4sS0FBbUIsQ0FBNUY7QUFDQSxnQkFBTUMsTUFBTVQsTUFBTUksT0FBTixFQUFaO0FBQ0F4QixvQkFBUUMsR0FBUixDQUFZcUIsSUFBWixFQUFrQjFCLEtBQWxCLEVBQXlCaUMsR0FBekI7QUFDQSxtQkFBVVAsSUFBVixXQUFvQjFCLEtBQXBCLFdBQStCaUMsR0FBL0I7QUFDSDs7OztFQXZFcUNqQixlQUFLa0IsSTs7a0JBQTFCdEMsWSIsImZpbGUiOiJwYXlDaG9zZVRpbWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XHJcblxyXG5pbXBvcnQgeyBzbGVlcCwgYWxlcnQgfSBmcm9tICcuLi91dGlscyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYXlDaG9zZVRpbWUgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gICAgY29uZmlnID0ge1xyXG4gICAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmlLbmrL7orrDlvZUnLFxyXG4gICAgfVxyXG4gICAgZGF0YSA9IHtcclxuICAgICAgICBtb250aDogJ+ivt+mAieaLqScsXHJcbiAgICAgICAgc3RhcnREYXRlOiAn6K+36YCJ5oupJyxcclxuICAgICAgICBlbmREYXRlOiAn6K+36YCJ5oupJyxcclxuICAgICAgICBjaG9zZU1vbnRoOiAnMScsXHJcbiAgICB9XHJcbiAgICBhc3luYyBvbkxvYWQoKSB7XHJcbiAgICAgICAgYXdhaXQgc2xlZXAoKTtcclxuICAgICAgICBjb25zb2xlLmxvZygnb25Mb2FkJyk7XHJcbiAgICB9XHJcbiAgICBjaG9zZVR5cGUoZSkge1xyXG4gICAgICAgIGNvbnN0IHsgdHlwZSB9ID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQ7XHJcbiAgICAgICAgdGhpcy5jaG9zZU1vbnRoID0gdHlwZTtcclxuICAgICAgICB0aGlzLm1vbnRoID0gJ+ivt+mAieaLqSc7XHJcbiAgICAgICAgdGhpcy5zdGFydERhdGUgPSAn6K+36YCJ5oupJztcclxuICAgICAgICB0aGlzLmVuZERhdGUgPSAn6K+36YCJ5oupJztcclxuICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgfVxyXG4gICAgc2VsZWN0TW9udGgoZSkge1xyXG4gICAgICAgIGNvbnN0IHZhbCA9IGUuZGV0YWlsLnZhbHVlO1xyXG4gICAgICAgIGNvbnN0IHRpbWVab25lID0gdGhpcy5nZXREYXlzKHZhbCk7XHJcbiAgICAgICAgd2VweS5yZUxhdW5jaCh7XHJcbiAgICAgICAgICAgIHVybDogYHBheW1lbnRSZWNvcmQ/c3RhcnREYXRlPSR7dGltZVpvbmVbMF19JmVuZERhdGU9JHt0aW1lWm9uZVsxXX1gLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgc2VsZWN0U3RhcnREYXRlKGUpIHtcclxuICAgICAgICBjb25zdCB2YWwgPSBlLmRldGFpbC52YWx1ZTtcclxuICAgICAgICB0aGlzLnN0YXJ0RGF0ZSA9IHZhbDtcclxuICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgfVxyXG4gICAgc2VsZWN0RW5kRGF0ZShlKSB7XHJcbiAgICAgICAgY29uc3QgeyBzdGFydERhdGUgfSA9IHRoaXM7XHJcbiAgICAgICAgaWYgKHN0YXJ0RGF0ZSA9PT0gJ+ivt+mAieaLqScpIHtcclxuICAgICAgICAgICAgYWxlcnQoJ+ivt+mAieaLqei1t+Wni+aXtumXtCcpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHN0YXJ0VGVtcCA9IG5ldyBEYXRlKHN0YXJ0RGF0ZSkuZ2V0VGltZSgpO1xyXG4gICAgICAgIGNvbnN0IHZhbCA9IGUuZGV0YWlsLnZhbHVlO1xyXG4gICAgICAgIGNvbnN0IGVuZFRlbXAgPSBuZXcgRGF0ZSh2YWwpLmdldFRpbWUoKTtcclxuICAgICAgICBpZiAoc3RhcnRUZW1wID4gZW5kVGVtcCkge1xyXG4gICAgICAgICAgICBhbGVydCgn6LW35aeL5pe26Ze05LiN6IO95pma5LqO57uT5p2f5pe26Ze0Jyk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zdGFydERhdGUgPSBgJHtzdGFydERhdGV9IDAwOjAwOjAwYDtcclxuICAgICAgICB0aGlzLmVuZERhdGUgPSBgJHt2YWx9IDI0OjAwOjAwYDtcclxuICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgIHdlcHkucmVMYXVuY2goe1xyXG4gICAgICAgICAgICB1cmw6IGBwYXltZW50UmVjb3JkP3N0YXJ0RGF0ZT0ke3RoaXMuc3RhcnREYXRlfSZlbmREYXRlPSR7dGhpcy5lbmREYXRlfWAsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBnZXREYXlzKGRhdGUpIHtcclxuICAgICAgICBjb25zdCBuRGF0ZSA9IGRhdGUuc3BsaXQoJy0nKTtcclxuICAgICAgICBjb25zdCB5ZWFyID0gbkRhdGVbMF07XHJcbiAgICAgICAgY29uc3QgbW9udGggPSBuRGF0ZVsxXTtcclxuICAgICAgICBjb25zdCBkYXlzID0gbmV3IERhdGUoeWVhciwgbW9udGgsIDApLmdldERhdGUoKTtcclxuICAgICAgICBjb25zdCBzdGFydERheSA9ICcwMSc7XHJcbiAgICAgICAgY29uc3QgZW5kRGF5ID0gZGF5cztcclxuICAgICAgICBjb25zb2xlLmxvZyh5ZWFyLCBtb250aCwgc3RhcnREYXksIGVuZERheSk7XHJcbiAgICAgICAgcmV0dXJuIFtgJHt5ZWFyfS0ke21vbnRofS0ke3N0YXJ0RGF5fSAwMDowMDowMGAsIGAke3llYXJ9LSR7bW9udGh9LSR7ZW5kRGF5fSAyNDowMDowMGBdO1xyXG4gICAgfVxyXG4gICAgZm9ybWF0RGF0ZShkYXRlKSB7XHJcbiAgICAgICAgY29uc3QgbkRhdGUgPSBuZXcgRGF0ZShkYXRlKTtcclxuICAgICAgICBjb25zdCB5ZWFyID0gbkRhdGUuZ2V0RnVsbFllYXIoKTtcclxuICAgICAgICBjb25zdCBtb250aCA9IChuRGF0ZS5nZXRNb250aCgpICsgMSkgPCAxMCA/IGAwJHtuRGF0ZS5nZXRNb250aCgpICsgMX1gIDogbkRhdGUuZ2V0TW9udGgoKSArIDE7XHJcbiAgICAgICAgY29uc3QgZGF5ID0gbkRhdGUuZ2V0RGF0ZSgpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHllYXIsIG1vbnRoLCBkYXkpO1xyXG4gICAgICAgIHJldHVybiBgJHt5ZWFyfSAtICR7bW9udGh9IC0gJHtkYXl9YDtcclxuICAgIH1cclxufVxyXG4iXX0=