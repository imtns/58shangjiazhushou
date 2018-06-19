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
            statusSet: ['已下单', '已接单', '已评价', '已取消', '已删除'],
            contentSet: ['顾客已下单，请尽快与顾客联系', '请尽快与顾客联系，并提供服务', '顾客已取消订单'],
            order: {},
            submitSuccess: false
        }, _this.methods = {
            bindPhoneCall: function bindPhoneCall(phoneNumber) {
                _wepy2.default.makePhoneCall({ phoneNumber: phoneNumber });
            },
            bindSubmitOrder: function bindSubmitOrder() {
                this.submitOrder();
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(OrderDetail, [{
        key: 'submitOrder',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var id, _ref3, _ref4, e;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                id = this.order.id;
                                _context.next = 3;
                                return (0, _ajaxP.post)('/consumerAppointment/accept/' + id);

                            case 3:
                                _ref3 = _context.sent;
                                _ref4 = _slicedToArray(_ref3, 1);
                                e = _ref4[0];

                                if (!e) {
                                    _context.next = 9;
                                    break;
                                }

                                (0, _utils.toast)(e);
                                return _context.abrupt('return');

                            case 9:
                                this.submitSuccess = true;
                                this.$apply();

                            case 11:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function submitOrder() {
                return _ref2.apply(this, arguments);
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
            var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(options) {
                var id, _ref6, _ref7, e, data, order;

                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                id = options.id;
                                _context2.next = 3;
                                return (0, _ajaxP.get)('/consumerAppointment/get/' + id);

                            case 3:
                                _ref6 = _context2.sent;
                                _ref7 = _slicedToArray(_ref6, 2);
                                e = _ref7[0];
                                data = _ref7[1];

                                if (!e) {
                                    _context2.next = 10;
                                    break;
                                }

                                (0, _utils.toast)(e);
                                return _context2.abrupt('return');

                            case 10:
                                order = this.parseOrder(data);

                                this.order = Object.assign({}, order);
                                this.$apply();

                            case 13:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function onLoad(_x) {
                return _ref5.apply(this, arguments);
            }

            return onLoad;
        }()
    }]);

    return OrderDetail;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(OrderDetail , 'pages/OrderDetail'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIk9yZGVyRGV0YWlsLmpzIl0sIm5hbWVzIjpbIk9yZGVyRGV0YWlsIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJmb250Q2xhc3MiLCJzdGF0dXNTZXQiLCJjb250ZW50U2V0Iiwib3JkZXIiLCJzdWJtaXRTdWNjZXNzIiwibWV0aG9kcyIsImJpbmRQaG9uZUNhbGwiLCJwaG9uZU51bWJlciIsIndlcHkiLCJtYWtlUGhvbmVDYWxsIiwiYmluZFN1Ym1pdE9yZGVyIiwic3VibWl0T3JkZXIiLCJpZCIsImUiLCIkYXBwbHkiLCJyZXQiLCJhZHJlc3NKc29uIiwiSlNPTiIsInBhcnNlIiwiY29uc3VtZXJBZGRyZXNzSnNvbiIsInJlZyIsImNyZWF0ZVRpbWUiLCJyZXBsYWNlIiwic3RhcnRUaW1lIiwiZW5kVGltZSIsImNvbnN1bWVyTmFtZSIsIm5hbWUiLCJjb25zdW1lck1vYmlsZSIsInRlbGVwaG9uZSIsImNvbnN1bWVyQWRkcmVzcyIsInByb3ZpbmNlU3RyIiwiY2l0eVN0ciIsImFyZWFTdHIiLCJhZGRyZXNzIiwib3B0aW9ucyIsInBhcnNlT3JkZXIiLCJPYmplY3QiLCJhc3NpZ24iLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7O0lBR3FCQSxXOzs7Ozs7Ozs7Ozs7OztvTUFDakJDLE0sR0FBUztBQUNMQyxvQ0FBd0I7QUFEbkIsUyxRQUdUQyxJLEdBQU87QUFDSEMsdUJBQVcsQ0FBQyxRQUFELEVBQVcsUUFBWCxFQUFxQixRQUFyQixFQUErQixRQUEvQixFQUF5QyxRQUF6QyxDQURSO0FBRUhDLHVCQUFXLENBQUMsS0FBRCxFQUFRLEtBQVIsRUFBZSxLQUFmLEVBQXNCLEtBQXRCLEVBQTZCLEtBQTdCLENBRlI7QUFHSEMsd0JBQVksQ0FBQyxnQkFBRCxFQUFtQixnQkFBbkIsRUFBcUMsU0FBckMsQ0FIVDtBQUlIQyxtQkFBTyxFQUpKO0FBS0hDLDJCQUFlO0FBTFosUyxRQU9QQyxPLEdBQVU7QUFDTkMseUJBRE0seUJBQ1NDLFdBRFQsRUFDc0I7QUFDeEJDLCtCQUFLQyxhQUFMLENBQW1CLEVBQUVGLHdCQUFGLEVBQW5CO0FBQ0gsYUFISztBQUlORywyQkFKTSw2QkFJYTtBQUNmLHFCQUFLQyxXQUFMO0FBQ0g7QUFOSyxTOzs7Ozs7Ozs7Ozs7O0FBU0VDLGtDLEdBQU8sS0FBS1QsSyxDQUFaUyxFOzt1Q0FDVSxrREFBb0NBLEVBQXBDLEM7Ozs7O0FBQVhDLGlDOztxQ0FDSEEsQzs7Ozs7QUFDQSxrREFBTUEsQ0FBTjs7OztBQUdKLHFDQUFLVCxhQUFMLEdBQXFCLElBQXJCO0FBQ0EscUNBQUtVLE1BQUw7Ozs7Ozs7Ozs7Ozs7Ozs7OzttQ0FFUWYsSSxFQUFNO0FBQ2QsZ0JBQU1nQixNQUFNaEIsUUFBUSxFQUFwQjtBQUNBLGdCQUFNaUIsYUFBYUMsS0FBS0MsS0FBTCxDQUFXbkIsS0FBS29CLG1CQUFoQixDQUFuQjtBQUNBLGdCQUFJO0FBQ0Esb0JBQU1DLE1BQU0scUdBQVo7QUFDQUwsb0JBQUlNLFVBQUosR0FBaUJ0QixLQUFLc0IsVUFBTCxDQUFnQkMsT0FBaEIsQ0FBd0JGLEdBQXhCLEVBQTZCLGFBQTdCLENBQWpCO0FBQ0FMLG9CQUFJUSxTQUFKLEdBQWdCeEIsS0FBS3dCLFNBQUwsQ0FBZUQsT0FBZixDQUF1QkYsR0FBdkIsRUFBNEIsYUFBNUIsQ0FBaEI7QUFDQUwsb0JBQUlTLE9BQUosR0FBY3pCLEtBQUt5QixPQUFMLENBQWFGLE9BQWIsQ0FBcUJGLEdBQXJCLEVBQTBCLGFBQTFCLENBQWQ7QUFDQUwsb0JBQUlVLFlBQUosR0FBbUJULFdBQVdVLElBQTlCO0FBQ0FYLG9CQUFJWSxjQUFKLEdBQXFCWCxXQUFXWSxTQUFoQztBQUNBYixvQkFBSWMsZUFBSixRQUF5QmIsV0FBV2MsV0FBcEMsR0FBa0RkLFdBQVdlLE9BQTdELHNCQUNFZixXQUFXZ0IsT0FEYixHQUN1QmhCLFdBQVdpQixPQURsQztBQUVILGFBVEQsQ0FTRSxPQUFPcEIsQ0FBUCxFQUFVO0FBQ1Isa0NBQU1BLENBQU47QUFDSDtBQUNELG1CQUFPRSxHQUFQO0FBQ0g7Ozs7a0dBQ2FtQixPOzs7Ozs7O0FBQ0Z0QixrQyxHQUFPc0IsTyxDQUFQdEIsRTs7dUNBQ2dCLDhDQUFnQ0EsRUFBaEMsQzs7Ozs7QUFBakJDLGlDO0FBQUdkLG9DOztxQ0FDTmMsQzs7Ozs7QUFDQSxrREFBTUEsQ0FBTjs7OztBQUdFVixxQyxHQUFRLEtBQUtnQyxVQUFMLENBQWdCcEMsSUFBaEIsQzs7QUFDZCxxQ0FBS0ksS0FBTCxHQUFhaUMsT0FBT0MsTUFBUCxDQUFjLEVBQWQsRUFBa0JsQyxLQUFsQixDQUFiO0FBQ0EscUNBQUtXLE1BQUw7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUF2RGlDTixlQUFLOEIsSTs7a0JBQXpCMUMsVyIsImZpbGUiOiJPcmRlckRldGFpbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcclxuaW1wb3J0IHsgZ2V0LCBwb3N0IH0gZnJvbSAnLi4vdXRpbHMvYWpheFAnO1xyXG5pbXBvcnQgeyB0b2FzdCB9IGZyb20gJy4uL3V0aWxzJztcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPcmRlckRldGFpbCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgICBjb25maWcgPSB7XHJcbiAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+iuouWNleeuoeeQhicsXHJcbiAgICB9XHJcbiAgICBkYXRhID0ge1xyXG4gICAgICAgIGZvbnRDbGFzczogWydhY3RpdmUnLCAnYWN0aXZlJywgJ2FjdGl2ZScsICdjYW5jZWwnLCAnZmluaXNoJ10sXHJcbiAgICAgICAgc3RhdHVzU2V0OiBbJ+W3suS4i+WNlScsICflt7LmjqXljZUnLCAn5bey6K+E5Lu3JywgJ+W3suWPlua2iCcsICflt7LliKDpmaQnXSxcclxuICAgICAgICBjb250ZW50U2V0OiBbJ+mhvuWuouW3suS4i+WNle+8jOivt+WwveW/q+S4jumhvuWuouiBlOezuycsICfor7flsL3lv6vkuI7pob7lrqLogZTns7vvvIzlubbmj5DkvpvmnI3liqEnLCAn6aG+5a6i5bey5Y+W5raI6K6i5Y2VJ10sXHJcbiAgICAgICAgb3JkZXI6IHt9LFxyXG4gICAgICAgIHN1Ym1pdFN1Y2Nlc3M6IGZhbHNlLFxyXG4gICAgfVxyXG4gICAgbWV0aG9kcyA9IHtcclxuICAgICAgICBiaW5kUGhvbmVDYWxsIChwaG9uZU51bWJlcikge1xyXG4gICAgICAgICAgICB3ZXB5Lm1ha2VQaG9uZUNhbGwoeyBwaG9uZU51bWJlciB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJpbmRTdWJtaXRPcmRlciAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3VibWl0T3JkZXIoKTtcclxuICAgICAgICB9LFxyXG4gICAgfVxyXG4gICAgYXN5bmMgc3VibWl0T3JkZXIgKCkge1xyXG4gICAgICAgIGNvbnN0IHsgaWQgfSA9IHRoaXMub3JkZXI7XHJcbiAgICAgICAgY29uc3QgW2VdID0gYXdhaXQgcG9zdChgL2NvbnN1bWVyQXBwb2ludG1lbnQvYWNjZXB0LyR7aWR9YCk7XHJcbiAgICAgICAgaWYgKGUpIHtcclxuICAgICAgICAgICAgdG9hc3QoZSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zdWJtaXRTdWNjZXNzID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgfVxyXG4gICAgcGFyc2VPcmRlciAoZGF0YSkge1xyXG4gICAgICAgIGNvbnN0IHJldCA9IGRhdGEgfHwge307XHJcbiAgICAgICAgY29uc3QgYWRyZXNzSnNvbiA9IEpTT04ucGFyc2UoZGF0YS5jb25zdW1lckFkZHJlc3NKc29uKTtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCByZWcgPSAvKFxcZHs0fSktKFswLTFdezAsMX1cXGR7MX0pLShbMC0zXXswLDF9XFxkezF9KSAoWzAtNl17MCwxfVxcZHsxfSk6KFswLTZdezAsMX1cXGR7MX0pOihbMC02XXswLDF9XFxkezF9KS4rLztcclxuICAgICAgICAgICAgcmV0LmNyZWF0ZVRpbWUgPSBkYXRhLmNyZWF0ZVRpbWUucmVwbGFjZShyZWcsICckMi4kMyAkNDokNScpO1xyXG4gICAgICAgICAgICByZXQuc3RhcnRUaW1lID0gZGF0YS5zdGFydFRpbWUucmVwbGFjZShyZWcsICckMi4kMyAkNDokNScpO1xyXG4gICAgICAgICAgICByZXQuZW5kVGltZSA9IGRhdGEuZW5kVGltZS5yZXBsYWNlKHJlZywgJyQyLiQzICQ0OiQ1Jyk7XHJcbiAgICAgICAgICAgIHJldC5jb25zdW1lck5hbWUgPSBhZHJlc3NKc29uLm5hbWU7XHJcbiAgICAgICAgICAgIHJldC5jb25zdW1lck1vYmlsZSA9IGFkcmVzc0pzb24udGVsZXBob25lO1xyXG4gICAgICAgICAgICByZXQuY29uc3VtZXJBZGRyZXNzID0gYCR7YWRyZXNzSnNvbi5wcm92aW5jZVN0cn0ke2FkcmVzc0pzb24uY2l0eVN0cn1cclxuICAgICAgICAgICAgJHthZHJlc3NKc29uLmFyZWFTdHJ9JHthZHJlc3NKc29uLmFkZHJlc3N9YDtcclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIHRvYXN0KGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmV0O1xyXG4gICAgfVxyXG4gICAgYXN5bmMgb25Mb2FkIChvcHRpb25zKSB7XHJcbiAgICAgICAgY29uc3QgeyBpZCB9ID0gb3B0aW9ucztcclxuICAgICAgICBjb25zdCBbZSwgZGF0YV0gPSBhd2FpdCBnZXQoYC9jb25zdW1lckFwcG9pbnRtZW50L2dldC8ke2lkfWApO1xyXG4gICAgICAgIGlmIChlKSB7XHJcbiAgICAgICAgICAgIHRvYXN0KGUpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IG9yZGVyID0gdGhpcy5wYXJzZU9yZGVyKGRhdGEpO1xyXG4gICAgICAgIHRoaXMub3JkZXIgPSBPYmplY3QuYXNzaWduKHt9LCBvcmRlcik7XHJcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgIH1cclxufVxyXG4iXX0=