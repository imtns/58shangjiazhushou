'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _ajaxP = require('./../utils/ajaxP.js');

var _utils = require('./../utils/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var OrderDetail = function (_wepy$page) {
    _inherits(OrderDetail, _wepy$page);

    function OrderDetail() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, OrderDetail);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = OrderDetail.__proto__ || Object.getPrototypeOf(OrderDetail)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            navigationBarTitleText: '订单管理'
        }, _this.data = {
            fontClass: ['active', 'active', 'active', 'cancel', 'finish'],
            statusSet: ['待接单', '待服务', '已评价', '已取消', '已删除'],
            contentSet: ['顾客已下单，请尽快与顾客联系', '您已接单，请在约定时间联系顾客', '顾客已评价您的服务', '顾客已取消订单', ''],
            order: {},
            submitSuccess: false
        }, _this.methods = {
            bindPhoneCall: function () {
                var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(mobile) {
                    var userid, sendParams, _ref3, _ref4, e, phoneNumber;

                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    userid = this.order.userid;
                                    sendParams = { sign: userid + '#' + mobile, from: 'OrderDetail' };
                                    _context.next = 4;
                                    return (0, _ajaxP.get)('/other/encrypt/phone', sendParams);

                                case 4:
                                    _ref3 = _context.sent;
                                    _ref4 = _slicedToArray(_ref3, 2);
                                    e = _ref4[0];
                                    phoneNumber = _ref4[1];

                                    if (!e) {
                                        _context.next = 11;
                                        break;
                                    }

                                    (0, _utils.toast)(e);
                                    return _context.abrupt('return');

                                case 11:
                                    _wepy2.default.makePhoneCall({ phoneNumber: phoneNumber });

                                case 12:
                                case 'end':
                                    return _context.stop();
                            }
                        }
                    }, _callee, this);
                }));

                function bindPhoneCall(_x) {
                    return _ref2.apply(this, arguments);
                }

                return bindPhoneCall;
            }(),
            bindSubmitOrder: function bindSubmitOrder() {
                this.submitOrder();
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(OrderDetail, [{
        key: 'submitOrder',
        value: function () {
            var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                var id, _ref6, _ref7, e;

                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                id = this.order.id;
                                _context2.next = 3;
                                return (0, _ajaxP.post)('/consumerAppointment/accept/' + id);

                            case 3:
                                _ref6 = _context2.sent;
                                _ref7 = _slicedToArray(_ref6, 1);
                                e = _ref7[0];

                                if (!e) {
                                    _context2.next = 9;
                                    break;
                                }

                                (0, _utils.toast)(e);
                                return _context2.abrupt('return');

                            case 9:
                                this.submitSuccess = true;
                                this.$apply();

                            case 11:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function submitOrder() {
                return _ref5.apply(this, arguments);
            }

            return submitOrder;
        }()
    }, {
        key: 'parseOrder',
        value: function parseOrder(data) {
            var ret = data || {};
            var adressJson = JSON.parse(data.consumerAddressJson);
            try {
                var reg = /(\d{4})-([0-1]{0,1}\d{1})-([0-3]{0,1}\d{1}) ([0-6]{0,1}\d{1}):([0-6]{0,1}\d{1}):([0-6]{0,1}\d{1}).+/;
                ret.createTime = data.createTime.replace(reg, '$2.$3 $4:$5');
                ret.startTime = data.startTime.replace(reg, '$2.$3 $4:$5');
                ret.endTime = data.endTime.replace(reg, '$2.$3 $4:$5');
                ret.consumerName = adressJson.name;
                ret.consumerMobile = adressJson.telephone;
                ret.consumerAddress = '' + adressJson.provinceStr + adressJson.cityStr + '\n            ' + adressJson.areaStr + adressJson.address;
            } catch (e) {
                (0, _utils.toast)(e);
            }
            return ret;
        }
    }, {
        key: 'onLoad',
        value: function () {
            var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(options) {
                var id, _ref9, _ref10, e, data, order;

                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                id = options.id;
                                _context3.next = 3;
                                return (0, _ajaxP.get)('/consumerAppointment/get/' + id);

                            case 3:
                                _ref9 = _context3.sent;
                                _ref10 = _slicedToArray(_ref9, 2);
                                e = _ref10[0];
                                data = _ref10[1];

                                if (!e) {
                                    _context3.next = 10;
                                    break;
                                }

                                (0, _utils.toast)(e);
                                return _context3.abrupt('return');

                            case 10:
                                order = this.parseOrder(data);

                                this.order = Object.assign({}, order);
                                this.$apply();

                            case 13:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function onLoad(_x2) {
                return _ref8.apply(this, arguments);
            }

            return onLoad;
        }()
    }]);

    return OrderDetail;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(OrderDetail , 'pages/OrderDetail'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIk9yZGVyRGV0YWlsLmpzIl0sIm5hbWVzIjpbIk9yZGVyRGV0YWlsIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJmb250Q2xhc3MiLCJzdGF0dXNTZXQiLCJjb250ZW50U2V0Iiwib3JkZXIiLCJzdWJtaXRTdWNjZXNzIiwibWV0aG9kcyIsImJpbmRQaG9uZUNhbGwiLCJtb2JpbGUiLCJ1c2VyaWQiLCJzZW5kUGFyYW1zIiwic2lnbiIsImZyb20iLCJlIiwicGhvbmVOdW1iZXIiLCJ3ZXB5IiwibWFrZVBob25lQ2FsbCIsImJpbmRTdWJtaXRPcmRlciIsInN1Ym1pdE9yZGVyIiwiaWQiLCIkYXBwbHkiLCJyZXQiLCJhZHJlc3NKc29uIiwiSlNPTiIsInBhcnNlIiwiY29uc3VtZXJBZGRyZXNzSnNvbiIsInJlZyIsImNyZWF0ZVRpbWUiLCJyZXBsYWNlIiwic3RhcnRUaW1lIiwiZW5kVGltZSIsImNvbnN1bWVyTmFtZSIsIm5hbWUiLCJjb25zdW1lck1vYmlsZSIsInRlbGVwaG9uZSIsImNvbnN1bWVyQWRkcmVzcyIsInByb3ZpbmNlU3RyIiwiY2l0eVN0ciIsImFyZWFTdHIiLCJhZGRyZXNzIiwib3B0aW9ucyIsInBhcnNlT3JkZXIiLCJPYmplY3QiLCJhc3NpZ24iLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7O0lBR3FCQSxXOzs7Ozs7Ozs7Ozs7OztvTUFDakJDLE0sR0FBUztBQUNMQyxvQ0FBd0I7QUFEbkIsUyxRQUdUQyxJLEdBQU87QUFDSEMsdUJBQVcsQ0FBQyxRQUFELEVBQVcsUUFBWCxFQUFxQixRQUFyQixFQUErQixRQUEvQixFQUF5QyxRQUF6QyxDQURSO0FBRUhDLHVCQUFXLENBQUMsS0FBRCxFQUFRLEtBQVIsRUFBZSxLQUFmLEVBQXNCLEtBQXRCLEVBQTZCLEtBQTdCLENBRlI7QUFHSEMsd0JBQVksQ0FBQyxnQkFBRCxFQUFtQixpQkFBbkIsRUFBc0MsV0FBdEMsRUFBbUQsU0FBbkQsRUFBOEQsRUFBOUQsQ0FIVDtBQUlIQyxtQkFBTyxFQUpKO0FBS0hDLDJCQUFlO0FBTFosUyxRQU9QQyxPLEdBQVU7QUFDQUMseUJBREE7QUFBQSxxR0FDZUMsTUFEZjtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRU1DLDBDQUZOLEdBRWlCLEtBQUtMLEtBRnRCLENBRU1LLE1BRk47QUFHSUMsOENBSEosR0FHaUIsRUFBRUMsTUFBU0YsTUFBVCxTQUFtQkQsTUFBckIsRUFBK0JJLE1BQU0sYUFBckMsRUFIakI7QUFBQTtBQUFBLDJDQUk2QixnQkFBSSxzQkFBSixFQUE0QkYsVUFBNUIsQ0FKN0I7O0FBQUE7QUFBQTtBQUFBO0FBSUtHLHFDQUpMO0FBSVFDLCtDQUpSOztBQUFBLHlDQUtFRCxDQUxGO0FBQUE7QUFBQTtBQUFBOztBQU1FLHNEQUFNQSxDQUFOO0FBTkY7O0FBQUE7QUFTRkUsbURBQUtDLGFBQUwsQ0FBbUIsRUFBRUYsd0JBQUYsRUFBbkI7O0FBVEU7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFXTkcsMkJBWE0sNkJBV2E7QUFDZixxQkFBS0MsV0FBTDtBQUNIO0FBYkssUzs7Ozs7Ozs7Ozs7OztBQWdCRUMsa0MsR0FBTyxLQUFLZixLLENBQVplLEU7O3VDQUNVLGtEQUFvQ0EsRUFBcEMsQzs7Ozs7QUFBWE4saUM7O3FDQUNIQSxDOzs7OztBQUNBLGtEQUFNQSxDQUFOOzs7O0FBR0oscUNBQUtSLGFBQUwsR0FBcUIsSUFBckI7QUFDQSxxQ0FBS2UsTUFBTDs7Ozs7Ozs7Ozs7Ozs7Ozs7O21DQUVRcEIsSSxFQUFNO0FBQ2QsZ0JBQU1xQixNQUFNckIsUUFBUSxFQUFwQjtBQUNBLGdCQUFNc0IsYUFBYUMsS0FBS0MsS0FBTCxDQUFXeEIsS0FBS3lCLG1CQUFoQixDQUFuQjtBQUNBLGdCQUFJO0FBQ0Esb0JBQU1DLE1BQU0scUdBQVo7QUFDQUwsb0JBQUlNLFVBQUosR0FBaUIzQixLQUFLMkIsVUFBTCxDQUFnQkMsT0FBaEIsQ0FBd0JGLEdBQXhCLEVBQTZCLGFBQTdCLENBQWpCO0FBQ0FMLG9CQUFJUSxTQUFKLEdBQWdCN0IsS0FBSzZCLFNBQUwsQ0FBZUQsT0FBZixDQUF1QkYsR0FBdkIsRUFBNEIsYUFBNUIsQ0FBaEI7QUFDQUwsb0JBQUlTLE9BQUosR0FBYzlCLEtBQUs4QixPQUFMLENBQWFGLE9BQWIsQ0FBcUJGLEdBQXJCLEVBQTBCLGFBQTFCLENBQWQ7QUFDQUwsb0JBQUlVLFlBQUosR0FBbUJULFdBQVdVLElBQTlCO0FBQ0FYLG9CQUFJWSxjQUFKLEdBQXFCWCxXQUFXWSxTQUFoQztBQUNBYixvQkFBSWMsZUFBSixRQUF5QmIsV0FBV2MsV0FBcEMsR0FBa0RkLFdBQVdlLE9BQTdELHNCQUNFZixXQUFXZ0IsT0FEYixHQUN1QmhCLFdBQVdpQixPQURsQztBQUVILGFBVEQsQ0FTRSxPQUFPMUIsQ0FBUCxFQUFVO0FBQ1Isa0NBQU1BLENBQU47QUFDSDtBQUNELG1CQUFPUSxHQUFQO0FBQ0g7Ozs7a0dBQ2FtQixPOzs7Ozs7O0FBQ0ZyQixrQyxHQUFPcUIsTyxDQUFQckIsRTs7dUNBQ2dCLDhDQUFnQ0EsRUFBaEMsQzs7Ozs7QUFBakJOLGlDO0FBQUdiLG9DOztxQ0FDTmEsQzs7Ozs7QUFDQSxrREFBTUEsQ0FBTjs7OztBQUdFVCxxQyxHQUFRLEtBQUtxQyxVQUFMLENBQWdCekMsSUFBaEIsQzs7QUFDZCxxQ0FBS0ksS0FBTCxHQUFhc0MsT0FBT0MsTUFBUCxDQUFjLEVBQWQsRUFBa0J2QyxLQUFsQixDQUFiO0FBQ0EscUNBQUtnQixNQUFMOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBOURpQ0wsZUFBSzZCLEk7O2tCQUF6Qi9DLFciLCJmaWxlIjoiT3JkZXJEZXRhaWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XHJcbmltcG9ydCB7IGdldCwgcG9zdCB9IGZyb20gJy4uL3V0aWxzL2FqYXhQJztcclxuaW1wb3J0IHsgdG9hc3QgfSBmcm9tICcuLi91dGlscyc7XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT3JkZXJEZXRhaWwgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gICAgY29uZmlnID0ge1xyXG4gICAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICforqLljZXnrqHnkIYnLFxyXG4gICAgfVxyXG4gICAgZGF0YSA9IHtcclxuICAgICAgICBmb250Q2xhc3M6IFsnYWN0aXZlJywgJ2FjdGl2ZScsICdhY3RpdmUnLCAnY2FuY2VsJywgJ2ZpbmlzaCddLFxyXG4gICAgICAgIHN0YXR1c1NldDogWyflvoXmjqXljZUnLCAn5b6F5pyN5YqhJywgJ+W3suivhOS7tycsICflt7Llj5bmtognLCAn5bey5Yig6ZmkJ10sXHJcbiAgICAgICAgY29udGVudFNldDogWyfpob7lrqLlt7LkuIvljZXvvIzor7flsL3lv6vkuI7pob7lrqLogZTns7snLCAn5oKo5bey5o6l5Y2V77yM6K+35Zyo57qm5a6a5pe26Ze06IGU57O76aG+5a6iJywgJ+mhvuWuouW3suivhOS7t+aCqOeahOacjeWKoScsICfpob7lrqLlt7Llj5bmtojorqLljZUnLCAnJ10sXHJcbiAgICAgICAgb3JkZXI6IHt9LFxyXG4gICAgICAgIHN1Ym1pdFN1Y2Nlc3M6IGZhbHNlLFxyXG4gICAgfVxyXG4gICAgbWV0aG9kcyA9IHtcclxuICAgICAgICBhc3luYyBiaW5kUGhvbmVDYWxsIChtb2JpbGUpIHtcclxuICAgICAgICAgICAgY29uc3QgeyB1c2VyaWQgfSA9IHRoaXMub3JkZXI7XHJcbiAgICAgICAgICAgIGNvbnN0IHNlbmRQYXJhbXMgPSB7IHNpZ246IGAke3VzZXJpZH0jJHttb2JpbGV9YCwgZnJvbTogJ09yZGVyRGV0YWlsJyB9O1xyXG4gICAgICAgICAgICBjb25zdCBbZSwgcGhvbmVOdW1iZXJdID0gYXdhaXQgZ2V0KCcvb3RoZXIvZW5jcnlwdC9waG9uZScsIHNlbmRQYXJhbXMpO1xyXG4gICAgICAgICAgICBpZiAoZSkge1xyXG4gICAgICAgICAgICAgICAgdG9hc3QoZSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgd2VweS5tYWtlUGhvbmVDYWxsKHsgcGhvbmVOdW1iZXIgfSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBiaW5kU3VibWl0T3JkZXIgKCkge1xyXG4gICAgICAgICAgICB0aGlzLnN1Ym1pdE9yZGVyKCk7XHJcbiAgICAgICAgfSxcclxuICAgIH1cclxuICAgIGFzeW5jIHN1Ym1pdE9yZGVyICgpIHtcclxuICAgICAgICBjb25zdCB7IGlkIH0gPSB0aGlzLm9yZGVyO1xyXG4gICAgICAgIGNvbnN0IFtlXSA9IGF3YWl0IHBvc3QoYC9jb25zdW1lckFwcG9pbnRtZW50L2FjY2VwdC8ke2lkfWApO1xyXG4gICAgICAgIGlmIChlKSB7XHJcbiAgICAgICAgICAgIHRvYXN0KGUpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc3VibWl0U3VjY2VzcyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgIH1cclxuICAgIHBhcnNlT3JkZXIgKGRhdGEpIHtcclxuICAgICAgICBjb25zdCByZXQgPSBkYXRhIHx8IHt9O1xyXG4gICAgICAgIGNvbnN0IGFkcmVzc0pzb24gPSBKU09OLnBhcnNlKGRhdGEuY29uc3VtZXJBZGRyZXNzSnNvbik7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3QgcmVnID0gLyhcXGR7NH0pLShbMC0xXXswLDF9XFxkezF9KS0oWzAtM117MCwxfVxcZHsxfSkgKFswLTZdezAsMX1cXGR7MX0pOihbMC02XXswLDF9XFxkezF9KTooWzAtNl17MCwxfVxcZHsxfSkuKy87XHJcbiAgICAgICAgICAgIHJldC5jcmVhdGVUaW1lID0gZGF0YS5jcmVhdGVUaW1lLnJlcGxhY2UocmVnLCAnJDIuJDMgJDQ6JDUnKTtcclxuICAgICAgICAgICAgcmV0LnN0YXJ0VGltZSA9IGRhdGEuc3RhcnRUaW1lLnJlcGxhY2UocmVnLCAnJDIuJDMgJDQ6JDUnKTtcclxuICAgICAgICAgICAgcmV0LmVuZFRpbWUgPSBkYXRhLmVuZFRpbWUucmVwbGFjZShyZWcsICckMi4kMyAkNDokNScpO1xyXG4gICAgICAgICAgICByZXQuY29uc3VtZXJOYW1lID0gYWRyZXNzSnNvbi5uYW1lO1xyXG4gICAgICAgICAgICByZXQuY29uc3VtZXJNb2JpbGUgPSBhZHJlc3NKc29uLnRlbGVwaG9uZTtcclxuICAgICAgICAgICAgcmV0LmNvbnN1bWVyQWRkcmVzcyA9IGAke2FkcmVzc0pzb24ucHJvdmluY2VTdHJ9JHthZHJlc3NKc29uLmNpdHlTdHJ9XHJcbiAgICAgICAgICAgICR7YWRyZXNzSnNvbi5hcmVhU3RyfSR7YWRyZXNzSnNvbi5hZGRyZXNzfWA7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICB0b2FzdChlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJldDtcclxuICAgIH1cclxuICAgIGFzeW5jIG9uTG9hZCAob3B0aW9ucykge1xyXG4gICAgICAgIGNvbnN0IHsgaWQgfSA9IG9wdGlvbnM7XHJcbiAgICAgICAgY29uc3QgW2UsIGRhdGFdID0gYXdhaXQgZ2V0KGAvY29uc3VtZXJBcHBvaW50bWVudC9nZXQvJHtpZH1gKTtcclxuICAgICAgICBpZiAoZSkge1xyXG4gICAgICAgICAgICB0b2FzdChlKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBvcmRlciA9IHRoaXMucGFyc2VPcmRlcihkYXRhKTtcclxuICAgICAgICB0aGlzLm9yZGVyID0gT2JqZWN0LmFzc2lnbih7fSwgb3JkZXIpO1xyXG4gICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICB9XHJcbn1cclxuIl19