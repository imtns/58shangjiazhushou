'use strict';

// 输入页面支持关键字和全路径
// 关键字：news
// 全路径:/pages/index/index
/* eslint-disable */

var app = require('./globalData.js');

module.exports = function switchTab(url) {
    // const app = getApp();
    var path = '';
    // 严格校验globalData到list的取值
    var list = app.globalData.tabBar && app.globalData.tabBar.list || [];
    var env58 = app.globalData.env58;
    // 获取页面关键字

    var pageKey = url.split('/').pop();
    if (list.some(function (item) {
        return item.pagePath.includes(pageKey);
    })) {
        path = '/pages/' + pageKey + '/' + pageKey;
        // navigate = env58 ? wx.redirectTo : wx.switchTab;
    } else {
        path = '/pages/custom/custom?ptype=' + pageKey;
    }
    app.globalData.pageData = {};
    wx.redirectTo({
        url: path
    });
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN3aXRjaFRhYi5qcyJdLCJuYW1lcyI6WyJhcHAiLCJyZXF1aXJlIiwibW9kdWxlIiwiZXhwb3J0cyIsInN3aXRjaFRhYiIsInVybCIsInBhdGgiLCJsaXN0IiwiZ2xvYmFsRGF0YSIsInRhYkJhciIsImVudjU4IiwicGFnZUtleSIsInNwbGl0IiwicG9wIiwic29tZSIsIml0ZW0iLCJwYWdlUGF0aCIsImluY2x1ZGVzIiwicGFnZURhdGEiLCJ3eCIsInJlZGlyZWN0VG8iXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsSUFBTUEsTUFBTUMsUUFBUSxxQkFBUixDQUFaOztBQUVBQyxPQUFPQyxPQUFQLEdBQWlCLFNBQVNDLFNBQVQsQ0FBbUJDLEdBQW5CLEVBQXdCO0FBQ3JDO0FBQ0EsUUFBSUMsT0FBTyxFQUFYO0FBQ0E7QUFDQSxRQUFNQyxPQUFPUCxJQUFJUSxVQUFKLENBQWVDLE1BQWYsSUFBeUJULElBQUlRLFVBQUosQ0FBZUMsTUFBZixDQUFzQkYsSUFBL0MsSUFBdUQsRUFBcEU7QUFKcUMsUUFLN0JHLEtBTDZCLEdBS25CVixJQUFJUSxVQUxlLENBSzdCRSxLQUw2QjtBQU1yQzs7QUFDQSxRQUFNQyxVQUFVTixJQUFJTyxLQUFKLENBQVUsR0FBVixFQUFlQyxHQUFmLEVBQWhCO0FBQ0EsUUFBSU4sS0FBS08sSUFBTCxDQUFVO0FBQUEsZUFBUUMsS0FBS0MsUUFBTCxDQUFjQyxRQUFkLENBQXVCTixPQUF2QixDQUFSO0FBQUEsS0FBVixDQUFKLEVBQXdEO0FBQ3BETCwyQkFBaUJLLE9BQWpCLFNBQTRCQSxPQUE1QjtBQUNEO0FBQ0YsS0FIRCxNQUdPO0FBQ0hMLCtDQUFxQ0ssT0FBckM7QUFDSDtBQUNEWCxRQUFJUSxVQUFKLENBQWVVLFFBQWYsR0FBMEIsRUFBMUI7QUFDQUMsT0FBR0MsVUFBSCxDQUFjO0FBQ1ZmLGFBQUtDO0FBREssS0FBZDtBQUdILENBbEJEIiwiZmlsZSI6InN3aXRjaFRhYi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIOi+k+WFpemhtemdouaUr+aMgeWFs+mUruWtl+WSjOWFqOi3r+W+hFxyXG4vLyDlhbPplK7lrZfvvJpuZXdzXHJcbi8vIOWFqOi3r+W+hDovcGFnZXMvaW5kZXgvaW5kZXhcclxuLyogZXNsaW50LWRpc2FibGUgKi9cclxuXHJcbmNvbnN0IGFwcCA9IHJlcXVpcmUoJy4uL3V0aWxzL2dsb2JhbERhdGEnKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc3dpdGNoVGFiKHVybCkge1xyXG4gICAgLy8gY29uc3QgYXBwID0gZ2V0QXBwKCk7XHJcbiAgICBsZXQgcGF0aCA9ICcnO1xyXG4gICAgLy8g5Lil5qC85qCh6aqMZ2xvYmFsRGF0YeWIsGxpc3TnmoTlj5blgLxcclxuICAgIGNvbnN0IGxpc3QgPSBhcHAuZ2xvYmFsRGF0YS50YWJCYXIgJiYgYXBwLmdsb2JhbERhdGEudGFiQmFyLmxpc3QgfHwgW107XHJcbiAgICBjb25zdCB7IGVudjU4IH0gPSBhcHAuZ2xvYmFsRGF0YTtcclxuICAgIC8vIOiOt+WPlumhtemdouWFs+mUruWtl1xyXG4gICAgY29uc3QgcGFnZUtleSA9IHVybC5zcGxpdCgnLycpLnBvcCgpO1xyXG4gICAgaWYgKGxpc3Quc29tZShpdGVtID0+IGl0ZW0ucGFnZVBhdGguaW5jbHVkZXMocGFnZUtleSkpKSB7XHJcbiAgICAgICAgcGF0aCA9IGAvcGFnZXMvJHtwYWdlS2V5fS8ke3BhZ2VLZXl9YDtcclxuICAgICAgIC8vIG5hdmlnYXRlID0gZW52NTggPyB3eC5yZWRpcmVjdFRvIDogd3guc3dpdGNoVGFiO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBwYXRoID0gYC9wYWdlcy9jdXN0b20vY3VzdG9tP3B0eXBlPSR7cGFnZUtleX1gO1xyXG4gICAgfVxyXG4gICAgYXBwLmdsb2JhbERhdGEucGFnZURhdGEgPSB7fTtcclxuICAgIHd4LnJlZGlyZWN0VG8oe1xyXG4gICAgICAgIHVybDogcGF0aCxcclxuICAgIH0pXHJcbn07XHJcbiJdfQ==