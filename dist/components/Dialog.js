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

var Pop = function (_wepy$component) {
    _inherits(Pop, _wepy$component);

    function Pop() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Pop);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Pop.__proto__ || Object.getPrototypeOf(Pop)).call.apply(_ref, [this].concat(args))), _this), _this.props = {
            showPop: {
                type: Boolean
            }
        }, _this.data = {
            showPop: false,
            content: '',
            title: '新建分组',
            surebtnText: '创建'
        }, _this.methods = {
            close: function close() {
                this.$emit('close');
                this.title = '新建分组';
                this.surebtnText = '创建';
                this.content = '';
            },
            add: function () {
                var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                    var content;
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    console.log(this.content);
                                    content = this.content.trim();

                                    if (this.content) {
                                        _context.next = 5;
                                        break;
                                    }

                                    (0, _utils.toast)('请填写分组名称');
                                    return _context.abrupt('return');

                                case 5:
                                    if (!(content.length > 15)) {
                                        _context.next = 8;
                                        break;
                                    }

                                    (0, _utils.toast)('分组名称过长');
                                    return _context.abrupt('return');

                                case 8:
                                    this.$emit('addGroup', this.content);
                                    this.content = '';
                                    this.$apply();

                                case 11:
                                case 'end':
                                    return _context.stop();
                            }
                        }
                    }, _callee, this);
                }));

                function add() {
                    return _ref2.apply(this, arguments);
                }

                return add;
            }(),
            input: function input(e) {
                this.content = e.detail.value;
            }
        }, _this.events = {
            postData: function postData(name) {
                if (name) {
                    _this.title = '编辑分组';
                    _this.surebtnText = '确定';
                    _this.content = name;
                } else {
                    _this.title = '新建分组';
                    _this.surebtnText = '创建';
                    _this.content = '';
                }
                _this.$apply();
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Pop, [{
        key: 'onLoad',
        value: function onLoad() {}
    }]);

    return Pop;
}(_wepy2.default.component);

