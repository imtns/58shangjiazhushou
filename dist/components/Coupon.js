'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
/**
 * @desc 优惠券组件，给用户看的
 */

var Index = function (_wepy$component) {
    _inherits(Index, _wepy$component);

    function Index() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Index);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.props = {
            coupons: Array,
            viewType: String
        }, _this.data = {
            coupons: []
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    return Index;
}(_wepy2.default.component);

exports.default = Index;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNvdXBvbi5qcyJdLCJuYW1lcyI6WyJJbmRleCIsInByb3BzIiwiY291cG9ucyIsIkFycmF5Iiwidmlld1R5cGUiLCJTdHJpbmciLCJkYXRhIiwid2VweSIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBS0E7Ozs7Ozs7Ozs7O0FBSkE7Ozs7SUFPcUJBLEs7Ozs7Ozs7Ozs7Ozs7O3dMQUNqQkMsSyxHQUFRO0FBQ0pDLHFCQUFTQyxLQURMO0FBRUpDLHNCQUFVQztBQUZOLFMsUUFLUkMsSSxHQUFPO0FBQ0hKLHFCQUFTO0FBRE4sUzs7OztFQU53QkssZUFBS0MsUzs7a0JBQW5CUixLIiwiZmlsZSI6IkNvdXBvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuLyoqXG4gKiBAZGVzYyDkvJjmg6DliLjnu4Tku7bvvIznu5nnlKjmiLfnnIvnmoRcbiAqL1xuXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcbiAgICBwcm9wcyA9IHtcbiAgICAgICAgY291cG9uczogQXJyYXksXG4gICAgICAgIHZpZXdUeXBlOiBTdHJpbmcsXG4gICAgfVxuXG4gICAgZGF0YSA9IHtcbiAgICAgICAgY291cG9uczogW10sXG4gICAgfVxufVxuIl19