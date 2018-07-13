'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _CouponList = require('./../components/CouponList.js');

var _CouponList2 = _interopRequireDefault(_CouponList);

var _mixins = require('./../mixins/index.js');

var _mixins2 = _interopRequireDefault(_mixins);

var _coupon = require('./../mixins/coupon.js');

var _coupon2 = _interopRequireDefault(_coupon);

var _ajax = require('./../utils/ajax.js');

var _url = require('./../utils/url.js');

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
        }, _this.mixins = [_mixins2.default, _coupon2.default], _this.data = {
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
                    var ids;
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    _context.prev = 0;
                                    ids = this.coupons.filter(function (item) {
                                        return item.checked;
                                    }).map(function (item) {
                                        return item.id;
                                    });
                                    _context.next = 4;
                                    return Promise.all(ids.map(function (id) {
                                        return (0, _ajax.post)(_url.DELETE_COUPON + id);
                                    }));

                                case 4:
                                    this.isEditing = false;
                                    this.loadData();
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
        key: 'loadData',
        value: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
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
                return _ref3.apply(this, arguments);
            }

            return loadData;
        }()
    }]);

    return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/couponManage'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvdXBvbk1hbmFnZS5qcyJdLCJuYW1lcyI6WyJJbmRleCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJjb3Vwb25MaXN0IiwibWl4aW5zIiwiTWl4aW4iLCJDb3Vwb25NaXhpbiIsImRhdGEiLCJjb3Vwb25zIiwiY291cG9uTm9uZSIsImlzRWRpdGluZyIsIm1ldGhvZHMiLCJhZGRDb3Vwb24iLCJ3ZXB5IiwibmF2aWdhdGVUbyIsInVybCIsImVkaXQiLCJkZWxldGVJdGVtcyIsImlkcyIsImZpbHRlciIsIml0ZW0iLCJjaGVja2VkIiwibWFwIiwiaWQiLCJQcm9taXNlIiwiYWxsIiwiREVMRVRFX0NPVVBPTiIsImxvYWREYXRhIiwiJGFwcGx5IiwiZXJyb3JIYW5kbGVyIiwibXBJZCIsImdldFN0b3JhZ2VTeW5jIiwiZ2V0Q291cG9ucyIsInBhZ2VOdW0iLCJwYWdlU2l6ZSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxLOzs7Ozs7Ozs7Ozs7Ozt3TEFDakJDLE0sR0FBUztBQUNMQyxvQ0FBd0I7QUFEbkIsUyxRQUlWQyxPLEdBQVUsRSxRQUNiQyxNLEdBQVMsRUFBQyxjQUFhLEVBQUMsZ0JBQWUsRUFBaEIsRUFBbUIsdUJBQXNCLFNBQXpDLEVBQW1ELHlCQUF3QixXQUEzRSxFQUFkLEUsUUFDVEMsTyxHQUFVLEUsUUFDVEMsVSxHQUFhO0FBQ05DO0FBRE0sUyxRQUlWQyxNLEdBQVMsQ0FBQ0MsZ0JBQUQsRUFBUUMsZ0JBQVIsQyxRQUVUQyxJLEdBQU87QUFDSEMscUJBQVMsRUFETjtBQUVIQyx3QkFBWSxLQUZUO0FBR0hDLHVCQUFXO0FBSFIsUyxRQU1QQyxPLEdBQVU7QUFDTkMscUJBRE0sdUJBQ007QUFDUkMsK0JBQUtDLFVBQUwsQ0FBZ0I7QUFDWkMseUJBQUs7QUFETyxpQkFBaEI7QUFHSCxhQUxLO0FBT05DLGdCQVBNLGtCQU9DO0FBQ0gscUJBQUtOLFNBQUwsR0FBaUIsQ0FBQyxLQUFLQSxTQUF2QjtBQUNILGFBVEs7QUFXQU8sdUJBWEE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQWFRQyx1Q0FiUixHQWFjLEtBQUtWLE9BQUwsQ0FBYVcsTUFBYixDQUFvQjtBQUFBLCtDQUFRQyxLQUFLQyxPQUFiO0FBQUEscUNBQXBCLEVBQTBDQyxHQUExQyxDQUE4QztBQUFBLCtDQUFRRixLQUFLRyxFQUFiO0FBQUEscUNBQTlDLENBYmQ7QUFBQTtBQUFBLDJDQWNRQyxRQUFRQyxHQUFSLENBQVlQLElBQUlJLEdBQUosQ0FBUTtBQUFBLCtDQUFNLGdCQUFLSSxxQkFBZ0JILEVBQXJCLENBQU47QUFBQSxxQ0FBUixDQUFaLENBZFI7O0FBQUE7QUFlRSx5Q0FBS2IsU0FBTCxHQUFpQixLQUFqQjtBQUNBLHlDQUFLaUIsUUFBTDtBQUNBLHlDQUFLQyxNQUFMO0FBakJGO0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQW1CRSx5Q0FBS0MsWUFBTDs7QUFuQkY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQSxTOzs7OztpQ0F3QkQ7QUFDTCxpQkFBS0YsUUFBTDtBQUNIOzs7Ozs7Ozs7OztBQUlhRyxvQyxHQUFPakIsZUFBS2tCLGNBQUwsQ0FBb0IsY0FBcEIsQzs7dUNBQ1EsS0FBS0MsVUFBTCxDQUFnQjtBQUNqQ0MsNkNBQVMsQ0FEd0I7QUFFakNDLDhDQUFVLEVBRnVCO0FBR2pDSjtBQUhpQyxpQ0FBaEIsQzs7O0FBQXJCLHFDQUFLdEIsTzs7QUFLTCxxQ0FBS29CLE1BQUw7Ozs7Ozs7O0FBRUEscUNBQUtDLFlBQUw7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUExRHVCaEIsZUFBS3NCLEk7O2tCQUFuQnZDLEsiLCJmaWxlIjoiY291cG9uTWFuYWdlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xyXG5pbXBvcnQgY291cG9uTGlzdCBmcm9tICcuLi9jb21wb25lbnRzL0NvdXBvbkxpc3QnO1xyXG5pbXBvcnQgTWl4aW4gZnJvbSAnLi4vbWl4aW5zJztcclxuaW1wb3J0IENvdXBvbk1peGluIGZyb20gJy4uL21peGlucy9jb3Vwb24nO1xyXG5cclxuaW1wb3J0IHsgcG9zdCB9IGZyb20gJy4uL3V0aWxzL2FqYXgnO1xyXG5pbXBvcnQgeyBERUxFVEVfQ09VUE9OIH0gZnJvbSAnLi4vdXRpbHMvdXJsJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICAgIGNvbmZpZyA9IHtcclxuICAgICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5LyY5oOg5Yi4566h55CGJyxcclxuICAgIH1cclxuXHJcbiAgICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1wiY291cG9uTGlzdFwiOntcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6Y291cG9ucy5zeW5jXCI6XCJjb3Vwb25zXCIsXCJ2LWJpbmQ6aXNFZGl0aW5nLnN5bmNcIjpcImlzRWRpdGluZ1wifX07XHJcbiRldmVudHMgPSB7fTtcclxuIGNvbXBvbmVudHMgPSB7XHJcbiAgICAgICAgY291cG9uTGlzdCxcclxuICAgIH1cclxuXHJcbiAgICBtaXhpbnMgPSBbTWl4aW4sIENvdXBvbk1peGluXVxyXG5cclxuICAgIGRhdGEgPSB7XHJcbiAgICAgICAgY291cG9uczogW10sXHJcbiAgICAgICAgY291cG9uTm9uZTogZmFsc2UsXHJcbiAgICAgICAgaXNFZGl0aW5nOiBmYWxzZSxcclxuICAgIH1cclxuXHJcbiAgICBtZXRob2RzID0ge1xyXG4gICAgICAgIGFkZENvdXBvbigpIHtcclxuICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgICAgIHVybDogJy9wYWdlcy9jb3Vwb25FZGl0JyxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZWRpdCgpIHtcclxuICAgICAgICAgICAgdGhpcy5pc0VkaXRpbmcgPSAhdGhpcy5pc0VkaXRpbmc7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgYXN5bmMgZGVsZXRlSXRlbXMoKSB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpZHMgPSB0aGlzLmNvdXBvbnMuZmlsdGVyKGl0ZW0gPT4gaXRlbS5jaGVja2VkKS5tYXAoaXRlbSA9PiBpdGVtLmlkKTtcclxuICAgICAgICAgICAgICAgIGF3YWl0IFByb21pc2UuYWxsKGlkcy5tYXAoaWQgPT4gcG9zdChERUxFVEVfQ09VUE9OICsgaWQpKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzRWRpdGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lcnJvckhhbmRsZXIoZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgfVxyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICB0aGlzLmxvYWREYXRhKCk7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgbG9hZERhdGEoKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3QgbXBJZCA9IHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ2N1cnJlbnRfbXBpZCcpO1xyXG4gICAgICAgICAgICB0aGlzLmNvdXBvbnMgPSBhd2FpdCB0aGlzLmdldENvdXBvbnMoe1xyXG4gICAgICAgICAgICAgICAgcGFnZU51bTogMSxcclxuICAgICAgICAgICAgICAgIHBhZ2VTaXplOiAxMCxcclxuICAgICAgICAgICAgICAgIG1wSWQsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgdGhpcy5lcnJvckhhbmRsZXIoZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==