exports.default = Pop;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkRpYWxvZy5qcyJdLCJuYW1lcyI6WyJQb3AiLCJwcm9wcyIsInNob3dQb3AiLCJ0eXBlIiwiQm9vbGVhbiIsImRhdGEiLCJjb250ZW50IiwidGl0bGUiLCJzdXJlYnRuVGV4dCIsIm1ldGhvZHMiLCJjbG9zZSIsIiRlbWl0IiwiYWRkIiwiY29uc29sZSIsImxvZyIsInRyaW0iLCJsZW5ndGgiLCIkYXBwbHkiLCJpbnB1dCIsImUiLCJkZXRhaWwiLCJ2YWx1ZSIsImV2ZW50cyIsInBvc3REYXRhIiwibmFtZSIsIndlcHkiLCJjb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQ0E7Ozs7QUFFQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxHOzs7Ozs7Ozs7Ozs7OztvTEFDakJDLEssR0FBUTtBQUNKQyxxQkFBUztBQUNMQyxzQkFBTUM7QUFERDtBQURMLFMsUUFLUkMsSSxHQUFPO0FBQ0hILHFCQUFTLEtBRE47QUFFSEkscUJBQVMsRUFGTjtBQUdIQyxtQkFBTyxNQUhKO0FBSUhDLHlCQUFhO0FBSlYsUyxRQU1QQyxPLEdBQVU7QUFDTkMsaUJBRE0sbUJBQ0U7QUFDSixxQkFBS0MsS0FBTCxDQUFXLE9BQVg7QUFDQSxxQkFBS0osS0FBTCxHQUFhLE1BQWI7QUFDQSxxQkFBS0MsV0FBTCxHQUFtQixJQUFuQjtBQUNBLHFCQUFLRixPQUFMLEdBQWUsRUFBZjtBQUNILGFBTks7QUFPQU0sZUFQQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQVFGQyw0Q0FBUUMsR0FBUixDQUFZLEtBQUtSLE9BQWpCO0FBQ01BLDJDQVRKLEdBU2MsS0FBS0EsT0FBTCxDQUFhUyxJQUFiLEVBVGQ7O0FBQUEsd0NBVUcsS0FBS1QsT0FWUjtBQUFBO0FBQUE7QUFBQTs7QUFXRSxzREFBTSxTQUFOO0FBWEY7O0FBQUE7QUFBQSwwQ0FjRUEsUUFBUVUsTUFBUixHQUFpQixFQWRuQjtBQUFBO0FBQUE7QUFBQTs7QUFlRSxzREFBTSxRQUFOO0FBZkY7O0FBQUE7QUFrQkYseUNBQUtMLEtBQUwsQ0FBVyxVQUFYLEVBQXVCLEtBQUtMLE9BQTVCO0FBQ0EseUNBQUtBLE9BQUwsR0FBZSxFQUFmO0FBQ0EseUNBQUtXLE1BQUw7O0FBcEJFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBc0JOQyxpQkF0Qk0saUJBc0JBQyxDQXRCQSxFQXNCRztBQUNMLHFCQUFLYixPQUFMLEdBQWVhLEVBQUVDLE1BQUYsQ0FBU0MsS0FBeEI7QUFDSDtBQXhCSyxTLFFBMEJWQyxNLEdBQVM7QUFDTEMsc0JBQVUsa0JBQUNDLElBQUQsRUFBVTtBQUNoQixvQkFBSUEsSUFBSixFQUFVO0FBQ04sMEJBQUtqQixLQUFMLEdBQWEsTUFBYjtBQUNBLDBCQUFLQyxXQUFMLEdBQW1CLElBQW5CO0FBQ0EsMEJBQUtGLE9BQUwsR0FBZWtCLElBQWY7QUFDSCxpQkFKRCxNQUlPO0FBQ0gsMEJBQUtqQixLQUFMLEdBQWEsTUFBYjtBQUNBLDBCQUFLQyxXQUFMLEdBQW1CLElBQW5CO0FBQ0EsMEJBQUtGLE9BQUwsR0FBZSxFQUFmO0FBQ0g7QUFDRCxzQkFBS1csTUFBTDtBQUNIO0FBWkksUzs7Ozs7aUNBY0EsQ0FDUjs7OztFQXJENEJRLGVBQUtDLFM7O2tCQUFqQjFCLEciLCJmaWxlIjoiRGlhbG9nLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xyXG5cclxuaW1wb3J0IHsgdG9hc3QgfSBmcm9tICcuLi91dGlscyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb3AgZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XHJcbiAgICBwcm9wcyA9IHtcclxuICAgICAgICBzaG93UG9wOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IEJvb2xlYW4sXHJcbiAgICAgICAgfSxcclxuICAgIH1cclxuICAgIGRhdGEgPSB7XHJcbiAgICAgICAgc2hvd1BvcDogZmFsc2UsXHJcbiAgICAgICAgY29udGVudDogJycsXHJcbiAgICAgICAgdGl0bGU6ICfmlrDlu7rliIbnu4QnLFxyXG4gICAgICAgIHN1cmVidG5UZXh0OiAn5Yib5bu6JyxcclxuICAgIH1cclxuICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgICAgY2xvc2UoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuJGVtaXQoJ2Nsb3NlJyk7XHJcbiAgICAgICAgICAgIHRoaXMudGl0bGUgPSAn5paw5bu65YiG57uEJztcclxuICAgICAgICAgICAgdGhpcy5zdXJlYnRuVGV4dCA9ICfliJvlu7onO1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRlbnQgPSAnJztcclxuICAgICAgICB9LFxyXG4gICAgICAgIGFzeW5jIGFkZCgpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5jb250ZW50KTtcclxuICAgICAgICAgICAgY29uc3QgY29udGVudCA9IHRoaXMuY29udGVudC50cmltKCk7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5jb250ZW50KSB7XHJcbiAgICAgICAgICAgICAgICB0b2FzdCgn6K+35aGr5YaZ5YiG57uE5ZCN56ewJyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGNvbnRlbnQubGVuZ3RoID4gMTUpIHtcclxuICAgICAgICAgICAgICAgIHRvYXN0KCfliIbnu4TlkI3np7Dov4fplb8nKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLiRlbWl0KCdhZGRHcm91cCcsIHRoaXMuY29udGVudCk7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGVudCA9ICcnO1xyXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaW5wdXQoZSkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRlbnQgPSBlLmRldGFpbC52YWx1ZTtcclxuICAgICAgICB9LFxyXG4gICAgfVxyXG4gICAgZXZlbnRzID0ge1xyXG4gICAgICAgIHBvc3REYXRhOiAobmFtZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAobmFtZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50aXRsZSA9ICfnvJbovpHliIbnu4QnO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdXJlYnRuVGV4dCA9ICfnoa7lrponO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZW50ID0gbmFtZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudGl0bGUgPSAn5paw5bu65YiG57uEJztcclxuICAgICAgICAgICAgICAgIHRoaXMuc3VyZWJ0blRleHQgPSAn5Yib5bu6JztcclxuICAgICAgICAgICAgICAgIHRoaXMuY29udGVudCA9ICcnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgfSxcclxuICAgIH1cclxuICAgIG9uTG9hZCgpIHtcclxuICAgIH1cclxufVxyXG4iXX0=