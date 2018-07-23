'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _globalService = require('./../utils/globalService.js');

var _globalService2 = _interopRequireDefault(_globalService);

var _utils = require('./../utils/index.js');

var _coupon = require('./../mixins/coupon.js');

var _coupon2 = _interopRequireDefault(_coupon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
            navigationBarTitleText: '生效时间'
        }, _this.mixins = [_coupon2.default], _this.data = {
            validType: 1, // 1 固定时间，2 领取后生效
            validDays: null,
            validAfterDays: null,
            validStarttime: '',
            validEndtime: '',
            formatValidEndtime: '',
            formatValidStarttime: ''
        }, _this.methods = {
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
        }, _this.computed = {
            formatValidStarttime: function formatValidStarttime() {
                return this.formatTime(this.validStarttime || '');
            },
            formatValidEndtime: function formatValidEndtime() {
                return this.formatTime(this.validEndtime || '');
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Index, [{
        key: 'onLoad',
        value: function onLoad() {
            var couponManage = _globalService2.default.get('couponManage');
            Object.assign(this, couponManage);
            this.updateData();
        }
    }, {
        key: 'validator',
        value: function validator(prop, v) {
            var value = v;
            var validData = Object.assign({}, this);
            validData[prop] = value;

            var validStarttime = validData.validStarttime,
                validEndtime = validData.validEndtime;


            if (validStarttime && validEndtime && validStarttime > validEndtime) {
                return {
                    result: false,
                    msg: '优惠结束时间不能小于开始时间！'
                };
            }

            return {
                result: true,
                msg: 'ok'
            };
        }
    }, {
        key: 'updateData',
        value: function updateData() {
            var couponManage = _globalService2.default.get('couponManage');
            _globalService2.default.set('couponManage', Object.assign(couponManage, {
                validType: this.validType,
                validDays: this.validDays,
                validAfterDays: this.validAfterDays,
                validStarttime: this.validStarttime,
                validEndtime: this.validEndtime
            }));
        }
    }]);

    return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/couponValidTime'));
