import wepy from 'wepy';

export const sleep = (time = 300) => new Promise((resolve) => {
    setTimeout(() => { resolve(); }, time);
});

// alert
export const alert = (content, title, callBack) => {
    wepy.showModal({
        showCancel: false,
        title: title || '注意',
        content,
        success(res) {
            if (res.confirm) {
                callBack && callBack();
            }
        },
    });
};

// toast
export const toast = (title) => {
    wepy.showToast({
        title,
        icon: 'none',
        duration: 2000,
    });
};

// 图片域名
export const picSrcDomain = () => {
    const n = parseInt(Math.random() * 8) + 1;
    return `https://pic${n}.58cdn.com.cn`;
};
