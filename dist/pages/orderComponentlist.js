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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9yZGVyQ29tcG9uZW50bGlzdC5qcyJdLCJuYW1lcyI6WyJBcnRpY2xlQ29tcG9uZW50TGlzdCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkaXNhYmxlU2Nyb2xsIiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiRW1wdHlQYWdlIiwiZGF0YSIsImhlaWdodCIsImVkaXRTdGF0dXMiLCJncm91cExpc3QiLCJkZWxMaXN0IiwiaWQiLCJyZXNvdXJjZUdyb3VwIiwibXBJZCIsInBhZ2VTaXplIiwicGFnZU51bSIsIm5hbWUiLCJ0aXRsZSIsImlzTG9hZGluZyIsIm9wdGlvbiIsIndlcHkiLCJnZXRTdG9yYWdlU3luYyIsIiRhcHBseSIsImdldFN5c3RlbUluZm9TeW5jIiwid2luZG93SGVpZ2h0IiwibG9hZExpc3QiLCJlIiwiY29uc29sZSIsImxvZyIsImlzbG9hZGluZyIsIm1waWQiLCJsZW5ndGgiLCJwYWdlU3ppZSIsImZvcmVhY2giLCJPYmplY3QiLCJhc3NpZ24iLCJpdGVtIiwiY2hvc2VTdGF0dSIsImNvbmNhdCIsImluZGV4IiwiaXNFZGl0aW5nIiwiaXRlbUluZGV4IiwiaW5kZXhPZiIsInB1c2giLCJzcGxpY2UiLCJuYXZpZ2F0ZVRvIiwidXJsIiwiaWRzIiwiam9pbiIsImRhdGFMaXN0IiwibGlzdERhdGEiLCJmb3JFYWNoIiwiY3VycmVudFRhcmdldCIsImRhdGFzZXQiLCJzdGF0dXMiLCJtc2ciLCJsb2FkRGF0YSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7SUFFcUJBLG9COzs7Ozs7Ozs7Ozs7OztzTkFDakJDLE0sR0FBUztBQUNMQyxvQ0FBd0IsTUFEbkI7QUFFTEMsMkJBQWU7QUFGVixTLFFBSVZDLE8sR0FBVSxFLFFBQ2JDLE0sR0FBUyxFQUFDLGFBQVksRUFBYixFLFFBQ1RDLE8sR0FBVSxFLFFBQ1RDLFUs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QUFnQkQsUUFBaEI7QUFDQSxpQkFBSzNCLE1BQUw7QUFDSDs7O21DQUNVO0FBQ1A7QUFDQUYsMkJBQUt5QixVQUFMLENBQWdCO0FBQ1pDLDJEQUF5QyxLQUFLbkM7QUFEbEMsYUFBaEI7QUFHSDs7OztrR0FDbUJlLEM7Ozs7Ozs7d0RBQ09BLEVBQUUwQixhQUFGLENBQWdCQyxPQUFoQixDQUF3QmpCLEksRUFBdkNrQixNLHlCQUFBQSxNLEVBQVEzQyxFLHlCQUFBQSxFO0FBQ1o0QyxtQzs7O3VDQUVNLGVBQUkseUJBQUosRUFBK0I7QUFDakM1QywwQ0FEaUM7QUFFakMyQztBQUZpQyxpQ0FBL0IsQzs7O0FBSU4sb0NBQUlBLFdBQVcsQ0FBZixFQUFrQjtBQUNkQywwQ0FBTSxNQUFOO0FBQ0gsaUNBRkQsTUFFTyxJQUFJRCxXQUFXLENBQWYsRUFBa0I7QUFDckJDLDBDQUFNLE1BQU47QUFDSDtBQUNELGtEQUFNQSxHQUFOO0FBQ0EscUNBQUt4QyxPQUFMLEdBQWUsQ0FBZjtBQUNBLHFDQUFLTyxNQUFMO0FBQ0EscUNBQUtrQyxRQUFMOzs7Ozs7OztBQUVBN0Isd0NBQVFDLEdBQVI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUF6SnNDUixlQUFLcUMsSTs7a0JBQWxDNUQsb0IiLCJmaWxlIjoib3JkZXJDb21wb25lbnRsaXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xyXG5pbXBvcnQgeyBhbGVydCwgdG9hc3QgfSBmcm9tICcuLi91dGlscyc7XHJcbmltcG9ydCB7IGdldCB9IGZyb20gJy4uL3V0aWxzL2FqYXgnO1xyXG5pbXBvcnQgRW1wdHlQYWdlIGZyb20gJy4uL2NvbXBvbmVudHMvRW1wdHlQYWdlJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFydGljbGVDb21wb25lbnRMaXN0IGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICAgIGNvbmZpZyA9IHtcclxuICAgICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn6aKE57qm5YiX6KGoJyxcclxuICAgICAgICBkaXNhYmxlU2Nyb2xsOiB0cnVlLFxyXG4gICAgfVxyXG4gICAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcIkVtcHR5UGFnZVwiOnt9fTtcclxuJGV2ZW50cyA9IHt9O1xyXG4gY29tcG9uZW50cyA9IHtcclxuICAgICAgICBFbXB0eVBhZ2UsXHJcbiAgICB9XHJcbiAgICBkYXRhID0ge1xyXG4gICAgICAgIGhlaWdodDogJycsXHJcbiAgICAgICAgZWRpdFN0YXR1czogZmFsc2UsXHJcbiAgICAgICAgZ3JvdXBMaXN0OiBbXSxcclxuICAgICAgICBkZWxMaXN0OiBbXSxcclxuICAgICAgICBpZDogJycsXHJcbiAgICAgICAgcmVzb3VyY2VHcm91cDogJycsXHJcbiAgICAgICAgbXBJZDogJycsXHJcbiAgICAgICAgcGFnZVNpemU6IDEwMCxcclxuICAgICAgICBwYWdlTnVtOiAxLFxyXG4gICAgICAgIG5hbWU6ICcnLFxyXG4gICAgICAgIHRpdGxlOiAn5rKh5pyJ6aKE57qm5pyN5YqhficsXHJcbiAgICAgICAgaXNMb2FkaW5nOiB0cnVlLFxyXG4gICAgfVxyXG4gICAgb25Mb2FkKG9wdGlvbikge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHsgaWQgPSAnJywgbmFtZSA9ICcnIH0gPSBvcHRpb247XHJcbiAgICAgICAgICAgIHRoaXMucmVzb3VyY2VHcm91cCA9IGlkO1xyXG4gICAgICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgICAgICAgICBjb25zdCBtcElkID0gd2VweS5nZXRTdG9yYWdlU3luYygnY3VycmVudF9tcGlkJyk7XHJcbiAgICAgICAgICAgIHRoaXMubXBJZCA9IG1wSWQ7XHJcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHsgd2luZG93SGVpZ2h0IH0gPSB3ZXB5LmdldFN5c3RlbUluZm9TeW5jKCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGhlaWdodCA9IHdpbmRvd0hlaWdodDtcclxuICAgICAgICAgICAgdGhpcy5oZWlnaHQgPSBgJHsoaGVpZ2h0ICogMikgLSAoODggKiAyKSAtICg0MCAqIDIpIC0gOTZ9cnB4YDtcclxuICAgICAgICAgICAgdGhpcy5sb2FkTGlzdCgpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgb25SZWFjaEJvdHRvbSgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuaXNsb2FkaW5nKSByZXR1cm47XHJcbiAgICAgICAgY29uc3QgcGFnZU51bSA9IHRoaXMucGFnZU51bSArIDE7XHJcbiAgICAgICAgdGhpcy5wYWdlTnVtID0gcGFnZU51bTtcclxuICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgIHRoaXMubG9hZExpc3QoKTtcclxuICAgIH1cclxuICAgIGFzeW5jIGxvYWRMaXN0KCkge1xyXG4gICAgICAgIGNvbnN0IHsgZGF0YSB9ID0gYXdhaXQgZ2V0KGAvYnVzaW5lc3NTZXJ2aWNlL2xpc3RCeVBhZ2VGb3JVc2VyP3Jlc291cmNlR3JvdXA9JHt0aGlzLnJlc291cmNlR3JvdXB9JnN0YXR1cz0wYCwge1xyXG4gICAgICAgICAgICBwYWdlU2l6ZTogMTAwLFxyXG4gICAgICAgICAgICBwYWdlTnVtOiAxLFxyXG4gICAgICAgICAgICBtcGlkOiB0aGlzLm1wSWQsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKHRoaXMucGFnZU51bSA9PT0gMSAmJiAoZGF0YS5sZW5ndGggPT09IDAgfHwgIWRhdGEpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRvYXN0KCfmsqHmnInmlbDmja4nKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5wYWdlTnVtID4gMSAmJiBkYXRhLmxlbmd0aCA8IHRoaXMucGFnZVN6aWUpIHtcclxuICAgICAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgdG9hc3QoJ+ayoeacieabtOWkmuaVsOaNricpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRhdGEuZm9yZWFjaChpdGVtID0+IHtcclxuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihpdGVtLCB7XHJcbiAgICAgICAgICAgICAgICBjaG9zZVN0YXR1OiBmYWxzZSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5ncm91cExpc3QgPSB0aGlzLmdyb3VwTGlzdC5jb25jYXQoZGF0YSk7XHJcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgIH1cclxuICAgIGVkaXRDaG9zZShpZCwgaW5kZXgpIHtcclxuICAgICAgICBpZiAodGhpcy5pc0VkaXRpbmcpIHtcclxuICAgICAgICAgICAgY29uc3QgaXRlbSA9IHRoaXMuZ3JvdXBMaXN0W2luZGV4XTtcclxuICAgICAgICAgICAgY29uc3QgaXRlbUluZGV4ID0gdGhpcy5kZWxMaXN0Lmxlbmd0aCA9PT0gMCA/IC0yIDogdGhpcy5kZWxMaXN0LmluZGV4T2YoaWQpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhpdGVtSW5kZXgpO1xyXG4gICAgICAgICAgICBpZiAoaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgaXRlbS5jaG9zZVN0YXR1ID0gIWl0ZW0uY2hvc2VTdGF0dTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoaXRlbUluZGV4IDwgMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kZWxMaXN0LnB1c2goaWQpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kZWxMaXN0LnNwbGljZShpdGVtSW5kZXgsIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZGVsTGlzdCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g54K55Ye76Lez6L2s6K+m5oOF6aG16Z2iXHJcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgdXJsOiBgb3JkZXJDb21wb25lbnREZXRhaWw/aWQ9JHtpZH0mcmVzb3VyY2VHcm91cD0ke3RoaXMucmVzb3VyY2VHcm91cH1gLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgZWRpdCgpIHtcclxuICAgICAgICB0aGlzLmVkaXRTdGF0dXMgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICB9XHJcbiAgICBhc3luYyB0b0RlbGV0ZSgpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCB7IGRlbExpc3QgfSA9IHRoaXM7XHJcbiAgICAgICAgICAgIGlmIChkZWxMaXN0Lmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoJ+ivt+mAieaLqeimgeWIoOmZpOeahOacjeWKoScpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IGlkcyA9IGRlbExpc3Quam9pbigpO1xyXG4gICAgICAgICAgICBhd2FpdCBnZXQoJy9idXNpbmVzc1NlcnZpY2UvZGVsR3JvdXAvMCcsIHtcclxuICAgICAgICAgICAgICAgIGlkczogaWRzLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgYWxlcnQoJ+WIoOmZpOaIkOWKn++8gScpO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRMaXN0KCk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcclxuICAgICAgICAgICAgYWxlcnQoJ+ivpeacjeWKoeWcqOaooeadv+S4reiiq+W6lOeUqO+8jOS4jeiDveiiq+WIoOmZpCcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmVkaXRTdGF0dXMgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgfVxyXG4gICAgY2FuY2xlKCkge1xyXG4gICAgICAgIGNvbnN0IGRhdGFMaXN0ID0gdGhpcy5saXN0RGF0YTtcclxuICAgICAgICBkYXRhTGlzdC5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGl0ZW0sIHtcclxuICAgICAgICAgICAgICAgIGNob3NlU3RhdHU6IGZhbHNlLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmVkaXRTdGF0dXMgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmxpc3REYXRhID0gZGF0YUxpc3Q7XHJcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgIH1cclxuICAgIGFkZEdyb3VwKCkge1xyXG4gICAgICAgIC8vIOa3u+WKoOmihOe6puacjeWKoVxyXG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgIHVybDogYG9yZGVyQ29tcG9uZW50RWRpdD9yZXNvdXJjZUdyb3VwPSR7dGhpcy5pZH1gLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgYXN5bmMgbWFuYWdlUHJvZHVjdChlKSB7XHJcbiAgICAgICAgY29uc3QgeyBzdGF0dXMsIGlkIH0gPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pdGVtO1xyXG4gICAgICAgIGxldCBtc2c7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgYXdhaXQgZ2V0KCcvYnVzaW5lc3NTZXJ2aWNlL3VwZGF0ZScsIHtcclxuICAgICAgICAgICAgICAgIGlkLFxyXG4gICAgICAgICAgICAgICAgc3RhdHVzLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaWYgKHN0YXR1cyA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgbXNnID0gJ+S4iuaetuaIkOWKnyc7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc3RhdHVzID09PSAyKSB7XHJcbiAgICAgICAgICAgICAgICBtc2cgPSAn5LiL5p625oiQ5YqfJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0b2FzdChtc2cpO1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2VOdW0gPSAxO1xyXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWREYXRhKCk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==