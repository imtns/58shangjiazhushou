'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _mixins = require('./../mixins/index.js');

var _mixins2 = _interopRequireDefault(_mixins);

var _utils = require('./../utils/index.js');

var _url = require('./../utils/url.js');

var _ajax = require('./../utils/ajax.js');

var _globalService = require('./../utils/globalService.js');

var _globalService2 = _interopRequireDefault(_globalService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var pageSize = 20;
var pageNum = 1;

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
            navigationBarTitleText: '优惠券适用产品'
        }, _this.mixins = [_mixins2.default], _this.data = {
            services: [],
            showProduct: false,
            groups: [{
                name: '所有产品',
                id: ''
            }],
            currentGroup: '所有产品',
            selectedServices: [], // 已选产品
            allServices: [], // 全部产品

            applyType: 1, // 1 全部产品，2 指定产品
            serviceIds: ''
        }, _this.methods = {
            showProduct: function showProduct() {
                this.showProduct = !this.showProduct;
            },
            chooseGroup: function () {
                var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(resourceGroup, name) {
                    var services;
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    _context.next = 2;
                                    return this.getServices(resourceGroup);

                                case 2:
                                    services = _context.sent;

                                    this.services = services;
                                    this.currentGroup = name;
                                    this.$apply();

                                case 6:
                                case 'end':
                                    return _context.stop();
                            }
                        }
                    }, _callee, this);
                }));

                function chooseGroup(_x, _x2) {
                    return _ref2.apply(this, arguments);
                }

                return chooseGroup;
            }(),
            chooseService: function chooseService(index) {
                var service = this.services[index];
                service.checked = !service.checked;
                this.applyType = 2;
                this.updateSelected(index);
            },
            chooseAll: function chooseAll() {
                this.services = this.services.map(function (item) {
                    var service = Object.assign({}, item);
                    service.checked = true;
                    return service;
                });

                this.applyType = 1;
                this.serviceIds = '';
                this.selectedServices = this.allServices.concat();
            },
            confirm: function confirm() {
                _wepy2.default.navigateBack();
            }
        }, _this.computed = {
            serviceIds: function serviceIds() {
                var result = '';

                if (this.applyType === 1) {
                    result = '';
                } else {
                    result = this.selectedServices.join(',');
                }

                return result;
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Index, [{
        key: 'updateSelected',


        // 通过在数组中的位置记录，减少成本
        value: function updateSelected(index) {
            var id = this.services[index].id;
            var selectedServices = this.selectedServices;


            if (~selectedServices.indexOf(id)) {
                selectedServices.splice(selectedServices.indexOf(id), 1);
            } else {
                selectedServices.push(id);
            }

            // 全部产品选择
            if (selectedServices.length === this.allServices.length) {
                this.applyType = 1;
                this.serviceIds = '';
                this.$apply();
            }
        }
    }, {
        key: 'onLoad',
        value: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                var mpid, _ref4, groups, services, couponManage, _couponManage$service, serviceIds, applyType, allServices;

                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.prev = 0;
                                mpid = _wepy2.default.getStorageSync('current_mpid');

                                // 获取分组

                                _context2.next = 4;
                                return (0, _ajax.get)(_url.LOAD_SERVICE_GROUPS, {
                                    mpid: mpid
                                });

                            case 4:
                                _ref4 = _context2.sent;
                                groups = _ref4.data;
                                _context2.next = 8;
                                return this.getServices();

                            case 8:
                                services = _context2.sent;

                                this.allServices = services.map(function (item) {
                                    return item.id;
                                });

                                // 同步已选产品
                                couponManage = _globalService2.default.get('couponManage');
                                _couponManage$service = couponManage.serviceIds, serviceIds = _couponManage$service === undefined ? '' : _couponManage$service, applyType = couponManage.applyType;
                                allServices = [];

                                // 指定产品

                                if (applyType === 2 && couponManage.serviceIds) {
                                    this.selectedServices = serviceIds.split(',');
                                }

                                services = services.map(function (item) {
                                    var service = Object.assign({}, item);
                                    // 因为默认选择所有产品，所以此时能够获取到所有产品
                                    allServices.push(service.id);

                                    if (~serviceIds.indexOf(service.id) && applyType === 2) {
                                        service.checked = true;
                                    }
                                    return service;
                                });

                                this.allServices = allServices;
                                this.applyType = applyType;
                                this.services = services;
                                this.groups = this.groups.concat(groups);
                                this.$apply();
                                _context2.next = 25;
                                break;

                            case 22:
                                _context2.prev = 22;
                                _context2.t0 = _context2['catch'](0);

                                this.errorHandler(_context2.t0);

                            case 25:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this, [[0, 22]]);
            }));

            function onLoad() {
                return _ref3.apply(this, arguments);
            }

            return onLoad;
        }()
    }, {
        key: 'onUnload',
        value: function onUnload() {
            this.updateData();
        }
    }, {
        key: 'updateData',
        value: function updateData() {
            var couponManage = _globalService2.default.get('couponManage');
            _globalService2.default.set('couponManage', Object.assign(couponManage, {
                applyType: this.applyType,
                serviceIds: this.serviceIds
            }));
        }
    }, {
        key: 'getServices',
        value: function () {
            var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
                var resourceGroup = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

                var selectedServices, mpid, _ref6, _ref6$data, services;

                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                selectedServices = this.selectedServices;
                                mpid = _wepy2.default.getStorageSync('current_mpid');
                                // 获取所有产品

                                _context3.next = 4;
                                return (0, _ajax.get)(_url.LOAD_SERVICE_LIST, {
                                    mpid: mpid,
                                    pageNum: pageNum,
                                    pageSize: pageSize,
                                    resourceGroup: resourceGroup
                                });

                            case 4:
                                _ref6 = _context3.sent;
                                _ref6$data = _ref6.data;
                                _ref6$data = _ref6$data === undefined ? {} : _ref6$data;
                                services = _ref6$data.data;
                                return _context3.abrupt('return', services.map(function (item) {
                                    var service = Object.assign({}, item);

                                    // 图片处理
                                    service.pics = (0, _utils.picSrcDomain)() + service.pics;
                                    // check处理
                                    if (!selectedServices.indexOf(item.id)) {
                                        service.checked = true;
                                    }
                                    return service;
                                }));

                            case 9:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function getServices() {
                return _ref5.apply(this, arguments);
            }

            return getServices;
        }()
    }]);

    return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/couponService'));
