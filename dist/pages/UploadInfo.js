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
