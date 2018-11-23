// mixin
import loadDataMinx from './loadData';
import loadMoreMinx from './loadMore';
import navigationMinx from './navigation';
import callMinx from './call';
import editLayerMinx from './editLayer'; // 编辑组件相关
import userinfoAuthorize from './userinfoAuthorize';

// 各个组件的js
import videoComponent from '../pages/mod/video/video';
import imageSwiperComponent from '../pages/mod/imageSwiper/imageSwiper';
import evaluationComponent from '../pages/mod/evaluation/evaluation';
import imagesMinx from '../pages/mod/images/images';
import couponMinx from '../pages/mod/coupon/coupon';
import callModMinx from '../pages/mod/call/call';
import meMinx from '../pages/mod/me/me';
import payMinx from '../pages/mod/pay/pay';
import branchMinx from '../pages/mod/branch/branch';
import tabBarComponent from '../pages/mod/tabBar/tabBar';

import { globalData } from '../../utils/globalData';

const getPage = require('../../utils/getPage');

const mixinConfig = {
    data: {
        supportVersion: true,
        detailShow: false,
        showUserinfoAuthorize: false,
        editLayer: {},
        isEditing: false,
        pageModule: {},
        tabBarItems: [],
        pageKey: 'index',
    },
    async onLoad() {
        const { model = '' } = wx.getSystemInfoSync();
        if (~model.toLowerCase().indexOf('iphone x')) {
            globalData.isIphoneX = true;
        }
    },
    onReady() {
        this.onPageReady();
    },
    onShow() {
        this.refreshPage();
    },
    async onPageReady() {
        if (!wx.getExtConfigSync) {
            this.setData({ supportVersion: false });
            return;
        }
        await this.loadTabbar();
        await this.loadData();
        await this.loadPageList();

        const { extConfig = {}, isIphoneX } = globalData;
        // const { tabBar = {}, mpSource = '', extraInfo = null } = extConfig.extJson;
        const { list = [] } = globalData.tabBar;
        console.log(extConfig.extJson);
        // globalData.tabMode = extConfig.extJson.tabMode;
        const tabBarItems = list.map(item => Object.assign(item, { pageKey: getPage(item.pagePath) }));
        this.setData({
            isIphoneX,
            tabBarItems,
            env58: true,
            // mpSource,
            // extraInfo,
        });
    },
    onPullDownRefresh() {
        this.loadData(() => {
            wx.stopPullDownRefresh();
        });
    },
    onShareAppMessage() {

    },
};

module.exports = function mixin(config) {
    const minx = Object.assign(
        {}, config || {}, mixinConfig,
        loadDataMinx,
        loadMoreMinx,
        navigationMinx,
        callMinx,
        callModMinx,
        videoComponent,
        imagesMinx,
        couponMinx,
        imageSwiperComponent,
        evaluationComponent,
        meMinx,
        payMinx,
        branchMinx,
        userinfoAuthorize,
        editLayerMinx,
        tabBarComponent,
    );
    return minx;
};
