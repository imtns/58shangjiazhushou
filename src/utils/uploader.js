import wepy from 'wepy';

const uploadUrl = 'http://yaofa.58.com//fileUpload';

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
        success({ data }) {
            const nData = JSON.parse(data);
            console.log(nData);
            if (nData.state === 100) {
                callback(null, nData.data);
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