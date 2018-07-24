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
                console.log('===========', name);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkRpYWxvZy5qcyJdLCJuYW1lcyI6WyJQb3AiLCJwcm9wcyIsInNob3dQb3AiLCJ0eXBlIiwiQm9vbGVhbiIsImRhdGEiLCJjb250ZW50IiwidGl0bGUiLCJzdXJlYnRuVGV4dCIsIm1ldGhvZHMiLCJjbG9zZSIsIiRlbWl0IiwiYWRkIiwiY29uc29sZSIsImxvZyIsInRyaW0iLCJsZW5ndGgiLCIkYXBwbHkiLCJpbnB1dCIsImUiLCJkZXRhaWwiLCJ2YWx1ZSIsImV2ZW50cyIsInBvc3REYXRhIiwibmFtZSIsIndlcHkiLCJjb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQ0E7Ozs7QUFFQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxHOzs7Ozs7Ozs7Ozs7OztvTEFDakJDLEssR0FBUTtBQUNKQyxxQkFBUztBQUNMQyxzQkFBTUM7QUFERDtBQURMLFMsUUFLUkMsSSxHQUFPO0FBQ0hILHFCQUFTLEtBRE47QUFFSEkscUJBQVMsRUFGTjtBQUdIQyxtQkFBTyxNQUhKO0FBSUhDLHlCQUFhO0FBSlYsUyxRQU1QQyxPLEdBQVU7QUFDTkMsaUJBRE0sbUJBQ0U7QUFDSixxQkFBS0MsS0FBTCxDQUFXLE9BQVg7QUFDQSxxQkFBS0osS0FBTCxHQUFhLE1BQWI7QUFDQSxxQkFBS0MsV0FBTCxHQUFtQixJQUFuQjtBQUNBLHFCQUFLRixPQUFMLEdBQWUsRUFBZjtBQUNILGFBTks7QUFPQU0sZUFQQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQVFGQyw0Q0FBUUMsR0FBUixDQUFZLEtBQUtSLE9BQWpCO0FBQ01BLDJDQVRKLEdBU2MsS0FBS0EsT0FBTCxDQUFhUyxJQUFiLEVBVGQ7O0FBQUEsd0NBVUcsS0FBS1QsT0FWUjtBQUFBO0FBQUE7QUFBQTs7QUFXRSxzREFBTSxTQUFOO0FBWEY7O0FBQUE7QUFBQSwwQ0FjRUEsUUFBUVUsTUFBUixHQUFpQixFQWRuQjtBQUFBO0FBQUE7QUFBQTs7QUFlRSxzREFBTSxRQUFOO0FBZkY7O0FBQUE7QUFrQkYseUNBQUtMLEtBQUwsQ0FBVyxVQUFYLEVBQXVCLEtBQUtMLE9BQTVCO0FBQ0EseUNBQUtBLE9BQUwsR0FBZSxFQUFmO0FBQ0EseUNBQUtXLE1BQUw7O0FBcEJFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBc0JOQyxpQkF0Qk0saUJBc0JBQyxDQXRCQSxFQXNCRztBQUNMLHFCQUFLYixPQUFMLEdBQWVhLEVBQUVDLE1BQUYsQ0FBU0MsS0FBeEI7QUFDSDtBQXhCSyxTLFFBMEJWQyxNLEdBQVM7QUFDTEMsc0JBQVUsa0JBQUNDLElBQUQsRUFBVTtBQUNoQlgsd0JBQVFDLEdBQVIsQ0FBWSxhQUFaLEVBQTJCVSxJQUEzQjtBQUNBLG9CQUFJQSxJQUFKLEVBQVU7QUFDTiwwQkFBS2pCLEtBQUwsR0FBYSxNQUFiO0FBQ0EsMEJBQUtDLFdBQUwsR0FBbUIsSUFBbkI7QUFDQSwwQkFBS0YsT0FBTCxHQUFla0IsSUFBZjtBQUNILGlCQUpELE1BSU87QUFDSCwwQkFBS2pCLEtBQUwsR0FBYSxNQUFiO0FBQ0EsMEJBQUtDLFdBQUwsR0FBbUIsSUFBbkI7QUFDQSwwQkFBS0YsT0FBTCxHQUFlLEVBQWY7QUFDSDtBQUNELHNCQUFLVyxNQUFMO0FBQ0g7QUFiSSxTOzs7OztpQ0FlQSxDQUNSOzs7O0VBdEQ0QlEsZUFBS0MsUzs7a0JBQWpCMUIsRyIsImZpbGUiOiJEaWFsb2cuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuXG5pbXBvcnQgeyB0b2FzdCB9IGZyb20gJy4uL3V0aWxzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9wIGV4dGVuZHMgd2VweS5jb21wb25lbnQge1xuICAgIHByb3BzID0ge1xuICAgICAgICBzaG93UG9wOiB7XG4gICAgICAgICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgICB9LFxuICAgIH1cbiAgICBkYXRhID0ge1xuICAgICAgICBzaG93UG9wOiBmYWxzZSxcbiAgICAgICAgY29udGVudDogJycsXG4gICAgICAgIHRpdGxlOiAn5paw5bu65YiG57uEJyxcbiAgICAgICAgc3VyZWJ0blRleHQ6ICfliJvlu7onLFxuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgICAgICBjbG9zZSgpIHtcbiAgICAgICAgICAgIHRoaXMuJGVtaXQoJ2Nsb3NlJyk7XG4gICAgICAgICAgICB0aGlzLnRpdGxlID0gJ+aWsOW7uuWIhue7hCc7XG4gICAgICAgICAgICB0aGlzLnN1cmVidG5UZXh0ID0gJ+WIm+W7uic7XG4gICAgICAgICAgICB0aGlzLmNvbnRlbnQgPSAnJztcbiAgICAgICAgfSxcbiAgICAgICAgYXN5bmMgYWRkKCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5jb250ZW50KTtcbiAgICAgICAgICAgIGNvbnN0IGNvbnRlbnQgPSB0aGlzLmNvbnRlbnQudHJpbSgpO1xuICAgICAgICAgICAgaWYgKCF0aGlzLmNvbnRlbnQpIHtcbiAgICAgICAgICAgICAgICB0b2FzdCgn6K+35aGr5YaZ5YiG57uE5ZCN56ewJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNvbnRlbnQubGVuZ3RoID4gMTUpIHtcbiAgICAgICAgICAgICAgICB0b2FzdCgn5YiG57uE5ZCN56ew6L+H6ZW/Jyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy4kZW1pdCgnYWRkR3JvdXAnLCB0aGlzLmNvbnRlbnQpO1xuICAgICAgICAgICAgdGhpcy5jb250ZW50ID0gJyc7XG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgICB9LFxuICAgICAgICBpbnB1dChlKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRlbnQgPSBlLmRldGFpbC52YWx1ZTtcbiAgICAgICAgfSxcbiAgICB9XG4gICAgZXZlbnRzID0ge1xuICAgICAgICBwb3N0RGF0YTogKG5hbWUpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCc9PT09PT09PT09PScsIG5hbWUpO1xuICAgICAgICAgICAgaWYgKG5hbWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRpdGxlID0gJ+e8lui+keWIhue7hCc7XG4gICAgICAgICAgICAgICAgdGhpcy5zdXJlYnRuVGV4dCA9ICfnoa7lrponO1xuICAgICAgICAgICAgICAgIHRoaXMuY29udGVudCA9IG5hbWU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMudGl0bGUgPSAn5paw5bu65YiG57uEJztcbiAgICAgICAgICAgICAgICB0aGlzLnN1cmVidG5UZXh0ID0gJ+WIm+W7uic7XG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZW50ID0gJyc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgICB9LFxuICAgIH1cbiAgICBvbkxvYWQoKSB7XG4gICAgfVxufVxuIl19