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

var _coupon = require('./../mixins/coupon.js');

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
            navigationBarTitleText: '优惠券类型'
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
                return this.formatTime(this.validStarttime);
            },
            formatValidEndtime: function formatValidEndtime() {
                return this.formatTime(this.validEndtime);
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvdXBvblZhbGlkVGltZS5qcyJdLCJuYW1lcyI6WyJJbmRleCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJtaXhpbnMiLCJDb3Vwb25NaXhpbiIsImRhdGEiLCJ2YWxpZFR5cGUiLCJ2YWxpZERheXMiLCJ2YWxpZEFmdGVyRGF5cyIsInZhbGlkU3RhcnR0aW1lIiwidmFsaWRFbmR0aW1lIiwiZm9ybWF0VmFsaWRFbmR0aW1lIiwiZm9ybWF0VmFsaWRTdGFydHRpbWUiLCJtZXRob2RzIiwiZGF0YUFjdGlvbiIsInByb3AiLCJ2IiwidmFsdWUiLCJkZXRhaWwiLCJ2YWxpZGF0ZSIsInZhbGlkYXRvciIsInJlc3VsdCIsIm1zZyIsInVwZGF0ZURhdGEiLCJjb21wdXRlZCIsImZvcm1hdFRpbWUiLCJjb3Vwb25NYW5hZ2UiLCJnbG9iYWxTZXJ2aWNlIiwiZ2V0IiwiT2JqZWN0IiwiYXNzaWduIiwidmFsaWREYXRhIiwic2V0Iiwid2VweSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7SUFFcUJBLEs7Ozs7Ozs7Ozs7Ozs7O3dMQUNqQkMsTSxHQUFTO0FBQ0xDLG9DQUF3QjtBQURuQixTLFFBSVRDLE0sR0FBUyxDQUFDQyxnQkFBRCxDLFFBRVRDLEksR0FBTztBQUNIQyx1QkFBVyxDQURSLEVBQ1c7QUFDZEMsdUJBQVcsSUFGUjtBQUdIQyw0QkFBZ0IsSUFIYjtBQUlIQyw0QkFBZ0IsRUFKYjtBQUtIQywwQkFBYyxFQUxYO0FBTUhDLGdDQUFvQixFQU5qQjtBQU9IQyxrQ0FBc0I7QUFQbkIsUyxRQVVQQyxPLEdBQVU7QUFDTkMsc0JBRE0sc0JBQ0tDLElBREwsRUFDV0MsQ0FEWCxFQUNjO0FBQ2hCLG9CQUFJQyxRQUFRRCxDQUFaO0FBQ0E7QUFDQSxvQkFBSUQsU0FBUyxXQUFiLEVBQTBCO0FBQ3RCRSw0QkFBUSxDQUFDQSxLQUFUO0FBQ0gsaUJBRkQsTUFFTztBQUNIQSw0QkFBUUEsU0FBU0EsTUFBTUMsTUFBZixJQUF5QkQsTUFBTUMsTUFBTixDQUFhRCxLQUE5QztBQUNIOztBQUVEO0FBQ0Esb0JBQU1FLFdBQVcsS0FBS0MsU0FBTCxDQUFlTCxJQUFmLEVBQXFCRSxLQUFyQixDQUFqQjtBQUNBLG9CQUFJLENBQUNFLFNBQVNFLE1BQWQsRUFBc0I7QUFDbEIsc0NBQU1GLFNBQVNHLEdBQWY7QUFDQTtBQUNIOztBQUVELHFCQUFLUCxJQUFMLElBQWFFLEtBQWI7QUFDQSxxQkFBS00sVUFBTDtBQUNIO0FBbkJLLFMsUUFzQlZDLFEsR0FBVztBQUNQWixnQ0FETyxrQ0FDZ0I7QUFDbkIsdUJBQU8sS0FBS2EsVUFBTCxDQUFnQixLQUFLaEIsY0FBckIsQ0FBUDtBQUNILGFBSE07QUFJUEUsOEJBSk8sZ0NBSWM7QUFDakIsdUJBQU8sS0FBS2MsVUFBTCxDQUFnQixLQUFLZixZQUFyQixDQUFQO0FBQ0g7QUFOTSxTOzs7OztpQ0FTRjtBQUNMLGdCQUFNZ0IsZUFBZUMsd0JBQWNDLEdBQWQsQ0FBa0IsY0FBbEIsQ0FBckI7QUFDQUMsbUJBQU9DLE1BQVAsQ0FBYyxJQUFkLEVBQW9CSixZQUFwQjtBQUNBLGlCQUFLSCxVQUFMO0FBQ0g7OztrQ0FFU1IsSSxFQUFNQyxDLEVBQUc7QUFDZixnQkFBTUMsUUFBUUQsQ0FBZDtBQUNBLGdCQUFNZSxZQUFZRixPQUFPQyxNQUFQLENBQWMsRUFBZCxFQUFrQixJQUFsQixDQUFsQjtBQUNBQyxzQkFBVWhCLElBQVYsSUFBa0JFLEtBQWxCOztBQUhlLGdCQUtQUixjQUxPLEdBSzBCc0IsU0FMMUIsQ0FLUHRCLGNBTE87QUFBQSxnQkFLU0MsWUFMVCxHQUswQnFCLFNBTDFCLENBS1NyQixZQUxUOzs7QUFPZixnQkFBSUQsa0JBQWtCQyxZQUFsQixJQUFrQ0QsaUJBQWlCQyxZQUF2RCxFQUFxRTtBQUNqRSx1QkFBTztBQUNIVyw0QkFBUSxLQURMO0FBRUhDLHlCQUFLO0FBRkYsaUJBQVA7QUFJSDs7QUFFRCxtQkFBTztBQUNIRCx3QkFBUSxJQURMO0FBRUhDLHFCQUFLO0FBRkYsYUFBUDtBQUlIOzs7cUNBRVk7QUFDVCxnQkFBTUksZUFBZUMsd0JBQWNDLEdBQWQsQ0FBa0IsY0FBbEIsQ0FBckI7QUFDQUQsb0NBQWNLLEdBQWQsQ0FBa0IsY0FBbEIsRUFBa0NILE9BQU9DLE1BQVAsQ0FBY0osWUFBZCxFQUE0QjtBQUMxRHBCLDJCQUFXLEtBQUtBLFNBRDBDO0FBRTFEQywyQkFBVyxLQUFLQSxTQUYwQztBQUcxREMsZ0NBQWdCLEtBQUtBLGNBSHFDO0FBSTFEQyxnQ0FBZ0IsS0FBS0EsY0FKcUM7QUFLMURDLDhCQUFjLEtBQUtBO0FBTHVDLGFBQTVCLENBQWxDO0FBT0g7Ozs7RUFuRjhCdUIsZUFBS0MsSTs7a0JBQW5CbEMsSyIsImZpbGUiOiJjb3Vwb25WYWxpZFRpbWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XHJcbmltcG9ydCBnbG9iYWxTZXJ2aWNlIGZyb20gJy4uL3V0aWxzL2dsb2JhbFNlcnZpY2UnO1xyXG5pbXBvcnQgeyBhbGVydCB9IGZyb20gJy4uL3V0aWxzJztcclxuXHJcbmltcG9ydCBDb3Vwb25NaXhpbiBmcm9tICcuLi9taXhpbnMvY291cG9uJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICAgIGNvbmZpZyA9IHtcclxuICAgICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5LyY5oOg5Yi457G75Z6LJyxcclxuICAgIH1cclxuXHJcbiAgICBtaXhpbnMgPSBbQ291cG9uTWl4aW5dXHJcblxyXG4gICAgZGF0YSA9IHtcclxuICAgICAgICB2YWxpZFR5cGU6IDEsIC8vIDEg5Zu65a6a5pe26Ze077yMMiDpooblj5blkI7nlJ/mlYhcclxuICAgICAgICB2YWxpZERheXM6IG51bGwsXHJcbiAgICAgICAgdmFsaWRBZnRlckRheXM6IG51bGwsXHJcbiAgICAgICAgdmFsaWRTdGFydHRpbWU6ICcnLFxyXG4gICAgICAgIHZhbGlkRW5kdGltZTogJycsXHJcbiAgICAgICAgZm9ybWF0VmFsaWRFbmR0aW1lOiAnJyxcclxuICAgICAgICBmb3JtYXRWYWxpZFN0YXJ0dGltZTogJycsXHJcbiAgICB9XHJcblxyXG4gICAgbWV0aG9kcyA9IHtcclxuICAgICAgICBkYXRhQWN0aW9uKHByb3AsIHYpIHtcclxuICAgICAgICAgICAgbGV0IHZhbHVlID0gdjtcclxuICAgICAgICAgICAgLy8g5pWw5o2u6aKE5aSE55CGXHJcbiAgICAgICAgICAgIGlmIChwcm9wID09PSAndmFsaWRUeXBlJykge1xyXG4gICAgICAgICAgICAgICAgdmFsdWUgPSArdmFsdWU7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlICYmIHZhbHVlLmRldGFpbCAmJiB2YWx1ZS5kZXRhaWwudmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIOaVsOaNruagoemqjFxyXG4gICAgICAgICAgICBjb25zdCB2YWxpZGF0ZSA9IHRoaXMudmFsaWRhdG9yKHByb3AsIHZhbHVlKTtcclxuICAgICAgICAgICAgaWYgKCF2YWxpZGF0ZS5yZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KHZhbGlkYXRlLm1zZyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXNbcHJvcF0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVEYXRhKCk7XHJcbiAgICAgICAgfSxcclxuICAgIH1cclxuXHJcbiAgICBjb21wdXRlZCA9IHtcclxuICAgICAgICBmb3JtYXRWYWxpZFN0YXJ0dGltZSgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZm9ybWF0VGltZSh0aGlzLnZhbGlkU3RhcnR0aW1lKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGZvcm1hdFZhbGlkRW5kdGltZSgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZm9ybWF0VGltZSh0aGlzLnZhbGlkRW5kdGltZSk7XHJcbiAgICAgICAgfSxcclxuICAgIH1cclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgY29uc3QgY291cG9uTWFuYWdlID0gZ2xvYmFsU2VydmljZS5nZXQoJ2NvdXBvbk1hbmFnZScpO1xyXG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcywgY291cG9uTWFuYWdlKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZURhdGEoKTtcclxuICAgIH1cclxuXHJcbiAgICB2YWxpZGF0b3IocHJvcCwgdikge1xyXG4gICAgICAgIGNvbnN0IHZhbHVlID0gdjtcclxuICAgICAgICBjb25zdCB2YWxpZERhdGEgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzKTtcclxuICAgICAgICB2YWxpZERhdGFbcHJvcF0gPSB2YWx1ZTtcclxuXHJcbiAgICAgICAgY29uc3QgeyB2YWxpZFN0YXJ0dGltZSwgdmFsaWRFbmR0aW1lIH0gPSB2YWxpZERhdGE7XHJcblxyXG4gICAgICAgIGlmICh2YWxpZFN0YXJ0dGltZSAmJiB2YWxpZEVuZHRpbWUgJiYgdmFsaWRTdGFydHRpbWUgPiB2YWxpZEVuZHRpbWUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBtc2c6ICfkvJjmg6Dnu5PmnZ/ml7bpl7TkuI3og73lsI/kuo7lvIDlp4vml7bpl7TvvIEnLFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgcmVzdWx0OiB0cnVlLFxyXG4gICAgICAgICAgICBtc2c6ICdvaycsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVEYXRhKCkge1xyXG4gICAgICAgIGNvbnN0IGNvdXBvbk1hbmFnZSA9IGdsb2JhbFNlcnZpY2UuZ2V0KCdjb3Vwb25NYW5hZ2UnKTtcclxuICAgICAgICBnbG9iYWxTZXJ2aWNlLnNldCgnY291cG9uTWFuYWdlJywgT2JqZWN0LmFzc2lnbihjb3Vwb25NYW5hZ2UsIHtcclxuICAgICAgICAgICAgdmFsaWRUeXBlOiB0aGlzLnZhbGlkVHlwZSxcclxuICAgICAgICAgICAgdmFsaWREYXlzOiB0aGlzLnZhbGlkRGF5cyxcclxuICAgICAgICAgICAgdmFsaWRBZnRlckRheXM6IHRoaXMudmFsaWRBZnRlckRheXMsXHJcbiAgICAgICAgICAgIHZhbGlkU3RhcnR0aW1lOiB0aGlzLnZhbGlkU3RhcnR0aW1lLFxyXG4gICAgICAgICAgICB2YWxpZEVuZHRpbWU6IHRoaXMudmFsaWRFbmR0aW1lLFxyXG4gICAgICAgIH0pKTtcclxuICAgIH1cclxufVxyXG4iXX0=