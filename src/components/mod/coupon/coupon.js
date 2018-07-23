import { post } from '../../../utils/ajax';
import { toast } from '../../../utils/index';
// import { SendClickLog } from '../../utils/maidian.js';

module.exports = {
    sendLog () {
        // const app = getApp();
        // const { appid, userid } = app.globalData.extConfig;
        // SendClickLog(appid, userid, '{}', 'jz_xcx_coupon_receive');
    },
    receiveCoupon(e) {
        this.sendLog();
        const couponId = e.currentTarget.dataset.couponid;
        post('/businessCoupon/consumerGetCoupon', { couponId }, (er) => {
            if (er) {
                toast(er);
                return;
            }
            wx.showModal({
                showCancel: false,
                title: '',
                content: '优惠券领取成功',
            });
        }, true);
    },
};
