'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var app = require('./../../../utils/globalData.js');

exports.default = {
    switchTab: function switchTab(e) {
        var pageType = this.data.pageType; // 当前的pageType

        var item = e.currentTarget.dataset.item;
        var pageKey = item.pageKey,
            route = item.pagePath; // 要切换的pageKey

        // 切换到当前页，则不做操作

        if (pageType === pageKey) {
            return;
        }

        this.route = route;

        if (app.globalData.tabMode === 1) {
            /**
             * 重定向版本的tabbar
             */
            wx.redirectTo({
                url: '/' + route // switchTab需要加上前面的 /
            });
        } else {
            /**
             * 当前页面渲染的tabbar
             */
            this.loadData(function () {
                wx.pageScrollTo({
                    scrollTop: 0,
                    duration: 0
                });
            });
        }
    }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRhYkJhci5qcyJdLCJuYW1lcyI6WyJhcHAiLCJyZXF1aXJlIiwic3dpdGNoVGFiIiwiZSIsInBhZ2VUeXBlIiwiZGF0YSIsIml0ZW0iLCJjdXJyZW50VGFyZ2V0IiwiZGF0YXNldCIsInBhZ2VLZXkiLCJyb3V0ZSIsInBhZ2VQYXRoIiwiZ2xvYmFsRGF0YSIsInRhYk1vZGUiLCJ3eCIsInJlZGlyZWN0VG8iLCJ1cmwiLCJsb2FkRGF0YSIsInBhZ2VTY3JvbGxUbyIsInNjcm9sbFRvcCIsImR1cmF0aW9uIl0sIm1hcHBpbmdzIjoiOzs7OztBQUFBLElBQU1BLE1BQU1DLFFBQVEsMkJBQVIsQ0FBWjs7a0JBRWU7QUFDWEMsYUFEVyxxQkFDREMsQ0FEQyxFQUNFO0FBQUEsWUFDREMsUUFEQyxHQUNZLEtBQUtDLElBRGpCLENBQ0RELFFBREMsRUFDdUI7O0FBRHZCLFlBRURFLElBRkMsR0FFUUgsRUFBRUksYUFBRixDQUFnQkMsT0FGeEIsQ0FFREYsSUFGQztBQUFBLFlBR0RHLE9BSEMsR0FHNEJILElBSDVCLENBR0RHLE9BSEM7QUFBQSxZQUdrQkMsS0FIbEIsR0FHNEJKLElBSDVCLENBR1FLLFFBSFIsRUFHa0M7O0FBRTNDOztBQUNBLFlBQUlQLGFBQWFLLE9BQWpCLEVBQTBCO0FBQ3RCO0FBQ0g7O0FBRUQsYUFBS0MsS0FBTCxHQUFhQSxLQUFiOztBQUVBLFlBQUlWLElBQUlZLFVBQUosQ0FBZUMsT0FBZixLQUEyQixDQUEvQixFQUFrQztBQUM5Qjs7O0FBR0FDLGVBQUdDLFVBQUgsQ0FBYztBQUNWQywyQkFBU04sS0FEQyxDQUNRO0FBRFIsYUFBZDtBQUdILFNBUEQsTUFPTztBQUNIOzs7QUFHQSxpQkFBS08sUUFBTCxDQUFjLFlBQU07QUFDaEJILG1CQUFHSSxZQUFILENBQWdCO0FBQ1pDLCtCQUFXLENBREM7QUFFWkMsOEJBQVU7QUFGRSxpQkFBaEI7QUFJSCxhQUxEO0FBTUg7QUFDSjtBQS9CVSxDIiwiZmlsZSI6InRhYkJhci5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGFwcCA9IHJlcXVpcmUoJy4uLy4uLy4uL3V0aWxzL2dsb2JhbERhdGEnKTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIHN3aXRjaFRhYihlKSB7XG4gICAgICAgIGNvbnN0IHsgcGFnZVR5cGUgfSA9IHRoaXMuZGF0YTsgLy8g5b2T5YmN55qEcGFnZVR5cGVcbiAgICAgICAgY29uc3QgeyBpdGVtIH0gPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldDtcbiAgICAgICAgY29uc3QgeyBwYWdlS2V5LCBwYWdlUGF0aDogcm91dGUgfSA9IGl0ZW07IC8vIOimgeWIh+aNoueahHBhZ2VLZXlcblxuICAgICAgICAvLyDliIfmjaLliLDlvZPliY3pobXvvIzliJnkuI3lgZrmk43kvZxcbiAgICAgICAgaWYgKHBhZ2VUeXBlID09PSBwYWdlS2V5KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJvdXRlID0gcm91dGU7XG5cbiAgICAgICAgaWYgKGFwcC5nbG9iYWxEYXRhLnRhYk1vZGUgPT09IDEpIHtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICog6YeN5a6a5ZCR54mI5pys55qEdGFiYmFyXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHd4LnJlZGlyZWN0VG8oe1xuICAgICAgICAgICAgICAgIHVybDogYC8ke3JvdXRlfWAsIC8vIHN3aXRjaFRhYumcgOimgeWKoOS4iuWJjemdoueahCAvXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICog5b2T5YmN6aG16Z2i5riy5p+T55qEdGFiYmFyXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHRoaXMubG9hZERhdGEoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHd4LnBhZ2VTY3JvbGxUbyh7XG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogMCxcbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDAsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0sXG59O1xuIl19