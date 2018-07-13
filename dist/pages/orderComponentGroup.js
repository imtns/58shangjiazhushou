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
            Pop: _Dialog2.default
        }, _this.data = {
            isEditing: false,
            groupList: [],
            title: '没有预约分组~',
            showPop: false,
            delList: []
        }, _this.methods = {
            showDialog: function showDialog() {
                this.showPop = true;
                this.$apply();
            },
            addGroup: function () {
                var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(content) {
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    _context.prev = 0;
                                    _context.next = 3;
                                    return (0, _ajax.get)('/businessService/addGroup', {
                                        mpId: this.mpId,
                                        name: content
                                    });

                                case 3:
                                    this.showPop = false;
                                    this.$apply();
                                    (0, _utils.toast)('添加成功！');
                                    this.page = 1;
                                    this.loadData(this.curTab);
                                    _context.next = 13;
                                    break;

                                case 10:
                                    _context.prev = 10;
                                    _context.t0 = _context['catch'](0);

                                    console.log(_context.t0);

                                case 13:
                                case 'end':
                                    return _context.stop();
                            }
                        }
                    }, _callee, this, [[0, 10]]);
                }));

                function addGroup(_x) {
                    return _ref2.apply(this, arguments);
                }

                return addGroup;
            }(),
            close: function close() {
                this.showPop = false;
                this.$apply();
            },
            edit: function edit() {
                this.delList = [];
                this.isEditing = !this.isEditing;
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
                                    return (0, _ajax.get)('/businessService/delGroup/', {
                                        ids: ids
                                    });

                                case 8:
                                    _context2.next = 13;
                                    break;

                                case 10:
                                    _context2.prev = 10;
                                    _context2.t0 = _context2['catch'](0);

                                    console.log(_context2.t0);

                                case 13:
                                case 'end':
                                    return _context2.stop();
                            }
                        }
                    }, _callee2, this, [[0, 10]]);
                }));

                function deleteItem() {
                    return _ref3.apply(this, arguments);
                }

                return deleteItem;
            }(),
            editChose: function editChose(e) {
                var id = e.currentTarget.dataset.item.id;

                if (this.editStatus) {
                    var selArr = this.delList;
                    var dataList = this.listData;
                    var index = this.delList.length === 0 ? -2 : this.delList.indexOf(id);
                    if (index < 0) {
                        selArr.push(id);
                        dataList.forEach(function (item) {
                            if (item.id === id) {
                                Object.assign(item, {
                                    choseStatu: true
                                });
                            }
                        });
                    } else {
                        dataList.forEach(function (item) {
                            if (item.id === id) {
                                Object.assign(item, {
                                    choseStatu: false
                                });
                            }
                        });
                        selArr.splice(index, 1);
                    }
                    this.listData = dataList;
                    this.delList = selArr;
                    this.$apply();
                    return;
                }
                // 点击跳转文章详情页面
                _wepy2.default.navigateTo({
                    url: 'orderComponentlist?id=' + id
                });
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(OrderComponentGroup, [{
        key: 'onLoad',
        value: function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _context3.next = 2;
                                return (0, _utils.sleep)();

                            case 2:
                                console.log('onLoad');

                            case 3:
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
                                    mpId: this.mpId
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9yZGVyQ29tcG9uZW50R3JvdXAuanMiXSwibmFtZXMiOlsiT3JkZXJDb21wb25lbnRHcm91cCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJFbXB0eVBhZ2UiLCJQb3AiLCJkYXRhIiwiaXNFZGl0aW5nIiwiZ3JvdXBMaXN0IiwidGl0bGUiLCJzaG93UG9wIiwiZGVsTGlzdCIsIm1ldGhvZHMiLCJzaG93RGlhbG9nIiwiJGFwcGx5IiwiYWRkR3JvdXAiLCJjb250ZW50IiwibXBJZCIsIm5hbWUiLCJwYWdlIiwibG9hZERhdGEiLCJjdXJUYWIiLCJjb25zb2xlIiwibG9nIiwiY2xvc2UiLCJlZGl0IiwiZGVsZXRlSXRlbSIsImxlbmd0aCIsImlkcyIsImpvaW4iLCJlZGl0Q2hvc2UiLCJlIiwiaWQiLCJjdXJyZW50VGFyZ2V0IiwiZGF0YXNldCIsIml0ZW0iLCJlZGl0U3RhdHVzIiwic2VsQXJyIiwiZGF0YUxpc3QiLCJsaXN0RGF0YSIsImluZGV4IiwiaW5kZXhPZiIsInB1c2giLCJmb3JFYWNoIiwiT2JqZWN0IiwiYXNzaWduIiwiY2hvc2VTdGF0dSIsInNwbGljZSIsIndlcHkiLCJuYXZpZ2F0ZVRvIiwidXJsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUNBOzs7O0FBRUE7O0FBQ0E7O0FBRUE7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7SUFFcUJBLG1COzs7Ozs7Ozs7Ozs7OztvTkFDakJDLE0sR0FBUztBQUNMQyxvQ0FBd0I7QUFEbkIsUyxRQUdWQyxPLEdBQVUsRSxRQUNiQyxNLEdBQVMsRUFBQyxhQUFZLEVBQWIsRUFBZ0IsT0FBTSxFQUFDLFlBQVcsRUFBWixFQUFlLGNBQWEsRUFBNUIsRUFBdEIsRSxRQUNUQyxPLEdBQVUsRUFBQyxPQUFNLEVBQUMsY0FBYSxPQUFkLEVBQXNCLGlCQUFnQixVQUF0QyxFQUFQLEUsUUFDVEMsVSxHQUFhO0FBQ05DLDBDQURN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WTtBQURJLGlDQUFwQjtBQUdIO0FBQ0oseUJBTkQ7QUFPQVQsK0JBQU9VLE1BQVAsQ0FBY1AsS0FBZCxFQUFxQixDQUFyQjtBQUNIO0FBQ0QseUJBQUtELFFBQUwsR0FBZ0JELFFBQWhCO0FBQ0EseUJBQUszQixPQUFMLEdBQWUwQixNQUFmO0FBQ0EseUJBQUt2QixNQUFMO0FBQ0E7QUFDSDtBQUNEO0FBQ0FrQywrQkFBS0MsVUFBTCxDQUFnQjtBQUNaQyxvREFBOEJsQjtBQURsQixpQkFBaEI7QUFHSDtBQTdFSyxTOzs7Ozs7Ozs7Ozs7dUNBSEEsbUI7OztBQUNOVix3Q0FBUUMsR0FBUixDQUFZLFFBQVo7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozt1Q0FrRnVCLGVBQUkseUJBQUosRUFBK0I7QUFDbEROLDBDQUFNLEtBQUtBO0FBRHVDLGlDQUEvQixDOzs7O0FBQWZYLG9DLFNBQUFBLEk7O3NDQUdKLENBQUNBLElBQUQsSUFBU0EsS0FBS3FCLE1BQUwsS0FBZ0IsQzs7Ozs7Ozs7QUFDN0JyQixxQ0FBS3FDLE9BQUwsQ0FBYSxnQkFBUTtBQUNqQkMsMkNBQU9DLE1BQVAsQ0FBY1YsSUFBZCxFQUFvQjtBQUNoQlcsb0RBQVk7QUFESSxxQ0FBcEI7QUFHSCxpQ0FKRDtBQUtBLHFDQUFLdEMsU0FBTCxHQUFpQkYsSUFBakI7QUFDQSxxQ0FBS1EsTUFBTDs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQWhIeUNrQyxlQUFLN0IsSTs7a0JBQWpDdEIsbUIiLCJmaWxlIjoib3JkZXJDb21wb25lbnRHcm91cC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcclxuXHJcbmltcG9ydCB7IHNsZWVwLCB0b2FzdCwgYWxlcnQgfSBmcm9tICcuLi91dGlscyc7XHJcbmltcG9ydCB7IGdldCB9IGZyb20gJy4uL3V0aWxzL2FqYXgnO1xyXG5cclxuaW1wb3J0IFBvcCBmcm9tICcuLi9jb21wb25lbnRzL0RpYWxvZyc7XHJcbmltcG9ydCBFbXB0eVBhZ2UgZnJvbSAnLi4vY29tcG9uZW50cy9FbXB0eVBhZ2UnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT3JkZXJDb21wb25lbnRHcm91cCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgICBjb25maWcgPSB7XHJcbiAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+mihOe6pueuoeeQhicsXHJcbiAgICB9XHJcbiAgICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1wiRW1wdHlQYWdlXCI6e30sXCJQb3BcIjp7XCJ4bWxuczp3eFwiOlwiXCIsXCJ4bWxuczp2LW9uXCI6XCJcIn19O1xyXG4kZXZlbnRzID0ge1wiUG9wXCI6e1widi1vbjpjbG9zZVwiOlwiY2xvc2VcIixcInYtb246YWRkR3JvdXBcIjpcImFkZEdyb3VwXCJ9fTtcclxuIGNvbXBvbmVudHMgPSB7XHJcbiAgICAgICAgRW1wdHlQYWdlLFxyXG4gICAgICAgIFBvcCxcclxuICAgIH1cclxuICAgIGRhdGEgPSB7XHJcbiAgICAgICAgaXNFZGl0aW5nOiBmYWxzZSxcclxuICAgICAgICBncm91cExpc3Q6IFtdLFxyXG4gICAgICAgIHRpdGxlOiAn5rKh5pyJ6aKE57qm5YiG57uEficsXHJcbiAgICAgICAgc2hvd1BvcDogZmFsc2UsXHJcbiAgICAgICAgZGVsTGlzdDogW10sXHJcbiAgICB9XHJcbiAgICBhc3luYyBvbkxvYWQoKSB7XHJcbiAgICAgICAgYXdhaXQgc2xlZXAoKTtcclxuICAgICAgICBjb25zb2xlLmxvZygnb25Mb2FkJyk7XHJcbiAgICB9XHJcbiAgICBtZXRob2RzID0ge1xyXG4gICAgICAgIHNob3dEaWFsb2coKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd1BvcCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBhc3luYyBhZGRHcm91cChjb250ZW50KSB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBhd2FpdCBnZXQoJy9idXNpbmVzc1NlcnZpY2UvYWRkR3JvdXAnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbXBJZDogdGhpcy5tcElkLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IGNvbnRlbnQsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1BvcCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICAgICAgICAgIHRvYXN0KCfmt7vliqDmiJDlip/vvIEnKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGFnZSA9IDE7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWREYXRhKHRoaXMuY3VyVGFiKTtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGNsb3NlKCkge1xyXG4gICAgICAgICAgICB0aGlzLnNob3dQb3AgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVkaXQoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGVsTGlzdCA9IFtdO1xyXG4gICAgICAgICAgICB0aGlzLmlzRWRpdGluZyA9ICF0aGlzLmlzRWRpdGluZztcclxuICAgICAgICB9LFxyXG4gICAgICAgIGFzeW5jIGRlbGV0ZUl0ZW0oKSB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB7IGRlbExpc3QgfSA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGVsTGlzdC5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBhbGVydCgn6K+36YCJ5oup6KaB5Yig6Zmk55qE5YiG57uEJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29uc3QgaWRzID0gZGVsTGlzdC5qb2luKCk7XHJcbiAgICAgICAgICAgICAgICBhd2FpdCBnZXQoJy9idXNpbmVzc1NlcnZpY2UvZGVsR3JvdXAvJywge1xyXG4gICAgICAgICAgICAgICAgICAgIGlkcyxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZWRpdENob3NlKGUpIHtcclxuICAgICAgICAgICAgY29uc3QgeyBpZCB9ID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaXRlbTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZWRpdFN0YXR1cykge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc2VsQXJyID0gdGhpcy5kZWxMaXN0O1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZGF0YUxpc3QgPSB0aGlzLmxpc3REYXRhO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmRlbExpc3QubGVuZ3RoID09PSAwID8gLTIgOiB0aGlzLmRlbExpc3QuaW5kZXhPZihpZCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggPCAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsQXJyLnB1c2goaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGFMaXN0LmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLmlkID09PSBpZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihpdGVtLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hvc2VTdGF0dTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGFMaXN0LmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLmlkID09PSBpZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihpdGVtLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hvc2VTdGF0dTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbEFyci5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5saXN0RGF0YSA9IGRhdGFMaXN0O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kZWxMaXN0ID0gc2VsQXJyO1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyDngrnlh7vot7Povazmlofnq6Dor6bmg4XpobXpnaJcclxuICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgICAgIHVybDogYG9yZGVyQ29tcG9uZW50bGlzdD9pZD0ke2lkfWAsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICB9XHJcbiAgICBhc3luYyBsb2FkRGF0YSgpIHtcclxuICAgICAgICBjb25zdCB7IGRhdGEgfSA9IGF3YWl0IGdldCgnL2J1c2luZXNzU2VydmljZS9ncm91cHMnLCB7XHJcbiAgICAgICAgICAgIG1wSWQ6IHRoaXMubXBJZCxcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAoIWRhdGEgfHwgZGF0YS5sZW5ndGggPT09IDApIHJldHVybjtcclxuICAgICAgICBkYXRhLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oaXRlbSwge1xyXG4gICAgICAgICAgICAgICAgY2hvc2VTdGF0dTogZmFsc2UsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuZ3JvdXBMaXN0ID0gZGF0YTtcclxuICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==