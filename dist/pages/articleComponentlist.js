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

var pageNum = 1;
var pageSize = 20;

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
            name: '',
            title: '没有文章~'
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
                                return (0, _ajax.get)('/businessArticle/list', {
                                    pageSize: pageSize,
                                    pageNum: pageNum,
                                    group: this.id
                                });

                            case 3:
                                _ref3 = _context.sent;
                                data = _ref3.data;

                                data.foreach(function (item) {
                                    Object.assign(item, {
                                        choseStatu: false
                                    });
                                });
                                this.listData = data;
                                this.$apply();

                            case 8:
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
            // 点击跳转文章详情页面
            _wepy2.default.navigateTo({
                url: 'articleDetail?id=' + id
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
                                delList = this.delList;

                                if (!(delList.length === 0)) {
                                    _context2.next = 4;
                                    break;
                                }

                                (0, _utils.alert)('请选择要删除的文章');
                                return _context2.abrupt('return');

                            case 4:
                                ids = delList.join();
                                _context2.next = 7;
                                return (0, _ajax.get)('/businessArticle/delete/0', {
                                    ids: ids
                                });

                            case 7:
                                (0, _utils.alert)('删除成功！');
                                this.loadList();
                                this.editStatus = false;
                                this.$apply();

                            case 11:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
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
        key: 'addArticleGroup',
        value: function addArticleGroup() {
            _wepy2.default.navigateTo({
                url: 'articleGroup?id=' + this.id
            });
        }
    }]);

    return ArticleComponentList;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(ArticleComponentList , 'pages/articleComponentlist'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFydGljbGVDb21wb25lbnRsaXN0LmpzIl0sIm5hbWVzIjpbInBhZ2VOdW0iLCJwYWdlU2l6ZSIsIkFydGljbGVDb21wb25lbnRMaXN0IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRpc2FibGVTY3JvbGwiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJFbXB0eVBhZ2UiLCJkYXRhIiwiaGVpZ2h0IiwiZWRpdFN0YXR1cyIsImxpc3REYXRhIiwiZGVsTGlzdCIsImlkIiwibmFtZSIsInRpdGxlIiwib3B0aW9uIiwiJGFwcGx5Iiwid2VweSIsImdldFN5c3RlbUluZm9TeW5jIiwid2luZG93SGVpZ2h0IiwibG9hZExpc3QiLCJlIiwiY29uc29sZSIsImxvZyIsImdyb3VwIiwiZm9yZWFjaCIsIk9iamVjdCIsImFzc2lnbiIsIml0ZW0iLCJjaG9zZVN0YXR1IiwiY3VycmVudFRhcmdldCIsImRhdGFzZXQiLCJzZWxBcnIiLCJkYXRhTGlzdCIsImluZGV4IiwibGVuZ3RoIiwiaW5kZXhPZiIsInB1c2giLCJmb3JFYWNoIiwic3BsaWNlIiwibmF2aWdhdGVUbyIsInVybCIsImlkcyIsImpvaW4iLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsVUFBVSxDQUFoQjtBQUNBLElBQU1DLFdBQVcsRUFBakI7O0lBQ3FCQyxvQjs7Ozs7Ozs7Ozs7Ozs7c05BQ2pCQyxNLEdBQVM7QUFDTEMsb0NBQXdCLE1BRG5CO0FBRUxDLDJCQUFlO0FBRlYsUyxRQUlWQyxPLEdBQVUsRSxRQUNiQyxNLEdBQVMsRUFBQyxhQUFZLEVBQWIsRSxRQUNUQyxPLEdBQVUsRSxRQUNUQyxVLEdBQWE7QUFDTkM7QUFETSxTLFFBR1ZDLEksR0FBTztBQUNIQyxvQkFBUSxFQURMO0FBRUhDLHdCQUFZLEtBRlQ7QUFHSEMsc0JBQVUsRUFIUDtBQUlIQyxxQkFBUyxFQUpOO0FBS0hDLGdCQUFJLEVBTEQ7QUFNSEMsa0JBQU0sRUFOSDtBQU9IQyxtQkFBTztBQVBKLFM7Ozs7OytCQVNBQyxNLEVBQVE7QUFDWCxnQkFBSTtBQUFBLGlDQUMrQkEsTUFEL0IsQ0FDUUgsRUFEUjtBQUFBLG9CQUNRQSxFQURSLDhCQUNhLEVBRGI7QUFBQSxtQ0FDK0JHLE1BRC9CLENBQ2lCRixJQURqQjtBQUFBLG9CQUNpQkEsSUFEakIsZ0NBQ3dCLEVBRHhCOztBQUVBLHFCQUFLRCxFQUFMLEdBQVVBLEVBQVY7QUFDQSxxQkFBS0MsSUFBTCxHQUFZQSxJQUFaO0FBQ0EscUJBQUtHLE1BQUw7O0FBSkEsNENBS3lCQyxlQUFLQyxpQkFBTCxFQUx6QjtBQUFBLG9CQUtRQyxZQUxSLHlCQUtRQSxZQUxSOztBQU1BLG9CQUFNWCxTQUFTVyxZQUFmO0FBQ0EscUJBQUtYLE1BQUwsR0FBa0JBLFNBQVMsQ0FBVixHQUFnQixLQUFLLENBQXJCLEdBQTJCLEtBQUssQ0FBaEMsR0FBcUMsRUFBdEQ7QUFDQSxxQkFBS1ksUUFBTDtBQUNILGFBVEQsQ0FTRSxPQUFPQyxDQUFQLEVBQVU7QUFDUkMsd0JBQVFDLEdBQVIsQ0FBWUYsQ0FBWjtBQUNIO0FBQ0o7Ozs7Ozs7Ozs7O0FBR0dDLHdDQUFRQyxHQUFSLENBQVksVUFBWjs7dUNBQ3VCLGVBQUksdUJBQUosRUFBNkI7QUFDaEQxQiw4Q0FBVUEsUUFEc0M7QUFFaERELDZDQUFTQSxPQUZ1QztBQUdoRDRCLDJDQUFPLEtBQUtaO0FBSG9DLGlDQUE3QixDOzs7O0FBQWZMLG9DLFNBQUFBLEk7O0FBS1JBLHFDQUFLa0IsT0FBTCxDQUFhLGdCQUFRO0FBQ2pCQywyQ0FBT0MsTUFBUCxDQUFjQyxJQUFkLEVBQW9CO0FBQ2hCQyxvREFBWTtBQURJLHFDQUFwQjtBQUdILGlDQUpEO0FBS0EscUNBQUtuQixRQUFMLEdBQWdCSCxJQUFoQjtBQUNBLHFDQUFLUyxNQUFMOzs7Ozs7Ozs7Ozs7Ozs7Ozs7a0NBRU1LLEMsRUFBRztBQUFBLGdCQUNEVCxFQURDLEdBQ01TLEVBQUVTLGFBQUYsQ0FBZ0JDLE9BQWhCLENBQXdCSCxJQUQ5QixDQUNEaEIsRUFEQzs7QUFFVCxnQkFBSSxLQUFLSCxVQUFULEVBQXFCO0FBQ2pCLG9CQUFNdUIsU0FBUyxLQUFLckIsT0FBcEI7QUFDQSxvQkFBTXNCLFdBQVcsS0FBS3ZCLFFBQXRCO0FBQ0Esb0JBQU13QixRQUFRLEtBQUt2QixPQUFMLENBQWF3QixNQUFiLEtBQXdCLENBQXhCLEdBQTRCLENBQUMsQ0FBN0IsR0FBaUMsS0FBS3hCLE9BQUwsQ0FBYXlCLE9BQWIsQ0FBcUJ4QixFQUFyQixDQUEvQztBQUNBLG9CQUFJc0IsUUFBUSxDQUFaLEVBQWU7QUFDWEYsMkJBQU9LLElBQVAsQ0FBWXpCLEVBQVo7QUFDQXFCLDZCQUFTSyxPQUFULENBQWlCLGdCQUFRO0FBQ3JCLDRCQUFJVixLQUFLaEIsRUFBTCxLQUFZQSxFQUFoQixFQUFvQjtBQUNoQmMsbUNBQU9DLE1BQVAsQ0FBY0MsSUFBZCxFQUFvQjtBQUNoQkMsNENBQVk7QUFESSw2QkFBcEI7QUFHSDtBQUNKLHFCQU5EO0FBT0gsaUJBVEQsTUFTTztBQUNISSw2QkFBU0ssT0FBVCxDQUFpQixnQkFBUTtBQUNyQiw0QkFBSVYsS0FBS2hCLEVBQUwsS0FBWUEsRUFBaEIsRUFBb0I7QUFDaEJjLG1DQUFPQyxNQUFQLENBQWNDLElBQWQsRUFBb0I7QUFDaEJDLDRDQUFZO0FBREksNkJBQXBCO0FBR0g7QUFDSixxQkFORDtBQU9BRywyQkFBT08sTUFBUCxDQUFjTCxLQUFkLEVBQXFCLENBQXJCO0FBQ0g7QUFDRCxxQkFBS3hCLFFBQUwsR0FBZ0J1QixRQUFoQjtBQUNBLHFCQUFLdEIsT0FBTCxHQUFlcUIsTUFBZjtBQUNBLHFCQUFLaEIsTUFBTDtBQUNBO0FBQ0g7QUFDRDtBQUNBQywyQkFBS3VCLFVBQUwsQ0FBZ0I7QUFDWkMsMkNBQXlCN0I7QUFEYixhQUFoQjtBQUdIOzs7K0JBQ007QUFDSCxpQkFBS0gsVUFBTCxHQUFrQixJQUFsQjtBQUNBLGlCQUFLTyxNQUFMO0FBQ0g7Ozs7Ozs7Ozs7QUFFV0wsdUMsR0FBWSxJLENBQVpBLE87O3NDQUNKQSxRQUFRd0IsTUFBUixLQUFtQixDOzs7OztBQUNuQixrREFBTSxXQUFOOzs7O0FBR0VPLG1DLEdBQU0vQixRQUFRZ0MsSUFBUixFOzt1Q0FDTixlQUFJLDJCQUFKLEVBQWlDO0FBQ25DRCx5Q0FBS0E7QUFEOEIsaUNBQWpDLEM7OztBQUdOLGtEQUFNLE9BQU47QUFDQSxxQ0FBS3RCLFFBQUw7QUFDQSxxQ0FBS1gsVUFBTCxHQUFrQixLQUFsQjtBQUNBLHFDQUFLTyxNQUFMOzs7Ozs7Ozs7Ozs7Ozs7Ozs7aUNBRUs7QUFDTCxnQkFBTWlCLFdBQVcsS0FBS3ZCLFFBQXRCO0FBQ0F1QixxQkFBU0ssT0FBVCxDQUFpQixnQkFBUTtBQUNyQlosdUJBQU9DLE1BQVAsQ0FBY0MsSUFBZCxFQUFvQjtBQUNoQkMsZ0NBQVk7QUFESSxpQkFBcEI7QUFHSCxhQUpEO0FBS0EsaUJBQUtwQixVQUFMLEdBQWtCLEtBQWxCO0FBQ0EsaUJBQUtDLFFBQUwsR0FBZ0J1QixRQUFoQjtBQUNBLGlCQUFLakIsTUFBTDtBQUNIOzs7MENBQ2lCO0FBQ2RDLDJCQUFLdUIsVUFBTCxDQUFnQjtBQUNaQywwQ0FBd0IsS0FBSzdCO0FBRGpCLGFBQWhCO0FBR0g7Ozs7RUF2SDZDSyxlQUFLMkIsSTs7a0JBQWxDOUMsb0IiLCJmaWxlIjoiYXJ0aWNsZUNvbXBvbmVudGxpc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XHJcbmltcG9ydCB7IGFsZXJ0IH0gZnJvbSAnLi4vdXRpbHMnO1xyXG5pbXBvcnQgeyBnZXQgfSBmcm9tICcuLi91dGlscy9hamF4JztcclxuaW1wb3J0IEVtcHR5UGFnZSBmcm9tICcuLi9jb21wb25lbnRzL0VtcHR5UGFnZSc7XHJcblxyXG5jb25zdCBwYWdlTnVtID0gMTtcclxuY29uc3QgcGFnZVNpemUgPSAyMDtcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXJ0aWNsZUNvbXBvbmVudExpc3QgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gICAgY29uZmlnID0ge1xyXG4gICAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmlofnq6DnrqHnkIYnLFxyXG4gICAgICAgIGRpc2FibGVTY3JvbGw6IHRydWUsXHJcbiAgICB9XHJcbiAgICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1wiRW1wdHlQYWdlXCI6e319O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xyXG4gICAgICAgIEVtcHR5UGFnZSxcclxuICAgIH1cclxuICAgIGRhdGEgPSB7XHJcbiAgICAgICAgaGVpZ2h0OiAnJyxcclxuICAgICAgICBlZGl0U3RhdHVzOiBmYWxzZSxcclxuICAgICAgICBsaXN0RGF0YTogW10sXHJcbiAgICAgICAgZGVsTGlzdDogW10sXHJcbiAgICAgICAgaWQ6ICcnLFxyXG4gICAgICAgIG5hbWU6ICcnLFxyXG4gICAgICAgIHRpdGxlOiAn5rKh5pyJ5paH56ugficsXHJcbiAgICB9XHJcbiAgICBvbkxvYWQob3B0aW9uKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3QgeyBpZCA9ICcnLCBuYW1lID0gJycgfSA9IG9wdGlvbjtcclxuICAgICAgICAgICAgdGhpcy5pZCA9IGlkO1xyXG4gICAgICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgICAgICBjb25zdCB7IHdpbmRvd0hlaWdodCB9ID0gd2VweS5nZXRTeXN0ZW1JbmZvU3luYygpO1xyXG4gICAgICAgICAgICBjb25zdCBoZWlnaHQgPSB3aW5kb3dIZWlnaHQ7XHJcbiAgICAgICAgICAgIHRoaXMuaGVpZ2h0ID0gYCR7KGhlaWdodCAqIDIpIC0gKDg4ICogMikgLSAoNDAgKiAyKSAtIDk2fXJweGA7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZExpc3QoKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBsb2FkTGlzdCgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnbG9hZGxpc3QnKTtcclxuICAgICAgICBjb25zdCB7IGRhdGEgfSA9IGF3YWl0IGdldCgnL2J1c2luZXNzQXJ0aWNsZS9saXN0Jywge1xyXG4gICAgICAgICAgICBwYWdlU2l6ZTogcGFnZVNpemUsXHJcbiAgICAgICAgICAgIHBhZ2VOdW06IHBhZ2VOdW0sXHJcbiAgICAgICAgICAgIGdyb3VwOiB0aGlzLmlkLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGRhdGEuZm9yZWFjaChpdGVtID0+IHtcclxuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihpdGVtLCB7XHJcbiAgICAgICAgICAgICAgICBjaG9zZVN0YXR1OiBmYWxzZSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5saXN0RGF0YSA9IGRhdGE7XHJcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgIH1cclxuICAgIGVkaXRDaG9zZShlKSB7XHJcbiAgICAgICAgY29uc3QgeyBpZCB9ID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaXRlbTtcclxuICAgICAgICBpZiAodGhpcy5lZGl0U3RhdHVzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNlbEFyciA9IHRoaXMuZGVsTGlzdDtcclxuICAgICAgICAgICAgY29uc3QgZGF0YUxpc3QgPSB0aGlzLmxpc3REYXRhO1xyXG4gICAgICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuZGVsTGlzdC5sZW5ndGggPT09IDAgPyAtMiA6IHRoaXMuZGVsTGlzdC5pbmRleE9mKGlkKTtcclxuICAgICAgICAgICAgaWYgKGluZGV4IDwgMCkge1xyXG4gICAgICAgICAgICAgICAgc2VsQXJyLnB1c2goaWQpO1xyXG4gICAgICAgICAgICAgICAgZGF0YUxpc3QuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5pZCA9PT0gaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihpdGVtLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaG9zZVN0YXR1OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGRhdGFMaXN0LmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0uaWQgPT09IGlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oaXRlbSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hvc2VTdGF0dTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgc2VsQXJyLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5saXN0RGF0YSA9IGRhdGFMaXN0O1xyXG4gICAgICAgICAgICB0aGlzLmRlbExpc3QgPSBzZWxBcnI7XHJcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g54K55Ye76Lez6L2s5paH56ug6K+m5oOF6aG16Z2iXHJcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgdXJsOiBgYXJ0aWNsZURldGFpbD9pZD0ke2lkfWAsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBlZGl0KCkge1xyXG4gICAgICAgIHRoaXMuZWRpdFN0YXR1cyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgIH1cclxuICAgIGFzeW5jIHRvRGVsZXRlKCkge1xyXG4gICAgICAgIGNvbnN0IHsgZGVsTGlzdCB9ID0gdGhpcztcclxuICAgICAgICBpZiAoZGVsTGlzdC5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgYWxlcnQoJ+ivt+mAieaLqeimgeWIoOmZpOeahOaWh+eroCcpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGlkcyA9IGRlbExpc3Quam9pbigpO1xyXG4gICAgICAgIGF3YWl0IGdldCgnL2J1c2luZXNzQXJ0aWNsZS9kZWxldGUvMCcsIHtcclxuICAgICAgICAgICAgaWRzOiBpZHMsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgYWxlcnQoJ+WIoOmZpOaIkOWKn++8gScpO1xyXG4gICAgICAgIHRoaXMubG9hZExpc3QoKTtcclxuICAgICAgICB0aGlzLmVkaXRTdGF0dXMgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgfVxyXG4gICAgY2FuY2xlKCkge1xyXG4gICAgICAgIGNvbnN0IGRhdGFMaXN0ID0gdGhpcy5saXN0RGF0YTtcclxuICAgICAgICBkYXRhTGlzdC5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGl0ZW0sIHtcclxuICAgICAgICAgICAgICAgIGNob3NlU3RhdHU6IGZhbHNlLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmVkaXRTdGF0dXMgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmxpc3REYXRhID0gZGF0YUxpc3Q7XHJcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgIH1cclxuICAgIGFkZEFydGljbGVHcm91cCgpIHtcclxuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICB1cmw6IGBhcnRpY2xlR3JvdXA/aWQ9JHt0aGlzLmlkfWAsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuIl19