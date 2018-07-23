'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _utils = require('./../utils/index.js');

var _ajax = require('./../utils/ajax.js');

var _EmptyPage = require('./../components/EmptyPage.js');

var _EmptyPage2 = _interopRequireDefault(_EmptyPage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ArticleComponentList = function (_wepy$page) {
    _inherits(ArticleComponentList, _wepy$page);

    function ArticleComponentList() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, ArticleComponentList);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ArticleComponentList.__proto__ || Object.getPrototypeOf(ArticleComponentList)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            navigationBarTitleText: '预约列表',
            disableScroll: true
        }, _this.$repeat = {}, _this.$props = { "EmptyPage": {} }, _this.$events = {}, _this.components = {
            EmptyPage: _EmptyPage2.default
        }, _this.data = {
            height: '',
            editStatus: false,
            groupList: [],
            delList: [],
            id: '',
            resourceGroup: '',
            mpId: '',
            pageSize: 100,
            pageNum: 1,
            name: '',
            title: '没有预约服务~',
            isLoading: true
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(ArticleComponentList, [{
        key: 'onLoad',
        value: function onLoad(option) {
            try {
                var _option$id = option.id,
                    id = _option$id === undefined ? '' : _option$id,
                    _option$name = option.name,
                    name = _option$name === undefined ? '' : _option$name;

                this.resourceGroup = id;
                this.name = name;
                var mpId = _wepy2.default.getStorageSync('current_mpid');
                this.mpId = mpId;
                this.$apply();

                var _wepy$getSystemInfoSy = _wepy2.default.getSystemInfoSync(),
                    windowHeight = _wepy$getSystemInfoSy.windowHeight;

                var height = windowHeight;
                this.height = height * 2 - 88 * 2 - 40 * 2 - 96 + 'rpx';
                this.loadList();
            } catch (e) {
                console.log(e);
            }
        }
    }, {
        key: 'onReachBottom',
        value: function onReachBottom() {
            if (!this.isloading) return;
            var pageNum = this.pageNum + 1;
            this.pageNum = pageNum;
            this.$apply();
            this.loadList();
        }
    }, {
        key: 'loadList',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var _ref3, data;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return (0, _ajax.get)('/businessService/listByPageForUser?resourceGroup=' + this.resourceGroup + '&status=0', {
                                    pageSize: 100,
                                    pageNum: 1,
                                    mpid: this.mpId
                                });

                            case 2:
                                _ref3 = _context.sent;
                                data = _ref3.data;

                                if (!(this.pageNum === 1 && (data.length === 0 || !data))) {
                                    _context.next = 8;
                                    break;
                                }

                                this.isLoading = false;
                                (0, _utils.toast)('没有数据');
                                return _context.abrupt('return');

                            case 8:
                                if (!(this.pageNum > 1 && data.length < this.pageSzie)) {
                                    _context.next = 12;
                                    break;
                                }

                                this.isLoading = false;
                                (0, _utils.toast)('没有更多数据');
                                return _context.abrupt('return');

                            case 12:
                                data.foreach(function (item) {
                                    Object.assign(item, {
                                        choseStatu: false
                                    });
                                });
                                this.groupList = this.groupList.concat(data);
                                this.$apply();

                            case 15:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function loadList() {
                return _ref2.apply(this, arguments);
            }

            return loadList;
        }()
    }, {
        key: 'editChose',
        value: function editChose(id, index) {
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
            // 点击跳转详情页面
            _wepy2.default.navigateTo({
                url: 'orderComponentDetail?id=' + id + '&resourceGroup=' + this.resourceGroup
            });
        }
    }, {
        key: 'edit',
        value: function edit() {
            this.editStatus = true;
            this.$apply();
        }
    }, {
        key: 'toDelete',
        value: function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
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

                                (0, _utils.alert)('请选择要删除的服务');
                                return _context2.abrupt('return');

                            case 5:
                                ids = delList.join();
                                _context2.next = 8;
                                return (0, _ajax.get)('/businessService/delGroup/0', {
                                    ids: ids
                                });

                            case 8:
                                (0, _utils.alert)('删除成功！');
                                this.loadList();
                                _context2.next = 16;
                                break;

                            case 12:
                                _context2.prev = 12;
                                _context2.t0 = _context2['catch'](0);

                                console.log(_context2.t0);
                                (0, _utils.alert)('该服务在模板中被应用，不能被删除');

                            case 16:
                                this.editStatus = false;
                                this.$apply();

                            case 18:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this, [[0, 12]]);
            }));

            function toDelete() {
                return _ref4.apply(this, arguments);
            }

            return toDelete;
        }()
    }, {
        key: 'cancle',
        value: function cancle() {
            var dataList = this.listData;
            dataList.forEach(function (item) {
                Object.assign(item, {
                    choseStatu: false
                });
            });
            this.editStatus = false;
            this.listData = dataList;
            this.$apply();
        }
    }, {
        key: 'addGroup',
        value: function addGroup() {
            // 添加预约服务
            _wepy2.default.navigateTo({
                url: 'orderComponentEdit?resourceGroup=' + this.id
            });
        }
    }, {
        key: 'manageProduct',
        value: function () {
            var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(e) {
                var _e$currentTarget$data, status, id, msg;

                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _e$currentTarget$data = e.currentTarget.dataset.item, status = _e$currentTarget$data.status, id = _e$currentTarget$data.id;
                                msg = void 0;
                                _context3.prev = 2;
                                _context3.next = 5;
                                return (0, _ajax.get)('/businessService/update', {
                                    id: id,
                                    status: status
                                });

                            case 5:
                                if (status === 0) {
                                    msg = '上架成功';
                                } else if (status === 2) {
                                    msg = '下架成功';
                                }
                                (0, _utils.toast)(msg);
                                this.pageNum = 1;
                                this.$apply();
                                this.loadData();
                                _context3.next = 15;
                                break;

                            case 12:
                                _context3.prev = 12;
                                _context3.t0 = _context3['catch'](2);

                                console.log(_context3.t0);

                            case 15:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this, [[2, 12]]);
            }));

            function manageProduct(_x) {
                return _ref5.apply(this, arguments);
            }

            return manageProduct;
        }()
    }]);

    return ArticleComponentList;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(ArticleComponentList , 'pages/orderComponentlist'));
