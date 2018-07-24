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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN3aXRjaFRhYi5qcyJdLCJuYW1lcyI6WyJhcHAiLCJyZXF1aXJlIiwibW9kdWxlIiwiZXhwb3J0cyIsInN3aXRjaFRhYiIsInVybCIsInBhdGgiLCJsaXN0IiwiZ2xvYmFsRGF0YSIsInRhYkJhciIsImVudjU4IiwicGFnZUtleSIsInNwbGl0IiwicG9wIiwic29tZSIsIml0ZW0iLCJwYWdlUGF0aCIsImluY2x1ZGVzIiwicGFnZURhdGEiLCJ3eCIsInJlZGlyZWN0VG8iXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsSUFBTUEsTUFBTUMsUUFBUSxxQkFBUixDQUFaOztBQUVBQyxPQUFPQyxPQUFQLEdBQWlCLFNBQVNDLFNBQVQsQ0FBbUJDLEdBQW5CLEVBQXdCO0FBQ3JDO0FBQ0EsUUFBSUMsT0FBTyxFQUFYO0FBQ0E7QUFDQSxRQUFNQyxPQUFPUCxJQUFJUSxVQUFKLENBQWVDLE1BQWYsSUFBeUJULElBQUlRLFVBQUosQ0FBZUMsTUFBZixDQUFzQkYsSUFBL0MsSUFBdUQsRUFBcEU7QUFKcUMsUUFLN0JHLEtBTDZCLEdBS25CVixJQUFJUSxVQUxlLENBSzdCRSxLQUw2QjtBQU1yQzs7QUFDQSxRQUFNQyxVQUFVTixJQUFJTyxLQUFKLENBQVUsR0FBVixFQUFlQyxHQUFmLEVBQWhCO0FBQ0EsUUFBSU4sS0FBS08sSUFBTCxDQUFVO0FBQUEsZUFBUUMsS0FBS0MsUUFBTCxDQUFjQyxRQUFkLENBQXVCTixPQUF2QixDQUFSO0FBQUEsS0FBVixDQUFKLEVBQXdEO0FBQ3BETCwyQkFBaUJLLE9BQWpCLFNBQTRCQSxPQUE1QjtBQUNEO0FBQ0YsS0FIRCxNQUdPO0FBQ0hMLCtDQUFxQ0ssT0FBckM7QUFDSDtBQUNEWCxRQUFJUSxVQUFKLENBQWVVLFFBQWYsR0FBMEIsRUFBMUI7QUFDQUMsT0FBR0MsVUFBSCxDQUFjO0FBQ1ZmLGFBQUtDO0FBREssS0FBZDtBQUdILENBbEJEIiwiZmlsZSI6InN3aXRjaFRhYi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIOi+k+WFpemhtemdouaUr+aMgeWFs+mUruWtl+WSjOWFqOi3r+W+hFxuLy8g5YWz6ZSu5a2X77yabmV3c1xuLy8g5YWo6Lev5b6EOi9wYWdlcy9pbmRleC9pbmRleFxuLyogZXNsaW50LWRpc2FibGUgKi9cblxuY29uc3QgYXBwID0gcmVxdWlyZSgnLi4vdXRpbHMvZ2xvYmFsRGF0YScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHN3aXRjaFRhYih1cmwpIHtcbiAgICAvLyBjb25zdCBhcHAgPSBnZXRBcHAoKTtcbiAgICBsZXQgcGF0aCA9ICcnO1xuICAgIC8vIOS4peagvOagoemqjGdsb2JhbERhdGHliLBsaXN055qE5Y+W5YC8XG4gICAgY29uc3QgbGlzdCA9IGFwcC5nbG9iYWxEYXRhLnRhYkJhciAmJiBhcHAuZ2xvYmFsRGF0YS50YWJCYXIubGlzdCB8fCBbXTtcbiAgICBjb25zdCB7IGVudjU4IH0gPSBhcHAuZ2xvYmFsRGF0YTtcbiAgICAvLyDojrflj5bpobXpnaLlhbPplK7lrZdcbiAgICBjb25zdCBwYWdlS2V5ID0gdXJsLnNwbGl0KCcvJykucG9wKCk7XG4gICAgaWYgKGxpc3Quc29tZShpdGVtID0+IGl0ZW0ucGFnZVBhdGguaW5jbHVkZXMocGFnZUtleSkpKSB7XG4gICAgICAgIHBhdGggPSBgL3BhZ2VzLyR7cGFnZUtleX0vJHtwYWdlS2V5fWA7XG4gICAgICAgLy8gbmF2aWdhdGUgPSBlbnY1OCA/IHd4LnJlZGlyZWN0VG8gOiB3eC5zd2l0Y2hUYWI7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcGF0aCA9IGAvcGFnZXMvY3VzdG9tL2N1c3RvbT9wdHlwZT0ke3BhZ2VLZXl9YDtcbiAgICB9XG4gICAgYXBwLmdsb2JhbERhdGEucGFnZURhdGEgPSB7fTtcbiAgICB3eC5yZWRpcmVjdFRvKHtcbiAgICAgICAgdXJsOiBwYXRoLFxuICAgIH0pXG59O1xuIl19