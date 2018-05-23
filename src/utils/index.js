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
        }
    });
}

// toast
export const toast = (title) => {
    wepy.showToast({
        title,
        icon: 'none',
        duration: 2000,
    });
}