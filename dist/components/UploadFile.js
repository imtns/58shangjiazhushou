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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlVwbG9hZEZpbGUuanMiXSwibmFtZXMiOlsiaG9zdCIsIlVwbG9hZGVyIiwiZGF0YSIsInVwbG9hZGluZyIsInZtIiwiaW1hZ2VzIiwidGl0bGVTdGF0dXMiLCJwcm9wcyIsInVwbG9hZHR5cGUiLCJTdHJpbmciLCJtYXhTaXplIiwibWF4Q291bnQiLCJzaG93RGVsZXRlIiwidHlwZSIsIkJvb2xlYW4iLCJkZWZhdWx0IiwidXBsb2FkaW5nSW1hZ2UiLCJ1cGxvYWRJbWFnZUFwaSIsInVwbG9hZFZpZGVvQXBpIiwiY29tcHV0ZWQiLCJjdXJyZW50Q291bnQiLCJjb3VudCIsImxlbmd0aCIsIm1ldGhvZHMiLCJiaW5kVXBsb2FkSW1hZ2UiLCJzZWxmIiwic3RhcnQiLCJ3ZXB5IiwiY2hvb3NlSW1hZ2UiLCJzaXplVHlwZSIsInRlbXBGaWxlUGF0aHMiLCJmaWxlU2l6ZSIsInNmaWxlc2V0Iiwic2ltYWdlcyIsImJhdGNoQWRkQXJyYXkiLCIkZW1pdCIsIiRhcHBseSIsIm1hcCIsImZpbGUiLCJpIiwidXBsb2FkSW1hZ2UiLCJlIiwic3BsaWNlIiwicHVzaCIsImNvbnRlbnQiLCJiaW5kVXBsb2FkVmlkZW8iLCJjaG9vc2VWaWRlbyIsInRlbXBGaWxlUGF0aCIsImNvbnNvbGUiLCJsb2ciLCJ1cGxvYWRWaWRlbyIsIm9uQ2FuY2VsSW1hZ2UiLCJpbmRleCIsImJpbmRQbGF5VmlkZW8iLCJ1cmwiLCJuYXZpZ2F0ZVRvIiwiYmluZFByZXZpZXdJbWFnZSIsImN1cnJlbnQiLCJwcmV2aWV3SW1hZ2UiLCJ1cmxzIiwiUHJvbWlzZSIsInJlc29sdmUiLCJ1cGxvYWRGaWxlIiwiZmlsZVBhdGgiLCJuYW1lIiwidGhlbiIsInJlc3BvbnNlIiwicmVzIiwiSlNPTiIsInBhcnNlIiwic3RhdGUiLCJtc2ciLCJjYXRjaCIsImVyck1zZyIsImFycmF5Iiwic2l6ZSIsInZhbHVlIiwicmV0IiwiQXJyYXkiLCJjb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFD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QixFQUFrQztBQUM5QnNDLHdCQUFJbEMsSUFBSixDQUFTaUMsS0FBVDtBQUNIO0FBQ0o7QUFDRCxtQkFBT0MsR0FBUDtBQUNIOzs7aUNBQ1M7QUFDTixpQkFBS3pFLEVBQUwsR0FBVSxFQUFWO0FBQ0EsaUJBQUtDLE1BQUwsR0FBYyxFQUFkO0FBQ0EsaUJBQUtGLFNBQUwsR0FBaUIsS0FBakI7QUFDQSxpQkFBS2lDLE1BQUw7QUFDSDs7OztFQXZPaUNULGVBQUtvRCxTOztrQkFBdEI5RSxRIiwiZmlsZSI6IlVwbG9hZEZpbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XHJcbmltcG9ydCB7IHRvYXN0U3luYyB9IGZyb20gJy4uL3V0aWxzJztcclxuXHJcbmNvbnN0IGhvc3QgPSAnaHR0cHM6Ly95YW9mYS41OC5jb20nO1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVcGxvYWRlciBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcclxuICAgIGRhdGEgPSB7XHJcbiAgICAgICAgdXBsb2FkaW5nOiBmYWxzZSxcclxuICAgICAgICB2bTogW10sXHJcbiAgICAgICAgaW1hZ2VzOiBbXSxcclxuICAgICAgICB0aXRsZVN0YXR1czogWyflm77niYcnLCAn6KeG6aKRJ10sXHJcbiAgICB9XHJcbiAgICBwcm9wcyA9IHtcclxuICAgICAgICB1cGxvYWR0eXBlOiBTdHJpbmcsXHJcbiAgICAgICAgbWF4U2l6ZTogU3RyaW5nLFxyXG4gICAgICAgIG1heENvdW50OiBTdHJpbmcsXHJcbiAgICAgICAgc2hvd0RlbGV0ZToge1xyXG4gICAgICAgICAgICB0eXBlOiBCb29sZWFuLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiB0cnVlLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdXBsb2FkaW5nSW1hZ2U6IHtcclxuICAgICAgICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiAnaHR0cHM6Ly9pbWcuNThjZG4uY29tLmNuL2xiZy9zaGFuZ2ppYXhjeGh0L3podXNob3UvaW1nL3VwaW1nX2xvYWRpbmdfMS5naWYnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdXBsb2FkSW1hZ2VBcGk6IHtcclxuICAgICAgICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiAnL2ZpbGVVcGxvYWQnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdXBsb2FkVmlkZW9BcGk6IHtcclxuICAgICAgICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiAnL3dvc0ZpbGVVcGxvYWQnLFxyXG4gICAgICAgIH0sXHJcbiAgICB9XHJcbiAgICBjb21wdXRlZCA9IHtcclxuICAgICAgICBjdXJyZW50Q291bnQgKCkge1xyXG4gICAgICAgICAgICBjb25zdCBjb3VudCA9IHRoaXMubWF4Q291bnQgLSB0aGlzLnZtLmxlbmd0aDtcclxuICAgICAgICAgICAgcmV0dXJuIGNvdW50ID4gMCA/IGNvdW50IDogMDtcclxuICAgICAgICB9LFxyXG4gICAgfVxyXG4gICAgbWV0aG9kcyA9IHtcclxuICAgICAgICBhc3luYyBiaW5kVXBsb2FkSW1hZ2UgKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy51cGxvYWRpbmcpIHJldHVybjtcclxuICAgICAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgICAgIGNvbnN0IHN0YXJ0ID0gdGhpcy5kYXRhLnZtLmxlbmd0aCB8fCAwO1xyXG4gICAgICAgICAgICBjb25zdCB7IHRlbXBGaWxlUGF0aHMgfSA9IGF3YWl0IHdlcHkuY2hvb3NlSW1hZ2UoeyBjb3VudDogdGhpcy5jdXJyZW50Q291bnQsIHNpemVUeXBlOiAnY29tcHJlc3NlZCcgfSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGZpbGVTaXplID0gdGVtcEZpbGVQYXRocy5sZW5ndGg7XHJcbiAgICAgICAgICAgIGxldCBzZmlsZXNldCA9IFsuLi5zZWxmLnZtXTtcclxuICAgICAgICAgICAgY29uc3Qgc2ltYWdlcyA9IFsuLi5zZWxmLmltYWdlc107XHJcbiAgICAgICAgICAgIHNmaWxlc2V0ID0gc2VsZi5iYXRjaEFkZEFycmF5KFxyXG4gICAgICAgICAgICAgICAgc2ZpbGVzZXQsXHJcbiAgICAgICAgICAgICAgICBmaWxlU2l6ZSxcclxuICAgICAgICAgICAgICAgIHNlbGYudXBsb2FkaW5nSW1hZ2UsXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIC8vIOS4iuS8oOS4reWbvueJh1xyXG4gICAgICAgICAgICBzZWxmLnVwbG9hZGluZyA9IHRydWU7XHJcbiAgICAgICAgICAgIHNlbGYudm0gPSBbLi4uc2ZpbGVzZXRdO1xyXG4gICAgICAgICAgICAvLyDop6blj5Hlm77niYfmm7TmlLnkuovku7ZcclxuICAgICAgICAgICAgc2VsZi4kZW1pdCgnY2hhbmdlaW1hZ2VzJywge1xyXG4gICAgICAgICAgICAgICAgdXBsb2FkaW5nOiBzZWxmLnVwbG9hZGluZyxcclxuICAgICAgICAgICAgICAgIGltYWdlczogc2VsZi5pbWFnZXMsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBzZWxmLnZtID0gWy4uLnNmaWxlc2V0XTtcclxuICAgICAgICAgICAgc2VsZi4kYXBwbHkoKTtcclxuICAgICAgICAgICAgdGVtcEZpbGVQYXRocy5tYXAoYXN5bmMgKGZpbGUsIGkpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IFtlLCBkYXRhXSA9IGF3YWl0IHNlbGYudXBsb2FkSW1hZ2UoZmlsZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IHRvYXN0U3luYyhlKTtcclxuICAgICAgICAgICAgICAgICAgICBzZmlsZXNldC5zcGxpY2Uoc3RhcnQgKyBpLCAxKTsgLy8g5aSx6LSl5Yig6ZmkXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHNmaWxlc2V0LnNwbGljZShzdGFydCArIGksIDEsIGZpbGUpOyAvLyDmiJDlip/mm7/mjaJcclxuICAgICAgICAgICAgICAgICAgICBzaW1hZ2VzLnB1c2goZGF0YS5jb250ZW50KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIOavj+W8oOeFp+eJh+S4iuS8oOaIkOWKn+iwg+eUqFxyXG4gICAgICAgICAgICAgICAgc2VsZi5pbWFnZXMgPSBbLi4uc2ltYWdlc107XHJcbiAgICAgICAgICAgICAgICBzZWxmLnZtID0gWy4uLnNmaWxlc2V0XTtcclxuICAgICAgICAgICAgICAgIC8vIOaJgOacieWbvueJh+S4iuS8oOWujOaIkFxyXG4gICAgICAgICAgICAgICAgaWYgKGZpbGVTaXplIC0gMSA9PT0gaSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuJGVtaXQoJ2NoYW5nZWltYWdlcycsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXBsb2FkaW5nOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW1hZ2VzOiBzZWxmLmltYWdlcyxcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHNlbGYuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmlsZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBhc3luYyBiaW5kVXBsb2FkVmlkZW8gKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy51cGxvYWRpbmcpIHJldHVybjtcclxuICAgICAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgICAgIGNvbnN0IHN0YXJ0ID0gdGhpcy5kYXRhLnZtLmxlbmd0aCB8fCAwO1xyXG4gICAgICAgICAgICBsZXQgeyB0ZW1wRmlsZVBhdGggfSA9IGF3YWl0IHdlcHkuY2hvb3NlVmlkZW8oKTtcclxuICAgICAgICAgICAgY29uc3QgdGVtcEZpbGVQYXRocyA9IFt0ZW1wRmlsZVBhdGhdO1xyXG4gICAgICAgICAgICB0ZW1wRmlsZVBhdGggPSBudWxsO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0ZW1wRmlsZVBhdGhzKTtcclxuICAgICAgICAgICAgY29uc3QgZmlsZVNpemUgPSB0ZW1wRmlsZVBhdGhzLmxlbmd0aDtcclxuICAgICAgICAgICAgbGV0IHNmaWxlc2V0ID0gWy4uLnNlbGYudm1dO1xyXG4gICAgICAgICAgICBjb25zdCBzaW1hZ2VzID0gWy4uLnNlbGYuaW1hZ2VzXTtcclxuICAgICAgICAgICAgc2ZpbGVzZXQgPSBzZWxmLmJhdGNoQWRkQXJyYXkoXHJcbiAgICAgICAgICAgICAgICBzZmlsZXNldCxcclxuICAgICAgICAgICAgICAgIGZpbGVTaXplLFxyXG4gICAgICAgICAgICAgICAgc2VsZi51cGxvYWRpbmdJbWFnZSxcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgLy8g5LiK5Lyg5Lit5Zu+54mHXHJcbiAgICAgICAgICAgIHNlbGYudXBsb2FkaW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgc2VsZi52bSA9IFsuLi5zZmlsZXNldF07XHJcbiAgICAgICAgICAgIC8vIOinpuWPkeWbvueJh+abtOaUueS6i+S7tlxyXG4gICAgICAgICAgICBzZWxmLiRlbWl0KCdjaGFuZ2VpbWFnZXMnLCB7XHJcbiAgICAgICAgICAgICAgICB1cGxvYWRpbmc6IHNlbGYudXBsb2FkaW5nLFxyXG4gICAgICAgICAgICAgICAgaW1hZ2VzOiBzZWxmLmltYWdlcyxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHNlbGYudm0gPSBbLi4uc2ZpbGVzZXRdO1xyXG4gICAgICAgICAgICBzZWxmLiRhcHBseSgpO1xyXG4gICAgICAgICAgICB0ZW1wRmlsZVBhdGhzLm1hcChhc3luYyAoZmlsZSwgaSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgW2UsIGRhdGFdID0gYXdhaXQgc2VsZi51cGxvYWRWaWRlbyhmaWxlKTtcclxuICAgICAgICAgICAgICAgIGlmIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgdG9hc3RTeW5jKGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNmaWxlc2V0LnNwbGljZShzdGFydCArIGksIDEpOyAvLyDlpLHotKXliKDpmaRcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2ZpbGVzZXQuc3BsaWNlKHN0YXJ0ICsgaSwgMSwgZmlsZSk7IC8vIOaIkOWKn+abv+aNolxyXG4gICAgICAgICAgICAgICAgICAgIHNpbWFnZXMucHVzaChkYXRhLmNvbnRlbnQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8g5q+P5byg54Wn54mH5LiK5Lyg5oiQ5Yqf6LCD55SoXHJcbiAgICAgICAgICAgICAgICBzZWxmLmltYWdlcyA9IFsuLi5zaW1hZ2VzXTtcclxuICAgICAgICAgICAgICAgIHNlbGYudm0gPSBbLi4uc2ZpbGVzZXRdO1xyXG4gICAgICAgICAgICAgICAgLy8g6Kem5Y+R5Zu+54mH5pu05pS55LqL5Lu2XHJcbiAgICAgICAgICAgICAgICBzZWxmLiRlbWl0KCdjaGFuZ2VpbWFnZXMnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXBsb2FkaW5nOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBpbWFnZXM6IHNlbGYuaW1hZ2VzLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLiRhcHBseSgpO1xyXG4gICAgICAgICAgICAgICAgLy8g5omA5pyJ5Zu+54mH5LiK5Lyg5a6M5oiQXHJcbiAgICAgICAgICAgICAgICBpZiAoZmlsZVNpemUgLSAxID09PSBpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi51cGxvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLiRhcHBseSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZpbGU7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb25DYW5jZWxJbWFnZSAoaW5kZXgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZGF0YS51cGxvYWRpbmcpIHJldHVybjtcclxuICAgICAgICAgICAgY29uc3Qgc2ZpbGVzZXQgPSB0aGlzLmRhdGEudm07XHJcbiAgICAgICAgICAgIGNvbnN0IHNpbWFnZXMgPSB0aGlzLmRhdGEuaW1hZ2VzO1xyXG4gICAgICAgICAgICBzZmlsZXNldC5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICBzaW1hZ2VzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICAgIHRoaXMudm0gPSBbLi4uc2ZpbGVzZXRdO1xyXG4gICAgICAgICAgICB0aGlzLmltYWdlcyA9IFsuLi5zaW1hZ2VzXTtcclxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICAgICAgLy8g6Kem5Y+R5Zu+54mH5pu05pS55LqL5Lu2XHJcbiAgICAgICAgICAgIHRoaXMuJGVtaXQoJ2NoYW5nZUltYWdlcycsIHtcclxuICAgICAgICAgICAgICAgIGltYWdlczogdGhpcy5kYXRhLmltYWdlcyxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBiaW5kUGxheVZpZGVvICh1cmwpIHtcclxuICAgICAgICAgICAgaWYgKHVybCkge1xyXG4gICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgICAgICAgICB1cmw6IGAvcGFnZXMvVmlkZW9QbGF5P3VybD0ke3VybH1gLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGJpbmRQcmV2aWV3SW1hZ2UgKGN1cnJlbnQpIHtcclxuICAgICAgICAgICAgd2VweS5wcmV2aWV3SW1hZ2Uoe1xyXG4gICAgICAgICAgICAgICAgY3VycmVudCxcclxuICAgICAgICAgICAgICAgIHVybHM6IHRoaXMudm0sXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICB9XHJcbiAgICB1cGxvYWRJbWFnZSAoZmlsZSkge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xyXG4gICAgICAgICAgICB3ZXB5LnVwbG9hZEZpbGUoe1xyXG4gICAgICAgICAgICAgICAgdXJsOiBob3N0ICsgdGhpcy51cGxvYWRJbWFnZUFwaSxcclxuICAgICAgICAgICAgICAgIGZpbGVQYXRoOiBmaWxlLFxyXG4gICAgICAgICAgICAgICAgbmFtZTogJ2NvbnRlbnQnLFxyXG4gICAgICAgICAgICB9KS50aGVuKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzID0gSlNPTi5wYXJzZShyZXNwb25zZS5kYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB7IHN0YXRlLCBtc2csIGRhdGEgfSA9IHJlcztcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc3RhdGUgPT09IDEwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKFtudWxsLCBkYXRhXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShbbXNnXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XHJcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShbZV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KS5jYXRjaCgoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB7IGVyck1zZyB9ID0gZTtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUoW2Vyck1zZ10pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHVwbG9hZFZpZGVvIChmaWxlKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XHJcbiAgICAgICAgICAgIHdlcHkudXBsb2FkRmlsZSh7XHJcbiAgICAgICAgICAgICAgICB1cmw6IGhvc3QgKyB0aGlzLnVwbG9hZFZpZGVvQXBpLFxyXG4gICAgICAgICAgICAgICAgZmlsZVBhdGg6IGZpbGUsXHJcbiAgICAgICAgICAgICAgICBuYW1lOiAnY29udGVudCcsXHJcbiAgICAgICAgICAgIH0pLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXMgPSBKU09OLnBhcnNlKHJlc3BvbnNlLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgc3RhdGUsIG1zZywgZGF0YSB9ID0gcmVzO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdGF0ZSA9PT0gMTAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoW251bGwsIGRhdGFdKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKFttc2ddKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKTtcclxuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKFtlXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pLmNhdGNoKChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHsgZXJyTXNnIH0gPSBlO1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShbZXJyTXNnXSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgYmF0Y2hBZGRBcnJheSAoYXJyYXksIHNpemUsIHZhbHVlKSB7XHJcbiAgICAgICAgY29uc3QgcmV0ID0gYXJyYXk7XHJcbiAgICAgICAgaWYgKHJldCBpbnN0YW5jZW9mIEFycmF5KSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2l6ZTsgaSArPSAxKSB7XHJcbiAgICAgICAgICAgICAgICByZXQucHVzaCh2YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJldDtcclxuICAgIH1cclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICAgICAgdGhpcy52bSA9IFtdO1xyXG4gICAgICAgIHRoaXMuaW1hZ2VzID0gW107XHJcbiAgICAgICAgdGhpcy51cGxvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==