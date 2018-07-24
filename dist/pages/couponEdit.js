'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _mixin = require('./../mixin/index.js');

var _mixin2 = _interopRequireDefault(_mixin);

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
                totalCount: '', // 库存
                limitCount: '', // 每人限领
                validType: '', // 1 固定时间，2 领取后生效
                validDays: null,
                validAfterDays: null,
                validStarttime: '',
                validEndtime: '',
                applyType: '',
                serviceIds: '',
                limitAmount: '', // 满多少使用
                reliefAmount: '', // 满减
                couponDiscard: '' // 打几折，需要，50表示5折
            },
            canSubmit: false
        }, _this.computed = {
            canSubmit: function canSubmit() {
                var _this2 = this;

                var result = true;
                var _form = this.form,
                    couponType = _form.couponType,
                    validType = _form.validType,
                    applyType = _form.applyType;

                var requiredFields = ['title', 'subTitle', 'couponType', 'limitAmount', 'validType', 'totalCount', 'applyType'];

                // 优惠券类型和生效时间，选中其中一种类型，另一种类型的字段不需要填写
                // 优惠券类型
                if (couponType === 1) {
                    // 代金券
                    requiredFields.push('reliefAmount');
                } else if (couponType === 2) {
                    // 折扣券
                    requiredFields.push('couponDiscard');
                }
                // 生效时间
                if (validType === 1) {
                    // 固定时间
                    requiredFields.push('validStarttime', 'validEndtime');
                } else if (validType === 2) {
                    // 领取后生效
                    requiredFields.push('validDays', 'validAfterDays');
                }

                // 选择适用产品，选择全部产品时，serviceIds不填
                if (applyType !== 1) {
                    requiredFields.push('serviceIds');
                }

                requiredFields.forEach(function (key) {
                    if ((0, _utils.isEmpty)(_this2.form[key])) {
                        result = false;
                    }
                });

                return result;
            }
        }, _this.mixins = [_mixin2.default], _this.methods = {
            save: function () {
                var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                    var form, postData;
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    if (this.canSubmit) {
                                        _context.next = 2;
                                        break;
                                    }

                                    return _context.abrupt('return');

                                case 2:
                                    _context.prev = 2;

                                    // 数据过滤，过滤未提交的数据
                                    form = this.form;
                                    postData = this.formatData(form);


                                    this.validator(postData);

                                    _context.next = 8;
                                    return (0, _ajax.post)(_url.SAVE_COUPON, postData);

                                case 8:
                                    _globalService2.default.set('refresh', true);
                                    _wepy2.default.navigateBack();
                                    _context.next = 16;
                                    break;

                                case 12:
                                    _context.prev = 12;
                                    _context.t0 = _context['catch'](2);

                                    if ((typeof _context.t0 === 'undefined' ? 'undefined' : _typeof(_context.t0)) === 'object') {
                                        (0, _utils.alert)(_context.t0.msg);
                                    } else {
                                        (0, _utils.alert)(_context.t0);
                                    }
                                    this.errorHandler(_context.t0);

                                case 16:
                                case 'end':
                                    return _context.stop();
                            }
                        }
                    }, _callee, this, [[2, 12]]);
                }));

                function save() {
                    return _ref2.apply(this, arguments);
                }

                return save;
            }(),
            setFormData: function setFormData(prop, e) {
                var value = e.detail.value;

                // 不超过十个字

                if (~['title', 'subTitle'].indexOf(prop)) {
                    if (value.length > 10) {
                        (0, _utils.toast)('只能输入10个字');
                        return value.slice(0, value.length - 1);
                    }
                }

                this.form[prop] = value;
                return value;
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Index, [{
        key: 'formatData',
        value: function formatData(data) {
            var postData = Object.assign({}, data);
            var limitCount = postData.limitCount,
                reliefAmount = postData.reliefAmount,
                limitAmount = postData.limitAmount,
                couponDiscard = postData.couponDiscard;

            var formatData = {};

            // 字符串转数字
            Object.keys({
                limitCount: limitCount, reliefAmount: reliefAmount, limitAmount: limitAmount, couponDiscard: couponDiscard
            }).forEach(function (key) {
                postData[key] = +postData[key];
            });

            if (limitCount === '') {
                postData.limitCount = 1;
            }

            // 清除掉为空的数据
            Object.keys(postData).forEach(function (key) {
                if (postData[key]) {
                    formatData[key] = postData[key];
                }
            });

            return formatData;
        }
    }, {
        key: 'validator',
        value: function validator(data) {
            var couponDiscard = data.couponDiscard,
                validType = data.validType,
                limitAmount = data.limitAmount,
                reliefAmount = data.reliefAmount;

            var msg = '';

            if (couponDiscard < 0 || couponDiscard > 99) {
                msg = '享受折扣应该介于0至9.9折';
            }

            if (validType === 1 && limitAmount < reliefAmount) {
                msg = '满减金额应当小于消费金额';
            }

            if (msg) {
                throw new Error(msg);
            }
        }
    }, {
        key: 'onLoad',
        value: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(options) {
                var id, mpId;
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
                                mpId = _wepy2.default.getStorageSync('current_mpid');

                                this.form.mpId = mpId;
                                this.$apply();

                            case 8:
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
            // 只同步跳转到编辑页修改的字段
            var _globalService$get = _globalService2.default.get('couponManage'),
                couponType = _globalService$get.couponType,
                limitAmount = _globalService$get.limitAmount,
                reliefAmount = _globalService$get.reliefAmount,
                couponDiscard = _globalService$get.couponDiscard,
                validType = _globalService$get.validType,
                validDays = _globalService$get.validDays,
                validAfterDays = _globalService$get.validAfterDays,
                validStarttime = _globalService$get.validStarttime,
                validEndtime = _globalService$get.validEndtime,
                applyType = _globalService$get.applyType,
                serviceIds = _globalService$get.serviceIds;

            Object.assign(this.form, {
                couponType: couponType,
                limitAmount: limitAmount,
                reliefAmount: reliefAmount,
                couponDiscard: couponDiscard,
                validType: validType,
                validDays: validDays,
                validAfterDays: validAfterDays,
                validStarttime: validStarttime,
                validEndtime: validEndtime,
                applyType: applyType,
                serviceIds: serviceIds
            });
        }
    }, {
        key: 'loadData',
        value: function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(id) {
                var _ref5, coupon, couponCondition, title, subTitle, couponType, totalCount, limitCount, limitAmount, couponDiscard, reliefAmount, validType, validDays, validAfterDays, validStarttime, validEndtime, applyType, services, serviceIds;

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
                                _context3.next = 17;
                                break;

                            case 14:
                                _context3.prev = 14;
                                _context3.t0 = _context3['catch'](0);

                                this.errorHandler(_context3.t0);

                            case 17:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this, [[0, 14]]);
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvdXBvbkVkaXQuanMiXSwibmFtZXMiOlsiSW5kZXgiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsImZvcm0iLCJpZCIsIm1wSWQiLCJ0aXRsZSIsInN1YlRpdGxlIiwiY291cG9uVHlwZSIsInRvdGFsQ291bnQiLCJsaW1pdENvdW50IiwidmFsaWRUeXBlIiwidmFsaWREYXlzIiwidmFsaWRBZnRlckRheXMiLCJ2YWxpZFN0YXJ0dGltZSIsInZhbGlkRW5kdGltZSIsImFwcGx5VHlwZSIsInNlcnZpY2VJZHMiLCJsaW1pdEFtb3VudCIsInJlbGllZkFtb3VudCIsImNvdXBvbkRpc2NhcmQiLCJjYW5TdWJtaXQiLCJjb21wdXRlZCIsInJlc3VsdCIsInJlcXVpcmVkRmllbGRzIiwicHVzaCIsImZvckVhY2giLCJrZXkiLCJtaXhpbnMiLCJNaXhpbiIsIm1ldGhvZHMiLCJzYXZlIiwicG9zdERhdGEiLCJmb3JtYXREYXRhIiwidmFsaWRhdG9yIiwiU0FWRV9DT1VQT04iLCJnbG9iYWxTZXJ2aWNlIiwic2V0Iiwid2VweSIsIm5hdmlnYXRlQmFjayIsIm1zZyIsImVycm9ySGFuZGxlciIsInNldEZvcm1EYXRhIiwicHJvcCIsImUiLCJ2YWx1ZSIsImRldGFpbCIsImluZGV4T2YiLCJsZW5ndGgiLCJzbGljZSIsIk9iamVjdCIsImFzc2lnbiIsImtleXMiLCJFcnJvciIsIm9wdGlvbnMiLCJsb2FkRGF0YSIsInVwZGF0ZURhdGEiLCJnZXRTdG9yYWdlU3luYyIsIiRhcHBseSIsImdldCIsIkxPQURfQ09VUE9OIiwiY291cG9uIiwiY291cG9uQ29uZGl0aW9uIiwiSlNPTiIsInBhcnNlIiwic2VydmljZXMiLCJtYXAiLCJpdGVtIiwiam9pbiIsImNvdXBvbk1hbmFnZSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7O0lBRXFCQSxL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Q0FBckI7QUFDQXZCLG9DQUFjQyxHQUFkLENBQWtCLGNBQWxCLEVBQWtDYSxPQUFPQyxNQUFQLENBQWNrQixZQUFkLEVBQTRCLEtBQUtsRSxJQUFqQyxDQUFsQztBQUNIOzs7O0VBbFI4Qm1DLGVBQUtnQyxJOztrQkFBbkJ2RSxLIiwiZmlsZSI6ImNvdXBvbkVkaXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuaW1wb3J0IE1peGluIGZyb20gJy4uL21peGluJztcbmltcG9ydCB7IGdldCwgcG9zdCB9IGZyb20gJy4uL3V0aWxzL2FqYXgnO1xuaW1wb3J0IHsgTE9BRF9DT1VQT04sIFNBVkVfQ09VUE9OIH0gZnJvbSAnLi4vdXRpbHMvdXJsJztcbmltcG9ydCB7IGFsZXJ0LCBpc0VtcHR5LCB0b2FzdCB9IGZyb20gJy4uL3V0aWxzJztcblxuaW1wb3J0IGdsb2JhbFNlcnZpY2UgZnJvbSAnLi4vdXRpbHMvZ2xvYmFsU2VydmljZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfkvJjmg6DliLjlhoXlrrknLFxuICAgIH1cblxuICAgIGRhdGEgPSB7XG4gICAgICAgIGZvcm06IHtcbiAgICAgICAgICAgIGlkOiAnJyxcbiAgICAgICAgICAgIG1wSWQ6ICcnLFxuICAgICAgICAgICAgdGl0bGU6ICcnLFxuICAgICAgICAgICAgc3ViVGl0bGU6ICcnLFxuICAgICAgICAgICAgY291cG9uVHlwZTogJycsXG4gICAgICAgICAgICB0b3RhbENvdW50OiAnJywgLy8g5bqT5a2YXG4gICAgICAgICAgICBsaW1pdENvdW50OiAnJywgLy8g5q+P5Lq66ZmQ6aKGXG4gICAgICAgICAgICB2YWxpZFR5cGU6ICcnLCAvLyAxIOWbuuWumuaXtumXtO+8jDIg6aKG5Y+W5ZCO55Sf5pWIXG4gICAgICAgICAgICB2YWxpZERheXM6IG51bGwsXG4gICAgICAgICAgICB2YWxpZEFmdGVyRGF5czogbnVsbCxcbiAgICAgICAgICAgIHZhbGlkU3RhcnR0aW1lOiAnJyxcbiAgICAgICAgICAgIHZhbGlkRW5kdGltZTogJycsXG4gICAgICAgICAgICBhcHBseVR5cGU6ICcnLFxuICAgICAgICAgICAgc2VydmljZUlkczogJycsXG4gICAgICAgICAgICBsaW1pdEFtb3VudDogJycsIC8vIOa7oeWkmuWwkeS9v+eUqFxuICAgICAgICAgICAgcmVsaWVmQW1vdW50OiAnJywgLy8g5ruh5YePXG4gICAgICAgICAgICBjb3Vwb25EaXNjYXJkOiAnJywgLy8g5omT5Yeg5oqY77yM6ZyA6KaB77yMNTDooajnpLo15oqYXG4gICAgICAgIH0sXG4gICAgICAgIGNhblN1Ym1pdDogZmFsc2UsXG4gICAgfVxuXG4gICAgY29tcHV0ZWQgPSB7XG4gICAgICAgIGNhblN1Ym1pdCgpIHtcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSB0cnVlO1xuICAgICAgICAgICAgY29uc3QgeyBjb3Vwb25UeXBlLCB2YWxpZFR5cGUsIGFwcGx5VHlwZSB9ID0gdGhpcy5mb3JtO1xuICAgICAgICAgICAgY29uc3QgcmVxdWlyZWRGaWVsZHMgPSBbJ3RpdGxlJywgJ3N1YlRpdGxlJywgJ2NvdXBvblR5cGUnLCAnbGltaXRBbW91bnQnLFxuICAgICAgICAgICAgICAgICd2YWxpZFR5cGUnLCAndG90YWxDb3VudCcsICdhcHBseVR5cGUnXTtcblxuICAgICAgICAgICAgLy8g5LyY5oOg5Yi457G75Z6L5ZKM55Sf5pWI5pe26Ze077yM6YCJ5Lit5YW25Lit5LiA56eN57G75Z6L77yM5Y+m5LiA56eN57G75Z6L55qE5a2X5q615LiN6ZyA6KaB5aGr5YaZXG4gICAgICAgICAgICAvLyDkvJjmg6DliLjnsbvlnotcbiAgICAgICAgICAgIGlmIChjb3Vwb25UeXBlID09PSAxKSB7XG4gICAgICAgICAgICAgICAgLy8g5Luj6YeR5Yi4XG4gICAgICAgICAgICAgICAgcmVxdWlyZWRGaWVsZHMucHVzaCgncmVsaWVmQW1vdW50Jyk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNvdXBvblR5cGUgPT09IDIpIHtcbiAgICAgICAgICAgICAgICAvLyDmipjmiaPliLhcbiAgICAgICAgICAgICAgICByZXF1aXJlZEZpZWxkcy5wdXNoKCdjb3Vwb25EaXNjYXJkJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyDnlJ/mlYjml7bpl7RcbiAgICAgICAgICAgIGlmICh2YWxpZFR5cGUgPT09IDEpIHtcbiAgICAgICAgICAgICAgICAvLyDlm7rlrprml7bpl7RcbiAgICAgICAgICAgICAgICByZXF1aXJlZEZpZWxkcy5wdXNoKCd2YWxpZFN0YXJ0dGltZScsICd2YWxpZEVuZHRpbWUnKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsaWRUeXBlID09PSAyKSB7XG4gICAgICAgICAgICAgICAgLy8g6aKG5Y+W5ZCO55Sf5pWIXG4gICAgICAgICAgICAgICAgcmVxdWlyZWRGaWVsZHMucHVzaCgndmFsaWREYXlzJywgJ3ZhbGlkQWZ0ZXJEYXlzJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIOmAieaLqemAgueUqOS6p+WTge+8jOmAieaLqeWFqOmDqOS6p+WTgeaXtu+8jHNlcnZpY2VJZHPkuI3loatcbiAgICAgICAgICAgIGlmIChhcHBseVR5cGUgIT09IDEpIHtcbiAgICAgICAgICAgICAgICByZXF1aXJlZEZpZWxkcy5wdXNoKCdzZXJ2aWNlSWRzJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJlcXVpcmVkRmllbGRzLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoaXNFbXB0eSh0aGlzLmZvcm1ba2V5XSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH0sXG4gICAgfVxuXG4gICAgbWl4aW5zID0gW01peGluXVxuXG4gICAgbWV0aG9kcyA9IHtcbiAgICAgICAgYXN5bmMgc2F2ZSgpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5jYW5TdWJtaXQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgLy8g5pWw5o2u6L+H5ruk77yM6L+H5ruk5pyq5o+Q5Lqk55qE5pWw5o2uXG4gICAgICAgICAgICAgICAgY29uc3QgeyBmb3JtIH0gPSB0aGlzO1xuICAgICAgICAgICAgICAgIGNvbnN0IHBvc3REYXRhID0gdGhpcy5mb3JtYXREYXRhKGZvcm0pO1xuXG4gICAgICAgICAgICAgICAgdGhpcy52YWxpZGF0b3IocG9zdERhdGEpO1xuXG4gICAgICAgICAgICAgICAgYXdhaXQgcG9zdChTQVZFX0NPVVBPTiwgcG9zdERhdGEpO1xuICAgICAgICAgICAgICAgIGdsb2JhbFNlcnZpY2Uuc2V0KCdyZWZyZXNoJywgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZUJhY2soKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KGUubXNnKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBhbGVydChlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5lcnJvckhhbmRsZXIoZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgc2V0Rm9ybURhdGEocHJvcCwgZSkge1xuICAgICAgICAgICAgY29uc3QgeyB2YWx1ZSB9ID0gZS5kZXRhaWw7XG5cbiAgICAgICAgICAgIC8vIOS4jei2hei/h+WNgeS4quWtl1xuICAgICAgICAgICAgaWYgKH5bJ3RpdGxlJywgJ3N1YlRpdGxlJ10uaW5kZXhPZihwcm9wKSkge1xuICAgICAgICAgICAgICAgIGlmICh2YWx1ZS5sZW5ndGggPiAxMCkge1xuICAgICAgICAgICAgICAgICAgICB0b2FzdCgn5Y+q6IO96L6T5YWlMTDkuKrlrZcnKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlLnNsaWNlKDAsIHZhbHVlLmxlbmd0aCAtIDEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5mb3JtW3Byb3BdID0gdmFsdWU7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH0sXG4gICAgfVxuXG4gICAgZm9ybWF0RGF0YShkYXRhKSB7XG4gICAgICAgIGNvbnN0IHBvc3REYXRhID0gT2JqZWN0LmFzc2lnbih7fSwgZGF0YSk7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgIGxpbWl0Q291bnQsIHJlbGllZkFtb3VudCwgbGltaXRBbW91bnQsIGNvdXBvbkRpc2NhcmQsXG4gICAgICAgIH0gPSBwb3N0RGF0YTtcbiAgICAgICAgY29uc3QgZm9ybWF0RGF0YSA9IHt9O1xuXG4gICAgICAgIC8vIOWtl+espuS4sui9rOaVsOWtl1xuICAgICAgICBPYmplY3Qua2V5cyh7XG4gICAgICAgICAgICBsaW1pdENvdW50LCByZWxpZWZBbW91bnQsIGxpbWl0QW1vdW50LCBjb3Vwb25EaXNjYXJkLFxuICAgICAgICB9KS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgICAgICBwb3N0RGF0YVtrZXldID0gK3Bvc3REYXRhW2tleV07XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChsaW1pdENvdW50ID09PSAnJykge1xuICAgICAgICAgICAgcG9zdERhdGEubGltaXRDb3VudCA9IDE7XG4gICAgICAgIH1cblxuICAgICAgICAvLyDmuIXpmaTmjonkuLrnqbrnmoTmlbDmja5cbiAgICAgICAgT2JqZWN0LmtleXMocG9zdERhdGEpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgICAgIGlmIChwb3N0RGF0YVtrZXldKSB7XG4gICAgICAgICAgICAgICAgZm9ybWF0RGF0YVtrZXldID0gcG9zdERhdGFba2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGZvcm1hdERhdGE7XG4gICAgfVxuXG4gICAgdmFsaWRhdG9yKGRhdGEpIHtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgY291cG9uRGlzY2FyZCwgdmFsaWRUeXBlLCBsaW1pdEFtb3VudCwgcmVsaWVmQW1vdW50LFxuICAgICAgICB9ID0gZGF0YTtcbiAgICAgICAgbGV0IG1zZyA9ICcnO1xuXG4gICAgICAgIGlmIChjb3Vwb25EaXNjYXJkIDwgMCB8fCBjb3Vwb25EaXNjYXJkID4gOTkpIHtcbiAgICAgICAgICAgIG1zZyA9ICfkuqvlj5fmipjmiaPlupTor6Xku4vkuo4w6IezOS455oqYJztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh2YWxpZFR5cGUgPT09IDEgJiYgbGltaXRBbW91bnQgPCByZWxpZWZBbW91bnQpIHtcbiAgICAgICAgICAgIG1zZyA9ICfmu6Hlh4/ph5Hpop3lupTlvZPlsI/kuo7mtojotLnph5Hpop0nO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG1zZykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1zZyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhc3luYyBvbkxvYWQob3B0aW9ucykge1xuICAgICAgICBjb25zdCB7IGlkIH0gPSBvcHRpb25zO1xuXG4gICAgICAgIGlmIChpZCkge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5sb2FkRGF0YShpZCk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZURhdGEoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG1wSWQgPSB3ZXB5LmdldFN0b3JhZ2VTeW5jKCdjdXJyZW50X21waWQnKTtcbiAgICAgICAgdGhpcy5mb3JtLm1wSWQgPSBtcElkO1xuICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgIH1cblxuICAgIG9uU2hvdygpIHtcbiAgICAgICAgLy8g5q+P5qyhb25TaG935ZCM5q2l5pWw5o2uXG4gICAgICAgIC8vIOWPquWQjOatpei3s+i9rOWIsOe8lui+kemhteS/ruaUueeahOWtl+autVxuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICAvLyDkvJjmg6DliLjnsbvlnotcbiAgICAgICAgICAgIGNvdXBvblR5cGUsXG4gICAgICAgICAgICBsaW1pdEFtb3VudCxcbiAgICAgICAgICAgIHJlbGllZkFtb3VudCxcbiAgICAgICAgICAgIGNvdXBvbkRpc2NhcmQsXG5cbiAgICAgICAgICAgIC8vIOeUn+aViOaXtumXtFxuICAgICAgICAgICAgdmFsaWRUeXBlLFxuICAgICAgICAgICAgdmFsaWREYXlzLFxuICAgICAgICAgICAgdmFsaWRBZnRlckRheXMsXG4gICAgICAgICAgICB2YWxpZFN0YXJ0dGltZSxcbiAgICAgICAgICAgIHZhbGlkRW5kdGltZSxcblxuICAgICAgICAgICAgLy8g6YCC55So5Lqn5ZOBXG4gICAgICAgICAgICBhcHBseVR5cGUsXG4gICAgICAgICAgICBzZXJ2aWNlSWRzLFxuICAgICAgICB9ID0gZ2xvYmFsU2VydmljZS5nZXQoJ2NvdXBvbk1hbmFnZScpO1xuXG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5mb3JtLCB7XG4gICAgICAgICAgICBjb3Vwb25UeXBlLFxuICAgICAgICAgICAgbGltaXRBbW91bnQsXG4gICAgICAgICAgICByZWxpZWZBbW91bnQsXG4gICAgICAgICAgICBjb3Vwb25EaXNjYXJkLFxuICAgICAgICAgICAgdmFsaWRUeXBlLFxuICAgICAgICAgICAgdmFsaWREYXlzLFxuICAgICAgICAgICAgdmFsaWRBZnRlckRheXMsXG4gICAgICAgICAgICB2YWxpZFN0YXJ0dGltZSxcbiAgICAgICAgICAgIHZhbGlkRW5kdGltZSxcbiAgICAgICAgICAgIGFwcGx5VHlwZSxcbiAgICAgICAgICAgIHNlcnZpY2VJZHMsXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGFzeW5jIGxvYWREYXRhKGlkKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCB7IGRhdGE6IGNvdXBvbiB9ID0gYXdhaXQgZ2V0KExPQURfQ09VUE9OICsgaWQpO1xuICAgICAgICAgICAgbGV0IHsgY291cG9uQ29uZGl0aW9uIH0gPSBjb3Vwb247XG5cbiAgICAgICAgICAgIGlmIChjb3Vwb25Db25kaXRpb24pIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBjb3Vwb25Db25kaXRpb24gPSBKU09OLnBhcnNlKGNvdXBvbkNvbmRpdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oY291cG9uLCBjb3Vwb25Db25kaXRpb24pO1xuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lcnJvckhhbmRsZXIoZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICAgICAgdGl0bGUsXG4gICAgICAgICAgICAgICAgc3ViVGl0bGUsXG4gICAgICAgICAgICAgICAgY291cG9uVHlwZSxcbiAgICAgICAgICAgICAgICB0b3RhbENvdW50LFxuICAgICAgICAgICAgICAgIGxpbWl0Q291bnQsXG4gICAgICAgICAgICAgICAgbGltaXRBbW91bnQsXG4gICAgICAgICAgICAgICAgY291cG9uRGlzY2FyZCxcbiAgICAgICAgICAgICAgICByZWxpZWZBbW91bnQsXG4gICAgICAgICAgICAgICAgdmFsaWRUeXBlLFxuICAgICAgICAgICAgICAgIHZhbGlkRGF5cyxcbiAgICAgICAgICAgICAgICB2YWxpZEFmdGVyRGF5cyxcbiAgICAgICAgICAgICAgICB2YWxpZFN0YXJ0dGltZSxcbiAgICAgICAgICAgICAgICB2YWxpZEVuZHRpbWUsXG4gICAgICAgICAgICAgICAgYXBwbHlUeXBlLFxuICAgICAgICAgICAgICAgIHNlcnZpY2VzLFxuICAgICAgICAgICAgfSA9IGNvdXBvbjtcbiAgICAgICAgICAgIGxldCBzZXJ2aWNlSWRzID0gJyc7XG5cbiAgICAgICAgICAgIGlmIChzZXJ2aWNlcyAmJiBzZXJ2aWNlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBzZXJ2aWNlSWRzID0gc2VydmljZXMubWFwKGl0ZW0gPT4gaXRlbS5pZCkuam9pbignLCcpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMuZm9ybSwge1xuICAgICAgICAgICAgICAgIGlkLFxuICAgICAgICAgICAgICAgIHRpdGxlLFxuICAgICAgICAgICAgICAgIHN1YlRpdGxlLFxuICAgICAgICAgICAgICAgIGNvdXBvblR5cGUsXG4gICAgICAgICAgICAgICAgdG90YWxDb3VudCxcbiAgICAgICAgICAgICAgICBsaW1pdENvdW50LFxuICAgICAgICAgICAgICAgIGxpbWl0QW1vdW50LFxuICAgICAgICAgICAgICAgIGNvdXBvbkRpc2NhcmQsXG4gICAgICAgICAgICAgICAgcmVsaWVmQW1vdW50LFxuICAgICAgICAgICAgICAgIHZhbGlkVHlwZSxcbiAgICAgICAgICAgICAgICB2YWxpZERheXMsXG4gICAgICAgICAgICAgICAgdmFsaWRBZnRlckRheXMsXG4gICAgICAgICAgICAgICAgdmFsaWRTdGFydHRpbWUsXG4gICAgICAgICAgICAgICAgdmFsaWRFbmR0aW1lLFxuICAgICAgICAgICAgICAgIGFwcGx5VHlwZSxcbiAgICAgICAgICAgICAgICBzZXJ2aWNlSWRzLFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHRoaXMuZXJyb3JIYW5kbGVyKGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlRGF0YSgpIHtcbiAgICAgICAgY29uc3QgY291cG9uTWFuYWdlID0gZ2xvYmFsU2VydmljZS5nZXQoJ2NvdXBvbk1hbmFnZScpO1xuICAgICAgICBnbG9iYWxTZXJ2aWNlLnNldCgnY291cG9uTWFuYWdlJywgT2JqZWN0LmFzc2lnbihjb3Vwb25NYW5hZ2UsIHRoaXMuZm9ybSkpO1xuICAgIH1cbn1cbiJdfQ==