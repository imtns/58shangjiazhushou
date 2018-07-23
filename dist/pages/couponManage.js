'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _CouponList = require('./../components/CouponList.js');

var _CouponList2 = _interopRequireDefault(_CouponList);

var _mixin = require('./../mixin/index.js');

var _mixin2 = _interopRequireDefault(_mixin);

var _coupon = require('./../mixin/coupon.js');

var _coupon2 = _interopRequireDefault(_coupon);

var _ajax = require('./../utils/ajax.js');

var _url = require('./../utils/url.js');

var _utils = require('./../utils/index.js');

var _globalService = require('./../utils/globalService.js');

var _globalService2 = _interopRequireDefault(_globalService);

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
            navigationBarTitleText: '优惠券管理'
        }, _this.$repeat = {}, _this.$props = { "couponList": { "xmlns:v-bind": "", "v-bind:coupons.sync": "coupons", "v-bind:isEditing.sync": "isEditing" } }, _this.$events = {}, _this.components = {
            couponList: _CouponList2.default
        }, _this.mixins = [_mixin2.default, _coupon2.default], _this.data = {
            coupons: [],
            couponNone: false,
            isEditing: false
        }, _this.methods = {
            addCoupon: function addCoupon() {
                _wepy2.default.navigateTo({
                    url: '/pages/couponEdit'
                });
            },
            edit: function edit() {
                this.isEditing = !this.isEditing;
            },
            deleteItems: function () {
                var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                    var _ref3, cancel, ids;

                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    _context.prev = 0;
                                    _context.next = 3;
                                    return (0, _utils.alertP)('确认删除所选优惠券？');

                                case 3:
                                    _ref3 = _context.sent;
                                    cancel = _ref3.cancel;

                                    if (!cancel) {
                                        _context.next = 9;
                                        break;
                                    }

                                    this.isEditing = false;
                                    this.$apply();
                                    return _context.abrupt('return');

                                case 9:
                                    ids = this.coupons.filter(function (item) {
                                        return item.checked;
                                    }).map(function (item) {
                                        return item.id;
                                    });
                                    _context.next = 12;
                                    return Promise.all(ids.map(function (id) {
                                        return (0, _ajax.post)(_url.DELETE_COUPON + id);
                                    }));

                                case 12:
                                    this.isEditing = false;
                                    this.loadData();
                                    this.$apply();
                                    _context.next = 20;
                                    break;

                                case 17:
                                    _context.prev = 17;
                                    _context.t0 = _context['catch'](0);

                                    this.errorHandler(_context.t0);

                                case 20:
                                case 'end':
                                    return _context.stop();
                            }
                        }
                    }, _callee, this, [[0, 17]]);
                }));

                function deleteItems() {
                    return _ref2.apply(this, arguments);
                }

                return deleteItems;
            }()
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Index, [{
        key: 'onLoad',
        value: function onLoad() {
            this.loadData();
        }
    }, {
        key: 'onShow',
        value: function onShow() {
            if (_globalService2.default.get('refresh')) {
                _globalService2.default.set('refresh', false);
                this.loadData();
            }
        }
    }, {
        key: 'loadData',
        value: function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                var mpId;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.prev = 0;
                                mpId = _wepy2.default.getStorageSync('current_mpid');
                                _context2.next = 4;
                                return this.getCoupons({
                                    pageNum: 1,
                                    pageSize: 10,
                                    mpId: mpId
                                });

                            case 4:
                                this.coupons = _context2.sent;

                                this.$apply();
                                _context2.next = 11;
                                break;

                            case 8:
                                _context2.prev = 8;
                                _context2.t0 = _context2['catch'](0);

                                this.errorHandler(_context2.t0);

                            case 11:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this, [[0, 8]]);
            }));

            function loadData() {
                return _ref4.apply(this, arguments);
            }

            return loadData;
        }()
    }]);

    return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/couponManage'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvdXBvbk1hbmFnZS5qcyJdLCJuYW1lcyI6WyJJbmRleCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJjb3Vwb25MaXN0IiwibWl4aW5zIiwiTWl4aW4iLCJDb3Vwb25NaXhpbiIsImRhdGEiLCJjb3Vwb25zIiwiY291cG9uTm9uZSIsImlzRWRpdGluZyIsIm1ldGhvZHMiLCJhZGRDb3Vwb24iLCJ3ZXB5IiwibmF2aWdhdGVUbyIsInVybCIsImVkaXQiLCJkZWxldGVJdGVtcyIsImNhbmNlbCIsIiRhcHBseSIsImlkcyIsImZpbHRlciIsIml0ZW0iLCJjaGVja2VkIiwibWFwIiwiaWQiLCJQcm9taXNlIiwiYWxsIiwiREVMRVRFX0NPVVBPTiIsImxvYWREYXRhIiwiZXJyb3JIYW5kbGVyIiwiZ2xvYmFsU2VydmljZSIsImdldCIsInNldCIsIm1wSWQiLCJnZXRTdG9yYWdlU3luYyIsImdldENvdXBvbnMiLCJwYWdlTnVtIiwicGFnZVNpemUiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0lBRXFCQSxLOzs7Ozs7Ozs7Ozs7Ozt3TEFDakJDLE0sR0FBUztBQUNMQyxvQ0FBd0I7QUFEbkIsUyxRQUlWQyxPLEdBQVUsRSxRQUNiQyxNLEdBQVMsRUFBQyxjQUFhLEVBQUMsZ0JBQWUsRUFBaEIsRUFBbUIsdUJBQXNCLFNBQXpDLEVBQW1ELHlCQUF3QixXQUEzRSxFQUFkLEUsUUFDVEMsTyxHQUFVLEUsUUFDVEMsVSxHQUFhO0FBQ05DO0FBRE0sUyxRQUlWQyxNLEdBQVMsQ0FBQ0MsZUFBRCxFQUFRQyxnQkFBUixDLFFBRVRDLEksR0FBTztBQUNIQyxxQkFBUyxFQUROO0FBRUhDLHdCQUFZLEtBRlQ7QUFHSEMsdUJBQVc7QUFIUixTLFFBTVBDLE8sR0FBVTtBQUNOQyxxQkFETSx1QkFDTTtBQUNSQywrQkFBS0MsVUFBTCxDQUFnQjtBQUNaQyx5QkFBSztBQURPLGlCQUFoQjtBQUdILGFBTEs7QUFPTkMsZ0JBUE0sa0JBT0M7QUFDSCxxQkFBS04sU0FBTCxHQUFpQixDQUFDLEtBQUtBLFNBQXZCO0FBQ0gsYUFUSztBQVdBTyx1QkFYQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsMkNBYTJCLG1CQUFPLFlBQVAsQ0FiM0I7O0FBQUE7QUFBQTtBQWFVQywwQ0FiVixTQWFVQSxNQWJWOztBQUFBLHlDQWNNQSxNQWROO0FBQUE7QUFBQTtBQUFBOztBQWVNLHlDQUFLUixTQUFMLEdBQWlCLEtBQWpCO0FBQ0EseUNBQUtTLE1BQUw7QUFoQk47O0FBQUE7QUFvQlFDLHVDQXBCUixHQW9CYyxLQUFLWixPQUFMLENBQWFhLE1BQWIsQ0FBb0I7QUFBQSwrQ0FBUUMsS0FBS0MsT0FBYjtBQUFBLHFDQUFwQixFQUEwQ0MsR0FBMUMsQ0FBOEM7QUFBQSwrQ0FBUUYsS0FBS0csRUFBYjtBQUFBLHFDQUE5QyxDQXBCZDtBQUFBO0FBQUEsMkNBcUJRQyxRQUFRQyxHQUFSLENBQVlQLElBQUlJLEdBQUosQ0FBUTtBQUFBLCtDQUFNLGdCQUFLSSxxQkFBZ0JILEVBQXJCLENBQU47QUFBQSxxQ0FBUixDQUFaLENBckJSOztBQUFBO0FBc0JFLHlDQUFLZixTQUFMLEdBQWlCLEtBQWpCO0FBQ0EseUNBQUttQixRQUFMO0FBQ0EseUNBQUtWLE1BQUw7QUF4QkY7QUFBQTs7QUFBQTtBQUFBO0FBQUE7O0FBMEJFLHlDQUFLVyxZQUFMOztBQTFCRjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBLFM7Ozs7O2lDQStCRDtBQUNMLGlCQUFLRCxRQUFMO0FBQ0g7OztpQ0FFUTtBQUNMLGdCQUFJRSx3QkFBY0MsR0FBZCxDQUFrQixTQUFsQixDQUFKLEVBQWtDO0FBQzlCRCx3Q0FBY0UsR0FBZCxDQUFrQixTQUFsQixFQUE2QixLQUE3QjtBQUNBLHFCQUFLSixRQUFMO0FBQ0g7QUFDSjs7Ozs7Ozs7Ozs7QUFJYUssb0MsR0FBT3JCLGVBQUtzQixjQUFMLENBQW9CLGNBQXBCLEM7O3VDQUNRLEtBQUtDLFVBQUwsQ0FBZ0I7QUFDakNDLDZDQUFTLENBRHdCO0FBRWpDQyw4Q0FBVSxFQUZ1QjtBQUdqQ0o7QUFIaUMsaUNBQWhCLEM7OztBQUFyQixxQ0FBSzFCLE87O0FBS0wscUNBQUtXLE1BQUw7Ozs7Ozs7O0FBRUEscUNBQUtXLFlBQUw7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUF4RXVCakIsZUFBSzBCLEk7O2tCQUFuQjNDLEsiLCJmaWxlIjoiY291cG9uTWFuYWdlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xyXG5pbXBvcnQgY291cG9uTGlzdCBmcm9tICcuLi9jb21wb25lbnRzL0NvdXBvbkxpc3QnO1xyXG5pbXBvcnQgTWl4aW4gZnJvbSAnLi4vbWl4aW4nO1xyXG5pbXBvcnQgQ291cG9uTWl4aW4gZnJvbSAnLi4vbWl4aW4vY291cG9uJztcclxuXHJcbmltcG9ydCB7IHBvc3QgfSBmcm9tICcuLi91dGlscy9hamF4JztcclxuaW1wb3J0IHsgREVMRVRFX0NPVVBPTiB9IGZyb20gJy4uL3V0aWxzL3VybCc7XHJcbmltcG9ydCB7IGFsZXJ0UCB9IGZyb20gJy4uL3V0aWxzJztcclxuaW1wb3J0IGdsb2JhbFNlcnZpY2UgZnJvbSAnLi4vdXRpbHMvZ2xvYmFsU2VydmljZSc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgICBjb25maWcgPSB7XHJcbiAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+S8mOaDoOWIuOeuoeeQhicsXHJcbiAgICB9XHJcblxyXG4gICAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcImNvdXBvbkxpc3RcIjp7XCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOmNvdXBvbnMuc3luY1wiOlwiY291cG9uc1wiLFwidi1iaW5kOmlzRWRpdGluZy5zeW5jXCI6XCJpc0VkaXRpbmdcIn19O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xyXG4gICAgICAgIGNvdXBvbkxpc3QsXHJcbiAgICB9XHJcblxyXG4gICAgbWl4aW5zID0gW01peGluLCBDb3Vwb25NaXhpbl1cclxuXHJcbiAgICBkYXRhID0ge1xyXG4gICAgICAgIGNvdXBvbnM6IFtdLFxyXG4gICAgICAgIGNvdXBvbk5vbmU6IGZhbHNlLFxyXG4gICAgICAgIGlzRWRpdGluZzogZmFsc2UsXHJcbiAgICB9XHJcblxyXG4gICAgbWV0aG9kcyA9IHtcclxuICAgICAgICBhZGRDb3Vwb24oKSB7XHJcbiAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgICAgICB1cmw6ICcvcGFnZXMvY291cG9uRWRpdCcsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGVkaXQoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNFZGl0aW5nID0gIXRoaXMuaXNFZGl0aW5nO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGFzeW5jIGRlbGV0ZUl0ZW1zKCkge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgeyBjYW5jZWwgfSA9IGF3YWl0IGFsZXJ0UCgn56Gu6K6k5Yig6Zmk5omA6YCJ5LyY5oOg5Yi477yfJyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2FuY2VsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0VkaXRpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBpZHMgPSB0aGlzLmNvdXBvbnMuZmlsdGVyKGl0ZW0gPT4gaXRlbS5jaGVja2VkKS5tYXAoaXRlbSA9PiBpdGVtLmlkKTtcclxuICAgICAgICAgICAgICAgIGF3YWl0IFByb21pc2UuYWxsKGlkcy5tYXAoaWQgPT4gcG9zdChERUxFVEVfQ09VUE9OICsgaWQpKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzRWRpdGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lcnJvckhhbmRsZXIoZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgfVxyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICB0aGlzLmxvYWREYXRhKCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25TaG93KCkge1xyXG4gICAgICAgIGlmIChnbG9iYWxTZXJ2aWNlLmdldCgncmVmcmVzaCcpKSB7XHJcbiAgICAgICAgICAgIGdsb2JhbFNlcnZpY2Uuc2V0KCdyZWZyZXNoJywgZmFsc2UpO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWREYXRhKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGxvYWREYXRhKCkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG1wSWQgPSB3ZXB5LmdldFN0b3JhZ2VTeW5jKCdjdXJyZW50X21waWQnKTtcclxuICAgICAgICAgICAgdGhpcy5jb3Vwb25zID0gYXdhaXQgdGhpcy5nZXRDb3Vwb25zKHtcclxuICAgICAgICAgICAgICAgIHBhZ2VOdW06IDEsXHJcbiAgICAgICAgICAgICAgICBwYWdlU2l6ZTogMTAsXHJcbiAgICAgICAgICAgICAgICBtcElkLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZXJyb3JIYW5kbGVyKGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=