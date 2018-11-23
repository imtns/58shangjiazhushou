/* eslint-disable */
const { get } = require('../../../../utils/ajax');

module.exports = {
    showBranchChooice(e) {
        var { index } = e.currentTarget.dataset;
        var page_data = this.data.page_data;
        page_data[index].props.cfg.showBranchChooice = true;
        this.setData({
            page_data
        })
    },
    closeBranchChooice(e) {
        var { index } = e.currentTarget.dataset;
        var page_data = this.data.page_data;
        page_data[index].props.cfg.showBranchChooice = false;
        this.setData({
            page_data
        })
    },
    bindBranchCall(e) {
        this.closeBranchChooice(e);
        var { sign } = e.currentTarget.dataset;
        get('/businessShopBranch/phone', { from: this.data.pageType, sign }, (e, phoneNumber) => {
            if (e) {
                wx.showModal({ title: '提示', content: '获取号码出错' });
                return;
            }

            wx.makePhoneCall({ phoneNumber });
        });
    }
}
