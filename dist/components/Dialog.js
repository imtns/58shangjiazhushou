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
            content: ''
        }, _this.methods = {
            close: function close() {
                this.$emit('close');
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

                                case 10:
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
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Pop, [{
        key: 'onLoad',
        value: function onLoad() {
            console.log('onLoad');
        }
    }]);

    return Pop;
}(_wepy2.default.component);

exports.default = Pop;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkRpYWxvZy5qcyJdLCJuYW1lcyI6WyJQb3AiLCJwcm9wcyIsInNob3dQb3AiLCJ0eXBlIiwiQm9vbGVhbiIsImRhdGEiLCJjb250ZW50IiwibWV0aG9kcyIsImNsb3NlIiwiJGVtaXQiLCJhZGQiLCJjb25zb2xlIiwibG9nIiwidHJpbSIsImxlbmd0aCIsImlucHV0IiwiZSIsImRldGFpbCIsInZhbHVlIiwid2VweSIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFDQTs7OztBQUVBOzs7Ozs7Ozs7Ozs7SUFFcUJBLEc7Ozs7Ozs7Ozs7Ozs7O29MQUNqQkMsSyxHQUFRO0FBQ0pDLHFCQUFTO0FBQ0xDLHNCQUFNQztBQUREO0FBREwsUyxRQUtSQyxJLEdBQU87QUFDSEgscUJBQVMsS0FETjtBQUVISSxxQkFBUztBQUZOLFMsUUFJUEMsTyxHQUFVO0FBQ05DLGlCQURNLG1CQUNFO0FBQ0oscUJBQUtDLEtBQUwsQ0FBVyxPQUFYO0FBQ0gsYUFISztBQUlBQyxlQUpBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBS0ZDLDRDQUFRQyxHQUFSLENBQVksS0FBS04sT0FBakI7QUFDTUEsMkNBTkosR0FNYyxLQUFLQSxPQUFMLENBQWFPLElBQWIsRUFOZDs7QUFBQSx3Q0FPRyxLQUFLUCxPQVBSO0FBQUE7QUFBQTtBQUFBOztBQVFFLHNEQUFNLFNBQU47QUFSRjs7QUFBQTtBQUFBLDBDQVdFQSxRQUFRUSxNQUFSLEdBQWlCLEVBWG5CO0FBQUE7QUFBQTtBQUFBOztBQVlFLHNEQUFNLFFBQU47QUFaRjs7QUFBQTtBQWVGLHlDQUFLTCxLQUFMLENBQVcsVUFBWCxFQUF1QixLQUFLSCxPQUE1QjtBQUNBLHlDQUFLQSxPQUFMLEdBQWUsRUFBZjs7QUFoQkU7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFrQk5TLGlCQWxCTSxpQkFrQkFDLENBbEJBLEVBa0JHO0FBQ0wscUJBQUtWLE9BQUwsR0FBZVUsRUFBRUMsTUFBRixDQUFTQyxLQUF4QjtBQUNIO0FBcEJLLFM7Ozs7O2lDQXNCRDtBQUNMUCxvQkFBUUMsR0FBUixDQUFZLFFBQVo7QUFDSDs7OztFQWxDNEJPLGVBQUtDLFM7O2tCQUFqQnBCLEciLCJmaWxlIjoiRGlhbG9nLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xyXG5cclxuaW1wb3J0IHsgdG9hc3QgfSBmcm9tICcuLi91dGlscyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb3AgZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XHJcbiAgICBwcm9wcyA9IHtcclxuICAgICAgICBzaG93UG9wOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IEJvb2xlYW4sXHJcbiAgICAgICAgfSxcclxuICAgIH1cclxuICAgIGRhdGEgPSB7XHJcbiAgICAgICAgc2hvd1BvcDogZmFsc2UsXHJcbiAgICAgICAgY29udGVudDogJycsXHJcbiAgICB9XHJcbiAgICBtZXRob2RzID0ge1xyXG4gICAgICAgIGNsb3NlKCkge1xyXG4gICAgICAgICAgICB0aGlzLiRlbWl0KCdjbG9zZScpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYXN5bmMgYWRkKCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmNvbnRlbnQpO1xyXG4gICAgICAgICAgICBjb25zdCBjb250ZW50ID0gdGhpcy5jb250ZW50LnRyaW0oKTtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmNvbnRlbnQpIHtcclxuICAgICAgICAgICAgICAgIHRvYXN0KCfor7floavlhpnliIbnu4TlkI3np7AnKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoY29udGVudC5sZW5ndGggPiAxNSkge1xyXG4gICAgICAgICAgICAgICAgdG9hc3QoJ+WIhue7hOWQjeensOi/h+mVvycpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuJGVtaXQoJ2FkZEdyb3VwJywgdGhpcy5jb250ZW50KTtcclxuICAgICAgICAgICAgdGhpcy5jb250ZW50ID0gJyc7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBpbnB1dChlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGVudCA9IGUuZGV0YWlsLnZhbHVlO1xyXG4gICAgICAgIH0sXHJcbiAgICB9XHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ29uTG9hZCcpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==