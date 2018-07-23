'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _mixin = require('./mixin.js');

var _mixin2 = _interopRequireDefault(_mixin);

var _utils = require('./../../utils/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var app = require('./../../utils/globalData.js');

var _require = require('./../../utils/ajax.js'),
    get = _require.get;

var Article = function (_wepy$page) {
    _inherits(Article, _wepy$page);

    function Article() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Article);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Article.__proto__ || Object.getPrototypeOf(Article)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            navigationBarTitleText: '文章'
        }, _this.mixins = [_mixin2.default], _this.data = {
            list: {},
            showGroup: false,
            group: {},
            articleGroupName: '',
            params: {
                articleGroupId: '0',
                articlePage: '1',
                articleSize: '4',
                articleIds: '0'
            }
        }, _this.methods = {
            addArticle: function addArticle() {
                _wepy2.default.navigateTo({
                    url: '../articleComponentAdd?id=' + this.pageId
                });
            },
            showGroup: function showGroup() {
                this.showGroup = !this.showGroup;
            },
            selectGroup: function () {
                var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(e) {
                    var _e$currentTarget$data, id, name;

                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    _e$currentTarget$data = e.currentTarget.dataset, id = _e$currentTarget$data.id, name = _e$currentTarget$data.name;

                                    this.articleGroupName = name;
                                    this.params.articleGroupId = id;
                                    _context.next = 5;
                                    return this.loadArticleList();

                                case 5:
                                    this.showGroup = false;
                                    this.$apply();

                                case 7:
                                case 'end':
                                    return _context.stop();
                            }
                        }
                    }, _callee, this);
                }));

                function selectGroup(_x) {
                    return _ref2.apply(this, arguments);
                }

                return selectGroup;
            }(),
            selectAll: function selectAll(e) {
                console.log(e);
                this.list.forEach(function (item) {
                    item.checked = e.detail.value.length !== 0;
                });
            },
            checkboxChange: function checkboxChange(e) {
                console.log(e.detail.value);
                this.list.map(function (item) {
                    if (e.detail.value.indexOf(item.id) === -1) {
                        item.checked = false;
                    } else {
                        item.checked = true;
                    }
                    return item;
                });
            },
            save: function save() {
                var _this2 = this;

                var selectArticles = this.list.filter(function (obj) {
                    return obj.checked === true;
                });
                this.params.articleIds = selectArticles.map(function (art) {
                    return art.id;
                }).join(',');
                selectArticles.forEach(function (item, index) {
                    if (_this2.pageData[0].props.data[index]) {
                        _this2.pageData[0].props.data[index].title = item.title;
                        _this2.pageData[0].props.data[index].cover = item.cover;
                        _this2.pageData[0].props.data[index].intro = item.intro;
                    }
                });
                console.log(JSON.stringify(this.params));
                this.pageModule.params = this.params;
                app.globalData.pageData[this.pageIndex].props = this.pageData[0].props;
                //   console.log(app.globalData.pageData[this.pageIndex]);
                //   const modulesData = JSON.parse(JSON.stringify(app.globalData.pageData));
                //   app.globalData.modules = modulesParse.parsePageData(modulesData);
                app.globalData.modules[this.pageIndex] = this.pageModule;
                wx.navigateBack({
                    delta: 1
                });
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Article, [{
        key: 'onLoad',
        value: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                var _this3 = this;

                var _tempModules$filter, _tempModules$filter2;

                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.next = 2;
                                return this.loadArticleGroup();

                            case 2:
                                this.loadArticleList();
                                _tempModules$filter = this.tempModules.filter(function (obj) {
                                    return obj.id === _this3.pageId;
                                });
                                _tempModules$filter2 = _slicedToArray(_tempModules$filter, 1);
                                this.pageModule = _tempModules$filter2[0];

                                console.log(this.pageModule);

                            case 7:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function onLoad() {
                return _ref3.apply(this, arguments);
            }

            return onLoad;
        }()
    }, {
        key: 'loadArticleList',
        value: function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
                var _ref5, data;

                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _context3.next = 2;
                                return get('/businessArticle/list', {
                                    appid: this.extConfig.appId, group: this.params.articleGroupId, pageNum: this.params.pageNum, pageSize: this.params.pageSize
                                });

                            case 2:
                                _ref5 = _context3.sent;
                                data = _ref5.data;

                                console.log(data);
                                data.data.forEach(function (item) {
                                    item.cover = (0, _utils.picSrcDomain)() + item.cover;
                                });
                                this.list = data.data;
                                this.list.forEach(function (item) {
                                    item.checked = true;
                                });
                                this.params.articleIds = this.list.map(function (art) {
                                    return art.id;
                                }).join(',');
                                this.$apply();

                            case 10:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function loadArticleList() {
                return _ref4.apply(this, arguments);
            }

            return loadArticleList;
        }()
    }, {
        key: 'loadArticleGroup',
        value: function () {
            var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
                var _this4 = this;

                var _ref7, data;

                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                _context4.next = 2;
                                return get('/businessArticle/groups', { appid: this.extConfig.appId });

                            case 2:
                                _ref7 = _context4.sent;
                                data = _ref7.data;

                                this.group = data;
                                if (Object.keys(JSON.parse(this.pageData.params)).length !== 0) {
                                    this.articleGroupName = this.group.find(function (obj) {
                                        return obj.id === JSON.parse(_this4.pageData.params).articleGroupId;
                                    }).name;
                                    this.params.articleGroupId = this.group.find(function (obj) {
                                        return obj.id === JSON.parse(_this4.pageData.params).articleGroupId;
                                    }).id;
                                }
                                this.$apply();

                            case 7:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));

            function loadArticleGroup() {
                return _ref6.apply(this, arguments);
            }

            return loadArticleGroup;
        }()
    }]);

    return Article;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(Article , 'pages/edit/article'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFydGljbGUuanMiXSwibmFtZXMiOlsiYXBwIiwicmVxdWlyZSIsImdldCIsIkFydGljbGUiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwibWl4aW5zIiwiTWl4aW4iLCJkYXRhIiwibGlzdCIsInNob3dHcm91cCIsImdyb3VwIiwiYXJ0aWNsZUdyb3VwTmFtZSIsInBhcmFtcyIsImFydGljbGVHcm91cElkIiwiYXJ0aWNsZVBhZ2UiLCJhcnRpY2xlU2l6ZSIsImFydGljbGVJZHMiLCJtZXRob2RzIiwiYWRkQXJ0aWNsZSIsIndlcHkiLCJuYXZpZ2F0ZVRvIiwidXJsIiwicGFnZUlkIiwic2VsZWN0R3JvdXAiLCJlIiwiY3VycmVudFRhcmdldCIsImRhdGFzZXQiLCJpZCIsIm5hbWUiLCJsb2FkQXJ0aWNsZUxpc3QiLCIkYXBwbHkiLCJzZWxlY3RBbGwiLCJjb25zb2xlIiwibG9nIiwiZm9yRWFjaCIsIml0ZW0iLCJjaGVja2VkIiwiZGV0YWlsIiwidmFsdWUiLCJsZW5ndGgiLCJjaGVja2JveENoYW5nZSIsIm1hcCIsImluZGV4T2YiLCJzYXZlIiwic2VsZWN0QXJ0aWNsZXMiLCJmaWx0ZXIiLCJvYmoiLCJhcnQiLCJqb2luIiwiaW5kZXgiLCJwYWdlRGF0YSIsInByb3BzIiwidGl0bGUiLCJjb3ZlciIsImludHJvIiwiSlNPTiIsInN0cmluZ2lmeSIsInBhZ2VNb2R1bGUiLCJnbG9iYWxEYXRhIiwicGFnZUluZGV4IiwibW9kdWxlcyIsInd4IiwibmF2aWdhdGVCYWNrIiwiZGVsdGEiLCJsb2FkQXJ0aWNsZUdyb3VwIiwidGVtcE1vZHVsZXMiLCJhcHBpZCIsImV4dENvbmZpZyIsImFwcElkIiwicGFnZU51bSIsInBhZ2VTaXplIiwiT2JqZWN0Iiwia2V5cyIsInBhcnNlIiwiZmluZCIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLE1BQU1DLFFBQVEs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a0IsS0FBTCxDQUFXLE9BQUt2QixRQUFMLENBQWN0QyxNQUF6QixFQUFpQ0MsY0FBbkQ7QUFBQSxxQ0FBaEIsRUFBbUZlLElBQTNHO0FBQ0EseUNBQUtoQixNQUFMLENBQVlDLGNBQVosR0FBNkIsS0FBS0gsS0FBTCxDQUFXZ0UsSUFBWCxDQUFnQjtBQUFBLCtDQUFPNUIsSUFBSW5CLEVBQUosS0FBVzRCLEtBQUtrQixLQUFMLENBQVcsT0FBS3ZCLFFBQUwsQ0FBY3RDLE1BQXpCLEVBQWlDQyxjQUFuRDtBQUFBLHFDQUFoQixFQUFtRmMsRUFBaEg7QUFDSDtBQUNELHFDQUFLRyxNQUFMOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBckcrQlgsZUFBS3dELEk7O2tCQUFyQnpFLE8iLCJmaWxlIjoiYXJ0aWNsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcclxuaW1wb3J0IE1peGluIGZyb20gJy4vbWl4aW4nO1xyXG5pbXBvcnQgeyBwaWNTcmNEb21haW4gfSBmcm9tICcuLi8uLi91dGlscyc7XHJcblxyXG5jb25zdCBhcHAgPSByZXF1aXJlKCcuLi8uLi91dGlscy9nbG9iYWxEYXRhJyk7XHJcbmNvbnN0IHsgZ2V0IH0gPSByZXF1aXJlKCcuLi8uLi91dGlscy9hamF4Jyk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcnRpY2xlIGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICBjb25maWcgPSB7XHJcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmlofnq6AnLFxyXG4gIH07XHJcbiAgbWl4aW5zID0gW01peGluXTtcclxuICBkYXRhID0ge1xyXG4gICAgICBsaXN0OiB7fSxcclxuICAgICAgc2hvd0dyb3VwOiBmYWxzZSxcclxuICAgICAgZ3JvdXA6IHt9LFxyXG4gICAgICBhcnRpY2xlR3JvdXBOYW1lOiAnJyxcclxuICAgICAgcGFyYW1zOiB7XHJcbiAgICAgICAgICBhcnRpY2xlR3JvdXBJZDogJzAnLFxyXG4gICAgICAgICAgYXJ0aWNsZVBhZ2U6ICcxJyxcclxuICAgICAgICAgIGFydGljbGVTaXplOiAnNCcsXHJcbiAgICAgICAgICBhcnRpY2xlSWRzOiAnMCcsXHJcbiAgICAgIH0sXHJcbiAgfTtcclxuICBtZXRob2RzID0ge1xyXG4gICAgICBhZGRBcnRpY2xlKCkge1xyXG4gICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgICB1cmw6IGAuLi9hcnRpY2xlQ29tcG9uZW50QWRkP2lkPSR7dGhpcy5wYWdlSWR9YCxcclxuICAgICAgICAgIH0pO1xyXG4gICAgICB9LFxyXG4gICAgICBzaG93R3JvdXAoKSB7XHJcbiAgICAgICAgICB0aGlzLnNob3dHcm91cCA9ICF0aGlzLnNob3dHcm91cDtcclxuICAgICAgfSxcclxuICAgICAgYXN5bmMgc2VsZWN0R3JvdXAoZSkge1xyXG4gICAgICAgICAgY29uc3QgeyBpZCwgbmFtZSB9ID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQ7XHJcbiAgICAgICAgICB0aGlzLmFydGljbGVHcm91cE5hbWUgPSBuYW1lO1xyXG4gICAgICAgICAgdGhpcy5wYXJhbXMuYXJ0aWNsZUdyb3VwSWQgPSBpZDtcclxuICAgICAgICAgIGF3YWl0IHRoaXMubG9hZEFydGljbGVMaXN0KCk7XHJcbiAgICAgICAgICB0aGlzLnNob3dHcm91cCA9IGZhbHNlO1xyXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgfSxcclxuICAgICAgc2VsZWN0QWxsKGUpIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xyXG4gICAgICAgICAgdGhpcy5saXN0LmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgICAgICAgaXRlbS5jaGVja2VkID0gZS5kZXRhaWwudmFsdWUubGVuZ3RoICE9PSAwO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgIH0sXHJcbiAgICAgIGNoZWNrYm94Q2hhbmdlKGUpIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKGUuZGV0YWlsLnZhbHVlKTtcclxuICAgICAgICAgIHRoaXMubGlzdC5tYXAoaXRlbSA9PiB7XHJcbiAgICAgICAgICAgICAgaWYgKGUuZGV0YWlsLnZhbHVlLmluZGV4T2YoaXRlbS5pZCkgPT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgIGl0ZW0uY2hlY2tlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgIGl0ZW0uY2hlY2tlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIHJldHVybiBpdGVtO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgIH0sXHJcbiAgICAgIHNhdmUoKSB7XHJcbiAgICAgICAgICBjb25zdCBzZWxlY3RBcnRpY2xlcyA9IHRoaXMubGlzdC5maWx0ZXIob2JqID0+IG9iai5jaGVja2VkID09PSB0cnVlKTtcclxuICAgICAgICAgIHRoaXMucGFyYW1zLmFydGljbGVJZHMgPSBzZWxlY3RBcnRpY2xlcy5tYXAoYXJ0ID0+IGFydC5pZCkuam9pbignLCcpO1xyXG4gICAgICAgICAgc2VsZWN0QXJ0aWNsZXMuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICBpZiAodGhpcy5wYWdlRGF0YVswXS5wcm9wcy5kYXRhW2luZGV4XSkge1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLnBhZ2VEYXRhWzBdLnByb3BzLmRhdGFbaW5kZXhdLnRpdGxlID0gaXRlbS50aXRsZTtcclxuICAgICAgICAgICAgICAgICAgdGhpcy5wYWdlRGF0YVswXS5wcm9wcy5kYXRhW2luZGV4XS5jb3ZlciA9IGl0ZW0uY292ZXI7XHJcbiAgICAgICAgICAgICAgICAgIHRoaXMucGFnZURhdGFbMF0ucHJvcHMuZGF0YVtpbmRleF0uaW50cm8gPSBpdGVtLmludHJvO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkodGhpcy5wYXJhbXMpKTtcclxuICAgICAgICAgIHRoaXMucGFnZU1vZHVsZS5wYXJhbXMgPSB0aGlzLnBhcmFtcztcclxuICAgICAgICAgIGFwcC5nbG9iYWxEYXRhLnBhZ2VEYXRhW3RoaXMucGFnZUluZGV4XS5wcm9wcyA9IHRoaXMucGFnZURhdGFbMF0ucHJvcHM7XHJcbiAgICAgICAgICAvLyAgIGNvbnNvbGUubG9nKGFwcC5nbG9iYWxEYXRhLnBhZ2VEYXRhW3RoaXMucGFnZUluZGV4XSk7XHJcbiAgICAgICAgICAvLyAgIGNvbnN0IG1vZHVsZXNEYXRhID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShhcHAuZ2xvYmFsRGF0YS5wYWdlRGF0YSkpO1xyXG4gICAgICAgICAgLy8gICBhcHAuZ2xvYmFsRGF0YS5tb2R1bGVzID0gbW9kdWxlc1BhcnNlLnBhcnNlUGFnZURhdGEobW9kdWxlc0RhdGEpO1xyXG4gICAgICAgICAgYXBwLmdsb2JhbERhdGEubW9kdWxlc1t0aGlzLnBhZ2VJbmRleF0gPSB0aGlzLnBhZ2VNb2R1bGU7XHJcbiAgICAgICAgICB3eC5uYXZpZ2F0ZUJhY2soe1xyXG4gICAgICAgICAgICAgIGRlbHRhOiAxLFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgIH0sXHJcbiAgfTtcclxuICBhc3luYyBvbkxvYWQoKSB7XHJcbiAgICAgIGF3YWl0IHRoaXMubG9hZEFydGljbGVHcm91cCgpO1xyXG4gICAgICB0aGlzLmxvYWRBcnRpY2xlTGlzdCgpO1xyXG4gICAgICBbdGhpcy5wYWdlTW9kdWxlXSA9IHRoaXMudGVtcE1vZHVsZXMuZmlsdGVyKG9iaiA9PiBvYmouaWQgPT09IHRoaXMucGFnZUlkKTtcclxuICAgICAgY29uc29sZS5sb2codGhpcy5wYWdlTW9kdWxlKTtcclxuICB9XHJcbiAgYXN5bmMgbG9hZEFydGljbGVMaXN0KCkge1xyXG4gICAgICBjb25zdCB7IGRhdGEgfSA9IGF3YWl0IGdldCgnL2J1c2luZXNzQXJ0aWNsZS9saXN0Jywge1xyXG4gICAgICAgICAgYXBwaWQ6IHRoaXMuZXh0Q29uZmlnLmFwcElkLCBncm91cDogdGhpcy5wYXJhbXMuYXJ0aWNsZUdyb3VwSWQsIHBhZ2VOdW06IHRoaXMucGFyYW1zLnBhZ2VOdW0sIHBhZ2VTaXplOiB0aGlzLnBhcmFtcy5wYWdlU2l6ZSxcclxuICAgICAgfSk7XHJcbiAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICBkYXRhLmRhdGEuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICAgIGl0ZW0uY292ZXIgPSBwaWNTcmNEb21haW4oKSArIGl0ZW0uY292ZXI7XHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGlzLmxpc3QgPSBkYXRhLmRhdGE7XHJcbiAgICAgIHRoaXMubGlzdC5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICAgICAgaXRlbS5jaGVja2VkID0gdHJ1ZTtcclxuICAgICAgfSk7XHJcbiAgICAgIHRoaXMucGFyYW1zLmFydGljbGVJZHMgPSB0aGlzLmxpc3QubWFwKGFydCA9PiBhcnQuaWQpLmpvaW4oJywnKTtcclxuICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICB9XHJcbiAgYXN5bmMgbG9hZEFydGljbGVHcm91cCgpIHtcclxuICAgICAgY29uc3QgeyBkYXRhIH0gPSBhd2FpdCBnZXQoJy9idXNpbmVzc0FydGljbGUvZ3JvdXBzJywgeyBhcHBpZDogdGhpcy5leHRDb25maWcuYXBwSWQgfSk7XHJcbiAgICAgIHRoaXMuZ3JvdXAgPSBkYXRhO1xyXG4gICAgICBpZiAoT2JqZWN0LmtleXMoSlNPTi5wYXJzZSh0aGlzLnBhZ2VEYXRhLnBhcmFtcykpLmxlbmd0aCAhPT0gMCkge1xyXG4gICAgICAgICAgdGhpcy5hcnRpY2xlR3JvdXBOYW1lID0gdGhpcy5ncm91cC5maW5kKG9iaiA9PiBvYmouaWQgPT09IEpTT04ucGFyc2UodGhpcy5wYWdlRGF0YS5wYXJhbXMpLmFydGljbGVHcm91cElkKS5uYW1lO1xyXG4gICAgICAgICAgdGhpcy5wYXJhbXMuYXJ0aWNsZUdyb3VwSWQgPSB0aGlzLmdyb3VwLmZpbmQob2JqID0+IG9iai5pZCA9PT0gSlNPTi5wYXJzZSh0aGlzLnBhZ2VEYXRhLnBhcmFtcykuYXJ0aWNsZUdyb3VwSWQpLmlkO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==