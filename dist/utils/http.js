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
        appId = _app$globalData$extCo.appId,
        releaseId = _app$globalData$extCo.releaseId,
        test = _app$globalData$extCo.test;


    if (!appId) {
        notSupportTips();
        return;
    }

    console.log('发送请求：', method, props);
    var mediaor = test ? { appid: appid, releaseId: releaseId, test: test } : { appId: appId, releaseId: releaseId };
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImh0dHAuanMiXSwibmFtZXMiOlsicmVxdWlyZSIsIm5vdFN1cHBvcnRUaXBzIiwiaG9zdCIsImFwcCIsImh0dHAiLCJtZXRob2QiLCJwcm9wcyIsInVybCIsImRhdGEiLCJjYWxsYmFjayIsIm5vTG9hZGluZyIsImdsb2JhbERhdGEiLCJleHRDb25maWciLCJhcHBJZCIsInJlbGVhc2VJZCIsInRlc3QiLCJjb25zb2xlIiwibG9nIiwibWVkaWFvciIsImFwcGlkIiwic2VuZERhdGEiLCJPYmplY3QiLCJhc3NpZ24iLCJ3eCIsInNob3dMb2FkaW5nIiwidGl0bGUiLCJtYXNrIiwicmVxdWVzdCIsImluZGV4T2YiLCJEYXRlIiwidG9TdHJpbmciLCJzdWJzdHIiLCJkYXRhVHlwZSIsImhlYWRlciIsInN1Y2Nlc3MiLCJyZXNwb25zZSIsInN0YXRlIiwibXNnIiwiZmFpbCIsImUiLCJjb21wbGV0ZSIsImhpZGVMb2FkaW5nIiwibW9kdWxlIiwiZXhwb3J0cyIsImdldCIsInBvc3QiLCJzaG93TmF2aWdhdGlvbkJhckxvYWRpbmciLCJoaWRlTmF2aWdhdGlvbkJhckxvYWRpbmciXSwibWFwcGluZ3MiOiI7O0FBQUE7ZUFDMkJBLFFBQVEsZ0JBQVIsQztJQUFuQkMsYyxZQUFBQSxjOztBQUVSLElBQUlDLE9BQU8sc0JBQVg7QUFDQSxJQUFNQyxNQUFPSCxRQUFRLHFCQUFSLENBQWI7QUFDQSxJQUFNSSxPQUFPLFNBQVBBLElBQU8sQ0FBQ0MsTUFBRCxFQUFzQjtBQUFBLHNDQUFWQyxLQUFVO0FBQVZBLGFBQVU7QUFBQTs7QUFBQSxRQUUxQkMsR0FGMEIsR0FFT0QsS0FGUDtBQUFBLFFBRXJCRSxJQUZxQixHQUVPRixLQUZQO0FBQUEsUUFFZkcsUUFGZSxHQUVPSCxLQUZQO0FBQUEsUUFFTkksU0FGTSxHQUVPSixLQUZQOztBQUcvQixRQUFJLE9BQU9FLElBQVAsS0FBZ0IsVUFBcEIsRUFBZ0M7QUFDNUJDLG1CQUFXRCxJQUFYO0FBQ0FBLGVBQU8sRUFBUDtBQUNI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T0YsR0FBR0ksT0FBSCxDQUFXO0FBQ2RwQixhQUFLQSxHQURTO0FBRWRpQyxnQkFGYyxzQkFFSDtBQUNQakIsZUFBR3dCLHdCQUFILElBQStCeEIsR0FBR3dCLHdCQUFILEVBQS9CO0FBQ0g7QUFKYSxLQUFYLENBQVA7QUFNSCxDQVJEIiwiZmlsZSI6Imh0dHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKmVzbGludC1kaXNhYmxlICovXG5jb25zdCB7IG5vdFN1cHBvcnRUaXBzIH0gPSByZXF1aXJlKCcuLi91dGlscy9pbmRleCcpO1xuXG5sZXQgaG9zdCA9ICdodHRwczovL3lhb2ZhLjU4LmNvbSc7XG5jb25zdCBhcHAgPSAgcmVxdWlyZSgnLi4vdXRpbHMvZ2xvYmFsRGF0YScpO1xuY29uc3QgaHR0cCA9IChtZXRob2QsIC4uLnByb3BzKSA9PiB7XG5cbiAgICBsZXQgW3VybCwgZGF0YSwgY2FsbGJhY2ssbm9Mb2FkaW5nXSA9IHByb3BzO1xuICAgIGlmICh0eXBlb2YgZGF0YSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBjYWxsYmFjayA9IGRhdGE7XG4gICAgICAgIGRhdGEgPSB7fTtcbiAgICB9XG5cbiAgICBsZXQgeyBhcHBJZCwgcmVsZWFzZUlkLHRlc3QgfSA9IGFwcC5nbG9iYWxEYXRhLmV4dENvbmZpZztcblxuICAgIGlmICghYXBwSWQpIHtcbiAgICAgICAgbm90U3VwcG9ydFRpcHMoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnNvbGUubG9nKCflj5HpgIHor7fmsYLvvJonLCBtZXRob2QsIHByb3BzKTtcbiAgICBsZXQgbWVkaWFvciA9IHRlc3QgPyB7IGFwcGlkLCByZWxlYXNlSWQsIHRlc3QgfSA6IHsgYXBwSWQsIHJlbGVhc2VJZCB9XG4gICAgY29uc3Qgc2VuZERhdGEgPSBPYmplY3QuYXNzaWduKHt9LCBkYXRhLCBtZWRpYW9yKTtcblxuICAgICFub0xvYWRpbmcmJnd4LnNob3dMb2FkaW5nICYmIHd4LnNob3dMb2FkaW5nKHt0aXRsZTogJ+WKoOi9veS4rScsIG1hc2s6IHRydWV9KTtcbiAgICByZXR1cm4gd3gucmVxdWVzdCh7XG4gICAgICAgIHVybDogaG9zdCArIHVybCArICh+dXJsLmluZGV4T2YoJz8nKSA/ICcnIDogJz8nKSArICgrbmV3IERhdGUoKSkudG9TdHJpbmcoMzYpLnN1YnN0cigzKSxcbiAgICAgICAgZGF0YTogc2VuZERhdGEsXG4gICAgICAgIG1ldGhvZDogbWV0aG9kLFxuICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICBoZWFkZXI6IHtcbiAgICAgICAgICAgIFwiY29udGVudC10eXBlXCI6IG1ldGhvZCA9PT0gXCJHRVRcIiA/IFwiYXBwbGljYXRpb24vanNvblwiIDogXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7Y2hhcnNldD11dGYtOFwiXG4gICAgICAgIH0sXG4gICAgICAgIHN1Y2Nlc3MocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdyZXNwb25zZTonLHJlc3BvbnNlKTtcbiAgICAgICAgICAgIGNvbnN0IHsgc3RhdGUsIG1zZywgZGF0YSB9ID0gcmVzcG9uc2UuZGF0YTtcbiAgICAgICAgICAgIGlmIChzdGF0ZSA9PSAxMDApIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayAmJiBjYWxsYmFjayhudWxsLCBkYXRhKTtcbiAgICAgICAgICAgIH1lbHNlIGlmKHN0YXRlPT0tMTEwKXtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayAmJiBjYWxsYmFjayhudWxsLCBtc2csZGF0YSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKG1zZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGZhaWwoZSkge1xuICAgICAgICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2soZSk7XG4gICAgICAgIH0sXG4gICAgICAgIGNvbXBsZXRlKCkge1xuICAgICAgICAgICAgIW5vTG9hZGluZyYmd3guaGlkZUxvYWRpbmcgJiYgd3guaGlkZUxvYWRpbmcoKTtcbiAgICAgICAgfVxuICAgIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMuZ2V0ID0gKC4uLnByb3BzKSA9PiB7XG4gICAgcmV0dXJuIGh0dHAoJ0dFVCcsIC4uLnByb3BzKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzLnBvc3QgPSAoLi4ucHJvcHMpID0+IHtcbiAgICByZXR1cm4gaHR0cCgnUE9TVCcsIC4uLnByb3BzKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzLnJlcXVlc3QgPSAoKSA9PiB7XG4gICAgd3guc2hvd05hdmlnYXRpb25CYXJMb2FkaW5nICYmIHd4LnNob3dOYXZpZ2F0aW9uQmFyTG9hZGluZyh7dGl0bGU6ICfliqDovb3kuK0nfSk7XG4gICAgcmV0dXJuIHd4LnJlcXVlc3Qoe1xuICAgICAgICB1cmw6IHVybCxcbiAgICAgICAgY29tcGxldGUoKSB7XG4gICAgICAgICAgICB3eC5oaWRlTmF2aWdhdGlvbkJhckxvYWRpbmcgJiYgd3guaGlkZU5hdmlnYXRpb25CYXJMb2FkaW5nKCk7XG4gICAgICAgIH1cbiAgICB9KTtcbn07XG4iXX0=