'use strict';

var _loadData = require('./loadData.js');

var _loadData2 = _interopRequireDefault(_loadData);

var _loadMore = require('./loadMore.js');

var _loadMore2 = _interopRequireDefault(_loadMore);

var _navigation = require('./navigation.js');

var _navigation2 = _interopRequireDefault(_navigation);

var _call = require('./call.js');

var _call2 = _interopRequireDefault(_call);

var _editLayer = require('./editLayer.js');

var _editLayer2 = _interopRequireDefault(_editLayer);

var _video = require('./../components/mod/video/video.js');

var _video2 = _interopRequireDefault(_video);

var _imageSwiper = require('./../components/mod/imageSwiper/imageSwiper.js');

var _imageSwiper2 = _interopRequireDefault(_imageSwiper);

var _evaluation = require('./../components/mod/evaluation/evaluation.js');

var _evaluation2 = _interopRequireDefault(_evaluation);

var _images = require('./../components/mod/images/images.js');

var _images2 = _interopRequireDefault(_images);

var _coupon = require('./../components/mod/coupon/coupon.js');

var _coupon2 = _interopRequireDefault(_coupon);

var _call3 = require('./../components/mod/call/call.js');

var _call4 = _interopRequireDefault(_call3);

var _me = require('./../components/mod/me/me.js');

var _me2 = _interopRequireDefault(_me);

var _pay = require('./../components/mod/pay/pay.js');

var _pay2 = _interopRequireDefault(_pay);

var _branch = require('./../components/mod/branch/branch.js');

var _branch2 = _interopRequireDefault(_branch);

var _userinfoAuthorize = require('./userinfoAuthorize.js');

var _userinfoAuthorize2 = _interopRequireDefault(_userinfoAuthorize);

var _tabBar = require('./../components/mod/tabBar/tabBar.js');

var _tabBar2 = _interopRequireDefault(_tabBar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var getPage = require('./../utils/getPage.js');
var app = require('./../utils/globalData.js');

var mixinConfig = {
    data: {
        supportVersion: true,
        detailShow: false,
        showUserinfoAuthorize: false,
        editLayer: {},
        isEditing: false,
        pageModule: {},
        tabBarItems: []
    },
    onLoad: function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
            var _wx$getSystemInfoSync, _wx$getSystemInfoSync2, model;

            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _wx$getSystemInfoSync = wx.getSystemInfoSync(), _wx$getSystemInfoSync2 = _wx$getSystemInfoSync.model, model = _wx$getSystemInfoSync2 === undefined ? '' : _wx$getSystemInfoSync2;

                            if (~model.toLowerCase().indexOf('iphone x')) {
                                app.globalData.isIphoneX = true;
                            }

                        case 2:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));

        function onLoad() {
            return _ref.apply(this, arguments);
        }

        return onLoad;
    }(),
    onReady: function onReady() {
        console.log(app);
        this.onPageReady();
    },
    onShow: function onShow() {
        this.refreshPage();
    },
    onPageReady: function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
            var _app$globalData, _app$globalData$extCo, extConfig, isIphoneX, _app$globalData$tabBa, list, tabBarItems;

            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            if (wx.getExtConfigSync) {
                                _context2.next = 3;
                                break;
                            }

                            this.setData({ supportVersion: false });
                            return _context2.abrupt('return');

                        case 3:
                            _context2.next = 5;
                            return this.loadTabbar();

                        case 5:
                            _context2.next = 7;
                            return this.loadData();

                        case 7:
                            _context2.next = 9;
                            return this.loadPageList();

                        case 9:
                            _app$globalData = app.globalData, _app$globalData$extCo = _app$globalData.extConfig, extConfig = _app$globalData$extCo === undefined ? {} : _app$globalData$extCo, isIphoneX = _app$globalData.isIphoneX;
                            // const { tabBar = {}, mpSource = '', extraInfo = null } = extConfig.extJson;

                            _app$globalData$tabBa = app.globalData.tabBar.list, list = _app$globalData$tabBa === undefined ? [] : _app$globalData$tabBa;

                            console.log(extConfig.extJson);
                            // app.globalData.tabMode = extConfig.extJson.tabMode;
                            tabBarItems = list.map(function (item) {
                                return Object.assign(item, { pageKey: getPage(item.pagePath) });
                            });

                            this.setData({
                                isIphoneX: isIphoneX,
                                tabBarItems: tabBarItems,
                                env58: true
                                // mpSource,
                                // extraInfo,
                            });

                        case 14:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, this);
        }));

        function onPageReady() {
            return _ref2.apply(this, arguments);
        }

        return onPageReady;
    }(),
    onUnload: function onUnload() {
        console.log('unload');
        app.globalData.pageData = {};
    },

    // onShow() {
    //     this.setData({
    //         page_data: app.globalData.pageData,
    //     });
    // },
    onPullDownRefresh: function onPullDownRefresh() {
        this.loadData(function () {
            wx.stopPullDownRefresh();
        });
    },
    onShareAppMessage: function onShareAppMessage() {}
};

