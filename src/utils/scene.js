import wepy from 'wepy';

export default {
    DoLogin(extraData) {
        const extraDataJSON = (typeof extraData === 'object') ? { ...extraData } : JSON.parse(extraData);
        if (extraDataJSON.ppu !== undefined) { // 如果获取ppu成功
            console.log(`获取PPU成功！ ${extraDataJSON.ppu}`);
            wepy.setStorageSync('ppu', extraDataJSON.ppu);
            setTimeout(() => {
                wepy.reLaunch({
                    url: '/pages/home',
                });
            }, 1000);
        }
    },
    // 同镇跳转过来先进入到首页面，初始化当前小程序后到我的小程序页面
    DoToMymp(extraData) {
        const extraDataJSON = (typeof extraData === 'object') ? { ...extraData } : JSON.parse(extraData);
        if (extraDataJSON.ppu !== undefined) { // 如果获取ppu成功
            console.log(`获取PPU成功！ ${extraDataJSON.ppu}`);
            wepy.setStorageSync('ppu', extraDataJSON.ppu);
            setTimeout(() => {
                wepy.navigateTo({
                    url: '/pages/myMp',
                });
            }, 1000);
        }
    },
    DoOpenPay(extraData) {
        const { code } = extraData;
        // 开通支付失败
        // 返回商家助手小程序首页
        if (code !== 0) {
            setTimeout(() => {
                wepy.reLaunch({
                    url: '/pages/home',
                });
            }, 1000);
        }
    },
};
