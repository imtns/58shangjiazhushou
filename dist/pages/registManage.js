'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _utils = require('./../utils/index.js');

var _ajax = require('./../utils/ajax.js');

var _RemindBar = require('./../components/RemindBar.js');

var _RemindBar2 = _interopRequireDefault(_RemindBar);

var _UploaderCom = require('./../components/UploaderCom.js');

var _UploaderCom2 = _interopRequireDefault(_UploaderCom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RegistManage = function (_wepy$page) {
    _inherits(RegistManage, _wepy$page);

    function RegistManage() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, RegistManage);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = RegistManage.__proto__ || Object.getPrototypeOf(RegistManage)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            navigationBarTitleText: '注册'
        }, _this.$repeat = {}, _this.$props = { "RemindBar": { "xmlns:v-bind": "", "v-bind:currentstep.once": "currentstep" }, "UploaderCom": { "xmlns:v-on": "", "title": "wechatBrandRegist" }, "anotherUploaderCom": { "title": "wechatBrandAuth" } }, _this.$events = { "UploaderCom": { "v-on:childFn": "uploadFn" }, "anotherUploaderCom": { "v-on:childFn": "uploadFn" } }, _this.components = {
            RemindBar: _RemindBar2.default,
            UploaderCom: _UploaderCom2.default,
            anotherUploaderCom: _UploaderCom2.default
        }, _this.data = {
            currentstep: '2',
            wechatNameType: [{
                type: '1',
                name: '基于商标'
            }, {
                type: '2',
                name: '基于媒体'
            }, {
                type: '3',
                name: '基于自选'
            }],
            form: {
                manager: '', // 管理员姓名
                managerId: '', // 身份证号码
                managerTel: '', // 电话
                wechatName: '', // 小程序命名
                wechatNameType: '', // 命名类型
                wechatBrandRegist: '', // 商标注册证（上传)
                wechatBrandAuth: '' // 商标授权书（上传，选填）
            },
            regTel: /^[1][3456789][0-9]{9}$/,
            regiDCard1: /^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$/, // 15位
            regiDCard2: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/ // 18位
        }, _this.methods = {
            uploadFn: function uploadFn(key, src) {
                // console.log(key, src);
                // console.log(`parent received emit event, number is:${src}`, `key${key}`);
                var obj = {};
                obj[key] = src;
                this.form = Object.assign({}, this.form, obj);
                this.$apply();
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(RegistManage, [{
        key: 'onLoad',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return (0, _utils.sleep)();

                            case 2:
                                console.log('onLoad');

                            case 3:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function onLoad() {
                return _ref2.apply(this, arguments);
            }

            return onLoad;
        }()
        // 输入框数据

    }, {
        key: 'setText',
        value: function setText(e) {
            console.log(e);
            var name = e.currentTarget.dataset.name;

            var obj = {};
            obj[name] = e.detail.value;
            this.form = Object.assign({}, this.form, obj);
            this.$apply();
        }
        // 命名类型

    }, {
        key: 'selectWechatNameType',
        value: function selectWechatNameType(e) {
            var item = e.currentTarget.dataset.item;

            this.form = Object.assign({}, this.form, {
                wechatNameType: item.type
            });
            this.$apply();
        }
    }, {
        key: 'delAuthPaper',
        value: function delAuthPaper(e) {
            var key = e.target.dataset.key;

            var obj = {};
            obj[key] = '';
            this.form = Object.assign({}, this.form, obj);
            this.$apply();
        }
    }, {
        key: 'registSuccess',
        value: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                var _form, manager, managerId, managerTel, wechatName, wechatNameType, wechatBrandRegist, regTel, regiDCard1, regiDCard2, registForm, registMappid, data, url;

                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.prev = 0;
                                _form = this.form, manager = _form.manager, managerId = _form.managerId, managerTel = _form.managerTel, wechatName = _form.wechatName, wechatNameType = _form.wechatNameType, wechatBrandRegist = _form.wechatBrandRegist;
                                regTel = this.regTel, regiDCard1 = this.regiDCard1, regiDCard2 = this.regiDCard2;

                                console.log(this.form);

                                if (!(manager.length === 0 || managerId.length === 0 || managerTel.length === 0 || wechatName.length === 0 || wechatNameType.length === 0 || wechatBrandRegist.length === 0)) {
                                    _context2.next = 9;
                                    break;
                                }

                                (0, _utils.alert)('请完善管理员信息！');
                                return _context2.abrupt('return');

                            case 9:
                                if (!(!regiDCard1.test(managerId) && !regiDCard2.test(managerId))) {
                                    _context2.next = 14;
                                    break;
                                }

                                (0, _utils.alert)('请填写正确身份证号码！');
                                return _context2.abrupt('return');

                            case 14:
                                if (regTel.test(managerTel)) {
                                    _context2.next = 17;
                                    break;
                                }

                                (0, _utils.alert)('请填写正确的电话号码！');
                                return _context2.abrupt('return');

                            case 17:
                                registForm = _wepy2.default.getStorageSync('registForm');
                                registMappid = _wepy2.default.getStorageSync('registMappid');
                                data = Object.assign({}, this.form, registForm);
                                url = '/data/registInfo/' + registMappid;
                                _context2.next = 23;
                                return (0, _ajax.post)(url, data);

                            case 23:
                                _context2.next = 25;
                                return (0, _utils.sleep)();

                            case 25:
                                _wepy2.default.removeStorage('registForm');
                                _wepy2.default.removeStorage('registMappid');
                                _wepy2.default.navigateTo({
                                    url: './registSuccess'
                                });
                                _context2.next = 33;
                                break;

                            case 30:
                                _context2.prev = 30;
                                _context2.t0 = _context2['catch'](0);

                                console.log(_context2.t0);

                            case 33:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this, [[0, 30]]);
            }));

            function registSuccess() {
                return _ref3.apply(this, arguments);
            }

            return registSuccess;
        }()
    }]);

    return RegistManage;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(RegistManage , 'pages/registManage'));
