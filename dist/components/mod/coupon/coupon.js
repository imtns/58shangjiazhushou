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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvdXBvbi5qcyJdLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnRzIiwic2VuZExvZyIsInJlY2VpdmVDb3Vwb24iLCJlIiwiY291cG9uSWQiLCJjdXJyZW50VGFyZ2V0IiwiZGF0YXNldCIsImNvdXBvbmlkIiwiZXIiLCJ3eCIsInNob3dNb2RhbCIsInNob3dDYW5jZWwiLCJ0aXRsZSIsImNvbnRlbnQiXSwibWFwcGluZ3MiOiI7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBRUFBLE9BQU9DLE9BQVAsR0FBaUI7QUFDYkMsV0FEYSxxQkFDRjtBQUNQO0FBQ0E7QUFDQTtBQUNILEtBTFk7QUFNYkMsaUJBTmEseUJBTUNDLENBTkQsRUFNSTtBQUNiLGFBQUtGLE9BQUw7QUFDQSxZQUFNRyxXQUFXRCxFQUFFRSxhQUFGLENBQWdCQyxPQUFoQixDQUF3QkMsUUFBekM7QUFDQSx3QkFBSyxtQ0FBTCxFQUEwQyxFQUFFSCxrQkFBRixFQUExQyxFQUF3RCxVQUFDSSxFQUFELEVBQVE7QUFDNUQsZ0JBQUlBLEVBQUosRUFBUTtBQUNKLGtDQUFNQSxFQUFOO0FBQ0E7QUFDSDtBQUNEQyxlQUFHQyxTQUFILENBQWE7QUFDVEMsNEJBQVksS0FESDtBQUVUQyx1QkFBTyxFQUZFO0FBR1RDLHlCQUFTO0FBSEEsYUFBYjtBQUtILFNBVkQsRUFVRyxJQVZIO0FBV0g7QUFwQlksQ0FBakIiLCJmaWxlIjoiY291cG9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcG9zdCB9IGZyb20gJy4uLy4uLy4uL3V0aWxzL2FqYXgnO1xuaW1wb3J0IHsgdG9hc3QgfSBmcm9tICcuLi8uLi8uLi91dGlscy9pbmRleCc7XG4vLyBpbXBvcnQgeyBTZW5kQ2xpY2tMb2cgfSBmcm9tICcuLi8uLi91dGlscy9tYWlkaWFuLmpzJztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgc2VuZExvZyAoKSB7XG4gICAgICAgIC8vIGNvbnN0IGFwcCA9IGdldEFwcCgpO1xuICAgICAgICAvLyBjb25zdCB7IGFwcGlkLCB1c2VyaWQgfSA9IGFwcC5nbG9iYWxEYXRhLmV4dENvbmZpZztcbiAgICAgICAgLy8gU2VuZENsaWNrTG9nKGFwcGlkLCB1c2VyaWQsICd7fScsICdqel94Y3hfY291cG9uX3JlY2VpdmUnKTtcbiAgICB9LFxuICAgIHJlY2VpdmVDb3Vwb24oZSkge1xuICAgICAgICB0aGlzLnNlbmRMb2coKTtcbiAgICAgICAgY29uc3QgY291cG9uSWQgPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5jb3Vwb25pZDtcbiAgICAgICAgcG9zdCgnL2J1c2luZXNzQ291cG9uL2NvbnN1bWVyR2V0Q291cG9uJywgeyBjb3Vwb25JZCB9LCAoZXIpID0+IHtcbiAgICAgICAgICAgIGlmIChlcikge1xuICAgICAgICAgICAgICAgIHRvYXN0KGVyKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICAgIHNob3dDYW5jZWw6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHRpdGxlOiAnJyxcbiAgICAgICAgICAgICAgICBjb250ZW50OiAn5LyY5oOg5Yi46aKG5Y+W5oiQ5YqfJyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LCB0cnVlKTtcbiAgICB9LFxufTtcbiJdfQ==