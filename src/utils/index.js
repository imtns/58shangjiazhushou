import wepy from 'wepy';
import globalService from './globalService';

module.exports.globalService = globalService;

export const getNetStatus = () => new Promise((resolve, reject) => {
    wx.getNetworkType({
        success({ networkType }) {
            /**
                 * 0 网络不可用
                 * 1 wifi条件下，可以直接播放、上传
                 * 2 移动网络环境
                 */
            let status = 0;

            if (~['unknown', 'none'].indexOf(networkType)) {
                status = 0;
            } else if (~['wifi'].indexOf(networkType)) {
                status = 1;
            } else if (~['2g', '3g', '4g'].indexOf(networkType)) {
                status = 2;
            }

            resolve(status);
        },
        fail(err) {
            reject(err);
        },
    });
});

export const isEmpty = v => {
    if (v === '' || v === null || v === undefined) {
        return true;
    }

    return false;
};

export const sleep = (time = 300) => new Promise((resolve) => {
    setTimeout(() => { resolve(); }, time);
});

// alert
export const alert = (content, title, callBack) => {
    // showCancel设为false，然后在success里判断用户点的确定还是取消？
    wepy.showModal({
        showCancel: false,
        title: title || '注意',
        content,
        success(res) {
            if (res.confirm) {
                console.log('用户点击确定');
                callBack && callBack();
            } else if (res.cancel) {
                console.log('用户点击取消');
            }
        },
    });
};

// alert的Promise版本
export const alertP = (...props) => {
    const [content, title = '注意'] = props;
    return new Promise((resolve, reject) => {
        wx.showModal({
            title,
            content,
            success(res) {
                resolve(res);
            },
            fail(err) {
                reject(err);
            },
        });
    });
};

// toast
export const toast = (title, duration = 1500) => {
    wepy.showToast({
        title,
        icon: 'none',
        duration,
    });
};
    // 不支持提示
export const notSupportTips = () => {
    wx.showModal({
        title: '提示',
        content: '此微信版本过低，请先升级微信。',
        success(res) {
            wx.setEnableDebug({ enableDebug: !res.confirm });
        },
    });
};
export const toastSync = (title) => wepy.showToast({
    title: title.toString(),
    icon: 'none',
    duration: 2000,
});

// 图片域名
export const picSrcDomain = () => {
    const n = parseInt(Math.random() * 8) + 1;
    return `https://pic${n}.58cdn.com.cn`;
};
export const previewImage = (imgs, index) => {
    const urls = imgs.map(img => {
        const url = img.split('?')[0];
        return `${url}?w=750&h=1000`;
    });
    wx.previewImage({ current: urls[index], urls });
};
// 过滤微信表情
export const filteremoji = (content) => {
    const ranges = [
        '\ud83c[\udf00-\udfff]',
        '\ud83d[\udc00-\ude4f]',
        '\ud83d[\ude80-\udeff]',
    ];
    const emojireg = content.replace(new RegExp(ranges.join('|'), 'g'), '');
    return emojireg;
};
