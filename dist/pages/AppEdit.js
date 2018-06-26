'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _utils = require('./../utils/index.js');

var _ajaxP = require('./../utils/ajaxP.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var host = 'https://yaofa.58.com';
var uploadApi = host + '/fileUpload';
var provinceApi = '/local/provinces';
var cityApi = '/local/citys/';
var appinfoApi = '/mplogic/get';
var saveAppApi = '/mplogic/modifympinfo';

var AppEdit = function (_wepy$page) {
    _inherits(AppEdit, _wepy$page);

    function AppEdit() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, AppEdit);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = AppEdit.__proto__ || Object.getPrototypeOf(AppEdit)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            disableScroll: true,
            navigationBarTitleText: '小程序编辑'
        }, _this.data = {
            logoUrl: '',
            loading: true,
            mpid: '',
            areas: [[], []],
            selCityIndex: [0, 0],
            markerId: 0,
            form: {
                city: '1',
                province: '5001'
            },
            tempLogo: ''
        }, _this.computed = {
            enableSave: function enableSave() {
                return !!(this.form.nickName && this.form.headImg && this.form.telphone && this.form.city && this.form.address);
            },
            markers: function markers() {
                var markerId = this.markerId + 1;
                return [{
                    iconPath: '/pages/assets/marker.png',
                    id: markerId,
                    latitude: this.form.addressLatitude || '',
                    longitude: this.form.addressLongitude || '',
                    width: 22,
                    height: 32
                }];
            },
            longitude: function longitude() {
                return this.form.addressLongitude;
            },
            latitude: function latitude() {
                return this.form.addressLatitude;
            }
        }, _this.methods = {
            bindCity: function () {
                var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(e) {
                    var _e$detail, column, value, dispLocalID, _ref3, _ref4, err, data;

                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    _e$detail = e.detail, column = _e$detail.column, value = _e$detail.value;

                                    if (!(column === 1)) {
                                        _context.next = 3;
                                        break;
                                    }

                                    return _context.abrupt('return');

                                case 3:
                                    dispLocalID = this.areas[0][value].dispLocalID;
                                    _context.next = 6;
                                    return (0, _ajaxP.get)(cityApi + dispLocalID);

                                case 6:
                                    _ref3 = _context.sent;
                                    _ref4 = _slicedToArray(_ref3, 2);
                                    err = _ref4[0];
                                    data = _ref4[1];

                                    if (!err) {
                                        _context.next = 13;
                                        break;
                                    }

                                    this.toast(err);
                                    return _context.abrupt('return');

                                case 13:
                                    this.areas = [this.areas[0], data];
                                    this.$apply();

                                case 15:
                                case 'end':
                                    return _context.stop();
                            }
                        }
                    }, _callee, this);
                }));

                function bindCity(_x) {
                    return _ref2.apply(this, arguments);
                }

                return bindCity;
            }(),
            setCity: function setCity(e) {
                var arr = e.detail.value;
                var cityIdx = arr[1] && 0;
                var province = this.areas[0][arr[0]];
                var city = this.areas[1][cityIdx];
                this.selCity = [province.localName, city.localName];
                this.updateForm({
                    province: province.dispLocalID,
                    provinceName: province.localName,
                    city: city.dispLocalID,
                    cityName: city.localName
                });
            },
            setLogo: function () {
                var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                    var _ref6, tempFilePaths, filePath, response, res, state, msg, data, errMsg;

                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                        while (1) {
                            switch (_context2.prev = _context2.next) {
                                case 0:
                                    _context2.next = 2;
                                    return _wepy2.default.chooseImage({
                                        count: 1,
                                        sizeType: 'compressed '
                                    });

                                case 2:
                                    _ref6 = _context2.sent;
                                    tempFilePaths = _ref6.tempFilePaths;
                                    filePath = tempFilePaths[0];

                                    console.log({ filePath: filePath });
                                    _context2.prev = 6;
                                    _context2.next = 9;
                                    return _wepy2.default.uploadFile({
                                        url: uploadApi,
                                        filePath: filePath,
                                        name: 'content'
                                    });

                                case 9:
                                    response = _context2.sent;
                                    res = JSON.parse(response.data);
                                    state = res.state, msg = res.msg, data = res.data;

                                    if (state === 100) {
                                        this.tempLogo = filePath;
                                        this.updateForm({ headImg: data.content });
                                    } else {
                                        this.toast(msg);
                                    }
                                    _context2.next = 19;
                                    break;

                                case 15:
                                    _context2.prev = 15;
                                    _context2.t0 = _context2['catch'](6);
                                    errMsg = _context2.t0.errMsg;

                                    this.toast(errMsg);

                                case 19:
                                case 'end':
                                    return _context2.stop();
                            }
                        }
                    }, _callee2, this, [[6, 15]]);
                }));

                function setLogo() {
                    return _ref5.apply(this, arguments);
                }

                return setLogo;
            }(),
            setAppName: function setAppName(e) {
                var nickName = e.detail.value;
                nickName = (0, _utils.filteremoji)(nickName);
                this.updateForm({ nickName: nickName });
                return {
                    value: nickName
                };
            },
            setMobile: function setMobile(e) {
                var telphone = e.detail.value;
                this.updateForm({ telphone: telphone });
            },
            setLocation: function () {
                var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
                    var _ref9, address, latitude, longitude;

                    return regeneratorRuntime.wrap(function _callee3$(_context3) {
                        while (1) {
                            switch (_context3.prev = _context3.next) {
                                case 0:
                                    _context3.next = 2;
                                    return _wepy2.default.chooseLocation();

                                case 2:
                                    _ref9 = _context3.sent;
                                    address = _ref9.address;
                                    latitude = _ref9.latitude;
                                    longitude = _ref9.longitude;

                                    this.updateForm({ address: address, addressLatitude: latitude, addressLongitude: longitude });

                                case 7:
                                case 'end':
                                    return _context3.stop();
                            }
                        }
                    }, _callee3, this);
                }));

                function setLocation() {
                    return _ref8.apply(this, arguments);
                }

                return setLocation;
            }(),
            setDetailAdress: function setDetailAdress(e) {
                var address = e.detail.value;
                address = (0, _utils.filteremoji)(address);
                this.updateForm({ address: address });
                return {
                    value: address
                };
            },
            bindSave: function () {
                var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
                    var form, verify, sendData, _ref11, _ref12, e, res;

                    return regeneratorRuntime.wrap(function _callee4$(_context4) {
                        while (1) {
                            switch (_context4.prev = _context4.next) {
                                case 0:
                                    form = this.data.form;
                                    _context4.next = 3;
                                    return this.verify();

                                case 3:
                                    verify = _context4.sent;

                                    if (verify) {
                                        _context4.next = 6;
                                        break;
                                    }

                                    return _context4.abrupt('return');

                                case 6:
                                    sendData = {
                                        mpid: this.mpid, // 小程序id
                                        logo: form.headImg, // 小程序logo 只有优享小程序能改
                                        telphone: form.telphone, // 电话
                                        mpname: form.nickName, // 小程序名称 只有优享小程序能改
                                        privince: form.province,
                                        city: form.city, // 城市
                                        address: form.address, // 地址
                                        lat: form.addressLatitude, // 纬度
                                        lnt: form.addressLongitude // 经度
                                    };

                                    console.log(sendData);
                                    _context4.next = 10;
                                    return (0, _ajaxP.get)(saveAppApi, sendData);

                                case 10:
                                    _ref11 = _context4.sent;
                                    _ref12 = _slicedToArray(_ref11, 2);
                                    e = _ref12[0];
                                    res = _ref12[1];

                                    if (e) {
                                        this.toast(res.msg);
                                    } else {
                                        console.log(res);
                                        _wepy2.default.navigateBack();
                                    }

                                case 15:
                                case 'end':
                                    return _context4.stop();
                            }
                        }
                    }, _callee4, this);
                }));

                function bindSave() {
                    return _ref10.apply(this, arguments);
                }

                return bindSave;
            }()
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(AppEdit, [{
        key: 'defaultSelCityIndex',
        value: function defaultSelCityIndex() {
            var _form = this.form,
                city = _form.city,
                province = _form.province;

            var pIndex = 0;
            var cIndex = 0;
            var item = void 0;
            if (province) {
                for (var i = 0, len = this.areas[0].length; i < len; i += 1) {
                    item = this.areas[0][i];
                    if (item.dispLocalID === province) {
                        pIndex = i;
                        break;
                    }
                }
            }
            if (city) {
                for (var _i = 0, _len2 = this.areas[1].length; _i < _len2; _i += 1) {
                    item = this.areas[1][_i];
                    if (item.dispLocalID === province) {
                        cIndex = _i;
                        break;
                    }
                }
            }
            this.selCityIndex = [pIndex, cIndex];
            this.updateForm({
                city: this.areas[1][cIndex].dispLocalID,
                cityName: this.areas[1][cIndex].localName,
                province: this.areas[0][pIndex].dispLocalID,
                provinceName: this.areas[0][pIndex].localName
            });
        }
    }, {
        key: 'updateForm',
        value: function updateForm(data) {
            var res = data;
            var form = this.data.form;
            // 头像

            if (res.headImg === '' || res.headImg) {
                var _res$headImg = res.headImg,
                    headImg = _res$headImg === undefined ? 'https://pic8.58cdn.com.cn/bizmp/n_v285d6a16d725a446694db35df23c9db24.png?w=72&h=72' : _res$headImg;

                headImg = this.tempLogo || headImg;
                if (headImg.indexOf('http') < 0 && headImg.indexOf('file:') < 0) {
                    headImg = (0, _utils.picSrcDomain)() + headImg + '?w=72&h=72';
                }
                this.logoUrl = headImg;
            }
            // 经纬度，过滤空赋值
            if (res.addressLatitude !== undefined && res.addressLatitude === '') {
                delete res.addressLatitude;
                delete res.addressLongitude;
            }
            this.form = Object.assign({}, form, _extends({}, res));
            this.$apply();
        }
    }, {
        key: 'getProvinces',
        value: function () {
            var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
                var _ref14, _ref15, e1, data1, province, _ref16, _ref17, e2, data2;

                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                _context5.next = 2;
                                return (0, _ajaxP.get)(provinceApi);

                            case 2:
                                _ref14 = _context5.sent;
                                _ref15 = _slicedToArray(_ref14, 2);
                                e1 = _ref15[0];
                                data1 = _ref15[1];

                                if (!e1) {
                                    _context5.next = 9;
                                    break;
                                }

                                this.toast(e1);
                                return _context5.abrupt('return');

                            case 9:
                                province = this.form.province || '5001';
                                _context5.next = 12;
                                return (0, _ajaxP.get)(cityApi + province);

                            case 12:
                                _ref16 = _context5.sent;
                                _ref17 = _slicedToArray(_ref16, 2);
                                e2 = _ref17[0];
                                data2 = _ref17[1];

                                if (!e2) {
                                    _context5.next = 19;
                                    break;
                                }

                                this.toast(e2);
                                return _context5.abrupt('return');

                            case 19:
                                console.log('provinces', data1, 'citys', data2);
                                this.areas = [data1, data2];
                                this.loading = false;
                                this.$apply();

                            case 23:
                            case 'end':
                                return _context5.stop();
                        }
                    }
                }, _callee5, this);
            }));

            function getProvinces() {
                return _ref13.apply(this, arguments);
            }

            return getProvinces;
        }()
    }, {
        key: 'getLocation',
        value: function () {
            var _ref18 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
                var _ref19, latitude, longitude;

                return regeneratorRuntime.wrap(function _callee6$(_context6) {
                    while (1) {
                        switch (_context6.prev = _context6.next) {
                            case 0:
                                _context6.next = 2;
                                return _wepy2.default.getLocation({ type: 'wgs84' });

                            case 2:
                                _ref19 = _context6.sent;
                                latitude = _ref19.latitude;
                                longitude = _ref19.longitude;

                                if (!this.form.addressLatitude) {
                                    _context6.next = 7;
                                    break;
                                }

                                return _context6.abrupt('return');

                            case 7:
                                this.updateForm({ addressLatitude: latitude, addressLongitude: longitude });

                            case 8:
                            case 'end':
                                return _context6.stop();
                        }
                    }
                }, _callee6, this);
            }));

            function getLocation() {
                return _ref18.apply(this, arguments);
            }

            return getLocation;
        }()
    }, {
        key: 'getAppInfo',
        value: function () {
            var _ref20 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(mpid) {
                var _ref21, _ref22, e, data;

                return regeneratorRuntime.wrap(function _callee7$(_context7) {
                    while (1) {
                        switch (_context7.prev = _context7.next) {
                            case 0:
                                _context7.next = 2;
                                return (0, _ajaxP.get)(appinfoApi + '/' + mpid);

                            case 2:
                                _ref21 = _context7.sent;
                                _ref22 = _slicedToArray(_ref21, 2);
                                e = _ref22[0];
                                data = _ref22[1];

                                if (!e) {
                                    _context7.next = 9;
                                    break;
                                }

                                this.toast(e);
                                return _context7.abrupt('return');

                            case 9:
                                this.updateForm(_extends({}, data));

                            case 10:
                            case 'end':
                                return _context7.stop();
                        }
                    }
                }, _callee7, this);
            }));

            function getAppInfo(_x2) {
                return _ref20.apply(this, arguments);
            }

            return getAppInfo;
        }()
    }, {
        key: 'toast',
        value: function toast() {
            for (var _len3 = arguments.length, params = Array(_len3), _key2 = 0; _key2 < _len3; _key2++) {
                params[_key2] = arguments[_key2];
            }

            var title = params[0],
                _params$ = params[1],
                duration = _params$ === undefined ? 2000 : _params$;

            return _wepy2.default.showToast({
                title: title,
                icon: 'none',
                duration: duration
            });
        }
    }, {
        key: 'verify',
        value: function () {
            var _ref23 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
                var regPhone, form;
                return regeneratorRuntime.wrap(function _callee8$(_context8) {
                    while (1) {
                        switch (_context8.prev = _context8.next) {
                            case 0:
                                regPhone = /^1[3456789][0-9]{9}$/;
                                form = this.data.form;

                                if (form.headImg) {
                                    _context8.next = 5;
                                    break;
                                }

                                this.toast('请完善信息');
                                return _context8.abrupt('return', false);

                            case 5:
                                if (form.nickName) {
                                    _context8.next = 8;
                                    break;
                                }

                                this.toast('输入小程序名称');
                                return _context8.abrupt('return', false);

                            case 8:
                                if (!(form.nickName.length < 4)) {
                                    _context8.next = 11;
                                    break;
                                }

                                this.toast('小程序名称不得小于4个');
                                return _context8.abrupt('return', false);

                            case 11:
                                if (form.telphone) {
                                    _context8.next = 14;
                                    break;
                                }

                                this.toast('输入联系电话');
                                return _context8.abrupt('return', false);

                            case 14:
                                if (!(form.telphone.length < 11 && !regPhone.test(form.telphone))) {
                                    _context8.next = 18;
                                    break;
                                }

                                _context8.next = 17;
                                return (0, _utils.toastSync)('手机号不正确');

                            case 17:
                                return _context8.abrupt('return', false);

                            case 18:
                                if (form.city) {
                                    _context8.next = 21;
                                    break;
                                }

                                this.toast('选择城市');
                                return _context8.abrupt('return', false);

                            case 21:
                                if (form.address) {
                                    _context8.next = 24;
                                    break;
                                }

                                this.toast('输入详情地址');
                                return _context8.abrupt('return', false);

                            case 24:
                                return _context8.abrupt('return', true);

                            case 25:
                            case 'end':
                                return _context8.stop();
                        }
                    }
                }, _callee8, this);
            }));

            function verify() {
                return _ref23.apply(this, arguments);
            }

            return verify;
        }()
    }, {
        key: 'onLoad',
        value: function () {
            var _ref24 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(options) {
                var mpid;
                return regeneratorRuntime.wrap(function _callee9$(_context9) {
                    while (1) {
                        switch (_context9.prev = _context9.next) {
                            case 0:
                                mpid = options.mpid || _wepy2.default.getStorageSync('current_mpid');

                                if (!mpid) {
                                    _wepy2.default.navigateBack();
                                }
                                this.mpid = mpid;
                                _context9.next = 5;
                                return this.getAppInfo(this.mpid);

                            case 5:
                                _context9.next = 7;
                                return this.getLocation();

                            case 7:
                                _context9.next = 9;
                                return this.getProvinces();

                            case 9:
                                this.defaultSelCityIndex();

                            case 10:
                            case 'end':
                                return _context9.stop();
                        }
                    }
                }, _callee9, this);
            }));

            function onLoad(_x3) {
                return _ref24.apply(this, arguments);
            }

            return onLoad;
        }()
    }]);

    return AppEdit;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(AppEdit , 'pages/AppEdit'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkFwcEVkaXQuanMiXSwibmFtZXMiOlsiaG9zdCIsInVwbG9hZEFwaSIsInByb3ZpbmNlQXBpIiwiY2l0eUFwaSIsImFwcGluZm9BcGkiLCJzYXZlQXBwQXBpIiwiQXBwRWRpdCIsImNvbmZpZyIsImRpc2FibGVTY3JvbGwiLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsImxvZ29VcmwiLCJsb2FkaW5nIiwibXBpZCIsImFyZWFzIiwic2VsQ2l0eUluZGV4IiwibWFya2VySWQiLCJmb3JtIiwiY2l0eSIsInByb3ZpbmNlIiwidGVtcExvZ28iLCJjb21wdXRlZCIsImVuYWJsZVNhdmUiLCJuaWNrTmFtZSIsImhlYWRJbWciLCJ0ZWxwaG9uZSIsImFkZHJlc3MiLCJtYXJrZXJzIiwiaWNvblBhdGgiLCJpZCIsImxhdGl0dWRlIiwiYWRkcmVzc0xhdGl0dWRlIiwibG9uZ2l0dWRlIiwiYWRkcmVzc0xvbmdpdHVkZSIsIndpZHRoIiwiaGVpZ2h0IiwibWV0aG9kcyIsImJpbmRDaXR5IiwiZSIsImRldGFpbCIsImNvbHVtbiIsInZhbHVlIiwiZGlzcExvY2FsSUQiLCJlcnIiLCJ0b2FzdCIsIiRhcHBseSIsInNldENpdHkiLCJhcnIiLCJjaXR5SWR4Iiwic2VsQ2l0eSIsImxvY2FsTmFtZSIsInVwZGF0ZUZvcm0iLCJwcm92aW5jZU5hbWUiLCJjaXR5TmFtZSIsInNldExvZ28iLCJ3ZXB5IiwiY2hvb3NlSW1hZ2UiLCJjb3VudCIsInNpemVUeXBlIiwidGVtcEZpbGVQYXRocyIsImZpbGVQYXRoIiwiY29uc29sZSIsImxvZyIsInVwbG9hZEZpbGUiLCJ1cmwiLCJuYW1lIiwicmVzcG9uc2UiLCJyZXMiLCJKU09OIiwicGFyc2UiLCJzdGF0ZSIsIm1zZyIsImNvbnRlbnQiLCJlcnJNc2ciLCJzZXRBcHBOYW1lIiwic2V0TW9iaWxlIiwic2V0TG9jYXRpb24iLCJjaG9vc2VMb2NhdGlvbiIsInNldERldGFpbEFkcmVzcyIsImJpbmRTYXZlIiwidmVyaWZ5Iiwic2VuZERhdGEiLCJsb2dvIiwibXBuYW1lIiwicHJpdmluY2UiLCJsYXQiLCJsbnQiLCJuYXZpZ2F0ZUJhY2siLCJwSW5kZXgiLCJjSW5kZXgiLCJpdGVtIiwiaSIsImxlbiIsImxlbmd0aCIsImluZGV4T2YiLCJ1bmRlZmluZWQiLCJPYmplY3QiLCJhc3NpZ24iLCJlMSIsImRhdGExIiwiZTIiLCJkYXRhMiIsImdldExvY2F0aW9uIiwidHlwZSIsInBhcmFtcyIsInRpdGxlIiwiZHVyYXRpb24iLCJzaG93VG9hc3QiLCJpY29uIiwicmVnUGhvbmUiLCJ0ZXN0Iiwib3B0aW9ucyIsImdldFN0b3JhZ2VTeW5jIiwiZ2V0QXBwSW5mbyIsImdldFByb3ZpbmNlcyIsImRlZmF1bHRTZWxDaXR5SW5kZXgiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxPQUFPLHNCQUFiO0FBQ0EsSUFBTUMsWUFBZUQsSUFBZixnQkFBTjtBQUNBLElBQU1FLGNBQWMsa0JBQXBCO0FBQ0EsSUFBTUMsVUFBVSxlQUFoQjtBQUNBLElBQU1DLGFBQWEsY0FBbkI7QUFDQSxJQUFNQyxhQUFhLHVCQUFuQjs7SUFFcUJDLE87Ozs7Ozs7Ozs7Ozs7OzRMQUNqQkMsTSxHQUFTO0FBQ0xDLDJCQUFlLElBRFY7QUFFTEMsb0NBQXdCO0FBRm5CLFMsUUFJVEMsSSxHQUFPO0FBQ0hDLHFCQUFTLEVBRE47QUFFSEMscUJBQVMsSUFGTjtBQUdIQyxrQkFBTSxFQUhIO0FBSUhDLG1CQUFPLENBQUMsRUFBRCxFQUFLLEVBQUwsQ0FKSjtBQUtIQywwQkFBYyxDQUFDLENBQUQsRUFBSSxDQUFKLENBTFg7QUFNSEMsc0JBQVUsQ0FOUDtBQU9IQyxrQkFBTTtBQUNGQyxzQkFBTSxHQURKO0FBRUZDLDBCQUFVO0FBRlIsYUFQSDtBQVdIQyxzQkFBVTtBQVhQLFMsUUFhUEMsUSxHQUFXO0FBQ1BDLHNCQURPLHdCQUNPO0FBQ1YsdUJBQU8sQ0FBQyxFQUFFLEtBQUtM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LENBQWNvRSxNQUFkLEdBQXVCLEVBQXZCLElBQTZCLENBQUNnQixTQUFTQyxJQUFULENBQWM3RixLQUFLUSxRQUFuQixDOzs7Ozs7dUNBQ3hCLHNCQUFVLFFBQVYsQzs7O2tFQUNDLEs7OztvQ0FFTlIsS0FBS0MsSTs7Ozs7QUFDTixxQ0FBSzBCLEtBQUwsQ0FBVyxNQUFYO2tFQUNPLEs7OztvQ0FFTjNCLEtBQUtTLE87Ozs7O0FBQ04scUNBQUtrQixLQUFMLENBQVcsUUFBWDtrRUFDTyxLOzs7a0VBRUosSTs7Ozs7Ozs7Ozs7Ozs7Ozs7OzttR0F3R0dtRSxPOzs7Ozs7QUFDSmxHLG9DLEdBQU9rRyxRQUFRbEcsSUFBUixJQUFnQjBDLGVBQUt5RCxjQUFMLENBQW9CLGNBQXBCLEM7O0FBQzdCLG9DQUFJLENBQUNuRyxJQUFMLEVBQVc7QUFDUDBDLG1EQUFLZ0MsWUFBTDtBQUNIO0FBQ0QscUNBQUsxRSxJQUFMLEdBQVlBLElBQVo7O3VDQUNNLEtBQUtvRyxVQUFMLENBQWdCLEtBQUtwRyxJQUFyQixDOzs7O3VDQUNBLEtBQUt5RixXQUFMLEU7Ozs7dUNBQ0EsS0FBS1ksWUFBTCxFOzs7QUFDTixxQ0FBS0MsbUJBQUw7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFwUjZCNUQsZUFBSzZELEk7O2tCQUFyQjlHLE8iLCJmaWxlIjoiQXBwRWRpdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5pbXBvcnQgeyBwaWNTcmNEb21haW4sIGZpbHRlcmVtb2ppLCB0b2FzdFN5bmMgfSBmcm9tICcuLi91dGlscyc7XG5pbXBvcnQgeyBnZXQgfSBmcm9tICcuLi91dGlscy9hamF4UCc7XG5cbmNvbnN0IGhvc3QgPSAnaHR0cHM6Ly95YW9mYS41OC5jb20nO1xuY29uc3QgdXBsb2FkQXBpID0gYCR7aG9zdH0vZmlsZVVwbG9hZGA7XG5jb25zdCBwcm92aW5jZUFwaSA9ICcvbG9jYWwvcHJvdmluY2VzJztcbmNvbnN0IGNpdHlBcGkgPSAnL2xvY2FsL2NpdHlzLyc7XG5jb25zdCBhcHBpbmZvQXBpID0gJy9tcGxvZ2ljL2dldCc7XG5jb25zdCBzYXZlQXBwQXBpID0gJy9tcGxvZ2ljL21vZGlmeW1waW5mbyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFwcEVkaXQgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgICAgZGlzYWJsZVNjcm9sbDogdHJ1ZSxcbiAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+Wwj+eoi+W6j+e8lui+kScsXG4gICAgfVxuICAgIGRhdGEgPSB7XG4gICAgICAgIGxvZ29Vcmw6ICcnLFxuICAgICAgICBsb2FkaW5nOiB0cnVlLFxuICAgICAgICBtcGlkOiAnJyxcbiAgICAgICAgYXJlYXM6IFtbXSwgW11dLFxuICAgICAgICBzZWxDaXR5SW5kZXg6IFswLCAwXSxcbiAgICAgICAgbWFya2VySWQ6IDAsXG4gICAgICAgIGZvcm06IHtcbiAgICAgICAgICAgIGNpdHk6ICcxJyxcbiAgICAgICAgICAgIHByb3ZpbmNlOiAnNTAwMScsXG4gICAgICAgIH0sXG4gICAgICAgIHRlbXBMb2dvOiAnJyxcbiAgICB9XG4gICAgY29tcHV0ZWQgPSB7XG4gICAgICAgIGVuYWJsZVNhdmUgKCkge1xuICAgICAgICAgICAgcmV0dXJuICEhKHRoaXMuZm9ybS5uaWNrTmFtZSAmJiB0aGlzLmZvcm0uaGVhZEltZ1xuICAgICAgICAgICAgICAgICYmIHRoaXMuZm9ybS50ZWxwaG9uZSAmJiB0aGlzLmZvcm0uY2l0eSAmJiB0aGlzLmZvcm0uYWRkcmVzcyk7XG4gICAgICAgIH0sXG4gICAgICAgIG1hcmtlcnMgKCkge1xuICAgICAgICAgICAgY29uc3QgbWFya2VySWQgPSB0aGlzLm1hcmtlcklkICsgMTtcbiAgICAgICAgICAgIHJldHVybiBbe1xuICAgICAgICAgICAgICAgIGljb25QYXRoOiAnL3BhZ2VzL2Fzc2V0cy9tYXJrZXIucG5nJyxcbiAgICAgICAgICAgICAgICBpZDogbWFya2VySWQsXG4gICAgICAgICAgICAgICAgbGF0aXR1ZGU6IHRoaXMuZm9ybS5hZGRyZXNzTGF0aXR1ZGUgfHwgJycsXG4gICAgICAgICAgICAgICAgbG9uZ2l0dWRlOiB0aGlzLmZvcm0uYWRkcmVzc0xvbmdpdHVkZSB8fCAnJyxcbiAgICAgICAgICAgICAgICB3aWR0aDogMjIsXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAzMixcbiAgICAgICAgICAgIH1dO1xuICAgICAgICB9LFxuICAgICAgICBsb25naXR1ZGUgKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZm9ybS5hZGRyZXNzTG9uZ2l0dWRlO1xuICAgICAgICB9LFxuICAgICAgICBsYXRpdHVkZSAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5mb3JtLmFkZHJlc3NMYXRpdHVkZTtcbiAgICAgICAgfSxcbiAgICB9XG5cbiAgICBkZWZhdWx0U2VsQ2l0eUluZGV4ICgpIHtcbiAgICAgICAgY29uc3QgeyBjaXR5LCBwcm92aW5jZSB9ID0gdGhpcy5mb3JtO1xuICAgICAgICBsZXQgcEluZGV4ID0gMDtcbiAgICAgICAgbGV0IGNJbmRleCA9IDA7XG4gICAgICAgIGxldCBpdGVtO1xuICAgICAgICBpZiAocHJvdmluY2UpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSB0aGlzLmFyZWFzWzBdLmxlbmd0aDsgaSA8IGxlbjsgaSArPSAxKSB7XG4gICAgICAgICAgICAgICAgaXRlbSA9IHRoaXMuYXJlYXNbMF1baV07XG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0uZGlzcExvY2FsSUQgPT09IHByb3ZpbmNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHBJbmRleCA9IGk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoY2l0eSkge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHRoaXMuYXJlYXNbMV0ubGVuZ3RoOyBpIDwgbGVuOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgICBpdGVtID0gdGhpcy5hcmVhc1sxXVtpXTtcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5kaXNwTG9jYWxJRCA9PT0gcHJvdmluY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgY0luZGV4ID0gaTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2VsQ2l0eUluZGV4ID0gW3BJbmRleCwgY0luZGV4XTtcbiAgICAgICAgdGhpcy51cGRhdGVGb3JtKHtcbiAgICAgICAgICAgIGNpdHk6IHRoaXMuYXJlYXNbMV1bY0luZGV4XS5kaXNwTG9jYWxJRCxcbiAgICAgICAgICAgIGNpdHlOYW1lOiB0aGlzLmFyZWFzWzFdW2NJbmRleF0ubG9jYWxOYW1lLFxuICAgICAgICAgICAgcHJvdmluY2U6IHRoaXMuYXJlYXNbMF1bcEluZGV4XS5kaXNwTG9jYWxJRCxcbiAgICAgICAgICAgIHByb3ZpbmNlTmFtZTogdGhpcy5hcmVhc1swXVtwSW5kZXhdLmxvY2FsTmFtZSxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdXBkYXRlRm9ybSAoZGF0YSkge1xuICAgICAgICBjb25zdCByZXMgPSBkYXRhO1xuICAgICAgICBjb25zdCB7IGZvcm0gfSA9IHRoaXMuZGF0YTtcbiAgICAgICAgLy8g5aS05YOPXG4gICAgICAgIGlmIChyZXMuaGVhZEltZyA9PT0gJycgfHwgcmVzLmhlYWRJbWcpIHtcbiAgICAgICAgICAgIGxldCB7IGhlYWRJbWcgPSAnaHR0cHM6Ly9waWM4LjU4Y2RuLmNvbS5jbi9iaXptcC9uX3YyODVkNmExNmQ3MjVhNDQ2Njk0ZGIzNWRmMjNjOWRiMjQucG5nP3c9NzImaD03MicgfSA9IHJlcztcbiAgICAgICAgICAgIGhlYWRJbWcgPSB0aGlzLnRlbXBMb2dvIHx8IGhlYWRJbWc7XG4gICAgICAgICAgICBpZiAoaGVhZEltZy5pbmRleE9mKCdodHRwJykgPCAwICYmIGhlYWRJbWcuaW5kZXhPZignZmlsZTonKSA8IDApIHtcbiAgICAgICAgICAgICAgICBoZWFkSW1nID0gYCR7cGljU3JjRG9tYWluKCkgKyBoZWFkSW1nfT93PTcyJmg9NzJgO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5sb2dvVXJsID0gaGVhZEltZztcbiAgICAgICAgfVxuICAgICAgICAvLyDnu4/nuqzluqbvvIzov4fmu6TnqbrotYvlgLxcbiAgICAgICAgaWYgKHJlcy5hZGRyZXNzTGF0aXR1ZGUgIT09IHVuZGVmaW5lZCAmJiByZXMuYWRkcmVzc0xhdGl0dWRlID09PSAnJykge1xuICAgICAgICAgICAgZGVsZXRlIHJlcy5hZGRyZXNzTGF0aXR1ZGU7XG4gICAgICAgICAgICBkZWxldGUgcmVzLmFkZHJlc3NMb25naXR1ZGU7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5mb3JtID0gT2JqZWN0LmFzc2lnbih7fSwgZm9ybSwgeyAuLi5yZXMgfSk7XG4gICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgfVxuICAgIGFzeW5jIGdldFByb3ZpbmNlcyAoKSB7XG4gICAgICAgIGNvbnN0IFtlMSwgZGF0YTFdID0gYXdhaXQgZ2V0KHByb3ZpbmNlQXBpKTtcbiAgICAgICAgaWYgKGUxKSB7XG4gICAgICAgICAgICB0aGlzLnRvYXN0KGUxKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBwcm92aW5jZSA9IHRoaXMuZm9ybS5wcm92aW5jZSB8fCAnNTAwMSc7XG4gICAgICAgIGNvbnN0IFtlMiwgZGF0YTJdID0gYXdhaXQgZ2V0KGNpdHlBcGkgKyBwcm92aW5jZSk7XG4gICAgICAgIGlmIChlMikge1xuICAgICAgICAgICAgdGhpcy50b2FzdChlMik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coJ3Byb3ZpbmNlcycsIGRhdGExLCAnY2l0eXMnLCBkYXRhMik7XG4gICAgICAgIHRoaXMuYXJlYXMgPSBbZGF0YTEsIGRhdGEyXTtcbiAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgfVxuICAgIGFzeW5jIGdldExvY2F0aW9uICgpIHtcbiAgICAgICAgY29uc3QgeyBsYXRpdHVkZSwgbG9uZ2l0dWRlIH0gPSBhd2FpdCB3ZXB5LmdldExvY2F0aW9uKHsgdHlwZTogJ3dnczg0JyB9KTtcbiAgICAgICAgaWYgKHRoaXMuZm9ybS5hZGRyZXNzTGF0aXR1ZGUpIHJldHVybjtcbiAgICAgICAgdGhpcy51cGRhdGVGb3JtKHsgYWRkcmVzc0xhdGl0dWRlOiBsYXRpdHVkZSwgYWRkcmVzc0xvbmdpdHVkZTogbG9uZ2l0dWRlIH0pO1xuICAgIH1cbiAgICBhc3luYyBnZXRBcHBJbmZvIChtcGlkKSB7XG4gICAgICAgIGNvbnN0IFtlLCBkYXRhXSA9IGF3YWl0IGdldChgJHthcHBpbmZvQXBpfS8ke21waWR9YCk7XG4gICAgICAgIGlmIChlKSB7XG4gICAgICAgICAgICB0aGlzLnRvYXN0KGUpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudXBkYXRlRm9ybSh7IC4uLmRhdGEgfSk7XG4gICAgfVxuICAgIHRvYXN0ICguLi5wYXJhbXMpIHtcbiAgICAgICAgY29uc3QgW3RpdGxlLCBkdXJhdGlvbiA9IDIwMDBdID0gcGFyYW1zO1xuICAgICAgICByZXR1cm4gd2VweS5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgdGl0bGUsXG4gICAgICAgICAgICBpY29uOiAnbm9uZScsXG4gICAgICAgICAgICBkdXJhdGlvbixcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGFzeW5jIHZlcmlmeSAoKSB7XG4gICAgICAgIGNvbnN0IHJlZ1Bob25lID0gL14xWzM0NTY3ODldWzAtOV17OX0kLztcbiAgICAgICAgY29uc3QgeyBmb3JtIH0gPSB0aGlzLmRhdGE7XG4gICAgICAgIGlmICghZm9ybS5oZWFkSW1nKSB7XG4gICAgICAgICAgICB0aGlzLnRvYXN0KCfor7flrozlloTkv6Hmga8nKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWZvcm0ubmlja05hbWUpIHtcbiAgICAgICAgICAgIHRoaXMudG9hc3QoJ+i+k+WFpeWwj+eoi+W6j+WQjeensCcpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChmb3JtLm5pY2tOYW1lLmxlbmd0aCA8IDQpIHtcbiAgICAgICAgICAgIHRoaXMudG9hc3QoJ+Wwj+eoi+W6j+WQjeensOS4jeW+l+Wwj+S6jjTkuKonKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWZvcm0udGVscGhvbmUpIHtcbiAgICAgICAgICAgIHRoaXMudG9hc3QoJ+i+k+WFpeiBlOezu+eUteivnScpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChmb3JtLnRlbHBob25lLmxlbmd0aCA8IDExICYmICFyZWdQaG9uZS50ZXN0KGZvcm0udGVscGhvbmUpKSB7XG4gICAgICAgICAgICBhd2FpdCB0b2FzdFN5bmMoJ+aJi+acuuWPt+S4jeato+ehricpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmICghZm9ybS5jaXR5KSB7XG4gICAgICAgICAgICB0aGlzLnRvYXN0KCfpgInmi6nln47luIInKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWZvcm0uYWRkcmVzcykge1xuICAgICAgICAgICAgdGhpcy50b2FzdCgn6L6T5YWl6K+m5oOF5Zyw5Z2AJyk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIG1ldGhvZHMgPSB7XG4gICAgICAgIGFzeW5jIGJpbmRDaXR5IChlKSB7XG4gICAgICAgICAgICBjb25zdCB7IGNvbHVtbiwgdmFsdWUgfSA9IGUuZGV0YWlsO1xuICAgICAgICAgICAgaWYgKGNvbHVtbiA9PT0gMSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHsgZGlzcExvY2FsSUQgfSA9IHRoaXMuYXJlYXNbMF1bdmFsdWVdO1xuICAgICAgICAgICAgY29uc3QgW2VyciwgZGF0YV0gPSBhd2FpdCBnZXQoY2l0eUFwaSArIGRpc3BMb2NhbElEKTtcbiAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRvYXN0KGVycik7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5hcmVhcyA9IFt0aGlzLmFyZWFzWzBdLCBkYXRhXTtcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICAgIH0sXG4gICAgICAgIHNldENpdHkgKGUpIHtcbiAgICAgICAgICAgIGNvbnN0IGFyciA9IGUuZGV0YWlsLnZhbHVlO1xuICAgICAgICAgICAgY29uc3QgY2l0eUlkeCA9IGFyclsxXSAmJiAwO1xuICAgICAgICAgICAgY29uc3QgcHJvdmluY2UgPSB0aGlzLmFyZWFzWzBdW2FyclswXV07XG4gICAgICAgICAgICBjb25zdCBjaXR5ID0gdGhpcy5hcmVhc1sxXVtjaXR5SWR4XTtcbiAgICAgICAgICAgIHRoaXMuc2VsQ2l0eSA9IFtwcm92aW5jZS5sb2NhbE5hbWUsIGNpdHkubG9jYWxOYW1lXTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlRm9ybSh7XG4gICAgICAgICAgICAgICAgcHJvdmluY2U6IHByb3ZpbmNlLmRpc3BMb2NhbElELFxuICAgICAgICAgICAgICAgIHByb3ZpbmNlTmFtZTogcHJvdmluY2UubG9jYWxOYW1lLFxuICAgICAgICAgICAgICAgIGNpdHk6IGNpdHkuZGlzcExvY2FsSUQsXG4gICAgICAgICAgICAgICAgY2l0eU5hbWU6IGNpdHkubG9jYWxOYW1lLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIGFzeW5jIHNldExvZ28gKCkge1xuICAgICAgICAgICAgY29uc3QgeyB0ZW1wRmlsZVBhdGhzIH0gPSBhd2FpdCB3ZXB5LmNob29zZUltYWdlKHtcbiAgICAgICAgICAgICAgICBjb3VudDogMSxcbiAgICAgICAgICAgICAgICBzaXplVHlwZTogJ2NvbXByZXNzZWQgJyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY29uc3QgZmlsZVBhdGggPSB0ZW1wRmlsZVBhdGhzWzBdO1xuICAgICAgICAgICAgY29uc29sZS5sb2coeyBmaWxlUGF0aCB9KTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB3ZXB5LnVwbG9hZEZpbGUoe1xuICAgICAgICAgICAgICAgICAgICB1cmw6IHVwbG9hZEFwaSxcbiAgICAgICAgICAgICAgICAgICAgZmlsZVBhdGgsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICdjb250ZW50JyxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBjb25zdCByZXMgPSBKU09OLnBhcnNlKHJlc3BvbnNlLmRhdGEpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgc3RhdGUsIG1zZywgZGF0YSB9ID0gcmVzO1xuICAgICAgICAgICAgICAgIGlmIChzdGF0ZSA9PT0gMTAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGVtcExvZ28gPSBmaWxlUGF0aDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVGb3JtKHsgaGVhZEltZzogZGF0YS5jb250ZW50IH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudG9hc3QobXNnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGNhdGNoICh7IGVyck1zZyB9KSB7XG4gICAgICAgICAgICAgICAgdGhpcy50b2FzdChlcnJNc2cpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBzZXRBcHBOYW1lIChlKSB7XG4gICAgICAgICAgICBsZXQgbmlja05hbWUgPSBlLmRldGFpbC52YWx1ZTtcbiAgICAgICAgICAgIG5pY2tOYW1lID0gZmlsdGVyZW1vamkobmlja05hbWUpO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVGb3JtKHsgbmlja05hbWUgfSk7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHZhbHVlOiBuaWNrTmFtZSxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0sXG4gICAgICAgIHNldE1vYmlsZSAoZSkge1xuICAgICAgICAgICAgY29uc3QgdGVscGhvbmUgPSBlLmRldGFpbC52YWx1ZTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlRm9ybSh7IHRlbHBob25lIH0pO1xuICAgICAgICB9LFxuICAgICAgICBhc3luYyBzZXRMb2NhdGlvbiAoKSB7XG4gICAgICAgICAgICBjb25zdCB7IGFkZHJlc3MsIGxhdGl0dWRlLCBsb25naXR1ZGUgfSA9IGF3YWl0IHdlcHkuY2hvb3NlTG9jYXRpb24oKTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlRm9ybSh7IGFkZHJlc3MsIGFkZHJlc3NMYXRpdHVkZTogbGF0aXR1ZGUsIGFkZHJlc3NMb25naXR1ZGU6IGxvbmdpdHVkZSB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0RGV0YWlsQWRyZXNzIChlKSB7XG4gICAgICAgICAgICBsZXQgYWRkcmVzcyA9IGUuZGV0YWlsLnZhbHVlO1xuICAgICAgICAgICAgYWRkcmVzcyA9IGZpbHRlcmVtb2ppKGFkZHJlc3MpO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVGb3JtKHsgYWRkcmVzcyB9KTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IGFkZHJlc3MsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9LFxuICAgICAgICBhc3luYyBiaW5kU2F2ZSAoKSB7XG4gICAgICAgICAgICBjb25zdCB7IGZvcm0gfSA9IHRoaXMuZGF0YTtcbiAgICAgICAgICAgIGNvbnN0IHZlcmlmeSA9IGF3YWl0IHRoaXMudmVyaWZ5KCk7XG4gICAgICAgICAgICBpZiAoIXZlcmlmeSkgcmV0dXJuO1xuICAgICAgICAgICAgY29uc3Qgc2VuZERhdGEgPSB7XG4gICAgICAgICAgICAgICAgbXBpZDogdGhpcy5tcGlkLCAvLyDlsI/nqIvluo9pZFxuICAgICAgICAgICAgICAgIGxvZ286IGZvcm0uaGVhZEltZywgLy8g5bCP56iL5bqPbG9nbyDlj6rmnInkvJjkuqvlsI/nqIvluo/og73mlLlcbiAgICAgICAgICAgICAgICB0ZWxwaG9uZTogZm9ybS50ZWxwaG9uZSwgLy8g55S16K+dXG4gICAgICAgICAgICAgICAgbXBuYW1lOiBmb3JtLm5pY2tOYW1lLCAvLyDlsI/nqIvluo/lkI3np7Ag5Y+q5pyJ5LyY5Lqr5bCP56iL5bqP6IO95pS5XG4gICAgICAgICAgICAgICAgcHJpdmluY2U6IGZvcm0ucHJvdmluY2UsXG4gICAgICAgICAgICAgICAgY2l0eTogZm9ybS5jaXR5LCAvLyDln47luIJcbiAgICAgICAgICAgICAgICBhZGRyZXNzOiBmb3JtLmFkZHJlc3MsIC8vIOWcsOWdgFxuICAgICAgICAgICAgICAgIGxhdDogZm9ybS5hZGRyZXNzTGF0aXR1ZGUsIC8vIOe6rOW6plxuICAgICAgICAgICAgICAgIGxudDogZm9ybS5hZGRyZXNzTG9uZ2l0dWRlLCAvLyDnu4/luqZcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhzZW5kRGF0YSk7XG4gICAgICAgICAgICBjb25zdCBbZSwgcmVzXSA9IGF3YWl0IGdldChzYXZlQXBwQXBpLCBzZW5kRGF0YSk7XG4gICAgICAgICAgICBpZiAoZSkge1xuICAgICAgICAgICAgICAgIHRoaXMudG9hc3QocmVzLm1zZyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XG4gICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZUJhY2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICB9XG4gICAgYXN5bmMgb25Mb2FkIChvcHRpb25zKSB7XG4gICAgICAgIGNvbnN0IG1waWQgPSBvcHRpb25zLm1waWQgfHwgd2VweS5nZXRTdG9yYWdlU3luYygnY3VycmVudF9tcGlkJyk7XG4gICAgICAgIGlmICghbXBpZCkge1xuICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZUJhY2soKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm1waWQgPSBtcGlkO1xuICAgICAgICBhd2FpdCB0aGlzLmdldEFwcEluZm8odGhpcy5tcGlkKTtcbiAgICAgICAgYXdhaXQgdGhpcy5nZXRMb2NhdGlvbigpO1xuICAgICAgICBhd2FpdCB0aGlzLmdldFByb3ZpbmNlcygpO1xuICAgICAgICB0aGlzLmRlZmF1bHRTZWxDaXR5SW5kZXgoKTtcbiAgICB9XG59XG4iXX0=