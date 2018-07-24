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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIk9yZGVyTGlzdC5qcyJdLCJuYW1lcyI6WyJPcmRlckxpc3QiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsInN0YXR1c1NldCIsInNlbmRQYXJhbXMiLCJwYWdlTnVtIiwicGFnZVNpemUiLCJzdGF0dXMiLCJvcmRlckxpc3QiLCJtZXRob2RzIiwiYmluZENsaWNrVGFiIiwicmVzZXRQYXJhbXMiLCJyZXNldE9yZGVyTGlzdCIsIk9iamVjdCIsImFzc2lnbiIsImdldE9yZGVyTGlzdCIsImJpbmRMb2FkRG93biIsInRvdGFsIiwicmVjb3Jkc1RvdGFsIiwibGVuZ3RoIiwib3JkZXJzIiwicmVnRGF0ZVRpbWUiLCJtYXAiLCJpdGVtIiwicmV0IiwibXBMb2dvIiwiY3JlYXRlVGltZSIsInJlcGxhY2UiLCJzdGFydFRpbWUiLCJlbmRUaW1lIiwiZSIsInJlcyIsInBhcnNlT3JkZXJMaXN0IiwiY29uY2F0IiwiJGFwcGx5Iiwid2VweSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7SUFHcUJBLFM7Ozs7Ozs7Ozs7Ozs7O2dNQUNqQkMsTSxHQUFTO0FBQ0xDLG9DQUF3QjtBQURuQixTLFFBR1RDLEksR0FBTztBQUNIQyx1QkFBVyxDQUFDLEtBQUQsRUFBUSxLQUFSLEVBQWUsS0FBZixFQUFzQixLQUF0QixFQUE2QixLQUE3QixDQURSO0FBRUhDLHdCQUFZO0FBQ1JDLHlCQUFTLENBREQ7QUFFUkMsMEJBQVUsQ0FGRjtBQUdSQyx3QkFBUTtBQUhBLGFBRlQ7QUFPSEMsdUJBQVc7QUFDUE4sc0JBQU0sRUFEQztBQUVQRyx5QkFBUyxDQUZGO0FBR1BDLDBCQUFVO0FBSEg7QUFQUixTLFFBYVBHLE8sR0FBVTtBQUNOQyx3QkFETSx3QkFDUUgsTUFEUixFQUNnQjtBQUNsQixvQkFBTUksY0FBYztBQUNoQk4sNkJBQVMsQ0FETztBQUVoQkMsOEJBQVUsQ0FGTTtBQUdoQkM7QUFIZ0IsaUJBQXBCO0FBS0Esb0JBQU1LLGlCQUFpQjtBQUNuQlYsMEJBQU0sRUFEYTtBQUVuQkcsNkJBQVMsQ0FGVTtBQUduQkMsOEJBQVU7QUFIUyxpQkFBdkI7QUFLQSxxQkFBS0YsVUFBTCxHQUFrQlMsT0FBT0MsTUFBUCxDQUFjLEVBQWQsRUFBa0IsS0FBS1YsVUFBdkIsRUFBbUNPLFdBQW5DLENBQWxCO0FBQ0EscUJBQUtILFNBQUwsR0FBaUJLLE9BQU9DLE1BQVAsQ0FBYyxFQUFkLEVBQWtCRixjQUFsQixDQUFqQjtBQUNBLHFCQUFLRyxZQUFMO0FBQ0gsYUFmSztBQWdCTkMsd0JBaEJNLHdCQWdCUVgsT0FoQlIsRUFnQmlCO0FBQUEsb0JBQ0dZLEtBREgsR0FDYSxLQUFLVCxTQURsQixDQUNYVSxZQURXOztBQUVuQixvQkFBSSxLQUFLVixTQUFMLENBQWVOLElBQWYsQ0FBb0JpQixNQUFwQixLQUErQkYsS0FBbkMsRUFBMEM7QUFDMUMscUJBQUtiLFVBQUwsR0FBa0JTLE9BQU9DLE1BQVAsQ0FBYyxFQUFkLEVBQWtCLEtBQUtWLFVBQXZCLEVBQW1DLEVBQUVDLGdCQUFGLEVBQW5DLENBQWxCO0FBQ0EscUJBQUtVLFlBQUw7QUFDSDtBQXJCSyxTOzs7Ozt1Q0F1Qk1LLE0sRUFBUTtBQUNwQixnQkFBTUMsY0FBYyxpRkFBcEI7QUFDQSxtQkFBT0QsT0FBT0UsR0FBUCxDQUFXLFVBQUNDLElBQUQsRUFBVTtBQUN4QixvQkFBTUMsTUFBTUQsSUFBWjtBQUNBQyxvQkFBSUMsTUFBSixHQUFhLDZCQUFpQkYsS0FBS0UsTUFBbkM7QUFDQUQsb0JBQUlFLFVBQUosR0FBaUJILEtBQUtHLFVBQUwsQ0FBZ0JDLE9BQWhCLENBQXdCTixXQUF4QixFQUFxQyxhQUFyQyxDQUFqQjtBQUNBRyxvQkFBSUksU0FBSixHQUFnQkwsS0FBS0ssU0FBTCxDQUFlRCxPQUFmLENBQXVCTixXQUF2QixFQUFvQyxhQUFwQyxDQUFoQjtBQUNBRyxvQkFBSUssT0FBSixHQUFjTixLQUFLTSxPQUFMLENBQWFGLE9BQWIsQ0FBcUJOLFdBQXJCLEVBQWtDLGFBQWxDLENBQWQ7QUFDQSx1QkFBT0csR0FBUDtBQUNILGFBUE0sQ0FBUDtBQVFIOzs7Ozs7Ozs7Ozs7dUNBRTBCLG9CQUFJLHVDQUFKLEVBQTZDLEtBQUtwQixVQUFsRCxDOzs7OztBQUFoQjBCLGlDO0FBQUdDLG1DOztxQ0FDTkQsQzs7Ozs7QUFDQSxrREFBTUEsQ0FBTjs7OztBQUdFNUIsb0MsR0FBTyxLQUFLOEIsY0FBTCxDQUFvQkQsSUFBSTdCLElBQXhCLEM7O0FBQ2IscUNBQUtNLFNBQUwsR0FBaUJLLE9BQU9DLE1BQVAsQ0FBYyxFQUFkLEVBQWtCaUIsR0FBbEIsRUFBdUI7QUFDcEM3QiwwQ0FBTSxHQUFHK0IsTUFBSCxDQUFVLEtBQUt6QixTQUFMLENBQWVOLElBQXpCLEVBQStCQSxJQUEvQjtBQUQ4QixpQ0FBdkIsQ0FBakI7QUFHQSxxQ0FBS2dDLE1BQUw7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7dUNBR00sS0FBS25CLFlBQUwsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQWhFeUJvQixlQUFLQyxJOztrQkFBdkJyQyxTIiwiZmlsZSI6Ik9yZGVyTGlzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5pbXBvcnQgeyB0b2FzdCwgcGljU3JjRG9tYWluIH0gZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IHsgZ2V0IH0gZnJvbSAnLi4vdXRpbHMvYWpheE9yZGVyJztcblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPcmRlckxpc3QgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+iuouWNleeuoeeQhicsXG4gICAgfVxuICAgIGRhdGEgPSB7XG4gICAgICAgIHN0YXR1c1NldDogWyflvoXmjqXljZUnLCAn5b6F5pyN5YqhJywgJ+W3suivhOS7tycsICflt7Llj5bmtognLCAn5bey5Yig6ZmkJ10sXG4gICAgICAgIHNlbmRQYXJhbXM6IHtcbiAgICAgICAgICAgIHBhZ2VOdW06IDEsXG4gICAgICAgICAgICBwYWdlU2l6ZTogNSxcbiAgICAgICAgICAgIHN0YXR1czogJzAnLFxuICAgICAgICB9LFxuICAgICAgICBvcmRlckxpc3Q6IHtcbiAgICAgICAgICAgIGRhdGE6IFtdLFxuICAgICAgICAgICAgcGFnZU51bTogMSxcbiAgICAgICAgICAgIHBhZ2VTaXplOiA1LFxuICAgICAgICB9LFxuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgICAgICBiaW5kQ2xpY2tUYWIgKHN0YXR1cykge1xuICAgICAgICAgICAgY29uc3QgcmVzZXRQYXJhbXMgPSB7XG4gICAgICAgICAgICAgICAgcGFnZU51bTogMSxcbiAgICAgICAgICAgICAgICBwYWdlU2l6ZTogNSxcbiAgICAgICAgICAgICAgICBzdGF0dXMsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgY29uc3QgcmVzZXRPcmRlckxpc3QgPSB7XG4gICAgICAgICAgICAgICAgZGF0YTogW10sXG4gICAgICAgICAgICAgICAgcGFnZU51bTogMSxcbiAgICAgICAgICAgICAgICBwYWdlU2l6ZTogNSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLnNlbmRQYXJhbXMgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLnNlbmRQYXJhbXMsIHJlc2V0UGFyYW1zKTtcbiAgICAgICAgICAgIHRoaXMub3JkZXJMaXN0ID0gT2JqZWN0LmFzc2lnbih7fSwgcmVzZXRPcmRlckxpc3QpO1xuICAgICAgICAgICAgdGhpcy5nZXRPcmRlckxpc3QoKTtcbiAgICAgICAgfSxcbiAgICAgICAgYmluZExvYWREb3duIChwYWdlTnVtKSB7XG4gICAgICAgICAgICBjb25zdCB7IHJlY29yZHNUb3RhbDogdG90YWwgfSA9IHRoaXMub3JkZXJMaXN0O1xuICAgICAgICAgICAgaWYgKHRoaXMub3JkZXJMaXN0LmRhdGEubGVuZ3RoID09PSB0b3RhbCkgcmV0dXJuO1xuICAgICAgICAgICAgdGhpcy5zZW5kUGFyYW1zID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5zZW5kUGFyYW1zLCB7IHBhZ2VOdW0gfSk7XG4gICAgICAgICAgICB0aGlzLmdldE9yZGVyTGlzdCgpO1xuICAgICAgICB9LFxuICAgIH1cbiAgICBwYXJzZU9yZGVyTGlzdCAob3JkZXJzKSB7XG4gICAgICAgIGNvbnN0IHJlZ0RhdGVUaW1lID0gLyhcXGR7NH0pLShbMC0xXT9cXGR7MX0pLShbMC0zXT9cXGR7MX0pIChbMC0yXT9cXGR7MX0pOihbMC01XT9cXGR7MX0pOihbMC01XT9cXGR7MX0pLiovO1xuICAgICAgICByZXR1cm4gb3JkZXJzLm1hcCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcmV0ID0gaXRlbTtcbiAgICAgICAgICAgIHJldC5tcExvZ28gPSBwaWNTcmNEb21haW4oKSArIGl0ZW0ubXBMb2dvO1xuICAgICAgICAgICAgcmV0LmNyZWF0ZVRpbWUgPSBpdGVtLmNyZWF0ZVRpbWUucmVwbGFjZShyZWdEYXRlVGltZSwgJyQyLiQzICQ0OiQ1Jyk7XG4gICAgICAgICAgICByZXQuc3RhcnRUaW1lID0gaXRlbS5zdGFydFRpbWUucmVwbGFjZShyZWdEYXRlVGltZSwgJyQyLiQzICQ0OiQ1Jyk7XG4gICAgICAgICAgICByZXQuZW5kVGltZSA9IGl0ZW0uZW5kVGltZS5yZXBsYWNlKHJlZ0RhdGVUaW1lLCAnJDIuJDMgJDQ6JDUnKTtcbiAgICAgICAgICAgIHJldHVybiByZXQ7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBhc3luYyBnZXRPcmRlckxpc3QgKCkge1xuICAgICAgICBjb25zdCBbZSwgcmVzXSA9IGF3YWl0IGdldCgnL2NvbnN1bWVyQXBwb2ludG1lbnQvcXVlcnlQYWdlRm9yVXNlcicsIHRoaXMuc2VuZFBhcmFtcyk7XG4gICAgICAgIGlmIChlKSB7XG4gICAgICAgICAgICB0b2FzdChlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBkYXRhID0gdGhpcy5wYXJzZU9yZGVyTGlzdChyZXMuZGF0YSk7XG4gICAgICAgIHRoaXMub3JkZXJMaXN0ID0gT2JqZWN0LmFzc2lnbih7fSwgcmVzLCB7XG4gICAgICAgICAgICBkYXRhOiBbXS5jb25jYXQodGhpcy5vcmRlckxpc3QuZGF0YSwgZGF0YSksXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgIH1cbiAgICBhc3luYyBvbkxvYWQgKCkge1xuICAgICAgICBhd2FpdCB0aGlzLmdldE9yZGVyTGlzdCgpO1xuICAgIH1cbn1cbiJdfQ==