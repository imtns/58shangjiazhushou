/*eslint-disable */
const host = 'https://yaofa.58.com';
Component({
    data: {
        uploading: false,
        vm: [],
        images: [],
    },
    properties: {
        uploadingImage: {
            type: String,
            value:
        'https://static.58.com/lbg/mengchong/image/element/upimg_loading_1.gif',
            observer(newValue, oldValue) {
                if (!newValue) {
                    this.setData({
                        uploadingImage: oldValue,
                    });
                }
            },
        },
        uploadApi: {
            type: String,
            value: '/file/upload/',
        },
    },
    methods: {
        onUploadHander() {
            if (this.uploading) return;
            const _this = this;
            const start = this.data.vm.length || 0;
            wx.chooseImage({
                success(res) {
                    const fileSize = res.tempFilePaths.length;
                    let _fileset = [..._this.data.vm];
                    const _images = [..._this.data.images];
                    _fileset = _this.batchAddArray(
                        _fileset,
                        fileSize,
                        _this.data.uploadingImage,
                    );
                    // 上传中图片
                    _this.setData({
                        uploading: true,
                        vm: [..._fileset],
                    });
                    // 触发图片更改事件
                    _this.triggerEvent('changeimages', {
                        uploading: _this.data.uploading,
                    });
                    res.tempFilePaths.map((file, i) => {
                        _this.uploadFile(file, (e, res) => {
                            if (e) {
                                wx.showToast({
                                    title: e || '图片上传失败，请重试',
                                    icon: 'none',
                                });
                                _fileset.splice(start + i, 1); // 失败删除
                            } else {
                                _fileset.splice(start + i, 1, file); // 成功替换
                                _images.push(res.content);
                            }
                            // 每张照片上传成功调用
                            _this.setData({
                                vm: [..._fileset],
                                images: [..._images],
                            });
                            // 触发图片更改事件
                            _this.triggerEvent('changeimages', {
                                uploading: false,
                                images: _this.data.images,
                            });
                            // 所有图片上传完成
                            if (fileSize - 1 === i) {
                                _this.setData({
                                    uploading: false,
                                });
                            }
                        });
                    });
                },
            });
        },
        onCancelImage(e) {
            if (this.data.uploading) return;
            let { index } = e.currentTarget.dataset,
                _this = this;
            let _fileset = this.data.vm,
                _images = this.data.images;
            _fileset.splice(index, 1), _images.splice(index, 1);
            _this.setData({
                vm: [..._fileset],
                images: [..._images],
            });
            // 触发图片更改事件
            _this.triggerEvent('changeImages', {
                images: this.data.images,
            });
        },
        uploadFile(file, callback) {
            wx.uploadFile({
                url: host + this.data.uploadApi,
                filePath: file,
                name: 'content',
                success({ data, statusCode }) {
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
                fail() {
                    callback && callback('上传接口异常');
                },
            });
        },
        batchAddArray(array, size, value) {
            const ret = array;
            if (ret instanceof Array) {
                for (let i = 0; i < size; i++) {
                    ret.push(value);
                }
            }
            return ret;
        },
    },
});
