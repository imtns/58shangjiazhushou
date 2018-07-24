'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _globalService = require('./../utils/globalService.js');

var _globalService2 = _interopRequireDefault(_globalService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            navigationBarTitleText: '优惠券类型'
        }, _this.data = {
            couponType: 1, // 1 代金券，2 折扣券
            couponDiscard: null, // 折扣
            reliefAmount: null, // 满减
            limitAmount: null
        }, _this.methods = {
            dataAction: function dataAction(prop, v) {
                var value = v;
                if (prop === 'couponType') {
                    value = +value;
                } else {
                    value = value && value.detail && value.detail.value;
                }

                if (prop === 'couponDiscard') {
                    value *= 10;
                }

                this[prop] = value;
                this.updateData();
            }
        }, _this.computed = {
            formatCouponDiscard: function formatCouponDiscard() {
                return this.couponDiscard / 10;
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Index, [{
        key: 'onLoad',
        value: function onLoad() {
            var couponManage = _globalService2.default.get('couponManage');
            console.log(couponManage);
            Object.assign(this, couponManage);
            this.updateData();
        }

        // 更新全局状态

    }, {
        key: 'updateData',
        value: function updateData() {
            var couponManage = _globalService2.default.get('couponManage');
            _globalService2.default.set('couponManage', Object.assign(couponManage, {
                couponType: this.couponType,
                couponDiscard: this.couponDiscard,
                reliefAmount: this.reliefAmount,
                limitAmount: this.limitAmount
            }));
        }
    }]);

    return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/couponType'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvdXBvblR5cGUuanMiXSwibmFtZXMiOlsiSW5kZXgiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsImNvdXBvblR5cGUiLCJjb3Vwb25EaXNjYXJkIiwicmVsaWVmQW1vdW50IiwibGltaXRBbW91bnQiLCJtZXRob2RzIiwiZGF0YUFjdGlvbiIsInByb3AiLCJ2IiwidmFsdWUiLCJkZXRhaWwiLCJ1cGRhdGVEYXRhIiwiY29tcHV0ZWQiLCJmb3JtYXRDb3Vwb25EaXNjYXJkIiwiY291cG9uTWFuYWdlIiwiZ2xvYmFsU2VydmljZSIsImdldCIsImNvbnNvbGUiLCJsb2ciLCJPYmplY3QiLCJhc3NpZ24iLCJzZXQiLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFDQTs7OztBQUVBOzs7Ozs7Ozs7Ozs7SUFFcUJBLEs7Ozs7Ozs7Ozs7Ozs7O3dMQUNqQkMsTSxHQUFTO0FBQ0xDLG9DQUF3QjtBQURuQixTLFFBSVRDLEksR0FBTztBQUNIQyx3QkFBWSxDQURULEVBQ1k7QUFDZkMsMkJBQWUsSUFGWixFQUVrQjtBQUNyQkMsMEJBQWMsSUFIWCxFQUdpQjtBQUNwQkMseUJBQWE7QUFKVixTLFFBT1BDLE8sR0FBVTtBQUNOQyxzQkFETSxzQkFDS0MsSUFETCxFQUNXQyxDQURYLEVBQ2M7QUFDaEIsb0JBQUlDLFFBQVFELENBQVo7QUFDQSxvQkFBSUQsU0FBUyxZQUFiLEVBQTJCO0FBQ3ZCRSw0QkFBUSxDQUFDQSxLQUFUO0FBQ0gsaUJBRkQsTUFFTztBQUNIQSw0QkFBUUEsU0FBU0EsTUFBTUMsTUFBZixJQUF5QkQsTUFBTUMsTUFBTixDQUFhRCxLQUE5QztBQUNIOztBQUVELG9CQUFJRixTQUFTLGVBQWIsRUFBOEI7QUFDMUJFLDZCQUFTLEVBQVQ7QUFDSDs7QUFFRCxxQkFBS0YsSUFBTCxJQUFhRSxLQUFiO0FBQ0EscUJBQUtFLFVBQUw7QUFDSDtBQWZLLFMsUUFrQlZDLFEsR0FBVztBQUNQQywrQkFETyxpQ0FDZTtBQUNsQix1QkFBTyxLQUFLWCxhQUFMLEdBQXFCLEVBQTVCO0FBQ0g7QUFITSxTOzs7OztpQ0FNRjtBQUNMLGdCQUFNWSxlQUFlQyx3QkFBY0MsR0FBZCxDQUFrQixjQUFsQixDQUFyQjtBQUNBQyxvQkFBUUMsR0FBUixDQUFZSixZQUFaO0FBQ0FLLG1CQUFPQyxNQUFQLENBQWMsSUFBZCxFQUFvQk4sWUFBcEI7QUFDQSxpQkFBS0gsVUFBTDtBQUNIOztBQUVEOzs7O3FDQUNhO0FBQ1QsZ0JBQU1HLGVBQWVDLHdCQUFjQyxHQUFkLENBQWtCLGNBQWxCLENBQXJCO0FBQ0FELG9DQUFjTSxHQUFkLENBQWtCLGNBQWxCLEVBQWtDRixPQUFPQyxNQUFQLENBQWNOLFlBQWQsRUFBNEI7QUFDMURiLDRCQUFZLEtBQUtBLFVBRHlDO0FBRTFEQywrQkFBZSxLQUFLQSxhQUZzQztBQUcxREMsOEJBQWMsS0FBS0EsWUFIdUM7QUFJMURDLDZCQUFhLEtBQUtBO0FBSndDLGFBQTVCLENBQWxDO0FBTUg7Ozs7RUFwRDhCa0IsZUFBS0MsSTs7a0JBQW5CMUIsSyIsImZpbGUiOiJjb3Vwb25UeXBlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcblxuaW1wb3J0IGdsb2JhbFNlcnZpY2UgZnJvbSAnLi4vdXRpbHMvZ2xvYmFsU2VydmljZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfkvJjmg6DliLjnsbvlnosnLFxuICAgIH1cblxuICAgIGRhdGEgPSB7XG4gICAgICAgIGNvdXBvblR5cGU6IDEsIC8vIDEg5Luj6YeR5Yi477yMMiDmipjmiaPliLhcbiAgICAgICAgY291cG9uRGlzY2FyZDogbnVsbCwgLy8g5oqY5omjXG4gICAgICAgIHJlbGllZkFtb3VudDogbnVsbCwgLy8g5ruh5YePXG4gICAgICAgIGxpbWl0QW1vdW50OiBudWxsLFxuICAgIH1cblxuICAgIG1ldGhvZHMgPSB7XG4gICAgICAgIGRhdGFBY3Rpb24ocHJvcCwgdikge1xuICAgICAgICAgICAgbGV0IHZhbHVlID0gdjtcbiAgICAgICAgICAgIGlmIChwcm9wID09PSAnY291cG9uVHlwZScpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9ICt2YWx1ZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZSAmJiB2YWx1ZS5kZXRhaWwgJiYgdmFsdWUuZGV0YWlsLnZhbHVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAocHJvcCA9PT0gJ2NvdXBvbkRpc2NhcmQnKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgKj0gMTA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXNbcHJvcF0gPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlRGF0YSgpO1xuICAgICAgICB9LFxuICAgIH1cblxuICAgIGNvbXB1dGVkID0ge1xuICAgICAgICBmb3JtYXRDb3Vwb25EaXNjYXJkKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY291cG9uRGlzY2FyZCAvIDEwO1xuICAgICAgICB9LFxuICAgIH1cblxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgY29uc3QgY291cG9uTWFuYWdlID0gZ2xvYmFsU2VydmljZS5nZXQoJ2NvdXBvbk1hbmFnZScpO1xuICAgICAgICBjb25zb2xlLmxvZyhjb3Vwb25NYW5hZ2UpO1xuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMsIGNvdXBvbk1hbmFnZSk7XG4gICAgICAgIHRoaXMudXBkYXRlRGF0YSgpO1xuICAgIH1cblxuICAgIC8vIOabtOaWsOWFqOWxgOeKtuaAgVxuICAgIHVwZGF0ZURhdGEoKSB7XG4gICAgICAgIGNvbnN0IGNvdXBvbk1hbmFnZSA9IGdsb2JhbFNlcnZpY2UuZ2V0KCdjb3Vwb25NYW5hZ2UnKTtcbiAgICAgICAgZ2xvYmFsU2VydmljZS5zZXQoJ2NvdXBvbk1hbmFnZScsIE9iamVjdC5hc3NpZ24oY291cG9uTWFuYWdlLCB7XG4gICAgICAgICAgICBjb3Vwb25UeXBlOiB0aGlzLmNvdXBvblR5cGUsXG4gICAgICAgICAgICBjb3Vwb25EaXNjYXJkOiB0aGlzLmNvdXBvbkRpc2NhcmQsXG4gICAgICAgICAgICByZWxpZWZBbW91bnQ6IHRoaXMucmVsaWVmQW1vdW50LFxuICAgICAgICAgICAgbGltaXRBbW91bnQ6IHRoaXMubGltaXRBbW91bnQsXG4gICAgICAgIH0pKTtcbiAgICB9XG59XG4iXX0=