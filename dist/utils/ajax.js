'use strict';

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _utils = require('./index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable */

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
        var sendData = Object.assign({}, data, { test: 'test' });
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
                reqfrom: 'biz_assistant'
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFqYXguanMiXSwibmFtZXMiOlsiaG9zdCIsImh0dHAiLCJtZXRob2QiLCJwcm9wcyIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwidXJsIiwiZGF0YSIsImNhbGxiYWNrIiwibG9hZGluZ0NvbnRyb2wiLCJsb2FkaW5nVGl0bGUiLCJkZWxheSIsInNlbmREYXRhIiwiT2JqZWN0IiwiYXNzaWduIiwidGVzdCIsInBwdSIsInd4IiwiZ2V0U3RvcmFnZVN5bmMiLCJjb25zb2xlIiwibG9nIiwic2hvd0xvYWRpbmciLCJ0aXRsZSIsIm1hc2siLCJyZXF1ZXN0IiwiaW5kZXhPZiIsIkRhdGUiLCJ0b1N0cmluZyIsInN1YnN0ciIsImRhdGFUeXBlIiwiaGVhZGVyIiwiUFBVIiwicmVxZnJvbSIsInN1Y2Nlc3MiLCJyZXNwb25zZSIsInN0YXRlIiwibXNnIiwic2V0VGltZW91dCIsIndlcHkiLCJyZUxhdW5jaCIsImZhaWwiLCJlIiwiY29tcGxldGUiLCJoaWRlTG9hZGluZyIsIm1vZHVsZSIsImV4cG9ydHMiLCJnZXQiLCJwb3N0Il0sIm1hcHBpbmdzIjoiOztBQUVBOzs7O0FBQ0E7Ozs7QUFIQTs7QUFLQSxJQUFNQSxPQUFPLHNCQUFiOztBQUVBLElBQU1DLE9BQU8sU0FBUEEsSUFBTyxDQUFDQyxNQUFEO0FBQUEsc0NBQVlDLEtBQVo7QUFBWUEsYUFBWjtBQUFBOztBQUFBLFdBQXNCLElBQUlDLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFBQSxZQUMzREMsR0FEMkQsR0FDcEJKLEtBRG9CO0FBQUEsWUFDdERLLElBRHNELEdBQ3BCTCxLQURvQjtBQUFBLFlBQ2hETSxRQURnRCxHQUNwQk4sS0FEb0I7QUFBQSxZQUN0Q08sY0FEc0MsR0FDcEJQLEtBRG9COztBQUVoRSxZQUFJLE9BQU9LLElBQVAsS0FBZ0IsVUFBcEIsRUFBZ0M7QUFDNUJDLHVCQUFXRCxJQUFYO0FBQ0FBLG1CQUFPLEVBQVA7QUFDSDtBQUNEO0FBQ0E7QUFD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QUFBSUEsYUFBSjtBQUFBOztBQUFBLFdBQWNGLHVCQUFLLE1BQUwsU0FBZ0JFLEtBQWhCLEVBQWQ7QUFBQSxDQUF0QiIsImZpbGUiOiJhamF4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgKi9cclxuXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xyXG5pbXBvcnQgeyB0b2FzdCB9IGZyb20gJy4uL3V0aWxzJztcclxuXHJcbmNvbnN0IGhvc3QgPSAnaHR0cHM6Ly95YW9mYS41OC5jb20nO1xyXG5cclxuY29uc3QgaHR0cCA9IChtZXRob2QsIC4uLnByb3BzKSA9PiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICBsZXQgW3VybCwgZGF0YSwgY2FsbGJhY2ssIGxvYWRpbmdDb250cm9sXSA9IHByb3BzO1xyXG4gICAgaWYgKHR5cGVvZiBkYXRhID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgY2FsbGJhY2sgPSBkYXRhO1xyXG4gICAgICAgIGRhdGEgPSB7fTtcclxuICAgIH1cclxuICAgIC8vIGxvYWRpbmdDb250cm9s5Li65o6n5Yi2bG9hZGluZ+eahOaXtumXtOWSjOaWh+ahiOeahG9ialxyXG4gICAgLy8gbG9hZGluZ1RpdGxl5qCH56S6bG9hZGluZ+eahOaWh+ahiFxyXG4gICAgLy8gZGVsYXnmoIfnpLogbG9hZGluZ+WFs+mXreaXtumXtCDpnIDopoHlnKjor7fmsYLmiJDlip/lkI7lho3mrKHlgZrlu7bov5/jgIJcclxuICAgIGxldCBsb2FkaW5nVGl0bGUgPSAnJztcclxuICAgIGxldCBkZWxheSA9IDA7XHJcbiAgICBpZiAobG9hZGluZ0NvbnRyb2wpIHtcclxuICAgICAgICBsb2FkaW5nVGl0bGUgPSBsb2FkaW5nQ29udHJvbC5sb2FkaW5nVGl0bGU7XHJcbiAgICAgICAgZGVsYXkgPSBsb2FkaW5nQ29udHJvbC5kZWxheTtcclxuICAgIH1cclxuICAgIC8vIHRlc3Q9XCJ0ZXN0XCLlrZfmrrXmmK/kuLrliIfmjaLmtYvor5Xlkoznur/kuIrnjq/looPnmoTvvIzlpoLmnpzmj5DkuqTlrqHmoLjlkozlj5HluIPvvIzlsIZ0ZXN05pS55Li6JyfvvIzmoIfor4bliIfmjaLkuLrnur/kuIrnjq/looNcclxuICAgIGNvbnN0IHNlbmREYXRhID0gT2JqZWN0LmFzc2lnbih7fSwgZGF0YSwgeyB0ZXN0OiAndGVzdCcgfSk7XHJcbiAgICAvLyBwcHXliqDlhaVoZWFkZXJcclxuICAgIGNvbnN0IHBwdSA9IHd4LmdldFN0b3JhZ2VTeW5jKCdwcHUnKTtcclxuICAgIGNvbnNvbGUubG9nKCfor7fmsYLmjqXlj6MnLCB1cmwpO1xyXG4gICAgY29uc29sZS5sb2coJ+ivt+axguWPguaVsCcsIHNlbmREYXRhKTtcclxuICAgIHd4LnNob3dMb2FkaW5nICYmIHd4LnNob3dMb2FkaW5nKHsgdGl0bGU6IGxvYWRpbmdUaXRsZSB8fCAn5Yqg6L295LitJywgbWFzazogdHJ1ZSB9KTtcclxuICAgIHJldHVybiB3eC5yZXF1ZXN0KHtcclxuICAgICAgICB1cmw6IGhvc3QgKyB1cmwgKyAofnVybC5pbmRleE9mKCc/JykgPyAnJyA6ICc/JykgKyAoK25ldyBEYXRlKCkpLnRvU3RyaW5nKDM2KS5zdWJzdHIoMyksXHJcbiAgICAgICAgZGF0YTogc2VuZERhdGEsXHJcbiAgICAgICAgbWV0aG9kOiBtZXRob2QsXHJcbiAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICAgJ2NvbnRlbnQtdHlwZSc6IG1ldGhvZCA9PT0gJ0dFVCcgPyAnYXBwbGljYXRpb24vanNvbicgOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9dXRmLTgnLFxyXG4gICAgICAgICAgICBQUFU6IHBwdSB8fCAnd2FuZ2hvbmd5dWUnLFxyXG4gICAgICAgICAgICAvLyAnWWt1WWRZOHJrNUFzNFQyUWFKN3YnOiAnNDU3OTc5NjY5NTgxMDAnLFxyXG4gICAgICAgICAgICByZXFmcm9tOiAnYml6X2Fzc2lzdGFudCcsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdWNjZXNzKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdyZXNwb25zZScsIHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgY29uc3QgeyBzdGF0ZSwgbXNnLCBkYXRhIH0gPSByZXNwb25zZS5kYXRhO1xyXG4gICAgICAgICAgICBpZiAoc3RhdGUgPT09IDEwMCkge1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShyZXNwb25zZS5kYXRhKTtcclxuICAgICAgICAgICAgICAgIC8vIGNhbGxiYWNrICYmIGNhbGxiYWNrKG51bGwsIHJlc3BvbnNlLmRhdGEpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHN0YXRlID09IC0xMDAwMSkge1xyXG4gICAgICAgICAgICAgICAgdG9hc3QobXNnKTtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHdlcHkucmVMYXVuY2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6ICcuLi9wYWdlcy9pbnRybycsXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9LCAxMDAwKTtcclxuICAgICAgICAgICAgICAgIHJlamVjdChtc2cpO1xyXG4gICAgICAgICAgICAgICAgLy8gY2FsbGJhY2sgJiYgY2FsbGJhY2sobnVsbCwgcmVzcG9uc2UuZGF0YSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZWplY3QobXNnKTtcclxuICAgICAgICAgICAgICAgIC8vIGNhbGxiYWNrICYmIGNhbGxiYWNrKG1zZyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGZhaWwoZSkge1xyXG4gICAgICAgICAgICByZWplY3QoZSk7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKGUpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29tcGxldGUoKSB7XHJcbiAgICAgICAgICAgIGlmIChkZWxheSkge1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcgJiYgd3guaGlkZUxvYWRpbmcoKTtcclxuICAgICAgICAgICAgICAgIH0sIGRlbGF5KTtcclxuICAgICAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcgJiYgd3guaGlkZUxvYWRpbmcoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICB9KTtcclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cy5nZXQgPSAoLi4ucHJvcHMpID0+IGh0dHAoJ0dFVCcsIC4uLnByb3BzKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzLnBvc3QgPSAoLi4ucHJvcHMpID0+IGh0dHAoJ1BPU1QnLCAuLi5wcm9wcyk7Il19