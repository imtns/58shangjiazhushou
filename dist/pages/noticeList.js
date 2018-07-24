'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _Cropper = require('./../components/Cropper.js');

var _Cropper2 = _interopRequireDefault(_Cropper);

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

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = NoticeList.__proto__ || Object.getPrototypeOf(NoticeList)).call.apply(_ref, [this].concat(args))), _this), _this.components = {
            cropper: _Cropper2.default
        }, _this.config = {
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
        key: 'onShow',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                this.loadList();

                            case 1:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function onShow() {
                return _ref2.apply(this, arguments);
            }

            return onShow;
        }()
    }, {
        key: 'onHide',
        value: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                console.log('onHide');

                            case 1:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function onHide() {
                return _ref3.apply(this, arguments);
            }

            return onHide;
        }()
    }, {
        key: 'onUnload',
        value: function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                console.log('onUnLoad');

                                if (!(this.unreadcount <= 0)) {
                                    _context3.next = 3;
                                    break;
                                }

                                return _context3.abrupt('return');

                            case 3:
                                _context3.prev = 3;
                                _context3.next = 6;
                                return (0, _ajax.get)('/mplogic/readgroupmsg', { group: 1 });

                            case 6:
                                _context3.next = 11;
                                break;

                            case 8:
                                _context3.prev = 8;
                                _context3.t0 = _context3['catch'](3);

                                console.log(_context3.t0);

                            case 11:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this, [[3, 8]]);
            }));

            function onUnload() {
                return _ref4.apply(this, arguments);
            }

            return onUnload;
        }()
    }, {
        key: 'loadList',
        value: function () {
            var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
                var _ref6, data, msglist, unreadcount, orderUnRead, recivMoneyUnRead, arr;

                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                _context4.prev = 0;
                                _context4.next = 3;
                                return (0, _ajax.get)('/mplogic/msglist');

                            case 3:
                                _ref6 = _context4.sent;
                                data = _ref6.data;
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
                                _context4.next = 16;
                                break;

                            case 13:
                                _context4.prev = 13;
                                _context4.t0 = _context4['catch'](0);

                                console.log(_context4.t0);

                            case 16:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this, [[0, 13]]);
            }));

            function loadList() {
                return _ref5.apply(this, arguments);
            }

            return loadList;
        }()
    }, {
        key: 'loadNoticeList',
        value: function () {
            var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
                var _ref8, data, msglist, arr;

                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                _context5.prev = 0;
                                _context5.next = 3;
                                return (0, _ajax.get)('/mplogic/getgroupmsglist', this.sendParams);

                            case 3:
                                _ref8 = _context5.sent;
                                data = _ref8.data;
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
                                    if (ele.mpLogo && ele.mpLogo.indexOf('http') === -1) {
                                        ele.mpLogo = 'https://pic1.58cdn.com.cn' + ele.mpLogo;
                                    }
                                    arr.push(ele);
                                });
                                this.noticeList = this.noticeList.concat(arr);
                                this.$apply();
                                _context5.next = 19;
                                break;

                            case 16:
                                _context5.prev = 16;
                                _context5.t0 = _context5['catch'](0);

                                console.log(_context5.t0);

                            case 19:
                            case 'end':
                                return _context5.stop();
                        }
                    }
                }, _callee5, this, [[0, 16]]);
            }));

            function loadNoticeList() {
                return _ref7.apply(this, arguments);
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
            var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
                return regeneratorRuntime.wrap(function _callee6$(_context6) {
                    while (1) {
                        switch (_context6.prev = _context6.next) {
                            case 0:
                                _context6.prev = 0;

                                if (!(this.noticeList.length <= 0)) {
                                    _context6.next = 4;
                                    break;
                                }

                                (0, _index.toast)('没有消息，无需清空~');
                                return _context6.abrupt('return');

                            case 4:
                                _context6.next = 6;
                                return (0, _ajax.get)('/mplogic/cleargroupmsg', { group: 1 });

                            case 6:
                                (0, _index.sleep)();
                                this.loadList();
                                _context6.next = 13;
                                break;

                            case 10:
                                _context6.prev = 10;
                                _context6.t0 = _context6['catch'](0);

                                console.log(_context6.t0);

                            case 13:
                            case 'end':
                                return _context6.stop();
                        }
                    }
                }, _callee6, this, [[0, 10]]);
            }));

            function clearAll() {
                return _ref9.apply(this, arguments);
            }

            return clearAll;
        }()
    }]);

    return NoticeList;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(NoticeList , 'pages/noticeList'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vdGljZUxpc3QuanMiXSwibmFtZXMiOlsiTm90aWNlTGlzdCIsImNvbXBvbmVudHMiLCJjcm9wcGVyIiwiQ3JvcHBlciIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwibm90aWNlTGlzdCIsIm9yZGVyVW5SZWFkIiwicmVjaXZNb25leVVuUmVhZCIsInVucmVhZGNvdW50Iiwic2VuZFBhcmFtcyIsImdyb3VwIiwicGFnZSIsInBhZ2VTaXplIiwibWV0aG9kcyIsIm5vdGljZUxpc3RNb3JlIiwiT2JqZWN0IiwiYXNzaWduIiwibG9hZE5vdGljZUxpc3QiLCJsb2FkTGlzdCIsImNvbnNvbGUiLCJsb2ciLCJtc2dsaXN0IiwibGVuZ3RoIiwiYXJyIiwiZm9yRWFjaCIsIml0ZW0iLCJlbGUiLCJtcExvZ28iLCJpbmRleE9mIiwicHVzaCIsIiRhcHBseSIsImFjY291bnRMaXN0IiwiY29udGVudCIsIkpTT04iLCJwYXJzZSIsImNvbmNhdCIsImUiLCJjdXJyZW50VGFyZ2V0IiwiZGF0YXNldCIsIm1zZ1R5cGUiLCJhcHBfdHlwZSIsIndlcHkiLCJuYXZpZ2F0ZVRvIiwidXJsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxVOzs7Ozs7Ozs7Ozs7OztrTUFDakJDLFUsR0FBYTtBQUNUQyxxQkFBU0M7QUFEQSxTLFFBR2JDLE0sR0FBUztBQUNMQyxvQ0FBd0I7QUFDeEI7QUFGSyxTLFFBSVRDLEksR0FBTztBQUNIQyx3QkFBWSxFQURUO0FBRUhDLHlCQUFhLENBRlY7QUFHSEMsOEJBQWtCLENBSGY7QUFJSEMseUJBQWEsQ0FKVjtBQUtIQyx3QkFBWTtBQUNSQyx1QkFBTyxDQURDO0FBRVJDLHNCQUFNLENBRkU7QUFHUkMsMEJBQVU7QUFIRjtBQUxULFMsUUFXUEMsTyxHQUFVO0FBQ05DLDBCQURNLDRCQUNXO0FBQ2IscUJBQUtMLFVBQUwsQ0FBZ0JFLElBQWhC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Ozs7Ozs7Ozs7O3FDQUdLZ0IsQyxFQUFHO0FBQUEsZ0JBQ0pYLElBREksR0FDS1csRUFBRUMsYUFBRixDQUFnQkMsT0FEckIsQ0FDSmIsSUFESTtBQUVaOztBQUNBLGdCQUFJQSxLQUFLYyxPQUFMLEtBQWlCLENBQWpCLElBQXNCZCxLQUFLZSxRQUFMLEtBQWtCLENBQTVDLEVBQStDO0FBQy9DQywyQkFBS0MsVUFBTCxDQUFnQjtBQUNaQyxxQkFBSztBQURPLGFBQWhCO0FBR0g7Ozs7Ozs7Ozs7O3NDQUdXLEtBQUt0QyxVQUFMLENBQWdCaUIsTUFBaEIsSUFBMEIsQzs7Ozs7QUFDMUIsa0RBQU0sWUFBTjs7Ozs7dUNBR0UsZUFBSSx3QkFBSixFQUE4QixFQUFFWixPQUFPLENBQVQsRUFBOUIsQzs7O0FBQ047QUFDQSxxQ0FBS1EsUUFBTDs7Ozs7Ozs7QUFFQUMsd0NBQVFDLEdBQVI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFuSDRCcUIsZUFBSzlCLEk7O2tCQUF4QmIsVSIsImZpbGUiOiJub3RpY2VMaXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbmltcG9ydCBDcm9wcGVyIGZyb20gJy4uL2NvbXBvbmVudHMvQ3JvcHBlcic7XG5pbXBvcnQgeyBzbGVlcCwgdG9hc3QgfSBmcm9tICcuLi91dGlscy9pbmRleCc7XG5cbmltcG9ydCB7IGdldCB9IGZyb20gJy4uL3V0aWxzL2FqYXgnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOb3RpY2VMaXN0IGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb21wb25lbnRzID0ge1xuICAgICAgICBjcm9wcGVyOiBDcm9wcGVyLFxuICAgIH1cbiAgICBjb25maWcgPSB7XG4gICAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfpgJrnn6UnLFxuICAgICAgICAvLyBkaXNhYmxlU2Nyb2xsOiB0cnVlLFxuICAgIH1cbiAgICBkYXRhID0ge1xuICAgICAgICBub3RpY2VMaXN0OiBbXSxcbiAgICAgICAgb3JkZXJVblJlYWQ6IDAsXG4gICAgICAgIHJlY2l2TW9uZXlVblJlYWQ6IDAsXG4gICAgICAgIHVucmVhZGNvdW50OiAwLFxuICAgICAgICBzZW5kUGFyYW1zOiB7XG4gICAgICAgICAgICBncm91cDogMSxcbiAgICAgICAgICAgIHBhZ2U6IDEsXG4gICAgICAgICAgICBwYWdlU2l6ZTogMTAsXG4gICAgICAgIH0sXG4gICAgfVxuICAgIG1ldGhvZHMgPSB7XG4gICAgICAgIG5vdGljZUxpc3RNb3JlKCkge1xuICAgICAgICAgICAgdGhpcy5zZW5kUGFyYW1zLnBhZ2UgPSB0aGlzLnNlbmRQYXJhbXMucGFnZSArIDE7XG4gICAgICAgICAgICB0aGlzLnNlbmRQYXJhbXMgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLnNlbmRQYXJhbXMsIHRoaXMuc2VuZFBhcmFtcy5wYWdlKTtcbiAgICAgICAgICAgIHRoaXMubG9hZE5vdGljZUxpc3QoKTtcbiAgICAgICAgfSxcbiAgICB9XG4gICAgYXN5bmMgb25TaG93KCkge1xuICAgICAgICB0aGlzLmxvYWRMaXN0KCk7XG4gICAgfVxuICAgIGFzeW5jIG9uSGlkZSgpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ29uSGlkZScpO1xuICAgIH1cbiAgICBhc3luYyBvblVubG9hZCgpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ29uVW5Mb2FkJyk7XG4gICAgICAgIGlmICh0aGlzLnVucmVhZGNvdW50IDw9IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgYXdhaXQgZ2V0KCcvbXBsb2dpYy9yZWFkZ3JvdXBtc2cnLCB7IGdyb3VwOiAxIH0pO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBhc3luYyBsb2FkTGlzdCgpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHsgZGF0YSB9ID0gYXdhaXQgZ2V0KCcvbXBsb2dpYy9tc2dsaXN0Jyk7XG4gICAgICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICAgICAgbXNnbGlzdCwgdW5yZWFkY291bnQsIG9yZGVyVW5SZWFkLCByZWNpdk1vbmV5VW5SZWFkLFxuICAgICAgICAgICAgfSA9IGRhdGE7XG4gICAgICAgICAgICB0aGlzLnVucmVhZGNvdW50ID0gdW5yZWFkY291bnQ7XG4gICAgICAgICAgICB0aGlzLm9yZGVyVW5SZWFkID0gb3JkZXJVblJlYWQ7XG4gICAgICAgICAgICB0aGlzLnJlY2l2TW9uZXlVblJlYWQgPSByZWNpdk1vbmV5VW5SZWFkO1xuICAgICAgICAgICAgaWYgKG1zZ2xpc3QgJiYgbXNnbGlzdC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgYXJyID0gW107XG4gICAgICAgICAgICAgICAgbXNnbGlzdC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVsZSA9IGl0ZW07XG4gICAgICAgICAgICAgICAgICAgIGlmIChlbGUubXBMb2dvICYmIGVsZS5tcExvZ28uaW5kZXhPZignaHR0cCcpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxlLm1wTG9nbyA9IGBodHRwczovL3BpYzEuNThjZG4uY29tLmNuJHtlbGUubXBMb2dvfWA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYXJyLnB1c2goZWxlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLm5vdGljZUxpc3QgPSBhcnI7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMubm90aWNlTGlzdCA9IFtdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgYXN5bmMgbG9hZE5vdGljZUxpc3QoKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCB7IGRhdGEgfSA9IGF3YWl0IGdldCgnL21wbG9naWMvZ2V0Z3JvdXBtc2dsaXN0JywgdGhpcy5zZW5kUGFyYW1zKTtcbiAgICAgICAgICAgIGNvbnN0IHsgbXNnbGlzdCB9ID0gZGF0YTtcbiAgICAgICAgICAgIGlmIChtc2dsaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuYWNjb3VudExpc3QgPSB0aGlzLmFjY291bnRMaXN0O1xuICAgICAgICAgICAgICAgIHRvYXN0KCfmsqHmnInmm7TlpJrmtojmga/llaYnKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBhcnIgPSBbXTtcbiAgICAgICAgICAgIG1zZ2xpc3QuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgY29udGVudCB9ID0gaXRlbTtcbiAgICAgICAgICAgICAgICBjb25zdCBlbGUgPSBPYmplY3QuYXNzaWduKFxuICAgICAgICAgICAgICAgICAgICB7fSxcbiAgICAgICAgICAgICAgICAgICAgaXRlbSwgeyBjb250ZW50OiBKU09OLnBhcnNlKGNvbnRlbnQpIH0sXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBpZiAoZWxlLm1wTG9nbyAmJiBlbGUubXBMb2dvLmluZGV4T2YoJ2h0dHAnKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgZWxlLm1wTG9nbyA9IGBodHRwczovL3BpYzEuNThjZG4uY29tLmNuJHtlbGUubXBMb2dvfWA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGFyci5wdXNoKGVsZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMubm90aWNlTGlzdCA9IHRoaXMubm90aWNlTGlzdC5jb25jYXQoYXJyKTtcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHRvdXBsb2FkSW5mbyhlKSB7XG4gICAgICAgIGNvbnN0IHsgaXRlbSB9ID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQ7XG4gICAgICAgIC8vIOW+ruS/oeWwj+eoi+W6j++8jOWuoeaguOWksei0pe+8jOi/myDkuIrkvKDntKDmnZDpobXpnaJcbiAgICAgICAgaWYgKGl0ZW0ubXNnVHlwZSAhPT0gNSAmJiBpdGVtLmFwcF90eXBlICE9PSAxKSByZXR1cm47XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICB1cmw6ICcuLi91cGxvYWRJbmZvJyxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGFzeW5jIGNsZWFyQWxsKCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKHRoaXMubm90aWNlTGlzdC5sZW5ndGggPD0gMCkge1xuICAgICAgICAgICAgICAgIHRvYXN0KCfmsqHmnInmtojmga/vvIzml6DpnIDmuIXnqbp+Jyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYXdhaXQgZ2V0KCcvbXBsb2dpYy9jbGVhcmdyb3VwbXNnJywgeyBncm91cDogMSB9KTtcbiAgICAgICAgICAgIHNsZWVwKCk7XG4gICAgICAgICAgICB0aGlzLmxvYWRMaXN0KCk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19