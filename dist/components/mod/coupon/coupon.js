'use strict';

var _ajax = require('./../../../utils/ajax.js');

var _index = require('./../../../utils/index.js');

// import { SendClickLog } from '../../utils/maidian.js';

module.exports = {
    sendLog: function sendLog() {
        // const app = getApp();
        // const { appid, userid } = app.globalData.extConfig;
        // SendClickLog(appid, userid, '{}', 'jz_xcx_coupon_receive');
    },
    receiveCoupon: function receiveCoupon(e) {
        this.sendLog();
        var couponId = e.currentTarget.dataset.couponid;
        (0, _ajax.post)('/businessCoupon/consumerGetCoupon', { couponId: couponId }, function (er) {
            if (er) {
                (0, _index.toast)(er);
                return;
            }
            wx.showModal({
                showCancel: false,
                title: '',
                content: '优惠券领取成功'
            });
        }, true);
    }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvdXBvbi5qcyJdLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnRzIiwic2VuZExvZyIsInJlY2VpdmVDb3Vwb24iLCJlIiwiY291cG9uSWQiLCJjdXJyZW50VGFyZ2V0IiwiZGF0YXNldCIsImNvdXBvbmlkIiwiZXIiLCJ3eCIsInNob3dNb2RhbCIsInNob3dDYW5jZWwiLCJ0aXRsZSIsImNvbnRlbnQiXSwibWFwcGluZ3MiOiI7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBRUFBLE9BQU9DLE9BQVAsR0FBaUI7QUFDYkMsV0FEYSxxQkFDRjtBQUNQO0FBQ0E7QUFDQTtBQUNILEtBTFk7QUFNYkMsaUJBTmEseUJBTUNDLENBTkQsRUFNSTtBQUNiLGFBQUtGLE9BQUw7QUFDQSxZQUFNRyxXQUFXRCxFQUFFRSxhQUFGLENBQWdCQyxPQUFoQixDQUF3QkMsUUFBekM7QUFDQSx3QkFBSyxtQ0FBTCxFQUEwQyxFQUFFSCxrQkFBRixFQUExQyxFQUF3RCxVQUFDSSxFQUFELEVBQVE7QUFDNUQsZ0JBQUlBLEVBQUosRUFBUTtBQUNKLGtDQUFNQSxFQUFOO0FBQ0E7QUFDSDtBQUNEQyxlQUFHQyxTQUFILENBQWE7QUFDVEMsNEJBQVksS0FESDtBQUVUQyx1QkFBTyxFQUZFO0FBR1RDLHlCQUFTO0FBSEEsYUFBYjtBQUtILFNBVkQsRUFVRyxJQVZIO0FBV0g7QUFwQlksQ0FBakIiLCJmaWxlIjoiY291cG9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcG9zdCB9IGZyb20gJy4uLy4uLy4uL3V0aWxzL2FqYXgnO1xyXG5pbXBvcnQgeyB0b2FzdCB9IGZyb20gJy4uLy4uLy4uL3V0aWxzL2luZGV4JztcclxuLy8gaW1wb3J0IHsgU2VuZENsaWNrTG9nIH0gZnJvbSAnLi4vLi4vdXRpbHMvbWFpZGlhbi5qcyc7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIHNlbmRMb2cgKCkge1xyXG4gICAgICAgIC8vIGNvbnN0IGFwcCA9IGdldEFwcCgpO1xyXG4gICAgICAgIC8vIGNvbnN0IHsgYXBwaWQsIHVzZXJpZCB9ID0gYXBwLmdsb2JhbERhdGEuZXh0Q29uZmlnO1xyXG4gICAgICAgIC8vIFNlbmRDbGlja0xvZyhhcHBpZCwgdXNlcmlkLCAne30nLCAnanpfeGN4X2NvdXBvbl9yZWNlaXZlJyk7XHJcbiAgICB9LFxyXG4gICAgcmVjZWl2ZUNvdXBvbihlKSB7XHJcbiAgICAgICAgdGhpcy5zZW5kTG9nKCk7XHJcbiAgICAgICAgY29uc3QgY291cG9uSWQgPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5jb3Vwb25pZDtcclxuICAgICAgICBwb3N0KCcvYnVzaW5lc3NDb3Vwb24vY29uc3VtZXJHZXRDb3Vwb24nLCB7IGNvdXBvbklkIH0sIChlcikgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZXIpIHtcclxuICAgICAgICAgICAgICAgIHRvYXN0KGVyKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB3eC5zaG93TW9kYWwoe1xyXG4gICAgICAgICAgICAgICAgc2hvd0NhbmNlbDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICB0aXRsZTogJycsXHJcbiAgICAgICAgICAgICAgICBjb250ZW50OiAn5LyY5oOg5Yi46aKG5Y+W5oiQ5YqfJyxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSwgdHJ1ZSk7XHJcbiAgICB9LFxyXG59O1xyXG4iXX0=