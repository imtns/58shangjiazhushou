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

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var pageSize = 10;
var pageNum = 1;
var noMore = false;

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
                                    this.init();
                                    this.loadData();
                                    this.$apply();
                                    _context.next = 21;
                                    break;

                                case 18:
                                    _context.prev = 18;
                                    _context.t0 = _context['catch'](0);

                                    this.errorHandler(_context.t0);

                                case 21:
                                case 'end':
                                    return _context.stop();
                            }
                        }
                    }, _callee, this, [[0, 18]]);
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
            this.mpId = _wepy2.default.getStorageSync('current_mpid');
            this.loadData();
        }
    }, {
        key: 'onShow',
        value: function onShow() {
            if (_globalService2.default.get('refresh')) {
                _globalService2.default.set('refresh', false);
                // 重新加载数据
                this.init();
                this.loadData();
            }
            // 清空优惠券编辑页数据
            _globalService2.default.set('couponManage', {});
        }
    }, {
        key: 'init',
        value: function init() {
            noMore = false;
            pageNum = 1;
            this.coupons = [];
        }
    }, {
        key: 'updated',
        value: function updated() {
            pageNum += 1;
        }
    }, {
        key: 'loadData',
        value: function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                var mpId, data, _coupons;

                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.prev = 0;
                                mpId = this.mpId;
                                _context2.next = 4;
                                return this.getCoupons({
                                    pageNum: pageNum,
                                    pageSize: pageSize,
                                    mpId: mpId
                                });

                            case 4:
                                data = _context2.sent;


                                if (data && data.length) {
                                    (_coupons = this.coupons).push.apply(_coupons, _toConsumableArray(data));
                                }

                                if (data && data.length < pageSize) {
                                    noMore = true;
                                }

                                this.$apply();
                                _context2.next = 13;
                                break;

                            case 10:
                                _context2.prev = 10;
                                _context2.t0 = _context2['catch'](0);

                                this.errorHandler(_context2.t0);

                            case 13:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this, [[0, 10]]);
            }));

            function loadData() {
                return _ref4.apply(this, arguments);
            }

            return loadData;
        }()
    }, {
        key: 'onReachBottom',
        value: function onReachBottom() {
            if (noMore) {
                return;
            }

            this.updated();
            this.loadData();
        }
    }]);

    return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/couponManage'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvdXBvbk1hbmFnZS5qcyJdLCJuYW1lcyI6WyJwYWdlU2l6ZSIsInBhZ2VOdW0iLCJub01vcmUiLCJJbmRleCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJjb3Vwb25MaXN0IiwibWl4aW5zIiwiTWl4aW4iLCJDb3Vwb25NaXhpbiIsImRhdGEiLCJjb3Vwb25zIiwiY291cG9uTm9uZSIsImlzRWRpdGluZyIsIm1ldGhvZHMiLCJhZGRDb3Vwb24iLCJ3ZXB5IiwibmF2aWdhdGVUbyIsInVybCIsImVkaXQiLCJkZWxldGVJdGVtcyIsImNhbmNlbCIsIiRhcHBseSIsImlkcyIsImZpbHRlciIsIml0ZW0iLCJjaGVja2VkIiwibWFwIiwiaWQiLCJQcm9taXNlIiwiYWxsIiwiREVMRVRFX0NPVVBPTiIsImluaXQiLCJsb2FkRGF0YSIsImVycm9ySGFuZGxlciIsIm1wSWQiLCJnZXRTdG9yYWdlU3luYyIsImdsb2JhbFNlcnZpY2UiLCJnZXQiLCJzZXQiLCJnZXRDb3Vwb25zIiwibGVuZ3RoIiwicHVzaCIsInVwZGF0ZWQiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxXQUFXLEVBQWpCO0FBQ0EsSUFBSUMsVUFBVSxDQUFkO0FBQ0EsSUFBSUMsU0FBUyxLQUFiOztJQUVxQkMsSzs7Ozs7Ozs7Ozs7Ozs7d0xBQ2pCQyxNLEdBQVM7QUFDTEMsb0NBQXdCO0FBRG5CLFMsUUFJVkMsTyxHQUFVLEUsUUFDYkMsTSxHQUFTLEVBQUMsY0FBYSxFQUFDLGdCQUFlLEVBQWhCLEVBQW1CLHVCQUFzQixTQUF6QyxFQUFtRCx5QkFBd0IsV0FBM0UsRUFBZCxFLFFBQ1RDLE8sR0FBVSxFLFFBQ1RDLFUsR0FBYTtBQUNOQztBQURNLFMs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b3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuaW1wb3J0IGNvdXBvbkxpc3QgZnJvbSAnLi4vY29tcG9uZW50cy9Db3Vwb25MaXN0JztcbmltcG9ydCBNaXhpbiBmcm9tICcuLi9taXhpbic7XG5pbXBvcnQgQ291cG9uTWl4aW4gZnJvbSAnLi4vbWl4aW4vY291cG9uJztcblxuaW1wb3J0IHsgcG9zdCB9IGZyb20gJy4uL3V0aWxzL2FqYXgnO1xuaW1wb3J0IHsgREVMRVRFX0NPVVBPTiB9IGZyb20gJy4uL3V0aWxzL3VybCc7XG5pbXBvcnQgeyBhbGVydFAgfSBmcm9tICcuLi91dGlscyc7XG5pbXBvcnQgZ2xvYmFsU2VydmljZSBmcm9tICcuLi91dGlscy9nbG9iYWxTZXJ2aWNlJztcblxuY29uc3QgcGFnZVNpemUgPSAxMDtcbmxldCBwYWdlTnVtID0gMTtcbmxldCBub01vcmUgPSBmYWxzZTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+S8mOaDoOWIuOeuoeeQhicsXG4gICAgfVxuXG4gICAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcImNvdXBvbkxpc3RcIjp7XCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOmNvdXBvbnMuc3luY1wiOlwiY291cG9uc1wiLFwidi1iaW5kOmlzRWRpdGluZy5zeW5jXCI6XCJpc0VkaXRpbmdcIn19O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xuICAgICAgICBjb3Vwb25MaXN0LFxuICAgIH1cblxuICAgIG1peGlucyA9IFtNaXhpbiwgQ291cG9uTWl4aW5dXG5cbiAgICBkYXRhID0ge1xuICAgICAgICBjb3Vwb25zOiBbXSxcbiAgICAgICAgY291cG9uTm9uZTogZmFsc2UsXG4gICAgICAgIGlzRWRpdGluZzogZmFsc2UsXG4gICAgfVxuXG4gICAgbWV0aG9kcyA9IHtcbiAgICAgICAgYWRkQ291cG9uKCkge1xuICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvcGFnZXMvY291cG9uRWRpdCcsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcblxuICAgICAgICBlZGl0KCkge1xuICAgICAgICAgICAgdGhpcy5pc0VkaXRpbmcgPSAhdGhpcy5pc0VkaXRpbmc7XG4gICAgICAgIH0sXG5cbiAgICAgICAgYXN5bmMgZGVsZXRlSXRlbXMoKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgY2FuY2VsIH0gPSBhd2FpdCBhbGVydFAoJ+ehruiupOWIoOmZpOaJgOmAieS8mOaDoOWIuO+8nycpO1xuICAgICAgICAgICAgICAgIGlmIChjYW5jZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0VkaXRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNvbnN0IGlkcyA9IHRoaXMuY291cG9ucy5maWx0ZXIoaXRlbSA9PiBpdGVtLmNoZWNrZWQpLm1hcChpdGVtID0+IGl0ZW0uaWQpO1xuICAgICAgICAgICAgICAgIGF3YWl0IFByb21pc2UuYWxsKGlkcy5tYXAoaWQgPT4gcG9zdChERUxFVEVfQ09VUE9OICsgaWQpKSk7XG4gICAgICAgICAgICAgICAgdGhpcy5pc0VkaXRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLmluaXQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWREYXRhKCk7XG4gICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVycm9ySGFuZGxlcihlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICB9XG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIHRoaXMubXBJZCA9IHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ2N1cnJlbnRfbXBpZCcpO1xuICAgICAgICB0aGlzLmxvYWREYXRhKCk7XG4gICAgfVxuXG4gICAgb25TaG93KCkge1xuICAgICAgICBpZiAoZ2xvYmFsU2VydmljZS5nZXQoJ3JlZnJlc2gnKSkge1xuICAgICAgICAgICAgZ2xvYmFsU2VydmljZS5zZXQoJ3JlZnJlc2gnLCBmYWxzZSk7XG4gICAgICAgICAgICAvLyDph43mlrDliqDovb3mlbDmja5cbiAgICAgICAgICAgIHRoaXMuaW5pdCgpO1xuICAgICAgICAgICAgdGhpcy5sb2FkRGF0YSgpO1xuICAgICAgICB9XG4gICAgICAgIC8vIOa4heepuuS8mOaDoOWIuOe8lui+kemhteaVsOaNrlxuICAgICAgICBnbG9iYWxTZXJ2aWNlLnNldCgnY291cG9uTWFuYWdlJywge30pO1xuICAgIH1cblxuICAgIGluaXQoKSB7XG4gICAgICAgIG5vTW9yZSA9IGZhbHNlO1xuICAgICAgICBwYWdlTnVtID0gMTtcbiAgICAgICAgdGhpcy5jb3Vwb25zID0gW107XG4gICAgfVxuXG4gICAgdXBkYXRlZCgpIHtcbiAgICAgICAgcGFnZU51bSArPSAxO1xuICAgIH1cblxuICAgIGFzeW5jIGxvYWREYXRhKCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgeyBtcElkIH0gPSB0aGlzO1xuICAgICAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHRoaXMuZ2V0Q291cG9ucyh7XG4gICAgICAgICAgICAgICAgcGFnZU51bSxcbiAgICAgICAgICAgICAgICBwYWdlU2l6ZSxcbiAgICAgICAgICAgICAgICBtcElkLFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmIChkYXRhICYmIGRhdGEubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb3Vwb25zLnB1c2goLi4uZGF0YSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChkYXRhICYmIChkYXRhLmxlbmd0aCA8IHBhZ2VTaXplKSkge1xuICAgICAgICAgICAgICAgIG5vTW9yZSA9IHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHRoaXMuZXJyb3JIYW5kbGVyKGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25SZWFjaEJvdHRvbSgpIHtcbiAgICAgICAgaWYgKG5vTW9yZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy51cGRhdGVkKCk7XG4gICAgICAgIHRoaXMubG9hZERhdGEoKTtcbiAgICB9XG59XG4iXX0=