'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

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
                totalCount: 0, // 库存
                limitCount: 0, // 每人限领
                validType: '', // 1 固定时间，2 领取后生效
                validDays: null,
                validAfterDays: null,
                validStarttime: '',
                validEndtime: '',
                applyType: '',
                serviceIds: '',
                limitAmount: 0, // 满多少使用
                reliefAmount: 0, // 满减
                couponDiscard: 0 // 打几折，需要，50表示5折
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
                                    postData = {};

                                    Object.keys(form).forEach(function (key) {
                                        if (form[key]) {
                                            postData[key] = form[key];
                                        }
                                    });

                                    this.validator(postData);

                                    _context.next = 9;
                                    return (0, _ajax.post)(_url.SAVE_COUPON, postData);

                                case 9:
                                    _globalService2.default.set('refresh', true);
                                    _wepy2.default.navigateBack();
                                    _context.next = 17;
                                    break;

                                case 13:
                                    _context.prev = 13;
                                    _context.t0 = _context['catch'](2);

                                    (0, _utils.alert)(_context.t0);
                                    this.errorHandler(_context.t0);

                                case 17:
                                case 'end':
                                    return _context.stop();
                            }
                        }
                    }, _callee, this, [[2, 13]]);
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvdXBvbkVkaXQuanMiXSwibmFtZXMiOlsiSW5kZXgiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsImZvcm0iLCJpZCIsIm1wSWQiLCJ0aXRsZSIsInN1YlRpdGxlIiwiY291cG9uVHlwZSIsInRvdGFsQ291bnQiLCJsaW1pdENvdW50IiwidmFsaWRUeXBlIiwidmFsaWREYXlzIiwidmFsaWRBZnRlckRheXMiLCJ2YWxpZFN0YXJ0dGltZSIsInZhbGlkRW5kdGltZSIsImFwcGx5VHlwZSIsInNlcnZpY2VJZHMiLCJsaW1pdEFtb3VudCIsInJlbGllZkFtb3VudCIsImNvdXBvbkRpc2NhcmQiLCJjYW5TdWJtaXQiLCJjb21wdXRlZCIsInJlc3VsdCIsInJlcXVpcmVkRmllbGRzIiwicHVzaCIsImZvckVhY2giLCJrZXkiLCJtaXhpbnMiLCJNaXhpbiIsIm1ldGhvZHMiLCJzYXZlIiwicG9zdERhdGEiLCJPYmplY3QiLCJrZXlzIiwidmFsaWRhdG9yIiwiU0FWRV9DT1VQT04iLCJnbG9iYWxTZXJ2aWNlIiwic2V0Iiwid2VweSIsIm5hdmlnYXRlQmFjayIsImVycm9ySGFuZGxlciIsInNldEZvcm1EYXRhIiwicHJvcCIsImUiLCJkZXRhaWwiLCJ2YWx1ZSIsIm1zZyIsIkVycm9yIiwib3B0aW9ucyIsImxvYWREYXRhIiwidXBkYXRlRGF0YSIsImdldFN0b3JhZ2VTeW5jIiwiJGFwcGx5IiwiZ2V0IiwiYXNzaWduIiwiTE9BRF9DT1VQT04iLCJjb3Vwb24iLCJjb3Vwb25Db25kaXRpb24iLCJKU09OIiwicGFyc2UiLCJzZXJ2aWNlcyIsImxlbmd0aCIsIm1hcCIsIml0ZW0iLCJqb2luIiwiY291cG9uTWFuYWdlIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7O0lBRXFCQSxLOzs7Ozs7Ozs7Ozs7Ozt3TEFDakJDLE0sR0FBUztBQUNM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Y0MsR0FBZCxDQUFrQixjQUFsQixFQUFrQ0wsT0FBT3NCLE1BQVAsQ0FBY1csWUFBZCxFQUE0QixLQUFLL0QsSUFBakMsQ0FBbEM7QUFDSDs7OztFQTVPOEJvQyxlQUFLNEIsSTs7a0JBQW5CcEUsSyIsImZpbGUiOiJjb3Vwb25FZGl0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xyXG5pbXBvcnQgTWl4aW4gZnJvbSAnLi4vbWl4aW4nO1xyXG5pbXBvcnQgeyBnZXQsIHBvc3QgfSBmcm9tICcuLi91dGlscy9hamF4JztcclxuaW1wb3J0IHsgTE9BRF9DT1VQT04sIFNBVkVfQ09VUE9OIH0gZnJvbSAnLi4vdXRpbHMvdXJsJztcclxuaW1wb3J0IHsgYWxlcnQsIGlzRW1wdHkgfSBmcm9tICcuLi91dGlscyc7XHJcblxyXG5pbXBvcnQgZ2xvYmFsU2VydmljZSBmcm9tICcuLi91dGlscy9nbG9iYWxTZXJ2aWNlJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICAgIGNvbmZpZyA9IHtcclxuICAgICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5LyY5oOg5Yi45YaF5a65JyxcclxuICAgIH1cclxuXHJcbiAgICBkYXRhID0ge1xyXG4gICAgICAgIGZvcm06IHtcclxuICAgICAgICAgICAgaWQ6ICcnLFxyXG4gICAgICAgICAgICBtcElkOiAnJyxcclxuICAgICAgICAgICAgdGl0bGU6ICcnLFxyXG4gICAgICAgICAgICBzdWJUaXRsZTogJycsXHJcbiAgICAgICAgICAgIGNvdXBvblR5cGU6ICcnLFxyXG4gICAgICAgICAgICB0b3RhbENvdW50OiAwLCAvLyDlupPlrZhcclxuICAgICAgICAgICAgbGltaXRDb3VudDogMCwgLy8g5q+P5Lq66ZmQ6aKGXHJcbiAgICAgICAgICAgIHZhbGlkVHlwZTogJycsIC8vIDEg5Zu65a6a5pe26Ze077yMMiDpooblj5blkI7nlJ/mlYhcclxuICAgICAgICAgICAgdmFsaWREYXlzOiBudWxsLFxyXG4gICAgICAgICAgICB2YWxpZEFmdGVyRGF5czogbnVsbCxcclxuICAgICAgICAgICAgdmFsaWRTdGFydHRpbWU6ICcnLFxyXG4gICAgICAgICAgICB2YWxpZEVuZHRpbWU6ICcnLFxyXG4gICAgICAgICAgICBhcHBseVR5cGU6ICcnLFxyXG4gICAgICAgICAgICBzZXJ2aWNlSWRzOiAnJyxcclxuICAgICAgICAgICAgbGltaXRBbW91bnQ6IDAsIC8vIOa7oeWkmuWwkeS9v+eUqFxyXG4gICAgICAgICAgICByZWxpZWZBbW91bnQ6IDAsIC8vIOa7oeWHj1xyXG4gICAgICAgICAgICBjb3Vwb25EaXNjYXJkOiAwLCAvLyDmiZPlh6DmipjvvIzpnIDopoHvvIw1MOihqOekujXmiphcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNhblN1Ym1pdDogZmFsc2UsXHJcbiAgICB9XHJcblxyXG4gICAgY29tcHV0ZWQgPSB7XHJcbiAgICAgICAgY2FuU3VibWl0KCkge1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgY29uc3QgeyBjb3Vwb25UeXBlLCB2YWxpZFR5cGUsIGFwcGx5VHlwZSB9ID0gdGhpcy5mb3JtO1xyXG4gICAgICAgICAgICBjb25zdCByZXF1aXJlZEZpZWxkcyA9IFsndGl0bGUnLCAnc3ViVGl0bGUnLCAnY291cG9uVHlwZScsICdsaW1pdEFtb3VudCcsXHJcbiAgICAgICAgICAgICAgICAndmFsaWRUeXBlJywgJ3RvdGFsQ291bnQnLCAnYXBwbHlUeXBlJ107XHJcblxyXG4gICAgICAgICAgICAvLyDkvJjmg6DliLjnsbvlnovlkoznlJ/mlYjml7bpl7TvvIzpgInkuK3lhbbkuK3kuIDnp43nsbvlnovvvIzlj6bkuIDnp43nsbvlnovnmoTlrZfmrrXkuI3pnIDopoHloavlhplcclxuICAgICAgICAgICAgLy8g5LyY5oOg5Yi457G75Z6LXHJcbiAgICAgICAgICAgIGlmIChjb3Vwb25UeXBlID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAvLyDku6Pph5HliLhcclxuICAgICAgICAgICAgICAgIHJlcXVpcmVkRmllbGRzLnB1c2goJ3JlbGllZkFtb3VudCcpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNvdXBvblR5cGUgPT09IDIpIHtcclxuICAgICAgICAgICAgICAgIC8vIOaKmOaJo+WIuFxyXG4gICAgICAgICAgICAgICAgcmVxdWlyZWRGaWVsZHMucHVzaCgnY291cG9uRGlzY2FyZCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIOeUn+aViOaXtumXtFxyXG4gICAgICAgICAgICBpZiAodmFsaWRUeXBlID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAvLyDlm7rlrprml7bpl7RcclxuICAgICAgICAgICAgICAgIHJlcXVpcmVkRmllbGRzLnB1c2goJ3ZhbGlkU3RhcnR0aW1lJywgJ3ZhbGlkRW5kdGltZScpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHZhbGlkVHlwZSA9PT0gMikge1xyXG4gICAgICAgICAgICAgICAgLy8g6aKG5Y+W5ZCO55Sf5pWIXHJcbiAgICAgICAgICAgICAgICByZXF1aXJlZEZpZWxkcy5wdXNoKCd2YWxpZERheXMnLCAndmFsaWRBZnRlckRheXMnKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8g6YCJ5oup6YCC55So5Lqn5ZOB77yM6YCJ5oup5YWo6YOo5Lqn5ZOB5pe277yMc2VydmljZUlkc+S4jeWhq1xyXG4gICAgICAgICAgICBpZiAoYXBwbHlUeXBlICE9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICByZXF1aXJlZEZpZWxkcy5wdXNoKCdzZXJ2aWNlSWRzJyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJlcXVpcmVkRmllbGRzLmZvckVhY2goa2V5ID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChpc0VtcHR5KHRoaXMuZm9ybVtrZXldKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfSxcclxuICAgIH1cclxuXHJcbiAgICBtaXhpbnMgPSBbTWl4aW5dXHJcblxyXG4gICAgbWV0aG9kcyA9IHtcclxuICAgICAgICBhc3luYyBzYXZlKCkge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuY2FuU3VibWl0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAvLyDmlbDmja7ov4fmu6TvvIzov4fmu6TmnKrmj5DkuqTnmoTmlbDmja5cclxuICAgICAgICAgICAgICAgIGNvbnN0IHsgZm9ybSB9ID0gdGhpcztcclxuICAgICAgICAgICAgICAgIGNvbnN0IHBvc3REYXRhID0ge307XHJcbiAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyhmb3JtKS5mb3JFYWNoKGtleSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZvcm1ba2V5XSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3N0RGF0YVtrZXldID0gZm9ybVtrZXldO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMudmFsaWRhdG9yKHBvc3REYXRhKTtcclxuXHJcbiAgICAgICAgICAgICAgICBhd2FpdCBwb3N0KFNBVkVfQ09VUE9OLCBwb3N0RGF0YSk7XHJcbiAgICAgICAgICAgICAgICBnbG9iYWxTZXJ2aWNlLnNldCgncmVmcmVzaCcsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZUJhY2soKTtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVycm9ySGFuZGxlcihlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHNldEZvcm1EYXRhKHByb3AsIGUpIHtcclxuICAgICAgICAgICAgdGhpcy5mb3JtW3Byb3BdID0gZS5kZXRhaWwudmFsdWU7XHJcbiAgICAgICAgfSxcclxuICAgIH1cclxuXHJcbiAgICB2YWxpZGF0b3IoZGF0YSkge1xyXG4gICAgICAgIGNvbnN0IHtcclxuICAgICAgICAgICAgY291cG9uRGlzY2FyZCwgdmFsaWRUeXBlLCBsaW1pdEFtb3VudCwgcmVsaWVmQW1vdW50LFxyXG4gICAgICAgIH0gPSBkYXRhO1xyXG4gICAgICAgIGxldCBtc2cgPSAnJztcclxuXHJcbiAgICAgICAgaWYgKGNvdXBvbkRpc2NhcmQgPCAwIHx8IGNvdXBvbkRpc2NhcmQgPiA5OSkge1xyXG4gICAgICAgICAgICBtc2cgPSAn5Lqr5Y+X5oqY5omj5bqU6K+l5LuL5LqOMOiHszkuOeaKmCc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodmFsaWRUeXBlID09PSAxICYmIGxpbWl0QW1vdW50IDwgcmVsaWVmQW1vdW50KSB7XHJcbiAgICAgICAgICAgIG1zZyA9ICfmu6Hlh4/ph5Hpop3lupTlvZPlsI/kuo7mtojotLnph5Hpop0nO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKG1zZykge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IobXNnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgb25Mb2FkKG9wdGlvbnMpIHtcclxuICAgICAgICBjb25zdCB7IGlkIH0gPSBvcHRpb25zO1xyXG5cclxuICAgICAgICBpZiAoaWQpIHtcclxuICAgICAgICAgICAgYXdhaXQgdGhpcy5sb2FkRGF0YShpZCk7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlRGF0YSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgbXBJZCA9IHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ2N1cnJlbnRfbXBpZCcpO1xyXG4gICAgICAgIHRoaXMuZm9ybS5tcElkID0gbXBJZDtcclxuICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uU2hvdygpIHtcclxuICAgICAgICAvLyDmr4/mrKFvblNob3flkIzmraXmlbDmja5cclxuICAgICAgICAvLyDlj6rlkIzmraXot7PovazliLDnvJbovpHpobXkv67mlLnnmoTlrZfmrrVcclxuICAgICAgICBjb25zdCB7XHJcbiAgICAgICAgICAgIC8vIOS8mOaDoOWIuOexu+Wei1xyXG4gICAgICAgICAgICBjb3Vwb25UeXBlLFxyXG4gICAgICAgICAgICBsaW1pdEFtb3VudCxcclxuICAgICAgICAgICAgcmVsaWVmQW1vdW50LFxyXG4gICAgICAgICAgICBjb3Vwb25EaXNjYXJkLFxyXG5cclxuICAgICAgICAgICAgLy8g55Sf5pWI5pe26Ze0XHJcbiAgICAgICAgICAgIHZhbGlkVHlwZSxcclxuICAgICAgICAgICAgdmFsaWREYXlzLFxyXG4gICAgICAgICAgICB2YWxpZEFmdGVyRGF5cyxcclxuICAgICAgICAgICAgdmFsaWRTdGFydHRpbWUsXHJcbiAgICAgICAgICAgIHZhbGlkRW5kdGltZSxcclxuXHJcbiAgICAgICAgICAgIC8vIOmAgueUqOS6p+WTgVxyXG4gICAgICAgICAgICBhcHBseVR5cGUsXHJcbiAgICAgICAgICAgIHNlcnZpY2VJZHMsXHJcbiAgICAgICAgfSA9IGdsb2JhbFNlcnZpY2UuZ2V0KCdjb3Vwb25NYW5hZ2UnKTtcclxuXHJcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLmZvcm0sIHtcclxuICAgICAgICAgICAgY291cG9uVHlwZSxcclxuICAgICAgICAgICAgbGltaXRBbW91bnQsXHJcbiAgICAgICAgICAgIHJlbGllZkFtb3VudCxcclxuICAgICAgICAgICAgY291cG9uRGlzY2FyZCxcclxuICAgICAgICAgICAgdmFsaWRUeXBlLFxyXG4gICAgICAgICAgICB2YWxpZERheXMsXHJcbiAgICAgICAgICAgIHZhbGlkQWZ0ZXJEYXlzLFxyXG4gICAgICAgICAgICB2YWxpZFN0YXJ0dGltZSxcclxuICAgICAgICAgICAgdmFsaWRFbmR0aW1lLFxyXG4gICAgICAgICAgICBhcHBseVR5cGUsXHJcbiAgICAgICAgICAgIHNlcnZpY2VJZHMsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgbG9hZERhdGEoaWQpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCB7IGRhdGE6IGNvdXBvbiB9ID0gYXdhaXQgZ2V0KExPQURfQ09VUE9OICsgaWQpO1xyXG4gICAgICAgICAgICBsZXQgeyBjb3Vwb25Db25kaXRpb24gfSA9IGNvdXBvbjtcclxuXHJcbiAgICAgICAgICAgIGlmIChjb3Vwb25Db25kaXRpb24pIHtcclxuICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY291cG9uQ29uZGl0aW9uID0gSlNPTi5wYXJzZShjb3Vwb25Db25kaXRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oY291cG9uLCBjb3Vwb25Db25kaXRpb24pO1xyXG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXJyb3JIYW5kbGVyKGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCB7XHJcbiAgICAgICAgICAgICAgICB0aXRsZSxcclxuICAgICAgICAgICAgICAgIHN1YlRpdGxlLFxyXG4gICAgICAgICAgICAgICAgY291cG9uVHlwZSxcclxuICAgICAgICAgICAgICAgIHRvdGFsQ291bnQsXHJcbiAgICAgICAgICAgICAgICBsaW1pdENvdW50LFxyXG4gICAgICAgICAgICAgICAgbGltaXRBbW91bnQsXHJcbiAgICAgICAgICAgICAgICBjb3Vwb25EaXNjYXJkLFxyXG4gICAgICAgICAgICAgICAgcmVsaWVmQW1vdW50LFxyXG4gICAgICAgICAgICAgICAgdmFsaWRUeXBlLFxyXG4gICAgICAgICAgICAgICAgdmFsaWREYXlzLFxyXG4gICAgICAgICAgICAgICAgdmFsaWRBZnRlckRheXMsXHJcbiAgICAgICAgICAgICAgICB2YWxpZFN0YXJ0dGltZSxcclxuICAgICAgICAgICAgICAgIHZhbGlkRW5kdGltZSxcclxuICAgICAgICAgICAgICAgIGFwcGx5VHlwZSxcclxuICAgICAgICAgICAgICAgIHNlcnZpY2VzLFxyXG4gICAgICAgICAgICB9ID0gY291cG9uO1xyXG4gICAgICAgICAgICBsZXQgc2VydmljZUlkcyA9ICcnO1xyXG5cclxuICAgICAgICAgICAgaWYgKHNlcnZpY2VzICYmIHNlcnZpY2VzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgc2VydmljZUlkcyA9IHNlcnZpY2VzLm1hcChpdGVtID0+IGl0ZW0uaWQpLmpvaW4oJywnKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLmZvcm0sIHtcclxuICAgICAgICAgICAgICAgIGlkLFxyXG4gICAgICAgICAgICAgICAgdGl0bGUsXHJcbiAgICAgICAgICAgICAgICBzdWJUaXRsZSxcclxuICAgICAgICAgICAgICAgIGNvdXBvblR5cGUsXHJcbiAgICAgICAgICAgICAgICB0b3RhbENvdW50LFxyXG4gICAgICAgICAgICAgICAgbGltaXRDb3VudCxcclxuICAgICAgICAgICAgICAgIGxpbWl0QW1vdW50LFxyXG4gICAgICAgICAgICAgICAgY291cG9uRGlzY2FyZCxcclxuICAgICAgICAgICAgICAgIHJlbGllZkFtb3VudCxcclxuICAgICAgICAgICAgICAgIHZhbGlkVHlwZSxcclxuICAgICAgICAgICAgICAgIHZhbGlkRGF5cyxcclxuICAgICAgICAgICAgICAgIHZhbGlkQWZ0ZXJEYXlzLFxyXG4gICAgICAgICAgICAgICAgdmFsaWRTdGFydHRpbWUsXHJcbiAgICAgICAgICAgICAgICB2YWxpZEVuZHRpbWUsXHJcbiAgICAgICAgICAgICAgICBhcHBseVR5cGUsXHJcbiAgICAgICAgICAgICAgICBzZXJ2aWNlSWRzLFxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICB0aGlzLmVycm9ySGFuZGxlcihlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlRGF0YSgpIHtcclxuICAgICAgICBjb25zdCBjb3Vwb25NYW5hZ2UgPSBnbG9iYWxTZXJ2aWNlLmdldCgnY291cG9uTWFuYWdlJyk7XHJcbiAgICAgICAgZ2xvYmFsU2VydmljZS5zZXQoJ2NvdXBvbk1hbmFnZScsIE9iamVjdC5hc3NpZ24oY291cG9uTWFuYWdlLCB0aGlzLmZvcm0pKTtcclxuICAgIH1cclxufVxyXG4iXX0=