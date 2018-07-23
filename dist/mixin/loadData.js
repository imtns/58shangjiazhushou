'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _modulesParse = require('./../utils/modulesParse.js');

var _modulesParse2 = _interopRequireDefault(_modulesParse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var getPage = require('./../utils/getPage.js');

var _require = require('./../utils/ajax.js'),
    get = _require.get;

var _require2 = require('./../utils/index.js'),
    picSrcDomain = _require2.picSrcDomain;

var app = require('./../utils/globalData.js');

var pageDataUrl = '/business/template/loadall';
var pageListUrl = '/business/pageList/';
var loadTabbarUrl = '/business/getReleaseConfig/';
var parseCfgAndData = function parseCfgAndData(_ref) {
    var modules = _ref.modules;
    return modules.map(function (_ref2) {
        var id = _ref2.id,
            name = _ref2.name,
            cfg = _ref2.cfg,
            data = _ref2.data,
            params = _ref2.params;

        try {
            /* eslint-disable no-param-reassign */
            cfg = cfg ? JSON.parse(cfg) : {};
        } catch (error) {
            cfg = {};
        }

        var modData = data[name] || {};

        // data 修改
        if (name === 'information') {
            modData.logo = modData.logo ? picSrcDomain() + modData.logo : 'https://pic2.58cdn.com.cn/bizmp/n_v285d6a16d725a446694db35df23c9db24.png';
            app.globalData.information = modData;
        }

        if (name === 'coupon') {
            if (modData.data) {
                modData.data.forEach(function (coupon) {
                    var reg = /([0-9]{4})-([0-1]{0,1}[0-9]{1})-([0-3]{0,1}[0-9]{1}).+/;
                    var couponCondition = JSON.parse(coupon.couponCondition);
                    if (coupon.validType === 1) {
                        Object.assign(coupon, _extends({}, couponCondition, {
                            validStartDate: coupon.validStarttime.replace(reg, '$1.$2.$3'),
                            validEndDate: coupon.validEndtime.replace(reg, '$1.$2.$3')
                        }));
                    } else {
                        Object.assign(coupon, _extends({}, couponCondition));
                    }
                });
            }
        }
        if (name === 'order') {
            if (!cfg) {
                cfg.hasMore = false;
            }
        }
        if (name === 'images' || name === 'order') {
            cfg.theme = cfg.theme || '1';
        }

        if (name === 'services' || name === 'serviceOther') {
            if (modData.data) {
                modData.data.forEach(function (service) {
                    service.img = picSrcDomain() + service.img;
                });
            }
            cfg.theme = cfg.theme || '1';
            cfg.themes = [{
                theme: '1',
                styleName: 'one',
                title: '大图'
            }, {
                theme: '2',
                styleName: 'two',
                title: '中图'
            }, {
                theme: '3',
                styleName: 'three',
                title: '小图'
            }, {
                theme: '4',
                styleName: 'four',
                title: '横向滑动'
            }, {
                theme: '5',
                styleName: 'five',
                title: '横向列表'
            }, {
                theme: '6',
                styleName: 'six',
                title: '双图'
            }, {
                theme: '7',
                styleName: 'seven',
                title: '1上2下显示'
            }];
        }

        if (name === 'serviceDetail') {
            if (modData.descPics) {
                modData.descPics = modData.descPics.map(function (pic) {
                    return picSrcDomain() + pic;
                });
            }

            var strArr = modData.serviceInfo.split('\n');
            modData.htmlNodes = strArr.map(function (str) {
                return {
                    name: 'p',
                    children: [{
                        type: 'text',
                        text: str
                    }]
                };
            });
        }

        // 定义模板数据
        var pd = {
            id: id,
            name: name,
            props: _extends({}, modData, {
                cfg: cfg
            }),
            params: params
        };

        // props & cfg 修改
        // imageSwiper
        if (name === 'imageSwiper') {
            var images = null;
            if (!cfg.images) {
                images = modData.data;
            } else {
                var _cfg = cfg;
                images = _cfg.images;
            }
            cfg.images = images.map(function (img) {
                return _extends({}, img, {
                    src: picSrcDomain() + img.src
                });
            });
        }

        // images 模块图片路径
        if (name === 'images') {
            //  const { theme } = cfg;
            /* eslint no-param-reassign: "error" */
            cfg.images.forEach(function (img) {
                img.src = picSrcDomain() + img.src;
            });
        }

        // 文章模块图片路径
        if (name === 'article') {
            modData.data.forEach(function (article) {
                article.cover = picSrcDomain() + article.cover;
            });
        }

        // 文章模块图片路径
        if (name === 'order') {
            modData.data.forEach(function (order) {
                order.pics = picSrcDomain() + order.pics;
            });
        }
        console.log(name, pd);
        return pd;
    });
};

module.exports = {
    loadData: function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(cb) {
            var page, route, pageType, postData, response, modulesData, page_data, newPageData;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            page = getPage(this.route, this.options) || 'index';
                            // const page = 'index';
                            /* global getCurrentPages:true */

                            route = getCurrentPages()[getCurrentPages().length - 1].route;
                            pageType = route.split('ptype=')[1] || this.options.ptype || '';
                            postData = {
                                pageKey: page,
                                releaseId: wx.getStorageSync('releaseId'),
                                mpid: wx.getStorageSync('mpId')
                            };

                            if (page === 'detail') {
                                postData.serviceDetailId = this.options.id;
                            }
                            if (page === 'article') {
                                pageDataUrl = '/businessArticle/get/' + this.options.id;
                            }
                            if (page === 'custom' && pageType) {
                                postData.pageKey = pageType;
                            }
                            console.log(app.globalData.extConfig);
                            _context.prev = 8;

                            wx.setStorageSync('releaseId', '1016613019867746304');
                            wx.setStorageSync('mpId', '1001014495864229888');
                            _context.next = 13;
                            return get(pageDataUrl, postData);

                        case 13:
                            response = _context.sent;

                            // const response = await get('/business/template/loadall', {
                            //     pageKey: 'index',
                            //     releaseId: wx.getStorageSync('releaseId'),
                            //     mpid: wx.getStorageSync('mpId', '1001014495864229888'),
                            //     appid: app.globalData.extConfig.appId,
                            // });
                            modulesData = JSON.parse(JSON.stringify(response.data));

                            app.globalData.modules = _modulesParse2.default.show(modulesData);
                            /* eslint-disable camelcase */
                            page_data = null;

                            if (page === 'article') {
                                page_data = response.data;
                                /* eslint no-useless-escape: "error" */
                                page_data.content.replace(/^\s?(http|https)?\\:\/\//, 'https://');
                            } else {
                                page_data = parseCfgAndData(response.data);
                            }
                            // 图片组件数据
                            this.imagesViewState(page_data);

                            newPageData = {
                                pageType: page,
                                current: 0,
                                page_data: page_data
                            };

                            app.globalData.pageData = page_data;
                            this.setData(newPageData);
                            cb && cb();
                            _context.next = 28;
                            break;

                        case 25:
                            _context.prev = 25;
                            _context.t0 = _context['catch'](8);

                            console.log(_context.t0);

                        case 28:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this, [[8, 25]]);
        }));

        function loadData(_x) {
            return _ref3.apply(this, arguments);
        }

        return loadData;
    }(),
    refreshPage: function refreshPage() {
        this.setData({
            page_data: app.globalData.pageData
        });
    },
    loadTabbar: function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
            var _ref5, data;

            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _context2.next = 2;
                            return get(loadTabbarUrl + '/' + wx.getStorageSync('releaseId'));

                        case 2:
                            _ref5 = _context2.sent;
                            data = _ref5.data;

                            app.globalData.tabBar = data.tabBar;

                        case 5:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, this);
        }));

        function loadTabbar() {
            return _ref4.apply(this, arguments);
        }

        return loadTabbar;
    }(),
    loadPageList: function () {
        var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
            var _ref7, data;

            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            console.log(wx.getStorageSync('releaseId'));
                            _context3.next = 3;
                            return get(pageListUrl + '/' + wx.getStorageSync('releaseId'));

                        case 3:
                            _ref7 = _context3.sent;
                            data = _ref7.data;

                            app.globalData.pageList = data;

                        case 6:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, this);
        }));

        function loadPageList() {
            return _ref6.apply(this, arguments);
        }

        return loadPageList;
    }(),
    getAppTitle: function getAppTitle(callback) {
        get('/mpBusinessInfo/getTitle', function (e, response) {
            if (e || e === undefined) {
                callback && callback(e);
                return;
            }
            if (response) {
                wx.setNavigationBarTitle({
                    title: response
                });
            }
            callback && callback(e, response);
        });
    }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvYWREYXRhLmpzIl0sIm5hbWVzIjpbImdldFBhZ2UiLCJyZXF1aXJlIiwiZ2V0IiwicGljU3JjRG9tYWluIiwiYXBwIiwicGFnZURhdGFVcmwiLCJwYWdlTGlzdFVybCIsImxvYWRUYWJiYXJVcmwiLCJwYXJzZUNmZ0FuZERhdGEiLCJtb2R1bGVzIiwibWFwIiwiaWQiLCJuYW1lIiwiY2ZnIiwiZGF0YSIsInBhcmFtcyIsIkpTT04iLCJwYXJzZSIsImVycm9yIiwibW9kRGF0YSIsImxvZ28iLCJnbG9iYWxEYXRhIiwiaW5mb3JtYXRpb24iLCJmb3JFYWNoIiwicmVnIiwiY291cG9uQ29uZGl0aW9uIiwiY291cG9uIiwidmFsaWRUeXBlIiwiT2JqZWN0IiwiYXNzaWduIiwidmFsaWRTdGFydERhdGUiLCJ2YWxpZFN0YXJ0dGltZSIsInJlcGxhY2UiLCJ2YWxpZEVuZERhdGUiLCJ2YWxpZEVuZHRpbWUiLCJoYXNNb3JlIiwidGhlbWUiLCJzZXJ2aWNlIiwiaW1nIiwidGhlbWVzIiwic3R5bGVOYW1lIiwidGl0bGUiLCJkZXNjUGljcyIsInBpYyIsInN0ckFyciIsInNlcnZpY2VJbmZvIiwic3BsaXQiLCJodG1sTm9kZXMiLCJjaGlsZHJlbiIsInR5cGUiLCJ0ZXh0Iiwic3RyIiwicGQiLCJwcm9wcyIsImltYWdlcyIsInNyYyIsImFydGljbGUiLCJjb3ZlciIsIm9yZGVyIiwicGljcyIsImNvbnNvbGUiLCJsb2ciLCJtb2R1bGUiLCJleHBvcnRzIiwibG9hZERhdGEiLCJjYiIsInBhZ2UiLCJyb3V0ZSIsIm9wdGlvbnMiLCJnZXRDdXJyZW50UGFnZXMiLCJsZW5ndGgiLCJwYWdlVHlwZSIsInB0eXBlIiwicG9zdERhdGEiLCJwYWdlS2V5IiwicmVsZWFzZUlkIiwid3giLCJnZXRTdG9yYWdlU3luYyIsIm1waWQiLCJzZXJ2aWNlRGV0YWlsSWQiLCJleHRDb25maWciLCJzZXRTdG9yYWdlU3luYyIsInJlc3BvbnNlIiwibW9kdWxlc0RhdGEiLCJzdHJpbmdpZnkiLCJtb2R1bGVzUGFyc2UiLCJzaG93IiwicGFnZV9kYXRhIiwiY29udGVudCIsImltYWdlc1ZpZXdTdGF0ZSIsIm5ld1BhZ2VEYXRhIiwiY3VycmVudCIsInBhZ2VEYXRhIiwic2V0RGF0YSIsInJlZnJlc2hQYWdlIiwibG9hZFRhYmJhciIsInRhYkJhciIsImxvYWRQYWdlTGlzdCIsInBhZ2VMaXN0IiwiZ2V0QXBwVGl0bGUiLCJjYWxsYmFjayIsImUiLCJ1bmRlZmluZWQiLCJzZXROYXZpZ2F0aW9uQmFyVGl0bGUiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTs7Ozs7Ozs7QUFFQSxJQUFNQSxVQUFVQyxRQUFRLGtCQUFSLENBQWhCOztlQUdJQSxRQUFRLGVBQVIsQztJQURBQyxHLFlBQUFBLEc7O2dCQUlBRCxRQUFRLGdCQUFSLEM7SUFEQUUsWSxhQUFBQSxZOztBQUdKLElBQU1DLE1BQU1ILFFBQVEscUJBQVIsQ0FBWjs7QUFFQSxJQUFJSSxjQUFjLDRCQUFsQjtBQUNBLElBQU1DLGNBQWMscUJBQXBCO0FBQ0EsSUFBTUMsZ0JBQWdCLDZCQUF0QjtBQUNBLElBQU1DLGtCQUFrQixTQUFsQkEsZUFBa0I7QUFBQSxRQUNwQkMsT0FEb0IsUUFDcEJBLE9BRG9CO0FBQUEsV0FFbEJBLFFBQVFDLEdBQVIsQ0FBWSxpQkFNWjtBQUFBLFlBTEZDLEVBS0UsU0FMRkEsRUFLRTtBQUFBLFlBSkZDLElBSUUsU0FKRkEsSUFJRTtBQUFBLFlBSEZDLEdBR0UsU0FIRkEsR0FHRTtBQUFBLFlBRkZDLElBRUUsU0FGRkEsSUFFRTtBQUFBLFlBREZDLE1BQ0UsU0FERkEsTUFDRTs7QUFDRixZQUFJO0FBQ0o7QUFDSUYsa0JBQU1BLE1BQU1HLEtBQUtDLEtBQUwsQ0FBV0osR0FBWCxDQUFOLEdBQXdCLEVBQTlCO0FBQ0gsU0FIRCxDQUdFLE9BQU9LLEtBQVAsRUFBYztBQUNaTCxrQkFBTSxFQUFOO0FBQ0g7O0FBRUQsWUFBTU0sVUFBVUwsS0FBS0YsSUFBTCxLQUFjLEVBQTlCOztBQUVBO0FBQ0EsWUFBSUEsU0FBUyxh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QSxTQUFTQyxDQUFULEVBQVluQixRQUFaLENBQVo7QUFDSCxTQVhEO0FBWUg7QUF4RlksQ0FBakIiLCJmaWxlIjoibG9hZERhdGEuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbW9kdWxlc1BhcnNlIGZyb20gJy4uL3V0aWxzL21vZHVsZXNQYXJzZSc7XHJcblxyXG5jb25zdCBnZXRQYWdlID0gcmVxdWlyZSgnLi4vdXRpbHMvZ2V0UGFnZScpO1xyXG5jb25zdCB7XHJcbiAgICBnZXQsXHJcbn0gPSByZXF1aXJlKCcuLi91dGlscy9hamF4Jyk7XHJcbmNvbnN0IHtcclxuICAgIHBpY1NyY0RvbWFpbixcclxufSA9IHJlcXVpcmUoJy4uL3V0aWxzL2luZGV4Jyk7XHJcblxyXG5jb25zdCBhcHAgPSByZXF1aXJlKCcuLi91dGlscy9nbG9iYWxEYXRhJyk7XHJcblxyXG5sZXQgcGFnZURhdGFVcmwgPSAnL2J1c2luZXNzL3RlbXBsYXRlL2xvYWRhbGwnO1xyXG5jb25zdCBwYWdlTGlzdFVybCA9ICcvYnVzaW5lc3MvcGFnZUxpc3QvJztcclxuY29uc3QgbG9hZFRhYmJhclVybCA9ICcvYnVzaW5lc3MvZ2V0UmVsZWFzZUNvbmZpZy8nO1xyXG5jb25zdCBwYXJzZUNmZ0FuZERhdGEgPSAoe1xyXG4gICAgbW9kdWxlcyxcclxufSkgPT4gbW9kdWxlcy5tYXAoKHtcclxuICAgIGlkLFxyXG4gICAgbmFtZSxcclxuICAgIGNmZyxcclxuICAgIGRhdGEsXHJcbiAgICBwYXJhbXMsXHJcbn0pID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby1wYXJhbS1yZWFzc2lnbiAqL1xyXG4gICAgICAgIGNmZyA9IGNmZyA/IEpTT04ucGFyc2UoY2ZnKSA6IHt9O1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBjZmcgPSB7fTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBtb2REYXRhID0gZGF0YVtuYW1lXSB8fCB7fTtcclxuXHJcbiAgICAvLyBkYXRhIOS/ruaUuVxyXG4gICAgaWYgKG5hbWUgPT09ICdpbmZvcm1hdGlvbicpIHtcclxuICAgICAgICBtb2REYXRhLmxvZ28gPSBtb2REYXRhLmxvZ28gP1xyXG4gICAgICAgICAgICBwaWNTcmNEb21haW4oKSArIG1vZERhdGEubG9nbyA6XHJcbiAgICAgICAgICAgICdodHRwczovL3BpYzIuNThjZG4uY29tLmNuL2Jpem1wL25fdjI4NWQ2YTE2ZDcyNWE0NDY2OTRkYjM1ZGYyM2M5ZGIyNC5wbmcnO1xyXG4gICAgICAgIGFwcC5nbG9iYWxEYXRhLmluZm9ybWF0aW9uID0gbW9kRGF0YTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAobmFtZSA9PT0gJ2NvdXBvbicpIHtcclxuICAgICAgICBpZiAobW9kRGF0YS5kYXRhKSB7XHJcbiAgICAgICAgICAgIG1vZERhdGEuZGF0YS5mb3JFYWNoKGNvdXBvbiA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCByZWcgPSAvKFswLTldezR9KS0oWzAtMV17MCwxfVswLTldezF9KS0oWzAtM117MCwxfVswLTldezF9KS4rLztcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNvdXBvbkNvbmRpdGlvbiA9IEpTT04ucGFyc2UoY291cG9uLmNvdXBvbkNvbmRpdGlvbik7XHJcbiAgICAgICAgICAgICAgICBpZiAoY291cG9uLnZhbGlkVHlwZSA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oY291cG9uLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLmNvdXBvbkNvbmRpdGlvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRTdGFydERhdGU6IGNvdXBvbi52YWxpZFN0YXJ0dGltZS5yZXBsYWNlKHJlZywgJyQxLiQyLiQzJyksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkRW5kRGF0ZTogY291cG9uLnZhbGlkRW5kdGltZS5yZXBsYWNlKHJlZywgJyQxLiQyLiQzJyksXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oY291cG9uLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLmNvdXBvbkNvbmRpdGlvbixcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKG5hbWUgPT09ICdvcmRlcicpIHtcclxuICAgICAgICBpZiAoIWNmZykge1xyXG4gICAgICAgICAgICBjZmcuaGFzTW9yZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGlmIChuYW1lID09PSAnaW1hZ2VzJyB8fCBuYW1lID09PSAnb3JkZXInKSB7XHJcbiAgICAgICAgY2ZnLnRoZW1lID0gY2ZnLnRoZW1lIHx8ICcxJztcclxuICAgIH1cclxuXHJcbiAgICBpZiAobmFtZSA9PT0gJ3NlcnZpY2VzJyB8fCBuYW1lID09PSAnc2VydmljZU90aGVyJykge1xyXG4gICAgICAgIGlmIChtb2REYXRhLmRhdGEpIHtcclxuICAgICAgICAgICAgbW9kRGF0YS5kYXRhLmZvckVhY2goc2VydmljZSA9PiB7XHJcbiAgICAgICAgICAgICAgICBzZXJ2aWNlLmltZyA9IHBpY1NyY0RvbWFpbigpICsgc2VydmljZS5pbWc7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjZmcudGhlbWUgPSBjZmcudGhlbWUgfHwgJzEnO1xyXG4gICAgICAgIGNmZy50aGVtZXMgPSBbe1xyXG4gICAgICAgICAgICB0aGVtZTogJzEnLFxyXG4gICAgICAgICAgICBzdHlsZU5hbWU6ICdvbmUnLFxyXG4gICAgICAgICAgICB0aXRsZTogJ+Wkp+WbvicsXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoZW1lOiAnMicsXHJcbiAgICAgICAgICAgIHN0eWxlTmFtZTogJ3R3bycsXHJcbiAgICAgICAgICAgIHRpdGxlOiAn5Lit5Zu+JyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhlbWU6ICczJyxcclxuICAgICAgICAgICAgc3R5bGVOYW1lOiAndGhyZWUnLFxyXG4gICAgICAgICAgICB0aXRsZTogJ+Wwj+WbvicsXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoZW1lOiAnNCcsXHJcbiAgICAgICAgICAgIHN0eWxlTmFtZTogJ2ZvdXInLFxyXG4gICAgICAgICAgICB0aXRsZTogJ+aoquWQkea7keWKqCcsXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoZW1lOiAnNScsXHJcbiAgICAgICAgICAgIHN0eWxlTmFtZTogJ2ZpdmUnLFxyXG4gICAgICAgICAgICB0aXRsZTogJ+aoquWQkeWIl+ihqCcsXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoZW1lOiAnNicsXHJcbiAgICAgICAgICAgIHN0eWxlTmFtZTogJ3NpeCcsXHJcbiAgICAgICAgICAgIHRpdGxlOiAn5Y+M5Zu+JyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhlbWU6ICc3JyxcclxuICAgICAgICAgICAgc3R5bGVOYW1lOiAnc2V2ZW4nLFxyXG4gICAgICAgICAgICB0aXRsZTogJzHkuIoy5LiL5pi+56S6JyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIF07XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG5hbWUgPT09ICdzZXJ2aWNlRGV0YWlsJykge1xyXG4gICAgICAgIGlmIChtb2REYXRhLmRlc2NQaWNzKSB7XHJcbiAgICAgICAgICAgIG1vZERhdGEuZGVzY1BpY3MgPSBtb2REYXRhLmRlc2NQaWNzLm1hcChwaWMgPT4gcGljU3JjRG9tYWluKCkgKyBwaWMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3Qgc3RyQXJyID0gbW9kRGF0YS5zZXJ2aWNlSW5mby5zcGxpdCgnXFxuJyk7XHJcbiAgICAgICAgbW9kRGF0YS5odG1sTm9kZXMgPSBzdHJBcnIubWFwKHN0ciA9PiAoe1xyXG4gICAgICAgICAgICBuYW1lOiAncCcsXHJcbiAgICAgICAgICAgIGNoaWxkcmVuOiBbe1xyXG4gICAgICAgICAgICAgICAgdHlwZTogJ3RleHQnLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogc3RyLFxyXG4gICAgICAgICAgICB9XSxcclxuICAgICAgICB9KSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g5a6a5LmJ5qih5p2/5pWw5o2uXHJcbiAgICBjb25zdCBwZCA9IHtcclxuICAgICAgICBpZCxcclxuICAgICAgICBuYW1lLFxyXG4gICAgICAgIHByb3BzOiB7XHJcbiAgICAgICAgICAgIC4uLm1vZERhdGEsXHJcbiAgICAgICAgICAgIGNmZyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHBhcmFtcyxcclxuICAgIH07XHJcblxyXG4gICAgLy8gcHJvcHMgJiBjZmcg5L+u5pS5XHJcbiAgICAvLyBpbWFnZVN3aXBlclxyXG4gICAgaWYgKG5hbWUgPT09ICdpbWFnZVN3aXBlcicpIHtcclxuICAgICAgICBsZXQgaW1hZ2VzID0gbnVsbDtcclxuICAgICAgICBpZiAoIWNmZy5pbWFnZXMpIHtcclxuICAgICAgICAgICAgaW1hZ2VzID0gbW9kRGF0YS5kYXRhO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICh7XHJcbiAgICAgICAgICAgICAgICBpbWFnZXMsXHJcbiAgICAgICAgICAgIH0gPSBjZmcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjZmcuaW1hZ2VzID0gaW1hZ2VzLm1hcChpbWcgPT4gKHtcclxuICAgICAgICAgICAgLi4uaW1nLFxyXG4gICAgICAgICAgICBzcmM6IHBpY1NyY0RvbWFpbigpICsgaW1nLnNyYyxcclxuICAgICAgICB9KSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gaW1hZ2VzIOaooeWdl+WbvueJh+i3r+W+hFxyXG4gICAgaWYgKG5hbWUgPT09ICdpbWFnZXMnKSB7XHJcbiAgICAvLyAgY29uc3QgeyB0aGVtZSB9ID0gY2ZnO1xyXG4gICAgLyogZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOiBcImVycm9yXCIgKi9cclxuICAgICAgICBjZmcuaW1hZ2VzLmZvckVhY2goaW1nID0+IHtcclxuICAgICAgICAgICAgaW1nLnNyYyA9IHBpY1NyY0RvbWFpbigpICsgaW1nLnNyYztcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyDmlofnq6DmqKHlnZflm77niYfot6/lvoRcclxuICAgIGlmIChuYW1lID09PSAnYXJ0aWNsZScpIHtcclxuICAgICAgICBtb2REYXRhLmRhdGEuZm9yRWFjaChhcnRpY2xlID0+IHtcclxuICAgICAgICAgICAgYXJ0aWNsZS5jb3ZlciA9IHBpY1NyY0RvbWFpbigpICsgYXJ0aWNsZS5jb3ZlcjtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyDmlofnq6DmqKHlnZflm77niYfot6/lvoRcclxuICAgIGlmIChuYW1lID09PSAnb3JkZXInKSB7XHJcbiAgICAgICAgbW9kRGF0YS5kYXRhLmZvckVhY2gob3JkZXIgPT4ge1xyXG4gICAgICAgICAgICBvcmRlci5waWNzID0gcGljU3JjRG9tYWluKCkgKyBvcmRlci5waWNzO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgY29uc29sZS5sb2cobmFtZSwgcGQpO1xyXG4gICAgcmV0dXJuIHBkO1xyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgYXN5bmMgbG9hZERhdGEoY2IpIHtcclxuICAgICAgICBjb25zdCBwYWdlID0gZ2V0UGFnZSh0aGlzLnJvdXRlLCB0aGlzLm9wdGlvbnMpIHx8ICdpbmRleCc7XHJcbiAgICAgICAgLy8gY29uc3QgcGFnZSA9ICdpbmRleCc7XHJcbiAgICAgICAgLyogZ2xvYmFsIGdldEN1cnJlbnRQYWdlczp0cnVlICovXHJcbiAgICAgICAgY29uc3Qge1xyXG4gICAgICAgICAgICByb3V0ZSxcclxuICAgICAgICB9ID0gZ2V0Q3VycmVudFBhZ2VzKClbZ2V0Q3VycmVudFBhZ2VzKCkubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgY29uc3QgcGFnZVR5cGUgPSByb3V0ZS5zcGxpdCgncHR5cGU9JylbMV0gfHwgdGhpcy5vcHRpb25zLnB0eXBlIHx8ICcnO1xyXG4gICAgICAgIGNvbnN0IHBvc3REYXRhID0ge1xyXG4gICAgICAgICAgICBwYWdlS2V5OiBwYWdlLFxyXG4gICAgICAgICAgICByZWxlYXNlSWQ6IHd4LmdldFN0b3JhZ2VTeW5jKCdyZWxlYXNlSWQnKSxcclxuICAgICAgICAgICAgbXBpZDogd3guZ2V0U3RvcmFnZVN5bmMoJ21wSWQnKSxcclxuICAgICAgICB9O1xyXG4gICAgICAgIGlmIChwYWdlID09PSAnZGV0YWlsJykge1xyXG4gICAgICAgICAgICBwb3N0RGF0YS5zZXJ2aWNlRGV0YWlsSWQgPSB0aGlzLm9wdGlvbnMuaWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChwYWdlID09PSAnYXJ0aWNsZScpIHtcclxuICAgICAgICAgICAgcGFnZURhdGFVcmwgPSBgL2J1c2luZXNzQXJ0aWNsZS9nZXQvJHt0aGlzLm9wdGlvbnMuaWR9YDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHBhZ2UgPT09ICdjdXN0b20nICYmIHBhZ2VUeXBlKSB7XHJcbiAgICAgICAgICAgIHBvc3REYXRhLnBhZ2VLZXkgPSBwYWdlVHlwZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coYXBwLmdsb2JhbERhdGEuZXh0Q29uZmlnKTtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB3eC5zZXRTdG9yYWdlU3luYygncmVsZWFzZUlkJywgJzEwMTY2MTMwMTk4Njc3NDYzMDQnKTtcclxuICAgICAgICAgICAgd3guc2V0U3RvcmFnZVN5bmMoJ21wSWQnLCAnMTAwMTAxNDQ5NTg2NDIyOTg4OCcpO1xyXG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGdldChwYWdlRGF0YVVybCwgcG9zdERhdGEpO1xyXG4gICAgICAgICAgICAvLyBjb25zdCByZXNwb25zZSA9IGF3YWl0IGdldCgnL2J1c2luZXNzL3RlbXBsYXRlL2xvYWRhbGwnLCB7XHJcbiAgICAgICAgICAgIC8vICAgICBwYWdlS2V5OiAnaW5kZXgnLFxyXG4gICAgICAgICAgICAvLyAgICAgcmVsZWFzZUlkOiB3eC5nZXRTdG9yYWdlU3luYygncmVsZWFzZUlkJyksXHJcbiAgICAgICAgICAgIC8vICAgICBtcGlkOiB3eC5nZXRTdG9yYWdlU3luYygnbXBJZCcsICcxMDAxMDE0NDk1ODY0MjI5ODg4JyksXHJcbiAgICAgICAgICAgIC8vICAgICBhcHBpZDogYXBwLmdsb2JhbERhdGEuZXh0Q29uZmlnLmFwcElkLFxyXG4gICAgICAgICAgICAvLyB9KTtcclxuICAgICAgICAgICAgY29uc3QgbW9kdWxlc0RhdGEgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHJlc3BvbnNlLmRhdGEpKTtcclxuICAgICAgICAgICAgYXBwLmdsb2JhbERhdGEubW9kdWxlcyA9IG1vZHVsZXNQYXJzZS5zaG93KG1vZHVsZXNEYXRhKTtcclxuICAgICAgICAgICAgLyogZXNsaW50LWRpc2FibGUgY2FtZWxjYXNlICovXHJcbiAgICAgICAgICAgIGxldCBwYWdlX2RhdGEgPSBudWxsO1xyXG4gICAgICAgICAgICBpZiAocGFnZSA9PT0gJ2FydGljbGUnKSB7XHJcbiAgICAgICAgICAgICAgICBwYWdlX2RhdGEgPSByZXNwb25zZS5kYXRhO1xyXG4gICAgICAgICAgICAgICAgLyogZXNsaW50IG5vLXVzZWxlc3MtZXNjYXBlOiBcImVycm9yXCIgKi9cclxuICAgICAgICAgICAgICAgIHBhZ2VfZGF0YS5jb250ZW50LnJlcGxhY2UoL15cXHM/KGh0dHB8aHR0cHMpP1xcXFw6XFwvXFwvLywgJ2h0dHBzOi8vJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBwYWdlX2RhdGEgPSBwYXJzZUNmZ0FuZERhdGEocmVzcG9uc2UuZGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8g5Zu+54mH57uE5Lu25pWw5o2uXHJcbiAgICAgICAgICAgIHRoaXMuaW1hZ2VzVmlld1N0YXRlKHBhZ2VfZGF0YSk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBuZXdQYWdlRGF0YSA9IHtcclxuICAgICAgICAgICAgICAgIHBhZ2VUeXBlOiBwYWdlLFxyXG4gICAgICAgICAgICAgICAgY3VycmVudDogMCxcclxuICAgICAgICAgICAgICAgIHBhZ2VfZGF0YTogcGFnZV9kYXRhLFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBhcHAuZ2xvYmFsRGF0YS5wYWdlRGF0YSA9IHBhZ2VfZGF0YTtcclxuICAgICAgICAgICAgdGhpcy5zZXREYXRhKG5ld1BhZ2VEYXRhKTtcclxuICAgICAgICAgICAgY2IgJiYgY2IoKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICByZWZyZXNoUGFnZSgpIHtcclxuICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICBwYWdlX2RhdGE6IGFwcC5nbG9iYWxEYXRhLnBhZ2VEYXRhLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIGFzeW5jIGxvYWRUYWJiYXIoKSB7XHJcbiAgICAgICAgY29uc3QgeyBkYXRhIH0gPSBhd2FpdCBnZXQoYCR7bG9hZFRhYmJhclVybH0vJHt3eC5nZXRTdG9yYWdlU3luYygncmVsZWFzZUlkJyl9YCk7XHJcbiAgICAgICAgYXBwLmdsb2JhbERhdGEudGFiQmFyID0gZGF0YS50YWJCYXI7XHJcbiAgICB9LFxyXG4gICAgYXN5bmMgbG9hZFBhZ2VMaXN0KCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHd4LmdldFN0b3JhZ2VTeW5jKCdyZWxlYXNlSWQnKSk7XHJcbiAgICAgICAgY29uc3QgeyBkYXRhIH0gPSBhd2FpdCBnZXQoYCR7cGFnZUxpc3RVcmx9LyR7d3guZ2V0U3RvcmFnZVN5bmMoJ3JlbGVhc2VJZCcpfWApO1xyXG4gICAgICAgIGFwcC5nbG9iYWxEYXRhLnBhZ2VMaXN0ID0gZGF0YTtcclxuICAgIH0sXHJcblxyXG4gICAgZ2V0QXBwVGl0bGUoY2FsbGJhY2spIHtcclxuICAgICAgICBnZXQoJy9tcEJ1c2luZXNzSW5mby9nZXRUaXRsZScsIChlLCByZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZSB8fCBlID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKGUpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgd3guc2V0TmF2aWdhdGlvbkJhclRpdGxlKHtcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogcmVzcG9uc2UsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYWxsYmFjayAmJiBjYWxsYmFjayhlLCByZXNwb25zZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG59O1xyXG4iXX0=