'use strict';

var route = require('./route.js');

module.exports = {
    getRoute: function getRoute(pageKey) {
        var tabBar = this.$parent.globalData.extConfig.tabBar.list;
        var path = route[pageKey] || route.custom + '?ptype=' + pageKey;
        var pageType = 'custom';

        tabBar.forEach(function (_ref) {
            var pagePath = _ref.pagePath;

            if ('/' + pagePath === path) {
                pageType = 'tabbar';
            }
        });
        return {
            url: path,
            type: pageType
        };
    },
    navigateTo: function navigateTo(r) {
        if (r.type === 'tabbar') {
            wx.switchTab({
                url: r.url
            });
        } else {
            wx.navigateTo({
                url: r.url
            });
        }
    }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdldFJvdXRlLmpzIl0sIm5hbWVzIjpbInJvdXRlIiwicmVxdWlyZSIsIm1vZHVsZSIsImV4cG9ydHMiLCJnZXRSb3V0ZSIsInBhZ2VLZXkiLCJ0YWJCYXIiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsImV4dENvbmZpZyIsImxpc3QiLCJwYXRoIiwiY3VzdG9tIiwicGFnZVR5cGUiLCJmb3JFYWNoIiwicGFnZVBhdGgiLCJ1cmwiLCJ0eXBlIiwibmF2aWdhdGVUbyIsInIiLCJ3eCIsInN3aXRjaFRhYiJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFNQSxRQUFRQyxRQUFRLFlBQVIsQ0FBZDs7QUFFQUMsT0FBT0MsT0FBUCxHQUFpQjtBQUNiQyxZQURhLG9CQUNIQyxPQURHLEVBQ007QUFDZixZQUFNQyxTQUFTLEtBQUtDLE9BQUwsQ0FBYUMsVUFBYixDQUF3QkMsU0FBeEIsQ0FBa0NILE1BQWxDLENBQXlDSSxJQUF4RDtBQUNBLFlBQU1DLE9BQU9YLE1BQU1LLE9BQU4sS0FBcUJMLE1BQU1ZLE1BQTNCLGVBQTJDUCxPQUF4RDtBQUNBLFlBQUlRLFdBQVcsUUFBZjs7QUFFQVAsZUFBT1EsT0FBUCxDQUFlLGdCQUFrQjtBQUFBLGdCQUFmQyxRQUFlLFFBQWZBLFFBQWU7O0FBQzdCLGdCQUFJLE1BQUlBLFFBQUosS0FBbUJKLElBQXZCLEVBQTZCO0FBQ3pCRSwyQkFBVyxRQUFYO0FBQ0g7QUFDSixTQUpEO0FBS0EsZUFBTztBQUNIRyxpQkFBS0wsSUFERjtBQUVITSxrQkFBTUo7QUFGSCxTQUFQO0FBSUgsS0FmWTtBQWdCYkssY0FoQmEsc0JBZ0JEQyxDQWhCQyxFQWdCRTtBQUNYLFlBQUlBLEVBQUVGLElBQUYsS0FBVyxRQUFmLEVBQXlCO0FBQ3JCRyxlQUFHQyxTQUFILENBQWE7QUFDVEwscUJBQUtHLEVBQUVIO0FBREUsYUFBYjtBQUdILFNBSkQsTUFJTztBQUNISSxlQUFHRixVQUFILENBQWM7QUFDVkYscUJBQUtHLEVBQUVIO0FBREcsYUFBZDtBQUdIO0FBQ0o7QUExQlksQ0FBakIiLCJmaWxlIjoiZ2V0Um91dGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCByb3V0ZSA9IHJlcXVpcmUoJy4vcm91dGUuanMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZ2V0Um91dGUgKHBhZ2VLZXkpIHtcbiAgICAgICAgY29uc3QgdGFiQmFyID0gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEuZXh0Q29uZmlnLnRhYkJhci5saXN0O1xuICAgICAgICBjb25zdCBwYXRoID0gcm91dGVbcGFnZUtleV0gfHwgYCR7cm91dGUuY3VzdG9tfT9wdHlwZT0ke3BhZ2VLZXl9YDtcbiAgICAgICAgbGV0IHBhZ2VUeXBlID0gJ2N1c3RvbSc7XG5cbiAgICAgICAgdGFiQmFyLmZvckVhY2goKHsgcGFnZVBhdGggfSkgPT4ge1xuICAgICAgICAgICAgaWYgKGAvJHtwYWdlUGF0aH1gID09PSBwYXRoKSB7XG4gICAgICAgICAgICAgICAgcGFnZVR5cGUgPSAndGFiYmFyJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB1cmw6IHBhdGgsXG4gICAgICAgICAgICB0eXBlOiBwYWdlVHlwZSxcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIG5hdmlnYXRlVG8gKHIpIHtcbiAgICAgICAgaWYgKHIudHlwZSA9PT0gJ3RhYmJhcicpIHtcbiAgICAgICAgICAgIHd4LnN3aXRjaFRhYih7XG4gICAgICAgICAgICAgICAgdXJsOiByLnVybCxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICAgICAgdXJsOiByLnVybCxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSxcbn07XG4iXX0=