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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFydGljbGUuanMiXSwibmFtZXMiOlsibWl4aW4iLCJyZXF1aXJlIiwiZ2V0IiwiYXBwIiwiZ2V0QXBwIiwiYXJ0aWNsZURldGFpbFVybCIsIlBhZ2UiLCJvblJlYWR5Iiwib3B0aW9ucyIsImlkIiwiZSIsInJlc3BvbnNlIiwicExlbmd0aCIsImNvbnRlbnQiLCJpbmRleE9mIiwibGVuZ3RoIiwicHMiLCJzcGxpdCIsImZpbHRlciIsInAiLCJtYXAiLCJyZXN1bHQiLCJleGVjIiwic3JjIiwicmVwbGFjZSIsInR5cGUiLCJzZXREYXRhIiwicGFnZV9kYXRhIiwib25TaGFyZUFwcE1lc3NhZ2UiXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQSxJQUFNQSxRQUFRQyxRQUFRLG1CQUFSLENBQWQ7O2VBQ2dCQSxRQUFRLGtCQUFSLEM7SUFBUkMsRyxZQUFBQSxHOztBQUVSLElBQU1DLE1BQU1DLFFBQVo7O0FBRUEsSUFBTUMsbUJBQW1CLHVCQUF6Qjs7QUFFQUMsS0FBSztBQUNEQyxXQURDLHFCQUNTO0FBQUE7O0FBQ05MLFlBQUlHLG1CQUFtQixLQUFLRyxPQUFMLENBQWFDLEVBQXBDLEVBQXdDLFVBQUNDLENBQUQsRUFBSUMsUUFBSixFQUFpQjtBQUNyRCxnQkFBTUMsVUFBVUQsU0FBU0UsT0FBVCxDQUFpQkMsT0FBakIsQ0FBMEIsTUFBMUIsQ0FBaEI7QUFDQSxnQkFBR0YsUUFBUUcsTUFBUixHQUFlLENBQUMsQ0FBbkIsRUFBcUI7QUFDckIsb0JBQU1DLEtBQUtMLFNBQVNFLE9BQVQsQ0FBaUJJLEtBQWpCLENBQXVCLE1BQXZCLEVBQ05DLE1BRE0sQ0FDQztBQUFBLDJCQUFLQyxDQUFMO0FBQUEsaUJBREQsRUFFTkMsR0FGTSxDQUVGLGFBQUs7QUFDTix3QkFBTUMsU0FBUyx5QkFBeUJDLElBQXpCLENBQThCSCxDQUE5QixDQUFmO0FBQ0Esd0JBQUlFLE1BQUosRUFBWTtBQUNSLDRCQUFNRSxNQUFNRixPQUFPLENBQVAsRUFBVUcsT0FBVixDQUFrQixTQUFsQixFQUE2QixFQUE3QixFQUFpQ1AsS0FBakMsQ0FBdUMsR0FBdkMsQ0FBWjs7QUFFQSwrQkFBTztBQUNIUSxrQ0FBTSxLQURIO0FBRUhaLHFDQUFZVSxJQUFJLENBQUosQ0FBWjtBQUZHLHlCQUFQO0FBSUg7QUFDRCwyQkFBTztBQUNIRSw4QkFBTSxNQURIO0FBRUhaLGlDQUFZTSxDQUFaO0FBRkcscUJBQVA7QUFJSCxpQkFoQk0sQ0FBWDtBQWlCSSxzQkFBS08sT0FBTCxDQUFhO0FBQ1RWO0FBRFMsaUJBQWI7QUFHSDtBQUNELGtCQUFLVSxPQUFMLENBQWE7QUFDVEMsMkJBQVdoQjtBQURGLGFBQWI7QUFHSCxTQTNCRDtBQTRCSCxLQTlCQTtBQStCRGlCLHFCQS9CQywrQkErQm1CLENBRW5CO0FBakNBLENBQUwiLCJmaWxlIjoiYXJ0aWNsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qZXNsaW50LWRpc2FibGUgKi9cclxuY29uc3QgbWl4aW4gPSByZXF1aXJlKCcuLi8uLi9taXhpbi9taXhpbicpO1xyXG5jb25zdCB7IGdldCB9ID0gcmVxdWlyZSgnLi4vLi4vdXRpbHMvaHR0cCcpO1xyXG5cclxuY29uc3QgYXBwID0gZ2V0QXBwKCk7XHJcblxyXG5jb25zdCBhcnRpY2xlRGV0YWlsVXJsID0gJy9idXNpbmVzc0FydGljbGUvZ2V0Lyc7XHJcblxyXG5QYWdlKHtcclxuICAgIG9uUmVhZHkoKSB7XHJcbiAgICAgICAgZ2V0KGFydGljbGVEZXRhaWxVcmwgKyB0aGlzLm9wdGlvbnMuaWQsIChlLCByZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBwTGVuZ3RoID0gcmVzcG9uc2UuY29udGVudC5pbmRleE9mKCgnPC9wPicpKTtcclxuICAgICAgICAgICAgaWYocExlbmd0aC5sZW5ndGg+LTEpe1xyXG4gICAgICAgICAgICBjb25zdCBwcyA9IHJlc3BvbnNlLmNvbnRlbnQuc3BsaXQoJzwvcD4nKVxyXG4gICAgICAgICAgICAgICAgLmZpbHRlcihwID0+IHApXHJcbiAgICAgICAgICAgICAgICAubWFwKHAgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IC88aW1nIHNyYz1cXFwiKFtePD5dKylcXFwiL2cuZXhlYyhwKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNyYyA9IHJlc3VsdFsxXS5yZXBsYWNlKC9eaHR0cDovaSwgJycpLnNwbGl0KCc/Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2ltZycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBgJHtzcmNbMF19P3c9NzUwYCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3RleHQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBgJHtwfTwvcD5gLFxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgICAgICAgICAgcHMsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICAgICAgcGFnZV9kYXRhOiByZXNwb25zZSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgb25TaGFyZUFwcE1lc3NhZ2UoKSB7XHJcblxyXG4gICAgfSxcclxufSk7XHJcbiJdfQ==