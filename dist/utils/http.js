'use strict';

/*eslint-disable */
var _require = require('./index.js'),
    notSupportTips = _require.notSupportTips;

var host = 'https://yaofa.58.com';
var app = require('./globalData.js');
var http = function http(method) {
    for (var _len = arguments.length, props = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        props[_key - 1] = arguments[_key];
    }

    var url = props[0],
        data = props[1],
        callback = props[2],
        noLoading = props[3];

    if (typeof data === 'function') {
        callback = data;
        data = {};
    }

    var _app$globalData$extCo = app.globalData.extConfig,
        appid = _app$globalData$extCo.appid,
        releaseId = _app$globalData$extCo.releaseId,
        test = _app$globalData$extCo.test;


    if (!appid) {
        notSupportTips();
        return;
    }

    console.log('发送请求：', method, props);
    var mediaor = test ? { appid: appid, releaseId: releaseId, test: test } : { appid: appid, releaseId: releaseId };
    var sendData = Object.assign({}, data, mediaor);

    !noLoading && wx.showLoading && wx.showLoading({ title: '加载中', mask: true });
    return wx.request({
        url: host + url + (~url.indexOf('?') ? '' : '?') + (+new Date()).toString(36).substr(3),
        data: sendData,
        method: method,
        dataType: 'json',
        header: {
            "content-type": method === "GET" ? "application/json" : "application/x-www-form-urlencoded;charset=utf-8"
        },
        success: function success(response) {
            console.log('response:', response);
            var _response$data = response.data,
                state = _response$data.state,
                msg = _response$data.msg,
                data = _response$data.data;

            if (state == 100) {
                callback && callback(null, data);
            } else if (state == -110) {
                callback && callback(null, msg, data);
            } else {
                callback && callback(msg);
            }
        },
        fail: function fail(e) {
            callback && callback(e);
        },
        complete: function complete() {
            !noLoading && wx.hideLoading && wx.hideLoading();
        }
    });
};

module.exports.get = function () {
    for (var _len2 = arguments.length, props = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        props[_key2] = arguments[_key2];
    }

    return http.apply(undefined, ['GET'].concat(props));
};

module.exports.post = function () {
    for (var _len3 = arguments.length, props = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        props[_key3] = arguments[_key3];
    }

    return http.apply(undefined, ['POST'].concat(props));
};

