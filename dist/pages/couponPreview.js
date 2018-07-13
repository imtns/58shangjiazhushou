'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _CouponList = require('./../components/CouponList.js');

var _CouponList2 = _interopRequireDefault(_CouponList);

var _Coupon = require('./../components/Coupon.js');

var _Coupon2 = _interopRequireDefault(_Coupon);

var _coupon = require('./../mixins/coupon.js');

var _coupon2 = _interopRequireDefault(_coupon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

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
            navigationBarTitleText: '优惠券'
        }, _this.data = {
            coupons: [],
            isEditing: true,
            previewList: [],
            previewType: '', // 实际展现形式
            type: 'row' // 需要展现的形式
        }, _this.mixins = [_coupon2.default], _this.$repeat = {}, _this.$props = { "couponList": { "v-bind:coupons.sync": "coupons", "v-bind:isEditing.once": "isEditing", "size": "small", "v-bind:chooseCoupon.once": "chooseCoupon" }, "couponView": { "v-bind:coupons.sync": "previewList", "v-bind:viewType.sync": "previewType" } }, _this.$events = {}, _this.components = {
            couponList: _CouponList2.default,
            couponView: _Coupon2.default
        }, _this.computed = {
            previewType: function previewType() {
                if (this.type === 'column' || this.previewList.length < 2) {
                    return 'column';
                }

                return 'row';
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Index, [{
        key: 'onLoad',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var mpId, coupons;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.prev = 0;
                                mpId = _wepy2.default.getStorageSync('current_mpid');
                                _context.next = 4;
                                return this.getCoupons({
                                    pageNum: 1,
                                    pageSize: 10,
                                    mpId: mpId
                                });

                            case 4:
                                coupons = _context.sent;


                                // 去除掉无库存和过期的
                                this.coupons = coupons.filter(function (item) {
                                    return !item.unable && item.totalCount > 0;
                                });
                                this.$apply();
                                _context.next = 12;
                                break;

                            case 9:
                                _context.prev = 9;
                                _context.t0 = _context['catch'](0);

                                this.errorHandler(_context.t0);

                            case 12:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[0, 9]]);
            }));

            function onLoad() {
                return _ref2.apply(this, arguments);
            }

            return onLoad;
        }()
    }, {
        key: 'chooseCoupon',
        value: function chooseCoupon(coupon) {
            var that = this.$parent;
            var id = coupon.id;

            if (coupon.checked) {
                that.previewList && that.previewList.unshift(coupon);
            } else {
                // 从列表中删除
                that.previewList.splice(that.previewList.findIndex(function (item) {
                    return item.id === id;
                }), 1);
            }
            that.$apply();
        }
    }]);

    return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/couponPreview'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvdXBvblByZXZpZXcuanMiXSwibmFtZXMiOlsiSW5kZXgiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsImNvdXBvbnMiLCJpc0VkaXRpbmciLCJwcmV2aWV3TGlzdCIsInByZXZpZXdUeXBlIiwidHlwZSIsIm1peGlucyIsIkNvdXBvbk1peGluIiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiY291cG9uTGlzdCIsImNvdXBvblZpZXciLCJjb21wdXRlZCIsImxlbmd0aCIsIm1wSWQiLCJ3ZXB5IiwiZ2V0U3RvcmFnZVN5bmMiLCJnZXRDb3Vwb25zIiwicGFnZU51bSIsInBhZ2VTaXplIiwiZmlsdGVyIiwiaXRlbSIsInVuYWJsZSIsInRvdGFsQ291bnQiLCIkYXBwbHkiLCJlcnJvckhhbmRsZXIiLCJjb3Vwb24iLCJ0aGF0IiwiJHBhcmVudCIsImlkIiwiY2hlY2tlZCIsInVuc2hpZnQiLCJzcGxpY2UiLCJmaW5kSW5kZXgiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7Ozs7Ozs7Ozs7OztJQUVxQkEsSzs7Ozs7Ozs7Ozs7Ozs7d0xBQ2pCQyxNLEdBQVM7QUFDTEMsb0NBQXdCO0FBRG5CLFMsUUFJVEMsSSxHQUFPO0FBQ0hDLHFCQUFTLEVBRE47QUFFSEMsdUJBQVcsSUFGUjtBQUdIQyx5QkFBYSxFQUhWO0FBSUhDLHlCQUFhLEVBSlYsRUFJYztBQUNqQkMsa0JBQU0sS0FMSCxDQUtVO0FBTFYsUyxRQVFQQyxNLEdBQVMsQ0FBQ0MsZ0JBQUQsQyxRQUVWQyxPLEdBQVUsRSxRQUNiQyxNLEdBQVMsRUFBQyxjQUFhLEVBQUMsdUJBQXNCLFNBQXZCLEVBQWlDLHlCQUF3QixXQUF6RCxFQUFxRSxRQUFPLE9BQTVFLEVBQW9GLDRCQUEyQixjQUEvRyxFQUFkLEVBQTZJLGNBQWEsRUFBQyx1QkFBc0IsYUFBdkIsRUFBcUMsd0JBQXVCLGFBQTVELEVBQTFKLEUsUUFDVEMsTyxHQUFVLEUsUUFDVEMsVSxHQUFhO0FBQ05DLDRDQURNO0FBRU5DO0FBRk0sUyxRQUtWQyxRLEdBQVc7QUFDUFYsdUJBRE8seUJBQ087QUFDVixvQkFBSSxLQUFLQyxJQUFMLEtBQWMsUUFBZCxJQUEwQixLQUFLRixXQUFMLENBQWlCWSxNQUFqQixHQUEwQixDQUF4RCxFQUEyRDtBQUN2RCwyQkFBTyxRQUFQO0FBQ0g7O0FBRUQsdUJBQU8sS0FBUDtBQUNIO0FBUE0sUzs7Ozs7Ozs7Ozs7OztBQVlHQyxvQyxHQUFPQyxlQUFLQyxjQUFMLENBQW9CLGNBQXBCLEM7O3VDQUNTLEtBQUtDLFVBQUwsQ0FBZ0I7QUFDbENDLDZDQUFTLENBRHlCO0FBRWxDQyw4Q0FBVSxFQUZ3QjtBQUdsQ0w7QUFIa0MsaUNBQWhCLEM7OztBQUFoQmYsdUM7OztBQU1OO0FBQ0EscUNBQUtBLE9BQUwsR0FBZUEsUUFBUXFCLE1BQVIsQ0FBZTtBQUFBLDJDQUFRLENBQUNDLEtBQUtDLE1BQU4sSUFBZ0JELEtBQUtFLFVBQUwsR0FBa0IsQ0FBMUM7QUFBQSxpQ0FBZixDQUFmO0FBQ0EscUNBQUtDLE1BQUw7Ozs7Ozs7O0FBRUEscUNBQUtDLFlBQUw7Ozs7Ozs7Ozs7Ozs7Ozs7OztxQ0FJS0MsTSxFQUFRO0FBQ2pCLGdCQUFNQyxPQUFPLEtBQUtDLE9BQWxCO0FBRGlCLGdCQUVUQyxFQUZTLEdBRUZILE1BRkUsQ0FFVEcsRUFGUzs7QUFHakIsZ0JBQUlILE9BQU9JLE9BQVgsRUFBb0I7QUFDaEJILHFCQUFLMUIsV0FBTCxJQUFvQjBCLEtBQUsxQixXQUFMLENBQWlCOEIsT0FBakIsQ0FBeUJMLE1BQXpCLENBQXBCO0FBQ0gsYUFGRCxNQUVPO0FBQ0g7QUFDQUMscUJBQUsxQixXQUFMLENBQWlCK0IsTUFBakIsQ0FBd0JMLEtBQUsxQixXQUFMLENBQWlCZ0MsU0FBakIsQ0FBMkI7QUFBQSwyQkFBUVosS0FBS1EsRUFBTCxLQUFZQSxFQUFwQjtBQUFBLGlCQUEzQixDQUF4QixFQUE0RSxDQUE1RTtBQUNIO0FBQ0RGLGlCQUFLSCxNQUFMO0FBQ0g7Ozs7RUE1RDhCVCxlQUFLbUIsSTs7a0JBQW5CdkMsSyIsImZpbGUiOiJjb3Vwb25QcmV2aWV3LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xyXG5pbXBvcnQgY291cG9uTGlzdCBmcm9tICcuLi9jb21wb25lbnRzL0NvdXBvbkxpc3QnO1xyXG5pbXBvcnQgY291cG9uVmlldyBmcm9tICcuLi9jb21wb25lbnRzL0NvdXBvbic7XHJcblxyXG5pbXBvcnQgQ291cG9uTWl4aW4gZnJvbSAnLi4vbWl4aW5zL2NvdXBvbic7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgICBjb25maWcgPSB7XHJcbiAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+S8mOaDoOWIuCcsXHJcbiAgICB9XHJcblxyXG4gICAgZGF0YSA9IHtcclxuICAgICAgICBjb3Vwb25zOiBbXSxcclxuICAgICAgICBpc0VkaXRpbmc6IHRydWUsXHJcbiAgICAgICAgcHJldmlld0xpc3Q6IFtdLFxyXG4gICAgICAgIHByZXZpZXdUeXBlOiAnJywgLy8g5a6e6ZmF5bGV546w5b2i5byPXHJcbiAgICAgICAgdHlwZTogJ3JvdycsIC8vIOmcgOimgeWxleeOsOeahOW9ouW8j1xyXG4gICAgfVxyXG5cclxuICAgIG1peGlucyA9IFtDb3Vwb25NaXhpbl1cclxuXHJcbiAgICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1wiY291cG9uTGlzdFwiOntcInYtYmluZDpjb3Vwb25zLnN5bmNcIjpcImNvdXBvbnNcIixcInYtYmluZDppc0VkaXRpbmcub25jZVwiOlwiaXNFZGl0aW5nXCIsXCJzaXplXCI6XCJzbWFsbFwiLFwidi1iaW5kOmNob29zZUNvdXBvbi5vbmNlXCI6XCJjaG9vc2VDb3Vwb25cIn0sXCJjb3Vwb25WaWV3XCI6e1widi1iaW5kOmNvdXBvbnMuc3luY1wiOlwicHJldmlld0xpc3RcIixcInYtYmluZDp2aWV3VHlwZS5zeW5jXCI6XCJwcmV2aWV3VHlwZVwifX07XHJcbiRldmVudHMgPSB7fTtcclxuIGNvbXBvbmVudHMgPSB7XHJcbiAgICAgICAgY291cG9uTGlzdCxcclxuICAgICAgICBjb3Vwb25WaWV3LFxyXG4gICAgfVxyXG5cclxuICAgIGNvbXB1dGVkID0ge1xyXG4gICAgICAgIHByZXZpZXdUeXBlKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy50eXBlID09PSAnY29sdW1uJyB8fCB0aGlzLnByZXZpZXdMaXN0Lmxlbmd0aCA8IDIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAnY29sdW1uJztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuICdyb3cnO1xyXG4gICAgICAgIH0sXHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgb25Mb2FkKCkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG1wSWQgPSB3ZXB5LmdldFN0b3JhZ2VTeW5jKCdjdXJyZW50X21waWQnKTtcclxuICAgICAgICAgICAgY29uc3QgY291cG9ucyA9IGF3YWl0IHRoaXMuZ2V0Q291cG9ucyh7XHJcbiAgICAgICAgICAgICAgICBwYWdlTnVtOiAxLFxyXG4gICAgICAgICAgICAgICAgcGFnZVNpemU6IDEwLFxyXG4gICAgICAgICAgICAgICAgbXBJZCxcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyDljrvpmaTmjonml6DlupPlrZjlkozov4fmnJ/nmoRcclxuICAgICAgICAgICAgdGhpcy5jb3Vwb25zID0gY291cG9ucy5maWx0ZXIoaXRlbSA9PiAhaXRlbS51bmFibGUgJiYgaXRlbS50b3RhbENvdW50ID4gMCk7XHJcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICB0aGlzLmVycm9ySGFuZGxlcihlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2hvb3NlQ291cG9uKGNvdXBvbikge1xyXG4gICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzLiRwYXJlbnQ7XHJcbiAgICAgICAgY29uc3QgeyBpZCB9ID0gY291cG9uO1xyXG4gICAgICAgIGlmIChjb3Vwb24uY2hlY2tlZCkge1xyXG4gICAgICAgICAgICB0aGF0LnByZXZpZXdMaXN0ICYmIHRoYXQucHJldmlld0xpc3QudW5zaGlmdChjb3Vwb24pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIOS7juWIl+ihqOS4reWIoOmZpFxyXG4gICAgICAgICAgICB0aGF0LnByZXZpZXdMaXN0LnNwbGljZSh0aGF0LnByZXZpZXdMaXN0LmZpbmRJbmRleChpdGVtID0+IGl0ZW0uaWQgPT09IGlkKSwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoYXQuJGFwcGx5KCk7XHJcbiAgICB9XHJcbn1cclxuIl19