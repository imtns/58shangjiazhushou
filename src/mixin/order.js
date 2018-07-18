module.exports = {
    updateOrder(model) {
        const syncModel = wx.getStorageSync('order') || {};
        const newModel = Object.assign({}, syncModel, model);
        wx.setStorageSync('order', newModel);
    },
    syncOrder() {
        this.setData({
            order: wx.getStorageSync('order'),
        });
    },
    removeOrder() {
        wx.removeStorageSync('order');
    },
    clearOrder(reserveId) {
        const syncModel = wx.getStorageSync('order') || {};
        if (reserveId !== syncModel.reserveId) {
            this.removeOrder();
            this.updateOrder({
                reserveId,
            });
        }
    },
};
