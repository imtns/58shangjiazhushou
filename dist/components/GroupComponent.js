'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GroupComponent = function (_wepy$component) {
    _inherits(GroupComponent, _wepy$component);

    function GroupComponent() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, GroupComponent);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = GroupComponent.__proto__ || Object.getPrototypeOf(GroupComponent)).call.apply(_ref, [this].concat(args))), _this), _this.data = {}, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(GroupComponent, [{
        key: 'onLoad',
        value: function onLoad() {
            console.log('onLoad');
        }
    }]);

    return GroupComponent;
}(_wepy2.default.component);

exports.default = GroupComponent;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkdyb3VwQ29tcG9uZW50LmpzIl0sIm5hbWVzIjpbIkdyb3VwQ29tcG9uZW50IiwiZGF0YSIsImNvbnNvbGUiLCJsb2ciLCJ3ZXB5IiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLGM7Ozs7Ozs7Ozs7Ozs7OzBNQUlqQkMsSSxHQUFPLEU7Ozs7O2lDQUhFO0FBQ0xDLG9CQUFRQyxHQUFSLENBQVksUUFBWjtBQUNIOzs7O0VBSHVDQyxlQUFLQyxTOztrQkFBNUJMLGMiLCJmaWxlIjoiR3JvdXBDb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHcm91cENvbXBvbmVudCBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnb25Mb2FkJyk7XHJcbiAgICB9XHJcbiAgICBkYXRhID0ge1xyXG4gICAgfVxyXG59XHJcbiJdfQ==