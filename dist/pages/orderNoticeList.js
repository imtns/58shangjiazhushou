'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _index = require('./../utils/index.js');

var _ajax = require('./../utils/ajax.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var OrderNoticeList = function (_wepy$page) {
    _inherits(OrderNoticeList, _wepy$page);

    function OrderNoticeList() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, OrderNoticeList);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = OrderNoticeList.__proto__ || Object.getPrototypeOf(OrderNoticeList)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            navigationBarTitleText: '订单提醒'
            // disableScroll: true,
        }, _this.data = {
            orderList: [],
            sendParams: {
                group: 2,
                page: 1,
                pageSize: 10
            }
        }, _this.methods = {
            orderListMore: function orderListMore() {
                this.sendParams.page = this.sendParams.page + 1;
                this.sendParams = Object.assign({}, this.sendParams, this.sendParams.page);
                this.loadList();
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(OrderNoticeList, [{
        key: 'onLoad',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return (0, _index.sleep)();

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
        key: 'onShow',
        value: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                this.loadList();

                            case 1:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function onShow() {
                return _ref3.apply(this, arguments);
            }

            return onShow;
        }()
    }, {
        key: 'onHide',
        value: function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                console.log('onHide');

                            case 1:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function onHide() {
                return _ref4.apply(this, arguments);
            }

            return onHide;
        }()
    }, {
        key: 'onUnload',
        value: function () {
            var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                console.log('onUnLoad');
                                // if (this.unreadcount <= 0) {
                                //     return;
                                // }
                                _context4.prev = 1;
                                _context4.next = 4;
                                return (0, _ajax.get)('/mplogic/readgroupmsg', { group: 2 });

                            case 4:
                                _context4.next = 9;
                                break;

                            case 6:
                                _context4.prev = 6;
                                _context4.t0 = _context4['catch'](1);

                                console.log(_context4.t0);

                            case 9:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this, [[1, 6]]);
            }));

            function onUnload() {
                return _ref5.apply(this, arguments);
            }

            return onUnload;
        }()
    }, {
        key: 'loadList',
        value: function () {
            var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
                var _ref7, data, msglist, arr;

                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                _context5.prev = 0;
                                _context5.next = 3;
                                return (0, _ajax.get)('/mplogic/getgroupmsglist', this.sendParams);

                            case 3:
                                _ref7 = _context5.sent;
                                data = _ref7.data;
                                msglist = data.msglist;

                                console.log(msglist);

                                if (!(msglist.length === 0)) {
                                    _context5.next = 11;
                                    break;
                                }

                                this.accountList = this.accountList;
                                (0, _index.toast)('没有更多消息啦');
                                return _context5.abrupt('return');

                            case 11:
                                arr = [];

                                msglist.forEach(function (item) {
                                    var content = item.content;

                                    var ele = Object.assign({}, item, { content: JSON.parse(content) });
                                    if (ele.mpLogo && ele.mpLogo.indexOf('http') === -1) {
                                        ele.mpLogo = 'https://pic1.58cdn.com.cn' + ele.mpLogo;
                                    }
                                    arr.push(ele);
                                });
                                this.orderList = this.orderList.concat(arr);
                                this.$apply();
                                _context5.next = 20;
                                break;

                            case 17:
                                _context5.prev = 17;
                                _context5.t0 = _context5['catch'](0);

                                console.log(_context5.t0);

                            case 20:
                            case 'end':
                                return _context5.stop();
                        }
                    }
                }, _callee5, this, [[0, 17]]);
            }));

            function loadList() {
                return _ref6.apply(this, arguments);
            }

            return loadList;
        }()
    }]);

    return OrderNoticeList;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(OrderNoticeList , 'pages/orderNoticeList'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9yZGVyTm90aWNlTGlzdC5qcyJdLCJuYW1lcyI6WyJPcmRlck5vdGljZUxpc3QiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsIm9yZGVyTGlzdCIsInNlbmRQYXJhbXMiLCJncm91cCIsInBhZ2UiLCJwYWdlU2l6ZSIsIm1ldGhvZHMiLCJvcmRlckxpc3RNb3JlIiwiT2JqZWN0IiwiYXNzaWduIiwibG9hZExpc3QiLCJjb25zb2xlIiwibG9nIiwibXNnbGlzdCIsImxlbmd0aCIsImFjY291bnRMaXN0IiwiYXJyIiwiZm9yRWFjaCIsIml0ZW0iLCJjb250ZW50IiwiZWxlIiwiSlNPTiIsInBhcnNlIiwibXBMb2dvIiwiaW5kZXhPZiIsInB1c2giLCJjb25jYXQiLCIkYXBwbHkiLCJ3ZXB5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUNBOzs7O0FBRUE7O0FBRUE7Ozs7Ozs7Ozs7OztJQUVxQkEsZTs7Ozs7Ozs7Ozs7Ozs7NE1BQ2pCQyxNLEdBQVM7QUFDTEMsb0NBQXdCO0FBQ3hCO0FBRkssUyxRQUlUQyxJLEdBQU87QUFDSEMsdUJBQVcsRUFEUjtBQUVIQyx3QkFBWTtBQUNSQyx1QkFBTyxDQURDO0FBRVJDLHNCQUFNLENBRkU7QUFHUkMsMEJBQVU7QUFIRjtBQUZULFMsUUFRUEMsTyxHQUFVO0FBQ05DLHlCQURNLDJCQUNVO0FBQ1oscUJBQUtMLFVBQUwsQ0FBZ0JFLElBQWhCLEdBQXVCLEtBQUtGLFVBQUwsQ0FBZ0JFLElBQWhCLEdBQXVCLENBQTlDO0FBQ0EscUJBQUtGLFVBQUwsR0FBa0JNLE9BQU9DLE1BQVAsQ0FBYyxFQUFkLEVBQWtCLEtBQUtQLFVBQXZCLEVBQW1DLEtBQUtBLFVBQUwsQ0FBZ0JFLElBQW5ELENBQWxCO0FBQ0EscUJBQUtNLFFBQUw7QUFDSDtBQUxLLFM7Ozs7Ozs7Ozs7Ozt1Q0FRQSxtQjs7O0FBQ05DLHdDQUFRQyxHQUFSLENBQVksUUFBWjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR0EscUNBQUtGLFFBQUw7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUdBQyx3Q0FBUUMsR0FBUixDQUFZLFFBQVo7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUdBRCx3Q0FBUUMsR0FBUixDQUFZLFVBQVo7QUFDQTtBQUNBO0FBQ0E7Ozt1Q0FFVSxlQUFJLHVCQUFKLEVBQTZCLEVBQUVULE9BQU8sQ0FBVCxFQUE3QixDOzs7Ozs7Ozs7O0FBRU5RLHdDQUFRQyxHQUFSOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3VDQUt1QixlQUFJLDBCQUFKLEVBQWdDLEtBQUtWLFVBQXJDLEM7Ozs7QUFBZkYsb0MsU0FBQUEsSTtBQUNBYSx1QyxHQUFZYixJLENBQVphLE87O0FBQ1JGLHdDQUFRQyxHQUFSLENBQVlDLE9BQVo7O3NDQUNJQSxRQUFRQyxNQUFSLEtBQW1CLEM7Ozs7O0FBQ25CLHFDQUFLQyxXQUFMLEdBQW1CLEtBQUtBLFdBQXhCO0FBQ0Esa0RBQU0sU0FBTjs7OztBQUdFQyxtQyxHQUFNLEU7O0FBQ1pILHdDQUFRSSxPQUFSLENBQWdCLFVBQUNDLElBQUQsRUFBVTtBQUFBLHdDQUNkQyxPQURjLEdBQ0ZELElBREUsQ0FDZEMsT0FEYzs7QUFFdEIsd0NBQU1DLE1BQU1aLE9BQU9DLE1BQVAsQ0FDUixFQURRLEVBRVJTLElBRlEsRUFFRixFQUFFQyxTQUFTRSxLQUFLQyxLQUFMLENBQVdILE9BQVgsQ0FBWCxFQUZFLENBQVo7QUFJQSx3Q0FBSUMsSUFBSUcsTUFBSixJQUFjSCxJQUFJRyxNQUFKLENBQVdDLE9BQVgsQ0FBbUIsTUFBbkIsTUFBK0IsQ0FBQyxDQUFsRCxFQUFxRDtBQUNqREosNENBQUlHLE1BQUosaUNBQXlDSCxJQUFJRyxNQUE3QztBQUNIO0FBQ0RQLHdDQUFJUyxJQUFKLENBQVNMLEdBQVQ7QUFDSCxpQ0FWRDtBQVdBLHFDQUFLbkIsU0FBTCxHQUFpQixLQUFLQSxTQUFMLENBQWV5QixNQUFmLENBQXNCVixHQUF0QixDQUFqQjtBQUNBLHFDQUFLVyxNQUFMOzs7Ozs7OztBQUVBaEIsd0NBQVFDLEdBQVI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFsRWlDZ0IsZUFBS3hCLEk7O2tCQUE3QlAsZSIsImZpbGUiOiJvcmRlck5vdGljZUxpc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuXG5pbXBvcnQgeyBzbGVlcCwgdG9hc3QgfSBmcm9tICcuLi91dGlscy9pbmRleCc7XG5cbmltcG9ydCB7IGdldCB9IGZyb20gJy4uL3V0aWxzL2FqYXgnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPcmRlck5vdGljZUxpc3QgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+iuouWNleaPkOmGkicsXG4gICAgICAgIC8vIGRpc2FibGVTY3JvbGw6IHRydWUsXG4gICAgfVxuICAgIGRhdGEgPSB7XG4gICAgICAgIG9yZGVyTGlzdDogW10sXG4gICAgICAgIHNlbmRQYXJhbXM6IHtcbiAgICAgICAgICAgIGdyb3VwOiAyLFxuICAgICAgICAgICAgcGFnZTogMSxcbiAgICAgICAgICAgIHBhZ2VTaXplOiAxMCxcbiAgICAgICAgfSxcbiAgICB9XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgICAgb3JkZXJMaXN0TW9yZSgpIHtcbiAgICAgICAgICAgIHRoaXMuc2VuZFBhcmFtcy5wYWdlID0gdGhpcy5zZW5kUGFyYW1zLnBhZ2UgKyAxO1xuICAgICAgICAgICAgdGhpcy5zZW5kUGFyYW1zID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5zZW5kUGFyYW1zLCB0aGlzLnNlbmRQYXJhbXMucGFnZSk7XG4gICAgICAgICAgICB0aGlzLmxvYWRMaXN0KCk7XG4gICAgICAgIH0sXG4gICAgfVxuICAgIGFzeW5jIG9uTG9hZCgpIHtcbiAgICAgICAgYXdhaXQgc2xlZXAoKTtcbiAgICAgICAgY29uc29sZS5sb2coJ29uTG9hZCcpO1xuICAgIH1cbiAgICBhc3luYyBvblNob3coKSB7XG4gICAgICAgIHRoaXMubG9hZExpc3QoKTtcbiAgICB9XG4gICAgYXN5bmMgb25IaWRlKCkge1xuICAgICAgICBjb25zb2xlLmxvZygnb25IaWRlJyk7XG4gICAgfVxuICAgIGFzeW5jIG9uVW5sb2FkKCkge1xuICAgICAgICBjb25zb2xlLmxvZygnb25VbkxvYWQnKTtcbiAgICAgICAgLy8gaWYgKHRoaXMudW5yZWFkY291bnQgPD0gMCkge1xuICAgICAgICAvLyAgICAgcmV0dXJuO1xuICAgICAgICAvLyB9XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBhd2FpdCBnZXQoJy9tcGxvZ2ljL3JlYWRncm91cG1zZycsIHsgZ3JvdXA6IDIgfSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGFzeW5jIGxvYWRMaXN0KCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgeyBkYXRhIH0gPSBhd2FpdCBnZXQoJy9tcGxvZ2ljL2dldGdyb3VwbXNnbGlzdCcsIHRoaXMuc2VuZFBhcmFtcyk7XG4gICAgICAgICAgICBjb25zdCB7IG1zZ2xpc3QgfSA9IGRhdGE7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhtc2dsaXN0KTtcbiAgICAgICAgICAgIGlmIChtc2dsaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuYWNjb3VudExpc3QgPSB0aGlzLmFjY291bnRMaXN0O1xuICAgICAgICAgICAgICAgIHRvYXN0KCfmsqHmnInmm7TlpJrmtojmga/llaYnKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBhcnIgPSBbXTtcbiAgICAgICAgICAgIG1zZ2xpc3QuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgY29udGVudCB9ID0gaXRlbTtcbiAgICAgICAgICAgICAgICBjb25zdCBlbGUgPSBPYmplY3QuYXNzaWduKFxuICAgICAgICAgICAgICAgICAgICB7fSxcbiAgICAgICAgICAgICAgICAgICAgaXRlbSwgeyBjb250ZW50OiBKU09OLnBhcnNlKGNvbnRlbnQpIH0sXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBpZiAoZWxlLm1wTG9nbyAmJiBlbGUubXBMb2dvLmluZGV4T2YoJ2h0dHAnKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgZWxlLm1wTG9nbyA9IGBodHRwczovL3BpYzEuNThjZG4uY29tLmNuJHtlbGUubXBMb2dvfWA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGFyci5wdXNoKGVsZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMub3JkZXJMaXN0ID0gdGhpcy5vcmRlckxpc3QuY29uY2F0KGFycik7XG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==