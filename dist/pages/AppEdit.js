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
                                if (!(form.telphone.length < 11 && regPhone.test(form.telphone))) {
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkFwcEVkaXQuanMiXSwibmFtZXMiOlsiaG9zdCIsInVwbG9hZEFwaSIsInByb3ZpbmNlQXBpIiwiY2l0eUFwaSIsImFwcGluZm9BcGkiLCJzYXZlQXBwQXBpIiwiQXBwRWRpdCIsImNvbmZpZyIsImRpc2FibGVTY3JvbGwiLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsImxvZ29VcmwiLCJsb2FkaW5nIiwibXBpZCIsImFyZWFzIiwic2VsQ2l0eUluZGV4IiwibWFya2VySWQiLCJmb3JtIiwiY2l0eSIsInByb3ZpbmNlIiwidGVtcExvZ28iLCJjb21wdXRlZCIsImVuYWJsZVNhdmUiLCJuaWNrTmFtZSIsImhlYWRJbWciLCJ0ZWxwaG9uZSIsImFkZHJlc3MiLCJtYXJrZXJzIiwiaWNvblBhdGgiLCJpZCIsImxhdGl0dWRlIiwiYWRkcmVzc0xhdGl0dWRlIiwibG9uZ2l0dWRlIiwiYWRkcmVzc0xvbmdpdHVkZSIsIndpZHRoIiwiaGVpZ2h0IiwibWV0aG9kcyIsImJpbmRDaXR5IiwiZSIsImRldGFpbCIsImNvbHVtbiIsInZhbHVlIiwiZGlzcExvY2FsSUQiLCJlcnIiLCJ0b2FzdCIsIiRhcHBseSIsInNldENpdHkiLCJhcnIiLCJjaXR5SWR4Iiwic2VsQ2l0eSIsImxvY2FsTmFtZSIsInVwZGF0ZUZvcm0iLCJwcm92aW5jZU5hbWUiLCJjaXR5TmFtZSIsInNldExvZ28iLCJ3ZXB5IiwiY2hvb3NlSW1hZ2UiLCJjb3VudCIsInNpemVUeXBlIiwidGVtcEZpbGVQYXRocyIsImZpbGVQYXRoIiwiY29uc29sZSIsImxvZyIsInVwbG9hZEZpbGUiLCJ1cmwiLCJuYW1lIiwicmVzcG9uc2UiLCJyZXMiLCJKU09OIiwicGFyc2UiLCJzdGF0ZSIsIm1zZyIsImNvbnRlbnQiLCJlcnJNc2ciLCJzZXRBcHBOYW1lIiwic2V0TW9iaWxlIiwic2V0TG9jYXRpb24iLCJjaG9vc2VMb2NhdGlvbiIsInNldERldGFpbEFkcmVzcyIsImJpbmRTYXZlIiwidmVyaWZ5Iiwic2VuZERhdGEiLCJsb2dvIiwibXBuYW1lIiwicHJpdmluY2UiLCJsYXQiLCJsbnQiLCJuYXZpZ2F0ZUJhY2siLCJwSW5kZXgiLCJjSW5kZXgiLCJpdGVtIiwiaSIsImxlbiIsImxlbmd0aCIsImluZGV4T2YiLCJ1bmRlZmluZWQiLCJPYmplY3QiLCJhc3NpZ24iLCJlMSIsImRhdGExIiwiZTIiLCJkYXRhMiIsImdldExvY2F0aW9uIiwidHlwZSIsInBhcmFtcyIsInRpdGxlIiwiZHVyYXRpb24iLCJzaG93VG9hc3QiLCJpY29uIiwicmVnUGhvbmUiLCJ0ZXN0Iiwib3B0aW9ucyIsImdldFN0b3JhZ2VTeW5jIiwiZ2V0QXBwSW5mbyIsImdldFByb3ZpbmNlcyIsImRlZmF1bHRTZWxDaXR5SW5kZXgiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxPQUFPLHNCQUFiO0FBQ0EsSUFBTUMsWUFBZUQsSUFBZixnQkFBTjtBQUNBLElBQU1FLGNBQWMsa0JBQXBCO0FBQ0EsSUFBTUMsVUFBVSxlQUFoQjtBQUNBLElBQU1DLGFBQWEsY0FBbkI7QUFDQSxJQUFNQyxhQUFhLHVCQUFuQjs7SUFFcUJDLE87Ozs7Ozs7Ozs7Ozs7OzRMQUNqQkMsTSxHQUFTO0FBQ0xDLDJCQUFlLElBRFY7QUFFTEMsb0NBQXdCO0FBRm5CLFMsUUFJVEMsSSxHQUFPO0FBQ0hDLHFCQUFTLEVBRE47QUFFSEMscUJBQVMsSUFGTjtBQUdIQyxrQkFBTSxFQUhIO0FBSUhDLG1CQUFPLENBQUMsRUFBRCxFQUFLLEVBQUwsQ0FKSjtBQUtIQywwQkFBYyxDQUFDLENBQUQsRUFBSSxDQUFKLENBTFg7QUFNSEMsc0JBQVUsQ0FOUDtBQU9IQyxrQkFBTTtBQUNGQyxzQkFBTSxHQURKO0FBRUZDLDBCQUFVO0FBRlIsYUFQSDtBQVdIQyxzQkFBVTtBQVhQLFMsUUFhUEMsUSxHQUFXO0FBQ1BDLHNCQURPLHdCQUNPO0FBQ1YsdUJBQU8sQ0FBQyxFQUFFLEtBQUtM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LENBQWNvRSxNQUFkLEdBQXVCLEVBQXZCLElBQTZCZ0IsU0FBU0MsSUFBVCxDQUFjN0YsS0FBS1EsUUFBbkIsQzs7Ozs7O3VDQUN2QixzQkFBVSxRQUFWLEM7OztrRUFDQyxLOzs7b0NBRU5SLEtBQUtDLEk7Ozs7O0FBQ04scUNBQUswQixLQUFMLENBQVcsTUFBWDtrRUFDTyxLOzs7b0NBRU4zQixLQUFLUyxPOzs7OztBQUNOLHFDQUFLa0IsS0FBTCxDQUFXLFFBQVg7a0VBQ08sSzs7O2tFQUVKLEk7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7bUdBd0dHbUUsTzs7Ozs7O0FBQ0psRyxvQyxHQUFPa0csUUFBUWxHLElBQVIsSUFBZ0IwQyxlQUFLeUQsY0FBTCxDQUFvQixjQUFwQixDOztBQUM3QixvQ0FBSSxDQUFDbkcsSUFBTCxFQUFXO0FBQ1AwQyxtREFBS2dDLFlBQUw7QUFDSDtBQUNELHFDQUFLMUUsSUFBTCxHQUFZQSxJQUFaOzt1Q0FDTSxLQUFLb0csVUFBTCxDQUFnQixLQUFLcEcsSUFBckIsQzs7Ozt1Q0FDQSxLQUFLeUYsV0FBTCxFOzs7O3VDQUNBLEtBQUtZLFlBQUwsRTs7O0FBQ04scUNBQUtDLG1CQUFMOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBcFI2QjVELGVBQUs2RCxJOztrQkFBckI5RyxPIiwiZmlsZSI6IkFwcEVkaXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuaW1wb3J0IHsgcGljU3JjRG9tYWluLCBmaWx0ZXJlbW9qaSwgdG9hc3RTeW5jIH0gZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IHsgZ2V0IH0gZnJvbSAnLi4vdXRpbHMvYWpheFAnO1xuXG5jb25zdCBob3N0ID0gJ2h0dHBzOi8veWFvZmEuNTguY29tJztcbmNvbnN0IHVwbG9hZEFwaSA9IGAke2hvc3R9L2ZpbGVVcGxvYWRgO1xuY29uc3QgcHJvdmluY2VBcGkgPSAnL2xvY2FsL3Byb3ZpbmNlcyc7XG5jb25zdCBjaXR5QXBpID0gJy9sb2NhbC9jaXR5cy8nO1xuY29uc3QgYXBwaW5mb0FwaSA9ICcvbXBsb2dpYy9nZXQnO1xuY29uc3Qgc2F2ZUFwcEFwaSA9ICcvbXBsb2dpYy9tb2RpZnltcGluZm8nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcHBFZGl0IGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICAgIGRpc2FibGVTY3JvbGw6IHRydWUsXG4gICAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICflsI/nqIvluo/nvJbovpEnLFxuICAgIH1cbiAgICBkYXRhID0ge1xuICAgICAgICBsb2dvVXJsOiAnJyxcbiAgICAgICAgbG9hZGluZzogdHJ1ZSxcbiAgICAgICAgbXBpZDogJycsXG4gICAgICAgIGFyZWFzOiBbW10sIFtdXSxcbiAgICAgICAgc2VsQ2l0eUluZGV4OiBbMCwgMF0sXG4gICAgICAgIG1hcmtlcklkOiAwLFxuICAgICAgICBmb3JtOiB7XG4gICAgICAgICAgICBjaXR5OiAnMScsXG4gICAgICAgICAgICBwcm92aW5jZTogJzUwMDEnLFxuICAgICAgICB9LFxuICAgICAgICB0ZW1wTG9nbzogJycsXG4gICAgfVxuICAgIGNvbXB1dGVkID0ge1xuICAgICAgICBlbmFibGVTYXZlICgpIHtcbiAgICAgICAgICAgIHJldHVybiAhISh0aGlzLmZvcm0ubmlja05hbWUgJiYgdGhpcy5mb3JtLmhlYWRJbWdcbiAgICAgICAgICAgICAgICAmJiB0aGlzLmZvcm0udGVscGhvbmUgJiYgdGhpcy5mb3JtLmNpdHkgJiYgdGhpcy5mb3JtLmFkZHJlc3MpO1xuICAgICAgICB9LFxuICAgICAgICBtYXJrZXJzICgpIHtcbiAgICAgICAgICAgIGNvbnN0IG1hcmtlcklkID0gdGhpcy5tYXJrZXJJZCArIDE7XG4gICAgICAgICAgICByZXR1cm4gW3tcbiAgICAgICAgICAgICAgICBpY29uUGF0aDogJy9wYWdlcy9hc3NldHMvbWFya2VyLnBuZycsXG4gICAgICAgICAgICAgICAgaWQ6IG1hcmtlcklkLFxuICAgICAgICAgICAgICAgIGxhdGl0dWRlOiB0aGlzLmZvcm0uYWRkcmVzc0xhdGl0dWRlIHx8ICcnLFxuICAgICAgICAgICAgICAgIGxvbmdpdHVkZTogdGhpcy5mb3JtLmFkZHJlc3NMb25naXR1ZGUgfHwgJycsXG4gICAgICAgICAgICAgICAgd2lkdGg6IDIyLFxuICAgICAgICAgICAgICAgIGhlaWdodDogMzIsXG4gICAgICAgICAgICB9XTtcbiAgICAgICAgfSxcbiAgICAgICAgbG9uZ2l0dWRlICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZvcm0uYWRkcmVzc0xvbmdpdHVkZTtcbiAgICAgICAgfSxcbiAgICAgICAgbGF0aXR1ZGUgKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZm9ybS5hZGRyZXNzTGF0aXR1ZGU7XG4gICAgICAgIH0sXG4gICAgfVxuXG4gICAgZGVmYXVsdFNlbENpdHlJbmRleCAoKSB7XG4gICAgICAgIGNvbnN0IHsgY2l0eSwgcHJvdmluY2UgfSA9IHRoaXMuZm9ybTtcbiAgICAgICAgbGV0IHBJbmRleCA9IDA7XG4gICAgICAgIGxldCBjSW5kZXggPSAwO1xuICAgICAgICBsZXQgaXRlbTtcbiAgICAgICAgaWYgKHByb3ZpbmNlKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gdGhpcy5hcmVhc1swXS5sZW5ndGg7IGkgPCBsZW47IGkgKz0gMSkge1xuICAgICAgICAgICAgICAgIGl0ZW0gPSB0aGlzLmFyZWFzWzBdW2ldO1xuICAgICAgICAgICAgICAgIGlmIChpdGVtLmRpc3BMb2NhbElEID09PSBwcm92aW5jZSkge1xuICAgICAgICAgICAgICAgICAgICBwSW5kZXggPSBpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNpdHkpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSB0aGlzLmFyZWFzWzFdLmxlbmd0aDsgaSA8IGxlbjsgaSArPSAxKSB7XG4gICAgICAgICAgICAgICAgaXRlbSA9IHRoaXMuYXJlYXNbMV1baV07XG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0uZGlzcExvY2FsSUQgPT09IHByb3ZpbmNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNJbmRleCA9IGk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNlbENpdHlJbmRleCA9IFtwSW5kZXgsIGNJbmRleF07XG4gICAgICAgIHRoaXMudXBkYXRlRm9ybSh7XG4gICAgICAgICAgICBjaXR5OiB0aGlzLmFyZWFzWzFdW2NJbmRleF0uZGlzcExvY2FsSUQsXG4gICAgICAgICAgICBjaXR5TmFtZTogdGhpcy5hcmVhc1sxXVtjSW5kZXhdLmxvY2FsTmFtZSxcbiAgICAgICAgICAgIHByb3ZpbmNlOiB0aGlzLmFyZWFzWzBdW3BJbmRleF0uZGlzcExvY2FsSUQsXG4gICAgICAgICAgICBwcm92aW5jZU5hbWU6IHRoaXMuYXJlYXNbMF1bcEluZGV4XS5sb2NhbE5hbWUsXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHVwZGF0ZUZvcm0gKGRhdGEpIHtcbiAgICAgICAgY29uc3QgcmVzID0gZGF0YTtcbiAgICAgICAgY29uc3QgeyBmb3JtIH0gPSB0aGlzLmRhdGE7XG4gICAgICAgIC8vIOWktOWDj1xuICAgICAgICBpZiAocmVzLmhlYWRJbWcgPT09ICcnIHx8IHJlcy5oZWFkSW1nKSB7XG4gICAgICAgICAgICBsZXQgeyBoZWFkSW1nID0gJ2h0dHBzOi8vcGljOC41OGNkbi5jb20uY24vYml6bXAvbl92Mjg1ZDZhMTZkNzI1YTQ0NjY5NGRiMzVkZjIzYzlkYjI0LnBuZz93PTcyJmg9NzInIH0gPSByZXM7XG4gICAgICAgICAgICBoZWFkSW1nID0gdGhpcy50ZW1wTG9nbyB8fCBoZWFkSW1nO1xuICAgICAgICAgICAgaWYgKGhlYWRJbWcuaW5kZXhPZignaHR0cCcpIDwgMCAmJiBoZWFkSW1nLmluZGV4T2YoJ2ZpbGU6JykgPCAwKSB7XG4gICAgICAgICAgICAgICAgaGVhZEltZyA9IGAke3BpY1NyY0RvbWFpbigpICsgaGVhZEltZ30/dz03MiZoPTcyYDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMubG9nb1VybCA9IGhlYWRJbWc7XG4gICAgICAgIH1cbiAgICAgICAgLy8g57uP57qs5bqm77yM6L+H5ruk56m66LWL5YC8XG4gICAgICAgIGlmIChyZXMuYWRkcmVzc0xhdGl0dWRlICE9PSB1bmRlZmluZWQgJiYgcmVzLmFkZHJlc3NMYXRpdHVkZSA9PT0gJycpIHtcbiAgICAgICAgICAgIGRlbGV0ZSByZXMuYWRkcmVzc0xhdGl0dWRlO1xuICAgICAgICAgICAgZGVsZXRlIHJlcy5hZGRyZXNzTG9uZ2l0dWRlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZm9ybSA9IE9iamVjdC5hc3NpZ24oe30sIGZvcm0sIHsgLi4ucmVzIH0pO1xuICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgIH1cbiAgICBhc3luYyBnZXRQcm92aW5jZXMgKCkge1xuICAgICAgICBjb25zdCBbZTEsIGRhdGExXSA9IGF3YWl0IGdldChwcm92aW5jZUFwaSk7XG4gICAgICAgIGlmIChlMSkge1xuICAgICAgICAgICAgdGhpcy50b2FzdChlMSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcHJvdmluY2UgPSB0aGlzLmZvcm0ucHJvdmluY2UgfHwgJzUwMDEnO1xuICAgICAgICBjb25zdCBbZTIsIGRhdGEyXSA9IGF3YWl0IGdldChjaXR5QXBpICsgcHJvdmluY2UpO1xuICAgICAgICBpZiAoZTIpIHtcbiAgICAgICAgICAgIHRoaXMudG9hc3QoZTIpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKCdwcm92aW5jZXMnLCBkYXRhMSwgJ2NpdHlzJywgZGF0YTIpO1xuICAgICAgICB0aGlzLmFyZWFzID0gW2RhdGExLCBkYXRhMl07XG4gICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgIH1cbiAgICBhc3luYyBnZXRMb2NhdGlvbiAoKSB7XG4gICAgICAgIGNvbnN0IHsgbGF0aXR1ZGUsIGxvbmdpdHVkZSB9ID0gYXdhaXQgd2VweS5nZXRMb2NhdGlvbih7IHR5cGU6ICd3Z3M4NCcgfSk7XG4gICAgICAgIGlmICh0aGlzLmZvcm0uYWRkcmVzc0xhdGl0dWRlKSByZXR1cm47XG4gICAgICAgIHRoaXMudXBkYXRlRm9ybSh7IGFkZHJlc3NMYXRpdHVkZTogbGF0aXR1ZGUsIGFkZHJlc3NMb25naXR1ZGU6IGxvbmdpdHVkZSB9KTtcbiAgICB9XG4gICAgYXN5bmMgZ2V0QXBwSW5mbyAobXBpZCkge1xuICAgICAgICBjb25zdCBbZSwgZGF0YV0gPSBhd2FpdCBnZXQoYCR7YXBwaW5mb0FwaX0vJHttcGlkfWApO1xuICAgICAgICBpZiAoZSkge1xuICAgICAgICAgICAgdGhpcy50b2FzdChlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnVwZGF0ZUZvcm0oeyAuLi5kYXRhIH0pO1xuICAgIH1cbiAgICB0b2FzdCAoLi4ucGFyYW1zKSB7XG4gICAgICAgIGNvbnN0IFt0aXRsZSwgZHVyYXRpb24gPSAyMDAwXSA9IHBhcmFtcztcbiAgICAgICAgcmV0dXJuIHdlcHkuc2hvd1RvYXN0KHtcbiAgICAgICAgICAgIHRpdGxlLFxuICAgICAgICAgICAgaWNvbjogJ25vbmUnLFxuICAgICAgICAgICAgZHVyYXRpb24sXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBhc3luYyB2ZXJpZnkgKCkge1xuICAgICAgICBjb25zdCByZWdQaG9uZSA9IC9eMVszNDU2Nzg5XVswLTldezl9JC87XG4gICAgICAgIGNvbnN0IHsgZm9ybSB9ID0gdGhpcy5kYXRhO1xuICAgICAgICBpZiAoIWZvcm0uaGVhZEltZykge1xuICAgICAgICAgICAgdGhpcy50b2FzdCgn6K+35a6M5ZaE5L+h5oGvJyk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFmb3JtLm5pY2tOYW1lKSB7XG4gICAgICAgICAgICB0aGlzLnRvYXN0KCfovpPlhaXlsI/nqIvluo/lkI3np7AnKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZm9ybS5uaWNrTmFtZS5sZW5ndGggPCA0KSB7XG4gICAgICAgICAgICB0aGlzLnRvYXN0KCflsI/nqIvluo/lkI3np7DkuI3lvpflsI/kuo405LiqJyk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFmb3JtLnRlbHBob25lKSB7XG4gICAgICAgICAgICB0aGlzLnRvYXN0KCfovpPlhaXogZTns7vnlLXor50nKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZm9ybS50ZWxwaG9uZS5sZW5ndGggPCAxMSAmJiByZWdQaG9uZS50ZXN0KGZvcm0udGVscGhvbmUpKSB7XG4gICAgICAgICAgICBhd2FpdCB0b2FzdFN5bmMoJ+aJi+acuuWPt+S4jeato+ehricpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmICghZm9ybS5jaXR5KSB7XG4gICAgICAgICAgICB0aGlzLnRvYXN0KCfpgInmi6nln47luIInKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWZvcm0uYWRkcmVzcykge1xuICAgICAgICAgICAgdGhpcy50b2FzdCgn6L6T5YWl6K+m5oOF5Zyw5Z2AJyk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIG1ldGhvZHMgPSB7XG4gICAgICAgIGFzeW5jIGJpbmRDaXR5IChlKSB7XG4gICAgICAgICAgICBjb25zdCB7IGNvbHVtbiwgdmFsdWUgfSA9IGUuZGV0YWlsO1xuICAgICAgICAgICAgaWYgKGNvbHVtbiA9PT0gMSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHsgZGlzcExvY2FsSUQgfSA9IHRoaXMuYXJlYXNbMF1bdmFsdWVdO1xuICAgICAgICAgICAgY29uc3QgW2VyciwgZGF0YV0gPSBhd2FpdCBnZXQoY2l0eUFwaSArIGRpc3BMb2NhbElEKTtcbiAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRvYXN0KGVycik7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5hcmVhcyA9IFt0aGlzLmFyZWFzWzBdLCBkYXRhXTtcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICAgIH0sXG4gICAgICAgIHNldENpdHkgKGUpIHtcbiAgICAgICAgICAgIGNvbnN0IGFyciA9IGUuZGV0YWlsLnZhbHVlO1xuICAgICAgICAgICAgY29uc3QgY2l0eUlkeCA9IGFyclsxXSAmJiAwO1xuICAgICAgICAgICAgY29uc3QgcHJvdmluY2UgPSB0aGlzLmFyZWFzWzBdW2FyclswXV07XG4gICAgICAgICAgICBjb25zdCBjaXR5ID0gdGhpcy5hcmVhc1sxXVtjaXR5SWR4XTtcbiAgICAgICAgICAgIHRoaXMuc2VsQ2l0eSA9IFtwcm92aW5jZS5sb2NhbE5hbWUsIGNpdHkubG9jYWxOYW1lXTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlRm9ybSh7XG4gICAgICAgICAgICAgICAgcHJvdmluY2U6IHByb3ZpbmNlLmRpc3BMb2NhbElELFxuICAgICAgICAgICAgICAgIHByb3ZpbmNlTmFtZTogcHJvdmluY2UubG9jYWxOYW1lLFxuICAgICAgICAgICAgICAgIGNpdHk6IGNpdHkuZGlzcExvY2FsSUQsXG4gICAgICAgICAgICAgICAgY2l0eU5hbWU6IGNpdHkubG9jYWxOYW1lLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIGFzeW5jIHNldExvZ28gKCkge1xuICAgICAgICAgICAgY29uc3QgeyB0ZW1wRmlsZVBhdGhzIH0gPSBhd2FpdCB3ZXB5LmNob29zZUltYWdlKHtcbiAgICAgICAgICAgICAgICBjb3VudDogMSxcbiAgICAgICAgICAgICAgICBzaXplVHlwZTogJ2NvbXByZXNzZWQgJyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY29uc3QgZmlsZVBhdGggPSB0ZW1wRmlsZVBhdGhzWzBdO1xuICAgICAgICAgICAgY29uc29sZS5sb2coeyBmaWxlUGF0aCB9KTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB3ZXB5LnVwbG9hZEZpbGUoe1xuICAgICAgICAgICAgICAgICAgICB1cmw6IHVwbG9hZEFwaSxcbiAgICAgICAgICAgICAgICAgICAgZmlsZVBhdGgsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICdjb250ZW50JyxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBjb25zdCByZXMgPSBKU09OLnBhcnNlKHJlc3BvbnNlLmRhdGEpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgc3RhdGUsIG1zZywgZGF0YSB9ID0gcmVzO1xuICAgICAgICAgICAgICAgIGlmIChzdGF0ZSA9PT0gMTAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGVtcExvZ28gPSBmaWxlUGF0aDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVGb3JtKHsgaGVhZEltZzogZGF0YS5jb250ZW50IH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudG9hc3QobXNnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGNhdGNoICh7IGVyck1zZyB9KSB7XG4gICAgICAgICAgICAgICAgdGhpcy50b2FzdChlcnJNc2cpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBzZXRBcHBOYW1lIChlKSB7XG4gICAgICAgICAgICBsZXQgbmlja05hbWUgPSBlLmRldGFpbC52YWx1ZTtcbiAgICAgICAgICAgIG5pY2tOYW1lID0gZmlsdGVyZW1vamkobmlja05hbWUpO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVGb3JtKHsgbmlja05hbWUgfSk7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHZhbHVlOiBuaWNrTmFtZSxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0sXG4gICAgICAgIHNldE1vYmlsZSAoZSkge1xuICAgICAgICAgICAgY29uc3QgdGVscGhvbmUgPSBlLmRldGFpbC52YWx1ZTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlRm9ybSh7IHRlbHBob25lIH0pO1xuICAgICAgICB9LFxuICAgICAgICBhc3luYyBzZXRMb2NhdGlvbiAoKSB7XG4gICAgICAgICAgICBjb25zdCB7IGFkZHJlc3MsIGxhdGl0dWRlLCBsb25naXR1ZGUgfSA9IGF3YWl0IHdlcHkuY2hvb3NlTG9jYXRpb24oKTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlRm9ybSh7IGFkZHJlc3MsIGFkZHJlc3NMYXRpdHVkZTogbGF0aXR1ZGUsIGFkZHJlc3NMb25naXR1ZGU6IGxvbmdpdHVkZSB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0RGV0YWlsQWRyZXNzIChlKSB7XG4gICAgICAgICAgICBsZXQgYWRkcmVzcyA9IGUuZGV0YWlsLnZhbHVlO1xuICAgICAgICAgICAgYWRkcmVzcyA9IGZpbHRlcmVtb2ppKGFkZHJlc3MpO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVGb3JtKHsgYWRkcmVzcyB9KTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IGFkZHJlc3MsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9LFxuICAgICAgICBhc3luYyBiaW5kU2F2ZSAoKSB7XG4gICAgICAgICAgICBjb25zdCB7IGZvcm0gfSA9IHRoaXMuZGF0YTtcbiAgICAgICAgICAgIGNvbnN0IHZlcmlmeSA9IGF3YWl0IHRoaXMudmVyaWZ5KCk7XG4gICAgICAgICAgICBpZiAoIXZlcmlmeSkgcmV0dXJuO1xuICAgICAgICAgICAgY29uc3Qgc2VuZERhdGEgPSB7XG4gICAgICAgICAgICAgICAgbXBpZDogdGhpcy5tcGlkLCAvLyDlsI/nqIvluo9pZFxuICAgICAgICAgICAgICAgIGxvZ286IGZvcm0uaGVhZEltZywgLy8g5bCP56iL5bqPbG9nbyDlj6rmnInkvJjkuqvlsI/nqIvluo/og73mlLlcbiAgICAgICAgICAgICAgICB0ZWxwaG9uZTogZm9ybS50ZWxwaG9uZSwgLy8g55S16K+dXG4gICAgICAgICAgICAgICAgbXBuYW1lOiBmb3JtLm5pY2tOYW1lLCAvLyDlsI/nqIvluo/lkI3np7Ag5Y+q5pyJ5LyY5Lqr5bCP56iL5bqP6IO95pS5XG4gICAgICAgICAgICAgICAgcHJpdmluY2U6IGZvcm0ucHJvdmluY2UsXG4gICAgICAgICAgICAgICAgY2l0eTogZm9ybS5jaXR5LCAvLyDln47luIJcbiAgICAgICAgICAgICAgICBhZGRyZXNzOiBmb3JtLmFkZHJlc3MsIC8vIOWcsOWdgFxuICAgICAgICAgICAgICAgIGxhdDogZm9ybS5hZGRyZXNzTGF0aXR1ZGUsIC8vIOe6rOW6plxuICAgICAgICAgICAgICAgIGxudDogZm9ybS5hZGRyZXNzTG9uZ2l0dWRlLCAvLyDnu4/luqZcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhzZW5kRGF0YSk7XG4gICAgICAgICAgICBjb25zdCBbZSwgcmVzXSA9IGF3YWl0IGdldChzYXZlQXBwQXBpLCBzZW5kRGF0YSk7XG4gICAgICAgICAgICBpZiAoZSkge1xuICAgICAgICAgICAgICAgIHRoaXMudG9hc3QocmVzLm1zZyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XG4gICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZUJhY2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICB9XG4gICAgYXN5bmMgb25Mb2FkIChvcHRpb25zKSB7XG4gICAgICAgIGNvbnN0IG1waWQgPSBvcHRpb25zLm1waWQgfHwgd2VweS5nZXRTdG9yYWdlU3luYygnY3VycmVudF9tcGlkJyk7XG4gICAgICAgIGlmICghbXBpZCkge1xuICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZUJhY2soKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm1waWQgPSBtcGlkO1xuICAgICAgICBhd2FpdCB0aGlzLmdldEFwcEluZm8odGhpcy5tcGlkKTtcbiAgICAgICAgYXdhaXQgdGhpcy5nZXRMb2NhdGlvbigpO1xuICAgICAgICBhd2FpdCB0aGlzLmdldFByb3ZpbmNlcygpO1xuICAgICAgICB0aGlzLmRlZmF1bHRTZWxDaXR5SW5kZXgoKTtcbiAgICB9XG59XG4iXX0=