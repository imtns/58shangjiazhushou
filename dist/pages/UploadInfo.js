'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _utils = require('./../utils/index.js');

var _ajaxP = require('./../utils/ajaxP.js');

var _UploadFile = require('./../components/UploadFile.js');

var _UploadFile2 = _interopRequireDefault(_UploadFile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var complateApi = '/resource/complete';
var uploadText = '/resource/upload/text';
var _getArticles = '/resource/articleList';
var saveUpload = '/businessResource/insert'; // resourceType  1图片  2视频     resourceUrl  调用/fileUpload之后返回的url   resourceName资源名称

var UploadInfo = function (_wepy$page) {
    _inherits(UploadInfo, _wepy$page);

    function UploadInfo() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, UploadInfo);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = UploadInfo.__proto__ || Object.getPrototypeOf(UploadInfo)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            navigationBarTitleText: '上传素材'
        }, _this.$repeat = {}, _this.$props = { "imageuploader": { "xmlns:v-on": "", "maxCount": "10", "maxSize": "4", "uploadtype": "1", "xmlns:v-bind": "", "v-bind:showDelete.once": "showImageDelete" }, "videouploader": { "maxCount": "5", "maxSize": "200", "uploadtype": "2", "v-bind:showDelete.once": "showVideoDelete" } }, _this.$events = { "imageuploader": { "v-on:changeimages": "setImages" }, "videouploader": { "v-on:changeimages": "setVideo" } }, _this.components = {
            imageuploader: _UploadFile2.default,
            videouploader: _UploadFile2.default
        }, _this.data = {
            showImageDelete: false,
            showVideoDelete: false,
            form: {
                textSize: 0,
                text: '',
                images: [],
                videos: [],
                articles: []
            }
        }, _this.methods = {
            setText: function setText(e) {
                var text = e.detail.value;
                text = (0, _utils.filteremoji)(text);
                this.updateForm({ text: text });
                return {
                    value: text
                };
            },
            setImages: function () {
                var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref2) {
                    var uploading = _ref2.uploading,
                        _ref2$images = _ref2.images,
                        images = _ref2$images === undefined ? [] : _ref2$images;

                    var sendData, _ref4, _ref5, e;

                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    this.updateForm({ uploading: uploading });

                                    if (!(uploading || images.length === 0)) {
                                        _context.next = 3;
                                        break;
                                    }

                                    return _context.abrupt('return');

                                case 3:
                                    sendData = { resourceType: 1, resourceUrl: images[images.length - 1], resourceName: '' };
                                    _context.next = 6;
                                    return (0, _ajaxP.get)(saveUpload, sendData, false);

                                case 6:
                                    _ref4 = _context.sent;
                                    _ref5 = _slicedToArray(_ref4, 1);
                                    e = _ref5[0];

                                    if (e) {
                                        (0, _utils.toast)(e);
                                    } else {
                                        this.updateForm({ images: images });
                                    }

                                case 10:
                                case 'end':
                                    return _context.stop();
                            }
                        }
                    }, _callee, this);
                }));

                function setImages(_x) {
                    return _ref3.apply(this, arguments);
                }

                return setImages;
            }(),
            setVideo: function () {
                var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_ref6) {
                    var uploading = _ref6.uploading,
                        _ref6$images = _ref6.images,
                        images = _ref6$images === undefined ? [] : _ref6$images;

                    var sendData, _ref8, _ref9, e;

                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                        while (1) {
                            switch (_context2.prev = _context2.next) {
                                case 0:
                                    this.updateForm({ uploading: uploading });

                                    if (!uploading) {
                                        _context2.next = 3;
                                        break;
                                    }

                                    return _context2.abrupt('return');

                                case 3:
                                    sendData = { resourceType: 2, resourceUrl: images[images.length - 1], resourceName: '' };
                                    _context2.next = 6;
                                    return (0, _ajaxP.get)(saveUpload, sendData);

                                case 6:
                                    _ref8 = _context2.sent;
                                    _ref9 = _slicedToArray(_ref8, 1);
                                    e = _ref9[0];

                                    if (e) {
                                        (0, _utils.toast)(e);
                                    } else {
                                        this.updateForm({ videos: images });
                                    }

                                case 10:
                                case 'end':
                                    return _context2.stop();
                            }
                        }
                    }, _callee2, this);
                }));

                function setVideo(_x2) {
                    return _ref7.apply(this, arguments);
                }

                return setVideo;
            }(),
            bindUploadText: function () {
                var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
                    var text, _ref11, _ref12, e;

                    return regeneratorRuntime.wrap(function _callee3$(_context3) {
                        while (1) {
                            switch (_context3.prev = _context3.next) {
                                case 0:
                                    text = this.form.text;

                                    if (text) {
                                        _context3.next = 4;
                                        break;
                                    }

                                    (0, _utils.toast)('文本内容不能为空');
                                    return _context3.abrupt('return');

                                case 4:
                                    _context3.next = 6;
                                    return (0, _ajaxP.get)(uploadText, { text: text });

                                case 6:
                                    _ref11 = _context3.sent;
                                    _ref12 = _slicedToArray(_ref11, 1);
                                    e = _ref12[0];

                                    if (e) {
                                        (0, _utils.toast)(e);
                                    } else {
                                        (0, _utils.alert)('文本上传成功');
                                        this.updateForm({ textSize: this.form.textSize += 1 });
                                    }

                                case 10:
                                case 'end':
                                    return _context3.stop();
                            }
                        }
                    }, _callee3, this);
                }));

                function bindUploadText() {
                    return _ref10.apply(this, arguments);
                }

                return bindUploadText;
            }(),
            submitSave: function () {
                var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
                    var url, _ref14, _ref15, e;

                    return regeneratorRuntime.wrap(function _callee4$(_context4) {
                        while (1) {
                            switch (_context4.prev = _context4.next) {
                                case 0:
                                    if (this.form.enable) {
                                        _context4.next = 2;
                                        break;
                                    }

                                    return _context4.abrupt('return');

                                case 2:
                                    url = '/pages/UploadInfoSuccess';
                                    _context4.next = 5;
                                    return (0, _ajaxP.post)(complateApi, { mpid: this.form.mpid });

                                case 5:
                                    _ref14 = _context4.sent;
                                    _ref15 = _slicedToArray(_ref14, 1);
                                    e = _ref15[0];

                                    if (!e) {
                                        _context4.next = 11;
                                        break;
                                    }

                                    (0, _utils.toast)(e);
                                    return _context4.abrupt('return');

                                case 11:
                                    _wepy2.default.redirectTo({
                                        url: url
                                    });

                                case 12:
                                case 'end':
                                    return _context4.stop();
                            }
                        }
                    }, _callee4, this);
                }));

                function submitSave() {
                    return _ref13.apply(this, arguments);
                }

                return submitSave;
            }()
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(UploadInfo, [{
        key: 'getArticles',
        value: function () {
            var _ref16 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
                var _ref17, _ref18, e, _ref18$, articles;

                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                _context5.next = 2;
                                return (0, _ajaxP.get)(_getArticles);

                            case 2:
                                _ref17 = _context5.sent;
                                _ref18 = _slicedToArray(_ref17, 2);
                                e = _ref18[0];
                                _ref18$ = _ref18[1];
                                articles = _ref18$ === undefined ? [] : _ref18$;

                                if (!e) {
                                    _context5.next = 10;
                                    break;
                                }

                                (0, _utils.toast)(e);
                                return _context5.abrupt('return');

                            case 10:
                                console.log('articles', articles);
                                this.updateForm({ articles: articles || [] });

                            case 12:
                            case 'end':
                                return _context5.stop();
                        }
                    }
                }, _callee5, this);
            }));

            function getArticles() {
                return _ref16.apply(this, arguments);
            }

            return getArticles;
        }()
    }, {
        key: 'updateForm',
        value: function updateForm(data) {
            this.form = Object.assign({}, this.form, data);
            var enable = !!(this.form.textSize || this.form.images.length || this.form.videos.length || this.form.articles.length);
            this.form = Object.assign({}, this.form, { enable: enable });
            console.log('form', this.form);
            this.$apply();
        }
    }, {
        key: 'verify',
        value: function verify() {
            var _form = this.form,
                text = _form.text,
                images = _form.images,
                videos = _form.videos,
                articles = _form.articles;

            return text > 0 || images.length > 0 || videos.length > 0 || articles.length > 0;
        }
    }, {
        key: 'onLoad',
        value: function () {
            var _ref19 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(options) {
                var mpid;
                return regeneratorRuntime.wrap(function _callee6$(_context6) {
                    while (1) {
                        switch (_context6.prev = _context6.next) {
                            case 0:
                                _context6.next = 2;
                                return (0, _utils.sleep)();

                            case 2:
                                mpid = options.mpid || _wepy2.default.getStorageSync('current_mpid');

                                this.updateForm({ mpid: mpid });

                            case 4:
                            case 'end':
                                return _context6.stop();
                        }
                    }
                }, _callee6, this);
            }));

            function onLoad(_x3) {
                return _ref19.apply(this, arguments);
            }

            return onLoad;
        }()
    }, {
        key: 'onShow',
        value: function () {
            var _ref20 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
                return regeneratorRuntime.wrap(function _callee7$(_context7) {
                    while (1) {
                        switch (_context7.prev = _context7.next) {
                            case 0:
                                _context7.next = 2;
                                return this.getArticles();

                            case 2:
                            case 'end':
                                return _context7.stop();
                        }
                    }
                }, _callee7, this);
            }));

            function onShow() {
                return _ref20.apply(this, arguments);
            }

            return onShow;
        }()
    }]);

    return UploadInfo;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(UploadInfo , 'pages/UploadInfo'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlVwbG9hZEluZm8uanMiXSwibmFtZXMiOlsiY29tcGxhdGVBcGkiLCJ1cGxvYWRUZXh0IiwiZ2V0QXJ0aWNsZXMiLCJzYXZlVXBsb2FkIiwiVXBsb2FkSW5mbyIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJpbWFnZXVwbG9hZGVyIiwiVXBsb2FkRmlsZSIsInZpZGVvdXBsb2FkZXIiLCJkYXRhIiwic2hvd0ltYWdlRGVsZXRlIiwic2hvd1ZpZGVvRGVsZXRlIiwiZm9ybSIsInRleHRTaXplIiwidGV4dCIsImltYWdlcyIsInZpZGVvcyIsImFydGljbGVzIiwibWV0aG9kcyIsInNldFRleHQiLCJlIiwiZGV0YWlsIiwidmFsdWUiLCJ1cGRhdGVGb3JtIiwic2V0SW1hZ2VzIiwidXBsb2FkaW5nIiwibGVuZ3RoIiwic2VuZERhdGEiLCJyZXNvdXJjZVR5cGUiLCJyZXNvdXJjZVVybCIsInJlc291cmNlTmFtZSIsInNldFZpZGVvIiwiYmluZFVwbG9hZFRleHQiLCJzdWJtaXRTYXZlIiwiZW5hYmxlIiwidXJsIiwibXBpZCIsIndlcHkiLCJyZWRpcmVjdFRvIiwiY29uc29sZSIsImxvZyIsIk9iamVjdCIsImFzc2lnbiIsIiRhcHBseSIsIm9wdGlvbnMiLCJnZXRTdG9yYWdlU3luYyIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFDQTs7OztBQUVBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLGNBQWMsb0JBQXBCO0FBQ0EsSUFBTUMsYUFBYSx1QkFBbkI7QUFDQSxJQUFNQyxlQUFjLHVCQUFwQjtBQUNBLElBQU1DLGFBQWEsMEJBQW5CLEMsQ0FBK0M7O0lBRTFCQyxVOzs7Ozs7Ozs7Ozs7OztrTUFDakJDLE0sR0FBUztBQUNMQyxvQ0FBd0I7QUFEbkIsUyxRQUdWQyxPLEdBQVUsRSxRQUNiQyxNLEdBQVMsRUFBQyxpQkFBZ0IsRUFB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LE9BQU9XLE1BQVAsR0FBZ0IsQ0FBNUIsSUFBaUNWLE9BQU9VLE1BQVAsR0FBZ0IsQ0FBakQsSUFBc0RULFNBQVNTLE1BQVQsR0FBa0IsQ0FBL0U7QUFDSDs7OzttR0FDYWtCLE87Ozs7Ozs7dUNBQ0osbUI7OztBQUNBUixvQyxHQUFPUSxRQUFRUixJQUFSLElBQWdCQyxlQUFLUSxjQUFMLENBQW9CLGNBQXBCLEM7O0FBQzdCLHFDQUFLdEIsVUFBTCxDQUFnQixFQUFFYSxVQUFGLEVBQWhCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3VDQUdNLEtBQUt2QyxXQUFMLEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUE3RzBCd0MsZUFBS1MsSTs7a0JBQXhCL0MsVSIsImZpbGUiOiJVcGxvYWRJbmZvLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcblxuaW1wb3J0IHsgc2xlZXAsIHRvYXN0LCBhbGVydCwgZmlsdGVyZW1vamkgfSBmcm9tICcuLi91dGlscyc7XG5pbXBvcnQgeyBnZXQsIHBvc3QgfSBmcm9tICcuLi91dGlscy9hamF4UCc7XG5pbXBvcnQgVXBsb2FkRmlsZSBmcm9tICcuLi9jb21wb25lbnRzL1VwbG9hZEZpbGUnO1xuXG5jb25zdCBjb21wbGF0ZUFwaSA9ICcvcmVzb3VyY2UvY29tcGxldGUnO1xuY29uc3QgdXBsb2FkVGV4dCA9ICcvcmVzb3VyY2UvdXBsb2FkL3RleHQnO1xuY29uc3QgZ2V0QXJ0aWNsZXMgPSAnL3Jlc291cmNlL2FydGljbGVMaXN0JztcbmNvbnN0IHNhdmVVcGxvYWQgPSAnL2J1c2luZXNzUmVzb3VyY2UvaW5zZXJ0JzsgLy8gcmVzb3VyY2VUeXBlICAx5Zu+54mHICAy6KeG6aKRICAgICByZXNvdXJjZVVybCAg6LCD55SoL2ZpbGVVcGxvYWTkuYvlkI7ov5Tlm57nmoR1cmwgICByZXNvdXJjZU5hbWXotYTmupDlkI3np7BcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXBsb2FkSW5mbyBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5LiK5Lyg57Sg5p2QJyxcbiAgICB9XG4gICAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcImltYWdldXBsb2FkZXJcIjp7XCJ4bWxuczp2LW9uXCI6XCJcIixcIm1heENvdW50XCI6XCIxMFwiLFwibWF4U2l6ZVwiOlwiNFwiLFwidXBsb2FkdHlwZVwiOlwiMVwiLFwieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDpzaG93RGVsZXRlLm9uY2VcIjpcInNob3dJbWFnZURlbGV0ZVwifSxcInZpZGVvdXBsb2FkZXJcIjp7XCJtYXhDb3VudFwiOlwiNVwiLFwibWF4U2l6ZVwiOlwiMjAwXCIsXCJ1cGxvYWR0eXBlXCI6XCIyXCIsXCJ2LWJpbmQ6c2hvd0RlbGV0ZS5vbmNlXCI6XCJzaG93VmlkZW9EZWxldGVcIn19O1xyXG4kZXZlbnRzID0ge1wiaW1hZ2V1cGxvYWRlclwiOntcInYtb246Y2hhbmdlaW1hZ2VzXCI6XCJzZXRJbWFnZXNcIn0sXCJ2aWRlb3VwbG9hZGVyXCI6e1widi1vbjpjaGFuZ2VpbWFnZXNcIjpcInNldFZpZGVvXCJ9fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgICAgIGltYWdldXBsb2FkZXI6IFVwbG9hZEZpbGUsXG4gICAgICAgIHZpZGVvdXBsb2FkZXI6IFVwbG9hZEZpbGUsXG4gICAgfVxuICAgIGRhdGEgPSB7XG4gICAgICAgIHNob3dJbWFnZURlbGV0ZTogZmFsc2UsXG4gICAgICAgIHNob3dWaWRlb0RlbGV0ZTogZmFsc2UsXG4gICAgICAgIGZvcm06IHtcbiAgICAgICAgICAgIHRleHRTaXplOiAwLFxuICAgICAgICAgICAgdGV4dDogJycsXG4gICAgICAgICAgICBpbWFnZXM6IFtdLFxuICAgICAgICAgICAgdmlkZW9zOiBbXSxcbiAgICAgICAgICAgIGFydGljbGVzOiBbXSxcbiAgICAgICAgfSxcbiAgICB9XG4gICAgYXN5bmMgZ2V0QXJ0aWNsZXMgKCkge1xuICAgICAgICBjb25zdCBbZSwgYXJ0aWNsZXMgPSBbXV0gPSBhd2FpdCBnZXQoZ2V0QXJ0aWNsZXMpO1xuICAgICAgICBpZiAoZSkge1xuICAgICAgICAgICAgdG9hc3QoZSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coJ2FydGljbGVzJywgYXJ0aWNsZXMpO1xuICAgICAgICB0aGlzLnVwZGF0ZUZvcm0oeyBhcnRpY2xlczogYXJ0aWNsZXMgfHwgW10gfSk7XG4gICAgfVxuICAgIG1ldGhvZHMgPSB7XG4gICAgICAgIHNldFRleHQgKGUpIHtcbiAgICAgICAgICAgIGxldCB0ZXh0ID0gZS5kZXRhaWwudmFsdWU7XG4gICAgICAgICAgICB0ZXh0ID0gZmlsdGVyZW1vamkodGV4dCk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUZvcm0oeyB0ZXh0IH0pO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogdGV4dCxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0sXG4gICAgICAgIGFzeW5jIHNldEltYWdlcyAoeyB1cGxvYWRpbmcsIGltYWdlcyA9IFtdIH0pIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlRm9ybSh7IHVwbG9hZGluZyB9KTtcbiAgICAgICAgICAgIGlmICh1cGxvYWRpbmcgfHwgaW1hZ2VzLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuICAgICAgICAgICAgY29uc3Qgc2VuZERhdGEgPSB7IHJlc291cmNlVHlwZTogMSwgcmVzb3VyY2VVcmw6IGltYWdlc1tpbWFnZXMubGVuZ3RoIC0gMV0sIHJlc291cmNlTmFtZTogJycgfTtcbiAgICAgICAgICAgIGNvbnN0IFtlXSA9IGF3YWl0IGdldChzYXZlVXBsb2FkLCBzZW5kRGF0YSwgZmFsc2UpO1xuICAgICAgICAgICAgaWYgKGUpIHtcbiAgICAgICAgICAgICAgICB0b2FzdChlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVGb3JtKHsgaW1hZ2VzIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBhc3luYyBzZXRWaWRlbyAoeyB1cGxvYWRpbmcsIGltYWdlcyA9IFtdIH0pIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlRm9ybSh7IHVwbG9hZGluZyB9KTtcbiAgICAgICAgICAgIGlmICh1cGxvYWRpbmcpIHJldHVybjtcbiAgICAgICAgICAgIGNvbnN0IHNlbmREYXRhID0geyByZXNvdXJjZVR5cGU6IDIsIHJlc291cmNlVXJsOiBpbWFnZXNbaW1hZ2VzLmxlbmd0aCAtIDFdLCByZXNvdXJjZU5hbWU6ICcnIH07XG4gICAgICAgICAgICBjb25zdCBbZV0gPSBhd2FpdCBnZXQoc2F2ZVVwbG9hZCwgc2VuZERhdGEpO1xuICAgICAgICAgICAgaWYgKGUpIHtcbiAgICAgICAgICAgICAgICB0b2FzdChlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVGb3JtKHsgdmlkZW9zOiBpbWFnZXMgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGFzeW5jIGJpbmRVcGxvYWRUZXh0ICgpIHtcbiAgICAgICAgICAgIGNvbnN0IHsgdGV4dCB9ID0gdGhpcy5mb3JtO1xuICAgICAgICAgICAgaWYgKCF0ZXh0KSB7XG4gICAgICAgICAgICAgICAgdG9hc3QoJ+aWh+acrOWGheWuueS4jeiDveS4uuepuicpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IFtlXSA9IGF3YWl0IGdldCh1cGxvYWRUZXh0LCB7IHRleHQgfSk7XG4gICAgICAgICAgICBpZiAoZSkge1xuICAgICAgICAgICAgICAgIHRvYXN0KGUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBhbGVydCgn5paH5pys5LiK5Lyg5oiQ5YqfJyk7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVGb3JtKHsgdGV4dFNpemU6IHRoaXMuZm9ybS50ZXh0U2l6ZSArPSAxIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBhc3luYyBzdWJtaXRTYXZlICgpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5mb3JtLmVuYWJsZSkgcmV0dXJuO1xuICAgICAgICAgICAgY29uc3QgdXJsID0gJy9wYWdlcy9VcGxvYWRJbmZvU3VjY2Vzcyc7XG4gICAgICAgICAgICBjb25zdCBbZV0gPSBhd2FpdCBwb3N0KGNvbXBsYXRlQXBpLCB7IG1waWQ6IHRoaXMuZm9ybS5tcGlkIH0pO1xuICAgICAgICAgICAgaWYgKGUpIHtcbiAgICAgICAgICAgICAgICB0b2FzdChlKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3ZXB5LnJlZGlyZWN0VG8oe1xuICAgICAgICAgICAgICAgIHVybCxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgIH1cbiAgICB1cGRhdGVGb3JtIChkYXRhKSB7XG4gICAgICAgIHRoaXMuZm9ybSA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuZm9ybSwgZGF0YSk7XG4gICAgICAgIGNvbnN0IGVuYWJsZSA9ICEhKHRoaXMuZm9ybS50ZXh0U2l6ZSB8fCB0aGlzLmZvcm0uaW1hZ2VzLmxlbmd0aFxuICAgICAgICAgICAgfHwgdGhpcy5mb3JtLnZpZGVvcy5sZW5ndGggfHwgdGhpcy5mb3JtLmFydGljbGVzLmxlbmd0aCk7XG4gICAgICAgIHRoaXMuZm9ybSA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuZm9ybSwgeyBlbmFibGUgfSk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdmb3JtJywgdGhpcy5mb3JtKTtcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICB9XG4gICAgdmVyaWZ5ICgpIHtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgdGV4dCwgaW1hZ2VzLCB2aWRlb3MsIGFydGljbGVzLFxuICAgICAgICB9ID0gdGhpcy5mb3JtO1xuICAgICAgICByZXR1cm4gdGV4dCA+IDAgfHwgaW1hZ2VzLmxlbmd0aCA+IDAgfHwgdmlkZW9zLmxlbmd0aCA+IDAgfHwgYXJ0aWNsZXMubGVuZ3RoID4gMDtcbiAgICB9XG4gICAgYXN5bmMgb25Mb2FkIChvcHRpb25zKSB7XG4gICAgICAgIGF3YWl0IHNsZWVwKCk7XG4gICAgICAgIGNvbnN0IG1waWQgPSBvcHRpb25zLm1waWQgfHwgd2VweS5nZXRTdG9yYWdlU3luYygnY3VycmVudF9tcGlkJyk7XG4gICAgICAgIHRoaXMudXBkYXRlRm9ybSh7IG1waWQgfSk7XG4gICAgfVxuICAgIGFzeW5jIG9uU2hvdyAoKSB7XG4gICAgICAgIGF3YWl0IHRoaXMuZ2V0QXJ0aWNsZXMoKTtcbiAgICB9XG59XG4iXX0=