import wepy from 'wepy';

const uploadUrl = 'http://wanghongyue.qq.com/file/upload/';

module.exports.uploader = (tempFilePath, ...props) => {
    let [params, callback, noLoading] = props;
    if (typeof params === 'function') {
        noLoading = callback;
        callback = params;
        params = {};
    }

    const formData = params.data || {};
    const name = params.name || 'content';

    !noLoading && wepy.showLoading && wepy.showLoading({ title: '上传中', mask: true });
    return wepy.uploadFile({
        url: uploadUrl,
        name,
        formData,
        filePath: tempFilePath,
        success({ data, statusCode }) {
            data = JSON.parse(data);
            if (statusCode === 200 && data.code == 0) {
                callback(null, data);
            } else {
                callback('上传失败');
            }
        },
        fail() {
            callback('上传失败');
        },
        complete() {
            !noLoading && wepy.hideLoading && wepy.hideLoading();
        },
    });
};