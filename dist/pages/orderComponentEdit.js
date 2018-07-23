'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _mixin = require('./../mixin/index.js');

var _mixin2 = _interopRequireDefault(_mixin);

var _ajax = require('./../utils/ajax.js');

var _url = require('./../utils/url.js');

var _utils = require('./../utils/index.js');

var _UploadFile = require('./../components/UploadFile.js');

var _UploadFile2 = _interopRequireDefault(_UploadFile);

var _globalService = require('./../utils/globalService.js');

var _globalService2 = _interopRequireDefault(_globalService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Index = function (_wepy$page) {
    _inherits(Index, _wepy$page);

    function Index() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Index);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            navigationBarTitleText: '编辑详情'
        }, _this.$repeat = {}, _this.$props = { "imageUploader": { "xmlns:v-on": "", "maxCount": "10", "maxSize": "4", "uploadtype": "1", "xmlns:v-bind": "", "v-bind:showDelete.once": "showImageDelete", "showType": "order", "v-bind:defaultImages.sync": "defaultImages" } }, _this.$events = { "imageUploader": { "v-on:changeimages": "setImages" } }, _this.components = {
            imageUploader: _UploadFile2.default
        }, _this.data = {
            form: {
                id: '',
                mpid: '',
                serviceName: '', // *服务名称
                pics: '', // *服务头图
                price: 0, // *服务价格
                durationUnit: 1, // *服务形式，小程序端只能选择 分钟/次
                duration: 0, // *服务时长
                serviceDetailInfo: '', // 服务详情
                serviceUserName: '', // 服务人员姓名
                serviceTelphone: '', // 服务人电话
                serviceStarttime: '', // *开始时间
                serviceEndtime: '', // *结束时间
                provinceStr: '', // 省名
                cityStr: '', // 城市名
                areaStr: '', // 区名
                address: '', // *详细地址
                addressLongitude: '116.39722', // *经度
                addressLatitude: '39.90960', // *纬度
                province: 0, // *省id
                city: 0, // *城市id
                area: 0, // *区域id
                payType: 1 // *支付方式，只能为到店付
            },
            showImageDelete: false,
            defaultImages: [],
            region: '',
            canSubmit: false
        }, _this.mixins = [_mixin2.default], _this.methods = {
            setImages: function setImages(_ref2) {
                var images = _ref2.images;

                if (images.length) {
                    var _images = _slicedToArray(images, 1);

                    this.form.pics = _images[0];
                }
            },
            save: function () {
                var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                    var requestUrl, form, postData, msg;
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    if (this.canSubmit) {
                                        _context.next = 2;
                                        break;
                                    }

                                    return _context.abrupt('return');

                                case 2:
                                    _context.prev = 2;
                                    requestUrl = '';

                                    // 数据过滤，不提交未填写字段

                                    form = this.form;
                                    postData = {};

                                    Object.keys(form).forEach(function (key) {
                                        if (form[key]) {
                                            postData[key] = form[key];
                                        }
                                    });

                                    // 校验数据
                                    this.validator(postData);

                                    if (form.id) {
                                        requestUrl = _url.SAVE_SERVICE;
                                    } else {
                                        requestUrl = _url.INSERT_SERVICE;
                                    }

                                    _context.next = 11;
                                    return (0, _ajax.post)(requestUrl, postData);

                                case 11:
                                    _wepy2.default.navigateBack();
                                    _context.next = 20;
                                    break;

                                case 14:
                                    _context.prev = 14;
                                    _context.t0 = _context['catch'](2);

                                    this.errorHandler(_context.t0);

                                    msg = '';

                                    if ((typeof _context.t0 === 'undefined' ? 'undefined' : _typeof(_context.t0)) === 'object') {
                                        msg = _context.t0.message;
                                    } else {
                                        msg = _context.t0;
                                    }
                                    (0, _utils.alert)(msg);

                                case 20:
                                case 'end':
                                    return _context.stop();
                            }
                        }
                    }, _callee, this, [[2, 14]]);
                }));

                function save() {
                    return _ref3.apply(this, arguments);
                }

                return save;
            }(),


            /**
             * prop 字段名
             * e 事件对象
             */
            setFormData: function setFormData(prop, e) {
                this.form[prop] = e.detail.value;
            },
            setLocation: function () {
                var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                    var _ref5, address, addressLatitude, addressLongitude;

                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                        while (1) {
                            switch (_context2.prev = _context2.next) {
                                case 0:
                                    _context2.prev = 0;
                                    _context2.next = 3;
                                    return _wepy2.default.chooseLocation();

                                case 3:
                                    _ref5 = _context2.sent;
                                    address = _ref5.address;
                                    addressLatitude = _ref5.latitude;
                                    addressLongitude = _ref5.longitude;


                                    Object.assign(this.form, {
                                        address: address,
                                        addressLatitude: addressLatitude,
                                        addressLongitude: addressLongitude
                                    });
                                    this.$apply();
                                    _context2.next = 14;
                                    break;

                                case 11:
                                    _context2.prev = 11;
                                    _context2.t0 = _context2['catch'](0);

                                    this.errorHandler(_context2.t0);

                                case 14:
                                case 'end':
                                    return _context2.stop();
                            }
                        }
                    }, _callee2, this, [[0, 11]]);
                }));

                function setLocation() {
                    return _ref4.apply(this, arguments);
                }

                return setLocation;
            }()
        }, _this.computed = {
            region: function region() {
                var _form = this.form,
                    provinceStr = _form.provinceStr,
                    cityStr = _form.cityStr,
                    areaStr = _form.areaStr;


                if (!provinceStr || !cityStr || !areaStr) {
                    return '';
                }

                return provinceStr + ' ' + cityStr + ' ' + areaStr;
            },
            canSubmit: function canSubmit() {
                var _this2 = this;

                var result = true;
                var requiredFields = ['serviceName', 'pics', 'price', 'durationUnit', 'duration', 'serviceStarttime', 'serviceEndtime', 'provinceStr', 'cityStr', 'areaStr', 'address', 'payType'];

                requiredFields.forEach(function (key) {
                    if ((0, _utils.isEmpty)(_this2.form[key])) {
                        result = false;
                    }
                });

                return result;
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Index, [{
        key: 'onLoad',
        value: function () {
            var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_ref6) {
                var id = _ref6.id,
                    resourceGroup = _ref6.resourceGroup;
                var mpid;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                mpid = _wepy2.default.getStorageSync('current_mpid');

                                if (!id) {
                                    _context3.next = 5;
                                    break;
                                }

                                _context3.next = 4;
                                return this.loadData(id);

                            case 4:
                                this.updateData();

                            case 5:

                                this.mpid = mpid;
                                Object.assign(this.form, {
                                    resourceGroup: resourceGroup,
                                    mpid: mpid
                                });
                                this.$apply();

                            case 8:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function onLoad(_x) {
                return _ref7.apply(this, arguments);
            }

            return onLoad;
        }()
    }, {
        key: 'onShow',
        value: function onShow() {
            // 每次onShow同步数据
            var regionData = _globalService2.default.get('multiSelector');
            var province = regionData.province,
                city = regionData.city,
                area = regionData.area;


            if (province && city && area) {
                Object.assign(this.form, regionData);
            }
        }

        // 校验数据

    }, {
        key: 'validator',
        value: function validator(data) {
            // 校验必填字段
            var serviceStarttime = data.serviceStarttime,
                serviceEndtime = data.serviceEndtime,
                price = data.price,
                duration = data.duration,
                durationUnit = data.durationUnit;


            if (serviceStarttime > serviceEndtime) {
                throw new Error('预约结束时间必须大于开始时间');
            }

            if (price > 1e5) {
                throw new Error('输入价格不超过10万');
            }

            if (duration > 1440 && durationUnit === 1) {
                throw new Error('输入时长不得大于1440分钟');
            }

            if (duration > 24 && durationUnit === 2) {
                throw new Error('输入时长不得大于24小时');
            }
        }
    }, {
        key: 'loadData',
        value: function () {
            var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(id) {
                var mpid, _ref9, service, serviceName, pics, price, durationUnit, duration, serviceDetailInfo, serviceUserName, serviceTelphone, serviceStarttime, serviceEndtime, provinceStr, cityStr, areaStr, address, addressLongitude, addressLatitude, province, city, area, payType;

                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                _context4.prev = 0;
                                mpid = this.mpid;
                                _context4.next = 4;
                                return (0, _ajax.get)(_url.LOAD_SERVICE + id, {
                                    mpid: mpid
                                });

                            case 4:
                                _ref9 = _context4.sent;
                                service = _ref9.data;
                                serviceName = service.serviceName, pics = service.pics, price = service.price, durationUnit = service.durationUnit, duration = service.duration, serviceDetailInfo = service.serviceDetailInfo, serviceUserName = service.serviceUserName, serviceTelphone = service.serviceTelphone, serviceStarttime = service.serviceStarttime, serviceEndtime = service.serviceEndtime, provinceStr = service.provinceStr, cityStr = service.cityStr, areaStr = service.areaStr, address = service.address, addressLongitude = service.addressLongitude, addressLatitude = service.addressLatitude, province = service.province, city = service.city, area = service.area, payType = service.payType;


                                Object.assign(this.form, {
                                    id: id,
                                    mpid: mpid,
                                    serviceName: serviceName,
                                    pics: pics,
                                    price: price,
                                    durationUnit: durationUnit,
                                    duration: duration,
                                    serviceDetailInfo: serviceDetailInfo,
                                    serviceUserName: serviceUserName,
                                    serviceTelphone: serviceTelphone,
                                    serviceStarttime: serviceStarttime,
                                    serviceEndtime: serviceEndtime,
                                    provinceStr: provinceStr,
                                    cityStr: cityStr,
                                    areaStr: areaStr,
                                    address: address,
                                    addressLongitude: addressLongitude,
                                    addressLatitude: addressLatitude,
                                    province: province,
                                    city: city,
                                    area: area,
                                    payType: payType
                                });
                                this.defaultImages = [(0, _utils.picSrcDomain)() + pics];

                                this.$apply();
                                _context4.next = 15;
                                break;

                            case 12:
                                _context4.prev = 12;
                                _context4.t0 = _context4['catch'](0);

                                this.errorHandler(_context4.t0);

                            case 15:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this, [[0, 12]]);
            }));

            function loadData(_x2) {
                return _ref8.apply(this, arguments);
            }

            return loadData;
        }()
    }, {
        key: 'updateData',
        value: function updateData() {
            var orderComponent = _globalService2.default.get('orderComponent');
            _globalService2.default.set('orderComponent', Object.assign(orderComponent, this.form));
        }
    }]);

    return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/orderComponentEdit'));
