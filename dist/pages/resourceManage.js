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
            curTab: 'article',
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
            showPop: false
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
            edit: function edit() {
                selectedIds = [];
                this.isEditing = !this.isEditing;
            },


            /**
             * 删除作品
             * 批量删除，通过Promise.all实现，目前无批量删除接口
             */
            deleteItem: function () {
                var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    _context.prev = 0;
                                    _context.next = 3;
                                    return Promise.all(selectedIds.map(function (id) {
                                        return (0, _ajax.get)(_url.DELETE_RESOURCE + id);
                                    }));

                                case 3:

                                    (0, _utils.toast)('删除成功！');
                                    this.isEditing = false;
                                    this.$apply();

                                    this.initData();
                                    this.loadData(this.curTab);
                                    _context.next = 14;
                                    break;

                                case 10:
                                    _context.prev = 10;
                                    _context.t0 = _context['catch'](0);

                                    this.errorHandler(_context.t0);
                                    (0, _utils.toast)('删除失败！');

                                case 14:
                                case 'end':
                                    return _context.stop();
                            }
                        }
                    }, _callee, this, [[0, 10]]);
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
                var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(type) {
                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                        while (1) {
                            switch (_context2.prev = _context2.next) {
                                case 0:
                                    _context2.t0 = type;
                                    _context2.next = _context2.t0 === 'image' ? 3 : _context2.t0 === 'video' ? 6 : _context2.t0 === 'article' ? 11 : 14;
                                    break;

                                case 3:
                                    _context2.next = 5;
                                    return this.uploadImage();

                                case 5:
                                    return _context2.abrupt('break', 15);

                                case 6:
                                    _context2.next = 8;
                                    return this.uploadVideo();

                                case 8:
                                    _context2.next = 10;
                                    return (0, _utils.sleep)(2000);

                                case 10:
                                    return _context2.abrupt('break', 15);

                                case 11:
                                    _context2.next = 13;
                                    return this.showDialog();

                                case 13:
                                    return _context2.abrupt('break', 15);

                                case 14:
                                    return _context2.abrupt('break', 15);

                                case 15:

                                    this.initData();
                                    this.loadData(this.curTab);

                                case 17:
                                case 'end':
                                    return _context2.stop();
                            }
                        }
                    }, _callee2, this);
                }));

                function uploadFile(_x) {
                    return _ref3.apply(this, arguments);
                }

                return uploadFile;
            }(),
            addGroup: function () {
                var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(content) {
                    return regeneratorRuntime.wrap(function _callee3$(_context3) {
                        while (1) {
                            switch (_context3.prev = _context3.next) {
                                case 0:
                                    _context3.next = 2;
                                    return (0, _ajax.get)('/businessArticle/addgroup', {
                                        name: content
                                    });

                                case 2:
                                    this.showPop = false;
                                    this.$apply();
                                    (0, _utils.toast)('添加成功！');
                                    this.loadData(this.curTab);

                                case 6:
                                case 'end':
                                    return _context3.stop();
                            }
                        }
                    }, _callee3, this);
                }));

                function addGroup(_x2) {
                    return _ref4.apply(this, arguments);
                }

                return addGroup;
            }(),
            close: function close() {
                this.showPop = false;
                this.$apply();
            },
            editChose: function editChose(e) {
                var id = e.currentTarget.dataset.item.id;

                if (this.isEditing) {
                    var selArr = selectedIds;
                    var dataList = this.listData;
                    var index = selectedIds.length === 0 ? -2 : selectedIds.indexOf(id);
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
                    selectedIds = selArr;
                    this.$apply();
                    return;
                }
                // 点击跳转文章详情页面
                _wepy2.default.navigateTo({
                    url: 'articleComponentlist?id=' + id
                });
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Index, [{
        key: 'onLoad',
        value: function () {
            var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                _context4.next = 2;
                                return this.loadData(this.curTab);

                            case 2:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));

            function onLoad() {
                return _ref5.apply(this, arguments);
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
            var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(type) {
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

            function loadData(_x3) {
                return _ref6.apply(this, arguments);
            }

            return loadData;
        }()
    }, {
        key: 'loadResource',
        value: function () {
            var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(resourceType) {
                var _this2 = this;

                var postData, _ref8, data;

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
                                _ref8 = _context6.sent;
                                data = _ref8.data;

                                if (!data || !data.length) {
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
                                            var extend = JSON.parse(workItem.extend);
                                            resourceUrl = extend.sourceCoverUrl + '?w=100'; // 封面图片
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

            function loadResource(_x4) {
                return _ref7.apply(this, arguments);
            }

            return loadResource;
        }()
    }, {
        key: 'loadArticle',
        value: function () {
            var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
                return regeneratorRuntime.wrap(function _callee7$(_context7) {
                    while (1) {
                        switch (_context7.prev = _context7.next) {
                            case 0:
                            case 'end':
                                return _context7.stop();
                        }
                    }
                }, _callee7, this);
            }));

            function loadArticle() {
                return _ref9.apply(this, arguments);
            }

            return loadArticle;
        }()
    }, {
        key: 'uploadImage',
        value: function () {
            var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
                var _ref11, tempFilePaths;

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
                                _ref11 = _context8.sent;
                                tempFilePaths = _ref11.tempFilePaths;
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
                return _ref10.apply(this, arguments);
            }

            return uploadImage;
        }()
    }, {
        key: 'uploadVideo',
        value: function () {
            var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
                var _ref13, tempFilePath;

                return regeneratorRuntime.wrap(function _callee9$(_context9) {
                    while (1) {
                        switch (_context9.prev = _context9.next) {
                            case 0:
                                _context9.prev = 0;
                                _context9.next = 3;
                                return _wepy2.default.chooseVideo();

                            case 3:
                                _ref13 = _context9.sent;
                                tempFilePath = _ref13.tempFilePath;
                                _context9.next = 7;
                                return this.uploadResource(tempFilePath, 'video');

                            case 7:
                                (0, _utils.toast)('上传成功');
                                _context9.next = 14;
                                break;

                            case 10:
                                _context9.prev = 10;
                                _context9.t0 = _context9['catch'](0);

                                this.errorHandler('上传失败', _context9.t0);
                                (0, _utils.toast)('上传失败');

                            case 14:
                            case 'end':
                                return _context9.stop();
                        }
                    }
                }, _callee9, this, [[0, 10]]);
            }));

            function uploadVideo() {
                return _ref12.apply(this, arguments);
            }

            return uploadVideo;
        }()

        /**
         * @desc 上传素材
         */

    }, {
        key: 'uploadResource',
        value: function () {
            var _ref14 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(path, type) {
                var _ref15, resourceUrl;

                return regeneratorRuntime.wrap(function _callee10$(_context10) {
                    while (1) {
                        switch (_context10.prev = _context10.next) {
                            case 0:
                                _context10.next = 2;
                                return (0, _uploaderP2.default)(path, {
                                    type: type
                                });

                            case 2:
                                _ref15 = _context10.sent;
                                resourceUrl = _ref15.content;
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

            function uploadResource(_x5, _x6) {
                return _ref14.apply(this, arguments);
            }

            return uploadResource;
        }()
    }, {
        key: 'showDialog',
        value: function showDialog() {
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc291cmNlTWFuYWdlLmpzIl0sIm5hbWVzIjpbInBhZ2VOdW0iLCJwYWdlU2l6ZSIsInVybHMiLCJzZWxlY3RlZElkcyIsIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsIkVtcHR5UGFnZSIsIlBvcCIsIm1peGlucyIsIk1peGluIiwiZGF0YSIsImN1clRhYiIsInRhYmJhckl0ZW1zIiwibGFiZWwiLCJuYW1lIiwib3B0aW9uTmFtZXMiLCJpbWFnZSIsInZpZGVvIiwiYXJ0aWNsZSIsIndvcmtzIiwiZ3JvdXBMaXN0IiwidGl0bGUiLCJpc0VkaXRpbmciLCJzaG93UG9wIiwibWV0aG9kcyIsInNlbGVjdFRhYiIsImluaXREYXRhIiwibG9hZERhdGEiLCJzZWxlY3RJdGVtIiwiaWQiLCJpbmRleCIsImxlbmd0aCIsIndvcmsiLCJjaGVja2VkIiwicHVzaCIsInByZXZpZXdSZXNvdXJjZSIsInVybCIsInd4IiwicHJldmlld0ltYWdlIiwiY3VycmVudCIsIm5hdmlnYXRlVG8iLCJlZGl0IiwiZGVsZXRlSXRlbSIsIlByb21pc2UiLCJhbGwiLCJtYXAiLCJERUxFVEVfUkVTT1VSQ0UiLCIkYXBwbHkiLCJlcnJvckhhbmRsZXIiLCJ1cGxvYWRGaWxlIiwidHlwZSIsInVwbG9hZEltYWdlIiwidXBsb2FkVmlkZW8iLCJzaG93RGlhbG9nIiwiYWRkR3JvdXAiLCJjb250ZW50IiwiY2xvc2UiLCJlZGl0Q2hvc2UiLCJlIiwiY3VycmVudFRhcmdldCIsImRhdGFzZXQiLCJpdGVtIiwic2VsQXJyIiwiZGF0YUxpc3QiLCJsaXN0RGF0YSIsImluZGV4T2YiLCJmb3JFYWNoIiwiT2JqZWN0IiwiYXNzaWduIiwiY2hvc2VTdGF0dSIsInNwbGljZSIsIndlcHkiLCJyZXNvdXJjZVR5cGUiLCJsb2FkUmVzb3VyY2UiLCJsb2FkQXJ0aWNsZSIsInBvc3REYXRhIiwiTE9BRF9SRVNPVVJDRV9VUkwiLCJ3b3JrSXRlbSIsInByZXZpZXdVcmwiLCJyZXNvdXJjZVVybCIsImV4dGVuZCIsIkpTT04iLCJwYXJzZSIsInNvdXJjZUNvdmVyVXJsIiwiY2hvb3NlSW1hZ2UiLCJjb3VudCIsInRlbXBGaWxlUGF0aHMiLCJ1cGxvYWRSZXNvdXJjZSIsImNob29zZVZpZGVvIiwidGVtcEZpbGVQYXRoIiwicGF0aCIsIlNBVkVfUkVTT1VSQ0VfVVJMIiwiY29uc29sZSIsImxvZyIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUFFQSxJQUFJQSxVQUFVLENBQWQ7QUFDQSxJQUFNQyxXQUFXLEVBQWpCO0FBQ0EsSUFBSUMsT0FBTyxFQUFYO0FBQ0EsSUFBSUMsY0FBYyxFQUFsQixDLENBQXNCOztJQUVEQyxLOzs7Ozs7Ozs7Ozs7Ozt3TEFDakJDLE0sR0FBUztBQUNMQyxvQ0FBd0I7QUFEbkIsUyxRQUlWQyxPLEdBQVUsRSxRQUNiQyxNLEdBQVMsRUFBQyxhQUFZLEVBQWIsRUFBZ0IsT0FBTSxFQUFDLGNBQWEsRUFBZCxFQUF0QixFLFFBQ1RDLE8sR0FBVSxFQUFDLE9BQU0sRUFBQyxjQUFhLE9BQWQsRUFBc0IsaUJBQWdCLFVBQXRDLEVBQVAsRSxRQUNUQyxVLEdBQWE7QUFDTkMsMENBRE07QUFFTkM7QUFGTSxTLFFBSVZDLE0sR0FBUyxDQUFDQyxnQkFBRCxDLFFBRVRDLEksR0FBTztBQUNIQyxvQkFBUSxTQURMO0FBRUhDLHlCQUFhLENBQ1Q7QUFDSUMsdUJBQU8sSUFEWDtBQUVJQyxzQkFBTTtBQUZWLGFBRFMsRUFLVDtBQUNJRCx1QkFBTyxJQURYO0FBRUlDLHNCQUFNO0FBRlYsYUFMUyxFQVNUO0FBQ0lELHVCQUFPLElBRFg7QUFFSUMsc0JBQU07QUFGVixhQVRTLENBRlY7QUFnQkg7QUFDQUMseUJBQWE7QUFDVEMsdUJBQU8sTUFERTtBQUVUQyx1QkFB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QWpCLEM7Ozs7QUFBeEJDLDZDLFVBQUFBLGE7O3VDQUdGLEtBQUtDLGNBQUwsQ0FBb0JELGNBQWMsQ0FBZCxDQUFwQixFQUFzQyxPQUF0QyxDOzs7QUFDTixrREFBTSxNQUFOOzs7Ozs7OztBQUVBLHFDQUFLdEMsWUFBTCxDQUFrQixNQUFsQjtBQUNBLGtEQUFNLE1BQU47Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7dUNBTStCdUIsZUFBS2lCLFdBQUwsRTs7OztBQUF2QkMsNEMsVUFBQUEsWTs7dUNBQ0YsS0FBS0YsY0FBTCxDQUFvQkUsWUFBcEIsRUFBa0MsT0FBbEMsQzs7O0FBQ04sa0RBQU0sTUFBTjs7Ozs7Ozs7QUFFQSxxQ0FBS3pDLFlBQUwsQ0FBa0IsTUFBbEI7QUFDQSxrREFBTSxNQUFOOzs7Ozs7Ozs7Ozs7Ozs7OztBQUlSOzs7Ozs7O29HQUdxQjBDLEksRUFBTXhDLEk7Ozs7Ozs7O3VDQUVnQix5QkFBU3dDLElBQVQsRUFBZTtBQUNsRHhDO0FBRGtELGlDQUFmLEM7Ozs7QUFBdEI2QiwyQyxVQUFUeEIsTzs7dUNBS0YsZUFBSW9DLHNCQUFKLEVBQXVCO0FBQ3pCWiw0REFEeUI7QUFFekJQLGtEQUFjdEIsU0FBUyxPQUFULEdBQW1CLENBQW5CLEdBQXVCO0FBRlosaUNBQXZCLEM7Ozs7Ozs7Ozs7Ozs7Ozs7OztxQ0FNRztBQUNULGlCQUFLM0IsT0FBTCxHQUFlLElBQWY7QUFDQSxpQkFBS3dCLE1BQUw7QUFDSDs7O3FDQUNZVyxDLEVBQUc7QUFDWmtDLG9CQUFRQyxHQUFSLENBQVksUUFBWixFQUFzQm5DLENBQXRCO0FBQ0g7Ozt3Q0FFZTtBQUNaLGlCQUFLL0IsUUFBTCxDQUFjLEtBQUtoQixNQUFuQjtBQUNIOzs7O0VBaFY4QjRELGVBQUt1QixJOztrQkFBbkIvRixLIiwiZmlsZSI6InJlc291cmNlTWFuYWdlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xyXG5pbXBvcnQgTWl4aW4gZnJvbSAnLi4vbWl4aW5zJztcclxuaW1wb3J0IHsgTE9BRF9SRVNPVVJDRV9VUkwsIERFTEVURV9SRVNPVVJDRSwgU0FWRV9SRVNPVVJDRV9VUkwgfSBmcm9tICcuLi91dGlscy91cmwnO1xyXG5pbXBvcnQgeyBnZXQgfSBmcm9tICcuLi91dGlscy9hamF4JztcclxuaW1wb3J0IHsgdG9hc3QsIGFsZXJ0LCBwaWNTcmNEb21haW4sIHNsZWVwIH0gZnJvbSAnLi4vdXRpbHMnO1xyXG5pbXBvcnQgdXBsb2FkZXIgZnJvbSAnLi4vdXRpbHMvdXBsb2FkZXJQJztcclxuaW1wb3J0IEVtcHR5UGFnZSBmcm9tICcuLi9jb21wb25lbnRzL0VtcHR5UGFnZSc7XHJcbmltcG9ydCBQb3AgZnJvbSAnLi4vY29tcG9uZW50cy9EaWFsb2cnO1xyXG5cclxubGV0IHBhZ2VOdW0gPSAxO1xyXG5jb25zdCBwYWdlU2l6ZSA9IDIwO1xyXG5sZXQgdXJscyA9IFtdO1xyXG5sZXQgc2VsZWN0ZWRJZHMgPSBbXTsgLy8g5bey6YCJ5oup5L2c5ZOBXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgICBjb25maWcgPSB7XHJcbiAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+e0oOadkOeuoeeQhicsXHJcbiAgICB9XHJcblxyXG4gICAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcIkVtcHR5UGFnZVwiOnt9LFwiUG9wXCI6e1wieG1sbnM6di1vblwiOlwiXCJ9fTtcclxuJGV2ZW50cyA9IHtcIlBvcFwiOntcInYtb246Y2xvc2VcIjpcImNsb3NlXCIsXCJ2LW9uOmFkZEdyb3VwXCI6XCJhZGRHcm91cFwifX07XHJcbiBjb21wb25lbnRzID0ge1xyXG4gICAgICAgIEVtcHR5UGFnZSxcclxuICAgICAgICBQb3AsXHJcbiAgICB9XHJcbiAgICBtaXhpbnMgPSBbTWl4aW5dXHJcblxyXG4gICAgZGF0YSA9IHtcclxuICAgICAgICBjdXJUYWI6ICdhcnRpY2xlJyxcclxuICAgICAgICB0YWJiYXJJdGVtczogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBsYWJlbDogJ+WbvueJhycsXHJcbiAgICAgICAgICAgICAgICBuYW1lOiAnaW1hZ2UnLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBsYWJlbDogJ+inhumikScsXHJcbiAgICAgICAgICAgICAgICBuYW1lOiAndmlkZW8nLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBsYWJlbDogJ+aWh+eroCcsXHJcbiAgICAgICAgICAgICAgICBuYW1lOiAnYXJ0aWNsZScsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgXSxcclxuICAgICAgICAvLyDmjInpkq7mloflrZdcclxuICAgICAgICBvcHRpb25OYW1lczoge1xyXG4gICAgICAgICAgICBpbWFnZTogJ+S4iuS8oOWbvueJhycsXHJcbiAgICAgICAgICAgIHZpZGVvOiAn5LiK5Lyg6KeG6aKRJyxcclxuICAgICAgICAgICAgYXJ0aWNsZTogJ+a3u+WKoOaWh+eroOWIhue7hCcsXHJcbiAgICAgICAgfSxcclxuICAgICAgICAvLyDlsZXnpLrml7bnlKjnmoR3b3Jrc1xyXG4gICAgICAgIHdvcmtzOiBbXSxcclxuICAgICAgICBncm91cExpc3Q6IFtdLFxyXG4gICAgICAgIHRpdGxlOiAn5rKh5pyJ5paH56ug5YiG57uEficsXHJcbiAgICAgICAgaXNFZGl0aW5nOiBmYWxzZSxcclxuICAgICAgICBzaG93UG9wOiBmYWxzZSxcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBvbkxvYWQoKSB7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5sb2FkRGF0YSh0aGlzLmN1clRhYik7XHJcbiAgICB9XHJcblxyXG4gICAgbWV0aG9kcyA9IHtcclxuICAgICAgICBzZWxlY3RUYWIobmFtZSkge1xyXG4gICAgICAgICAgICB0aGlzLmluaXREYXRhKCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmN1clRhYiA9IG5hbWU7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZERhdGEobmFtZSk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog6YCJ5oup5L2c5ZOBXHJcbiAgICAgICAgICogaWTnlKjkuo7liKDpmaTkvZzlk4FcclxuICAgICAgICAgKiBpbmRleOeUqOS6juaJvuWIsOS9nOWTge+8jOagh+iusGNoZWNrXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgc2VsZWN0SXRlbShpZCwgaW5kZXgpIHtcclxuICAgICAgICAgICAgaWYgKHNlbGVjdGVkSWRzLmxlbmd0aCA+PSAxMCkge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoJ+S4gOasoeWPquiDveWIoOmZpDEw5p2h57Sg5p2Q77yBJyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHsgd29ya3MgfSA9IHRoaXM7XHJcbiAgICAgICAgICAgIGNvbnN0IHdvcmsgPSB3b3Jrc1tpbmRleF07XHJcblxyXG4gICAgICAgICAgICBpZiAod29yaykge1xyXG4gICAgICAgICAgICAgICAgd29yay5jaGVja2VkID0gIXdvcmsuY2hlY2tlZDtcclxuICAgICAgICAgICAgICAgIHNlbGVjdGVkSWRzLnB1c2goaWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgcHJldmlld1Jlc291cmNlKHVybCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jdXJUYWIgPT09ICdpbWFnZScpIHtcclxuICAgICAgICAgICAgICAgIHd4LnByZXZpZXdJbWFnZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudDogdXJsLFxyXG4gICAgICAgICAgICAgICAgICAgIHVybHMsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuY3VyVGFiID09PSAndmlkZW8nKSB7XHJcbiAgICAgICAgICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgICAgICAgICB1cmw6IGAvcGFnZXMvVmlkZW9QbGF5P3VybD0ke3VybH1gLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBlZGl0KCkge1xyXG4gICAgICAgICAgICBzZWxlY3RlZElkcyA9IFtdO1xyXG4gICAgICAgICAgICB0aGlzLmlzRWRpdGluZyA9ICF0aGlzLmlzRWRpdGluZztcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDliKDpmaTkvZzlk4FcclxuICAgICAgICAgKiDmibnph4/liKDpmaTvvIzpgJrov4dQcm9taXNlLmFsbOWunueOsO+8jOebruWJjeaXoOaJuemHj+WIoOmZpOaOpeWPo1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGFzeW5jIGRlbGV0ZUl0ZW0oKSB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBhd2FpdCBQcm9taXNlLmFsbChzZWxlY3RlZElkcy5tYXAoaWQgPT4gZ2V0KERFTEVURV9SRVNPVVJDRSArIGlkKSkpO1xyXG5cclxuICAgICAgICAgICAgICAgIHRvYXN0KCfliKDpmaTmiJDlip/vvIEnKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNFZGl0aW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuaW5pdERhdGEoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9hZERhdGEodGhpcy5jdXJUYWIpO1xyXG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVycm9ySGFuZGxlcihlKTtcclxuICAgICAgICAgICAgICAgIHRvYXN0KCfliKDpmaTlpLHotKXvvIEnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOS4iuS8oOe0oOadkFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGFzeW5jIHVwbG9hZEZpbGUodHlwZSkge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgJ2ltYWdlJzpcclxuICAgICAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLnVwbG9hZEltYWdlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgY2FzZSAndmlkZW8nOlxyXG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMudXBsb2FkVmlkZW8oKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyDkuIrkvKDlm77niYflu7bov58y56eS5Yi35paw77yM6YWN5ZCIdG9hc3TnmoQy56eS5bu26L+fXHJcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgc2xlZXAoMjAwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgY2FzZSAnYXJ0aWNsZSc6XHJcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5zaG93RGlhbG9nKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5pbml0RGF0YSgpO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWREYXRhKHRoaXMuY3VyVGFiKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGFzeW5jIGFkZEdyb3VwKGNvbnRlbnQpIHtcclxuICAgICAgICAgICAgYXdhaXQgZ2V0KCcvYnVzaW5lc3NBcnRpY2xlL2FkZGdyb3VwJywge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogY29udGVudCxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd1BvcCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgICAgICB0b2FzdCgn5re75Yqg5oiQ5Yqf77yBJyk7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZERhdGEodGhpcy5jdXJUYWIpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2xvc2UoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd1BvcCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZWRpdENob3NlKGUpIHtcclxuICAgICAgICAgICAgY29uc3QgeyBpZCB9ID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaXRlbTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNFZGl0aW5nKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzZWxBcnIgPSBzZWxlY3RlZElkcztcclxuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGFMaXN0ID0gdGhpcy5saXN0RGF0YTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gc2VsZWN0ZWRJZHMubGVuZ3RoID09PSAwID8gLTIgOiBzZWxlY3RlZElkcy5pbmRleE9mKGlkKTtcclxuICAgICAgICAgICAgICAgIGlmIChpbmRleCA8IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxBcnIucHVzaChpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YUxpc3QuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0uaWQgPT09IGlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKGl0ZW0sIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaG9zZVN0YXR1OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YUxpc3QuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0uaWQgPT09IGlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKGl0ZW0sIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaG9zZVN0YXR1OiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsQXJyLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3REYXRhID0gZGF0YUxpc3Q7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RlZElkcyA9IHNlbEFycjtcclxuICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8g54K55Ye76Lez6L2s5paH56ug6K+m5oOF6aG16Z2iXHJcbiAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgICAgICB1cmw6IGBhcnRpY2xlQ29tcG9uZW50bGlzdD9pZD0ke2lkfWAsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICB9XHJcblxyXG4gICAgaW5pdERhdGEoKSB7XHJcbiAgICAgICAgLy8g5Yid5aeL5YyW5pWw5o2uXHJcbiAgICAgICAgdGhpcy53b3JrcyA9IFtdO1xyXG4gICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgcGFnZU51bSA9IDE7XHJcbiAgICAgICAgdXJscyA9IFtdO1xyXG4gICAgICAgIHNlbGVjdGVkSWRzID0gW107XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgbG9hZERhdGEodHlwZSkge1xyXG4gICAgICAgIGxldCByZXNvdXJjZVR5cGUgPSAxO1xyXG5cclxuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSAnaW1hZ2UnOlxyXG4gICAgICAgICAgICBjYXNlICd2aWRlbyc6XHJcbiAgICAgICAgICAgICAgICByZXNvdXJjZVR5cGUgPSAoe1xyXG4gICAgICAgICAgICAgICAgICAgIGltYWdlOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIHZpZGVvOiAyLFxyXG4gICAgICAgICAgICAgICAgfSlbdHlwZV07XHJcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLmxvYWRSZXNvdXJjZShyZXNvdXJjZVR5cGUpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICBjYXNlICdhcnRpY2xlJzpcclxuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMubG9hZEFydGljbGUoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBsb2FkUmVzb3VyY2UocmVzb3VyY2VUeXBlKSB7XHJcbiAgICAgICAgY29uc3QgcG9zdERhdGEgPSB7XHJcbiAgICAgICAgICAgIHJlc291cmNlVHlwZSxcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBPYmplY3QuYXNzaWduKHBvc3REYXRhLCB7XHJcbiAgICAgICAgICAgIHBhZ2VOdW0sXHJcbiAgICAgICAgICAgIHBhZ2VTaXplLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHBhZ2VOdW0gKz0gMTtcclxuXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3QgeyBkYXRhIH0gPSBhd2FpdCBnZXQoTE9BRF9SRVNPVVJDRV9VUkwsIHBvc3REYXRhKTtcclxuICAgICAgICAgICAgaWYgKCFkYXRhIHx8ICFkYXRhLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgdG9hc3QoJ+W3sue7j+WIsOW6leS6hicpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBkYXRhLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB3b3JrSXRlbSA9IE9iamVjdC5hc3NpZ24oe30sIGl0ZW0pO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIOWKoOi9veWbvueJh++8jHVybOWKoOS4iuWuveW6pu+8jOWKoOS4iuWJjee9ruWfn+WQjVxyXG4gICAgICAgICAgICAgICAgaWYgKHJlc291cmNlVHlwZSA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHdvcmtJdGVtLnByZXZpZXdVcmwgPSBgJHtwaWNTcmNEb21haW4oKX0ke3dvcmtJdGVtLnJlc291cmNlVXJsfT93PTM3NWA7IC8vIOmihOiniOWbvueJh1xyXG4gICAgICAgICAgICAgICAgICAgIHdvcmtJdGVtLnJlc291cmNlVXJsID0gYCR7cGljU3JjRG9tYWluKCl9JHt3b3JrSXRlbS5yZXNvdXJjZVVybH0/dz0xMDBgO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIOWKoOi9veinhumikVxyXG4gICAgICAgICAgICAgICAgaWYgKHJlc291cmNlVHlwZSA9PT0gMikge1xyXG4gICAgICAgICAgICAgICAgICAgIHdvcmtJdGVtLnByZXZpZXdVcmwgPSB3b3JrSXRlbS5yZXNvdXJjZVVybDtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcmVzb3VyY2VVcmwgPSAnJztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8g5Zyo6L+Z6YeM5re75YqgdHJ5IGNhdGNo5piv5pyJ5b+F6KaB55qE77yM6Iul5LiN5re75Yqg77yM5oql6ZSZ5LqG5Lya57uI5q2i5b6q546vXHJcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZXh0ZW5kID0gSlNPTi5wYXJzZSh3b3JrSXRlbS5leHRlbmQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvdXJjZVVybCA9IGAke2V4dGVuZC5zb3VyY2VDb3ZlclVybH0/dz0xMDBgOyAvLyDlsIHpnaLlm77niYdcclxuICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZXJyb3JIYW5kbGVyKGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgd29ya0l0ZW0ucmVzb3VyY2VVcmwgPSByZXNvdXJjZVVybDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLndvcmtzLnB1c2god29ya0l0ZW0pO1xyXG4gICAgICAgICAgICAgICAgdXJscy5wdXNoKHdvcmtJdGVtLnByZXZpZXdVcmwpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZXJyb3JIYW5kbGVyKGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBsb2FkQXJ0aWNsZSgpIHtcclxuICAgICAgICAvLyBjb25zdCB7IGRhdGEgfSA9IGdldCgnL2J1c2luZXNzQXJ0aWNsZS9ncm91cHMnKTtcclxuICAgICAgICAvLyBpZiAoIWRhdGEgJiYgZGF0YS5sZW5ndGggPT09IDApIHJldHVybjtcclxuICAgICAgICAvLyBkYXRhLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgLy8gICAgIE9iamVjdC5hc3NpZ24oaXRlbSwge1xyXG4gICAgICAgIC8vICAgICAgICAgY2hvc2VTdGF0dTogZmFsc2UsXHJcbiAgICAgICAgLy8gICAgIH0pO1xyXG4gICAgICAgIC8vIH0pO1xyXG4gICAgICAgIC8vIHRoaXMuZ3JvdXBMaXN0ID0gZGF0YTtcclxuICAgICAgICAvLyB0aGlzLiRhcHBseSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIHVwbG9hZEltYWdlKCkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHsgdGVtcEZpbGVQYXRocyB9ID0gYXdhaXQgd2VweS5jaG9vc2VJbWFnZSh7XHJcbiAgICAgICAgICAgICAgICBjb3VudDogMSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMudXBsb2FkUmVzb3VyY2UodGVtcEZpbGVQYXRoc1swXSwgJ2ltYWdlJyk7XHJcbiAgICAgICAgICAgIHRvYXN0KCfkuIrkvKDmiJDlip8nKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZXJyb3JIYW5kbGVyKCfkuIrkvKDlpLHotKUnLCBlKTtcclxuICAgICAgICAgICAgdG9hc3QoJ+S4iuS8oOWksei0pScpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhc3luYyB1cGxvYWRWaWRlbygpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCB7IHRlbXBGaWxlUGF0aCB9ID0gYXdhaXQgd2VweS5jaG9vc2VWaWRlbygpO1xyXG4gICAgICAgICAgICBhd2FpdCB0aGlzLnVwbG9hZFJlc291cmNlKHRlbXBGaWxlUGF0aCwgJ3ZpZGVvJyk7XHJcbiAgICAgICAgICAgIHRvYXN0KCfkuIrkvKDmiJDlip8nKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZXJyb3JIYW5kbGVyKCfkuIrkvKDlpLHotKUnLCBlKTtcclxuICAgICAgICAgICAgdG9hc3QoJ+S4iuS8oOWksei0pScpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjIOS4iuS8oOe0oOadkFxyXG4gICAgICovXHJcbiAgICBhc3luYyB1cGxvYWRSZXNvdXJjZShwYXRoLCB0eXBlKSB7XHJcbiAgICAgICAgLy8g5LiK5Lyg6LWE5rqQXHJcbiAgICAgICAgY29uc3QgeyBjb250ZW50OiByZXNvdXJjZVVybCB9ID0gYXdhaXQgdXBsb2FkZXIocGF0aCwge1xyXG4gICAgICAgICAgICB0eXBlLFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyDlsIbotYTmupDmj5LlhaXliLDlr7nlupTotYTmupDlupNcclxuICAgICAgICBhd2FpdCBnZXQoU0FWRV9SRVNPVVJDRV9VUkwsIHtcclxuICAgICAgICAgICAgcmVzb3VyY2VVcmwsXHJcbiAgICAgICAgICAgIHJlc291cmNlVHlwZTogdHlwZSA9PT0gJ2ltYWdlJyA/IDEgOiAyLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3dEaWFsb2coKSB7XHJcbiAgICAgICAgdGhpcy5zaG93UG9wID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgfVxyXG4gICAgZXJyb3JIYW5kbGVyKGUpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnRVJST1I6JywgZSk7XHJcbiAgICB9XHJcblxyXG4gICAgb25SZWFjaEJvdHRvbSgpIHtcclxuICAgICAgICB0aGlzLmxvYWREYXRhKHRoaXMuY3VyVGFiKTtcclxuICAgIH1cclxufVxyXG4iXX0=