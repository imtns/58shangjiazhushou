'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _utils = require('./../utils/index.js');

var _RemindBar = require('./../components/RemindBar.js');

var _RemindBar2 = _interopRequireDefault(_RemindBar);

var _UploaderCom = require('./../components/UploaderCom.js');

var _UploaderCom2 = _interopRequireDefault(_UploaderCom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RegistMainAccount = function (_wepy$page) {
    _inherits(RegistMainAccount, _wepy$page);

    function RegistMainAccount() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, RegistMainAccount);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = RegistMainAccount.__proto__ || Object.getPrototypeOf(RegistMainAccount)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            navigationBarTitleText: '注册'
        }, _this.$repeat = {}, _this.$props = { "RemindBar": { "xmlns:v-bind": "", "v-bind:currentstep.once": "currentstep" }, "UploaderCom": { "xmlns:v-on": "", "title": "enterpriseLicense" } }, _this.$events = { "UploaderCom": { "v-on:childFn": "uploadFn" } }, _this.components = {
            RemindBar: _RemindBar2.default,
            UploaderCom: _UploaderCom2.default
        }, _this.data = {
            currentstep: '1',
            form: {
                enterpriseType: 0, // 企业类型 1企业，2个体
                enterpriseName: '', // 企业名称
                enterpriseCode: '', // 营业执照注册号
                enterpriseAccountName: '', // 对外账户名
                enterpriseAccount: '', // 企业开户名称/对外账号
                enterpriseBank: '', // 对公账户开户银行
                enterpriseLicense: '' // 企业工商营业执照图片（上传）
            },
            enterpriseTypeList: [{
                type: 1,
                name: '企业'
            }, {
                type: 2,
                name: '个体工商户'
            }],
            enterpriseCodeReg: /^[0-9a-z]+$/,
            id: ''
        }, _this.methods = {
            uploadFn: function uploadFn(key, src) {
                console.log(key, src);
                console.log('parent received emit event, number is:' + src, 'key' + key);
                // this.form[key] = src;
                var obj = {};
                obj[key] = src;
                this.form = Object.assign({}, this.form, obj);
                this.$apply();
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(RegistMainAccount, [{
        key: 'onLoad',
        value: function onLoad() {}
        // 选择企业类型

    }, {
        key: 'selectEnterpriseType',
        value: function selectEnterpriseType(e) {
            console.log(e);
            var type = e.target.dataset.item.type;

            this.form = Object.assign({}, this.form, {
                enterpriseType: type
            });
            this.$apply();
        }
    }, {
        key: 'setText',

        // 输入框数据
        value: function setText(e) {
            console.log(e);
            var name = e.currentTarget.dataset.name;

            var obj = {};
            obj[name] = e.detail.value;
            this.form = Object.assign({}, this.form, obj);
            this.$apply();
        }
        // 删除图片

    }, {
        key: 'delAuthPaper',
        value: function delAuthPaper(e) {
            var key = e.target.dataset.key;

            var obj = {};
            obj[key] = '';
            this.form = Object.assign({}, this.form, obj);
            this.$apply();
        }
        // 下一步

    }, {
        key: 'nextStep',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var _form, enterpriseType, enterpriseName, enterpriseCode, enterpriseAccountName, enterpriseAccount, enterpriseBank, enterpriseLicense, enterpriseCodeReg;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _form = this.form, enterpriseType = _form.enterpriseType, enterpriseName = _form.enterpriseName, enterpriseCode = _form.enterpriseCode, enterpriseAccountName = _form.enterpriseAccountName, enterpriseAccount = _form.enterpriseAccount, enterpriseBank = _form.enterpriseBank, enterpriseLicense = _form.enterpriseLicense;

                                console.log(this.form);
                                enterpriseCodeReg = this.enterpriseCodeReg;

                                if (!(enterpriseType.length === 0 || enterpriseName.length === 0 || enterpriseCode.length === 0 || enterpriseAccountName.length === 0 || enterpriseAccount.length === 0 || enterpriseBank.length === 0 || enterpriseLicense.length === 0)) {
                                    _context.next = 8;
                                    break;
                                }

                                (0, _utils.alert)('请完善主体信息！');
                                return _context.abrupt('return');

                            case 8:
                                if (!(enterpriseCode.length !== 15 && enterpriseCode.length !== 18 && !enterpriseCodeReg.test(enterpriseCode))) {
                                    _context.next = 13;
                                    break;
                                }

                                (0, _utils.alert)('营业执照或统一信用社代码格式不正确！');
                                return _context.abrupt('return');

                            case 13:
                                if (!(enterpriseAccount.length !== 16 && enterpriseAccount.length !== 19)) {
                                    _context.next = 16;
                                    break;
                                }

                                (0, _utils.alert)('银行卡格式不正确！');
                                return _context.abrupt('return');

                            case 16:
                                _wepy2.default.setStorageSync('registForm', this.form);
                                _context.next = 19;
                                return (0, _utils.sleep)();

                            case 19:
                                _wepy2.default.navigateTo({
                                    url: './registManage'
                                });

                            case 20:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function nextStep() {
                return _ref2.apply(this, arguments);
            }

            return nextStep;
        }()
    }]);

    return RegistMainAccount;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(RegistMainAccount , 'pages/registMainAccount'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlZ2lzdE1haW5BY2NvdW50LmpzIl0sIm5hbWVzIjpbIlJlZ2lzdE1haW5BY2NvdW50IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsIlJlbWluZEJhciIsIlVwbG9hZGVyQ29tIiwiZGF0YSIsImN1cnJlbnRzdGVwIiwiZm9ybSIsImVudGVycHJpc2VUeXBlIiwiZW50ZXJwcmlzZU5hbWUiLCJlbnRlcnByaXNlQ29kZSIsImVudGVycHJpc2VBY2NvdW50TmFtZSIsImVudGVycHJpc2VBY2NvdW50IiwiZW50ZXJwcmlzZUJhbmsiLCJlbnRlcnByaXNlTGljZW5zZSIsImVudGVycHJpc2VUeXBlTGlzdCIsInR5cGUiLCJuYW1lIiwiZW50ZXJwcmlzZUNvZGVSZWciLCJpZCIsIm1ldGhvZHMiLCJ1cGxvYWRGbiIsImtleSIsInNyYyIsImNvbnNvbGUiLCJsb2ciLCJvYmoiLCJPYmplY3QiLCJhc3NpZ24iLCIkYXBwbHkiLCJlIiwidGFyZ2V0IiwiZGF0YXNldCIsIml0ZW0iLCJjdXJyZW50VGFyZ2V0IiwiZGV0YWlsIiwidmFsdWUiLCJsZW5ndGgiLCJ0ZXN0Iiwid2VweSIsInNldFN0b3JhZ2VTeW5jIiwibmF2aWdhdGVUbyIsInVybCIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQ0E7Ozs7QUFFQTs7QUFFQTs7OztBQUVBOzs7Ozs7Ozs7Ozs7OztJQUVxQkEsaUI7Ozs7Ozs7Ozs7Ozs7O2dOQUNqQkMsTSxHQUFTO0FBQ0xDLG9DQUF3QjtBQURuQixTLFFBR1ZDLE8sR0FBVSxFLFFBQ2JDLE0sR0FBUyxFQUFDLGFBQVksRUFBQyxnQkFBZSxFQUFoQixFQUFtQiwyQkFBMEIsYUFBN0MsRUFBYixFQUF5RSxlQUFjLEVBQUMsY0FBYSxFQUFkLEVBQWlCLFNBQVEsbUJBQXpCLEVBQXZGLEUsUUFDVEMsTyxHQUFVLEVBQUMsZUFBYyxFQUFDLGdCQUFlLFVBQWhC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QTNCLGVBQWUyQixNQUFmLEtBQTBCLENBRjFCLElBR0ExQixzQkFBc0IwQixNQUF0QixLQUFpQyxDQUhqQyxJQUlBekIsa0JBQWtCeUIsTUFBbEIsS0FBNkIsQ0FKN0IsSUFLQXhCLGVBQWV3QixNQUFmLEtBQTBCLENBTDFCLElBTUF2QixrQkFBa0J1QixNQUFsQixLQUE2QixDOzs7OztBQUM3QixrREFBTSxVQUFOOzs7O3NDQUdBM0IsZUFBZTJCLE1BQWYsS0FBMEIsRUFBMUIsSUFDQTNCLGVBQWUyQixNQUFmLEtBQTBCLEVBRDFCLElBRUEsQ0FBQ25CLGtCQUFrQm9CLElBQWxCLENBQXVCNUIsY0FBdkIsQzs7Ozs7QUFDRCxrREFBTSxvQkFBTjs7OztzQ0FFT0Usa0JBQWtCeUIsTUFBbEIsS0FBNkIsRUFBN0IsSUFBbUN6QixrQkFBa0J5QixNQUFsQixLQUE2QixFOzs7OztBQUN2RSxrREFBTSxXQUFOOzs7O0FBR0pFLCtDQUFLQyxjQUFMLENBQW9CLFlBQXBCLEVBQWtDLEtBQUtqQyxJQUF2Qzs7dUNBQ00sbUI7OztBQUNOZ0MsK0NBQUtFLFVBQUwsQ0FBZ0I7QUFDWkMseUNBQUs7QUFETyxpQ0FBaEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUEzR3VDSCxlQUFLSSxJOztrQkFBL0IvQyxpQiIsImZpbGUiOiJyZWdpc3RNYWluQWNjb3VudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5cbmltcG9ydCB7IHNsZWVwLCBhbGVydCB9IGZyb20gJy4uL3V0aWxzJztcblxuaW1wb3J0IFJlbWluZEJhciBmcm9tICcuLi9jb21wb25lbnRzL1JlbWluZEJhcic7XG5cbmltcG9ydCBVcGxvYWRlckNvbSBmcm9tICcuLi9jb21wb25lbnRzL1VwbG9hZGVyQ29tJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVnaXN0TWFpbkFjY291bnQgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+azqOWGjCcsXG4gICAgfVxuICAgJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJSZW1pbmRCYXJcIjp7XCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOmN1cnJlbnRzdGVwLm9uY2VcIjpcImN1cnJlbnRzdGVwXCJ9LFwiVXBsb2FkZXJDb21cIjp7XCJ4bWxuczp2LW9uXCI6XCJcIixcInRpdGxlXCI6XCJlbnRlcnByaXNlTGljZW5zZVwifX07XHJcbiRldmVudHMgPSB7XCJVcGxvYWRlckNvbVwiOntcInYtb246Y2hpbGRGblwiOlwidXBsb2FkRm5cIn19O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICAgICAgUmVtaW5kQmFyLFxuICAgICAgICBVcGxvYWRlckNvbSxcbiAgICB9XG4gICAgZGF0YSA9IHtcbiAgICAgICAgY3VycmVudHN0ZXA6ICcxJyxcbiAgICAgICAgZm9ybToge1xuICAgICAgICAgICAgZW50ZXJwcmlzZVR5cGU6IDAsIC8vIOS8geS4muexu+WeiyAx5LyB5Lia77yMMuS4quS9k1xuICAgICAgICAgICAgZW50ZXJwcmlzZU5hbWU6ICcnLCAvLyDkvIHkuJrlkI3np7BcbiAgICAgICAgICAgIGVudGVycHJpc2VDb2RlOiAnJywgLy8g6JCl5Lia5omn54Wn5rOo5YaM5Y+3XG4gICAgICAgICAgICBlbnRlcnByaXNlQWNjb3VudE5hbWU6ICcnLCAvLyDlr7nlpJbotKbmiLflkI1cbiAgICAgICAgICAgIGVudGVycHJpc2VBY2NvdW50OiAnJywgLy8g5LyB5Lia5byA5oi35ZCN56ewL+WvueWklui0puWPt1xuICAgICAgICAgICAgZW50ZXJwcmlzZUJhbms6ICcnLCAvLyDlr7nlhazotKbmiLflvIDmiLfpk7booYxcbiAgICAgICAgICAgIGVudGVycHJpc2VMaWNlbnNlOiAnJywgLy8g5LyB5Lia5bel5ZWG6JCl5Lia5omn54Wn5Zu+54mH77yI5LiK5Lyg77yJXG4gICAgICAgIH0sXG4gICAgICAgIGVudGVycHJpc2VUeXBlTGlzdDogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHR5cGU6IDEsXG4gICAgICAgICAgICAgICAgbmFtZTogJ+S8geS4micsXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdHlwZTogMixcbiAgICAgICAgICAgICAgICBuYW1lOiAn5Liq5L2T5bel5ZWG5oi3JyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICAgIGVudGVycHJpc2VDb2RlUmVnOiAvXlswLTlhLXpdKyQvLFxuICAgICAgICBpZDogJycsXG4gICAgfVxuICAgIG9uTG9hZCAoKSB7XG4gICAgfVxuICAgIC8vIOmAieaLqeS8geS4muexu+Wei1xuICAgIHNlbGVjdEVudGVycHJpc2VUeXBlIChlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgICBjb25zdCB7IHR5cGUgfSA9IGUudGFyZ2V0LmRhdGFzZXQuaXRlbTtcbiAgICAgICAgdGhpcy5mb3JtID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5mb3JtLCB7XG4gICAgICAgICAgICBlbnRlcnByaXNlVHlwZTogdHlwZSxcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgfVxuICAgIG1ldGhvZHMgPSB7XG4gICAgICAgIHVwbG9hZEZuIChrZXksIHNyYykge1xuICAgICAgICAgICAgY29uc29sZS5sb2coa2V5LCBzcmMpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coYHBhcmVudCByZWNlaXZlZCBlbWl0IGV2ZW50LCBudW1iZXIgaXM6JHtzcmN9YCwgYGtleSR7a2V5fWApO1xuICAgICAgICAgICAgLy8gdGhpcy5mb3JtW2tleV0gPSBzcmM7XG4gICAgICAgICAgICBjb25zdCBvYmogPSB7fTtcbiAgICAgICAgICAgIG9ialtrZXldID0gc3JjO1xuICAgICAgICAgICAgdGhpcy5mb3JtID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5mb3JtLCBvYmopO1xuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgICAgfSxcbiAgICB9XG4gICAgLy8g6L6T5YWl5qGG5pWw5o2uXG4gICAgc2V0VGV4dCAoZSkge1xuICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgICAgY29uc3QgeyBuYW1lIH0gPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldDtcbiAgICAgICAgY29uc3Qgb2JqID0ge307XG4gICAgICAgIG9ialtuYW1lXSA9IGUuZGV0YWlsLnZhbHVlO1xuICAgICAgICB0aGlzLmZvcm0gPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmZvcm0sIG9iaik7XG4gICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgfVxuICAgIC8vIOWIoOmZpOWbvueJh1xuICAgIGRlbEF1dGhQYXBlciAoZSkge1xuICAgICAgICBjb25zdCB7IGtleSB9ID0gZS50YXJnZXQuZGF0YXNldDtcbiAgICAgICAgY29uc3Qgb2JqID0ge307XG4gICAgICAgIG9ialtrZXldID0gJyc7XG4gICAgICAgIHRoaXMuZm9ybSA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuZm9ybSwgb2JqKTtcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICB9XG4gICAgLy8g5LiL5LiA5q2lXG4gICAgYXN5bmMgbmV4dFN0ZXAgKCkge1xuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICBlbnRlcnByaXNlVHlwZSxcbiAgICAgICAgICAgIGVudGVycHJpc2VOYW1lLFxuICAgICAgICAgICAgZW50ZXJwcmlzZUNvZGUsXG4gICAgICAgICAgICBlbnRlcnByaXNlQWNjb3VudE5hbWUsXG4gICAgICAgICAgICBlbnRlcnByaXNlQWNjb3VudCxcbiAgICAgICAgICAgIGVudGVycHJpc2VCYW5rLFxuICAgICAgICAgICAgZW50ZXJwcmlzZUxpY2Vuc2UsXG4gICAgICAgIH0gPSB0aGlzLmZvcm07XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZm9ybSk7XG4gICAgICAgIGNvbnN0IHsgZW50ZXJwcmlzZUNvZGVSZWcgfSA9IHRoaXM7XG4gICAgICAgIGlmIChlbnRlcnByaXNlVHlwZS5sZW5ndGggPT09IDAgfHxcbiAgICAgICAgICAgIGVudGVycHJpc2VOYW1lLmxlbmd0aCA9PT0gMCB8fFxuICAgICAgICAgICAgZW50ZXJwcmlzZUNvZGUubGVuZ3RoID09PSAwIHx8XG4gICAgICAgICAgICBlbnRlcnByaXNlQWNjb3VudE5hbWUubGVuZ3RoID09PSAwIHx8XG4gICAgICAgICAgICBlbnRlcnByaXNlQWNjb3VudC5sZW5ndGggPT09IDAgfHxcbiAgICAgICAgICAgIGVudGVycHJpc2VCYW5rLmxlbmd0aCA9PT0gMCB8fFxuICAgICAgICAgICAgZW50ZXJwcmlzZUxpY2Vuc2UubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBhbGVydCgn6K+35a6M5ZaE5Li75L2T5L+h5oGv77yBJyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICBlbnRlcnByaXNlQ29kZS5sZW5ndGggIT09IDE1ICYmXG4gICAgICAgICAgICBlbnRlcnByaXNlQ29kZS5sZW5ndGggIT09IDE4ICYmXG4gICAgICAgICAgICAhZW50ZXJwcmlzZUNvZGVSZWcudGVzdChlbnRlcnByaXNlQ29kZSkpIHtcbiAgICAgICAgICAgIGFsZXJ0KCfokKXkuJrmiafnhafmiJbnu5/kuIDkv6HnlKjnpL7ku6PnoIHmoLzlvI/kuI3mraPnoa7vvIEnKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfSBlbHNlIGlmIChlbnRlcnByaXNlQWNjb3VudC5sZW5ndGggIT09IDE2ICYmIGVudGVycHJpc2VBY2NvdW50Lmxlbmd0aCAhPT0gMTkpIHtcbiAgICAgICAgICAgIGFsZXJ0KCfpk7booYzljaHmoLzlvI/kuI3mraPnoa7vvIEnKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB3ZXB5LnNldFN0b3JhZ2VTeW5jKCdyZWdpc3RGb3JtJywgdGhpcy5mb3JtKTtcbiAgICAgICAgYXdhaXQgc2xlZXAoKTtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgIHVybDogJy4vcmVnaXN0TWFuYWdlJyxcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIl19