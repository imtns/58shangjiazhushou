'use strict';

// import { SendClickLog } from '../../utils/maidian.js';
/*eslint-disable */
var app = getApp();

var _require = require('./../../../utils/ajax.js'),
    get = _require.get;

var _require2 = require('./../../../utils/index.js'),
    picSrcDomain = _require2.picSrcDomain;

var loadTelUrl = '/other/encrypt/phone';

module.exports = {
    // sendLogFriend () {
    //     const app = getApp();
    //     const { appid, userid } = app.globalData.extConfig;
    //     // SendClickLog(appid, userid, '{}', 'jz_xcx_call_shareFriend');
    // },
    // sendLogCode () {
    //     const app = getApp();
    //     const { appid, userid } = app.globalData.extConfig;
    //     SendClickLog(appid, userid, '{}', 'jz_xcx_call_shareCode');
    // },
    onMenuFixed: function onMenuFixed(e) {
        var index = e.currentTarget.dataset.index;
        var _page_data = this.data._page_data;

        _page_data[index].props.cfg.showCallMenu = !_page_data[index].props.cfg.showCallMenu;
        this.setData({
            page_data: _page_data
        });
    },
    tabQrcode: function tabQrcode(e) {
        this.sendLogCode();
        var releaseId = getApp().globalData.extConfig.releaseId;

        get('/releaseMpCode/' + releaseId, {
            packing: 'packing'
        }, function (e, res) {
            if (e) return;
            wx.previewImage({
                urls: [picSrcDomain() + res]
            });
        });
    }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhbGwuanMiXSwibmFtZXMiOlsiYXBwIiwiZ2V0QXBwIiwicmVxdWlyZSIsImdldCIsInBpY1NyY0RvbWFpbiIsImxvYWRUZWxVcmwiLCJtb2R1bGUiLCJleHBvcnRzIiwib25NZW51Rml4ZWQiLCJlIiwiaW5kZXgiLCJjdXJyZW50VGFyZ2V0IiwiZGF0YXNldCIsIl9wYWdlX2RhdGEiLCJkYXRhIiwicHJvcHMiLCJjZmciLCJzaG93Q2FsbE1lbnUiLCJzZXREYXRhIiwicGFnZV9kYXRhIiwidGFiUXJjb2RlIiwic2VuZExvZ0NvZGUiLCJyZWxlYXNlSWQiLCJnbG9iYWxEYXRhIiwiZXh0Q29uZmlnIiwicGFja2luZyIsInJlcyIsInd4IiwicHJldmlld0ltYWdlIiwidXJscyJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBO0FBQ0EsSUFBTUEsTUFBTUMsUUFBWjs7ZUFFZ0JDLFFBQVEscUJBQVIsQztJQUFSQyxHLFlBQUFBLEc7O2dCQUNpQkQsUUFBUSxzQkFBUixDO0lBQWpCRSxZLGFBQUFBLFk7O0FBRVIsSUFBTUMsYUFBYSxzQkFBbkI7O0FBRUFDLE9BQU9DLE9BQVAsR0FBaUI7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBQyxlQVhhLHVCQVdEQyxDQVhDLEVBV0U7QUFBQSxZQUNIQyxLQURHLEdBQ09ELEVBQUVFLGFBQUYsQ0FBZ0JDLE9BRHZCLENBQ0hGLEtBREc7QUFBQSxZQUVIRyxVQUZHLEdBRVksS0FBS0MsSUFGakIsQ0FFSEQsVUFGRzs7QUFHWEEsbUJBQVdILEtBQVgsRUFBa0JLLEtBQWxCLENBQXdCQyxHQUF4QixDQUE0QkMsWUFBNUIsR0FBMkMsQ0FBQ0osV0FBV0gsS0FBWCxFQUFrQkssS0FBbEIsQ0FBd0JDLEdBQXhCLENBQTRCQyxZQUF4RTtBQUNBLGFBQUtDLE9BQUwsQ0FBYTtBQUNUQyx1QkFBV047QUFERixTQUFiO0FBR0gsS0FsQlk7QUFtQmJPLGFBbkJhLHFCQW1CSFgsQ0FuQkcsRUFtQkE7QUFDVCxhQUFLWSxXQUFMO0FBRFMsWUFFREMsU0FGQyxHQUVhckIsU0FBU3NCLFVBQVQsQ0FBb0JDLFNBRmpDLENBRURGLFNBRkM7O0FBR1RuQixnQ0FBc0JtQixTQUF0QixFQUFtQztBQUMvQkcscUJBQVM7QUFEc0IsU0FBbkMsRUFFRyxVQUFDaEIsQ0FBRCxFQUFJaUIsR0FBSixFQUFZO0FBQ1gsZ0JBQUlqQixDQUFKLEVBQU87QUFDUGtCLGVBQUdDLFlBQUgsQ0FBZ0I7QUFDWkMsc0JBQU0sQ0FBQ3pCLGlCQUFpQnNCLEdBQWxCO0FBRE0sYUFBaEI7QUFHSCxTQVBEO0FBUUg7QUE5QlksQ0FBakIiLCJmaWxlIjoiY2FsbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGltcG9ydCB7IFNlbmRDbGlja0xvZyB9IGZyb20gJy4uLy4uL3V0aWxzL21haWRpYW4uanMnO1xyXG4vKmVzbGludC1kaXNhYmxlICovXHJcbmNvbnN0IGFwcCA9IGdldEFwcCgpO1xyXG5cclxuY29uc3QgeyBnZXQgfSA9IHJlcXVpcmUoJy4uLy4uLy4uL3V0aWxzL2FqYXgnKTtcclxuY29uc3QgeyBwaWNTcmNEb21haW4gfSA9IHJlcXVpcmUoJy4uLy4uLy4uL3V0aWxzL2luZGV4Jyk7XHJcblxyXG5jb25zdCBsb2FkVGVsVXJsID0gJy9vdGhlci9lbmNyeXB0L3Bob25lJztcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgLy8gc2VuZExvZ0ZyaWVuZCAoKSB7XHJcbiAgICAvLyAgICAgY29uc3QgYXBwID0gZ2V0QXBwKCk7XHJcbiAgICAvLyAgICAgY29uc3QgeyBhcHBpZCwgdXNlcmlkIH0gPSBhcHAuZ2xvYmFsRGF0YS5leHRDb25maWc7XHJcbiAgICAvLyAgICAgLy8gU2VuZENsaWNrTG9nKGFwcGlkLCB1c2VyaWQsICd7fScsICdqel94Y3hfY2FsbF9zaGFyZUZyaWVuZCcpO1xyXG4gICAgLy8gfSxcclxuICAgIC8vIHNlbmRMb2dDb2RlICgpIHtcclxuICAgIC8vICAgICBjb25zdCBhcHAgPSBnZXRBcHAoKTtcclxuICAgIC8vICAgICBjb25zdCB7IGFwcGlkLCB1c2VyaWQgfSA9IGFwcC5nbG9iYWxEYXRhLmV4dENvbmZpZztcclxuICAgIC8vICAgICBTZW5kQ2xpY2tMb2coYXBwaWQsIHVzZXJpZCwgJ3t9JywgJ2p6X3hjeF9jYWxsX3NoYXJlQ29kZScpO1xyXG4gICAgLy8gfSxcclxuICAgIG9uTWVudUZpeGVkKGUpIHtcclxuICAgICAgICBjb25zdCB7IGluZGV4IH0gPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldDtcclxuICAgICAgICBjb25zdCB7IF9wYWdlX2RhdGEgfSA9IHRoaXMuZGF0YTtcclxuICAgICAgICBfcGFnZV9kYXRhW2luZGV4XS5wcm9wcy5jZmcuc2hvd0NhbGxNZW51ID0gIV9wYWdlX2RhdGFbaW5kZXhdLnByb3BzLmNmZy5zaG93Q2FsbE1lbnU7XHJcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgcGFnZV9kYXRhOiBfcGFnZV9kYXRhLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIHRhYlFyY29kZShlKSB7XHJcbiAgICAgICAgdGhpcy5zZW5kTG9nQ29kZSgpO1xyXG4gICAgICAgIGNvbnN0IHsgcmVsZWFzZUlkIH0gPSBnZXRBcHAoKS5nbG9iYWxEYXRhLmV4dENvbmZpZztcclxuICAgICAgICBnZXQoYC9yZWxlYXNlTXBDb2RlLyR7cmVsZWFzZUlkfWAsIHtcclxuICAgICAgICAgICAgcGFja2luZzogJ3BhY2tpbmcnLFxyXG4gICAgICAgIH0sIChlLCByZXMpID0+IHtcclxuICAgICAgICAgICAgaWYgKGUpIHJldHVybjtcclxuICAgICAgICAgICAgd3gucHJldmlld0ltYWdlKHtcclxuICAgICAgICAgICAgICAgIHVybHM6IFtwaWNTcmNEb21haW4oKSArIHJlc10sXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxufTtcclxuIl19