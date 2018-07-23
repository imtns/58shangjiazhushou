'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _ajax = require('./../utils/ajax.js');

var _utils = require('./../utils/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var OrderComponentDetail = function (_wepy$page) {
    _inherits(OrderComponentDetail, _wepy$page);

    function OrderComponentDetail() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, OrderComponentDetail);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = OrderComponentDetail.__proto__ || Object.getPrototypeOf(OrderComponentDetail)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            navigationBarTitleText: '预览详情'
        }, _this.data = {
            id: '',
            resourceGroup: '',
            mpid: '',
            pics: '',
            serviceName: '',
            serviceDuaring: '',
            serviceStartTime: '',
            serviceEndTime: '',
            address: '',
            serviceDetailInfo: '',
            duration: '',
            durationUnit: '',
            status: ''
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(OrderComponentDetail, [{
        key: 'onLoad',
        value: function onLoad(option) {
            var _option$id = option.id,
                id = _option$id === undefined ? '' : _option$id,
                _option$resourceGroup = option.resourceGroup,
                resourceGroup = _option$resourceGroup === undefined ? '' : _option$resourceGroup;

            this.id = id;
            this.resourceGroup = resourceGroup;
            this.mpid = _wepy2.default.getStorageSync('current_mpid');
            this.$apply();
            this.loadData();
        }
    }, {
        key: 'loadData',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var _ref3, data, pics, serviceName, serviceDuaring, serviceStartTime, serviceEndTime, address, serviceDetailInfo, duration, durationUnit, status;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.prev = 0;
                                _context.next = 3;
                                return (0, _ajax.get)('/businessService/get/' + this.id, {
                                    mpid: this.mpid
                                });

                            case 3:
                                _ref3 = _context.sent;
                                data = _ref3.data;
                                pics = data.pics, serviceName = data.serviceName, serviceDuaring = data.serviceDuaring, serviceStartTime = data.serviceStartTime, serviceEndTime = data.serviceEndTime, address = data.address, serviceDetailInfo = data.serviceDetailInfo, duration = data.duration, durationUnit = data.durationUnit, status = data.status;

                                Object.assign(this, {
                                    pics: pics,
                                    serviceName: serviceName,
                                    serviceDuaring: serviceDuaring,
                                    serviceStartTime: serviceStartTime,
                                    serviceEndTime: serviceEndTime,
                                    address: address,
                                    serviceDetailInfo: serviceDetailInfo,
                                    duration: duration,
                                    durationUnit: durationUnit,
                                    status: status
                                });
                                _context.next = 12;
                                break;

                            case 9:
                                _context.prev = 9;
                                _context.t0 = _context['catch'](0);

                                console.log(_context.t0);

                            case 12:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[0, 9]]);
            }));

            function loadData() {
                return _ref2.apply(this, arguments);
            }

            return loadData;
        }()
    }, {
        key: 'manageProduct',
        value: function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                var id, status, msg;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.prev = 0;
                                id = this.id, status = this.status;
                                msg = status === 2 ? '下架成功!' : '上架成功!';
                                _context2.next = 5;
                                return (0, _ajax.get)('/businessService/update', {
                                    id: id,
                                    status: status
                                });

                            case 5:
                                (0, _utils.toast)(msg);
                                _context2.next = 11;
                                break;

                            case 8:
                                _context2.prev = 8;
                                _context2.t0 = _context2['catch'](0);

                                console.log(_context2.t0);

                            case 11:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this, [[0, 8]]);
            }));

            function manageProduct() {
                return _ref4.apply(this, arguments);
            }

            return manageProduct;
        }()
    }, {
        key: 'edit',
        value: function edit() {
            _wepy2.default.navigateTo({
                url: 'orderComponentEdit?id=' + this.id + '&resourceGroup=' + this.resourceGroup
            });
        }
    }]);

    return OrderComponentDetail;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(OrderComponentDetail , 'pages/orderComponentDetail'));
