'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _mixin = require('./../mixin/index.js');

var _mixin2 = _interopRequireDefault(_mixin);

var _url = require('./../utils/url.js');

var _ajax = require('./../utils/ajax.js');

var _utils = require('./../utils/index.js');

var _uploaderP = require('./../utils/uploaderP.js');

var _uploaderP2 = _interopRequireDefault(_uploaderP);

var _EmptyPage = require('./../components/EmptyPage.js');

var _EmptyPage2 = _interopRequireDefault(_EmptyPage);

var _Dialog = require('./../components/Dialog.js');

var _Dialog2 = _interopRequireDefault(_Dialog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var pageNum = 1;
var pageSize = 20;
var urls = [];
var selectedIds = []; // 已选择作品

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
            navigationBarTitleText: '素材管理'
        }, _this.$repeat = {}, _this.$props = { "EmptyPage": {}, "Pop": { "xmlns:v-on": "" } }, _this.$events = { "Pop": { "v-on:close": "close", "v-on:addGroup": "addGroup" } }, _this.components = {
            EmptyPage: _EmptyPage2.default,
            Pop: _Dialog2.default
        }, _this.mixins = [_mixin2.default], _this.data = {
            curTab: 'image',
            tabbarItems: [{
                label: '图片',
                name: 'image'
            }, {
                label: '视频',
                name: 'video'
            }, {
                label: '文章',
                name: 'article'
            }],
            // 按钮文字
            optionNames: {
                image: '上传图片',
                video: '上传视频',
                article: '添加文章分组'
            },
            // 展示时用的works
            works: [],
            groupList: [],
            title: '没有文章分组~',
            isEditing: false,
            showPop: false,
            name: '',
            id: '',
            delList: [],
            mpId: ''
        }, _this.methods = {
            selectTab: function selectTab(name) {
                this.initData();

                this.curTab = name;
                this.loadData(name);
            },


            /**
             * 选择作品
             * id用于删除作品
             * index用于找到作品，标记check
             */
            selectItem: function selectItem(id, index) {
                if (selectedIds.length >= 10) {
                    (0, _utils.alert)('一次只能删除10条素材！');
                    return;
                }

                var works = this.works;

                var work = works[index];

                if (work) {
                    work.checked = !work.checked;
                    selectedIds.push(id);
                }
            },
            previewResource: function previewResource(url) {
                if (this.curTab === 'image') {
                    wx.previewImage({
                        current: url,
                        urls: urls
                    });
                }

                if (this.curTab === 'video') {
                    wx.navigateTo({
                        url: '/pages/VideoPlay?url=' + url
                    });
                }
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
                selectedIds = [];
                this.delList = [];
                this.isEditing = !this.isEditing;
                this.$apply();
            },


            /**
             * 删除作品
             * 批量删除，通过Promise.all实现，目前无批量删除接口
             */
            deleteItem: function () {
                var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                    var ids, _ref3, cancel;

                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    _context.prev = 0;

                                    if (!(this.curTab === 'article')) {
                                        _context.next = 10;
                                        break;
                                    }

                                    if (this.delList.length) {
                                        _context.next = 5;
                                        break;
                                    }

                                    (0, _utils.alert)('请选择要删除的分组！');
                                    return _context.abrupt('return');

                                case 5:
                                    ids = this.delList.join();
                                    _context.next = 8;
                                    return (0, _ajax.get)('/businessArticle/delgroup/0', {
                                        ids: ids
                                    });

                                case 8:
                                    _context.next = 22;
                                    break;

                                case 10:
                                    _context.next = 12;
                                    return (0, _utils.alertP)('\u786E\u8BA4\u5220\u9664\u6240\u9009\u7684' + selectedIds.length + '\u9879\u7D20\u6750\uFF1F');

                                case 12:
                                    _ref3 = _context.sent;
                                    cancel = _ref3.cancel;

                                    if (!cancel) {
                                        _context.next = 20;
                                        break;
                                    }

                                    this.isEditing = false;
                                    this.$apply();
                                    this.selectedIds = [];
                                    this.works.forEach(function () {
                                        for (var _len2 = arguments.length, props = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                                            props[_key2] = arguments[_key2];
                                        }

                                        var item = props[0];

                                        item.checked = false;
                                    });
                                    return _context.abrupt('return');

                                case 20:
                                    _context.next = 22;
                                    return Promise.all(selectedIds.map(function (id) {
                                        return (0, _ajax.get)(_url.DELETE_RESOURCE + id);
                                    }));

                                case 22:
                                    (0, _utils.toast)('删除成功！');
                                    this.isEditing = false;
                                    this.$apply();

                                    this.initData();
                                    this.loadData(this.curTab);
                                    _context.next = 35;
                                    break;

                                case 29:
                                    _context.prev = 29;
                                    _context.t0 = _context['catch'](0);

                                    this.errorHandler(_context.t0);
                                    (0, _utils.toast)('删除失败！');
                                    this.isEditing = false;
                                    this.$apply();

                                case 35:
                                case 'end':
                                    return _context.stop();
                            }
                        }
                    }, _callee, this, [[0, 29]]);
                }));

                function deleteItem() {
                    return _ref2.apply(this, arguments);
                }

                return deleteItem;
            }(),


            /**
             * 上传素材
             */
            uploadFile: function () {
                var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(type) {
                    var netStatus, _ref5, cancel;

                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                        while (1) {
                            switch (_context2.prev = _context2.next) {
                                case 0:
                                    _context2.prev = 0;
                                    _context2.next = 3;
                                    return (0, _utils.getNetStatus)();

                                case 3:
                                    netStatus = _context2.sent;

                                    if (!(netStatus === 0)) {
                                        _context2.next = 7;
                                        break;
                                    }

                                    (0, _utils.toast)('无网络');
                                    return _context2.abrupt('return');

                                case 7:
                                    if (!(netStatus === 2 && type === 'video')) {
                                        _context2.next = 14;
                                        break;
                                    }

                                    _context2.next = 10;
                                    return (0, _utils.alertP)('确定在移动网络下上传视频？', '提示');

                                case 10:
                                    _ref5 = _context2.sent;
                                    cancel = _ref5.cancel;

                                    if (!cancel) {
                                        _context2.next = 14;
                                        break;
                                    }

                                    return _context2.abrupt('return');

                                case 14:
                                    _context2.t0 = type;
                                    _context2.next = _context2.t0 === 'image' ? 17 : _context2.t0 === 'video' ? 20 : _context2.t0 === 'article' ? 25 : 28;
                                    break;

                                case 17:
                                    _context2.next = 19;
                                    return this.uploadImage();

                                case 19:
                                    return _context2.abrupt('break', 29);

                                case 20:
                                    _context2.next = 22;
                                    return this.uploadVideo();

                                case 22:
                                    _context2.next = 24;
                                    return (0, _utils.sleep)(3000);

                                case 24:
                                    return _context2.abrupt('break', 29);

                                case 25:
                                    _context2.next = 27;
                                    return this.showDialog();

                                case 27:
                                    return _context2.abrupt('break', 29);

                                case 28:
                                    return _context2.abrupt('break', 29);

                                case 29:
                                    if (!(type === 'article')) {
                                        _context2.next = 31;
                                        break;
                                    }

                                    return _context2.abrupt('return');

                                case 31:
                                    this.initData();
                                    this.loadData(this.curTab);
                                    _context2.next = 38;
                                    break;

                                case 35:
                                    _context2.prev = 35;
                                    _context2.t1 = _context2['catch'](0);

                                    console.log(_context2.t1);

                                case 38:
                                case 'end':
                                    return _context2.stop();
                            }
                        }
                    }, _callee2, this, [[0, 35]]);
                }));

                function uploadFile(_x) {
                    return _ref4.apply(this, arguments);
                }

                return uploadFile;
            }(),
            addGroup: function () {
                var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(content) {
                    var url;
                    return regeneratorRuntime.wrap(function _callee3$(_context3) {
                        while (1) {
                            switch (_context3.prev = _context3.next) {
                                case 0:
                                    _context3.prev = 0;
                                    url = '';

                                    console.log(this.name);
                                    if (this.name) {
                                        url = '/businessArticle/updategroup/' + this.id;
                                    } else {
                                        url = '/businessArticle/addgroup';
                                    }
                                    _context3.next = 6;
                                    return (0, _ajax.get)(url, {
                                        name: content
                                    });

                                case 6:
                                    this.showPop = false;
                                    this.isEditing = false;
                                    this.name = '';
                                    this.id = '';
                                    (0, _utils.toast)('操作成功！');
                                    this.loadData(this.curTab);
                                    _context3.next = 19;
                                    break;

                                case 14:
                                    _context3.prev = 14;
                                    _context3.t0 = _context3['catch'](0);

                                    this.showPop = false;
                                    this.isEditing = false;
                                    (0, _utils.toast)(_context3.t0);

                                case 19:
                                    this.$apply();

                                case 20:
                                case 'end':
                                    return _context3.stop();
                            }
                        }
                    }, _callee3, this, [[0, 14]]);
                }));

                function addGroup(_x2) {
                    return _ref6.apply(this, arguments);
                }

                return addGroup;
            }(),
            close: function close() {
                this.showPop = false;
                this.$apply();
            },
            editChose: function editChose(id, index, name) {
                if (this.isEditing) {
                    var item = this.groupList[index];
                    var itemIndex = this.delList.length === 0 ? -2 : this.delList.indexOf(id);
                    if (item) {
                        item.choseStatu = !item.choseStatu;
                    }
                    if (itemIndex < 0) {
                        this.delList.push(id);
                    } else {
                        this.delList.splice(itemIndex, 1);
                    }
                    this.$apply();
                    return;
                }
                // 点击跳转文章详情页面
                _wepy2.default.navigateTo({
                    url: 'articleComponentlist?group=' + id + '&name=' + name
                });
            },
            showDialog: function showDialog() {
                var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
                var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
                var groupList = this.groupList;

                if (!name && groupList && groupList.length >= 10) {
                    (0, _utils.toast)(' 分组数量达到最大（10个），无法创建更多。');
                    return;
                }
                this.name = name;
                this.id = id;
                this.$broadcast('postData', name);
                this.showPop = true;
                this.$apply();
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Index, [{
        key: 'onLoad',
        value: function () {
            var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
                var mpId;
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                _context4.next = 2;
                                return this.loadData(this.curTab);

                            case 2:
                                mpId = _wepy2.default.getStorageSync('current_mpid');

                                this.mpId = mpId;
                                this.$apply();

                            case 5:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));

            function onLoad() {
                return _ref7.apply(this, arguments);
            }

            return onLoad;
        }()
    }, {
        key: 'initData',
        value: function initData() {
            // 初始化数据
            this.works = [];
            this.$apply();
            pageNum = 1;
            urls = [];
            selectedIds = [];
        }
    }, {
        key: 'loadData',
        value: function () {
            var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(type) {
                var resourceType;
                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                resourceType = 1;
                                _context5.t0 = type;
                                _context5.next = _context5.t0 === 'image' ? 4 : _context5.t0 === 'video' ? 4 : _context5.t0 === 'article' ? 8 : 11;
                                break;

                            case 4:
                                resourceType = {
                                    image: 1,
                                    video: 2
                                }[type];
                                _context5.next = 7;
                                return this.loadResource(resourceType);

                            case 7:
                                return _context5.abrupt('break', 12);

                            case 8:
                                _context5.next = 10;
                                return this.loadArticle();

                            case 10:
                                return _context5.abrupt('break', 12);

                            case 11:
                                return _context5.abrupt('break', 12);

                            case 12:
                            case 'end':
                                return _context5.stop();
                        }
                    }
                }, _callee5, this);
            }));

            function loadData(_x5) {
                return _ref8.apply(this, arguments);
            }

            return loadData;
        }()
    }, {
        key: 'loadResource',
        value: function () {
            var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(resourceType) {
                var _this2 = this;

                var postData, _ref10, data;

                return regeneratorRuntime.wrap(function _callee6$(_context6) {
                    while (1) {
                        switch (_context6.prev = _context6.next) {
                            case 0:
                                postData = {
                                    resourceType: resourceType
                                };


                                Object.assign(postData, {
                                    pageNum: pageNum,
                                    pageSize: pageSize
                                });
                                pageNum += 1;

                                _context6.prev = 3;
                                _context6.next = 6;
                                return (0, _ajax.get)(_url.LOAD_RESOURCE_URL, postData);

                            case 6:
                                _ref10 = _context6.sent;
                                data = _ref10.data;

                                if ((!data || !data.length) && this.works.length) {
                                    (0, _utils.toast)('已经到底了');
                                }

                                data.forEach(function (item) {
                                    var workItem = Object.assign({}, item);

                                    // 加载图片，url加上宽度，加上前置域名
                                    if (resourceType === 1) {
                                        workItem.previewUrl = '' + (0, _utils.picSrcDomain)() + workItem.resourceUrl + '?w=375'; // 预览图片
                                        workItem.resourceUrl = '' + (0, _utils.picSrcDomain)() + workItem.resourceUrl + '?w=100';
                                    }

                                    // 加载视频
                                    if (resourceType === 2) {
                                        workItem.previewUrl = workItem.resourceUrl;
                                        var resourceUrl = '';

                                        // 在这里添加try catch是有必要的，若不添加，报错了会终止循环
                                        try {
                                            if (workItem.extend) {
                                                var extend = JSON.parse(workItem.extend);
                                                resourceUrl = extend.sourceCoverUrl + '?w=100'; // 封面图片
                                            }
                                        } catch (e) {
                                            _this2.errorHandler(e);
                                        }

                                        workItem.resourceUrl = resourceUrl;
                                    }

                                    _this2.works.push(workItem);
                                    urls.push(workItem.previewUrl);
                                });
                                this.$apply();
                                _context6.next = 16;
                                break;

                            case 13:
                                _context6.prev = 13;
                                _context6.t0 = _context6['catch'](3);

                                this.errorHandler(_context6.t0);

                            case 16:
                            case 'end':
                                return _context6.stop();
                        }
                    }
                }, _callee6, this, [[3, 13]]);
            }));

            function loadResource(_x6) {
                return _ref9.apply(this, arguments);
            }

            return loadResource;
        }()
    }, {
        key: 'loadArticle',
        value: function () {
            var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
                var _ref12, data;

                return regeneratorRuntime.wrap(function _callee7$(_context7) {
                    while (1) {
                        switch (_context7.prev = _context7.next) {
                            case 0:
                                _context7.prev = 0;
                                _context7.next = 3;
                                return (0, _ajax.get)('/businessArticle/groups');

                            case 3:
                                _ref12 = _context7.sent;
                                data = _ref12.data;

                                if (!(!data || data.length === 0)) {
                                    _context7.next = 7;
                                    break;
                                }

                                return _context7.abrupt('return');

                            case 7:
                                data.forEach(function (item) {
                                    Object.assign(item, {
                                        choseStatu: false
                                    });
                                });
                                this.groupList = data;
                                this.$apply();
                                _context7.next = 15;
                                break;

                            case 12:
                                _context7.prev = 12;
                                _context7.t0 = _context7['catch'](0);

                                console.log(_context7.t0);

                            case 15:
                            case 'end':
                                return _context7.stop();
                        }
                    }
                }, _callee7, this, [[0, 12]]);
            }));

            function loadArticle() {
                return _ref11.apply(this, arguments);
            }

            return loadArticle;
        }()
    }, {
        key: 'uploadImage',
        value: function () {
            var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
                var _ref14, tempFilePaths;

                return regeneratorRuntime.wrap(function _callee8$(_context8) {
                    while (1) {
                        switch (_context8.prev = _context8.next) {
                            case 0:
                                _context8.prev = 0;
                                _context8.next = 3;
                                return _wepy2.default.chooseImage({
                                    count: 1
                                });

                            case 3:
                                _ref14 = _context8.sent;
                                tempFilePaths = _ref14.tempFilePaths;
                                _context8.next = 7;
                                return this.uploadResource(tempFilePaths[0], 'image');

                            case 7:
                                (0, _utils.toast)('上传成功');
                                _context8.next = 14;
                                break;

                            case 10:
                                _context8.prev = 10;
                                _context8.t0 = _context8['catch'](0);

                                this.errorHandler('上传失败', _context8.t0);
                                (0, _utils.toast)('上传失败');

                            case 14:
                            case 'end':
                                return _context8.stop();
                        }
                    }
                }, _callee8, this, [[0, 10]]);
            }));

            function uploadImage() {
                return _ref13.apply(this, arguments);
            }

            return uploadImage;
        }()
    }, {
        key: 'uploadVideo',
        value: function () {
            var _ref15 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
                var _ref16, tempFilePath;

                return regeneratorRuntime.wrap(function _callee9$(_context9) {
                    while (1) {
                        switch (_context9.prev = _context9.next) {
                            case 0:
                                _context9.prev = 0;
                                _context9.next = 3;
                                return _wepy2.default.chooseVideo();

                            case 3:
                                _ref16 = _context9.sent;
                                tempFilePath = _ref16.tempFilePath;
                                _context9.next = 7;
                                return this.uploadResource(tempFilePath, 'video');

                            case 7:
                                (0, _utils.toast)('上传成功', 3000);
                                _context9.next = 14;
                                break;

                            case 10:
                                _context9.prev = 10;
                                _context9.t0 = _context9['catch'](0);

                                this.errorHandler('上传失败', _context9.t0);
                                (0, _utils.toast)('上传失败', 3000);

                            case 14:
                            case 'end':
                                return _context9.stop();
                        }
                    }
                }, _callee9, this, [[0, 10]]);
            }));

            function uploadVideo() {
                return _ref15.apply(this, arguments);
            }

            return uploadVideo;
        }()

        /**
         * @desc 上传素材
         */

    }, {
        key: 'uploadResource',
        value: function () {
            var _ref17 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(path, type) {
                var _ref18, resourceUrl;

                return regeneratorRuntime.wrap(function _callee10$(_context10) {
                    while (1) {
                        switch (_context10.prev = _context10.next) {
                            case 0:
                                _context10.next = 2;
                                return (0, _uploaderP2.default)(path, {
                                    type: type
                                });

                            case 2:
                                _ref18 = _context10.sent;
                                resourceUrl = _ref18.content;
                                _context10.next = 6;
                                return (0, _ajax.get)(_url.SAVE_RESOURCE_URL, {
                                    resourceUrl: resourceUrl,
                                    resourceType: type === 'image' ? 1 : 2
                                });

                            case 6:
                            case 'end':
                                return _context10.stop();
                        }
                    }
                }, _callee10, this);
            }));

            function uploadResource(_x7, _x8) {
                return _ref17.apply(this, arguments);
            }

            return uploadResource;
        }()
    }, {
        key: 'showDialog',
        value: function showDialog() {
            var groupList = this.groupList;

            if (groupList && groupList.length >= 10) {
                (0, _utils.toast)(' 分组数量达到最大（10个），无法创建更多。');
                return;
            }
            this.$broadcast('postData', '');
            this.showPop = true;
            this.$apply();
        }
    }, {
        key: 'errorHandler',
        value: function errorHandler(e) {
            console.log('ERROR:', e);
        }
    }, {
        key: 'onReachBottom',
        value: function onReachBottom() {
            this.loadData(this.curTab);
        }
    }]);

    return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/resourceManage'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc291cmNlTWFuYWdlLmpzIl0sIm5hbWVzIjpbInBhZ2VOdW0iLCJwYWdlU2l6ZSIsInVybHMiLCJzZWxlY3RlZElkcyIsIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsIkVtcHR5UGFnZSIsIlBvcCIsIm1peGlucyIsIk1peGluIiwiZGF0YSIsImN1clRhYiIsInRhYmJhckl0ZW1zIiwibGFiZWwiLCJuYW1lIiwib3B0aW9uTmFtZXMiLCJpbWFnZSIsInZpZGVvIiwiYXJ0aWNsZSIsIndvcmtzIiwiZ3JvdXBMaXN0IiwidGl0bGUiLCJpc0VkaXRpbmciLCJzaG93UG9wIiwiaWQiLCJkZWxMaXN0IiwibXBJZCIsIm1ldGhvZHMiLCJzZWxlY3RUYWIiLCJpbml0RGF0YSIsImxvYWREYXRhIiwic2VsZWN0SXRlbSIsImluZGV4IiwibGVuZ3RoIiwid29yayIsImNoZWNrZWQiLCJwdXNoIiwicHJldmlld1Jlc291cmNlIiwidXJsIiwid3giLCJwcmV2aWV3SW1hZ2UiLCJjdXJyZW50IiwibmF2aWdhdGVUbyIsImVkaXQiLCJlIiwic3RhdHVzIiwiY3VycmVudFRhcmdldCIsImRhdGFzZXQiLCJkYXRhTGlzdCIsImZvckVhY2giLCJPYmplY3QiLCJhc3NpZ24iLCJpdGVtIiwiY2hvc2VTdGF0dSIsIiRhcHBseSIsImRlbGV0ZUl0ZW0iLCJpZHMiLCJqb2luIiwiY2FuY2VsIiwicHJvcHMiLCJQcm9taXNlIiwiYWxsIiwibWFwIiwiREVMRVRFX1JFU09VUkNFIiwiZXJyb3JIYW5kbGVyIiwidXBsb2FkRmlsZSIsInR5cGUiLCJuZXRTdGF0dXMiLCJ1cGxvYWRJbWFnZSIsInVwbG9hZFZpZGVvIiwic2hvd0RpYWxvZyIsImNvbnNvbGUiLCJsb2ciLCJhZGRHcm91cCIsImNvbnRlbnQiLCJjbG9zZSIsImVkaXRDaG9zZSIsIml0ZW1JbmRleCIsImluZGV4T2YiLCJzcGxpY2UiLCJ3ZXB5IiwiJGJyb2FkY2FzdCIsImdldFN0b3JhZ2VTeW5jIiwicmVzb3VyY2VUeXBlIiwibG9hZFJlc291cmNlIiwibG9hZEFydGljbGUiLCJwb3N0RGF0YSIsIkxPQURfUkVTT1VSQ0VfVVJMIiwid29ya0l0ZW0iLCJwcmV2aWV3VXJsIiwicmVzb3VyY2VVcmwiLCJleHRlbmQiLCJKU09OIiwicGFyc2UiLCJzb3VyY2VDb3ZlclVybCIsImNob29zZUltYWdlIiwiY291bnQiLCJ0ZW1wRmlsZVBhdGhzIiwidXBsb2FkUmVzb3VyY2UiLCJjaG9vc2VWaWRlbyIsInRlbXBGaWxlUGF0aCIsInBhdGgiLCJTQVZFX1JFU09VUkNFX1VSTCIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUFFQSxJQUFJQSxVQUFVLENBQWQ7QUFDQSxJQUFNQyxXQUFXLEVBQWpCO0FBQ0EsSUFBSUMsT0FBTyxFQUFYO0FBQ0EsSUFBSUMsY0FBYyxFQUFsQixDLENBQXNCOztJQUVEQyxLOzs7Ozs7Ozs7Ozs7Ozt3TEFDakJDLE0sR0FBUztBQUNMQyxvQ0FBd0I7QUFEbkIsUyxRQUlWQyxPLEdBQVUsRSxRQUNiQyxNLEdBQVMsRUFBQyxhQUFZLEVBQWIsRUFBZ0IsT0FBTSxFQUFDLGNBQWEsRUFBZCxFQUF0QixFLFFBQ1RDLE8sR0FBVSxFQUFDLE9BQU0sRUFBQyxjQUFhLE9BQWQsRUFBc0IsaUJBQWdCLFVBQXRDLEVBQVAsRSxRQUNUQyxVLEdBQWE7QUFDTkMsMENBRE07QUFFTkM7QUFGTSxTLFFBSVZDLE0sR0FBUyxDQUFDQyxlQUFELEMsUUFFVEMsSSxHQUFPO0FBQ0hDLG9CQUFRLE9BREw7QUFFSEMseUJBQWEsQ0FDVDtBQUNJQyx1QkFBTyxJQURYO0FBRUlDLHNCQUFNO0FBRlYsYUFEUyxFQUtUO0FBQ0lELHVCQUFPLElBRFg7QUFFSUMsc0JBQU07QUFGVixhQUxTLEVBU1Q7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QSxZOzt1Q0FDRixLQUFLRixjQUFMLENBQW9CRSxZQUFwQixFQUFrQyxPQUFsQyxDOzs7QUFDTixrREFBTSxNQUFOLEVBQWMsSUFBZDs7Ozs7Ozs7QUFFQSxxQ0FBS3BDLFlBQUwsQ0FBa0IsTUFBbEI7QUFDQSxrREFBTSxNQUFOLEVBQWMsSUFBZDs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFJUjs7Ozs7OztvR0FHcUJxQyxJLEVBQU1uQyxJOzs7Ozs7Ozt1Q0FFZ0IseUJBQVNtQyxJQUFULEVBQWU7QUFDbERuQztBQURrRCxpQ0FBZixDOzs7O0FBQXRCd0IsMkMsVUFBVGhCLE87O3VDQUtGLGVBQUk0QixzQkFBSixFQUF1QjtBQUN6QlosNERBRHlCO0FBRXpCUCxrREFBY2pCLFNBQVMsT0FBVCxHQUFtQixDQUFuQixHQUF1QjtBQUZaLGlDQUF2QixDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7cUNBTUc7QUFBQSxnQkFDRDlDLFNBREMsR0FDYSxJQURiLENBQ0RBLFNBREM7O0FBRVQsZ0JBQUlBLGFBQWFBLFVBQVVhLE1BQVYsSUFBb0IsRUFBckMsRUFBeUM7QUFDckMsa0NBQU0sd0JBQU47QUFDQTtBQUNIO0FBQ0QsaUJBQUtnRCxVQUFMLENBQWdCLFVBQWhCLEVBQTRCLEVBQTVCO0FBQ0EsaUJBQUsxRCxPQUFMLEdBQWUsSUFBZjtBQUNBLGlCQUFLK0IsTUFBTDtBQUNIOzs7cUNBQ1lWLEMsRUFBRztBQUNaMkIsb0JBQVFDLEdBQVIsQ0FBWSxRQUFaLEVBQXNCNUIsQ0FBdEI7QUFDSDs7O3dDQUVlO0FBQ1osaUJBQUtkLFFBQUwsQ0FBYyxLQUFLbkIsTUFBbkI7QUFDSDs7OztFQXRhOEJxRSxlQUFLdUIsSTs7a0JBQW5CeEcsSyIsImZpbGUiOiJyZXNvdXJjZU1hbmFnZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5pbXBvcnQgTWl4aW4gZnJvbSAnLi4vbWl4aW4nO1xuaW1wb3J0IHsgTE9BRF9SRVNPVVJDRV9VUkwsIERFTEVURV9SRVNPVVJDRSwgU0FWRV9SRVNPVVJDRV9VUkwgfSBmcm9tICcuLi91dGlscy91cmwnO1xuaW1wb3J0IHsgZ2V0IH0gZnJvbSAnLi4vdXRpbHMvYWpheCc7XG5pbXBvcnQgeyB0b2FzdCwgYWxlcnQsIGFsZXJ0UCwgcGljU3JjRG9tYWluLCBzbGVlcCwgZ2V0TmV0U3RhdHVzIH0gZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IHVwbG9hZGVyIGZyb20gJy4uL3V0aWxzL3VwbG9hZGVyUCc7XG5pbXBvcnQgRW1wdHlQYWdlIGZyb20gJy4uL2NvbXBvbmVudHMvRW1wdHlQYWdlJztcbmltcG9ydCBQb3AgZnJvbSAnLi4vY29tcG9uZW50cy9EaWFsb2cnO1xuXG5sZXQgcGFnZU51bSA9IDE7XG5jb25zdCBwYWdlU2l6ZSA9IDIwO1xubGV0IHVybHMgPSBbXTtcbmxldCBzZWxlY3RlZElkcyA9IFtdOyAvLyDlt7LpgInmi6nkvZzlk4FcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+e0oOadkOeuoeeQhicsXG4gICAgfVxuXG4gICAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcIkVtcHR5UGFnZVwiOnt9LFwiUG9wXCI6e1wieG1sbnM6di1vblwiOlwiXCJ9fTtcclxuJGV2ZW50cyA9IHtcIlBvcFwiOntcInYtb246Y2xvc2VcIjpcImNsb3NlXCIsXCJ2LW9uOmFkZEdyb3VwXCI6XCJhZGRHcm91cFwifX07XHJcbiBjb21wb25lbnRzID0ge1xuICAgICAgICBFbXB0eVBhZ2UsXG4gICAgICAgIFBvcCxcbiAgICB9XG4gICAgbWl4aW5zID0gW01peGluXVxuXG4gICAgZGF0YSA9IHtcbiAgICAgICAgY3VyVGFiOiAnaW1hZ2UnLFxuICAgICAgICB0YWJiYXJJdGVtczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGxhYmVsOiAn5Zu+54mHJyxcbiAgICAgICAgICAgICAgICBuYW1lOiAnaW1hZ2UnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBsYWJlbDogJ+inhumikScsXG4gICAgICAgICAgICAgICAgbmFtZTogJ3ZpZGVvJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbGFiZWw6ICfmlofnq6AnLFxuICAgICAgICAgICAgICAgIG5hbWU6ICdhcnRpY2xlJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICAgIC8vIOaMiemSruaWh+Wtl1xuICAgICAgICBvcHRpb25OYW1lczoge1xuICAgICAgICAgICAgaW1hZ2U6ICfkuIrkvKDlm77niYcnLFxuICAgICAgICAgICAgdmlkZW86ICfkuIrkvKDop4bpopEnLFxuICAgICAgICAgICAgYXJ0aWNsZTogJ+a3u+WKoOaWh+eroOWIhue7hCcsXG4gICAgICAgIH0sXG4gICAgICAgIC8vIOWxleekuuaXtueUqOeahHdvcmtzXG4gICAgICAgIHdvcmtzOiBbXSxcbiAgICAgICAgZ3JvdXBMaXN0OiBbXSxcbiAgICAgICAgdGl0bGU6ICfmsqHmnInmlofnq6DliIbnu4R+JyxcbiAgICAgICAgaXNFZGl0aW5nOiBmYWxzZSxcbiAgICAgICAgc2hvd1BvcDogZmFsc2UsXG4gICAgICAgIG5hbWU6ICcnLFxuICAgICAgICBpZDogJycsXG4gICAgICAgIGRlbExpc3Q6IFtdLFxuICAgICAgICBtcElkOiAnJyxcbiAgICB9XG5cbiAgICBhc3luYyBvbkxvYWQoKSB7XG4gICAgICAgIGF3YWl0IHRoaXMubG9hZERhdGEodGhpcy5jdXJUYWIpO1xuICAgICAgICBjb25zdCBtcElkID0gd2VweS5nZXRTdG9yYWdlU3luYygnY3VycmVudF9tcGlkJyk7XG4gICAgICAgIHRoaXMubXBJZCA9IG1wSWQ7XG4gICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgfVxuXG4gICAgbWV0aG9kcyA9IHtcbiAgICAgICAgc2VsZWN0VGFiKG5hbWUpIHtcbiAgICAgICAgICAgIHRoaXMuaW5pdERhdGEoKTtcblxuICAgICAgICAgICAgdGhpcy5jdXJUYWIgPSBuYW1lO1xuICAgICAgICAgICAgdGhpcy5sb2FkRGF0YShuYW1lKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICog6YCJ5oup5L2c5ZOBXG4gICAgICAgICAqIGlk55So5LqO5Yig6Zmk5L2c5ZOBXG4gICAgICAgICAqIGluZGV455So5LqO5om+5Yiw5L2c5ZOB77yM5qCH6K6wY2hlY2tcbiAgICAgICAgICovXG4gICAgICAgIHNlbGVjdEl0ZW0oaWQsIGluZGV4KSB7XG4gICAgICAgICAgICBpZiAoc2VsZWN0ZWRJZHMubGVuZ3RoID49IDEwKSB7XG4gICAgICAgICAgICAgICAgYWxlcnQoJ+S4gOasoeWPquiDveWIoOmZpDEw5p2h57Sg5p2Q77yBJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCB7IHdvcmtzIH0gPSB0aGlzO1xuICAgICAgICAgICAgY29uc3Qgd29yayA9IHdvcmtzW2luZGV4XTtcblxuICAgICAgICAgICAgaWYgKHdvcmspIHtcbiAgICAgICAgICAgICAgICB3b3JrLmNoZWNrZWQgPSAhd29yay5jaGVja2VkO1xuICAgICAgICAgICAgICAgIHNlbGVjdGVkSWRzLnB1c2goaWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIHByZXZpZXdSZXNvdXJjZSh1cmwpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmN1clRhYiA9PT0gJ2ltYWdlJykge1xuICAgICAgICAgICAgICAgIHd4LnByZXZpZXdJbWFnZSh7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnQ6IHVybCxcbiAgICAgICAgICAgICAgICAgICAgdXJscyxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuY3VyVGFiID09PSAndmlkZW8nKSB7XG4gICAgICAgICAgICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICAgICAgICAgIHVybDogYC9wYWdlcy9WaWRlb1BsYXk/dXJsPSR7dXJsfWAsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgZWRpdChlKSB7XG4gICAgICAgICAgICBjb25zdCB7IHN0YXR1cyB9ID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQ7XG4gICAgICAgICAgICBjb25zdCBkYXRhTGlzdCA9IHRoaXMuZ3JvdXBMaXN0O1xuICAgICAgICAgICAgaWYgKHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRhdGFMaXN0LmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oaXRlbSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hvc2VTdGF0dTogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMuZ3JvdXBMaXN0ID0gZGF0YUxpc3Q7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWxlY3RlZElkcyA9IFtdO1xuICAgICAgICAgICAgdGhpcy5kZWxMaXN0ID0gW107XG4gICAgICAgICAgICB0aGlzLmlzRWRpdGluZyA9ICF0aGlzLmlzRWRpdGluZztcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIOWIoOmZpOS9nOWTgVxuICAgICAgICAgKiDmibnph4/liKDpmaTvvIzpgJrov4dQcm9taXNlLmFsbOWunueOsO+8jOebruWJjeaXoOaJuemHj+WIoOmZpOaOpeWPo1xuICAgICAgICAgKi9cbiAgICAgICAgYXN5bmMgZGVsZXRlSXRlbSgpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY3VyVGFiID09PSAnYXJ0aWNsZScpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmRlbExpc3QubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydCgn6K+36YCJ5oup6KaB5Yig6Zmk55qE5YiG57uE77yBJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaWRzID0gdGhpcy5kZWxMaXN0LmpvaW4oKTtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgZ2V0KCcvYnVzaW5lc3NBcnRpY2xlL2RlbGdyb3VwLzAnLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZHMsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgY2FuY2VsIH0gPSBhd2FpdCBhbGVydFAoYOehruiupOWIoOmZpOaJgOmAieeahCR7c2VsZWN0ZWRJZHMubGVuZ3Rofemhuee0oOadkO+8n2ApO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2FuY2VsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlzRWRpdGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJZHMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMud29ya3MuZm9yRWFjaCgoLi4ucHJvcHMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBbaXRlbV0gPSBwcm9wcztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmNoZWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoc2VsZWN0ZWRJZHMubWFwKGlkID0+IGdldChERUxFVEVfUkVTT1VSQ0UgKyBpZCkpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdG9hc3QoJ+WIoOmZpOaIkOWKn++8gScpO1xuICAgICAgICAgICAgICAgIHRoaXMuaXNFZGl0aW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcblxuICAgICAgICAgICAgICAgIHRoaXMuaW5pdERhdGEoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWREYXRhKHRoaXMuY3VyVGFiKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVycm9ySGFuZGxlcihlKTtcbiAgICAgICAgICAgICAgICB0b2FzdCgn5Yig6Zmk5aSx6LSl77yBJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5pc0VkaXRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiDkuIrkvKDntKDmnZBcbiAgICAgICAgICovXG4gICAgICAgIGFzeW5jIHVwbG9hZEZpbGUodHlwZSkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBjb25zdCBuZXRTdGF0dXMgPSBhd2FpdCBnZXROZXRTdGF0dXMoKTtcblxuICAgICAgICAgICAgICAgIGlmIChuZXRTdGF0dXMgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdG9hc3QoJ+aXoOe9kee7nCcpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKG5ldFN0YXR1cyA9PT0gMiAmJiB0eXBlID09PSAndmlkZW8nKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgY2FuY2VsIH0gPSBhd2FpdCBhbGVydFAoJ+ehruWumuWcqOenu+WKqOe9kee7nOS4i+S4iuS8oOinhumike+8nycsICfmj5DnpLonKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNhbmNlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2ltYWdlJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMudXBsb2FkSW1hZ2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3ZpZGVvJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMudXBsb2FkVmlkZW8oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOS4iuS8oOWbvueJh+W7tui/nzLnp5LliLfmlrDvvIzphY3lkIh0b2FzdOeahDLnp5Llu7bov59cbiAgICAgICAgICAgICAgICAgICAgICAgIGF3YWl0IHNsZWVwKDMwMDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnYXJ0aWNsZSc6XG4gICAgICAgICAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLnNob3dEaWFsb2coKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHR5cGUgPT09ICdhcnRpY2xlJykgcmV0dXJuO1xuICAgICAgICAgICAgICAgIHRoaXMuaW5pdERhdGEoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWREYXRhKHRoaXMuY3VyVGFiKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgYXN5bmMgYWRkR3JvdXAoY29udGVudCkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBsZXQgdXJsID0gJyc7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5uYW1lKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5uYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIHVybCA9IGAvYnVzaW5lc3NBcnRpY2xlL3VwZGF0ZWdyb3VwLyR7dGhpcy5pZH1gO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHVybCA9ICcvYnVzaW5lc3NBcnRpY2xlL2FkZGdyb3VwJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYXdhaXQgZ2V0KHVybCwge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiBjb250ZW50LFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1BvcCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuaXNFZGl0aW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5uYW1lID0gJyc7XG4gICAgICAgICAgICAgICAgdGhpcy5pZCA9ICcnO1xuICAgICAgICAgICAgICAgIHRvYXN0KCfmk43kvZzmiJDlip/vvIEnKTtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWREYXRhKHRoaXMuY3VyVGFiKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dQb3AgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLmlzRWRpdGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRvYXN0KGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgICAgfSxcbiAgICAgICAgY2xvc2UoKSB7XG4gICAgICAgICAgICB0aGlzLnNob3dQb3AgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICAgIH0sXG4gICAgICAgIGVkaXRDaG9zZShpZCwgaW5kZXgsIG5hbWUpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzRWRpdGluZykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLmdyb3VwTGlzdFtpbmRleF07XG4gICAgICAgICAgICAgICAgY29uc3QgaXRlbUluZGV4ID0gdGhpcy5kZWxMaXN0Lmxlbmd0aCA9PT0gMCA/IC0yIDogdGhpcy5kZWxMaXN0LmluZGV4T2YoaWQpO1xuICAgICAgICAgICAgICAgIGlmIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uY2hvc2VTdGF0dSA9ICFpdGVtLmNob3NlU3RhdHU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChpdGVtSW5kZXggPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGVsTGlzdC5wdXNoKGlkKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRlbExpc3Quc3BsaWNlKGl0ZW1JbmRleCwgMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8g54K55Ye76Lez6L2s5paH56ug6K+m5oOF6aG16Z2iXG4gICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgICAgIHVybDogYGFydGljbGVDb21wb25lbnRsaXN0P2dyb3VwPSR7aWR9Jm5hbWU9JHtuYW1lfWAsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgc2hvd0RpYWxvZyhpZCA9ICcnLCBuYW1lID0gJycpIHtcbiAgICAgICAgICAgIGNvbnN0IHsgZ3JvdXBMaXN0IH0gPSB0aGlzO1xuICAgICAgICAgICAgaWYgKCFuYW1lICYmIGdyb3VwTGlzdCAmJiBncm91cExpc3QubGVuZ3RoID49IDEwKSB7XG4gICAgICAgICAgICAgICAgdG9hc3QoJyDliIbnu4TmlbDph4/ovr7liLDmnIDlpKfvvIgxMOS4qu+8ie+8jOaXoOazleWIm+W7uuabtOWkmuOAgicpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgICAgICB0aGlzLmlkID0gaWQ7XG4gICAgICAgICAgICB0aGlzLiRicm9hZGNhc3QoJ3Bvc3REYXRhJywgbmFtZSk7XG4gICAgICAgICAgICB0aGlzLnNob3dQb3AgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgICAgfSxcbiAgICB9XG5cbiAgICBpbml0RGF0YSgpIHtcbiAgICAgICAgLy8g5Yid5aeL5YyW5pWw5o2uXG4gICAgICAgIHRoaXMud29ya3MgPSBbXTtcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgICAgcGFnZU51bSA9IDE7XG4gICAgICAgIHVybHMgPSBbXTtcbiAgICAgICAgc2VsZWN0ZWRJZHMgPSBbXTtcbiAgICB9XG5cbiAgICBhc3luYyBsb2FkRGF0YSh0eXBlKSB7XG4gICAgICAgIGxldCByZXNvdXJjZVR5cGUgPSAxO1xuXG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgICAgY2FzZSAnaW1hZ2UnOlxuICAgICAgICAgICAgY2FzZSAndmlkZW8nOlxuICAgICAgICAgICAgICAgIHJlc291cmNlVHlwZSA9ICh7XG4gICAgICAgICAgICAgICAgICAgIGltYWdlOiAxLFxuICAgICAgICAgICAgICAgICAgICB2aWRlbzogMixcbiAgICAgICAgICAgICAgICB9KVt0eXBlXTtcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLmxvYWRSZXNvdXJjZShyZXNvdXJjZVR5cGUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdhcnRpY2xlJzpcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLmxvYWRBcnRpY2xlKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhc3luYyBsb2FkUmVzb3VyY2UocmVzb3VyY2VUeXBlKSB7XG4gICAgICAgIGNvbnN0IHBvc3REYXRhID0ge1xuICAgICAgICAgICAgcmVzb3VyY2VUeXBlLFxuICAgICAgICB9O1xuXG4gICAgICAgIE9iamVjdC5hc3NpZ24ocG9zdERhdGEsIHtcbiAgICAgICAgICAgIHBhZ2VOdW0sXG4gICAgICAgICAgICBwYWdlU2l6ZSxcbiAgICAgICAgfSk7XG4gICAgICAgIHBhZ2VOdW0gKz0gMTtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgeyBkYXRhIH0gPSBhd2FpdCBnZXQoTE9BRF9SRVNPVVJDRV9VUkwsIHBvc3REYXRhKTtcbiAgICAgICAgICAgIGlmICgoIWRhdGEgfHwgIWRhdGEubGVuZ3RoKSAmJiB0aGlzLndvcmtzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHRvYXN0KCflt7Lnu4/liLDlupXkuoYnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZGF0YS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHdvcmtJdGVtID0gT2JqZWN0LmFzc2lnbih7fSwgaXRlbSk7XG5cbiAgICAgICAgICAgICAgICAvLyDliqDovb3lm77niYfvvIx1cmzliqDkuIrlrr3luqbvvIzliqDkuIrliY3nva7ln5/lkI1cbiAgICAgICAgICAgICAgICBpZiAocmVzb3VyY2VUeXBlID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHdvcmtJdGVtLnByZXZpZXdVcmwgPSBgJHtwaWNTcmNEb21haW4oKX0ke3dvcmtJdGVtLnJlc291cmNlVXJsfT93PTM3NWA7IC8vIOmihOiniOWbvueJh1xuICAgICAgICAgICAgICAgICAgICB3b3JrSXRlbS5yZXNvdXJjZVVybCA9IGAke3BpY1NyY0RvbWFpbigpfSR7d29ya0l0ZW0ucmVzb3VyY2VVcmx9P3c9MTAwYDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyDliqDovb3op4bpopFcbiAgICAgICAgICAgICAgICBpZiAocmVzb3VyY2VUeXBlID09PSAyKSB7XG4gICAgICAgICAgICAgICAgICAgIHdvcmtJdGVtLnByZXZpZXdVcmwgPSB3b3JrSXRlbS5yZXNvdXJjZVVybDtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlc291cmNlVXJsID0gJyc7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8g5Zyo6L+Z6YeM5re75YqgdHJ5IGNhdGNo5piv5pyJ5b+F6KaB55qE77yM6Iul5LiN5re75Yqg77yM5oql6ZSZ5LqG5Lya57uI5q2i5b6q546vXG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAod29ya0l0ZW0uZXh0ZW5kKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZXh0ZW5kID0gSlNPTi5wYXJzZSh3b3JrSXRlbS5leHRlbmQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc291cmNlVXJsID0gYCR7ZXh0ZW5kLnNvdXJjZUNvdmVyVXJsfT93PTEwMGA7IC8vIOWwgemdouWbvueJh1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVycm9ySGFuZGxlcihlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHdvcmtJdGVtLnJlc291cmNlVXJsID0gcmVzb3VyY2VVcmw7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy53b3Jrcy5wdXNoKHdvcmtJdGVtKTtcbiAgICAgICAgICAgICAgICB1cmxzLnB1c2god29ya0l0ZW0ucHJldmlld1VybCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHRoaXMuZXJyb3JIYW5kbGVyKGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXN5bmMgbG9hZEFydGljbGUoKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCB7IGRhdGEgfSA9IGF3YWl0IGdldCgnL2J1c2luZXNzQXJ0aWNsZS9ncm91cHMnKTtcbiAgICAgICAgICAgIGlmICghZGF0YSB8fCBkYXRhLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuICAgICAgICAgICAgZGF0YS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oaXRlbSwge1xuICAgICAgICAgICAgICAgICAgICBjaG9zZVN0YXR1OiBmYWxzZSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5ncm91cExpc3QgPSBkYXRhO1xuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhc3luYyB1cGxvYWRJbWFnZSgpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHsgdGVtcEZpbGVQYXRocyB9ID0gYXdhaXQgd2VweS5jaG9vc2VJbWFnZSh7XG4gICAgICAgICAgICAgICAgY291bnQ6IDEsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMudXBsb2FkUmVzb3VyY2UodGVtcEZpbGVQYXRoc1swXSwgJ2ltYWdlJyk7XG4gICAgICAgICAgICB0b2FzdCgn5LiK5Lyg5oiQ5YqfJyk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHRoaXMuZXJyb3JIYW5kbGVyKCfkuIrkvKDlpLHotKUnLCBlKTtcbiAgICAgICAgICAgIHRvYXN0KCfkuIrkvKDlpLHotKUnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFzeW5jIHVwbG9hZFZpZGVvKCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgeyB0ZW1wRmlsZVBhdGggfSA9IGF3YWl0IHdlcHkuY2hvb3NlVmlkZW8oKTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMudXBsb2FkUmVzb3VyY2UodGVtcEZpbGVQYXRoLCAndmlkZW8nKTtcbiAgICAgICAgICAgIHRvYXN0KCfkuIrkvKDmiJDlip8nLCAzMDAwKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgdGhpcy5lcnJvckhhbmRsZXIoJ+S4iuS8oOWksei0pScsIGUpO1xuICAgICAgICAgICAgdG9hc3QoJ+S4iuS8oOWksei0pScsIDMwMDApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGRlc2Mg5LiK5Lyg57Sg5p2QXG4gICAgICovXG4gICAgYXN5bmMgdXBsb2FkUmVzb3VyY2UocGF0aCwgdHlwZSkge1xuICAgICAgICAvLyDkuIrkvKDotYTmupBcbiAgICAgICAgY29uc3QgeyBjb250ZW50OiByZXNvdXJjZVVybCB9ID0gYXdhaXQgdXBsb2FkZXIocGF0aCwge1xuICAgICAgICAgICAgdHlwZSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8g5bCG6LWE5rqQ5o+S5YWl5Yiw5a+55bqU6LWE5rqQ5bqTXG4gICAgICAgIGF3YWl0IGdldChTQVZFX1JFU09VUkNFX1VSTCwge1xuICAgICAgICAgICAgcmVzb3VyY2VVcmwsXG4gICAgICAgICAgICByZXNvdXJjZVR5cGU6IHR5cGUgPT09ICdpbWFnZScgPyAxIDogMixcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2hvd0RpYWxvZygpIHtcbiAgICAgICAgY29uc3QgeyBncm91cExpc3QgfSA9IHRoaXM7XG4gICAgICAgIGlmIChncm91cExpc3QgJiYgZ3JvdXBMaXN0Lmxlbmd0aCA+PSAxMCkge1xuICAgICAgICAgICAgdG9hc3QoJyDliIbnu4TmlbDph4/ovr7liLDmnIDlpKfvvIgxMOS4qu+8ie+8jOaXoOazleWIm+W7uuabtOWkmuOAgicpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuJGJyb2FkY2FzdCgncG9zdERhdGEnLCAnJyk7XG4gICAgICAgIHRoaXMuc2hvd1BvcCA9IHRydWU7XG4gICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgfVxuICAgIGVycm9ySGFuZGxlcihlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdFUlJPUjonLCBlKTtcbiAgICB9XG5cbiAgICBvblJlYWNoQm90dG9tKCkge1xuICAgICAgICB0aGlzLmxvYWREYXRhKHRoaXMuY3VyVGFiKTtcbiAgICB9XG59XG4iXX0=