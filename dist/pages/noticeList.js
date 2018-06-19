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
            navigationBarTitleText: '通知',
            disableScroll: true
        }, _this.data = {
            noticeList: [],
            unreadcount: 0
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
                                return (0, _ajax.get)('/mplogic/msgreadall');

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
                var _ref7, data, msglist, unreadcount, arr;

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
                                msglist = data.msglist, unreadcount = data.unreadcount;

                                this.unreadcount = unreadcount;
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
                                _context5.next = 14;
                                break;

                            case 11:
                                _context5.prev = 11;
                                _context5.t0 = _context5['catch'](0);

                                console.log(_context5.t0);

                            case 14:
                            case 'end':
                                return _context5.stop();
                        }
                    }
                }, _callee5, this, [[0, 11]]);
            }));

            function loadList() {
                return _ref6.apply(this, arguments);
            }

            return loadList;
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
            var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
                return regeneratorRuntime.wrap(function _callee6$(_context6) {
                    while (1) {
                        switch (_context6.prev = _context6.next) {
                            case 0:
                                _context6.prev = 0;

                                console.log(this.noticeList.length <= 0);

                                if (!(this.noticeList.length <= 0)) {
                                    _context6.next = 5;
                                    break;
                                }

                                (0, _index.toast)('没有消息，无需清空~');
                                return _context6.abrupt('return');

                            case 5:
                                _context6.next = 7;
                                return (0, _ajax.get)('/mplogic/msgclearall');

                            case 7:
                                (0, _index.sleep)();
                                this.loadList();
                                _context6.next = 14;
                                break;

                            case 11:
                                _context6.prev = 11;
                                _context6.t0 = _context6['catch'](0);

                                console.log(_context6.t0);

                            case 14:
                            case 'end':
                                return _context6.stop();
                        }
                    }
                }, _callee6, this, [[0, 11]]);
            }));

            function clearAll() {
                return _ref8.apply(this, arguments);
            }

            return clearAll;
        }()
    }]);

    return NoticeList;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(NoticeList , 'pages/noticeList'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vdGljZUxpc3QuanMiXSwibmFtZXMiOlsiTm90aWNlTGlzdCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkaXNhYmxlU2Nyb2xsIiwiZGF0YSIsIm5vdGljZUxpc3QiLCJ1bnJlYWRjb3VudCIsImNvbnNvbGUiLCJsb2ciLCJsb2FkTGlzdCIsIm1zZ2xpc3QiLCJsZW5ndGgiLCJhcnIiLCJmb3JFYWNoIiwiaXRlbSIsImVsZSIsIm1wTG9nbyIsImluZGV4T2YiLCJwdXNoIiwiJGFwcGx5IiwiZSIsImN1cnJlbnRUYXJnZXQiLCJkYXRhc2V0IiwibXNnVHlwZSIsImFwcF90eXBlIiwid2VweSIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUNBOzs7O0FBRUE7O0FBRUE7Ozs7Ozs7Ozs7OztJQUVxQkEsVTs7Ozs7Ozs7Ozs7Ozs7a01BQ2pCQyxNLEdBQVM7QUFDTEMsb0NBQXdCLElBRG5CO0FBRUxDLDJCQUFlO0FBRlYsUyxRQUlUQyxJLEdBQU87QUFDSEMsd0JBQVksRUFEVDtBQUVIQyx5QkFBYTtBQUZWLFM7Ozs7Ozs7Ozs7Ozt1Q0FLRyxtQjs7O0FBQ05DLHdDQUFRQyxHQUFSLENBQVksUUFBWjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR0EscUNBQUtDLFFBQUw7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUdBRix3Q0FBUUMsR0FBUixDQUFZLFFBQVo7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUdBRCx3Q0FBUUMsR0FBUixDQUFZLFVBQVo7O3NDQUNJLEtBQUtGLFdBQUwsSUFBb0IsQzs7Ozs7Ozs7Ozt1Q0FJZCxlQUFJLHFCQUFKLEM7Ozs7Ozs7Ozs7QUFFTkMsd0NBQVFDLEdBQVI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7dUNBS3VCLGVBQUksa0JBQUosQzs7OztBQUFmSixvQyxTQUFBQSxJO0FBQ0FNLHVDLEdBQXlCTixJLENBQXpCTSxPLEVBQVNKLFcsR0FBZ0JGLEksQ0FBaEJFLFc7O0FBQ2pCLHFDQUFLQSxXQUFMLEdBQW1CQSxXQUFuQjtBQUNBLG9DQUFJSSxXQUFXQSxRQUFRQyxNQUFSLEdBQWlCLENBQWhDLEVBQW1DO0FBQ3pCQyx1Q0FEeUIsR0FDbkIsRUFEbUI7O0FBRS9CRiw0Q0FBUUcsT0FBUixDQUFnQixVQUFDQyxJQUFELEVBQVU7QUFDdEIsNENBQU1DLE1BQU1ELElBQVo7QUFDQSw0Q0FBSUMsSUFBSUMsTUFBSixJQUFjRCxJQUFJQyxNQUFKLENBQVdDLE9BQVgsQ0FBbUIsTUFBbkIsTUFBK0IsQ0FBQyxDQUFsRCxFQUFxRDtBQUNqREYsZ0RBQUlDLE1BQUosaUNBQXlDRCxJQUFJQyxNQUE3QztBQUNIO0FBQ0RKLDRDQUFJTSxJQUFKLENBQVNILEdBQVQ7QUFDSCxxQ0FORDtBQU9BLHlDQUFLVixVQUFMLEdBQWtCTyxHQUFsQjtBQUNILGlDQVZELE1BVU87QUFDSCx5Q0FBS1AsVUFBTCxHQUFrQixFQUFsQjtBQUNIO0FBQ0QscUNBQUtjLE1BQUw7Ozs7Ozs7O0FBRUFaLHdDQUFRQyxHQUFSOzs7Ozs7Ozs7Ozs7Ozs7Ozs7cUNBR0tZLEMsRUFBRztBQUFBLGdCQUNKTixJQURJLEdBQ0tNLEVBQUVDLGFBQUYsQ0FBZ0JDLE9BRHJCLENBQ0pSLElBREk7QUFFWjs7QUFDQSxnQkFBSUEsS0FBS1MsT0FBTCxLQUFpQixDQUFqQixJQUFzQlQsS0FBS1UsUUFBTCxLQUFrQixDQUE1QyxFQUErQztBQUMvQ0MsMkJBQUtDLFVBQUwsQ0FBZ0I7QUFDWkMscUJBQUs7QUFETyxhQUFoQjtBQUdIOzs7Ozs7Ozs7OztBQUdPcEIsd0NBQVFDLEdBQVIsQ0FBWSxLQUFLSCxVQUFMLENBQWdCTSxNQUFoQixJQUEwQixDQUF0Qzs7c0NBQ0ksS0FBS04sVUFBTCxDQUFnQk0sTUFBaEIsSUFBMEIsQzs7Ozs7QUFDMUIsa0RBQU0sWUFBTjs7Ozs7dUNBR0UsZUFBSSxzQkFBSixDOzs7QUFDTjtBQUNBLHFDQUFLRixRQUFMOzs7Ozs7OztBQUVBRix3Q0FBUUMsR0FBUjs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQXhFNEJpQixlQUFLRyxJOztrQkFBeEI1QixVIiwiZmlsZSI6Im5vdGljZUxpc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XHJcblxyXG5pbXBvcnQgeyBzbGVlcCwgdG9hc3QgfSBmcm9tICcuLi91dGlscy9pbmRleCc7XHJcblxyXG5pbXBvcnQgeyBnZXQgfSBmcm9tICcuLi91dGlscy9hamF4JztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE5vdGljZUxpc3QgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gICAgY29uZmlnID0ge1xyXG4gICAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfpgJrnn6UnLFxyXG4gICAgICAgIGRpc2FibGVTY3JvbGw6IHRydWUsXHJcbiAgICB9XHJcbiAgICBkYXRhID0ge1xyXG4gICAgICAgIG5vdGljZUxpc3Q6IFtdLFxyXG4gICAgICAgIHVucmVhZGNvdW50OiAwLFxyXG4gICAgfVxyXG4gICAgYXN5bmMgb25Mb2FkKCkge1xyXG4gICAgICAgIGF3YWl0IHNsZWVwKCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ29uTG9hZCcpO1xyXG4gICAgfVxyXG4gICAgYXN5bmMgb25TaG93KCkge1xyXG4gICAgICAgIHRoaXMubG9hZExpc3QoKTtcclxuICAgIH1cclxuICAgIGFzeW5jIG9uSGlkZSgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnb25IaWRlJyk7XHJcbiAgICB9XHJcbiAgICBhc3luYyBvblVubG9hZCgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnb25VbkxvYWQnKTtcclxuICAgICAgICBpZiAodGhpcy51bnJlYWRjb3VudCA8PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgYXdhaXQgZ2V0KCcvbXBsb2dpYy9tc2dyZWFkYWxsJyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBhc3luYyBsb2FkTGlzdCgpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCB7IGRhdGEgfSA9IGF3YWl0IGdldCgnL21wbG9naWMvbXNnbGlzdCcpO1xyXG4gICAgICAgICAgICBjb25zdCB7IG1zZ2xpc3QsIHVucmVhZGNvdW50IH0gPSBkYXRhO1xyXG4gICAgICAgICAgICB0aGlzLnVucmVhZGNvdW50ID0gdW5yZWFkY291bnQ7XHJcbiAgICAgICAgICAgIGlmIChtc2dsaXN0ICYmIG1zZ2xpc3QubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYXJyID0gW107XHJcbiAgICAgICAgICAgICAgICBtc2dsaXN0LmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBlbGUgPSBpdGVtO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlbGUubXBMb2dvICYmIGVsZS5tcExvZ28uaW5kZXhPZignaHR0cCcpID09PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGUubXBMb2dvID0gYGh0dHBzOi8vcGljMS41OGNkbi5jb20uY24ke2VsZS5tcExvZ299YDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYXJyLnB1c2goZWxlKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub3RpY2VMaXN0ID0gYXJyO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub3RpY2VMaXN0ID0gW107XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHRvdXBsb2FkSW5mbyhlKSB7XHJcbiAgICAgICAgY29uc3QgeyBpdGVtIH0gPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldDtcclxuICAgICAgICAvLyDlvq7kv6HlsI/nqIvluo/vvIzlrqHmoLjlpLHotKXvvIzov5sg5LiK5Lyg57Sg5p2Q6aG16Z2iXHJcbiAgICAgICAgaWYgKGl0ZW0ubXNnVHlwZSAhPT0gNSAmJiBpdGVtLmFwcF90eXBlICE9PSAxKSByZXR1cm47XHJcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgdXJsOiAnLi4vdXBsb2FkSW5mbycsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBhc3luYyBjbGVhckFsbCgpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm5vdGljZUxpc3QubGVuZ3RoIDw9IDApO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5ub3RpY2VMaXN0Lmxlbmd0aCA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0b2FzdCgn5rKh5pyJ5raI5oGv77yM5peg6ZyA5riF56m6ficpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGF3YWl0IGdldCgnL21wbG9naWMvbXNnY2xlYXJhbGwnKTtcclxuICAgICAgICAgICAgc2xlZXAoKTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkTGlzdCgpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==