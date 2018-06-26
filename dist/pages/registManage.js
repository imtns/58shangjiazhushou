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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlZ2lzdE1hbmFnZS5qcyJdLCJuYW1lcyI6WyJSZWdpc3RNYW5hZ2UiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiUmVtaW5kQmFyIiwiVXBsb2FkZXJDb20iLCJhbm90aGVyVXBsb2FkZXJDb20iLCJkYXRhIiwiY3VycmVudHN0ZXAiLCJ3ZWNoYXROYW1lVHlwZSIsInR5cGUiLCJuYW1lIiwiZm9ybSIsIm1hbmFnZXIiLCJtYW5hZ2VySWQiLCJtYW5hZ2VyVGVsIiwid2VjaGF0TmFtZSIsIndlY2hhdEJyYW5kUmVnaXN0Iiwid2VjaGF0QnJhbmRBdXRoIiwicmVnVGVsIiwicmVnaURDYXJkMSIsInJlZ2lEQ2FyZDIiLCJtZXRob2RzIiwidXBsb2FkRm4iLCJrZXkiLCJzcmMiLCJvYmoiLCJPYmplY3QiLCJhc3NpZ24iLCIkYXBwbHkiLCJjb25zb2xlIiwibG9nIiwiZSIsImN1cnJlbnRUYXJnZXQiLCJkYXRhc2V0IiwiZGV0YWlsIiwidmFsdWUiLCJpdGVtIiwidGFyZ2V0IiwibGVuZ3RoIiwidGVzdCIsInJlZ2lzdEZvcm0iLCJ3ZXB5IiwiZ2V0U3RvcmFnZVN5bmMiLCJyZWdpc3RNYXBwaWQiLCJ1cmwiLCJyZW1vdmVTdG9yYWdlIiwibmF2aWdhdGVUbyIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQ0E7Ozs7QUFFQTs7QUFFQTs7QUFFQTs7OztBQUVBOzs7Ozs7Ozs7Ozs7OztJQUVxQkEsWTs7Ozs7Ozs7Ozs7Ozs7c01BQ2pCQyxNLEdBQVM7QUFDTEMsb0NBQXdCO0FBRG5CLFMsUUFHVkMsTyxHQUFVLEUsUUFDYkMsTSxHQUFTLEVBQUMsYUFBWSxFQUFDLGdCQUFlLEVBQWhCLEVBQW1CLDJCQUEwQixhQUE3QyxFQUFiLEVBQXlFLGVBQWMsRUFBQyxjQUFhLEVBQWQsRUFBaUIsU0FBUSxtQkFBekIsRUFBdkYsRUFBcUksc0JBQXFCLEVBQUMsU0FB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d2VweSBmcm9tICd3ZXB5JztcclxuXHJcbmltcG9ydCB7IHNsZWVwLCBhbGVydCB9IGZyb20gJy4uL3V0aWxzJztcclxuXHJcbmltcG9ydCB7IHBvc3QgfSBmcm9tICcuLi91dGlscy9hamF4JztcclxuXHJcbmltcG9ydCBSZW1pbmRCYXIgZnJvbSAnLi4vY29tcG9uZW50cy9SZW1pbmRCYXInO1xyXG5cclxuaW1wb3J0IFVwbG9hZGVyQ29tIGZyb20gJy4uL2NvbXBvbmVudHMvVXBsb2FkZXJDb20nO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVnaXN0TWFuYWdlIGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICAgIGNvbmZpZyA9IHtcclxuICAgICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5rOo5YaMJyxcclxuICAgIH1cclxuICAgJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJSZW1pbmRCYXJcIjp7XCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOmN1cnJlbnRzdGVwLm9uY2VcIjpcImN1cnJlbnRzdGVwXCJ9LFwiVXBsb2FkZXJDb21cIjp7XCJ4bWxuczp2LW9uXCI6XCJcIixcInRpdGxlXCI6XCJ3ZWNoYXRCcmFuZFJlZ2lzdFwifSxcImFub3RoZXJVcGxvYWRlckNvbVwiOntcInRpdGxlXCI6XCJ3ZWNoYXRCcmFuZEF1dGhcIn19O1xyXG4kZXZlbnRzID0ge1wiVXBsb2FkZXJDb21cIjp7XCJ2LW9uOmNoaWxkRm5cIjpcInVwbG9hZEZuXCJ9LFwiYW5vdGhlclVwbG9hZGVyQ29tXCI6e1widi1vbjpjaGlsZEZuXCI6XCJ1cGxvYWRGblwifX07XHJcbiBjb21wb25lbnRzID0ge1xyXG4gICAgICAgIFJlbWluZEJhcixcclxuICAgICAgICBVcGxvYWRlckNvbTogVXBsb2FkZXJDb20sXHJcbiAgICAgICAgYW5vdGhlclVwbG9hZGVyQ29tOiBVcGxvYWRlckNvbSxcclxuICAgIH1cclxuICAgIGRhdGEgPSB7XHJcbiAgICAgICAgY3VycmVudHN0ZXA6ICcyJyxcclxuICAgICAgICB3ZWNoYXROYW1lVHlwZTogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiAnMScsXHJcbiAgICAgICAgICAgICAgICBuYW1lOiAn5Z+65LqO5ZWG5qCHJyxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogJzInLFxyXG4gICAgICAgICAgICAgICAgbmFtZTogJ+WfuuS6juWqkuS9kycsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHR5cGU6ICczJyxcclxuICAgICAgICAgICAgICAgIG5hbWU6ICfln7rkuo7oh6rpgIknLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgZm9ybToge1xyXG4gICAgICAgICAgICBtYW5hZ2VyOiAnJywgLy8g566h55CG5ZGY5aeT5ZCNXHJcbiAgICAgICAgICAgIG1hbmFnZXJJZDogJycsIC8vIOi6q+S7veivgeWPt+eggVxyXG4gICAgICAgICAgICBtYW5hZ2VyVGVsOiAnJywgLy8g55S16K+dXHJcbiAgICAgICAgICAgIHdlY2hhdE5hbWU6ICcnLCAvLyDlsI/nqIvluo/lkb3lkI1cclxuICAgICAgICAgICAgd2VjaGF0TmFtZVR5cGU6ICcnLCAvLyDlkb3lkI3nsbvlnotcclxuICAgICAgICAgICAgd2VjaGF0QnJhbmRSZWdpc3Q6ICcnLCAvLyDllYbmoIfms6jlhozor4HvvIjkuIrkvKApXHJcbiAgICAgICAgICAgIHdlY2hhdEJyYW5kQXV0aDogJycsIC8vIOWVhuagh+aOiOadg+S5pu+8iOS4iuS8oO+8jOmAieWhq++8iVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcmVnVGVsOiAvXlsxXVszNDU2Nzg5XVswLTldezl9JC8sXHJcbiAgICAgICAgcmVnaURDYXJkMTogL15bMS05XVxcZHs1fVxcZHsyfSgoMFsxLTldKXwoMTB8MTF8MTIpKSgoWzAtMl1bMS05XSl8MTB8MjB8MzB8MzEpXFxkezJ9WzAtOVh4XSQvLCAvLyAxNeS9jVxyXG4gICAgICAgIHJlZ2lEQ2FyZDI6IC9eWzEtOV1cXGR7NX0oMTh8MTl8KFsyM11cXGQpKVxcZHsyfSgoMFsxLTldKXwoMTB8MTF8MTIpKSgoWzAtMl1bMS05XSl8MTB8MjB8MzB8MzEpXFxkezN9WzAtOVh4XSQvLCAvLyAxOOS9jVxyXG4gICAgfVxyXG4gICAgYXN5bmMgb25Mb2FkICgpIHtcclxuICAgICAgICBhd2FpdCBzbGVlcCgpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdvbkxvYWQnKTtcclxuICAgIH1cclxuICAgIC8vIOi+k+WFpeahhuaVsOaNrlxyXG4gICAgc2V0VGV4dCAoZSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGUpO1xyXG4gICAgICAgIGNvbnN0IHsgbmFtZSB9ID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQ7XHJcbiAgICAgICAgY29uc3Qgb2JqID0ge307XHJcbiAgICAgICAgb2JqW25hbWVdID0gZS5kZXRhaWwudmFsdWU7XHJcbiAgICAgICAgdGhpcy5mb3JtID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5mb3JtLCBvYmopO1xyXG4gICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICB9XHJcbiAgICAvLyDlkb3lkI3nsbvlnotcclxuICAgIHNlbGVjdFdlY2hhdE5hbWVUeXBlIChlKSB7XHJcbiAgICAgICAgY29uc3QgeyBpdGVtIH0gPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldDtcclxuICAgICAgICB0aGlzLmZvcm0gPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmZvcm0sIHtcclxuICAgICAgICAgICAgd2VjaGF0TmFtZVR5cGU6IGl0ZW0udHlwZSxcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgfVxyXG4gICAgZGVsQXV0aFBhcGVyIChlKSB7XHJcbiAgICAgICAgY29uc3QgeyBrZXkgfSA9IGUudGFyZ2V0LmRhdGFzZXQ7XHJcbiAgICAgICAgY29uc3Qgb2JqID0ge307XHJcbiAgICAgICAgb2JqW2tleV0gPSAnJztcclxuICAgICAgICB0aGlzLmZvcm0gPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmZvcm0sIG9iaik7XHJcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgIH1cclxuICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgICAgdXBsb2FkRm4gKGtleSwgc3JjKSB7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGtleSwgc3JjKTtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYHBhcmVudCByZWNlaXZlZCBlbWl0IGV2ZW50LCBudW1iZXIgaXM6JHtzcmN9YCwgYGtleSR7a2V5fWApO1xyXG4gICAgICAgICAgICBjb25zdCBvYmogPSB7fTtcclxuICAgICAgICAgICAgb2JqW2tleV0gPSBzcmM7XHJcbiAgICAgICAgICAgIHRoaXMuZm9ybSA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuZm9ybSwgb2JqKTtcclxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICB9LFxyXG4gICAgfVxyXG4gICAgYXN5bmMgcmVnaXN0U3VjY2VzcyAoKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3Qge1xyXG4gICAgICAgICAgICAgICAgbWFuYWdlcixcclxuICAgICAgICAgICAgICAgIG1hbmFnZXJJZCxcclxuICAgICAgICAgICAgICAgIG1hbmFnZXJUZWwsXHJcbiAgICAgICAgICAgICAgICB3ZWNoYXROYW1lLFxyXG4gICAgICAgICAgICAgICAgd2VjaGF0TmFtZVR5cGUsXHJcbiAgICAgICAgICAgICAgICB3ZWNoYXRCcmFuZFJlZ2lzdCxcclxuICAgICAgICAgICAgfSA9IHRoaXMuZm9ybTtcclxuICAgICAgICAgICAgY29uc3Qge1xyXG4gICAgICAgICAgICAgICAgcmVnVGVsLFxyXG4gICAgICAgICAgICAgICAgcmVnaURDYXJkMSxcclxuICAgICAgICAgICAgICAgIHJlZ2lEQ2FyZDIsXHJcbiAgICAgICAgICAgIH0gPSB0aGlzO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmZvcm0pO1xyXG4gICAgICAgICAgICBpZiAobWFuYWdlci5sZW5ndGggPT09IDAgfHxcclxuICAgICAgICAgICAgICAgIG1hbmFnZXJJZC5sZW5ndGggPT09IDAgfHxcclxuICAgICAgICAgICAgICAgIG1hbmFnZXJUZWwubGVuZ3RoID09PSAwIHx8XHJcbiAgICAgICAgICAgICAgICB3ZWNoYXROYW1lLmxlbmd0aCA9PT0gMCB8fFxyXG4gICAgICAgICAgICAgICAgd2VjaGF0TmFtZVR5cGUubGVuZ3RoID09PSAwIHx8XHJcbiAgICAgICAgICAgICAgICB3ZWNoYXRCcmFuZFJlZ2lzdC5sZW5ndGggPT09IDBcclxuICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICBhbGVydCgn6K+35a6M5ZaE566h55CG5ZGY5L+h5oGv77yBJyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIXJlZ2lEQ2FyZDEudGVzdChtYW5hZ2VySWQpICYmICFyZWdpRENhcmQyLnRlc3QobWFuYWdlcklkKSkge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoJ+ivt+Whq+WGmeato+ehrui6q+S7veivgeWPt+egge+8gScpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKCFyZWdUZWwudGVzdChtYW5hZ2VyVGVsKSkge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoJ+ivt+Whq+WGmeato+ehrueahOeUteivneWPt+egge+8gScpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IHJlZ2lzdEZvcm0gPSB3ZXB5LmdldFN0b3JhZ2VTeW5jKCdyZWdpc3RGb3JtJyk7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlZ2lzdE1hcHBpZCA9IHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ3JlZ2lzdE1hcHBpZCcpO1xyXG4gICAgICAgICAgICBjb25zdCBkYXRhID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5mb3JtLCByZWdpc3RGb3JtKTtcclxuICAgICAgICAgICAgY29uc3QgdXJsID0gYC9kYXRhL3JlZ2lzdEluZm8vJHtyZWdpc3RNYXBwaWR9YDtcclxuICAgICAgICAgICAgYXdhaXQgcG9zdCh1cmwsIGRhdGEpO1xyXG4gICAgICAgICAgICBhd2FpdCBzbGVlcCgpO1xyXG4gICAgICAgICAgICB3ZXB5LnJlbW92ZVN0b3JhZ2UoJ3JlZ2lzdEZvcm0nKTtcclxuICAgICAgICAgICAgd2VweS5yZW1vdmVTdG9yYWdlKCdyZWdpc3RNYXBwaWQnKTtcclxuICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgICAgIHVybDogJy4vcmVnaXN0U3VjY2VzcycsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==