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
            navigationBarTitleText: '编辑详情'
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
            },
            dataAction: function dataAction(prop, v) {
                var value = v;
                // 数据预处理
                if (prop === 'validType') {
                    value = +value;
                } else {
                    value = value && value.detail && value.detail.value;
                }

                // 数据校验
                var validate = this.validator(prop, value);
                if (!validate.result) {
                    (0, _utils.alert)(validate.msg);
                    return;
                }

                this[prop] = value;
                this.updateData();
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


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/orderComponentEdit'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9yZGVyQ29tcG9uZW50RWRpdC5qcyJdLCJuYW1lcyI6WyJJbmRleCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwiZm9ybSIsImlkIiwibXBJZCIsInRpdGxlIiwic3ViVGl0bGUiLCJjb3Vwb25UeXBlIiwidG90YWxDb3VudCIsImxpbWl0Q291bnQiLCJ2YWxpZFR5cGUiLCJ2YWxpZERheXMiLCJ2YWxpZEFmdGVyRGF5cyIsInZhbGlkU3RhcnR0aW1lIiwidmFsaWRFbmR0aW1lIiwiYXBwbHlUeXBlIiwic2VydmljZUlkcyIsIm1peGlucyIsIk1peGluIiwibWV0aG9kcyIsInNhdmUiLCJwb3N0RGF0YSIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwia2V5IiwidmFsaWRhdG9yIiwiU0FWRV9DT1VQT04iLCJ3ZXB5IiwibmF2aWdhdGVCYWNrIiwiZXJyb3JIYW5kbGVyIiwic2V0Rm9ybURhdGEiLCJwcm9wIiwiZSIsImRldGFpbCIsInZhbHVlIiwiZGF0YUFjdGlvbiIsInYiLCJ2YWxpZGF0ZSIsInJlc3VsdCIsIm1zZyIsInVwZGF0ZURhdGEiLCJjb3Vwb25EaXNjYXJkIiwiRXJyb3IiLCJvcHRpb25zIiwibG9hZERhdGEiLCJjb3Vwb25NYW5hZ2UiLCJnbG9iYWxTZXJ2aWNlIiwiZ2V0IiwiYXNzaWduIiwiTE9BRF9DT1VQT04iLCJjb3Vwb24iLCJjb3Vwb25Db25kaXRpb24iLCJnZXRTdG9yYWdlU3luYyIsIkpTT04iLCJwYXJzZSIsImxpbWl0QW1vdW50IiwicmVsaWVmQW1vdW50Iiwic2VydmljZXMiLCJsZW5ndGgiLCJtYXAiLCJpdGVtIiwiam9pbiIsIiRhcHBseSIsInNldCIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7OztJQUVxQkEsSzs7Ozs7Ozs7Ozs7Ozs7d0xBQ2pCQyxNLEdBQVM7QUFDTEMsb0NBQXdCO0FB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UCxDQUFjLEtBQUsvQyxJQUFuQixFQUF5QjtBQUNyQkMsMENBRHFCO0FBRXJCQyw4Q0FGcUI7QUFHckJDLGdEQUhxQjtBQUlyQkMsc0RBSnFCO0FBS3JCQywwREFMcUI7QUFNckJDLDBEQU5xQjtBQU9yQkMsMERBUHFCO0FBUXJCK0MsNERBUnFCO0FBU3JCZCxnRUFUcUI7QUFVckJlLDhEQVZxQjtBQVdyQi9DLHdEQVhxQjtBQVlyQkMsd0RBWnFCO0FBYXJCQyxrRUFicUI7QUFjckJDLGtFQWRxQjtBQWVyQkMsOERBZnFCO0FBZ0JyQkMsd0RBaEJxQjtBQWlCckJDO0FBakJxQixpQ0FBekI7O0FBb0JBLHFDQUFLK0MsTUFBTDs7Ozs7Ozs7QUFFQSxxQ0FBS2pDLFlBQUw7Ozs7Ozs7Ozs7Ozs7Ozs7OztxQ0FJSztBQUNULGdCQUFNZ0IsZUFBZUMsd0JBQWNDLEdBQWQsQ0FBa0IsY0FBbEIsQ0FBckI7QUFDQUQsb0NBQWNpQixHQUFkLENBQWtCLGNBQWxCLEVBQWtDMUMsT0FBTzJCLE1BQVAsQ0FBY0gsWUFBZCxFQUE0QixLQUFLNUMsSUFBakMsQ0FBbEM7QUFDSDs7OztFQXRLOEIwQixlQUFLcUMsSTs7a0JBQW5CbkUsSyIsImZpbGUiOiJvcmRlckNvbXBvbmVudEVkaXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XHJcbmltcG9ydCBNaXhpbiBmcm9tICcuLi9taXhpbnMnO1xyXG5pbXBvcnQgeyBnZXQsIHBvc3QgfSBmcm9tICcuLi91dGlscy9hamF4JztcclxuaW1wb3J0IHsgTE9BRF9DT1VQT04sIFNBVkVfQ09VUE9OIH0gZnJvbSAnLi4vdXRpbHMvdXJsJztcclxuaW1wb3J0IHsgYWxlcnQgfSBmcm9tICcuLi91dGlscyc7XHJcblxyXG5pbXBvcnQgZ2xvYmFsU2VydmljZSBmcm9tICcuLi91dGlscy9nbG9iYWxTZXJ2aWNlJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICAgIGNvbmZpZyA9IHtcclxuICAgICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn57yW6L6R6K+m5oOFJyxcclxuICAgIH1cclxuXHJcbiAgICBkYXRhID0ge1xyXG4gICAgICAgIGZvcm06IHtcclxuICAgICAgICAgICAgaWQ6ICcnLFxyXG4gICAgICAgICAgICBtcElkOiAnJyxcclxuICAgICAgICAgICAgdGl0bGU6ICcnLFxyXG4gICAgICAgICAgICBzdWJUaXRsZTogJycsXHJcbiAgICAgICAgICAgIGNvdXBvblR5cGU6ICcnLFxyXG4gICAgICAgICAgICB0b3RhbENvdW50OiAwLCAvLyDlupPlrZhcclxuICAgICAgICAgICAgbGltaXRDb3VudDogMCwgLy8g5q+P5Lq66ZmQ6aKGXHJcbiAgICAgICAgICAgIHZhbGlkVHlwZTogJycsIC8vIDEg5Zu65a6a5pe26Ze077yMMiDpooblj5blkI7nlJ/mlYhcclxuICAgICAgICAgICAgdmFsaWREYXlzOiBudWxsLFxyXG4gICAgICAgICAgICB2YWxpZEFmdGVyRGF5czogbnVsbCxcclxuICAgICAgICAgICAgdmFsaWRTdGFydHRpbWU6ICcnLFxyXG4gICAgICAgICAgICB2YWxpZEVuZHRpbWU6ICcnLFxyXG4gICAgICAgICAgICBhcHBseVR5cGU6ICcnLFxyXG4gICAgICAgICAgICBzZXJ2aWNlSWRzOiAnJyxcclxuICAgICAgICB9LFxyXG4gICAgfVxyXG5cclxuICAgIG1peGlucyA9IFtNaXhpbl1cclxuXHJcbiAgICBtZXRob2RzID0ge1xyXG4gICAgICAgIGFzeW5jIHNhdmUoKSB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAvLyDmlbDmja7ov4fmu6RcclxuICAgICAgICAgICAgICAgIGNvbnN0IHsgZm9ybSB9ID0gdGhpcztcclxuICAgICAgICAgICAgICAgIGNvbnN0IHBvc3REYXRhID0ge307XHJcbiAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyhmb3JtKS5mb3JFYWNoKGtleSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZvcm1ba2V5XSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3N0RGF0YVtrZXldID0gZm9ybVtrZXldO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMudmFsaWRhdG9yKHBvc3REYXRhKTtcclxuXHJcbiAgICAgICAgICAgICAgICBhd2FpdCBwb3N0KFNBVkVfQ09VUE9OLCBwb3N0RGF0YSk7XHJcbiAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlQmFjaygpO1xyXG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICBhbGVydChlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZXJyb3JIYW5kbGVyKGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc2V0Rm9ybURhdGEocHJvcCwgZSkge1xyXG4gICAgICAgICAgICB0aGlzLmZvcm1bcHJvcF0gPSBlLmRldGFpbC52YWx1ZTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBkYXRhQWN0aW9uKHByb3AsIHYpIHtcclxuICAgICAgICAgICAgbGV0IHZhbHVlID0gdjtcclxuICAgICAgICAgICAgLy8g5pWw5o2u6aKE5aSE55CGXHJcbiAgICAgICAgICAgIGlmIChwcm9wID09PSAndmFsaWRUeXBlJykge1xyXG4gICAgICAgICAgICAgICAgdmFsdWUgPSArdmFsdWU7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlICYmIHZhbHVlLmRldGFpbCAmJiB2YWx1ZS5kZXRhaWwudmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIOaVsOaNruagoemqjFxyXG4gICAgICAgICAgICBjb25zdCB2YWxpZGF0ZSA9IHRoaXMudmFsaWRhdG9yKHByb3AsIHZhbHVlKTtcclxuICAgICAgICAgICAgaWYgKCF2YWxpZGF0ZS5yZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KHZhbGlkYXRlLm1zZyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXNbcHJvcF0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVEYXRhKCk7XHJcbiAgICAgICAgfSxcclxuICAgIH1cclxuXHJcbiAgICB2YWxpZGF0b3IoZGF0YSkge1xyXG4gICAgICAgIGxldCBtc2cgPSAnJztcclxuICAgICAgICBpZiAoZGF0YS5jb3Vwb25EaXNjYXJkIDwgMCB8fCBkYXRhLmNvdXBvbkRpc2NhcmQgPiA5OSkge1xyXG4gICAgICAgICAgICBtc2cgPSAn5Lqr5Y+X5oqY5omj5bqU6K+l5LuL5LqOMOiHszkuOeaKmCc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAobXNnKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihtc2cpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBvbkxvYWQob3B0aW9ucykge1xyXG4gICAgICAgIGNvbnN0IHsgaWQgfSA9IG9wdGlvbnM7XHJcblxyXG4gICAgICAgIGlmIChpZCkge1xyXG4gICAgICAgICAgICBhd2FpdCB0aGlzLmxvYWREYXRhKGlkKTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVEYXRhKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uU2hvdygpIHtcclxuICAgICAgICAvLyDmr4/mrKFvblNob3flkIzmraXmlbDmja5cclxuICAgICAgICBjb25zdCBjb3Vwb25NYW5hZ2UgPSBnbG9iYWxTZXJ2aWNlLmdldCgnY291cG9uTWFuYWdlJyk7XHJcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLmZvcm0sIGNvdXBvbk1hbmFnZSk7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgbG9hZERhdGEoaWQpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCB7IGRhdGE6IGNvdXBvbiB9ID0gYXdhaXQgZ2V0KExPQURfQ09VUE9OICsgaWQpO1xyXG4gICAgICAgICAgICBsZXQgeyBjb3Vwb25Db25kaXRpb24gfSA9IGNvdXBvbjtcclxuICAgICAgICAgICAgY29uc3QgbXBJZCA9IHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ2N1cnJlbnRfbXBpZCcpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGNvdXBvbkNvbmRpdGlvbikge1xyXG4gICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICBjb3Vwb25Db25kaXRpb24gPSBKU09OLnBhcnNlKGNvdXBvbkNvbmRpdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihjb3Vwb24sIGNvdXBvbkNvbmRpdGlvbik7XHJcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lcnJvckhhbmRsZXIoZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHtcclxuICAgICAgICAgICAgICAgIHRpdGxlLFxyXG4gICAgICAgICAgICAgICAgc3ViVGl0bGUsXHJcbiAgICAgICAgICAgICAgICBjb3Vwb25UeXBlLFxyXG4gICAgICAgICAgICAgICAgdG90YWxDb3VudCxcclxuICAgICAgICAgICAgICAgIGxpbWl0Q291bnQsXHJcbiAgICAgICAgICAgICAgICBsaW1pdEFtb3VudCxcclxuICAgICAgICAgICAgICAgIGNvdXBvbkRpc2NhcmQsXHJcbiAgICAgICAgICAgICAgICByZWxpZWZBbW91bnQsXHJcbiAgICAgICAgICAgICAgICB2YWxpZFR5cGUsXHJcbiAgICAgICAgICAgICAgICB2YWxpZERheXMsXHJcbiAgICAgICAgICAgICAgICB2YWxpZEFmdGVyRGF5cyxcclxuICAgICAgICAgICAgICAgIHZhbGlkU3RhcnR0aW1lLFxyXG4gICAgICAgICAgICAgICAgdmFsaWRFbmR0aW1lLFxyXG4gICAgICAgICAgICAgICAgYXBwbHlUeXBlLFxyXG4gICAgICAgICAgICAgICAgc2VydmljZXMsXHJcbiAgICAgICAgICAgIH0gPSBjb3Vwb247XHJcbiAgICAgICAgICAgIGxldCBzZXJ2aWNlSWRzID0gJyc7XHJcblxyXG4gICAgICAgICAgICBpZiAoc2VydmljZXMgJiYgc2VydmljZXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBzZXJ2aWNlSWRzID0gc2VydmljZXMubWFwKGl0ZW0gPT4gaXRlbS5pZCkuam9pbignLCcpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMuZm9ybSwge1xyXG4gICAgICAgICAgICAgICAgaWQsXHJcbiAgICAgICAgICAgICAgICBtcElkLFxyXG4gICAgICAgICAgICAgICAgdGl0bGUsXHJcbiAgICAgICAgICAgICAgICBzdWJUaXRsZSxcclxuICAgICAgICAgICAgICAgIGNvdXBvblR5cGUsXHJcbiAgICAgICAgICAgICAgICB0b3RhbENvdW50LFxyXG4gICAgICAgICAgICAgICAgbGltaXRDb3VudCxcclxuICAgICAgICAgICAgICAgIGxpbWl0QW1vdW50LFxyXG4gICAgICAgICAgICAgICAgY291cG9uRGlzY2FyZCxcclxuICAgICAgICAgICAgICAgIHJlbGllZkFtb3VudCxcclxuICAgICAgICAgICAgICAgIHZhbGlkVHlwZSxcclxuICAgICAgICAgICAgICAgIHZhbGlkRGF5cyxcclxuICAgICAgICAgICAgICAgIHZhbGlkQWZ0ZXJEYXlzLFxyXG4gICAgICAgICAgICAgICAgdmFsaWRTdGFydHRpbWUsXHJcbiAgICAgICAgICAgICAgICB2YWxpZEVuZHRpbWUsXHJcbiAgICAgICAgICAgICAgICBhcHBseVR5cGUsXHJcbiAgICAgICAgICAgICAgICBzZXJ2aWNlSWRzLFxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICB0aGlzLmVycm9ySGFuZGxlcihlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlRGF0YSgpIHtcclxuICAgICAgICBjb25zdCBjb3Vwb25NYW5hZ2UgPSBnbG9iYWxTZXJ2aWNlLmdldCgnY291cG9uTWFuYWdlJyk7XHJcbiAgICAgICAgZ2xvYmFsU2VydmljZS5zZXQoJ2NvdXBvbk1hbmFnZScsIE9iamVjdC5hc3NpZ24oY291cG9uTWFuYWdlLCB0aGlzLmZvcm0pKTtcclxuICAgIH1cclxufVxyXG4iXX0=