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
                    url: '../articleComponentAdd'
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFydGljbGUuanMiXSwibmFtZXMiOlsiYXBwIiwicmVxdWlyZSIsImdldCIsIkFydGljbGUiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwibWl4aW5zIiwiTWl4aW4iLCJkYXRhIiwibGlzdCIsInNob3dHcm91cCIsImdyb3VwIiwiYXJ0aWNsZUdyb3VwTmFtZSIsInBhcmFtcyIsImFydGljbGVHcm91cElkIiwiYXJ0aWNsZVBhZ2UiLCJhcnRpY2xlU2l6ZSIsImFydGljbGVJZHMiLCJtZXRob2RzIiwiYWRkQXJ0aWNsZSIsIndlcHkiLCJuYXZpZ2F0ZVRvIiwidXJsIiwic2VsZWN0R3JvdXAiLCJlIiwiY3VycmVudFRhcmdldCIsImRhdGFzZXQiLCJpZCIsIm5hbWUiLCJsb2FkQXJ0aWNsZUxpc3QiLCIkYXBwbHkiLCJzZWxlY3RBbGwiLCJjb25zb2xlIiwibG9nIiwiZm9yRWFjaCIsIml0ZW0iLCJjaGVja2VkIiwiZGV0YWlsIiwidmFsdWUiLCJsZW5ndGgiLCJjaGVja2JveENoYW5nZSIsIm1hcCIsImluZGV4T2YiLCJzYXZlIiwic2VsZWN0QXJ0aWNsZXMiLCJmaWx0ZXIiLCJvYmoiLCJhcnQiLCJqb2luIiwiaW5kZXgiLCJwYWdlRGF0YSIsInByb3BzIiwidGl0bGUiLCJjb3ZlciIsImludHJvIiwiSlNPTiIsInN0cmluZ2lmeSIsInBhZ2VNb2R1bGUiLCJnbG9iYWxEYXRhIiwicGFnZUluZGV4IiwibW9kdWxlcyIsInd4IiwibmF2aWdhdGVCYWNrIiwiZGVsdGEiLCJsb2FkQXJ0aWNsZUdyb3VwIiwidGVtcE1vZHVsZXMiLCJwYWdlSWQiLCJhcHBpZCIsImV4dENvbmZpZyIsImFwcElkIiwicGFnZU51bSIsInBhZ2VTaXplIiwiT2JqZWN0Iiwia2V5cyIsInBhcnNlIiwiZmluZCIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLE1BQU1DLFFBQVEs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QVcsT0FBS3hCLFFBQUwsQ0FBY3JDLE1BQXpCLEVBQWlDQyxjQUFuRDtBQUFBLHFDQUFoQixFQUFtRmMsSUFBM0c7QUFDQSx5Q0FBS2YsTUFBTCxDQUFZQyxjQUFaLEdBQTZCLEtBQUtILEtBQUwsQ0FBV2dFLElBQVgsQ0FBZ0I7QUFBQSwrQ0FBTzdCLElBQUluQixFQUFKLEtBQVc0QixLQUFLbUIsS0FBTCxDQUFXLE9BQUt4QixRQUFMLENBQWNyQyxNQUF6QixFQUFpQ0MsY0FBbkQ7QUFBQSxxQ0FBaEIsRUFBbUZhLEVBQWhIO0FBQ0g7QUFDRCxxQ0FBS0csTUFBTDs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQXJHK0JWLGVBQUt3RCxJOztrQkFBckJ6RSxPIiwiZmlsZSI6ImFydGljbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XHJcbmltcG9ydCBNaXhpbiBmcm9tICcuL21peGluJztcclxuaW1wb3J0IHsgcGljU3JjRG9tYWluIH0gZnJvbSAnLi4vLi4vdXRpbHMnO1xyXG5cclxuY29uc3QgYXBwID0gcmVxdWlyZSgnLi4vLi4vdXRpbHMvZ2xvYmFsRGF0YScpO1xyXG5jb25zdCB7IGdldCB9ID0gcmVxdWlyZSgnLi4vLi4vdXRpbHMvYWpheCcpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXJ0aWNsZSBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgY29uZmlnID0ge1xyXG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5paH56ugJyxcclxuICB9O1xyXG4gIG1peGlucyA9IFtNaXhpbl07XHJcbiAgZGF0YSA9IHtcclxuICAgICAgbGlzdDoge30sXHJcbiAgICAgIHNob3dHcm91cDogZmFsc2UsXHJcbiAgICAgIGdyb3VwOiB7fSxcclxuICAgICAgYXJ0aWNsZUdyb3VwTmFtZTogJycsXHJcbiAgICAgIHBhcmFtczoge1xyXG4gICAgICAgICAgYXJ0aWNsZUdyb3VwSWQ6ICcwJyxcclxuICAgICAgICAgIGFydGljbGVQYWdlOiAnMScsXHJcbiAgICAgICAgICBhcnRpY2xlU2l6ZTogJzQnLFxyXG4gICAgICAgICAgYXJ0aWNsZUlkczogJzAnLFxyXG4gICAgICB9LFxyXG4gIH07XHJcbiAgbWV0aG9kcyA9IHtcclxuICAgICAgYWRkQXJ0aWNsZSgpIHtcclxuICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgICAgdXJsOiAnLi4vYXJ0aWNsZUNvbXBvbmVudEFkZCcsXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgfSxcclxuICAgICAgc2hvd0dyb3VwKCkge1xyXG4gICAgICAgICAgdGhpcy5zaG93R3JvdXAgPSAhdGhpcy5zaG93R3JvdXA7XHJcbiAgICAgIH0sXHJcbiAgICAgIGFzeW5jIHNlbGVjdEdyb3VwKGUpIHtcclxuICAgICAgICAgIGNvbnN0IHsgaWQsIG5hbWUgfSA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0O1xyXG4gICAgICAgICAgdGhpcy5hcnRpY2xlR3JvdXBOYW1lID0gbmFtZTtcclxuICAgICAgICAgIHRoaXMucGFyYW1zLmFydGljbGVHcm91cElkID0gaWQ7XHJcbiAgICAgICAgICBhd2FpdCB0aGlzLmxvYWRBcnRpY2xlTGlzdCgpO1xyXG4gICAgICAgICAgdGhpcy5zaG93R3JvdXAgPSBmYWxzZTtcclxuICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgIH0sXHJcbiAgICAgIHNlbGVjdEFsbChlKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcclxuICAgICAgICAgIHRoaXMubGlzdC5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICAgICAgICAgIGl0ZW0uY2hlY2tlZCA9IGUuZGV0YWlsLnZhbHVlLmxlbmd0aCAhPT0gMDtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICB9LFxyXG4gICAgICBjaGVja2JveENoYW5nZShlKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhlLmRldGFpbC52YWx1ZSk7XHJcbiAgICAgICAgICB0aGlzLmxpc3QubWFwKGl0ZW0gPT4ge1xyXG4gICAgICAgICAgICAgIGlmIChlLmRldGFpbC52YWx1ZS5pbmRleE9mKGl0ZW0uaWQpID09PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICBpdGVtLmNoZWNrZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICBpdGVtLmNoZWNrZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICByZXR1cm4gaXRlbTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICB9LFxyXG4gICAgICBzYXZlKCkge1xyXG4gICAgICAgICAgY29uc3Qgc2VsZWN0QXJ0aWNsZXMgPSB0aGlzLmxpc3QuZmlsdGVyKG9iaiA9PiBvYmouY2hlY2tlZCA9PT0gdHJ1ZSk7XHJcbiAgICAgICAgICB0aGlzLnBhcmFtcy5hcnRpY2xlSWRzID0gc2VsZWN0QXJ0aWNsZXMubWFwKGFydCA9PiBhcnQuaWQpLmpvaW4oJywnKTtcclxuICAgICAgICAgIHNlbGVjdEFydGljbGVzLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgaWYgKHRoaXMucGFnZURhdGFbMF0ucHJvcHMuZGF0YVtpbmRleF0pIHtcclxuICAgICAgICAgICAgICAgICAgdGhpcy5wYWdlRGF0YVswXS5wcm9wcy5kYXRhW2luZGV4XS50aXRsZSA9IGl0ZW0udGl0bGU7XHJcbiAgICAgICAgICAgICAgICAgIHRoaXMucGFnZURhdGFbMF0ucHJvcHMuZGF0YVtpbmRleF0uY292ZXIgPSBpdGVtLmNvdmVyO1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLnBhZ2VEYXRhWzBdLnByb3BzLmRhdGFbaW5kZXhdLmludHJvID0gaXRlbS5pbnRybztcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHRoaXMucGFyYW1zKSk7XHJcbiAgICAgICAgICB0aGlzLnBhZ2VNb2R1bGUucGFyYW1zID0gdGhpcy5wYXJhbXM7XHJcbiAgICAgICAgICBhcHAuZ2xvYmFsRGF0YS5wYWdlRGF0YVt0aGlzLnBhZ2VJbmRleF0ucHJvcHMgPSB0aGlzLnBhZ2VEYXRhWzBdLnByb3BzO1xyXG4gICAgICAgICAgLy8gICBjb25zb2xlLmxvZyhhcHAuZ2xvYmFsRGF0YS5wYWdlRGF0YVt0aGlzLnBhZ2VJbmRleF0pO1xyXG4gICAgICAgICAgLy8gICBjb25zdCBtb2R1bGVzRGF0YSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoYXBwLmdsb2JhbERhdGEucGFnZURhdGEpKTtcclxuICAgICAgICAgIC8vICAgYXBwLmdsb2JhbERhdGEubW9kdWxlcyA9IG1vZHVsZXNQYXJzZS5wYXJzZVBhZ2VEYXRhKG1vZHVsZXNEYXRhKTtcclxuICAgICAgICAgIGFwcC5nbG9iYWxEYXRhLm1vZHVsZXNbdGhpcy5wYWdlSW5kZXhdID0gdGhpcy5wYWdlTW9kdWxlO1xyXG4gICAgICAgICAgd3gubmF2aWdhdGVCYWNrKHtcclxuICAgICAgICAgICAgICBkZWx0YTogMSxcclxuICAgICAgICAgIH0pO1xyXG4gICAgICB9LFxyXG4gIH07XHJcbiAgYXN5bmMgb25Mb2FkKCkge1xyXG4gICAgICBhd2FpdCB0aGlzLmxvYWRBcnRpY2xlR3JvdXAoKTtcclxuICAgICAgdGhpcy5sb2FkQXJ0aWNsZUxpc3QoKTtcclxuICAgICAgW3RoaXMucGFnZU1vZHVsZV0gPSB0aGlzLnRlbXBNb2R1bGVzLmZpbHRlcihvYmogPT4gb2JqLmlkID09PSB0aGlzLnBhZ2VJZCk7XHJcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMucGFnZU1vZHVsZSk7XHJcbiAgfVxyXG4gIGFzeW5jIGxvYWRBcnRpY2xlTGlzdCgpIHtcclxuICAgICAgY29uc3QgeyBkYXRhIH0gPSBhd2FpdCBnZXQoJy9idXNpbmVzc0FydGljbGUvbGlzdCcsIHtcclxuICAgICAgICAgIGFwcGlkOiB0aGlzLmV4dENvbmZpZy5hcHBJZCwgZ3JvdXA6IHRoaXMucGFyYW1zLmFydGljbGVHcm91cElkLCBwYWdlTnVtOiB0aGlzLnBhcmFtcy5wYWdlTnVtLCBwYWdlU2l6ZTogdGhpcy5wYXJhbXMucGFnZVNpemUsXHJcbiAgICAgIH0pO1xyXG4gICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgZGF0YS5kYXRhLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgICBpdGVtLmNvdmVyID0gcGljU3JjRG9tYWluKCkgKyBpdGVtLmNvdmVyO1xyXG4gICAgICB9KTtcclxuICAgICAgdGhpcy5saXN0ID0gZGF0YS5kYXRhO1xyXG4gICAgICB0aGlzLmxpc3QuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICAgIGl0ZW0uY2hlY2tlZCA9IHRydWU7XHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGlzLnBhcmFtcy5hcnRpY2xlSWRzID0gdGhpcy5saXN0Lm1hcChhcnQgPT4gYXJ0LmlkKS5qb2luKCcsJyk7XHJcbiAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgfVxyXG4gIGFzeW5jIGxvYWRBcnRpY2xlR3JvdXAoKSB7XHJcbiAgICAgIGNvbnN0IHsgZGF0YSB9ID0gYXdhaXQgZ2V0KCcvYnVzaW5lc3NBcnRpY2xlL2dyb3VwcycsIHsgYXBwaWQ6IHRoaXMuZXh0Q29uZmlnLmFwcElkIH0pO1xyXG4gICAgICB0aGlzLmdyb3VwID0gZGF0YTtcclxuICAgICAgaWYgKE9iamVjdC5rZXlzKEpTT04ucGFyc2UodGhpcy5wYWdlRGF0YS5wYXJhbXMpKS5sZW5ndGggIT09IDApIHtcclxuICAgICAgICAgIHRoaXMuYXJ0aWNsZUdyb3VwTmFtZSA9IHRoaXMuZ3JvdXAuZmluZChvYmogPT4gb2JqLmlkID09PSBKU09OLnBhcnNlKHRoaXMucGFnZURhdGEucGFyYW1zKS5hcnRpY2xlR3JvdXBJZCkubmFtZTtcclxuICAgICAgICAgIHRoaXMucGFyYW1zLmFydGljbGVHcm91cElkID0gdGhpcy5ncm91cC5maW5kKG9iaiA9PiBvYmouaWQgPT09IEpTT04ucGFyc2UodGhpcy5wYWdlRGF0YS5wYXJhbXMpLmFydGljbGVHcm91cElkKS5pZDtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLiRhcHBseSgpO1xyXG4gIH1cclxufVxyXG4iXX0=