/**
 * @desc uploader的Promise版本
 * @tempFilePath 路径
 * @params 参数, type标识上传文件的类型：
 * 视频上传到 /wosMeidaUpload
 * 图片上传到 /fileUpload
 * 其他文件上传到 /wosFileUpload
 * 默认为其他类型文件
 * @noLoading 是否不要加载中弹窗
 */

let uploadUrl = 'https://yaofa.58.com/fileUpload';

export default (tempFilePath, ...props) => {
    let [params, noLoading] = props;

    const formData = params && params.data || {};
    const name = params && params.name || 'content';
    const type = params && params.type || 'image';

    if (type === 'video') {
        uploadUrl = 'https://yaofa.58.com/wosMeidaUpload'
    }

    switch (type) {
        case 'image':
            uploadUrl = 'https://yaofa.58.com/fileUpload';
            break;
        case 'video':
            uploadUrl = 'https://yaofa.58.com/wosMeidaUpload';
            break;
        default:
            uploadUrl = 'https://yaofa.58.com/wosFileUpload';
            break;
    }

    !noLoading && wx.showLoading && wx.showLoading({ title: '上传中', mask: true });
    return new Promise((resolve, reject) => {
        wx.uploadFile({
            url: uploadUrl,
            name,
            formData,
            filePath: tempFilePath,
            success({ data }) {
                const nData = JSON.parse(data);
                console.log(nData);
                if (nData.state === 100) {
                    resolve(nData.data);
                } else {
                    reject('上传失败');
                }
            },
            fail() {
                reject('上传失败');
            },
            complete() {
                !noLoading && wx.hideLoading && wx.hideLoading();
            },
        });
    });
};
