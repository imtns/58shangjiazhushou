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
