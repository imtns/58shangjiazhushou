import wepy from 'wepy';

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
}

// toast
export const toast = (title) => {
    wepy.showToast({
        title,
        icon: 'none',
        duration: 2000,
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
