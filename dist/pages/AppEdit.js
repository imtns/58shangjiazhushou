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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkFwcEVkaXQuanMiXSwibmFtZXMiOlsiaG9zdCIsInVwbG9hZEFwaSIsInByb3ZpbmNlQXBpIiwiY2l0eUFwaSIsImFwcGluZm9BcGkiLCJzYXZlQXBwQXBpIiwiQXBwRWRpdCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJjb21wb25lbnRzIiwiY3JvcHBlciIsIkNyb3BwZXIiLCJkYXRhIiwibG9nb1VybCIsImxvYWRpbmciLCJtcGlkIiwiYXJlYXMiLCJzZWxDaXR5SW5kZXgiLCJtYXJrZXJJZCIsImZvcm0iLCJjaXR5IiwicHJvdmluY2UiLCJ0ZW1wTG9nbyIsImNhdGVFZGl0YWJsZSIsImV2ZW50cyIsInRlbXBQYXRoIiwidXBsb2FkTG9nbyIsImNvbXB1dGVkIiwiZW5hYmxlU2F2ZSIsIm5pY2tOYW1lIiwiaGVhZEltZyIsInRlbHBob25lIiwiYWRkcmVzcyIsIm1hcmtlcnMiLCJpY29uUGF0aCIsImlkIiwibGF0aXR1ZGUiLCJhZGRyZXNzTGF0aXR1ZGUiLCJsb25naXR1ZGUiLCJhZGRyZXNzTG9uZ2l0dWRlIiwid2lkdGgiLCJoZWlnaHQiLCJtZXRob2RzIiwiYmluZENpdHkiLCJlIiwiZGV0YWlsIiwiY29sdW1uIiwidmFsdWUiLCJkaXNwTG9jYWxJRCIsImVyciIsInRvYXN0IiwiJGFwcGx5Iiwic2V0Q2l0eSIsImFyciIsImNpdHlJZHgiLCJzZWxDaXR5IiwibG9jYWxOYW1lIiwidXBkYXRlRm9ybSIsInByb3ZpbmNlTmFtZSIsImNpdHlOYW1lIiwic2V0TG9nbyIsIm5ldFN0YXR1cyIsIndlcHkiLCJjaG9vc2VJbWFnZSIsImNvdW50Iiwic2l6ZVR5cGUiLCJ0ZW1wRmlsZVBhdGhzIiwiY29uZmlybSIsIiRicm9hZGNhc3QiLCJjb25zb2xlIiwibG9nIiwic2V0QXBwTmFtZSIsInNldE1vYmlsZSIsInNldExvY2F0aW9uIiwiY2hvb3NlTG9jYXRpb24iLCJzZXREZXRhaWxBZHJlc3MiLCJiaW5kU2F2ZSIsInZlcmlmeSIsInNlbmREYXRhIiwibG9nbyIsIm1wbmFtZSIsInByaXZpbmNlIiwibGF0IiwibG50IiwiY2F0ZTEiLCJjYXRlMiIsImNhdGUzIiwicmVzIiwibXNnIiwibmF2aWdhdGVCYWNrIiwidXBsb2FkRmlsZSIsInVybCIsImZpbGVQYXRoIiwibmFtZSIsInJlc3BvbnNlIiwiSlNPTiIsInBhcnNlIiwic3RhdGUiLCJjb250ZW50IiwiZXJyTXNnIiwib3B0aW9ucyIsImdldFN0b3JhZ2VTeW5jIiwiZ2V0QXBwSW5mbyIsInJlY29yZEZpcnN0Q2F0ZVN0YXR1cyIsImdldExvY2F0aW9uIiwiZ2V0UHJvdmluY2VzIiwiZGVmYXVsdFNlbENpdHlJbmRleCIsInVwZGF0ZUNhdGVDaG9pY2UiLCJhcHBJbmZvIiwibXBTb3VyY2UiLCJ0b1N0cmluZyIsImdsb2JhbFNlcnZpY2UiLCJnZXQiLCJjYXRlMU5hbWUiLCJjYXRlMk5hbWUiLCJjYXRlM05hbWUiLCJldmVyeSIsInYiLCJwSW5kZXgiLCJjSW5kZXgiLCJpdGVtIiwiaSIsImxlbiIsImxlbmd0aCIsImluZGV4T2YiLCJ1bmRlZmluZWQiLCJPYmplY3QiLCJhc3NpZ24iLCJlMSIsImRhdGExIiwiZTIiLCJkYXRhMiIsInR5cGUiLCJwYXJhbXMiLCJ0aXRsZSIsImR1cmF0aW9uIiwic2hvd1RvYXN0IiwiaWNvbiIsInJlZ1Bob25lIiwidGVzdCIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsT0FBTyxzQkFBYjtBQUNBLElBQU1DLFlBQWVELElBQWYsZ0JBQU47QUFDQSxJQUFNRSxjQUFjLGtCQUFwQjtBQUNBLElBQU1DLFVBQVUsZUFBaEI7QUFDQSxJQUFNQyxhQUFhLGNBQW5CO0FBQ0EsSUFBTUMsYUFBYSx1QkFBbkI7O0lBRXFCQyxPOzs7Ozs7Ozs7Ozs7Ozs0TEFDakJDLE0sR0FBUztBQUNMQyxvQ0FBd0I7QUFEbkIsUyxRQUdUQyxVLEdBQWE7QUFDVEMscUJB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Ozs7Ozs7O0FBRVNHLHdDLEdBQVcsc0I7QUFDVHZILG9DLEdBQVMsS0FBS1AsSSxDQUFkTyxJOztvQ0FDSEEsS0FBS1csTzs7Ozs7QUFDTixxQ0FBS29CLEtBQUwsQ0FBVyxPQUFYO21FQUNPLEs7OztvQ0FFTi9CLEtBQUtVLFE7Ozs7O0FBQ04scUNBQUtxQixLQUFMLENBQVcsU0FBWDttRUFDTyxLOzs7c0NBRVAvQixLQUFLVSxRQUFMLENBQWM4RixNQUFkLEdBQXVCLEM7Ozs7O0FBQ3ZCLHFDQUFLekUsS0FBTCxDQUFXLGNBQVg7bUVBQ08sSzs7O29DQUVOL0IsS0FBS1ksUTs7Ozs7QUFDTixxQ0FBS21CLEtBQUwsQ0FBVyxRQUFYO21FQUNPLEs7OztzQ0FFUC9CLEtBQUtZLFFBQUwsQ0FBYzRGLE1BQWQsR0FBdUIsRUFBdkIsSUFBNkIsQ0FBQ2UsU0FBU0MsSUFBVCxDQUFjeEgsS0FBS1ksUUFBbkIsQzs7Ozs7O3VDQUN4QixzQkFBVSxRQUFWLEM7OzttRUFDQyxLOzs7b0NBRU5aLEtBQUtDLEk7Ozs7O0FBQ04scUNBQUs4QixLQUFMLENBQVcsTUFBWDttRUFDTyxLOzs7b0NBRU4vQixLQUFLYSxPOzs7OztBQUNOLHFDQUFLa0IsS0FBTCxDQUFXLFFBQVg7bUVBQ08sSzs7O3NDQUdQLENBQUMvQixLQUFLaUUsS0FBTixJQUFlLENBQUNqRSxLQUFLa0UsSzs7Ozs7QUFDckIscUNBQUtuQyxLQUFMLENBQVcsWUFBWDttRUFDTyxLOzs7bUVBRUosSTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQWpYc0JZLGVBQUs4RSxJOztrQkFBckJ0SSxPIiwiZmlsZSI6IkFwcEVkaXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XHJcbmltcG9ydCBDcm9wcGVyIGZyb20gJy4uL2NvbXBvbmVudHMvQ3JvcHBlcic7XHJcbmltcG9ydCB7IHBpY1NyY0RvbWFpbiwgZmlsdGVyZW1vamksIHRvYXN0U3luYywgZ2xvYmFsU2VydmljZSwgYWxlcnRQLCBnZXROZXRTdGF0dXMgfSBmcm9tICcuLi91dGlscyc7XHJcbmltcG9ydCB7IGdldCB9IGZyb20gJy4uL3V0aWxzL2FqYXhQJztcclxuXHJcbmNvbnN0IGhvc3QgPSAnaHR0cHM6Ly95YW9mYS41OC5jb20nO1xyXG5jb25zdCB1cGxvYWRBcGkgPSBgJHtob3N0fS9maWxlVXBsb2FkYDtcclxuY29uc3QgcHJvdmluY2VBcGkgPSAnL2xvY2FsL3Byb3ZpbmNlcyc7XHJcbmNvbnN0IGNpdHlBcGkgPSAnL2xvY2FsL2NpdHlzLyc7XHJcbmNvbnN0IGFwcGluZm9BcGkgPSAnL21wbG9naWMvZ2V0JztcclxuY29uc3Qgc2F2ZUFwcEFwaSA9ICcvbXBsb2dpYy9tb2RpZnltcGluZm8nO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBwRWRpdCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgICBjb25maWcgPSB7XHJcbiAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+Wwj+eoi+W6j+e8lui+kScsXHJcbiAgICB9XHJcbiAgICBjb21wb25lbnRzID0ge1xyXG4gICAgICAgIGNyb3BwZXI6IENyb3BwZXIsXHJcbiAgICB9XHJcbiAgICBkYXRhID0ge1xyXG4gICAgICAgIGxvZ29Vcmw6ICcnLFxyXG4gICAgICAgIGxvYWRpbmc6IHRydWUsXHJcbiAgICAgICAgbXBpZDogJycsXHJcbiAgICAgICAgYXJlYXM6IFtbXSwgW11dLFxyXG4gICAgICAgIHNlbENpdHlJbmRleDogWzAsIDBdLFxyXG4gICAgICAgIG1hcmtlcklkOiAwLFxyXG4gICAgICAgIGZvcm06IHtcclxuICAgICAgICAgICAgY2l0eTogJzEnLFxyXG4gICAgICAgICAgICBwcm92aW5jZTogJzUwMDEnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdGVtcExvZ286ICcnLFxyXG4gICAgICAgIGNhdGVFZGl0YWJsZTogdHJ1ZSwgLy8g5omA5bGe6KGM5Lia5piv5ZCm5Y+v5Lul57yW6L6RXHJcbiAgICB9XHJcbiAgICBldmVudHMgPSB7XHJcbiAgICAgICAgJ2FmdGVyLWNyb3AnKHRlbXBQYXRoKSB7XHJcbiAgICAgICAgICAgIHRoaXMudXBsb2FkTG9nbyh0ZW1wUGF0aCk7XHJcbiAgICAgICAgfSxcclxuICAgIH1cclxuICAgIGNvbXB1dGVkID0ge1xyXG4gICAgICAgIGVuYWJsZVNhdmUgKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gISEodGhpcy5mb3JtLm5pY2tOYW1lICYmIHRoaXMuZm9ybS5oZWFkSW1nXHJcbiAgICAgICAgICAgICAgICAmJiB0aGlzLmZvcm0udGVscGhvbmUgJiYgdGhpcy5mb3JtLmNpdHkgJiYgdGhpcy5mb3JtLmFkZHJlc3MpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbWFya2VycyAoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG1hcmtlcklkID0gdGhpcy5tYXJrZXJJZCArIDE7XHJcbiAgICAgICAgICAgIHJldHVybiBbe1xyXG4gICAgICAgICAgICAgICAgaWNvblBhdGg6ICcvcGFnZXMvYXNzZXRzL21hcmtlci5wbmcnLFxyXG4gICAgICAgICAgICAgICAgaWQ6IG1hcmtlcklkLFxyXG4gICAgICAgICAgICAgICAgbGF0aXR1ZGU6IHRoaXMuZm9ybS5hZGRyZXNzTGF0aXR1ZGUgfHwgJycsXHJcbiAgICAgICAgICAgICAgICBsb25naXR1ZGU6IHRoaXMuZm9ybS5hZGRyZXNzTG9uZ2l0dWRlIHx8ICcnLFxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDIyLFxyXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAzMixcclxuICAgICAgICAgICAgfV07XHJcbiAgICAgICAgfSxcclxuICAgICAgICBsb25naXR1ZGUgKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5mb3JtLmFkZHJlc3NMb25naXR1ZGU7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBsYXRpdHVkZSAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZvcm0uYWRkcmVzc0xhdGl0dWRlO1xyXG4gICAgICAgIH0sXHJcbiAgICB9XHJcblxyXG4gICAgbWV0aG9kcyA9IHtcclxuICAgICAgICBhc3luYyBiaW5kQ2l0eSAoZSkge1xyXG4gICAgICAgICAgICBjb25zdCB7IGNvbHVtbiwgdmFsdWUgfSA9IGUuZGV0YWlsO1xyXG4gICAgICAgICAgICBpZiAoY29sdW1uID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3QgeyBkaXNwTG9jYWxJRCB9ID0gdGhpcy5hcmVhc1swXVt2YWx1ZV07XHJcbiAgICAgICAgICAgIGNvbnN0IFtlcnIsIGRhdGFdID0gYXdhaXQgZ2V0KGNpdHlBcGkgKyBkaXNwTG9jYWxJRCk7XHJcbiAgICAgICAgICAgIGlmIChlcnIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudG9hc3QoZXJyKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmFyZWFzID0gW3RoaXMuYXJlYXNbMF0sIGRhdGFdO1xyXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2V0Q2l0eSAoZSkge1xyXG4gICAgICAgICAgICBjb25zdCBhcnIgPSBlLmRldGFpbC52YWx1ZTtcclxuICAgICAgICAgICAgY29uc3QgY2l0eUlkeCA9IGFyclsxXSAmJiAwO1xyXG4gICAgICAgICAgICBjb25zdCBwcm92aW5jZSA9IHRoaXMuYXJlYXNbMF1bYXJyWzBdXTtcclxuICAgICAgICAgICAgY29uc3QgY2l0eSA9IHRoaXMuYXJlYXNbMV1bY2l0eUlkeF07XHJcbiAgICAgICAgICAgIHRoaXMuc2VsQ2l0eSA9IFtwcm92aW5jZS5sb2NhbE5hbWUsIGNpdHkubG9jYWxOYW1lXTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVGb3JtKHtcclxuICAgICAgICAgICAgICAgIHByb3ZpbmNlOiBwcm92aW5jZS5kaXNwTG9jYWxJRCxcclxuICAgICAgICAgICAgICAgIHByb3ZpbmNlTmFtZTogcHJvdmluY2UubG9jYWxOYW1lLFxyXG4gICAgICAgICAgICAgICAgY2l0eTogY2l0eS5kaXNwTG9jYWxJRCxcclxuICAgICAgICAgICAgICAgIGNpdHlOYW1lOiBjaXR5LmxvY2FsTmFtZSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBhc3luYyBzZXRMb2dvICgpIHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG5ldFN0YXR1cyA9IGF3YWl0IGdldE5ldFN0YXR1cygpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChuZXRTdGF0dXMgPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0b2FzdFN5bmMoJ+aXoOe9kee7nCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCB7IHRlbXBGaWxlUGF0aHMgfSA9IGF3YWl0IHdlcHkuY2hvb3NlSW1hZ2Uoe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvdW50OiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIHNpemVUeXBlOiAnY29tcHJlc3NlZCAnLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB7IGNvbmZpcm0gfSA9IGF3YWl0IGFsZXJ0UCgn5piv5ZCm6KOB5Ymq5Zu+54mH77yfJywgJ+aPkOekuicpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChjb25maXJtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kYnJvYWRjYXN0KCdjcm9wLWxvYWRJbWFnZScsIHRlbXBGaWxlUGF0aHNbMF0sICcxLDEnLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGxvYWRMb2dvKHRlbXBGaWxlUGF0aHNbMF0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2V0QXBwTmFtZSAoZSkge1xyXG4gICAgICAgICAgICBsZXQgbmlja05hbWUgPSBlLmRldGFpbC52YWx1ZTtcclxuICAgICAgICAgICAgbmlja05hbWUgPSBmaWx0ZXJlbW9qaShuaWNrTmFtZSk7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlRm9ybSh7IG5pY2tOYW1lIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IG5pY2tOYW1lLFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2V0TW9iaWxlIChlKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRlbHBob25lID0gZS5kZXRhaWwudmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlRm9ybSh7IHRlbHBob25lIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYXN5bmMgc2V0TG9jYXRpb24gKCkge1xyXG4gICAgICAgICAgICBjb25zdCB7IGFkZHJlc3MsIGxhdGl0dWRlLCBsb25naXR1ZGUgfSA9IGF3YWl0IHdlcHkuY2hvb3NlTG9jYXRpb24oKTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVGb3JtKHsgYWRkcmVzcywgYWRkcmVzc0xhdGl0dWRlOiBsYXRpdHVkZSwgYWRkcmVzc0xvbmdpdHVkZTogbG9uZ2l0dWRlIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2V0RGV0YWlsQWRyZXNzIChlKSB7XHJcbiAgICAgICAgICAgIGxldCBhZGRyZXNzID0gZS5kZXRhaWwudmFsdWU7XHJcbiAgICAgICAgICAgIGFkZHJlc3MgPSBmaWx0ZXJlbW9qaShhZGRyZXNzKTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVGb3JtKHsgYWRkcmVzcyB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBhZGRyZXNzLFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYXN5bmMgYmluZFNhdmUgKCkge1xyXG4gICAgICAgICAgICBjb25zdCB7IGZvcm0gfSA9IHRoaXMuZGF0YTtcclxuICAgICAgICAgICAgY29uc3QgdmVyaWZ5ID0gYXdhaXQgdGhpcy52ZXJpZnkoKTtcclxuICAgICAgICAgICAgaWYgKCF2ZXJpZnkpIHJldHVybjtcclxuICAgICAgICAgICAgY29uc3Qgc2VuZERhdGEgPSB7XHJcbiAgICAgICAgICAgICAgICBtcGlkOiB0aGlzLm1waWQsIC8vIOWwj+eoi+W6j2lkXHJcbiAgICAgICAgICAgICAgICBsb2dvOiBmb3JtLmhlYWRJbWcsIC8vIOWwj+eoi+W6j2xvZ28g5Y+q5pyJ5LyY5Lqr5bCP56iL5bqP6IO95pS5XHJcbiAgICAgICAgICAgICAgICB0ZWxwaG9uZTogZm9ybS50ZWxwaG9uZSwgLy8g55S16K+dXHJcbiAgICAgICAgICAgICAgICBtcG5hbWU6IGZvcm0ubmlja05hbWUsIC8vIOWwj+eoi+W6j+WQjeensCDlj6rmnInkvJjkuqvlsI/nqIvluo/og73mlLlcclxuICAgICAgICAgICAgICAgIHByaXZpbmNlOiBmb3JtLnByb3ZpbmNlLFxyXG4gICAgICAgICAgICAgICAgY2l0eTogZm9ybS5jaXR5LCAvLyDln47luIJcclxuICAgICAgICAgICAgICAgIGFkZHJlc3M6IGZvcm0uYWRkcmVzcywgLy8g5Zyw5Z2AXHJcbiAgICAgICAgICAgICAgICBsYXQ6IGZvcm0uYWRkcmVzc0xhdGl0dWRlLCAvLyDnuqzluqZcclxuICAgICAgICAgICAgICAgIGxudDogZm9ybS5hZGRyZXNzTG9uZ2l0dWRlLCAvLyDnu4/luqZcclxuICAgICAgICAgICAgICAgIGNhdGUxOiBmb3JtLmNhdGUxLCAvLyDmiYDlsZ7ooYzkuJrnrKzkuIDnuqdcclxuICAgICAgICAgICAgICAgIGNhdGUyOiBmb3JtLmNhdGUyLCAvLyDmiYDlsZ7ooYzkuJrnrKzkuoznuqdcclxuICAgICAgICAgICAgICAgIGNhdGUzOiBmb3JtLmNhdGUzLCAvLyDmiYDlsZ7ooYzkuJrnrKzkuInnuqdcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coc2VuZERhdGEpO1xyXG4gICAgICAgICAgICBjb25zdCBbZSwgcmVzXSA9IGF3YWl0IGdldChzYXZlQXBwQXBpLCBzZW5kRGF0YSk7XHJcbiAgICAgICAgICAgIGlmIChlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvYXN0KHJlcy5tc2cpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKTtcclxuICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVCYWNrKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIHVwbG9hZExvZ28odGVtcFBhdGgpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHdlcHkudXBsb2FkRmlsZSh7XHJcbiAgICAgICAgICAgICAgICB1cmw6IHVwbG9hZEFwaSxcclxuICAgICAgICAgICAgICAgIGZpbGVQYXRoOiB0ZW1wUGF0aCxcclxuICAgICAgICAgICAgICAgIG5hbWU6ICdjb250ZW50JyxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlcyA9IEpTT04ucGFyc2UocmVzcG9uc2UuZGF0YSk7XHJcbiAgICAgICAgICAgIGNvbnN0IHsgc3RhdGUsIG1zZywgZGF0YSB9ID0gcmVzO1xyXG4gICAgICAgICAgICBpZiAoc3RhdGUgPT09IDEwMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50ZW1wTG9nbyA9IHRlbXBQYXRoO1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVGb3JtKHsgaGVhZEltZzogZGF0YS5jb250ZW50IH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50b2FzdChtc2cpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBjYXRjaCAoeyBlcnJNc2cgfSkge1xyXG4gICAgICAgICAgICB0aGlzLnRvYXN0KGVyck1zZyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIG9uTG9hZCAob3B0aW9ucykge1xyXG4gICAgICAgIGNvbnN0IG1waWQgPSBvcHRpb25zLm1waWQgfHwgd2VweS5nZXRTdG9yYWdlU3luYygnY3VycmVudF9tcGlkJyk7XHJcbiAgICAgICAgaWYgKCFtcGlkKSB7XHJcbiAgICAgICAgICAgIHdlcHkubmF2aWdhdGVCYWNrKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubXBpZCA9IG1waWQ7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5nZXRBcHBJbmZvKHRoaXMubXBpZCk7XHJcbiAgICAgICAgdGhpcy5yZWNvcmRGaXJzdENhdGVTdGF0dXModGhpcy5mb3JtKTtcclxuICAgICAgICBhd2FpdCB0aGlzLmdldExvY2F0aW9uKCk7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5nZXRQcm92aW5jZXMoKTtcclxuICAgICAgICB0aGlzLmRlZmF1bHRTZWxDaXR5SW5kZXgoKTtcclxuICAgIH1cclxuICAgIG9uU2hvdyAoKSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVDYXRlQ2hvaWNlKCk7XHJcbiAgICB9XHJcbiAgICAvLyDorrDlvZXpobXpnaLliqDovb3mmK/miYDlsZ7ooYzkuJrnsbvliKvnvJbovpHnirbmgIFcclxuICAgIC8vIOWmguaenOWwj+eoi+W6j+WxnuS6juWQjOmVh21wU291cmNlPSAz5LiU5omA5bGe6KGM5LiaY2F0ZTLkuLrnqbrliJnlj6/ku6XnvJbovpFcclxuICAgIC8vIOaIluiAhW1wU291cmNlIT09M+WImeWPr+S7pee8lui+kVxyXG4gICAgcmVjb3JkRmlyc3RDYXRlU3RhdHVzIChhcHBJbmZvKSB7XHJcbiAgICAgICAgY29uc3QgeyBtcFNvdXJjZSwgY2F0ZTIgfSA9IGFwcEluZm87XHJcbiAgICAgICAgY29uc29sZS5sb2coJ21wU291cmNlJywgbXBTb3VyY2UsICdjYXRlMicsIGNhdGUyKTtcclxuICAgICAgICB0aGlzLmNhdGVFZGl0YWJsZSA9ICEhKG1wU291cmNlICYmIG1wU291cmNlLnRvU3RyaW5nKCkgPT09ICczJyAmJiAhY2F0ZTIpXHJcbiAgICAgICAgICAgIHx8IChtcFNvdXJjZSAmJiBtcFNvdXJjZS50b1N0cmluZygpICE9PSAnMycpO1xyXG4gICAgfVxyXG4gICAgLy8g5pu05paw5omA5bGe6KGM5Lia57G75YirXHJcbiAgICB1cGRhdGVDYXRlQ2hvaWNlKCkge1xyXG4gICAgICAgIGNvbnN0IHtcclxuICAgICAgICAgICAgY2F0ZTEgPSAnJyxcclxuICAgICAgICAgICAgY2F0ZTFOYW1lID0gJycsXHJcbiAgICAgICAgICAgIGNhdGUyID0gJycsXHJcbiAgICAgICAgICAgIGNhdGUyTmFtZSA9ICcnLFxyXG4gICAgICAgICAgICBjYXRlMyA9ICcnLFxyXG4gICAgICAgICAgICBjYXRlM05hbWUgPSAnJyxcclxuICAgICAgICB9ID0gZ2xvYmFsU2VydmljZS5nZXQoJ211bHRpU2VsZWN0b3InKTtcclxuXHJcbiAgICAgICAgLy8g5qOA5p+lXHJcbiAgICAgICAgaWYgKFtjYXRlMSwgY2F0ZTIsIGNhdGUzXS5ldmVyeSh2ID0+IHR5cGVvZiB2ICE9PSAnbnVtYmVyJykpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy51cGRhdGVGb3JtKHtcclxuICAgICAgICAgICAgY2F0ZTEsXHJcbiAgICAgICAgICAgIGNhdGUxTmFtZSxcclxuICAgICAgICAgICAgY2F0ZTIsXHJcbiAgICAgICAgICAgIGNhdGUyTmFtZSxcclxuICAgICAgICAgICAgY2F0ZTMsXHJcbiAgICAgICAgICAgIGNhdGUzTmFtZSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIC8vIHVwZGF0ZUNhdGVDaG9pY2UgKCkge1xyXG4gICAgLy8gICAgIGlmICghdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEgfHwgIXRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLmNhdGVDaG9vaWNlKSByZXR1cm47XHJcbiAgICAvLyAgICAgY29uc3QgZm9ybSA9IHt9O1xyXG4gICAgLy8gICAgIGNvbnNvbGUubG9nKCdjYXRlQ2hvb2ljZTAnLCB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5jYXRlQ2hvb2ljZSk7XHJcbiAgICAvLyAgICAgLy8g5LuO5omA5bGe57G755uu5YC86YCJ5oup6aG16Z2i6L+U5Zue6YeN5paw6LWL5YC8XHJcbiAgICAvLyAgICAgY29uc3QgY2F0ZUNob29pY2UgPSAodGhpcy4kcGFyZW50Lmdsb2JhbERhdGEgJiYgdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEuY2F0ZUNob29pY2UpID9cclxuICAgIC8vICAgICAgICAgdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEuY2F0ZUNob29pY2UgOiBbe30sIHt9LCB7fV07XHJcbiAgICAvLyAgICAgY29uc29sZS5sb2coJ2NhdGVDaG9vaWNlMScsIGNhdGVDaG9vaWNlKTtcclxuICAgIC8vICAgICBjYXRlQ2hvb2ljZS5tYXAoKGl0ZW0sIGluZGV4KSA9PiB7XHJcbiAgICAvLyAgICAgICAgIGZvcm1bYGNhdGUke2luZGV4ICsgMX1gXSA9IGl0ZW0uY2F0ZUlkIHx8ICcnO1xyXG4gICAgLy8gICAgICAgICBmb3JtW2BjYXRlJHtpbmRleCArIDF9TmFtZWBdID0gaXRlbS5uYW1lIHx8ICcnO1xyXG4gICAgLy8gICAgICAgICByZXR1cm4gaXRlbTtcclxuICAgIC8vICAgICB9KTtcclxuICAgIC8vICAgICAvLyDmm7TmlrDlrozmiJDliKDpmaTlhajlsYDmiYDlsZ7nsbvnm67lrZfmrrVjYXRlQ2hvb2ljZVxyXG4gICAgLy8gICAgIHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhXHJcbiAgICAvLyAgICAgICAgICYmIHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLmNhdGVDaG9vaWNlXHJcbiAgICAvLyAgICAgICAgICYmICh0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5jYXRlQ2hvb2ljZSA9IHVuZGVmaW5lZCk7XHJcbiAgICAvLyAgICAgdGhpcy51cGRhdGVGb3JtKGZvcm0pO1xyXG4gICAgLy8gfVxyXG4gICAgZGVmYXVsdFNlbENpdHlJbmRleCAoKSB7XHJcbiAgICAgICAgY29uc3QgeyBjaXR5LCBwcm92aW5jZSB9ID0gdGhpcy5mb3JtO1xyXG4gICAgICAgIGxldCBwSW5kZXggPSAwO1xyXG4gICAgICAgIGxldCBjSW5kZXggPSAwO1xyXG4gICAgICAgIGxldCBpdGVtO1xyXG4gICAgICAgIGlmIChwcm92aW5jZSkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gdGhpcy5hcmVhc1swXS5sZW5ndGg7IGkgPCBsZW47IGkgKz0gMSkge1xyXG4gICAgICAgICAgICAgICAgaXRlbSA9IHRoaXMuYXJlYXNbMF1baV07XHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5kaXNwTG9jYWxJRCA9PT0gcHJvdmluY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICBwSW5kZXggPSBpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjaXR5KSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSB0aGlzLmFyZWFzWzFdLmxlbmd0aDsgaSA8IGxlbjsgaSArPSAxKSB7XHJcbiAgICAgICAgICAgICAgICBpdGVtID0gdGhpcy5hcmVhc1sxXVtpXTtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtLmRpc3BMb2NhbElEID09PSBwcm92aW5jZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNJbmRleCA9IGk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zZWxDaXR5SW5kZXggPSBbcEluZGV4LCBjSW5kZXhdO1xyXG4gICAgICAgIHRoaXMudXBkYXRlRm9ybSh7XHJcbiAgICAgICAgICAgIGNpdHk6IHRoaXMuYXJlYXNbMV1bY0luZGV4XS5kaXNwTG9jYWxJRCxcclxuICAgICAgICAgICAgY2l0eU5hbWU6IHRoaXMuYXJlYXNbMV1bY0luZGV4XS5sb2NhbE5hbWUsXHJcbiAgICAgICAgICAgIHByb3ZpbmNlOiB0aGlzLmFyZWFzWzBdW3BJbmRleF0uZGlzcExvY2FsSUQsXHJcbiAgICAgICAgICAgIHByb3ZpbmNlTmFtZTogdGhpcy5hcmVhc1swXVtwSW5kZXhdLmxvY2FsTmFtZSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVGb3JtIChkYXRhKSB7XHJcbiAgICAgICAgY29uc3QgcmVzID0gZGF0YTtcclxuICAgICAgICBjb25zdCB7IGZvcm0gfSA9IHRoaXMuZGF0YTtcclxuICAgICAgICAvLyDlpLTlg49cclxuICAgICAgICBpZiAocmVzLmhlYWRJbWcgPT09ICcnIHx8IHJlcy5oZWFkSW1nKSB7XHJcbiAgICAgICAgICAgIGxldCB7IGhlYWRJbWcgPSAnaHR0cHM6Ly9waWM4LjU4Y2RuLmNvbS5jbi9iaXptcC9uX3YyODVkNmExNmQ3MjVhNDQ2Njk0ZGIzNWRmMjNjOWRiMjQucG5nP3c9NzImaD03MicgfSA9IHJlcztcclxuICAgICAgICAgICAgaGVhZEltZyA9IHRoaXMudGVtcExvZ28gfHwgaGVhZEltZztcclxuICAgICAgICAgICAgaWYgKGhlYWRJbWcuaW5kZXhPZignaHR0cCcpIDwgMCAmJiBoZWFkSW1nLmluZGV4T2YoJ2ZpbGU6JykgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICBoZWFkSW1nID0gYCR7cGljU3JjRG9tYWluKCkgKyBoZWFkSW1nfT93PTcyJmg9NzJgO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMubG9nb1VybCA9IGhlYWRJbWc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIOe7j+e6rOW6pu+8jOi/h+a7pOepuui1i+WAvFxyXG4gICAgICAgIGlmIChyZXMuYWRkcmVzc0xhdGl0dWRlICE9PSB1bmRlZmluZWQgJiYgcmVzLmFkZHJlc3NMYXRpdHVkZSA9PT0gJycpIHtcclxuICAgICAgICAgICAgZGVsZXRlIHJlcy5hZGRyZXNzTGF0aXR1ZGU7XHJcbiAgICAgICAgICAgIGRlbGV0ZSByZXMuYWRkcmVzc0xvbmdpdHVkZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5mb3JtID0gT2JqZWN0LmFzc2lnbih7fSwgZm9ybSwgeyAuLi5yZXMgfSk7XHJcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgIH1cclxuICAgIGFzeW5jIGdldFByb3ZpbmNlcyAoKSB7XHJcbiAgICAgICAgY29uc3QgW2UxLCBkYXRhMV0gPSBhd2FpdCBnZXQocHJvdmluY2VBcGkpO1xyXG4gICAgICAgIGlmIChlMSkge1xyXG4gICAgICAgICAgICB0aGlzLnRvYXN0KGUxKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBwcm92aW5jZSA9IHRoaXMuZm9ybS5wcm92aW5jZSB8fCAnNTAwMSc7XHJcbiAgICAgICAgY29uc3QgW2UyLCBkYXRhMl0gPSBhd2FpdCBnZXQoY2l0eUFwaSArIHByb3ZpbmNlKTtcclxuICAgICAgICBpZiAoZTIpIHtcclxuICAgICAgICAgICAgdGhpcy50b2FzdChlMik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coJ3Byb3ZpbmNlcycsIGRhdGExLCAnY2l0eXMnLCBkYXRhMik7XHJcbiAgICAgICAgdGhpcy5hcmVhcyA9IFtkYXRhMSwgZGF0YTJdO1xyXG4gICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICB9XHJcbiAgICBhc3luYyBnZXRMb2NhdGlvbiAoKSB7XHJcbiAgICAgICAgY29uc3QgeyBsYXRpdHVkZSwgbG9uZ2l0dWRlIH0gPSBhd2FpdCB3ZXB5LmdldExvY2F0aW9uKHsgdHlwZTogJ3dnczg0JyB9KTtcclxuICAgICAgICBpZiAodGhpcy5mb3JtLmFkZHJlc3NMYXRpdHVkZSkgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMudXBkYXRlRm9ybSh7IGFkZHJlc3NMYXRpdHVkZTogbGF0aXR1ZGUsIGFkZHJlc3NMb25naXR1ZGU6IGxvbmdpdHVkZSB9KTtcclxuICAgIH1cclxuICAgIGFzeW5jIGdldEFwcEluZm8gKG1waWQpIHtcclxuICAgICAgICBjb25zdCBbZSwgZGF0YV0gPSBhd2FpdCBnZXQoYCR7YXBwaW5mb0FwaX0vJHttcGlkfWApO1xyXG4gICAgICAgIGlmIChlKSB7XHJcbiAgICAgICAgICAgIHRoaXMudG9hc3QoZSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy51cGRhdGVGb3JtKHsgLi4uZGF0YSB9KTtcclxuICAgIH1cclxuICAgIHRvYXN0ICguLi5wYXJhbXMpIHtcclxuICAgICAgICBjb25zdCBbdGl0bGUsIGR1cmF0aW9uID0gMjAwMF0gPSBwYXJhbXM7XHJcbiAgICAgICAgcmV0dXJuIHdlcHkuc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgdGl0bGUsXHJcbiAgICAgICAgICAgIGljb246ICdub25lJyxcclxuICAgICAgICAgICAgZHVyYXRpb24sXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBhc3luYyB2ZXJpZnkgKCkge1xyXG4gICAgICAgIGNvbnN0IHJlZ1Bob25lID0gL14xWzM0NTY3ODldWzAtOV17OX0kLztcclxuICAgICAgICBjb25zdCB7IGZvcm0gfSA9IHRoaXMuZGF0YTtcclxuICAgICAgICBpZiAoIWZvcm0uaGVhZEltZykge1xyXG4gICAgICAgICAgICB0aGlzLnRvYXN0KCfor7flrozlloTkv6Hmga8nKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIWZvcm0ubmlja05hbWUpIHtcclxuICAgICAgICAgICAgdGhpcy50b2FzdCgn6L6T5YWl5bCP56iL5bqP5ZCN56ewJyk7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGZvcm0ubmlja05hbWUubGVuZ3RoIDwgNCkge1xyXG4gICAgICAgICAgICB0aGlzLnRvYXN0KCflsI/nqIvluo/lkI3np7DkuI3lvpflsI/kuo405Liq5a2XJyk7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFmb3JtLnRlbHBob25lKSB7XHJcbiAgICAgICAgICAgIHRoaXMudG9hc3QoJ+i+k+WFpeiBlOezu+eUteivnScpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChmb3JtLnRlbHBob25lLmxlbmd0aCA8IDExICYmICFyZWdQaG9uZS50ZXN0KGZvcm0udGVscGhvbmUpKSB7XHJcbiAgICAgICAgICAgIGF3YWl0IHRvYXN0U3luYygn5omL5py65Y+35LiN5q2j56GuJyk7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFmb3JtLmNpdHkpIHtcclxuICAgICAgICAgICAgdGhpcy50b2FzdCgn6YCJ5oup5Z+O5biCJyk7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFmb3JtLmFkZHJlc3MpIHtcclxuICAgICAgICAgICAgdGhpcy50b2FzdCgn6L6T5YWl6K+m5oOF5Zyw5Z2AJyk7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g5omA5bGe6KGM5Lia6Iez5bCR6YCJ5oup5Lik6aG5XHJcbiAgICAgICAgaWYgKCFmb3JtLmNhdGUxIHx8ICFmb3JtLmNhdGUyKSB7XHJcbiAgICAgICAgICAgIHRoaXMudG9hc3QoJ+aJgOWxnuihjOS4muiHs+WwkemAieaLqeS4pOmhuScpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==