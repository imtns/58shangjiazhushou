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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRhYkJhci5qcyJdLCJuYW1lcyI6WyJhcHAiLCJyZXF1aXJlIiwic3dpdGNoVGFiIiwiZSIsInBhZ2VUeXBlIiwiZGF0YSIsIml0ZW0iLCJjdXJyZW50VGFyZ2V0IiwiZGF0YXNldCIsInBhZ2VLZXkiLCJyb3V0ZSIsInBhZ2VQYXRoIiwiZ2xvYmFsRGF0YSIsInRhYk1vZGUiLCJ3eCIsInJlZGlyZWN0VG8iLCJ1cmwiLCJsb2FkRGF0YSIsInBhZ2VTY3JvbGxUbyIsInNjcm9sbFRvcCIsImR1cmF0aW9uIl0sIm1hcHBpbmdzIjoiOzs7OztBQUFBLElBQU1BLE1BQU1DLFFBQVEsMkJBQVIsQ0FBWjs7a0JBRWU7QUFDWEMsYUFEVyxxQkFDREMsQ0FEQyxFQUNFO0FBQUEsWUFDREMsUUFEQyxHQUNZLEtBQUtDLElBRGpCLENBQ0RELFFBREMsRUFDdUI7O0FBRHZCLFlBRURFLElBRkMsR0FFUUgsRUFBRUksYUFBRixDQUFnQkMsT0FGeEIsQ0FFREYsSUFGQztBQUFBLFlBR0RHLE9BSEMsR0FHNEJILElBSDVCLENBR0RHLE9BSEM7QUFBQSxZQUdrQkMsS0FIbEIsR0FHNEJKLElBSDVCLENBR1FLLFFBSFIsRUFHa0M7O0FBRTNDOztBQUNBLFlBQUlQLGFBQWFLLE9BQWpCLEVBQTBCO0FBQ3RCO0FBQ0g7O0FBRUQsYUFBS0MsS0FBTCxHQUFhQSxLQUFiOztBQUVBLFlBQUlWLElBQUlZLFVBQUosQ0FBZUMsT0FBZixLQUEyQixDQUEvQixFQUFrQztBQUM5Qjs7O0FBR0FDLGVBQUdDLFVBQUgsQ0FBYztBQUNWQywyQkFBU04sS0FEQyxDQUNRO0FBRFIsYUFBZDtBQUdILFNBUEQsTUFPTztBQUNIOzs7QUFHQSxpQkFBS08sUUFBTCxDQUFjLFlBQU07QUFDaEJILG1CQUFHSSxZQUFILENBQWdCO0FBQ1pDLCtCQUFXLENBREM7QUFFWkMsOEJBQVU7QUFGRSxpQkFBaEI7QUFJSCxhQUxEO0FBTUg7QUFDSjtBQS9CVSxDIiwiZmlsZSI6InRhYkJhci5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGFwcCA9IHJlcXVpcmUoJy4uLy4uLy4uL3V0aWxzL2dsb2JhbERhdGEnKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAgIHN3aXRjaFRhYihlKSB7XHJcbiAgICAgICAgY29uc3QgeyBwYWdlVHlwZSB9ID0gdGhpcy5kYXRhOyAvLyDlvZPliY3nmoRwYWdlVHlwZVxyXG4gICAgICAgIGNvbnN0IHsgaXRlbSB9ID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQ7XHJcbiAgICAgICAgY29uc3QgeyBwYWdlS2V5LCBwYWdlUGF0aDogcm91dGUgfSA9IGl0ZW07IC8vIOimgeWIh+aNoueahHBhZ2VLZXlcclxuXHJcbiAgICAgICAgLy8g5YiH5o2i5Yiw5b2T5YmN6aG177yM5YiZ5LiN5YGa5pON5L2cXHJcbiAgICAgICAgaWYgKHBhZ2VUeXBlID09PSBwYWdlS2V5KSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMucm91dGUgPSByb3V0ZTtcclxuXHJcbiAgICAgICAgaWYgKGFwcC5nbG9iYWxEYXRhLnRhYk1vZGUgPT09IDEpIHtcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIOmHjeWumuWQkeeJiOacrOeahHRhYmJhclxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgd3gucmVkaXJlY3RUbyh7XHJcbiAgICAgICAgICAgICAgICB1cmw6IGAvJHtyb3V0ZX1gLCAvLyBzd2l0Y2hUYWLpnIDopoHliqDkuIrliY3pnaLnmoQgL1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICog5b2T5YmN6aG16Z2i5riy5p+T55qEdGFiYmFyXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICB0aGlzLmxvYWREYXRhKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHd4LnBhZ2VTY3JvbGxUbyh7XHJcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAwLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbn07XHJcbiJdfQ==