module.exports.request = function () {
    wx.showNavigationBarLoading && wx.showNavigationBarLoading({ title: '加载中' });
    return wx.request({
        url: url,
        complete: function complete() {
            wx.hideNavigationBarLoading && wx.hideNavigationBarLoading();
        }
    });
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImh0dHAuanMiXSwibmFtZXMiOlsicmVxdWlyZSIsIm5vdFN1cHBvcnRUaXBzIiwiaG9zdCIsImFwcCIsImh0dHAiLCJtZXRob2QiLCJwcm9wcyIsInVybCIsImRhdGEiLCJjYWxsYmFjayIsIm5vTG9hZGluZyIsImdsb2JhbERhdGEiLCJleHRDb25maWciLCJhcHBpZCIsInJlbGVhc2VJZCIsInRlc3QiLCJjb25zb2xlIiwibG9nIiwibWVkaWFvciIsInNlbmREYXRhIiwiT2JqZWN0IiwiYXNzaWduIiwid3giLCJzaG93TG9hZGluZyIsInRpdGxlIiwibWFzayIsInJlcXVlc3QiLCJpbmRleE9mIiwiRGF0ZSIsInRvU3RyaW5nIiwic3Vic3RyIiwiZGF0YVR5cGUiLCJoZWFkZXIiLCJzdWNjZXNzIiwicmVzcG9uc2UiLCJzdGF0ZSIsIm1zZyIsImZhaWwiLCJlIiwiY29tcGxldGUiLCJoaWRlTG9hZGluZyIsIm1vZHVsZSIsImV4cG9ydHMiLCJnZXQiLCJwb3N0Iiwic2hvd05hdmlnYXRpb25CYXJMb2FkaW5nIiwiaGlkZU5hdmlnYXRpb25CYXJMb2FkaW5nIl0sIm1hcHBpbmdzIjoiOztBQUFBO2VBQzJCQSxRQUFRLGdCQUFSLEM7SUFBbkJDLGMsWUFBQUEsYzs7QUFFUixJQUFJQyxPQUFPLHNCQUFYO0FBQ0EsSUFBTUMsTUFBT0gsUUFBUSxxQkFBUixDQUFiO0FBQ0EsSUFBTUksT0FBTyxTQUFQQSxJQUFPLENBQUNDLE1BQUQsRUFBc0I7QUFBQSxzQ0FBVkMsS0FBVTtBQUFWQSxhQUFVO0FBQUE7O0FBQUEsUUFFMUJDLEdBRjBCLEdBRU9ELEtBRlA7QUFBQSxRQUVyQkUsSUFGcUIsR0FFT0YsS0FGUDtBQUFBLFFBRWZHLFFBRmUsR0FFT0gsS0FGUDtBQUFBLFFBRU5JLFNBRk0sR0FFT0osS0FGUDs7QUFHL0IsUUFBSSxPQUFPRSxJQUFQLEtBQWdCLFVBQXBCLEVBQWdDO0FBQzVCQyxtQkFBV0QsSUFBWDtBQUNBQSxlQUFPLEVBQVA7QUFDSDs7QUFOOEIs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LE9BQUgsQ0FBVztBQUNkbkIsYUFBS0EsR0FEUztBQUVkZ0MsZ0JBRmMsc0JBRUg7QUFDUGpCLGVBQUd3Qix3QkFBSCxJQUErQnhCLEdBQUd3Qix3QkFBSCxFQUEvQjtBQUNIO0FBSmEsS0FBWCxDQUFQO0FBTUgsQ0FSRCIsImZpbGUiOiJodHRwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyplc2xpbnQtZGlzYWJsZSAqL1xyXG5jb25zdCB7IG5vdFN1cHBvcnRUaXBzIH0gPSByZXF1aXJlKCcuLi91dGlscy9pbmRleCcpO1xyXG5cclxubGV0IGhvc3QgPSAnaHR0cHM6Ly95YW9mYS41OC5jb20nO1xyXG5jb25zdCBhcHAgPSAgcmVxdWlyZSgnLi4vdXRpbHMvZ2xvYmFsRGF0YScpO1xyXG5jb25zdCBodHRwID0gKG1ldGhvZCwgLi4ucHJvcHMpID0+IHtcclxuXHJcbiAgICBsZXQgW3VybCwgZGF0YSwgY2FsbGJhY2ssbm9Mb2FkaW5nXSA9IHByb3BzO1xyXG4gICAgaWYgKHR5cGVvZiBkYXRhID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgY2FsbGJhY2sgPSBkYXRhO1xyXG4gICAgICAgIGRhdGEgPSB7fTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgeyBhcHBpZCwgcmVsZWFzZUlkLHRlc3QgfSA9IGFwcC5nbG9iYWxEYXRhLmV4dENvbmZpZztcclxuXHJcbiAgICBpZiAoIWFwcGlkKSB7XHJcbiAgICAgICAgbm90U3VwcG9ydFRpcHMoKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc29sZS5sb2coJ+WPkemAgeivt+axgu+8micsIG1ldGhvZCwgcHJvcHMpO1xyXG4gICAgbGV0IG1lZGlhb3IgPSB0ZXN0ID8geyBhcHBpZCwgcmVsZWFzZUlkLCB0ZXN0IH0gOiB7IGFwcGlkLCByZWxlYXNlSWQgfVxyXG4gICAgY29uc3Qgc2VuZERhdGEgPSBPYmplY3QuYXNzaWduKHt9LCBkYXRhLCBtZWRpYW9yKTtcclxuXHJcbiAgICAhbm9Mb2FkaW5nJiZ3eC5zaG93TG9hZGluZyAmJiB3eC5zaG93TG9hZGluZyh7dGl0bGU6ICfliqDovb3kuK0nLCBtYXNrOiB0cnVlfSk7XHJcbiAgICByZXR1cm4gd3gucmVxdWVzdCh7XHJcbiAgICAgICAgdXJsOiBob3N0ICsgdXJsICsgKH51cmwuaW5kZXhPZignPycpID8gJycgOiAnPycpICsgKCtuZXcgRGF0ZSgpKS50b1N0cmluZygzNikuc3Vic3RyKDMpLFxyXG4gICAgICAgIGRhdGE6IHNlbmREYXRhLFxyXG4gICAgICAgIG1ldGhvZDogbWV0aG9kLFxyXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAgIFwiY29udGVudC10eXBlXCI6IG1ldGhvZCA9PT0gXCJHRVRcIiA/IFwiYXBwbGljYXRpb24vanNvblwiIDogXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7Y2hhcnNldD11dGYtOFwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdWNjZXNzKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdyZXNwb25zZTonLHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgY29uc3QgeyBzdGF0ZSwgbXNnLCBkYXRhIH0gPSByZXNwb25zZS5kYXRhO1xyXG4gICAgICAgICAgICBpZiAoc3RhdGUgPT0gMTAwKSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayAmJiBjYWxsYmFjayhudWxsLCBkYXRhKTtcclxuICAgICAgICAgICAgfWVsc2UgaWYoc3RhdGU9PS0xMTApe1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2sobnVsbCwgbXNnLGRhdGEpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2sobXNnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZmFpbChlKSB7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKGUpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29tcGxldGUoKSB7XHJcbiAgICAgICAgICAgICFub0xvYWRpbmcmJnd4LmhpZGVMb2FkaW5nICYmIHd4LmhpZGVMb2FkaW5nKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cy5nZXQgPSAoLi4ucHJvcHMpID0+IHtcclxuICAgIHJldHVybiBodHRwKCdHRVQnLCAuLi5wcm9wcyk7XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cy5wb3N0ID0gKC4uLnByb3BzKSA9PiB7XHJcbiAgICByZXR1cm4gaHR0cCgnUE9TVCcsIC4uLnByb3BzKTtcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzLnJlcXVlc3QgPSAoKSA9PiB7XHJcbiAgICB3eC5zaG93TmF2aWdhdGlvbkJhckxvYWRpbmcgJiYgd3guc2hvd05hdmlnYXRpb25CYXJMb2FkaW5nKHt0aXRsZTogJ+WKoOi9veS4rSd9KTtcclxuICAgIHJldHVybiB3eC5yZXF1ZXN0KHtcclxuICAgICAgICB1cmw6IHVybCxcclxuICAgICAgICBjb21wbGV0ZSgpIHtcclxuICAgICAgICAgICAgd3guaGlkZU5hdmlnYXRpb25CYXJMb2FkaW5nICYmIHd4LmhpZGVOYXZpZ2F0aW9uQmFyTG9hZGluZygpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59O1xyXG4iXX0=