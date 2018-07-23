// import { SendClickLog } from '../../utils/maidian.js';
/*eslint-disable */
const app = getApp();

const { get } = require('../../../utils/ajax');
const { picSrcDomain } = require('../../../utils/index');

const loadTelUrl = '/other/encrypt/phone';

module.exports = {
    // sendLogFriend () {
    //     const app = getApp();
    //     const { appid, userid } = app.globalData.extConfig;
    //     // SendClickLog(appid, userid, '{}', 'jz_xcx_call_shareFriend');
    // },
    // sendLogCode () {
    //     const app = getApp();
    //     const { appid, userid } = app.globalData.extConfig;
    //     SendClickLog(appid, userid, '{}', 'jz_xcx_call_shareCode');
    // },
    onMenuFixed(e) {
        const { index } = e.currentTarget.dataset;
        const { page_data } = this.data;
        page_data[index].props.cfg.showCallMenu = !page_data[index].props.cfg.showCallMenu;
        this.setData({
            page_data: page_data,
        });
    },
    async tabQrcode(e) {
        // this.sendLogCode();
        // const { releaseId } = getApp().globalData.extConfig;
        const { data } = await get(`/releaseMpCode/${wx.getStorageSync('releaseId')}`, {
            packing: 'packing',
        })
        wx.previewImage({
            urls: [picSrcDomain() + data],
        });
    },
};
