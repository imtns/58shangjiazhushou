const route = require('./route.js');

module.exports = {
    getRoute (pageKey) {
        const tabBar = this.$parent.globalData.extConfig.tabBar.list;
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
        };
    },
    navigateTo (r) {
        if (r.type === 'tabbar') {
            wx.switchTab({
                url: r.url,
            });
        } else {
            wx.navigateTo({
                url: r.url,
            });
        }
    },
};
