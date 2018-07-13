'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _mixins = require('./../mixins/index.js');

var _mixins2 = _interopRequireDefault(_mixins);

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
            navigationBarTitleText: '优惠券内容'
        }, _this.data = {
            form: {
                id: '',
                mpId: '',
                title: '',
                subTitle: '',
                couponType: '',
                totalCount: 0, // 库存
                limitCount: 0, // 每人限领
                validType: '', // 1 固定时间，2 领取后生效
                validDays: null,
                validAfterDays: null,
                validStarttime: '',
                validEndtime: '',
                applyType: '',
                serviceIds: ''
            }
        }, _this.mixins = [_mixins2.default], _this.methods = {
            save: function () {
                var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                    var form, postData;
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    _context.prev = 0;

                                    // 数据过滤
                                    form = this.form;
                                    postData = {};

                                    Object.keys(form).forEach(function (key) {
                                        if (form[key]) {
                                            postData[key] = form[key];
                                        }
                                    });

                                    this.validator(postData);

                                    _context.next = 7;
                                    return (0, _ajax.post)(_url.SAVE_COUPON, postData);

                                case 7:
                                    _wepy2.default.navigateBack();
                                    _context.next = 14;
                                    break;

                                case 10:
                                    _context.prev = 10;
                                    _context.t0 = _context['catch'](0);

                                    (0, _utils.alert)(_context.t0);
                                    this.errorHandler(_context.t0);

                                case 14:
                                case 'end':
                                    return _context.stop();
                            }
                        }
                    }, _callee, this, [[0, 10]]);
                }));

                function save() {
                    return _ref2.apply(this, arguments);
                }

                return save;
            }(),
            setFormData: function setFormData(prop, e) {
                this.form[prop] = e.detail.value;
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Index, [{
        key: 'validator',
        value: function validator(data) {
            var msg = '';
            if (data.couponDiscard < 0 || data.couponDiscard > 99) {
                msg = '享受折扣应该介于0至9.9折';
            }

            if (msg) {
                throw new Error(msg);
            }
        }
    }, {
        key: 'onLoad',
        value: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(options) {
                var id;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                id = options.id;

                                if (!id) {
                                    _context2.next = 5;
                                    break;
                                }

                                _context2.next = 4;
                                return this.loadData(id);

                            case 4:
                                this.updateData();

                            case 5:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function onLoad(_x) {
                return _ref3.apply(this, arguments);
            }

            return onLoad;
        }()
    }, {
        key: 'onShow',
        value: function onShow() {
            // 每次onShow同步数据
            var couponManage = _globalService2.default.get('couponManage');
            Object.assign(this.form, couponManage);
        }
    }, {
        key: 'loadData',
        value: function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(id) {
                var _ref5, coupon, couponCondition, mpId, title, subTitle, couponType, totalCount, limitCount, limitAmount, couponDiscard, reliefAmount, validType, validDays, validAfterDays, validStarttime, validEndtime, applyType, services, serviceIds;

                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _context3.prev = 0;
                                _context3.next = 3;
                                return (0, _ajax.get)(_url.LOAD_COUPON + id);

                            case 3:
                                _ref5 = _context3.sent;
                                coupon = _ref5.data;
                                couponCondition = coupon.couponCondition;
                                mpId = _wepy2.default.getStorageSync('current_mpid');


                                if (couponCondition) {
                                    try {
                                        couponCondition = JSON.parse(couponCondition);
                                        Object.assign(coupon, couponCondition);
                                    } catch (e) {
                                        this.errorHandler(e);
                                    }
                                }

                                title = coupon.title, subTitle = coupon.subTitle, couponType = coupon.couponType, totalCount = coupon.totalCount, limitCount = coupon.limitCount, limitAmount = coupon.limitAmount, couponDiscard = coupon.couponDiscard, reliefAmount = coupon.reliefAmount, validType = coupon.validType, validDays = coupon.validDays, validAfterDays = coupon.validAfterDays, validStarttime = coupon.validStarttime, validEndtime = coupon.validEndtime, applyType = coupon.applyType, services = coupon.services;
                                serviceIds = '';


                                if (services && services.length) {
                                    serviceIds = services.map(function (item) {
                                        return item.id;
                                    }).join(',');
                                }

                                Object.assign(this.form, {
                                    id: id,
                                    mpId: mpId,
                                    title: title,
                                    subTitle: subTitle,
                                    couponType: couponType,
                                    totalCount: totalCount,
                                    limitCount: limitCount,
                                    limitAmount: limitAmount,
                                    couponDiscard: couponDiscard,
                                    reliefAmount: reliefAmount,
                                    validType: validType,
                                    validDays: validDays,
                                    validAfterDays: validAfterDays,
                                    validStarttime: validStarttime,
                                    validEndtime: validEndtime,
                                    applyType: applyType,
                                    serviceIds: serviceIds
                                });

                                this.$apply();
                                _context3.next = 18;
                                break;

                            case 15:
                                _context3.prev = 15;
                                _context3.t0 = _context3['catch'](0);

                                this.errorHandler(_context3.t0);

                            case 18:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this, [[0, 15]]);
            }));

            function loadData(_x2) {
                return _ref4.apply(this, arguments);
            }

            return loadData;
        }()
    }, {
        key: 'updateData',
        value: function updateData() {
            var couponManage = _globalService2.default.get('couponManage');
            _globalService2.default.set('couponManage', Object.assign(couponManage, this.form));
        }
    }]);

    return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/couponEdit'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvdXBvbkVkaXQuanMiXSwibmFtZXMiOlsiSW5kZXgiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsImZvcm0iLCJpZCIsIm1wSWQiLCJ0aXRsZSIsInN1YlRpdGxlIiwiY291cG9uVHlwZSIsInRvdGFsQ291bnQiLCJsaW1pdENvdW50IiwidmFsaWRUeXBlIiwidmFsaWREYXlzIiwidmFsaWRBZnRlckRheXMiLCJ2YWxpZFN0YXJ0dGltZSIsInZhbGlkRW5kdGltZSIsImFwcGx5VHlwZSIsInNlcnZpY2VJZHMiLCJtaXhpbnMiLCJNaXhpbiIsIm1ldGhvZHMiLCJzYXZlIiwicG9zdERhdGEiLCJPYmplY3QiLCJrZXlzIiwiZm9yRWFjaCIsImtleSIsInZhbGlkYXRvciIsIlNBVkVfQ09VUE9OIiwid2VweSIsIm5hdmlnYXRlQmFjayIsImVycm9ySGFuZGxlciIsInNldEZvcm1EYXRhIiwicHJvcCIsImUiLCJkZXRhaWwiLCJ2YWx1ZSIsIm1zZyIsImNvdXBvbkRpc2NhcmQiLCJFcnJvciIsIm9wdGlvbnMiLCJsb2FkRGF0YSIsInVwZGF0ZURhdGEiLCJjb3Vwb25NYW5hZ2UiLCJnbG9iYWxTZXJ2aWNlIiwiZ2V0IiwiYXNzaWduIiwiTE9BRF9DT1VQT04iLCJjb3Vwb24iLCJjb3Vwb25Db25kaXRpb24iLCJnZXRTdG9yYWdlU3luYyIsIkpTT04iLCJwYXJzZSIsImxpbWl0QW1vdW50IiwicmVsaWVmQW1vdW50Iiwic2VydmljZXMiLCJsZW5ndGgiLCJtYXAiLCJpdGVtIiwiam9pbiIsIiRhcHBseSIsInNldCIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7OztJQUVxQkEsSzs7Ozs7Ozs7Ozs7Ozs7d0xBQ2pCQyxNLEdBQVM7QUFDTEMsb0NBQXdCO0FBRG5CLFMsUUFJVEMsSSxHQUFPO0FBQ0hDLGtCQUFNO0FBQ0ZDLG9CQUFJLEVB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LENBQWNILFlBQWQsRUFBNEIsS0FBS3hDLElBQWpDLENBQWxDO0FBQ0g7Ozs7RUFsSjhCMEIsZUFBS2lDLEk7O2tCQUFuQi9ELEsiLCJmaWxlIjoiY291cG9uRWRpdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcclxuaW1wb3J0IE1peGluIGZyb20gJy4uL21peGlucyc7XHJcbmltcG9ydCB7IGdldCwgcG9zdCB9IGZyb20gJy4uL3V0aWxzL2FqYXgnO1xyXG5pbXBvcnQgeyBMT0FEX0NPVVBPTiwgU0FWRV9DT1VQT04gfSBmcm9tICcuLi91dGlscy91cmwnO1xyXG5pbXBvcnQgeyBhbGVydCB9IGZyb20gJy4uL3V0aWxzJztcclxuXHJcbmltcG9ydCBnbG9iYWxTZXJ2aWNlIGZyb20gJy4uL3V0aWxzL2dsb2JhbFNlcnZpY2UnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gICAgY29uZmlnID0ge1xyXG4gICAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfkvJjmg6DliLjlhoXlrrknLFxyXG4gICAgfVxyXG5cclxuICAgIGRhdGEgPSB7XHJcbiAgICAgICAgZm9ybToge1xyXG4gICAgICAgICAgICBpZDogJycsXHJcbiAgICAgICAgICAgIG1wSWQ6ICcnLFxyXG4gICAgICAgICAgICB0aXRsZTogJycsXHJcbiAgICAgICAgICAgIHN1YlRpdGxlOiAnJyxcclxuICAgICAgICAgICAgY291cG9uVHlwZTogJycsXHJcbiAgICAgICAgICAgIHRvdGFsQ291bnQ6IDAsIC8vIOW6k+WtmFxyXG4gICAgICAgICAgICBsaW1pdENvdW50OiAwLCAvLyDmr4/kurrpmZDpooZcclxuICAgICAgICAgICAgdmFsaWRUeXBlOiAnJywgLy8gMSDlm7rlrprml7bpl7TvvIwyIOmihuWPluWQjueUn+aViFxyXG4gICAgICAgICAgICB2YWxpZERheXM6IG51bGwsXHJcbiAgICAgICAgICAgIHZhbGlkQWZ0ZXJEYXlzOiBudWxsLFxyXG4gICAgICAgICAgICB2YWxpZFN0YXJ0dGltZTogJycsXHJcbiAgICAgICAgICAgIHZhbGlkRW5kdGltZTogJycsXHJcbiAgICAgICAgICAgIGFwcGx5VHlwZTogJycsXHJcbiAgICAgICAgICAgIHNlcnZpY2VJZHM6ICcnLFxyXG4gICAgICAgIH0sXHJcbiAgICB9XHJcblxyXG4gICAgbWl4aW5zID0gW01peGluXVxyXG5cclxuICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgICAgYXN5bmMgc2F2ZSgpIHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIC8vIOaVsOaNrui/h+a7pFxyXG4gICAgICAgICAgICAgICAgY29uc3QgeyBmb3JtIH0gPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcG9zdERhdGEgPSB7fTtcclxuICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKGZvcm0pLmZvckVhY2goa2V5ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZm9ybVtrZXldKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc3REYXRhW2tleV0gPSBmb3JtW2tleV07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy52YWxpZGF0b3IocG9zdERhdGEpO1xyXG5cclxuICAgICAgICAgICAgICAgIGF3YWl0IHBvc3QoU0FWRV9DT1VQT04sIHBvc3REYXRhKTtcclxuICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVCYWNrKCk7XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KGUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lcnJvckhhbmRsZXIoZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBzZXRGb3JtRGF0YShwcm9wLCBlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZm9ybVtwcm9wXSA9IGUuZGV0YWlsLnZhbHVlO1xyXG4gICAgICAgIH0sXHJcbiAgICB9XHJcblxyXG4gICAgdmFsaWRhdG9yKGRhdGEpIHtcclxuICAgICAgICBsZXQgbXNnID0gJyc7XHJcbiAgICAgICAgaWYgKGRhdGEuY291cG9uRGlzY2FyZCA8IDAgfHwgZGF0YS5jb3Vwb25EaXNjYXJkID4gOTkpIHtcclxuICAgICAgICAgICAgbXNnID0gJ+S6q+WPl+aKmOaJo+W6lOivpeS7i+S6jjDoh7M5LjnmipgnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKG1zZykge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IobXNnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgb25Mb2FkKG9wdGlvbnMpIHtcclxuICAgICAgICBjb25zdCB7IGlkIH0gPSBvcHRpb25zO1xyXG5cclxuICAgICAgICBpZiAoaWQpIHtcclxuICAgICAgICAgICAgYXdhaXQgdGhpcy5sb2FkRGF0YShpZCk7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlRGF0YSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvblNob3coKSB7XHJcbiAgICAgICAgLy8g5q+P5qyhb25TaG935ZCM5q2l5pWw5o2uXHJcbiAgICAgICAgY29uc3QgY291cG9uTWFuYWdlID0gZ2xvYmFsU2VydmljZS5nZXQoJ2NvdXBvbk1hbmFnZScpO1xyXG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5mb3JtLCBjb3Vwb25NYW5hZ2UpO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGxvYWREYXRhKGlkKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3QgeyBkYXRhOiBjb3Vwb24gfSA9IGF3YWl0IGdldChMT0FEX0NPVVBPTiArIGlkKTtcclxuICAgICAgICAgICAgbGV0IHsgY291cG9uQ29uZGl0aW9uIH0gPSBjb3Vwb247XHJcbiAgICAgICAgICAgIGNvbnN0IG1wSWQgPSB3ZXB5LmdldFN0b3JhZ2VTeW5jKCdjdXJyZW50X21waWQnKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChjb3Vwb25Db25kaXRpb24pIHtcclxuICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY291cG9uQ29uZGl0aW9uID0gSlNPTi5wYXJzZShjb3Vwb25Db25kaXRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oY291cG9uLCBjb3Vwb25Db25kaXRpb24pO1xyXG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXJyb3JIYW5kbGVyKGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCB7XHJcbiAgICAgICAgICAgICAgICB0aXRsZSxcclxuICAgICAgICAgICAgICAgIHN1YlRpdGxlLFxyXG4gICAgICAgICAgICAgICAgY291cG9uVHlwZSxcclxuICAgICAgICAgICAgICAgIHRvdGFsQ291bnQsXHJcbiAgICAgICAgICAgICAgICBsaW1pdENvdW50LFxyXG4gICAgICAgICAgICAgICAgbGltaXRBbW91bnQsXHJcbiAgICAgICAgICAgICAgICBjb3Vwb25EaXNjYXJkLFxyXG4gICAgICAgICAgICAgICAgcmVsaWVmQW1vdW50LFxyXG4gICAgICAgICAgICAgICAgdmFsaWRUeXBlLFxyXG4gICAgICAgICAgICAgICAgdmFsaWREYXlzLFxyXG4gICAgICAgICAgICAgICAgdmFsaWRBZnRlckRheXMsXHJcbiAgICAgICAgICAgICAgICB2YWxpZFN0YXJ0dGltZSxcclxuICAgICAgICAgICAgICAgIHZhbGlkRW5kdGltZSxcclxuICAgICAgICAgICAgICAgIGFwcGx5VHlwZSxcclxuICAgICAgICAgICAgICAgIHNlcnZpY2VzLFxyXG4gICAgICAgICAgICB9ID0gY291cG9uO1xyXG4gICAgICAgICAgICBsZXQgc2VydmljZUlkcyA9ICcnO1xyXG5cclxuICAgICAgICAgICAgaWYgKHNlcnZpY2VzICYmIHNlcnZpY2VzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgc2VydmljZUlkcyA9IHNlcnZpY2VzLm1hcChpdGVtID0+IGl0ZW0uaWQpLmpvaW4oJywnKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLmZvcm0sIHtcclxuICAgICAgICAgICAgICAgIGlkLFxyXG4gICAgICAgICAgICAgICAgbXBJZCxcclxuICAgICAgICAgICAgICAgIHRpdGxlLFxyXG4gICAgICAgICAgICAgICAgc3ViVGl0bGUsXHJcbiAgICAgICAgICAgICAgICBjb3Vwb25UeXBlLFxyXG4gICAgICAgICAgICAgICAgdG90YWxDb3VudCxcclxuICAgICAgICAgICAgICAgIGxpbWl0Q291bnQsXHJcbiAgICAgICAgICAgICAgICBsaW1pdEFtb3VudCxcclxuICAgICAgICAgICAgICAgIGNvdXBvbkRpc2NhcmQsXHJcbiAgICAgICAgICAgICAgICByZWxpZWZBbW91bnQsXHJcbiAgICAgICAgICAgICAgICB2YWxpZFR5cGUsXHJcbiAgICAgICAgICAgICAgICB2YWxpZERheXMsXHJcbiAgICAgICAgICAgICAgICB2YWxpZEFmdGVyRGF5cyxcclxuICAgICAgICAgICAgICAgIHZhbGlkU3RhcnR0aW1lLFxyXG4gICAgICAgICAgICAgICAgdmFsaWRFbmR0aW1lLFxyXG4gICAgICAgICAgICAgICAgYXBwbHlUeXBlLFxyXG4gICAgICAgICAgICAgICAgc2VydmljZUlkcyxcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgdGhpcy5lcnJvckhhbmRsZXIoZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZURhdGEoKSB7XHJcbiAgICAgICAgY29uc3QgY291cG9uTWFuYWdlID0gZ2xvYmFsU2VydmljZS5nZXQoJ2NvdXBvbk1hbmFnZScpO1xyXG4gICAgICAgIGdsb2JhbFNlcnZpY2Uuc2V0KCdjb3Vwb25NYW5hZ2UnLCBPYmplY3QuYXNzaWduKGNvdXBvbk1hbmFnZSwgdGhpcy5mb3JtKSk7XHJcbiAgICB9XHJcbn1cclxuIl19