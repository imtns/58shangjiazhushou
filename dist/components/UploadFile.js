'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _utils = require('./../utils/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var host = 'https://yaofa.58.com';

var Uploader = function (_wepy$component) {
    _inherits(Uploader, _wepy$component);

    function Uploader() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Uploader);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Uploader.__proto__ || Object.getPrototypeOf(Uploader)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
            uploading: false,
            vm: [],
            images: [],
            titleStatus: ['图片', '视频']
        }, _this.props = {
            uploadtype: String,
            maxSize: String,
            maxCount: String,
            showDelete: {
                type: Boolean,
                default: true
            },
            uploadingImage: {
                type: String,
                default: 'https://img.58cdn.com.cn/lbg/shangjiaxcxht/zhushou/img/upimg_loading_1.gif'
            },
            uploadImageApi: {
                type: String,
                default: '/fileUpload'
            },
            uploadVideoApi: {
                type: String,
                default: '/wosFileUpload'
            }
        }, _this.computed = {
            currentCount: function currentCount() {
                var count = this.maxCount - this.vm.length;
                return count > 0 ? count : 0;
            }
        }, _this.methods = {
            bindUploadImage: function () {
                var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                    var _this2 = this;

                    var self, start, _ref3, tempFilePaths, fileSize, sfileset, simages;

                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                        while (1) {
                            switch (_context2.prev = _context2.next) {
                                case 0:
                                    if (!this.uploading) {
                                        _context2.next = 2;
                                        break;
                                    }

                                    return _context2.abrupt('return');

                                case 2:
                                    self = this;
                                    start = this.data.vm.length || 0;
                                    _context2.next = 6;
                                    return _wepy2.default.chooseImage({ count: this.currentCount, sizeType: 'compressed' });

                                case 6:
                                    _ref3 = _context2.sent;
                                    tempFilePaths = _ref3.tempFilePaths;
                                    fileSize = tempFilePaths.length;
                                    sfileset = [].concat(_toConsumableArray(self.vm));
                                    simages = [].concat(_toConsumableArray(self.images));

                                    sfileset = self.batchAddArray(sfileset, fileSize, self.uploadingImage);
                                    // 上传中图片
                                    self.uploading = true;
                                    self.vm = [].concat(_toConsumableArray(sfileset));
                                    // 触发图片更改事件
                                    self.$emit('changeimages', {
                                        uploading: self.uploading,
                                        images: self.images
                                    });
                                    self.vm = [].concat(_toConsumableArray(sfileset));
                                    self.$apply();
                                    tempFilePaths.map(function () {
                                        var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(file, i) {
                                            var _ref5, _ref6, e, data;

                                            return regeneratorRuntime.wrap(function _callee$(_context) {
                                                while (1) {
                                                    switch (_context.prev = _context.next) {
                                                        case 0:
                                                            _context.next = 2;
                                                            return self.uploadImage(file);

                                                        case 2:
                                                            _ref5 = _context.sent;
                                                            _ref6 = _slicedToArray(_ref5, 2);
                                                            e = _ref6[0];
                                                            data = _ref6[1];

                                                            if (!e) {
                                                                _context.next = 12;
                                                                break;
                                                            }

                                                            _context.next = 9;
                                                            return (0, _utils.toastSync)(e);

                                                        case 9:
                                                            sfileset.splice(start + i, 1); // 失败删除
                                                            _context.next = 14;
                                                            break;

                                                        case 12:
                                                            sfileset.splice(start + i, 1, file); // 成功替换
                                                            simages.push(data.content);

                                                        case 14:
                                                            // 每张照片上传成功调用
                                                            self.images = [].concat(_toConsumableArray(simages));
                                                            self.vm = [].concat(_toConsumableArray(sfileset));
                                                            // 所有图片上传完成
                                                            if (fileSize - 1 === i) {
                                                                self.$emit('changeimages', {
                                                                    uploading: false,
                                                                    images: self.images
                                                                });
                                                            }
                                                            self.$apply();
                                                            return _context.abrupt('return', file);

                                                        case 19:
                                                        case 'end':
                                                            return _context.stop();
                                                    }
                                                }
                                            }, _callee, _this2);
                                        }));

                                        return function (_x, _x2) {
                                            return _ref4.apply(this, arguments);
                                        };
                                    }());

                                case 18:
                                case 'end':
                                    return _context2.stop();
                            }
                        }
                    }, _callee2, this);
                }));

                function bindUploadImage() {
                    return _ref2.apply(this, arguments);
                }

                return bindUploadImage;
            }(),
            bindUploadVideo: function () {
                var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
                    var _this3 = this;

                    var self, start, _ref8, tempFilePath, tempFilePaths, fileSize, sfileset, simages;

                    return regeneratorRuntime.wrap(function _callee4$(_context4) {
                        while (1) {
                            switch (_context4.prev = _context4.next) {
                                case 0:
                                    if (!this.uploading) {
                                        _context4.next = 2;
                                        break;
                                    }

                                    return _context4.abrupt('return');

                                case 2:
                                    self = this;
                                    start = this.data.vm.length || 0;
                                    _context4.next = 6;
                                    return _wepy2.default.chooseVideo();

                                case 6:
                                    _ref8 = _context4.sent;
                                    tempFilePath = _ref8.tempFilePath;
                                    tempFilePaths = [tempFilePath];

                                    tempFilePath = null;
                                    console.log(tempFilePaths);
                                    fileSize = tempFilePaths.length;
                                    sfileset = [].concat(_toConsumableArray(self.vm));
                                    simages = [].concat(_toConsumableArray(self.images));

                                    sfileset = self.batchAddArray(sfileset, fileSize, self.uploadingImage);
                                    // 上传中图片
                                    self.uploading = true;
                                    self.vm = [].concat(_toConsumableArray(sfileset));
                                    // 触发图片更改事件
                                    self.$emit('changeimages', {
                                        uploading: self.uploading,
                                        images: self.images
                                    });
                                    self.vm = [].concat(_toConsumableArray(sfileset));
                                    self.$apply();
                                    tempFilePaths.map(function () {
                                        var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(file, i) {
                                            var _ref10, _ref11, e, data;

                                            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                                                while (1) {
                                                    switch (_context3.prev = _context3.next) {
                                                        case 0:
                                                            _context3.next = 2;
                                                            return self.uploadVideo(file);

                                                        case 2:
                                                            _ref10 = _context3.sent;
                                                            _ref11 = _slicedToArray(_ref10, 2);
                                                            e = _ref11[0];
                                                            data = _ref11[1];

                                                            if (!e) {
                                                                _context3.next = 12;
                                                                break;
                                                            }

                                                            _context3.next = 9;
                                                            return (0, _utils.toastSync)(e);

                                                        case 9:
                                                            sfileset.splice(start + i, 1); // 失败删除
                                                            _context3.next = 14;
                                                            break;

                                                        case 12:
                                                            sfileset.splice(start + i, 1, file); // 成功替换
                                                            simages.push(data.content);

                                                        case 14:
                                                            // 每张照片上传成功调用
                                                            self.images = [].concat(_toConsumableArray(simages));
                                                            self.vm = [].concat(_toConsumableArray(sfileset));
                                                            // 触发图片更改事件
                                                            self.$emit('changeimages', {
                                                                uploading: false,
                                                                images: self.images
                                                            });
                                                            self.$apply();
                                                            // 所有图片上传完成
                                                            if (fileSize - 1 === i) {
                                                                self.uploading = false;
                                                                self.$apply();
                                                            }
                                                            return _context3.abrupt('return', file);

                                                        case 20:
                                                        case 'end':
                                                            return _context3.stop();
                                                    }
                                                }
                                            }, _callee3, _this3);
                                        }));

                                        return function (_x3, _x4) {
                                            return _ref9.apply(this, arguments);
                                        };
                                    }());

                                case 21:
                                case 'end':
                                    return _context4.stop();
                            }
                        }
                    }, _callee4, this);
                }));

                function bindUploadVideo() {
                    return _ref7.apply(this, arguments);
                }

                return bindUploadVideo;
            }(),
            onCancelImage: function onCancelImage(index) {
                if (this.data.uploading) return;
                var sfileset = this.data.vm;
                var simages = this.data.images;
                sfileset.splice(index, 1);
                simages.splice(index, 1);
                this.vm = [].concat(_toConsumableArray(sfileset));
                this.images = [].concat(_toConsumableArray(simages));
                this.$apply();
                // 触发图片更改事件
                this.$emit('changeImages', {
                    images: this.data.images
                });
            },
            bindPlayVideo: function bindPlayVideo(url) {
                if (url) {
                    _wepy2.default.navigateTo({
                        url: '/pages/VideoPlay?url=' + url
                    });
                }
            },
            bindPreviewImage: function bindPreviewImage(current) {
                _wepy2.default.previewImage({
                    current: current,
                    urls: this.vm
                });
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Uploader, [{
        key: 'uploadImage',
        value: function uploadImage(file) {
            var _this4 = this;

            return new Promise(function (resolve) {
                _wepy2.default.uploadFile({
                    url: host + _this4.uploadImageApi,
                    filePath: file,
                    name: 'content'
                }).then(function (response) {
                    try {
                        console.log(response);
                        var res = JSON.parse(response.data);
                        var state = res.state,
                            msg = res.msg,
                            data = res.data;

                        if (state === 100) {
                            resolve([null, data]);
                        } else {
                            resolve([msg]);
                        }
                        console.log(res);
                    } catch (e) {
                        console.log(e);
                        resolve([e]);
                    }
                }).catch(function (e) {
                    console.log(e);
                    var errMsg = e.errMsg;

                    resolve([errMsg]);
                });
            });
        }
    }, {
        key: 'uploadVideo',
        value: function uploadVideo(file) {
            var _this5 = this;

            return new Promise(function (resolve) {
                _wepy2.default.uploadFile({
                    url: host + _this5.uploadVideoApi,
                    filePath: file,
                    name: 'content'
                }).then(function (response) {
                    try {
                        console.log(response);
                        var res = JSON.parse(response.data);
                        var state = res.state,
                            msg = res.msg,
                            data = res.data;

                        if (state === 100) {
                            resolve([null, data]);
                        } else {
                            resolve([msg]);
                        }
                        console.log(res);
                    } catch (e) {
                        console.log(e);
                        resolve([e]);
                    }
                }).catch(function (e) {
                    console.log(e);
                    var errMsg = e.errMsg;

                    resolve([errMsg]);
                });
            });
        }
    }, {
        key: 'batchAddArray',
        value: function batchAddArray(array, size, value) {
            var ret = array;
            if (ret instanceof Array) {
                for (var i = 0; i < size; i += 1) {
                    ret.push(value);
                }
            }
            return ret;
        }
    }, {
        key: 'onLoad',
        value: function onLoad() {
            this.vm = [];
            this.images = [];
            this.uploading = false;
            this.$apply();
        }
    }]);

    return Uploader;
}(_wepy2.default.component);

exports.default = Uploader;