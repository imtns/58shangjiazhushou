import { globalData } from '../../utils/globalData';
import switchTab from './switchTab';

const route = require('../../utils/route.js');

module.exports = {
    getRoute (pageKey) {
        const tabBar = globalData.extConfig.extJson.tabBar.list;
        const path = route[pageKey] || `${route.custom}?ptype=${pageKey}`;
        let pageType = 'custom';

        tabBar.forEach(({ pagePath }) => {
            if (`/${pagePath}` === path) {
                pageType = 'tabbar';
            }
        });
        return {
            url: path,
            type: pageType,
            pagekey: pageKey,
        };
    },
    navigateTo (r) {
        if (r.type === 'tabbar') {
            switchTab(r.pagekey);
        } else {
            wx.navigateTo({
                url: r.url,
            });
        }
    },
};
