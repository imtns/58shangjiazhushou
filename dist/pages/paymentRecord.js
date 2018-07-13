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
                                this.timeZone = startDate && endDate ? startDate + ' ' + endDate : '总共';
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
                var data, msglist, amountTotal;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.prev = 0;

                                console.log('loadData', this.sendParams);
                                _context2.next = 4;
                                return (0, _ajax.get)('/mplogic/getgroupmsglist', this.sendParams);

                            case 4:
                                data = _context2.sent;
                                msglist = data.msglist, amountTotal = data.amountTotal;

                                if (!(this.sendParams.pageSize === 1 && (msglist.length === 0 || !msglist))) {
                                    _context2.next = 10;
                                    break;
                                }

                                // 没有数据
                                (0, _utils.toast)('没有数据');
                                this.isLoading = false;
                                return _context2.abrupt('return');

                            case 10:
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
                                _context2.next = 20;
                                break;

                            case 17:
                                _context2.prev = 17;
                                _context2.t0 = _context2['catch'](0);

                                console.log(_context2.t0);

                            case 20:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this, [[0, 17]]);
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBheW1lbnRSZWNvcmQuanMiXSwibmFtZXMiOlsiUGF5bWVudFJlY29yZCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwidGltZVpvbmUiLCJzZW5kUGFyYW1zIiwiZ3JvdXAiLCJwYWdlIiwicGFnZVNpemUiLCJzdGFydERhdGUiLCJlbmREYXRlIiwibGlzdERhdGEiLCJpc0xvYWRpbmciLCJ0aXRsZSIsImFtb3VudFRvdGFsIiwib3B0aW9uIiwiY29uc29sZSIsImxvZyIsIk9iamVjdCIsImFzc2lnbiIsIiRhcHBseSIsImxvYWREYXRhIiwid2VweSIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJtc2dsaXN0IiwibGVuZ3RoIiwiZm9yRWFjaCIsIml0ZW0iLCJjb250ZW50IiwiSlNPTiIsInBhcnNlIiwiY29uY2F0IiwiY3VyVGFiIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUNBOzs7O0FBRUE7O0FBRUE7Ozs7Ozs7Ozs7OztJQUVxQkEsYTs7Ozs7Ozs7Ozs7Ozs7d01BQ2pCQyxNLEdBQVM7QUFDTEMsb0NBQXdCO0FBRG5CLFMsUUFHVEMsSSxHQUFPO0FBQ0hDLHNCQUFVLElBRFA7QUFFSEMsd0JBQVk7QUFDUkMsdUJBQU8sQ0FEQztBQUVSQyxzQkFBTSxDQUZFO0FBR1JDLDBCQUFVLEVBSEY7QUFJUkMsMkJBQVcsRUFKSDtBQUtSQyx5QkFBUztBQUxELGFBRlQ7QUFTSEMsc0JBQVUsRUFUUDtBQVVIQyx1QkFBVyxJQVZSO0FBV0hDLG1CQUFPLFFBWEo7QUFZSEMseUJBQWE7QUFaVixTOzs7Ozs7aUdBY01DLE07Ozs7Ozs7QUFDVEMsd0NBQVFDLEdBQVIsQ0FBWSxRQUFaLEVBQXNCRixNQUF0QjtvREFDeUNBLE0sQ0FBakNOLFMsRUFBQUEsUyxxQ0FBWSxFLHdDQUFxQk0sTSxDQUFqQkwsTyxFQUFBQSxPLG1DQUFVLEU7O0FBQ2xDUSx1Q0FBT0MsTUFBUCxDQUFjLEtBQUtkLFVBQW5CLEVBQStCO0FBQzNCSSx3REFEMkI7QUFFM0JDO0FBRjJCLGlDQUEvQjtBQUlBLHFDQUFLTixRQUFMLEdBQWdCSyxhQUFhQyxPQUFiLEdBQTBCRCxTQUExQixTQUF1Q0MsT0FBdkMsR0FBbUQsSUFBbkU7QUFDQSxxQ0FBS1UsTUFBTDtBQUNBLHFDQUFLQyxRQUFMOzs7Ozs7Ozs7Ozs7Ozs7Ozs7b0NBRVE7QUFDUkMsMkJBQUtDLFVBQUwsQ0FBZ0I7QUFDWkMscUJBQUs7QUFETyxhQUFoQjtBQUdIOzs7Ozs7Ozs7Ozs7QUFHT1Isd0NBQVFDLEdBQVIsQ0FBWSxVQUFaLEVBQXdCLEtBQUtaLFVBQTdCOzt1Q0FDbUIsZUFBSSwwQkFBSixFQUFnQyxLQUFLQSxVQUFyQyxDOzs7QUFBYkYsb0M7QUFDRXNCLHVDLEdBQXlCdEIsSSxDQUF6QnNCLE8sRUFBU1gsVyxHQUFnQlgsSSxDQUFoQlcsVzs7c0NBQ2IsS0FBS1QsVUFBTCxDQUFnQkcsUUFBaEIsS0FBNkIsQ0FBN0IsS0FBbUNpQixRQUFRQyxNQUFSLEtBQW1CLENBQW5CLElBQXdCLENBQUNELE9BQTVELEM7Ozs7O0FBQ0E7QUFDQSxrREFBTSxNQUFOO0FBQ0EscUNBQUtiLFNBQUwsR0FBaUIsS0FBakI7Ozs7QUFHSixvQ0FBSSxLQUFLUCxVQUFMLENBQWdCRyxRQUFoQixHQUEyQixDQUEzQixJQUFnQ2lCLFFBQVFDLE1BQVIsR0FBaUIsS0FBS3JCLFVBQUwsQ0FBZ0JHLFFBQXJFLEVBQStFO0FBQzNFO0FBQ0Esc0RBQU0sUUFBTjtBQUNBLHlDQUFLSSxTQUFMLEdBQWlCLEtBQWpCO0FBQ0g7QUFDRGEsd0NBQVFFLE9BQVIsQ0FBZ0IsVUFBQ0MsSUFBRCxFQUFVO0FBQUEsd0NBQ2RDLE9BRGMsR0FDRkQsSUFERSxDQUNkQyxPQURjOztBQUV0QlgsMkNBQU9DLE1BQVAsQ0FBY1MsSUFBZCxFQUFvQjtBQUNoQkMsaURBQVNDLEtBQUtDLEtBQUwsQ0FBV0YsT0FBWDtBQURPLHFDQUFwQjtBQUdILGlDQUxEO0FBTUEscUNBQUtsQixRQUFMLEdBQWdCLEtBQUtBLFFBQUwsQ0FBY3FCLE1BQWQsQ0FBcUJQLE9BQXJCLENBQWhCO0FBQ0EscUNBQUtYLFdBQUwsR0FBbUJBLFdBQW5CO0FBQ0EscUNBQUtNLE1BQUw7Ozs7Ozs7O0FBRUFKLHdDQUFRQyxHQUFSOzs7Ozs7Ozs7Ozs7Ozs7Ozs7d0NBR1E7QUFDWixnQkFBSSxDQUFDLEtBQUtMLFNBQVYsRUFBcUI7QUFDckIsZ0JBQU1MLE9BQU8sS0FBS0YsVUFBTCxDQUFnQkUsSUFBaEIsR0FBdUIsQ0FBcEM7QUFDQSxpQkFBS0YsVUFBTCxDQUFnQkUsSUFBaEIsR0FBdUJBLElBQXZCO0FBQ0EsaUJBQUthLE1BQUw7QUFDQSxpQkFBS0MsUUFBTCxDQUFjLEtBQUtZLE1BQW5CO0FBQ0g7OztvQ0FDVztBQUNSLGlCQUFLeEIsU0FBTCxHQUFpQixFQUFqQjtBQUNBLGlCQUFLQyxPQUFMLEdBQWUsRUFBZjtBQUNBLGlCQUFLVSxNQUFMO0FBQ0EsaUJBQUtDLFFBQUw7QUFDSDs7OztFQTNFc0NDLGVBQUtmLEk7O2tCQUEzQlAsYSIsImZpbGUiOiJwYXltZW50UmVjb3JkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xyXG5cclxuaW1wb3J0IHsgZ2V0IH0gZnJvbSAnLi4vdXRpbHMvYWpheCc7XHJcblxyXG5pbXBvcnQgeyB0b2FzdCB9IGZyb20gJy4uL3V0aWxzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBheW1lbnRSZWNvcmQgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gICAgY29uZmlnID0ge1xyXG4gICAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmlLbmrL7orrDlvZUnLFxyXG4gICAgfVxyXG4gICAgZGF0YSA9IHtcclxuICAgICAgICB0aW1lWm9uZTogJ+aAu+WFsScsXHJcbiAgICAgICAgc2VuZFBhcmFtczoge1xyXG4gICAgICAgICAgICBncm91cDogMyxcclxuICAgICAgICAgICAgcGFnZTogMSxcclxuICAgICAgICAgICAgcGFnZVNpemU6IDEwLFxyXG4gICAgICAgICAgICBzdGFydERhdGU6ICcnLFxyXG4gICAgICAgICAgICBlbmREYXRlOiAnJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxpc3REYXRhOiBbXSxcclxuICAgICAgICBpc0xvYWRpbmc6IHRydWUsXHJcbiAgICAgICAgdGl0bGU6ICfmsqHmnInmlLbmrL7orrDlvZUnLFxyXG4gICAgICAgIGFtb3VudFRvdGFsOiAnJyxcclxuICAgIH1cclxuICAgIGFzeW5jIG9uTG9hZChvcHRpb24pIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnb25Mb2FkJywgb3B0aW9uKTtcclxuICAgICAgICBjb25zdCB7IHN0YXJ0RGF0ZSA9ICcnLCBlbmREYXRlID0gJycgfSA9IG9wdGlvbjtcclxuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMuc2VuZFBhcmFtcywge1xyXG4gICAgICAgICAgICBzdGFydERhdGUsXHJcbiAgICAgICAgICAgIGVuZERhdGUsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy50aW1lWm9uZSA9IHN0YXJ0RGF0ZSAmJiBlbmREYXRlID8gYCR7c3RhcnREYXRlfSAke2VuZERhdGV9YCA6ICfmgLvlhbEnO1xyXG4gICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgdGhpcy5sb2FkRGF0YSgpO1xyXG4gICAgfVxyXG4gICAgY2hvc2VUaW1lKCkge1xyXG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgIHVybDogJ3BheUNob3NlVGltZScsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBhc3luYyBsb2FkRGF0YSgpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnbG9hZERhdGEnLCB0aGlzLnNlbmRQYXJhbXMpO1xyXG4gICAgICAgICAgICBjb25zdCBkYXRhID0gYXdhaXQgZ2V0KCcvbXBsb2dpYy9nZXRncm91cG1zZ2xpc3QnLCB0aGlzLnNlbmRQYXJhbXMpO1xyXG4gICAgICAgICAgICBjb25zdCB7IG1zZ2xpc3QsIGFtb3VudFRvdGFsIH0gPSBkYXRhO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zZW5kUGFyYW1zLnBhZ2VTaXplID09PSAxICYmIChtc2dsaXN0Lmxlbmd0aCA9PT0gMCB8fCAhbXNnbGlzdCkpIHtcclxuICAgICAgICAgICAgICAgIC8vIOayoeacieaVsOaNrlxyXG4gICAgICAgICAgICAgICAgdG9hc3QoJ+ayoeacieaVsOaNricpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5zZW5kUGFyYW1zLnBhZ2VTaXplID4gMSAmJiBtc2dsaXN0Lmxlbmd0aCA8IHRoaXMuc2VuZFBhcmFtcy5wYWdlU2l6ZSkge1xyXG4gICAgICAgICAgICAgICAgLy8g5rKh5pyJ5pu05aSa5pWw5o2uXHJcbiAgICAgICAgICAgICAgICB0b2FzdCgn5rKh5pyJ5pu05aSa5pWw5o2uJyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG1zZ2xpc3QuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgeyBjb250ZW50IH0gPSBpdGVtO1xyXG4gICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihpdGVtLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGVudDogSlNPTi5wYXJzZShjb250ZW50KSxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5saXN0RGF0YSA9IHRoaXMubGlzdERhdGEuY29uY2F0KG1zZ2xpc3QpO1xyXG4gICAgICAgICAgICB0aGlzLmFtb3VudFRvdGFsID0gYW1vdW50VG90YWw7XHJcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBvblJlYWNoQm90dG9tKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5pc0xvYWRpbmcpIHJldHVybjtcclxuICAgICAgICBjb25zdCBwYWdlID0gdGhpcy5zZW5kUGFyYW1zLnBhZ2UgKyAxO1xyXG4gICAgICAgIHRoaXMuc2VuZFBhcmFtcy5wYWdlID0gcGFnZTtcclxuICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgIHRoaXMubG9hZERhdGEodGhpcy5jdXJUYWIpO1xyXG4gICAgfVxyXG4gICAgcmVzZXRUaW1lKCkge1xyXG4gICAgICAgIHRoaXMuc3RhcnREYXRlID0gJyc7XHJcbiAgICAgICAgdGhpcy5lbmREYXRlID0gJyc7XHJcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICB0aGlzLmxvYWREYXRhKCk7XHJcbiAgICB9XHJcbn1cclxuIl19