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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFqYXguanMiXSwibmFtZXMiOlsiaG9zdCIsImh0dHAiLCJtZXRob2QiLCJwcm9wcyIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwidXJsIiwiZGF0YSIsImNhbGxiYWNrIiwibG9hZGluZ0NvbnRyb2wiLCJsb2FkaW5nVGl0bGUiLCJkZWxheSIsInNlbmREYXRhIiwiT2JqZWN0IiwiYXNzaWduIiwidGVzdCIsInBwdSIsInd4IiwiZ2V0U3RvcmFnZVN5bmMiLCJjb25zb2xlIiwibG9nIiwic2hvd0xvYWRpbmciLCJ0aXRsZSIsIm1hc2siLCJyZXF1ZXN0IiwiaW5kZXhPZiIsIkRhdGUiLCJ0b1N0cmluZyIsInN1YnN0ciIsImRhdGFUeXBlIiwiaGVhZGVyIiwiUFBVIiwic3VjY2VzcyIsInJlc3BvbnNlIiwic3RhdGUiLCJtc2ciLCJzZXRUaW1lb3V0Iiwid2VweSIsInJlTGF1bmNoIiwiZmFpbCIsImUiLCJjb21wbGV0ZSIsImhpZGVMb2FkaW5nIiwibW9kdWxlIiwiZXhwb3J0cyIsImdldCIsInBvc3QiXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7QUFDQTs7OztBQUVBLElBQU1BLE9BQU8sc0JBQWI7O0FBRUEsSUFBTUMsT0FBTyxTQUFQQSxJQUFPLENBQUNDLE1BQUQ7QUFBQSxzQ0FBWUMsS0FBWjtBQUFZQSxhQUFaO0FBQUE7O0FBQUEsV0FBc0IsSUFBSUMsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUFBLFlBQzNEQyxHQUQyRCxHQUNwQkosS0FEb0I7QUFBQSxZQUN0REssSUFEc0QsR0FDcEJMLEtBRG9CO0FBQUEsWUFDaERNLFFBRGdELEdBQ3BCTixLQURvQjtBQUFBLFlBQ3RDTyxjQURzQyxHQUNwQlAsS0FEb0I7O0FBRWhFLFlBQUksT0FBT0ssSUFBUCxLQUFnQixVQUFwQixFQUFnQztBQUM1QkMsdUJBQVdELElBQVg7QUFDQUEsbUJBQU8sRUFBUDtBQUNIO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsWUFBSUcsZUFB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QUFBQSxXQUFjRix1QkFBSyxNQUFMLFNBQWdCRSxLQUFoQixFQUFkO0FBQUEsQ0FBdEIiLCJmaWxlIjoiYWpheC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xyXG5pbXBvcnQgeyB0b2FzdCB9IGZyb20gJy4uL3V0aWxzJztcclxuXHJcbmNvbnN0IGhvc3QgPSAnaHR0cHM6Ly95YW9mYS41OC5jb20nO1xyXG5cclxuY29uc3QgaHR0cCA9IChtZXRob2QsIC4uLnByb3BzKSA9PiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICBsZXQgW3VybCwgZGF0YSwgY2FsbGJhY2ssIGxvYWRpbmdDb250cm9sXSA9IHByb3BzO1xyXG4gICAgaWYgKHR5cGVvZiBkYXRhID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgY2FsbGJhY2sgPSBkYXRhO1xyXG4gICAgICAgIGRhdGEgPSB7fTtcclxuICAgIH1cclxuICAgIC8vIGxvYWRpbmdDb250cm9s5Li65o6n5Yi2bG9hZGluZ+eahOaXtumXtOWSjOaWh+ahiOeahG9ialxyXG4gICAgLy8gbG9hZGluZ1RpdGxl5qCH56S6bG9hZGluZ+eahOaWh+ahiFxyXG4gICAgLy8gZGVsYXnmoIfnpLogbG9hZGluZ+WFs+mXreaXtumXtCDpnIDopoHlnKjor7fmsYLmiJDlip/lkI7lho3mrKHlgZrlu7bov5/jgIJcclxuICAgIGxldCBsb2FkaW5nVGl0bGUgPSAnJztcclxuICAgIGxldCBkZWxheSA9IDA7XHJcbiAgICBpZiAobG9hZGluZ0NvbnRyb2wpIHtcclxuICAgICAgICBsb2FkaW5nVGl0bGUgPSBsb2FkaW5nQ29udHJvbC5sb2FkaW5nVGl0bGU7XHJcbiAgICAgICAgZGVsYXkgPSBsb2FkaW5nQ29udHJvbC5kZWxheTtcclxuICAgIH1cclxuICAgIC8vIHRlc3Q9XCJ0ZXN0XCLlrZfmrrXmmK/kuLrliIfmjaLmtYvor5Xlkoznur/kuIrnjq/looPnmoTvvIzlpoLmnpzmj5DkuqTlrqHmoLjlkozlj5HluIPvvIzlsIZ0ZXN05pS55Li6JyfvvIzmoIfor4bliIfmjaLkuLrnur/kuIrnjq/looNcclxuICAgIGNvbnN0IHNlbmREYXRhID0gT2JqZWN0LmFzc2lnbih7fSwgZGF0YSwgeyB0ZXN0OlwidGVzdFwiIH0pO1xyXG4gICAgLy8gcHB15Yqg5YWlaGVhZGVyXHJcbiAgICBjb25zdCBwcHUgPSB3eC5nZXRTdG9yYWdlU3luYygncHB1Jyk7XHJcbiAgICBjb25zb2xlLmxvZygn6K+35rGC5o6l5Y+jJywgdXJsKTtcclxuICAgIGNvbnNvbGUubG9nKCfor7fmsYLlj4LmlbAnLCBzZW5kRGF0YSk7XHJcbiAgICB3eC5zaG93TG9hZGluZyAmJiB3eC5zaG93TG9hZGluZyh7IHRpdGxlOiBsb2FkaW5nVGl0bGUgfHwgJ+WKoOi9veS4rScsIG1hc2s6IHRydWUgfSk7XHJcbiAgICByZXR1cm4gd3gucmVxdWVzdCh7XHJcbiAgICAgICAgdXJsOiBob3N0ICsgdXJsICsgKH51cmwuaW5kZXhPZignPycpID8gJycgOiAnPycpICsgKCtuZXcgRGF0ZSgpKS50b1N0cmluZygzNikuc3Vic3RyKDMpLFxyXG4gICAgICAgIGRhdGE6IHNlbmREYXRhLFxyXG4gICAgICAgIG1ldGhvZDogbWV0aG9kLFxyXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAgICdjb250ZW50LXR5cGUnOiBtZXRob2QgPT09ICdHRVQnID8gJ2FwcGxpY2F0aW9uL2pzb24nIDogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDtjaGFyc2V0PXV0Zi04JyxcclxuICAgICAgICAgICAgUFBVOiBwcHUgfHwgJ3dhbmdob25neXVlJyxcclxuICAgICAgICAgICAgLy8gJ1lrdVlkWThyazVBczRUMlFhSjd2JzogJzQ1Nzk3OTY2OTU4MTAwJyxcclxuICAgICAgICAgICAgJ3JlcWZyb20nOiAnYml6X2Fzc2lzdGFudCcsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdWNjZXNzKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdyZXNwb25zZScsIHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgY29uc3QgeyBzdGF0ZSwgbXNnLCBkYXRhIH0gPSByZXNwb25zZS5kYXRhO1xyXG4gICAgICAgICAgICBpZiAoc3RhdGUgPT09IDEwMCkge1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShyZXNwb25zZS5kYXRhKTtcclxuICAgICAgICAgICAgICAgIC8vIGNhbGxiYWNrICYmIGNhbGxiYWNrKG51bGwsIHJlc3BvbnNlLmRhdGEpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHN0YXRlID09IC0xMDAwMSkge1xyXG4gICAgICAgICAgICAgICAgdG9hc3QobXNnKTtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHdlcHkucmVMYXVuY2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6ICcuLi9wYWdlcy9pbnRybycsXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9LCAxMDAwKTtcclxuICAgICAgICAgICAgICAgIHJlamVjdChtc2cpO1xyXG4gICAgICAgICAgICAgICAgLy8gY2FsbGJhY2sgJiYgY2FsbGJhY2sobnVsbCwgcmVzcG9uc2UuZGF0YSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZWplY3QobXNnKTtcclxuICAgICAgICAgICAgICAgIC8vIGNhbGxiYWNrICYmIGNhbGxiYWNrKG1zZyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGZhaWwoZSkge1xyXG4gICAgICAgICAgICByZWplY3QoZSk7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKGUpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29tcGxldGUoKSB7XHJcbiAgICAgICAgICAgIGlmIChkZWxheSkge1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcgJiYgd3guaGlkZUxvYWRpbmcoKTtcclxuICAgICAgICAgICAgICAgIH0sIGRlbGF5KTtcclxuICAgICAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcgJiYgd3guaGlkZUxvYWRpbmcoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICB9KTtcclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cy5nZXQgPSAoLi4ucHJvcHMpID0+IGh0dHAoJ0dFVCcsIC4uLnByb3BzKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzLnBvc3QgPSAoLi4ucHJvcHMpID0+IGh0dHAoJ1BPU1QnLCAuLi5wcm9wcyk7XHJcbiJdfQ==