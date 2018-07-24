'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _utils = require('./../utils/index.js');

var _ajax = require('./../utils/ajax.js');

var _Dialog = require('./../components/Dialog.js');

var _Dialog2 = _interopRequireDefault(_Dialog);

var _EmptyPage = require('./../components/EmptyPage.js');

var _EmptyPage2 = _interopRequireDefault(_EmptyPage);

var _GroupComponent = require('./../components/GroupComponent.js');

var _GroupComponent2 = _interopRequireDefault(_GroupComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var OrderComponentGroup = function (_wepy$page) {
    _inherits(OrderComponentGroup, _wepy$page);

    function OrderComponentGroup() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, OrderComponentGroup);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = OrderComponentGroup.__proto__ || Object.getPrototypeOf(OrderComponentGroup)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            navigationBarTitleText: '预约管理'
        }, _this.$repeat = {}, _this.$props = { "EmptyPage": {}, "Pop": { "xmlns:wx": "", "xmlns:v-on": "" } }, _this.$events = { "Pop": { "v-on:close": "close", "v-on:addGroup": "addGroup" } }, _this.components = {
            EmptyPage: _EmptyPage2.default,
            Pop: _Dialog2.default,
            GroupComponent: _GroupComponent2.default
        }, _this.data = {
            isEditing: false,
            groupList: [],
            title: '没有预约分组~',
            showPop: false,
            delList: [],
            mpId: '',
            id: '',
            name: ''
        }, _this.methods = {
            showDialog: function showDialog() {
                var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
                var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

                this.name = name;
                this.id = id;
                this.$broadcast('postData', name);
                this.showPop = true;
                this.$apply();
            },
            addGroup: function () {
                var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(content) {
                    var url;
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    _context.prev = 0;
                                    url = '';

                                    if (this.name) {
                                        url = '/businessService/updateGroup/' + this.id;
                                    } else {
                                        url = '/businessService/addGroup';
                                    }
                                    _context.next = 5;
                                    return (0, _ajax.get)(url, {
                                        name: content,
                                        mpid: this.mpId
                                    });

                                case 5:
                                    this.showPop = false;
                                    this.isEditing = false;
                                    this.name = '';
                                    this.id = '';
                                    (0, _utils.toast)('添加成功！');
                                    this.loadData();
                                    _context.next = 18;
                                    break;

                                case 13:
                                    _context.prev = 13;
                                    _context.t0 = _context['catch'](0);

                                    (0, _utils.toast)(_context.t0);
                                    this.showPop = false;
                                    this.isEditing = false;

                                case 18:
                                    this.$apply();

                                case 19:
                                case 'end':
                                    return _context.stop();
                            }
                        }
                    }, _callee, this, [[0, 13]]);
                }));

                function addGroup(_x3) {
                    return _ref2.apply(this, arguments);
                }

                return addGroup;
            }(),
            close: function close() {
                this.showPop = false;
                this.$apply();
            },
            edit: function edit(e) {
                var status = e.currentTarget.dataset.status;

                var dataList = this.groupList;
                if (status) {
                    dataList.forEach(function (item) {
                        Object.assign(item, {
                            choseStatu: false
                        });
                    });
                    this.groupList = dataList;
                }
                this.delList = [];
                this.name = '';
                this.id = '';
                this.isEditing = !this.isEditing;
                this.$apply();
            },
            deleteItem: function () {
                var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                    var delList, ids;
                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                        while (1) {
                            switch (_context2.prev = _context2.next) {
                                case 0:
                                    _context2.prev = 0;
                                    delList = this.delList;

                                    if (!(delList.length === 0)) {
                                        _context2.next = 5;
                                        break;
                                    }

                                    (0, _utils.alert)('请选择要删除的分组');
                                    return _context2.abrupt('return');

                                case 5:
                                    ids = delList.join();
                                    _context2.next = 8;
                                    return (0, _ajax.get)('/businessService/delGroup/0', {
                                        ids: ids
                                    });

                                case 8:
                                    this.delList = [];
                                    this.isEditing = false;
                                    this.$apply();
                                    this.loadData();
                                    _context2.next = 19;
                                    break;

                                case 14:
                                    _context2.prev = 14;
                                    _context2.t0 = _context2['catch'](0);

                                    this.delList = [];
                                    this.isEditing = false;
                                    (0, _utils.toast)(_context2.t0);

                                case 19:
                                case 'end':
                                    return _context2.stop();
                            }
                        }
                    }, _callee2, this, [[0, 14]]);
                }));

                function deleteItem() {
                    return _ref3.apply(this, arguments);
                }

                return deleteItem;
            }(),
            editChose: function editChose(id, index, name) {
                if (this.isEditing) {
                    var item = this.groupList[index];
                    var itemIndex = this.delList.length === 0 ? -2 : this.delList.indexOf(id);
                    console.log(itemIndex);
                    if (item) {
                        item.choseStatu = !item.choseStatu;
                    }
                    if (itemIndex < 0) {
                        this.delList.push(id);
                    } else {
                        this.delList.splice(itemIndex, 1);
                    }
                    this.$apply();
                    console.log(this.delList);
                    return;
                }
                // 点击跳转文章详情页面
                _wepy2.default.navigateTo({
                    url: 'orderComponentlist?id=' + id + '&name=' + name
                });
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(OrderComponentGroup, [{
        key: 'onLoad',
        value: function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
                var mpId;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _context3.next = 2;
                                return (0, _utils.sleep)();

                            case 2:
                                console.log('onLoad');
                                mpId = _wepy2.default.getStorageSync('current_mpid');

                                this.mpId = mpId;
                                this.$apply();
                                this.loadData();

                            case 7:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function onLoad() {
                return _ref4.apply(this, arguments);
            }

            return onLoad;
        }()
    }, {
        key: 'loadData',
        value: function () {
            var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
                var _ref6, data;

                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                _context4.next = 2;
                                return (0, _ajax.get)('/businessService/groups', {
                                    mpid: this.mpId
                                });

                            case 2:
                                _ref6 = _context4.sent;
                                data = _ref6.data;

                                if (!(!data || data.length === 0)) {
                                    _context4.next = 6;
                                    break;
                                }

                                return _context4.abrupt('return');

                            case 6:
                                data.forEach(function (item) {
                                    Object.assign(item, {
                                        choseStatu: false
                                    });
                                });
                                this.groupList = data;
                                this.$apply();

                            case 9:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));

            function loadData() {
                return _ref5.apply(this, arguments);
            }

            return loadData;
        }()
    }]);

    return OrderComponentGroup;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(OrderComponentGroup , 'pages/orderComponentGroup'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9yZGVyQ29tcG9uZW50R3JvdXAuanMiXSwibmFtZXMiOlsiT3JkZXJDb21wb25lbnRHcm91cCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJFbXB0eVBhZ2UiLCJQb3AiLCJHcm91cENvbXBvbmVudCIsImRhdGEiLCJpc0VkaXRpbmciLCJncm91cExpc3QiLCJ0aXRsZSIsInNob3dQb3AiLCJkZWxMaXN0IiwibXBJZCIsImlkIiwibmFtZSIsIm1ldGhvZHMiLCJzaG93RGlhbG9nIiwiJGJyb2FkY2FzdCIsIiRhcHBseSIsImFkZEdyb3VwIiwiY29udGVudCIsInVybCIsIm1waWQiLCJsb2FkRGF0YSIsImNsb3NlIiwiZWRpdCIsImUiLCJzdGF0dXMiLCJjdXJyZW50VGFyZ2V0IiwiZGF0YXNldCIsImRhdGFMaXN0IiwiZm9yRWFjaCIsIk9iamVjdCIsImFzc2lnbiIsIml0ZW0iLCJjaG9zZVN0YXR1IiwiZGVsZXRlSXRlbSIsImxlbmd0aCIsImlkcyIsImpvaW4iLCJlZGl0Q2hvc2UiLCJpbmRleCIsIml0ZW1JbmRleCIsImluZGV4T2YiLCJjb25zb2xlIiwibG9nIiwicHVzaCIsInNwbGljZSIsIndlcHkiLCJuYXZpZ2F0ZVRvIiwiZ2V0U3RvcmFnZVN5bmMiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUNBOzs7O0FBRUE7O0FBQ0E7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztJQUVxQkEsbUI7Ozs7Ozs7Ozs7Ozs7O29OQUNqQkMsTSxHQUFTO0FBQ0xDLG9DQUF3QjtBQURuQixTLFFBR1ZDLE8sR0FBVSxFLFFBQ2JDLE0sR0FBUyxFQUFDLGFBQVksRUFBYixFQUFnQixPQUFNLEVBQUMsWUFBVyxFQUFaLEVBQWUsY0FBYSxFQUE1QixFQUF0QixFLFFBQ1RDLE8sR0FBVSxFQUFDLE9BQU0sRUFBQyxjQUFhLE9BQWQsRUFBc0IsaUJB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LG9EQUE4QlIsRUFBOUIsY0FBeUNDO0FBRDdCLGlCQUFoQjtBQUdIO0FBaEdLLFM7Ozs7Ozs7Ozs7Ozs7dUNBUEEsbUI7OztBQUNOOEIsd0NBQVFDLEdBQVIsQ0FBWSxRQUFaO0FBQ01qQyxvQyxHQUFPb0MsZUFBS0UsY0FBTCxDQUFvQixjQUFwQixDOztBQUNiLHFDQUFLdEMsSUFBTCxHQUFZQSxJQUFaO0FBQ0EscUNBQUtNLE1BQUw7QUFDQSxxQ0FBS0ssUUFBTDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3VDQXFHdUIsZUFBSSx5QkFBSixFQUErQjtBQUNsREQsMENBQU0sS0FBS1Y7QUFEdUMsaUNBQS9CLEM7Ozs7QUFBZk4sb0MsU0FBQUEsSTs7c0NBR0osQ0FBQ0EsSUFBRCxJQUFTQSxLQUFLK0IsTUFBTCxLQUFnQixDOzs7Ozs7OztBQUM3Qi9CLHFDQUFLeUIsT0FBTCxDQUFhLGdCQUFRO0FBQ2pCQywyQ0FBT0MsTUFBUCxDQUFjQyxJQUFkLEVBQW9CO0FBQ2hCQyxvREFBWTtBQURJLHFDQUFwQjtBQUdILGlDQUpEO0FBS0EscUNBQUszQixTQUFMLEdBQWlCRixJQUFqQjtBQUNBLHFDQUFLWSxNQUFMOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBM0l5QzhCLGVBQUtHLEk7O2tCQUFqQ3ZELG1CIiwiZmlsZSI6Im9yZGVyQ29tcG9uZW50R3JvdXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuXG5pbXBvcnQgeyBzbGVlcCwgdG9hc3QsIGFsZXJ0IH0gZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IHsgZ2V0IH0gZnJvbSAnLi4vdXRpbHMvYWpheCc7XG5cbmltcG9ydCBQb3AgZnJvbSAnLi4vY29tcG9uZW50cy9EaWFsb2cnO1xuaW1wb3J0IEVtcHR5UGFnZSBmcm9tICcuLi9jb21wb25lbnRzL0VtcHR5UGFnZSc7XG5pbXBvcnQgR3JvdXBDb21wb25lbnQgZnJvbSAnLi4vY29tcG9uZW50cy9Hcm91cENvbXBvbmVudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9yZGVyQ29tcG9uZW50R3JvdXAgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+mihOe6pueuoeeQhicsXG4gICAgfVxuICAgJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJFbXB0eVBhZ2VcIjp7fSxcIlBvcFwiOntcInhtbG5zOnd4XCI6XCJcIixcInhtbG5zOnYtb25cIjpcIlwifX07XHJcbiRldmVudHMgPSB7XCJQb3BcIjp7XCJ2LW9uOmNsb3NlXCI6XCJjbG9zZVwiLFwidi1vbjphZGRHcm91cFwiOlwiYWRkR3JvdXBcIn19O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICAgICAgRW1wdHlQYWdlLFxuICAgICAgICBQb3AsXG4gICAgICAgIEdyb3VwQ29tcG9uZW50LFxuICAgIH1cbiAgICBkYXRhID0ge1xuICAgICAgICBpc0VkaXRpbmc6IGZhbHNlLFxuICAgICAgICBncm91cExpc3Q6IFtdLFxuICAgICAgICB0aXRsZTogJ+ayoeaciemihOe6puWIhue7hH4nLFxuICAgICAgICBzaG93UG9wOiBmYWxzZSxcbiAgICAgICAgZGVsTGlzdDogW10sXG4gICAgICAgIG1wSWQ6ICcnLFxuICAgICAgICBpZDogJycsXG4gICAgICAgIG5hbWU6ICcnLFxuICAgIH1cbiAgICBhc3luYyBvbkxvYWQoKSB7XG4gICAgICAgIGF3YWl0IHNsZWVwKCk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdvbkxvYWQnKTtcbiAgICAgICAgY29uc3QgbXBJZCA9IHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ2N1cnJlbnRfbXBpZCcpO1xuICAgICAgICB0aGlzLm1wSWQgPSBtcElkO1xuICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgICB0aGlzLmxvYWREYXRhKCk7XG4gICAgfVxuICAgIG1ldGhvZHMgPSB7XG4gICAgICAgIHNob3dEaWFsb2coaWQgPSAnJywgbmFtZSA9ICcnKSB7XG4gICAgICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICAgICAgdGhpcy5pZCA9IGlkO1xuICAgICAgICAgICAgdGhpcy4kYnJvYWRjYXN0KCdwb3N0RGF0YScsIG5hbWUpO1xuICAgICAgICAgICAgdGhpcy5zaG93UG9wID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICAgIH0sXG4gICAgICAgIGFzeW5jIGFkZEdyb3VwKGNvbnRlbnQpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgbGV0IHVybCA9ICcnO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdXJsID0gYC9idXNpbmVzc1NlcnZpY2UvdXBkYXRlR3JvdXAvJHt0aGlzLmlkfWA7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdXJsID0gJy9idXNpbmVzc1NlcnZpY2UvYWRkR3JvdXAnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBhd2FpdCBnZXQodXJsLCB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IGNvbnRlbnQsXG4gICAgICAgICAgICAgICAgICAgIG1waWQ6IHRoaXMubXBJZCxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dQb3AgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLmlzRWRpdGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMubmFtZSA9ICcnO1xuICAgICAgICAgICAgICAgIHRoaXMuaWQgPSAnJztcbiAgICAgICAgICAgICAgICB0b2FzdCgn5re75Yqg5oiQ5Yqf77yBJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkRGF0YSgpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIHRvYXN0KGUpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1BvcCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuaXNFZGl0aW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgICB9LFxuICAgICAgICBjbG9zZSgpIHtcbiAgICAgICAgICAgIHRoaXMuc2hvd1BvcCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgICAgfSxcbiAgICAgICAgZWRpdChlKSB7XG4gICAgICAgICAgICBjb25zdCB7IHN0YXR1cyB9ID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQ7XG4gICAgICAgICAgICBjb25zdCBkYXRhTGlzdCA9IHRoaXMuZ3JvdXBMaXN0O1xuICAgICAgICAgICAgaWYgKHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRhdGFMaXN0LmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oaXRlbSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hvc2VTdGF0dTogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMuZ3JvdXBMaXN0ID0gZGF0YUxpc3Q7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmRlbExpc3QgPSBbXTtcbiAgICAgICAgICAgIHRoaXMubmFtZSA9ICcnO1xuICAgICAgICAgICAgdGhpcy5pZCA9ICcnO1xuICAgICAgICAgICAgdGhpcy5pc0VkaXRpbmcgPSAhdGhpcy5pc0VkaXRpbmc7XG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgICB9LFxuICAgICAgICBhc3luYyBkZWxldGVJdGVtKCkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBjb25zdCB7IGRlbExpc3QgfSA9IHRoaXM7XG4gICAgICAgICAgICAgICAgaWYgKGRlbExpc3QubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KCfor7fpgInmi6nopoHliKDpmaTnmoTliIbnu4QnKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBpZHMgPSBkZWxMaXN0LmpvaW4oKTtcbiAgICAgICAgICAgICAgICBhd2FpdCBnZXQoJy9idXNpbmVzc1NlcnZpY2UvZGVsR3JvdXAvMCcsIHtcbiAgICAgICAgICAgICAgICAgICAgaWRzLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMuZGVsTGlzdCA9IFtdO1xuICAgICAgICAgICAgICAgIHRoaXMuaXNFZGl0aW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWREYXRhKCk7XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kZWxMaXN0ID0gW107XG4gICAgICAgICAgICAgICAgdGhpcy5pc0VkaXRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0b2FzdChlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZWRpdENob3NlKGlkLCBpbmRleCwgbmFtZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNFZGl0aW5nKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaXRlbSA9IHRoaXMuZ3JvdXBMaXN0W2luZGV4XTtcbiAgICAgICAgICAgICAgICBjb25zdCBpdGVtSW5kZXggPSB0aGlzLmRlbExpc3QubGVuZ3RoID09PSAwID8gLTIgOiB0aGlzLmRlbExpc3QuaW5kZXhPZihpZCk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coaXRlbUluZGV4KTtcbiAgICAgICAgICAgICAgICBpZiAoaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICBpdGVtLmNob3NlU3RhdHUgPSAhaXRlbS5jaG9zZVN0YXR1O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoaXRlbUluZGV4IDwgMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRlbExpc3QucHVzaChpZCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWxMaXN0LnNwbGljZShpdGVtSW5kZXgsIDEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZGVsTGlzdCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8g54K55Ye76Lez6L2s5paH56ug6K+m5oOF6aG16Z2iXG4gICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgICAgIHVybDogYG9yZGVyQ29tcG9uZW50bGlzdD9pZD0ke2lkfSZuYW1lPSR7bmFtZX1gLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgfVxuICAgIGFzeW5jIGxvYWREYXRhKCkge1xuICAgICAgICBjb25zdCB7IGRhdGEgfSA9IGF3YWl0IGdldCgnL2J1c2luZXNzU2VydmljZS9ncm91cHMnLCB7XG4gICAgICAgICAgICBtcGlkOiB0aGlzLm1wSWQsXG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoIWRhdGEgfHwgZGF0YS5sZW5ndGggPT09IDApIHJldHVybjtcbiAgICAgICAgZGF0YS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihpdGVtLCB7XG4gICAgICAgICAgICAgICAgY2hvc2VTdGF0dTogZmFsc2UsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuZ3JvdXBMaXN0ID0gZGF0YTtcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICB9XG59XG4iXX0=