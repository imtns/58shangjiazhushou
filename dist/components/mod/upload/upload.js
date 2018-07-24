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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVwbG9hZC5qcyJdLCJuYW1lcyI6WyJob3N0IiwiQ29tcG9uZW50IiwiZGF0YSIsInVwbG9hZGluZyIsInZtIiwiaW1hZ2VzIiwicHJvcGVydGllcyIsInVwbG9hZGluZ0ltYWdlIiwidHlwZSIsIlN0cmluZyIsInZhbHVlIiwib2JzZXJ2ZXIiLCJuZXdWYWx1ZSIsIm9sZFZhbHVlIiwic2V0RGF0YSIsInVwbG9hZEFwaSIsIm1ldGhvZHMiLCJvblVwbG9hZEhhbmRlciIsIl90aGlzIiwic3RhcnQiLCJsZW5ndGgiLCJ3eCIsImNob29zZUltYWdlIiwic3VjY2VzcyIsInJlcyIsImZpbGVTaXplIiwidGVtcEZpbGVQYXRocyIsIl9maWxlc2V0IiwiX2ltYWdlcyIsImJhdGNoQWRkQXJyYXkiLCJ0cmlnZ2VyRXZlbnQiLCJtYXAiLCJmaWxlIiwiaSIsInVwbG9hZEZpbGUiLCJlIiwic2hvd1RvYXN0IiwidGl0bGUiLCJpY29uIiwic3BsaWNlIiwicHVzaCIsImNvbnRlbnQiLCJvbkNhbmNlbEltYWdlIiwiaW5kZXgiLCJjdXJyZW50VGFyZ2V0IiwiZGF0YXNldCIsImNhbGxiYWNrIiwidXJsIiwiZmlsZVBhdGgiLCJuYW1lIiwic3RhdHVzQ29kZSIsIkpTT04iLCJwYXJzZSIsInN0YXRlIiwibXNnIiwiZmFpbCIsImFycmF5Iiwic2l6ZSIsInJldCIsIkFycmF5Il0sIm1hcHBpbmdzIjoiOzs7O0FBQUE7QUFDQSxJQUFNQSxPQUFPLHNCQUFiO0FBQ0FDLFVBQVU7QUFDTkMsVUFBTTtBQUNGQyxtQkFBVyxLQURUO0FBRUZDLFlBQUksRUFGRjtBQUdGQyxnQkFBUTtBQUhOLEtBREE7QUFNTkMsZ0JBQVk7QUFDUkMsd0JBQWdCO0FBQ1pDLGtCQUFNQyxNQURNO0FBRVpDLG1CQUNKLHVFQUhnQjtBQUlaQyxvQkFKWSxvQkFJSEMsUUFKRyxFQUlPQyxRQUpQLEVBSWlCO0FBQ3pCLG9CQUFJLENBQUNELFFBQUwsRUFBZTtBQUNYLHlCQUFLRSxPQUFMLENBQWE7QUFD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Q0FBYixFQUFnQkEsSUFBSXdCLElBQXBCLEVBQTBCeEIsR0FBMUIsRUFBK0I7QUFDM0J5Qix3QkFBSWxCLElBQUosQ0FBUzlCLEtBQVQ7QUFDSDtBQUNKO0FBQ0QsbUJBQU9nRCxHQUFQO0FBQ0g7QUF4R0k7QUF4QkgsQ0FBViIsImZpbGUiOiJ1cGxvYWQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKmVzbGludC1kaXNhYmxlICovXG5jb25zdCBob3N0ID0gJ2h0dHBzOi8veWFvZmEuNTguY29tJztcbkNvbXBvbmVudCh7XG4gICAgZGF0YToge1xuICAgICAgICB1cGxvYWRpbmc6IGZhbHNlLFxuICAgICAgICB2bTogW10sXG4gICAgICAgIGltYWdlczogW10sXG4gICAgfSxcbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIHVwbG9hZGluZ0ltYWdlOiB7XG4gICAgICAgICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICAgICAgICB2YWx1ZTpcbiAgICAgICAgJ2h0dHBzOi8vc3RhdGljLjU4LmNvbS9sYmcvbWVuZ2Nob25nL2ltYWdlL2VsZW1lbnQvdXBpbWdfbG9hZGluZ18xLmdpZicsXG4gICAgICAgICAgICBvYnNlcnZlcihuZXdWYWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAoIW5ld1ZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cGxvYWRpbmdJbWFnZTogb2xkVmFsdWUsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIHVwbG9hZEFwaToge1xuICAgICAgICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgICAgICAgdmFsdWU6ICcvZmlsZS91cGxvYWQvJyxcbiAgICAgICAgfSxcbiAgICB9LFxuICAgIG1ldGhvZHM6IHtcbiAgICAgICAgb25VcGxvYWRIYW5kZXIoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy51cGxvYWRpbmcpIHJldHVybjtcbiAgICAgICAgICAgIGNvbnN0IF90aGlzID0gdGhpcztcbiAgICAgICAgICAgIGNvbnN0IHN0YXJ0ID0gdGhpcy5kYXRhLnZtLmxlbmd0aCB8fCAwO1xuICAgICAgICAgICAgd3guY2hvb3NlSW1hZ2Uoe1xuICAgICAgICAgICAgICAgIHN1Y2Nlc3MocmVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGZpbGVTaXplID0gcmVzLnRlbXBGaWxlUGF0aHMubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICBsZXQgX2ZpbGVzZXQgPSBbLi4uX3RoaXMuZGF0YS52bV07XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IF9pbWFnZXMgPSBbLi4uX3RoaXMuZGF0YS5pbWFnZXNdO1xuICAgICAgICAgICAgICAgICAgICBfZmlsZXNldCA9IF90aGlzLmJhdGNoQWRkQXJyYXkoXG4gICAgICAgICAgICAgICAgICAgICAgICBfZmlsZXNldCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVTaXplLFxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuZGF0YS51cGxvYWRpbmdJbWFnZSxcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgLy8g5LiK5Lyg5Lit5Zu+54mHXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLnNldERhdGEoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdXBsb2FkaW5nOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgdm06IFsuLi5fZmlsZXNldF0sXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAvLyDop6blj5Hlm77niYfmm7TmlLnkuovku7ZcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMudHJpZ2dlckV2ZW50KCdjaGFuZ2VpbWFnZXMnLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cGxvYWRpbmc6IF90aGlzLmRhdGEudXBsb2FkaW5nLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgcmVzLnRlbXBGaWxlUGF0aHMubWFwKChmaWxlLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy51cGxvYWRGaWxlKGZpbGUsIChlLCByZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IGUgfHwgJ+WbvueJh+S4iuS8oOWksei0pe+8jOivt+mHjeivlScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOiAnbm9uZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfZmlsZXNldC5zcGxpY2Uoc3RhcnQgKyBpLCAxKTsgLy8g5aSx6LSl5Yig6ZmkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2ZpbGVzZXQuc3BsaWNlKHN0YXJ0ICsgaSwgMSwgZmlsZSk7IC8vIOaIkOWKn+abv+aNolxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfaW1hZ2VzLnB1c2gocmVzLmNvbnRlbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDmr4/lvKDnhafniYfkuIrkvKDmiJDlip/osIPnlKhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdm06IFsuLi5fZmlsZXNldF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGltYWdlczogWy4uLl9pbWFnZXNdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOinpuWPkeWbvueJh+abtOaUueS6i+S7tlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLnRyaWdnZXJFdmVudCgnY2hhbmdlaW1hZ2VzJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cGxvYWRpbmc6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbWFnZXM6IF90aGlzLmRhdGEuaW1hZ2VzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOaJgOacieWbvueJh+S4iuS8oOWujOaIkFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmaWxlU2l6ZSAtIDEgPT09IGkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cGxvYWRpbmc6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBvbkNhbmNlbEltYWdlKGUpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmRhdGEudXBsb2FkaW5nKSByZXR1cm47XG4gICAgICAgICAgICBsZXQgeyBpbmRleCB9ID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQsXG4gICAgICAgICAgICAgICAgX3RoaXMgPSB0aGlzO1xuICAgICAgICAgICAgbGV0IF9maWxlc2V0ID0gdGhpcy5kYXRhLnZtLFxuICAgICAgICAgICAgICAgIF9pbWFnZXMgPSB0aGlzLmRhdGEuaW1hZ2VzO1xuICAgICAgICAgICAgX2ZpbGVzZXQuc3BsaWNlKGluZGV4LCAxKSwgX2ltYWdlcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgX3RoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgICAgICAgdm06IFsuLi5fZmlsZXNldF0sXG4gICAgICAgICAgICAgICAgaW1hZ2VzOiBbLi4uX2ltYWdlc10sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIC8vIOinpuWPkeWbvueJh+abtOaUueS6i+S7tlxuICAgICAgICAgICAgX3RoaXMudHJpZ2dlckV2ZW50KCdjaGFuZ2VJbWFnZXMnLCB7XG4gICAgICAgICAgICAgICAgaW1hZ2VzOiB0aGlzLmRhdGEuaW1hZ2VzLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIHVwbG9hZEZpbGUoZmlsZSwgY2FsbGJhY2spIHtcbiAgICAgICAgICAgIHd4LnVwbG9hZEZpbGUoe1xuICAgICAgICAgICAgICAgIHVybDogaG9zdCArIHRoaXMuZGF0YS51cGxvYWRBcGksXG4gICAgICAgICAgICAgICAgZmlsZVBhdGg6IGZpbGUsXG4gICAgICAgICAgICAgICAgbmFtZTogJ2NvbnRlbnQnLFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3MoeyBkYXRhLCBzdGF0dXNDb2RlIH0pIHtcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEgPSBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayAmJiBjYWxsYmFjaygncmVzcG9uc2UgaW5jb3JyZWN0IGZvcm1hdC4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoc3RhdHVzQ29kZSA9PT0gMjAwICYmIGRhdGEuc3RhdGUgPT0gMTAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayAmJiBjYWxsYmFjayhudWxsLCBkYXRhLmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKGRhdGEubXNnKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGZhaWwoKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKCfkuIrkvKDmjqXlj6PlvILluLgnKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIGJhdGNoQWRkQXJyYXkoYXJyYXksIHNpemUsIHZhbHVlKSB7XG4gICAgICAgICAgICBjb25zdCByZXQgPSBhcnJheTtcbiAgICAgICAgICAgIGlmIChyZXQgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2l6ZTsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldC5wdXNoKHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgICB9LFxuICAgIH0sXG59KTtcbiJdfQ==