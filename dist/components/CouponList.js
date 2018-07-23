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
 * @desc 优惠券组件，提供查看优惠券使用状态，给商家看的
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
            isEditing: Boolean,
            size: String,
            chooseCoupon: Function
        }, _this.data = {
            coupons: [],
            isEditing: false
        }, _this.methods = {
            chooseCoupon: function chooseCoupon(index) {
                var coupon = this.coupons[index];
                coupon.checked = !coupon.checked;

                this.chooseCoupon && this.chooseCoupon(coupon);
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    return Index;
}(_wepy2.default.component);

exports.default = Index;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNvdXBvbkxpc3QuanMiXSwibmFtZXMiOlsiSW5kZXgiLCJwcm9wcyIsImNvdXBvbnMiLCJBcnJheSIsImlzRWRpdGluZyIsIkJvb2xlYW4iLCJzaXplIiwiU3RyaW5nIiwiY2hvb3NlQ291cG9uIiwiRnVuY3Rpb24iLCJkYXRhIiwibWV0aG9kcyIsImluZGV4IiwiY291cG9uIiwiY2hlY2tlZCIsIndlcHkiLCJjb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUlBOzs7Ozs7Ozs7OztBQUhBOzs7OztJQUtxQkEsSzs7Ozs7Ozs7Ozs7Ozs7d0xBQ2pCQyxLLEdBQVE7QUFDSkMscUJBQVNDLEtBREw7QUFFSkMsdUJBQVdDLE9BRlA7QUFHSkMsa0JBQU1DLE1BSEY7QUFJSkMsMEJBQWNDO0FBSlYsUyxRQU9SQyxJLEdBQU87QUFDSFIscUJBQVMsRUFETjtBQUVIRSx1QkFBVztBQUZSLFMsUUFLUE8sTyxHQUFVO0FBQ05ILHdCQURNLHdCQUNPSSxLQURQLEVBQ2M7QUFDaEIsb0JBQU1DLFNBQVMsS0FBS1gsT0FBTCxDQUFhVSxLQUFiLENBQWY7QUFDQUMsdUJBQU9DLE9BQVAsR0FBaUIsQ0FBQ0QsT0FBT0MsT0FBekI7O0FBRUEscUJBQUtOLFlBQUwsSUFBcUIsS0FBS0EsWUFBTCxDQUFrQkssTUFBbEIsQ0FBckI7QUFDSDtBQU5LLFM7Ozs7RUFicUJFLGVBQUtDLFM7O2tCQUFuQmhCLEsiLCJmaWxlIjoiQ291cG9uTGlzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4vKipcclxuICogQGRlc2Mg5LyY5oOg5Yi457uE5Lu277yM5o+Q5L6b5p+l55yL5LyY5oOg5Yi45L2/55So54q25oCB77yM57uZ5ZWG5a6255yL55qEXHJcbiAqL1xyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5jb21wb25lbnQge1xyXG4gICAgcHJvcHMgPSB7XHJcbiAgICAgICAgY291cG9uczogQXJyYXksXHJcbiAgICAgICAgaXNFZGl0aW5nOiBCb29sZWFuLFxyXG4gICAgICAgIHNpemU6IFN0cmluZyxcclxuICAgICAgICBjaG9vc2VDb3Vwb246IEZ1bmN0aW9uLFxyXG4gICAgfVxyXG5cclxuICAgIGRhdGEgPSB7XHJcbiAgICAgICAgY291cG9uczogW10sXHJcbiAgICAgICAgaXNFZGl0aW5nOiBmYWxzZSxcclxuICAgIH1cclxuXHJcbiAgICBtZXRob2RzID0ge1xyXG4gICAgICAgIGNob29zZUNvdXBvbihpbmRleCkge1xyXG4gICAgICAgICAgICBjb25zdCBjb3Vwb24gPSB0aGlzLmNvdXBvbnNbaW5kZXhdO1xyXG4gICAgICAgICAgICBjb3Vwb24uY2hlY2tlZCA9ICFjb3Vwb24uY2hlY2tlZDtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuY2hvb3NlQ291cG9uICYmIHRoaXMuY2hvb3NlQ291cG9uKGNvdXBvbik7XHJcbiAgICAgICAgfSxcclxuICAgIH1cclxufVxyXG4iXX0=