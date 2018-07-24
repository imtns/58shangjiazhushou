'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Index = function (_wepy$page) {
    _inherits(Index, _wepy$page);

    function Index() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Index);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
            isIphoneX: false
        }, _this.config = {
            navigationBarTitleText: '关联公众号'
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Index, [{
        key: 'onLoad',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var _ref3, _ref3$model, model;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return _wepy2.default.getSystemInfo();

                            case 2:
                                _ref3 = _context.sent;
                                _ref3$model = _ref3.model;
                                model = _ref3$model === undefined ? '' : _ref3$model;

                                if (~model.toLowerCase().indexOf('iphone x')) {
                                    this.isIphoneX = true;
                                }

                            case 6:
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
    }]);

    return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/followPublic'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZvbGxvd1B1YmxpYy5qcyJdLCJuYW1lcyI6WyJJbmRleCIsImRhdGEiLCJpc0lwaG9uZVgiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0Iiwid2VweSIsImdldFN5c3RlbUluZm8iLCJtb2RlbCIsInRvTG93ZXJDYXNlIiwiaW5kZXhPZiIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0lBRXFCQSxLOzs7Ozs7Ozs7Ozs7Ozt3TEFDakJDLEksR0FBTztBQUNIQyx1QkFBVztBQURSLFMsUUFHUEMsTSxHQUFTO0FBQ0xDLG9DQUF3QjtBQURuQixTOzs7Ozs7Ozs7Ozs7Ozt1Q0FJd0JDLGVBQUtDLGFBQUwsRTs7OztvREFBckJDLEs7QUFBQUEscUMsK0JBQVEsRTs7QUFDaEIsb0NBQUksQ0FBQ0EsTUFBTUMsV0FBTixHQUFvQkMsT0FBcEIsQ0FBNEIsVUFBNUIsQ0FBTCxFQUE4QztBQUMxQyx5Q0FBS1AsU0FBTCxHQUFpQixJQUFqQjtBQUNIOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBWDBCRyxlQUFLSyxJOztrQkFBbkJWLEsiLCJmaWxlIjoiZm9sbG93UHVibGljLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGRhdGEgPSB7XG4gICAgICAgIGlzSXBob25lWDogZmFsc2UsXG4gICAgfVxuICAgIGNvbmZpZyA9IHtcbiAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+WFs+iBlOWFrOS8l+WPtycsXG4gICAgfVxuICAgIGFzeW5jIG9uTG9hZCgpIHtcbiAgICAgICAgY29uc3QgeyBtb2RlbCA9ICcnIH0gPSBhd2FpdCB3ZXB5LmdldFN5c3RlbUluZm8oKTtcbiAgICAgICAgaWYgKH5tb2RlbC50b0xvd2VyQ2FzZSgpLmluZGV4T2YoJ2lwaG9uZSB4JykpIHtcbiAgICAgICAgICAgIHRoaXMuaXNJcGhvbmVYID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==