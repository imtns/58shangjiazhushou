'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _globalService = require('./../utils/globalService.js');

var _globalService2 = _interopRequireDefault(_globalService);

var _utils = require('./../utils/index.js');

var _coupon = require('./../mixin/coupon.js');

var _coupon2 = _interopRequireDefault(_coupon);

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
            navigationBarTitleText: '生效时间'
        }, _this.mixins = [_coupon2.default], _this.data = {
            validType: 1, // 1 固定时间，2 领取后生效
            validDays: null,
            validAfterDays: null,
            validStarttime: '',
            validEndtime: '',
            formatValidEndtime: '',
            formatValidStarttime: ''
        }, _this.methods = {
            dataAction: function dataAction(prop, v) {
                var value = v;
                // 数据预处理
                if (prop === 'validType') {
                    value = +value;
                } else {
                    value = value && value.detail && value.detail.value;
                }

                // 数据校验
                var validate = this.validator(prop, value);
                if (!validate.result) {
                    (0, _utils.alert)(validate.msg);
                    return;
                }

                this[prop] = value;
                this.updateData();
            }
        }, _this.computed = {
            formatValidStarttime: function formatValidStarttime() {
                return this.formatTime(this.validStarttime || '');
            },
            formatValidEndtime: function formatValidEndtime() {
                return this.formatTime(this.validEndtime || '');
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Index, [{
        key: 'onLoad',
        value: function onLoad() {
            var couponManage = _globalService2.default.get('couponManage');
            Object.assign(this, couponManage);
            this.updateData();
        }
    }, {
        key: 'validator',
        value: function validator(prop, v) {
            var value = v;
            var validData = Object.assign({}, this);
            validData[prop] = value;

            var validStarttime = validData.validStarttime,
                validEndtime = validData.validEndtime;


            if (validStarttime && validEndtime && validStarttime > validEndtime) {
                return {
                    result: false,
                    msg: '优惠结束时间不能小于开始时间！'
                };
            }

            return {
                result: true,
                msg: 'ok'
            };
        }
    }, {
        key: 'updateData',
        value: function updateData() {
            var couponManage = _globalService2.default.get('couponManage');
            _globalService2.default.set('couponManage', Object.assign(couponManage, {
                validType: this.validType,
                validDays: this.validDays,
                validAfterDays: this.validAfterDays,
                validStarttime: this.validStarttime,
                validEndtime: this.validEndtime
            }));
        }
    }]);

    return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/couponValidTime'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvdXBvblZhbGlkVGltZS5qcyJdLCJuYW1lcyI6WyJJbmRleCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJtaXhpbnMiLCJDb3Vwb25NaXhpbiIsImRhdGEiLCJ2YWxpZFR5cGUiLCJ2YWxpZERheXMiLCJ2YWxpZEFmdGVyRGF5cyIsInZhbGlkU3RhcnR0aW1lIiwidmFsaWRFbmR0aW1lIiwiZm9ybWF0VmFsaWRFbmR0aW1lIiwiZm9ybWF0VmFsaWRTdGFydHRpbWUiLCJtZXRob2RzIiwiZGF0YUFjdGlvbiIsInByb3AiLCJ2IiwidmFsdWUiLCJkZXRhaWwiLCJ2YWxpZGF0ZSIsInZhbGlkYXRvciIsInJlc3VsdCIsIm1zZyIsInVwZGF0ZURhdGEiLCJjb21wdXRlZCIsImZvcm1hdFRpbWUiLCJjb3Vwb25NYW5hZ2UiLCJnbG9iYWxTZXJ2aWNlIiwiZ2V0IiwiT2JqZWN0IiwiYXNzaWduIiwidmFsaWREYXRhIiwic2V0Iiwid2VweSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7SUFFcUJBLEs7Ozs7Ozs7Ozs7Ozs7O3dMQUNqQkMsTSxHQUFTO0FBQ0xDLG9DQUF3QjtBQURuQixTLFFBSVRDLE0sR0FBUyxDQUFDQyxnQkFBRCxDLFFBRVRDLEksR0FBTztBQUNIQyx1QkFBVyxDQURSLEVBQ1c7QUFDZEMsdUJBQVcsSUFGUjtBQUdIQyw0QkFBZ0IsSUFIYjtBQUlIQyw0QkFBZ0IsRUFKYjtBQUtIQywwQkFBYyxFQUxYO0FBTUhDLGdDQUFvQixFQU5qQjtBQU9IQyxrQ0FBc0I7QUFQbkIsUyxRQVVQQyxPLEdBQVU7QUFDTkMsc0JBRE0sc0JBQ0tDLElBREwsRUFDV0MsQ0FEWCxFQUNjO0FBQ2hCLG9CQUFJQyxRQUFRRCxDQUFaO0FBQ0E7QUFDQSxvQkFBSUQsU0FBUyxXQUFiLEVBQTBCO0FBQ3RCRSw0QkFBUSxDQUFDQSxLQUFUO0FBQ0gsaUJBRkQsTUFFTztBQUNIQSw0QkFBUUEsU0FBU0EsTUFBTUMsTUFBZixJQUF5QkQsTUFBTUMsTUFBTixDQUFhRCxLQUE5QztBQUNIOztBQUVEO0FBQ0Esb0JBQU1FLFdBQVcsS0FBS0MsU0FBTCxDQUFlTCxJQUFmLEVBQXFCRSxLQUFyQixDQUFqQjtBQUNBLG9CQUFJLENBQUNFLFNBQVNFLE1BQWQsRUFBc0I7QUFDbEIsc0NBQU1GLFNBQVNHLEdBQWY7QUFDQTtBQUNIOztBQUVELHFCQUFLUCxJQUFMLElBQWFFLEtBQWI7QUFDQSxxQkFBS00sVUFBTDtBQUNIO0FBbkJLLFMsUUFzQlZDLFEsR0FBVztBQUNQWixnQ0FETyxrQ0FDZ0I7QUFDbkIsdUJBQU8sS0FBS2EsVUFBTCxDQUFnQixLQUFLaEIsY0FBTCxJQUF1QixFQUF2QyxDQUFQO0FBQ0gsYUFITTtBQUlQRSw4QkFKTyxnQ0FJYztBQUNqQix1QkFBTyxLQUFLYyxVQUFMLENBQWdCLEtBQUtmLFlBQUwsSUFBcUIsRUFBckMsQ0FBUDtBQUNIO0FBTk0sUzs7Ozs7aUNBU0Y7QUFDTCxnQkFBTWdCLGVBQWVDLHdCQUFjQyxHQUFkLENBQWtCLGNBQWxCLENBQXJCO0FBQ0FDLG1CQUFPQyxNQUFQLENBQWMsSUFBZCxFQUFvQkosWUFBcEI7QUFDQSxpQkFBS0gsVUFBTDtBQUNIOzs7a0NBRVNSLEksRUFBTUMsQyxFQUFHO0FBQ2YsZ0JBQU1DLFFBQVFELENBQWQ7QUFDQSxnQkFBTWUsWUFBWUYsT0FBT0MsTUFBUCxDQUFjLEVBQWQsRUFBa0IsSUFBbEIsQ0FBbEI7QUFDQUMsc0JBQVVoQixJQUFWLElBQWtCRSxLQUFsQjs7QUFIZSxnQkFLUFIsY0FMTyxHQUswQnNCLFNBTDFCLENBS1B0QixjQUxPO0FBQUEsZ0JBS1NDLFlBTFQsR0FLMEJxQixTQUwxQixDQUtTckIsWUFMVDs7O0FBT2YsZ0JBQUlELGtCQUFrQkMsWUFBbEIsSUFBa0NELGlCQUFpQkMsWUFBdkQsRUFBcUU7QUFDakUsdUJBQU87QUFDSFcsNEJBQVEsS0FETDtBQUVIQyx5QkFBSztBQUZGLGlCQUFQO0FBSUg7O0FBRUQsbUJBQU87QUFDSEQsd0JBQVEsSUFETDtBQUVIQyxxQkFBSztBQUZGLGFBQVA7QUFJSDs7O3FDQUVZO0FBQ1QsZ0JBQU1JLGVBQWVDLHdCQUFjQyxHQUFkLENBQWtCLGNBQWxCLENBQXJCO0FBQ0FELG9DQUFjSyxHQUFkLENBQWtCLGNBQWxCLEVBQWtDSCxPQUFPQyxNQUFQLENBQWNKLFlBQWQsRUFBNEI7QUFDMURwQiwyQkFBVyxLQUFLQSxTQUQwQztBQUUxREMsMkJBQVcsS0FBS0EsU0FGMEM7QUFHMURDLGdDQUFnQixLQUFLQSxjQUhxQztBQUkxREMsZ0NBQWdCLEtBQUtBLGNBSnFDO0FBSzFEQyw4QkFBYyxLQUFLQTtBQUx1QyxhQUE1QixDQUFsQztBQU9IOzs7O0VBbkY4QnVCLGVBQUtDLEk7O2tCQUFuQmxDLEsiLCJmaWxlIjoiY291cG9uVmFsaWRUaW1lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbmltcG9ydCBnbG9iYWxTZXJ2aWNlIGZyb20gJy4uL3V0aWxzL2dsb2JhbFNlcnZpY2UnO1xuaW1wb3J0IHsgYWxlcnQgfSBmcm9tICcuLi91dGlscyc7XG5cbmltcG9ydCBDb3Vwb25NaXhpbiBmcm9tICcuLi9taXhpbi9jb3Vwb24nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn55Sf5pWI5pe26Ze0JyxcbiAgICB9XG5cbiAgICBtaXhpbnMgPSBbQ291cG9uTWl4aW5dXG5cbiAgICBkYXRhID0ge1xuICAgICAgICB2YWxpZFR5cGU6IDEsIC8vIDEg5Zu65a6a5pe26Ze077yMMiDpooblj5blkI7nlJ/mlYhcbiAgICAgICAgdmFsaWREYXlzOiBudWxsLFxuICAgICAgICB2YWxpZEFmdGVyRGF5czogbnVsbCxcbiAgICAgICAgdmFsaWRTdGFydHRpbWU6ICcnLFxuICAgICAgICB2YWxpZEVuZHRpbWU6ICcnLFxuICAgICAgICBmb3JtYXRWYWxpZEVuZHRpbWU6ICcnLFxuICAgICAgICBmb3JtYXRWYWxpZFN0YXJ0dGltZTogJycsXG4gICAgfVxuXG4gICAgbWV0aG9kcyA9IHtcbiAgICAgICAgZGF0YUFjdGlvbihwcm9wLCB2KSB7XG4gICAgICAgICAgICBsZXQgdmFsdWUgPSB2O1xuICAgICAgICAgICAgLy8g5pWw5o2u6aKE5aSE55CGXG4gICAgICAgICAgICBpZiAocHJvcCA9PT0gJ3ZhbGlkVHlwZScpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9ICt2YWx1ZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZSAmJiB2YWx1ZS5kZXRhaWwgJiYgdmFsdWUuZGV0YWlsLnZhbHVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyDmlbDmja7moKHpqoxcbiAgICAgICAgICAgIGNvbnN0IHZhbGlkYXRlID0gdGhpcy52YWxpZGF0b3IocHJvcCwgdmFsdWUpO1xuICAgICAgICAgICAgaWYgKCF2YWxpZGF0ZS5yZXN1bHQpIHtcbiAgICAgICAgICAgICAgICBhbGVydCh2YWxpZGF0ZS5tc2cpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpc1twcm9wXSA9IHZhbHVlO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVEYXRhKCk7XG4gICAgICAgIH0sXG4gICAgfVxuXG4gICAgY29tcHV0ZWQgPSB7XG4gICAgICAgIGZvcm1hdFZhbGlkU3RhcnR0aW1lKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZm9ybWF0VGltZSh0aGlzLnZhbGlkU3RhcnR0aW1lIHx8ICcnKTtcbiAgICAgICAgfSxcbiAgICAgICAgZm9ybWF0VmFsaWRFbmR0aW1lKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZm9ybWF0VGltZSh0aGlzLnZhbGlkRW5kdGltZSB8fCAnJyk7XG4gICAgICAgIH0sXG4gICAgfVxuXG4gICAgb25Mb2FkKCkge1xuICAgICAgICBjb25zdCBjb3Vwb25NYW5hZ2UgPSBnbG9iYWxTZXJ2aWNlLmdldCgnY291cG9uTWFuYWdlJyk7XG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcywgY291cG9uTWFuYWdlKTtcbiAgICAgICAgdGhpcy51cGRhdGVEYXRhKCk7XG4gICAgfVxuXG4gICAgdmFsaWRhdG9yKHByb3AsIHYpIHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSB2O1xuICAgICAgICBjb25zdCB2YWxpZERhdGEgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzKTtcbiAgICAgICAgdmFsaWREYXRhW3Byb3BdID0gdmFsdWU7XG5cbiAgICAgICAgY29uc3QgeyB2YWxpZFN0YXJ0dGltZSwgdmFsaWRFbmR0aW1lIH0gPSB2YWxpZERhdGE7XG5cbiAgICAgICAgaWYgKHZhbGlkU3RhcnR0aW1lICYmIHZhbGlkRW5kdGltZSAmJiB2YWxpZFN0YXJ0dGltZSA+IHZhbGlkRW5kdGltZSkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByZXN1bHQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIG1zZzogJ+S8mOaDoOe7k+adn+aXtumXtOS4jeiDveWwj+S6juW8gOWni+aXtumXtO+8gScsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHJlc3VsdDogdHJ1ZSxcbiAgICAgICAgICAgIG1zZzogJ29rJyxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICB1cGRhdGVEYXRhKCkge1xuICAgICAgICBjb25zdCBjb3Vwb25NYW5hZ2UgPSBnbG9iYWxTZXJ2aWNlLmdldCgnY291cG9uTWFuYWdlJyk7XG4gICAgICAgIGdsb2JhbFNlcnZpY2Uuc2V0KCdjb3Vwb25NYW5hZ2UnLCBPYmplY3QuYXNzaWduKGNvdXBvbk1hbmFnZSwge1xuICAgICAgICAgICAgdmFsaWRUeXBlOiB0aGlzLnZhbGlkVHlwZSxcbiAgICAgICAgICAgIHZhbGlkRGF5czogdGhpcy52YWxpZERheXMsXG4gICAgICAgICAgICB2YWxpZEFmdGVyRGF5czogdGhpcy52YWxpZEFmdGVyRGF5cyxcbiAgICAgICAgICAgIHZhbGlkU3RhcnR0aW1lOiB0aGlzLnZhbGlkU3RhcnR0aW1lLFxuICAgICAgICAgICAgdmFsaWRFbmR0aW1lOiB0aGlzLnZhbGlkRW5kdGltZSxcbiAgICAgICAgfSkpO1xuICAgIH1cbn1cbiJdfQ==