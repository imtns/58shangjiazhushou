'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/*eslint-disable */
var host = 'https://yaofa.58.com';
Component({
    data: {
        uploading: false,
        vm: [],
        images: []
    },
    properties: {
        uploadingImage: {
            type: String,
            value: 'https://static.58.com/lbg/mengchong/image/element/upimg_loading_1.gif',
            observer: function observer(newValue, oldValue) {
                if (!newValue) {
                    this.setData({
                        uploadingImage: oldValue
                    });
                }
            }
        },
        uploadApi: {
            type: String,
            value: '/file/upload/'
        }
    },
    methods: {
        onUploadHander: function onUploadHander() {
            if (this.uploading) return;
            var _this = this;
            var start = this.data.vm.length || 0;
            wx.chooseImage({
                success: function success(res) {
                    var fileSize = res.tempFilePaths.length;
                    var _fileset = [].concat(_toConsumableArray(_this.data.vm));
                    var _images = [].concat(_toConsumableArray(_this.data.images));
                    _fileset = _this.batchAddArray(_fileset, fileSize, _this.data.uploadingImage);
                    // 上传中图片
                    _this.setData({
                        uploading: true,
                        vm: [].concat(_toConsumableArray(_fileset))
                    });
                    // 触发图片更改事件
                    _this.triggerEvent('changeimages', {
                        uploading: _this.data.uploading
                    });
                    res.tempFilePaths.map(function (file, i) {
                        _this.uploadFile(file, function (e, res) {
                            if (e) {
                                wx.showToast({
                                    title: e || '图片上传失败，请重试',
                                    icon: 'none'
                                });
                                _fileset.splice(start + i, 1); // 失败删除
                            } else {
                                _fileset.splice(start + i, 1, file); // 成功替换
                                _images.push(res.content);
                            }
                            // 每张照片上传成功调用
                            _this.setData({
                                vm: [].concat(_toConsumableArray(_fileset)),
                                images: [].concat(_toConsumableArray(_images))
                            });
                            // 触发图片更改事件
                            _this.triggerEvent('changeimages', {
                                uploading: false,
                                images: _this.data.images
                            });
                            // 所有图片上传完成
                            if (fileSize - 1 === i) {
                                _this.setData({
                                    uploading: false
                                });
                            }
                        });
                    });
                }
            });
        },
        onCancelImage: function onCancelImage(e) {
            if (this.data.uploading) return;
            var index = e.currentTarget.dataset.index,
                _this = this;

            var _fileset = this.data.vm,
                _images = this.data.images;
            _fileset.splice(index, 1), _images.splice(index, 1);
            _this.setData({
                vm: [].concat(_toConsumableArray(_fileset)),
                images: [].concat(_toConsumableArray(_images))
            });
            // 触发图片更改事件
            _this.triggerEvent('changeImages', {
                images: this.data.images
            });
        },
        uploadFile: function uploadFile(file, callback) {
            wx.uploadFile({
                url: host + this.data.uploadApi,
                filePath: file,
                name: 'content',
                success: function success(_ref) {
                    var data = _ref.data,
                        statusCode = _ref.statusCode;

                    try {
                        data = JSON.parse(data);
                    } catch (e) {
                        callback && callback('response incorrect format.');
                        return;
                    }
                    if (statusCode === 200 && data.state == 100) {
                        callback && callback(null, data.data);
                        return;
                    }
                    callback && callback(data.msg);
                },
                fail: function fail() {
                    callback && callback('上传接口异常');
                }
            });
        },
        batchAddArray: function batchAddArray(array, size, value) {
            var ret = array;
            if (ret instanceof Array) {
                for (var i = 0; i < size; i++) {
                    ret.push(value);
                }
            }
            return ret;
        }
    }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVwbG9hZC5qcyJdLCJuYW1lcyI6WyJob3N0IiwiQ29tcG9uZW50IiwiZGF0YSIsInVwbG9hZGluZyIsInZtIiwiaW1hZ2VzIiwicHJvcGVydGllcyIsInVwbG9hZGluZ0ltYWdlIiwidHlwZSIsIlN0cmluZyIsInZhbHVlIiwib2JzZXJ2ZXIiLCJuZXdWYWx1ZSIsIm9sZFZhbHVlIiwic2V0RGF0YSIsInVwbG9hZEFwaSIsIm1ldGhvZHMiLCJvblVwbG9hZEhhbmRlciIsIl90aGlzIiwic3RhcnQiLCJsZW5ndGgiLCJ3eCIsImNob29zZUltYWdlIiwic3VjY2VzcyIsInJlcyIsImZpbGVTaXplIiwidGVtcEZpbGVQYXRocyIsIl9maWxlc2V0IiwiX2ltYWdlcyIsImJhdGNoQWRkQXJyYXkiLCJ0cmlnZ2VyRXZlbnQiLCJtYXAiLCJmaWxlIiwiaSIsInVwbG9hZEZpbGUiLCJlIiwic2hvd1RvYXN0IiwidGl0bGUiLCJpY29uIiwic3BsaWNlIiwicHVzaCIsImNvbnRlbnQiLCJvbkNhbmNlbEltYWdlIiwiaW5kZXgiLCJjdXJyZW50VGFyZ2V0IiwiZGF0YXNldCIsImNhbGxiYWNrIiwidXJsIiwiZmlsZVBhdGgiLCJuYW1lIiwic3RhdHVzQ29kZSIsIkpTT04iLCJwYXJzZSIsInN0YXRlIiwibXNnIiwiZmFpbCIsImFycmF5Iiwic2l6ZSIsInJldCIsIkFycmF5Il0sIm1hcHBpbmdzIjoiOzs7O0FBQUE7QUFDQSxJQUFNQSxPQUFPLHNCQUFiO0FBQ0FDLFVBQVU7QUFDTkMsVUFBTTtBQUNGQyxtQkFBVyxLQURUO0FBRUZDLFlBQUksRUFGRjtBQUdGQyxnQkFBUTtBQUhOLEtBREE7QUFNTkMsZ0JBQVk7QUFDUkMsd0JBQWdCO0FBQ1pDLGtCQUFNQyxNQURNO0FBRVpDLG1CQUNKLHVFQUhnQjtBQUlaQyxvQkFKWSxvQkFJSEMsUUFKRyxFQUlPQyxRQUpQLEVBSWlCO0FBQ3pCLG9CQUFJLENBQUNELFFBQUwsRUFBZTtBQUNYLHlCQUFLRSxPQUFMLENBQWE7QUFD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Q0FBYixFQUFnQkEsSUFBSXdCLElBQXBCLEVBQTBCeEIsR0FBMUIsRUFBK0I7QUFDM0J5Qix3QkFBSWxCLElBQUosQ0FBUzlCLEtBQVQ7QUFDSDtBQUNKO0FBQ0QsbUJBQU9nRCxHQUFQO0FBQ0g7QUF4R0k7QUF4QkgsQ0FBViIsImZpbGUiOiJ1cGxvYWQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKmVzbGludC1kaXNhYmxlICovXHJcbmNvbnN0IGhvc3QgPSAnaHR0cHM6Ly95YW9mYS41OC5jb20nO1xyXG5Db21wb25lbnQoe1xyXG4gICAgZGF0YToge1xyXG4gICAgICAgIHVwbG9hZGluZzogZmFsc2UsXHJcbiAgICAgICAgdm06IFtdLFxyXG4gICAgICAgIGltYWdlczogW10sXHJcbiAgICB9LFxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIHVwbG9hZGluZ0ltYWdlOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IFN0cmluZyxcclxuICAgICAgICAgICAgdmFsdWU6XHJcbiAgICAgICAgJ2h0dHBzOi8vc3RhdGljLjU4LmNvbS9sYmcvbWVuZ2Nob25nL2ltYWdlL2VsZW1lbnQvdXBpbWdfbG9hZGluZ18xLmdpZicsXHJcbiAgICAgICAgICAgIG9ic2VydmVyKG5ld1ZhbHVlLCBvbGRWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFuZXdWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVwbG9hZGluZ0ltYWdlOiBvbGRWYWx1ZSxcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHVwbG9hZEFwaToge1xyXG4gICAgICAgICAgICB0eXBlOiBTdHJpbmcsXHJcbiAgICAgICAgICAgIHZhbHVlOiAnL2ZpbGUvdXBsb2FkLycsXHJcbiAgICAgICAgfSxcclxuICAgIH0sXHJcbiAgICBtZXRob2RzOiB7XHJcbiAgICAgICAgb25VcGxvYWRIYW5kZXIoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnVwbG9hZGluZykgcmV0dXJuO1xyXG4gICAgICAgICAgICBjb25zdCBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgIGNvbnN0IHN0YXJ0ID0gdGhpcy5kYXRhLnZtLmxlbmd0aCB8fCAwO1xyXG4gICAgICAgICAgICB3eC5jaG9vc2VJbWFnZSh7XHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGZpbGVTaXplID0gcmVzLnRlbXBGaWxlUGF0aHMubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBfZmlsZXNldCA9IFsuLi5fdGhpcy5kYXRhLnZtXTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBfaW1hZ2VzID0gWy4uLl90aGlzLmRhdGEuaW1hZ2VzXTtcclxuICAgICAgICAgICAgICAgICAgICBfZmlsZXNldCA9IF90aGlzLmJhdGNoQWRkQXJyYXkoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9maWxlc2V0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWxlU2l6ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuZGF0YS51cGxvYWRpbmdJbWFnZSxcclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIOS4iuS8oOS4reWbvueJh1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cGxvYWRpbmc6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZtOiBbLi4uX2ZpbGVzZXRdLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIOinpuWPkeWbvueJh+abtOaUueS6i+S7tlxyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLnRyaWdnZXJFdmVudCgnY2hhbmdlaW1hZ2VzJywge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cGxvYWRpbmc6IF90aGlzLmRhdGEudXBsb2FkaW5nLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcy50ZW1wRmlsZVBhdGhzLm1hcCgoZmlsZSwgaSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy51cGxvYWRGaWxlKGZpbGUsIChlLCByZXMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IGUgfHwgJ+WbvueJh+S4iuS8oOWksei0pe+8jOivt+mHjeivlScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246ICdub25lJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfZmlsZXNldC5zcGxpY2Uoc3RhcnQgKyBpLCAxKTsgLy8g5aSx6LSl5Yig6ZmkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9maWxlc2V0LnNwbGljZShzdGFydCArIGksIDEsIGZpbGUpOyAvLyDmiJDlip/mm7/mjaJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfaW1hZ2VzLnB1c2gocmVzLmNvbnRlbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g5q+P5byg54Wn54mH5LiK5Lyg5oiQ5Yqf6LCD55SoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2bTogWy4uLl9maWxlc2V0XSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbWFnZXM6IFsuLi5faW1hZ2VzXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g6Kem5Y+R5Zu+54mH5pu05pS55LqL5Lu2XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy50cmlnZ2VyRXZlbnQoJ2NoYW5nZWltYWdlcycsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cGxvYWRpbmc6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGltYWdlczogX3RoaXMuZGF0YS5pbWFnZXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOaJgOacieWbvueJh+S4iuS8oOWujOaIkFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZpbGVTaXplIC0gMSA9PT0gaSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cGxvYWRpbmc6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb25DYW5jZWxJbWFnZShlKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmRhdGEudXBsb2FkaW5nKSByZXR1cm47XHJcbiAgICAgICAgICAgIGxldCB7IGluZGV4IH0gPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldCxcclxuICAgICAgICAgICAgICAgIF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgbGV0IF9maWxlc2V0ID0gdGhpcy5kYXRhLnZtLFxyXG4gICAgICAgICAgICAgICAgX2ltYWdlcyA9IHRoaXMuZGF0YS5pbWFnZXM7XHJcbiAgICAgICAgICAgIF9maWxlc2V0LnNwbGljZShpbmRleCwgMSksIF9pbWFnZXMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgICAgX3RoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgICAgICB2bTogWy4uLl9maWxlc2V0XSxcclxuICAgICAgICAgICAgICAgIGltYWdlczogWy4uLl9pbWFnZXNdLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy8g6Kem5Y+R5Zu+54mH5pu05pS55LqL5Lu2XHJcbiAgICAgICAgICAgIF90aGlzLnRyaWdnZXJFdmVudCgnY2hhbmdlSW1hZ2VzJywge1xyXG4gICAgICAgICAgICAgICAgaW1hZ2VzOiB0aGlzLmRhdGEuaW1hZ2VzLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHVwbG9hZEZpbGUoZmlsZSwgY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgd3gudXBsb2FkRmlsZSh7XHJcbiAgICAgICAgICAgICAgICB1cmw6IGhvc3QgKyB0aGlzLmRhdGEudXBsb2FkQXBpLFxyXG4gICAgICAgICAgICAgICAgZmlsZVBhdGg6IGZpbGUsXHJcbiAgICAgICAgICAgICAgICBuYW1lOiAnY29udGVudCcsXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzKHsgZGF0YSwgc3RhdHVzQ29kZSB9KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayAmJiBjYWxsYmFjaygncmVzcG9uc2UgaW5jb3JyZWN0IGZvcm1hdC4nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoc3RhdHVzQ29kZSA9PT0gMjAwICYmIGRhdGEuc3RhdGUgPT0gMTAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKG51bGwsIGRhdGEuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2soZGF0YS5tc2cpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGZhaWwoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2soJ+S4iuS8oOaOpeWPo+W8guW4uCcpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBiYXRjaEFkZEFycmF5KGFycmF5LCBzaXplLCB2YWx1ZSkge1xyXG4gICAgICAgICAgICBjb25zdCByZXQgPSBhcnJheTtcclxuICAgICAgICAgICAgaWYgKHJldCBpbnN0YW5jZW9mIEFycmF5KSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNpemU7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldC5wdXNoKHZhbHVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcmV0O1xyXG4gICAgICAgIH0sXHJcbiAgICB9LFxyXG59KTtcclxuIl19