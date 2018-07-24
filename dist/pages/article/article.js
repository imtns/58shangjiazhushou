'use strict';

/*eslint-disable */
var mixin = require('./../../mixin/mixin.js');

var _require = require('./../../utils/http.js'),
    get = _require.get;

var app = getApp();

var articleDetailUrl = '/businessArticle/get/';

Page({
    onReady: function onReady() {
        var _this = this;

        get(articleDetailUrl + this.options.id, function (e, response) {
            var pLength = response.content.indexOf('</p>');
            if (pLength.length > -1) {
                var ps = response.content.split('</p>').filter(function (p) {
                    return p;
                }).map(function (p) {
                    var result = /<img src=\"([^<>]+)\"/g.exec(p);
                    if (result) {
                        var src = result[1].replace(/^http:/i, '').split('?');

                        return {
                            type: 'img',
                            content: src[0] + '?w=750'
                        };
                    }
                    return {
                        type: 'text',
                        content: p + '</p>'
                    };
                });
                _this.setData({
                    ps: ps
                });
            }
            _this.setData({
                page_data: response
            });
        });
    },
    onShareAppMessage: function onShareAppMessage() {}
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFydGljbGUuanMiXSwibmFtZXMiOlsibWl4aW4iLCJyZXF1aXJlIiwiZ2V0IiwiYXBwIiwiZ2V0QXBwIiwiYXJ0aWNsZURldGFpbFVybCIsIlBhZ2UiLCJvblJlYWR5Iiwib3B0aW9ucyIsImlkIiwiZSIsInJlc3BvbnNlIiwicExlbmd0aCIsImNvbnRlbnQiLCJpbmRleE9mIiwibGVuZ3RoIiwicHMiLCJzcGxpdCIsImZpbHRlciIsInAiLCJtYXAiLCJyZXN1bHQiLCJleGVjIiwic3JjIiwicmVwbGFjZSIsInR5cGUiLCJzZXREYXRhIiwicGFnZV9kYXRhIiwib25TaGFyZUFwcE1lc3NhZ2UiXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQSxJQUFNQSxRQUFRQyxRQUFRLG1CQUFSLENBQWQ7O2VBQ2dCQSxRQUFRLGtCQUFSLEM7SUFBUkMsRyxZQUFBQSxHOztBQUVSLElBQU1DLE1BQU1DLFFBQVo7O0FBRUEsSUFBTUMsbUJBQW1CLHVCQUF6Qjs7QUFFQUMsS0FBSztBQUNEQyxXQURDLHFCQUNTO0FBQUE7O0FBQ05MLFlBQUlHLG1CQUFtQixLQUFLRyxPQUFMLENBQWFDLEVBQXBDLEVBQXdDLFVBQUNDLENBQUQsRUFBSUMsUUFBSixFQUFpQjtBQUNyRCxnQkFBTUMsVUFBVUQsU0FBU0UsT0FBVCxDQUFpQkMsT0FBakIsQ0FBMEIsTUFBMUIsQ0FBaEI7QUFDQSxnQkFBR0YsUUFBUUcsTUFBUixHQUFlLENBQUMsQ0FBbkIsRUFBcUI7QUFDckIsb0JBQU1DLEtBQUtMLFNBQVNFLE9BQVQsQ0FBaUJJLEtBQWpCLENBQXVCLE1BQXZCLEVBQ05DLE1BRE0sQ0FDQztBQUFBLDJCQUFLQyxDQUFMO0FBQUEsaUJBREQsRUFFTkMsR0FGTSxDQUVGLGFBQUs7QUFDTix3QkFBTUMsU0FBUyx5QkFBeUJDLElBQXpCLENBQThCSCxDQUE5QixDQUFmO0FBQ0Esd0JBQUlFLE1BQUosRUFBWTtBQUNSLDRCQUFNRSxNQUFNRixPQUFPLENBQVAsRUFBVUcsT0FBVixDQUFrQixTQUFsQixFQUE2QixFQUE3QixFQUFpQ1AsS0FBakMsQ0FBdUMsR0FBdkMsQ0FBWjs7QUFFQSwrQkFBTztBQUNIUSxrQ0FBTSxLQURIO0FBRUhaLHFDQUFZVSxJQUFJLENBQUosQ0FBWjtBQUZHLHlCQUFQO0FBSUg7QUFDRCwyQkFBTztBQUNIRSw4QkFBTSxNQURIO0FBRUhaLGlDQUFZTSxDQUFaO0FBRkcscUJBQVA7QUFJSCxpQkFoQk0sQ0FBWDtBQWlCSSxzQkFBS08sT0FBTCxDQUFhO0FBQ1RWO0FBRFMsaUJBQWI7QUFHSDtBQUNELGtCQUFLVSxPQUFMLENBQWE7QUFDVEMsMkJBQVdoQjtBQURGLGFBQWI7QUFHSCxTQTNCRDtBQTRCSCxLQTlCQTtBQStCRGlCLHFCQS9CQywrQkErQm1CLENBRW5CO0FBakNBLENBQUwiLCJmaWxlIjoiYXJ0aWNsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qZXNsaW50LWRpc2FibGUgKi9cbmNvbnN0IG1peGluID0gcmVxdWlyZSgnLi4vLi4vbWl4aW4vbWl4aW4nKTtcbmNvbnN0IHsgZ2V0IH0gPSByZXF1aXJlKCcuLi8uLi91dGlscy9odHRwJyk7XG5cbmNvbnN0IGFwcCA9IGdldEFwcCgpO1xuXG5jb25zdCBhcnRpY2xlRGV0YWlsVXJsID0gJy9idXNpbmVzc0FydGljbGUvZ2V0Lyc7XG5cblBhZ2Uoe1xuICAgIG9uUmVhZHkoKSB7XG4gICAgICAgIGdldChhcnRpY2xlRGV0YWlsVXJsICsgdGhpcy5vcHRpb25zLmlkLCAoZSwgcmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHBMZW5ndGggPSByZXNwb25zZS5jb250ZW50LmluZGV4T2YoKCc8L3A+JykpO1xuICAgICAgICAgICAgaWYocExlbmd0aC5sZW5ndGg+LTEpe1xuICAgICAgICAgICAgY29uc3QgcHMgPSByZXNwb25zZS5jb250ZW50LnNwbGl0KCc8L3A+JylcbiAgICAgICAgICAgICAgICAuZmlsdGVyKHAgPT4gcClcbiAgICAgICAgICAgICAgICAubWFwKHAgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSAvPGltZyBzcmM9XFxcIihbXjw+XSspXFxcIi9nLmV4ZWMocCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNyYyA9IHJlc3VsdFsxXS5yZXBsYWNlKC9eaHR0cDovaSwgJycpLnNwbGl0KCc/Jyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2ltZycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogYCR7c3JjWzBdfT93PTc1MGAsXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAndGV4dCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBgJHtwfTwvcD5gLFxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgICAgICAgICAgIHBzLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgICAgICBwYWdlX2RhdGE6IHJlc3BvbnNlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgb25TaGFyZUFwcE1lc3NhZ2UoKSB7XG5cbiAgICB9LFxufSk7XG4iXX0=