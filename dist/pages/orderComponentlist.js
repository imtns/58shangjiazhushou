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
                                    _context.next = 7;
                                    break;
                                }

                                this.isLoading = false;
                                // toast('没有数据');
                                return _context.abrupt('return');

                            case 7:
                                if (!(this.pageNum > 1 && data.length < this.pageSzie)) {
                                    _context.next = 11;
                                    break;
                                }

                                this.isLoading = false;
                                (0, _utils.toast)('没有更多数据');
                                return _context.abrupt('return');

                            case 11:
                                data.foreach(function (item) {
                                    Object.assign(item, {
                                        choseStatu: false
                                    });
                                });
                                this.groupList = this.pageNum === 1 ? data : this.groupList.concat(data);
                                this.$apply();

                            case 14:
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9yZGVyQ29tcG9uZW50bGlzdC5qcyJdLCJuYW1lcyI6WyJBcnRpY2xlQ29tcG9uZW50TGlzdCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkaXNhYmxlU2Nyb2xsIiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiRW1wdHlQYWdlIiwiZGF0YSIsImhlaWdodCIsImVkaXRTdGF0dXMiLCJncm91cExpc3QiLCJkZWxMaXN0IiwiaWQiLCJyZXNvdXJjZUdyb3VwIiwibXBJZCIsInBhZ2VTaXplIiwicGFnZU51bSIsIm5hbWUiLCJ0aXRsZSIsImlzTG9hZGluZyIsIm9wdGlvbiIsIndlcHkiLCJnZXRTdG9yYWdlU3luYyIsIiRhcHBseSIsImdldFN5c3RlbUluZm9TeW5jIiwid2luZG93SGVpZ2h0IiwibG9hZExpc3QiLCJlIiwiY29uc29sZSIsImxvZyIsImlzbG9hZGluZyIsIm1waWQiLCJsZW5ndGgiLCJwYWdlU3ppZSIsImZvcmVhY2giLCJPYmplY3QiLCJhc3NpZ24iLCJpdGVtIiwiY2hvc2VTdGF0dSIsImNvbmNhdCIsImluZGV4IiwiaXNFZGl0aW5nIiwiaXRlbUluZGV4IiwiaW5kZXhPZiIsInB1c2giLCJzcGxpY2UiLCJuYXZpZ2F0ZVRvIiwidXJsIiwiaWRzIiwiam9pbiIsImRhdGFMaXN0IiwibGlzdERhdGEiLCJmb3JFYWNoIiwiY3VycmVudFRhcmdldCIsImRhdGFzZXQiLCJzdGF0dXMiLCJtc2ciLCJsb2FkRGF0YSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7SUFFcUJBLG9COzs7Ozs7Ozs7Ozs7OztzTkFDakJDLE0sR0FBUztBQUNMQyxvQ0FBd0IsTUFEbkI7QUFFTEMsMkJBQWU7QUFGVixTLFFBSVZDLE8sR0FBVSxFLFFBQ2JDLE0sR0FBUyxFQUFDLGFBQVksRUFBYixFLFFBQ1RDLE8sR0FBVSxFLFFBQ1RDLFUs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R0FBa0IsS0FBbEI7QUFDQSxpQkFBSzBDLFFBQUwsR0FBZ0JELFFBQWhCO0FBQ0EsaUJBQUszQixNQUFMO0FBQ0g7OzttQ0FDVTtBQUNQO0FBQ0FGLDJCQUFLeUIsVUFBTCxDQUFnQjtBQUNaQywyREFBeUMsS0FBS25DO0FBRGxDLGFBQWhCO0FBR0g7Ozs7a0dBQ21CZSxDOzs7Ozs7O3dEQUNPQSxFQUFFMEIsYUFBRixDQUFnQkMsT0FBaEIsQ0FBd0JqQixJLEVBQXZDa0IsTSx5QkFBQUEsTSxFQUFRM0MsRSx5QkFBQUEsRTtBQUNaNEMsbUM7Ozt1Q0FFTSxlQUFJLHlCQUFKLEVBQStCO0FBQ2pDNUMsMENBRGlDO0FBRWpDMkM7QUFGaUMsaUNBQS9CLEM7OztBQUlOLG9DQUFJQSxXQUFXLENBQWYsRUFBa0I7QUFDZEMsMENBQU0sTUFBTjtBQUNILGlDQUZELE1BRU8sSUFBSUQsV0FBVyxDQUFmLEVBQWtCO0FBQ3JCQywwQ0FBTSxNQUFOO0FBQ0g7QUFDRCxrREFBTUEsR0FBTjtBQUNBLHFDQUFLeEMsT0FBTCxHQUFlLENBQWY7QUFDQSxxQ0FBS08sTUFBTDtBQUNBLHFDQUFLa0MsUUFBTDs7Ozs7Ozs7QUFFQTdCLHdDQUFRQyxHQUFSOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBekpzQ1IsZUFBS3FDLEk7O2tCQUFsQzVELG9CIiwiZmlsZSI6Im9yZGVyQ29tcG9uZW50bGlzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5pbXBvcnQgeyBhbGVydCwgdG9hc3QgfSBmcm9tICcuLi91dGlscyc7XG5pbXBvcnQgeyBnZXQgfSBmcm9tICcuLi91dGlscy9hamF4JztcbmltcG9ydCBFbXB0eVBhZ2UgZnJvbSAnLi4vY29tcG9uZW50cy9FbXB0eVBhZ2UnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcnRpY2xlQ29tcG9uZW50TGlzdCBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn6aKE57qm5YiX6KGoJyxcbiAgICAgICAgZGlzYWJsZVNjcm9sbDogdHJ1ZSxcbiAgICB9XG4gICAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcIkVtcHR5UGFnZVwiOnt9fTtcclxuJGV2ZW50cyA9IHt9O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICAgICAgRW1wdHlQYWdlLFxuICAgIH1cbiAgICBkYXRhID0ge1xuICAgICAgICBoZWlnaHQ6ICcnLFxuICAgICAgICBlZGl0U3RhdHVzOiBmYWxzZSxcbiAgICAgICAgZ3JvdXBMaXN0OiBbXSxcbiAgICAgICAgZGVsTGlzdDogW10sXG4gICAgICAgIGlkOiAnJyxcbiAgICAgICAgcmVzb3VyY2VHcm91cDogJycsXG4gICAgICAgIG1wSWQ6ICcnLFxuICAgICAgICBwYWdlU2l6ZTogMTAwLFxuICAgICAgICBwYWdlTnVtOiAxLFxuICAgICAgICBuYW1lOiAnJyxcbiAgICAgICAgdGl0bGU6ICfmsqHmnInpooTnuqbmnI3liqF+JyxcbiAgICAgICAgaXNMb2FkaW5nOiB0cnVlLFxuICAgIH1cbiAgICBvbkxvYWQob3B0aW9uKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCB7IGlkID0gJycsIG5hbWUgPSAnJyB9ID0gb3B0aW9uO1xuICAgICAgICAgICAgdGhpcy5yZXNvdXJjZUdyb3VwID0gaWQ7XG4gICAgICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICAgICAgY29uc3QgbXBJZCA9IHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ2N1cnJlbnRfbXBpZCcpO1xuICAgICAgICAgICAgdGhpcy5tcElkID0gbXBJZDtcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICAgICAgICBjb25zdCB7IHdpbmRvd0hlaWdodCB9ID0gd2VweS5nZXRTeXN0ZW1JbmZvU3luYygpO1xuICAgICAgICAgICAgY29uc3QgaGVpZ2h0ID0gd2luZG93SGVpZ2h0O1xuICAgICAgICAgICAgdGhpcy5oZWlnaHQgPSBgJHsoaGVpZ2h0ICogMikgLSAoODggKiAyKSAtICg0MCAqIDIpIC0gOTZ9cnB4YDtcbiAgICAgICAgICAgIHRoaXMubG9hZExpc3QoKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgb25SZWFjaEJvdHRvbSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzbG9hZGluZykgcmV0dXJuO1xuICAgICAgICBjb25zdCBwYWdlTnVtID0gdGhpcy5wYWdlTnVtICsgMTtcbiAgICAgICAgdGhpcy5wYWdlTnVtID0gcGFnZU51bTtcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgICAgdGhpcy5sb2FkTGlzdCgpO1xuICAgIH1cbiAgICBhc3luYyBsb2FkTGlzdCgpIHtcbiAgICAgICAgY29uc3QgeyBkYXRhIH0gPSBhd2FpdCBnZXQoYC9idXNpbmVzc1NlcnZpY2UvbGlzdEJ5UGFnZUZvclVzZXI/cmVzb3VyY2VHcm91cD0ke3RoaXMucmVzb3VyY2VHcm91cH0mc3RhdHVzPTBgLCB7XG4gICAgICAgICAgICBwYWdlU2l6ZTogMTAwLFxuICAgICAgICAgICAgcGFnZU51bTogMSxcbiAgICAgICAgICAgIG1waWQ6IHRoaXMubXBJZCxcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICh0aGlzLnBhZ2VOdW0gPT09IDEgJiYgKGRhdGEubGVuZ3RoID09PSAwIHx8ICFkYXRhKSkge1xuICAgICAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIC8vIHRvYXN0KCfmsqHmnInmlbDmja4nKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5wYWdlTnVtID4gMSAmJiBkYXRhLmxlbmd0aCA8IHRoaXMucGFnZVN6aWUpIHtcbiAgICAgICAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB0b2FzdCgn5rKh5pyJ5pu05aSa5pWw5o2uJyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZGF0YS5mb3JlYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihpdGVtLCB7XG4gICAgICAgICAgICAgICAgY2hvc2VTdGF0dTogZmFsc2UsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuZ3JvdXBMaXN0ID0gdGhpcy5wYWdlTnVtID09PSAxID8gZGF0YSA6IHRoaXMuZ3JvdXBMaXN0LmNvbmNhdChkYXRhKTtcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICB9XG4gICAgZWRpdENob3NlKGlkLCBpbmRleCkge1xuICAgICAgICBpZiAodGhpcy5pc0VkaXRpbmcpIHtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLmdyb3VwTGlzdFtpbmRleF07XG4gICAgICAgICAgICBjb25zdCBpdGVtSW5kZXggPSB0aGlzLmRlbExpc3QubGVuZ3RoID09PSAwID8gLTIgOiB0aGlzLmRlbExpc3QuaW5kZXhPZihpZCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhpdGVtSW5kZXgpO1xuICAgICAgICAgICAgaWYgKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICBpdGVtLmNob3NlU3RhdHUgPSAhaXRlbS5jaG9zZVN0YXR1O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGl0ZW1JbmRleCA8IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRlbExpc3QucHVzaChpZCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuZGVsTGlzdC5zcGxpY2UoaXRlbUluZGV4LCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmRlbExpc3QpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIOeCueWHu+i3s+i9rOivpuaDhemhtemdolxuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgdXJsOiBgb3JkZXJDb21wb25lbnREZXRhaWw/aWQ9JHtpZH0mcmVzb3VyY2VHcm91cD0ke3RoaXMucmVzb3VyY2VHcm91cH1gLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgZWRpdCgpIHtcbiAgICAgICAgdGhpcy5lZGl0U3RhdHVzID0gdHJ1ZTtcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICB9XG4gICAgYXN5bmMgdG9EZWxldGUoKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCB7IGRlbExpc3QgfSA9IHRoaXM7XG4gICAgICAgICAgICBpZiAoZGVsTGlzdC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICBhbGVydCgn6K+36YCJ5oup6KaB5Yig6Zmk55qE5pyN5YqhJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgaWRzID0gZGVsTGlzdC5qb2luKCk7XG4gICAgICAgICAgICBhd2FpdCBnZXQoJy9idXNpbmVzc1NlcnZpY2UvZGVsR3JvdXAvMCcsIHtcbiAgICAgICAgICAgICAgICBpZHM6IGlkcyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgYWxlcnQoJ+WIoOmZpOaIkOWKn++8gScpO1xuICAgICAgICAgICAgdGhpcy5sb2FkTGlzdCgpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgICAgICAgIGFsZXJ0KCfor6XmnI3liqHlnKjmqKHmnb/kuK3ooqvlupTnlKjvvIzkuI3og73ooqvliKDpmaQnKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmVkaXRTdGF0dXMgPSBmYWxzZTtcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICB9XG4gICAgY2FuY2xlKCkge1xuICAgICAgICBjb25zdCBkYXRhTGlzdCA9IHRoaXMubGlzdERhdGE7XG4gICAgICAgIGRhdGFMaXN0LmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGl0ZW0sIHtcbiAgICAgICAgICAgICAgICBjaG9zZVN0YXR1OiBmYWxzZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5lZGl0U3RhdHVzID0gZmFsc2U7XG4gICAgICAgIHRoaXMubGlzdERhdGEgPSBkYXRhTGlzdDtcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICB9XG4gICAgYWRkR3JvdXAoKSB7XG4gICAgICAgIC8vIOa3u+WKoOmihOe6puacjeWKoVxuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgdXJsOiBgb3JkZXJDb21wb25lbnRFZGl0P3Jlc291cmNlR3JvdXA9JHt0aGlzLmlkfWAsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBhc3luYyBtYW5hZ2VQcm9kdWN0KGUpIHtcbiAgICAgICAgY29uc3QgeyBzdGF0dXMsIGlkIH0gPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pdGVtO1xuICAgICAgICBsZXQgbXNnO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgYXdhaXQgZ2V0KCcvYnVzaW5lc3NTZXJ2aWNlL3VwZGF0ZScsIHtcbiAgICAgICAgICAgICAgICBpZCxcbiAgICAgICAgICAgICAgICBzdGF0dXMsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChzdGF0dXMgPT09IDApIHtcbiAgICAgICAgICAgICAgICBtc2cgPSAn5LiK5p625oiQ5YqfJztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc3RhdHVzID09PSAyKSB7XG4gICAgICAgICAgICAgICAgbXNnID0gJ+S4i+aetuaIkOWKnyc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0b2FzdChtc2cpO1xuICAgICAgICAgICAgdGhpcy5wYWdlTnVtID0gMTtcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICAgICAgICB0aGlzLmxvYWREYXRhKCk7XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==