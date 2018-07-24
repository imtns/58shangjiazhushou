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

// import modulesParse from '../../utils/modulesParse';

var app = require('./../../utils/globalData.js');

var _require = require('./../../utils/index.js'),
    picSrcDomain = _require.picSrcDomain;

var _require2 = require('./../../utils/ajax.js'),
    post = _require2.post;

var ImageSwiper = function (_wepy$page) {
    _inherits(ImageSwiper, _wepy$page);

    function ImageSwiper() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, ImageSwiper);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ImageSwiper.__proto__ || Object.getPrototypeOf(ImageSwiper)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            navigationBarTitleText: '轮播广告'
        }, _this.mixins = [_mixin2.default], _this.data = {
            indicatorDots: true,
            thumbActive: 0,
            picName: '',
            linkName: '',
            pageModule: {},
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
                                        _this2.pageModule.cfg.images.push({
                                            src: src,
                                            pageKey: '',
                                            title: name,
                                            linkName: _this2.linkName
                                        });
                                        _this2.pageData[0].props.cfg.images.push({
                                            src: _this2.picDomain + src,
                                            title: name,
                                            linkName: _this2.linkName,
                                            pageKey: ''
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
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(ImageSwiper, [{
        key: 'onLoad',
        value: function onLoad() {
            var _this3 = this;

            var _tempModules$filter = this.tempModules.filter(function (obj) {
                return obj.id === _this3.pageId;
            });

            var _tempModules$filter2 = _slicedToArray(_tempModules$filter, 1);

            this.pageModule = _tempModules$filter2[0];

            console.log(this.pageModule);
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

    return ImageSwiper;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(ImageSwiper , 'pages/edit/imageSwiper'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImltYWdlU3dpcGVyLmpzIl0sIm5hbWVzIjpbImFwcCIsInJlcXVpcmUiLCJwaWNTcmNEb21haW4iLCJwb3N0IiwiSW1hZ2VTd2lwZXIiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwibWl4aW5zIiwiTWl4aW4iLCJkYXRhIiwiaW5kaWNhdG9yRG90cyIsInRodW1iQWN0aXZlIiwicGljTmFtZSIsImxpbmtOYW1lIiwicGFnZU1vZHVsZSIsInBpY0RvbWFpbiIsIm1ldGhvZHMiLCJhZGRCYW5uZXIiLCJ3ZXB5IiwiY2hvb3NlSW1hZ2UiLCJ0ZW1wRmlsZVBhdGhzIiwiZSIsInJlc3VsdCIsInNyYyIsImNvbnRlbnQiLCJuYW1lIiwiY2ZnIiwiaW1hZ2VzIiwicHVzaCIsInBhZ2VLZXkiLCJ0aXRsZSIsInBhZ2VEYXRhIiwicHJvcHMiLCJzYXZlSW1hZ2UiLCIkYXBwbHkiLCJkZWwiLCJpbmRleCIsImN1cnJlbnRUYXJnZXQiLCJkYXRhc2V0Iiwic3BsaWNlIiwidGh1bWJDbGljayIsImJpbmROYW1lSW5wdXQiLCJkZXRhaWwiLCJ2YWx1ZSIsImJpbmRMaW5rSW5wdXQiLCJzYXZlIiwiZ2xvYmFsRGF0YSIsInBhZ2VJbmRleCIsImNvbnNvbGUiLCJsb2ciLCJtb2R1bGVzIiwid3giLCJuYXZpZ2F0ZUJhY2siLCJkZWx0YSIsInRlbXBNb2R1bGVzIiwiZmlsdGVyIiwib2JqIiwiaWQiLCJwYWdlSWQiLCJyZXNvdXJjZVR5cGUiLCJyZXNvdXJjZU5hbWUiLCJyZXNvdXJjZVVybCIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUNBOztBQUVBLElBQU1BLE1BQU1DLFFBQVEsd0JBQVIsQ0FBWjs7ZUFFeUJBLFFBQVEsbUJBQVIsQztJQUFqQkMsWSxZQUFBQSxZOztnQkFFU0QsUUFBUSxrQkFBUixDO0lBQVRFLEksYUFBQUEsSTs7SUFFYUMsVzs7Ozs7Ozs7Ozs7Ozs7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cG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuaW1wb3J0IE1peGluIGZyb20gJy4vbWl4aW4nO1xuaW1wb3J0IHsgdXBsb2FkZXIgfSBmcm9tICcuLi8uLi91dGlscy91cGxvYWRlcic7XG5pbXBvcnQgeyB0b2FzdCB9IGZyb20gJy4uLy4uL3V0aWxzJztcbi8vIGltcG9ydCBtb2R1bGVzUGFyc2UgZnJvbSAnLi4vLi4vdXRpbHMvbW9kdWxlc1BhcnNlJztcblxuY29uc3QgYXBwID0gcmVxdWlyZSgnLi4vLi4vdXRpbHMvZ2xvYmFsRGF0YScpO1xuXG5jb25zdCB7IHBpY1NyY0RvbWFpbiB9ID0gcmVxdWlyZSgnLi4vLi4vdXRpbHMvaW5kZXgnKTtcblxuY29uc3QgeyBwb3N0IH0gPSByZXF1aXJlKCcuLi8uLi91dGlscy9hamF4Jyk7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEltYWdlU3dpcGVyIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+i9ruaSreW5v+WRiicsXG4gIH07XG4gIG1peGlucyA9IFtNaXhpbl07XG5cbiAgZGF0YSA9IHtcbiAgICAgIGluZGljYXRvckRvdHM6IHRydWUsXG4gICAgICB0aHVtYkFjdGl2ZTogMCxcbiAgICAgIHBpY05hbWU6ICcnLFxuICAgICAgbGlua05hbWU6ICcnLFxuICAgICAgcGFnZU1vZHVsZToge30sXG4gICAgICBwaWNEb21haW46IHBpY1NyY0RvbWFpbigpLFxuICB9O1xuICBvbkxvYWQoKSB7XG4gICAgICBbdGhpcy5wYWdlTW9kdWxlXSA9IHRoaXMudGVtcE1vZHVsZXMuZmlsdGVyKG9iaiA9PiBvYmouaWQgPT09IHRoaXMucGFnZUlkKTtcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMucGFnZU1vZHVsZSk7XG4gIH1cbiAgbWV0aG9kcyA9IHtcbiAgICAgIGFzeW5jIGFkZEJhbm5lcigpIHtcbiAgICAgICAgICBjb25zdCB7IHRlbXBGaWxlUGF0aHMgfSA9IGF3YWl0IHdlcHkuY2hvb3NlSW1hZ2UoKTtcbiAgICAgICAgICB1cGxvYWRlcih0ZW1wRmlsZVBhdGhzWzBdLCAoZSwgcmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgIGlmIChlKSB7XG4gICAgICAgICAgICAgICAgICB0b2FzdCgn5LiK5Lyg5aSx6LSl77yM6K+36YeN6K+V44CCJyk7XG4gICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgdG9hc3QoJ+S4iuS8oOaIkOWKn+OAgicpO1xuICAgICAgICAgICAgICBjb25zdCBzcmMgPSByZXN1bHQuY29udGVudDtcbiAgICAgICAgICAgICAgY29uc3QgbmFtZSA9IHRoaXMucGljTmFtZTtcbiAgICAgICAgICAgICAgdGhpcy5wYWdlTW9kdWxlLmNmZy5pbWFnZXMucHVzaCh7XG4gICAgICAgICAgICAgICAgICBzcmM6IHNyYyxcbiAgICAgICAgICAgICAgICAgIHBhZ2VLZXk6ICcnLFxuICAgICAgICAgICAgICAgICAgdGl0bGU6IG5hbWUsXG4gICAgICAgICAgICAgICAgICBsaW5rTmFtZTogdGhpcy5saW5rTmFtZSxcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHRoaXMucGFnZURhdGFbMF0ucHJvcHMuY2ZnLmltYWdlcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgIHNyYzogdGhpcy5waWNEb21haW4gKyBzcmMsXG4gICAgICAgICAgICAgICAgICB0aXRsZTogbmFtZSxcbiAgICAgICAgICAgICAgICAgIGxpbmtOYW1lOiB0aGlzLmxpbmtOYW1lLFxuICAgICAgICAgICAgICAgICAgcGFnZUtleTogJycsXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB0aGlzLnNhdmVJbWFnZShzcmMsIG5hbWUpO1xuICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgICAgIH0pO1xuICAgICAgfSxcbiAgICAgIGRlbChlKSB7XG4gICAgICAgICAgY29uc3QgeyBpbmRleCB9ID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQ7XG4gICAgICAgICAgdGhpcy5wYWdlRGF0YVswXS5wcm9wcy5jZmcuaW1hZ2VzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgdGhpcy5wYWdlTW9kdWxlLmNmZy5pbWFnZXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIH0sXG4gICAgICB0aHVtYkNsaWNrKGUpIHtcbiAgICAgICAgICB0aGlzLnRodW1iQWN0aXZlID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaW5kZXg7XG4gICAgICB9LFxuICAgICAgYmluZE5hbWVJbnB1dChlKSB7XG4gICAgICAgICAgdGhpcy5wYWdlRGF0YVswXS5wcm9wcy5jZmcuaW1hZ2VzW3RoaXMudGh1bWJBY3RpdmVdLnRpdGxlID0gZS5kZXRhaWwudmFsdWU7XG4gICAgICAgICAgdGhpcy5wYWdlTW9kdWxlLmNmZy5pbWFnZXNbdGhpcy50aHVtYkFjdGl2ZV0udGl0bGUgPSBlLmRldGFpbC52YWx1ZTtcbiAgICAgIH0sXG4gICAgICBiaW5kTGlua0lucHV0KGUpIHtcbiAgICAgICAgICB0aGlzLnBhZ2VEYXRhWzBdLnByb3BzLmNmZy5pbWFnZXNbdGhpcy50aHVtYkFjdGl2ZV0ubGlua05hbWUgPSBlLmRldGFpbC52YWx1ZTtcbiAgICAgICAgICB0aGlzLnBhZ2VNb2R1bGUuY2ZnLmltYWdlc1t0aGlzLnRodW1iQWN0aXZlXS5saW5rTmFtZSA9IGUuZGV0YWlsLnZhbHVlO1xuICAgICAgfSxcbiAgICAgIHNhdmUoKSB7XG4gICAgICAgICAgW2FwcC5nbG9iYWxEYXRhLnBhZ2VEYXRhW3RoaXMucGFnZUluZGV4XV0gPSB0aGlzLnBhZ2VEYXRhO1xuICAgICAgICAgIGNvbnNvbGUubG9nKGFwcC5nbG9iYWxEYXRhLnBhZ2VEYXRhW3RoaXMucGFnZUluZGV4XSk7XG4gICAgICAgICAgLy8gICBjb25zdCBtb2R1bGVzRGF0YSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoYXBwLmdsb2JhbERhdGEucGFnZURhdGEpKTtcbiAgICAgICAgICAvLyAgIGFwcC5nbG9iYWxEYXRhLm1vZHVsZXMgPSBtb2R1bGVzUGFyc2UucGFyc2VQYWdlRGF0YShtb2R1bGVzRGF0YSk7XG4gICAgICAgICAgYXBwLmdsb2JhbERhdGEubW9kdWxlc1t0aGlzLnBhZ2VJbmRleF0gPSB0aGlzLnBhZ2VNb2R1bGU7XG4gICAgICAgICAgY29uc29sZS5sb2coYXBwLmdsb2JhbERhdGEubW9kdWxlcyk7XG4gICAgICAgICAgd3gubmF2aWdhdGVCYWNrKHtcbiAgICAgICAgICAgICAgZGVsdGE6IDEsXG4gICAgICAgICAgfSk7XG4gICAgICB9LFxuICB9O1xuICBhc3luYyBzYXZlSW1hZ2Uoc3JjLCBuYW1lKSB7XG4gICAgICBhd2FpdCBwb3N0KCcvYnVzaW5lc3NSZXNvdXJjZS9pbnNlcnQnLCB7XG4gICAgICAgICAgcmVzb3VyY2VUeXBlOiAxLFxuICAgICAgICAgIHJlc291cmNlTmFtZTogbmFtZSxcbiAgICAgICAgICByZXNvdXJjZVVybDogc3JjLFxuICAgICAgfSk7XG4gIH1cbn1cbiJdfQ==