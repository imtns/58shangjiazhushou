// import { globalData } from '../../../utils/globalData';

export default {
    switchTab(e) {
        const { pageType } = this.data; // 当前的pageType
        const { item } = e.currentTarget.dataset;
        const { pageKey, pagePath: route } = item; // 要切换的pageKey

        // 切换到当前页，则不做操作
        if (pageType === pageKey) {
            return;
        }

        this.route = route;
        this.setData({
            editLayer: {}, // 清空编辑浮层
            isEditing: false,
            pageKey,
        });
        // if (globalData.tabMode === 1) {
        /**
             * 重定向版本的tabbar
             */
        // wx.redirectTo({
        //     url: `/${route}`, // switchTab需要加上前面的 /
        // });
        // } else {
        //     /**
        //      * 当前页面渲染的tabbar
        //      */
        this.loadData(() => {
            wx.pageScrollTo({
                scrollTop: 0,
                duration: 0,
            });
        });
        // }
    },
};
