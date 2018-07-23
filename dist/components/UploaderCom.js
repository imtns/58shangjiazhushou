'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _utils = require('./../utils/index.js');

var _uploader = require('./../utils/uploader.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UploaderCom = function (_wepy$component) {
    _inherits(UploaderCom, _wepy$component);

    function UploaderCom() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, UploaderCom);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = UploaderCom.__proto__ || Object.getPrototypeOf(UploaderCom)).call.apply(_ref, [this].concat(args))), _this), _this.props = {
            title: {
                type: String
            }
        }, _this.methods = {
            tap: function () {
                var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                    var _this2 = this;

                    var that, _ref3, tempFilePaths;

                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    _context.prev = 0;

                                    console.log('2222', this.title);
                                    console.log('child is clicked', this.title);
                                    that = this;
                                    _context.next = 6;
                                    return _wepy2.default.chooseImage();

                                case 6:
                                    _ref3 = _context.sent;
                                    tempFilePaths = _ref3.tempFilePaths;

                                    (0, _uploader.uploader)(tempFilePaths[0], function (e, result) {
                                        if (e) {
                                            (0, _utils.toast)('上传失败，请重试。');
                                            return;
                                        }
                                        (0, _utils.toast)('上传成功。');
                                        that.$emit('childFn', _this2.title, 'https://pic1.58cdn.com.cn' + result.content);
                                    });
                                    _context.next = 14;
                                    break;

                                case 11:
                                    _context.prev = 11;
                                    _context.t0 = _context['catch'](0);

                                    console.log(_context.t0);

                                case 14:
                                case 'end':
                                    return _context.stop();
                            }
                        }
                    }, _callee, this, [[0, 11]]);
                }));

                function tap() {
                    return _ref2.apply(this, arguments);
                }

                return tap;
            }()
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(UploaderCom, [{
        key: 'onLoad',
        value: function onLoad() {
            console.log('onLoad1111', this.title);
        }
    }]);

    return UploaderCom;
}(_wepy2.default.component);

exports.default = UploaderCom;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlVwbG9hZGVyQ29tLmpzIl0sIm5hbWVzIjpbIlVwbG9hZGVyQ29tIiwicHJvcHMiLCJ0aXRsZSIsInR5cGUiLCJTdHJpbmciLCJtZXRob2RzIiwidGFwIiwiY29uc29sZSIsImxvZyIsInRoYXQiLCJ3ZXB5IiwiY2hvb3NlSW1hZ2UiLCJ0ZW1wRmlsZVBhdGhzIiwiZSIsInJlc3VsdCIsIiRlbWl0IiwiY29udGVudCIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFDQTs7OztBQUVBOztBQUVBOzs7Ozs7Ozs7Ozs7SUFFcUJBLFc7Ozs7Ozs7Ozs7Ozs7O29NQUNqQkMsSyxHQUFRO0FBQ0pDLG1CQUFPO0FBQ0hDLHNCQUFNQztBQURIO0FBREgsUyxRQVFSQyxPLEdBQVU7QUFDQUMsZUFEQTtBQUFBO0FBQUE7O0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFHRUMsNENBQVFDLEdBQVIsQ0FBWSxNQUFaLEVBQW9CLEtBQUtOLEtBQXpCO0FBQ0FLLDRDQUFRQyxHQUFSLENBQVksa0JBQVosRUFBZ0MsS0FBS04sS0FBckM7QUFDTU8sd0NBTFIsR0FLZSxJQUxmO0FBQUE7QUFBQSwyQ0FNa0NDLGVBQUtDLFdBQUwsRUFObEM7O0FBQUE7QUFBQTtBQU1VQyxpREFOVixTQU1VQSxhQU5WOztBQU9FLDREQUFTQSxjQUFjLENBQWQsQ0FBVCxFQUEyQixVQUFDQyxDQUFELEVBQUlDLE1BQUosRUFBZTtBQUN0Qyw0Q0FBSUQsQ0FBSixFQUFPO0FBQ0gsOERBQU0sV0FBTjtBQUNBO0FBQ0g7QUFDRCwwREFBTSxPQUFOO0FBQ0FKLDZDQUFLTSxLQUFMLENBQVcsU0FBWCxFQUFzQixPQUFLYixLQUEzQixnQ0FBOERZLE9BQU9FLE9BQXJFO0FBQ0gscUNBUEQ7QUFQRjtBQUFBOztBQUFBO0FBQUE7QUFBQTs7QUFnQkVULDRDQUFRQyxHQUFSOztBQWhCRjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBLFM7Ozs7O2lDQUhEO0FBQ0xELG9CQUFRQyxHQUFSLENBQVksWUFBWixFQUEwQixLQUFLTixLQUEvQjtBQUNIOzs7O0VBUm9DUSxlQUFLTyxTOztrQkFBekJqQixXIiwiZmlsZSI6IlVwbG9hZGVyQ29tLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xyXG5cclxuaW1wb3J0IHsgdG9hc3QgfSBmcm9tICcuLi91dGlscyc7XHJcblxyXG5pbXBvcnQgeyB1cGxvYWRlciB9IGZyb20gJy4uL3V0aWxzL3VwbG9hZGVyJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVwbG9hZGVyQ29tIGV4dGVuZHMgd2VweS5jb21wb25lbnQge1xyXG4gICAgcHJvcHMgPSB7XHJcbiAgICAgICAgdGl0bGU6IHtcclxuICAgICAgICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICAgIH0sXHJcbiAgICB9XHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ29uTG9hZDExMTEnLCB0aGlzLnRpdGxlKTtcclxuICAgIH1cclxuICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgICAgYXN5bmMgdGFwICgpIHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCcyMjIyJywgdGhpcy50aXRsZSk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnY2hpbGQgaXMgY2xpY2tlZCcsIHRoaXMudGl0bGUpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB7IHRlbXBGaWxlUGF0aHMgfSA9IGF3YWl0IHdlcHkuY2hvb3NlSW1hZ2UoKTtcclxuICAgICAgICAgICAgICAgIHVwbG9hZGVyKHRlbXBGaWxlUGF0aHNbMF0sIChlLCByZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b2FzdCgn5LiK5Lyg5aSx6LSl77yM6K+36YeN6K+V44CCJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdG9hc3QoJ+S4iuS8oOaIkOWKn+OAgicpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuJGVtaXQoJ2NoaWxkRm4nLCB0aGlzLnRpdGxlLCBgaHR0cHM6Ly9waWMxLjU4Y2RuLmNvbS5jbiR7cmVzdWx0LmNvbnRlbnR9YCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgfVxyXG59XHJcbiJdfQ==