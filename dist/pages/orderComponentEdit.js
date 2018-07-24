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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9yZGVyQ29tcG9uZW50RWRpdC5qcyJdLCJuYW1lcyI6WyJJbmRleCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJpbWFnZVVwbG9hZGVyIiwiZGF0YSIsImZvcm0iLCJpZCIsIm1waWQiLCJzZXJ2aWNlTmFtZSIsInBpY3MiLCJwcmljZSIsImR1cmF0aW9uVW5pdCIsImR1cmF0aW9uIiwic2VydmljZURldGFpbEluZm8iLCJzZXJ2aWNlVXNlck5hbWUiLCJzZXJ2aWNlVGVscGhvbmUiLCJzZXJ2aWNlU3RhcnR0aW1lIiwic2VydmljZUVuZHRpbWUiLCJwcm92aW5jZVN0ciIsImNpdHlTdHIiLCJhcmVhU3RyIiwiYWRkcmVzcyIsImFkZHJlc3NMb25naXR1ZGUiLCJhZGRyZXNzTGF0aXR1ZGUiLCJwcm92aW5jZSIsImNpdHkiLCJhcmVhIiwicGF5VHlwZSIsInNob3dJbWFnZURlbGV0ZSIsImRlZmF1bHRJbWFnZXMiLCJyZWdpb24iLCJjYW5TdWJtaXQiLCJtaXhpbnMiLCJNaXhpbiIsIm1ldGhvZHMiLCJzZXRJbWFnZXMiLCJpbWFnZXMiLCJsZW5ndGgiLCJzYXZlIiwicmVxdWVzdFVybCIsInBvc3REYXRhIiwiT2JqZWN0Iiwia2V5cyIsImZvckVhY2giLCJrZXkiLCJ2YWxpZGF0b3IiLCJTQVZFX1NFUlZJQ0UiLCJJTlNFUlRfU0VSVklDRSIsIndlcHkiLCJuYXZpZ2F0ZUJhY2siLCJlcnJvckhhbmRsZXIiLCJtc2ciLCJtZXNzYWdlIiwic2V0Rm9ybURhdGEiLCJwcm9wIiwiZSIsImRldGFpbCIsInZhbHVlIiwic2V0TG9jYXRpb24iLCJjaG9vc2VMb2NhdGlvbiIsImxhdGl0dWRlIiwibG9uZ2l0dWRlIiwiYXNzaWduIiwiJGFwcGx5IiwiY29tcHV0ZWQiLCJyZXN1bHQiLCJyZXF1aXJlZEZpZWxkcyIsInJlc291cmNlR3JvdXAiLCJnZXRTdG9yYWdlU3luYyIsImxvYWREYXRhIiwidXBkYXRlRGF0YSIsInJlZ2lvbkRhdGEiLCJnbG9iYWxTZXJ2aWNlIiwiZ2V0IiwiRXJyb3IiLCJMT0FEX1NFUlZJQ0UiLCJzZXJ2aWNlIiwib3JkZXJDb21wb25lbnQiLCJzZXQiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7SUFFcUJBLEs7Ozs7Ozs7Ozs7Ozs7O3dMQUNqQkMsTSxHQUFTO0FBQ0xDLG9DQUF3QjtBQURuQixTLFFBSVZDLE8sR0FBVSxFLFFBQ2JDLE0sR0FBUyxFQUFDLGlCQUFnQixFQUFDLGNBQWEsRUFBZCxFQUFpQixZQUFXLElBQTVCLEVBQWlDLFdBQVUsR0FBM0MsRUFBK0MsY0FBYSxHQUE1RCxFQUFnRSxnQkFBZSxFQUEvRSxFQUFrRiwwQkFBeUIsaUJBQTNHLEVBQTZILFlBQVcsT0FBeEksRUFBZ0osNkJBQTRCLGVBQTVLLEVBQWpCLEUsUUFDVEMsTyxHQUFVLEVBQUMsaUJBQWdCLEVBQUMscUJBQW9CLFdBQXJCLEVBQWpCLEUsUUFDVEMsVSxHQUFhO0FBQ05DO0FBRE0sUyxRQUlWQyxJLEdBQU87QUFDSEMsa0JBQU07QUFDRkMsb0JBQUksRUFERjtBQUVGQyxzQkFBTSxFQUZKO0FBR0ZDLDZCQUFhLEVBSFgsRUFHZTtBQUNqQkMsc0JBQU0sRUFKSixFQUlRO0FBQ1ZDLHVCQUFPLENBTEwsRUFLUTtBQUNWQyw4QkFBYyxDQU5aLEVBTWU7QUFDakJDLDBCQUFVLENBUFIsRUFPVztBQUNiQyxtQ0FBbUIsRUFSakIsRUFRcUI7QUFDdkJDLGlDQUFpQixFQVRmLEVBU21CO0FBQ3JCQyxpQ0FBaUIsRUFWZixFQVVtQjtBQUNyQkMsa0NBQWtCLEVBWGhCLEVBV29CO0FBQ3RCQyxnQ0FBZ0IsRUFaZCxFQVlrQjtBQUNwQkMsNkJBQWEsRUFiWCxFQWFlO0FBQ2pCQyx5QkFBUyxFQWRQLEVBY1c7QUFDYkMseUJBQVMsRUFmUCxFQWVXO0FB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QkMsb0RBZHFCO0FBZXJCQyxvREFmcUI7QUFnQnJCQyxvREFoQnFCO0FBaUJyQkMsc0VBakJxQjtBQWtCckJDLG9FQWxCcUI7QUFtQnJCQyxzREFuQnFCO0FBb0JyQkMsOENBcEJxQjtBQXFCckJDLDhDQXJCcUI7QUFzQnJCQztBQXRCcUIsaUNBQXpCO0FBd0JBLHFDQUFLRSxhQUFMLEdBQXFCLENBQUMsNkJBQWlCcEIsSUFBbEIsQ0FBckI7O0FBRUEscUNBQUtzRCxNQUFMOzs7Ozs7OztBQUVBLHFDQUFLYixZQUFMOzs7Ozs7Ozs7Ozs7Ozs7Ozs7cUNBSUs7QUFDVCxnQkFBTTJCLGlCQUFpQkwsd0JBQWNDLEdBQWQsQ0FBa0IsZ0JBQWxCLENBQXZCO0FBQ0FELG9DQUFjTSxHQUFkLENBQWtCLGdCQUFsQixFQUFvQ3JDLE9BQU9xQixNQUFQLENBQWNlLGNBQWQsRUFBOEIsS0FBS3hFLElBQW5DLENBQXBDO0FBQ0g7Ozs7RUF4UThCMkMsZUFBSytCLEk7O2tCQUFuQm5GLEsiLCJmaWxlIjoib3JkZXJDb21wb25lbnRFZGl0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbmltcG9ydCBNaXhpbiBmcm9tICcuLi9taXhpbic7XG5pbXBvcnQgeyBnZXQsIHBvc3QgfSBmcm9tICcuLi91dGlscy9hamF4JztcbmltcG9ydCB7IExPQURfU0VSVklDRSwgSU5TRVJUX1NFUlZJQ0UsIFNBVkVfU0VSVklDRSB9IGZyb20gJy4uL3V0aWxzL3VybCc7XG5pbXBvcnQgeyBhbGVydCwgcGljU3JjRG9tYWluLCBpc0VtcHR5IH0gZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IGltYWdlVXBsb2FkZXIgZnJvbSAnLi4vY29tcG9uZW50cy9VcGxvYWRGaWxlJztcbmltcG9ydCBnbG9iYWxTZXJ2aWNlIGZyb20gJy4uL3V0aWxzL2dsb2JhbFNlcnZpY2UnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn57yW6L6R6K+m5oOFJyxcbiAgICB9XG5cbiAgICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1wiaW1hZ2VVcGxvYWRlclwiOntcInhtbG5zOnYtb25cIjpcIlwiLFwibWF4Q291bnRcIjpcIjEwXCIsXCJtYXhTaXplXCI6XCI0XCIsXCJ1cGxvYWR0eXBlXCI6XCIxXCIsXCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOnNob3dEZWxldGUub25jZVwiOlwic2hvd0ltYWdlRGVsZXRlXCIsXCJzaG93VHlwZVwiOlwib3JkZXJcIixcInYtYmluZDpkZWZhdWx0SW1hZ2VzLnN5bmNcIjpcImRlZmF1bHRJbWFnZXNcIn19O1xyXG4kZXZlbnRzID0ge1wiaW1hZ2VVcGxvYWRlclwiOntcInYtb246Y2hhbmdlaW1hZ2VzXCI6XCJzZXRJbWFnZXNcIn19O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICAgICAgaW1hZ2VVcGxvYWRlcixcbiAgICB9XG5cbiAgICBkYXRhID0ge1xuICAgICAgICBmb3JtOiB7XG4gICAgICAgICAgICBpZDogJycsXG4gICAgICAgICAgICBtcGlkOiAnJyxcbiAgICAgICAgICAgIHNlcnZpY2VOYW1lOiAnJywgLy8gKuacjeWKoeWQjeensFxuICAgICAgICAgICAgcGljczogJycsIC8vICrmnI3liqHlpLTlm75cbiAgICAgICAgICAgIHByaWNlOiAwLCAvLyAq5pyN5Yqh5Lu35qC8XG4gICAgICAgICAgICBkdXJhdGlvblVuaXQ6IDEsIC8vICrmnI3liqHlvaLlvI/vvIzlsI/nqIvluo/nq6/lj6rog73pgInmi6kg5YiG6ZKfL+asoVxuICAgICAgICAgICAgZHVyYXRpb246IDAsIC8vICrmnI3liqHml7bplb9cbiAgICAgICAgICAgIHNlcnZpY2VEZXRhaWxJbmZvOiAnJywgLy8g5pyN5Yqh6K+m5oOFXG4gICAgICAgICAgICBzZXJ2aWNlVXNlck5hbWU6ICcnLCAvLyDmnI3liqHkurrlkZjlp5PlkI1cbiAgICAgICAgICAgIHNlcnZpY2VUZWxwaG9uZTogJycsIC8vIOacjeWKoeS6uueUteivnVxuICAgICAgICAgICAgc2VydmljZVN0YXJ0dGltZTogJycsIC8vICrlvIDlp4vml7bpl7RcbiAgICAgICAgICAgIHNlcnZpY2VFbmR0aW1lOiAnJywgLy8gKue7k+adn+aXtumXtFxuICAgICAgICAgICAgcHJvdmluY2VTdHI6ICcnLCAvLyDnnIHlkI1cbiAgICAgICAgICAgIGNpdHlTdHI6ICcnLCAvLyDln47luILlkI1cbiAgICAgICAgICAgIGFyZWFTdHI6ICcnLCAvLyDljLrlkI1cbiAgICAgICAgICAgIGFkZHJlc3M6ICcnLCAvLyAq6K+m57uG5Zyw5Z2AXG4gICAgICAgICAgICBhZGRyZXNzTG9uZ2l0dWRlOiAnMTE2LjM5NzIyJywgLy8gKue7j+W6plxuICAgICAgICAgICAgYWRkcmVzc0xhdGl0dWRlOiAnMzkuOTA5NjAnLCAvLyAq57qs5bqmXG4gICAgICAgICAgICBwcm92aW5jZTogMCwgLy8gKuecgWlkXG4gICAgICAgICAgICBjaXR5OiAwLCAvLyAq5Z+O5biCaWRcbiAgICAgICAgICAgIGFyZWE6IDAsIC8vICrljLrln59pZFxuICAgICAgICAgICAgcGF5VHlwZTogMSwgLy8gKuaUr+S7mOaWueW8j++8jOWPquiDveS4uuWIsOW6l+S7mFxuICAgICAgICB9LFxuICAgICAgICBzaG93SW1hZ2VEZWxldGU6IGZhbHNlLFxuICAgICAgICBkZWZhdWx0SW1hZ2VzOiBbXSxcbiAgICAgICAgcmVnaW9uOiAnJyxcbiAgICAgICAgY2FuU3VibWl0OiBmYWxzZSxcbiAgICB9XG5cbiAgICBtaXhpbnMgPSBbTWl4aW5dXG5cbiAgICBtZXRob2RzID0ge1xuICAgICAgICBzZXRJbWFnZXMoeyBpbWFnZXMgfSkge1xuICAgICAgICAgICAgaWYgKGltYWdlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBbdGhpcy5mb3JtLnBpY3NdID0gaW1hZ2VzO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIGFzeW5jIHNhdmUoKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuY2FuU3VibWl0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGxldCByZXF1ZXN0VXJsID0gJyc7XG5cbiAgICAgICAgICAgICAgICAvLyDmlbDmja7ov4fmu6TvvIzkuI3mj5DkuqTmnKrloavlhpnlrZfmrrVcbiAgICAgICAgICAgICAgICBjb25zdCB7IGZvcm0gfSA9IHRoaXM7XG4gICAgICAgICAgICAgICAgY29uc3QgcG9zdERhdGEgPSB7fTtcbiAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyhmb3JtKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChmb3JtW2tleV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc3REYXRhW2tleV0gPSBmb3JtW2tleV07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIC8vIOagoemqjOaVsOaNrlxuICAgICAgICAgICAgICAgIHRoaXMudmFsaWRhdG9yKHBvc3REYXRhKTtcblxuICAgICAgICAgICAgICAgIGlmIChmb3JtLmlkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlcXVlc3RVcmwgPSBTQVZFX1NFUlZJQ0U7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVxdWVzdFVybCA9IElOU0VSVF9TRVJWSUNFO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGF3YWl0IHBvc3QocmVxdWVzdFVybCwgcG9zdERhdGEpO1xuICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVCYWNrKCk7XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lcnJvckhhbmRsZXIoZSk7XG5cbiAgICAgICAgICAgICAgICBsZXQgbXNnID0gJyc7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBlID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgICAgICBtc2cgPSBlLm1lc3NhZ2U7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbXNnID0gZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYWxlcnQobXNnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogcHJvcCDlrZfmrrXlkI1cbiAgICAgICAgICogZSDkuovku7blr7nosaFcbiAgICAgICAgICovXG4gICAgICAgIHNldEZvcm1EYXRhKHByb3AsIGUpIHtcbiAgICAgICAgICAgIHRoaXMuZm9ybVtwcm9wXSA9IGUuZGV0YWlsLnZhbHVlO1xuICAgICAgICB9LFxuXG4gICAgICAgIGFzeW5jIHNldExvY2F0aW9uICgpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgICAgICAgICBhZGRyZXNzLFxuICAgICAgICAgICAgICAgICAgICBsYXRpdHVkZTogYWRkcmVzc0xhdGl0dWRlLFxuICAgICAgICAgICAgICAgICAgICBsb25naXR1ZGU6IGFkZHJlc3NMb25naXR1ZGUsXG4gICAgICAgICAgICAgICAgfSA9IGF3YWl0IHdlcHkuY2hvb3NlTG9jYXRpb24oKTtcblxuICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5mb3JtLCB7XG4gICAgICAgICAgICAgICAgICAgIGFkZHJlc3MsXG4gICAgICAgICAgICAgICAgICAgIGFkZHJlc3NMYXRpdHVkZSxcbiAgICAgICAgICAgICAgICAgICAgYWRkcmVzc0xvbmdpdHVkZSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZXJyb3JIYW5kbGVyKGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgIH1cblxuICAgIGNvbXB1dGVkID0ge1xuICAgICAgICByZWdpb24oKSB7XG4gICAgICAgICAgICBjb25zdCB7IHByb3ZpbmNlU3RyLCBjaXR5U3RyLCBhcmVhU3RyIH0gPSB0aGlzLmZvcm07XG5cbiAgICAgICAgICAgIGlmICghcHJvdmluY2VTdHIgfHwgIWNpdHlTdHIgfHwgIWFyZWFTdHIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBgJHtwcm92aW5jZVN0cn0gJHtjaXR5U3RyfSAke2FyZWFTdHJ9YDtcbiAgICAgICAgfSxcbiAgICAgICAgY2FuU3VibWl0KCkge1xuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IHRydWU7XG4gICAgICAgICAgICBjb25zdCByZXF1aXJlZEZpZWxkcyA9IFsnc2VydmljZU5hbWUnLCAncGljcycsICdwcmljZScsICdkdXJhdGlvblVuaXQnLFxuICAgICAgICAgICAgICAgICdkdXJhdGlvbicsICdzZXJ2aWNlU3RhcnR0aW1lJywgJ3NlcnZpY2VFbmR0aW1lJyxcbiAgICAgICAgICAgICAgICAncHJvdmluY2VTdHInLCAnY2l0eVN0cicsICdhcmVhU3RyJywgJ2FkZHJlc3MnLCAncGF5VHlwZSddO1xuXG4gICAgICAgICAgICByZXF1aXJlZEZpZWxkcy5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGlzRW1wdHkodGhpcy5mb3JtW2tleV0pKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9LFxuICAgIH1cblxuICAgIGFzeW5jIG9uTG9hZCh7IGlkLCByZXNvdXJjZUdyb3VwIH0pIHtcbiAgICAgICAgY29uc3QgbXBpZCA9IHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ2N1cnJlbnRfbXBpZCcpO1xuXG4gICAgICAgIGlmIChpZCkge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5sb2FkRGF0YShpZCk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZURhdGEoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubXBpZCA9IG1waWQ7XG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5mb3JtLCB7XG4gICAgICAgICAgICByZXNvdXJjZUdyb3VwLFxuICAgICAgICAgICAgbXBpZCxcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgfVxuXG4gICAgb25TaG93KCkge1xuICAgICAgICAvLyDmr4/mrKFvblNob3flkIzmraXmlbDmja5cbiAgICAgICAgY29uc3QgcmVnaW9uRGF0YSA9IGdsb2JhbFNlcnZpY2UuZ2V0KCdtdWx0aVNlbGVjdG9yJyk7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgIHByb3ZpbmNlLCBjaXR5LCBhcmVhLFxuICAgICAgICB9ID0gcmVnaW9uRGF0YTtcblxuICAgICAgICBpZiAocHJvdmluY2UgJiYgY2l0eSAmJiBhcmVhKSB7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMuZm9ybSwgcmVnaW9uRGF0YSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyDmoKHpqozmlbDmja5cbiAgICB2YWxpZGF0b3IoZGF0YSkge1xuICAgICAgICAvLyDmoKHpqozlv4XloavlrZfmrrVcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgc2VydmljZVN0YXJ0dGltZSwgc2VydmljZUVuZHRpbWUsIHByaWNlLCBkdXJhdGlvbiwgZHVyYXRpb25Vbml0LFxuICAgICAgICB9ID0gZGF0YTtcblxuICAgICAgICBpZiAoc2VydmljZVN0YXJ0dGltZSA+IHNlcnZpY2VFbmR0aW1lKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ+mihOe6pue7k+adn+aXtumXtOW/hemhu+Wkp+S6juW8gOWni+aXtumXtCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHByaWNlID4gMWU1KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ+i+k+WFpeS7t+agvOS4jei2hei/hzEw5LiHJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZHVyYXRpb24gPiAxNDQwICYmIGR1cmF0aW9uVW5pdCA9PT0gMSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCfovpPlhaXml7bplb/kuI3lvpflpKfkuo4xNDQw5YiG6ZKfJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZHVyYXRpb24gPiAyNCAmJiBkdXJhdGlvblVuaXQgPT09IDIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcign6L6T5YWl5pe26ZW/5LiN5b6X5aSn5LqOMjTlsI/ml7YnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFzeW5jIGxvYWREYXRhKGlkKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCB7IG1waWQgfSA9IHRoaXM7XG4gICAgICAgICAgICBjb25zdCB7IGRhdGE6IHNlcnZpY2UgfSA9IGF3YWl0IGdldChMT0FEX1NFUlZJQ0UgKyBpZCwge1xuICAgICAgICAgICAgICAgIG1waWQsXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgICAgIHNlcnZpY2VOYW1lLFxuICAgICAgICAgICAgICAgIHBpY3MsXG4gICAgICAgICAgICAgICAgcHJpY2UsXG4gICAgICAgICAgICAgICAgZHVyYXRpb25Vbml0LFxuICAgICAgICAgICAgICAgIGR1cmF0aW9uLFxuICAgICAgICAgICAgICAgIHNlcnZpY2VEZXRhaWxJbmZvLFxuICAgICAgICAgICAgICAgIHNlcnZpY2VVc2VyTmFtZSxcbiAgICAgICAgICAgICAgICBzZXJ2aWNlVGVscGhvbmUsXG4gICAgICAgICAgICAgICAgc2VydmljZVN0YXJ0dGltZSxcbiAgICAgICAgICAgICAgICBzZXJ2aWNlRW5kdGltZSxcbiAgICAgICAgICAgICAgICBwcm92aW5jZVN0cixcbiAgICAgICAgICAgICAgICBjaXR5U3RyLFxuICAgICAgICAgICAgICAgIGFyZWFTdHIsXG4gICAgICAgICAgICAgICAgYWRkcmVzcyxcbiAgICAgICAgICAgICAgICBhZGRyZXNzTG9uZ2l0dWRlLFxuICAgICAgICAgICAgICAgIGFkZHJlc3NMYXRpdHVkZSxcbiAgICAgICAgICAgICAgICBwcm92aW5jZSxcbiAgICAgICAgICAgICAgICBjaXR5LFxuICAgICAgICAgICAgICAgIGFyZWEsXG4gICAgICAgICAgICAgICAgcGF5VHlwZSxcbiAgICAgICAgICAgIH0gPSBzZXJ2aWNlO1xuXG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMuZm9ybSwge1xuICAgICAgICAgICAgICAgIGlkLFxuICAgICAgICAgICAgICAgIG1waWQsXG4gICAgICAgICAgICAgICAgc2VydmljZU5hbWUsXG4gICAgICAgICAgICAgICAgcGljcyxcbiAgICAgICAgICAgICAgICBwcmljZSxcbiAgICAgICAgICAgICAgICBkdXJhdGlvblVuaXQsXG4gICAgICAgICAgICAgICAgZHVyYXRpb24sXG4gICAgICAgICAgICAgICAgc2VydmljZURldGFpbEluZm8sXG4gICAgICAgICAgICAgICAgc2VydmljZVVzZXJOYW1lLFxuICAgICAgICAgICAgICAgIHNlcnZpY2VUZWxwaG9uZSxcbiAgICAgICAgICAgICAgICBzZXJ2aWNlU3RhcnR0aW1lLFxuICAgICAgICAgICAgICAgIHNlcnZpY2VFbmR0aW1lLFxuICAgICAgICAgICAgICAgIHByb3ZpbmNlU3RyLFxuICAgICAgICAgICAgICAgIGNpdHlTdHIsXG4gICAgICAgICAgICAgICAgYXJlYVN0cixcbiAgICAgICAgICAgICAgICBhZGRyZXNzLFxuICAgICAgICAgICAgICAgIGFkZHJlc3NMb25naXR1ZGUsXG4gICAgICAgICAgICAgICAgYWRkcmVzc0xhdGl0dWRlLFxuICAgICAgICAgICAgICAgIHByb3ZpbmNlLFxuICAgICAgICAgICAgICAgIGNpdHksXG4gICAgICAgICAgICAgICAgYXJlYSxcbiAgICAgICAgICAgICAgICBwYXlUeXBlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLmRlZmF1bHRJbWFnZXMgPSBbcGljU3JjRG9tYWluKCkgKyBwaWNzXTtcblxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgdGhpcy5lcnJvckhhbmRsZXIoZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGVEYXRhKCkge1xuICAgICAgICBjb25zdCBvcmRlckNvbXBvbmVudCA9IGdsb2JhbFNlcnZpY2UuZ2V0KCdvcmRlckNvbXBvbmVudCcpO1xuICAgICAgICBnbG9iYWxTZXJ2aWNlLnNldCgnb3JkZXJDb21wb25lbnQnLCBPYmplY3QuYXNzaWduKG9yZGVyQ29tcG9uZW50LCB0aGlzLmZvcm0pKTtcbiAgICB9XG59XG4iXX0=