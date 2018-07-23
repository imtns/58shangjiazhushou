'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _mixins = require('./../mixins/index.js');

var _mixins2 = _interopRequireDefault(_mixins);

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
        }, _this.mixins = [_mixins2.default], _this.data = {
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

                                    if (this.name) {
                                        url = '/businessArticle/updategroup/' + this.id;
                                    } else {
                                        url = '/businessArticle/addgroup';
                                    }
                                    _context3.next = 5;
                                    return (0, _ajax.get)(url, {
                                        name: content
                                    });

                                case 5:
                                    this.showPop = false;
                                    this.$apply();
                                    (0, _utils.toast)('操作成功！');
                                    this.loadData(this.curTab);
                                    _context3.next = 16;
                                    break;

                                case 11:
                                    _context3.prev = 11;
                                    _context3.t0 = _context3['catch'](0);

                                    this.errorHandler(_context3.t0);
                                    this.showPop = false;
                                    (0, _utils.toast)(_context3.t0);

                                case 16:
                                case 'end':
                                    return _context3.stop();
                            }
                        }
                    }, _callee3, this, [[0, 11]]);
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

                if (name) {
                    this.name = name;
                    this.id = id;
                    this.$broadcast('postData', name);
                }
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
