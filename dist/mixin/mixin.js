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

    // onUnload() {
    //     console.log('unload');
    //     app.globalData.pageData = {};
    // },
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1peGluLmpzIl0sIm5hbWVzIjpbImdldFBhZ2UiLCJyZXF1aXJlIiwiYXBwIiwibWl4aW5Db25maWciLCJkYXRhIiwic3VwcG9ydFZlcnNpb24iLCJkZXRhaWxTaG93Iiwic2hvd1VzZXJpbmZvQXV0aG9yaXplIiwiZWRpdExheWVyIiwiaXNFZGl0aW5nIiwicGFnZU1vZHVsZSIsInRhYkJhckl0ZW1zIiwib25Mb2FkIiwid3giLCJnZXRTeXN0ZW1JbmZvU3luYyIsIm1vZGVsIiwidG9Mb3dlckNhc2UiLCJpbmRleE9mIiwiZ2xvYmFsRGF0YSIsImlzSXBob25lWCIsIm9uUmVhZHkiLCJjb25zb2xlIiwibG9nIiwib25QYWdlUmVhZHkiLCJvblNob3ciLCJyZWZyZXNoUGFnZSIsImdldEV4dENvbmZpZ1N5bmMiLCJzZXREYXRhIiwibG9hZFRhYmJhciIsImxvYWREYXRhIiwibG9hZFBhZ2VMaXN0IiwiZXh0Q29uZmlnIiwidGFiQmFyIiwibGlzdCIsImV4dEpzb24iLCJtYXAiLCJPYmplY3QiLCJhc3NpZ24iLCJpdGVtIiwicGFnZUtleSIsInBhZ2VQYXRoIiwiZW52NTgiLCJvblB1bGxEb3duUmVmcmVzaCIsInN0b3BQdWxsRG93blJlZnJlc2giLCJvblNoYXJlQXBwTWVzc2FnZSIsIm1vZHVsZSIsImV4cG9ydHMiLCJtaXhpbiIsImNvbmZpZyIsIm1pbngiLCJsb2FkRGF0YU1pbngiLCJsb2FkTW9yZU1pbngiLCJuYXZpZ2F0aW9uTWlueCIsImNhbGxNaW54IiwiY2FsbE1vZE1pbngiLCJ2aWRlb0NvbXBvbmVudCIsImltYWdlc01pbngiLCJjb3Vwb25NaW54IiwiaW1hZ2VTd2lwZXJDb21wb25lbnQiLCJldmFsdWF0aW9uQ29tcG9uZW50IiwibWVNaW54IiwicGF5TWlueCIsImJyYW5jaE1pbngiLCJ1c2VyaW5mb0F1dGhvcml6ZSIsImVkaXRMYXllck1pbngiLCJ0YWJCYXJDb21wb25lbnQiXSwibWFwcGluZ3MiOiI7O0FBRUE7Ozs7QUFDQTs7OztB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RUFDTFcsVUFBVSxFQURMLEVBQ1M3QyxXQURULEVBRVQrQyxrQkFGUyxFQUdUQyxrQkFIUyxFQUlUQyxvQkFKUyxFQUtUQyxjQUxTLEVBTVRDLGNBTlMsRUFPVEMsZUFQUyxFQVFUQyxnQkFSUyxFQVNUQyxnQkFUUyxFQVVUQyxxQkFWUyxFQVdUQyxvQkFYUyxFQVlUQyxZQVpTLEVBYVRDLGFBYlMsRUFjVEMsZ0JBZFMsRUFlVEMsMkJBZlMsRUFnQlRDLG1CQWhCUyxFQWlCVEMsZ0JBakJTLENBQWI7QUFtQkEsV0FBT2hCLElBQVA7QUFDSCxDQXJCRCIsImZpbGUiOiJtaXhpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuXG5pbXBvcnQgbG9hZERhdGFNaW54IGZyb20gJy4vbG9hZERhdGEnO1xuaW1wb3J0IGxvYWRNb3JlTWlueCBmcm9tICcuL2xvYWRNb3JlJztcbmltcG9ydCBuYXZpZ2F0aW9uTWlueCBmcm9tICcuL25hdmlnYXRpb24nO1xuaW1wb3J0IGNhbGxNaW54IGZyb20gJy4vY2FsbCc7XG5pbXBvcnQgZWRpdExheWVyTWlueCBmcm9tICcuL2VkaXRMYXllcic7XG5pbXBvcnQgdmlkZW9Db21wb25lbnQgZnJvbSAnLi4vY29tcG9uZW50cy9tb2QvdmlkZW8vdmlkZW8nO1xuaW1wb3J0IGltYWdlU3dpcGVyQ29tcG9uZW50IGZyb20gJy4uL2NvbXBvbmVudHMvbW9kL2ltYWdlU3dpcGVyL2ltYWdlU3dpcGVyJztcbmltcG9ydCBldmFsdWF0aW9uQ29tcG9uZW50IGZyb20gJy4uL2NvbXBvbmVudHMvbW9kL2V2YWx1YXRpb24vZXZhbHVhdGlvbic7XG5pbXBvcnQgaW1hZ2VzTWlueCBmcm9tICcuLi9jb21wb25lbnRzL21vZC9pbWFnZXMvaW1hZ2VzJztcbmltcG9ydCBjb3Vwb25NaW54IGZyb20gJy4uL2NvbXBvbmVudHMvbW9kL2NvdXBvbi9jb3Vwb24nO1xuaW1wb3J0IGNhbGxNb2RNaW54IGZyb20gJy4uL2NvbXBvbmVudHMvbW9kL2NhbGwvY2FsbCc7XG5pbXBvcnQgbWVNaW54IGZyb20gJy4uL2NvbXBvbmVudHMvbW9kL21lL21lJztcbmltcG9ydCBwYXlNaW54IGZyb20gJy4uL2NvbXBvbmVudHMvbW9kL3BheS9wYXknO1xuaW1wb3J0IGJyYW5jaE1pbnggZnJvbSAnLi4vY29tcG9uZW50cy9tb2QvYnJhbmNoL2JyYW5jaCc7XG5pbXBvcnQgdXNlcmluZm9BdXRob3JpemUgZnJvbSAnLi91c2VyaW5mb0F1dGhvcml6ZSc7XG5pbXBvcnQgdGFiQmFyQ29tcG9uZW50IGZyb20gJy4uL2NvbXBvbmVudHMvbW9kL3RhYkJhci90YWJCYXInO1xuXG5jb25zdCBnZXRQYWdlID0gcmVxdWlyZSgnLi4vdXRpbHMvZ2V0UGFnZScpO1xuY29uc3QgYXBwID0gcmVxdWlyZSgnLi4vdXRpbHMvZ2xvYmFsRGF0YScpO1xuXG5jb25zdCBtaXhpbkNvbmZpZyA9IHtcbiAgICBkYXRhOiB7XG4gICAgICAgIHN1cHBvcnRWZXJzaW9uOiB0cnVlLFxuICAgICAgICBkZXRhaWxTaG93OiBmYWxzZSxcbiAgICAgICAgc2hvd1VzZXJpbmZvQXV0aG9yaXplOiBmYWxzZSxcbiAgICAgICAgZWRpdExheWVyOiB7fSxcbiAgICAgICAgaXNFZGl0aW5nOiBmYWxzZSxcbiAgICAgICAgcGFnZU1vZHVsZToge30sXG4gICAgICAgIHRhYkJhckl0ZW1zOiBbXSxcbiAgICB9LFxuICAgIGFzeW5jIG9uTG9hZCgpIHtcbiAgICAgICAgY29uc3QgeyBtb2RlbCA9ICcnIH0gPSB3eC5nZXRTeXN0ZW1JbmZvU3luYygpO1xuICAgICAgICBpZiAofm1vZGVsLnRvTG93ZXJDYXNlKCkuaW5kZXhPZignaXBob25lIHgnKSkge1xuICAgICAgICAgICAgYXBwLmdsb2JhbERhdGEuaXNJcGhvbmVYID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgb25SZWFkeSgpIHtcbiAgICAgICAgY29uc29sZS5sb2coYXBwKTtcbiAgICAgICAgdGhpcy5vblBhZ2VSZWFkeSgpO1xuICAgIH0sXG4gICAgb25TaG93KCkge1xuICAgICAgICB0aGlzLnJlZnJlc2hQYWdlKCk7XG4gICAgfSxcbiAgICBhc3luYyBvblBhZ2VSZWFkeSgpIHtcbiAgICAgICAgaWYgKCF3eC5nZXRFeHRDb25maWdTeW5jKSB7XG4gICAgICAgICAgICB0aGlzLnNldERhdGEoeyBzdXBwb3J0VmVyc2lvbjogZmFsc2UgfSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgYXdhaXQgdGhpcy5sb2FkVGFiYmFyKCk7XG4gICAgICAgIGF3YWl0IHRoaXMubG9hZERhdGEoKTtcbiAgICAgICAgYXdhaXQgdGhpcy5sb2FkUGFnZUxpc3QoKTtcblxuICAgICAgICBjb25zdCB7IGV4dENvbmZpZyA9IHt9LCBpc0lwaG9uZVggfSA9IGFwcC5nbG9iYWxEYXRhO1xuICAgICAgICAvLyBjb25zdCB7IHRhYkJhciA9IHt9LCBtcFNvdXJjZSA9ICcnLCBleHRyYUluZm8gPSBudWxsIH0gPSBleHRDb25maWcuZXh0SnNvbjtcbiAgICAgICAgY29uc3QgeyBsaXN0ID0gW10gfSA9IGFwcC5nbG9iYWxEYXRhLnRhYkJhcjtcbiAgICAgICAgY29uc29sZS5sb2coZXh0Q29uZmlnLmV4dEpzb24pO1xuICAgICAgICAvLyBhcHAuZ2xvYmFsRGF0YS50YWJNb2RlID0gZXh0Q29uZmlnLmV4dEpzb24udGFiTW9kZTtcbiAgICAgICAgY29uc3QgdGFiQmFySXRlbXMgPSBsaXN0Lm1hcChpdGVtID0+IE9iamVjdC5hc3NpZ24oaXRlbSwgeyBwYWdlS2V5OiBnZXRQYWdlKGl0ZW0ucGFnZVBhdGgpIH0pKTtcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgIGlzSXBob25lWCxcbiAgICAgICAgICAgIHRhYkJhckl0ZW1zLFxuICAgICAgICAgICAgZW52NTg6IHRydWUsXG4gICAgICAgICAgICAvLyBtcFNvdXJjZSxcbiAgICAgICAgICAgIC8vIGV4dHJhSW5mbyxcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICAvLyBvblVubG9hZCgpIHtcbiAgICAvLyAgICAgY29uc29sZS5sb2coJ3VubG9hZCcpO1xuICAgIC8vICAgICBhcHAuZ2xvYmFsRGF0YS5wYWdlRGF0YSA9IHt9O1xuICAgIC8vIH0sXG4gICAgLy8gb25TaG93KCkge1xuICAgIC8vICAgICB0aGlzLnNldERhdGEoe1xuICAgIC8vICAgICAgICAgcGFnZV9kYXRhOiBhcHAuZ2xvYmFsRGF0YS5wYWdlRGF0YSxcbiAgICAvLyAgICAgfSk7XG4gICAgLy8gfSxcbiAgICBvblB1bGxEb3duUmVmcmVzaCgpIHtcbiAgICAgICAgdGhpcy5sb2FkRGF0YSgoKSA9PiB7XG4gICAgICAgICAgICB3eC5zdG9wUHVsbERvd25SZWZyZXNoKCk7XG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgb25TaGFyZUFwcE1lc3NhZ2UoKSB7XG5cbiAgICB9LFxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBtaXhpbihjb25maWcpIHtcbiAgICBjb25zdCBtaW54ID0gT2JqZWN0LmFzc2lnbihcbiAgICAgICAge30sIGNvbmZpZyB8fCB7fSwgbWl4aW5Db25maWcsXG4gICAgICAgIGxvYWREYXRhTWlueCxcbiAgICAgICAgbG9hZE1vcmVNaW54LFxuICAgICAgICBuYXZpZ2F0aW9uTWlueCxcbiAgICAgICAgY2FsbE1pbngsXG4gICAgICAgIGNhbGxNb2RNaW54LFxuICAgICAgICB2aWRlb0NvbXBvbmVudCxcbiAgICAgICAgaW1hZ2VzTWlueCxcbiAgICAgICAgY291cG9uTWlueCxcbiAgICAgICAgaW1hZ2VTd2lwZXJDb21wb25lbnQsXG4gICAgICAgIGV2YWx1YXRpb25Db21wb25lbnQsXG4gICAgICAgIG1lTWlueCxcbiAgICAgICAgcGF5TWlueCxcbiAgICAgICAgYnJhbmNoTWlueCxcbiAgICAgICAgdXNlcmluZm9BdXRob3JpemUsXG4gICAgICAgIGVkaXRMYXllck1pbngsXG4gICAgICAgIHRhYkJhckNvbXBvbmVudCxcbiAgICApO1xuICAgIHJldHVybiBtaW54O1xufTtcbiJdfQ==