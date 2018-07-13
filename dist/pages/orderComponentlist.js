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
            listData: [],
            delList: [],
            id: '',
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

                this.id = id;
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
                var _ref3, data;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                console.log('loadlist');
                                _context.next = 3;
                                return (0, _ajax.get)('/businessService/listByPageForUser?resourceGroup=' + this.id + '&status=0', {
                                    pageSize: 100,
                                    pageNum: 1,
                                    mpId: this.mpId
                                });

                            case 3:
                                _ref3 = _context.sent;
                                data = _ref3.data;

                                if (!(this.pageNum === 1 && (data.length === 0 || !data))) {
                                    _context.next = 9;
                                    break;
                                }

                                this.isLoading = false;
                                (0, _utils.toast)('没有数据');
                                return _context.abrupt('return');

                            case 9:
                                if (!(this.pageNum > 1 && data.length < this.pageSzie)) {
                                    _context.next = 13;
                                    break;
                                }

                                this.isLoading = false;
                                (0, _utils.toast)('没有更多数据');
                                return _context.abrupt('return');

                            case 13:
                                data.foreach(function (item) {
                                    Object.assign(item, {
                                        choseStatu: false
                                    });
                                });
                                this.listData = this.listData.concat(data);
                                this.$apply();

                            case 16:
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
        value: function editChose(e) {
            var id = e.currentTarget.dataset.item.id;

            if (this.editStatus) {
                var selArr = this.delList;
                var dataList = this.listData;
                var index = this.delList.length === 0 ? -2 : this.delList.indexOf(id);
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
                this.delList = selArr;
                this.$apply();
                return;
            }
            // 点击跳转
            _wepy2.default.navigateTo({
                url: 'orderComponentDetail?id=' + id
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
                // url: `orderComponentGroup?id=${this.id}`,
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9yZGVyQ29tcG9uZW50bGlzdC5qcyJdLCJuYW1lcyI6WyJBcnRpY2xlQ29tcG9uZW50TGlzdCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkaXNhYmxlU2Nyb2xsIiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiRW1wdHlQYWdlIiwiZGF0YSIsImhlaWdodCIsImVkaXRTdGF0dXMiLCJsaXN0RGF0YSIsImRlbExpc3QiLCJpZCIsIm1wSWQiLCJwYWdlU2l6ZSIsInBhZ2VOdW0iLCJuYW1lIiwidGl0bGUiLCJpc0xvYWRpbmciLCJvcHRpb24iLCIkYXBwbHkiLCJ3ZXB5IiwiZ2V0U3lzdGVtSW5mb1N5bmMiLCJ3aW5kb3dIZWlnaHQiLCJsb2FkTGlzdCIsImUiLCJjb25zb2xlIiwibG9nIiwiaXNsb2FkaW5nIiwibGVuZ3RoIiwicGFnZVN6aWUiLCJmb3JlYWNoIiwiT2JqZWN0IiwiYXNzaWduIiwiaXRlbSIsImNob3NlU3RhdHUiLCJjb25jYXQiLCJjdXJyZW50VGFyZ2V0IiwiZGF0YXNldCIsInNlbEFyciIsImRhdGFMaXN0IiwiaW5kZXgiLCJpbmRleE9mIiwicHVzaCIsImZvckVhY2giLCJzcGxpY2UiLCJuYXZpZ2F0ZVRvIiwidXJsIiwiaWRzIiwiam9pbiIsInN0YXR1cyIsIm1zZyIsImxvYWREYXRhIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7OztJQUVxQkEsb0I7Ozs7Ozs7Ozs7Ozs7O3NOQUNqQkMsTSxHQUFTO0FBQ0xDLG9DQUF3QixNQURuQjtBQUVMQywyQkFBZTtBQUZWLFMsUUFJVkMsTyxHQUFVLEUsUUFDYkMsTSxHQUFTLEVBQUMsYUFBWSxFQUFiLEUsUUFDVEMsTyxHQUFVLEUsUUFDVEMsVSxHQUFhO0FBQ05DO0FBRE0sUyxRQUdWQyxJLEdBQU87QUFDSEMsb0JBQVEsRUFETDtBQUVIQyx3QkFBWSxLQUZUO0FB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LGdCQUFRO0FBQ3JCWix1QkFBT0MsTUFBUCxDQUFjQyxJQUFkLEVBQW9CO0FBQ2hCQyxnQ0FBWTtBQURJLGlCQUFwQjtBQUdILGFBSkQ7QUFLQSxpQkFBSzFCLFVBQUwsR0FBa0IsS0FBbEI7QUFDQSxpQkFBS0MsUUFBTCxHQUFnQjhCLFFBQWhCO0FBQ0EsaUJBQUtwQixNQUFMO0FBQ0g7OzttQ0FDVTtBQUNQO0FBQ0FDLDJCQUFLeUIsVUFBTCxDQUFnQjtBQUNaO0FBRFksYUFBaEI7QUFHSDs7OztrR0FDbUJyQixDOzs7Ozs7O3dEQUNPQSxFQUFFWSxhQUFGLENBQWdCQyxPQUFoQixDQUF3QkosSSxFQUF2Q2dCLE0seUJBQUFBLE0sRUFBUXRDLEUseUJBQUFBLEU7QUFDWnVDLG1DOzs7dUNBRU0sZUFBSSx5QkFBSixFQUErQjtBQUNqQ3ZDLDBDQURpQztBQUVqQ3NDO0FBRmlDLGlDQUEvQixDOzs7QUFJTixvQ0FBSUEsV0FBVyxDQUFmLEVBQWtCO0FBQ2RDLDBDQUFNLE1BQU47QUFDSCxpQ0FGRCxNQUVPLElBQUlELFdBQVcsQ0FBZixFQUFrQjtBQUNyQkMsMENBQU0sTUFBTjtBQUNIO0FBQ0Qsa0RBQU1BLEdBQU47QUFDQSxxQ0FBS3BDLE9BQUwsR0FBZSxDQUFmO0FBQ0EscUNBQUtLLE1BQUw7QUFDQSxxQ0FBS2dDLFFBQUw7Ozs7Ozs7O0FBRUExQix3Q0FBUUMsR0FBUjs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQXBLc0NOLGVBQUtnQyxJOztrQkFBbEN2RCxvQiIsImZpbGUiOiJvcmRlckNvbXBvbmVudGxpc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XHJcbmltcG9ydCB7IGFsZXJ0LCB0b2FzdCB9IGZyb20gJy4uL3V0aWxzJztcclxuaW1wb3J0IHsgZ2V0IH0gZnJvbSAnLi4vdXRpbHMvYWpheCc7XHJcbmltcG9ydCBFbXB0eVBhZ2UgZnJvbSAnLi4vY29tcG9uZW50cy9FbXB0eVBhZ2UnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXJ0aWNsZUNvbXBvbmVudExpc3QgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gICAgY29uZmlnID0ge1xyXG4gICAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfpooTnuqbliJfooagnLFxyXG4gICAgICAgIGRpc2FibGVTY3JvbGw6IHRydWUsXHJcbiAgICB9XHJcbiAgICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1wiRW1wdHlQYWdlXCI6e319O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xyXG4gICAgICAgIEVtcHR5UGFnZSxcclxuICAgIH1cclxuICAgIGRhdGEgPSB7XHJcbiAgICAgICAgaGVpZ2h0OiAnJyxcclxuICAgICAgICBlZGl0U3RhdHVzOiBmYWxzZSxcclxuICAgICAgICBsaXN0RGF0YTogW10sXHJcbiAgICAgICAgZGVsTGlzdDogW10sXHJcbiAgICAgICAgaWQ6ICcnLFxyXG4gICAgICAgIG1wSWQ6ICcnLFxyXG4gICAgICAgIHBhZ2VTaXplOiAxMDAsXHJcbiAgICAgICAgcGFnZU51bTogMSxcclxuICAgICAgICBuYW1lOiAnJyxcclxuICAgICAgICB0aXRsZTogJ+ayoeaciemihOe6puacjeWKoX4nLFxyXG4gICAgICAgIGlzTG9hZGluZzogdHJ1ZSxcclxuICAgIH1cclxuICAgIG9uTG9hZChvcHRpb24pIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCB7IGlkID0gJycsIG5hbWUgPSAnJyB9ID0gb3B0aW9uO1xyXG4gICAgICAgICAgICB0aGlzLmlkID0gaWQ7XHJcbiAgICAgICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHsgd2luZG93SGVpZ2h0IH0gPSB3ZXB5LmdldFN5c3RlbUluZm9TeW5jKCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGhlaWdodCA9IHdpbmRvd0hlaWdodDtcclxuICAgICAgICAgICAgdGhpcy5oZWlnaHQgPSBgJHsoaGVpZ2h0ICogMikgLSAoODggKiAyKSAtICg0MCAqIDIpIC0gOTZ9cnB4YDtcclxuICAgICAgICAgICAgdGhpcy5sb2FkTGlzdCgpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgb25SZWFjaEJvdHRvbSgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuaXNsb2FkaW5nKSByZXR1cm47XHJcbiAgICAgICAgY29uc3QgcGFnZU51bSA9IHRoaXMucGFnZU51bSArIDE7XHJcbiAgICAgICAgdGhpcy5wYWdlTnVtID0gcGFnZU51bTtcclxuICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgIHRoaXMubG9hZExpc3QoKTtcclxuICAgIH1cclxuICAgIGFzeW5jIGxvYWRMaXN0KCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdsb2FkbGlzdCcpO1xyXG4gICAgICAgIGNvbnN0IHsgZGF0YSB9ID0gYXdhaXQgZ2V0KGAvYnVzaW5lc3NTZXJ2aWNlL2xpc3RCeVBhZ2VGb3JVc2VyP3Jlc291cmNlR3JvdXA9JHt0aGlzLmlkfSZzdGF0dXM9MGAsIHtcclxuICAgICAgICAgICAgcGFnZVNpemU6IDEwMCxcclxuICAgICAgICAgICAgcGFnZU51bTogMSxcclxuICAgICAgICAgICAgbXBJZDogdGhpcy5tcElkLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmICh0aGlzLnBhZ2VOdW0gPT09IDEgJiYgKGRhdGEubGVuZ3RoID09PSAwIHx8ICFkYXRhKSkge1xyXG4gICAgICAgICAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0b2FzdCgn5rKh5pyJ5pWw5o2uJyk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMucGFnZU51bSA+IDEgJiYgZGF0YS5sZW5ndGggPCB0aGlzLnBhZ2VTemllKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRvYXN0KCfmsqHmnInmm7TlpJrmlbDmja4nKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkYXRhLmZvcmVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oaXRlbSwge1xyXG4gICAgICAgICAgICAgICAgY2hvc2VTdGF0dTogZmFsc2UsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMubGlzdERhdGEgPSB0aGlzLmxpc3REYXRhLmNvbmNhdChkYXRhKTtcclxuICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgfVxyXG4gICAgZWRpdENob3NlKGUpIHtcclxuICAgICAgICBjb25zdCB7IGlkIH0gPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pdGVtO1xyXG4gICAgICAgIGlmICh0aGlzLmVkaXRTdGF0dXMpIHtcclxuICAgICAgICAgICAgY29uc3Qgc2VsQXJyID0gdGhpcy5kZWxMaXN0O1xyXG4gICAgICAgICAgICBjb25zdCBkYXRhTGlzdCA9IHRoaXMubGlzdERhdGE7XHJcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5kZWxMaXN0Lmxlbmd0aCA9PT0gMCA/IC0yIDogdGhpcy5kZWxMaXN0LmluZGV4T2YoaWQpO1xyXG4gICAgICAgICAgICBpZiAoaW5kZXggPCAwKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxBcnIucHVzaChpZCk7XHJcbiAgICAgICAgICAgICAgICBkYXRhTGlzdC5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLmlkID09PSBpZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKGl0ZW0sIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNob3NlU3RhdHU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZGF0YUxpc3QuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5pZCA9PT0gaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihpdGVtLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaG9zZVN0YXR1OiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBzZWxBcnIuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmxpc3REYXRhID0gZGF0YUxpc3Q7XHJcbiAgICAgICAgICAgIHRoaXMuZGVsTGlzdCA9IHNlbEFycjtcclxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDngrnlh7vot7PovaxcclxuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICB1cmw6IGBvcmRlckNvbXBvbmVudERldGFpbD9pZD0ke2lkfWAsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBlZGl0KCkge1xyXG4gICAgICAgIHRoaXMuZWRpdFN0YXR1cyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgIH1cclxuICAgIGFzeW5jIHRvRGVsZXRlKCkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHsgZGVsTGlzdCB9ID0gdGhpcztcclxuICAgICAgICAgICAgaWYgKGRlbExpc3QubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBhbGVydCgn6K+36YCJ5oup6KaB5Yig6Zmk55qE5pyN5YqhJyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3QgaWRzID0gZGVsTGlzdC5qb2luKCk7XHJcbiAgICAgICAgICAgIGF3YWl0IGdldCgnL2J1c2luZXNzU2VydmljZS9kZWxHcm91cC8wJywge1xyXG4gICAgICAgICAgICAgICAgaWRzOiBpZHMsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBhbGVydCgn5Yig6Zmk5oiQ5Yqf77yBJyk7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZExpc3QoKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xyXG4gICAgICAgICAgICBhbGVydCgn6K+l5pyN5Yqh5Zyo5qih5p2/5Lit6KKr5bqU55So77yM5LiN6IO96KKr5Yig6ZmkJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZWRpdFN0YXR1cyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICB9XHJcbiAgICBjYW5jbGUoKSB7XHJcbiAgICAgICAgY29uc3QgZGF0YUxpc3QgPSB0aGlzLmxpc3REYXRhO1xyXG4gICAgICAgIGRhdGFMaXN0LmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oaXRlbSwge1xyXG4gICAgICAgICAgICAgICAgY2hvc2VTdGF0dTogZmFsc2UsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuZWRpdFN0YXR1cyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubGlzdERhdGEgPSBkYXRhTGlzdDtcclxuICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgfVxyXG4gICAgYWRkR3JvdXAoKSB7XHJcbiAgICAgICAgLy8g5re75Yqg6aKE57qm5pyN5YqhXHJcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgLy8gdXJsOiBgb3JkZXJDb21wb25lbnRHcm91cD9pZD0ke3RoaXMuaWR9YCxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGFzeW5jIG1hbmFnZVByb2R1Y3QoZSkge1xyXG4gICAgICAgIGNvbnN0IHsgc3RhdHVzLCBpZCB9ID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaXRlbTtcclxuICAgICAgICBsZXQgbXNnO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGF3YWl0IGdldCgnL2J1c2luZXNzU2VydmljZS91cGRhdGUnLCB7XHJcbiAgICAgICAgICAgICAgICBpZCxcclxuICAgICAgICAgICAgICAgIHN0YXR1cyxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGlmIChzdGF0dXMgPT09IDApIHtcclxuICAgICAgICAgICAgICAgIG1zZyA9ICfkuIrmnrbmiJDlip8nO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHN0YXR1cyA9PT0gMikge1xyXG4gICAgICAgICAgICAgICAgbXNnID0gJ+S4i+aetuaIkOWKnyc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdG9hc3QobXNnKTtcclxuICAgICAgICAgICAgdGhpcy5wYWdlTnVtID0gMTtcclxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkRGF0YSgpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=