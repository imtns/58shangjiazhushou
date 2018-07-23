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

                                if (option) {
                                    _context.next = 7;
                                    break;
                                }

                                return _context.abrupt('return');

                            case 7:
                                this.loadData();

                            case 8:
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBheW1lbnRSZWNvcmQuanMiXSwibmFtZXMiOlsiUGF5bWVudFJlY29yZCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwidGltZVpvbmUiLCJzZW5kUGFyYW1zIiwiZ3JvdXAiLCJwYWdlIiwicGFnZVNpemUiLCJzdGFydERhdGUiLCJlbmREYXRlIiwibGlzdERhdGEiLCJpc0xvYWRpbmciLCJ0aXRsZSIsImFtb3VudFRvdGFsIiwib3B0aW9uIiwiY29uc29sZSIsImxvZyIsIk9iamVjdCIsImFzc2lnbiIsInNwbGl0IiwiJGFwcGx5IiwibG9hZERhdGEiLCJ3ZXB5IiwibmF2aWdhdGVUbyIsInVybCIsIm1zZ2xpc3QiLCJsZW5ndGgiLCJmb3JFYWNoIiwiaXRlbSIsImNvbnRlbnQiLCJKU09OIiwicGFyc2UiLCJjb25jYXQiLCJjdXJUYWIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQ0E7Ozs7QUFFQTs7QUFFQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxhOzs7Ozs7Ozs7Ozs7Ozt3TUFDakJDLE0sR0FBUztBQUNMQyxvQ0FBd0I7QUFEbkIsUyxRQUdUQyxJLEdBQU87QUFDSEMsc0JBQVUsSUFEUDtBQUVIQyx3QkFBWTtBQUNSQyx1QkFBTyxDQURDO0FBRVJDLHNCQUFNLENBRkU7QUFHUkMsMEJBQVUsRUFIRjtBQUlSQywyQkFBVyxFQUpIO0FBS1JDLHlCQUFTO0FBTEQsYUFGVDtBQVNIQyxzQkFBVSxFQVRQO0FBVUhDLHVCQUFXLElBVlI7QUFXSEMsbUJBQU8sUUFYSjtBQVlIQyx5QkFBYTtBQVpWLFM7Ozs7OztpR0FjTUMsTTs7Ozs7OztBQUNUQyx3Q0FBUUMsR0FBUixDQUFZLFFBQVosRUFBc0JGLE1BQXRCO29EQUN5Q0EsTSxDQUFqQ04sUyxFQUFBQSxTLHFDQUFZLEUsd0NBQXFCTSxNLENBQWpCTCxPLEVBQUFBLE8sbUNBQVUsRTs7QUFDbENRLHVDQUFPQyxNQUFQLENBQWMsS0FBS2QsVUFBbkIsRUFBK0I7QUFDM0JJLHdEQUQyQjtBQUUzQkM7QUFGMkIsaUNBQS9CO0FBSUEscUNBQUtOLFFBQUwsR0FBZ0JLLGFBQWFDLE9BQWIsR0FBMEJELFVBQVVXLEtBQVYsQ0FBZ0IsR0FBaEIsRUFBcUIsQ0FBckIsQ0FBMUIsU0FBcURWLFFBQVFVLEtBQVIsQ0FBYyxHQUFkLEVBQW1CLENBQW5CLENBQXJELEdBQStFLElBQS9GO0FBQ0EscUNBQUtDLE1BQUw7O29DQUNLTixNOzs7Ozs7OztBQUNMLHFDQUFLTyxRQUFMOzs7Ozs7Ozs7Ozs7Ozs7Ozs7b0NBRVE7QUFDUkMsMkJBQUtDLFVBQUwsQ0FBZ0I7QUFDWkMscUJBQUs7QUFETyxhQUFoQjtBQUdIOzs7Ozs7Ozs7Ozs7O0FBR09ULHdDQUFRQyxHQUFSLENBQVksVUFBWixFQUF3QixLQUFLWixVQUE3Qjs7dUNBQ3VCLGVBQUksMEJBQUosRUFBZ0MsS0FBS0EsVUFBckMsQzs7OztBQUFmRixvQyxTQUFBQSxJO0FBQ0F1Qix1QyxHQUF5QnZCLEksQ0FBekJ1QixPLEVBQVNaLFcsR0FBZ0JYLEksQ0FBaEJXLFc7O3NDQUNiLEtBQUtULFVBQUwsQ0FBZ0JHLFFBQWhCLEtBQTZCLENBQTdCLEtBQW1Da0IsUUFBUUMsTUFBUixLQUFtQixDQUFuQixJQUF3QixDQUFDRCxPQUE1RCxDOzs7OztBQUNBO0FBQ0Esa0RBQU0sTUFBTjtBQUNBLHFDQUFLZCxTQUFMLEdBQWlCLEtBQWpCOzs7O0FBR0osb0NBQUksS0FBS1AsVUFBTCxDQUFnQkcsUUFBaEIsR0FBMkIsQ0FBM0IsSUFBZ0NrQixRQUFRQyxNQUFSLEdBQWlCLEtBQUt0QixVQUFMLENBQWdCRyxRQUFyRSxFQUErRTtBQUMzRTtBQUNBLHNEQUFNLFFBQU47QUFDQSx5Q0FBS0ksU0FBTCxHQUFpQixLQUFqQjtBQUNIO0FBQ0RjLHdDQUFRRSxPQUFSLENBQWdCLFVBQUNDLElBQUQsRUFBVTtBQUFBLHdDQUNkQyxPQURjLEdBQ0ZELElBREUsQ0FDZEMsT0FEYzs7QUFFdEJaLDJDQUFPQyxNQUFQLENBQWNVLElBQWQsRUFBb0I7QUFDaEJDLGlEQUFTQyxLQUFLQyxLQUFMLENBQVdGLE9BQVg7QUFETyxxQ0FBcEI7QUFHSCxpQ0FMRDtBQU1BLHFDQUFLbkIsUUFBTCxHQUFnQixLQUFLQSxRQUFMLENBQWNzQixNQUFkLENBQXFCUCxPQUFyQixDQUFoQjtBQUNBLHFDQUFLWixXQUFMLEdBQW1CQSxXQUFuQjtBQUNBLHFDQUFLTyxNQUFMOzs7Ozs7OztBQUVBTCx3Q0FBUUMsR0FBUjs7Ozs7Ozs7Ozs7Ozs7Ozs7O3dDQUdRO0FBQ1osZ0JBQUksQ0FBQyxLQUFLTCxTQUFWLEVBQXFCO0FBQ3JCLGdCQUFNTCxPQUFPLEtBQUtGLFVBQUwsQ0FBZ0JFLElBQWhCLEdBQXVCLENBQXBDO0FBQ0EsaUJBQUtGLFVBQUwsQ0FBZ0JFLElBQWhCLEdBQXVCQSxJQUF2QjtBQUNBLGlCQUFLYyxNQUFMO0FBQ0EsaUJBQUtDLFFBQUwsQ0FBYyxLQUFLWSxNQUFuQjtBQUNIOzs7b0NBQ1c7QUFDUixpQkFBS3pCLFNBQUwsR0FBaUIsRUFBakI7QUFDQSxpQkFBS0MsT0FBTCxHQUFlLEVBQWY7QUFDQSxpQkFBS1csTUFBTDtBQUNBLGlCQUFLQyxRQUFMO0FBQ0g7Ozs7RUE1RXNDQyxlQUFLaEIsSTs7a0JBQTNCUCxhIiwiZmlsZSI6InBheW1lbnRSZWNvcmQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XHJcblxyXG5pbXBvcnQgeyBnZXQgfSBmcm9tICcuLi91dGlscy9hamF4JztcclxuXHJcbmltcG9ydCB7IHRvYXN0IH0gZnJvbSAnLi4vdXRpbHMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGF5bWVudFJlY29yZCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgICBjb25maWcgPSB7XHJcbiAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+aUtuasvuiusOW9lScsXHJcbiAgICB9XHJcbiAgICBkYXRhID0ge1xyXG4gICAgICAgIHRpbWVab25lOiAn5oC75YWxJyxcclxuICAgICAgICBzZW5kUGFyYW1zOiB7XHJcbiAgICAgICAgICAgIGdyb3VwOiAzLFxyXG4gICAgICAgICAgICBwYWdlOiAxLFxyXG4gICAgICAgICAgICBwYWdlU2l6ZTogMTAsXHJcbiAgICAgICAgICAgIHN0YXJ0RGF0ZTogJycsXHJcbiAgICAgICAgICAgIGVuZERhdGU6ICcnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbGlzdERhdGE6IFtdLFxyXG4gICAgICAgIGlzTG9hZGluZzogdHJ1ZSxcclxuICAgICAgICB0aXRsZTogJ+ayoeacieaUtuasvuiusOW9lScsXHJcbiAgICAgICAgYW1vdW50VG90YWw6ICcnLFxyXG4gICAgfVxyXG4gICAgYXN5bmMgb25Mb2FkKG9wdGlvbikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdvbkxvYWQnLCBvcHRpb24pO1xyXG4gICAgICAgIGNvbnN0IHsgc3RhcnREYXRlID0gJycsIGVuZERhdGUgPSAnJyB9ID0gb3B0aW9uO1xyXG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5zZW5kUGFyYW1zLCB7XHJcbiAgICAgICAgICAgIHN0YXJ0RGF0ZSxcclxuICAgICAgICAgICAgZW5kRGF0ZSxcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnRpbWVab25lID0gc3RhcnREYXRlICYmIGVuZERhdGUgPyBgJHtzdGFydERhdGUuc3BsaXQoJyAnKVswXX0gJHtlbmREYXRlLnNwbGl0KCcgJylbMF19YCA6ICfmgLvlhbEnO1xyXG4gICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgaWYgKCFvcHRpb24pIHJldHVybjtcclxuICAgICAgICB0aGlzLmxvYWREYXRhKCk7XHJcbiAgICB9XHJcbiAgICBjaG9zZVRpbWUoKSB7XHJcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgdXJsOiAncGF5Q2hvc2VUaW1lJyxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGFzeW5jIGxvYWREYXRhKCkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdsb2FkRGF0YScsIHRoaXMuc2VuZFBhcmFtcyk7XHJcbiAgICAgICAgICAgIGNvbnN0IHsgZGF0YSB9ID0gYXdhaXQgZ2V0KCcvbXBsb2dpYy9nZXRncm91cG1zZ2xpc3QnLCB0aGlzLnNlbmRQYXJhbXMpO1xyXG4gICAgICAgICAgICBjb25zdCB7IG1zZ2xpc3QsIGFtb3VudFRvdGFsIH0gPSBkYXRhO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zZW5kUGFyYW1zLnBhZ2VTaXplID09PSAxICYmIChtc2dsaXN0Lmxlbmd0aCA9PT0gMCB8fCAhbXNnbGlzdCkpIHtcclxuICAgICAgICAgICAgICAgIC8vIOayoeacieaVsOaNrlxyXG4gICAgICAgICAgICAgICAgdG9hc3QoJ+ayoeacieaVsOaNricpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5zZW5kUGFyYW1zLnBhZ2VTaXplID4gMSAmJiBtc2dsaXN0Lmxlbmd0aCA8IHRoaXMuc2VuZFBhcmFtcy5wYWdlU2l6ZSkge1xyXG4gICAgICAgICAgICAgICAgLy8g5rKh5pyJ5pu05aSa5pWw5o2uXHJcbiAgICAgICAgICAgICAgICB0b2FzdCgn5rKh5pyJ5pu05aSa5pWw5o2uJyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG1zZ2xpc3QuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgeyBjb250ZW50IH0gPSBpdGVtO1xyXG4gICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihpdGVtLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGVudDogSlNPTi5wYXJzZShjb250ZW50KSxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5saXN0RGF0YSA9IHRoaXMubGlzdERhdGEuY29uY2F0KG1zZ2xpc3QpO1xyXG4gICAgICAgICAgICB0aGlzLmFtb3VudFRvdGFsID0gYW1vdW50VG90YWw7XHJcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBvblJlYWNoQm90dG9tKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5pc0xvYWRpbmcpIHJldHVybjtcclxuICAgICAgICBjb25zdCBwYWdlID0gdGhpcy5zZW5kUGFyYW1zLnBhZ2UgKyAxO1xyXG4gICAgICAgIHRoaXMuc2VuZFBhcmFtcy5wYWdlID0gcGFnZTtcclxuICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgIHRoaXMubG9hZERhdGEodGhpcy5jdXJUYWIpO1xyXG4gICAgfVxyXG4gICAgcmVzZXRUaW1lKCkge1xyXG4gICAgICAgIHRoaXMuc3RhcnREYXRlID0gJyc7XHJcbiAgICAgICAgdGhpcy5lbmREYXRlID0gJyc7XHJcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICB0aGlzLmxvYWREYXRhKCk7XHJcbiAgICB9XHJcbn1cclxuIl19