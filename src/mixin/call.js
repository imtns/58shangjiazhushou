// const app = getApp();

const { get } = require('../utils/ajax');

const loadTelUrl = '/other/encrypt/phone';

module.exports = {
    callTap() {
        // const app = getApp();
        // const { appid, userid } = app.globalData.extConfig;
        // SendClickLog(appid, userid, '{}', 'jz_xcx_call_askCall');
        get(loadTelUrl, { from: this.data.pageType }, (er, phoneNumber) => {
            if (er) {
                wx.showModal({ title: '提示', content: '获取号码出错' });
                return;
            }

            wx.makePhoneCall({ phoneNumber });
        });
    },
};
