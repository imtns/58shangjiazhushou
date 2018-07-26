// 输入页面支持关键字和全路径
// 关键字：news
// 全路径:/pages/index/index
/* eslint-disable */
import { globalData } from '../utils/globalData';

module.exports = function switchTab(url) {
    // const app = getApp();
    let path = '';
    // 严格校验globalData到list的取值
    const list = globalData.tabBar && globalData.tabBar.list || [];
    const { env58 } = globalData;
    // 获取页面关键字
    const pageKey = url.split('/').pop();
    if (list.some(item => item.pagePath.includes(pageKey))) {
        path = `/pages/${pageKey}/${pageKey}`;
       // navigate = env58 ? wx.redirectTo : wx.switchTab;
    } else {
        path = `/pages/custom/custom?ptype=${pageKey}`;
    }
    globalData.pageData = {};
    wx.redirectTo({
        url: path,
    })
};
