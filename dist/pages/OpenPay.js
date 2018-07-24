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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIk9wZW5QYXkuanMiXSwibmFtZXMiOlsiYXBwaW5mb0FwaSIsIk9wZW5QYXkiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGlzYWJsZVNjcm9sbCIsImRhdGEiLCJwYXlBcHBJZCIsInVzZXJpZCIsIm9wZW5lZCIsImFncmVlUHJvdG9jb2wiLCJzaG93UHJvdG9jb2wiLCJsb2FkaW5nIiwibWV0aG9kcyIsImJpbmRBZ3JlZVByb3RvY29sIiwiYmluZFNob3dQcm90b2NvbCIsInN0b3BBdXRob3JpemVTY3JvbGwiLCJjb25zb2xlIiwibG9nIiwic2F2ZUFncmVlUHJvdG9jb2wiLCJtcGlkIiwid2VweSIsImdldFN0b3JhZ2VTeW5jIiwiZ2V0T3BlbmVkSW5mbyIsIk9wZW5QYXlTdGF0dXMiLCJyZW1vdmVTdG9yYWdlU3luYyIsImUiLCJyZXMiLCJwYXlfb3BlbiIsIiRhcHBseSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxhQUFhLGNBQW5COztJQUVxQkMsTzs7Ozs7Ozs7Ozs7Ozs7NExBQ2pCQyxNLEdBQVM7QUFDTEMsb0NBQXdCLE1BRG5CO0FBRUxDLDJCQUFlO0FBRlYsUyxRQUlUQyxJLEdBQU87QUFDSEMsc0JBQVUsb0JBRFAsRUFDNkI7QUFDaENDLG9CQUFRLEVBRkwsRUFFUztBQUNaQyxvQkFBUSxLQUhMLEVBR1k7QUFDZkMsMkJBQWUsSUFKWixFQUlrQjtBQUNyQkMsMEJBQWMsS0FMWCxFQUtrQjtBQUNyQkMscUJBQVMsSUFOTixDQU1ZO0FBTlosUyxRQVFQQyxPLEdBQVU7QUFDTkMsNkJBRE0sK0JBQ2U7QUFDakIscUJBQUtKLGFBQUwsR0FBcUIsQ0FBQyxLQUFLQSxhQUEzQjtBQUNILGFBSEs7QUFJTkssNEJBSk0sNEJBSVlKLFlBSlosRUFJMEI7QUFDNUIscUJBQUtBLFlBQUwsR0FBb0JBLFlBQXBCO0FBQ0gsYUFOSztBQU9OSywrQkFQTSxpQ0FPaUI7QUFDbkI7QUFDQUMsd0JBQVFDLEdBQVIsQ0FBWSxxQkFBWjtBQUNIO0FBVkssUzs7Ozs7Ozs7Ozs7Ozt1Q0FhQSxLQUFLQyxpQkFBTCxFOzs7QUFDQUMsb0MsR0FBT0MsZUFBS0MsY0FBTCxDQUFvQixjQUFwQixDOzt1Q0FDUCxLQUFLQyxhQUFMLENBQW1CSCxJQUFuQixDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUdOO0FBQ01JLDZDLEdBQWdCSCxlQUFLQyxjQUFMLENBQW9CLFNBQXBCLEM7O3NDQUNsQkUsa0JBQWtCLEc7Ozs7Ozs7O0FBQ3RCSCwrQ0FBS0ksaUJBQUwsQ0FBdUIsU0FBdkI7O3VDQUNrQixnQkFBSSxlQUFKLEM7Ozs7O0FBQVhDLGlDOztBQUNQQSxxQ0FBSyxrQkFBTUEsQ0FBTixDQUFMOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O2tHQUVpQk4sSTs7Ozs7Ozs7dUNBSU0sZ0JBQU9uQixVQUFQLFNBQXFCbUIsSUFBckIsQzs7Ozs7QUFBaEJNLGlDO0FBQUdDLG1DOztxQ0FDTkQsQzs7Ozs7QUFDQSxrREFBTUEsQ0FBTjs7OztBQUdKLHFDQUFLZCxPQUFMLEdBQWUsS0FBZjtBQUNBLHFDQUFLSixNQUFMLEdBQWNtQixJQUFJbkIsTUFBbEI7QUFDQSxxQ0FBS0MsTUFBTCxHQUFja0IsSUFBSUMsUUFBSixLQUFpQixDQUEvQjtBQUNBLHFDQUFLQyxNQUFMOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBbEQ2QlIsZUFBS1MsSTs7a0JBQXJCNUIsTyIsImZpbGUiOiJPcGVuUGF5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbmltcG9ydCB7IHRvYXN0IH0gZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IHsgZ2V0IH0gZnJvbSAnLi4vdXRpbHMvYWpheFAnO1xuXG5jb25zdCBhcHBpbmZvQXBpID0gJy9tcGxvZ2ljL2dldCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9wZW5QYXkgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+W8gOmAmuaUr+S7mCcsXG4gICAgICAgIGRpc2FibGVTY3JvbGw6IHRydWUsXG4gICAgfVxuICAgIGRhdGEgPSB7XG4gICAgICAgIHBheUFwcElkOiAnd3g2N2I3NWU4NmM5ZGFlZjQ1JywgLy8g5byA6YCa5pSv5LuY5bCP56iL5bqPSURcbiAgICAgICAgdXNlcmlkOiAnJywgLy8g5byA6YCa5pSv5LuY5b+F5aGrXG4gICAgICAgIG9wZW5lZDogZmFsc2UsIC8vIOaYr+WQpuW3sue7j+W8gOmAmuaUr+S7mFxuICAgICAgICBhZ3JlZVByb3RvY29sOiB0cnVlLCAvLyDmmK/lkKblkIzmhI/ljY/orq5cbiAgICAgICAgc2hvd1Byb3RvY29sOiBmYWxzZSwgLy8g5pi+56S65Y2P6K6u5YaF5a65XG4gICAgICAgIGxvYWRpbmc6IHRydWUsIC8vIOWKoOi9veS4remakOiXj+mhtemdouWGheWuuVxuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgICAgICBiaW5kQWdyZWVQcm90b2NvbCAoKSB7XG4gICAgICAgICAgICB0aGlzLmFncmVlUHJvdG9jb2wgPSAhdGhpcy5hZ3JlZVByb3RvY29sO1xuICAgICAgICB9LFxuICAgICAgICBiaW5kU2hvd1Byb3RvY29sIChzaG93UHJvdG9jb2wpIHtcbiAgICAgICAgICAgIHRoaXMuc2hvd1Byb3RvY29sID0gc2hvd1Byb3RvY29sO1xuICAgICAgICB9LFxuICAgICAgICBzdG9wQXV0aG9yaXplU2Nyb2xsICgpIHtcbiAgICAgICAgICAgIC8vIOmYu+atoua7muWKqOS6i+S7tuepv+mAj1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ3N0b3BBdXRob3JpemVTY3JvbGwnKTtcbiAgICAgICAgfSxcbiAgICB9XG4gICAgYXN5bmMgb25TaG93ICgpIHtcbiAgICAgICAgYXdhaXQgdGhpcy5zYXZlQWdyZWVQcm90b2NvbCgpO1xuICAgICAgICBjb25zdCBtcGlkID0gd2VweS5nZXRTdG9yYWdlU3luYygnY3VycmVudF9tcGlkJyk7XG4gICAgICAgIGF3YWl0IHRoaXMuZ2V0T3BlbmVkSW5mbyhtcGlkKTtcbiAgICB9XG4gICAgYXN5bmMgc2F2ZUFncmVlUHJvdG9jb2wgKCkge1xuICAgICAgICAvLyDlvIDpgJrmlK/ku5jlkI7lm57kvKDnirbmgIFcbiAgICAgICAgY29uc3QgT3BlblBheVN0YXR1cyA9IHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ09wZW5QYXknKTtcbiAgICAgICAgaWYgKE9wZW5QYXlTdGF0dXMgIT09ICcwJykgcmV0dXJuO1xuICAgICAgICB3ZXB5LnJlbW92ZVN0b3JhZ2VTeW5jKCdPcGVuUGF5Jyk7XG4gICAgICAgIGNvbnN0IFtlXSA9IGF3YWl0IGdldCgnL21wSW5mby9hZ3JlZScpO1xuICAgICAgICBlICYmIHRvYXN0KGUpO1xuICAgIH1cbiAgICBhc3luYyBnZXRPcGVuZWRJbmZvIChtcGlkKSB7XG4gICAgICAgIC8vIOiOt+WPlueUqOaIt+aYr+WQpuW8gOmAmuaUr+S7mFxuICAgICAgICAvLyBpZuabtOaUueaUr+aUtuasvuW+ruS/oVxuICAgICAgICAvLyBlbHNl5byA6YCa5pSv5LuYXG4gICAgICAgIGNvbnN0IFtlLCByZXNdID0gYXdhaXQgZ2V0KGAke2FwcGluZm9BcGl9LyR7bXBpZH1gKTtcbiAgICAgICAgaWYgKGUpIHtcbiAgICAgICAgICAgIHRvYXN0KGUpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLnVzZXJpZCA9IHJlcy51c2VyaWQ7XG4gICAgICAgIHRoaXMub3BlbmVkID0gcmVzLnBheV9vcGVuID09PSAxO1xuICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgIH1cbn1cbiJdfQ==