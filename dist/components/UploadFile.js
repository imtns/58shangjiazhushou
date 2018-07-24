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
            defaultImages: { // 默认图片
                type: Array,
                default: []
            },
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
            },
            // normal 大图，order 预约组件中需要的样式
            showType: {
                type: String,
                default: 'normal'
            }
        }, _this.computed = {
            currentCount: function currentCount() {
                if (this.showType === 'order') {
                    return 1;
                }

                var count = this.maxCount - this.vm.length;
                return count > 0 ? count : 0;
            }
        }, _this.watch = {
            defaultImages: function defaultImages(v) {
                this.vm = v;
                this.$apply();
            }
        }, _this.methods = {
            bindUploadImage: function () {
                var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                    var _this2 = this;

                    var self, _ref3, tempFilePaths, start, fileSize, sfileset, simages;

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
                                    _context2.next = 5;
                                    return _wepy2.default.chooseImage({ count: this.currentCount, sizeType: 'compressed' });

                                case 5:
                                    _ref3 = _context2.sent;
                                    tempFilePaths = _ref3.tempFilePaths;


                                    if (self.showType === 'order' && self.vm.length) {
                                        self.vm = [];
                                        self.images = [];
                                        self.$apply();
                                    }

                                    start = this.data.vm.length || 0;
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
                                                            console.log(file, i);
                                                            if (fileSize - 1 === i) {
                                                                self.$emit('changeimages', {
                                                                    uploading: false,
                                                                    images: self.images
                                                                });
                                                                self.uploading = false;
                                                            }
                                                            self.$apply();
                                                            return _context.abrupt('return', file);

                                                        case 20:
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

                                case 19:
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
                            return resolve([null, data]);
                        }
                        console.log(res);
                        return resolve([msg]);
                    } catch (e) {
                        console.log(e);
                        return resolve([e]);
                    }
                }).catch(function (e) {
                    console.log(e);
                    var errMsg = e.errMsg;

                    return resolve([errMsg]);
                });
            });
        }
    }, {
        key: 'uploadVideo',
        value: function uploadVideo(file) {
            var _this5 = this;

            return (0, _utils.getNetStatus)().then(function (netStatus) {
                // 只有wifi环境下才能上传视频
                if (netStatus !== 1) {
                    return (0, _utils.toast)('请切换到wifi环境下上传视频');
                }

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlVwbG9hZEZpbGUuanMiXSwibmFtZXMiOlsiaG9zdCIsIlVwbG9hZGVyIiwiZGF0YSIsInVwbG9hZGluZyIsInZtIiwiaW1hZ2VzIiwidGl0bGVTdGF0dXMiLCJwcm9wcyIsInVwbG9hZHR5cGUiLCJTdHJpbmciLCJtYXhTaXplIiwibWF4Q291bnQiLCJkZWZhdWx0SW1hZ2VzIiwidHlwZSIsIkFycmF5IiwiZGVmYXVsdCIsInNob3dEZWxldGUiLCJCb29sZWFuIiwidXBsb2FkaW5nSW1hZ2UiLCJ1cGxvYWRJbWFnZUFwaSIsInVwbG9hZFZpZGVvQXBpIiwic2hvd1R5cGUiLCJjb21wdXRlZCIsImN1cnJlbnRDb3VudCIsImNvdW50IiwibGVuZ3RoIiwid2F0Y2giLCJ2IiwiJGFwcGx5IiwibWV0aG9kcyIsImJpbmRVcGxvYWRJbWFnZSIsInNlbGYiLCJ3ZXB5IiwiY2hvb3NlSW1hZ2UiLCJzaXplVHlwZSIsInRlbXBGaWxlUGF0aHMiLCJzdGFydCIsImZpbGVTaXplIiwic2ZpbGVzZXQiLCJzaW1hZ2VzIiwiYmF0Y2hBZGRBcnJheSIsIiRlbWl0IiwibWFwIiwiZmlsZSIsImkiLCJ1cGxvYWRJbWFnZSIsImUiLCJzcGxpY2UiLCJwdXNoIiwiY29udGVudCIsImNvbnNvbGUiLCJsb2ciLCJiaW5kVXBsb2FkVmlkZW8iLCJjaG9vc2VWaWRlbyIsInRlbXBGaWxlUGF0aCIsInVwbG9hZFZpZGVvIiwib25DYW5jZWxJbWFnZSIsImluZGV4IiwiYmluZFBsYXlWaWRlbyIsInVybCIsIm5hdmlnYXRlVG8iLCJiaW5kUHJldmlld0ltYWdlIiwiY3VycmVudCIsInByZXZpZXdJbWFnZSIsInVybHMiLCJQcm9taXNlIiwidXBsb2FkRmlsZSIsImZpbGVQYXRoIiwibmFtZSIsInRoZW4iLCJyZXNwb25zZSIsInJlcyIsIkpTT04iLCJwYXJzZSIsInN0YXRlIiwibXNnIiwicmVzb2x2ZSIsImNhdGNoIiwiZXJyTXNnIiwibmV0U3RhdHVzIiwiYXJyYXkiLCJzaXplIiwi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Ozs7O0VBN1FpQ0ksZUFBS29ELFM7O2tCQUF0Qm5GLFEiLCJmaWxlIjoiVXBsb2FkRmlsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5pbXBvcnQgeyB0b2FzdFN5bmMsIGdldE5ldFN0YXR1cywgdG9hc3QgfSBmcm9tICcuLi91dGlscyc7XG5cbmNvbnN0IGhvc3QgPSAnaHR0cHM6Ly95YW9mYS41OC5jb20nO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXBsb2FkZXIgZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XG4gICAgZGF0YSA9IHtcbiAgICAgICAgdXBsb2FkaW5nOiBmYWxzZSxcbiAgICAgICAgdm06IFtdLFxuICAgICAgICBpbWFnZXM6IFtdLFxuICAgICAgICB0aXRsZVN0YXR1czogWyflm77niYcnLCAn6KeG6aKRJ10sXG4gICAgfVxuICAgIHByb3BzID0ge1xuICAgICAgICB1cGxvYWR0eXBlOiBTdHJpbmcsXG4gICAgICAgIG1heFNpemU6IFN0cmluZyxcbiAgICAgICAgbWF4Q291bnQ6IFN0cmluZyxcbiAgICAgICAgZGVmYXVsdEltYWdlczogeyAvLyDpu5jorqTlm77niYdcbiAgICAgICAgICAgIHR5cGU6IEFycmF5LFxuICAgICAgICAgICAgZGVmYXVsdDogW10sXG4gICAgICAgIH0sXG4gICAgICAgIHNob3dEZWxldGU6IHtcbiAgICAgICAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICAgICAgICBkZWZhdWx0OiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgICB1cGxvYWRpbmdJbWFnZToge1xuICAgICAgICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgICAgICAgZGVmYXVsdDogJ2h0dHBzOi8vaW1nLjU4Y2RuLmNvbS5jbi9sYmcvc2hhbmdqaWF4Y3hodC96aHVzaG91L2ltZy91cGltZ19sb2FkaW5nXzEuZ2lmJyxcbiAgICAgICAgfSxcbiAgICAgICAgdXBsb2FkSW1hZ2VBcGk6IHtcbiAgICAgICAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgICAgICAgIGRlZmF1bHQ6ICcvZmlsZVVwbG9hZCcsXG4gICAgICAgIH0sXG4gICAgICAgIHVwbG9hZFZpZGVvQXBpOiB7XG4gICAgICAgICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICAgICAgICBkZWZhdWx0OiAnL3dvc0ZpbGVVcGxvYWQnLFxuICAgICAgICB9LFxuICAgICAgICAvLyBub3JtYWwg5aSn5Zu+77yMb3JkZXIg6aKE57qm57uE5Lu25Lit6ZyA6KaB55qE5qC35byPXG4gICAgICAgIHNob3dUeXBlOiB7XG4gICAgICAgICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICAgICAgICBkZWZhdWx0OiAnbm9ybWFsJyxcbiAgICAgICAgfSxcbiAgICB9XG4gICAgY29tcHV0ZWQgPSB7XG4gICAgICAgIGN1cnJlbnRDb3VudCAoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5zaG93VHlwZSA9PT0gJ29yZGVyJykge1xuICAgICAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBjb3VudCA9IHRoaXMubWF4Q291bnQgLSB0aGlzLnZtLmxlbmd0aDtcbiAgICAgICAgICAgIHJldHVybiBjb3VudCA+IDAgPyBjb3VudCA6IDA7XG4gICAgICAgIH0sXG4gICAgfVxuICAgIHdhdGNoID0ge1xuICAgICAgICBkZWZhdWx0SW1hZ2VzKHYpIHtcbiAgICAgICAgICAgIHRoaXMudm0gPSB2O1xuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgICAgfSxcbiAgICB9XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgICAgYXN5bmMgYmluZFVwbG9hZEltYWdlICgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnVwbG9hZGluZykge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICBjb25zdCB7IHRlbXBGaWxlUGF0aHMgfSA9IGF3YWl0IHdlcHkuY2hvb3NlSW1hZ2UoeyBjb3VudDogdGhpcy5jdXJyZW50Q291bnQsIHNpemVUeXBlOiAnY29tcHJlc3NlZCcgfSk7XG5cbiAgICAgICAgICAgIGlmIChzZWxmLnNob3dUeXBlID09PSAnb3JkZXInICYmIHNlbGYudm0ubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgc2VsZi52bSA9IFtdO1xuICAgICAgICAgICAgICAgIHNlbGYuaW1hZ2VzID0gW107XG4gICAgICAgICAgICAgICAgc2VsZi4kYXBwbHkoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3Qgc3RhcnQgPSB0aGlzLmRhdGEudm0ubGVuZ3RoIHx8IDA7XG4gICAgICAgICAgICBjb25zdCBmaWxlU2l6ZSA9IHRlbXBGaWxlUGF0aHMubGVuZ3RoO1xuXG4gICAgICAgICAgICBsZXQgc2ZpbGVzZXQgPSBbLi4uc2VsZi52bV07XG4gICAgICAgICAgICBjb25zdCBzaW1hZ2VzID0gWy4uLnNlbGYuaW1hZ2VzXTtcbiAgICAgICAgICAgIHNmaWxlc2V0ID0gc2VsZi5iYXRjaEFkZEFycmF5KFxuICAgICAgICAgICAgICAgIHNmaWxlc2V0LFxuICAgICAgICAgICAgICAgIGZpbGVTaXplLFxuICAgICAgICAgICAgICAgIHNlbGYudXBsb2FkaW5nSW1hZ2UsXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgLy8g5LiK5Lyg5Lit5Zu+54mHXG4gICAgICAgICAgICBzZWxmLnVwbG9hZGluZyA9IHRydWU7XG4gICAgICAgICAgICBzZWxmLnZtID0gWy4uLnNmaWxlc2V0XTtcbiAgICAgICAgICAgIC8vIOinpuWPkeWbvueJh+abtOaUueS6i+S7tlxuICAgICAgICAgICAgc2VsZi4kZW1pdCgnY2hhbmdlaW1hZ2VzJywge1xuICAgICAgICAgICAgICAgIHVwbG9hZGluZzogc2VsZi51cGxvYWRpbmcsXG4gICAgICAgICAgICAgICAgaW1hZ2VzOiBzZWxmLmltYWdlcyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgc2VsZi52bSA9IFsuLi5zZmlsZXNldF07XG4gICAgICAgICAgICBzZWxmLiRhcHBseSgpO1xuICAgICAgICAgICAgdGVtcEZpbGVQYXRocy5tYXAoYXN5bmMgKGZpbGUsIGkpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBbZSwgZGF0YV0gPSBhd2FpdCBzZWxmLnVwbG9hZEltYWdlKGZpbGUpO1xuICAgICAgICAgICAgICAgIGlmIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IHRvYXN0U3luYyhlKTtcbiAgICAgICAgICAgICAgICAgICAgc2ZpbGVzZXQuc3BsaWNlKHN0YXJ0ICsgaSwgMSk7IC8vIOWksei0peWIoOmZpFxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNmaWxlc2V0LnNwbGljZShzdGFydCArIGksIDEsIGZpbGUpOyAvLyDmiJDlip/mm7/mjaJcbiAgICAgICAgICAgICAgICAgICAgc2ltYWdlcy5wdXNoKGRhdGEuY29udGVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIOavj+W8oOeFp+eJh+S4iuS8oOaIkOWKn+iwg+eUqFxuICAgICAgICAgICAgICAgIHNlbGYuaW1hZ2VzID0gWy4uLnNpbWFnZXNdO1xuICAgICAgICAgICAgICAgIHNlbGYudm0gPSBbLi4uc2ZpbGVzZXRdO1xuICAgICAgICAgICAgICAgIC8vIOaJgOacieWbvueJh+S4iuS8oOWujOaIkFxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGZpbGUsIGkpO1xuICAgICAgICAgICAgICAgIGlmIChmaWxlU2l6ZSAtIDEgPT09IGkpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi4kZW1pdCgnY2hhbmdlaW1hZ2VzJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgdXBsb2FkaW5nOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGltYWdlczogc2VsZi5pbWFnZXMsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnVwbG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzZWxmLiRhcHBseSgpO1xuICAgICAgICAgICAgICAgIHJldHVybiBmaWxlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIGFzeW5jIGJpbmRVcGxvYWRWaWRlbyAoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy51cGxvYWRpbmcpIHJldHVybjtcbiAgICAgICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgY29uc3Qgc3RhcnQgPSB0aGlzLmRhdGEudm0ubGVuZ3RoIHx8IDA7XG4gICAgICAgICAgICBsZXQgeyB0ZW1wRmlsZVBhdGggfSA9IGF3YWl0IHdlcHkuY2hvb3NlVmlkZW8oKTtcbiAgICAgICAgICAgIGNvbnN0IHRlbXBGaWxlUGF0aHMgPSBbdGVtcEZpbGVQYXRoXTtcbiAgICAgICAgICAgIHRlbXBGaWxlUGF0aCA9IG51bGw7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0ZW1wRmlsZVBhdGhzKTtcbiAgICAgICAgICAgIGNvbnN0IGZpbGVTaXplID0gdGVtcEZpbGVQYXRocy5sZW5ndGg7XG4gICAgICAgICAgICBsZXQgc2ZpbGVzZXQgPSBbLi4uc2VsZi52bV07XG4gICAgICAgICAgICBjb25zdCBzaW1hZ2VzID0gWy4uLnNlbGYuaW1hZ2VzXTtcbiAgICAgICAgICAgIHNmaWxlc2V0ID0gc2VsZi5iYXRjaEFkZEFycmF5KFxuICAgICAgICAgICAgICAgIHNmaWxlc2V0LFxuICAgICAgICAgICAgICAgIGZpbGVTaXplLFxuICAgICAgICAgICAgICAgIHNlbGYudXBsb2FkaW5nSW1hZ2UsXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgLy8g5LiK5Lyg5Lit5Zu+54mHXG4gICAgICAgICAgICBzZWxmLnVwbG9hZGluZyA9IHRydWU7XG4gICAgICAgICAgICBzZWxmLnZtID0gWy4uLnNmaWxlc2V0XTtcbiAgICAgICAgICAgIC8vIOinpuWPkeWbvueJh+abtOaUueS6i+S7tlxuICAgICAgICAgICAgc2VsZi4kZW1pdCgnY2hhbmdlaW1hZ2VzJywge1xuICAgICAgICAgICAgICAgIHVwbG9hZGluZzogc2VsZi51cGxvYWRpbmcsXG4gICAgICAgICAgICAgICAgaW1hZ2VzOiBzZWxmLmltYWdlcyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgc2VsZi52bSA9IFsuLi5zZmlsZXNldF07XG4gICAgICAgICAgICBzZWxmLiRhcHBseSgpO1xuICAgICAgICAgICAgdGVtcEZpbGVQYXRocy5tYXAoYXN5bmMgKGZpbGUsIGkpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBbZSwgZGF0YV0gPSBhd2FpdCBzZWxmLnVwbG9hZFZpZGVvKGZpbGUpO1xuICAgICAgICAgICAgICAgIGlmIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IHRvYXN0U3luYyhlKTtcbiAgICAgICAgICAgICAgICAgICAgc2ZpbGVzZXQuc3BsaWNlKHN0YXJ0ICsgaSwgMSk7IC8vIOWksei0peWIoOmZpFxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNmaWxlc2V0LnNwbGljZShzdGFydCArIGksIDEsIGZpbGUpOyAvLyDmiJDlip/mm7/mjaJcbiAgICAgICAgICAgICAgICAgICAgc2ltYWdlcy5wdXNoKGRhdGEuY29udGVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIOavj+W8oOeFp+eJh+S4iuS8oOaIkOWKn+iwg+eUqFxuICAgICAgICAgICAgICAgIHNlbGYuaW1hZ2VzID0gWy4uLnNpbWFnZXNdO1xuICAgICAgICAgICAgICAgIHNlbGYudm0gPSBbLi4uc2ZpbGVzZXRdO1xuICAgICAgICAgICAgICAgIC8vIOinpuWPkeWbvueJh+abtOaUueS6i+S7tlxuICAgICAgICAgICAgICAgIHNlbGYuJGVtaXQoJ2NoYW5nZWltYWdlcycsIHtcbiAgICAgICAgICAgICAgICAgICAgdXBsb2FkaW5nOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2VzOiBzZWxmLmltYWdlcyxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBzZWxmLiRhcHBseSgpO1xuICAgICAgICAgICAgICAgIC8vIOaJgOacieWbvueJh+S4iuS8oOWujOaIkFxuICAgICAgICAgICAgICAgIGlmIChmaWxlU2l6ZSAtIDEgPT09IGkpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi51cGxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi4kYXBwbHkoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZpbGU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgb25DYW5jZWxJbWFnZSAoaW5kZXgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmRhdGEudXBsb2FkaW5nKSByZXR1cm47XG4gICAgICAgICAgICBjb25zdCBzZmlsZXNldCA9IHRoaXMuZGF0YS52bTtcbiAgICAgICAgICAgIGNvbnN0IHNpbWFnZXMgPSB0aGlzLmRhdGEuaW1hZ2VzO1xuICAgICAgICAgICAgc2ZpbGVzZXQuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgIHNpbWFnZXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgIHRoaXMudm0gPSBbLi4uc2ZpbGVzZXRdO1xuICAgICAgICAgICAgdGhpcy5pbWFnZXMgPSBbLi4uc2ltYWdlc107XG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgICAgICAgLy8g6Kem5Y+R5Zu+54mH5pu05pS55LqL5Lu2XG4gICAgICAgICAgICB0aGlzLiRlbWl0KCdjaGFuZ2VJbWFnZXMnLCB7XG4gICAgICAgICAgICAgICAgaW1hZ2VzOiB0aGlzLmRhdGEuaW1hZ2VzLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIGJpbmRQbGF5VmlkZW8gKHVybCkge1xuICAgICAgICAgICAgaWYgKHVybCkge1xuICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICAgICAgICAgIHVybDogYC9wYWdlcy9WaWRlb1BsYXk/dXJsPSR7dXJsfWAsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGJpbmRQcmV2aWV3SW1hZ2UgKGN1cnJlbnQpIHtcbiAgICAgICAgICAgIHdlcHkucHJldmlld0ltYWdlKHtcbiAgICAgICAgICAgICAgICBjdXJyZW50LFxuICAgICAgICAgICAgICAgIHVybHM6IHRoaXMudm0sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICB9XG4gICAgdXBsb2FkSW1hZ2UgKGZpbGUpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICAgICAgd2VweS51cGxvYWRGaWxlKHtcbiAgICAgICAgICAgICAgICB1cmw6IGhvc3QgKyB0aGlzLnVwbG9hZEltYWdlQXBpLFxuICAgICAgICAgICAgICAgIGZpbGVQYXRoOiBmaWxlLFxuICAgICAgICAgICAgICAgIG5hbWU6ICdjb250ZW50JyxcbiAgICAgICAgICAgIH0pLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXMgPSBKU09OLnBhcnNlKHJlc3BvbnNlLmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB7IHN0YXRlLCBtc2csIGRhdGEgfSA9IHJlcztcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXRlID09PSAxMDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKFtudWxsLCBkYXRhXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoW21zZ10pO1xuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKFtlXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkuY2F0Y2goKGUpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgICAgICAgICAgICBjb25zdCB7IGVyck1zZyB9ID0gZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShbZXJyTXNnXSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHVwbG9hZFZpZGVvIChmaWxlKSB7XG4gICAgICAgIHJldHVybiBnZXROZXRTdGF0dXMoKS50aGVuKG5ldFN0YXR1cyA9PiB7XG4gICAgICAgICAgICAvLyDlj6rmnIl3aWZp546v5aKD5LiL5omN6IO95LiK5Lyg6KeG6aKRXG4gICAgICAgICAgICBpZiAobmV0U3RhdHVzICE9PSAxKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRvYXN0KCfor7fliIfmjaLliLB3aWZp546v5aKD5LiL5LiK5Lyg6KeG6aKRJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICAgICAgICAgIHdlcHkudXBsb2FkRmlsZSh7XG4gICAgICAgICAgICAgICAgICAgIHVybDogaG9zdCArIHRoaXMudXBsb2FkVmlkZW9BcGksXG4gICAgICAgICAgICAgICAgICAgIGZpbGVQYXRoOiBmaWxlLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiAnY29udGVudCcsXG4gICAgICAgICAgICAgICAgfSkudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlcyA9IEpTT04ucGFyc2UocmVzcG9uc2UuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB7IHN0YXRlLCBtc2csIGRhdGEgfSA9IHJlcztcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdGF0ZSA9PT0gMTAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShbbnVsbCwgZGF0YV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKFttc2ddKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XG4gICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShbZV0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goKGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgZXJyTXNnIH0gPSBlO1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKFtlcnJNc2ddKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgYmF0Y2hBZGRBcnJheSAoYXJyYXksIHNpemUsIHZhbHVlKSB7XG4gICAgICAgIGNvbnN0IHJldCA9IGFycmF5O1xuICAgICAgICBpZiAocmV0IGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2l6ZTsgaSArPSAxKSB7XG4gICAgICAgICAgICAgICAgcmV0LnB1c2godmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgfVxuICAgIG9uTG9hZCAoKSB7XG4gICAgICAgIHRoaXMudm0gPSBbXTtcbiAgICAgICAgdGhpcy5pbWFnZXMgPSBbXTtcbiAgICAgICAgdGhpcy51cGxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICB9XG59XG4iXX0=