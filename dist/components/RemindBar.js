'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _utils = require('./../utils/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RemindBar = function (_wepy$component) {
    _inherits(RemindBar, _wepy$component);

    function RemindBar() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, RemindBar);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = RemindBar.__proto__ || Object.getPrototypeOf(RemindBar)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
            currentstep: 1,
            steps: [{
                index: '1',
                text: '主体账户信息',
                status: 1
            }, {
                index: '2',
                text: '管理员信息',
                status: 0
            }, {
                index: '3',
                text: '注册完成',
                status: 0
            }]
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(RemindBar, [{
        key: 'onLoad',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return (0, _utils.sleep)();

                            case 2:
                                this.currentstep = this.$parent.currentstep;
                                this.$apply();
                                console.log('onLoad', this.$parent.currentstep);

                            case 5:
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

    return RemindBar;
}(_wepy2.default.component);

exports.default = RemindBar;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlJlbWluZEJhci5qcyJdLCJuYW1lcyI6WyJSZW1pbmRCYXIiLCJkYXRhIiwiY3VycmVudHN0ZXAiLCJzdGVwcyIsImluZGV4IiwidGV4dCIsInN0YXR1cyIsIiRwYXJlbnQiLCIkYXBwbHkiLCJjb25zb2xlIiwibG9nIiwid2VweSIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFDQTs7OztBQUVBOzs7Ozs7Ozs7Ozs7SUFFcUJBLFM7Ozs7Ozs7Ozs7Ozs7O2dNQUNqQkMsSSxHQUFPO0FBQ0hDLHlCQUFhLENBRFY7QUFFSEMsbUJBQU8sQ0FDSDtBQUNJQyx1QkFBTyxHQURYO0FBRUlDLHNCQUFNLFFBRlY7QUFHSUMsd0JBQVE7QUFIWixhQURHLEVBTUg7QUFDSUYsdUJBQU8sR0FEWDtBQUVJQyxzQkFBTSxPQUZWO0FBR0lDLHdCQUFRO0FBSFosYUFORyxFQVdIO0FBQ0lGLHVCQUFPLEdBRFg7QUFFSUMsc0JBQU0sTUFGVjtBQUdJQyx3QkFBUTtBQUhaLGFBWEc7QUFGSixTOzs7Ozs7Ozs7Ozs7dUNBcUJHLG1COzs7QUFDTixxQ0FBS0osV0FBTCxHQUFtQixLQUFLSyxPQUFMLENBQWFMLFdBQWhDO0FBQ0EscUNBQUtNLE1BQUw7QUFDQUMsd0NBQVFDLEdBQVIsQ0FBWSxRQUFaLEVBQXNCLEtBQUtILE9BQUwsQ0FBYUwsV0FBbkM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUF6QitCUyxlQUFLQyxTOztrQkFBdkJaLFMiLCJmaWxlIjoiUmVtaW5kQmFyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xyXG5cclxuaW1wb3J0IHsgc2xlZXAgfSBmcm9tICcuLi91dGlscyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZW1pbmRCYXIgZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XHJcbiAgICBkYXRhID0ge1xyXG4gICAgICAgIGN1cnJlbnRzdGVwOiAxLFxyXG4gICAgICAgIHN0ZXBzOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGluZGV4OiAnMScsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiAn5Li75L2T6LSm5oi35L+h5oGvJyxcclxuICAgICAgICAgICAgICAgIHN0YXR1czogMSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaW5kZXg6ICcyJyxcclxuICAgICAgICAgICAgICAgIHRleHQ6ICfnrqHnkIblkZjkv6Hmga8nLFxyXG4gICAgICAgICAgICAgICAgc3RhdHVzOiAwLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpbmRleDogJzMnLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogJ+azqOWGjOWujOaIkCcsXHJcbiAgICAgICAgICAgICAgICBzdGF0dXM6IDAsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgXSxcclxuICAgIH1cclxuICAgIGFzeW5jIG9uTG9hZCgpIHtcclxuICAgICAgICBhd2FpdCBzbGVlcCgpO1xyXG4gICAgICAgIHRoaXMuY3VycmVudHN0ZXAgPSB0aGlzLiRwYXJlbnQuY3VycmVudHN0ZXA7XHJcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICBjb25zb2xlLmxvZygnb25Mb2FkJywgdGhpcy4kcGFyZW50LmN1cnJlbnRzdGVwKTtcclxuICAgIH1cclxufVxyXG4iXX0=