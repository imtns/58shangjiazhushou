import wepy from 'wepy';
import loginConfig from '../config/login';

const loginPlugin = requirePlugin('loginSdk');

const pwdConfig = loginConfig;
const jump = (url) => {
    wepy.navigateTo({
        url,
    });
};
const callback = (code) => {
    // code 0 代表调用登录接口
    // code 1 调用获取用户信息接口
    // code 2 获取微信绑定手机号
    if (code === 0) {
        const { PPU } = loginPlugin.PPUrequestHeader('58.com', '/');
        wepy.setStorageSync('ppu', PPU);
        wepy.reLaunch({
            url: '/pages/home',
        });
    }
};

Object.assign(pwdConfig, {
    jump,
    callback,
});

export default {
    /**
     * 跳转登录页面
     * @param {Object} cfg { username, mobile }
     */
    goLogin(cfg = {}) {
        const {
            mobile: mobilevalue = '',
            username: usernamevalue = '',
        } = cfg;

        loginPlugin.goLogin({
            ...pwdConfig,
            mobilevalue,
            usernamevalue,
        });
    },
};
