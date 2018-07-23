const { toast } = require('../utils/index');
const app = require('../utils/globalData');

module.exports = {
    bindGetUserInfo(e) {
        // const app = getApp();
        if (e.detail.errMsg === 'getUserInfo:ok') {
            // const {
            //     userInfo, rawData, signature, encryptedData, iv,
            // } = e.detail;
            wx.setStorageSync('getUserInfo', e.detail);
            Object.assign(app.globalData, {
                ...e.detail,
            });
            this.onPageReady();
        } else {
            toast(e.detail.errMsg);
        }
        this.setData({
            showUserinfoAuthorize: false,
        });
    },
};
