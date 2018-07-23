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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvYWREYXRhLmpzIl0sIm5hbWVzIjpbImdldFBhZ2UiLCJyZXF1aXJlIiwiZ2V0IiwicGljU3JjRG9tYWluIiwiYXBwIiwicGFnZURhdGFVcmwiLCJwYWdlTGlzdFVybCIsImxvYWRUYWJiYXJVcmwiLCJwYXJzZUNmZ0FuZERhdGEiLCJtb2R1bGVzIiwibWFwIiwiaWQiLCJuYW1lIiwiY2ZnIiwiZGF0YSIsInBhcmFtcyIsIkpTT04iLCJwYXJzZSIsImVycm9yIiwibW9kRGF0YSIsImxvZ28iLCJnbG9iYWxEYXRhIiwiaW5mb3JtYXRpb24iLCJmb3JFYWNoIiwicmVnIiwiY291cG9uQ29uZGl0aW9uIiwiY291cG9uIiwidmFsaWRUeXBlIiwiT2JqZWN0IiwiYXNzaWduIiwidmFsaWRTdGFydERhdGUiLCJ2YWxpZFN0YXJ0dGltZSIsInJlcGxhY2UiLCJ2YWxpZEVuZERhdGUiLCJ2YWxpZEVuZHRpbWUiLCJoYXNNb3JlIiwidGhlbWUiLCJzZXJ2aWNlIiwiaW1nIiwidGhlbWVzIiwic3R5bGVOYW1lIiwidGl0bGUiLCJkZXNjUGljcyIsInBpYyIsInN0ckFyciIsInNlcnZpY2VJbmZvIiwic3BsaXQiLCJodG1sTm9kZXMiLCJjaGlsZHJlbiIsInR5cGUiLCJ0ZXh0Iiwic3RyIiwicGQiLCJwcm9wcyIsImltYWdlcyIsInNyYyIsImFydGljbGUiLCJjb3ZlciIsIm9yZGVyIiwicGljcyIsImNvbnNvbGUiLCJsb2ciLCJtb2R1bGUiLCJleHBvcnRzIiwibG9hZERhdGEiLCJjYiIsInBhZ2UiLCJyb3V0ZSIsIm9wdGlvbnMiLCJnZXRDdXJyZW50UGFnZXMiLCJsZW5ndGgiLCJwYWdlVHlwZSIsInB0eXBlIiwicG9zdERhdGEiLCJwYWdlS2V5IiwicmVsZWFzZUlkIiwid3giLCJnZXRTdG9yYWdlU3luYyIsIm1waWQiLCJzZXJ2aWNlRGV0YWlsSWQiLCJleHRDb25maWciLCJyZXNwb25zZSIsIm1vZHVsZXNEYXRhIiwic3RyaW5naWZ5IiwibW9kdWxlc1BhcnNlIiwic2hvdyIsInBhZ2VfZGF0YSIsImNvbnRlbnQiLCJuZXdQYWdlRGF0YSIsImN1cnJlbnQiLCJwYWdlRGF0YSIsInNldERhdGEiLCJyZWZyZXNoUGFnZSIsImxvYWRUYWJiYXIiLCJ0YWJCYXIiLCJsb2FkUGFnZUxpc3QiLCJwYWdlTGlzdCIsImdldEFwcFRpdGxlIiwiY2FsbGJhY2siLCJlIiwidW5kZWZpbmVkIiwic2V0TmF2aWdhdGlvbkJhclRpdGxlIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUE7Ozs7Ozs7O0FBRUEsSUFBTUEsVUFBVUMsUUFBUSxrQkFBUixDQUFoQjs7ZUFHSUEsUUFBUSxlQUFSLEM7SUFEQUMsRyxZQUFBQSxHOztnQkFJQUQsUUFBUSxnQkFBUixDO0lBREFFLFksYUFBQUEsWTs7QUFHSixJQUFNQyxNQUFNSCxRQUFRLHFCQUFSLENBQVo7O0FBRUEsSUFBSUksY0FBYyw0QkFBbEI7QUFDQSxJQUFNQyxjQUFjLHFCQUFwQjtBQUNBLElBQU1DLGdCQUFnQiw2QkFBdEI7QUFDQSxJQUFNQyxrQkFBa0IsU0FBbEJBLGVBQWtCO0FBQUEsUUFDcEJDLE9BRG9CLFFBQ3BCQSxPQURvQjtBQUFBLFdBRWxCQSxRQUFRQyxHQUFSLENBQVksaUJBTVo7QUFBQSxZQUxGQyxFQUtFLFNBTEZBLEVBS0U7QUFBQSxZQUpGQyxJQUlFLFNBSkZBLElBSUU7QUFBQSxZQUhGQyxHQUdFLFNBSEZBLEdBR0U7QUFBQSxZQUZGQyxJQUVFLFNBRkZBLElBRUU7QUFBQSxZQURGQyxNQUNFLFNBREZBLE1BQ0U7O0FBQ0YsWUFBSTtBQUNKO0FBQ0lGLGtCQUFNQSxNQUFNRyxLQUFLQyxLQUFMLENBQVdKLEdBQVgsQ0FBTixHQUF3QixFQUE5QjtBQUNILFNBSEQsQ0FHRSxPQUFPSyxLQUFQLEVBQWM7QUFDWkwsa0JBQU0sRUFBTjtBQUNIOztBQUVELFlBQU1NLFVBQVVMLEtBQUtGLElBQUwsS0FBYyxFQUE5Qjs7QUFFQTtBQUNBLFlBQUlBLFNBQVMsYUFBYixFQUE0QjtBQUN4Qk8sb0JBQVFDLElBQVIsR0FBZUQs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bEIsQ0FBeEIsQ0E1RGQ7O0FBQUE7QUFBQTtBQTRERC9ELGdDQTVEQyxTQTREREEsSUE1REM7O0FBNkRUVixnQ0FBSWlCLFVBQUosQ0FBZXlFLE1BQWYsR0FBd0JoRixLQUFLZ0YsTUFBN0I7O0FBN0RTO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBK0RQQyxnQkEvRE87QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBZ0VUbkMsb0NBQVFDLEdBQVIsQ0FBWWUsR0FBR0MsY0FBSCxDQUFrQixXQUFsQixDQUFaO0FBaEVTO0FBQUEsbUNBaUVjM0UsSUFBT0ksV0FBUCxTQUFzQnNFLEdBQUdDLGNBQUgsQ0FBa0IsV0FBbEIsQ0FBdEIsQ0FqRWQ7O0FBQUE7QUFBQTtBQWlFRC9ELGdDQWpFQyxTQWlFREEsSUFqRUM7O0FBa0VUVixnQ0FBSWlCLFVBQUosQ0FBZTJFLFFBQWYsR0FBMEJsRixJQUExQjs7QUFsRVM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFxRWJtRixlQXJFYSx1QkFxRURDLFFBckVDLEVBcUVTO0FBQ2xCaEcsWUFBSSwwQkFBSixFQUFnQyxVQUFDaUcsQ0FBRCxFQUFJbEIsUUFBSixFQUFpQjtBQUM3QyxnQkFBSWtCLEtBQUtBLE1BQU1DLFNBQWYsRUFBMEI7QUFDdEJGLDRCQUFZQSxTQUFTQyxDQUFULENBQVo7QUFDQTtBQUNIO0FBQ0QsZ0JBQUlsQixRQUFKLEVBQWM7QUFDVkwsbUJBQUd5QixxQkFBSCxDQUF5QjtBQUNyQjVELDJCQUFPd0M7QUFEYyxpQkFBekI7QUFHSDtBQUNEaUIsd0JBQVlBLFNBQVNDLENBQVQsRUFBWWxCLFFBQVosQ0FBWjtBQUNILFNBWEQ7QUFZSDtBQWxGWSxDQUFqQiIsImZpbGUiOiJsb2FkRGF0YS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtb2R1bGVzUGFyc2UgZnJvbSAnLi4vdXRpbHMvbW9kdWxlc1BhcnNlJztcclxuXHJcbmNvbnN0IGdldFBhZ2UgPSByZXF1aXJlKCcuLi91dGlscy9nZXRQYWdlJyk7XHJcbmNvbnN0IHtcclxuICAgIGdldCxcclxufSA9IHJlcXVpcmUoJy4uL3V0aWxzL2FqYXgnKTtcclxuY29uc3Qge1xyXG4gICAgcGljU3JjRG9tYWluLFxyXG59ID0gcmVxdWlyZSgnLi4vdXRpbHMvaW5kZXgnKTtcclxuXHJcbmNvbnN0IGFwcCA9IHJlcXVpcmUoJy4uL3V0aWxzL2dsb2JhbERhdGEnKTtcclxuXHJcbmxldCBwYWdlRGF0YVVybCA9ICcvYnVzaW5lc3MvdGVtcGxhdGUvbG9hZGFsbCc7XHJcbmNvbnN0IHBhZ2VMaXN0VXJsID0gJy9idXNpbmVzcy9wYWdlTGlzdC8nO1xyXG5jb25zdCBsb2FkVGFiYmFyVXJsID0gJy9idXNpbmVzcy9nZXRSZWxlYXNlQ29uZmlnLyc7XHJcbmNvbnN0IHBhcnNlQ2ZnQW5kRGF0YSA9ICh7XHJcbiAgICBtb2R1bGVzLFxyXG59KSA9PiBtb2R1bGVzLm1hcCgoe1xyXG4gICAgaWQsXHJcbiAgICBuYW1lLFxyXG4gICAgY2ZnLFxyXG4gICAgZGF0YSxcclxuICAgIHBhcmFtcyxcclxufSkgPT4ge1xyXG4gICAgdHJ5IHtcclxuICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLXBhcmFtLXJlYXNzaWduICovXHJcbiAgICAgICAgY2ZnID0gY2ZnID8gSlNPTi5wYXJzZShjZmcpIDoge307XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGNmZyA9IHt9O1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG1vZERhdGEgPSBkYXRhW25hbWVdIHx8IHt9O1xyXG5cclxuICAgIC8vIGRhdGEg5L+u5pS5XHJcbiAgICBpZiAobmFtZSA9PT0gJ2luZm9ybWF0aW9uJykge1xyXG4gICAgICAgIG1vZERhdGEubG9nbyA9IG1vZERhdGEubG9nbyA/XHJcbiAgICAgICAgICAgIHBpY1NyY0RvbWFpbigpICsgbW9kRGF0YS5sb2dvIDpcclxuICAgICAgICAgICAgJ2h0dHBzOi8vcGljMi41OGNkbi5jb20uY24vYml6bXAvbl92Mjg1ZDZhMTZkNzI1YTQ0NjY5NGRiMzVkZjIzYzlkYjI0LnBuZyc7XHJcbiAgICAgICAgYXBwLmdsb2JhbERhdGEuaW5mb3JtYXRpb24gPSBtb2REYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChuYW1lID09PSAnY291cG9uJykge1xyXG4gICAgICAgIGlmIChtb2REYXRhLmRhdGEpIHtcclxuICAgICAgICAgICAgbW9kRGF0YS5kYXRhLmZvckVhY2goY291cG9uID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJlZyA9IC8oWzAtOV17NH0pLShbMC0xXXswLDF9WzAtOV17MX0pLShbMC0zXXswLDF9WzAtOV17MX0pLisvO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY291cG9uQ29uZGl0aW9uID0gSlNPTi5wYXJzZShjb3Vwb24uY291cG9uQ29uZGl0aW9uKTtcclxuICAgICAgICAgICAgICAgIGlmIChjb3Vwb24udmFsaWRUeXBlID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihjb3Vwb24sIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLi4uY291cG9uQ29uZGl0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWxpZFN0YXJ0RGF0ZTogY291cG9uLnZhbGlkU3RhcnR0aW1lLnJlcGxhY2UocmVnLCAnJDEuJDIuJDMnKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRFbmREYXRlOiBjb3Vwb24udmFsaWRFbmR0aW1lLnJlcGxhY2UocmVnLCAnJDEuJDIuJDMnKSxcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihjb3Vwb24sIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLi4uY291cG9uQ29uZGl0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAobmFtZSA9PT0gJ29yZGVyJykge1xyXG4gICAgICAgIGlmICghY2ZnKSB7XHJcbiAgICAgICAgICAgIGNmZy5oYXNNb3JlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKG5hbWUgPT09ICdpbWFnZXMnIHx8IG5hbWUgPT09ICdvcmRlcicpIHtcclxuICAgICAgICBjZmcudGhlbWUgPSBjZmcudGhlbWUgfHwgJzEnO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChuYW1lID09PSAnc2VydmljZXMnIHx8IG5hbWUgPT09ICdzZXJ2aWNlT3RoZXInKSB7XHJcbiAgICAgICAgaWYgKG1vZERhdGEuZGF0YSkge1xyXG4gICAgICAgICAgICBtb2REYXRhLmRhdGEuZm9yRWFjaChzZXJ2aWNlID0+IHtcclxuICAgICAgICAgICAgICAgIHNlcnZpY2UuaW1nID0gcGljU3JjRG9tYWluKCkgKyBzZXJ2aWNlLmltZztcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNmZy50aGVtZSA9IGNmZy50aGVtZSB8fCAnMSc7XHJcbiAgICAgICAgY2ZnLnRoZW1lcyA9IFt7XHJcbiAgICAgICAgICAgIHRoZW1lOiAnMScsXHJcbiAgICAgICAgICAgIHN0eWxlTmFtZTogJ29uZScsXHJcbiAgICAgICAgICAgIHRpdGxlOiAn5aSn5Zu+JyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhlbWU6ICcyJyxcclxuICAgICAgICAgICAgc3R5bGVOYW1lOiAndHdvJyxcclxuICAgICAgICAgICAgdGl0bGU6ICfkuK3lm74nLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGVtZTogJzMnLFxyXG4gICAgICAgICAgICBzdHlsZU5hbWU6ICd0aHJlZScsXHJcbiAgICAgICAgICAgIHRpdGxlOiAn5bCP5Zu+JyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhlbWU6ICc0JyxcclxuICAgICAgICAgICAgc3R5bGVOYW1lOiAnZm91cicsXHJcbiAgICAgICAgICAgIHRpdGxlOiAn5qiq5ZCR5ruR5YqoJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhlbWU6ICc1JyxcclxuICAgICAgICAgICAgc3R5bGVOYW1lOiAnZml2ZScsXHJcbiAgICAgICAgICAgIHRpdGxlOiAn5qiq5ZCR5YiX6KGoJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhlbWU6ICc2JyxcclxuICAgICAgICAgICAgc3R5bGVOYW1lOiAnc2l4JyxcclxuICAgICAgICAgICAgdGl0bGU6ICflj4zlm74nLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGVtZTogJzcnLFxyXG4gICAgICAgICAgICBzdHlsZU5hbWU6ICdzZXZlbicsXHJcbiAgICAgICAgICAgIHRpdGxlOiAnMeS4ijLkuIvmmL7npLonLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAobmFtZSA9PT0gJ3NlcnZpY2VEZXRhaWwnKSB7XHJcbiAgICAgICAgaWYgKG1vZERhdGEuZGVzY1BpY3MpIHtcclxuICAgICAgICAgICAgbW9kRGF0YS5kZXNjUGljcyA9IG1vZERhdGEuZGVzY1BpY3MubWFwKHBpYyA9PiBwaWNTcmNEb21haW4oKSArIHBpYyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBzdHJBcnIgPSBtb2REYXRhLnNlcnZpY2VJbmZvLnNwbGl0KCdcXG4nKTtcclxuICAgICAgICBtb2REYXRhLmh0bWxOb2RlcyA9IHN0ckFyci5tYXAoc3RyID0+ICh7XHJcbiAgICAgICAgICAgIG5hbWU6ICdwJyxcclxuICAgICAgICAgICAgY2hpbGRyZW46IFt7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiAndGV4dCcsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBzdHIsXHJcbiAgICAgICAgICAgIH1dLFxyXG4gICAgICAgIH0pKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyDlrprkuYnmqKHmnb/mlbDmja5cclxuICAgIGNvbnN0IHBkID0ge1xyXG4gICAgICAgIGlkLFxyXG4gICAgICAgIG5hbWUsXHJcbiAgICAgICAgcHJvcHM6IHtcclxuICAgICAgICAgICAgLi4ubW9kRGF0YSxcclxuICAgICAgICAgICAgY2ZnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcGFyYW1zLFxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBwcm9wcyAmIGNmZyDkv67mlLlcclxuICAgIC8vIGltYWdlU3dpcGVyXHJcbiAgICBpZiAobmFtZSA9PT0gJ2ltYWdlU3dpcGVyJykge1xyXG4gICAgICAgIGxldCBpbWFnZXMgPSBudWxsO1xyXG4gICAgICAgIGlmICghY2ZnLmltYWdlcykge1xyXG4gICAgICAgICAgICBpbWFnZXMgPSBtb2REYXRhLmRhdGE7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgKHtcclxuICAgICAgICAgICAgICAgIGltYWdlcyxcclxuICAgICAgICAgICAgfSA9IGNmZyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNmZy5pbWFnZXMgPSBpbWFnZXMubWFwKGltZyA9PiAoe1xyXG4gICAgICAgICAgICAuLi5pbWcsXHJcbiAgICAgICAgICAgIHNyYzogcGljU3JjRG9tYWluKCkgKyBpbWcuc3JjLFxyXG4gICAgICAgIH0pKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBpbWFnZXMg5qih5Z2X5Zu+54mH6Lev5b6EXHJcbiAgICBpZiAobmFtZSA9PT0gJ2ltYWdlcycpIHtcclxuICAgIC8vICBjb25zdCB7IHRoZW1lIH0gPSBjZmc7XHJcbiAgICAvKiBlc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246IFwiZXJyb3JcIiAqL1xyXG4gICAgICAgIGNmZy5pbWFnZXMuZm9yRWFjaChpbWcgPT4ge1xyXG4gICAgICAgICAgICBpbWcuc3JjID0gcGljU3JjRG9tYWluKCkgKyBpbWcuc3JjO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIOaWh+eroOaooeWdl+WbvueJh+i3r+W+hFxyXG4gICAgaWYgKG5hbWUgPT09ICdhcnRpY2xlJykge1xyXG4gICAgICAgIG1vZERhdGEuZGF0YS5mb3JFYWNoKGFydGljbGUgPT4ge1xyXG4gICAgICAgICAgICBhcnRpY2xlLmNvdmVyID0gcGljU3JjRG9tYWluKCkgKyBhcnRpY2xlLmNvdmVyO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIOaWh+eroOaooeWdl+WbvueJh+i3r+W+hFxyXG4gICAgaWYgKG5hbWUgPT09ICdvcmRlcicpIHtcclxuICAgICAgICBtb2REYXRhLmRhdGEuZm9yRWFjaChvcmRlciA9PiB7XHJcbiAgICAgICAgICAgIG9yZGVyLnBpY3MgPSBwaWNTcmNEb21haW4oKSArIG9yZGVyLnBpY3M7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBjb25zb2xlLmxvZyhuYW1lLCBwZCk7XHJcbiAgICByZXR1cm4gcGQ7XHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICBhc3luYyBsb2FkRGF0YShjYikge1xyXG4gICAgICAgIGNvbnN0IHBhZ2UgPSBnZXRQYWdlKHRoaXMucm91dGUsIHRoaXMub3B0aW9ucykgfHwgJ2luZGV4JztcclxuICAgICAgICAvLyBjb25zdCBwYWdlID0gJ2luZGV4JztcclxuICAgICAgICAvKiBnbG9iYWwgZ2V0Q3VycmVudFBhZ2VzOnRydWUgKi9cclxuICAgICAgICBjb25zdCB7XHJcbiAgICAgICAgICAgIHJvdXRlLFxyXG4gICAgICAgIH0gPSBnZXRDdXJyZW50UGFnZXMoKVtnZXRDdXJyZW50UGFnZXMoKS5sZW5ndGggLSAxXTtcclxuICAgICAgICBjb25zdCBwYWdlVHlwZSA9IHJvdXRlLnNwbGl0KCdwdHlwZT0nKVsxXSB8fCB0aGlzLm9wdGlvbnMucHR5cGUgfHwgJyc7XHJcbiAgICAgICAgY29uc3QgcG9zdERhdGEgPSB7XHJcbiAgICAgICAgICAgIHBhZ2VLZXk6IHBhZ2UsXHJcbiAgICAgICAgICAgIHJlbGVhc2VJZDogd3guZ2V0U3RvcmFnZVN5bmMoJ3JlbGVhc2VJZCcpLFxyXG4gICAgICAgICAgICBtcGlkOiB3eC5nZXRTdG9yYWdlU3luYygnY3VycmVudF9tcGlkJyksXHJcbiAgICAgICAgfTtcclxuICAgICAgICBpZiAocGFnZSA9PT0gJ2RldGFpbCcpIHtcclxuICAgICAgICAgICAgcG9zdERhdGEuc2VydmljZURldGFpbElkID0gdGhpcy5vcHRpb25zLmlkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocGFnZSA9PT0gJ2FydGljbGUnKSB7XHJcbiAgICAgICAgICAgIHBhZ2VEYXRhVXJsID0gYC9idXNpbmVzc0FydGljbGUvZ2V0LyR7dGhpcy5vcHRpb25zLmlkfWA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChwYWdlID09PSAnY3VzdG9tJyAmJiBwYWdlVHlwZSkge1xyXG4gICAgICAgICAgICBwb3N0RGF0YS5wYWdlS2V5ID0gcGFnZVR5cGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUubG9nKGFwcC5nbG9iYWxEYXRhLmV4dENvbmZpZyk7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBnZXQocGFnZURhdGFVcmwsIHBvc3REYXRhKTtcclxuICAgICAgICAgICAgY29uc3QgbW9kdWxlc0RhdGEgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHJlc3BvbnNlLmRhdGEpKTtcclxuICAgICAgICAgICAgYXBwLmdsb2JhbERhdGEubW9kdWxlcyA9IG1vZHVsZXNQYXJzZS5zaG93KG1vZHVsZXNEYXRhKTtcclxuICAgICAgICAgICAgLyogZXNsaW50LWRpc2FibGUgY2FtZWxjYXNlICovXHJcbiAgICAgICAgICAgIGxldCBwYWdlX2RhdGEgPSBudWxsO1xyXG4gICAgICAgICAgICBpZiAocGFnZSA9PT0gJ2FydGljbGUnKSB7XHJcbiAgICAgICAgICAgICAgICBwYWdlX2RhdGEgPSByZXNwb25zZS5kYXRhO1xyXG4gICAgICAgICAgICAgICAgLyogZXNsaW50IG5vLXVzZWxlc3MtZXNjYXBlOiBcImVycm9yXCIgKi9cclxuICAgICAgICAgICAgICAgIHBhZ2VfZGF0YS5jb250ZW50LnJlcGxhY2UoL15cXHM/KGh0dHB8aHR0cHMpP1xcXFw6XFwvXFwvLywgJ2h0dHBzOi8vJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBwYWdlX2RhdGEgPSBwYXJzZUNmZ0FuZERhdGEocmVzcG9uc2UuZGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8g5Zu+54mH57uE5Lu25pWw5o2uXHJcbiAgICAgICAgICAgIC8vIHRoaXMuaW1hZ2VzVmlld1N0YXRlKHBhZ2VfZGF0YSk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBuZXdQYWdlRGF0YSA9IHtcclxuICAgICAgICAgICAgICAgIHBhZ2VUeXBlOiBwYWdlLFxyXG4gICAgICAgICAgICAgICAgY3VycmVudDogMCxcclxuICAgICAgICAgICAgICAgIHBhZ2VfZGF0YTogcGFnZV9kYXRhLFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBpZiAocGFnZSA9PT0gJ2luZGV4Jykge1xyXG4gICAgICAgICAgICAgICAgYXBwLmdsb2JhbERhdGEucGFnZURhdGEgPSBwYWdlX2RhdGE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5zZXREYXRhKG5ld1BhZ2VEYXRhKTtcclxuICAgICAgICAgICAgY2IgJiYgY2IoKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICByZWZyZXNoUGFnZSgpIHtcclxuICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICBwYWdlX2RhdGE6IGFwcC5nbG9iYWxEYXRhLnBhZ2VEYXRhLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIGFzeW5jIGxvYWRUYWJiYXIoKSB7XHJcbiAgICAgICAgY29uc3QgeyBkYXRhIH0gPSBhd2FpdCBnZXQoYCR7bG9hZFRhYmJhclVybH0vJHt3eC5nZXRTdG9yYWdlU3luYygncmVsZWFzZUlkJyl9YCk7XHJcbiAgICAgICAgYXBwLmdsb2JhbERhdGEudGFiQmFyID0gZGF0YS50YWJCYXI7XHJcbiAgICB9LFxyXG4gICAgYXN5bmMgbG9hZFBhZ2VMaXN0KCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHd4LmdldFN0b3JhZ2VTeW5jKCdyZWxlYXNlSWQnKSk7XHJcbiAgICAgICAgY29uc3QgeyBkYXRhIH0gPSBhd2FpdCBnZXQoYCR7cGFnZUxpc3RVcmx9LyR7d3guZ2V0U3RvcmFnZVN5bmMoJ3JlbGVhc2VJZCcpfWApO1xyXG4gICAgICAgIGFwcC5nbG9iYWxEYXRhLnBhZ2VMaXN0ID0gZGF0YTtcclxuICAgIH0sXHJcblxyXG4gICAgZ2V0QXBwVGl0bGUoY2FsbGJhY2spIHtcclxuICAgICAgICBnZXQoJy9tcEJ1c2luZXNzSW5mby9nZXRUaXRsZScsIChlLCByZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZSB8fCBlID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKGUpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgd3guc2V0TmF2aWdhdGlvbkJhclRpdGxlKHtcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogcmVzcG9uc2UsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYWxsYmFjayAmJiBjYWxsYmFjayhlLCByZXNwb25zZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG59O1xyXG4iXX0=