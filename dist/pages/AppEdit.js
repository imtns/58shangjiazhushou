'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _Cropper = require('./../components/Cropper.js');

var _Cropper2 = _interopRequireDefault(_Cropper);

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
            navigationBarTitleText: '小程序编辑'
        }, _this.components = {
            cropper: _Cropper2.default
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
            tempLogo: '',
            cateEditable: true // 所属行业是否可以编辑
        }, _this.events = {
            'after-crop': function afterCrop(tempPath) {
                this.uploadLogo(tempPath);
            }
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
                    var netStatus, _ref6, tempFilePaths, _ref7, confirm;

                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                        while (1) {
                            switch (_context2.prev = _context2.next) {
                                case 0:
                                    _context2.prev = 0;
                                    _context2.next = 3;
                                    return (0, _utils.getNetStatus)();

                                case 3:
                                    netStatus = _context2.sent;

                                    if (!(netStatus === 0)) {
                                        _context2.next = 7;
                                        break;
                                    }

                                    (0, _utils.toastSync)('无网络');
                                    return _context2.abrupt('return');

                                case 7:
                                    _context2.next = 9;
                                    return _wepy2.default.chooseImage({
                                        count: 1,
                                        sizeType: 'compressed '
                                    });

                                case 9:
                                    _ref6 = _context2.sent;
                                    tempFilePaths = _ref6.tempFilePaths;
                                    _context2.next = 13;
                                    return (0, _utils.alertP)('是否裁剪图片？', '提示');

                                case 13:
                                    _ref7 = _context2.sent;
                                    confirm = _ref7.confirm;


                                    if (confirm) {
                                        this.$broadcast('crop-loadImage', tempFilePaths[0], '1,1', true);
                                    } else {
                                        this.uploadLogo(tempFilePaths[0]);
                                    }
                                    _context2.next = 21;
                                    break;

                                case 18:
                                    _context2.prev = 18;
                                    _context2.t0 = _context2['catch'](0);

                                    console.log(_context2.t0);

                                case 21:
                                case 'end':
                                    return _context2.stop();
                            }
                        }
                    }, _callee2, this, [[0, 18]]);
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
                                        lnt: form.addressLongitude, // 经度
                                        cate1: form.cate1, // 所属行业第一级
                                        cate2: form.cate2, // 所属行业第二级
                                        cate3: form.cate3 // 所属行业第三级
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
        key: 'uploadLogo',
        value: function () {
            var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(tempPath) {
                var response, res, state, msg, data, errMsg;
                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                _context5.prev = 0;
                                _context5.next = 3;
                                return _wepy2.default.uploadFile({
                                    url: uploadApi,
                                    filePath: tempPath,
                                    name: 'content'
                                });

                            case 3:
                                response = _context5.sent;
                                res = JSON.parse(response.data);
                                state = res.state, msg = res.msg, data = res.data;

                                if (state === 100) {
                                    this.tempLogo = tempPath;
                                    this.updateForm({ headImg: data.content });
                                } else {
                                    this.toast(msg);
                                }
                                _context5.next = 13;
                                break;

                            case 9:
                                _context5.prev = 9;
                                _context5.t0 = _context5['catch'](0);
                                errMsg = _context5.t0.errMsg;

                                this.toast(errMsg);

                            case 13:
                            case 'end':
                                return _context5.stop();
                        }
                    }
                }, _callee5, this, [[0, 9]]);
            }));

            function uploadLogo(_x2) {
                return _ref13.apply(this, arguments);
            }

            return uploadLogo;
        }()
    }, {
        key: 'onLoad',
        value: function () {
            var _ref15 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(options) {
                var mpid;
                return regeneratorRuntime.wrap(function _callee6$(_context6) {
                    while (1) {
                        switch (_context6.prev = _context6.next) {
                            case 0:
                                mpid = options.mpid || _wepy2.default.getStorageSync('current_mpid');

                                if (!mpid) {
                                    _wepy2.default.navigateBack();
                                }
                                this.mpid = mpid;
                                _context6.next = 5;
                                return this.getAppInfo(this.mpid);

                            case 5:
                                this.recordFirstCateStatus(this.form);
                                _context6.next = 8;
                                return this.getLocation();

                            case 8:
                                _context6.next = 10;
                                return this.getProvinces();

                            case 10:
                                this.defaultSelCityIndex();

                            case 11:
                            case 'end':
                                return _context6.stop();
                        }
                    }
                }, _callee6, this);
            }));

            function onLoad(_x3) {
                return _ref15.apply(this, arguments);
            }

            return onLoad;
        }()
    }, {
        key: 'onShow',
        value: function onShow() {
            this.updateCateChoice();
        }
        // 记录页面加载是所属行业类别编辑状态
        // 如果小程序属于同镇mpSource= 3且所属行业cate2为空则可以编辑
        // 或者mpSource!==3则可以编辑

    }, {
        key: 'recordFirstCateStatus',
        value: function recordFirstCateStatus(appInfo) {
            var mpSource = appInfo.mpSource,
                cate2 = appInfo.cate2;

            console.log('mpSource', mpSource, 'cate2', cate2);
            this.cateEditable = !!(mpSource && mpSource.toString() === '3' && !cate2) || mpSource && mpSource.toString() !== '3';
        }
        // 更新所属行业类别

    }, {
        key: 'updateCateChoice',
        value: function updateCateChoice() {
            var _globalService$get = _utils.globalService.get('multiSelector'),
                _globalService$get$ca = _globalService$get.cate1,
                cate1 = _globalService$get$ca === undefined ? '' : _globalService$get$ca,
                _globalService$get$ca2 = _globalService$get.cate1Name,
                cate1Name = _globalService$get$ca2 === undefined ? '' : _globalService$get$ca2,
                _globalService$get$ca3 = _globalService$get.cate2,
                cate2 = _globalService$get$ca3 === undefined ? '' : _globalService$get$ca3,
                _globalService$get$ca4 = _globalService$get.cate2Name,
                cate2Name = _globalService$get$ca4 === undefined ? '' : _globalService$get$ca4,
                _globalService$get$ca5 = _globalService$get.cate3,
                cate3 = _globalService$get$ca5 === undefined ? '' : _globalService$get$ca5,
                _globalService$get$ca6 = _globalService$get.cate3Name,
                cate3Name = _globalService$get$ca6 === undefined ? '' : _globalService$get$ca6;

            // 检查


            if ([cate1, cate2, cate3].every(function (v) {
                return typeof v !== 'number';
            })) {
                return;
            }

            this.updateForm({
                cate1: cate1,
                cate1Name: cate1Name,
                cate2: cate2,
                cate2Name: cate2Name,
                cate3: cate3,
                cate3Name: cate3Name
            });
        }
        // updateCateChoice () {
        //     if (!this.$parent.globalData || !this.$parent.globalData.cateChooice) return;
        //     const form = {};
        //     console.log('cateChooice0', this.$parent.globalData.cateChooice);
        //     // 从所属类目值选择页面返回重新赋值
        //     const cateChooice = (this.$parent.globalData && this.$parent.globalData.cateChooice) ?
        //         this.$parent.globalData.cateChooice : [{}, {}, {}];
        //     console.log('cateChooice1', cateChooice);
        //     cateChooice.map((item, index) => {
        //         form[`cate${index + 1}`] = item.cateId || '';
        //         form[`cate${index + 1}Name`] = item.name || '';
        //         return item;
        //     });
        //     // 更新完成删除全局所属类目字段cateChooice
        //     this.$parent.globalData
        //         && this.$parent.globalData.cateChooice
        //         && (this.$parent.globalData.cateChooice = undefined);
        //     this.updateForm(form);
        // }

    }, {
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
            var _ref16 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
                var _ref17, _ref18, e1, data1, province, _ref19, _ref20, e2, data2;

                return regeneratorRuntime.wrap(function _callee7$(_context7) {
                    while (1) {
                        switch (_context7.prev = _context7.next) {
                            case 0:
                                _context7.next = 2;
                                return (0, _ajaxP.get)(provinceApi);

                            case 2:
                                _ref17 = _context7.sent;
                                _ref18 = _slicedToArray(_ref17, 2);
                                e1 = _ref18[0];
                                data1 = _ref18[1];

                                if (!e1) {
                                    _context7.next = 9;
                                    break;
                                }

                                this.toast(e1);
                                return _context7.abrupt('return');

                            case 9:
                                province = this.form.province || '5001';
                                _context7.next = 12;
                                return (0, _ajaxP.get)(cityApi + province);

                            case 12:
                                _ref19 = _context7.sent;
                                _ref20 = _slicedToArray(_ref19, 2);
                                e2 = _ref20[0];
                                data2 = _ref20[1];

                                if (!e2) {
                                    _context7.next = 19;
                                    break;
                                }

                                this.toast(e2);
                                return _context7.abrupt('return');

                            case 19:
                                console.log('provinces', data1, 'citys', data2);
                                this.areas = [data1, data2];
                                this.loading = false;
                                this.$apply();

                            case 23:
                            case 'end':
                                return _context7.stop();
                        }
                    }
                }, _callee7, this);
            }));

            function getProvinces() {
                return _ref16.apply(this, arguments);
            }

            return getProvinces;
        }()
    }, {
        key: 'getLocation',
        value: function () {
            var _ref21 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
                var _ref22, latitude, longitude;

                return regeneratorRuntime.wrap(function _callee8$(_context8) {
                    while (1) {
                        switch (_context8.prev = _context8.next) {
                            case 0:
                                _context8.next = 2;
                                return _wepy2.default.getLocation({ type: 'wgs84' });

                            case 2:
                                _ref22 = _context8.sent;
                                latitude = _ref22.latitude;
                                longitude = _ref22.longitude;

                                if (!this.form.addressLatitude) {
                                    _context8.next = 7;
                                    break;
                                }

                                return _context8.abrupt('return');

                            case 7:
                                this.updateForm({ addressLatitude: latitude, addressLongitude: longitude });

                            case 8:
                            case 'end':
                                return _context8.stop();
                        }
                    }
                }, _callee8, this);
            }));

            function getLocation() {
                return _ref21.apply(this, arguments);
            }

            return getLocation;
        }()
    }, {
        key: 'getAppInfo',
        value: function () {
            var _ref23 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(mpid) {
                var _ref24, _ref25, e, data;

                return regeneratorRuntime.wrap(function _callee9$(_context9) {
                    while (1) {
                        switch (_context9.prev = _context9.next) {
                            case 0:
                                _context9.next = 2;
                                return (0, _ajaxP.get)(appinfoApi + '/' + mpid);

                            case 2:
                                _ref24 = _context9.sent;
                                _ref25 = _slicedToArray(_ref24, 2);
                                e = _ref25[0];
                                data = _ref25[1];

                                if (!e) {
                                    _context9.next = 9;
                                    break;
                                }

                                this.toast(e);
                                return _context9.abrupt('return');

                            case 9:
                                this.updateForm(_extends({}, data));

                            case 10:
                            case 'end':
                                return _context9.stop();
                        }
                    }
                }, _callee9, this);
            }));

            function getAppInfo(_x4) {
                return _ref23.apply(this, arguments);
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
            var _ref26 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
                var regPhone, form;
                return regeneratorRuntime.wrap(function _callee10$(_context10) {
                    while (1) {
                        switch (_context10.prev = _context10.next) {
                            case 0:
                                regPhone = /^1[3456789][0-9]{9}$/;
                                form = this.data.form;

                                if (form.headImg) {
                                    _context10.next = 5;
                                    break;
                                }

                                this.toast('请完善信息');
                                return _context10.abrupt('return', false);

                            case 5:
                                if (form.nickName) {
                                    _context10.next = 8;
                                    break;
                                }

                                this.toast('输入小程序名称');
                                return _context10.abrupt('return', false);

                            case 8:
                                if (!(form.nickName.length < 4)) {
                                    _context10.next = 11;
                                    break;
                                }

                                this.toast('小程序名称不得小于4个字');
                                return _context10.abrupt('return', false);

                            case 11:
                                if (form.telphone) {
                                    _context10.next = 14;
                                    break;
                                }

                                this.toast('输入联系电话');
                                return _context10.abrupt('return', false);

                            case 14:
                                if (!(form.telphone.length < 11 && !regPhone.test(form.telphone))) {
                                    _context10.next = 18;
                                    break;
                                }

                                _context10.next = 17;
                                return (0, _utils.toastSync)('手机号不正确');

                            case 17:
                                return _context10.abrupt('return', false);

                            case 18:
                                if (form.city) {
                                    _context10.next = 21;
                                    break;
                                }

                                this.toast('选择城市');
                                return _context10.abrupt('return', false);

                            case 21:
                                if (form.address) {
                                    _context10.next = 24;
                                    break;
                                }

                                this.toast('输入详情地址');
                                return _context10.abrupt('return', false);

                            case 24:
                                if (!(!form.cate1 || !form.cate2)) {
                                    _context10.next = 27;
                                    break;
                                }

                                this.toast('所属行业至少选择两项');
                                return _context10.abrupt('return', false);

                            case 27:
                                return _context10.abrupt('return', true);

                            case 28:
                            case 'end':
                                return _context10.stop();
                        }
                    }
                }, _callee10, this);
            }));

            function verify() {
                return _ref26.apply(this, arguments);
            }

            return verify;
        }()
    }]);

    return AppEdit;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(AppEdit , 'pages/AppEdit'));
