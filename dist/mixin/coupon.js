'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _url = require('./../utils/url.js');

var _ajax = require('./../utils/ajax.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CouponMixin = function (_wepy$mixin) {
    _inherits(CouponMixin, _wepy$mixin);

    function CouponMixin() {
        _classCallCheck(this, CouponMixin);

        return _possibleConstructorReturn(this, (CouponMixin.__proto__ || Object.getPrototypeOf(CouponMixin)).apply(this, arguments));
    }

    _createClass(CouponMixin, [{
        key: 'formatTime',
        value: function formatTime() {
            var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
            var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'YYYY-DD-MM';

            var regRes = v.match(/([\d]{4})-([\d]{2})-([\d]{2})/);
            if (!regRes) {
                return v;
            }

            var result = '';

            var _regRes = _slicedToArray(regRes, 4),
                time = _regRes[0],
                year = _regRes[1],
                month = _regRes[2],
                day = _regRes[3];

            if (type === 'YYYY.DD.MM') {
                result = [year, month, day].join('.');
            }

            if (type === 'YYYY-DD-MM') {
                result = time;
            }

            return result;
        }
    }, {
        key: 'getCoupons',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref) {
                var _this2 = this;

                var mpId = _ref.mpId,
                    pageNum = _ref.pageNum,
                    pageSize = _ref.pageSize;

                var result, _ref3, coupons;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                result = [];
                                _context.next = 3;
                                return (0, _ajax.get)(_url.LOAD_COUPON_LIST, {
                                    pageNum: pageNum,
                                    pageSize: pageSize,
                                    mpId: mpId
                                });

                            case 3:
                                _ref3 = _context.sent;
                                coupons = _ref3.data;


                                if (coupons && coupons.length) {
                                    coupons = coupons.map(function (item) {
                                        var coupon = Object.assign({}, item);
                                        var couponCondition = coupon.couponCondition;
                                        var validStarttime = coupon.validStarttime,
                                            validEndtime = coupon.validEndtime,
                                            validType = coupon.validType;


                                        if (validEndtime &&
                                        // 还需要加上有效期当天的那一整天24小时的时间
                                        new Date(validEndtime).getTime() + 24 * 60 * 60 * 1000 - Date.now() < 0) {
                                            coupon.unable = true;
                                        }

                                        if (couponCondition) {
                                            try {
                                                couponCondition = JSON.parse(couponCondition);
                                                Object.assign(coupon, couponCondition);
                                            } catch (e) {
                                                console.log(e);
                                            }
                                        }

                                        if (validType === 1 && validStarttime && validEndtime) {
                                            Object.assign(coupon, {
                                                validStarttime: _this2.formatTime(validStarttime, 'YYYY.DD.MM'),
                                                validEndtime: _this2.formatTime(validEndtime, 'YYYY.DD.MM')
                                            });
                                        }

                                        return coupon;
                                    });

                                    result = coupons;
                                }

                                return _context.abrupt('return', result);

                            case 7:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function getCoupons(_x3) {
                return _ref2.apply(this, arguments);
            }

            return getCoupons;
        }()
    }]);

    return CouponMixin;
}(_wepy2.default.mixin);

exports.default = CouponMixin;