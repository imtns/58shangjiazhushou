import wepy from 'wepy';
import { sleep } from '../utils';


export default {
    async DoLogin(extraData) {
        const extraDataJSON = (typeof extraData === 'object') ? { ...extraData } : JSON.parse(extraData);
        if (extraDataJSON.ppu !== undefined) { // 如果获取ppu成功
            console.log(`获取PPU成功！ ${extraDataJSON.ppu}`);
            wepy.setStorageSync('ppu', extraDataJSON.ppu);
            // wepy.setClipboardData({
            //     data: extraDataJSON.ppu,
            // });
            const query = wepy.getStorageSync('query');
            const { toRedirect, ParamNames = '' } = query;
            if (query && JSON.stringify() !== '{}' && !ParamNames) { // 如果从公众号进来的消息
                await sleep();
                wepy.redirectTo({
                    url: toRedirect,
                });
                wx.removeStorageSync('query');
                return;
            }
            if (query && JSON.stringify(query) !== '{}' && ParamNames) {
                let paramsStr = '';
                if (ParamNames.split('|').length === 1) {
                    paramsStr = `&${ParamNames}=${query.ParamValues}`;
                } else {
                    const keyArr = ParamNames.split('|');
                    const valueArr = query.ParamValues.split('|');
                    keyArr.forEach((item, index) => {
                        paramsStr += `&${keyArr[index]}=${valueArr[index]}`;
                    });
                }
                await sleep();
                wepy.redirectTo({
                    url: `${toRedirect}?${paramsStr.substring(1)}`,
                });
                wx.removeStorageSync('query');
                return;
            }
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
        if (!extraData) return;
        const { code } = extraData;
        // 开通支付失败
        // 返回商家助手小程序首页
        console.log('code:', code);
        if (code !== '0') {
            console.log('OpenPay:1');
            setTimeout(() => {
                wepy.reLaunch({
                    url: '/pages/home',
                });
            }, 1000);
        } else {
            console.log('OpenPay:0');
            // 支付开通验证成功后，调用同意协议接口
            wepy.setStorageSync('OpenPay', '0');
        }
    },
};
