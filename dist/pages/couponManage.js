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
