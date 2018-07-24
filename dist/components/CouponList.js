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
            choose: function choose(index, url) {
                if (this.isEditing) {
                    var coupon = this.coupons[index];
                    coupon.checked = !coupon.checked;

                    this.chooseCoupon && this.chooseCoupon(coupon);
                } else {
                    _wepy2.default.navigateTo({ url: url });
                }
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    return Index;
}(_wepy2.default.component);

exports.default = Index;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNvdXBvbkxpc3QuanMiXSwibmFtZXMiOlsiSW5kZXgiLCJwcm9wcyIsImNvdXBvbnMiLCJBcnJheSIsImlzRWRpdGluZyIsIkJvb2xlYW4iLCJzaXplIiwiU3RyaW5nIiwiY2hvb3NlQ291cG9uIiwiRnVuY3Rpb24iLCJkYXRhIiwibWV0aG9kcyIsImNob29zZSIsImluZGV4IiwidXJsIiwiY291cG9uIiwiY2hlY2tlZCIsIndlcHkiLCJuYXZpZ2F0ZVRvIiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFJQTs7Ozs7Ozs7Ozs7QUFIQTs7Ozs7SUFLcUJBLEs7Ozs7Ozs7Ozs7Ozs7O3dMQUNqQkMsSyxHQUFRO0FBQ0pDLHFCQUFTQyxLQURMO0FBRUpDLHVCQUFXQyxPQUZQO0FBR0pDLGtCQUFNQyxNQUhGO0FBSUpDLDBCQUFjQztBQUpWLFMsUUFPUkMsSSxHQUFPO0FBQ0hSLHFCQUFTLEVBRE47QUFFSEUsdUJBQVc7QUFGUixTLFFBS1BPLE8sR0FBVTtBQUNOQyxrQkFETSxrQkFDQ0MsS0FERCxFQUNRQyxHQURSLEVBQ2E7QUFDZixvQkFBSSxLQUFLVixTQUFULEVBQW9CO0FBQ2hCLHdCQUFNVyxTQUFTLEtBQUtiLE9BQUwsQ0FBYVcsS0FBYixDQUFmO0FBQ0FFLDJCQUFPQyxPQUFQLEdBQWlCLENBQUNELE9BQU9DLE9BQXpCOztBQUVBLHlCQUFLUixZQUFMLElBQXFCLEtBQUtBLFlBQUwsQ0FBa0JPLE1BQWxCLENBQXJCO0FBQ0gsaUJBTEQsTUFLTztBQUNIRSxtQ0FBS0MsVUFBTCxDQUFnQixFQUFFSixRQUFGLEVBQWhCO0FBQ0g7QUFDSjtBQVZLLFM7Ozs7RUFicUJHLGVBQUtFLFM7O2tCQUFuQm5CLEsiLCJmaWxlIjoiQ291cG9uTGlzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuLyoqXG4gKiBAZGVzYyDkvJjmg6DliLjnu4Tku7bvvIzmj5Dkvpvmn6XnnIvkvJjmg6DliLjkvb/nlKjnirbmgIHvvIznu5nllYblrrbnnIvnmoRcbiAqL1xuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5jb21wb25lbnQge1xuICAgIHByb3BzID0ge1xuICAgICAgICBjb3Vwb25zOiBBcnJheSxcbiAgICAgICAgaXNFZGl0aW5nOiBCb29sZWFuLFxuICAgICAgICBzaXplOiBTdHJpbmcsXG4gICAgICAgIGNob29zZUNvdXBvbjogRnVuY3Rpb24sXG4gICAgfVxuXG4gICAgZGF0YSA9IHtcbiAgICAgICAgY291cG9uczogW10sXG4gICAgICAgIGlzRWRpdGluZzogZmFsc2UsXG4gICAgfVxuXG4gICAgbWV0aG9kcyA9IHtcbiAgICAgICAgY2hvb3NlKGluZGV4LCB1cmwpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzRWRpdGluZykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvdXBvbiA9IHRoaXMuY291cG9uc1tpbmRleF07XG4gICAgICAgICAgICAgICAgY291cG9uLmNoZWNrZWQgPSAhY291cG9uLmNoZWNrZWQ7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmNob29zZUNvdXBvbiAmJiB0aGlzLmNob29zZUNvdXBvbihjb3Vwb24pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oeyB1cmwgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgfVxufVxuIl19