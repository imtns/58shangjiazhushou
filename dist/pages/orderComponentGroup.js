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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9yZGVyQ29tcG9uZW50R3JvdXAuanMiXSwibmFtZXMiOlsiT3JkZXJDb21wb25lbnRHcm91cCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJFbXB0eVBhZ2UiLCJQb3AiLCJHcm91cENvbXBvbmVudCIsImRhdGEiLCJpc0VkaXRpbmciLCJncm91cExpc3QiLCJ0aXRsZSIsInNob3dQb3AiLCJkZWxMaXN0IiwibXBJZCIsImlkIiwibmFtZSIsIm1ldGhvZHMiLCJzaG93RGlhbG9nIiwiJGJyb2FkY2FzdCIsIiRhcHBseSIsImFkZEdyb3VwIiwiY29udGVudCIsInVybCIsIm1waWQiLCJwYWdlIiwibG9hZERhdGEiLCJjb25zb2xlIiwibG9nIiwiY2xvc2UiLCJlZGl0IiwiZSIsInN0YXR1cyIsImN1cnJlbnRUYXJnZXQiLCJkYXRhc2V0IiwiZGF0YUxpc3QiLCJmb3JFYWNoIiwiT2JqZWN0IiwiYXNzaWduIiwiaXRlbSIsImNob3NlU3RhdHUiLCJkZWxldGVJdGVtIiwibGVuZ3RoIiwiaWRzIiwiam9pbiIsImVkaXRDaG9zZSIsImluZGV4IiwiaXRlbUluZGV4IiwiaW5kZXhPZiIsInB1c2giLCJzcGxpY2UiLCJ3ZXB5IiwibmF2aWdhdGVUbyIsImdldFN0b3JhZ2VTeW5jIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUNBOzs7O0FBRUE7O0FBQ0E7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztJQUVxQkEsbUI7Ozs7Ozs7Ozs7Ozs7O29OQUNqQkMsTSxHQUFTO0FBQ0xDLG9DQUF3QjtBQURuQixTLFFBR1ZDLE8sR0FBVSxFLFFBQ2JDLE0sR0FBUyxFQUFDLGFBQVksRUFBYixFQUFnQixPQUFNLEVBQUMsWUFBVyxFQUFaLEVBQWUsY0FBYSxFQUE1QixFQUF0QixFLFFBQ1RDLE8sR0FBVSxFQUFDLE9BQU0sRUFBQyxjQUFhLE9BQWQsRUFBc0IsaUJB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SUFBWjtBQUNBLHFDQUFLTSxNQUFMO0FBQ0EscUNBQUtNLFFBQUw7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozt1Q0FnR3VCLGVBQUkseUJBQUosRUFBK0I7QUFDbERGLDBDQUFNLEtBQUtWO0FBRHVDLGlDQUEvQixDOzs7O0FBQWZOLG9DLFNBQUFBLEk7O3NDQUdKLENBQUNBLElBQUQsSUFBU0EsS0FBS2tDLE1BQUwsS0FBZ0IsQzs7Ozs7Ozs7QUFDN0JsQyxxQ0FBSzRCLE9BQUwsQ0FBYSxnQkFBUTtBQUNqQkMsMkNBQU9DLE1BQVAsQ0FBY0MsSUFBZCxFQUFvQjtBQUNoQkMsb0RBQVk7QUFESSxxQ0FBcEI7QUFHSCxpQ0FKRDtBQUtBLHFDQUFLOUIsU0FBTCxHQUFpQkYsSUFBakI7QUFDQSxxQ0FBS1ksTUFBTDs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQXRJeUMrQixlQUFLMUIsSTs7a0JBQWpDM0IsbUIiLCJmaWxlIjoib3JkZXJDb21wb25lbnRHcm91cC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcclxuXHJcbmltcG9ydCB7IHNsZWVwLCB0b2FzdCwgYWxlcnQgfSBmcm9tICcuLi91dGlscyc7XHJcbmltcG9ydCB7IGdldCB9IGZyb20gJy4uL3V0aWxzL2FqYXgnO1xyXG5cclxuaW1wb3J0IFBvcCBmcm9tICcuLi9jb21wb25lbnRzL0RpYWxvZyc7XHJcbmltcG9ydCBFbXB0eVBhZ2UgZnJvbSAnLi4vY29tcG9uZW50cy9FbXB0eVBhZ2UnO1xyXG5pbXBvcnQgR3JvdXBDb21wb25lbnQgZnJvbSAnLi4vY29tcG9uZW50cy9Hcm91cENvbXBvbmVudCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPcmRlckNvbXBvbmVudEdyb3VwIGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICAgIGNvbmZpZyA9IHtcclxuICAgICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn6aKE57qm566h55CGJyxcclxuICAgIH1cclxuICAgJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJFbXB0eVBhZ2VcIjp7fSxcIlBvcFwiOntcInhtbG5zOnd4XCI6XCJcIixcInhtbG5zOnYtb25cIjpcIlwifX07XHJcbiRldmVudHMgPSB7XCJQb3BcIjp7XCJ2LW9uOmNsb3NlXCI6XCJjbG9zZVwiLFwidi1vbjphZGRHcm91cFwiOlwiYWRkR3JvdXBcIn19O1xyXG4gY29tcG9uZW50cyA9IHtcclxuICAgICAgICBFbXB0eVBhZ2UsXHJcbiAgICAgICAgUG9wLFxyXG4gICAgICAgIEdyb3VwQ29tcG9uZW50LFxyXG4gICAgfVxyXG4gICAgZGF0YSA9IHtcclxuICAgICAgICBpc0VkaXRpbmc6IGZhbHNlLFxyXG4gICAgICAgIGdyb3VwTGlzdDogW10sXHJcbiAgICAgICAgdGl0bGU6ICfmsqHmnInpooTnuqbliIbnu4R+JyxcclxuICAgICAgICBzaG93UG9wOiBmYWxzZSxcclxuICAgICAgICBkZWxMaXN0OiBbXSxcclxuICAgICAgICBtcElkOiAnJyxcclxuICAgICAgICBpZDogJycsXHJcbiAgICAgICAgbmFtZTogJycsXHJcbiAgICB9XHJcbiAgICBhc3luYyBvbkxvYWQoKSB7XHJcbiAgICAgICAgYXdhaXQgc2xlZXAoKTtcclxuICAgICAgICBjb25zb2xlLmxvZygnb25Mb2FkJyk7XHJcbiAgICAgICAgY29uc3QgbXBJZCA9IHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ2N1cnJlbnRfbXBpZCcpO1xyXG4gICAgICAgIHRoaXMubXBJZCA9IG1wSWQ7XHJcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICB0aGlzLmxvYWREYXRhKCk7XHJcbiAgICB9XHJcbiAgICBtZXRob2RzID0ge1xyXG4gICAgICAgIHNob3dEaWFsb2coaWQgPSAnJywgbmFtZSA9ICcnKSB7XHJcbiAgICAgICAgICAgIGlmIChuYW1lKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pZCA9IGlkO1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kYnJvYWRjYXN0KCdwb3N0RGF0YScsIG5hbWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd1BvcCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBhc3luYyBhZGRHcm91cChjb250ZW50KSB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdXJsID0gJyc7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5uYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXJsID0gYC9idXNpbmVzc1NlcnZpY2UvdXBkYXRlR3JvdXAvJHt0aGlzLmlkfWA7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHVybCA9ICcvYnVzaW5lc3NTZXJ2aWNlL2FkZEdyb3VwJztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGF3YWl0IGdldCh1cmwsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBjb250ZW50LFxyXG4gICAgICAgICAgICAgICAgICAgIG1waWQ6IHRoaXMubXBJZCxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93UG9wID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgICAgICAgICAgdG9hc3QoJ+a3u+WKoOaIkOWKn++8gScpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wYWdlID0gMTtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9hZERhdGEoKTtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGNsb3NlKCkge1xyXG4gICAgICAgICAgICB0aGlzLnNob3dQb3AgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVkaXQoZSkge1xyXG4gICAgICAgICAgICBjb25zdCB7IHN0YXR1cyB9ID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQ7XHJcbiAgICAgICAgICAgIGNvbnN0IGRhdGFMaXN0ID0gdGhpcy5ncm91cExpc3Q7XHJcbiAgICAgICAgICAgIGlmIChzdGF0dXMpIHtcclxuICAgICAgICAgICAgICAgIGRhdGFMaXN0LmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihpdGVtLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNob3NlU3RhdHU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdyb3VwTGlzdCA9IGRhdGFMaXN0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuZGVsTGlzdCA9IFtdO1xyXG4gICAgICAgICAgICB0aGlzLm5hbWUgPSAnJztcclxuICAgICAgICAgICAgdGhpcy5pZCA9ICcnO1xyXG4gICAgICAgICAgICB0aGlzLmlzRWRpdGluZyA9ICF0aGlzLmlzRWRpdGluZztcclxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGFzeW5jIGRlbGV0ZUl0ZW0oKSB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB7IGRlbExpc3QgfSA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGVsTGlzdC5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBhbGVydCgn6K+36YCJ5oup6KaB5Yig6Zmk55qE5YiG57uEJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29uc3QgaWRzID0gZGVsTGlzdC5qb2luKCk7XHJcbiAgICAgICAgICAgICAgICBhd2FpdCBnZXQoJy9idXNpbmVzc1NlcnZpY2UvZGVsR3JvdXAvMCcsIHtcclxuICAgICAgICAgICAgICAgICAgICBpZHMsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGVsTGlzdCA9IFtdO1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9hZERhdGEoKTtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgdG9hc3QoZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGVkaXRDaG9zZShpZCwgaW5kZXgsIG5hbWUpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNFZGl0aW5nKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpdGVtID0gdGhpcy5ncm91cExpc3RbaW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaXRlbUluZGV4ID0gdGhpcy5kZWxMaXN0Lmxlbmd0aCA9PT0gMCA/IC0yIDogdGhpcy5kZWxMaXN0LmluZGV4T2YoaWQpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coaXRlbUluZGV4KTtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5jaG9zZVN0YXR1ID0gIWl0ZW0uY2hvc2VTdGF0dTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChpdGVtSW5kZXggPCAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWxMaXN0LnB1c2goaWQpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRlbExpc3Quc3BsaWNlKGl0ZW1JbmRleCwgMSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5kZWxMaXN0KTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyDngrnlh7vot7Povazmlofnq6Dor6bmg4XpobXpnaJcclxuICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgICAgIHVybDogYG9yZGVyQ29tcG9uZW50bGlzdD9pZD0ke2lkfSZuYW1lPSR7bmFtZX1gLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgfVxyXG4gICAgYXN5bmMgbG9hZERhdGEoKSB7XHJcbiAgICAgICAgY29uc3QgeyBkYXRhIH0gPSBhd2FpdCBnZXQoJy9idXNpbmVzc1NlcnZpY2UvZ3JvdXBzJywge1xyXG4gICAgICAgICAgICBtcGlkOiB0aGlzLm1wSWQsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKCFkYXRhIHx8IGRhdGEubGVuZ3RoID09PSAwKSByZXR1cm47XHJcbiAgICAgICAgZGF0YS5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGl0ZW0sIHtcclxuICAgICAgICAgICAgICAgIGNob3NlU3RhdHU6IGZhbHNlLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmdyb3VwTGlzdCA9IGRhdGE7XHJcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgIH1cclxufVxyXG4iXX0=