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

var NoticeList = function (_wepy$page) {
    _inherits(NoticeList, _wepy$page);

    function NoticeList() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, NoticeList);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = NoticeList.__proto__ || Object.getPrototypeOf(NoticeList)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            navigationBarTitleText: '通知'
            // disableScroll: true,
        }, _this.data = {
            noticeList: [],
            orderUnRead: 0,
            recivMoneyUnRead: 0,
            unreadcount: 0,
            sendParams: {
                group: 1,
                page: 1,
                pageSize: 10
            }
        }, _this.methods = {
            noticeListMore: function noticeListMore() {
                this.sendParams.page = this.sendParams.page + 1;
                this.sendParams = Object.assign({}, this.sendParams, this.sendParams.page);
                this.loadNoticeList();
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(NoticeList, [{
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

                                if (!(this.unreadcount <= 0)) {
                                    _context4.next = 3;
                                    break;
                                }

                                return _context4.abrupt('return');

                            case 3:
                                _context4.prev = 3;
                                _context4.next = 6;
                                return (0, _ajax.get)('/mplogic/readgroupmsg', { group: 1 });

                            case 6:
                                _context4.next = 11;
                                break;

                            case 8:
                                _context4.prev = 8;
                                _context4.t0 = _context4['catch'](3);

                                console.log(_context4.t0);

                            case 11:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this, [[3, 8]]);
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
                var _ref7, data, msglist, unreadcount, orderUnRead, recivMoneyUnRead, arr;

                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                _context5.prev = 0;
                                _context5.next = 3;
                                return (0, _ajax.get)('/mplogic/msglist');

                            case 3:
                                _ref7 = _context5.sent;
                                data = _ref7.data;
                                msglist = data.msglist, unreadcount = data.unreadcount, orderUnRead = data.orderUnRead, recivMoneyUnRead = data.recivMoneyUnRead;

                                this.unreadcount = unreadcount;
                                this.orderUnRead = orderUnRead;
                                this.recivMoneyUnRead = recivMoneyUnRead;
                                if (msglist && msglist.length > 0) {
                                    arr = [];

                                    msglist.forEach(function (item) {
                                        var ele = item;
                                        if (ele.mpLogo && ele.mpLogo.indexOf('http') === -1) {
                                            ele.mpLogo = 'https://pic1.58cdn.com.cn' + ele.mpLogo;
                                        }
                                        arr.push(ele);
                                    });
                                    this.noticeList = arr;
                                } else {
                                    this.noticeList = [];
                                }
                                this.$apply();
                                _context5.next = 16;
                                break;

                            case 13:
                                _context5.prev = 13;
                                _context5.t0 = _context5['catch'](0);

                                console.log(_context5.t0);

                            case 16:
                            case 'end':
                                return _context5.stop();
                        }
                    }
                }, _callee5, this, [[0, 13]]);
            }));

            function loadList() {
                return _ref6.apply(this, arguments);
            }

            return loadList;
        }()
    }, {
        key: 'loadNoticeList',
        value: function () {
            var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
                var _ref9, data, msglist, arr;

                return regeneratorRuntime.wrap(function _callee6$(_context6) {
                    while (1) {
                        switch (_context6.prev = _context6.next) {
                            case 0:
                                _context6.prev = 0;
                                _context6.next = 3;
                                return (0, _ajax.get)('/mplogic/getgroupmsglist', this.sendParams);

                            case 3:
                                _ref9 = _context6.sent;
                                data = _ref9.data;
                                msglist = data.msglist;

                                if (!(msglist.length === 0)) {
                                    _context6.next = 10;
                                    break;
                                }

                                this.accountList = this.accountList;
                                (0, _index.toast)('没有更多消息啦');
                                return _context6.abrupt('return');

                            case 10:
                                arr = [];

                                msglist.forEach(function (item) {
                                    var content = item.content;

                                    var ele = Object.assign({}, item, { content: JSON.parse(content) });
                                    if (ele.mpLogo && ele.mpLogo.indexOf('http') === -1) {
                                        ele.mpLogo = 'https://pic1.58cdn.com.cn' + ele.mpLogo;
                                    }
                                    arr.push(ele);
                                });
                                this.noticeList = this.noticeList.concat(arr);
                                this.$apply();
                                _context6.next = 19;
                                break;

                            case 16:
                                _context6.prev = 16;
                                _context6.t0 = _context6['catch'](0);

                                console.log(_context6.t0);

                            case 19:
                            case 'end':
                                return _context6.stop();
                        }
                    }
                }, _callee6, this, [[0, 16]]);
            }));

            function loadNoticeList() {
                return _ref8.apply(this, arguments);
            }

            return loadNoticeList;
        }()
    }, {
        key: 'touploadInfo',
        value: function touploadInfo(e) {
            var item = e.currentTarget.dataset.item;
            // 微信小程序，审核失败，进 上传素材页面

            if (item.msgType !== 5 && item.app_type !== 1) return;
            _wepy2.default.navigateTo({
                url: '../uploadInfo'
            });
        }
    }, {
        key: 'clearAll',
        value: function () {
            var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
                return regeneratorRuntime.wrap(function _callee7$(_context7) {
                    while (1) {
                        switch (_context7.prev = _context7.next) {
                            case 0:
                                _context7.prev = 0;

                                if (!(this.noticeList.length <= 0)) {
                                    _context7.next = 4;
                                    break;
                                }

                                (0, _index.toast)('没有消息，无需清空~');
                                return _context7.abrupt('return');

                            case 4:
                                _context7.next = 6;
                                return (0, _ajax.get)('/mplogic/cleargroupmsg', { group: 1 });

                            case 6:
                                (0, _index.sleep)();
                                this.loadList();
                                _context7.next = 13;
                                break;

                            case 10:
                                _context7.prev = 10;
                                _context7.t0 = _context7['catch'](0);

                                console.log(_context7.t0);

                            case 13:
                            case 'end':
                                return _context7.stop();
                        }
                    }
                }, _callee7, this, [[0, 10]]);
            }));

            function clearAll() {
                return _ref10.apply(this, arguments);
            }

            return clearAll;
        }()
    }]);

    return NoticeList;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(NoticeList , 'pages/noticeList'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vdGljZUxpc3QuanMiXSwibmFtZXMiOlsiTm90aWNlTGlzdCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwibm90aWNlTGlzdCIsIm9yZGVyVW5SZWFkIiwicmVjaXZNb25leVVuUmVhZCIsInVucmVhZGNvdW50Iiwic2VuZFBhcmFtcyIsImdyb3VwIiwicGFnZSIsInBhZ2VTaXplIiwibWV0aG9kcyIsIm5vdGljZUxpc3RNb3JlIiwiT2JqZWN0IiwiYXNzaWduIiwibG9hZE5vdGljZUxpc3QiLCJjb25zb2xlIiwibG9nIiwibG9hZExpc3QiLCJtc2dsaXN0IiwibGVuZ3RoIiwiYXJyIiwiZm9yRWFjaCIsIml0ZW0iLCJlbGUiLCJtcExvZ28iLCJpbmRleE9mIiwicHVzaCIsIiRhcHBseSIsImFjY291bnRMaXN0IiwiY29udGVudCIsIkpTT04iLCJwYXJzZSIsImNvbmNhdCIsImUiLCJjdXJyZW50VGFyZ2V0IiwiZGF0YXNldCIsIm1zZ1R5cGUiLCJhcHBfdHlwZSIsIndlcHkiLCJuYXZpZ2F0ZVRvIiwidXJsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUNBOzs7O0FBRUE7O0FBRUE7Ozs7Ozs7Ozs7OztJQUVxQkEsVTs7Ozs7Ozs7Ozs7Ozs7a01BQ2pCQyxNLEdBQVM7QUFDTEMsb0NBQXdCO0FBQ3hCO0FBRkssUyxRQUlUQyxJLEdBQU87QUFDSEMsd0JBQVksRUFEVDtBQUVIQyx5QkFBYSxDQUZWO0FBR0hDLDhCQUFrQixDQUhmO0FBSUhDLHlCQUFhLENBSlY7QUFLSEMsd0JBQVk7QUFDUkMsdUJBQU8sQ0FEQztBQUVSQyxzQkFBTSxDQUZFO0FBR1JDLDBCQUFVO0FBSEY7QUFMVCxTLFFBV1BDLE8sR0FBVTtBQUNOQywwQkFETSw0QkFDVztBQUNiLHFCQUFLTCxVQUFMLENBQWdCRSxJQUFoQixHQUF1QixLQUFLRixVQUFMLENBQWdCRSxJQUFoQixHQUF1QixDQUE5QztBQUNBLHFCQUFLRixVQUFMLEdBQWtCTSxPQUFPQyxNQUFQLENBQWMsRUFBZCxFQUFrQixLQUFLUCxVQUF2QixFQUFtQyxLQUFLQSxVQUFMLENBQWdCRSxJQUFuRCxDQUFsQjtBQUNBLHFCQUFLTSxjQUFMO0FBQ0g7QUFMSyxTOzs7Ozs7Ozs7Ozs7dUNBUUEsbUI7OztBQUNOQyx3Q0FBUUMsR0FBUixDQUFZLFFBQVo7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUdBLHFDQUFLQyxRQUFMOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHQUYsd0NBQVFDLEdBQVIsQ0FBWSxRQUFaOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHQUQsd0NBQVFDLEdBQVIsQ0FBWSxVQUFaOztzQ0FDSSxLQUFLWCxXQUFMLElBQW9CLEM7Ozs7Ozs7Ozs7dUNBSWQsZUFBSSx1QkFBSixFQUE2QixFQUFFRSxPQUFPLENBQVQsRUFBN0IsQzs7Ozs7Ozs7OztBQUVOUSx3Q0FBUUMsR0FBUjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozt1Q0FLdUIsZUFBSSxrQkFBSixDOzs7O0FBQWZmLG9DLFNBQUFBLEk7QUFFSmlCLHVDLEdBQ0FqQixJLENBREFpQixPLEVBQVNiLFcsR0FDVEosSSxDQURTSSxXLEVBQWFGLFcsR0FDdEJGLEksQ0FEc0JFLFcsRUFBYUMsZ0IsR0FDbkNILEksQ0FEbUNHLGdCOztBQUV2QyxxQ0FBS0MsV0FBTCxHQUFtQkEsV0FBbkI7QUFDQSxxQ0FBS0YsV0FBTCxHQUFtQkEsV0FBbkI7QUFDQSxxQ0FBS0MsZ0JBQUwsR0FBd0JBLGdCQUF4QjtBQUNBLG9DQUFJYyxXQUFXQSxRQUFRQyxNQUFSLEdBQWlCLENBQWhDLEVBQW1DO0FBQ3pCQyx1Q0FEeUIsR0FDbkIsRUFEbUI7O0FBRS9CRiw0Q0FBUUcsT0FBUixDQUFnQixVQUFDQyxJQUFELEVBQVU7QUFDdEIsNENBQU1DLE1BQU1ELElBQVo7QUFDQSw0Q0FBSUMsSUFBSUMsTUFBSixJQUFjRCxJQUFJQyxNQUFKLENBQVdDLE9BQVgsQ0FBbUIsTUFBbkIsTUFBK0IsQ0FBQyxDQUFsRCxFQUFxRDtBQUNqREYsZ0RBQUlDLE1BQUosaUNBQXlDRCxJQUFJQyxNQUE3QztBQUNIO0FBQ0RKLDRDQUFJTSxJQUFKLENBQVNILEdBQVQ7QUFDSCxxQ0FORDtBQU9BLHlDQUFLckIsVUFBTCxHQUFrQmtCLEdBQWxCO0FBQ0gsaUNBVkQsTUFVTztBQUNILHlDQUFLbEIsVUFBTCxHQUFrQixFQUFsQjtBQUNIO0FBQ0QscUNBQUt5QixNQUFMOzs7Ozs7OztBQUVBWix3Q0FBUUMsR0FBUjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozt1Q0FLdUIsZUFBSSwwQkFBSixFQUFnQyxLQUFLVixVQUFyQyxDOzs7O0FBQWZMLG9DLFNBQUFBLEk7QUFDQWlCLHVDLEdBQVlqQixJLENBQVppQixPOztzQ0FDSkEsUUFBUUMsTUFBUixLQUFtQixDOzs7OztBQUNuQixxQ0FBS1MsV0FBTCxHQUFtQixLQUFLQSxXQUF4QjtBQUNBLGtEQUFNLFNBQU47Ozs7QUFHRVIsbUMsR0FBTSxFOztBQUNaRix3Q0FBUUcsT0FBUixDQUFnQixVQUFDQyxJQUFELEVBQVU7QUFBQSx3Q0FDZE8sT0FEYyxHQUNGUCxJQURFLENBQ2RPLE9BRGM7O0FBRXRCLHdDQUFNTixNQUFNWCxPQUFPQyxNQUFQLENBQ1IsRUFEUSxFQUVSUyxJQUZRLEVBRUYsRUFBRU8sU0FBU0MsS0FBS0MsS0FBTCxDQUFXRixPQUFYLENBQVgsRUFGRSxDQUFaO0FBSUEsd0NBQUlOLElBQUlDLE1BQUosSUFBY0QsSUFBSUMsTUFBSixDQUFXQyxPQUFYLENBQW1CLE1BQW5CLE1BQStCLENBQUMsQ0FBbEQsRUFBcUQ7QUFDakRGLDRDQUFJQyxNQUFKLGlDQUF5Q0QsSUFBSUMsTUFBN0M7QUFDSDtBQUNESix3Q0FBSU0sSUFBSixDQUFTSCxHQUFUO0FBQ0gsaUNBVkQ7QUFXQSxxQ0FBS3JCLFVBQUwsR0FBa0IsS0FBS0EsVUFBTCxDQUFnQjhCLE1BQWhCLENBQXVCWixHQUF2QixDQUFsQjtBQUNBLHFDQUFLTyxNQUFMOzs7Ozs7OztBQUVBWix3Q0FBUUMsR0FBUjs7Ozs7Ozs7Ozs7Ozs7Ozs7O3FDQUdLaUIsQyxFQUFHO0FBQUEsZ0JBQ0pYLElBREksR0FDS1csRUFBRUMsYUFBRixDQUFnQkMsT0FEckIsQ0FDSmIsSUFESTtBQUVaOztBQUNBLGdCQUFJQSxLQUFLYyxPQUFMLEtBQWlCLENBQWpCLElBQXNCZCxLQUFLZSxRQUFMLEtBQWtCLENBQTVDLEVBQStDO0FBQy9DQywyQkFBS0MsVUFBTCxDQUFnQjtBQUNaQyxxQkFBSztBQURPLGFBQWhCO0FBR0g7Ozs7Ozs7Ozs7O3NDQUdXLEtBQUt0QyxVQUFMLENBQWdCaUIsTUFBaEIsSUFBMEIsQzs7Ozs7QUFDMUIsa0RBQU0sWUFBTjs7Ozs7dUNBR0UsZUFBSSx3QkFBSixFQUE4QixFQUFFWixPQUFPLENBQVQsRUFBOUIsQzs7O0FBQ047QUFDQSxxQ0FBS1UsUUFBTDs7Ozs7Ozs7QUFFQUYsd0NBQVFDLEdBQVI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFwSDRCc0IsZUFBSzlCLEk7O2tCQUF4QlYsVSIsImZpbGUiOiJub3RpY2VMaXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcblxuaW1wb3J0IHsgc2xlZXAsIHRvYXN0IH0gZnJvbSAnLi4vdXRpbHMvaW5kZXgnO1xuXG5pbXBvcnQgeyBnZXQgfSBmcm9tICcuLi91dGlscy9hamF4JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTm90aWNlTGlzdCBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn6YCa55+lJyxcbiAgICAgICAgLy8gZGlzYWJsZVNjcm9sbDogdHJ1ZSxcbiAgICB9XG4gICAgZGF0YSA9IHtcbiAgICAgICAgbm90aWNlTGlzdDogW10sXG4gICAgICAgIG9yZGVyVW5SZWFkOiAwLFxuICAgICAgICByZWNpdk1vbmV5VW5SZWFkOiAwLFxuICAgICAgICB1bnJlYWRjb3VudDogMCxcbiAgICAgICAgc2VuZFBhcmFtczoge1xuICAgICAgICAgICAgZ3JvdXA6IDEsXG4gICAgICAgICAgICBwYWdlOiAxLFxuICAgICAgICAgICAgcGFnZVNpemU6IDEwLFxuICAgICAgICB9LFxuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgICAgICBub3RpY2VMaXN0TW9yZSgpIHtcbiAgICAgICAgICAgIHRoaXMuc2VuZFBhcmFtcy5wYWdlID0gdGhpcy5zZW5kUGFyYW1zLnBhZ2UgKyAxO1xuICAgICAgICAgICAgdGhpcy5zZW5kUGFyYW1zID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5zZW5kUGFyYW1zLCB0aGlzLnNlbmRQYXJhbXMucGFnZSk7XG4gICAgICAgICAgICB0aGlzLmxvYWROb3RpY2VMaXN0KCk7XG4gICAgICAgIH0sXG4gICAgfVxuICAgIGFzeW5jIG9uTG9hZCgpIHtcbiAgICAgICAgYXdhaXQgc2xlZXAoKTtcbiAgICAgICAgY29uc29sZS5sb2coJ29uTG9hZCcpO1xuICAgIH1cbiAgICBhc3luYyBvblNob3coKSB7XG4gICAgICAgIHRoaXMubG9hZExpc3QoKTtcbiAgICB9XG4gICAgYXN5bmMgb25IaWRlKCkge1xuICAgICAgICBjb25zb2xlLmxvZygnb25IaWRlJyk7XG4gICAgfVxuICAgIGFzeW5jIG9uVW5sb2FkKCkge1xuICAgICAgICBjb25zb2xlLmxvZygnb25VbkxvYWQnKTtcbiAgICAgICAgaWYgKHRoaXMudW5yZWFkY291bnQgPD0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBhd2FpdCBnZXQoJy9tcGxvZ2ljL3JlYWRncm91cG1zZycsIHsgZ3JvdXA6IDEgfSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGFzeW5jIGxvYWRMaXN0KCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgeyBkYXRhIH0gPSBhd2FpdCBnZXQoJy9tcGxvZ2ljL21zZ2xpc3QnKTtcbiAgICAgICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgICAgICBtc2dsaXN0LCB1bnJlYWRjb3VudCwgb3JkZXJVblJlYWQsIHJlY2l2TW9uZXlVblJlYWQsXG4gICAgICAgICAgICB9ID0gZGF0YTtcbiAgICAgICAgICAgIHRoaXMudW5yZWFkY291bnQgPSB1bnJlYWRjb3VudDtcbiAgICAgICAgICAgIHRoaXMub3JkZXJVblJlYWQgPSBvcmRlclVuUmVhZDtcbiAgICAgICAgICAgIHRoaXMucmVjaXZNb25leVVuUmVhZCA9IHJlY2l2TW9uZXlVblJlYWQ7XG4gICAgICAgICAgICBpZiAobXNnbGlzdCAmJiBtc2dsaXN0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBjb25zdCBhcnIgPSBbXTtcbiAgICAgICAgICAgICAgICBtc2dsaXN0LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZWxlID0gaXRlbTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVsZS5tcExvZ28gJiYgZWxlLm1wTG9nby5pbmRleE9mKCdodHRwJykgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbGUubXBMb2dvID0gYGh0dHBzOi8vcGljMS41OGNkbi5jb20uY24ke2VsZS5tcExvZ299YDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBhcnIucHVzaChlbGUpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMubm90aWNlTGlzdCA9IGFycjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ub3RpY2VMaXN0ID0gW107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBhc3luYyBsb2FkTm90aWNlTGlzdCgpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHsgZGF0YSB9ID0gYXdhaXQgZ2V0KCcvbXBsb2dpYy9nZXRncm91cG1zZ2xpc3QnLCB0aGlzLnNlbmRQYXJhbXMpO1xuICAgICAgICAgICAgY29uc3QgeyBtc2dsaXN0IH0gPSBkYXRhO1xuICAgICAgICAgICAgaWYgKG1zZ2xpc3QubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hY2NvdW50TGlzdCA9IHRoaXMuYWNjb3VudExpc3Q7XG4gICAgICAgICAgICAgICAgdG9hc3QoJ+ayoeacieabtOWkmua2iOaBr+WVpicpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGFyciA9IFtdO1xuICAgICAgICAgICAgbXNnbGlzdC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBjb250ZW50IH0gPSBpdGVtO1xuICAgICAgICAgICAgICAgIGNvbnN0IGVsZSA9IE9iamVjdC5hc3NpZ24oXG4gICAgICAgICAgICAgICAgICAgIHt9LFxuICAgICAgICAgICAgICAgICAgICBpdGVtLCB7IGNvbnRlbnQ6IEpTT04ucGFyc2UoY29udGVudCkgfSxcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGlmIChlbGUubXBMb2dvICYmIGVsZS5tcExvZ28uaW5kZXhPZignaHR0cCcpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICBlbGUubXBMb2dvID0gYGh0dHBzOi8vcGljMS41OGNkbi5jb20uY24ke2VsZS5tcExvZ299YDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYXJyLnB1c2goZWxlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5ub3RpY2VMaXN0ID0gdGhpcy5ub3RpY2VMaXN0LmNvbmNhdChhcnIpO1xuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdG91cGxvYWRJbmZvKGUpIHtcbiAgICAgICAgY29uc3QgeyBpdGVtIH0gPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldDtcbiAgICAgICAgLy8g5b6u5L+h5bCP56iL5bqP77yM5a6h5qC45aSx6LSl77yM6L+bIOS4iuS8oOe0oOadkOmhtemdolxuICAgICAgICBpZiAoaXRlbS5tc2dUeXBlICE9PSA1ICYmIGl0ZW0uYXBwX3R5cGUgIT09IDEpIHJldHVybjtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgIHVybDogJy4uL3VwbG9hZEluZm8nLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgYXN5bmMgY2xlYXJBbGwoKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAodGhpcy5ub3RpY2VMaXN0Lmxlbmd0aCA8PSAwKSB7XG4gICAgICAgICAgICAgICAgdG9hc3QoJ+ayoeaciea2iOaBr++8jOaXoOmcgOa4heepun4nKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhd2FpdCBnZXQoJy9tcGxvZ2ljL2NsZWFyZ3JvdXBtc2cnLCB7IGdyb3VwOiAxIH0pO1xuICAgICAgICAgICAgc2xlZXAoKTtcbiAgICAgICAgICAgIHRoaXMubG9hZExpc3QoKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=