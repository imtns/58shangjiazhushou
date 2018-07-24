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
                                mpid: wx.getStorageSync('current_mpid')
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
                            _context.next = 11;
                            return get(pageDataUrl, postData);

                        case 11:
                            response = _context.sent;
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
                            // this.imagesViewState(page_data);

                            newPageData = {
                                pageType: page,
                                current: 0,
                                page_data: page_data
                            };

                            if (page === 'index') {
                                app.globalData.pageData = page_data;
                            }
                            this.setData(newPageData);
                            cb && cb();
                            _context.next = 25;
                            break;

                        case 22:
                            _context.prev = 22;
                            _context.t0 = _context['catch'](8);

                            console.log(_context.t0);

                        case 25:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this, [[8, 22]]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvYWREYXRhLmpzIl0sIm5hbWVzIjpbImdldFBhZ2UiLCJyZXF1aXJlIiwiZ2V0IiwicGljU3JjRG9tYWluIiwiYXBwIiwicGFnZURhdGFVcmwiLCJwYWdlTGlzdFVybCIsImxvYWRUYWJiYXJVcmwiLCJwYXJzZUNmZ0FuZERhdGEiLCJtb2R1bGVzIiwibWFwIiwiaWQiLCJuYW1lIiwiY2ZnIiwiZGF0YSIsInBhcmFtcyIsIkpTT04iLCJwYXJzZSIsImVycm9yIiwibW9kRGF0YSIsImxvZ28iLCJnbG9iYWxEYXRhIiwiaW5mb3JtYXRpb24iLCJmb3JFYWNoIiwicmVnIiwiY291cG9uQ29uZGl0aW9uIiwiY291cG9uIiwidmFsaWRUeXBlIiwiT2JqZWN0IiwiYXNzaWduIiwidmFsaWRTdGFydERhdGUiLCJ2YWxpZFN0YXJ0dGltZSIsInJlcGxhY2UiLCJ2YWxpZEVuZERhdGUiLCJ2YWxpZEVuZHRpbWUiLCJoYXNNb3JlIiwidGhlbWUiLCJzZXJ2aWNlIiwiaW1nIiwidGhlbWVzIiwic3R5bGVOYW1lIiwidGl0bGUiLCJkZXNjUGljcyIsInBpYyIsInN0ckFyciIsInNlcnZpY2VJbmZvIiwic3BsaXQiLCJodG1sTm9kZXMiLCJjaGlsZHJlbiIsInR5cGUiLCJ0ZXh0Iiwic3RyIiwicGQiLCJwcm9wcyIsImltYWdlcyIsInNyYyIsImFydGljbGUiLCJjb3ZlciIsIm9yZGVyIiwicGljcyIsImNvbnNvbGUiLCJsb2ciLCJtb2R1bGUiLCJleHBvcnRzIiwibG9hZERhdGEiLCJjYiIsInBhZ2UiLCJyb3V0ZSIsIm9wdGlvbnMiLCJnZXRDdXJyZW50UGFnZXMiLCJsZW5ndGgiLCJwYWdlVHlwZSIsInB0eXBlIiwicG9zdERhdGEiLCJwYWdlS2V5IiwicmVsZWFzZUlkIiwid3giLCJnZXRTdG9yYWdlU3luYyIsIm1waWQiLCJzZXJ2aWNlRGV0YWlsSWQiLCJleHRDb25maWciLCJyZXNwb25zZSIsIm1vZHVsZXNEYXRhIiwic3RyaW5naWZ5IiwibW9kdWxlc1BhcnNlIiwic2hvdyIsInBhZ2VfZGF0YSIsImNvbnRlbnQiLCJuZXdQYWdlRGF0YSIsImN1cnJlbnQiLCJwYWdlRGF0YSIsInNldERhdGEiLCJyZWZyZXNoUGFnZSIsImxvYWRUYWJiYXIiLCJ0YWJCYXIiLCJsb2FkUGFnZUxpc3QiLCJwYWdlTGlzdCIsImdldEFwcFRpdGxlIiwiY2FsbGJhY2siLCJlIiwidW5kZWZpbmVkIiwic2V0TmF2aWdhdGlvbkJhclRpdGxlIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUE7Ozs7Ozs7O0FBRUEsSUFBTUEsVUFBVUMsUUFBUSxrQkFBUixDQUFoQjs7ZUFHSUEsUUFBUSxlQUFSLEM7SUFEQUMsRyxZQUFBQSxHOztnQkFJQUQsUUFBUSxnQkFBUixDO0lBREFFLFksYUFBQUEsWTs7QUFHSixJQUFNQyxNQUFNSCxRQUFRLHFCQUFSLENBQVo7O0FBRUEsSUFBSUksY0FBYyw0QkFBbEI7QUFDQSxJQUFNQyxjQUFjLHFCQUFwQjtBQUNBLElBQU1DLGdCQUFnQiw2QkFBdEI7QUFDQSxJQUFNQyxrQkFBa0IsU0FBbEJBLGVBQWtCO0FBQUEsUUFDcEJDLE9BRG9CLFFBQ3BCQSxPQURvQjtBQUFBLFdBRWxCQSxRQUFRQyxHQUFSLENBQVksaUJBTVo7QUFBQSxZQUxGQyxFQUtFLFNBTEZBLEVBS0U7QUFBQSxZQUpGQyxJQUlFLFNBSkZBLElBSUU7QUFBQSxZQUhGQyxHQUdFLFNBSEZBLEdBR0U7QUFBQSxZQUZGQyxJQUVFLFNBRkZBLElBRUU7QUFBQSxZQURGQyxNQUNFLFNBREZBLE1BQ0U7O0FBQ0YsWUFBSTtBQUNKO0FBQ0lGLGtCQUFNQSxNQUFNRyxLQUFLQyxLQUFMLENBQVdKLEdBQVgsQ0FBTixHQUF3QixFQUE5QjtBQUNILFNBSEQsQ0FHRSxPQUFPSyxLQUFQLEVBQWM7QUFDWkwsa0JBQU0sRUFBTjtBQUNIOztBQUVELFlBQU1NLFVBQVVMLEtBQUtGLElBQUwsS0FBYyxFQUE5Qjs7QUFFQTtBQUNBLFlBQUlBLFNBQVMsYUFBYixFQUE0QjtBQUN4Qk8sb0JBQVFDLElBQVIsR0FBZUQsUUFBUUMsSUFBUixHQUNYakIsaUJBQWlCZ0IsUUFBUUMsSUFEZCxHQUVYLDBFQUZKO0FBR0FoQixnQkFBSWlCLFVBQUosQ0FBZUMsV0FBZixHQUE2QkgsT0FBN0I7QUFDSDs7QUFFRCxZQUFJUCxTQUFTLFFBQWIsRUFBdUI7QUFDbkIsZ0JBQUlPLFFBQVFMLElBQVosRUFBa0I7QUFDZEssd0JBQVFMLElBQVIsQ0FBYVMsT0FBYixDQUFxQixrQkFBVTtBQUMzQix3QkFBTUMsTUFBTSx3REFBWjtBQUNBLHdCQUFNQyxrQkFBa0JULEtBQUtDLEtBQUwsQ0FBV1MsT0FBT0QsZUFBbEIsQ0FBeEI7QUFDQSx3QkFBSUMsT0FBT0MsU0FBUCxLQUFxQixDQUF6QixFQUE0QjtBQUN4QkMsK0JBQU9DLE1BQVAsQ0FBY0gsTUFBZCxlQUNPRCxlQURQO0FBRUlLLDRDQUFnQkosT0FBT0ssY0FBUCxDQUFzQkMsT0FBdEIsQ0FBOEJSLEdBQTlCLEVBQW1DLFVBQW5DLENBRnBCO0FBR0lTLDBDQUFjUCxPQUFPUSxZQUFQLENBQW9CRixPQUFwQixDQUE0QlIsR0FBNUIsRUFBaUMsVUFBakM7QUFIbEI7QUFLSCxxQkFORCxNQU1PO0FBQ0hJLCtCQUFPQyxNQUFQLENBQWNILE1BQWQsZUFDT0QsZUFEUDtBQUdIO0FBQ0osaUJBZEQ7QUFlSDtBQUNKO0FBQ0QsWUFBSWIsU0FBUyxPQUFiLEVBQXNCO0FBQ2xCLGdCQUFJLENBQUNDLEdBQUwsRUFBVTtBQUNOQSxvQkFBSXNCLE9BQUosR0FBYyxLQUFkO0FBQ0g7QUFDSjtBQUNELFlBQUl2QixTQUFTLFFBQVQsSUFBcUJBLFNBQVMsT0FBbEMsRUFBMkM7QUFDdkNDLGdCQUFJdUIsS0FBSixHQUFZdkIsSUFBSXVCLEtBQUosSUFBYSxHQUF6QjtBQUNIOztBQUVELFlBQUl4QixTQUFTLFVBQVQsSUFBdUJBLFNBQVMsY0FBcEMsRUFBb0Q7QUFDaEQsZ0JBQUlPLFFBQVFMLElBQVosRUFBa0I7QUFDZEssd0JBQVFMLElBQVIsQ0FBYVMsT0FBYixDQUFxQixtQkFBVztBQUM1QmMsNEJBQVFDLEdBQVIsR0FBY25DLGlCQUFpQmtDLFFBQVFDLEdBQXZDO0FBQ0gsaUJBRkQ7QUFHSDtBQUNEekIsZ0JBQUl1QixLQUFKLEdBQVl2QixJQUFJdUIsS0FBSixJQUFhLEdBQXpCO0FBQ0F2QixnQkFBSTBCLE1BQUosR0FBYSxDQUFDO0FBQ1ZILHVCQUFPLEdBREc7QUFFVkksMkJBQVcsS0FGRDtBQUdWQyx1QkFBTztBQUhHLGFBQUQsRUFLYjtBQUNJTCx1QkFBTyxHQURYO0FBRUlJLDJCQUFXLEtBRmY7QUFHSUMsdUJBQU87QUFIWCxhQUxhLEVBVWI7QUFDSUwsdUJBQU8sR0FEWDtBQUVJSSwyQkFBVyxPQUZmO0FBR0lDLHVCQUFPO0FBSFgsYUFWYSxFQWViO0FBQ0lMLHVCQUFPLEdBRFg7QUFFSUksMkJBQVcsTUFGZjtBQUdJQyx1QkFBTztBQUhYLGFBZmEsRUFvQmI7QUFDSUwsdUJBQU8sR0FEWDtBQUVJSSwyQkFBVyxNQUZmO0FBR0lDLHVCQUFPO0FBSFgsYUFwQmEsRUF5QmI7QUFDSUwsdUJBQU8sR0FEWDtBQUVJSSwyQkFBVyxLQUZmO0FBR0lDLHVCQUFPO0FBSFgsYUF6QmEsRUE4QmI7QUFDSUwsdUJBQU8sR0FEWDtBQUVJSSwyQkFBVyxPQUZmO0FBR0lDLHVCQUFPO0FBSFgsYUE5QmEsQ0FBYjtBQW9DSDs7QUFFRCxZQUFJN0IsU0FBUyxlQUFiLEVBQThCO0FBQzFCLGdCQUFJTyxRQUFRdUIsUUFBWixFQUFzQjtBQUNsQnZCLHdCQUFRdUIsUUFBUixHQUFtQnZCLFFBQVF1QixRQUFSLENBQWlCaEMsR0FBakIsQ0FBcUI7QUFBQSwyQkFBT1AsaUJBQWlCd0MsR0FBeEI7QUFBQSxpQkFBckIsQ0FBbkI7QUFDSDs7QUFFRCxnQkFBTUMsU0FBU3pCLFFBQVEwQixXQUFSLENBQW9CQyxLQUFwQixDQUEwQixJQUExQixDQUFmO0FBQ0EzQixvQkFBUTRCLFNBQVIsR0FBb0JILE9BQU9sQyxHQUFQLENBQVc7QUFBQSx1QkFBUTtBQUNuQ0UsMEJBQU0sR0FENkI7QUFFbkNvQyw4QkFBVSxDQUFDO0FBQ1BDLDhCQUFNLE1BREM7QUFFUEMsOEJBQU1DO0FBRkMscUJBQUQ7QUFGeUIsaUJBQVI7QUFBQSxhQUFYLENBQXBCO0FBT0g7O0FBRUQ7QUFDQSxZQUFNQyxLQUFLO0FBQ1B6QyxrQkFETztBQUVQQyxzQkFGTztBQUdQeUMsZ0NBQ09sQyxPQURQO0FBRUlOO0FBRkosY0FITztBQU9QRTtBQVBPLFNBQVg7O0FBVUE7QUFDQTtBQUNBLFlBQUlILFNBQVMsYUFBYixFQUE0QjtBQUN4QixnQkFBSTBDLFNBQVMsSUFBYjtBQUNBLGdCQUFJLENBQUN6QyxJQUFJeUMsTUFBVCxFQUFpQjtBQUNiQSx5QkFBU25DLFFBQVFMLElBQWpCO0FBQ0gsYUFGRCxNQUVPO0FBQUEsMkJBR0NELEdBSEQ7QUFFQ3lDLHNCQUZELFFBRUNBLE1BRkQ7QUFJTjtBQUNEekMsZ0JBQUl5QyxNQUFKLEdBQWFBLE9BQU81QyxHQUFQLENBQVc7QUFBQSxvQ0FDakI0QixHQURpQjtBQUVwQmlCLHlCQUFLcEQsaUJBQWlCbUMsSUFBSWlCO0FBRk47QUFBQSxhQUFYLENBQWI7QUFJSDs7QUFFRDtBQUNBLFlBQUkzQyxTQUFTLFFBQWIsRUFBdUI7QUFDdkI7QUFDQTtBQUNJQyxnQkFBSXlDLE1BQUosQ0FBVy9CLE9BQVgsQ0FBbUIsZUFBTztBQUN0QmUsb0JBQUlpQixHQUFKLEdBQVVwRCxpQkFBaUJtQyxJQUFJaUIsR0FBL0I7QUFDSCxhQUZEO0FBR0g7O0FBRUQ7QUFDQSxZQUFJM0MsU0FBUyxTQUFiLEVBQXdCO0FBQ3BCTyxvQkFBUUwsSUFBUixDQUFhUyxPQUFiLENBQXFCLG1CQUFXO0FBQzVCaUMsd0JBQVFDLEtBQVIsR0FBZ0J0RCxpQkFBaUJxRCxRQUFRQyxLQUF6QztBQUNILGFBRkQ7QUFHSDs7QUFFRDtBQUNBLFlBQUk3QyxTQUFTLE9BQWIsRUFBc0I7QUFDbEJPLG9CQUFRTCxJQUFSLENBQWFTLE9BQWIsQ0FBcUIsaUJBQVM7QUFDMUJtQyxzQkFBTUMsSUFBTixHQUFheEQsaUJBQWlCdUQsTUFBTUMsSUFBcEM7QUFDSCxhQUZEO0FBR0g7QUFDREMsZ0JBQVFDLEdBQVIsQ0FBWWpELElBQVosRUFBa0J3QyxFQUFsQjtBQUNBLGVBQU9BLEVBQVA7QUFDSCxLQXBLSyxDQUZrQjtBQUFBLENBQXhCOztBQXdLQVUsT0FBT0MsT0FBUCxHQUFpQjtBQUNQQyxZQURPO0FBQUEsNkZBQ0VDLEVBREY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRUhDLGdDQUZHLEdBRUlsRSxRQUFRLEtBQUttRSxLQUFiLEVBQW9CLEtBQUtDLE9BQXpCLEtBQXFDLE9BRnpDO0FBR1Q7QUFDQTs7QUFFSUQsaUNBTkssR0FPTEUsa0JBQWtCQSxrQkFBa0JDLE1BQWxCLEdBQTJCLENBQTdDLENBUEssQ0FNTEgsS0FOSztBQVFISSxvQ0FSRyxHQVFRSixNQUFNckIsS0FBTixDQUFZLFFBQVosRUFBc0IsQ0FBdEIsS0FBNEIsS0FBS3NCLE9BQUwsQ0FBYUksS0FBekMsSUFBa0QsRUFSMUQ7QUFTSEMsb0NBVEcsR0FTUTtBQUNiQyx5Q0FBU1IsSUFESTtBQUViUywyQ0FBV0MsR0FBR0MsY0FBSCxDQUFrQixXQUFsQixDQUZFO0FBR2JDLHNDQUFNRixHQUFHQyxjQUFILENBQWtCLGNBQWxCO0FBSE8sNkJBVFI7O0FBY1QsZ0NBQUlYLFNBQVMsUUFBYixFQUF1QjtBQUNuQk8seUNBQVNNLGVBQVQsR0FBMkIsS0FBS1gsT0FBTCxDQUFhekQsRUFBeEM7QUFDSDtBQUNELGdDQUFJdUQsU0FBUyxTQUFiLEVBQXdCO0FBQ3BCN0Qsd0VBQXNDLEtBQUsrRCxPQUFMLENBQWF6RCxFQUFuRDtBQUNIO0FBQ0QsZ0NBQUl1RCxTQUFTLFFBQVQsSUFBcUJLLFFBQXpCLEVBQW1DO0FBQy9CRSx5Q0FBU0MsT0FBVCxHQUFtQkgsUUFBbkI7QUFDSDtBQUNEWCxvQ0FBUUMsR0FBUixDQUFZekQsSUFBSWlCLFVBQUosQ0FBZTJELFNBQTNCO0FBdkJTO0FBQUE7QUFBQSxtQ0F5QmtCOUUsSUFBSUcsV0FBSixFQUFpQm9FLFFBQWpCLENBekJsQjs7QUFBQTtBQXlCQ1Esb0NBekJEO0FBMEJDQyx1Q0ExQkQsR0EwQmVsRSxLQUFLQyxLQUFMLENBQVdELEtBQUttRSxTQUFMLENBQWVGLFNBQVNuRSxJQUF4QixDQUFYLENBMUJmOztBQTJCTFYsZ0NBQUlpQixVQUFKLENBQWVaLE9BQWYsR0FBeUIyRSx1QkFBYUMsSUFBYixDQUFrQkgsV0FBbEIsQ0FBekI7QUFDQTtBQUNJSSxxQ0E3QkMsR0E2QlcsSUE3Qlg7O0FBOEJMLGdDQUFJcEIsU0FBUyxTQUFiLEVBQXdCO0FBQ3BCb0IsNENBQVlMLFNBQVNuRSxJQUFyQjtBQUNBO0FBQ0F3RSwwQ0FBVUMsT0FBVixDQUFrQnZELE9BQWxCLENBQTBCLDBCQUExQixFQUFzRCxVQUF0RDtBQUNILDZCQUpELE1BSU87QUFDSHNELDRDQUFZOUUsZ0JBQWdCeUUsU0FBU25FLElBQXpCLENBQVo7QUFDSDtBQUNEO0FBQ0E7O0FBRU0wRSx1Q0F4Q0QsR0F3Q2U7QUFDaEJqQiwwQ0FBVUwsSUFETTtBQUVoQnVCLHlDQUFTLENBRk87QUFHaEJILDJDQUFXQTtBQUhLLDZCQXhDZjs7QUE2Q0wsZ0NBQUlwQixTQUFTLE9BQWIsRUFBc0I7QUFDbEI5RCxvQ0FBSWlCLFVBQUosQ0FBZXFFLFFBQWYsR0FBMEJKLFNBQTFCO0FBQ0g7QUFDRCxpQ0FBS0ssT0FBTCxDQUFhSCxXQUFiO0FBQ0F2QixrQ0FBTUEsSUFBTjtBQWpESztBQUFBOztBQUFBO0FBQUE7QUFBQTs7QUFtRExMLG9DQUFRQyxHQUFSOztBQW5ESztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQXNEYitCLGVBdERhLHlCQXNEQztBQUNWLGFBQUtELE9BQUwsQ0FBYTtBQUNUTCx1QkFBV2xGLElBQUlpQixVQUFKLENBQWVxRTtBQURqQixTQUFiO0FBR0gsS0ExRFk7QUEyRFBHLGNBM0RPO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUNBNERjM0YsSUFBT0ssYUFBUCxTQUF3QnFFLEdBQUdDLGNBQUgsQ0FBa0IsV0FBbEIsQ0FBeEIsQ0E1RGQ7O0FBQUE7QUFBQTtBQTRERC9ELGdDQTVEQyxTQTREREEsSUE1REM7O0FBNkRUVixnQ0FBSWlCLFVBQUosQ0FBZXlFLE1BQWYsR0FBd0JoRixLQUFLZ0YsTUFBN0I7O0FBN0RTO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBK0RQQyxnQkEvRE87QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBZ0VUbkMsb0NBQVFDLEdBQVIsQ0FBWWUsR0FBR0MsY0FBSCxDQUFrQixXQUFsQixDQUFaO0FBaEVTO0FBQUEsbUNBaUVjM0UsSUFBT0ksV0FBUCxTQUFzQnNFLEdBQUdDLGNBQUgsQ0FBa0IsV0FBbEIsQ0FBdEIsQ0FqRWQ7O0FBQUE7QUFBQTtBQWlFRC9ELGdDQWpFQyxTQWlFREEsSUFqRUM7O0FBa0VUVixnQ0FBSWlCLFVBQUosQ0FBZTJFLFFBQWYsR0FBMEJsRixJQUExQjs7QUFsRVM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFxRWJtRixlQXJFYSx1QkFxRURDLFFBckVDLEVBcUVTO0FBQ2xCaEcsWUFBSSwwQkFBSixFQUFnQyxVQUFDaUcsQ0FBRCxFQUFJbEIsUUFBSixFQUFpQjtBQUM3QyxnQkFBSWtCLEtBQUtBLE1BQU1DLFNBQWYsRUFBMEI7QUFDdEJGLDRCQUFZQSxTQUFTQyxDQUFULENBQVo7QUFDQTtBQUNIO0FBQ0QsZ0JBQUlsQixRQUFKLEVBQWM7QUFDVkwsbUJBQUd5QixxQkFBSCxDQUF5QjtBQUNyQjVELDJCQUFPd0M7QUFEYyxpQkFBekI7QUFHSDtBQUNEaUIsd0JBQVlBLFNBQVNDLENBQVQsRUFBWWxCLFFBQVosQ0FBWjtBQUNILFNBWEQ7QUFZSDtBQWxGWSxDQUFqQiIsImZpbGUiOiJsb2FkRGF0YS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtb2R1bGVzUGFyc2UgZnJvbSAnLi4vdXRpbHMvbW9kdWxlc1BhcnNlJztcblxuY29uc3QgZ2V0UGFnZSA9IHJlcXVpcmUoJy4uL3V0aWxzL2dldFBhZ2UnKTtcbmNvbnN0IHtcbiAgICBnZXQsXG59ID0gcmVxdWlyZSgnLi4vdXRpbHMvYWpheCcpO1xuY29uc3Qge1xuICAgIHBpY1NyY0RvbWFpbixcbn0gPSByZXF1aXJlKCcuLi91dGlscy9pbmRleCcpO1xuXG5jb25zdCBhcHAgPSByZXF1aXJlKCcuLi91dGlscy9nbG9iYWxEYXRhJyk7XG5cbmxldCBwYWdlRGF0YVVybCA9ICcvYnVzaW5lc3MvdGVtcGxhdGUvbG9hZGFsbCc7XG5jb25zdCBwYWdlTGlzdFVybCA9ICcvYnVzaW5lc3MvcGFnZUxpc3QvJztcbmNvbnN0IGxvYWRUYWJiYXJVcmwgPSAnL2J1c2luZXNzL2dldFJlbGVhc2VDb25maWcvJztcbmNvbnN0IHBhcnNlQ2ZnQW5kRGF0YSA9ICh7XG4gICAgbW9kdWxlcyxcbn0pID0+IG1vZHVsZXMubWFwKCh7XG4gICAgaWQsXG4gICAgbmFtZSxcbiAgICBjZmcsXG4gICAgZGF0YSxcbiAgICBwYXJhbXMsXG59KSA9PiB7XG4gICAgdHJ5IHtcbiAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby1wYXJhbS1yZWFzc2lnbiAqL1xuICAgICAgICBjZmcgPSBjZmcgPyBKU09OLnBhcnNlKGNmZykgOiB7fTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjZmcgPSB7fTtcbiAgICB9XG5cbiAgICBjb25zdCBtb2REYXRhID0gZGF0YVtuYW1lXSB8fCB7fTtcblxuICAgIC8vIGRhdGEg5L+u5pS5XG4gICAgaWYgKG5hbWUgPT09ICdpbmZvcm1hdGlvbicpIHtcbiAgICAgICAgbW9kRGF0YS5sb2dvID0gbW9kRGF0YS5sb2dvID9cbiAgICAgICAgICAgIHBpY1NyY0RvbWFpbigpICsgbW9kRGF0YS5sb2dvIDpcbiAgICAgICAgICAgICdodHRwczovL3BpYzIuNThjZG4uY29tLmNuL2Jpem1wL25fdjI4NWQ2YTE2ZDcyNWE0NDY2OTRkYjM1ZGYyM2M5ZGIyNC5wbmcnO1xuICAgICAgICBhcHAuZ2xvYmFsRGF0YS5pbmZvcm1hdGlvbiA9IG1vZERhdGE7XG4gICAgfVxuXG4gICAgaWYgKG5hbWUgPT09ICdjb3Vwb24nKSB7XG4gICAgICAgIGlmIChtb2REYXRhLmRhdGEpIHtcbiAgICAgICAgICAgIG1vZERhdGEuZGF0YS5mb3JFYWNoKGNvdXBvbiA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVnID0gLyhbMC05XXs0fSktKFswLTFdezAsMX1bMC05XXsxfSktKFswLTNdezAsMX1bMC05XXsxfSkuKy87XG4gICAgICAgICAgICAgICAgY29uc3QgY291cG9uQ29uZGl0aW9uID0gSlNPTi5wYXJzZShjb3Vwb24uY291cG9uQ29uZGl0aW9uKTtcbiAgICAgICAgICAgICAgICBpZiAoY291cG9uLnZhbGlkVHlwZSA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKGNvdXBvbiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgLi4uY291cG9uQ29uZGl0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRTdGFydERhdGU6IGNvdXBvbi52YWxpZFN0YXJ0dGltZS5yZXBsYWNlKHJlZywgJyQxLiQyLiQzJyksXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWxpZEVuZERhdGU6IGNvdXBvbi52YWxpZEVuZHRpbWUucmVwbGFjZShyZWcsICckMS4kMi4kMycpLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKGNvdXBvbiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgLi4uY291cG9uQ29uZGl0aW9uLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAobmFtZSA9PT0gJ29yZGVyJykge1xuICAgICAgICBpZiAoIWNmZykge1xuICAgICAgICAgICAgY2ZnLmhhc01vcmUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAobmFtZSA9PT0gJ2ltYWdlcycgfHwgbmFtZSA9PT0gJ29yZGVyJykge1xuICAgICAgICBjZmcudGhlbWUgPSBjZmcudGhlbWUgfHwgJzEnO1xuICAgIH1cblxuICAgIGlmIChuYW1lID09PSAnc2VydmljZXMnIHx8IG5hbWUgPT09ICdzZXJ2aWNlT3RoZXInKSB7XG4gICAgICAgIGlmIChtb2REYXRhLmRhdGEpIHtcbiAgICAgICAgICAgIG1vZERhdGEuZGF0YS5mb3JFYWNoKHNlcnZpY2UgPT4ge1xuICAgICAgICAgICAgICAgIHNlcnZpY2UuaW1nID0gcGljU3JjRG9tYWluKCkgKyBzZXJ2aWNlLmltZztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGNmZy50aGVtZSA9IGNmZy50aGVtZSB8fCAnMSc7XG4gICAgICAgIGNmZy50aGVtZXMgPSBbe1xuICAgICAgICAgICAgdGhlbWU6ICcxJyxcbiAgICAgICAgICAgIHN0eWxlTmFtZTogJ29uZScsXG4gICAgICAgICAgICB0aXRsZTogJ+Wkp+WbvicsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoZW1lOiAnMicsXG4gICAgICAgICAgICBzdHlsZU5hbWU6ICd0d28nLFxuICAgICAgICAgICAgdGl0bGU6ICfkuK3lm74nLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICB0aGVtZTogJzMnLFxuICAgICAgICAgICAgc3R5bGVOYW1lOiAndGhyZWUnLFxuICAgICAgICAgICAgdGl0bGU6ICflsI/lm74nLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICB0aGVtZTogJzQnLFxuICAgICAgICAgICAgc3R5bGVOYW1lOiAnZm91cicsXG4gICAgICAgICAgICB0aXRsZTogJ+aoquWQkea7keWKqCcsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoZW1lOiAnNScsXG4gICAgICAgICAgICBzdHlsZU5hbWU6ICdmaXZlJyxcbiAgICAgICAgICAgIHRpdGxlOiAn5qiq5ZCR5YiX6KGoJyxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgdGhlbWU6ICc2JyxcbiAgICAgICAgICAgIHN0eWxlTmFtZTogJ3NpeCcsXG4gICAgICAgICAgICB0aXRsZTogJ+WPjOWbvicsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoZW1lOiAnNycsXG4gICAgICAgICAgICBzdHlsZU5hbWU6ICdzZXZlbicsXG4gICAgICAgICAgICB0aXRsZTogJzHkuIoy5LiL5pi+56S6JyxcbiAgICAgICAgfSxcbiAgICAgICAgXTtcbiAgICB9XG5cbiAgICBpZiAobmFtZSA9PT0gJ3NlcnZpY2VEZXRhaWwnKSB7XG4gICAgICAgIGlmIChtb2REYXRhLmRlc2NQaWNzKSB7XG4gICAgICAgICAgICBtb2REYXRhLmRlc2NQaWNzID0gbW9kRGF0YS5kZXNjUGljcy5tYXAocGljID0+IHBpY1NyY0RvbWFpbigpICsgcGljKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHN0ckFyciA9IG1vZERhdGEuc2VydmljZUluZm8uc3BsaXQoJ1xcbicpO1xuICAgICAgICBtb2REYXRhLmh0bWxOb2RlcyA9IHN0ckFyci5tYXAoc3RyID0+ICh7XG4gICAgICAgICAgICBuYW1lOiAncCcsXG4gICAgICAgICAgICBjaGlsZHJlbjogW3tcbiAgICAgICAgICAgICAgICB0eXBlOiAndGV4dCcsXG4gICAgICAgICAgICAgICAgdGV4dDogc3RyLFxuICAgICAgICAgICAgfV0sXG4gICAgICAgIH0pKTtcbiAgICB9XG5cbiAgICAvLyDlrprkuYnmqKHmnb/mlbDmja5cbiAgICBjb25zdCBwZCA9IHtcbiAgICAgICAgaWQsXG4gICAgICAgIG5hbWUsXG4gICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgICAuLi5tb2REYXRhLFxuICAgICAgICAgICAgY2ZnLFxuICAgICAgICB9LFxuICAgICAgICBwYXJhbXMsXG4gICAgfTtcblxuICAgIC8vIHByb3BzICYgY2ZnIOS/ruaUuVxuICAgIC8vIGltYWdlU3dpcGVyXG4gICAgaWYgKG5hbWUgPT09ICdpbWFnZVN3aXBlcicpIHtcbiAgICAgICAgbGV0IGltYWdlcyA9IG51bGw7XG4gICAgICAgIGlmICghY2ZnLmltYWdlcykge1xuICAgICAgICAgICAgaW1hZ2VzID0gbW9kRGF0YS5kYXRhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgKHtcbiAgICAgICAgICAgICAgICBpbWFnZXMsXG4gICAgICAgICAgICB9ID0gY2ZnKTtcbiAgICAgICAgfVxuICAgICAgICBjZmcuaW1hZ2VzID0gaW1hZ2VzLm1hcChpbWcgPT4gKHtcbiAgICAgICAgICAgIC4uLmltZyxcbiAgICAgICAgICAgIHNyYzogcGljU3JjRG9tYWluKCkgKyBpbWcuc3JjLFxuICAgICAgICB9KSk7XG4gICAgfVxuXG4gICAgLy8gaW1hZ2VzIOaooeWdl+WbvueJh+i3r+W+hFxuICAgIGlmIChuYW1lID09PSAnaW1hZ2VzJykge1xuICAgIC8vICBjb25zdCB7IHRoZW1lIH0gPSBjZmc7XG4gICAgLyogZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOiBcImVycm9yXCIgKi9cbiAgICAgICAgY2ZnLmltYWdlcy5mb3JFYWNoKGltZyA9PiB7XG4gICAgICAgICAgICBpbWcuc3JjID0gcGljU3JjRG9tYWluKCkgKyBpbWcuc3JjO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyDmlofnq6DmqKHlnZflm77niYfot6/lvoRcbiAgICBpZiAobmFtZSA9PT0gJ2FydGljbGUnKSB7XG4gICAgICAgIG1vZERhdGEuZGF0YS5mb3JFYWNoKGFydGljbGUgPT4ge1xuICAgICAgICAgICAgYXJ0aWNsZS5jb3ZlciA9IHBpY1NyY0RvbWFpbigpICsgYXJ0aWNsZS5jb3ZlcjtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8g5paH56ug5qih5Z2X5Zu+54mH6Lev5b6EXG4gICAgaWYgKG5hbWUgPT09ICdvcmRlcicpIHtcbiAgICAgICAgbW9kRGF0YS5kYXRhLmZvckVhY2gob3JkZXIgPT4ge1xuICAgICAgICAgICAgb3JkZXIucGljcyA9IHBpY1NyY0RvbWFpbigpICsgb3JkZXIucGljcztcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKG5hbWUsIHBkKTtcbiAgICByZXR1cm4gcGQ7XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgYXN5bmMgbG9hZERhdGEoY2IpIHtcbiAgICAgICAgY29uc3QgcGFnZSA9IGdldFBhZ2UodGhpcy5yb3V0ZSwgdGhpcy5vcHRpb25zKSB8fCAnaW5kZXgnO1xuICAgICAgICAvLyBjb25zdCBwYWdlID0gJ2luZGV4JztcbiAgICAgICAgLyogZ2xvYmFsIGdldEN1cnJlbnRQYWdlczp0cnVlICovXG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgIHJvdXRlLFxuICAgICAgICB9ID0gZ2V0Q3VycmVudFBhZ2VzKClbZ2V0Q3VycmVudFBhZ2VzKCkubGVuZ3RoIC0gMV07XG4gICAgICAgIGNvbnN0IHBhZ2VUeXBlID0gcm91dGUuc3BsaXQoJ3B0eXBlPScpWzFdIHx8IHRoaXMub3B0aW9ucy5wdHlwZSB8fCAnJztcbiAgICAgICAgY29uc3QgcG9zdERhdGEgPSB7XG4gICAgICAgICAgICBwYWdlS2V5OiBwYWdlLFxuICAgICAgICAgICAgcmVsZWFzZUlkOiB3eC5nZXRTdG9yYWdlU3luYygncmVsZWFzZUlkJyksXG4gICAgICAgICAgICBtcGlkOiB3eC5nZXRTdG9yYWdlU3luYygnY3VycmVudF9tcGlkJyksXG4gICAgICAgIH07XG4gICAgICAgIGlmIChwYWdlID09PSAnZGV0YWlsJykge1xuICAgICAgICAgICAgcG9zdERhdGEuc2VydmljZURldGFpbElkID0gdGhpcy5vcHRpb25zLmlkO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwYWdlID09PSAnYXJ0aWNsZScpIHtcbiAgICAgICAgICAgIHBhZ2VEYXRhVXJsID0gYC9idXNpbmVzc0FydGljbGUvZ2V0LyR7dGhpcy5vcHRpb25zLmlkfWA7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBhZ2UgPT09ICdjdXN0b20nICYmIHBhZ2VUeXBlKSB7XG4gICAgICAgICAgICBwb3N0RGF0YS5wYWdlS2V5ID0gcGFnZVR5cGU7XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coYXBwLmdsb2JhbERhdGEuZXh0Q29uZmlnKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZ2V0KHBhZ2VEYXRhVXJsLCBwb3N0RGF0YSk7XG4gICAgICAgICAgICBjb25zdCBtb2R1bGVzRGF0YSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkocmVzcG9uc2UuZGF0YSkpO1xuICAgICAgICAgICAgYXBwLmdsb2JhbERhdGEubW9kdWxlcyA9IG1vZHVsZXNQYXJzZS5zaG93KG1vZHVsZXNEYXRhKTtcbiAgICAgICAgICAgIC8qIGVzbGludC1kaXNhYmxlIGNhbWVsY2FzZSAqL1xuICAgICAgICAgICAgbGV0IHBhZ2VfZGF0YSA9IG51bGw7XG4gICAgICAgICAgICBpZiAocGFnZSA9PT0gJ2FydGljbGUnKSB7XG4gICAgICAgICAgICAgICAgcGFnZV9kYXRhID0gcmVzcG9uc2UuZGF0YTtcbiAgICAgICAgICAgICAgICAvKiBlc2xpbnQgbm8tdXNlbGVzcy1lc2NhcGU6IFwiZXJyb3JcIiAqL1xuICAgICAgICAgICAgICAgIHBhZ2VfZGF0YS5jb250ZW50LnJlcGxhY2UoL15cXHM/KGh0dHB8aHR0cHMpP1xcXFw6XFwvXFwvLywgJ2h0dHBzOi8vJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHBhZ2VfZGF0YSA9IHBhcnNlQ2ZnQW5kRGF0YShyZXNwb25zZS5kYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIOWbvueJh+e7hOS7tuaVsOaNrlxuICAgICAgICAgICAgLy8gdGhpcy5pbWFnZXNWaWV3U3RhdGUocGFnZV9kYXRhKTtcblxuICAgICAgICAgICAgY29uc3QgbmV3UGFnZURhdGEgPSB7XG4gICAgICAgICAgICAgICAgcGFnZVR5cGU6IHBhZ2UsXG4gICAgICAgICAgICAgICAgY3VycmVudDogMCxcbiAgICAgICAgICAgICAgICBwYWdlX2RhdGE6IHBhZ2VfZGF0YSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZiAocGFnZSA9PT0gJ2luZGV4Jykge1xuICAgICAgICAgICAgICAgIGFwcC5nbG9iYWxEYXRhLnBhZ2VEYXRhID0gcGFnZV9kYXRhO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zZXREYXRhKG5ld1BhZ2VEYXRhKTtcbiAgICAgICAgICAgIGNiICYmIGNiKCk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICByZWZyZXNoUGFnZSgpIHtcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgIHBhZ2VfZGF0YTogYXBwLmdsb2JhbERhdGEucGFnZURhdGEsXG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgYXN5bmMgbG9hZFRhYmJhcigpIHtcbiAgICAgICAgY29uc3QgeyBkYXRhIH0gPSBhd2FpdCBnZXQoYCR7bG9hZFRhYmJhclVybH0vJHt3eC5nZXRTdG9yYWdlU3luYygncmVsZWFzZUlkJyl9YCk7XG4gICAgICAgIGFwcC5nbG9iYWxEYXRhLnRhYkJhciA9IGRhdGEudGFiQmFyO1xuICAgIH0sXG4gICAgYXN5bmMgbG9hZFBhZ2VMaXN0KCkge1xuICAgICAgICBjb25zb2xlLmxvZyh3eC5nZXRTdG9yYWdlU3luYygncmVsZWFzZUlkJykpO1xuICAgICAgICBjb25zdCB7IGRhdGEgfSA9IGF3YWl0IGdldChgJHtwYWdlTGlzdFVybH0vJHt3eC5nZXRTdG9yYWdlU3luYygncmVsZWFzZUlkJyl9YCk7XG4gICAgICAgIGFwcC5nbG9iYWxEYXRhLnBhZ2VMaXN0ID0gZGF0YTtcbiAgICB9LFxuXG4gICAgZ2V0QXBwVGl0bGUoY2FsbGJhY2spIHtcbiAgICAgICAgZ2V0KCcvbXBCdXNpbmVzc0luZm8vZ2V0VGl0bGUnLCAoZSwgcmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIGlmIChlIHx8IGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKGUpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIHd4LnNldE5hdmlnYXRpb25CYXJUaXRsZSh7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiByZXNwb25zZSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKGUsIHJlc3BvbnNlKTtcbiAgICAgICAgfSk7XG4gICAgfSxcbn07XG4iXX0=