'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _require = require('./../utils/index.js'),
    toast = _require.toast;

var app = require('./../utils/globalData.js');

module.exports = {
    bindGetUserInfo: function bindGetUserInfo(e) {
        // const app = getApp();
        if (e.detail.errMsg === 'getUserInfo:ok') {
            // const {
            //     userInfo, rawData, signature, encryptedData, iv,
            // } = e.detail;
            wx.setStorageSync('getUserInfo', e.detail);
            Object.assign(app.globalData, _extends({}, e.detail));
            this.onPageReady();
        } else {
            toast(e.detail.errMsg);
        }
        this.setData({
            showUserinfoAuthorize: false
        });
    }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVzZXJpbmZvQXV0aG9yaXplLmpzIl0sIm5hbWVzIjpbInJlcXVpcmUiLCJ0b2FzdCIsImFwcCIsIm1vZHVsZSIsImV4cG9ydHMiLCJiaW5kR2V0VXNlckluZm8iLCJlIiwiZGV0YWlsIiwiZXJyTXNnIiwid3giLCJzZXRTdG9yYWdlU3luYyIsIk9iamVjdCIsImFzc2lnbiIsImdsb2JhbERhdGEiLCJvblBhZ2VSZWFkeSIsInNldERhdGEiLCJzaG93VXNlcmluZm9BdXRob3JpemUiXSwibWFwcGluZ3MiOiI7Ozs7ZUFBa0JBLFFBQVEsZ0JBQVIsQztJQUFWQyxLLFlBQUFBLEs7O0FBQ1IsSUFBTUMsTUFBTUYsUUFBUSxxQkFBUixDQUFaOztBQUVBRyxPQUFPQyxPQUFQLEdBQWlCO0FBQ2JDLG1CQURhLDJCQUNHQyxDQURILEVBQ007QUFDZjtBQUNBLFlBQUlBLEVBQUVDLE1BQUYsQ0FBU0MsTUFBVCxLQUFvQixnQkFBeEIsRUFBMEM7QUFDdEM7QUFDQTtBQUNBO0FBQ0FDLGVBQUdDLGNBQUgsQ0FBa0IsYUFBbEIsRUFBaUNKLEVBQUVDLE1BQW5DO0FBQ0FJLG1CQUFPQyxNQUFQLENBQWNWLElBQUlXLFVBQWxCLGVBQ09QLEVBQUVDLE1BRFQ7QUFHQSxpQkFBS08sV0FBTDtBQUNILFNBVEQsTUFTTztBQUNIYixrQkFBTUssRUFBRUMsTUFBRixDQUFTQyxNQUFmO0FBQ0g7QUFDRCxhQUFLTyxPQUFMLENBQWE7QUFDVEMsbUNBQXVCO0FBRGQsU0FBYjtBQUdIO0FBbEJZLENBQWpCIiwiZmlsZSI6InVzZXJpbmZvQXV0aG9yaXplLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgeyB0b2FzdCB9ID0gcmVxdWlyZSgnLi4vdXRpbHMvaW5kZXgnKTtcbmNvbnN0IGFwcCA9IHJlcXVpcmUoJy4uL3V0aWxzL2dsb2JhbERhdGEnKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgYmluZEdldFVzZXJJbmZvKGUpIHtcbiAgICAgICAgLy8gY29uc3QgYXBwID0gZ2V0QXBwKCk7XG4gICAgICAgIGlmIChlLmRldGFpbC5lcnJNc2cgPT09ICdnZXRVc2VySW5mbzpvaycpIHtcbiAgICAgICAgICAgIC8vIGNvbnN0IHtcbiAgICAgICAgICAgIC8vICAgICB1c2VySW5mbywgcmF3RGF0YSwgc2lnbmF0dXJlLCBlbmNyeXB0ZWREYXRhLCBpdixcbiAgICAgICAgICAgIC8vIH0gPSBlLmRldGFpbDtcbiAgICAgICAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKCdnZXRVc2VySW5mbycsIGUuZGV0YWlsKTtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oYXBwLmdsb2JhbERhdGEsIHtcbiAgICAgICAgICAgICAgICAuLi5lLmRldGFpbCxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5vblBhZ2VSZWFkeSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdG9hc3QoZS5kZXRhaWwuZXJyTXNnKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgICAgc2hvd1VzZXJpbmZvQXV0aG9yaXplOiBmYWxzZSxcbiAgICAgICAgfSk7XG4gICAgfSxcbn07XG4iXX0=