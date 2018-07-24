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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9yZGVyQ29tcG9uZW50RGV0YWlsLmpzIl0sIm5hbWVzIjpbIk9yZGVyQ29tcG9uZW50RGV0YWlsIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJpZCIsInJlc291cmNlR3JvdXAiLCJtcGlkIiwicGljcyIsInNlcnZpY2VOYW1lIiwic2VydmljZUR1YXJpbmciLCJzZXJ2aWNlU3RhcnRUaW1lIiwic2VydmljZUVuZFRpbWUiLCJhZGRyZXNzIiwic2VydmljZURldGFpbEluZm8iLCJkdXJhdGlvbiIsImR1cmF0aW9uVW5pdCIsInN0YXR1cyIsIm9wdGlvbiIsIndlcHkiLCJnZXRTdG9yYWdlU3luYyIsIiRhcHBseSIsImxvYWREYXRhIiwiT2JqZWN0IiwiYXNzaWduIiwiY29uc29sZSIsImxvZyIsIm1zZyIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsb0I7Ozs7Ozs7Ozs7Ozs7O3NOQUNqQkMsTSxHQUFTO0FBQ0xDLG9DQUF3QjtBQURuQixTLFFBR1RDLEksR0FBTztBQUNIQyxnQkFBSSxFQUREO0FBRUhDLDJCQUFlLEVBRlo7QUFHSEMsa0JBQU0sRUFISDtBQUlIQyxrQkFBTSxFQUpIO0FBS0hDLHlCQUFhLEVBTFY7QUFNSEMsNEJBQWdCLEVBTmI7QUFPSEMsOEJBQWtCLEVBUGY7QUFRSEMsNEJBQWdCLEVBUmI7QUFTSEMscUJBQVMsRUFUTjtBQVVIQywrQkFBbUIsRUFWaEI7QUFXSEMsc0JBQVUsRUFYUDtBQVlIQywwQkFBYyxFQVpYO0FBYUhDLG9CQUFRO0FBYkwsUzs7Ozs7K0JBZUFDLE0sRUFBUTtBQUFBLDZCQUM2QkEsTUFEN0IsQ0FDSGIsRUFERztBQUFBLGdCQUNIQSxFQURHLDhCQUNFLEVBREY7QUFBQSx3Q0FDNkJhLE1BRDdCLENBQ01aLGFBRE47QUFBQSxnQkFDTUEsYUFETix5Q0FDc0IsRUFEdEI7O0FBRVgsaUJBQUtELEVBQUwsR0FBVUEsRUFBVjtBQUNBLGlCQUFLQyxhQUFMLEdBQXFCQSxhQUFyQjtBQUNBLGlCQUFLQyxJQUFMLEdBQVlZLGVBQUtDLGNBQUwsQ0FBb0IsY0FBcEIsQ0FBWjtBQUNBLGlCQUFLQyxNQUFMO0FBQ0EsaUJBQUtDLFFBQUw7QUFDSDs7Ozs7Ozs7Ozs7Ozt1Q0FHOEIseUNBQTRCLEtBQUtqQixFQUFqQyxFQUF1QztBQUMxREUsMENBQU0sS0FBS0E7QUFEK0MsaUNBQXZDLEM7Ozs7QUFBZkgsb0MsU0FBQUEsSTtBQUlKSSxvQyxHQVVBSixJLENBVkFJLEksRUFDQUMsVyxHQVNBTCxJLENBVEFLLFcsRUFDQUMsYyxHQVFBTixJLENBUkFNLGMsRUFDQUMsZ0IsR0FPQVAsSSxDQVBBTyxnQixFQUNBQyxjLEdBTUFSLEksQ0FOQVEsYyxFQUNBQyxPLEdBS0FULEksQ0FMQVMsTyxFQUNBQyxpQixHQUlBVixJLENBSkFVLGlCLEVBQ0FDLFEsR0FHQVgsSSxDQUhBVyxRLEVBQ0FDLFksR0FFQVosSSxDQUZBWSxZLEVBQ0FDLE0sR0FDQWIsSSxDQURBYSxNOztBQUVKTSx1Q0FBT0MsTUFBUCxDQUFjLElBQWQsRUFBb0I7QUFDaEJoQiw4Q0FEZ0I7QUFFaEJDLDREQUZnQjtBQUdoQkMsa0VBSGdCO0FBSWhCQyxzRUFKZ0I7QUFLaEJDLGtFQUxnQjtBQU1oQkMsb0RBTmdCO0FBT2hCQyx3RUFQZ0I7QUFRaEJDLHNEQVJnQjtBQVNoQkMsOERBVGdCO0FBVWhCQztBQVZnQixpQ0FBcEI7Ozs7Ozs7O0FBYUFRLHdDQUFRQyxHQUFSOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUtRckIsa0MsR0FBZSxJLENBQWZBLEUsRUFBSVksTSxHQUFXLEksQ0FBWEEsTTtBQUNOVSxtQyxHQUFNVixXQUFXLENBQVgsR0FBZSxPQUFmLEdBQXlCLE87O3VDQUMvQixlQUFJLHlCQUFKLEVBQStCO0FBQ2pDWiwwQ0FEaUM7QUFFakNZO0FBRmlDLGlDQUEvQixDOzs7QUFJTixrREFBTVUsR0FBTjs7Ozs7Ozs7QUFFQUYsd0NBQVFDLEdBQVI7Ozs7Ozs7Ozs7Ozs7Ozs7OzsrQkFHRDtBQUNIUCwyQkFBS1MsVUFBTCxDQUFnQjtBQUNaQyxnREFBOEIsS0FBS3hCLEVBQW5DLHVCQUF1RCxLQUFLQztBQURoRCxhQUFoQjtBQUdIOzs7O0VBN0U2Q2EsZUFBS1csSTs7a0JBQWxDN0Isb0IiLCJmaWxlIjoib3JkZXJDb21wb25lbnREZXRhaWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuaW1wb3J0IHsgZ2V0IH0gZnJvbSAnLi4vdXRpbHMvYWpheCc7XG5pbXBvcnQgeyB0b2FzdCB9IGZyb20gJy4uL3V0aWxzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT3JkZXJDb21wb25lbnREZXRhaWwgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+mihOiniOivpuaDhScsXG4gICAgfVxuICAgIGRhdGEgPSB7XG4gICAgICAgIGlkOiAnJyxcbiAgICAgICAgcmVzb3VyY2VHcm91cDogJycsXG4gICAgICAgIG1waWQ6ICcnLFxuICAgICAgICBwaWNzOiAnJyxcbiAgICAgICAgc2VydmljZU5hbWU6ICcnLFxuICAgICAgICBzZXJ2aWNlRHVhcmluZzogJycsXG4gICAgICAgIHNlcnZpY2VTdGFydFRpbWU6ICcnLFxuICAgICAgICBzZXJ2aWNlRW5kVGltZTogJycsXG4gICAgICAgIGFkZHJlc3M6ICcnLFxuICAgICAgICBzZXJ2aWNlRGV0YWlsSW5mbzogJycsXG4gICAgICAgIGR1cmF0aW9uOiAnJyxcbiAgICAgICAgZHVyYXRpb25Vbml0OiAnJyxcbiAgICAgICAgc3RhdHVzOiAnJyxcbiAgICB9XG4gICAgb25Mb2FkKG9wdGlvbikge1xuICAgICAgICBjb25zdCB7IGlkID0gJycsIHJlc291cmNlR3JvdXAgPSAnJyB9ID0gb3B0aW9uO1xuICAgICAgICB0aGlzLmlkID0gaWQ7XG4gICAgICAgIHRoaXMucmVzb3VyY2VHcm91cCA9IHJlc291cmNlR3JvdXA7XG4gICAgICAgIHRoaXMubXBpZCA9IHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ2N1cnJlbnRfbXBpZCcpO1xuICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgICB0aGlzLmxvYWREYXRhKCk7XG4gICAgfVxuICAgIGFzeW5jIGxvYWREYXRhKCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgeyBkYXRhIH0gPSBhd2FpdCBnZXQoYC9idXNpbmVzc1NlcnZpY2UvZ2V0LyR7dGhpcy5pZH1gLCB7XG4gICAgICAgICAgICAgICAgbXBpZDogdGhpcy5tcGlkLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICAgICAgcGljcyxcbiAgICAgICAgICAgICAgICBzZXJ2aWNlTmFtZSxcbiAgICAgICAgICAgICAgICBzZXJ2aWNlRHVhcmluZyxcbiAgICAgICAgICAgICAgICBzZXJ2aWNlU3RhcnRUaW1lLFxuICAgICAgICAgICAgICAgIHNlcnZpY2VFbmRUaW1lLFxuICAgICAgICAgICAgICAgIGFkZHJlc3MsXG4gICAgICAgICAgICAgICAgc2VydmljZURldGFpbEluZm8sXG4gICAgICAgICAgICAgICAgZHVyYXRpb24sXG4gICAgICAgICAgICAgICAgZHVyYXRpb25Vbml0LFxuICAgICAgICAgICAgICAgIHN0YXR1cyxcbiAgICAgICAgICAgIH0gPSBkYXRhO1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCB7XG4gICAgICAgICAgICAgICAgcGljcyxcbiAgICAgICAgICAgICAgICBzZXJ2aWNlTmFtZSxcbiAgICAgICAgICAgICAgICBzZXJ2aWNlRHVhcmluZyxcbiAgICAgICAgICAgICAgICBzZXJ2aWNlU3RhcnRUaW1lLFxuICAgICAgICAgICAgICAgIHNlcnZpY2VFbmRUaW1lLFxuICAgICAgICAgICAgICAgIGFkZHJlc3MsXG4gICAgICAgICAgICAgICAgc2VydmljZURldGFpbEluZm8sXG4gICAgICAgICAgICAgICAgZHVyYXRpb24sXG4gICAgICAgICAgICAgICAgZHVyYXRpb25Vbml0LFxuICAgICAgICAgICAgICAgIHN0YXR1cyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBhc3luYyBtYW5hZ2VQcm9kdWN0KCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgeyBpZCwgc3RhdHVzIH0gPSB0aGlzO1xuICAgICAgICAgICAgY29uc3QgbXNnID0gc3RhdHVzID09PSAyID8gJ+S4i+aetuaIkOWKnyEnIDogJ+S4iuaetuaIkOWKnyEnO1xuICAgICAgICAgICAgYXdhaXQgZ2V0KCcvYnVzaW5lc3NTZXJ2aWNlL3VwZGF0ZScsIHtcbiAgICAgICAgICAgICAgICBpZCxcbiAgICAgICAgICAgICAgICBzdGF0dXMsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRvYXN0KG1zZyk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVkaXQoKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICB1cmw6IGBvcmRlckNvbXBvbmVudEVkaXQ/aWQ9JHt0aGlzLmlkfSZyZXNvdXJjZUdyb3VwPSR7dGhpcy5yZXNvdXJjZUdyb3VwfWAsXG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiJdfQ==