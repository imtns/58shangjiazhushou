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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlVwbG9hZEZpbGUuanMiXSwibmFtZXMiOlsiaG9zdCIsIlVwbG9hZGVyIiwiZGF0YSIsInVwbG9hZGluZyIsInZtIiwiaW1hZ2VzIiwidGl0bGVTdGF0dXMiLCJwcm9wcyIsInVwbG9hZHR5cGUiLCJTdHJpbmciLCJtYXhTaXplIiwibWF4Q291bnQiLCJkZWZhdWx0SW1hZ2VzIiwidHlwZSIsIkFycmF5IiwiZGVmYXVsdCIsInNob3dEZWxldGUiLCJCb29sZWFuIiwidXBsb2FkaW5nSW1hZ2UiLCJ1cGxvYWRJbWFnZUFwaSIsInVwbG9hZFZpZGVvQXBpIiwic2hvd1R5cGUiLCJjb21wdXRlZCIsImN1cnJlbnRDb3VudCIsImNvdW50IiwibGVuZ3RoIiwid2F0Y2giLCJ2IiwiJGFwcGx5IiwibWV0aG9kcyIsImJpbmRVcGxvYWRJbWFnZSIsInNlbGYiLCJ3ZXB5IiwiY2hvb3NlSW1hZ2UiLCJzaXplVHlwZSIsInRlbXBGaWxlUGF0aHMiLCJzdGFydCIsImZpbGVTaXplIiwic2ZpbGVzZXQiLCJzaW1hZ2VzIiwiYmF0Y2hBZGRBcnJheSIsIiRlbWl0IiwibWFwIiwiZmlsZSIsImkiLCJ1cGxvYWRJbWFnZSIsImUiLCJzcGxpY2UiLCJwdXNoIiwiY29udGVudCIsImNvbnNvbGUiLCJsb2ciLCJiaW5kVXBsb2FkVmlkZW8iLCJjaG9vc2VWaWRlbyIsInRlbXBGaWxlUGF0aCIsInVwbG9hZFZpZGVvIiwib25DYW5jZWxJbWFnZSIsImluZGV4IiwiYmluZFBsYXlWaWRlbyIsInVybCIsIm5hdmlnYXRlVG8iLCJiaW5kUHJldmlld0ltYWdlIiwiY3VycmVudCIsInByZXZpZXdJbWFnZSIsInVybHMiLCJQcm9taXNlIiwidXBsb2FkRmlsZSIsImZpbGVQYXRoIiwibmFtZSIsInRoZW4iLCJyZXNwb25zZSIsInJlcyIsIkpTT04iLCJwYXJzZSIsInN0YXRlIiwibXNnIiwicmVzb2x2ZSIsImNhdGNoIiwiZXJyTXNnIiwibmV0U3RhdHVzIiwiYXJyYXkiLCJzaXplIiwi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Ozs7O0VBN1FpQ0ksZUFBS29ELFM7O2tCQUF0Qm5GLFEiLCJmaWxlIjoiVXBsb2FkRmlsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcclxuaW1wb3J0IHsgdG9hc3RTeW5jLCBnZXROZXRTdGF0dXMsIHRvYXN0IH0gZnJvbSAnLi4vdXRpbHMnO1xyXG5cclxuY29uc3QgaG9zdCA9ICdodHRwczovL3lhb2ZhLjU4LmNvbSc7XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVwbG9hZGVyIGV4dGVuZHMgd2VweS5jb21wb25lbnQge1xyXG4gICAgZGF0YSA9IHtcclxuICAgICAgICB1cGxvYWRpbmc6IGZhbHNlLFxyXG4gICAgICAgIHZtOiBbXSxcclxuICAgICAgICBpbWFnZXM6IFtdLFxyXG4gICAgICAgIHRpdGxlU3RhdHVzOiBbJ+WbvueJhycsICfop4bpopEnXSxcclxuICAgIH1cclxuICAgIHByb3BzID0ge1xyXG4gICAgICAgIHVwbG9hZHR5cGU6IFN0cmluZyxcclxuICAgICAgICBtYXhTaXplOiBTdHJpbmcsXHJcbiAgICAgICAgbWF4Q291bnQ6IFN0cmluZyxcclxuICAgICAgICBkZWZhdWx0SW1hZ2VzOiB7IC8vIOm7mOiupOWbvueJh1xyXG4gICAgICAgICAgICB0eXBlOiBBcnJheSxcclxuICAgICAgICAgICAgZGVmYXVsdDogW10sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzaG93RGVsZXRlOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IEJvb2xlYW4sXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IHRydWUsXHJcbiAgICAgICAgfSxcclxuICAgICAgICB1cGxvYWRpbmdJbWFnZToge1xyXG4gICAgICAgICAgICB0eXBlOiBTdHJpbmcsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6ICdodHRwczovL2ltZy41OGNkbi5jb20uY24vbGJnL3NoYW5namlheGN4aHQvemh1c2hvdS9pbWcvdXBpbWdfbG9hZGluZ18xLmdpZicsXHJcbiAgICAgICAgfSxcclxuICAgICAgICB1cGxvYWRJbWFnZUFwaToge1xyXG4gICAgICAgICAgICB0eXBlOiBTdHJpbmcsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6ICcvZmlsZVVwbG9hZCcsXHJcbiAgICAgICAgfSxcclxuICAgICAgICB1cGxvYWRWaWRlb0FwaToge1xyXG4gICAgICAgICAgICB0eXBlOiBTdHJpbmcsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6ICcvd29zRmlsZVVwbG9hZCcsXHJcbiAgICAgICAgfSxcclxuICAgICAgICAvLyBub3JtYWwg5aSn5Zu+77yMb3JkZXIg6aKE57qm57uE5Lu25Lit6ZyA6KaB55qE5qC35byPXHJcbiAgICAgICAgc2hvd1R5cGU6IHtcclxuICAgICAgICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiAnbm9ybWFsJyxcclxuICAgICAgICB9LFxyXG4gICAgfVxyXG4gICAgY29tcHV0ZWQgPSB7XHJcbiAgICAgICAgY3VycmVudENvdW50ICgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2hvd1R5cGUgPT09ICdvcmRlcicpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAxO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCBjb3VudCA9IHRoaXMubWF4Q291bnQgLSB0aGlzLnZtLmxlbmd0aDtcclxuICAgICAgICAgICAgcmV0dXJuIGNvdW50ID4gMCA/IGNvdW50IDogMDtcclxuICAgICAgICB9LFxyXG4gICAgfVxyXG4gICAgd2F0Y2ggPSB7XHJcbiAgICAgICAgZGVmYXVsdEltYWdlcyh2KSB7XHJcbiAgICAgICAgICAgIHRoaXMudm0gPSB2O1xyXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgIH0sXHJcbiAgICB9XHJcbiAgICBtZXRob2RzID0ge1xyXG4gICAgICAgIGFzeW5jIGJpbmRVcGxvYWRJbWFnZSAoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnVwbG9hZGluZykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcclxuICAgICAgICAgICAgY29uc3QgeyB0ZW1wRmlsZVBhdGhzIH0gPSBhd2FpdCB3ZXB5LmNob29zZUltYWdlKHsgY291bnQ6IHRoaXMuY3VycmVudENvdW50LCBzaXplVHlwZTogJ2NvbXByZXNzZWQnIH0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKHNlbGYuc2hvd1R5cGUgPT09ICdvcmRlcicgJiYgc2VsZi52bS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYudm0gPSBbXTtcclxuICAgICAgICAgICAgICAgIHNlbGYuaW1hZ2VzID0gW107XHJcbiAgICAgICAgICAgICAgICBzZWxmLiRhcHBseSgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCBzdGFydCA9IHRoaXMuZGF0YS52bS5sZW5ndGggfHwgMDtcclxuICAgICAgICAgICAgY29uc3QgZmlsZVNpemUgPSB0ZW1wRmlsZVBhdGhzLmxlbmd0aDtcclxuXHJcbiAgICAgICAgICAgIGxldCBzZmlsZXNldCA9IFsuLi5zZWxmLnZtXTtcclxuICAgICAgICAgICAgY29uc3Qgc2ltYWdlcyA9IFsuLi5zZWxmLmltYWdlc107XHJcbiAgICAgICAgICAgIHNmaWxlc2V0ID0gc2VsZi5iYXRjaEFkZEFycmF5KFxyXG4gICAgICAgICAgICAgICAgc2ZpbGVzZXQsXHJcbiAgICAgICAgICAgICAgICBmaWxlU2l6ZSxcclxuICAgICAgICAgICAgICAgIHNlbGYudXBsb2FkaW5nSW1hZ2UsXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIC8vIOS4iuS8oOS4reWbvueJh1xyXG4gICAgICAgICAgICBzZWxmLnVwbG9hZGluZyA9IHRydWU7XHJcbiAgICAgICAgICAgIHNlbGYudm0gPSBbLi4uc2ZpbGVzZXRdO1xyXG4gICAgICAgICAgICAvLyDop6blj5Hlm77niYfmm7TmlLnkuovku7ZcclxuICAgICAgICAgICAgc2VsZi4kZW1pdCgnY2hhbmdlaW1hZ2VzJywge1xyXG4gICAgICAgICAgICAgICAgdXBsb2FkaW5nOiBzZWxmLnVwbG9hZGluZyxcclxuICAgICAgICAgICAgICAgIGltYWdlczogc2VsZi5pbWFnZXMsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBzZWxmLnZtID0gWy4uLnNmaWxlc2V0XTtcclxuICAgICAgICAgICAgc2VsZi4kYXBwbHkoKTtcclxuICAgICAgICAgICAgdGVtcEZpbGVQYXRocy5tYXAoYXN5bmMgKGZpbGUsIGkpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IFtlLCBkYXRhXSA9IGF3YWl0IHNlbGYudXBsb2FkSW1hZ2UoZmlsZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IHRvYXN0U3luYyhlKTtcclxuICAgICAgICAgICAgICAgICAgICBzZmlsZXNldC5zcGxpY2Uoc3RhcnQgKyBpLCAxKTsgLy8g5aSx6LSl5Yig6ZmkXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHNmaWxlc2V0LnNwbGljZShzdGFydCArIGksIDEsIGZpbGUpOyAvLyDmiJDlip/mm7/mjaJcclxuICAgICAgICAgICAgICAgICAgICBzaW1hZ2VzLnB1c2goZGF0YS5jb250ZW50KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIOavj+W8oOeFp+eJh+S4iuS8oOaIkOWKn+iwg+eUqFxyXG4gICAgICAgICAgICAgICAgc2VsZi5pbWFnZXMgPSBbLi4uc2ltYWdlc107XHJcbiAgICAgICAgICAgICAgICBzZWxmLnZtID0gWy4uLnNmaWxlc2V0XTtcclxuICAgICAgICAgICAgICAgIC8vIOaJgOacieWbvueJh+S4iuS8oOWujOaIkFxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZmlsZSwgaSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZmlsZVNpemUgLSAxID09PSBpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi4kZW1pdCgnY2hhbmdlaW1hZ2VzJywge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cGxvYWRpbmc6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbWFnZXM6IHNlbGYuaW1hZ2VzLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYudXBsb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBzZWxmLiRhcHBseSgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZpbGU7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYXN5bmMgYmluZFVwbG9hZFZpZGVvICgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMudXBsb2FkaW5nKSByZXR1cm47XHJcbiAgICAgICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgICAgICBjb25zdCBzdGFydCA9IHRoaXMuZGF0YS52bS5sZW5ndGggfHwgMDtcclxuICAgICAgICAgICAgbGV0IHsgdGVtcEZpbGVQYXRoIH0gPSBhd2FpdCB3ZXB5LmNob29zZVZpZGVvKCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHRlbXBGaWxlUGF0aHMgPSBbdGVtcEZpbGVQYXRoXTtcclxuICAgICAgICAgICAgdGVtcEZpbGVQYXRoID0gbnVsbDtcclxuICAgICAgICAgICAgY29uc29sZS5sb2codGVtcEZpbGVQYXRocyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGZpbGVTaXplID0gdGVtcEZpbGVQYXRocy5sZW5ndGg7XHJcbiAgICAgICAgICAgIGxldCBzZmlsZXNldCA9IFsuLi5zZWxmLnZtXTtcclxuICAgICAgICAgICAgY29uc3Qgc2ltYWdlcyA9IFsuLi5zZWxmLmltYWdlc107XHJcbiAgICAgICAgICAgIHNmaWxlc2V0ID0gc2VsZi5iYXRjaEFkZEFycmF5KFxyXG4gICAgICAgICAgICAgICAgc2ZpbGVzZXQsXHJcbiAgICAgICAgICAgICAgICBmaWxlU2l6ZSxcclxuICAgICAgICAgICAgICAgIHNlbGYudXBsb2FkaW5nSW1hZ2UsXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIC8vIOS4iuS8oOS4reWbvueJh1xyXG4gICAgICAgICAgICBzZWxmLnVwbG9hZGluZyA9IHRydWU7XHJcbiAgICAgICAgICAgIHNlbGYudm0gPSBbLi4uc2ZpbGVzZXRdO1xyXG4gICAgICAgICAgICAvLyDop6blj5Hlm77niYfmm7TmlLnkuovku7ZcclxuICAgICAgICAgICAgc2VsZi4kZW1pdCgnY2hhbmdlaW1hZ2VzJywge1xyXG4gICAgICAgICAgICAgICAgdXBsb2FkaW5nOiBzZWxmLnVwbG9hZGluZyxcclxuICAgICAgICAgICAgICAgIGltYWdlczogc2VsZi5pbWFnZXMsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBzZWxmLnZtID0gWy4uLnNmaWxlc2V0XTtcclxuICAgICAgICAgICAgc2VsZi4kYXBwbHkoKTtcclxuICAgICAgICAgICAgdGVtcEZpbGVQYXRocy5tYXAoYXN5bmMgKGZpbGUsIGkpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IFtlLCBkYXRhXSA9IGF3YWl0IHNlbGYudXBsb2FkVmlkZW8oZmlsZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IHRvYXN0U3luYyhlKTtcclxuICAgICAgICAgICAgICAgICAgICBzZmlsZXNldC5zcGxpY2Uoc3RhcnQgKyBpLCAxKTsgLy8g5aSx6LSl5Yig6ZmkXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHNmaWxlc2V0LnNwbGljZShzdGFydCArIGksIDEsIGZpbGUpOyAvLyDmiJDlip/mm7/mjaJcclxuICAgICAgICAgICAgICAgICAgICBzaW1hZ2VzLnB1c2goZGF0YS5jb250ZW50KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIOavj+W8oOeFp+eJh+S4iuS8oOaIkOWKn+iwg+eUqFxyXG4gICAgICAgICAgICAgICAgc2VsZi5pbWFnZXMgPSBbLi4uc2ltYWdlc107XHJcbiAgICAgICAgICAgICAgICBzZWxmLnZtID0gWy4uLnNmaWxlc2V0XTtcclxuICAgICAgICAgICAgICAgIC8vIOinpuWPkeWbvueJh+abtOaUueS6i+S7tlxyXG4gICAgICAgICAgICAgICAgc2VsZi4kZW1pdCgnY2hhbmdlaW1hZ2VzJywge1xyXG4gICAgICAgICAgICAgICAgICAgIHVwbG9hZGluZzogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2VzOiBzZWxmLmltYWdlcyxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgc2VsZi4kYXBwbHkoKTtcclxuICAgICAgICAgICAgICAgIC8vIOaJgOacieWbvueJh+S4iuS8oOWujOaIkFxyXG4gICAgICAgICAgICAgICAgaWYgKGZpbGVTaXplIC0gMSA9PT0gaSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYudXBsb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi4kYXBwbHkoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBmaWxlO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIG9uQ2FuY2VsSW1hZ2UgKGluZGV4KSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmRhdGEudXBsb2FkaW5nKSByZXR1cm47XHJcbiAgICAgICAgICAgIGNvbnN0IHNmaWxlc2V0ID0gdGhpcy5kYXRhLnZtO1xyXG4gICAgICAgICAgICBjb25zdCBzaW1hZ2VzID0gdGhpcy5kYXRhLmltYWdlcztcclxuICAgICAgICAgICAgc2ZpbGVzZXQuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgICAgc2ltYWdlcy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICB0aGlzLnZtID0gWy4uLnNmaWxlc2V0XTtcclxuICAgICAgICAgICAgdGhpcy5pbWFnZXMgPSBbLi4uc2ltYWdlc107XHJcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIC8vIOinpuWPkeWbvueJh+abtOaUueS6i+S7tlxyXG4gICAgICAgICAgICB0aGlzLiRlbWl0KCdjaGFuZ2VJbWFnZXMnLCB7XHJcbiAgICAgICAgICAgICAgICBpbWFnZXM6IHRoaXMuZGF0YS5pbWFnZXMsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYmluZFBsYXlWaWRlbyAodXJsKSB7XHJcbiAgICAgICAgICAgIGlmICh1cmwpIHtcclxuICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBgL3BhZ2VzL1ZpZGVvUGxheT91cmw9JHt1cmx9YCxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBiaW5kUHJldmlld0ltYWdlIChjdXJyZW50KSB7XHJcbiAgICAgICAgICAgIHdlcHkucHJldmlld0ltYWdlKHtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnQsXHJcbiAgICAgICAgICAgICAgICB1cmxzOiB0aGlzLnZtLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgfVxyXG4gICAgdXBsb2FkSW1hZ2UgKGZpbGUpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XHJcbiAgICAgICAgICAgIHdlcHkudXBsb2FkRmlsZSh7XHJcbiAgICAgICAgICAgICAgICB1cmw6IGhvc3QgKyB0aGlzLnVwbG9hZEltYWdlQXBpLFxyXG4gICAgICAgICAgICAgICAgZmlsZVBhdGg6IGZpbGUsXHJcbiAgICAgICAgICAgICAgICBuYW1lOiAnY29udGVudCcsXHJcbiAgICAgICAgICAgIH0pLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXMgPSBKU09OLnBhcnNlKHJlc3BvbnNlLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgc3RhdGUsIG1zZywgZGF0YSB9ID0gcmVzO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdGF0ZSA9PT0gMTAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKFtudWxsLCBkYXRhXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoW21zZ10pO1xyXG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKFtlXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pLmNhdGNoKChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHsgZXJyTXNnIH0gPSBlO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoW2Vyck1zZ10pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHVwbG9hZFZpZGVvIChmaWxlKSB7XHJcbiAgICAgICAgcmV0dXJuIGdldE5ldFN0YXR1cygpLnRoZW4obmV0U3RhdHVzID0+IHtcclxuICAgICAgICAgICAgLy8g5Y+q5pyJd2lmaeeOr+Wig+S4i+aJjeiDveS4iuS8oOinhumikVxyXG4gICAgICAgICAgICBpZiAobmV0U3RhdHVzICE9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdG9hc3QoJ+ivt+WIh+aNouWIsHdpZmnnjq/looPkuIvkuIrkvKDop4bpopEnKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB3ZXB5LnVwbG9hZEZpbGUoe1xyXG4gICAgICAgICAgICAgICAgICAgIHVybDogaG9zdCArIHRoaXMudXBsb2FkVmlkZW9BcGksXHJcbiAgICAgICAgICAgICAgICAgICAgZmlsZVBhdGg6IGZpbGUsXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ2NvbnRlbnQnLFxyXG4gICAgICAgICAgICAgICAgfSkudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlcyA9IEpTT04ucGFyc2UocmVzcG9uc2UuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgc3RhdGUsIG1zZywgZGF0YSB9ID0gcmVzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3RhdGUgPT09IDEwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShbbnVsbCwgZGF0YV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShbbXNnXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKFtlXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goKGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB7IGVyck1zZyB9ID0gZTtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKFtlcnJNc2ddKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGJhdGNoQWRkQXJyYXkgKGFycmF5LCBzaXplLCB2YWx1ZSkge1xyXG4gICAgICAgIGNvbnN0IHJldCA9IGFycmF5O1xyXG4gICAgICAgIGlmIChyZXQgaW5zdGFuY2VvZiBBcnJheSkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNpemU7IGkgKz0gMSkge1xyXG4gICAgICAgICAgICAgICAgcmV0LnB1c2godmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXQ7XHJcbiAgICB9XHJcbiAgICBvbkxvYWQgKCkge1xyXG4gICAgICAgIHRoaXMudm0gPSBbXTtcclxuICAgICAgICB0aGlzLmltYWdlcyA9IFtdO1xyXG4gICAgICAgIHRoaXMudXBsb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgIH1cclxufVxyXG4iXX0=