module.exports = function mixin(config) {
    var minx = Object.assign({}, config || {}, mixinConfig, _loadData2.default, _loadMore2.default, _navigation2.default, _call2.default, _call4.default, _video2.default, _images2.default, _coupon2.default, _imageSwiper2.default, _evaluation2.default, _me2.default, _pay2.default, _branch2.default, _userinfoAuthorize2.default, _editLayer2.default, _tabBar2.default);
    return minx;
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1peGluLmpzIl0sIm5hbWVzIjpbImdldFBhZ2UiLCJyZXF1aXJlIiwiYXBwIiwibWl4aW5Db25maWciLCJkYXRhIiwic3VwcG9ydFZlcnNpb24iLCJkZXRhaWxTaG93Iiwic2hvd1VzZXJpbmZvQXV0aG9yaXplIiwiZWRpdExheWVyIiwiaXNFZGl0aW5nIiwicGFnZU1vZHVsZSIsInRhYkJhckl0ZW1zIiwib25Mb2FkIiwid3giLCJnZXRTeXN0ZW1JbmZvU3luYyIsIm1vZGVsIiwidG9Mb3dlckNhc2UiLCJpbmRleE9mIiwiZ2xvYmFsRGF0YSIsImlzSXBob25lWCIsIm9uUmVhZHkiLCJjb25zb2xlIiwibG9nIiwib25QYWdlUmVhZHkiLCJvblNob3ciLCJyZWZyZXNoUGFnZSIsImdldEV4dENvbmZpZ1N5bmMiLCJzZXREYXRhIiwibG9hZFRhYmJhciIsImxvYWREYXRhIiwibG9hZFBhZ2VMaXN0IiwiZXh0Q29uZmlnIiwidGFiQmFyIiwibGlzdCIsImV4dEpzb24iLCJtYXAiLCJPYmplY3QiLCJhc3NpZ24iLCJpdGVtIiwicGFnZUtleSIsInBhZ2VQYXRoIiwiZW52NTgiLCJvblVubG9hZCIsInBhZ2VEYXRhIiwib25QdWxsRG93blJlZnJlc2giLCJzdG9wUHVsbERvd25SZWZyZXNoIiwib25TaGFyZUFwcE1lc3NhZ2UiLCJtb2R1bGUiLCJleHBvcnRzIiwibWl4aW4iLCJjb25maWciLCJtaW54IiwibG9hZERhdGFNaW54IiwibG9hZE1vcmVNaW54IiwibmF2aWdhdGlvbk1pbngiLCJjYWxsTWlueCIsImNhbGxNb2RNaW54IiwidmlkZW9Db21wb25lbnQiLCJpbWFnZXNNaW54IiwiY291cG9uTWlueCIsImltYWdlU3dpcGVyQ29tcG9uZW50IiwiZXZhbHVhdGlvbkNvbXBvbmVudCIsIm1lTWlueCIsInBheU1pbngiLCJicmFuY2hNaW54IiwidXNlcmluZm9BdXRob3JpemUiLCJlZGl0TGF5ZXJNaW54IiwidGFiQmFyQ29tcG9uZW50Il0sIm1hcHBpbmdz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bkI7QUE5RGUsQ0FBcEI7O0FBaUVBQyxPQUFPQyxPQUFQLEdBQWlCLFNBQVNDLEtBQVQsQ0FBZUMsTUFBZixFQUF1QjtBQUNwQyxRQUFNQyxPQUFPZixPQUFPQyxNQUFQLENBQ1QsRUFEUyxFQUNMYSxVQUFVLEVBREwsRUFDUy9DLFdBRFQsRUFFVGlELGtCQUZTLEVBR1RDLGtCQUhTLEVBSVRDLG9CQUpTLEVBS1RDLGNBTFMsRUFNVEMsY0FOUyxFQU9UQyxlQVBTLEVBUVRDLGdCQVJTLEVBU1RDLGdCQVRTLEVBVVRDLHFCQVZTLEVBV1RDLG9CQVhTLEVBWVRDLFlBWlMsRUFhVEMsYUFiUyxFQWNUQyxnQkFkUyxFQWVUQywyQkFmUyxFQWdCVEMsbUJBaEJTLEVBaUJUQyxnQkFqQlMsQ0FBYjtBQW1CQSxXQUFPaEIsSUFBUDtBQUNILENBckJEIiwiZmlsZSI6Im1peGluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcblxyXG5pbXBvcnQgbG9hZERhdGFNaW54IGZyb20gJy4vbG9hZERhdGEnO1xyXG5pbXBvcnQgbG9hZE1vcmVNaW54IGZyb20gJy4vbG9hZE1vcmUnO1xyXG5pbXBvcnQgbmF2aWdhdGlvbk1pbnggZnJvbSAnLi9uYXZpZ2F0aW9uJztcclxuaW1wb3J0IGNhbGxNaW54IGZyb20gJy4vY2FsbCc7XHJcbmltcG9ydCBlZGl0TGF5ZXJNaW54IGZyb20gJy4vZWRpdExheWVyJztcclxuaW1wb3J0IHZpZGVvQ29tcG9uZW50IGZyb20gJy4uL2NvbXBvbmVudHMvbW9kL3ZpZGVvL3ZpZGVvJztcclxuaW1wb3J0IGltYWdlU3dpcGVyQ29tcG9uZW50IGZyb20gJy4uL2NvbXBvbmVudHMvbW9kL2ltYWdlU3dpcGVyL2ltYWdlU3dpcGVyJztcclxuaW1wb3J0IGV2YWx1YXRpb25Db21wb25lbnQgZnJvbSAnLi4vY29tcG9uZW50cy9tb2QvZXZhbHVhdGlvbi9ldmFsdWF0aW9uJztcclxuaW1wb3J0IGltYWdlc01pbnggZnJvbSAnLi4vY29tcG9uZW50cy9tb2QvaW1hZ2VzL2ltYWdlcyc7XHJcbmltcG9ydCBjb3Vwb25NaW54IGZyb20gJy4uL2NvbXBvbmVudHMvbW9kL2NvdXBvbi9jb3Vwb24nO1xyXG5pbXBvcnQgY2FsbE1vZE1pbnggZnJvbSAnLi4vY29tcG9uZW50cy9tb2QvY2FsbC9jYWxsJztcclxuaW1wb3J0IG1lTWlueCBmcm9tICcuLi9jb21wb25lbnRzL21vZC9tZS9tZSc7XHJcbmltcG9ydCBwYXlNaW54IGZyb20gJy4uL2NvbXBvbmVudHMvbW9kL3BheS9wYXknO1xyXG5pbXBvcnQgYnJhbmNoTWlueCBmcm9tICcuLi9jb21wb25lbnRzL21vZC9icmFuY2gvYnJhbmNoJztcclxuaW1wb3J0IHVzZXJpbmZvQXV0aG9yaXplIGZyb20gJy4vdXNlcmluZm9BdXRob3JpemUnO1xyXG5pbXBvcnQgdGFiQmFyQ29tcG9uZW50IGZyb20gJy4uL2NvbXBvbmVudHMvbW9kL3RhYkJhci90YWJCYXInO1xyXG5cclxuY29uc3QgZ2V0UGFnZSA9IHJlcXVpcmUoJy4uL3V0aWxzL2dldFBhZ2UnKTtcclxuY29uc3QgYXBwID0gcmVxdWlyZSgnLi4vdXRpbHMvZ2xvYmFsRGF0YScpO1xyXG5cclxuY29uc3QgbWl4aW5Db25maWcgPSB7XHJcbiAgICBkYXRhOiB7XHJcbiAgICAgICAgc3VwcG9ydFZlcnNpb246IHRydWUsXHJcbiAgICAgICAgZGV0YWlsU2hvdzogZmFsc2UsXHJcbiAgICAgICAgc2hvd1VzZXJpbmZvQXV0aG9yaXplOiBmYWxzZSxcclxuICAgICAgICBlZGl0TGF5ZXI6IHt9LFxyXG4gICAgICAgIGlzRWRpdGluZzogZmFsc2UsXHJcbiAgICAgICAgcGFnZU1vZHVsZToge30sXHJcbiAgICAgICAgdGFiQmFySXRlbXM6IFtdLFxyXG4gICAgfSxcclxuICAgIGFzeW5jIG9uTG9hZCgpIHtcclxuICAgICAgICBjb25zdCB7IG1vZGVsID0gJycgfSA9IHd4LmdldFN5c3RlbUluZm9TeW5jKCk7XHJcbiAgICAgICAgaWYgKH5tb2RlbC50b0xvd2VyQ2FzZSgpLmluZGV4T2YoJ2lwaG9uZSB4JykpIHtcclxuICAgICAgICAgICAgYXBwLmdsb2JhbERhdGEuaXNJcGhvbmVYID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgb25SZWFkeSgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhhcHApO1xyXG4gICAgICAgIHRoaXMub25QYWdlUmVhZHkoKTtcclxuICAgIH0sXHJcbiAgICBvblNob3coKSB7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoUGFnZSgpO1xyXG4gICAgfSxcclxuICAgIGFzeW5jIG9uUGFnZVJlYWR5KCkge1xyXG4gICAgICAgIGlmICghd3guZ2V0RXh0Q29uZmlnU3luYykge1xyXG4gICAgICAgICAgICB0aGlzLnNldERhdGEoeyBzdXBwb3J0VmVyc2lvbjogZmFsc2UgfSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgYXdhaXQgdGhpcy5sb2FkVGFiYmFyKCk7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5sb2FkRGF0YSgpO1xyXG4gICAgICAgIGF3YWl0IHRoaXMubG9hZFBhZ2VMaXN0KCk7XHJcblxyXG4gICAgICAgIGNvbnN0IHsgZXh0Q29uZmlnID0ge30sIGlzSXBob25lWCB9ID0gYXBwLmdsb2JhbERhdGE7XHJcbiAgICAgICAgLy8gY29uc3QgeyB0YWJCYXIgPSB7fSwgbXBTb3VyY2UgPSAnJywgZXh0cmFJbmZvID0gbnVsbCB9ID0gZXh0Q29uZmlnLmV4dEpzb247XHJcbiAgICAgICAgY29uc3QgeyBsaXN0ID0gW10gfSA9IGFwcC5nbG9iYWxEYXRhLnRhYkJhcjtcclxuICAgICAgICBjb25zb2xlLmxvZyhleHRDb25maWcuZXh0SnNvbik7XHJcbiAgICAgICAgLy8gYXBwLmdsb2JhbERhdGEudGFiTW9kZSA9IGV4dENvbmZpZy5leHRKc29uLnRhYk1vZGU7XHJcbiAgICAgICAgY29uc3QgdGFiQmFySXRlbXMgPSBsaXN0Lm1hcChpdGVtID0+IE9iamVjdC5hc3NpZ24oaXRlbSwgeyBwYWdlS2V5OiBnZXRQYWdlKGl0ZW0ucGFnZVBhdGgpIH0pKTtcclxuICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICBpc0lwaG9uZVgsXHJcbiAgICAgICAgICAgIHRhYkJhckl0ZW1zLFxyXG4gICAgICAgICAgICBlbnY1ODogdHJ1ZSxcclxuICAgICAgICAgICAgLy8gbXBTb3VyY2UsXHJcbiAgICAgICAgICAgIC8vIGV4dHJhSW5mbyxcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBvblVubG9hZCgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygndW5sb2FkJyk7XHJcbiAgICAgICAgYXBwLmdsb2JhbERhdGEucGFnZURhdGEgPSB7fVxyXG4gICAgfSxcclxuICAgIC8vIG9uU2hvdygpIHtcclxuICAgIC8vICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgLy8gICAgICAgICBwYWdlX2RhdGE6IGFwcC5nbG9iYWxEYXRhLnBhZ2VEYXRhLFxyXG4gICAgLy8gICAgIH0pO1xyXG4gICAgLy8gfSxcclxuICAgIG9uUHVsbERvd25SZWZyZXNoKCkge1xyXG4gICAgICAgIHRoaXMubG9hZERhdGEoKCkgPT4ge1xyXG4gICAgICAgICAgICB3eC5zdG9wUHVsbERvd25SZWZyZXNoKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgb25TaGFyZUFwcE1lc3NhZ2UoKSB7XHJcblxyXG4gICAgfSxcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbWl4aW4oY29uZmlnKSB7XHJcbiAgICBjb25zdCBtaW54ID0gT2JqZWN0LmFzc2lnbihcclxuICAgICAgICB7fSwgY29uZmlnIHx8IHt9LCBtaXhpbkNvbmZpZyxcclxuICAgICAgICBsb2FkRGF0YU1pbngsXHJcbiAgICAgICAgbG9hZE1vcmVNaW54LFxyXG4gICAgICAgIG5hdmlnYXRpb25NaW54LFxyXG4gICAgICAgIGNhbGxNaW54LFxyXG4gICAgICAgIGNhbGxNb2RNaW54LFxyXG4gICAgICAgIHZpZGVvQ29tcG9uZW50LFxyXG4gICAgICAgIGltYWdlc01pbngsXHJcbiAgICAgICAgY291cG9uTWlueCxcclxuICAgICAgICBpbWFnZVN3aXBlckNvbXBvbmVudCxcclxuICAgICAgICBldmFsdWF0aW9uQ29tcG9uZW50LFxyXG4gICAgICAgIG1lTWlueCxcclxuICAgICAgICBwYXlNaW54LFxyXG4gICAgICAgIGJyYW5jaE1pbngsXHJcbiAgICAgICAgdXNlcmluZm9BdXRob3JpemUsXHJcbiAgICAgICAgZWRpdExheWVyTWlueCxcclxuICAgICAgICB0YWJCYXJDb21wb25lbnQsXHJcbiAgICApO1xyXG4gICAgcmV0dXJuIG1pbng7XHJcbn07XHJcbiJdfQ==