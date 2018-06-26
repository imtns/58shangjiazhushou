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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlZ2lzdE1haW5BY2NvdW50LmpzIl0sIm5hbWVzIjpbIlJlZ2lzdE1haW5BY2NvdW50IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsIlJlbWluZEJhciIsIlVwbG9hZGVyQ29tIiwiZGF0YSIsImN1cnJlbnRzdGVwIiwiZm9ybSIsImVudGVycHJpc2VUeXBlIiwiZW50ZXJwcmlzZU5hbWUiLCJlbnRlcnByaXNlQ29kZSIsImVudGVycHJpc2VBY2NvdW50TmFtZSIsImVudGVycHJpc2VBY2NvdW50IiwiZW50ZXJwcmlzZUJhbmsiLCJlbnRlcnByaXNlTGljZW5zZSIsImVudGVycHJpc2VUeXBlTGlzdCIsInR5cGUiLCJuYW1lIiwiZW50ZXJwcmlzZUNvZGVSZWciLCJpZCIsIm1ldGhvZHMiLCJ1cGxvYWRGbiIsImtleSIsInNyYyIsImNvbnNvbGUiLCJsb2ciLCJvYmoiLCJPYmplY3QiLCJhc3NpZ24iLCIkYXBwbHkiLCJlIiwidGFyZ2V0IiwiZGF0YXNldCIsIml0ZW0iLCJjdXJyZW50VGFyZ2V0IiwiZGV0YWlsIiwidmFsdWUiLCJsZW5ndGgiLCJ0ZXN0Iiwid2VweSIsInNldFN0b3JhZ2VTeW5jIiwibmF2aWdhdGVUbyIsInVybCIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQ0E7Ozs7QUFFQTs7QUFFQTs7OztBQUVBOzs7Ozs7Ozs7Ozs7OztJQUVxQkEsaUI7Ozs7Ozs7Ozs7Ozs7O2dOQUNqQkMsTSxHQUFTO0FBQ0xDLG9DQUF3QjtBQURuQixTLFFBR1ZDLE8sR0FBVSxFLFFBQ2JDLE0sR0FBUyxFQUFDLGFBQVksRUFBQyxnQkFBZSxFQUFoQixFQUFtQiwyQkFBMEIsYUFBN0MsRUFBYixFQUF5RSxlQUFjLEVBQUMsY0FBYSxFQUFkLEVBQWlCLFNBQVEsbUJBQXpCLEVBQXZGLEUsUUFDVEMsTyxHQUFVLEVBQUMsZUFBYyxFQUFDLGdCQUFlLFVBQWhC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QTNCLGVBQWUyQixNQUFmLEtBQTBCLENBRjFCLElBR0ExQixzQkFBc0IwQixNQUF0QixLQUFpQyxDQUhqQyxJQUlBekIsa0JBQWtCeUIsTUFBbEIsS0FBNkIsQ0FKN0IsSUFLQXhCLGVBQWV3QixNQUFmLEtBQTBCLENBTDFCLElBTUF2QixrQkFBa0J1QixNQUFsQixLQUE2QixDOzs7OztBQUM3QixrREFBTSxVQUFOOzs7O3NDQUdBM0IsZUFBZTJCLE1BQWYsS0FBMEIsRUFBMUIsSUFDQTNCLGVBQWUyQixNQUFmLEtBQTBCLEVBRDFCLElBRUEsQ0FBQ25CLGtCQUFrQm9CLElBQWxCLENBQXVCNUIsY0FBdkIsQzs7Ozs7QUFDRCxrREFBTSxvQkFBTjs7OztzQ0FFT0Usa0JBQWtCeUIsTUFBbEIsS0FBNkIsRUFBN0IsSUFBbUN6QixrQkFBa0J5QixNQUFsQixLQUE2QixFOzs7OztBQUN2RSxrREFBTSxXQUFOOzs7O0FBR0pFLCtDQUFLQyxjQUFMLENBQW9CLFlBQXBCLEVBQWtDLEtBQUtqQyxJQUF2Qzs7dUNBQ00sbUI7OztBQUNOZ0MsK0NBQUtFLFVBQUwsQ0FBZ0I7QUFDWkMseUNBQUs7QUFETyxpQ0FBaEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUEzR3VDSCxlQUFLSSxJOztrQkFBL0IvQyxpQiIsImZpbGUiOiJyZWdpc3RNYWluQWNjb3VudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcclxuXHJcbmltcG9ydCB7IHNsZWVwLCBhbGVydCB9IGZyb20gJy4uL3V0aWxzJztcclxuXHJcbmltcG9ydCBSZW1pbmRCYXIgZnJvbSAnLi4vY29tcG9uZW50cy9SZW1pbmRCYXInO1xyXG5cclxuaW1wb3J0IFVwbG9hZGVyQ29tIGZyb20gJy4uL2NvbXBvbmVudHMvVXBsb2FkZXJDb20nO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVnaXN0TWFpbkFjY291bnQgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gICAgY29uZmlnID0ge1xyXG4gICAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfms6jlhownLFxyXG4gICAgfVxyXG4gICAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcIlJlbWluZEJhclwiOntcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6Y3VycmVudHN0ZXAub25jZVwiOlwiY3VycmVudHN0ZXBcIn0sXCJVcGxvYWRlckNvbVwiOntcInhtbG5zOnYtb25cIjpcIlwiLFwidGl0bGVcIjpcImVudGVycHJpc2VMaWNlbnNlXCJ9fTtcclxuJGV2ZW50cyA9IHtcIlVwbG9hZGVyQ29tXCI6e1widi1vbjpjaGlsZEZuXCI6XCJ1cGxvYWRGblwifX07XHJcbiBjb21wb25lbnRzID0ge1xyXG4gICAgICAgIFJlbWluZEJhcixcclxuICAgICAgICBVcGxvYWRlckNvbSxcclxuICAgIH1cclxuICAgIGRhdGEgPSB7XHJcbiAgICAgICAgY3VycmVudHN0ZXA6ICcxJyxcclxuICAgICAgICBmb3JtOiB7XHJcbiAgICAgICAgICAgIGVudGVycHJpc2VUeXBlOiAwLCAvLyDkvIHkuJrnsbvlnosgMeS8geS4mu+8jDLkuKrkvZNcclxuICAgICAgICAgICAgZW50ZXJwcmlzZU5hbWU6ICcnLCAvLyDkvIHkuJrlkI3np7BcclxuICAgICAgICAgICAgZW50ZXJwcmlzZUNvZGU6ICcnLCAvLyDokKXkuJrmiafnhafms6jlhozlj7dcclxuICAgICAgICAgICAgZW50ZXJwcmlzZUFjY291bnROYW1lOiAnJywgLy8g5a+55aSW6LSm5oi35ZCNXHJcbiAgICAgICAgICAgIGVudGVycHJpc2VBY2NvdW50OiAnJywgLy8g5LyB5Lia5byA5oi35ZCN56ewL+WvueWklui0puWPt1xyXG4gICAgICAgICAgICBlbnRlcnByaXNlQmFuazogJycsIC8vIOWvueWFrOi0puaIt+W8gOaIt+mTtuihjFxyXG4gICAgICAgICAgICBlbnRlcnByaXNlTGljZW5zZTogJycsIC8vIOS8geS4muW3peWVhuiQpeS4muaJp+eFp+WbvueJh++8iOS4iuS8oO+8iVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW50ZXJwcmlzZVR5cGVMaXN0OiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IDEsXHJcbiAgICAgICAgICAgICAgICBuYW1lOiAn5LyB5LiaJyxcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogMixcclxuICAgICAgICAgICAgICAgIG5hbWU6ICfkuKrkvZPlt6XllYbmiLcnLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgZW50ZXJwcmlzZUNvZGVSZWc6IC9eWzAtOWEtel0rJC8sXHJcbiAgICAgICAgaWQ6ICcnLFxyXG4gICAgfVxyXG4gICAgb25Mb2FkICgpIHtcclxuICAgIH1cclxuICAgIC8vIOmAieaLqeS8geS4muexu+Wei1xyXG4gICAgc2VsZWN0RW50ZXJwcmlzZVR5cGUgKGUpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlKTtcclxuICAgICAgICBjb25zdCB7IHR5cGUgfSA9IGUudGFyZ2V0LmRhdGFzZXQuaXRlbTtcclxuICAgICAgICB0aGlzLmZvcm0gPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmZvcm0sIHtcclxuICAgICAgICAgICAgZW50ZXJwcmlzZVR5cGU6IHR5cGUsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgIH1cclxuICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgICAgdXBsb2FkRm4gKGtleSwgc3JjKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGtleSwgc3JjKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coYHBhcmVudCByZWNlaXZlZCBlbWl0IGV2ZW50LCBudW1iZXIgaXM6JHtzcmN9YCwgYGtleSR7a2V5fWApO1xyXG4gICAgICAgICAgICAvLyB0aGlzLmZvcm1ba2V5XSA9IHNyYztcclxuICAgICAgICAgICAgY29uc3Qgb2JqID0ge307XHJcbiAgICAgICAgICAgIG9ialtrZXldID0gc3JjO1xyXG4gICAgICAgICAgICB0aGlzLmZvcm0gPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmZvcm0sIG9iaik7XHJcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgfSxcclxuICAgIH1cclxuICAgIC8vIOi+k+WFpeahhuaVsOaNrlxyXG4gICAgc2V0VGV4dCAoZSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGUpO1xyXG4gICAgICAgIGNvbnN0IHsgbmFtZSB9ID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQ7XHJcbiAgICAgICAgY29uc3Qgb2JqID0ge307XHJcbiAgICAgICAgb2JqW25hbWVdID0gZS5kZXRhaWwudmFsdWU7XHJcbiAgICAgICAgdGhpcy5mb3JtID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5mb3JtLCBvYmopO1xyXG4gICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICB9XHJcbiAgICAvLyDliKDpmaTlm77niYdcclxuICAgIGRlbEF1dGhQYXBlciAoZSkge1xyXG4gICAgICAgIGNvbnN0IHsga2V5IH0gPSBlLnRhcmdldC5kYXRhc2V0O1xyXG4gICAgICAgIGNvbnN0IG9iaiA9IHt9O1xyXG4gICAgICAgIG9ialtrZXldID0gJyc7XHJcbiAgICAgICAgdGhpcy5mb3JtID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5mb3JtLCBvYmopO1xyXG4gICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICB9XHJcbiAgICAvLyDkuIvkuIDmraVcclxuICAgIGFzeW5jIG5leHRTdGVwICgpIHtcclxuICAgICAgICBjb25zdCB7XHJcbiAgICAgICAgICAgIGVudGVycHJpc2VUeXBlLFxyXG4gICAgICAgICAgICBlbnRlcnByaXNlTmFtZSxcclxuICAgICAgICAgICAgZW50ZXJwcmlzZUNvZGUsXHJcbiAgICAgICAgICAgIGVudGVycHJpc2VBY2NvdW50TmFtZSxcclxuICAgICAgICAgICAgZW50ZXJwcmlzZUFjY291bnQsXHJcbiAgICAgICAgICAgIGVudGVycHJpc2VCYW5rLFxyXG4gICAgICAgICAgICBlbnRlcnByaXNlTGljZW5zZSxcclxuICAgICAgICB9ID0gdGhpcy5mb3JtO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZm9ybSk7XHJcbiAgICAgICAgY29uc3QgeyBlbnRlcnByaXNlQ29kZVJlZyB9ID0gdGhpcztcclxuICAgICAgICBpZiAoZW50ZXJwcmlzZVR5cGUubGVuZ3RoID09PSAwIHx8XHJcbiAgICAgICAgICAgIGVudGVycHJpc2VOYW1lLmxlbmd0aCA9PT0gMCB8fFxyXG4gICAgICAgICAgICBlbnRlcnByaXNlQ29kZS5sZW5ndGggPT09IDAgfHxcclxuICAgICAgICAgICAgZW50ZXJwcmlzZUFjY291bnROYW1lLmxlbmd0aCA9PT0gMCB8fFxyXG4gICAgICAgICAgICBlbnRlcnByaXNlQWNjb3VudC5sZW5ndGggPT09IDAgfHxcclxuICAgICAgICAgICAgZW50ZXJwcmlzZUJhbmsubGVuZ3RoID09PSAwIHx8XHJcbiAgICAgICAgICAgIGVudGVycHJpc2VMaWNlbnNlLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICBhbGVydCgn6K+35a6M5ZaE5Li75L2T5L+h5oGv77yBJyk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9IGVsc2UgaWYgKFxyXG4gICAgICAgICAgICBlbnRlcnByaXNlQ29kZS5sZW5ndGggIT09IDE1ICYmXHJcbiAgICAgICAgICAgIGVudGVycHJpc2VDb2RlLmxlbmd0aCAhPT0gMTggJiZcclxuICAgICAgICAgICAgIWVudGVycHJpc2VDb2RlUmVnLnRlc3QoZW50ZXJwcmlzZUNvZGUpKSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KCfokKXkuJrmiafnhafmiJbnu5/kuIDkv6HnlKjnpL7ku6PnoIHmoLzlvI/kuI3mraPnoa7vvIEnKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZW50ZXJwcmlzZUFjY291bnQubGVuZ3RoICE9PSAxNiAmJiBlbnRlcnByaXNlQWNjb3VudC5sZW5ndGggIT09IDE5KSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KCfpk7booYzljaHmoLzlvI/kuI3mraPnoa7vvIEnKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB3ZXB5LnNldFN0b3JhZ2VTeW5jKCdyZWdpc3RGb3JtJywgdGhpcy5mb3JtKTtcclxuICAgICAgICBhd2FpdCBzbGVlcCgpO1xyXG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgIHVybDogJy4vcmVnaXN0TWFuYWdlJyxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG4iXX0=