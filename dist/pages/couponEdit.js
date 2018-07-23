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
