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
            callback = props[2];

        if (typeof data === 'function') {
            callback = data;
            data = {};
        }
        // test="test"字段是为切换测试和线上环境的，如果提交审核和发布，将test改为''，标识切换为线上环境
        var sendData = Object.assign({}, data, { test: "test" });
        // ppu加入header
        var ppu = wx.getStorageSync('ppu');
        console.log('请求接口', url);
        console.log('请求参数', sendData);
        wx.showLoading && wx.showLoading({ title: '加载中', mask: true });
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
                wx.hideLoading && wx.hideLoading();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFqYXguanMiXSwibmFtZXMiOlsiaG9zdCIsImh0dHAiLCJtZXRob2QiLCJwcm9wcyIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwidXJsIiwiZGF0YSIsImNhbGxiYWNrIiwic2VuZERhdGEiLCJPYmplY3QiLCJhc3NpZ24iLCJ0ZXN0IiwicHB1Iiwid3giLCJnZXRTdG9yYWdlU3luYyIsImNvbnNvbGUiLCJsb2ciLCJzaG93TG9hZGluZyIsInRpdGxlIiwibWFzayIsInJlcXVlc3QiLCJpbmRleE9mIiwiRGF0ZSIsInRvU3RyaW5nIiwic3Vic3RyIiwiZGF0YVR5cGUiLCJoZWFkZXIiLCJQUFUiLCJzdWNjZXNzIiwicmVzcG9uc2UiLCJzdGF0ZSIsIm1zZyIsInNldFRpbWVvdXQiLCJ3ZXB5IiwicmVMYXVuY2giLCJmYWlsIiwiZSIsImNvbXBsZXRlIiwiaGlkZUxvYWRpbmciLCJtb2R1bGUiLCJleHBvcnRzIiwiZ2V0IiwicG9zdCJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7OztBQUNBOzs7O0FBRUEsSUFBTUEsT0FBTyxzQkFBYjs7QUFFQSxJQUFNQyxPQUFPLFNBQVBBLElBQU8sQ0FBQ0MsTUFBRDtBQUFBLHNDQUFZQyxLQUFaO0FBQVlBLGFBQVo7QUFBQTs7QUFBQSxXQUFzQixJQUFJQyxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQUEsWUFDM0RDLEdBRDJELEdBQ3BDSixLQURvQztBQUFBLFlBQ3RESyxJQURzRCxHQUNwQ0wsS0FEb0M7QUFBQSxZQUNoRE0sUUFEZ0QsR0FDcENOLEtBRG9DOztBQUVoRSxZQUFJLE9BQU9LLElBQVAsS0FBZ0IsVUFBcEIsRUFBZ0M7QUFDNUJDLHVCQUFXRCxJQUFYO0FBQ0FBLG1CQUFPLEVBQVA7QUFDSDtBQUNEO0FBQ0EsWUFBTUUsV0FBV0MsT0FBT0MsTUFBUCxDQUFjLEVBQWQsRUFBa0JKLElBQWxCLEVBQXdCLEVBQUVLLE1BQUssTUFBUCxFQUF4QixDQUFqQjtBQUNBO0FBQ0EsWUFBTUMsTUFBTUMsR0FBR0MsY0FBSCxDQUFrQixLQUFsQixDQUFaO0FBQ0FDLGdCQUFRQyxHQUFSLENBQVksTUFBWixFQUFvQlgsR0FBcEI7QUFDQVUsZ0JBQVFDLEdBQVIsQ0FBWSxNQUFaLEVBQW9CUixRQUFwQjtBQUNBSyxXQUFHSSxXQUFILElBQWtCSixHQUFHSSxXQUFILENBQWUsRUFBRUMsT0FBTyxLQUFULEVBQWdCQyxNQUFNLElBQXRCLEVBQWYsQ0FBbEI7QUFDQSxlQUFPTixHQUFHTyxPQUFILENBQVc7QUFDZGYsaUJBQUtQLE9BQU9PLEdBQVAsSUFBYyxDQUFDQSxJQUFJZ0IsT0FBSixDQUFZLEdBQVosQ0FBRCxHQUFvQixFQUFwQixHQUF5QixHQUF2QyxJQUE4QyxDQUFDLENBQUMsSUFBSUMsSUFBSixFQUFGLEVBQWNDLFFBQWQsQ0FBdUIsRUFBdkIsRUFBMkJDLE1BQTNCLENBQWtDLENBQWxDLENBRHJDO0FBRWRsQixrQkFBTUUsUUFGUTtBQUdkUixvQkFBUUEsTUFITTtBQUlkeUIsc0JBQVUsTUFKSTtBQUtkQyxvQkFBUTtBQUNKLGdDQUFnQjFCLFdBQVcsS0FBWCxHQUFtQixrQkFBbkIsR0FBd0MsaURBRHBEO0FBRUoyQixxQkFBS2YsT0FBTyxhQUZSO0FBR0o7QUFDQSwyQkFBVztBQUpQLGFBTE07QUFXZGdCLG1CQVhjLG1CQVdOQyxRQVhNLEVBV0k7QUFDZGQsd0JBQVFDLEdBQVIsQ0FBWSxVQUFaLEVBQXdCYSxRQUF4QjtBQURjLHFDQUVlQSxTQUFTdkIsSUFGeEI7QUFBQSxvQkFFTndCLEtBRk0sa0JBRU5BLEtBRk07QUFBQSxvQkFFQ0MsR0FGRCxrQkFFQ0EsR0FGRDtBQUFBLG9CQUVNekIsSUFGTixrQkFFTUEsSUFGTjs7QUFHZCxvQkFBSXdCLFVBQVUsR0FBZCxFQUFtQjtBQUNmM0IsNEJBQVEwQixTQUFTdkIsSUFBakI7QUFDQTtBQUNILGlCQUhELE1BR08sSUFBSXdCLFNBQVMsQ0FBQyxLQUFkLEVBQXFCO0FBQ3hCLHNDQUFNQyxHQUFOO0FBQ0FDLCtCQUFXLFlBQU07QUFDYkMsdUNBQUtDLFFBQUwsQ0FBYztBQUNWN0IsaUNBQUs7QUFESyx5QkFBZDtBQUdILHFCQUpELEVBSUcsSUFKSDtBQUtBRCwyQkFBTzJCLEdBQVA7QUFDQTtBQUNILGlCQVRNLE1BU0E7QUFDSDNCLDJCQUFPMkIsR0FBUDtBQUNBO0FBQ0g7QUFDSixhQTlCYTtBQStCZEksZ0JBL0JjLGdCQStCVEMsQ0EvQlMsRUErQk47QUFDSmhDLHVCQUFPZ0MsQ0FBUDtBQUNBN0IsNEJBQVlBLFNBQVM2QixDQUFULENBQVo7QUFDSCxhQWxDYTtBQW1DZEMsb0JBbkNjLHNCQW1DSDtBQUNQeEIsbUJBQUd5QixXQUFILElBQWtCekIsR0FBR3lCLFdBQUgsRUFBbEI7QUFDSDtBQXJDYSxTQUFYLENBQVA7QUF1Q0gsS0FwRGtDLENBQXRCO0FBQUEsQ0FBYjs7QUFzREFDLE9BQU9DLE9BQVAsQ0FBZUMsR0FBZixHQUFxQjtBQUFBLHVDQUFJeEMsS0FBSjtBQUFJQSxhQUFKO0FBQUE7O0FBQUEsV0FBY0YsdUJBQUssS0FBTCxTQUFlRSxLQUFmLEVBQWQ7QUFBQSxDQUFyQjs7QUFFQXNDLE9BQU9DLE9BQVAsQ0FBZUUsSUFBZixHQUFzQjtBQUFBLHVDQUFJekMsS0FBSjtBQUFJQSxhQUFKO0FBQUE7O0FBQUEsV0FBY0YsdUJBQUssTUFBTCxTQUFnQkUsS0FBaEIsRUFBZDtBQUFBLENBQXRCIiwiZmlsZSI6ImFqYXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcclxuaW1wb3J0IHsgdG9hc3QgfSBmcm9tICcuLi91dGlscyc7XHJcblxyXG5jb25zdCBob3N0ID0gJ2h0dHBzOi8veWFvZmEuNTguY29tJztcclxuXHJcbmNvbnN0IGh0dHAgPSAobWV0aG9kLCAuLi5wcm9wcykgPT4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgbGV0IFt1cmwsIGRhdGEsIGNhbGxiYWNrXSA9IHByb3BzO1xyXG4gICAgaWYgKHR5cGVvZiBkYXRhID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgY2FsbGJhY2sgPSBkYXRhO1xyXG4gICAgICAgIGRhdGEgPSB7fTtcclxuICAgIH1cclxuICAgIC8vIHRlc3Q9XCJ0ZXN0XCLlrZfmrrXmmK/kuLrliIfmjaLmtYvor5Xlkoznur/kuIrnjq/looPnmoTvvIzlpoLmnpzmj5DkuqTlrqHmoLjlkozlj5HluIPvvIzlsIZ0ZXN05pS55Li6JyfvvIzmoIfor4bliIfmjaLkuLrnur/kuIrnjq/looNcclxuICAgIGNvbnN0IHNlbmREYXRhID0gT2JqZWN0LmFzc2lnbih7fSwgZGF0YSwgeyB0ZXN0OlwidGVzdFwiIH0pO1xyXG4gICAgLy8gcHB15Yqg5YWlaGVhZGVyXHJcbiAgICBjb25zdCBwcHUgPSB3eC5nZXRTdG9yYWdlU3luYygncHB1Jyk7XHJcbiAgICBjb25zb2xlLmxvZygn6K+35rGC5o6l5Y+jJywgdXJsKTtcclxuICAgIGNvbnNvbGUubG9nKCfor7fmsYLlj4LmlbAnLCBzZW5kRGF0YSk7XHJcbiAgICB3eC5zaG93TG9hZGluZyAmJiB3eC5zaG93TG9hZGluZyh7IHRpdGxlOiAn5Yqg6L295LitJywgbWFzazogdHJ1ZSB9KTtcclxuICAgIHJldHVybiB3eC5yZXF1ZXN0KHtcclxuICAgICAgICB1cmw6IGhvc3QgKyB1cmwgKyAofnVybC5pbmRleE9mKCc/JykgPyAnJyA6ICc/JykgKyAoK25ldyBEYXRlKCkpLnRvU3RyaW5nKDM2KS5zdWJzdHIoMyksXHJcbiAgICAgICAgZGF0YTogc2VuZERhdGEsXHJcbiAgICAgICAgbWV0aG9kOiBtZXRob2QsXHJcbiAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICAgJ2NvbnRlbnQtdHlwZSc6IG1ldGhvZCA9PT0gJ0dFVCcgPyAnYXBwbGljYXRpb24vanNvbicgOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9dXRmLTgnLFxyXG4gICAgICAgICAgICBQUFU6IHBwdSB8fCAnd2FuZ2hvbmd5dWUnLFxyXG4gICAgICAgICAgICAvLyAnWWt1WWRZOHJrNUFzNFQyUWFKN3YnOiAnNDU3OTc5NjY5NTgxMDAnLFxyXG4gICAgICAgICAgICAncmVxZnJvbSc6ICdiaXpfYXNzaXN0YW50JyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHN1Y2Nlc3MocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ3Jlc3BvbnNlJywgcmVzcG9uc2UpO1xyXG4gICAgICAgICAgICBjb25zdCB7IHN0YXRlLCBtc2csIGRhdGEgfSA9IHJlc3BvbnNlLmRhdGE7XHJcbiAgICAgICAgICAgIGlmIChzdGF0ZSA9PT0gMTAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3BvbnNlLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgLy8gY2FsbGJhY2sgJiYgY2FsbGJhY2sobnVsbCwgcmVzcG9uc2UuZGF0YSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc3RhdGUgPT0gLTEwMDAxKSB7XHJcbiAgICAgICAgICAgICAgICB0b2FzdChtc2cpO1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2VweS5yZUxhdW5jaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogJy4uL3BhZ2VzL2ludHJvJyxcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0sIDEwMDApO1xyXG4gICAgICAgICAgICAgICAgcmVqZWN0KG1zZyk7XHJcbiAgICAgICAgICAgICAgICAvLyBjYWxsYmFjayAmJiBjYWxsYmFjayhudWxsLCByZXNwb25zZS5kYXRhKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJlamVjdChtc2cpO1xyXG4gICAgICAgICAgICAgICAgLy8gY2FsbGJhY2sgJiYgY2FsbGJhY2sobXNnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZmFpbChlKSB7XHJcbiAgICAgICAgICAgIHJlamVjdChlKTtcclxuICAgICAgICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2soZSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb21wbGV0ZSgpIHtcclxuICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcgJiYgd3guaGlkZUxvYWRpbmcoKTtcclxuICAgICAgICB9LFxyXG4gICAgfSk7XHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMuZ2V0ID0gKC4uLnByb3BzKSA9PiBodHRwKCdHRVQnLCAuLi5wcm9wcyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cy5wb3N0ID0gKC4uLnByb3BzKSA9PiBodHRwKCdQT1NUJywgLi4ucHJvcHMpO1xyXG4iXX0=