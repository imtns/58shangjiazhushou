// const app = getApp();

const { get } = require('../utils/ajax');

const loadTelUrl = '/other/encrypt/phone';

module.exports = {
    async callTap() {
        // const app = getApp();
        // const { appid, userid } = app.globalData.extConfig;
        // SendClickLog(appid, userid, '{}', 'jz_xcx_call_askCall');
        const { data } = await get(loadTelUrl, { from: this.data.pageType });
        if (!data) {
            wx.showModal({ title: '提示', content: '获取号码出错' });
            return;
        }

        wx.makePhoneCall({ phoneNumber: data });
    },
};
