'use strict';

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _utils = require('./index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var host = 'https://yaofa.58.com';

var http = function http(method) {
    for (var _len = arguments.length, props = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        props[_key - 1] = arguments[_key];
    }

    return new Promise(function (resolve, reject) {
        var url = props[0],
            data = props[1],
            callback = props[2],
            loadingControl = props[3];

        if (typeof data === 'function') {
            callback = data;
            data = {};
        }
        // loadingControl为控制loading的时间和文案的obj
        // loadingTitle标示loading的文案
        // delay标示 loading关闭时间 需要在请求成功后再次做延迟。
        var loadingTitle = '';
        var delay = 0;
        if (loadingControl) {
            loadingTitle = loadingControl.loadingTitle;
            delay = loadingControl.delay;
        }
        // test="test"字段是为切换测试和线上环境的，如果提交审核和发布，将test改为''，标识切换为线上环境
        var sendData = Object.assign({}, data, { test: "test" });
        // ppu加入header
        var ppu = wx.getStorageSync('ppu');
        console.log('请求接口', url);
        console.log('请求参数', sendData);
        wx.showLoading && wx.showLoading({ title: loadingTitle || '加载中', mask: true });
        return wx.request({
            url: host + url + (~url.indexOf('?') ? '' : '?') + (+new Date()).toString(36).substr(3),
            data: sendData,
            method: method,
            dataType: 'json',
            header: {
                'content-type': method === 'GET' ? 'application/json' : 'application/x-www-form-urlencoded;charset=utf-8',
                PPU: ppu || 'wanghongyue',
                // 'YkuYdY8rk5As4T2QaJ7v': '45797966958100',
                'reqfrom': 'biz_assistant'
            },
            success: function success(response) {
                console.log('response', response);
                var _response$data = response.data,
                    state = _response$data.state,
                    msg = _response$data.msg,
                    data = _response$data.data;

                if (state === 100) {
                    resolve(response.data);
                    // callback && callback(null, response.data);
                } else if (state == -10001) {
                    (0, _utils.toast)(msg);
                    setTimeout(function () {
                        _wepy2.default.reLaunch({
                            url: '../pages/intro'
                        });
                    }, 1000);
                    reject(msg);
                    // callback && callback(null, response.data);
                } else {
                    reject(msg);
                    // callback && callback(msg);
                }
            },
            fail: function fail(e) {
                reject(e);
                callback && callback(e);
            },
            complete: function complete() {
                if (delay) {
                    setTimeout(function () {
                        wx.hideLoading && wx.hideLoading();
                    }, delay);
                } else {
                    wx.hideLoading && wx.hideLoading();
                }
            }
        });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFqYXguanMiXSwibmFtZXMiOlsiaG9zdCIsImh0dHAiLCJtZXRob2QiLCJwcm9wcyIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwidXJsIiwiZGF0YSIsImNhbGxiYWNrIiwibG9hZGluZ0NvbnRyb2wiLCJsb2FkaW5nVGl0bGUiLCJkZWxheSIsInNlbmREYXRhIiwiT2JqZWN0IiwiYXNzaWduIiwidGVzdCIsInBwdSIsInd4IiwiZ2V0U3RvcmFnZVN5bmMiLCJjb25zb2xlIiwibG9nIiwic2hvd0xvYWRpbmciLCJ0aXRsZSIsIm1hc2siLCJyZXF1ZXN0IiwiaW5kZXhPZiIsIkRhdGUiLCJ0b1N0cmluZyIsInN1YnN0ciIsImRhdGFUeXBlIiwiaGVhZGVyIiwiUFBVIiwic3VjY2VzcyIsInJlc3BvbnNlIiwic3RhdGUiLCJtc2ciLCJzZXRUaW1lb3V0Iiwid2VweSIsInJlTGF1bmNoIiwiZmFpbCIsImUiLCJjb21wbGV0ZSIsImhpZGVMb2FkaW5nIiwibW9kdWxlIiwiZXhwb3J0cyIsImdldCIsInBvc3QiXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7QUFDQTs7OztBQUVBLElBQU1BLE9BQU8sc0JBQWI7O0FBRUEsSUFBTUMsT0FBTyxTQUFQQSxJQUFPLENBQUNDLE1BQUQ7QUFBQSxzQ0FBWUMsS0FBWjtBQUFZQSxhQUFaO0FBQUE7O0FBQUEsV0FBc0IsSUFBSUMsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUFBLFlBQzNEQyxHQUQyRCxHQUNwQkosS0FEb0I7QUFBQSxZQUN0REssSUFEc0QsR0FDcEJMLEtBRG9CO0FBQUEsWUFDaERNLFFBRGdELEdBQ3BCTixLQURvQjtBQUFBLFlBQ3RDTyxjQURzQyxHQUNwQlAsS0FEb0I7O0FBRWhFLFlBQUksT0FBT0ssSUFBUCxLQUFnQixVQUFwQixFQUFnQztBQUM1QkMsdUJBQVdELElBQVg7QUFDQUEsbUJBQU8sRUFBUDtBQUNIO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsWUFBSUcsZUFB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QUFBQSxXQUFjRix1QkFBSyxNQUFMLFNBQWdCRSxLQUFoQixFQUFkO0FBQUEsQ0FBdEIiLCJmaWxlIjoiYWpheC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuaW1wb3J0IHsgdG9hc3QgfSBmcm9tICcuLi91dGlscyc7XG5cbmNvbnN0IGhvc3QgPSAnaHR0cHM6Ly95YW9mYS41OC5jb20nO1xuXG5jb25zdCBodHRwID0gKG1ldGhvZCwgLi4ucHJvcHMpID0+IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBsZXQgW3VybCwgZGF0YSwgY2FsbGJhY2ssIGxvYWRpbmdDb250cm9sXSA9IHByb3BzO1xuICAgIGlmICh0eXBlb2YgZGF0YSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBjYWxsYmFjayA9IGRhdGE7XG4gICAgICAgIGRhdGEgPSB7fTtcbiAgICB9XG4gICAgLy8gbG9hZGluZ0NvbnRyb2zkuLrmjqfliLZsb2FkaW5n55qE5pe26Ze05ZKM5paH5qGI55qEb2JqXG4gICAgLy8gbG9hZGluZ1RpdGxl5qCH56S6bG9hZGluZ+eahOaWh+ahiFxuICAgIC8vIGRlbGF55qCH56S6IGxvYWRpbmflhbPpl63ml7bpl7Qg6ZyA6KaB5Zyo6K+35rGC5oiQ5Yqf5ZCO5YaN5qyh5YGa5bu26L+f44CCXG4gICAgbGV0IGxvYWRpbmdUaXRsZSA9ICcnO1xuICAgIGxldCBkZWxheSA9IDA7XG4gICAgaWYgKGxvYWRpbmdDb250cm9sKSB7XG4gICAgICAgIGxvYWRpbmdUaXRsZSA9IGxvYWRpbmdDb250cm9sLmxvYWRpbmdUaXRsZTtcbiAgICAgICAgZGVsYXkgPSBsb2FkaW5nQ29udHJvbC5kZWxheTtcbiAgICB9XG4gICAgLy8gdGVzdD1cInRlc3RcIuWtl+auteaYr+S4uuWIh+aNoua1i+ivleWSjOe6v+S4iueOr+Wig+eahO+8jOWmguaenOaPkOS6pOWuoeaguOWSjOWPkeW4g++8jOWwhnRlc3TmlLnkuLonJ++8jOagh+ivhuWIh+aNouS4uue6v+S4iueOr+Wig1xuICAgIGNvbnN0IHNlbmREYXRhID0gT2JqZWN0LmFzc2lnbih7fSwgZGF0YSwgeyB0ZXN0OlwidGVzdFwiIH0pO1xuICAgIC8vIHBwdeWKoOWFpWhlYWRlclxuICAgIGNvbnN0IHBwdSA9IHd4LmdldFN0b3JhZ2VTeW5jKCdwcHUnKTtcbiAgICBjb25zb2xlLmxvZygn6K+35rGC5o6l5Y+jJywgdXJsKTtcbiAgICBjb25zb2xlLmxvZygn6K+35rGC5Y+C5pWwJywgc2VuZERhdGEpO1xuICAgIHd4LnNob3dMb2FkaW5nICYmIHd4LnNob3dMb2FkaW5nKHsgdGl0bGU6IGxvYWRpbmdUaXRsZSB8fCAn5Yqg6L295LitJywgbWFzazogdHJ1ZSB9KTtcbiAgICByZXR1cm4gd3gucmVxdWVzdCh7XG4gICAgICAgIHVybDogaG9zdCArIHVybCArICh+dXJsLmluZGV4T2YoJz8nKSA/ICcnIDogJz8nKSArICgrbmV3IERhdGUoKSkudG9TdHJpbmcoMzYpLnN1YnN0cigzKSxcbiAgICAgICAgZGF0YTogc2VuZERhdGEsXG4gICAgICAgIG1ldGhvZDogbWV0aG9kLFxuICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICBoZWFkZXI6IHtcbiAgICAgICAgICAgICdjb250ZW50LXR5cGUnOiBtZXRob2QgPT09ICdHRVQnID8gJ2FwcGxpY2F0aW9uL2pzb24nIDogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDtjaGFyc2V0PXV0Zi04JyxcbiAgICAgICAgICAgIFBQVTogcHB1IHx8ICd3YW5naG9uZ3l1ZScsXG4gICAgICAgICAgICAvLyAnWWt1WWRZOHJrNUFzNFQyUWFKN3YnOiAnNDU3OTc5NjY5NTgxMDAnLFxuICAgICAgICAgICAgJ3JlcWZyb20nOiAnYml6X2Fzc2lzdGFudCcsXG4gICAgICAgIH0sXG4gICAgICAgIHN1Y2Nlc3MocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdyZXNwb25zZScsIHJlc3BvbnNlKTtcbiAgICAgICAgICAgIGNvbnN0IHsgc3RhdGUsIG1zZywgZGF0YSB9ID0gcmVzcG9uc2UuZGF0YTtcbiAgICAgICAgICAgIGlmIChzdGF0ZSA9PT0gMTAwKSB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShyZXNwb25zZS5kYXRhKTtcbiAgICAgICAgICAgICAgICAvLyBjYWxsYmFjayAmJiBjYWxsYmFjayhudWxsLCByZXNwb25zZS5kYXRhKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc3RhdGUgPT0gLTEwMDAxKSB7XG4gICAgICAgICAgICAgICAgdG9hc3QobXNnKTtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgd2VweS5yZUxhdW5jaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6ICcuLi9wYWdlcy9pbnRybycsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICAgICAgICAgIHJlamVjdChtc2cpO1xuICAgICAgICAgICAgICAgIC8vIGNhbGxiYWNrICYmIGNhbGxiYWNrKG51bGwsIHJlc3BvbnNlLmRhdGEpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZWplY3QobXNnKTtcbiAgICAgICAgICAgICAgICAvLyBjYWxsYmFjayAmJiBjYWxsYmFjayhtc2cpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBmYWlsKGUpIHtcbiAgICAgICAgICAgIHJlamVjdChlKTtcbiAgICAgICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKGUpO1xuICAgICAgICB9LFxuICAgICAgICBjb21wbGV0ZSgpIHtcbiAgICAgICAgICAgIGlmIChkZWxheSkge1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB3eC5oaWRlTG9hZGluZyAmJiB3eC5oaWRlTG9hZGluZygpO1xuICAgICAgICAgICAgICAgIH0sIGRlbGF5KTtcbiAgICAgICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgICAgICB3eC5oaWRlTG9hZGluZyAmJiB3eC5oaWRlTG9hZGluZygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgIH0pO1xufSk7XG5cbm1vZHVsZS5leHBvcnRzLmdldCA9ICguLi5wcm9wcykgPT4gaHR0cCgnR0VUJywgLi4ucHJvcHMpO1xuXG5tb2R1bGUuZXhwb3J0cy5wb3N0ID0gKC4uLnByb3BzKSA9PiBodHRwKCdQT1NUJywgLi4ucHJvcHMpO1xuIl19