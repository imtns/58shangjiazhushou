/**
 * @desc 上传图片
 */
import wepy from 'wepy';
import uploader from './uploaderP';

const uploadResource = async (path, type) => {
    // 上传资源
    const { content: resourceUrl } = await uploader(path, {
        type,
    });

    return resourceUrl;
};

const uploadImages = async ({ count = 9, sourceType = ['album', 'camera'] } = {}) => {
    const { tempFiles } = await wepy.chooseImage({
        count, sourceType,
    });

    let msg = '';

    // 过滤大于4M的
    let filesToUpload = tempFiles.filter(v => v.size < 4000 * 1024);
    if (filesToUpload.length < tempFiles.length) {
        msg = '部分图片上传失败，大小需小于4M';
    }

    // 过滤像素小于200 * 200的
    filesToUpload =
        // 获取图片信息
        (await Promise.all(filesToUpload.map(v => wepy.getImageInfo({ src: v.path }))))
            // 筛选
            .filter(v => v.width > 200 && v.height > 200)
            // 获取路径
            .map(v => v.path);
    if (filesToUpload.length < tempFiles.length) {
        msg = '部分图片上传失败，像素需大于200*200';
    }

    // if (msg) {
    //     alert(msg);
    // }

    // 上传图片
    const result = await Promise.all(filesToUpload.map(path => uploadResource(path, 'image')));

    return { msg, result, tempFilePaths: filesToUpload };
};

export default uploadImages;
module.exports.uploadResource = uploadResource;
