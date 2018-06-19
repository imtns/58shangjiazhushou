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
            statusSet: ['已下单', '已接单', '已评价', '已取消', '已删除'],
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

                if (this.orderList.length === total) return;
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
                                console.log('3333', this.orderList);
                                this.$apply();

                            case 13:
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
                                this.getOrderList();

                            case 1:
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIk9yZGVyTGlzdC5qcyJdLCJuYW1lcyI6WyJPcmRlckxpc3QiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsInN0YXR1c1NldCIsInNlbmRQYXJhbXMiLCJwYWdlTnVtIiwicGFnZVNpemUiLCJzdGF0dXMiLCJvcmRlckxpc3QiLCJtZXRob2RzIiwiYmluZENsaWNrVGFiIiwicmVzZXRQYXJhbXMiLCJyZXNldE9yZGVyTGlzdCIsIk9iamVjdCIsImFzc2lnbiIsImdldE9yZGVyTGlzdCIsImJpbmRMb2FkRG93biIsInRvdGFsIiwicmVjb3Jkc1RvdGFsIiwibGVuZ3RoIiwib3JkZXJzIiwicmVnRGF0ZVRpbWUiLCJtYXAiLCJpdGVtIiwicmV0IiwibXBMb2dvIiwiY3JlYXRlVGltZSIsInJlcGxhY2UiLCJzdGFydFRpbWUiLCJlbmRUaW1lIiwiZSIsInJlcyIsInBhcnNlT3JkZXJMaXN0IiwiY29uY2F0IiwiY29uc29sZSIsImxvZyIsIiRhcHBseSIsIndlcHkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7O0lBR3FCQSxTOzs7Ozs7Ozs7Ozs7OztnTUFDakJDLE0sR0FBUztBQUNMQyxvQ0FBd0I7QUFEbkIsUyxRQUdUQyxJLEdBQU87QUFDSEMsdUJBQVcsQ0FBQyxLQUFELEVBQVEsS0FBUixFQUFlLEtBQWYsRUFBc0IsS0FBdEIsRUFBNkIsS0FBN0IsQ0FEUjtBQUVIQyx3QkFBWTtBQUNSQyx5QkFBUyxDQUREO0FBRVJDLDBCQUFVLENBRkY7QUFHUkMsd0JBQVE7QUFIQSxhQUZUO0FBT0hDLHVCQUFXO0FBQ1BOLHNCQUFNLEVBREM7QUFFUEcseUJBQVMsQ0FGRjtBQUdQQywwQkFBVTtBQUhIO0FBUFIsUyxRQWFQRyxPLEdBQVU7QUFDTkMsd0JBRE0sd0JBQ1FILE1BRFIsRUFDZ0I7QUFDbEIsb0JBQU1JLGNBQWM7QUFDaEJOLDZCQUFTLENBRE87QUFFaEJDLDhCQUFVLENBRk07QUFHaEJDO0FBSGdCLGlCQUFwQjtBQUtBLG9CQUFNSyxpQkFBaUI7QUFDbkJWLDBCQUFNLEVBRGE7QUFFbkJHLDZCQUFTLENBRlU7QUFHbkJDLDhCQUFVO0FBSFMsaUJBQXZCO0FBS0EscUJBQUtGLFVBQUwsR0FBa0JTLE9BQU9DLE1BQVAsQ0FBYyxFQUFkLEVBQWtCLEtBQUtWLFVBQXZCLEVBQW1DTyxXQUFuQyxDQUFsQjtBQUNBLHFCQUFLSCxTQUFMLEdBQWlCSyxPQUFPQyxNQUFQLENBQWMsRUFBZCxFQUFrQkYsY0FBbEIsQ0FBakI7QUFDQSxxQkFBS0csWUFBTDtBQUNILGFBZks7QUFnQk5DLHdCQWhCTSx3QkFnQlFYLE9BaEJSLEVBZ0JpQjtBQUFBLG9CQUNHWSxLQURILEdBQ2EsS0FBS1QsU0FEbEIsQ0FDWFUsWUFEVzs7QUFFbkIsb0JBQUksS0FBS1YsU0FBTCxDQUFlVyxNQUFmLEtBQTBCRixLQUE5QixFQUFxQztBQUNyQyxxQkFBS2IsVUFBTCxHQUFrQlMsT0FBT0MsTUFBUCxDQUFjLEVBQWQsRUFBa0IsS0FBS1YsVUFBdkIsRUFBbUMsRUFBRUMsZ0JBQUYsRUFBbkMsQ0FBbEI7QUFDQSxxQkFBS1UsWUFBTDtBQUNIO0FBckJLLFM7Ozs7O3VDQXVCTUssTSxFQUFRO0FBQ3BCLGdCQUFNQyxjQUFjLGlGQUFwQjtBQUNBLG1CQUFPRCxPQUFPRSxHQUFQLENBQVcsVUFBQ0MsSUFBRCxFQUFVO0FBQ3hCLG9CQUFNQyxNQUFNRCxJQUFaO0FBQ0FDLG9CQUFJQyxNQUFKLEdBQWEsNkJBQWlCRixLQUFLRSxNQUFuQztBQUNBRCxvQkFBSUUsVUFBSixHQUFpQkgsS0FBS0csVUFBTCxDQUFnQkMsT0FBaEIsQ0FBd0JOLFdBQXhCLEVBQXFDLGFBQXJDLENBQWpCO0FBQ0FHLG9CQUFJSSxTQUFKLEdBQWdCTCxLQUFLSyxTQUFMLENBQWVELE9BQWYsQ0FBdUJOLFdBQXZCLEVBQW9DLGFBQXBDLENBQWhCO0FBQ0FHLG9CQUFJSyxPQUFKLEdBQWNOLEtBQUtNLE9BQUwsQ0FBYUYsT0FBYixDQUFxQk4sV0FBckIsRUFBa0MsYUFBbEMsQ0FBZDtBQUNBLHVCQUFPRyxHQUFQO0FBQ0gsYUFQTSxDQUFQO0FBUUg7Ozs7Ozs7Ozs7Ozt1Q0FFMEIsb0JBQUksdUNBQUosRUFBNkMsS0FBS3BCLFVBQWxELEM7Ozs7O0FBQWhCMEIsaUM7QUFBR0MsbUM7O3FDQUNORCxDOzs7OztBQUNBLGtEQUFNQSxDQUFOOzs7O0FBR0U1QixvQyxHQUFPLEtBQUs4QixjQUFMLENBQW9CRCxJQUFJN0IsSUFBeEIsQzs7QUFDYixxQ0FBS00sU0FBTCxHQUFpQkssT0FBT0MsTUFBUCxDQUFjLEVBQWQsRUFBa0JpQixHQUFsQixFQUF1QjtBQUNwQzdCLDBDQUFNLEdBQUcrQixNQUFILENBQVUsS0FBS3pCLFNBQUwsQ0FBZU4sSUFBekIsRUFBK0JBLElBQS9CO0FBRDhCLGlDQUF2QixDQUFqQjtBQUdBZ0Msd0NBQVFDLEdBQVIsQ0FBWSxNQUFaLEVBQW9CLEtBQUszQixTQUF6QjtBQUNBLHFDQUFLNEIsTUFBTDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR0EscUNBQUtyQixZQUFMOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBakUrQnNCLGVBQUtDLEk7O2tCQUF2QnZDLFMiLCJmaWxlIjoiT3JkZXJMaXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xyXG5pbXBvcnQgeyB0b2FzdCwgcGljU3JjRG9tYWluIH0gZnJvbSAnLi4vdXRpbHMnO1xyXG5pbXBvcnQgeyBnZXQgfSBmcm9tICcuLi91dGlscy9hamF4T3JkZXInO1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9yZGVyTGlzdCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgICBjb25maWcgPSB7XHJcbiAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+iuouWNleeuoeeQhicsXHJcbiAgICB9XHJcbiAgICBkYXRhID0ge1xyXG4gICAgICAgIHN0YXR1c1NldDogWyflt7LkuIvljZUnLCAn5bey5o6l5Y2VJywgJ+W3suivhOS7tycsICflt7Llj5bmtognLCAn5bey5Yig6ZmkJ10sXHJcbiAgICAgICAgc2VuZFBhcmFtczoge1xyXG4gICAgICAgICAgICBwYWdlTnVtOiAxLFxyXG4gICAgICAgICAgICBwYWdlU2l6ZTogNSxcclxuICAgICAgICAgICAgc3RhdHVzOiAnMCcsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBvcmRlckxpc3Q6IHtcclxuICAgICAgICAgICAgZGF0YTogW10sXHJcbiAgICAgICAgICAgIHBhZ2VOdW06IDEsXHJcbiAgICAgICAgICAgIHBhZ2VTaXplOiA1LFxyXG4gICAgICAgIH0sXHJcbiAgICB9XHJcbiAgICBtZXRob2RzID0ge1xyXG4gICAgICAgIGJpbmRDbGlja1RhYiAoc3RhdHVzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlc2V0UGFyYW1zID0ge1xyXG4gICAgICAgICAgICAgICAgcGFnZU51bTogMSxcclxuICAgICAgICAgICAgICAgIHBhZ2VTaXplOiA1LFxyXG4gICAgICAgICAgICAgICAgc3RhdHVzLFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBjb25zdCByZXNldE9yZGVyTGlzdCA9IHtcclxuICAgICAgICAgICAgICAgIGRhdGE6IFtdLFxyXG4gICAgICAgICAgICAgICAgcGFnZU51bTogMSxcclxuICAgICAgICAgICAgICAgIHBhZ2VTaXplOiA1LFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB0aGlzLnNlbmRQYXJhbXMgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLnNlbmRQYXJhbXMsIHJlc2V0UGFyYW1zKTtcclxuICAgICAgICAgICAgdGhpcy5vcmRlckxpc3QgPSBPYmplY3QuYXNzaWduKHt9LCByZXNldE9yZGVyTGlzdCk7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0T3JkZXJMaXN0KCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBiaW5kTG9hZERvd24gKHBhZ2VOdW0pIHtcclxuICAgICAgICAgICAgY29uc3QgeyByZWNvcmRzVG90YWw6IHRvdGFsIH0gPSB0aGlzLm9yZGVyTGlzdDtcclxuICAgICAgICAgICAgaWYgKHRoaXMub3JkZXJMaXN0Lmxlbmd0aCA9PT0gdG90YWwpIHJldHVybjtcclxuICAgICAgICAgICAgdGhpcy5zZW5kUGFyYW1zID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5zZW5kUGFyYW1zLCB7IHBhZ2VOdW0gfSk7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0T3JkZXJMaXN0KCk7XHJcbiAgICAgICAgfSxcclxuICAgIH1cclxuICAgIHBhcnNlT3JkZXJMaXN0IChvcmRlcnMpIHtcclxuICAgICAgICBjb25zdCByZWdEYXRlVGltZSA9IC8oXFxkezR9KS0oWzAtMV0/XFxkezF9KS0oWzAtM10/XFxkezF9KSAoWzAtMl0/XFxkezF9KTooWzAtNV0/XFxkezF9KTooWzAtNV0/XFxkezF9KS4qLztcclxuICAgICAgICByZXR1cm4gb3JkZXJzLm1hcCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCByZXQgPSBpdGVtO1xyXG4gICAgICAgICAgICByZXQubXBMb2dvID0gcGljU3JjRG9tYWluKCkgKyBpdGVtLm1wTG9nbztcclxuICAgICAgICAgICAgcmV0LmNyZWF0ZVRpbWUgPSBpdGVtLmNyZWF0ZVRpbWUucmVwbGFjZShyZWdEYXRlVGltZSwgJyQyLiQzICQ0OiQ1Jyk7XHJcbiAgICAgICAgICAgIHJldC5zdGFydFRpbWUgPSBpdGVtLnN0YXJ0VGltZS5yZXBsYWNlKHJlZ0RhdGVUaW1lLCAnJDIuJDMgJDQ6JDUnKTtcclxuICAgICAgICAgICAgcmV0LmVuZFRpbWUgPSBpdGVtLmVuZFRpbWUucmVwbGFjZShyZWdEYXRlVGltZSwgJyQyLiQzICQ0OiQ1Jyk7XHJcbiAgICAgICAgICAgIHJldHVybiByZXQ7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBhc3luYyBnZXRPcmRlckxpc3QgKCkge1xyXG4gICAgICAgIGNvbnN0IFtlLCByZXNdID0gYXdhaXQgZ2V0KCcvY29uc3VtZXJBcHBvaW50bWVudC9xdWVyeVBhZ2VGb3JVc2VyJywgdGhpcy5zZW5kUGFyYW1zKTtcclxuICAgICAgICBpZiAoZSkge1xyXG4gICAgICAgICAgICB0b2FzdChlKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBkYXRhID0gdGhpcy5wYXJzZU9yZGVyTGlzdChyZXMuZGF0YSk7XHJcbiAgICAgICAgdGhpcy5vcmRlckxpc3QgPSBPYmplY3QuYXNzaWduKHt9LCByZXMsIHtcclxuICAgICAgICAgICAgZGF0YTogW10uY29uY2F0KHRoaXMub3JkZXJMaXN0LmRhdGEsIGRhdGEpLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCczMzMzJywgdGhpcy5vcmRlckxpc3QpO1xyXG4gICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICB9XHJcbiAgICBhc3luYyBvbkxvYWQgKCkge1xyXG4gICAgICAgIHRoaXMuZ2V0T3JkZXJMaXN0KCk7XHJcbiAgICB9XHJcbn1cclxuIl19