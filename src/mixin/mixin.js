

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

const app = require('../utils/globalData');

const mixinConfig = {
    data: {
        supportVersion: true,
        detailShow: false,
        showUserinfoAuthorize: false,
        editLayer: {},
        isEditing: false,
    },
    onReady() {
        console.log(app);
        // const { userInfo } = app.globalData;
        // this.setData({
        //     showUserinfoAuthorize: !userInfo,
        // });
        // if (userInfo) {
        this.onPageReady();
        // }
    },
    onPageReady() {
        if (!wx.getExtConfigSync) {
            this.setData({ supportVersion: false });
            return;
        }
        // this.getAppTitle((e) => {
        //     if (e) return;
        this.loadData();
        // });
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
    );
    return minx;
};
