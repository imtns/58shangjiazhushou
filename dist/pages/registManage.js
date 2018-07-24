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

                                if (!(manager.length === 0 || managerId.length === 0 || managerTel.length === 0 || wechatName.length === 0 || wechatNameType.length === 0)) {
                                    _context2.next = 9;
                                    break;
                                }

                                (0, _utils.alert)('请完善管理员信息！');
                                return _context2.abrupt('return');

                            case 9:
                                if (!(wechatNameType === '1' && wechatBrandRegist.length === 0)) {
                                    _context2.next = 14;
                                    break;
                                }

                                (0, _utils.alert)('请完善管理员信息！');
                                return _context2.abrupt('return');

                            case 14:
                                if (!(!regiDCard1.test(managerId) && !regiDCard2.test(managerId))) {
                                    _context2.next = 19;
                                    break;
                                }

                                (0, _utils.alert)('请填写正确身份证号码！');
                                return _context2.abrupt('return');

                            case 19:
                                if (regTel.test(managerTel)) {
                                    _context2.next = 22;
                                    break;
                                }

                                (0, _utils.alert)('请填写正确的电话号码！');
                                return _context2.abrupt('return');

                            case 22:
                                registForm = _wepy2.default.getStorageSync('registForm');
                                registMappid = _wepy2.default.getStorageSync('registMappid');
                                data = Object.assign({}, this.form, registForm);
                                url = '/data/registInfo/' + registMappid;
                                _context2.next = 28;
                                return (0, _ajax.post)(url, data);

                            case 28:
                                _context2.next = 30;
                                return (0, _utils.sleep)();

                            case 30:
                                _wepy2.default.removeStorage('registForm');
                                _wepy2.default.removeStorage('registMappid');
                                _wepy2.default.navigateTo({
                                    url: './registSuccess'
                                });
                                _context2.next = 38;
                                break;

                            case 35:
                                _context2.prev = 35;
                                _context2.t0 = _context2['catch'](0);

                                console.log(_context2.t0);

                            case 38:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this, [[0, 35]]);
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlZ2lzdE1hbmFnZS5qcyJdLCJuYW1lcyI6WyJSZWdpc3RNYW5hZ2UiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiUmVtaW5kQmFyIiwiVXBsb2FkZXJDb20iLCJhbm90aGVyVXBsb2FkZXJDb20iLCJkYXRhIiwiY3VycmVudHN0ZXAiLCJ3ZWNoYXROYW1lVHlwZSIsInR5cGUiLCJuYW1lIiwiZm9ybSIsIm1hbmFnZXIiLCJtYW5hZ2VySWQiLCJtYW5hZ2VyVGVsIiwid2VjaGF0TmFtZSIsIndlY2hhdEJyYW5kUmVnaXN0Iiwid2VjaGF0QnJhbmRBdXRoIiwicmVnVGVsIiwicmVnaURDYXJkMSIsInJlZ2lEQ2FyZDIiLCJtZXRob2RzIiwidXBsb2FkRm4iLCJrZXkiLCJzcmMiLCJvYmoiLCJPYmplY3QiLCJhc3NpZ24iLCIkYXBwbHkiLCJjb25zb2xlIiwibG9nIiwiZSIsImN1cnJlbnRUYXJnZXQiLCJkYXRhc2V0IiwiZGV0YWlsIiwidmFsdWUiLCJpdGVtIiwidGFyZ2V0IiwibGVuZ3RoIiwidGVzdCIsInJlZ2lzdEZvcm0iLCJ3ZXB5IiwiZ2V0U3RvcmFnZVN5bmMiLCJyZWdpc3RNYXBwaWQiLCJ1cmwiLCJyZW1vdmVTdG9yYWdlIiwibmF2aWdhdGVUbyIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQ0E7Ozs7QUFFQTs7QUFFQTs7QUFFQTs7OztBQUVBOzs7Ozs7Ozs7Ozs7OztJQUVxQkEsWTs7Ozs7Ozs7Ozs7Ozs7c01BQ2pCQyxNLEdBQVM7QUFDTEMsb0NBQXdCO0FBRG5CLFMsUUFHVkMsTyxHQUFVLEUsUUFDYkMsTSxHQUFTLEVBQUMsYUFBWSxFQUFDLGdCQUFlLEVBQWhCLEVBQW1CLDJCQUEwQixhQUE3QyxFQUFiLEVBQXlFLGVBQWMsRUFBQyxjQUFhLEVBQWQsRUFBaUIsU0FBUSxtQkFBekIsRUFBdkYsRUFBcUksc0JBQXFCLEVBQUMsU0FB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TWFuYWdlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcblxuaW1wb3J0IHsgc2xlZXAsIGFsZXJ0IH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5pbXBvcnQgeyBwb3N0IH0gZnJvbSAnLi4vdXRpbHMvYWpheCc7XG5cbmltcG9ydCBSZW1pbmRCYXIgZnJvbSAnLi4vY29tcG9uZW50cy9SZW1pbmRCYXInO1xuXG5pbXBvcnQgVXBsb2FkZXJDb20gZnJvbSAnLi4vY29tcG9uZW50cy9VcGxvYWRlckNvbSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlZ2lzdE1hbmFnZSBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5rOo5YaMJyxcbiAgICB9XG4gICAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcIlJlbWluZEJhclwiOntcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6Y3VycmVudHN0ZXAub25jZVwiOlwiY3VycmVudHN0ZXBcIn0sXCJVcGxvYWRlckNvbVwiOntcInhtbG5zOnYtb25cIjpcIlwiLFwidGl0bGVcIjpcIndlY2hhdEJyYW5kUmVnaXN0XCJ9LFwiYW5vdGhlclVwbG9hZGVyQ29tXCI6e1widGl0bGVcIjpcIndlY2hhdEJyYW5kQXV0aFwifX07XHJcbiRldmVudHMgPSB7XCJVcGxvYWRlckNvbVwiOntcInYtb246Y2hpbGRGblwiOlwidXBsb2FkRm5cIn0sXCJhbm90aGVyVXBsb2FkZXJDb21cIjp7XCJ2LW9uOmNoaWxkRm5cIjpcInVwbG9hZEZuXCJ9fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgICAgIFJlbWluZEJhcixcbiAgICAgICAgVXBsb2FkZXJDb206IFVwbG9hZGVyQ29tLFxuICAgICAgICBhbm90aGVyVXBsb2FkZXJDb206IFVwbG9hZGVyQ29tLFxuICAgIH1cbiAgICBkYXRhID0ge1xuICAgICAgICBjdXJyZW50c3RlcDogJzInLFxuICAgICAgICB3ZWNoYXROYW1lVHlwZTogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHR5cGU6ICcxJyxcbiAgICAgICAgICAgICAgICBuYW1lOiAn5Z+65LqO5ZWG5qCHJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdHlwZTogJzInLFxuICAgICAgICAgICAgICAgIG5hbWU6ICfln7rkuo7lqpLkvZMnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnMycsXG4gICAgICAgICAgICAgICAgbmFtZTogJ+WfuuS6juiHqumAiScsXG4gICAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgICBmb3JtOiB7XG4gICAgICAgICAgICBtYW5hZ2VyOiAnJywgLy8g566h55CG5ZGY5aeT5ZCNXG4gICAgICAgICAgICBtYW5hZ2VySWQ6ICcnLCAvLyDouqvku73or4Hlj7fnoIFcbiAgICAgICAgICAgIG1hbmFnZXJUZWw6ICcnLCAvLyDnlLXor51cbiAgICAgICAgICAgIHdlY2hhdE5hbWU6ICcnLCAvLyDlsI/nqIvluo/lkb3lkI1cbiAgICAgICAgICAgIHdlY2hhdE5hbWVUeXBlOiAnJywgLy8g5ZG95ZCN57G75Z6LXG4gICAgICAgICAgICB3ZWNoYXRCcmFuZFJlZ2lzdDogJycsIC8vIOWVhuagh+azqOWGjOivge+8iOS4iuS8oClcbiAgICAgICAgICAgIHdlY2hhdEJyYW5kQXV0aDogJycsIC8vIOWVhuagh+aOiOadg+S5pu+8iOS4iuS8oO+8jOmAieWhq++8iVxuICAgICAgICB9LFxuICAgICAgICByZWdUZWw6IC9eWzFdWzM0NTY3ODldWzAtOV17OX0kLyxcbiAgICAgICAgcmVnaURDYXJkMTogL15bMS05XVxcZHs1fVxcZHsyfSgoMFsxLTldKXwoMTB8MTF8MTIpKSgoWzAtMl1bMS05XSl8MTB8MjB8MzB8MzEpXFxkezJ9WzAtOVh4XSQvLCAvLyAxNeS9jVxuICAgICAgICByZWdpRENhcmQyOiAvXlsxLTldXFxkezV9KDE4fDE5fChbMjNdXFxkKSlcXGR7Mn0oKDBbMS05XSl8KDEwfDExfDEyKSkoKFswLTJdWzEtOV0pfDEwfDIwfDMwfDMxKVxcZHszfVswLTlYeF0kLywgLy8gMTjkvY1cbiAgICB9XG4gICAgYXN5bmMgb25Mb2FkICgpIHtcbiAgICAgICAgYXdhaXQgc2xlZXAoKTtcbiAgICAgICAgY29uc29sZS5sb2coJ29uTG9hZCcpO1xuICAgIH1cbiAgICAvLyDovpPlhaXmoYbmlbDmja5cbiAgICBzZXRUZXh0IChlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgICBjb25zdCB7IG5hbWUgfSA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0O1xuICAgICAgICBjb25zdCBvYmogPSB7fTtcbiAgICAgICAgb2JqW25hbWVdID0gZS5kZXRhaWwudmFsdWU7XG4gICAgICAgIHRoaXMuZm9ybSA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuZm9ybSwgb2JqKTtcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICB9XG4gICAgLy8g5ZG95ZCN57G75Z6LXG4gICAgc2VsZWN0V2VjaGF0TmFtZVR5cGUgKGUpIHtcbiAgICAgICAgY29uc3QgeyBpdGVtIH0gPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldDtcbiAgICAgICAgdGhpcy5mb3JtID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5mb3JtLCB7XG4gICAgICAgICAgICB3ZWNoYXROYW1lVHlwZTogaXRlbS50eXBlLFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICB9XG4gICAgZGVsQXV0aFBhcGVyIChlKSB7XG4gICAgICAgIGNvbnN0IHsga2V5IH0gPSBlLnRhcmdldC5kYXRhc2V0O1xuICAgICAgICBjb25zdCBvYmogPSB7fTtcbiAgICAgICAgb2JqW2tleV0gPSAnJztcbiAgICAgICAgdGhpcy5mb3JtID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5mb3JtLCBvYmopO1xuICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgICAgICB1cGxvYWRGbiAoa2V5LCBzcmMpIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGtleSwgc3JjKTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGBwYXJlbnQgcmVjZWl2ZWQgZW1pdCBldmVudCwgbnVtYmVyIGlzOiR7c3JjfWAsIGBrZXkke2tleX1gKTtcbiAgICAgICAgICAgIGNvbnN0IG9iaiA9IHt9O1xuICAgICAgICAgICAgb2JqW2tleV0gPSBzcmM7XG4gICAgICAgICAgICB0aGlzLmZvcm0gPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmZvcm0sIG9iaik7XG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgICB9LFxuICAgIH1cbiAgICBhc3luYyByZWdpc3RTdWNjZXNzICgpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgICAgICBtYW5hZ2VyLFxuICAgICAgICAgICAgICAgIG1hbmFnZXJJZCxcbiAgICAgICAgICAgICAgICBtYW5hZ2VyVGVsLFxuICAgICAgICAgICAgICAgIHdlY2hhdE5hbWUsXG4gICAgICAgICAgICAgICAgd2VjaGF0TmFtZVR5cGUsXG4gICAgICAgICAgICAgICAgd2VjaGF0QnJhbmRSZWdpc3QsXG4gICAgICAgICAgICB9ID0gdGhpcy5mb3JtO1xuICAgICAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgICAgIHJlZ1RlbCxcbiAgICAgICAgICAgICAgICByZWdpRENhcmQxLFxuICAgICAgICAgICAgICAgIHJlZ2lEQ2FyZDIsXG4gICAgICAgICAgICB9ID0gdGhpcztcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZm9ybSk7XG4gICAgICAgICAgICBpZiAobWFuYWdlci5sZW5ndGggPT09IDAgfHxcbiAgICAgICAgICAgICAgICBtYW5hZ2VySWQubGVuZ3RoID09PSAwIHx8XG4gICAgICAgICAgICAgICAgbWFuYWdlclRlbC5sZW5ndGggPT09IDAgfHxcbiAgICAgICAgICAgICAgICB3ZWNoYXROYW1lLmxlbmd0aCA9PT0gMCB8fFxuICAgICAgICAgICAgICAgIHdlY2hhdE5hbWVUeXBlLmxlbmd0aCA9PT0gMFxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgYWxlcnQoJ+ivt+WujOWWhOeuoeeQhuWRmOS/oeaBr++8gScpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAvLyDln7rkuo7llYbmoIfvvIzmiY3moKHpqozllYbmoIfms6jlhoxcbiAgICAgICAgICAgIH0gZWxzZSBpZiAod2VjaGF0TmFtZVR5cGUgPT09ICcxJyAmJiB3ZWNoYXRCcmFuZFJlZ2lzdC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICBhbGVydCgn6K+35a6M5ZaE566h55CG5ZGY5L+h5oGv77yBJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfSBlbHNlIGlmICghcmVnaURDYXJkMS50ZXN0KG1hbmFnZXJJZCkgJiYgIXJlZ2lEQ2FyZDIudGVzdChtYW5hZ2VySWQpKSB7XG4gICAgICAgICAgICAgICAgYWxlcnQoJ+ivt+Whq+WGmeato+ehrui6q+S7veivgeWPt+egge+8gScpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIXJlZ1RlbC50ZXN0KG1hbmFnZXJUZWwpKSB7XG4gICAgICAgICAgICAgICAgYWxlcnQoJ+ivt+Whq+WGmeato+ehrueahOeUteivneWPt+egge+8gScpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHJlZ2lzdEZvcm0gPSB3ZXB5LmdldFN0b3JhZ2VTeW5jKCdyZWdpc3RGb3JtJyk7XG4gICAgICAgICAgICBjb25zdCByZWdpc3RNYXBwaWQgPSB3ZXB5LmdldFN0b3JhZ2VTeW5jKCdyZWdpc3RNYXBwaWQnKTtcbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmZvcm0sIHJlZ2lzdEZvcm0pO1xuICAgICAgICAgICAgY29uc3QgdXJsID0gYC9kYXRhL3JlZ2lzdEluZm8vJHtyZWdpc3RNYXBwaWR9YDtcbiAgICAgICAgICAgIGF3YWl0IHBvc3QodXJsLCBkYXRhKTtcbiAgICAgICAgICAgIGF3YWl0IHNsZWVwKCk7XG4gICAgICAgICAgICB3ZXB5LnJlbW92ZVN0b3JhZ2UoJ3JlZ2lzdEZvcm0nKTtcbiAgICAgICAgICAgIHdlcHkucmVtb3ZlU3RvcmFnZSgncmVnaXN0TWFwcGlkJyk7XG4gICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgICAgIHVybDogJy4vcmVnaXN0U3VjY2VzcycsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=