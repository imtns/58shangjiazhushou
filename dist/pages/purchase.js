'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _ajax = require('./../utils/ajax.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var buySrc = 'https://ordermobile.58.com/ordermobile/app/product/buyMiniApp?fromProductItemCode=871817130073200000&productItemCode=861110090334300017,852215312393800001&source= up_mini_app&os=ios';
var upgradeSrc = 'https://ordermobile.58.com/ordermobile/app/product/buyUpEnterpriseMiniApp?';

var Purchase = function (_wepy$page) {
    _inherits(Purchase, _wepy$page);

    function Purchase() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Purchase);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Purchase.__proto__ || Object.getPrototypeOf(Purchase)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            navigationBarTitleText: '注册'
        }, _this.data = {
            platform: '',
            src: ''
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Purchase, [{
        key: 'onLoad',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(options) {
                var that, _ref3, data;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                that = this;

                                wx.getSystemInfo({
                                    success: function success(res) {
                                        if (res.platform === 'devtools') {
                                            that.platform = 'PC';
                                        } else if (res.platform === 'ios') {
                                            that.platform = 'ios';
                                        } else if (res.platform === 'android') {
                                            that.platform = 'android';
                                        }
                                    }
                                });

                                if (!options.mpid) {
                                    _context.next = 17;
                                    break;
                                }

                                _context.prev = 3;
                                _context.next = 6;
                                return (0, _ajax.get)('/order/getParam/' + options.mpid);

                            case 6:
                                _ref3 = _context.sent;
                                data = _ref3.data;

                                that.src = upgradeSrc + 'productItemCode=861110090334300017&cityId=' + data.cityId + '&cateId=' + data.cateId + '&newSign=1&oldOrderId=' + data.oldOrderId + '&userId=' + data.userId + '&source=up_mini_app&os=' + that.platform;
                                that.$apply();
                                _context.next = 15;
                                break;

                            case 12:
                                _context.prev = 12;
                                _context.t0 = _context['catch'](3);

                                console.log(_context.t0);

                            case 15:
                                _context.next = 18;
                                break;

                            case 17:
                                that.src = buySrc;

                            case 18:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[3, 12]]);
            }));

            function onLoad(_x) {
                return _ref2.apply(this, arguments);
            }

            return onLoad;
        }()
    }]);

    return Purchase;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Purchase , 'pages/purchase'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1cmNoYXNlLmpzIl0sIm5hbWVzIjpbImJ1eVNyYyIsInVwZ3JhZGVTcmMiLCJQdXJjaGFzZSIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwicGxhdGZvcm0iLCJzcmMiLCJvcHRpb25zIiwidGhhdCIsInd4IiwiZ2V0U3lzdGVtSW5mbyIsInN1Y2Nlc3MiLCJyZXMiLCJtcGlkIiwiY2l0eUlkIiwiY2F0ZUlkIiwib2xkT3JkZXJJZCIsInVzZXJJZCIsIiRhcHBseSIsImNvbnNvbGUiLCJsb2ciLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxTQUFTLHVMQUFmO0FBQ0EsSUFBTUMsYUFBYSw0RUFBbkI7O0lBQ3FCQyxROzs7Ozs7Ozs7Ozs7Ozs4TEFDakJDLE0sR0FBUztBQUNMQyxvQ0FBd0I7QUFEbkIsUyxRQUdUQyxJLEdBQU87QUFDSEMsc0JBQVUsRUFEUDtBQUVIQyxpQkFBSztBQUZGLFM7Ozs7OztpR0FJTUMsTzs7Ozs7OztBQUNIQyxvQyxHQUFPLEk7O0FBQ2JDLG1DQUFHQyxhQUFILENBQWlCO0FBQ2JDLDJDQURhLG1CQUNMQyxHQURLLEVBQ0E7QUFDVCw0Q0FBSUEsSUFBSVAsUUFBSixLQUFpQixVQUFyQixFQUFpQztBQUM3QkcsaURBQUtILFFBQUwsR0FBZ0IsSUFBaEI7QUFDSCx5Q0FGRCxNQUVPLElBQUlPLElBQUlQLFFBQUosS0FBaUIsS0FBckIsRUFBNEI7QUFDL0JHLGlEQUFLSCxRQUFMLEdBQWdCLEtBQWhCO0FBQ0gseUNBRk0sTUFFQSxJQUFJTyxJQUFJUCxRQUFKLEtBQWlCLFNBQXJCLEVBQWdDO0FBQ25DRyxpREFBS0gsUUFBTCxHQUFnQixTQUFoQjtBQUNIO0FBQ0o7QUFUWSxpQ0FBakI7O3FDQVdJRSxRQUFRTSxJOzs7Ozs7O3VDQUVtQixvQ0FBdUJOLFFBQVFNLElBQS9CLEM7Ozs7QUFBZlQsb0MsU0FBQUEsSTs7QUFDUkkscUNBQUtGLEdBQUwsR0FBY04sVUFBZCxrREFBcUVJLEtBQUtVLE1BQTFFLGdCQUEyRlYsS0FBS1csTUFBaEcsOEJBQStIWCxLQUFLWSxVQUFwSSxnQkFBeUpaLEtBQUthLE1BQTlKLCtCQUE4TFQsS0FBS0gsUUFBbk07QUFDQUcscUNBQUtVLE1BQUw7Ozs7Ozs7O0FBRUFDLHdDQUFRQyxHQUFSOzs7Ozs7O0FBR0paLHFDQUFLRixHQUFMLEdBQVdQLE1BQVg7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUE5QjBCc0IsZUFBS0MsSTs7a0JBQXRCckIsUSIsImZpbGUiOiJwdXJjaGFzZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcclxuaW1wb3J0IHsgZ2V0IH0gZnJvbSAnLi4vdXRpbHMvYWpheCc7XHJcblxyXG5jb25zdCBidXlTcmMgPSAnaHR0cHM6Ly9vcmRlcm1vYmlsZS41OC5jb20vb3JkZXJtb2JpbGUvYXBwL3Byb2R1Y3QvYnV5TWluaUFwcD9mcm9tUHJvZHVjdEl0ZW1Db2RlPTg3MTgxNzEzMDA3MzIwMDAwMCZwcm9kdWN0SXRlbUNvZGU9ODYxMTEwMDkwMzM0MzAwMDE3LDg1MjIxNTMxMjM5MzgwMDAwMSZzb3VyY2U9IHVwX21pbmlfYXBwJm9zPWlvcyc7XHJcbmNvbnN0IHVwZ3JhZGVTcmMgPSAnaHR0cHM6Ly9vcmRlcm1vYmlsZS41OC5jb20vb3JkZXJtb2JpbGUvYXBwL3Byb2R1Y3QvYnV5VXBFbnRlcnByaXNlTWluaUFwcD8nO1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQdXJjaGFzZSBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgICBjb25maWcgPSB7XHJcbiAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+azqOWGjCcsXHJcbiAgICB9XHJcbiAgICBkYXRhID0ge1xyXG4gICAgICAgIHBsYXRmb3JtOiAnJyxcclxuICAgICAgICBzcmM6ICcnLFxyXG4gICAgfVxyXG4gICAgYXN5bmMgb25Mb2FkKG9wdGlvbnMpIHtcclxuICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICB3eC5nZXRTeXN0ZW1JbmZvKHtcclxuICAgICAgICAgICAgc3VjY2VzcyhyZXMpIHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXMucGxhdGZvcm0gPT09ICdkZXZ0b29scycpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnBsYXRmb3JtID0gJ1BDJztcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzLnBsYXRmb3JtID09PSAnaW9zJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQucGxhdGZvcm0gPSAnaW9zJztcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzLnBsYXRmb3JtID09PSAnYW5kcm9pZCcpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnBsYXRmb3JtID0gJ2FuZHJvaWQnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmIChvcHRpb25zLm1waWQpIHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHsgZGF0YSB9ID0gYXdhaXQgZ2V0KGAvb3JkZXIvZ2V0UGFyYW0vJHtvcHRpb25zLm1waWR9YCk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnNyYyA9IGAke3VwZ3JhZGVTcmN9cHJvZHVjdEl0ZW1Db2RlPTg2MTExMDA5MDMzNDMwMDAxNyZjaXR5SWQ9JHtkYXRhLmNpdHlJZH0mY2F0ZUlkPSR7ZGF0YS5jYXRlSWR9Jm5ld1NpZ249MSZvbGRPcmRlcklkPSR7ZGF0YS5vbGRPcmRlcklkfSZ1c2VySWQ9JHtkYXRhLnVzZXJJZH0mc291cmNlPXVwX21pbmlfYXBwJm9zPSR7dGhhdC5wbGF0Zm9ybX1gO1xyXG4gICAgICAgICAgICAgICAgdGhhdC4kYXBwbHkoKTtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGF0LnNyYyA9IGJ1eVNyYztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19