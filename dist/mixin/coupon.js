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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvdXBvbi5qcyJdLCJuYW1lcyI6WyJDb3Vwb25NaXhpbiIsInYiLCJ0eXBlIiwicmVnUmVzIiwibWF0Y2giLCJyZXN1bHQiLCJ0aW1lIiwieWVhciIsIm1vbnRoIiwiZGF5Iiwiam9pbiIsIm1wSWQiLCJwYWdlTnVtIiwicGFnZVNpemUiLCJMT0FEX0NPVVBPTl9MSVNUIiwiY291cG9ucyIsImRhdGEiLCJsZW5ndGgiLCJtYXAiLCJjb3Vwb24iLCJPYmplY3QiLCJhc3NpZ24iLCJpdGVtIiwiY291cG9uQ29uZGl0aW9uIiwidmFsaWRTdGFydHRpbWUiLCJ2YWxpZEVuZHRpbWUiLCJ2YWxpZFR5cGUiLCJEYXRlIiwiZ2V0VGltZSIsIm5vdyIsInVuYWJsZSIsIkpTT04iLCJwYXJzZSIsImUiLCJjb25zb2xlIiwibG9nIiwiZm9ybWF0VGltZSIsIndlcHkiLCJtaXhpbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7K2VBSEE7OztJQUtxQkEsVzs7Ozs7Ozs7Ozs7cUNBQ3VCO0FBQUEsZ0JBQTdCQyxDQUE2Qix1RUFBekIsRUFBeUI7QUFBQSxnQkFBckJDLElBQXFCLHVFQUFkLFlBQWM7O0FBQ3BDLGdCQUFNQyxTQUFTRixFQUFFRyxLQUFGLENBQVEsK0JBQVIsQ0FBZjtBQUNBLGdCQUFJLENBQUNELE1BQUwsRUFBYTtBQUNULHVCQUFPRixDQUFQO0FBQ0g7O0FBRUQsZ0JBQUlJLFNBQVMsRUFBYjs7QUFOb0MseUNBT0hGLE1BUEc7QUFBQSxnQkFPN0JHLElBUDZCO0FBQUEsZ0JBT3ZCQyxJQVB1QjtBQUFBLGdCQU9qQkMsS0FQaUI7QUFBQSxnQkFPVkMsR0FQVTs7QUFTcEMsZ0JBQUlQLFNBQVMsWUFBYixFQUEyQjtBQUN2QkcseUJBQVMsQ0FBQ0UsSUFBRCxFQUFPQyxLQUFQLEVBQWNDLEdBQWQsRUFBbUJDLElBQW5CLENBQXdCLEdBQXhCLENBQVQ7QUFDSDs7QUFFRCxnQkFBSVIsU0FBUyxZQUFiLEVBQTJCO0FBQ3ZCRyx5QkFBU0MsSUFBVDtBQUNIOztBQUVELG1CQUFPRCxNQUFQO0FBQ0g7Ozs7Ozs7b0JBRWtCTSxJLFFBQUFBLEk7b0JBQU1DLE8sUUFBQUEsTztvQkFBU0MsUSxRQUFBQSxROzs7Ozs7OztBQUMxQlIsc0MsR0FBUyxFOzt1Q0FFaUIsZUFBSVMscUJBQUosRUFBc0I7QUFDaERGLG9EQURnRDtBQUVoREMsc0RBRmdEO0FBR2hERjtBQUhnRCxpQ0FBdEIsQzs7OztBQUFsQkksdUMsU0FBTkMsSTs7O0FBTU4sb0NBQUlELFdBQVdBLFFBQVFFLE1BQXZCLEVBQStCO0FBQzNCRiw4Q0FBVUEsUUFBUUcsR0FBUixDQUFZLGdCQUFRO0FBQzFCLDRDQUFNQyxTQUFTQyxPQUFPQyxNQUFQLENBQWMsRUFBZCxFQUFrQkMsSUFBbEIsQ0FBZjtBQUQwQiw0Q0FFcEJDLGVBRm9CLEdBRUFKLE1BRkEsQ0FFcEJJLGVBRm9CO0FBQUEsNENBR2xCQyxjQUhrQixHQUcwQkwsTUFIMUIsQ0FHbEJLLGNBSGtCO0FBQUEsNENBR0ZDLFlBSEUsR0FHMEJOLE1BSDFCLENBR0ZNLFlBSEU7QUFBQSw0Q0FHWUMsU0FIWixHQUcwQlAsTUFIMUIsQ0FHWU8sU0FIWjs7O0FBSzFCLDRDQUFJRDtBQUNBO0FBQ0UsNENBQUlFLElBQUosQ0FBU0YsWUFBVCxDQUFELENBQXlCRyxPQUF6QixLQUFxQyxLQUFLLEVBQUwsR0FBVSxFQUFWLEdBQWUsSUFBckQsR0FBNkRELEtBQUtFLEdBQUwsRUFBN0QsR0FBMEUsQ0FGOUUsRUFHRTtBQUNFVixtREFBT1csTUFBUCxHQUFnQixJQUFoQjtBQUNIOztBQUVELDRDQUFJUCxlQUFKLEVBQXFCO0FBQ2pCLGdEQUFJO0FBQ0FBLGtFQUFrQlEsS0FBS0MsS0FBTCxDQUFXVCxlQUFYLENBQWxCO0FBQ0FILHVEQUFPQyxNQUFQLENBQWNGLE1BQWQsRUFBc0JJLGVBQXRCO0FBQ0gsNkNBSEQsQ0FHRSxPQUFPVSxDQUFQLEVBQVU7QUFDUkMsd0RBQVFDLEdBQVIsQ0FBWUYsQ0FBWjtBQUNIO0FBQ0o7O0FBRUQsNENBQUlQLGNBQWMsQ0FBZCxJQUFtQkYsY0FBbkIsSUFBcUNDLFlBQXpDLEVBQXVEO0FBQ25ETCxtREFBT0MsTUFBUCxDQUFjRixNQUFkLEVBQXNCO0FBQ2xCSyxnRUFBZ0IsT0FBS1ksVUFBTCxDQUFnQlosY0FBaEIsRUFBZ0MsWUFBaEMsQ0FERTtBQUVsQkMsOERBQWMsT0FBS1csVUFBTCxDQUFnQlgsWUFBaEIsRUFBOEIsWUFBOUI7QUFGSSw2Q0FBdEI7QUFJSDs7QUFFRCwrQ0FBT04sTUFBUDtBQUNILHFDQTdCUyxDQUFWOztBQStCQWQsNkNBQVNVLE9BQVQ7QUFDSDs7aUVBRU1WLE07Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFqRTBCZ0MsZUFBS0MsSzs7a0JBQXpCdEMsVyIsImZpbGUiOiJjb3Vwb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKmVzbGludC1kaXNhYmxlICovXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xyXG5pbXBvcnQgeyBMT0FEX0NPVVBPTl9MSVNUIH0gZnJvbSAnLi4vdXRpbHMvdXJsJztcclxuaW1wb3J0IHsgZ2V0IH0gZnJvbSAnLi4vdXRpbHMvYWpheCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb3Vwb25NaXhpbiBleHRlbmRzIHdlcHkubWl4aW4ge1xyXG4gICAgZm9ybWF0VGltZSh2ID0gJycsIHR5cGUgPSAnWVlZWS1ERC1NTScpIHtcclxuICAgICAgICBjb25zdCByZWdSZXMgPSB2Lm1hdGNoKC8oW1xcZF17NH0pLShbXFxkXXsyfSktKFtcXGRdezJ9KS8pO1xyXG4gICAgICAgIGlmICghcmVnUmVzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB2O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHJlc3VsdCA9ICcnO1xyXG4gICAgICAgIGNvbnN0IFt0aW1lLCB5ZWFyLCBtb250aCwgZGF5XSA9IHJlZ1JlcztcclxuXHJcbiAgICAgICAgaWYgKHR5cGUgPT09ICdZWVlZLkRELk1NJykge1xyXG4gICAgICAgICAgICByZXN1bHQgPSBbeWVhciwgbW9udGgsIGRheV0uam9pbignLicpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHR5cGUgPT09ICdZWVlZLURELU1NJykge1xyXG4gICAgICAgICAgICByZXN1bHQgPSB0aW1lO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBnZXRDb3Vwb25zKHsgbXBJZCwgcGFnZU51bSwgcGFnZVNpemUgfSkge1xyXG4gICAgICAgIGxldCByZXN1bHQgPSBbXTtcclxuXHJcbiAgICAgICAgbGV0IHsgZGF0YTogY291cG9ucyB9ID0gYXdhaXQgZ2V0KExPQURfQ09VUE9OX0xJU1QsIHtcclxuICAgICAgICAgICAgcGFnZU51bSxcclxuICAgICAgICAgICAgcGFnZVNpemUsXHJcbiAgICAgICAgICAgIG1wSWQsXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmIChjb3Vwb25zICYmIGNvdXBvbnMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGNvdXBvbnMgPSBjb3Vwb25zLm1hcChpdGVtID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNvdXBvbiA9IE9iamVjdC5hc3NpZ24oe30sIGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgbGV0IHsgY291cG9uQ29uZGl0aW9uIH0gPSBjb3Vwb247XHJcbiAgICAgICAgICAgICAgICBjb25zdCB7IHZhbGlkU3RhcnR0aW1lLCB2YWxpZEVuZHRpbWUsIHZhbGlkVHlwZSB9ID0gY291cG9uO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh2YWxpZEVuZHRpbWUgJiZcclxuICAgICAgICAgICAgICAgICAgICAvLyDov5jpnIDopoHliqDkuIrmnInmlYjmnJ/lvZPlpKnnmoTpgqPkuIDmlbTlpKkyNOWwj+aXtueahOaXtumXtFxyXG4gICAgICAgICAgICAgICAgICAgICgobmV3IERhdGUodmFsaWRFbmR0aW1lKSkuZ2V0VGltZSgpICsgMjQgKiA2MCAqIDYwICogMTAwMCkgLSBEYXRlLm5vdygpIDwgMFxyXG4gICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY291cG9uLnVuYWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGNvdXBvbkNvbmRpdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvdXBvbkNvbmRpdGlvbiA9IEpTT04ucGFyc2UoY291cG9uQ29uZGl0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihjb3Vwb24sIGNvdXBvbkNvbmRpdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHZhbGlkVHlwZSA9PT0gMSAmJiB2YWxpZFN0YXJ0dGltZSAmJiB2YWxpZEVuZHRpbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKGNvdXBvbiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWxpZFN0YXJ0dGltZTogdGhpcy5mb3JtYXRUaW1lKHZhbGlkU3RhcnR0aW1lLCAnWVlZWS5ERC5NTScpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWxpZEVuZHRpbWU6IHRoaXMuZm9ybWF0VGltZSh2YWxpZEVuZHRpbWUsICdZWVlZLkRELk1NJyksXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvdXBvbjtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICByZXN1bHQgPSBjb3Vwb25zO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxufVxyXG4iXX0=