// 输入页面支持关键字和全路径
// 关键字：news
// 全路径:/pages/index/index
/* eslint-disable */
const { globalData } = require('../../utils/globalData');
import tabbarMixin from '../pages/mod/tabBar/tabBar';

module.exports.switchTab = function switchTab(url) {
    let path = '';
    // 严格校验globalData到list的取值
    const list = globalData.tabBar && globalData.tabBar.list || [];
    // 获取页面关键字
    const pageKey = url.split('/').pop();
    // 用于模仿tabbar操作
    const e = {
        currentTarget: {
            dataset: {
                item: {
                    pageKey,
                    pagePath: `pages/${pageKey}/${pageKey}`,
                },
            },
        },
    };

    if (list.some(item => item.pagePath.includes(pageKey))) {
        path = `/packageEditor/pages/${pageKey}/${pageKey}`;
        globalData.pageData = {};
        tabbarMixin.switchTab.bind(this)(e);
        return;
    }

    path = `/packageEditor/pages/custom/custom?ptype=${pageKey}`;

    wx.navigateTo({
        url: path,
    })
    return;
};
