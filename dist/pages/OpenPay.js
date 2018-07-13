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
            showProtocol: false // 显示协议内容
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
        key: 'onLoad',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(options) {
                var mpid;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                mpid = options.mpid || _wepy2.default.getStorageSync('current_mpid');
                                _context.next = 3;
                                return this.getOpenedInfo(mpid);

                            case 3:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function onLoad(_x) {
                return _ref2.apply(this, arguments);
            }

            return onLoad;
        }()
    }, {
        key: 'getOpenedInfo',
        value: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(mpid) {
                var _ref4, _ref5, e, res;

                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.next = 2;
                                return (0, _ajaxP.get)(appinfoApi + '/' + mpid);

                            case 2:
                                _ref4 = _context2.sent;
                                _ref5 = _slicedToArray(_ref4, 2);
                                e = _ref5[0];
                                res = _ref5[1];

                                if (!e) {
                                    _context2.next = 9;
                                    break;
                                }

                                (0, _utils.toast)(e);
                                return _context2.abrupt('return');

                            case 9:
                                this.opened = res.protocol === 1;

                            case 10:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function getOpenedInfo(_x2) {
                return _ref3.apply(this, arguments);
            }

            return getOpenedInfo;
        }()
    }]);

    return OpenPay;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(OpenPay , 'pages/OpenPay'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIk9wZW5QYXkuanMiXSwibmFtZXMiOlsiYXBwaW5mb0FwaSIsIk9wZW5QYXkiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGlzYWJsZVNjcm9sbCIsImRhdGEiLCJwYXlBcHBJZCIsInVzZXJpZCIsIm9wZW5lZCIsImFncmVlUHJvdG9jb2wiLCJzaG93UHJvdG9jb2wiLCJtZXRob2RzIiwiYmluZEFncmVlUHJvdG9jb2wiLCJiaW5kU2hvd1Byb3RvY29sIiwic3RvcEF1dGhvcml6ZVNjcm9sbCIsImNvbnNvbGUiLCJsb2ciLCJvcHRpb25zIiwibXBpZCIsIndlcHkiLCJnZXRTdG9yYWdlU3luYyIsImdldE9wZW5lZEluZm8iLCJlIiwicmVzIiwicHJvdG9jb2wiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsYUFBYSxjQUFuQjs7SUFFcUJDLE87Ozs7Ozs7Ozs7Ozs7OzRMQUNqQkMsTSxHQUFTO0FBQ0xDLG9DQUF3QixNQURuQjtBQUVMQywyQkFBZTtBQUZWLFMsUUFJVEMsSSxHQUFPO0FBQ0hDLHNCQUFVLG9CQURQLEVBQzZCO0FBQ2hDQyxvQkFBUSxFQUZMLEVBRVM7QUFDWkMsb0JBQVEsS0FITCxFQUdZO0FBQ2ZDLDJCQUFlLElBSlosRUFJa0I7QUFDckJDLDBCQUFjLEtBTFgsQ0FLa0I7QUFMbEIsUyxRQU9QQyxPLEdBQVU7QUFDTkMsNkJBRE0sK0JBQ2U7QUFDakIscUJBQUtILGFBQUwsR0FBcUIsQ0FBQyxLQUFLQSxhQUEzQjtBQUNILGFBSEs7QUFJTkksNEJBSk0sNEJBSVlILFlBSlosRUFJMEI7QUFDNUIscUJBQUtBLFlBQUwsR0FBb0JBLFlBQXBCO0FBQ0gsYUFOSztBQU9OSSwrQkFQTSxpQ0FPaUI7QUFDbkI7QUFDQUMsd0JBQVFDLEdBQVIsQ0FBWSxxQkFBWjtBQUNIO0FBVkssUzs7Ozs7O2lHQVlJQyxPOzs7Ozs7QUFDSkMsb0MsR0FBT0QsUUFBUUMsSUFBUixJQUFnQkMsZUFBS0MsY0FBTCxDQUFvQixjQUFwQixDOzt1Q0FDdkIsS0FBS0MsYUFBTCxDQUFtQkgsSUFBbkIsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztrR0FFV0EsSTs7Ozs7Ozs7dUNBSU0sZ0JBQU9sQixVQUFQLFNBQXFCa0IsSUFBckIsQzs7Ozs7QUFBaEJJLGlDO0FBQUdDLG1DOztxQ0FDTkQsQzs7Ozs7QUFDQSxrREFBTUEsQ0FBTjs7OztBQUdKLHFDQUFLZCxNQUFMLEdBQWNlLElBQUlDLFFBQUosS0FBaUIsQ0FBL0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFyQzZCTCxlQUFLTSxJOztrQkFBckJ4QixPIiwiZmlsZSI6Ik9wZW5QYXkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XHJcbmltcG9ydCB7IHRvYXN0IH0gZnJvbSAnLi4vdXRpbHMnO1xyXG5pbXBvcnQgeyBnZXQgfSBmcm9tICcuLi91dGlscy9hamF4UCc7XHJcblxyXG5jb25zdCBhcHBpbmZvQXBpID0gJy9tcGxvZ2ljL2dldCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPcGVuUGF5IGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICAgIGNvbmZpZyA9IHtcclxuICAgICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5byA6YCa5pSv5LuYJyxcclxuICAgICAgICBkaXNhYmxlU2Nyb2xsOiB0cnVlLFxyXG4gICAgfVxyXG4gICAgZGF0YSA9IHtcclxuICAgICAgICBwYXlBcHBJZDogJ3d4NjdiNzVlODZjOWRhZWY0NScsIC8vIOW8gOmAmuaUr+S7mOWwj+eoi+W6j0lEXHJcbiAgICAgICAgdXNlcmlkOiAnJywgLy8g5byA6YCa5pSv5LuY5b+F5aGrXHJcbiAgICAgICAgb3BlbmVkOiBmYWxzZSwgLy8g5piv5ZCm5bey57uP5byA6YCa5pSv5LuYXHJcbiAgICAgICAgYWdyZWVQcm90b2NvbDogdHJ1ZSwgLy8g5piv5ZCm5ZCM5oSP5Y2P6K6uXHJcbiAgICAgICAgc2hvd1Byb3RvY29sOiBmYWxzZSwgLy8g5pi+56S65Y2P6K6u5YaF5a65XHJcbiAgICB9XHJcbiAgICBtZXRob2RzID0ge1xyXG4gICAgICAgIGJpbmRBZ3JlZVByb3RvY29sICgpIHtcclxuICAgICAgICAgICAgdGhpcy5hZ3JlZVByb3RvY29sID0gIXRoaXMuYWdyZWVQcm90b2NvbDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJpbmRTaG93UHJvdG9jb2wgKHNob3dQcm90b2NvbCkge1xyXG4gICAgICAgICAgICB0aGlzLnNob3dQcm90b2NvbCA9IHNob3dQcm90b2NvbDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHN0b3BBdXRob3JpemVTY3JvbGwgKCkge1xyXG4gICAgICAgICAgICAvLyDpmLvmraLmu5rliqjkuovku7bnqb/pgI9cclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ3N0b3BBdXRob3JpemVTY3JvbGwnKTtcclxuICAgICAgICB9LFxyXG4gICAgfVxyXG4gICAgYXN5bmMgb25Mb2FkIChvcHRpb25zKSB7XHJcbiAgICAgICAgY29uc3QgbXBpZCA9IG9wdGlvbnMubXBpZCB8fCB3ZXB5LmdldFN0b3JhZ2VTeW5jKCdjdXJyZW50X21waWQnKTtcclxuICAgICAgICBhd2FpdCB0aGlzLmdldE9wZW5lZEluZm8obXBpZCk7XHJcbiAgICB9XHJcbiAgICBhc3luYyBnZXRPcGVuZWRJbmZvIChtcGlkKSB7XHJcbiAgICAgICAgLy8g6I635Y+W55So5oi35piv5ZCm5byA6YCa5pSv5LuYXHJcbiAgICAgICAgLy8gaWbmm7TmlLnmlK/mlLbmrL7lvq7kv6FcclxuICAgICAgICAvLyBlbHNl5byA6YCa5pSv5LuYXHJcbiAgICAgICAgY29uc3QgW2UsIHJlc10gPSBhd2FpdCBnZXQoYCR7YXBwaW5mb0FwaX0vJHttcGlkfWApO1xyXG4gICAgICAgIGlmIChlKSB7XHJcbiAgICAgICAgICAgIHRvYXN0KGUpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMub3BlbmVkID0gcmVzLnByb3RvY29sID09PSAxO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==