// pages/mod/userinfoAuthorize/userinfoAuthorize.js
// const app = getApp();
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        bindCallBack: {
            type: Function,
        },
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        bindGetUserInfo(e) {
            if (e.detail.errMsg === 'getUserInfo:ok') {
                // const {
                //     userInfo, rawData, signature, encryptedData, iv,
                // } = e.detail;
                Object.assign(this.$parent.globalData, {
                    ...e.detail,
                });
                this.data.bindCallBack && this.data.bindCallBack(null, e.detail);
            } else {
                this.data.bindCallBack && this.data.bindCallBack(e.detail.errMsg);
            }
        },
    },
});
