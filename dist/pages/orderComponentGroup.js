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

                if (name) {
                    this.name = name;
                    this.id = id;
                    this.$broadcast('postData', name);
                }
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
                                    this.$apply();
                                    (0, _utils.toast)('添加成功！');
                                    this.page = 1;
                                    this.loadData();
                                    _context.next = 15;
                                    break;

                                case 12:
                                    _context.prev = 12;
                                    _context.t0 = _context['catch'](0);

                                    console.log(_context.t0);

                                case 15:
                                case 'end':
                                    return _context.stop();
                            }
                        }
                    }, _callee, this, [[0, 12]]);
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
                                    this.$apply();
                                    this.loadData();
                                    _context2.next = 16;
                                    break;

                                case 13:
                                    _context2.prev = 13;
                                    _context2.t0 = _context2['catch'](0);

                                    (0, _utils.toast)(_context2.t0);

                                case 16:
                                case 'end':
                                    return _context2.stop();
                            }
                        }
                    }, _callee2, this, [[0, 13]]);
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9yZGVyQ29tcG9uZW50R3JvdXAuanMiXSwibmFtZXMiOlsiT3JkZXJDb21wb25lbnRHcm91cCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJFbXB0eVBhZ2UiLCJQb3AiLCJHcm91cENvbXBvbmVudCIsImRhdGEiLCJpc0VkaXRpbmciLCJncm91cExpc3QiLCJ0aXRsZSIsInNob3dQb3AiLCJkZWxMaXN0IiwibXBJZCIsImlkIiwibmFtZSIsIm1ldGhvZHMiLCJzaG93RGlhbG9nIiwiJGJyb2FkY2FzdCIsIiRhcHBseSIsImFkZEdyb3VwIiwiY29udGVudCIsInVybCIsIm1waWQiLCJwYWdlIiwibG9hZERhdGEiLCJjb25zb2xlIiwibG9nIiwiY2xvc2UiLCJlZGl0IiwiZGVsZXRlSXRlbSIsImxlbmd0aCIsImlkcyIsImpvaW4iLCJlZGl0Q2hvc2UiLCJpbmRleCIsIml0ZW0iLCJpdGVtSW5kZXgiLCJpbmRleE9mIiwiY2hvc2VTdGF0dSIsInB1c2giLCJzcGxpY2UiLCJ3ZXB5IiwibmF2aWdhdGVUbyIsImdldFN0b3JhZ2VTeW5jIiwiZm9yRWFjaCIsIk9iamVjdCIsImFzc2lnbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFDQTs7OztBQUVBOztBQUNBOztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7SUFFcUJBLG1COzs7Ozs7Ozs7Ozs7OztvTkFDakJDLE0sR0FBUztBQUNMQyxvQ0FBd0I7QUFEbkIsUyxRQUdWQyxPLEdBQVUsRSxRQUNiQyxNLEdBQVMsRUFBQyxhQUFZLEVBQWIsRUFBZ0IsT0FBTSxFQUFDLFlBQVcsRUFBWixFQUFlLGNBQWEsRUFBNUIsRUFBdEIsRSxRQUNUQyxPLEdBQVUsRUFBQyxPQUFNLEVBQUMsY0FBYSxPQUFkLEVBQXNCLGlCQUFnQixVQUF0QyxFQUFQLEUsUUFDVEMsVSxHQUFhO0FBQ05DLDBDQURNO0FBRU5DLGlD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WSxNQUFMOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBMUh5Q3VCLGVBQUtsQixJOztrQkFBakMzQixtQiIsImZpbGUiOiJvcmRlckNvbXBvbmVudEdyb3VwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xyXG5cclxuaW1wb3J0IHsgc2xlZXAsIHRvYXN0LCBhbGVydCB9IGZyb20gJy4uL3V0aWxzJztcclxuaW1wb3J0IHsgZ2V0IH0gZnJvbSAnLi4vdXRpbHMvYWpheCc7XHJcblxyXG5pbXBvcnQgUG9wIGZyb20gJy4uL2NvbXBvbmVudHMvRGlhbG9nJztcclxuaW1wb3J0IEVtcHR5UGFnZSBmcm9tICcuLi9jb21wb25lbnRzL0VtcHR5UGFnZSc7XHJcbmltcG9ydCBHcm91cENvbXBvbmVudCBmcm9tICcuLi9jb21wb25lbnRzL0dyb3VwQ29tcG9uZW50JztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9yZGVyQ29tcG9uZW50R3JvdXAgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gICAgY29uZmlnID0ge1xyXG4gICAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfpooTnuqbnrqHnkIYnLFxyXG4gICAgfVxyXG4gICAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcIkVtcHR5UGFnZVwiOnt9LFwiUG9wXCI6e1wieG1sbnM6d3hcIjpcIlwiLFwieG1sbnM6di1vblwiOlwiXCJ9fTtcclxuJGV2ZW50cyA9IHtcIlBvcFwiOntcInYtb246Y2xvc2VcIjpcImNsb3NlXCIsXCJ2LW9uOmFkZEdyb3VwXCI6XCJhZGRHcm91cFwifX07XHJcbiBjb21wb25lbnRzID0ge1xyXG4gICAgICAgIEVtcHR5UGFnZSxcclxuICAgICAgICBQb3AsXHJcbiAgICAgICAgR3JvdXBDb21wb25lbnQsXHJcbiAgICB9XHJcbiAgICBkYXRhID0ge1xyXG4gICAgICAgIGlzRWRpdGluZzogZmFsc2UsXHJcbiAgICAgICAgZ3JvdXBMaXN0OiBbXSxcclxuICAgICAgICB0aXRsZTogJ+ayoeaciemihOe6puWIhue7hH4nLFxyXG4gICAgICAgIHNob3dQb3A6IGZhbHNlLFxyXG4gICAgICAgIGRlbExpc3Q6IFtdLFxyXG4gICAgICAgIG1wSWQ6ICcnLFxyXG4gICAgICAgIGlkOiAnJyxcclxuICAgICAgICBuYW1lOiAnJyxcclxuICAgIH1cclxuICAgIGFzeW5jIG9uTG9hZCgpIHtcclxuICAgICAgICBhd2FpdCBzbGVlcCgpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdvbkxvYWQnKTtcclxuICAgICAgICBjb25zdCBtcElkID0gd2VweS5nZXRTdG9yYWdlU3luYygnY3VycmVudF9tcGlkJyk7XHJcbiAgICAgICAgdGhpcy5tcElkID0gbXBJZDtcclxuICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgIHRoaXMubG9hZERhdGEoKTtcclxuICAgIH1cclxuICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgICAgc2hvd0RpYWxvZyhpZCA9ICcnLCBuYW1lID0gJycpIHtcclxuICAgICAgICAgICAgaWYgKG5hbWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlkID0gaWQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRicm9hZGNhc3QoJ3Bvc3REYXRhJywgbmFtZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5zaG93UG9wID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGFzeW5jIGFkZEdyb3VwKGNvbnRlbnQpIHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIGxldCB1cmwgPSAnJztcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm5hbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICB1cmwgPSBgL2J1c2luZXNzU2VydmljZS91cGRhdGVHcm91cC8ke3RoaXMuaWR9YDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXJsID0gJy9idXNpbmVzc1NlcnZpY2UvYWRkR3JvdXAnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYXdhaXQgZ2V0KHVybCwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IGNvbnRlbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgbXBpZDogdGhpcy5tcElkLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dQb3AgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgICAgICB0b2FzdCgn5re75Yqg5oiQ5Yqf77yBJyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhZ2UgPSAxO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkRGF0YSgpO1xyXG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2xvc2UoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd1BvcCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZWRpdCgpIHtcclxuICAgICAgICAgICAgdGhpcy5kZWxMaXN0ID0gW107XHJcbiAgICAgICAgICAgIHRoaXMubmFtZSA9ICcnO1xyXG4gICAgICAgICAgICB0aGlzLmlkID0gJyc7XHJcbiAgICAgICAgICAgIHRoaXMuaXNFZGl0aW5nID0gIXRoaXMuaXNFZGl0aW5nO1xyXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYXN5bmMgZGVsZXRlSXRlbSgpIHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHsgZGVsTGlzdCB9ID0gdGhpcztcclxuICAgICAgICAgICAgICAgIGlmIChkZWxMaXN0Lmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KCfor7fpgInmi6nopoHliKDpmaTnmoTliIbnu4QnKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpZHMgPSBkZWxMaXN0LmpvaW4oKTtcclxuICAgICAgICAgICAgICAgIGF3YWl0IGdldChgL2J1c2luZXNzU2VydmljZS9kZWxHcm91cC8wP2lkcz0ke2lkc31gKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGVsTGlzdCA9IFtdO1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9hZERhdGEoKTtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgdG9hc3QoZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGVkaXRDaG9zZShpZCwgaW5kZXgsIG5hbWUpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNFZGl0aW5nKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpdGVtID0gdGhpcy5ncm91cExpc3RbaW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaXRlbUluZGV4ID0gdGhpcy5kZWxMaXN0Lmxlbmd0aCA9PT0gMCA/IC0yIDogdGhpcy5kZWxMaXN0LmluZGV4T2YoaWQpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coaXRlbUluZGV4KTtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5jaG9zZVN0YXR1ID0gIWl0ZW0uY2hvc2VTdGF0dTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChpdGVtSW5kZXggPCAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWxMaXN0LnB1c2goaWQpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRlbExpc3Quc3BsaWNlKGl0ZW1JbmRleCwgMSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5kZWxMaXN0KTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyDngrnlh7vot7Povazmlofnq6Dor6bmg4XpobXpnaJcclxuICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgICAgIHVybDogYG9yZGVyQ29tcG9uZW50bGlzdD9pZD0ke2lkfSZuYW1lPSR7bmFtZX1gLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgfVxyXG4gICAgYXN5bmMgbG9hZERhdGEoKSB7XHJcbiAgICAgICAgY29uc3QgeyBkYXRhIH0gPSBhd2FpdCBnZXQoJy9idXNpbmVzc1NlcnZpY2UvZ3JvdXBzJywge1xyXG4gICAgICAgICAgICBtcGlkOiB0aGlzLm1wSWQsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKCFkYXRhIHx8IGRhdGEubGVuZ3RoID09PSAwKSByZXR1cm47XHJcbiAgICAgICAgZGF0YS5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGl0ZW0sIHtcclxuICAgICAgICAgICAgICAgIGNob3NlU3RhdHU6IGZhbHNlLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmdyb3VwTGlzdCA9IGRhdGE7XHJcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgIH1cclxufVxyXG4iXX0=