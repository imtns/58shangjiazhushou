'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _mixin = require('./mixin.js');

var _mixin2 = _interopRequireDefault(_mixin);

var _uploader = require('./../../utils/uploader.js');

var _utils = require('./../../utils/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var app = require('./../../utils/globalData.js');

var _require = require('./../../utils/index.js'),
    picSrcDomain = _require.picSrcDomain;

var _require2 = require('./../../utils/ajax.js'),
    post = _require2.post;

var ShopImages = function (_wepy$page) {
    _inherits(ShopImages, _wepy$page);

    function ShopImages() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, ShopImages);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ShopImages.__proto__ || Object.getPrototypeOf(ShopImages)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            navigationBarTitleText: '门店照片'
        }, _this.data = {
            indicatorDots: true,
            thumbActive: 0,
            picName: '',
            linkName: '',
            src: '',
            picDomain: picSrcDomain()
        }, _this.methods = {
            addBanner: function () {
                var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                    var _this2 = this;

                    var _ref3, tempFilePaths;

                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    _context.next = 2;
                                    return _wepy2.default.chooseImage();

                                case 2:
                                    _ref3 = _context.sent;
                                    tempFilePaths = _ref3.tempFilePaths;

                                    (0, _uploader.uploader)(tempFilePaths[0], function (e, result) {
                                        if (e) {
                                            (0, _utils.toast)('上传失败，请重试。');
                                            return;
                                        }
                                        (0, _utils.toast)('上传成功。');
                                        var src = result.content;
                                        var name = _this2.picName;
                                        _this2.pageData[0].props.cfg.images.push({
                                            src: src,
                                            title: name,
                                            linkName: _this2.linkName,
                                            pageKey: ''
                                        });
                                        _this2.pageModule.cfg.images.push({
                                            src: src,
                                            pageKey: '',
                                            title: name,
                                            linkName: _this2.linkName
                                        });
                                        _this2.saveImage(src, name);
                                        _this2.$apply();
                                    });

                                case 5:
                                case 'end':
                                    return _context.stop();
                            }
                        }
                    }, _callee, this);
                }));

                function addBanner() {
                    return _ref2.apply(this, arguments);
                }

                return addBanner;
            }(),
            del: function del(e) {
                var index = e.currentTarget.dataset.index;

                this.pageData[0].props.cfg.images.splice(index, 1);
                this.pageModule.cfg.images.splice(index, 1);
            },
            thumbClick: function thumbClick(e) {
                this.thumbActive = e.currentTarget.dataset.index;
            },
            bindNameInput: function bindNameInput(e) {
                this.pageData[0].props.cfg.images[this.thumbActive].title = e.detail.value;
                this.pageModule.cfg.images[this.thumbActive].title = e.detail.value;
            },
            bindLinkInput: function bindLinkInput(e) {
                this.pageData[0].props.cfg.images[this.thumbActive].linkName = e.detail.value;
                this.pageModule.cfg.images[this.thumbActive].linkName = e.detail.value;
            },
            save: function save() {
                this.pageModule.cfg.showSize = this.pageData[0].props.cfg.showSize;

                var _pageData = _slicedToArray(this.pageData, 1);

                app.globalData.pageData[this.pageIndex] = _pageData[0];

                console.log(app.globalData.pageData[this.pageIndex]);
                //   const modulesData = JSON.parse(JSON.stringify(app.globalData.pageData));
                //   app.globalData.modules = modulesParse.parsePageData(modulesData);
                app.globalData.modules[this.pageIndex] = this.pageModule;
                console.log(app.globalData.modules);
                wx.navigateBack({
                    delta: 1
                });
            }
        }, _this.mixins = [_mixin2.default], _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(ShopImages, [{
        key: 'onLoad',
        value: function onLoad() {
            var _this3 = this;

            var _tempModules$filter = this.tempModules.filter(function (obj) {
                return obj.id === _this3.pageId;
            });

            var _tempModules$filter2 = _slicedToArray(_tempModules$filter, 1);

            this.pageModule = _tempModules$filter2[0];
        }
    }, {
        key: 'saveImage',
        value: function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(src, name) {
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.next = 2;
                                return post('/businessResource/insert', {
                                    resourceType: 1,
                                    resourceName: name,
                                    resourceUrl: src
                                });

                            case 2:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function saveImage(_x, _x2) {
                return _ref4.apply(this, arguments);
            }

            return saveImage;
        }()
    }]);

    return ShopImages;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(ShopImages , 'pages/edit/images'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImltYWdlcy5qcyJdLCJuYW1lcyI6WyJhcHAiLCJyZXF1aXJlIiwicGljU3JjRG9tYWluIiwicG9zdCIsIlNob3BJbWFnZXMiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsImluZGljYXRvckRvdHMiLCJ0aHVtYkFjdGl2ZSIsInBpY05hbWUiLCJsaW5rTmFtZSIsInNyYyIsInBpY0RvbWFpbiIsIm1ldGhvZHMiLCJhZGRCYW5uZXIiLCJ3ZXB5IiwiY2hvb3NlSW1hZ2UiLCJ0ZW1wRmlsZVBhdGhzIiwiZSIsInJlc3VsdCIsImNvbnRlbnQiLCJuYW1lIiwicGFnZURhdGEiLCJwcm9wcyIsImNmZyIsImltYWdlcyIsInB1c2giLCJ0aXRsZSIsInBhZ2VLZXkiLCJwYWdlTW9kdWxlIiwic2F2ZUltYWdlIiwiJGFwcGx5IiwiZGVsIiwiaW5kZXgiLCJjdXJyZW50VGFyZ2V0IiwiZGF0YXNldCIsInNwbGljZSIsInRodW1iQ2xpY2siLCJiaW5kTmFtZUlucHV0IiwiZGV0YWlsIiwidmFsdWUiLCJiaW5kTGlua0lucHV0Iiwic2F2ZSIsInNob3dTaXplIiwiZ2xvYmFsRGF0YSIsInBhZ2VJbmRleCIsImNvbnNvbGUiLCJsb2ciLCJtb2R1bGVzIiwid3giLCJuYXZpZ2F0ZUJhY2siLCJkZWx0YSIsIm1peGlucyIsIk1peGluIiwidGVtcE1vZHVsZXMiLCJmaWx0ZXIiLCJvYmoiLCJpZCIsInBhZ2VJZCIsInJlc291cmNlVHlwZSIsInJlc291cmNlTmFtZSIsInJlc291cmNlVXJsIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsTUFBTUMsUUFBUSx3QkFBUixDQUFaOztlQUV5QkEsUUFBUSxtQkFBUixDO0lBQWpCQyxZLFlBQUFBLFk7O2dCQUVTRCxRQUFRLGtCQUFSLEM7SUFBVEUsSSxhQUFBQSxJOztJQUVhQyxVOzs7Ozs7Ozs7Ozs7Oztr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QkFBeEIzRCxVIiwiZmlsZSI6ImltYWdlcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcclxuaW1wb3J0IE1peGluIGZyb20gJy4vbWl4aW4nO1xyXG5pbXBvcnQgeyB1cGxvYWRlciB9IGZyb20gJy4uLy4uL3V0aWxzL3VwbG9hZGVyJztcclxuaW1wb3J0IHsgdG9hc3QgfSBmcm9tICcuLi8uLi91dGlscyc7XHJcblxyXG5jb25zdCBhcHAgPSByZXF1aXJlKCcuLi8uLi91dGlscy9nbG9iYWxEYXRhJyk7XHJcblxyXG5jb25zdCB7IHBpY1NyY0RvbWFpbiB9ID0gcmVxdWlyZSgnLi4vLi4vdXRpbHMvaW5kZXgnKTtcclxuXHJcbmNvbnN0IHsgcG9zdCB9ID0gcmVxdWlyZSgnLi4vLi4vdXRpbHMvYWpheCcpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2hvcEltYWdlcyBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgY29uZmlnID0ge1xyXG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn6Zeo5bqX54Wn54mHJyxcclxuICB9O1xyXG4gICAgZGF0YSA9IHtcclxuICAgICAgICBpbmRpY2F0b3JEb3RzOiB0cnVlLFxyXG4gICAgICAgIHRodW1iQWN0aXZlOiAwLFxyXG4gICAgICAgIHBpY05hbWU6ICcnLFxyXG4gICAgICAgIGxpbmtOYW1lOiAnJyxcclxuICAgICAgICBzcmM6ICcnLFxyXG4gICAgICAgIHBpY0RvbWFpbjogcGljU3JjRG9tYWluKCksXHJcbiAgICB9O1xyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIFt0aGlzLnBhZ2VNb2R1bGVdID0gdGhpcy50ZW1wTW9kdWxlcy5maWx0ZXIob2JqID0+IG9iai5pZCA9PT0gdGhpcy5wYWdlSWQpO1xyXG4gICAgfVxyXG4gIG1ldGhvZHMgPSB7XHJcbiAgICAgIGFzeW5jIGFkZEJhbm5lcigpIHtcclxuICAgICAgICAgIGNvbnN0IHsgdGVtcEZpbGVQYXRocyB9ID0gYXdhaXQgd2VweS5jaG9vc2VJbWFnZSgpO1xyXG4gICAgICAgICAgdXBsb2FkZXIodGVtcEZpbGVQYXRoc1swXSwgKGUsIHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgIGlmIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgIHRvYXN0KCfkuIrkvKDlpLHotKXvvIzor7fph43or5XjgIInKTtcclxuICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB0b2FzdCgn5LiK5Lyg5oiQ5Yqf44CCJyk7XHJcbiAgICAgICAgICAgICAgY29uc3Qgc3JjID0gcmVzdWx0LmNvbnRlbnQ7XHJcbiAgICAgICAgICAgICAgY29uc3QgbmFtZSA9IHRoaXMucGljTmFtZTtcclxuICAgICAgICAgICAgICB0aGlzLnBhZ2VEYXRhWzBdLnByb3BzLmNmZy5pbWFnZXMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgIHNyYyxcclxuICAgICAgICAgICAgICAgICAgdGl0bGU6IG5hbWUsXHJcbiAgICAgICAgICAgICAgICAgIGxpbmtOYW1lOiB0aGlzLmxpbmtOYW1lLFxyXG4gICAgICAgICAgICAgICAgICBwYWdlS2V5OiAnJyxcclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICB0aGlzLnBhZ2VNb2R1bGUuY2ZnLmltYWdlcy5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgc3JjOiBzcmMsXHJcbiAgICAgICAgICAgICAgICAgIHBhZ2VLZXk6ICcnLFxyXG4gICAgICAgICAgICAgICAgICB0aXRsZTogbmFtZSxcclxuICAgICAgICAgICAgICAgICAgbGlua05hbWU6IHRoaXMubGlua05hbWUsXHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgdGhpcy5zYXZlSW1hZ2Uoc3JjLCBuYW1lKTtcclxuICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgIH0sXHJcbiAgICAgIGRlbChlKSB7XHJcbiAgICAgICAgICBjb25zdCB7IGluZGV4IH0gPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldDtcclxuICAgICAgICAgIHRoaXMucGFnZURhdGFbMF0ucHJvcHMuY2ZnLmltYWdlcy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgdGhpcy5wYWdlTW9kdWxlLmNmZy5pbWFnZXMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgfSxcclxuICAgICAgdGh1bWJDbGljayhlKSB7XHJcbiAgICAgICAgICB0aGlzLnRodW1iQWN0aXZlID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaW5kZXg7XHJcbiAgICAgIH0sXHJcbiAgICAgIGJpbmROYW1lSW5wdXQoZSkge1xyXG4gICAgICAgICAgdGhpcy5wYWdlRGF0YVswXS5wcm9wcy5jZmcuaW1hZ2VzW3RoaXMudGh1bWJBY3RpdmVdLnRpdGxlID0gZS5kZXRhaWwudmFsdWU7XHJcbiAgICAgICAgICB0aGlzLnBhZ2VNb2R1bGUuY2ZnLmltYWdlc1t0aGlzLnRodW1iQWN0aXZlXS50aXRsZSA9IGUuZGV0YWlsLnZhbHVlO1xyXG4gICAgICB9LFxyXG4gICAgICBiaW5kTGlua0lucHV0KGUpIHtcclxuICAgICAgICAgIHRoaXMucGFnZURhdGFbMF0ucHJvcHMuY2ZnLmltYWdlc1t0aGlzLnRodW1iQWN0aXZlXS5saW5rTmFtZSA9IGUuZGV0YWlsLnZhbHVlO1xyXG4gICAgICAgICAgdGhpcy5wYWdlTW9kdWxlLmNmZy5pbWFnZXNbdGhpcy50aHVtYkFjdGl2ZV0ubGlua05hbWUgPSBlLmRldGFpbC52YWx1ZTtcclxuICAgICAgfSxcclxuICAgICAgc2F2ZSgpIHtcclxuICAgICAgICAgIHRoaXMucGFnZU1vZHVsZS5jZmcuc2hvd1NpemUgPSB0aGlzLnBhZ2VEYXRhWzBdLnByb3BzLmNmZy5zaG93U2l6ZTtcclxuICAgICAgICAgIFthcHAuZ2xvYmFsRGF0YS5wYWdlRGF0YVt0aGlzLnBhZ2VJbmRleF1dID0gdGhpcy5wYWdlRGF0YTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKGFwcC5nbG9iYWxEYXRhLnBhZ2VEYXRhW3RoaXMucGFnZUluZGV4XSk7XHJcbiAgICAgICAgICAvLyAgIGNvbnN0IG1vZHVsZXNEYXRhID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShhcHAuZ2xvYmFsRGF0YS5wYWdlRGF0YSkpO1xyXG4gICAgICAgICAgLy8gICBhcHAuZ2xvYmFsRGF0YS5tb2R1bGVzID0gbW9kdWxlc1BhcnNlLnBhcnNlUGFnZURhdGEobW9kdWxlc0RhdGEpO1xyXG4gICAgICAgICAgYXBwLmdsb2JhbERhdGEubW9kdWxlc1t0aGlzLnBhZ2VJbmRleF0gPSB0aGlzLnBhZ2VNb2R1bGU7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhhcHAuZ2xvYmFsRGF0YS5tb2R1bGVzKTtcclxuICAgICAgICAgIHd4Lm5hdmlnYXRlQmFjayh7XHJcbiAgICAgICAgICAgICAgZGVsdGE6IDEsXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgfSxcclxuICB9XHJcbiAgYXN5bmMgc2F2ZUltYWdlKHNyYywgbmFtZSkge1xyXG4gICAgICBhd2FpdCBwb3N0KCcvYnVzaW5lc3NSZXNvdXJjZS9pbnNlcnQnLCB7XHJcbiAgICAgICAgICByZXNvdXJjZVR5cGU6IDEsXHJcbiAgICAgICAgICByZXNvdXJjZU5hbWU6IG5hbWUsXHJcbiAgICAgICAgICByZXNvdXJjZVVybDogc3JjLFxyXG4gICAgICB9KTtcclxuICB9XHJcbiAgbWl4aW5zID0gW01peGluXTtcclxufVxyXG4iXX0=