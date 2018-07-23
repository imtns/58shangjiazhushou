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
        const { _page_data } = this.data;
        _page_data[index].props.cfg.showCallMenu = !_page_data[index].props.cfg.showCallMenu;
        this.setData({
            page_data: _page_data,
        });
    },
    tabQrcode(e) {
        this.sendLogCode();
        const { releaseId } = getApp().globalData.extConfig;
        get(`/releaseMpCode/${releaseId}`, {
            packing: 'packing',
        }, (e, res) => {
            if (e) return;
            wx.previewImage({
                urls: [picSrcDomain() + res],
            });
        });
    },
};
