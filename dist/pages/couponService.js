'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _mixin = require('./../mixin/index.js');

var _mixin2 = _interopRequireDefault(_mixin);

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
        }, _this.mixins = [_mixin2.default], _this.data = {
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvdXBvblNlcnZpY2UuanMiXSwibmFtZXMiOlsicGFnZVNpemUiLCJwYWdlTnVtIiwiSW5kZXgiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwibWl4aW5zIiwiTWl4aW4iLCJkYXRhIiwic2VydmljZXMiLCJzaG93UHJvZHVjdCIsImdyb3VwcyIsIm5hbWUiLCJpZCIsImN1cnJlbnRHcm91cCIsInNlbGVjdGVkU2VydmljZXMiLCJhbGxTZXJ2aWNlcyIsImFwcGx5VHlwZSIsInNlcnZpY2VJZHMiLCJtZXRob2RzIiwiY2hvb3NlR3JvdXAiLCJyZXNvdXJjZUdyb3VwIiwiZ2V0U2VydmljZXMiLCIkYXBwbHkiLCJjaG9vc2VTZXJ2aWNlIiwiaW5kZXgiLCJzZXJ2aWNlIiwiY2hlY2tlZCIsInVwZGF0ZVNlbGVjdGVkIiwiY2hvb3NlQWxsIiwibWFwIiwiT2JqZWN0IiwiYXNzaWduIiwiaXRlbSIsImNvbmNhdCIsImNvbmZpcm0iLCJ3ZXB5IiwibmF2aWdhdGVCYWNrIiwiY29tcHV0ZWQiLCJyZXN1bHQiLCJqb2luIiwiaW5kZXhPZiIsInNwbGljZSIsInB1c2giLCJsZW5ndGgiLCJtcGlkIiwiZ2V0U3RvcmFnZVN5bmMiLCJMT0FEX1NFUlZJQ0VfR1JPVVBTIiwiY291cG9uTWFuYWdlIiwiZ2xvYmFsU2VydmljZSIsImdldCIsInNwbGl0IiwiZXJyb3JIYW5kbGVyIiwidXBkYXRlRGF0YSIsInNldCIsIkxPQURfU0VSVklDRV9MSVNUIiwicGljcyIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQ0E7Ozs7QUFFQTs7OztBQUVBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLFdBQVcsRUFBakI7QUFDQSxJQUFNQyxVQUFVLENBQWhCOztJQUVxQkMsSzs7Ozs7Ozs7Ozs7Ozs7d0xBQ2pCQyxNLEdBQVM7QUFDTEMsb0NBQXdCO0FBRG5CLFMsUUFJVEMsTSxHQUFTLENBQUNDLGVBQUQsQyxRQUVUQyxJLEdB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ImZpbGUiOiJjb3Vwb25TZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcblxuaW1wb3J0IE1peGluIGZyb20gJy4uL21peGluJztcblxuaW1wb3J0IHsgcGljU3JjRG9tYWluIH0gZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IHsgTE9BRF9TRVJWSUNFX0dST1VQUywgTE9BRF9TRVJWSUNFX0xJU1QgfSBmcm9tICcuLi91dGlscy91cmwnO1xuaW1wb3J0IHsgZ2V0IH0gZnJvbSAnLi4vdXRpbHMvYWpheCc7XG5pbXBvcnQgZ2xvYmFsU2VydmljZSBmcm9tICcuLi91dGlscy9nbG9iYWxTZXJ2aWNlJztcblxuY29uc3QgcGFnZVNpemUgPSAyMDtcbmNvbnN0IHBhZ2VOdW0gPSAxO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5LyY5oOg5Yi46YCC55So5Lqn5ZOBJyxcbiAgICB9XG5cbiAgICBtaXhpbnMgPSBbTWl4aW5dXG5cbiAgICBkYXRhID0ge1xuICAgICAgICBzZXJ2aWNlczogW10sXG4gICAgICAgIHNob3dQcm9kdWN0OiBmYWxzZSxcbiAgICAgICAgZ3JvdXBzOiBbe1xuICAgICAgICAgICAgbmFtZTogJ+aJgOacieS6p+WTgScsXG4gICAgICAgICAgICBpZDogJycsXG4gICAgICAgIH1dLFxuICAgICAgICBjdXJyZW50R3JvdXA6ICfmiYDmnInkuqflk4EnLFxuICAgICAgICBzZWxlY3RlZFNlcnZpY2VzOiBbXSwgLy8g5bey6YCJ5Lqn5ZOBXG4gICAgICAgIGFsbFNlcnZpY2VzOiBbXSwgLy8g5YWo6YOo5Lqn5ZOBXG5cbiAgICAgICAgYXBwbHlUeXBlOiAxLCAvLyAxIOWFqOmDqOS6p+WTge+8jDIg5oyH5a6a5Lqn5ZOBXG4gICAgICAgIHNlcnZpY2VJZHM6ICcnLFxuICAgIH1cblxuICAgIG1ldGhvZHMgPSB7XG4gICAgICAgIHNob3dQcm9kdWN0KCkge1xuICAgICAgICAgICAgdGhpcy5zaG93UHJvZHVjdCA9ICF0aGlzLnNob3dQcm9kdWN0O1xuICAgICAgICB9LFxuXG4gICAgICAgIGFzeW5jIGNob29zZUdyb3VwKHJlc291cmNlR3JvdXAsIG5hbWUpIHtcbiAgICAgICAgICAgIGNvbnN0IHNlcnZpY2VzID0gYXdhaXQgdGhpcy5nZXRTZXJ2aWNlcyhyZXNvdXJjZUdyb3VwKTtcbiAgICAgICAgICAgIHRoaXMuc2VydmljZXMgPSBzZXJ2aWNlcztcbiAgICAgICAgICAgIHRoaXMuY3VycmVudEdyb3VwID0gbmFtZTtcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgY2hvb3NlU2VydmljZShpbmRleCkge1xuICAgICAgICAgICAgY29uc3Qgc2VydmljZSA9IHRoaXMuc2VydmljZXNbaW5kZXhdO1xuICAgICAgICAgICAgc2VydmljZS5jaGVja2VkID0gIXNlcnZpY2UuY2hlY2tlZDtcbiAgICAgICAgICAgIHRoaXMuYXBwbHlUeXBlID0gMjtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlU2VsZWN0ZWQoaW5kZXgpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGNob29zZUFsbCgpIHtcbiAgICAgICAgICAgIHRoaXMuc2VydmljZXMgPSB0aGlzLnNlcnZpY2VzLm1hcChpdGVtID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBzZXJ2aWNlID0gT2JqZWN0LmFzc2lnbih7fSwgaXRlbSk7XG4gICAgICAgICAgICAgICAgc2VydmljZS5jaGVja2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2VydmljZTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLmFwcGx5VHlwZSA9IDE7XG4gICAgICAgICAgICB0aGlzLnNlcnZpY2VJZHMgPSAnJztcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRTZXJ2aWNlcyA9IHRoaXMuYWxsU2VydmljZXMuY29uY2F0KCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgY29uZmlybSgpIHtcbiAgICAgICAgICAgIHdlcHkubmF2aWdhdGVCYWNrKCk7XG4gICAgICAgIH0sXG4gICAgfVxuXG4gICAgY29tcHV0ZWQgPSB7XG4gICAgICAgIHNlcnZpY2VJZHMoKSB7XG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gJyc7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmFwcGx5VHlwZSA9PT0gMSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9ICcnO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSB0aGlzLnNlbGVjdGVkU2VydmljZXMuam9pbignLCcpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9LFxuICAgIH1cblxuICAgIC8vIOmAmui/h+WcqOaVsOe7hOS4reeahOS9jee9ruiusOW9le+8jOWHj+WwkeaIkOacrFxuICAgIHVwZGF0ZVNlbGVjdGVkKGluZGV4KSB7XG4gICAgICAgIGNvbnN0IHsgaWQgfSA9IHRoaXMuc2VydmljZXNbaW5kZXhdO1xuICAgICAgICBjb25zdCB7IHNlbGVjdGVkU2VydmljZXMgfSA9IHRoaXM7XG5cbiAgICAgICAgaWYgKH5zZWxlY3RlZFNlcnZpY2VzLmluZGV4T2YoaWQpKSB7XG4gICAgICAgICAgICBzZWxlY3RlZFNlcnZpY2VzLnNwbGljZShzZWxlY3RlZFNlcnZpY2VzLmluZGV4T2YoaWQpLCAxKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNlbGVjdGVkU2VydmljZXMucHVzaChpZCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyDlhajpg6jkuqflk4HpgInmi6lcbiAgICAgICAgaWYgKHNlbGVjdGVkU2VydmljZXMubGVuZ3RoID09PSB0aGlzLmFsbFNlcnZpY2VzLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5hcHBseVR5cGUgPSAxO1xuICAgICAgICAgICAgdGhpcy5zZXJ2aWNlSWRzID0gJyc7XG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXN5bmMgb25Mb2FkKCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgbXBpZCA9IHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ2N1cnJlbnRfbXBpZCcpO1xuXG4gICAgICAgICAgICAvLyDojrflj5bliIbnu4RcbiAgICAgICAgICAgIGNvbnN0IHsgZGF0YTogZ3JvdXBzIH0gPSBhd2FpdCBnZXQoTE9BRF9TRVJWSUNFX0dST1VQUywge1xuICAgICAgICAgICAgICAgIG1waWQsXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8g6I635Y+W6aKE57qm57uE5Lu2XG4gICAgICAgICAgICBsZXQgc2VydmljZXMgPSBhd2FpdCB0aGlzLmdldFNlcnZpY2VzKCk7XG4gICAgICAgICAgICB0aGlzLmFsbFNlcnZpY2VzID0gc2VydmljZXMubWFwKGl0ZW0gPT4gaXRlbS5pZCk7XG5cbiAgICAgICAgICAgIC8vIOWQjOatpeW3sumAieS6p+WTgVxuICAgICAgICAgICAgY29uc3QgY291cG9uTWFuYWdlID0gZ2xvYmFsU2VydmljZS5nZXQoJ2NvdXBvbk1hbmFnZScpO1xuICAgICAgICAgICAgY29uc3QgeyBzZXJ2aWNlSWRzID0gJycsIGFwcGx5VHlwZSB9ID0gY291cG9uTWFuYWdlO1xuICAgICAgICAgICAgY29uc3QgYWxsU2VydmljZXMgPSBbXTtcblxuICAgICAgICAgICAgLy8g5oyH5a6a5Lqn5ZOBXG4gICAgICAgICAgICBpZiAoYXBwbHlUeXBlID09PSAyICYmIGNvdXBvbk1hbmFnZS5zZXJ2aWNlSWRzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFNlcnZpY2VzID0gc2VydmljZUlkcy5zcGxpdCgnLCcpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzZXJ2aWNlcyA9IHNlcnZpY2VzLm1hcChpdGVtID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBzZXJ2aWNlID0gT2JqZWN0LmFzc2lnbih7fSwgaXRlbSk7XG4gICAgICAgICAgICAgICAgLy8g5Zug5Li66buY6K6k6YCJ5oup5omA5pyJ5Lqn5ZOB77yM5omA5Lul5q2k5pe26IO95aSf6I635Y+W5Yiw5omA5pyJ5Lqn5ZOBXG4gICAgICAgICAgICAgICAgYWxsU2VydmljZXMucHVzaChzZXJ2aWNlLmlkKTtcblxuICAgICAgICAgICAgICAgIGlmICh+c2VydmljZUlkcy5pbmRleE9mKHNlcnZpY2UuaWQpICYmIGFwcGx5VHlwZSA9PT0gMikge1xuICAgICAgICAgICAgICAgICAgICBzZXJ2aWNlLmNoZWNrZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gc2VydmljZTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLmFsbFNlcnZpY2VzID0gYWxsU2VydmljZXM7XG4gICAgICAgICAgICB0aGlzLmFwcGx5VHlwZSA9IGFwcGx5VHlwZTtcbiAgICAgICAgICAgIHRoaXMuc2VydmljZXMgPSBzZXJ2aWNlcztcbiAgICAgICAgICAgIHRoaXMuZ3JvdXBzID0gdGhpcy5ncm91cHMuY29uY2F0KGdyb3Vwcyk7XG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICB0aGlzLmVycm9ySGFuZGxlcihlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uVW5sb2FkKCkge1xuICAgICAgICB0aGlzLnVwZGF0ZURhdGEoKTtcbiAgICB9XG5cbiAgICB1cGRhdGVEYXRhKCkge1xuICAgICAgICBjb25zdCBjb3Vwb25NYW5hZ2UgPSBnbG9iYWxTZXJ2aWNlLmdldCgnY291cG9uTWFuYWdlJyk7XG4gICAgICAgIGdsb2JhbFNlcnZpY2Uuc2V0KCdjb3Vwb25NYW5hZ2UnLCBPYmplY3QuYXNzaWduKGNvdXBvbk1hbmFnZSwge1xuICAgICAgICAgICAgYXBwbHlUeXBlOiB0aGlzLmFwcGx5VHlwZSxcbiAgICAgICAgICAgIHNlcnZpY2VJZHM6IHRoaXMuc2VydmljZUlkcyxcbiAgICAgICAgfSkpO1xuICAgIH1cblxuICAgIGFzeW5jIGdldFNlcnZpY2VzKHJlc291cmNlR3JvdXAgPSAnJykge1xuICAgICAgICBjb25zdCB7IHNlbGVjdGVkU2VydmljZXMgfSA9IHRoaXM7XG4gICAgICAgIGNvbnN0IG1waWQgPSB3ZXB5LmdldFN0b3JhZ2VTeW5jKCdjdXJyZW50X21waWQnKTtcbiAgICAgICAgLy8g6I635Y+W5omA5pyJ5Lqn5ZOBXG4gICAgICAgIGNvbnN0IHsgZGF0YTogeyBkYXRhOiBzZXJ2aWNlcyB9ID0ge30gfSA9IGF3YWl0IGdldChMT0FEX1NFUlZJQ0VfTElTVCwge1xuICAgICAgICAgICAgbXBpZCxcbiAgICAgICAgICAgIHBhZ2VOdW0sXG4gICAgICAgICAgICBwYWdlU2l6ZSxcbiAgICAgICAgICAgIHJlc291cmNlR3JvdXAsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBzZXJ2aWNlcy5tYXAoaXRlbSA9PiB7XG4gICAgICAgICAgICBjb25zdCBzZXJ2aWNlID0gT2JqZWN0LmFzc2lnbih7fSwgaXRlbSk7XG5cbiAgICAgICAgICAgIC8vIOWbvueJh+WkhOeQhlxuICAgICAgICAgICAgc2VydmljZS5waWNzID0gcGljU3JjRG9tYWluKCkgKyBzZXJ2aWNlLnBpY3M7XG4gICAgICAgICAgICAvLyBjaGVja+WkhOeQhlxuICAgICAgICAgICAgaWYgKCFzZWxlY3RlZFNlcnZpY2VzLmluZGV4T2YoaXRlbS5pZCkpIHtcbiAgICAgICAgICAgICAgICBzZXJ2aWNlLmNoZWNrZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHNlcnZpY2U7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiJdfQ==