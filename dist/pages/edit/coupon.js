'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _mixin = require('./mixin.js');

var _mixin2 = _interopRequireDefault(_mixin);

var _CouponList = require('./../../components/CouponList.js');

var _CouponList2 = _interopRequireDefault(_CouponList);

var _Coupon = require('./../../components/Coupon.js');

var _Coupon2 = _interopRequireDefault(_Coupon);

var _coupon = require('./../../mixin/coupon.js');

var _coupon2 = _interopRequireDefault(_coupon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var app = require('./../../utils/globalData.js');

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
        }, _this.mixins = [_coupon2.default, _mixin2.default], _this.$repeat = {}, _this.$props = { "couponList": { "v-bind:coupons.sync": "coupons", "v-bind:isEditing.once": "isEditing", "size": "small", "v-bind:chooseCoupon.once": "chooseCoupon" }, "couponView": { "v-bind:coupons.sync": "previewList", "v-bind:viewType.sync": "previewType" } }, _this.$events = {}, _this.components = {
            couponList: _CouponList2.default,
            couponView: _Coupon2.default
        }, _this.computed = {
            previewType: function previewType() {
                if (this.type === 'column' || this.previewList.length < 2) {
                    return 'column';
                }

                return 'row';
            }
        }, _this.methods = {
            save: function save() {
                var selectCoupons = this.previewList.filter(function (obj) {
                    return obj.checked === true;
                });
                this.pageModule.params.couponIds = selectCoupons.map(function (c) {
                    return c.id;
                }).join(',');
                app.globalData.pageData[this.pageIndex].props = this.pageData[0].props;
                app.globalData.modules[this.pageIndex] = this.pageModule;
                wx.navigateBack({
                    delta: 1
                });
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Index, [{
        key: 'onLoad',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var _this2 = this;

                var _tempModules$filter, _tempModules$filter2, mpId, coupons;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _tempModules$filter = this.tempModules.filter(function (obj) {
                                    return obj.id === _this2.pageId;
                                });
                                _tempModules$filter2 = _slicedToArray(_tempModules$filter, 1);
                                this.pageModule = _tempModules$filter2[0];

                                console.log(this.pageModule);
                                this.previewList = this.pageData[0].props.data;

                                this.type = this.pageData[0].props.cfg.theme === 1 ? 'column' : 'row';
                                _context.prev = 6;
                                mpId = _wepy2.default.getStorageSync('current_mpid');
                                _context.next = 10;
                                return this.getCoupons({
                                    pageNum: 1,
                                    pageSize: 10,
                                    mpId: mpId
                                });

                            case 10:
                                coupons = _context.sent;


                                // 去除掉无库存和过期的
                                this.coupons = coupons.filter(function (item) {
                                    return !item.unable && item.totalCount > 0;
                                });
                                this.previewList.forEach(function (item) {
                                    var id = item.id;

                                    var target = _this2.coupons.find(function (c) {
                                        if (c.id === id) {
                                            item.checked = true;
                                            return true;
                                        }
                                        return false;
                                    });
                                    if (target) {
                                        target.checked = true;
                                    }
                                });
                                this.$apply();
                                _context.next = 19;
                                break;

                            case 16:
                                _context.prev = 16;
                                _context.t0 = _context['catch'](6);

                                this.errorHandler(_context.t0);

                            case 19:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[6, 16]]);
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


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/edit/coupon'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvdXBvbi5qcyJdLCJuYW1lcyI6WyJhcHAiLCJyZXF1aXJlIiwiSW5kZXgiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsImNvdXBvbnMiLCJpc0VkaXRpbmciLCJwcmV2aWV3TGlzdCIsInByZXZpZXdUeXBlIiwidHlwZSIsIm1peGlucyIsIkNvdXBvbk1peGluIiwiTWl4aW4iLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJjb3Vwb25MaXN0IiwiY291cG9uVmlldyIsImNvbXB1dGVkIiwibGVuZ3RoIiwibWV0aG9kcyIsInNhdmUiLCJzZWxlY3RDb3Vwb25zIiwiZmlsdGVyIiwib2JqIiwiY2hlY2tlZCIsInBhZ2VNb2R1bGUiLCJwYXJhbXMiLCJjb3Vwb25JZHMiLCJtYXAiLCJjIiwiaWQiLCJqb2luIiwiZ2xvYmFsRGF0YSIsInBhZ2VEYXRhIiwicGFnZUluZGV4IiwicHJvcHMiLCJtb2R1bGVzIiwid3giLCJuYXZpZ2F0ZUJhY2siLCJkZWx0YSIsInRlbXBNb2R1bGVzIiwicGFnZUlkIiwiY29uc29sZSIsImxvZyIsImNmZyIsInRoZW1lIiwibXBJZCIsIndlcHkiLCJnZXRTdG9yYWdlU3luYyIsImdldENvdXBvbnMiLCJwYWdlTnVtIiwicGFnZVNpemUiLCJpdGVtIiwidW5hYmxlIiwidG90YWxDb3VudCIsImZvckVhY2giLCJ0YXJnZXQiLCJmaW5kIiwiJGFwcGx5IiwiZXJyb3JIYW5kbGVyIiwiY291cG9uIiwidGhhdCIsIiRwYXJlbnQiLCJ1bnNoaWZ0Iiwic3BsaWNlIiwiZmluZEluZGV4IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsTUFBTUMsUUFBUSx3QkFBUixDQUFaOztJQUVxQkMsSzs7Ozs7Ozs7Ozs7Ozs7d0xBQ2pCQyxNLEdBQVM7QUFDTEMsb0NBQXdC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c0QsSUFBYixDQUFrQixVQUFDNUIsQ0FBRCxFQUFPO0FBQ3BDLDRDQUFJQSxFQUFFQyxFQUFGLEtBQVNBLEVBQWIsRUFBaUI7QUFDYnNCLGlEQUFLNUIsT0FBTCxHQUFlLElBQWY7QUFDQSxtREFBTyxJQUFQO0FBQ0g7QUFDRCwrQ0FBTyxLQUFQO0FBQ0gscUNBTmMsQ0FBZjtBQU9BLHdDQUFJZ0MsTUFBSixFQUFZO0FBQ1JBLCtDQUFPaEMsT0FBUCxHQUFpQixJQUFqQjtBQUNIO0FBQ0osaUNBWkQ7QUFhQSxxQ0FBS2tDLE1BQUw7Ozs7Ozs7O0FBRUEscUNBQUtDLFlBQUw7Ozs7Ozs7Ozs7Ozs7Ozs7OztxQ0FjS0MsTSxFQUFRO0FBQ2pCLGdCQUFNQyxPQUFPLEtBQUtDLE9BQWxCO0FBRGlCLGdCQUVUaEMsRUFGUyxHQUVGOEIsTUFGRSxDQUVUOUIsRUFGUzs7QUFHakIsZ0JBQUk4QixPQUFPcEMsT0FBWCxFQUFvQjtBQUNoQnFDLHFCQUFLeEQsV0FBTCxJQUFvQndELEtBQUt4RCxXQUFMLENBQWlCMEQsT0FBakIsQ0FBeUJILE1BQXpCLENBQXBCO0FBQ0gsYUFGRCxNQUVPO0FBQ0g7QUFDQUMscUJBQUt4RCxXQUFMLENBQWlCMkQsTUFBakIsQ0FBd0JILEtBQUt4RCxXQUFMLENBQWlCNEQsU0FBakIsQ0FBMkI7QUFBQSwyQkFBUWIsS0FBS3RCLEVBQUwsS0FBWUEsRUFBcEI7QUFBQSxpQkFBM0IsQ0FBeEIsRUFBNEUsQ0FBNUU7QUFDSDtBQUNEK0IsaUJBQUtILE1BQUw7QUFDSDs7OztFQXZGOEJYLGVBQUttQixJOztrQkFBbkJuRSxLIiwiZmlsZSI6ImNvdXBvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcclxuaW1wb3J0IE1peGluIGZyb20gJy4vbWl4aW4nO1xyXG5pbXBvcnQgY291cG9uTGlzdCBmcm9tICcuLi8uLi9jb21wb25lbnRzL0NvdXBvbkxpc3QnO1xyXG5pbXBvcnQgY291cG9uVmlldyBmcm9tICcuLi8uLi9jb21wb25lbnRzL0NvdXBvbic7XHJcbmltcG9ydCBDb3Vwb25NaXhpbiBmcm9tICcuLi8uLi9taXhpbi9jb3Vwb24nO1xyXG5cclxuY29uc3QgYXBwID0gcmVxdWlyZSgnLi4vLi4vdXRpbHMvZ2xvYmFsRGF0YScpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gICAgY29uZmlnID0ge1xyXG4gICAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfkvJjmg6DliLgnLFxyXG4gICAgfVxyXG4gICAgZGF0YSA9IHtcclxuICAgICAgICBjb3Vwb25zOiBbXSxcclxuICAgICAgICBpc0VkaXRpbmc6IHRydWUsXHJcbiAgICAgICAgcHJldmlld0xpc3Q6IFtdLFxyXG4gICAgICAgIHByZXZpZXdUeXBlOiAnJywgLy8g5a6e6ZmF5bGV546w5b2i5byPXHJcbiAgICAgICAgdHlwZTogJ3JvdycsIC8vIOmcgOimgeWxleeOsOeahOW9ouW8j1xyXG4gICAgfVxyXG5cclxuICAgIG1peGlucyA9IFtDb3Vwb25NaXhpbiwgTWl4aW5dXHJcblxyXG4gICAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcImNvdXBvbkxpc3RcIjp7XCJ2LWJpbmQ6Y291cG9ucy5zeW5jXCI6XCJjb3Vwb25zXCIsXCJ2LWJpbmQ6aXNFZGl0aW5nLm9uY2VcIjpcImlzRWRpdGluZ1wiLFwic2l6ZVwiOlwic21hbGxcIixcInYtYmluZDpjaG9vc2VDb3Vwb24ub25jZVwiOlwiY2hvb3NlQ291cG9uXCJ9LFwiY291cG9uVmlld1wiOntcInYtYmluZDpjb3Vwb25zLnN5bmNcIjpcInByZXZpZXdMaXN0XCIsXCJ2LWJpbmQ6dmlld1R5cGUuc3luY1wiOlwicHJldmlld1R5cGVcIn19O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xyXG4gICAgICAgIGNvdXBvbkxpc3QsXHJcbiAgICAgICAgY291cG9uVmlldyxcclxuICAgIH1cclxuXHJcbiAgICBjb21wdXRlZCA9IHtcclxuICAgICAgICBwcmV2aWV3VHlwZSgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMudHlwZSA9PT0gJ2NvbHVtbicgfHwgdGhpcy5wcmV2aWV3TGlzdC5sZW5ndGggPCAyKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2NvbHVtbic7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiAncm93JztcclxuICAgICAgICB9LFxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIG9uTG9hZCgpIHtcclxuICAgICAgICBbdGhpcy5wYWdlTW9kdWxlXSA9IHRoaXMudGVtcE1vZHVsZXMuZmlsdGVyKG9iaiA9PiBvYmouaWQgPT09IHRoaXMucGFnZUlkKTtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnBhZ2VNb2R1bGUpO1xyXG4gICAgICAgIHRoaXMucHJldmlld0xpc3QgPSB0aGlzLnBhZ2VEYXRhWzBdLnByb3BzLmRhdGE7XHJcblxyXG4gICAgICAgIHRoaXMudHlwZSA9IHRoaXMucGFnZURhdGFbMF0ucHJvcHMuY2ZnLnRoZW1lID09PSAxID8gJ2NvbHVtbicgOiAncm93JztcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCBtcElkID0gd2VweS5nZXRTdG9yYWdlU3luYygnY3VycmVudF9tcGlkJyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvdXBvbnMgPSBhd2FpdCB0aGlzLmdldENvdXBvbnMoe1xyXG4gICAgICAgICAgICAgICAgcGFnZU51bTogMSxcclxuICAgICAgICAgICAgICAgIHBhZ2VTaXplOiAxMCxcclxuICAgICAgICAgICAgICAgIG1wSWQsXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8g5Y676Zmk5o6J5peg5bqT5a2Y5ZKM6L+H5pyf55qEXHJcbiAgICAgICAgICAgIHRoaXMuY291cG9ucyA9IGNvdXBvbnMuZmlsdGVyKGl0ZW0gPT4gIWl0ZW0udW5hYmxlICYmIGl0ZW0udG90YWxDb3VudCA+IDApO1xyXG4gICAgICAgICAgICB0aGlzLnByZXZpZXdMaXN0LmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHsgaWQgfSA9IGl0ZW07XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0YXJnZXQgPSB0aGlzLmNvdXBvbnMuZmluZCgoYykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjLmlkID09PSBpZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmNoZWNrZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBpZiAodGFyZ2V0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LmNoZWNrZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZXJyb3JIYW5kbGVyKGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgICAgc2F2ZSgpIHtcclxuICAgICAgICAgICAgY29uc3Qgc2VsZWN0Q291cG9ucyA9IHRoaXMucHJldmlld0xpc3QuZmlsdGVyKG9iaiA9PiBvYmouY2hlY2tlZCA9PT0gdHJ1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMucGFnZU1vZHVsZS5wYXJhbXMuY291cG9uSWRzID0gc2VsZWN0Q291cG9ucy5tYXAoYyA9PiBjLmlkKS5qb2luKCcsJyk7XHJcbiAgICAgICAgICAgIGFwcC5nbG9iYWxEYXRhLnBhZ2VEYXRhW3RoaXMucGFnZUluZGV4XS5wcm9wcyA9IHRoaXMucGFnZURhdGFbMF0ucHJvcHM7XHJcbiAgICAgICAgICAgIGFwcC5nbG9iYWxEYXRhLm1vZHVsZXNbdGhpcy5wYWdlSW5kZXhdID0gdGhpcy5wYWdlTW9kdWxlO1xyXG4gICAgICAgICAgICB3eC5uYXZpZ2F0ZUJhY2soe1xyXG4gICAgICAgICAgICAgICAgZGVsdGE6IDEsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICB9XHJcbiAgICBjaG9vc2VDb3Vwb24oY291cG9uKSB7XHJcbiAgICAgICAgY29uc3QgdGhhdCA9IHRoaXMuJHBhcmVudDtcclxuICAgICAgICBjb25zdCB7IGlkIH0gPSBjb3Vwb247XHJcbiAgICAgICAgaWYgKGNvdXBvbi5jaGVja2VkKSB7XHJcbiAgICAgICAgICAgIHRoYXQucHJldmlld0xpc3QgJiYgdGhhdC5wcmV2aWV3TGlzdC51bnNoaWZ0KGNvdXBvbik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8g5LuO5YiX6KGo5Lit5Yig6ZmkXHJcbiAgICAgICAgICAgIHRoYXQucHJldmlld0xpc3Quc3BsaWNlKHRoYXQucHJldmlld0xpc3QuZmluZEluZGV4KGl0ZW0gPT4gaXRlbS5pZCA9PT0gaWQpLCAxKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhhdC4kYXBwbHkoKTtcclxuICAgIH1cclxufVxyXG4iXX0=