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
        value: function formatTime(v) {
            var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'YYYY-DD-MM';

            var regRes = v.match(/([\d]{4})-([\d]{2})-([\d]{2})/);
            if (!regRes) {
                return;
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


                                        if (validEndtime && new Date(validEndtime).getTime() - Date.now() < 0) {
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

            function getCoupons(_x2) {
                return _ref2.apply(this, arguments);
            }

            return getCoupons;
        }()
    }]);

    return CouponMixin;
}(_wepy2.default.mixin);

exports.default = CouponMixin;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvdXBvbi5qcyJdLCJuYW1lcyI6WyJDb3Vwb25NaXhpbiIsInYiLCJ0eXBlIiwicmVnUmVzIiwibWF0Y2giLCJyZXN1bHQiLCJ0aW1lIiwieWVhciIsIm1vbnRoIiwiZGF5Iiwiam9pbiIsIm1wSWQiLCJwYWdlTnVtIiwicGFnZVNpemUiLCJMT0FEX0NPVVBPTl9MSVNUIiwiY291cG9ucyIsImRhdGEiLCJsZW5ndGgiLCJtYXAiLCJjb3Vwb24iLCJPYmplY3QiLCJhc3NpZ24iLCJpdGVtIiwiY291cG9uQ29uZGl0aW9uIiwidmFsaWRTdGFydHRpbWUiLCJ2YWxpZEVuZHRpbWUiLCJ2YWxpZFR5cGUiLCJEYXRlIiwiZ2V0VGltZSIsIm5vdyIsInVuYWJsZSIsIkpTT04iLCJwYXJzZSIsImUiLCJjb25zb2xlIiwibG9nIiwiZm9ybWF0VGltZSIsIndlcHkiLCJtaXhpbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsVzs7Ozs7Ozs7Ozs7bUNBQ05DLEMsRUFBd0I7QUFBQSxnQkFBckJDLElBQXFCLHVFQUFkLFlBQWM7O0FBQy9CLGdCQUFNQyxTQUFTRixFQUFFRyxLQUFGLENBQVEsK0JBQVIsQ0FBZjtBQUNBLGdCQUFJLENBQUNELE1BQUwsRUFBYTtBQUNUO0FBQ0g7O0FBRUQsZ0JBQUlFLFNBQVMsRUFBYjs7QUFOK0IseUNBT0VGLE1BUEY7QUFBQSxnQkFPeEJHLElBUHdCO0FBQUEsZ0JBT2xCQyxJQVBrQjtBQUFBLGdCQU9aQyxLQVBZO0FBQUEsZ0JBT0xDLEdBUEs7O0FBUy9CLGdCQUFJUCxTQUFTLFlBQWIsRUFBMkI7QUFDdkJHLHlCQUFTLENBQUNFLElBQUQsRUFBT0MsS0FBUCxFQUFjQyxHQUFkLEVBQW1CQyxJQUFuQixDQUF3QixHQUF4QixDQUFUO0FBQ0g7O0FBRUQsZ0JBQUlSLFNBQVMsWUFBYixFQUEyQjtBQUN2QkcseUJBQVNDLElBQVQ7QUFDSDs7QUFFRCxtQkFBT0QsTUFBUDtBQUNIOzs7Ozs7O29CQUVrQk0sSSxRQUFBQSxJO29CQUFNQyxPLFFBQUFBLE87b0JBQVNDLFEsUUFBQUEsUTs7Ozs7Ozs7QUFDMUJSLHNDLEdBQVMsRTs7dUNBRWlCLGVBQUlTLHFCQUFKLEVBQXNCO0FBQ2hERixvREFEZ0Q7QUFFaERDLHNEQUZnRDtBQUdoREY7QUFIZ0QsaUNBQXRCLEM7Ozs7QUFBbEJJLHVDLFNBQU5DLEk7OztBQU1OLG9DQUFJRCxXQUFXQSxRQUFRRSxNQUF2QixFQUErQjtBQUMzQkYsOENBQVVBLFFBQVFHLEdBQVIsQ0FBWSxnQkFBUTtBQUMxQiw0Q0FBTUMsU0FBU0MsT0FBT0MsTUFBUCxDQUFjLEVBQWQsRUFBa0JDLElBQWxCLENBQWY7QUFEMEIsNENBRXBCQyxlQUZvQixHQUVBSixNQUZBLENBRXBCSSxlQUZvQjtBQUFBLDRDQUdsQkMsY0FIa0IsR0FHMEJMLE1BSDFCLENBR2xCSyxjQUhrQjtBQUFBLDRDQUdGQyxZQUhFLEdBRzBCTixNQUgxQixDQUdGTSxZQUhFO0FBQUEsNENBR1lDLFNBSFosR0FHMEJQLE1BSDFCLENBR1lPLFNBSFo7OztBQUsxQiw0Q0FBSUQsZ0JBQWlCLElBQUlFLElBQUosQ0FBU0YsWUFBVCxDQUFELENBQXlCRyxPQUF6QixLQUFxQ0QsS0FBS0UsR0FBTCxFQUFyQyxHQUFrRCxDQUF0RSxFQUF5RTtBQUNyRVYsbURBQU9XLE1BQVAsR0FBZ0IsSUFBaEI7QUFDSDs7QUFFRCw0Q0FBSVAsZUFBSixFQUFxQjtBQUNqQixnREFBSTtBQUNBQSxrRUFBa0JRLEtBQUtDLEtBQUwsQ0FBV1QsZUFBWCxDQUFsQjtBQUNBSCx1REFBT0MsTUFBUCxDQUFjRixNQUFkLEVBQXNCSSxlQUF0QjtBQUNILDZDQUhELENBR0UsT0FBT1UsQ0FBUCxFQUFVO0FBQ1JDLHdEQUFRQyxHQUFSLENBQVlGLENBQVo7QUFDSDtBQUNKOztBQUVELDRDQUFJUCxjQUFjLENBQWQsSUFBbUJGLGNBQW5CLElBQXFDQyxZQUF6QyxFQUF1RDtBQUNuREwsbURBQU9DLE1BQVAsQ0FBY0YsTUFBZCxFQUFzQjtBQUNsQkssZ0VBQWdCLE9BQUtZLFVBQUwsQ0FBZ0JaLGNBQWhCLEVBQWdDLFlBQWhDLENBREU7QUFFbEJDLDhEQUFjLE9BQUtXLFVBQUwsQ0FBZ0JYLFlBQWhCLEVBQThCLFlBQTlCO0FBRkksNkNBQXRCO0FBSUg7O0FBRUQsK0NBQU9OLE1BQVA7QUFDSCxxQ0ExQlMsQ0FBVjs7QUE0QkFkLDZDQUFTVSxPQUFUO0FBQ0g7O2lFQUVNVixNOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBOUQwQmdDLGVBQUtDLEs7O2tCQUF6QnRDLFciLCJmaWxlIjoiY291cG9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XHJcbmltcG9ydCB7IExPQURfQ09VUE9OX0xJU1QgfSBmcm9tICcuLi91dGlscy91cmwnO1xyXG5pbXBvcnQgeyBnZXQgfSBmcm9tICcuLi91dGlscy9hamF4JztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvdXBvbk1peGluIGV4dGVuZHMgd2VweS5taXhpbiB7XHJcbiAgICBmb3JtYXRUaW1lKHYsIHR5cGUgPSAnWVlZWS1ERC1NTScpIHtcclxuICAgICAgICBjb25zdCByZWdSZXMgPSB2Lm1hdGNoKC8oW1xcZF17NH0pLShbXFxkXXsyfSktKFtcXGRdezJ9KS8pO1xyXG4gICAgICAgIGlmICghcmVnUmVzKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCByZXN1bHQgPSAnJztcclxuICAgICAgICBjb25zdCBbdGltZSwgeWVhciwgbW9udGgsIGRheV0gPSByZWdSZXM7XHJcblxyXG4gICAgICAgIGlmICh0eXBlID09PSAnWVlZWS5ERC5NTScpIHtcclxuICAgICAgICAgICAgcmVzdWx0ID0gW3llYXIsIG1vbnRoLCBkYXldLmpvaW4oJy4nKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0eXBlID09PSAnWVlZWS1ERC1NTScpIHtcclxuICAgICAgICAgICAgcmVzdWx0ID0gdGltZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgZ2V0Q291cG9ucyh7IG1wSWQsIHBhZ2VOdW0sIHBhZ2VTaXplIH0pIHtcclxuICAgICAgICBsZXQgcmVzdWx0ID0gW107XHJcblxyXG4gICAgICAgIGxldCB7IGRhdGE6IGNvdXBvbnMgfSA9IGF3YWl0IGdldChMT0FEX0NPVVBPTl9MSVNULCB7XHJcbiAgICAgICAgICAgIHBhZ2VOdW0sXHJcbiAgICAgICAgICAgIHBhZ2VTaXplLFxyXG4gICAgICAgICAgICBtcElkLFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAoY291cG9ucyAmJiBjb3Vwb25zLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBjb3Vwb25zID0gY291cG9ucy5tYXAoaXRlbSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjb3Vwb24gPSBPYmplY3QuYXNzaWduKHt9LCBpdGVtKTtcclxuICAgICAgICAgICAgICAgIGxldCB7IGNvdXBvbkNvbmRpdGlvbiB9ID0gY291cG9uO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgeyB2YWxpZFN0YXJ0dGltZSwgdmFsaWRFbmR0aW1lLCB2YWxpZFR5cGUgfSA9IGNvdXBvbjtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodmFsaWRFbmR0aW1lICYmIChuZXcgRGF0ZSh2YWxpZEVuZHRpbWUpKS5nZXRUaW1lKCkgLSBEYXRlLm5vdygpIDwgMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvdXBvbi51bmFibGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChjb3Vwb25Db25kaXRpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb3Vwb25Db25kaXRpb24gPSBKU09OLnBhcnNlKGNvdXBvbkNvbmRpdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oY291cG9uLCBjb3Vwb25Db25kaXRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICh2YWxpZFR5cGUgPT09IDEgJiYgdmFsaWRTdGFydHRpbWUgJiYgdmFsaWRFbmR0aW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihjb3Vwb24sIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRTdGFydHRpbWU6IHRoaXMuZm9ybWF0VGltZSh2YWxpZFN0YXJ0dGltZSwgJ1lZWVkuREQuTU0nKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRFbmR0aW1lOiB0aGlzLmZvcm1hdFRpbWUodmFsaWRFbmR0aW1lLCAnWVlZWS5ERC5NTScpLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBjb3Vwb247XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgcmVzdWx0ID0gY291cG9ucztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbn0iXX0=