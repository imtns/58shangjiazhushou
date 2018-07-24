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

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*eslint-disable */


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

        /**
         * @desc 检查优惠券是否可以使用
         * @param {Object} coupon 优惠券对象
         * @return {Boolean} 可用返回true，不可用返回false
         */

    }, {
        key: 'checkUsable',
        value: function checkUsable(coupon) {
            var validEndtime = coupon.validEndtime,
                totalCount = coupon.totalCount,
                useCount = coupon.useCount;

            // 时间过期

            if (validEndtime &&
            // 还需要加上有效期当天的那一整天24小时的时间
            new Date(validEndtime).getTime() + 24 * 60 * 60 * 1000 - Date.now() < 0) {
                return false;
            }

            // 优惠券已使用数目和总数相等时
            if (+useCount >= +totalCount) {
                return false;
            }

            return true;
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


                                        coupon.usable = _this2.checkUsable(coupon);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvdXBvbi5qcyJdLCJuYW1lcyI6WyJDb3Vwb25NaXhpbiIsInYiLCJ0eXBlIiwicmVnUmVzIiwibWF0Y2giLCJyZXN1bHQiLCJ0aW1lIiwieWVhciIsIm1vbnRoIiwiZGF5Iiwiam9pbiIsImNvdXBvbiIsInZhbGlkRW5kdGltZSIsInRvdGFsQ291bnQiLCJ1c2VDb3VudCIsIkRhdGUiLCJnZXRUaW1lIiwibm93IiwibXBJZCIsInBhZ2VOdW0iLCJwYWdlU2l6ZSIsIkxPQURfQ09VUE9OX0xJU1QiLCJjb3Vwb25zIiwiZGF0YSIsImxlbmd0aCIsIm1hcCIsIk9iamVjdCIsImFzc2lnbiIsIml0ZW0iLCJjb3Vwb25Db25kaXRpb24iLCJ2YWxpZFN0YXJ0dGltZSIsInZhbGlkVHlwZSIsInVzYWJsZSIsImNoZWNrVXNhYmxlIiwiSlNPTiIsInBhcnNlIiwiZSIsImNvbnNvbGUiLCJsb2ciLCJmb3JtYXRUaW1lIiwid2VweSIsIm1peGluIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7Ozs7Ozs7OzsrZUFIQTs7O0lBS3FCQSxXOzs7Ozs7Ozs7OztxQ0FDdUI7QUFBQSxnQkFBN0JDLENBQTZCLHVFQUF6QixFQUF5QjtBQUFBLGdCQUFyQkMsSUFBcUIsdUVBQWQsWUFBYzs7QUFDcEMsZ0JBQU1DLFNBQVNGLEVBQUVHLEtBQUYsQ0FBUSwrQkFBUixDQUFmO0FBQ0EsZ0JBQUksQ0FBQ0QsTUFBTCxFQUFhO0FBQ1QsdUJBQU9GLENBQVA7QUFDSDs7QUFFRCxnQkFBSUksU0FBUyxFQUFiOztBQU5vQyx5Q0FPSEYsTUFQRztBQUFBLGdCQU83QkcsSUFQNkI7QUFBQSxnQkFPdkJDLElBUHVCO0FBQUEsZ0JBT2pCQyxLQVBpQjtBQUFBLGdCQU9WQyxHQVBVOztBQVNwQyxnQkFBSVAsU0FBUyxZQUFiLEVBQTJCO0FBQ3ZCRyx5QkFBUyxDQUFDRSxJQUFELEVBQU9DLEtBQVAsRUFBY0MsR0FBZCxFQUFtQkMsSUFBbkIsQ0FBd0IsR0FBeEIsQ0FBVDtBQUNIOztBQUVELGdCQUFJUixTQUFTLFlBQWIsRUFBMkI7QUFDdkJHLHlCQUFTQyxJQUFUO0FBQ0g7O0FBRUQsbUJBQU9ELE1BQVA7QUFDSDs7QUFFRDs7Ozs7Ozs7b0NBS1lNLE0sRUFBUTtBQUFBLGdCQUNSQyxZQURRLEdBQytCRCxNQUQvQixDQUNSQyxZQURRO0FBQUEsZ0JBQ01DLFVBRE4sR0FDK0JGLE1BRC9CLENBQ01FLFVBRE47QUFBQSxnQkFDa0JDLFFBRGxCLEdBQytCSCxNQUQvQixDQUNrQkcsUUFEbEI7O0FBR2hCOztBQUNBLGdCQUFJRjtBQUNBO0FBQ0UsZ0JBQUlHLElBQUosQ0FBU0gsWUFBVCxDQUFELENBQXlCSSxPQUF6QixLQUFxQyxLQUFLLEVBQUwsR0FBVSxFQUFWLEdBQWUsSUFBckQsR0FBNkRELEtBQUtFLEdBQUwsRUFBN0QsR0FBMEUsQ0FGOUUsRUFHRTtBQUNFLHVCQUFPLEtBQVA7QUFDSDs7QUFFRDtBQUNBLGdCQUFJLENBQUNILFFBQUQsSUFBYSxDQUFDRCxVQUFsQixFQUE4QjtBQUMxQix1QkFBTyxLQUFQO0FBQ0g7O0FBRUQsbUJBQU8sSUFBUDtBQUNIOzs7Ozs7O29CQUVrQkssSSxRQUFBQSxJO29CQUFNQyxPLFFBQUFBLE87b0JBQVNDLFEsUUFBQUEsUTs7Ozs7Ozs7QUFDMUJmLHNDLEdBQVMsRTs7dUNBRWlCLGVBQUlnQixxQkFBSixFQUFzQjtBQUNoREYsb0RBRGdEO0FBRWhEQyxzREFGZ0Q7QUFHaERGO0FBSGdELGlDQUF0QixDOzs7O0FBQWxCSSx1QyxTQUFOQyxJOzs7QUFNTixvQ0FBSUQsV0FBV0EsUUFBUUUsTUFBdkIsRUFBK0I7QUFDM0JGLDhDQUFVQSxRQUFRRyxHQUFSLENBQVksZ0JBQVE7QUFDMUIsNENBQU1kLFNBQVNlLE9BQU9DLE1BQVAsQ0FBYyxFQUFkLEVBQWtCQyxJQUFsQixDQUFmO0FBRDBCLDRDQUVwQkMsZUFGb0IsR0FFQWxCLE1BRkEsQ0FFcEJrQixlQUZvQjtBQUFBLDRDQUdsQkMsY0FIa0IsR0FHMEJuQixNQUgxQixDQUdsQm1CLGNBSGtCO0FBQUEsNENBR0ZsQixZQUhFLEdBRzBCRCxNQUgxQixDQUdGQyxZQUhFO0FBQUEsNENBR1ltQixTQUhaLEdBRzBCcEIsTUFIMUIsQ0FHWW9CLFNBSFo7OztBQUsxQnBCLCtDQUFPcUIsTUFBUCxHQUFnQixPQUFLQyxXQUFMLENBQWlCdEIsTUFBakIsQ0FBaEI7O0FBRUEsNENBQUlrQixlQUFKLEVBQXFCO0FBQ2pCLGdEQUFJO0FBQ0FBLGtFQUFrQkssS0FBS0MsS0FBTCxDQUFXTixlQUFYLENBQWxCO0FBQ0FILHVEQUFPQyxNQUFQLENBQWNoQixNQUFkLEVBQXNCa0IsZUFBdEI7QUFDSCw2Q0FIRCxDQUdFLE9BQU9PLENBQVAsRUFBVTtBQUNSQyx3REFBUUMsR0FBUixDQUFZRixDQUFaO0FBQ0g7QUFDSjs7QUFFRCw0Q0FBSUwsY0FBYyxDQUFkLElBQW1CRCxjQUFuQixJQUFxQ2xCLFlBQXpDLEVBQXVEO0FBQ25EYyxtREFBT0MsTUFBUCxDQUFjaEIsTUFBZCxFQUFzQjtBQUNsQm1CLGdFQUFnQixPQUFLUyxVQUFMLENBQWdCVCxjQUFoQixFQUFnQyxZQUFoQyxDQURFO0FBRWxCbEIsOERBQWMsT0FBSzJCLFVBQUwsQ0FBZ0IzQixZQUFoQixFQUE4QixZQUE5QjtBQUZJLDZDQUF0QjtBQUlIOztBQUVELCtDQUFPRCxNQUFQO0FBQ0gscUNBeEJTLENBQVY7O0FBMEJBTiw2Q0FBU2lCLE9BQVQ7QUFDSDs7aUVBRU1qQixNOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBcEYwQm1DLGVBQUtDLEs7O2tCQUF6QnpDLFciLCJmaWxlIjoiY291cG9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyplc2xpbnQtZGlzYWJsZSAqL1xuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5pbXBvcnQgeyBMT0FEX0NPVVBPTl9MSVNUIH0gZnJvbSAnLi4vdXRpbHMvdXJsJztcbmltcG9ydCB7IGdldCB9IGZyb20gJy4uL3V0aWxzL2FqYXgnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb3Vwb25NaXhpbiBleHRlbmRzIHdlcHkubWl4aW4ge1xuICAgIGZvcm1hdFRpbWUodiA9ICcnLCB0eXBlID0gJ1lZWVktREQtTU0nKSB7XG4gICAgICAgIGNvbnN0IHJlZ1JlcyA9IHYubWF0Y2goLyhbXFxkXXs0fSktKFtcXGRdezJ9KS0oW1xcZF17Mn0pLyk7XG4gICAgICAgIGlmICghcmVnUmVzKSB7XG4gICAgICAgICAgICByZXR1cm4gdjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCByZXN1bHQgPSAnJztcbiAgICAgICAgY29uc3QgW3RpbWUsIHllYXIsIG1vbnRoLCBkYXldID0gcmVnUmVzO1xuXG4gICAgICAgIGlmICh0eXBlID09PSAnWVlZWS5ERC5NTScpIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IFt5ZWFyLCBtb250aCwgZGF5XS5qb2luKCcuJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZSA9PT0gJ1lZWVktREQtTU0nKSB7XG4gICAgICAgICAgICByZXN1bHQgPSB0aW1lO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZGVzYyDmo4Dmn6XkvJjmg6DliLjmmK/lkKblj6/ku6Xkvb/nlKhcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gY291cG9uIOS8mOaDoOWIuOWvueixoVxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59IOWPr+eUqOi/lOWbnnRydWXvvIzkuI3lj6/nlKjov5Tlm55mYWxzZVxuICAgICAqL1xuICAgIGNoZWNrVXNhYmxlKGNvdXBvbikge1xuICAgICAgICBjb25zdCB7IHZhbGlkRW5kdGltZSwgdG90YWxDb3VudCwgdXNlQ291bnQgfSA9IGNvdXBvbjtcblxuICAgICAgICAvLyDml7bpl7Tov4fmnJ9cbiAgICAgICAgaWYgKHZhbGlkRW5kdGltZSAmJiBcbiAgICAgICAgICAgIC8vIOi/mOmcgOimgeWKoOS4iuacieaViOacn+W9k+WkqeeahOmCo+S4gOaVtOWkqTI05bCP5pe255qE5pe26Ze0XG4gICAgICAgICAgICAoKG5ldyBEYXRlKHZhbGlkRW5kdGltZSkpLmdldFRpbWUoKSArIDI0ICogNjAgKiA2MCAqIDEwMDApIC0gRGF0ZS5ub3coKSA8IDBcbiAgICAgICAgKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICAvLyDkvJjmg6DliLjlt7Lkvb/nlKjmlbDnm67lkozmgLvmlbDnm7jnrYnml7ZcbiAgICAgICAgaWYgKCt1c2VDb3VudCA+PSArdG90YWxDb3VudCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgYXN5bmMgZ2V0Q291cG9ucyh7IG1wSWQsIHBhZ2VOdW0sIHBhZ2VTaXplIH0pIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IFtdO1xuXG4gICAgICAgIGxldCB7IGRhdGE6IGNvdXBvbnMgfSA9IGF3YWl0IGdldChMT0FEX0NPVVBPTl9MSVNULCB7XG4gICAgICAgICAgICBwYWdlTnVtLFxuICAgICAgICAgICAgcGFnZVNpemUsXG4gICAgICAgICAgICBtcElkLFxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoY291cG9ucyAmJiBjb3Vwb25zLmxlbmd0aCkge1xuICAgICAgICAgICAgY291cG9ucyA9IGNvdXBvbnMubWFwKGl0ZW0gPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvdXBvbiA9IE9iamVjdC5hc3NpZ24oe30sIGl0ZW0pO1xuICAgICAgICAgICAgICAgIGxldCB7IGNvdXBvbkNvbmRpdGlvbiB9ID0gY291cG9uO1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgdmFsaWRTdGFydHRpbWUsIHZhbGlkRW5kdGltZSwgdmFsaWRUeXBlIH0gPSBjb3Vwb247XG5cbiAgICAgICAgICAgICAgICBjb3Vwb24udXNhYmxlID0gdGhpcy5jaGVja1VzYWJsZShjb3Vwb24pO1xuXG4gICAgICAgICAgICAgICAgaWYgKGNvdXBvbkNvbmRpdGlvbikge1xuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY291cG9uQ29uZGl0aW9uID0gSlNPTi5wYXJzZShjb3Vwb25Db25kaXRpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihjb3Vwb24sIGNvdXBvbkNvbmRpdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHZhbGlkVHlwZSA9PT0gMSAmJiB2YWxpZFN0YXJ0dGltZSAmJiB2YWxpZEVuZHRpbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihjb3Vwb24sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkU3RhcnR0aW1lOiB0aGlzLmZvcm1hdFRpbWUodmFsaWRTdGFydHRpbWUsICdZWVlZLkRELk1NJyksXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWxpZEVuZHRpbWU6IHRoaXMuZm9ybWF0VGltZSh2YWxpZEVuZHRpbWUsICdZWVlZLkRELk1NJyksXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBjb3Vwb247XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmVzdWx0ID0gY291cG9ucztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxufVxuIl19