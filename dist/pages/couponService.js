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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvdXBvblNlcnZpY2UuanMiXSwibmFtZXMiOlsicGFnZVNpemUiLCJwYWdlTnVtIiwiSW5kZXgiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwibWl4aW5zIiwiTWl4aW4iLCJkYXRhIiwic2VydmljZXMiLCJzaG93UHJvZHVjdCIsImdyb3VwcyIsIm5hbWUiLCJpZCIsImN1cnJlbnRHcm91cCIsInNlbGVjdGVkU2VydmljZXMiLCJhbGxTZXJ2aWNlcyIsImFwcGx5VHlwZSIsInNlcnZpY2VJZHMiLCJtZXRob2RzIiwiY2hvb3NlR3JvdXAiLCJyZXNvdXJjZUdyb3VwIiwiZ2V0U2VydmljZXMiLCIkYXBwbHkiLCJjaG9vc2VTZXJ2aWNlIiwiaW5kZXgiLCJzZXJ2aWNlIiwiY2hlY2tlZCIsInVwZGF0ZVNlbGVjdGVkIiwiY2hvb3NlQWxsIiwibWFwIiwiT2JqZWN0IiwiYXNzaWduIiwiaXRlbSIsImNvbmNhdCIsImNvbmZpcm0iLCJ3ZXB5IiwibmF2aWdhdGVCYWNrIiwiY29tcHV0ZWQiLCJyZXN1bHQiLCJqb2luIiwiaW5kZXhPZiIsInNwbGljZSIsInB1c2giLCJsZW5ndGgiLCJtcGlkIiwiZ2V0U3RvcmFnZVN5bmMiLCJMT0FEX1NFUlZJQ0VfR1JPVVBTIiwiY291cG9uTWFuYWdlIiwiZ2xvYmFsU2VydmljZSIsImdldCIsInNwbGl0IiwiZXJyb3JIYW5kbGVyIiwidXBkYXRlRGF0YSIsInNldCIsIkxPQURfU0VSVklDRV9MSVNUIiwicGljcyIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQ0E7Ozs7QUFFQTs7OztBQUVBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLFdBQVcsRUFBakI7QUFDQSxJQUFNQyxVQUFVLENBQWhCOztJQUVxQkMsSzs7Ozs7Ozs7Ozs7Ozs7d0xBQ2pCQyxNLEdBQVM7QUFDTEMsb0NBQXdCO0FBRG5CLFMsUUFJVEMsTSxHQUFTLENBQUNDLGVBQUQsQyxRQUVUQyxJLEdB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ImZpbGUiOiJjb3Vwb25TZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xyXG5cclxuaW1wb3J0IE1peGluIGZyb20gJy4uL21peGluJztcclxuXHJcbmltcG9ydCB7IHBpY1NyY0RvbWFpbiB9IGZyb20gJy4uL3V0aWxzJztcclxuaW1wb3J0IHsgTE9BRF9TRVJWSUNFX0dST1VQUywgTE9BRF9TRVJWSUNFX0xJU1QgfSBmcm9tICcuLi91dGlscy91cmwnO1xyXG5pbXBvcnQgeyBnZXQgfSBmcm9tICcuLi91dGlscy9hamF4JztcclxuaW1wb3J0IGdsb2JhbFNlcnZpY2UgZnJvbSAnLi4vdXRpbHMvZ2xvYmFsU2VydmljZSc7XHJcblxyXG5jb25zdCBwYWdlU2l6ZSA9IDIwO1xyXG5jb25zdCBwYWdlTnVtID0gMTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICAgIGNvbmZpZyA9IHtcclxuICAgICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5LyY5oOg5Yi46YCC55So5Lqn5ZOBJyxcclxuICAgIH1cclxuXHJcbiAgICBtaXhpbnMgPSBbTWl4aW5dXHJcblxyXG4gICAgZGF0YSA9IHtcclxuICAgICAgICBzZXJ2aWNlczogW10sXHJcbiAgICAgICAgc2hvd1Byb2R1Y3Q6IGZhbHNlLFxyXG4gICAgICAgIGdyb3VwczogW3tcclxuICAgICAgICAgICAgbmFtZTogJ+aJgOacieS6p+WTgScsXHJcbiAgICAgICAgICAgIGlkOiAnJyxcclxuICAgICAgICB9XSxcclxuICAgICAgICBjdXJyZW50R3JvdXA6ICfmiYDmnInkuqflk4EnLFxyXG4gICAgICAgIHNlbGVjdGVkU2VydmljZXM6IFtdLCAvLyDlt7LpgInkuqflk4FcclxuICAgICAgICBhbGxTZXJ2aWNlczogW10sIC8vIOWFqOmDqOS6p+WTgVxyXG5cclxuICAgICAgICBhcHBseVR5cGU6IDEsIC8vIDEg5YWo6YOo5Lqn5ZOB77yMMiDmjIflrprkuqflk4FcclxuICAgICAgICBzZXJ2aWNlSWRzOiAnJyxcclxuICAgIH1cclxuXHJcbiAgICBtZXRob2RzID0ge1xyXG4gICAgICAgIHNob3dQcm9kdWN0KCkge1xyXG4gICAgICAgICAgICB0aGlzLnNob3dQcm9kdWN0ID0gIXRoaXMuc2hvd1Byb2R1Y3Q7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgYXN5bmMgY2hvb3NlR3JvdXAocmVzb3VyY2VHcm91cCwgbmFtZSkge1xyXG4gICAgICAgICAgICBjb25zdCBzZXJ2aWNlcyA9IGF3YWl0IHRoaXMuZ2V0U2VydmljZXMocmVzb3VyY2VHcm91cCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2VydmljZXMgPSBzZXJ2aWNlcztcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50R3JvdXAgPSBuYW1lO1xyXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGNob29zZVNlcnZpY2UoaW5kZXgpIHtcclxuICAgICAgICAgICAgY29uc3Qgc2VydmljZSA9IHRoaXMuc2VydmljZXNbaW5kZXhdO1xyXG4gICAgICAgICAgICBzZXJ2aWNlLmNoZWNrZWQgPSAhc2VydmljZS5jaGVja2VkO1xyXG4gICAgICAgICAgICB0aGlzLmFwcGx5VHlwZSA9IDI7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlU2VsZWN0ZWQoaW5kZXgpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGNob29zZUFsbCgpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXJ2aWNlcyA9IHRoaXMuc2VydmljZXMubWFwKGl0ZW0gPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc2VydmljZSA9IE9iamVjdC5hc3NpZ24oe30sIGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgc2VydmljZS5jaGVja2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzZXJ2aWNlO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYXBwbHlUeXBlID0gMTtcclxuICAgICAgICAgICAgdGhpcy5zZXJ2aWNlSWRzID0gJyc7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRTZXJ2aWNlcyA9IHRoaXMuYWxsU2VydmljZXMuY29uY2F0KCk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgY29uZmlybSgpIHtcclxuICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZUJhY2soKTtcclxuICAgICAgICB9LFxyXG4gICAgfVxyXG5cclxuICAgIGNvbXB1dGVkID0ge1xyXG4gICAgICAgIHNlcnZpY2VJZHMoKSB7XHJcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSAnJztcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmFwcGx5VHlwZSA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gJyc7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQgPSB0aGlzLnNlbGVjdGVkU2VydmljZXMuam9pbignLCcpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH0sXHJcbiAgICB9XHJcblxyXG4gICAgLy8g6YCa6L+H5Zyo5pWw57uE5Lit55qE5L2N572u6K6w5b2V77yM5YeP5bCR5oiQ5pysXHJcbiAgICB1cGRhdGVTZWxlY3RlZChpbmRleCkge1xyXG4gICAgICAgIGNvbnN0IHsgaWQgfSA9IHRoaXMuc2VydmljZXNbaW5kZXhdO1xyXG4gICAgICAgIGNvbnN0IHsgc2VsZWN0ZWRTZXJ2aWNlcyB9ID0gdGhpcztcclxuXHJcbiAgICAgICAgaWYgKH5zZWxlY3RlZFNlcnZpY2VzLmluZGV4T2YoaWQpKSB7XHJcbiAgICAgICAgICAgIHNlbGVjdGVkU2VydmljZXMuc3BsaWNlKHNlbGVjdGVkU2VydmljZXMuaW5kZXhPZihpZCksIDEpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHNlbGVjdGVkU2VydmljZXMucHVzaChpZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyDlhajpg6jkuqflk4HpgInmi6lcclxuICAgICAgICBpZiAoc2VsZWN0ZWRTZXJ2aWNlcy5sZW5ndGggPT09IHRoaXMuYWxsU2VydmljZXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYXBwbHlUeXBlID0gMTtcclxuICAgICAgICAgICAgdGhpcy5zZXJ2aWNlSWRzID0gJyc7XHJcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIG9uTG9hZCgpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCBtcGlkID0gd2VweS5nZXRTdG9yYWdlU3luYygnY3VycmVudF9tcGlkJyk7XHJcblxyXG4gICAgICAgICAgICAvLyDojrflj5bliIbnu4RcclxuICAgICAgICAgICAgY29uc3QgeyBkYXRhOiBncm91cHMgfSA9IGF3YWl0IGdldChMT0FEX1NFUlZJQ0VfR1JPVVBTLCB7XHJcbiAgICAgICAgICAgICAgICBtcGlkLFxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIOiOt+WPlumihOe6pue7hOS7tlxyXG4gICAgICAgICAgICBsZXQgc2VydmljZXMgPSBhd2FpdCB0aGlzLmdldFNlcnZpY2VzKCk7XHJcbiAgICAgICAgICAgIHRoaXMuYWxsU2VydmljZXMgPSBzZXJ2aWNlcy5tYXAoaXRlbSA9PiBpdGVtLmlkKTtcclxuXHJcbiAgICAgICAgICAgIC8vIOWQjOatpeW3sumAieS6p+WTgVxyXG4gICAgICAgICAgICBjb25zdCBjb3Vwb25NYW5hZ2UgPSBnbG9iYWxTZXJ2aWNlLmdldCgnY291cG9uTWFuYWdlJyk7XHJcbiAgICAgICAgICAgIGNvbnN0IHsgc2VydmljZUlkcyA9ICcnLCBhcHBseVR5cGUgfSA9IGNvdXBvbk1hbmFnZTtcclxuICAgICAgICAgICAgY29uc3QgYWxsU2VydmljZXMgPSBbXTtcclxuXHJcbiAgICAgICAgICAgIC8vIOaMh+WumuS6p+WTgVxyXG4gICAgICAgICAgICBpZiAoYXBwbHlUeXBlID09PSAyICYmIGNvdXBvbk1hbmFnZS5zZXJ2aWNlSWRzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkU2VydmljZXMgPSBzZXJ2aWNlSWRzLnNwbGl0KCcsJyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHNlcnZpY2VzID0gc2VydmljZXMubWFwKGl0ZW0gPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc2VydmljZSA9IE9iamVjdC5hc3NpZ24oe30sIGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgLy8g5Zug5Li66buY6K6k6YCJ5oup5omA5pyJ5Lqn5ZOB77yM5omA5Lul5q2k5pe26IO95aSf6I635Y+W5Yiw5omA5pyJ5Lqn5ZOBXHJcbiAgICAgICAgICAgICAgICBhbGxTZXJ2aWNlcy5wdXNoKHNlcnZpY2UuaWQpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh+c2VydmljZUlkcy5pbmRleE9mKHNlcnZpY2UuaWQpICYmIGFwcGx5VHlwZSA9PT0gMikge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZpY2UuY2hlY2tlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc2VydmljZTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmFsbFNlcnZpY2VzID0gYWxsU2VydmljZXM7XHJcbiAgICAgICAgICAgIHRoaXMuYXBwbHlUeXBlID0gYXBwbHlUeXBlO1xyXG4gICAgICAgICAgICB0aGlzLnNlcnZpY2VzID0gc2VydmljZXM7XHJcbiAgICAgICAgICAgIHRoaXMuZ3JvdXBzID0gdGhpcy5ncm91cHMuY29uY2F0KGdyb3Vwcyk7XHJcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICB0aGlzLmVycm9ySGFuZGxlcihlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25VbmxvYWQoKSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVEYXRhKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlRGF0YSgpIHtcclxuICAgICAgICBjb25zdCBjb3Vwb25NYW5hZ2UgPSBnbG9iYWxTZXJ2aWNlLmdldCgnY291cG9uTWFuYWdlJyk7XHJcbiAgICAgICAgZ2xvYmFsU2VydmljZS5zZXQoJ2NvdXBvbk1hbmFnZScsIE9iamVjdC5hc3NpZ24oY291cG9uTWFuYWdlLCB7XHJcbiAgICAgICAgICAgIGFwcGx5VHlwZTogdGhpcy5hcHBseVR5cGUsXHJcbiAgICAgICAgICAgIHNlcnZpY2VJZHM6IHRoaXMuc2VydmljZUlkcyxcclxuICAgICAgICB9KSk7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgZ2V0U2VydmljZXMocmVzb3VyY2VHcm91cCA9ICcnKSB7XHJcbiAgICAgICAgY29uc3QgeyBzZWxlY3RlZFNlcnZpY2VzIH0gPSB0aGlzO1xyXG4gICAgICAgIGNvbnN0IG1waWQgPSB3ZXB5LmdldFN0b3JhZ2VTeW5jKCdjdXJyZW50X21waWQnKTtcclxuICAgICAgICAvLyDojrflj5bmiYDmnInkuqflk4FcclxuICAgICAgICBjb25zdCB7IGRhdGE6IHsgZGF0YTogc2VydmljZXMgfSA9IHt9IH0gPSBhd2FpdCBnZXQoTE9BRF9TRVJWSUNFX0xJU1QsIHtcclxuICAgICAgICAgICAgbXBpZCxcclxuICAgICAgICAgICAgcGFnZU51bSxcclxuICAgICAgICAgICAgcGFnZVNpemUsXHJcbiAgICAgICAgICAgIHJlc291cmNlR3JvdXAsXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBzZXJ2aWNlcy5tYXAoaXRlbSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNlcnZpY2UgPSBPYmplY3QuYXNzaWduKHt9LCBpdGVtKTtcclxuXHJcbiAgICAgICAgICAgIC8vIOWbvueJh+WkhOeQhlxyXG4gICAgICAgICAgICBzZXJ2aWNlLnBpY3MgPSBwaWNTcmNEb21haW4oKSArIHNlcnZpY2UucGljcztcclxuICAgICAgICAgICAgLy8gY2hlY2vlpITnkIZcclxuICAgICAgICAgICAgaWYgKCFzZWxlY3RlZFNlcnZpY2VzLmluZGV4T2YoaXRlbS5pZCkpIHtcclxuICAgICAgICAgICAgICAgIHNlcnZpY2UuY2hlY2tlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHNlcnZpY2U7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuIl19