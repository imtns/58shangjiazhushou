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
