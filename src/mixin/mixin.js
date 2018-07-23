

import loadDataMinx from './loadData';
import loadMoreMinx from './loadMore';
import navigationMinx from './navigation';
import callMinx from './call';
import editLayerMinx from './editLayer';
import videoComponent from '../components/mod/video/video';
import imageSwiperComponent from '../components/mod/imageSwiper/imageSwiper';
import evaluationComponent from '../components/mod/evaluation/evaluation';
import imagesMinx from '../components/mod/images/images';
import couponMinx from '../components/mod/coupon/coupon';
import callModMinx from '../components/mod/call/call';
import meMinx from '../components/mod/me/me';
import payMinx from '../components/mod/pay/pay';
import branchMinx from '../components/mod/branch/branch';
import userinfoAuthorize from './userinfoAuthorize';
import tabBarComponent from '../components/mod/tabBar/tabBar';

const getPage = require('../utils/getPage');
const app = require('../utils/globalData');

const mixinConfig = {
    data: {
        supportVersion: true,
        detailShow: false,
        showUserinfoAuthorize: false,
        editLayer: {},
        isEditing: false,
        pageModule: {},
        tabBarItems: [],
    },
    async onLoad() {
        const { model = '' } = wx.getSystemInfoSync();
        if (~model.toLowerCase().indexOf('iphone x')) {
            app.globalData.isIphoneX = true;
        }
    },
    onReady() {
        console.log(app);
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
        await this.loadExtJson();
        await this.loadData();
        await this.loadPageList();

        const { extConfig = {}, isIphoneX } = app.globalData;
        const { tabBar = {}, mpSource = '', extraInfo = null } = extConfig.extJson;
        const { list = [] } = tabBar;
        console.log(extConfig.extJson);
        // app.globalData.tabMode = extConfig.extJson.tabMode;
        const tabBarItems = list.map(item => Object.assign(item, { pageKey: getPage(item.pagePath) }));
        this.setData({
            isIphoneX,
            tabBarItems,
            env58: true,
            mpSource,
            extraInfo,
        });
    },
    // onShow() {
    //     this.setData({
    //         page_data: app.globalData.pageData,
    //     });
    // },
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
