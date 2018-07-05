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
            callback = props[2];

        if (typeof data === 'function') {
            callback = data;
            data = {};
        }
        // test="test"字段是为切换测试和线上环境的，如果提交审核和发布，将test改为''，标识切换为线上环境
        var sendData = Object.assign({}, data, { test: 'test' });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFqYXguanMiXSwibmFtZXMiOlsiaG9zdCIsImh0dHAiLCJtZXRob2QiLCJwcm9wcyIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwidXJsIiwiZGF0YSIsImNhbGxiYWNrIiwic2VuZERhdGEiLCJPYmplY3QiLCJhc3NpZ24iLCJ0ZXN0IiwicHB1Iiwid3giLCJnZXRTdG9yYWdlU3luYyIsImNvbnNvbGUiLCJsb2ciLCJzaG93TG9hZGluZyIsInRpdGxlIiwibWFzayIsInJlcXVlc3QiLCJpbmRleE9mIiwiRGF0ZSIsInRvU3RyaW5nIiwic3Vic3RyIiwiZGF0YVR5cGUiLCJoZWFkZXIiLCJQUFUiLCJyZXFmcm9tIiwic3VjY2VzcyIsInJlc3BvbnNlIiwic3RhdGUiLCJtc2ciLCJzZXRUaW1lb3V0Iiwid2VweSIsInJlTGF1bmNoIiwiZmFpbCIsImUiLCJjb21wbGV0ZSIsImhpZGVMb2FkaW5nIiwibW9kdWxlIiwiZXhwb3J0cyIsImdldCIsInBvc3QiXSwibWFwcGluZ3MiOiI7O0FBRUE7Ozs7QUFDQTs7OztBQUhBOztBQUtBLElBQU1BLE9BQU8sc0JBQWI7O0FBRUEsSUFBTUMsT0FBTyxTQUFQQSxJQUFPLENBQUNDLE1BQUQ7QUFBQSxzQ0FBWUMsS0FBWjtBQUFZQSxhQUFaO0FBQUE7O0FBQUEsV0FBc0IsSUFBSUMsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUFBLFlBQzNEQyxHQUQyRCxHQUNwQ0osS0FEb0M7QUFBQSxZQUN0REssSUFEc0QsR0FDcENMLEtBRG9DO0FBQUEsWUFDaERNLFFBRGdELEdBQ3BDTixLQURvQzs7QUFFaEUsWUFBSSxPQUFPSyxJQUFQLEtBQWdCLFVBQXBCLEVBQWdDO0FBQzVCQyx1QkFBV0QsSUFBWDtBQUNBQSxtQkFBTyxFQUFQO0FBQ0g7QUFDRDtBQUNBLFlBQU1FLFdBQVdDLE9BQU9DLE1BQVAsQ0FBYyxFQUFkLEVBQWtCSixJQUFsQixFQUF3QixFQUFFSyxNQUFNLE1BQVIsRUFBeEIsQ0FBakI7QUFDQTtBQUNBLFlBQU1DLE1BQU1DLEdBQUdDLGNBQUgsQ0FBa0IsS0FBbEIsQ0FBWjtBQUNBQyxnQkFBUUMsR0FBUixDQUFZLE1BQVosRUFBb0JYLEdBQXBCO0FBQ0FVLGdCQUFRQyxHQUFSLENBQVksTUFBWixFQUFvQlIsUUFBcEI7QUFDQUssV0FBR0ksV0FBSCxJQUFrQkosR0FBR0ksV0FBSCxDQUFlLEVBQUVDLE9BQU8sS0FBVCxFQUFnQkMsTUFBTSxJQUF0QixFQUFmLENBQWxCO0FBQ0EsZUFBT04sR0FBR08sT0FBSCxDQUFXO0FBQ2RmLGlCQUFLUCxPQUFPTyxHQUFQLElBQWMsQ0FBQ0EsSUFBSWdCLE9BQUosQ0FBWSxHQUFaLENBQUQsR0FBb0IsRUFBcEIsR0FBeUIsR0FBdkMsSUFBOEMsQ0FBQyxDQUFDLElBQUlDLElBQUosRUFBRixFQUFjQyxRQUFkLENBQXVCLEVBQXZCLEVBQTJCQyxNQUEzQixDQUFrQyxDQUFsQyxDQURyQztBQUVkbEIsa0JBQU1FLFFBRlE7QUFHZFIsb0JBQVFBLE1BSE07QUFJZHlCLHNCQUFVLE1BSkk7QUFLZEMsb0JBQVE7QUFDSixnQ0FBZ0IxQixXQUFXLEtBQVgsR0FBbUIsa0JBQW5CLEdBQXdDLGlEQURwRDtBQUVKMkIscUJBQUtmLE9BQU8sYUFGUjtBQUdKO0FBQ0FnQix5QkFBUztBQUpMLGFBTE07QUFXZEMsbUJBWGMsbUJBV05DLFFBWE0sRUFXSTtBQUNkZix3QkFBUUMsR0FBUixDQUFZLFVBQVosRUFBd0JjLFFBQXhCO0FBRGMscUNBRWVBLFNBQVN4QixJQUZ4QjtBQUFBLG9CQUVOeUIsS0FGTSxrQkFFTkEsS0FGTTtBQUFBLG9CQUVDQyxHQUZELGtCQUVDQSxHQUZEO0FBQUEsb0JBRU0xQixJQUZOLGtCQUVNQSxJQUZOOztBQUdkLG9CQUFJeUIsVUFBVSxHQUFkLEVBQW1CO0FBQ2Y1Qiw0QkFBUTJCLFNBQVN4QixJQUFqQjtBQUNBO0FBQ0gsaUJBSEQsTUFHTyxJQUFJeUIsU0FBUyxDQUFDLEtBQWQsRUFBcUI7QUFDeEIsc0NBQU1DLEdBQU47QUFDQUMsK0JBQVcsWUFBTTtBQUNiQyx1Q0FBS0MsUUFBTCxDQUFjO0FBQ1Y5QixpQ0FBSztBQURLLHlCQUFkO0FBR0gscUJBSkQsRUFJRyxJQUpIO0FBS0FELDJCQUFPNEIsR0FBUDtBQUNBO0FBQ0gsaUJBVE0sTUFTQTtBQUNINUIsMkJBQU80QixHQUFQO0FBQ0E7QUFDSDtBQUNKLGFBOUJhO0FBK0JkSSxnQkEvQmMsZ0JBK0JUQyxDQS9CUyxFQStCTjtBQUNKakMsdUJBQU9pQyxDQUFQO0FBQ0E5Qiw0QkFBWUEsU0FBUzhCLENBQVQsQ0FBWjtBQUNILGFBbENhO0FBbUNkQyxvQkFuQ2Msc0JBbUNIO0FBQ1B6QixtQkFBRzBCLFdBQUgsSUFBa0IxQixHQUFHMEIsV0FBSCxFQUFsQjtBQUNIO0FBckNhLFNBQVgsQ0FBUDtBQXVDSCxLQXBEa0MsQ0FBdEI7QUFBQSxDQUFiOztBQXNEQUMsT0FBT0MsT0FBUCxDQUFlQyxHQUFmLEdBQXFCO0FBQUEsdUNBQUl6QyxLQUFKO0FBQUlBLGFBQUo7QUFBQTs7QUFBQSxXQUFjRix1QkFBSyxLQUFMLFNBQWVFLEtBQWYsRUFBZDtBQUFBLENBQXJCOztBQUVBdUMsT0FBT0MsT0FBUCxDQUFlRSxJQUFmLEdBQXNCO0FBQUEsdUNBQUkxQyxLQUFKO0FBQUlBLGFBQUo7QUFBQTs7QUFBQSxXQUFjRix1QkFBSyxNQUFMLFNBQWdCRSxLQUFoQixFQUFkO0FBQUEsQ0FBdEIiLCJmaWxlIjoiYWpheC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlICovXHJcblxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcclxuaW1wb3J0IHsgdG9hc3QgfSBmcm9tICcuLi91dGlscyc7XHJcblxyXG5jb25zdCBob3N0ID0gJ2h0dHBzOi8veWFvZmEuNTguY29tJztcclxuXHJcbmNvbnN0IGh0dHAgPSAobWV0aG9kLCAuLi5wcm9wcykgPT4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgbGV0IFt1cmwsIGRhdGEsIGNhbGxiYWNrXSA9IHByb3BzO1xyXG4gICAgaWYgKHR5cGVvZiBkYXRhID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgY2FsbGJhY2sgPSBkYXRhO1xyXG4gICAgICAgIGRhdGEgPSB7fTtcclxuICAgIH1cclxuICAgIC8vIHRlc3Q9XCJ0ZXN0XCLlrZfmrrXmmK/kuLrliIfmjaLmtYvor5Xlkoznur/kuIrnjq/looPnmoTvvIzlpoLmnpzmj5DkuqTlrqHmoLjlkozlj5HluIPvvIzlsIZ0ZXN05pS55Li6JyfvvIzmoIfor4bliIfmjaLkuLrnur/kuIrnjq/looNcclxuICAgIGNvbnN0IHNlbmREYXRhID0gT2JqZWN0LmFzc2lnbih7fSwgZGF0YSwgeyB0ZXN0OiAndGVzdCcgfSk7XHJcbiAgICAvLyBwcHXliqDlhaVoZWFkZXJcclxuICAgIGNvbnN0IHBwdSA9IHd4LmdldFN0b3JhZ2VTeW5jKCdwcHUnKTtcclxuICAgIGNvbnNvbGUubG9nKCfor7fmsYLmjqXlj6MnLCB1cmwpO1xyXG4gICAgY29uc29sZS5sb2coJ+ivt+axguWPguaVsCcsIHNlbmREYXRhKTtcclxuICAgIHd4LnNob3dMb2FkaW5nICYmIHd4LnNob3dMb2FkaW5nKHsgdGl0bGU6ICfliqDovb3kuK0nLCBtYXNrOiB0cnVlIH0pO1xyXG4gICAgcmV0dXJuIHd4LnJlcXVlc3Qoe1xyXG4gICAgICAgIHVybDogaG9zdCArIHVybCArICh+dXJsLmluZGV4T2YoJz8nKSA/ICcnIDogJz8nKSArICgrbmV3IERhdGUoKSkudG9TdHJpbmcoMzYpLnN1YnN0cigzKSxcclxuICAgICAgICBkYXRhOiBzZW5kRGF0YSxcclxuICAgICAgICBtZXRob2Q6IG1ldGhvZCxcclxuICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgICAnY29udGVudC10eXBlJzogbWV0aG9kID09PSAnR0VUJyA/ICdhcHBsaWNhdGlvbi9qc29uJyA6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7Y2hhcnNldD11dGYtOCcsXHJcbiAgICAgICAgICAgIFBQVTogcHB1IHx8ICd3YW5naG9uZ3l1ZScsXHJcbiAgICAgICAgICAgIC8vICdZa3VZZFk4cms1QXM0VDJRYUo3dic6ICc0NTc5Nzk2Njk1ODEwMCcsXHJcbiAgICAgICAgICAgIHJlcWZyb206ICdiaXpfYXNzaXN0YW50JyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHN1Y2Nlc3MocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ3Jlc3BvbnNlJywgcmVzcG9uc2UpO1xyXG4gICAgICAgICAgICBjb25zdCB7IHN0YXRlLCBtc2csIGRhdGEgfSA9IHJlc3BvbnNlLmRhdGE7XHJcbiAgICAgICAgICAgIGlmIChzdGF0ZSA9PT0gMTAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3BvbnNlLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgLy8gY2FsbGJhY2sgJiYgY2FsbGJhY2sobnVsbCwgcmVzcG9uc2UuZGF0YSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc3RhdGUgPT0gLTEwMDAxKSB7XHJcbiAgICAgICAgICAgICAgICB0b2FzdChtc2cpO1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2VweS5yZUxhdW5jaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogJy4uL3BhZ2VzL2ludHJvJyxcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0sIDEwMDApO1xyXG4gICAgICAgICAgICAgICAgcmVqZWN0KG1zZyk7XHJcbiAgICAgICAgICAgICAgICAvLyBjYWxsYmFjayAmJiBjYWxsYmFjayhudWxsLCByZXNwb25zZS5kYXRhKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJlamVjdChtc2cpO1xyXG4gICAgICAgICAgICAgICAgLy8gY2FsbGJhY2sgJiYgY2FsbGJhY2sobXNnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZmFpbChlKSB7XHJcbiAgICAgICAgICAgIHJlamVjdChlKTtcclxuICAgICAgICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2soZSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb21wbGV0ZSgpIHtcclxuICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcgJiYgd3guaGlkZUxvYWRpbmcoKTtcclxuICAgICAgICB9LFxyXG4gICAgfSk7XHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMuZ2V0ID0gKC4uLnByb3BzKSA9PiBodHRwKCdHRVQnLCAuLi5wcm9wcyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cy5wb3N0ID0gKC4uLnByb3BzKSA9PiBodHRwKCdQT1NUJywgLi4ucHJvcHMpO1xyXG4iXX0=