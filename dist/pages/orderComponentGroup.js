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
