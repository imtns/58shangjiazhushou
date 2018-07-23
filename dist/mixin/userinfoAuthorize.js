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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVzZXJpbmZvQXV0aG9yaXplLmpzIl0sIm5hbWVzIjpbInJlcXVpcmUiLCJ0b2FzdCIsImFwcCIsIm1vZHVsZSIsImV4cG9ydHMiLCJiaW5kR2V0VXNlckluZm8iLCJlIiwiZGV0YWlsIiwiZXJyTXNnIiwid3giLCJzZXRTdG9yYWdlU3luYyIsIk9iamVjdCIsImFzc2lnbiIsImdsb2JhbERhdGEiLCJvblBhZ2VSZWFkeSIsInNldERhdGEiLCJzaG93VXNlcmluZm9BdXRob3JpemUiXSwibWFwcGluZ3MiOiI7Ozs7ZUFBa0JBLFFBQVEsZ0JBQVIsQztJQUFWQyxLLFlBQUFBLEs7O0FBQ1IsSUFBTUMsTUFBTUYsUUFBUSxxQkFBUixDQUFaOztBQUVBRyxPQUFPQyxPQUFQLEdBQWlCO0FBQ2JDLG1CQURhLDJCQUNHQyxDQURILEVBQ007QUFDZjtBQUNBLFlBQUlBLEVBQUVDLE1BQUYsQ0FBU0MsTUFBVCxLQUFvQixnQkFBeEIsRUFBMEM7QUFDdEM7QUFDQTtBQUNBO0FBQ0FDLGVBQUdDLGNBQUgsQ0FBa0IsYUFBbEIsRUFBaUNKLEVBQUVDLE1BQW5DO0FBQ0FJLG1CQUFPQyxNQUFQLENBQWNWLElBQUlXLFVBQWxCLGVBQ09QLEVBQUVDLE1BRFQ7QUFHQSxpQkFBS08sV0FBTDtBQUNILFNBVEQsTUFTTztBQUNIYixrQkFBTUssRUFBRUMsTUFBRixDQUFTQyxNQUFmO0FBQ0g7QUFDRCxhQUFLTyxPQUFMLENBQWE7QUFDVEMsbUNBQXVCO0FBRGQsU0FBYjtBQUdIO0FBbEJZLENBQWpCIiwiZmlsZSI6InVzZXJpbmZvQXV0aG9yaXplLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgeyB0b2FzdCB9ID0gcmVxdWlyZSgnLi4vdXRpbHMvaW5kZXgnKTtcclxuY29uc3QgYXBwID0gcmVxdWlyZSgnLi4vdXRpbHMvZ2xvYmFsRGF0YScpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICBiaW5kR2V0VXNlckluZm8oZSkge1xyXG4gICAgICAgIC8vIGNvbnN0IGFwcCA9IGdldEFwcCgpO1xyXG4gICAgICAgIGlmIChlLmRldGFpbC5lcnJNc2cgPT09ICdnZXRVc2VySW5mbzpvaycpIHtcclxuICAgICAgICAgICAgLy8gY29uc3Qge1xyXG4gICAgICAgICAgICAvLyAgICAgdXNlckluZm8sIHJhd0RhdGEsIHNpZ25hdHVyZSwgZW5jcnlwdGVkRGF0YSwgaXYsXHJcbiAgICAgICAgICAgIC8vIH0gPSBlLmRldGFpbDtcclxuICAgICAgICAgICAgd3guc2V0U3RvcmFnZVN5bmMoJ2dldFVzZXJJbmZvJywgZS5kZXRhaWwpO1xyXG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGFwcC5nbG9iYWxEYXRhLCB7XHJcbiAgICAgICAgICAgICAgICAuLi5lLmRldGFpbCxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMub25QYWdlUmVhZHkoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0b2FzdChlLmRldGFpbC5lcnJNc2cpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICBzaG93VXNlcmluZm9BdXRob3JpemU6IGZhbHNlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxufTtcclxuIl19