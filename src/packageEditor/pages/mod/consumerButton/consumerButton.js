// pages/mod/consumerButton/consumerButton.js
/*eslint-disable */
const { globalData } = require('../../../../utils/globalData');
const { toast, alert } = require('../../../../utils/index');
const { get, post } = require('../../../../utils/http');
const { ajax } = require('../../../../utils/ajax');
const { bindEvent, emitEvent } = require('../../../../utils/event');

Component({
    externalClasses: ['my-class'],
    properties: {
        openType: {
            type: String,
            value: '',
        },
        url: {
            type: String,
            value: '',
        },
    },
    /**
     * 组件的方法列表
     */
    methods: {
        bindGetUserInfo(e) {
            const _this = this;
            if (e.detail.errMsg == 'getUserInfo:ok') {
                const {
                    userInfo,
                    rawData,
                    signature,
                    encryptedData,
                    iv,
                } = e.detail;
                this.regist({ iv, encryptedData }, (e, res) => {
                    if (e) {
                        alert(e);
                        return;
                    }
                    emitEvent('consumerRegister', userInfo);
                    Object.assign(globalData, {
                        userInfo,
                    });
                    _this.doCallback();
                });
            } else {
                console.log(e.detail.errMsg);
                alert('由于您拒绝了授权，后续功能不能使用。');
            }
        },
        doCallback() {
            const { openType, url, consumerId } = this.data;
            if (!url) {
                this.triggerEvent('consumersubmit', { consumerId });
                return;
            }
            if (openType == 'switchTab') {
                wx.switchTab({
                    url,
                });
            } else {
                wx.navigateTo({
                    url,
                });
            }
        },
        setLoginStatus(logining) {
            Object.assign(globalData, {
                logining,
            });
        },
        // 获取consumerId
        getConsumerId(callback) {
            const self = this;
            return;
            const { consumerId, logining = false } = globalData;
            if (consumerId) {
                callback(null, consumerId);
                return;
            }
            if (logining) return;
            self.setLoginStatus(true);
            this.getCode((e, code) => {
                if (e) {
                    self.setLoginStatus(false);
                    callback && callback(e);
                    return;
                }
                if (globalData.env58) {
                    ajax('/wechat/getSession/', { code }, (e, res) => {
                        self.setLoginStatus(false);
                        if (e) {
                            callback(e);
                            return;
                        }
                        const { openid, session } = res.data;
                        globalData.consumerId = session;

                        callback(null, session);
                    });
                    return;
                }
                get('/wechat/getSession/', { code }, (e, res) => {
                    self.setLoginStatus(false);
                    if (e) {
                        callback(e);
                        return;
                    }
                    const { openid, session } = res;
                    globalData.consumerId = session;

                    callback(null, session);
                });
            });
        },
        // 获取code
        getCode(callback) {
            const self = this;
            wx.login({
                success(data) {
                    callback(null, data.code);
                },
                fail(err) {
                    console.log(
                        'wx.login 接口调用失败，将无法正常使用开放接口等服务',
                        err,
                    );
                    callback(err);
                },
            });
        },
        // 注册
        regist(data, callback) {
            const self = this;
            const formData = Object.assign({}, data, {
                session: this.data.consumerId,
            });
            post('/wechat/decodeUserInfo/', formData, (e, res) => {
                console.log(e, res);
                if (e) {
                    callback && callback(e);
                } else {
                    callback && callback(null, res);
                }
            });
        },
    },
    attached() {
        const { consumerId = 0, userInfo = 0 } = globalData;
        this.setData({
            consumerId,
            userInfo,
        });
        const _this = this;
        bindEvent('consumerLogin', consumerId => {
            _this.setData({
                consumerId,
            });
        });
        bindEvent('consumerRegister', userInfo => {
            _this.setData({
                userInfo,
            });
        });
        this.getConsumerId((e, consumerId) => {
            if (e) {
                toast(e);
                return;
            }
            emitEvent('consumerLogin', consumerId);
        });
    },
});
