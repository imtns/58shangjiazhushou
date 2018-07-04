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

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = OpenPay.__proto__ || Object.getPrototypeOf(OpenPay)).call.apply(_ref, [this].concat(args))), _this), _this.config = {}, _this.data = {
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIk9wZW5QYXkuanMiXSwibmFtZXMiOlsiYXBwaW5mb0FwaSIsIk9wZW5QYXkiLCJjb25maWciLCJkYXRhIiwicGF5QXBwSWQiLCJ1c2VyaWQiLCJvcGVuZWQiLCJhZ3JlZVByb3RvY29sIiwic2hvd1Byb3RvY29sIiwibWV0aG9kcyIsImJpbmRBZ3JlZVByb3RvY29sIiwiYmluZFNob3dQcm90b2NvbCIsInN0b3BBdXRob3JpemVTY3JvbGwiLCJjb25zb2xlIiwibG9nIiwib3B0aW9ucyIsIm1waWQiLCJ3ZXB5IiwiZ2V0U3RvcmFnZVN5bmMiLCJnZXRPcGVuZWRJbmZvIiwiZSIsInJlcyIsInByb3RvY29sIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLGFBQWEsY0FBbkI7O0lBRXFCQyxPOzs7Ozs7Ozs7Ozs7Ozs0TEFDakJDLE0sR0FBUyxFLFFBQ1RDLEksR0FBTztBQUNIQyxzQkFBVSxvQkFEUCxFQUM2QjtBQUNoQ0Msb0JBQVEsRUFGTCxFQUVTO0FBQ1pDLG9CQUFRLEtBSEwsRUFHWTtBQUNmQywyQkFBZSxJQUpaLEVBSWtCO0FBQ3JCQywwQkFBYyxLQUxYLENBS2tCO0FBTGxCLFMsUUFPUEMsTyxHQUFVO0FBQ05DLDZCQURNLCtCQUNlO0FBQ2pCLHFCQUFLSCxhQUFMLEdBQXFCLENBQUMsS0FBS0EsYUFBM0I7QUFDSCxhQUhLO0FBSU5JLDRCQUpNLDRCQUlZSCxZQUpaLEVBSTBCO0FBQzVCLHFCQUFLQSxZQUFMLEdBQW9CQSxZQUFwQjtBQUNILGFBTks7QUFPTkksK0JBUE0saUNBT2lCO0FBQ25CO0FBQ0FDLHdCQUFRQyxHQUFSLENBQVkscUJBQVo7QUFDSDtBQVZLLFM7Ozs7OztpR0FZSUMsTzs7Ozs7O0FBQ0pDLG9DLEdBQU9ELFFBQVFDLElBQVIsSUFBZ0JDLGVBQUtDLGNBQUwsQ0FBb0IsY0FBcEIsQzs7dUNBQ3ZCLEtBQUtDLGFBQUwsQ0FBbUJILElBQW5CLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7a0dBRVdBLEk7Ozs7Ozs7O3VDQUlNLGdCQUFPaEIsVUFBUCxTQUFxQmdCLElBQXJCLEM7Ozs7O0FBQWhCSSxpQztBQUFHQyxtQzs7cUNBQ05ELEM7Ozs7O0FBQ0Esa0RBQU1BLENBQU47Ozs7QUFHSixxQ0FBS2QsTUFBTCxHQUFjZSxJQUFJQyxRQUFKLEtBQWlCLENBQS9COzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBbEM2QkwsZUFBS00sSTs7a0JBQXJCdEIsTyIsImZpbGUiOiJPcGVuUGF5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbmltcG9ydCB7IHRvYXN0IH0gZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IHsgZ2V0IH0gZnJvbSAnLi4vdXRpbHMvYWpheFAnO1xuXG5jb25zdCBhcHBpbmZvQXBpID0gJy9tcGxvZ2ljL2dldCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9wZW5QYXkgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHt9XG4gICAgZGF0YSA9IHtcbiAgICAgICAgcGF5QXBwSWQ6ICd3eDY3Yjc1ZTg2YzlkYWVmNDUnLCAvLyDlvIDpgJrmlK/ku5jlsI/nqIvluo9JRFxuICAgICAgICB1c2VyaWQ6ICcnLCAvLyDlvIDpgJrmlK/ku5jlv4XloatcbiAgICAgICAgb3BlbmVkOiBmYWxzZSwgLy8g5piv5ZCm5bey57uP5byA6YCa5pSv5LuYXG4gICAgICAgIGFncmVlUHJvdG9jb2w6IHRydWUsIC8vIOaYr+WQpuWQjOaEj+WNj+iurlxuICAgICAgICBzaG93UHJvdG9jb2w6IGZhbHNlLCAvLyDmmL7npLrljY/orq7lhoXlrrlcbiAgICB9XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgICAgYmluZEFncmVlUHJvdG9jb2wgKCkge1xuICAgICAgICAgICAgdGhpcy5hZ3JlZVByb3RvY29sID0gIXRoaXMuYWdyZWVQcm90b2NvbDtcbiAgICAgICAgfSxcbiAgICAgICAgYmluZFNob3dQcm90b2NvbCAoc2hvd1Byb3RvY29sKSB7XG4gICAgICAgICAgICB0aGlzLnNob3dQcm90b2NvbCA9IHNob3dQcm90b2NvbDtcbiAgICAgICAgfSxcbiAgICAgICAgc3RvcEF1dGhvcml6ZVNjcm9sbCAoKSB7XG4gICAgICAgICAgICAvLyDpmLvmraLmu5rliqjkuovku7bnqb/pgI9cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzdG9wQXV0aG9yaXplU2Nyb2xsJyk7XG4gICAgICAgIH0sXG4gICAgfVxuICAgIGFzeW5jIG9uTG9hZCAob3B0aW9ucykge1xuICAgICAgICBjb25zdCBtcGlkID0gb3B0aW9ucy5tcGlkIHx8IHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ2N1cnJlbnRfbXBpZCcpO1xuICAgICAgICBhd2FpdCB0aGlzLmdldE9wZW5lZEluZm8obXBpZCk7XG4gICAgfVxuICAgIGFzeW5jIGdldE9wZW5lZEluZm8gKG1waWQpIHtcbiAgICAgICAgLy8g6I635Y+W55So5oi35piv5ZCm5byA6YCa5pSv5LuYXG4gICAgICAgIC8vIGlm5pu05pS55pSv5pS25qy+5b6u5L+hXG4gICAgICAgIC8vIGVsc2XlvIDpgJrmlK/ku5hcbiAgICAgICAgY29uc3QgW2UsIHJlc10gPSBhd2FpdCBnZXQoYCR7YXBwaW5mb0FwaX0vJHttcGlkfWApO1xuICAgICAgICBpZiAoZSkge1xuICAgICAgICAgICAgdG9hc3QoZSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5vcGVuZWQgPSByZXMucHJvdG9jb2wgPT09IDE7XG4gICAgfVxufVxuIl19