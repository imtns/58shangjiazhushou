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
            navigationBarTitleText: '文章管理',
            disableScroll: true
        }, _this.$repeat = {}, _this.$props = { "EmptyPage": {} }, _this.$events = {}, _this.components = {
            EmptyPage: _EmptyPage2.default
        }, _this.data = {
            height: '',
            editStatus: false,
            listData: [],
            delList: [],
            id: '',
            group: '',
            name: '',
            title: '没有文章~',
            pageNum: 1,
            pageSize: 20,
            isLoading: true,
            isEditing: false
        }, _this.methods = {
            editChose: function editChose(id, index, name) {
                if (this.isEditing) {
                    var item = this.listData[index];
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
                    return;
                }
                // 点击跳转文章详情页面
                _wepy2.default.navigateTo({
                    url: 'articleComponentDetail?group=' + this.group + '&id=' + id + '&name=' + name
                });
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(ArticleComponentList, [{
        key: 'onLoad',
        value: function onLoad(option) {
            console.log(option);
            try {
                var _option$group = option.group,
                    group = _option$group === undefined ? '' : _option$group,
                    _option$name = option.name,
                    name = _option$name === undefined ? '' : _option$name;

                this.group = group;
                this.name = name;
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
                var pageSize, pageNum, group, _ref3, data, nData;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.prev = 0;
                                pageSize = this.pageSize, pageNum = this.pageNum, group = this.group;
                                _context.next = 4;
                                return (0, _ajax.get)('/businessArticle/list', {
                                    pageSize: pageSize,
                                    pageNum: pageNum,
                                    group: group
                                });

                            case 4:
                                _ref3 = _context.sent;
                                data = _ref3.data;
                                nData = data.data;

                                if (!(this.pageNum === 1 && (nData.length === 0 || !nData))) {
                                    _context.next = 11;
                                    break;
                                }

                                this.isLoading = false;
                                (0, _utils.toast)('没有数据');
                                return _context.abrupt('return');

                            case 11:
                                if (!(this.pageNum > 1 && nData.length < this.pageSzie)) {
                                    _context.next = 15;
                                    break;
                                }

                                this.isLoading = false;
                                (0, _utils.toast)('没有更多数据');
                                return _context.abrupt('return');

                            case 15:
                                nData.forEach(function (item) {
                                    Object.assign(item, {
                                        choseStatu: false
                                    });
                                });
                                this.listData = this.listData.concat(nData);
                                this.$apply();
                                _context.next = 23;
                                break;

                            case 20:
                                _context.prev = 20;
                                _context.t0 = _context['catch'](0);

                                console.log(_context.t0);

                            case 23:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[0, 20]]);
            }));

            function loadList() {
                return _ref2.apply(this, arguments);
            }

            return loadList;
        }()
    }, {
        key: 'edit',
        value: function edit() {
            this.isEditing = !this.isEditing;
            this.delList = [];
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

                                (0, _utils.alert)('请选择要删除的文章');
                                return _context2.abrupt('return');

                            case 5:
                                ids = delList.join();
                                _context2.next = 8;
                                return (0, _ajax.get)('/businessArticle/delete/0', {
                                    ids: ids
                                });

                            case 8:
                                (0, _utils.alert)('删除成功！');
                                this.loadList();
                                this.delList = [];
                                this.isEditing = false;
                                this.$apply();
                                _context2.next = 18;
                                break;

                            case 15:
                                _context2.prev = 15;
                                _context2.t0 = _context2['catch'](0);

                                console.log(_context2.t0);

                            case 18:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this, [[0, 15]]);
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
            this.isEditing = false;
            this.listData = dataList;
            this.$apply();
        }
    }, {
        key: 'addArticle',
        value: function addArticle() {
            var ppu = _wepy2.default.getStorageSync('ppu');
            _wepy2.default.navigateTo({
                url: 'articleComponentCreate?ppu=' + ppu + '&group=' + this.group + '&name=' + this.name
            });
        }
    }]);

    return ArticleComponentList;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(ArticleComponentList , 'pages/articleComponentlist'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFydGljbGVDb21wb25lbnRsaXN0LmpzIl0sIm5hbWVzIjpbIkFydGljbGVDb21wb25lbnRMaXN0IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRpc2FibGVTY3JvbGwiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJFbXB0eVBhZ2UiLCJkYXRhIiwiaGVpZ2h0IiwiZWRpdFN0YXR1cyIsImxpc3REYXRhIiwiZGVsTGlzdCIsImlkIiwiZ3JvdXAiLCJuYW1lIiwidGl0bGUiLCJwYWdlTnVtIiwicGFnZVNpemUiLCJpc0xvYWRpbmciLCJpc0VkaXRpbmciLCJtZXRob2RzIiwiZWRpdENob3NlIiwiaW5kZXgiLCJpdGVtIiwiaXRlbUluZGV4IiwibGVuZ3RoIiwiaW5kZXhPZiIsImNvbnNvbGUiLCJsb2ciLCJjaG9zZVN0YXR1IiwicHVzaCIsInNwbGljZSIsIiRhcHBseSIsIndlcHkiLCJuYXZpZ2F0ZVRvIiwidXJsIiwib3B0aW9uIiwiZ2V0U3lzdGVtSW5mb1N5bmMiLCJ3aW5kb3dIZWlnaHQiLCJsb2FkTGlzdCIsImUiLCJpc2xvYWRpbmciLCJuRGF0YSIsInBhZ2VTemllIiwiZm9yRWFjaCIsIk9iamVjdCIsImFzc2lnbiIsImNvbmNhdCIsImlkcyIsImpvaW4iLCJkYXRhTGlzdCIsInBwdSIsImdldFN0b3JhZ2VTeW5jIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7OztJQUVxQkEsb0I7Ozs7Ozs7Ozs7Ozs7O3NOQUNqQkMsTSxHQUFTO0FBQ0xDLG9DQUF3QixNQURuQjtBQUVMQywyQkFBZTtBQUZWLFMsUUFJVkMsTyxHQUFVLEUsUUFDYkMsTSxHQUFTLEVBQUMsYUFBWSxFQUFiLEUsUUFDVEMsTyxHQUFVLEUsUUFDVEMsVSxHQUFhO0FBQ05DO0FBRE0sUyxRQUdWQyxJLEdBQU87QUFDSEMsb0JBQVEsRUFETDtBQUVIQyx3QkFB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aUJBQXBCO0FBR0gsYUFKRDtBQUtBLGlCQUFLVixTQUFMLEdBQWlCLEtBQWpCO0FBQ0EsaUJBQUtULFFBQUwsR0FBZ0J3QyxRQUFoQjtBQUNBLGlCQUFLbEIsTUFBTDtBQUNIOzs7cUNBQ1k7QUFDVCxnQkFBTW1CLE1BQU1sQixlQUFLbUIsY0FBTCxDQUFvQixLQUFwQixDQUFaO0FBQ0FuQiwyQkFBS0MsVUFBTCxDQUFnQjtBQUNaQyxxREFBbUNnQixHQUFuQyxlQUFnRCxLQUFLdEMsS0FBckQsY0FBbUUsS0FBS0M7QUFENUQsYUFBaEI7QUFHSDs7OztFQTlJNkNtQixlQUFLb0IsSTs7a0JBQWxDdkQsb0IiLCJmaWxlIjoiYXJ0aWNsZUNvbXBvbmVudGxpc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XHJcbmltcG9ydCB7IGFsZXJ0LCB0b2FzdCB9IGZyb20gJy4uL3V0aWxzJztcclxuaW1wb3J0IHsgZ2V0IH0gZnJvbSAnLi4vdXRpbHMvYWpheCc7XHJcbmltcG9ydCBFbXB0eVBhZ2UgZnJvbSAnLi4vY29tcG9uZW50cy9FbXB0eVBhZ2UnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXJ0aWNsZUNvbXBvbmVudExpc3QgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gICAgY29uZmlnID0ge1xyXG4gICAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmlofnq6DnrqHnkIYnLFxyXG4gICAgICAgIGRpc2FibGVTY3JvbGw6IHRydWUsXHJcbiAgICB9XHJcbiAgICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1wiRW1wdHlQYWdlXCI6e319O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xyXG4gICAgICAgIEVtcHR5UGFnZSxcclxuICAgIH1cclxuICAgIGRhdGEgPSB7XHJcbiAgICAgICAgaGVpZ2h0OiAnJyxcclxuICAgICAgICBlZGl0U3RhdHVzOiBmYWxzZSxcclxuICAgICAgICBsaXN0RGF0YTogW10sXHJcbiAgICAgICAgZGVsTGlzdDogW10sXHJcbiAgICAgICAgaWQ6ICcnLFxyXG4gICAgICAgIGdyb3VwOiAnJyxcclxuICAgICAgICBuYW1lOiAnJyxcclxuICAgICAgICB0aXRsZTogJ+ayoeacieaWh+eroH4nLFxyXG4gICAgICAgIHBhZ2VOdW06IDEsXHJcbiAgICAgICAgcGFnZVNpemU6IDIwLFxyXG4gICAgICAgIGlzTG9hZGluZzogdHJ1ZSxcclxuICAgICAgICBpc0VkaXRpbmc6IGZhbHNlLFxyXG4gICAgfVxyXG4gICAgb25Mb2FkKG9wdGlvbikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKG9wdGlvbik7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3QgeyBncm91cCA9ICcnLCBuYW1lID0gJycgfSA9IG9wdGlvbjtcclxuICAgICAgICAgICAgdGhpcy5ncm91cCA9IGdyb3VwO1xyXG4gICAgICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgICAgICBjb25zdCB7IHdpbmRvd0hlaWdodCB9ID0gd2VweS5nZXRTeXN0ZW1JbmZvU3luYygpO1xyXG4gICAgICAgICAgICBjb25zdCBoZWlnaHQgPSB3aW5kb3dIZWlnaHQ7XHJcbiAgICAgICAgICAgIHRoaXMuaGVpZ2h0ID0gYCR7KGhlaWdodCAqIDIpIC0gKDg4ICogMikgLSAoNDAgKiAyKSAtIDk2fXJweGA7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZExpc3QoKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIG9uUmVhY2hCb3R0b20oKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmlzbG9hZGluZykgcmV0dXJuO1xyXG4gICAgICAgIGNvbnN0IHBhZ2VOdW0gPSB0aGlzLnBhZ2VOdW0gKyAxO1xyXG4gICAgICAgIHRoaXMucGFnZU51bSA9IHBhZ2VOdW07XHJcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICB0aGlzLmxvYWRMaXN0KCk7XHJcbiAgICB9XHJcbiAgICBtZXRob2RzID0ge1xyXG4gICAgICAgIGVkaXRDaG9zZShpZCwgaW5kZXgsIG5hbWUpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNFZGl0aW5nKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpdGVtID0gdGhpcy5saXN0RGF0YVtpbmRleF07XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpdGVtSW5kZXggPSB0aGlzLmRlbExpc3QubGVuZ3RoID09PSAwID8gLTIgOiB0aGlzLmRlbExpc3QuaW5kZXhPZihpZCk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhpdGVtSW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLmNob3NlU3RhdHUgPSAhaXRlbS5jaG9zZVN0YXR1O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW1JbmRleCA8IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRlbExpc3QucHVzaChpZCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGVsTGlzdC5zcGxpY2UoaXRlbUluZGV4LCAxKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8g54K55Ye76Lez6L2s5paH56ug6K+m5oOF6aG16Z2iXHJcbiAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgICAgICB1cmw6IGBhcnRpY2xlQ29tcG9uZW50RGV0YWlsP2dyb3VwPSR7dGhpcy5ncm91cH0maWQ9JHtpZH0mbmFtZT0ke25hbWV9YCxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuICAgIH1cclxuICAgIGFzeW5jIGxvYWRMaXN0KCkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHsgcGFnZVNpemUsIHBhZ2VOdW0sIGdyb3VwIH0gPSB0aGlzO1xyXG4gICAgICAgICAgICBjb25zdCB7IGRhdGEgfSA9IGF3YWl0IGdldCgnL2J1c2luZXNzQXJ0aWNsZS9saXN0Jywge1xyXG4gICAgICAgICAgICAgICAgcGFnZVNpemUsXHJcbiAgICAgICAgICAgICAgICBwYWdlTnVtLFxyXG4gICAgICAgICAgICAgICAgZ3JvdXAsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBjb25zdCBuRGF0YSA9IGRhdGEuZGF0YTtcclxuICAgICAgICAgICAgaWYgKHRoaXMucGFnZU51bSA9PT0gMSAmJiAobkRhdGEubGVuZ3RoID09PSAwIHx8ICFuRGF0YSkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0b2FzdCgn5rKh5pyJ5pWw5o2uJyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMucGFnZU51bSA+IDEgJiYgbkRhdGEubGVuZ3RoIDwgdGhpcy5wYWdlU3ppZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRvYXN0KCfmsqHmnInmm7TlpJrmlbDmja4nKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBuRGF0YS5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihpdGVtLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hvc2VTdGF0dTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMubGlzdERhdGEgPSB0aGlzLmxpc3REYXRhLmNvbmNhdChuRGF0YSk7XHJcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZWRpdCgpIHtcclxuICAgICAgICB0aGlzLmlzRWRpdGluZyA9ICF0aGlzLmlzRWRpdGluZztcclxuICAgICAgICB0aGlzLmRlbExpc3QgPSBbXTtcclxuICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgfVxyXG4gICAgYXN5bmMgdG9EZWxldGUoKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3QgeyBkZWxMaXN0IH0gPSB0aGlzO1xyXG4gICAgICAgICAgICBpZiAoZGVsTGlzdC5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KCfor7fpgInmi6nopoHliKDpmaTnmoTmlofnq6AnKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdCBpZHMgPSBkZWxMaXN0LmpvaW4oKTtcclxuICAgICAgICAgICAgYXdhaXQgZ2V0KCcvYnVzaW5lc3NBcnRpY2xlL2RlbGV0ZS8wJywge1xyXG4gICAgICAgICAgICAgICAgaWRzOiBpZHMsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBhbGVydCgn5Yig6Zmk5oiQ5Yqf77yBJyk7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZExpc3QoKTtcclxuICAgICAgICAgICAgdGhpcy5kZWxMaXN0ID0gW107XHJcbiAgICAgICAgICAgIHRoaXMuaXNFZGl0aW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjYW5jbGUoKSB7XHJcbiAgICAgICAgY29uc3QgZGF0YUxpc3QgPSB0aGlzLmxpc3REYXRhO1xyXG4gICAgICAgIGRhdGFMaXN0LmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oaXRlbSwge1xyXG4gICAgICAgICAgICAgICAgY2hvc2VTdGF0dTogZmFsc2UsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuaXNFZGl0aW5nID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5saXN0RGF0YSA9IGRhdGFMaXN0O1xyXG4gICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICB9XHJcbiAgICBhZGRBcnRpY2xlKCkge1xyXG4gICAgICAgIGNvbnN0IHBwdSA9IHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ3BwdScpO1xyXG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgIHVybDogYGFydGljbGVDb21wb25lbnRDcmVhdGU/cHB1PSR7cHB1fSZncm91cD0ke3RoaXMuZ3JvdXB9Jm5hbWU9JHt0aGlzLm5hbWV9YCxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG4iXX0=