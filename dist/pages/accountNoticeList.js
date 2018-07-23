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

var AccountNoticeList = function (_wepy$page) {
    _inherits(AccountNoticeList, _wepy$page);

    function AccountNoticeList() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, AccountNoticeList);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = AccountNoticeList.__proto__ || Object.getPrototypeOf(AccountNoticeList)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            navigationBarTitleText: '入账提醒'
        }, _this.data = {
            accountList: [],
            sendParams: {
                group: 3,
                page: 1,
                pageSize: 10
            }
        }, _this.methods = {
            accountListMore: function accountListMore() {
                this.sendParams.page = this.sendParams.page + 1;
                this.sendParams = Object.assign({}, this.sendParams, this.sendParams.page);
                this.loadList();
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(AccountNoticeList, [{
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
                                console.log('dededed');
                                this.loadList();

                            case 2:
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
                                return (0, _ajax.get)('/mplogic/readgroupmsg', { group: 3 });

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

                                if (!(msglist.length === 0)) {
                                    _context5.next = 10;
                                    break;
                                }

                                this.accountList = this.accountList;
                                (0, _index.toast)('没有更多消息啦');
                                return _context5.abrupt('return');

                            case 10:
                                arr = [];

                                msglist.forEach(function (item) {
                                    var content = item.content;

                                    var ele = Object.assign({}, item, { content: JSON.parse(content) });
                                    // const ele = item;
                                    if (ele.mpLogo && ele.mpLogo.indexOf('http') === -1) {
                                        ele.mpLogo = 'https://pic1.58cdn.com.cn' + ele.mpLogo;
                                    }
                                    arr.push(ele);
                                });
                                this.accountList = this.accountList.concat(arr);
                                console.log(this.accountList);
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

    return AccountNoticeList;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(AccountNoticeList , 'pages/accountNoticeList'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjY291bnROb3RpY2VMaXN0LmpzIl0sIm5hbWVzIjpbIkFjY291bnROb3RpY2VMaXN0IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJhY2NvdW50TGlzdCIsInNlbmRQYXJhbXMiLCJncm91cCIsInBhZ2UiLCJwYWdlU2l6ZSIsIm1ldGhvZHMiLCJhY2NvdW50TGlzdE1vcmUiLCJPYmplY3QiLCJhc3NpZ24iLCJsb2FkTGlzdCIsImNvbnNvbGUiLCJsb2ciLCJtc2dsaXN0IiwibGVuZ3RoIiwiYXJyIiwiZm9yRWFjaCIsIml0ZW0iLCJjb250ZW50IiwiZWxlIiwiSlNPTiIsInBhcnNlIiwibXBMb2dvIiwiaW5kZXhPZiIsInB1c2giLCJjb25jYXQiLCIkYXBwbHkiLCJ3ZXB5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUNBOzs7O0FBRUE7O0FBRUE7Ozs7Ozs7Ozs7OztJQUVxQkEsaUI7Ozs7Ozs7Ozs7Ozs7O2dOQUNqQkMsTSxHQUFTO0FBQ0xDLG9DQUF3QjtBQURuQixTLFFBR1RDLEksR0FBTztBQUNIQyx5QkFBYSxFQURWO0FBRUhDLHdCQUFZO0FBQ1JDLHVCQUFPLENBREM7QUFFUkMsc0JBQU0sQ0FGRTtBQUdSQywwQkFBVTtBQUhGO0FBRlQsUyxRQVFQQyxPLEdBQVU7QUFDTkMsMkJBRE0sNkJBQ1k7QUFDZCxxQkFBS0wsVUFBTCxDQUFnQkUsSUFBaEIsR0FBdUIsS0FBS0YsVUFBTCxDQUFnQkUsSUFBaEIsR0FBdUIsQ0FBOUM7QUFDQSxxQkFBS0YsVUFBTCxHQUFrQk0sT0FBT0MsTUFBUCxDQUFjLEVBQWQsRUFBa0IsS0FBS1AsVUFBdkIsRUFBbUMsS0FBS0EsVUFBTCxDQUFnQkUsSUFBbkQsQ0FBbEI7QUFDQSxxQkFBS00sUUFBTDtBQUNIO0FBTEssUzs7Ozs7Ozs7Ozs7O3VDQVFBLG1COzs7QUFDTkMsd0NBQVFDLEdBQVIsQ0FBWSxRQUFaOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHQUQsd0NBQVFDLEdBQVIsQ0FBWSxTQUFaO0FBQ0EscUNBQUtGLFFBQUw7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUdBQyx3Q0FBUUMsR0FBUixDQUFZLFFBQVo7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUdBRCx3Q0FBUUMsR0FBUixDQUFZLFVBQVo7QUFDQTtBQUNBO0FBQ0E7Ozt1Q0FFVSxlQUFJLHVCQUFKLEVBQTZCLEVBQUVULE9BQU8sQ0FBVCxFQUE3QixDOzs7Ozs7Ozs7O0FBRU5RLHdDQUFRQyxHQUFSOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3VDQUt1QixlQUFJLDBCQUFKLEVBQWdDLEtBQUtWLFVBQXJDLEM7Ozs7QUFBZkYsb0MsU0FBQUEsSTtBQUNBYSx1QyxHQUFZYixJLENBQVphLE87O3NDQUNKQSxRQUFRQyxNQUFSLEtBQW1CLEM7Ozs7O0FBQ25CLHFDQUFLYixXQUFMLEdBQW1CLEtBQUtBLFdBQXhCO0FBQ0Esa0RBQU0sU0FBTjs7OztBQUdFYyxtQyxHQUFNLEU7O0FBQ1pGLHdDQUFRRyxPQUFSLENBQWdCLFVBQUNDLElBQUQsRUFBVTtBQUFBLHdDQUNkQyxPQURjLEdBQ0ZELElBREUsQ0FDZEMsT0FEYzs7QUFFdEIsd0NBQU1DLE1BQU1YLE9BQU9DLE1BQVAsQ0FDUixFQURRLEVBRVJRLElBRlEsRUFFRixFQUFFQyxTQUFTRSxLQUFLQyxLQUFMLENBQVdILE9BQVgsQ0FBWCxFQUZFLENBQVo7QUFJQTtBQUNBLHdDQUFJQyxJQUFJRyxNQUFKLElBQWNILElBQUlHLE1BQUosQ0FBV0MsT0FBWCxDQUFtQixNQUFuQixNQUErQixDQUFDLENBQWxELEVBQXFEO0FBQ2pESiw0Q0FBSUcsTUFBSixpQ0FBeUNILElBQUlHLE1BQTdDO0FBQ0g7QUFDRFAsd0NBQUlTLElBQUosQ0FBU0wsR0FBVDtBQUNILGlDQVhEO0FBWUEscUNBQUtsQixXQUFMLEdBQW1CLEtBQUtBLFdBQUwsQ0FBaUJ3QixNQUFqQixDQUF3QlYsR0FBeEIsQ0FBbkI7QUFDQUosd0NBQVFDLEdBQVIsQ0FBWSxLQUFLWCxXQUFqQjtBQUNBLHFDQUFLeUIsTUFBTDs7Ozs7Ozs7QUFFQWYsd0NBQVFDLEdBQVI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFuRW1DZSxlQUFLdkIsSTs7a0JBQS9CUCxpQiIsImZpbGUiOiJhY2NvdW50Tm90aWNlTGlzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcclxuXHJcbmltcG9ydCB7IHNsZWVwLCB0b2FzdCB9IGZyb20gJy4uL3V0aWxzL2luZGV4JztcclxuXHJcbmltcG9ydCB7IGdldCB9IGZyb20gJy4uL3V0aWxzL2FqYXgnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWNjb3VudE5vdGljZUxpc3QgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gICAgY29uZmlnID0ge1xyXG4gICAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICflhaXotKbmj5DphpInLFxyXG4gICAgfVxyXG4gICAgZGF0YSA9IHtcclxuICAgICAgICBhY2NvdW50TGlzdDogW10sXHJcbiAgICAgICAgc2VuZFBhcmFtczoge1xyXG4gICAgICAgICAgICBncm91cDogMyxcclxuICAgICAgICAgICAgcGFnZTogMSxcclxuICAgICAgICAgICAgcGFnZVNpemU6IDEwLFxyXG4gICAgICAgIH0sXHJcbiAgICB9XHJcbiAgICBtZXRob2RzID0ge1xyXG4gICAgICAgIGFjY291bnRMaXN0TW9yZSgpIHtcclxuICAgICAgICAgICAgdGhpcy5zZW5kUGFyYW1zLnBhZ2UgPSB0aGlzLnNlbmRQYXJhbXMucGFnZSArIDE7XHJcbiAgICAgICAgICAgIHRoaXMuc2VuZFBhcmFtcyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuc2VuZFBhcmFtcywgdGhpcy5zZW5kUGFyYW1zLnBhZ2UpO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRMaXN0KCk7XHJcbiAgICAgICAgfSxcclxuICAgIH1cclxuICAgIGFzeW5jIG9uTG9hZCgpIHtcclxuICAgICAgICBhd2FpdCBzbGVlcCgpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdvbkxvYWQnKTtcclxuICAgIH1cclxuICAgIGFzeW5jIG9uU2hvdygpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnZGVkZWRlZCcpO1xyXG4gICAgICAgIHRoaXMubG9hZExpc3QoKTtcclxuICAgIH1cclxuICAgIGFzeW5jIG9uSGlkZSgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnb25IaWRlJyk7XHJcbiAgICB9XHJcbiAgICBhc3luYyBvblVubG9hZCgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnb25VbkxvYWQnKTtcclxuICAgICAgICAvLyBpZiAodGhpcy51bnJlYWRjb3VudCA8PSAwKSB7XHJcbiAgICAgICAgLy8gICAgIHJldHVybjtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgYXdhaXQgZ2V0KCcvbXBsb2dpYy9yZWFkZ3JvdXBtc2cnLCB7IGdyb3VwOiAzIH0pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgYXN5bmMgbG9hZExpc3QoKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3QgeyBkYXRhIH0gPSBhd2FpdCBnZXQoJy9tcGxvZ2ljL2dldGdyb3VwbXNnbGlzdCcsIHRoaXMuc2VuZFBhcmFtcyk7XHJcbiAgICAgICAgICAgIGNvbnN0IHsgbXNnbGlzdCB9ID0gZGF0YTtcclxuICAgICAgICAgICAgaWYgKG1zZ2xpc3QubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFjY291bnRMaXN0ID0gdGhpcy5hY2NvdW50TGlzdDtcclxuICAgICAgICAgICAgICAgIHRvYXN0KCfmsqHmnInmm7TlpJrmtojmga/llaYnKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdCBhcnIgPSBbXTtcclxuICAgICAgICAgICAgbXNnbGlzdC5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB7IGNvbnRlbnQgfSA9IGl0ZW07XHJcbiAgICAgICAgICAgICAgICBjb25zdCBlbGUgPSBPYmplY3QuYXNzaWduKFxyXG4gICAgICAgICAgICAgICAgICAgIHt9LFxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0sIHsgY29udGVudDogSlNPTi5wYXJzZShjb250ZW50KSB9LFxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnN0IGVsZSA9IGl0ZW07XHJcbiAgICAgICAgICAgICAgICBpZiAoZWxlLm1wTG9nbyAmJiBlbGUubXBMb2dvLmluZGV4T2YoJ2h0dHAnKSA9PT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICBlbGUubXBMb2dvID0gYGh0dHBzOi8vcGljMS41OGNkbi5jb20uY24ke2VsZS5tcExvZ299YDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGFyci5wdXNoKGVsZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLmFjY291bnRMaXN0ID0gdGhpcy5hY2NvdW50TGlzdC5jb25jYXQoYXJyKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5hY2NvdW50TGlzdCk7XHJcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19