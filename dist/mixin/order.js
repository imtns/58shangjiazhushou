'use strict';

module.exports = {
    updateOrder: function updateOrder(model) {
        var syncModel = wx.getStorageSync('order') || {};
        var newModel = Object.assign({}, syncModel, model);
        wx.setStorageSync('order', newModel);
    },
    syncOrder: function syncOrder() {
        this.setData({
            order: wx.getStorageSync('order')
        });
    },
    removeOrder: function removeOrder() {
        wx.removeStorageSync('order');
    },
    clearOrder: function clearOrder(reserveId) {
        var syncModel = wx.getStorageSync('order') || {};
        if (reserveId !== syncModel.reserveId) {
            this.removeOrder();
            this.updateOrder({
                reserveId: reserveId
            });
        }
    }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9yZGVyLmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJ1cGRhdGVPcmRlciIsIm1vZGVsIiwic3luY01vZGVsIiwid3giLCJnZXRTdG9yYWdlU3luYyIsIm5ld01vZGVsIiwiT2JqZWN0IiwiYXNzaWduIiwic2V0U3RvcmFnZVN5bmMiLCJzeW5jT3JkZXIiLCJzZXREYXRhIiwib3JkZXIiLCJyZW1vdmVPcmRlciIsInJlbW92ZVN0b3JhZ2VTeW5jIiwiY2xlYXJPcmRlciIsInJlc2VydmVJZCJdLCJtYXBwaW5ncyI6Ijs7QUFBQUEsT0FBT0MsT0FBUCxHQUFpQjtBQUNiQyxlQURhLHVCQUNEQyxLQURDLEVBQ007QUFDZixZQUFNQyxZQUFZQyxHQUFHQyxjQUFILENBQWtCLE9BQWxCLEtBQThCLEVBQWhEO0FBQ0EsWUFBTUMsV0FBV0MsT0FBT0MsTUFBUCxDQUFjLEVBQWQsRUFBa0JMLFNBQWxCLEVBQTZCRCxLQUE3QixDQUFqQjtBQUNBRSxXQUFHSyxjQUFILENBQWtCLE9BQWxCLEVBQTJCSCxRQUEzQjtBQUNILEtBTFk7QUFNYkksYUFOYSx1QkFNRDtBQUNSLGFBQUtDLE9BQUwsQ0FBYTtBQUNUQyxtQkFBT1IsR0FBR0MsY0FBSCxDQUFrQixPQUFsQjtBQURFLFNBQWI7QUFHSCxLQVZZO0FBV2JRLGVBWGEseUJBV0M7QUFDVlQsV0FBR1UsaUJBQUgsQ0FBcUIsT0FBckI7QUFDSCxLQWJZO0FBY2JDLGNBZGEsc0JBY0ZDLFNBZEUsRUFjUztBQUNsQixZQUFNYixZQUFZQyxHQUFHQyxjQUFILENBQWtCLE9BQWxCLEtBQThCLEVBQWhEO0FBQ0EsWUFBSVcsY0FBY2IsVUFBVWEsU0FBNUIsRUFBdUM7QUFDbkMsaUJBQUtILFdBQUw7QUFDQSxpQkFBS1osV0FBTCxDQUFpQjtBQUNiZTtBQURhLGFBQWpCO0FBR0g7QUFDSjtBQXRCWSxDQUFqQiIsImZpbGUiOiJvcmRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgdXBkYXRlT3JkZXIobW9kZWwpIHtcclxuICAgICAgICBjb25zdCBzeW5jTW9kZWwgPSB3eC5nZXRTdG9yYWdlU3luYygnb3JkZXInKSB8fCB7fTtcclxuICAgICAgICBjb25zdCBuZXdNb2RlbCA9IE9iamVjdC5hc3NpZ24oe30sIHN5bmNNb2RlbCwgbW9kZWwpO1xyXG4gICAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKCdvcmRlcicsIG5ld01vZGVsKTtcclxuICAgIH0sXHJcbiAgICBzeW5jT3JkZXIoKSB7XHJcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgb3JkZXI6IHd4LmdldFN0b3JhZ2VTeW5jKCdvcmRlcicpLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIHJlbW92ZU9yZGVyKCkge1xyXG4gICAgICAgIHd4LnJlbW92ZVN0b3JhZ2VTeW5jKCdvcmRlcicpO1xyXG4gICAgfSxcclxuICAgIGNsZWFyT3JkZXIocmVzZXJ2ZUlkKSB7XHJcbiAgICAgICAgY29uc3Qgc3luY01vZGVsID0gd3guZ2V0U3RvcmFnZVN5bmMoJ29yZGVyJykgfHwge307XHJcbiAgICAgICAgaWYgKHJlc2VydmVJZCAhPT0gc3luY01vZGVsLnJlc2VydmVJZCkge1xyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZU9yZGVyKCk7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlT3JkZXIoe1xyXG4gICAgICAgICAgICAgICAgcmVzZXJ2ZUlkLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG59O1xyXG4iXX0=