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

// 倒计时
export const formatDuring = (mss) => {
    const days = parseInt(mss / (1000 * 60 * 60 * 24));
    const hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = parseInt((mss % (1000 * 60)) / 1000);
    return [days > 9 ? days : `0${days}`, hours > 9 ? hours : `0${hours}`, minutes > 9 ? minutes : `0${minutes}`, seconds > 9 ? seconds : `0${seconds}`];
};

export const sleep = (time = 300) => new Promise((resolve) => {
    setTimeout(() => { resolve(); }, time);
});

// alert
export const alert = (content, title, callBack) => {
    // showCancel设为false，然后在success里判断用户点的确定还是取消？
    wepy.showModal({
        showCancel: false,
        title: title || '提示',
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
export const alertP = (content, title = '提示', extraCfg) => new Promise((resolve, reject) => {
    wx.showModal({
        title,
        content,
        success(res) {
            resolve(res);
        },
        fail(err) {
            reject(err);
        },
        ...extraCfg,
    });
});

// toast
export const toast = (title, duration = 1500) => wepy.showToast({
    title,
    icon: 'none',
    duration,
});

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
    if (typeof imgs === 'object' && !Array.isArray(imgs)) {
        imgs = imgs.map((obj) => obj.src);
    }
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

const formatNumber = (n) => {
    n = n.toString();
    return n[1] ? n : `0${n}`;
};

export const formatTime = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return [year, month, day].map(formatNumber).join('-');
};


export const withHttp = (list) => {
    list.forEach((item) => {
        const ele = item;
        if (ele.headImg && ele.headImg.indexOf('http') === -1) {
            ele.headImg = `https://pic1.58cdn.com.cn${headImg}`;
        } else if (ele.senderPortrait && ele.senderPortrait.indexOf('http') === -1) {
            ele.senderPortrait = `https://pic1.58cdn.com.cn${ele.senderPortrait}`;
        }
    });
    return list;
};

export const autoFixed = (num) => {
    return num <= 9 ? `0${num}` : num;
};

// 线上图片 下载到本地
export const getTmpFilePath = (url) => {
    return new Promise((resolve, reject) => {
        wx.downloadFile({
            url,
            success(res) {
                resolve(res.tempFilePath);
            },
            fail(err) {
                reject(err);
            },
        });
    });
};

// 获取当前小程序页面url
export const getCurrentPageUrl = () => {
    const pages = getCurrentPages(); // 获取加载的页面
    const currentPage = pages[pages.length - 1]; // 获取当前页面的对象
    const url = currentPage.route; // 当前页面url
    return url;
};

/**
 * 获取url上的参数，以对象形式返回
 *
 * @param {string} url 需要获取的参数的url
 * @return {Object} 返回的url参数键值对
 */
export const getUrlParams = (url) => {
    const arr = url.split('?')[1].split('&');
    const result = {};

    if (arr.length === 0) {
        return result;
    }


    arr.forEach((item) => {
        const [k, v] = item.split('=');
        result[k] = v;
    });

    return result;
};

/**
 * 上传图片，临时路径变为永久路径
 *
 * @param {string} tmpPath 临时路径
 * @return {Promise<string>} 上传完成后的线上路径，不带域名，如
 * /bizmp/n_v283deb5e639474fbbb779224cc5aeaffa_46c1b2fb24e2d965.jpg
 */
export const uploadImage = async (tmpPath) => {
    const response = await wepy.uploadFile({
        url: 'https://yaofa.58.com/fileUpload',
        filePath: tmpPath,
        name: 'content',
    });
    const res = JSON.parse(response.data);
    const { state, msg, data } = res;

    if (state === 100) {
        return data.content;
    }

    throw new Error(msg);
};

/**
 * 获取页面路径名
 * **注意**，该方法不允许在app.js中调用
 *
 * @param {number} n 获取页面栈向前推进的位置，0则表示当前页，-1表示上一页
 * @return {string} 路径名，如 pages/home
 */
export const getPathName = (n = 0) => {
    if (n > 0) {
        throw new Error('参数n应小于1');
    }

    const pages = getCurrentPages();
    const l = pages.length;

    return pages[(l - 1) + n].route;
};

/**
 * 截取字符串后几位
 */

export const getString = (str, n) => {
    if (!n) return str;
    return str.substring(str.length - n, str.length);
}
