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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkFwcEVkaXQuanMiXSwibmFtZXMiOlsiaG9zdCIsInVwbG9hZEFwaSIsInByb3ZpbmNlQXBpIiwiY2l0eUFwaSIsImFwcGluZm9BcGkiLCJzYXZlQXBwQXBpIiwiQXBwRWRpdCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJjb21wb25lbnRzIiwiY3JvcHBlciIsIkNyb3BwZXIiLCJkYXRhIiwibG9nb1VybCIsImxvYWRpbmciLCJtcGlkIiwiYXJlYXMiLCJzZWxDaXR5SW5kZXgiLCJtYXJrZXJJZCIsImZvcm0iLCJjaXR5IiwicHJvdmluY2UiLCJ0ZW1wTG9nbyIsImNhdGVFZGl0YWJsZSIsImV2ZW50cyIsInRlbXBQYXRoIiwidXBsb2FkTG9nbyIsImNvbXB1dGVkIiwiZW5hYmxlU2F2ZSIsIm5pY2tOYW1lIiwiaGVhZEltZyIsInRlbHBob25lIiwiYWRkcmVzcyIsIm1hcmtlcnMiLCJpY29uUGF0aCIsImlkIiwibGF0aXR1ZGUiLCJhZGRyZXNzTGF0aXR1ZGUiLCJsb25naXR1ZGUiLCJhZGRyZXNzTG9uZ2l0dWRlIiwid2lkdGgiLCJoZWlnaHQiLCJtZXRob2RzIiwiYmluZENpdHkiLCJlIiwiZGV0YWlsIiwiY29sdW1uIiwidmFsdWUiLCJkaXNwTG9jYWxJRCIsImVyciIsInRvYXN0IiwiJGFwcGx5Iiwic2V0Q2l0eSIsImFyciIsImNpdHlJZHgiLCJzZWxDaXR5IiwibG9jYWxOYW1lIiwidXBkYXRlRm9ybSIsInByb3ZpbmNlTmFtZSIsImNpdHlOYW1lIiwic2V0TG9nbyIsIm5ldFN0YXR1cyIsIndlcHkiLCJjaG9vc2VJbWFnZSIsImNvdW50Iiwic2l6ZVR5cGUiLCJ0ZW1wRmlsZVBhdGhzIiwiY29uZmlybSIsIiRicm9hZGNhc3QiLCJjb25zb2xlIiwibG9nIiwic2V0QXBwTmFtZSIsInNldE1vYmlsZSIsInNldExvY2F0aW9uIiwiY2hvb3NlTG9jYXRpb24iLCJzZXREZXRhaWxBZHJlc3MiLCJiaW5kU2F2ZSIsInZlcmlmeSIsInNlbmREYXRhIiwibG9nbyIsIm1wbmFtZSIsInByaXZpbmNlIiwibGF0IiwibG50IiwiY2F0ZTEiLCJjYXRlMiIsImNhdGUzIiwicmVzIiwibXNnIiwibmF2aWdhdGVCYWNrIiwidXBsb2FkRmlsZSIsInVybCIsImZpbGVQYXRoIiwibmFtZSIsInJlc3BvbnNlIiwiSlNPTiIsInBhcnNlIiwic3RhdGUiLCJjb250ZW50IiwiZXJyTXNnIiwib3B0aW9ucyIsImdldFN0b3JhZ2VTeW5jIiwiZ2V0QXBwSW5mbyIsInJlY29yZEZpcnN0Q2F0ZVN0YXR1cyIsImdldExvY2F0aW9uIiwiZ2V0UHJvdmluY2VzIiwiZGVmYXVsdFNlbENpdHlJbmRleCIsInVwZGF0ZUNhdGVDaG9pY2UiLCJhcHBJbmZvIiwibXBTb3VyY2UiLCJ0b1N0cmluZyIsImdsb2JhbFNlcnZpY2UiLCJnZXQiLCJjYXRlMU5hbWUiLCJjYXRlMk5hbWUiLCJjYXRlM05hbWUiLCJldmVyeSIsInYiLCJwSW5kZXgiLCJjSW5kZXgiLCJpdGVtIiwiaSIsImxlbiIsImxlbmd0aCIsImluZGV4T2YiLCJ1bmRlZmluZWQiLCJPYmplY3QiLCJhc3NpZ24iLCJlMSIsImRhdGExIiwiZTIiLCJkYXRhMiIsInR5cGUiLCJwYXJhbXMiLCJ0aXRsZSIsImR1cmF0aW9uIiwic2hvd1RvYXN0IiwiaWNvbiIsInJlZ1Bob25lIiwidGVzdCIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsT0FBTyxzQkFBYjtBQUNBLElBQU1DLFlBQWVELElBQWYsZ0JBQU47QUFDQSxJQUFNRSxjQUFjLGtCQUFwQjtBQUNBLElBQU1DLFVBQVUsZUFBaEI7QUFDQSxJQUFNQyxhQUFhLGNBQW5CO0FBQ0EsSUFBTUMsYUFBYSx1QkFBbkI7O0lBRXFCQyxPOzs7Ozs7Ozs7Ozs7Ozs0TEFDakJDLE0sR0FBUztBQUNMQyxvQ0FBd0I7QUFEbkIsUyxRQUdUQyxVLEdBQWE7QUFDVEMscUJB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Ozs7Ozs7O0FBRVNHLHdDLEdBQVcsc0I7QUFDVHZILG9DLEdBQVMsS0FBS1AsSSxDQUFkTyxJOztvQ0FDSEEsS0FBS1csTzs7Ozs7QUFDTixxQ0FBS29CLEtBQUwsQ0FBVyxPQUFYO21FQUNPLEs7OztvQ0FFTi9CLEtBQUtVLFE7Ozs7O0FBQ04scUNBQUtxQixLQUFMLENBQVcsU0FBWDttRUFDTyxLOzs7c0NBRVAvQixLQUFLVSxRQUFMLENBQWM4RixNQUFkLEdBQXVCLEM7Ozs7O0FBQ3ZCLHFDQUFLekUsS0FBTCxDQUFXLGNBQVg7bUVBQ08sSzs7O29DQUVOL0IsS0FBS1ksUTs7Ozs7QUFDTixxQ0FBS21CLEtBQUwsQ0FBVyxRQUFYO21FQUNPLEs7OztzQ0FFUC9CLEtBQUtZLFFBQUwsQ0FBYzRGLE1BQWQsR0FBdUIsRUFBdkIsSUFBNkIsQ0FBQ2UsU0FBU0MsSUFBVCxDQUFjeEgsS0FBS1ksUUFBbkIsQzs7Ozs7O3VDQUN4QixzQkFBVSxRQUFWLEM7OzttRUFDQyxLOzs7b0NBRU5aLEtBQUtDLEk7Ozs7O0FBQ04scUNBQUs4QixLQUFMLENBQVcsTUFBWDttRUFDTyxLOzs7b0NBRU4vQixLQUFLYSxPOzs7OztBQUNOLHFDQUFLa0IsS0FBTCxDQUFXLFFBQVg7bUVBQ08sSzs7O3NDQUdQLENBQUMvQixLQUFLaUUsS0FBTixJQUFlLENBQUNqRSxLQUFLa0UsSzs7Ozs7QUFDckIscUNBQUtuQyxLQUFMLENBQVcsWUFBWDttRUFDTyxLOzs7bUVBRUosSTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQWpYc0JZLGVBQUs4RSxJOztrQkFBckJ0SSxPIiwiZmlsZSI6IkFwcEVkaXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuaW1wb3J0IENyb3BwZXIgZnJvbSAnLi4vY29tcG9uZW50cy9Dcm9wcGVyJztcbmltcG9ydCB7IHBpY1NyY0RvbWFpbiwgZmlsdGVyZW1vamksIHRvYXN0U3luYywgZ2xvYmFsU2VydmljZSwgYWxlcnRQLCBnZXROZXRTdGF0dXMgfSBmcm9tICcuLi91dGlscyc7XG5pbXBvcnQgeyBnZXQgfSBmcm9tICcuLi91dGlscy9hamF4UCc7XG5cbmNvbnN0IGhvc3QgPSAnaHR0cHM6Ly95YW9mYS41OC5jb20nO1xuY29uc3QgdXBsb2FkQXBpID0gYCR7aG9zdH0vZmlsZVVwbG9hZGA7XG5jb25zdCBwcm92aW5jZUFwaSA9ICcvbG9jYWwvcHJvdmluY2VzJztcbmNvbnN0IGNpdHlBcGkgPSAnL2xvY2FsL2NpdHlzLyc7XG5jb25zdCBhcHBpbmZvQXBpID0gJy9tcGxvZ2ljL2dldCc7XG5jb25zdCBzYXZlQXBwQXBpID0gJy9tcGxvZ2ljL21vZGlmeW1waW5mbyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFwcEVkaXQgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+Wwj+eoi+W6j+e8lui+kScsXG4gICAgfVxuICAgIGNvbXBvbmVudHMgPSB7XG4gICAgICAgIGNyb3BwZXI6IENyb3BwZXIsXG4gICAgfVxuICAgIGRhdGEgPSB7XG4gICAgICAgIGxvZ29Vcmw6ICcnLFxuICAgICAgICBsb2FkaW5nOiB0cnVlLFxuICAgICAgICBtcGlkOiAnJyxcbiAgICAgICAgYXJlYXM6IFtbXSwgW11dLFxuICAgICAgICBzZWxDaXR5SW5kZXg6IFswLCAwXSxcbiAgICAgICAgbWFya2VySWQ6IDAsXG4gICAgICAgIGZvcm06IHtcbiAgICAgICAgICAgIGNpdHk6ICcxJyxcbiAgICAgICAgICAgIHByb3ZpbmNlOiAnNTAwMScsXG4gICAgICAgIH0sXG4gICAgICAgIHRlbXBMb2dvOiAnJyxcbiAgICAgICAgY2F0ZUVkaXRhYmxlOiB0cnVlLCAvLyDmiYDlsZ7ooYzkuJrmmK/lkKblj6/ku6XnvJbovpFcbiAgICB9XG4gICAgZXZlbnRzID0ge1xuICAgICAgICAnYWZ0ZXItY3JvcCcodGVtcFBhdGgpIHtcbiAgICAgICAgICAgIHRoaXMudXBsb2FkTG9nbyh0ZW1wUGF0aCk7XG4gICAgICAgIH0sXG4gICAgfVxuICAgIGNvbXB1dGVkID0ge1xuICAgICAgICBlbmFibGVTYXZlICgpIHtcbiAgICAgICAgICAgIHJldHVybiAhISh0aGlzLmZvcm0ubmlja05hbWUgJiYgdGhpcy5mb3JtLmhlYWRJbWdcbiAgICAgICAgICAgICAgICAmJiB0aGlzLmZvcm0udGVscGhvbmUgJiYgdGhpcy5mb3JtLmNpdHkgJiYgdGhpcy5mb3JtLmFkZHJlc3MpO1xuICAgICAgICB9LFxuICAgICAgICBtYXJrZXJzICgpIHtcbiAgICAgICAgICAgIGNvbnN0IG1hcmtlcklkID0gdGhpcy5tYXJrZXJJZCArIDE7XG4gICAgICAgICAgICByZXR1cm4gW3tcbiAgICAgICAgICAgICAgICBpY29uUGF0aDogJy9wYWdlcy9hc3NldHMvbWFya2VyLnBuZycsXG4gICAgICAgICAgICAgICAgaWQ6IG1hcmtlcklkLFxuICAgICAgICAgICAgICAgIGxhdGl0dWRlOiB0aGlzLmZvcm0uYWRkcmVzc0xhdGl0dWRlIHx8ICcnLFxuICAgICAgICAgICAgICAgIGxvbmdpdHVkZTogdGhpcy5mb3JtLmFkZHJlc3NMb25naXR1ZGUgfHwgJycsXG4gICAgICAgICAgICAgICAgd2lkdGg6IDIyLFxuICAgICAgICAgICAgICAgIGhlaWdodDogMzIsXG4gICAgICAgICAgICB9XTtcbiAgICAgICAgfSxcbiAgICAgICAgbG9uZ2l0dWRlICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZvcm0uYWRkcmVzc0xvbmdpdHVkZTtcbiAgICAgICAgfSxcbiAgICAgICAgbGF0aXR1ZGUgKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZm9ybS5hZGRyZXNzTGF0aXR1ZGU7XG4gICAgICAgIH0sXG4gICAgfVxuXG4gICAgbWV0aG9kcyA9IHtcbiAgICAgICAgYXN5bmMgYmluZENpdHkgKGUpIHtcbiAgICAgICAgICAgIGNvbnN0IHsgY29sdW1uLCB2YWx1ZSB9ID0gZS5kZXRhaWw7XG4gICAgICAgICAgICBpZiAoY29sdW1uID09PSAxKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgeyBkaXNwTG9jYWxJRCB9ID0gdGhpcy5hcmVhc1swXVt2YWx1ZV07XG4gICAgICAgICAgICBjb25zdCBbZXJyLCBkYXRhXSA9IGF3YWl0IGdldChjaXR5QXBpICsgZGlzcExvY2FsSUQpO1xuICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgIHRoaXMudG9hc3QoZXJyKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmFyZWFzID0gW3RoaXMuYXJlYXNbMF0sIGRhdGFdO1xuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0Q2l0eSAoZSkge1xuICAgICAgICAgICAgY29uc3QgYXJyID0gZS5kZXRhaWwudmFsdWU7XG4gICAgICAgICAgICBjb25zdCBjaXR5SWR4ID0gYXJyWzFdICYmIDA7XG4gICAgICAgICAgICBjb25zdCBwcm92aW5jZSA9IHRoaXMuYXJlYXNbMF1bYXJyWzBdXTtcbiAgICAgICAgICAgIGNvbnN0IGNpdHkgPSB0aGlzLmFyZWFzWzFdW2NpdHlJZHhdO1xuICAgICAgICAgICAgdGhpcy5zZWxDaXR5ID0gW3Byb3ZpbmNlLmxvY2FsTmFtZSwgY2l0eS5sb2NhbE5hbWVdO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVGb3JtKHtcbiAgICAgICAgICAgICAgICBwcm92aW5jZTogcHJvdmluY2UuZGlzcExvY2FsSUQsXG4gICAgICAgICAgICAgICAgcHJvdmluY2VOYW1lOiBwcm92aW5jZS5sb2NhbE5hbWUsXG4gICAgICAgICAgICAgICAgY2l0eTogY2l0eS5kaXNwTG9jYWxJRCxcbiAgICAgICAgICAgICAgICBjaXR5TmFtZTogY2l0eS5sb2NhbE5hbWUsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgYXN5bmMgc2V0TG9nbyAoKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5ldFN0YXR1cyA9IGF3YWl0IGdldE5ldFN0YXR1cygpO1xuXG4gICAgICAgICAgICAgICAgaWYgKG5ldFN0YXR1cyA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICB0b2FzdFN5bmMoJ+aXoOe9kee7nCcpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY29uc3QgeyB0ZW1wRmlsZVBhdGhzIH0gPSBhd2FpdCB3ZXB5LmNob29zZUltYWdlKHtcbiAgICAgICAgICAgICAgICAgICAgY291bnQ6IDEsXG4gICAgICAgICAgICAgICAgICAgIHNpemVUeXBlOiAnY29tcHJlc3NlZCAnLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgY29uZmlybSB9ID0gYXdhaXQgYWxlcnRQKCfmmK/lkKboo4Hliarlm77niYfvvJ8nLCAn5o+Q56S6Jyk7XG5cbiAgICAgICAgICAgICAgICBpZiAoY29uZmlybSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLiRicm9hZGNhc3QoJ2Nyb3AtbG9hZEltYWdlJywgdGVtcEZpbGVQYXRoc1swXSwgJzEsMScsIHRydWUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBsb2FkTG9nbyh0ZW1wRmlsZVBhdGhzWzBdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHNldEFwcE5hbWUgKGUpIHtcbiAgICAgICAgICAgIGxldCBuaWNrTmFtZSA9IGUuZGV0YWlsLnZhbHVlO1xuICAgICAgICAgICAgbmlja05hbWUgPSBmaWx0ZXJlbW9qaShuaWNrTmFtZSk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUZvcm0oeyBuaWNrTmFtZSB9KTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IG5pY2tOYW1lLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0TW9iaWxlIChlKSB7XG4gICAgICAgICAgICBjb25zdCB0ZWxwaG9uZSA9IGUuZGV0YWlsLnZhbHVlO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVGb3JtKHsgdGVscGhvbmUgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIGFzeW5jIHNldExvY2F0aW9uICgpIHtcbiAgICAgICAgICAgIGNvbnN0IHsgYWRkcmVzcywgbGF0aXR1ZGUsIGxvbmdpdHVkZSB9ID0gYXdhaXQgd2VweS5jaG9vc2VMb2NhdGlvbigpO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVGb3JtKHsgYWRkcmVzcywgYWRkcmVzc0xhdGl0dWRlOiBsYXRpdHVkZSwgYWRkcmVzc0xvbmdpdHVkZTogbG9uZ2l0dWRlIH0pO1xuICAgICAgICB9LFxuICAgICAgICBzZXREZXRhaWxBZHJlc3MgKGUpIHtcbiAgICAgICAgICAgIGxldCBhZGRyZXNzID0gZS5kZXRhaWwudmFsdWU7XG4gICAgICAgICAgICBhZGRyZXNzID0gZmlsdGVyZW1vamkoYWRkcmVzcyk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUZvcm0oeyBhZGRyZXNzIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogYWRkcmVzcyxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0sXG4gICAgICAgIGFzeW5jIGJpbmRTYXZlICgpIHtcbiAgICAgICAgICAgIGNvbnN0IHsgZm9ybSB9ID0gdGhpcy5kYXRhO1xuICAgICAgICAgICAgY29uc3QgdmVyaWZ5ID0gYXdhaXQgdGhpcy52ZXJpZnkoKTtcbiAgICAgICAgICAgIGlmICghdmVyaWZ5KSByZXR1cm47XG4gICAgICAgICAgICBjb25zdCBzZW5kRGF0YSA9IHtcbiAgICAgICAgICAgICAgICBtcGlkOiB0aGlzLm1waWQsIC8vIOWwj+eoi+W6j2lkXG4gICAgICAgICAgICAgICAgbG9nbzogZm9ybS5oZWFkSW1nLCAvLyDlsI/nqIvluo9sb2dvIOWPquacieS8mOS6q+Wwj+eoi+W6j+iDveaUuVxuICAgICAgICAgICAgICAgIHRlbHBob25lOiBmb3JtLnRlbHBob25lLCAvLyDnlLXor51cbiAgICAgICAgICAgICAgICBtcG5hbWU6IGZvcm0ubmlja05hbWUsIC8vIOWwj+eoi+W6j+WQjeensCDlj6rmnInkvJjkuqvlsI/nqIvluo/og73mlLlcbiAgICAgICAgICAgICAgICBwcml2aW5jZTogZm9ybS5wcm92aW5jZSxcbiAgICAgICAgICAgICAgICBjaXR5OiBmb3JtLmNpdHksIC8vIOWfjuW4glxuICAgICAgICAgICAgICAgIGFkZHJlc3M6IGZvcm0uYWRkcmVzcywgLy8g5Zyw5Z2AXG4gICAgICAgICAgICAgICAgbGF0OiBmb3JtLmFkZHJlc3NMYXRpdHVkZSwgLy8g57qs5bqmXG4gICAgICAgICAgICAgICAgbG50OiBmb3JtLmFkZHJlc3NMb25naXR1ZGUsIC8vIOe7j+W6plxuICAgICAgICAgICAgICAgIGNhdGUxOiBmb3JtLmNhdGUxLCAvLyDmiYDlsZ7ooYzkuJrnrKzkuIDnuqdcbiAgICAgICAgICAgICAgICBjYXRlMjogZm9ybS5jYXRlMiwgLy8g5omA5bGe6KGM5Lia56ys5LqM57qnXG4gICAgICAgICAgICAgICAgY2F0ZTM6IGZvcm0uY2F0ZTMsIC8vIOaJgOWxnuihjOS4muesrOS4iee6p1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHNlbmREYXRhKTtcbiAgICAgICAgICAgIGNvbnN0IFtlLCByZXNdID0gYXdhaXQgZ2V0KHNhdmVBcHBBcGksIHNlbmREYXRhKTtcbiAgICAgICAgICAgIGlmIChlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50b2FzdChyZXMubXNnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKTtcbiAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlQmFjaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgIH1cblxuICAgIGFzeW5jIHVwbG9hZExvZ28odGVtcFBhdGgpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgd2VweS51cGxvYWRGaWxlKHtcbiAgICAgICAgICAgICAgICB1cmw6IHVwbG9hZEFwaSxcbiAgICAgICAgICAgICAgICBmaWxlUGF0aDogdGVtcFBhdGgsXG4gICAgICAgICAgICAgICAgbmFtZTogJ2NvbnRlbnQnLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjb25zdCByZXMgPSBKU09OLnBhcnNlKHJlc3BvbnNlLmRhdGEpO1xuICAgICAgICAgICAgY29uc3QgeyBzdGF0ZSwgbXNnLCBkYXRhIH0gPSByZXM7XG4gICAgICAgICAgICBpZiAoc3RhdGUgPT09IDEwMCkge1xuICAgICAgICAgICAgICAgIHRoaXMudGVtcExvZ28gPSB0ZW1wUGF0aDtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUZvcm0oeyBoZWFkSW1nOiBkYXRhLmNvbnRlbnQgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMudG9hc3QobXNnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoeyBlcnJNc2cgfSkge1xuICAgICAgICAgICAgdGhpcy50b2FzdChlcnJNc2cpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXN5bmMgb25Mb2FkIChvcHRpb25zKSB7XG4gICAgICAgIGNvbnN0IG1waWQgPSBvcHRpb25zLm1waWQgfHwgd2VweS5nZXRTdG9yYWdlU3luYygnY3VycmVudF9tcGlkJyk7XG4gICAgICAgIGlmICghbXBpZCkge1xuICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZUJhY2soKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm1waWQgPSBtcGlkO1xuICAgICAgICBhd2FpdCB0aGlzLmdldEFwcEluZm8odGhpcy5tcGlkKTtcbiAgICAgICAgdGhpcy5yZWNvcmRGaXJzdENhdGVTdGF0dXModGhpcy5mb3JtKTtcbiAgICAgICAgYXdhaXQgdGhpcy5nZXRMb2NhdGlvbigpO1xuICAgICAgICBhd2FpdCB0aGlzLmdldFByb3ZpbmNlcygpO1xuICAgICAgICB0aGlzLmRlZmF1bHRTZWxDaXR5SW5kZXgoKTtcbiAgICB9XG4gICAgb25TaG93ICgpIHtcbiAgICAgICAgdGhpcy51cGRhdGVDYXRlQ2hvaWNlKCk7XG4gICAgfVxuICAgIC8vIOiusOW9lemhtemdouWKoOi9veaYr+aJgOWxnuihjOS4muexu+WIq+e8lui+keeKtuaAgVxuICAgIC8vIOWmguaenOWwj+eoi+W6j+WxnuS6juWQjOmVh21wU291cmNlPSAz5LiU5omA5bGe6KGM5LiaY2F0ZTLkuLrnqbrliJnlj6/ku6XnvJbovpFcbiAgICAvLyDmiJbogIVtcFNvdXJjZSE9PTPliJnlj6/ku6XnvJbovpFcbiAgICByZWNvcmRGaXJzdENhdGVTdGF0dXMgKGFwcEluZm8pIHtcbiAgICAgICAgY29uc3QgeyBtcFNvdXJjZSwgY2F0ZTIgfSA9IGFwcEluZm87XG4gICAgICAgIGNvbnNvbGUubG9nKCdtcFNvdXJjZScsIG1wU291cmNlLCAnY2F0ZTInLCBjYXRlMik7XG4gICAgICAgIHRoaXMuY2F0ZUVkaXRhYmxlID0gISEobXBTb3VyY2UgJiYgbXBTb3VyY2UudG9TdHJpbmcoKSA9PT0gJzMnICYmICFjYXRlMilcbiAgICAgICAgICAgIHx8IChtcFNvdXJjZSAmJiBtcFNvdXJjZS50b1N0cmluZygpICE9PSAnMycpO1xuICAgIH1cbiAgICAvLyDmm7TmlrDmiYDlsZ7ooYzkuJrnsbvliKtcbiAgICB1cGRhdGVDYXRlQ2hvaWNlKCkge1xuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICBjYXRlMSA9ICcnLFxuICAgICAgICAgICAgY2F0ZTFOYW1lID0gJycsXG4gICAgICAgICAgICBjYXRlMiA9ICcnLFxuICAgICAgICAgICAgY2F0ZTJOYW1lID0gJycsXG4gICAgICAgICAgICBjYXRlMyA9ICcnLFxuICAgICAgICAgICAgY2F0ZTNOYW1lID0gJycsXG4gICAgICAgIH0gPSBnbG9iYWxTZXJ2aWNlLmdldCgnbXVsdGlTZWxlY3RvcicpO1xuXG4gICAgICAgIC8vIOajgOafpVxuICAgICAgICBpZiAoW2NhdGUxLCBjYXRlMiwgY2F0ZTNdLmV2ZXJ5KHYgPT4gdHlwZW9mIHYgIT09ICdudW1iZXInKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy51cGRhdGVGb3JtKHtcbiAgICAgICAgICAgIGNhdGUxLFxuICAgICAgICAgICAgY2F0ZTFOYW1lLFxuICAgICAgICAgICAgY2F0ZTIsXG4gICAgICAgICAgICBjYXRlMk5hbWUsXG4gICAgICAgICAgICBjYXRlMyxcbiAgICAgICAgICAgIGNhdGUzTmFtZSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8vIHVwZGF0ZUNhdGVDaG9pY2UgKCkge1xuICAgIC8vICAgICBpZiAoIXRoaXMuJHBhcmVudC5nbG9iYWxEYXRhIHx8ICF0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5jYXRlQ2hvb2ljZSkgcmV0dXJuO1xuICAgIC8vICAgICBjb25zdCBmb3JtID0ge307XG4gICAgLy8gICAgIGNvbnNvbGUubG9nKCdjYXRlQ2hvb2ljZTAnLCB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5jYXRlQ2hvb2ljZSk7XG4gICAgLy8gICAgIC8vIOS7juaJgOWxnuexu+ebruWAvOmAieaLqemhtemdoui/lOWbnumHjeaWsOi1i+WAvFxuICAgIC8vICAgICBjb25zdCBjYXRlQ2hvb2ljZSA9ICh0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YSAmJiB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5jYXRlQ2hvb2ljZSkgP1xuICAgIC8vICAgICAgICAgdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEuY2F0ZUNob29pY2UgOiBbe30sIHt9LCB7fV07XG4gICAgLy8gICAgIGNvbnNvbGUubG9nKCdjYXRlQ2hvb2ljZTEnLCBjYXRlQ2hvb2ljZSk7XG4gICAgLy8gICAgIGNhdGVDaG9vaWNlLm1hcCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAvLyAgICAgICAgIGZvcm1bYGNhdGUke2luZGV4ICsgMX1gXSA9IGl0ZW0uY2F0ZUlkIHx8ICcnO1xuICAgIC8vICAgICAgICAgZm9ybVtgY2F0ZSR7aW5kZXggKyAxfU5hbWVgXSA9IGl0ZW0ubmFtZSB8fCAnJztcbiAgICAvLyAgICAgICAgIHJldHVybiBpdGVtO1xuICAgIC8vICAgICB9KTtcbiAgICAvLyAgICAgLy8g5pu05paw5a6M5oiQ5Yig6Zmk5YWo5bGA5omA5bGe57G755uu5a2X5q61Y2F0ZUNob29pY2VcbiAgICAvLyAgICAgdGhpcy4kcGFyZW50Lmdsb2JhbERhdGFcbiAgICAvLyAgICAgICAgICYmIHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLmNhdGVDaG9vaWNlXG4gICAgLy8gICAgICAgICAmJiAodGhpcy4kcGFyZW50Lmdsb2JhbERhdGEuY2F0ZUNob29pY2UgPSB1bmRlZmluZWQpO1xuICAgIC8vICAgICB0aGlzLnVwZGF0ZUZvcm0oZm9ybSk7XG4gICAgLy8gfVxuICAgIGRlZmF1bHRTZWxDaXR5SW5kZXggKCkge1xuICAgICAgICBjb25zdCB7IGNpdHksIHByb3ZpbmNlIH0gPSB0aGlzLmZvcm07XG4gICAgICAgIGxldCBwSW5kZXggPSAwO1xuICAgICAgICBsZXQgY0luZGV4ID0gMDtcbiAgICAgICAgbGV0IGl0ZW07XG4gICAgICAgIGlmIChwcm92aW5jZSkge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHRoaXMuYXJlYXNbMF0ubGVuZ3RoOyBpIDwgbGVuOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgICBpdGVtID0gdGhpcy5hcmVhc1swXVtpXTtcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5kaXNwTG9jYWxJRCA9PT0gcHJvdmluY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgcEluZGV4ID0gaTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChjaXR5KSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gdGhpcy5hcmVhc1sxXS5sZW5ndGg7IGkgPCBsZW47IGkgKz0gMSkge1xuICAgICAgICAgICAgICAgIGl0ZW0gPSB0aGlzLmFyZWFzWzFdW2ldO1xuICAgICAgICAgICAgICAgIGlmIChpdGVtLmRpc3BMb2NhbElEID09PSBwcm92aW5jZSkge1xuICAgICAgICAgICAgICAgICAgICBjSW5kZXggPSBpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZWxDaXR5SW5kZXggPSBbcEluZGV4LCBjSW5kZXhdO1xuICAgICAgICB0aGlzLnVwZGF0ZUZvcm0oe1xuICAgICAgICAgICAgY2l0eTogdGhpcy5hcmVhc1sxXVtjSW5kZXhdLmRpc3BMb2NhbElELFxuICAgICAgICAgICAgY2l0eU5hbWU6IHRoaXMuYXJlYXNbMV1bY0luZGV4XS5sb2NhbE5hbWUsXG4gICAgICAgICAgICBwcm92aW5jZTogdGhpcy5hcmVhc1swXVtwSW5kZXhdLmRpc3BMb2NhbElELFxuICAgICAgICAgICAgcHJvdmluY2VOYW1lOiB0aGlzLmFyZWFzWzBdW3BJbmRleF0ubG9jYWxOYW1lLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB1cGRhdGVGb3JtIChkYXRhKSB7XG4gICAgICAgIGNvbnN0IHJlcyA9IGRhdGE7XG4gICAgICAgIGNvbnN0IHsgZm9ybSB9ID0gdGhpcy5kYXRhO1xuICAgICAgICAvLyDlpLTlg49cbiAgICAgICAgaWYgKHJlcy5oZWFkSW1nID09PSAnJyB8fCByZXMuaGVhZEltZykge1xuICAgICAgICAgICAgbGV0IHsgaGVhZEltZyA9ICdodHRwczovL3BpYzguNThjZG4uY29tLmNuL2Jpem1wL25fdjI4NWQ2YTE2ZDcyNWE0NDY2OTRkYjM1ZGYyM2M5ZGIyNC5wbmc/dz03MiZoPTcyJyB9ID0gcmVzO1xuICAgICAgICAgICAgaGVhZEltZyA9IHRoaXMudGVtcExvZ28gfHwgaGVhZEltZztcbiAgICAgICAgICAgIGlmIChoZWFkSW1nLmluZGV4T2YoJ2h0dHAnKSA8IDAgJiYgaGVhZEltZy5pbmRleE9mKCdmaWxlOicpIDwgMCkge1xuICAgICAgICAgICAgICAgIGhlYWRJbWcgPSBgJHtwaWNTcmNEb21haW4oKSArIGhlYWRJbWd9P3c9NzImaD03MmA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmxvZ29VcmwgPSBoZWFkSW1nO1xuICAgICAgICB9XG4gICAgICAgIC8vIOe7j+e6rOW6pu+8jOi/h+a7pOepuui1i+WAvFxuICAgICAgICBpZiAocmVzLmFkZHJlc3NMYXRpdHVkZSAhPT0gdW5kZWZpbmVkICYmIHJlcy5hZGRyZXNzTGF0aXR1ZGUgPT09ICcnKSB7XG4gICAgICAgICAgICBkZWxldGUgcmVzLmFkZHJlc3NMYXRpdHVkZTtcbiAgICAgICAgICAgIGRlbGV0ZSByZXMuYWRkcmVzc0xvbmdpdHVkZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmZvcm0gPSBPYmplY3QuYXNzaWduKHt9LCBmb3JtLCB7IC4uLnJlcyB9KTtcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICB9XG4gICAgYXN5bmMgZ2V0UHJvdmluY2VzICgpIHtcbiAgICAgICAgY29uc3QgW2UxLCBkYXRhMV0gPSBhd2FpdCBnZXQocHJvdmluY2VBcGkpO1xuICAgICAgICBpZiAoZTEpIHtcbiAgICAgICAgICAgIHRoaXMudG9hc3QoZTEpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHByb3ZpbmNlID0gdGhpcy5mb3JtLnByb3ZpbmNlIHx8ICc1MDAxJztcbiAgICAgICAgY29uc3QgW2UyLCBkYXRhMl0gPSBhd2FpdCBnZXQoY2l0eUFwaSArIHByb3ZpbmNlKTtcbiAgICAgICAgaWYgKGUyKSB7XG4gICAgICAgICAgICB0aGlzLnRvYXN0KGUyKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZygncHJvdmluY2VzJywgZGF0YTEsICdjaXR5cycsIGRhdGEyKTtcbiAgICAgICAgdGhpcy5hcmVhcyA9IFtkYXRhMSwgZGF0YTJdO1xuICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICB9XG4gICAgYXN5bmMgZ2V0TG9jYXRpb24gKCkge1xuICAgICAgICBjb25zdCB7IGxhdGl0dWRlLCBsb25naXR1ZGUgfSA9IGF3YWl0IHdlcHkuZ2V0TG9jYXRpb24oeyB0eXBlOiAnd2dzODQnIH0pO1xuICAgICAgICBpZiAodGhpcy5mb3JtLmFkZHJlc3NMYXRpdHVkZSkgcmV0dXJuO1xuICAgICAgICB0aGlzLnVwZGF0ZUZvcm0oeyBhZGRyZXNzTGF0aXR1ZGU6IGxhdGl0dWRlLCBhZGRyZXNzTG9uZ2l0dWRlOiBsb25naXR1ZGUgfSk7XG4gICAgfVxuICAgIGFzeW5jIGdldEFwcEluZm8gKG1waWQpIHtcbiAgICAgICAgY29uc3QgW2UsIGRhdGFdID0gYXdhaXQgZ2V0KGAke2FwcGluZm9BcGl9LyR7bXBpZH1gKTtcbiAgICAgICAgaWYgKGUpIHtcbiAgICAgICAgICAgIHRoaXMudG9hc3QoZSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy51cGRhdGVGb3JtKHsgLi4uZGF0YSB9KTtcbiAgICB9XG4gICAgdG9hc3QgKC4uLnBhcmFtcykge1xuICAgICAgICBjb25zdCBbdGl0bGUsIGR1cmF0aW9uID0gMjAwMF0gPSBwYXJhbXM7XG4gICAgICAgIHJldHVybiB3ZXB5LnNob3dUb2FzdCh7XG4gICAgICAgICAgICB0aXRsZSxcbiAgICAgICAgICAgIGljb246ICdub25lJyxcbiAgICAgICAgICAgIGR1cmF0aW9uLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgYXN5bmMgdmVyaWZ5ICgpIHtcbiAgICAgICAgY29uc3QgcmVnUGhvbmUgPSAvXjFbMzQ1Njc4OV1bMC05XXs5fSQvO1xuICAgICAgICBjb25zdCB7IGZvcm0gfSA9IHRoaXMuZGF0YTtcbiAgICAgICAgaWYgKCFmb3JtLmhlYWRJbWcpIHtcbiAgICAgICAgICAgIHRoaXMudG9hc3QoJ+ivt+WujOWWhOS/oeaBrycpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmICghZm9ybS5uaWNrTmFtZSkge1xuICAgICAgICAgICAgdGhpcy50b2FzdCgn6L6T5YWl5bCP56iL5bqP5ZCN56ewJyk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGZvcm0ubmlja05hbWUubGVuZ3RoIDwgNCkge1xuICAgICAgICAgICAgdGhpcy50b2FzdCgn5bCP56iL5bqP5ZCN56ew5LiN5b6X5bCP5LqONOS4quWtlycpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmICghZm9ybS50ZWxwaG9uZSkge1xuICAgICAgICAgICAgdGhpcy50b2FzdCgn6L6T5YWl6IGU57O755S16K+dJyk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGZvcm0udGVscGhvbmUubGVuZ3RoIDwgMTEgJiYgIXJlZ1Bob25lLnRlc3QoZm9ybS50ZWxwaG9uZSkpIHtcbiAgICAgICAgICAgIGF3YWl0IHRvYXN0U3luYygn5omL5py65Y+35LiN5q2j56GuJyk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFmb3JtLmNpdHkpIHtcbiAgICAgICAgICAgIHRoaXMudG9hc3QoJ+mAieaLqeWfjuW4gicpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmICghZm9ybS5hZGRyZXNzKSB7XG4gICAgICAgICAgICB0aGlzLnRvYXN0KCfovpPlhaXor6bmg4XlnLDlnYAnKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICAvLyDmiYDlsZ7ooYzkuJroh7PlsJHpgInmi6nkuKTpoblcbiAgICAgICAgaWYgKCFmb3JtLmNhdGUxIHx8ICFmb3JtLmNhdGUyKSB7XG4gICAgICAgICAgICB0aGlzLnRvYXN0KCfmiYDlsZ7ooYzkuJroh7PlsJHpgInmi6nkuKTpobknKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG59XG4iXX0=