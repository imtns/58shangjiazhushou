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
                    url: 'articleComponentDetail?group=' + this.group + '&id=' + id + '&name=' + this.name
                });
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(ArticleComponentList, [{
        key: 'onLoad',
        value: function onLoad(option) {
            console.log('list', option);
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
                                    _context.next = 10;
                                    break;
                                }

                                this.isLoading = false;
                                // toast('没有数据');
                                return _context.abrupt('return');

                            case 10:
                                if (!(this.pageNum > 1 && nData.length < this.pageSzie)) {
                                    _context.next = 14;
                                    break;
                                }

                                this.isLoading = false;
                                (0, _utils.toast)('没有更多数据');
                                return _context.abrupt('return');

                            case 14:
                                nData.forEach(function (item) {
                                    Object.assign(item, {
                                        choseStatu: false
                                    });
                                });
                                this.listData = this.pageNum === 1 ? nData : this.listData.concat(nData);
                                this.$apply();
                                _context.next = 22;
                                break;

                            case 19:
                                _context.prev = 19;
                                _context.t0 = _context['catch'](0);

                                console.log(_context.t0);

                            case 22:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[0, 19]]);
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
            console.log('list', this.name);
            _wepy2.default.navigateTo({
                url: 'articleComponentCreate?ppu=' + ppu + '&group=' + this.group + '&name=' + this.name
            });
        }
    }]);

    return ArticleComponentList;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(ArticleComponentList , 'pages/articleComponentlist'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFydGljbGVDb21wb25lbnRsaXN0LmpzIl0sIm5hbWVzIjpbIkFydGljbGVDb21wb25lbnRMaXN0IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRpc2FibGVTY3JvbGwiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJFbXB0eVBhZ2UiLCJkYXRhIiwiaGVpZ2h0IiwiZWRpdFN0YXR1cyIsImxpc3REYXRhIiwiZGVsTGlzdCIsImlkIiwiZ3JvdXAiLCJuYW1lIiwidGl0bGUiLCJwYWdlTnVtIiwicGFnZVNpemUiLCJpc0xvYWRpbmciLCJpc0VkaXRpbmciLCJtZXRob2RzIiwiZWRpdENob3NlIiwiaW5kZXgiLCJpdGVtIiwiaXRlbUluZGV4IiwibGVuZ3RoIiwiaW5kZXhPZiIsImNob3NlU3RhdHUiLCJwdXNoIiwic3BsaWNlIiwiJGFwcGx5Iiwid2VweSIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJvcHRpb24iLCJjb25zb2xlIiwibG9nIiwiZ2V0U3lzdGVtSW5mb1N5bmMiLCJ3aW5kb3dIZWlnaHQiLCJsb2FkTGlzdCIsImUiLCJpc2xvYWRpbmciLCJuRGF0YSIsInBhZ2VTemllIiwiZm9yRWFjaCIsIk9iamVjdCIsImFzc2lnbiIsImNvbmNhdCIsImlkcyIsImpvaW4iLCJkYXRhTGlzdCIsInBwdSIsImdldFN0b3JhZ2VTeW5jIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7OztJQUVxQkEsb0I7Ozs7Ozs7Ozs7Ozs7O3NOQUNqQkMsTSxHQUFTO0FBQ0xDLG9DQUF3QixNQURuQjtBQUVMQywyQkFBZTtBQUZWLFMsUUFJVkMsTyxHQUFVLEUsUUFDYkMsTSxHQUFTLEVBQUMsYUFBWSxFQUFiLEUsUUFDVEMsTyxHQUFVLEUsUUFDVEMsVSxHQUFhO0FBQ05DO0FBRE0sUyxRQUdWQyxJLEdBQU87QUFDSEMsb0JBQVEsRUFETDtBQUVIQyx3QkFB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QjtBQUNoQkksZ0NBQVk7QUFESSxpQkFBcEI7QUFHSCxhQUpEO0FBS0EsaUJBQUtSLFNBQUwsR0FBaUIsS0FBakI7QUFDQSxpQkFBS1QsUUFBTCxHQUFnQndDLFFBQWhCO0FBQ0EsaUJBQUtwQixNQUFMO0FBQ0g7OztxQ0FDWTtBQUNULGdCQUFNcUIsTUFBTXBCLGVBQUtxQixjQUFMLENBQW9CLEtBQXBCLENBQVo7QUFDQWpCLG9CQUFRQyxHQUFSLENBQVksTUFBWixFQUFvQixLQUFLdEIsSUFBekI7QUFDQWlCLDJCQUFLQyxVQUFMLENBQWdCO0FBQ1pDLHFEQUFtQ2tCLEdBQW5DLGVBQWdELEtBQUt0QyxLQUFyRCxjQUFtRSxLQUFLQztBQUQ1RCxhQUFoQjtBQUdIOzs7O0VBOUk2Q2lCLGVBQUtzQixJOztrQkFBbEN2RCxvQiIsImZpbGUiOiJhcnRpY2xlQ29tcG9uZW50bGlzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5pbXBvcnQgeyBhbGVydCwgdG9hc3QgfSBmcm9tICcuLi91dGlscyc7XG5pbXBvcnQgeyBnZXQgfSBmcm9tICcuLi91dGlscy9hamF4JztcbmltcG9ydCBFbXB0eVBhZ2UgZnJvbSAnLi4vY29tcG9uZW50cy9FbXB0eVBhZ2UnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcnRpY2xlQ29tcG9uZW50TGlzdCBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5paH56ug566h55CGJyxcbiAgICAgICAgZGlzYWJsZVNjcm9sbDogdHJ1ZSxcbiAgICB9XG4gICAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcIkVtcHR5UGFnZVwiOnt9fTtcclxuJGV2ZW50cyA9IHt9O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICAgICAgRW1wdHlQYWdlLFxuICAgIH1cbiAgICBkYXRhID0ge1xuICAgICAgICBoZWlnaHQ6ICcnLFxuICAgICAgICBlZGl0U3RhdHVzOiBmYWxzZSxcbiAgICAgICAgbGlzdERhdGE6IFtdLFxuICAgICAgICBkZWxMaXN0OiBbXSxcbiAgICAgICAgaWQ6ICcnLFxuICAgICAgICBncm91cDogJycsXG4gICAgICAgIG5hbWU6ICcnLFxuICAgICAgICB0aXRsZTogJ+ayoeacieaWh+eroH4nLFxuICAgICAgICBwYWdlTnVtOiAxLFxuICAgICAgICBwYWdlU2l6ZTogMjAsXG4gICAgICAgIGlzTG9hZGluZzogdHJ1ZSxcbiAgICAgICAgaXNFZGl0aW5nOiBmYWxzZSxcbiAgICB9XG4gICAgb25Mb2FkKG9wdGlvbikge1xuICAgICAgICBjb25zb2xlLmxvZygnbGlzdCcsIG9wdGlvbik7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCB7IGdyb3VwID0gJycsIG5hbWUgPSAnJyB9ID0gb3B0aW9uO1xuICAgICAgICAgICAgdGhpcy5ncm91cCA9IGdyb3VwO1xuICAgICAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICAgICAgICBjb25zdCB7IHdpbmRvd0hlaWdodCB9ID0gd2VweS5nZXRTeXN0ZW1JbmZvU3luYygpO1xuICAgICAgICAgICAgY29uc3QgaGVpZ2h0ID0gd2luZG93SGVpZ2h0O1xuICAgICAgICAgICAgdGhpcy5oZWlnaHQgPSBgJHsoaGVpZ2h0ICogMikgLSAoODggKiAyKSAtICg0MCAqIDIpIC0gOTZ9cnB4YDtcbiAgICAgICAgICAgIHRoaXMubG9hZExpc3QoKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgb25SZWFjaEJvdHRvbSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzbG9hZGluZykgcmV0dXJuO1xuICAgICAgICBjb25zdCBwYWdlTnVtID0gdGhpcy5wYWdlTnVtICsgMTtcbiAgICAgICAgdGhpcy5wYWdlTnVtID0gcGFnZU51bTtcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgICAgdGhpcy5sb2FkTGlzdCgpO1xuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgICAgICBlZGl0Q2hvc2UoaWQsIGluZGV4LCBuYW1lKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5pc0VkaXRpbmcpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBpdGVtID0gdGhpcy5saXN0RGF0YVtpbmRleF07XG4gICAgICAgICAgICAgICAgY29uc3QgaXRlbUluZGV4ID0gdGhpcy5kZWxMaXN0Lmxlbmd0aCA9PT0gMCA/IC0yIDogdGhpcy5kZWxMaXN0LmluZGV4T2YoaWQpO1xuICAgICAgICAgICAgICAgIGlmIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uY2hvc2VTdGF0dSA9ICFpdGVtLmNob3NlU3RhdHU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChpdGVtSW5kZXggPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGVsTGlzdC5wdXNoKGlkKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRlbExpc3Quc3BsaWNlKGl0ZW1JbmRleCwgMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8g54K55Ye76Lez6L2s5paH56ug6K+m5oOF6aG16Z2iXG4gICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgICAgIHVybDogYGFydGljbGVDb21wb25lbnREZXRhaWw/Z3JvdXA9JHt0aGlzLmdyb3VwfSZpZD0ke2lkfSZuYW1lPSR7dGhpcy5uYW1lfWAsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICB9XG4gICAgYXN5bmMgbG9hZExpc3QoKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCB7IHBhZ2VTaXplLCBwYWdlTnVtLCBncm91cCB9ID0gdGhpcztcbiAgICAgICAgICAgIGNvbnN0IHsgZGF0YSB9ID0gYXdhaXQgZ2V0KCcvYnVzaW5lc3NBcnRpY2xlL2xpc3QnLCB7XG4gICAgICAgICAgICAgICAgcGFnZVNpemUsXG4gICAgICAgICAgICAgICAgcGFnZU51bSxcbiAgICAgICAgICAgICAgICBncm91cCxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY29uc3QgbkRhdGEgPSBkYXRhLmRhdGE7XG4gICAgICAgICAgICBpZiAodGhpcy5wYWdlTnVtID09PSAxICYmIChuRGF0YS5sZW5ndGggPT09IDAgfHwgIW5EYXRhKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgLy8gdG9hc3QoJ+ayoeacieaVsOaNricpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnBhZ2VOdW0gPiAxICYmIG5EYXRhLmxlbmd0aCA8IHRoaXMucGFnZVN6aWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRvYXN0KCfmsqHmnInmm7TlpJrmlbDmja4nKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBuRGF0YS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oaXRlbSwge1xuICAgICAgICAgICAgICAgICAgICBjaG9zZVN0YXR1OiBmYWxzZSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5saXN0RGF0YSA9IHRoaXMucGFnZU51bSA9PT0gMSA/IG5EYXRhIDogdGhpcy5saXN0RGF0YS5jb25jYXQobkRhdGEpO1xuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBlZGl0KCkge1xuICAgICAgICB0aGlzLmlzRWRpdGluZyA9ICF0aGlzLmlzRWRpdGluZztcbiAgICAgICAgdGhpcy5kZWxMaXN0ID0gW107XG4gICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgfVxuICAgIGFzeW5jIHRvRGVsZXRlKCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgeyBkZWxMaXN0IH0gPSB0aGlzO1xuICAgICAgICAgICAgaWYgKGRlbExpc3QubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgYWxlcnQoJ+ivt+mAieaLqeimgeWIoOmZpOeahOaWh+eroCcpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGlkcyA9IGRlbExpc3Quam9pbigpO1xuICAgICAgICAgICAgYXdhaXQgZ2V0KCcvYnVzaW5lc3NBcnRpY2xlL2RlbGV0ZS8wJywge1xuICAgICAgICAgICAgICAgIGlkczogaWRzLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBhbGVydCgn5Yig6Zmk5oiQ5Yqf77yBJyk7XG4gICAgICAgICAgICB0aGlzLmxvYWRMaXN0KCk7XG4gICAgICAgICAgICB0aGlzLmRlbExpc3QgPSBbXTtcbiAgICAgICAgICAgIHRoaXMuaXNFZGl0aW5nID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjYW5jbGUoKSB7XG4gICAgICAgIGNvbnN0IGRhdGFMaXN0ID0gdGhpcy5saXN0RGF0YTtcbiAgICAgICAgZGF0YUxpc3QuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oaXRlbSwge1xuICAgICAgICAgICAgICAgIGNob3NlU3RhdHU6IGZhbHNlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmlzRWRpdGluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmxpc3REYXRhID0gZGF0YUxpc3Q7XG4gICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgfVxuICAgIGFkZEFydGljbGUoKSB7XG4gICAgICAgIGNvbnN0IHBwdSA9IHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ3BwdScpO1xuICAgICAgICBjb25zb2xlLmxvZygnbGlzdCcsIHRoaXMubmFtZSk7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICB1cmw6IGBhcnRpY2xlQ29tcG9uZW50Q3JlYXRlP3BwdT0ke3BwdX0mZ3JvdXA9JHt0aGlzLmdyb3VwfSZuYW1lPSR7dGhpcy5uYW1lfWAsXG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiJdfQ==