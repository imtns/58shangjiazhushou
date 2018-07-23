'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _ajax = require('./../utils/ajax.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var basicTemplateUrl = '/business/templateList';
var myTemplateUrl = '/business/myTemplateList/' + wx.getStorageSync('current_mpid');
var getTemplateIdUrl = '/business/init/struct';
var app = require('./../utils/globalData.js');

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
            navigationBarTitleText: '店铺装修'
        }, _this.data = {
            left: 160,
            tabSelect: 1,
            my: true,
            delLayer: false,
            list: {},
            status: {
                '-2': '删除',
                '-1': '初始化',
                0: '未审核',
                1: '审核中',
                2: '审核成功',
                3: '审核失败',
                4: '已上线',
                5: '保存'
            }
        }, _this.methods = {
            tabClick: function tabClick(e) {
                this.list = null;
                var _e$target$dataset = e.target.dataset,
                    distance = _e$target$dataset.distance,
                    id = _e$target$dataset.id;

                this.left = distance;
                console.log(id);
                this.tabSelect = id;
                this.my = id === '1';
                if (this.my) {
                    this.loadMyTemplate();
                } else {
                    this.loadBasicTemplate();
                }
            },
            showDelLayer: function showDelLayer() {
                this.delLayer = true;
            },
            del: function del(e) {
                var id = e.target.dataset.id;

                console.log(id);
            },
            closeLayer: function closeLayer() {
                this.delLayer = false;
            },
            goEdit: function () {
                var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(e) {
                    var releaseid, id, _ref3, data;

                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    if (!this.my) {
                                        _context.next = 5;
                                        break;
                                    }

                                    releaseid = e.currentTarget.dataset.releaseid;

                                    wx.setStorageSync('releaseId', releaseid);
                                    _context.next = 11;
                                    break;

                                case 5:
                                    id = e.currentTarget.dataset.id;
                                    _context.next = 8;
                                    return (0, _ajax.get)(getTemplateIdUrl, {
                                        templeteid: id,
                                        mpId: wx.getStorageSync('current_mpid')
                                    });

                                case 8:
                                    _ref3 = _context.sent;
                                    data = _ref3.data;

                                    wx.setStorageSync('releaseId', data.id);

                                case 11:
                                    wx.navigateTo({
                                        url: 'index/index'
                                    });

                                case 12:
                                case 'end':
                                    return _context.stop();
                            }
                        }
                    }, _callee, this);
                }));

                function goEdit(_x) {
                    return _ref2.apply(this, arguments);
                }

                return goEdit;
            }()
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Index, [{
        key: 'onLoad',
        value: function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                this.loadMyTemplate();

                            case 1:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function onLoad() {
                return _ref4.apply(this, arguments);
            }

            return onLoad;
        }()
    }, {
        key: 'loadBasicTemplate',
        value: function () {
            var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
                var _ref6, data;

                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _context3.next = 2;
                                return (0, _ajax.get)(basicTemplateUrl, {
                                    pageNum: 1,
                                    pageSize: 20,
                                    mpId: wx.getStorageSync('current_mpid'),
                                    cate: -1
                                });

                            case 2:
                                _ref6 = _context3.sent;
                                data = _ref6.data;

                                this.list = data;
                                this.$apply();

                            case 6:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function loadBasicTemplate() {
                return _ref5.apply(this, arguments);
            }

            return loadBasicTemplate;
        }()
    }, {
        key: 'loadMyTemplate',
        value: function () {
            var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
                var _ref8, data;

                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                console.log(app.globalData.extConfig);
                                _context4.next = 3;
                                return (0, _ajax.get)(myTemplateUrl, {
                                    pageNum: 1,
                                    pageSize: 20,
                                    v: 2,
                                    appid: app.globalData.extConfig.appId
                                });

                            case 3:
                                _ref8 = _context4.sent;
                                data = _ref8.data;

                                this.list = data;
                                this.$apply();

                            case 7:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));

            function loadMyTemplate() {
                return _ref7.apply(this, arguments);
            }

            return loadMyTemplate;
        }()
    }]);

    return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/templateList'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlbXBsYXRlTGlzdC5qcyJdLCJuYW1lcyI6WyJiYXNpY1RlbXBsYXRlVXJsIiwibXlUZW1wbGF0ZVVybCIsInd4IiwiZ2V0U3RvcmFnZVN5bmMiLCJnZXRUZW1wbGF0ZUlkVXJsIiwiYXBwIiwicmVxdWlyZSIsIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJsZWZ0IiwidGFiU2VsZWN0IiwibXkiLCJkZWxMYXllciIsImxpc3QiLCJzdGF0dXMiLCJtZXRob2RzIiwidGFiQ2xpY2siLCJlIiwidGFyZ2V0IiwiZGF0YXNldCIsImRpc3RhbmNlIiwiaWQiLCJjb25zb2xlIiwibG9nIiwibG9hZE15VGVtcGxhdGUiLCJsb2FkQmFzaWNUZW1wbGF0ZSIsInNob3dEZWxMYXllciIsImRlbCIsImNsb3NlTGF5ZXIiLCJnb0VkaXQiLCJyZWxlYXNlaWQiLCJjdXJyZW50VGFyZ2V0Iiwic2V0U3RvcmFnZVN5bmMiLCJ0ZW1wbGV0ZWlkIiwibXBJZCIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJwYWdlTnVtIiwicGFnZVNpemUiLCJjYXRlIiwiJGFwcGx5IiwiZ2xvYmFsRGF0YSIsImV4dENvbmZpZyIsInYiLCJhcHBpZCIsImFwcElkIiwid2VweSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsbUJBQW1CLHdCQUF6QjtBQUNBLElBQU1DLDhDQUE0Q0MsR0FBR0MsY0FBSCxDQUFrQixjQUFsQixDQUFsRDtBQUNBLElBQU1DLG1CQUFtQix1QkFBekI7QUFDQSxJQUFNQyxNQUFNQyxRQUFRLHFCQUFSLENBQVo7O0lBRXFCQyxLOzs7Ozs7Ozs7Ozs7Ozt3TEFDbkJDLE0sR0FBUztBQUNMQyxvQ0FBd0I7QUFEbkIsUyxRQUdUQyxJLEdBQU87QUFDSEMsa0JBQU0sR0FESDtBQUVIQyx1QkFBVyxDQUZSO0FBR0hDLGdCQUFJLElBSEQ7QUFJSEMsc0JBQVUsS0FKUDtBQUtI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OENBQVUsRUFGNEI7QUFHdENLLHVDQUFHLENBSG1DO0FBSXRDQywyQ0FBT3pDLElBQUlzQyxVQUFKLENBQWVDLFNBQWYsQ0FBeUJHO0FBSk0saUNBQW5CLEM7Ozs7QUFBZnJDLG9DLFNBQUFBLEk7O0FBTVIscUNBQUtLLElBQUwsR0FBWUwsSUFBWjtBQUNBLHFDQUFLZ0MsTUFBTDs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQWhGNkJNLGVBQUtDLEk7O2tCQUFuQjFDLEsiLCJmaWxlIjoidGVtcGxhdGVMaXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xyXG5pbXBvcnQgeyBnZXQgfSBmcm9tICcuLi91dGlscy9hamF4JztcclxuXHJcbmNvbnN0IGJhc2ljVGVtcGxhdGVVcmwgPSAnL2J1c2luZXNzL3RlbXBsYXRlTGlzdCc7XHJcbmNvbnN0IG15VGVtcGxhdGVVcmwgPSBgL2J1c2luZXNzL215VGVtcGxhdGVMaXN0LyR7d3guZ2V0U3RvcmFnZVN5bmMoJ2N1cnJlbnRfbXBpZCcpfWA7XHJcbmNvbnN0IGdldFRlbXBsYXRlSWRVcmwgPSAnL2J1c2luZXNzL2luaXQvc3RydWN0JztcclxuY29uc3QgYXBwID0gcmVxdWlyZSgnLi4vdXRpbHMvZ2xvYmFsRGF0YScpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gIGNvbmZpZyA9IHtcclxuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+W6l+mTuuijheS/ricsXHJcbiAgfTtcclxuICBkYXRhID0ge1xyXG4gICAgICBsZWZ0OiAxNjAsXHJcbiAgICAgIHRhYlNlbGVjdDogMSxcclxuICAgICAgbXk6IHRydWUsXHJcbiAgICAgIGRlbExheWVyOiBmYWxzZSxcclxuICAgICAgbGlzdDoge30sXHJcbiAgICAgIHN0YXR1czoge1xyXG4gICAgICAgICAgJy0yJzogJ+WIoOmZpCcsXHJcbiAgICAgICAgICAnLTEnOiAn5Yid5aeL5YyWJyxcclxuICAgICAgICAgIDA6ICfmnKrlrqHmoLgnLFxyXG4gICAgICAgICAgMTogJ+WuoeaguOS4rScsXHJcbiAgICAgICAgICAyOiAn5a6h5qC45oiQ5YqfJyxcclxuICAgICAgICAgIDM6ICflrqHmoLjlpLHotKUnLFxyXG4gICAgICAgICAgNDogJ+W3suS4iue6vycsXHJcbiAgICAgICAgICA1OiAn5L+d5a2YJyxcclxuICAgICAgfSxcclxuICB9O1xyXG4gIGFzeW5jIG9uTG9hZCgpIHtcclxuICAgICAgdGhpcy5sb2FkTXlUZW1wbGF0ZSgpO1xyXG4gIH1cclxuICBtZXRob2RzID0ge1xyXG4gICAgICB0YWJDbGljayhlKSB7XHJcbiAgICAgICAgICB0aGlzLmxpc3QgPSBudWxsO1xyXG4gICAgICAgICAgY29uc3QgeyBkaXN0YW5jZSwgaWQgfSA9IGUudGFyZ2V0LmRhdGFzZXQ7XHJcbiAgICAgICAgICB0aGlzLmxlZnQgPSBkaXN0YW5jZTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKGlkKTtcclxuICAgICAgICAgIHRoaXMudGFiU2VsZWN0ID0gaWQ7XHJcbiAgICAgICAgICB0aGlzLm15ID0gaWQgPT09ICcxJztcclxuICAgICAgICAgIGlmICh0aGlzLm15KSB7IHRoaXMubG9hZE15VGVtcGxhdGUoKTsgfSBlbHNlIHsgdGhpcy5sb2FkQmFzaWNUZW1wbGF0ZSgpOyB9XHJcbiAgICAgIH0sXHJcbiAgICAgIHNob3dEZWxMYXllcigpIHtcclxuICAgICAgICAgIHRoaXMuZGVsTGF5ZXIgPSB0cnVlO1xyXG4gICAgICB9LFxyXG4gICAgICBkZWwoZSkge1xyXG4gICAgICAgICAgY29uc3QgeyBpZCB9ID0gZS50YXJnZXQuZGF0YXNldDtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKGlkKTtcclxuICAgICAgfSxcclxuICAgICAgY2xvc2VMYXllcigpIHtcclxuICAgICAgICAgIHRoaXMuZGVsTGF5ZXIgPSBmYWxzZTtcclxuICAgICAgfSxcclxuICAgICAgYXN5bmMgZ29FZGl0KGUpIHtcclxuICAgICAgICAgIGlmICh0aGlzLm15KSB7XHJcbiAgICAgICAgICAgICAgY29uc3QgeyByZWxlYXNlaWQgfSA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0O1xyXG4gICAgICAgICAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKCdyZWxlYXNlSWQnLCByZWxlYXNlaWQpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBjb25zdCB7IGlkIH0gPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldDtcclxuICAgICAgICAgICAgICBjb25zdCB7IGRhdGEgfSA9IGF3YWl0IGdldChnZXRUZW1wbGF0ZUlkVXJsLCB7XHJcbiAgICAgICAgICAgICAgICAgIHRlbXBsZXRlaWQ6IGlkLFxyXG4gICAgICAgICAgICAgICAgICBtcElkOiB3eC5nZXRTdG9yYWdlU3luYygnY3VycmVudF9tcGlkJyksXHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgd3guc2V0U3RvcmFnZVN5bmMoJ3JlbGVhc2VJZCcsIGRhdGEuaWQpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgd3gubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgICAgdXJsOiAnaW5kZXgvaW5kZXgnLFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgIH0sXHJcbiAgfTtcclxuICBhc3luYyBsb2FkQmFzaWNUZW1wbGF0ZSgpIHtcclxuICAgICAgY29uc3QgeyBkYXRhIH0gPSBhd2FpdCBnZXQoYmFzaWNUZW1wbGF0ZVVybCwge1xyXG4gICAgICAgICAgcGFnZU51bTogMSxcclxuICAgICAgICAgIHBhZ2VTaXplOiAyMCxcclxuICAgICAgICAgIG1wSWQ6IHd4LmdldFN0b3JhZ2VTeW5jKCdjdXJyZW50X21waWQnKSxcclxuICAgICAgICAgIGNhdGU6IC0xLFxyXG4gICAgICB9KTtcclxuICAgICAgdGhpcy5saXN0ID0gZGF0YTtcclxuICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICB9XHJcbiAgYXN5bmMgbG9hZE15VGVtcGxhdGUoKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGFwcC5nbG9iYWxEYXRhLmV4dENvbmZpZyk7XHJcbiAgICAgIGNvbnN0IHsgZGF0YSB9ID0gYXdhaXQgZ2V0KG15VGVtcGxhdGVVcmwsIHtcclxuICAgICAgICAgIHBhZ2VOdW06IDEsXHJcbiAgICAgICAgICBwYWdlU2l6ZTogMjAsXHJcbiAgICAgICAgICB2OiAyLFxyXG4gICAgICAgICAgYXBwaWQ6IGFwcC5nbG9iYWxEYXRhLmV4dENvbmZpZy5hcHBJZCxcclxuICAgICAgfSk7XHJcbiAgICAgIHRoaXMubGlzdCA9IGRhdGE7XHJcbiAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==