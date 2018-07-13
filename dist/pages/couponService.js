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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvdXBvblNlcnZpY2UuanMiXSwibmFtZXMiOlsicGFnZVNpemUiLCJwYWdlTnVtIiwiSW5kZXgiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwibWl4aW5zIiwiTWl4aW4iLCJkYXRhIiwic2VydmljZXMiLCJzaG93UHJvZHVjdCIsImdyb3VwcyIsIm5hbWUiLCJpZCIsImN1cnJlbnRHcm91cCIsInNlbGVjdGVkU2VydmljZXMiLCJhbGxTZXJ2aWNlcyIsImFwcGx5VHlwZSIsInNlcnZpY2VJZHMiLCJtZXRob2RzIiwiY2hvb3NlR3JvdXAiLCJyZXNvdXJjZUdyb3VwIiwiZ2V0U2VydmljZXMiLCIkYXBwbHkiLCJjaG9vc2VTZXJ2aWNlIiwiaW5kZXgiLCJzZXJ2aWNlIiwiY2hlY2tlZCIsInVwZGF0ZVNlbGVjdGVkIiwiY2hvb3NlQWxsIiwibWFwIiwiT2JqZWN0IiwiYXNzaWduIiwiaXRlbSIsImNvbmNhdCIsImNvbmZpcm0iLCJ3ZXB5IiwibmF2aWdhdGVCYWNrIiwiY29tcHV0ZWQiLCJyZXN1bHQiLCJqb2luIiwiaW5kZXhPZiIsInNwbGljZSIsInB1c2giLCJsZW5ndGgiLCJtcGlkIiwiZ2V0U3RvcmFnZVN5bmMiLCJMT0FEX1NFUlZJQ0VfR1JPVVBTIiwiY291cG9uTWFuYWdlIiwiZ2xvYmFsU2VydmljZSIsImdldCIsInNwbGl0IiwiZXJyb3JIYW5kbGVyIiwidXBkYXRlRGF0YSIsInNldCIsIkxPQURfU0VSVklDRV9MSVNUIiwicGljcyIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQ0E7Ozs7QUFFQTs7OztBQUVBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLFdBQVcsRUFBakI7QUFDQSxJQUFNQyxVQUFVLENBQWhCOztJQUVxQkMsSzs7Ozs7Ozs7Ozs7Ozs7d0xBQ2pCQyxNLEdBQVM7QUFDTEMsb0NBQXdCO0FBRG5CLFMsUUFJVEMsTSxHQUFTLENBQUNDLGdCQUFELEMsUUFFVEMsSSxH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LCJmaWxlIjoiY291cG9uU2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcclxuXHJcbmltcG9ydCBNaXhpbiBmcm9tICcuLi9taXhpbnMnO1xyXG5cclxuaW1wb3J0IHsgcGljU3JjRG9tYWluIH0gZnJvbSAnLi4vdXRpbHMnO1xyXG5pbXBvcnQgeyBMT0FEX1NFUlZJQ0VfR1JPVVBTLCBMT0FEX1NFUlZJQ0VfTElTVCB9IGZyb20gJy4uL3V0aWxzL3VybCc7XHJcbmltcG9ydCB7IGdldCB9IGZyb20gJy4uL3V0aWxzL2FqYXgnO1xyXG5pbXBvcnQgZ2xvYmFsU2VydmljZSBmcm9tICcuLi91dGlscy9nbG9iYWxTZXJ2aWNlJztcclxuXHJcbmNvbnN0IHBhZ2VTaXplID0gMjA7XHJcbmNvbnN0IHBhZ2VOdW0gPSAxO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gICAgY29uZmlnID0ge1xyXG4gICAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfkvJjmg6DliLjpgILnlKjkuqflk4EnLFxyXG4gICAgfVxyXG5cclxuICAgIG1peGlucyA9IFtNaXhpbl1cclxuXHJcbiAgICBkYXRhID0ge1xyXG4gICAgICAgIHNlcnZpY2VzOiBbXSxcclxuICAgICAgICBzaG93UHJvZHVjdDogZmFsc2UsXHJcbiAgICAgICAgZ3JvdXBzOiBbe1xyXG4gICAgICAgICAgICBuYW1lOiAn5omA5pyJ5Lqn5ZOBJyxcclxuICAgICAgICAgICAgaWQ6ICcnLFxyXG4gICAgICAgIH1dLFxyXG4gICAgICAgIGN1cnJlbnRHcm91cDogJ+aJgOacieS6p+WTgScsXHJcbiAgICAgICAgc2VsZWN0ZWRTZXJ2aWNlczogW10sIC8vIOW3sumAieS6p+WTgVxyXG4gICAgICAgIGFsbFNlcnZpY2VzOiBbXSwgLy8g5YWo6YOo5Lqn5ZOBXHJcblxyXG4gICAgICAgIGFwcGx5VHlwZTogMSwgLy8gMSDlhajpg6jkuqflk4HvvIwyIOaMh+WumuS6p+WTgVxyXG4gICAgICAgIHNlcnZpY2VJZHM6ICcnLFxyXG4gICAgfVxyXG5cclxuICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgICAgc2hvd1Byb2R1Y3QoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd1Byb2R1Y3QgPSAhdGhpcy5zaG93UHJvZHVjdDtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBhc3luYyBjaG9vc2VHcm91cChyZXNvdXJjZUdyb3VwLCBuYW1lKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNlcnZpY2VzID0gYXdhaXQgdGhpcy5nZXRTZXJ2aWNlcyhyZXNvdXJjZUdyb3VwKTtcclxuICAgICAgICAgICAgdGhpcy5zZXJ2aWNlcyA9IHNlcnZpY2VzO1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRHcm91cCA9IG5hbWU7XHJcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgY2hvb3NlU2VydmljZShpbmRleCkge1xyXG4gICAgICAgICAgICBjb25zdCBzZXJ2aWNlID0gdGhpcy5zZXJ2aWNlc1tpbmRleF07XHJcbiAgICAgICAgICAgIHNlcnZpY2UuY2hlY2tlZCA9ICFzZXJ2aWNlLmNoZWNrZWQ7XHJcbiAgICAgICAgICAgIHRoaXMuYXBwbHlUeXBlID0gMjtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVTZWxlY3RlZChpbmRleCk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgY2hvb3NlQWxsKCkge1xyXG4gICAgICAgICAgICB0aGlzLnNlcnZpY2VzID0gdGhpcy5zZXJ2aWNlcy5tYXAoaXRlbSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzZXJ2aWNlID0gT2JqZWN0LmFzc2lnbih7fSwgaXRlbSk7XHJcbiAgICAgICAgICAgICAgICBzZXJ2aWNlLmNoZWNrZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNlcnZpY2U7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5hcHBseVR5cGUgPSAxO1xyXG4gICAgICAgICAgICB0aGlzLnNlcnZpY2VJZHMgPSAnJztcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFNlcnZpY2VzID0gdGhpcy5hbGxTZXJ2aWNlcy5jb25jYXQoKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBjb25maXJtKCkge1xyXG4gICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlQmFjaygpO1xyXG4gICAgICAgIH0sXHJcbiAgICB9XHJcblxyXG4gICAgY29tcHV0ZWQgPSB7XHJcbiAgICAgICAgc2VydmljZUlkcygpIHtcclxuICAgICAgICAgICAgbGV0IHJlc3VsdCA9ICcnO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuYXBwbHlUeXBlID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQgPSAnJztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMuc2VsZWN0ZWRTZXJ2aWNlcy5qb2luKCcsJyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfSxcclxuICAgIH1cclxuXHJcbiAgICAvLyDpgJrov4flnKjmlbDnu4TkuK3nmoTkvY3nva7orrDlvZXvvIzlh4/lsJHmiJDmnKxcclxuICAgIHVwZGF0ZVNlbGVjdGVkKGluZGV4KSB7XHJcbiAgICAgICAgY29uc3QgeyBpZCB9ID0gdGhpcy5zZXJ2aWNlc1tpbmRleF07XHJcbiAgICAgICAgY29uc3QgeyBzZWxlY3RlZFNlcnZpY2VzIH0gPSB0aGlzO1xyXG5cclxuICAgICAgICBpZiAofnNlbGVjdGVkU2VydmljZXMuaW5kZXhPZihpZCkpIHtcclxuICAgICAgICAgICAgc2VsZWN0ZWRTZXJ2aWNlcy5zcGxpY2Uoc2VsZWN0ZWRTZXJ2aWNlcy5pbmRleE9mKGlkKSwgMSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc2VsZWN0ZWRTZXJ2aWNlcy5wdXNoKGlkKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIOWFqOmDqOS6p+WTgemAieaLqVxyXG4gICAgICAgIGlmIChzZWxlY3RlZFNlcnZpY2VzLmxlbmd0aCA9PT0gdGhpcy5hbGxTZXJ2aWNlcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdGhpcy5hcHBseVR5cGUgPSAxO1xyXG4gICAgICAgICAgICB0aGlzLnNlcnZpY2VJZHMgPSAnJztcclxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgb25Mb2FkKCkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG1waWQgPSB3ZXB5LmdldFN0b3JhZ2VTeW5jKCdjdXJyZW50X21waWQnKTtcclxuXHJcbiAgICAgICAgICAgIC8vIOiOt+WPluWIhue7hFxyXG4gICAgICAgICAgICBjb25zdCB7IGRhdGE6IGdyb3VwcyB9ID0gYXdhaXQgZ2V0KExPQURfU0VSVklDRV9HUk9VUFMsIHtcclxuICAgICAgICAgICAgICAgIG1waWQsXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8g6I635Y+W6aKE57qm57uE5Lu2XHJcbiAgICAgICAgICAgIGxldCBzZXJ2aWNlcyA9IGF3YWl0IHRoaXMuZ2V0U2VydmljZXMoKTtcclxuICAgICAgICAgICAgdGhpcy5hbGxTZXJ2aWNlcyA9IHNlcnZpY2VzLm1hcChpdGVtID0+IGl0ZW0uaWQpO1xyXG5cclxuICAgICAgICAgICAgLy8g5ZCM5q2l5bey6YCJ5Lqn5ZOBXHJcbiAgICAgICAgICAgIGNvbnN0IGNvdXBvbk1hbmFnZSA9IGdsb2JhbFNlcnZpY2UuZ2V0KCdjb3Vwb25NYW5hZ2UnKTtcclxuICAgICAgICAgICAgY29uc3QgeyBzZXJ2aWNlSWRzID0gJycsIGFwcGx5VHlwZSB9ID0gY291cG9uTWFuYWdlO1xyXG4gICAgICAgICAgICBjb25zdCBhbGxTZXJ2aWNlcyA9IFtdO1xyXG5cclxuICAgICAgICAgICAgLy8g5oyH5a6a5Lqn5ZOBXHJcbiAgICAgICAgICAgIGlmIChhcHBseVR5cGUgPT09IDIgJiYgY291cG9uTWFuYWdlLnNlcnZpY2VJZHMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRTZXJ2aWNlcyA9IHNlcnZpY2VJZHMuc3BsaXQoJywnKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgc2VydmljZXMgPSBzZXJ2aWNlcy5tYXAoaXRlbSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzZXJ2aWNlID0gT2JqZWN0LmFzc2lnbih7fSwgaXRlbSk7XHJcbiAgICAgICAgICAgICAgICAvLyDlm6DkuLrpu5jorqTpgInmi6nmiYDmnInkuqflk4HvvIzmiYDku6XmraTml7bog73lpJ/ojrflj5bliLDmiYDmnInkuqflk4FcclxuICAgICAgICAgICAgICAgIGFsbFNlcnZpY2VzLnB1c2goc2VydmljZS5pZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKH5zZXJ2aWNlSWRzLmluZGV4T2Yoc2VydmljZS5pZCkgJiYgYXBwbHlUeXBlID09PSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmljZS5jaGVja2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBzZXJ2aWNlO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYWxsU2VydmljZXMgPSBhbGxTZXJ2aWNlcztcclxuICAgICAgICAgICAgdGhpcy5hcHBseVR5cGUgPSBhcHBseVR5cGU7XHJcbiAgICAgICAgICAgIHRoaXMuc2VydmljZXMgPSBzZXJ2aWNlcztcclxuICAgICAgICAgICAgdGhpcy5ncm91cHMgPSB0aGlzLmdyb3Vwcy5jb25jYXQoZ3JvdXBzKTtcclxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZXJyb3JIYW5kbGVyKGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvblVubG9hZCgpIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZURhdGEoKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVEYXRhKCkge1xyXG4gICAgICAgIGNvbnN0IGNvdXBvbk1hbmFnZSA9IGdsb2JhbFNlcnZpY2UuZ2V0KCdjb3Vwb25NYW5hZ2UnKTtcclxuICAgICAgICBnbG9iYWxTZXJ2aWNlLnNldCgnY291cG9uTWFuYWdlJywgT2JqZWN0LmFzc2lnbihjb3Vwb25NYW5hZ2UsIHtcclxuICAgICAgICAgICAgYXBwbHlUeXBlOiB0aGlzLmFwcGx5VHlwZSxcclxuICAgICAgICAgICAgc2VydmljZUlkczogdGhpcy5zZXJ2aWNlSWRzLFxyXG4gICAgICAgIH0pKTtcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBnZXRTZXJ2aWNlcyhyZXNvdXJjZUdyb3VwID0gJycpIHtcclxuICAgICAgICBjb25zdCB7IHNlbGVjdGVkU2VydmljZXMgfSA9IHRoaXM7XHJcbiAgICAgICAgY29uc3QgbXBpZCA9IHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ2N1cnJlbnRfbXBpZCcpO1xyXG4gICAgICAgIC8vIOiOt+WPluaJgOacieS6p+WTgVxyXG4gICAgICAgIGNvbnN0IHsgZGF0YTogeyBkYXRhOiBzZXJ2aWNlcyB9ID0ge30gfSA9IGF3YWl0IGdldChMT0FEX1NFUlZJQ0VfTElTVCwge1xyXG4gICAgICAgICAgICBtcGlkLFxyXG4gICAgICAgICAgICBwYWdlTnVtLFxyXG4gICAgICAgICAgICBwYWdlU2l6ZSxcclxuICAgICAgICAgICAgcmVzb3VyY2VHcm91cCxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHNlcnZpY2VzLm1hcChpdGVtID0+IHtcclxuICAgICAgICAgICAgY29uc3Qgc2VydmljZSA9IE9iamVjdC5hc3NpZ24oe30sIGl0ZW0pO1xyXG5cclxuICAgICAgICAgICAgLy8g5Zu+54mH5aSE55CGXHJcbiAgICAgICAgICAgIHNlcnZpY2UucGljcyA9IHBpY1NyY0RvbWFpbigpICsgc2VydmljZS5waWNzO1xyXG4gICAgICAgICAgICAvLyBjaGVja+WkhOeQhlxyXG4gICAgICAgICAgICBpZiAoIXNlbGVjdGVkU2VydmljZXMuaW5kZXhPZihpdGVtLmlkKSkge1xyXG4gICAgICAgICAgICAgICAgc2VydmljZS5jaGVja2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gc2VydmljZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG4iXX0=