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
