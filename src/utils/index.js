import wepy from 'wepy';

export const sleep = (time = 300) => new Promise((resolve) => {
    setTimeout(() => { resolve(); }, time);
});

export const alert = (content, title, callBack) => {
    wepy.showModal({
        showCancel: false,
        title: title || '注意',
        content,
        success(res) {
            console.log(res);
            if (res.confirm) {
                callBack && callBack();
            }
        }
    });
}