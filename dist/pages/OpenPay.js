'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _utils = require('./../utils/index.js');

var _ajaxP = require('./../utils/ajaxP.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var appinfoApi = '/mplogic/get';

var OpenPay = function (_wepy$page) {
    _inherits(OpenPay, _wepy$page);

    function OpenPay() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, OpenPay);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = OpenPay.__proto__ || Object.getPrototypeOf(OpenPay)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            navigationBarTitleText: '开通支付',
            disableScroll: true
        }, _this.data = {
            payAppId: 'wx67b75e86c9daef45', // 开通支付小程序ID
            userid: '', // 开通支付必填
            opened: false, // 是否已经开通支付
            agreeProtocol: true, // 是否同意协议
            showProtocol: false, // 显示协议内容
            loading: true // 加载中隐藏页面内容
        }, _this.methods = {
            bindAgreeProtocol: function bindAgreeProtocol() {
                this.agreeProtocol = !this.agreeProtocol;
            },
            bindShowProtocol: function bindShowProtocol(showProtocol) {
                this.showProtocol = showProtocol;
            },
            stopAuthorizeScroll: function stopAuthorizeScroll() {
                // 阻止滚动事件穿透
                console.log('stopAuthorizeScroll');
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(OpenPay, [{
        key: 'onShow',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var mpid;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return this.saveAgreeProtocol();

                            case 2:
                                mpid = _wepy2.default.getStorageSync('current_mpid');
                                _context.next = 5;
                                return this.getOpenedInfo(mpid);

                            case 5:
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
        key: 'saveAgreeProtocol',
        value: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                var OpenPayStatus, _ref4, _ref5, e;

                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                // 开通支付后回传状态
                                OpenPayStatus = _wepy2.default.getStorageSync('OpenPay');

                                if (!(OpenPayStatus !== '0')) {
                                    _context2.next = 3;
                                    break;
                                }

                                return _context2.abrupt('return');

                            case 3:
                                _wepy2.default.removeStorageSync('OpenPay');
                                _context2.next = 6;
                                return (0, _ajaxP.get)('/mpInfo/agree');

                            case 6:
                                _ref4 = _context2.sent;
                                _ref5 = _slicedToArray(_ref4, 1);
                                e = _ref5[0];

                                e && (0, _utils.toast)(e);

                            case 10:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function saveAgreeProtocol() {
                return _ref3.apply(this, arguments);
            }

            return saveAgreeProtocol;
        }()
    }, {
        key: 'getOpenedInfo',
        value: function () {
            var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(mpid) {
                var _ref7, _ref8, e, res;

                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _context3.next = 2;
                                return (0, _ajaxP.get)(appinfoApi + '/' + mpid);

                            case 2:
                                _ref7 = _context3.sent;
                                _ref8 = _slicedToArray(_ref7, 2);
                                e = _ref8[0];
                                res = _ref8[1];

                                if (!e) {
                                    _context3.next = 9;
                                    break;
                                }

                                (0, _utils.toast)(e);
                                return _context3.abrupt('return');

                            case 9:
                                this.loading = false;
                                this.userid = res.userid;
                                this.opened = res.pay_open === 1;
                                this.$apply();

                            case 13:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function getOpenedInfo(_x) {
                return _ref6.apply(this, arguments);
            }

            return getOpenedInfo;
        }()
    }]);

    return OpenPay;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(OpenPay , 'pages/OpenPay'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIk9wZW5QYXkuanMiXSwibmFtZXMiOlsiYXBwaW5mb0FwaSIsIk9wZW5QYXkiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGlzYWJsZVNjcm9sbCIsImRhdGEiLCJwYXlBcHBJZCIsInVzZXJpZCIsIm9wZW5lZCIsImFncmVlUHJvdG9jb2wiLCJzaG93UHJvdG9jb2wiLCJsb2FkaW5nIiwibWV0aG9kcyIsImJpbmRBZ3JlZVByb3RvY29sIiwiYmluZFNob3dQcm90b2NvbCIsInN0b3BBdXRob3JpemVTY3JvbGwiLCJjb25zb2xlIiwibG9nIiwic2F2ZUFncmVlUHJvdG9jb2wiLCJtcGlkIiwid2VweSIsImdldFN0b3JhZ2VTeW5jIiwiZ2V0T3BlbmVkSW5mbyIsIk9wZW5QYXlTdGF0dXMiLCJyZW1vdmVTdG9yYWdlU3luYyIsImUiLCJyZXMiLCJwYXlfb3BlbiIsIiRhcHBseSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxhQUFhLGNBQW5COztJQUVxQkMsTzs7Ozs7Ozs7Ozs7Ozs7NExBQ2pCQyxNLEdBQVM7QUFDTEMsb0NBQXdCLE1BRG5CO0FBRUxDLDJCQUFlO0FBRlYsUyxRQUlUQyxJLEdBQU87QUFDSEMsc0JBQVUsb0JBRFAsRUFDNkI7QUFDaENDLG9CQUFRLEVBRkwsRUFFUztBQUNaQyxvQkFBUSxLQUhMLEVBR1k7QUFDZkMsMkJBQWUsSUFKWixFQUlrQjtBQUNyQkMsMEJBQWMsS0FMWCxFQUtrQjtBQUNyQkMscUJBQVMsSUFOTixDQU1ZO0FBTlosUyxRQVFQQyxPLEdBQVU7QUFDTkMsNkJBRE0sK0JBQ2U7QUFDakIscUJBQUtKLGFBQUwsR0FBcUIsQ0FBQyxLQUFLQSxhQUEzQjtBQUNILGFBSEs7QUFJTkssNEJBSk0sNEJBSVlKLFlBSlosRUFJMEI7QUFDNUIscUJBQUtBLFlBQUwsR0FBb0JBLFlBQXBCO0FBQ0gsYUFOSztBQU9OSywrQkFQTSxpQ0FPaUI7QUFDbkI7QUFDQUMsd0JBQVFDLEdBQVIsQ0FBWSxxQkFBWjtBQUNIO0FBVkssUzs7Ozs7Ozs7Ozs7Ozt1Q0FhQSxLQUFLQyxpQkFBTCxFOzs7QUFDQUMsb0MsR0FBT0MsZUFBS0MsY0FBTCxDQUFvQixjQUFwQixDOzt1Q0FDUCxLQUFLQyxhQUFMLENBQW1CSCxJQUFuQixDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUdOO0FBQ01JLDZDLEdBQWdCSCxlQUFLQyxjQUFMLENBQW9CLFNBQXBCLEM7O3NDQUNsQkUsa0JBQWtCLEc7Ozs7Ozs7O0FBQ3RCSCwrQ0FBS0ksaUJBQUwsQ0FBdUIsU0FBdkI7O3VDQUNrQixnQkFBSSxlQUFKLEM7Ozs7O0FBQVhDLGlDOztBQUNQQSxxQ0FBSyxrQkFBTUEsQ0FBTixDQUFMOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O2tHQUVpQk4sSTs7Ozs7Ozs7dUNBSU0sZ0JBQU9uQixVQUFQLFNBQXFCbUIsSUFBckIsQzs7Ozs7QUFBaEJNLGlDO0FBQUdDLG1DOztxQ0FDTkQsQzs7Ozs7QUFDQSxrREFBTUEsQ0FBTjs7OztBQUdKLHFDQUFLZCxPQUFMLEdBQWUsS0FBZjtBQUNBLHFDQUFLSixNQUFMLEdBQWNtQixJQUFJbkIsTUFBbEI7QUFDQSxxQ0FBS0MsTUFBTCxHQUFja0IsSUFBSUMsUUFBSixLQUFpQixDQUEvQjtBQUNBLHFDQUFLQyxNQUFMOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBbEQ2QlIsZUFBS1MsSTs7a0JBQXJCNUIsTyIsImZpbGUiOiJPcGVuUGF5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xyXG5pbXBvcnQgeyB0b2FzdCB9IGZyb20gJy4uL3V0aWxzJztcclxuaW1wb3J0IHsgZ2V0IH0gZnJvbSAnLi4vdXRpbHMvYWpheFAnO1xyXG5cclxuY29uc3QgYXBwaW5mb0FwaSA9ICcvbXBsb2dpYy9nZXQnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT3BlblBheSBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgICBjb25maWcgPSB7XHJcbiAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+W8gOmAmuaUr+S7mCcsXHJcbiAgICAgICAgZGlzYWJsZVNjcm9sbDogdHJ1ZSxcclxuICAgIH1cclxuICAgIGRhdGEgPSB7XHJcbiAgICAgICAgcGF5QXBwSWQ6ICd3eDY3Yjc1ZTg2YzlkYWVmNDUnLCAvLyDlvIDpgJrmlK/ku5jlsI/nqIvluo9JRFxyXG4gICAgICAgIHVzZXJpZDogJycsIC8vIOW8gOmAmuaUr+S7mOW/heWhq1xyXG4gICAgICAgIG9wZW5lZDogZmFsc2UsIC8vIOaYr+WQpuW3sue7j+W8gOmAmuaUr+S7mFxyXG4gICAgICAgIGFncmVlUHJvdG9jb2w6IHRydWUsIC8vIOaYr+WQpuWQjOaEj+WNj+iurlxyXG4gICAgICAgIHNob3dQcm90b2NvbDogZmFsc2UsIC8vIOaYvuekuuWNj+iuruWGheWuuVxyXG4gICAgICAgIGxvYWRpbmc6IHRydWUsIC8vIOWKoOi9veS4remakOiXj+mhtemdouWGheWuuVxyXG4gICAgfVxyXG4gICAgbWV0aG9kcyA9IHtcclxuICAgICAgICBiaW5kQWdyZWVQcm90b2NvbCAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWdyZWVQcm90b2NvbCA9ICF0aGlzLmFncmVlUHJvdG9jb2w7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBiaW5kU2hvd1Byb3RvY29sIChzaG93UHJvdG9jb2wpIHtcclxuICAgICAgICAgICAgdGhpcy5zaG93UHJvdG9jb2wgPSBzaG93UHJvdG9jb2w7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdG9wQXV0aG9yaXplU2Nyb2xsICgpIHtcclxuICAgICAgICAgICAgLy8g6Zi75q2i5rua5Yqo5LqL5Lu256m/6YCPXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzdG9wQXV0aG9yaXplU2Nyb2xsJyk7XHJcbiAgICAgICAgfSxcclxuICAgIH1cclxuICAgIGFzeW5jIG9uU2hvdyAoKSB7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5zYXZlQWdyZWVQcm90b2NvbCgpO1xyXG4gICAgICAgIGNvbnN0IG1waWQgPSB3ZXB5LmdldFN0b3JhZ2VTeW5jKCdjdXJyZW50X21waWQnKTtcclxuICAgICAgICBhd2FpdCB0aGlzLmdldE9wZW5lZEluZm8obXBpZCk7XHJcbiAgICB9XHJcbiAgICBhc3luYyBzYXZlQWdyZWVQcm90b2NvbCAoKSB7XHJcbiAgICAgICAgLy8g5byA6YCa5pSv5LuY5ZCO5Zue5Lyg54q25oCBXHJcbiAgICAgICAgY29uc3QgT3BlblBheVN0YXR1cyA9IHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ09wZW5QYXknKTtcclxuICAgICAgICBpZiAoT3BlblBheVN0YXR1cyAhPT0gJzAnKSByZXR1cm47XHJcbiAgICAgICAgd2VweS5yZW1vdmVTdG9yYWdlU3luYygnT3BlblBheScpO1xyXG4gICAgICAgIGNvbnN0IFtlXSA9IGF3YWl0IGdldCgnL21wSW5mby9hZ3JlZScpO1xyXG4gICAgICAgIGUgJiYgdG9hc3QoZSk7XHJcbiAgICB9XHJcbiAgICBhc3luYyBnZXRPcGVuZWRJbmZvIChtcGlkKSB7XHJcbiAgICAgICAgLy8g6I635Y+W55So5oi35piv5ZCm5byA6YCa5pSv5LuYXHJcbiAgICAgICAgLy8gaWbmm7TmlLnmlK/mlLbmrL7lvq7kv6FcclxuICAgICAgICAvLyBlbHNl5byA6YCa5pSv5LuYXHJcbiAgICAgICAgY29uc3QgW2UsIHJlc10gPSBhd2FpdCBnZXQoYCR7YXBwaW5mb0FwaX0vJHttcGlkfWApO1xyXG4gICAgICAgIGlmIChlKSB7XHJcbiAgICAgICAgICAgIHRvYXN0KGUpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMudXNlcmlkID0gcmVzLnVzZXJpZDtcclxuICAgICAgICB0aGlzLm9wZW5lZCA9IHJlcy5wYXlfb3BlbiA9PT0gMTtcclxuICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==