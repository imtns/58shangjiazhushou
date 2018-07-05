'use strict';

var _utils = require('./index.js');

var host = 'https://yaofa.58.com';

var http = function http(method) {
    for (var _len = arguments.length, props = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        props[_key - 1] = arguments[_key];
    }

    return new Promise(function (resolve, reject) {
        var url = props[0];
        var data = props[0],
            callback = props[1];

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
                    msg = _response$data.msg;

                if (state === 100) {
                    resolve(response.data);
                    // callback && callback(null, response.data);
                } else if (state === -10001) {
                    (0, _utils.toast)(msg);
                    // setTimeout(() => {
                    //     wepy.reLaunch({
                    //         url: '../pages/intro',
                    //     });
                    // }, 1000);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFqYXguanMiXSwibmFtZXMiOlsiaG9zdCIsImh0dHAiLCJtZXRob2QiLCJwcm9wcyIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwidXJsIiwiZGF0YSIsImNhbGxiYWNrIiwic2VuZERhdGEiLCJPYmplY3QiLCJhc3NpZ24iLCJ0ZXN0IiwicHB1Iiwid3giLCJnZXRTdG9yYWdlU3luYyIsImNvbnNvbGUiLCJsb2ciLCJzaG93TG9hZGluZyIsInRpdGxlIiwibWFzayIsInJlcXVlc3QiLCJpbmRleE9mIiwiRGF0ZSIsInRvU3RyaW5nIiwic3Vic3RyIiwiZGF0YVR5cGUiLCJoZWFkZXIiLCJQUFUiLCJyZXFmcm9tIiwic3VjY2VzcyIsInJlc3BvbnNlIiwic3RhdGUiLCJtc2ciLCJmYWlsIiwiZSIsImNvbXBsZXRlIiwiaGlkZUxvYWRpbmciLCJtb2R1bGUiLCJleHBvcnRzIiwiZ2V0IiwicG9zdCJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFFQSxJQUFNQSxPQUFPLHNCQUFiOztBQUVBLElBQU1DLE9BQU8sU0FBUEEsSUFBTyxDQUFDQyxNQUFEO0FBQUEsc0NBQVlDLEtBQVo7QUFBWUEsYUFBWjtBQUFBOztBQUFBLFdBQXNCLElBQUlDLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFBQSxZQUN6REMsR0FEeUQsR0FDbERKLEtBRGtEO0FBQUEsWUFFM0RLLElBRjJELEdBRXpDTCxLQUZ5QztBQUFBLFlBRXJETSxRQUZxRCxHQUV6Q04sS0FGeUM7O0FBR2hFLFlBQUksT0FBT0ssSUFBUCxLQUFnQixVQUFwQixFQUFnQztBQUM1QkMsdUJBQVdELElBQVg7QUFDQUEsbUJBQU8sRUFBUDtBQUNIO0FBQ0Q7QUFDQSxZQUFNRSxXQUFXQyxPQUFPQyxNQUFQLENBQWMsRUFBZCxFQUFrQkosSUFBbEIsRUFBd0IsRUFBRUssTUFBTSxNQUFSLEVBQXhCLENBQWpCO0FBQ0E7QUFDQSxZQUFNQyxNQUFNQyxHQUFHQyxjQUFILENBQWtCLEtBQWxCLENBQVo7QUFDQUMsZ0JBQVFDLEdBQVIsQ0FBWSxNQUFaLEVBQW9CWCxHQUFwQjtBQUNBVSxnQkFBUUMsR0FBUixDQUFZLE1BQVosRUFBb0JSLFFBQXBCO0FBQ0FLLFdBQUdJLFdBQUgsSUFBa0JKLEdBQUdJLFdBQUgsQ0FBZSxFQUFFQyxPQUFPLEtBQVQsRUFBZ0JDLE1BQU0sSUFBdEIsRUFBZixDQUFsQjtBQUNBLGVBQU9OLEdBQUdPLE9BQUgsQ0FBVztBQUNkZixpQkFBS1AsT0FBT08sR0FBUCxJQUFjLENBQUNBLElBQUlnQixPQUFKLENBQVksR0FBWixDQUFELEdBQW9CLEVBQXBCLEdBQXlCLEdBQXZDLElBQThDLENBQUMsQ0FBQyxJQUFJQyxJQUFKLEVBQUYsRUFBY0MsUUFBZCxDQUF1QixFQUF2QixFQUEyQkMsTUFBM0IsQ0FBa0MsQ0FBbEMsQ0FEckM7QUFFZGxCLGtCQUFNRSxRQUZRO0FBR2RSLG9CQUFRQSxNQUhNO0FBSWR5QixzQkFBVSxNQUpJO0FBS2RDLG9CQUFRO0FBQ0osZ0NBQWdCMUIsV0FBVyxLQUFYLEdBQW1CLGtCQUFuQixHQUF3QyxpREFEcEQ7QUFFSjJCLHFCQUFLZixPQUFPLGFBRlI7QUFHSjtBQUNBZ0IseUJBQVM7QUFKTCxhQUxNO0FBV2RDLG1CQVhjLG1CQVdOQyxRQVhNLEVBV0k7QUFDZGYsd0JBQVFDLEdBQVIsQ0FBWSxVQUFaLEVBQXdCYyxRQUF4QjtBQURjLHFDQUVTQSxTQUFTeEIsSUFGbEI7QUFBQSxvQkFFTnlCLEtBRk0sa0JBRU5BLEtBRk07QUFBQSxvQkFFQ0MsR0FGRCxrQkFFQ0EsR0FGRDs7QUFHZCxvQkFBSUQsVUFBVSxHQUFkLEVBQW1CO0FBQ2Y1Qiw0QkFBUTJCLFNBQVN4QixJQUFqQjtBQUNBO0FBQ0gsaUJBSEQsTUFHTyxJQUFJeUIsVUFBVSxDQUFDLEtBQWYsRUFBc0I7QUFDekIsc0NBQU1DLEdBQU47QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E1QiwyQkFBTzRCLEdBQVA7QUFDQTtBQUNILGlCQVRNLE1BU0E7QUFDSDVCLDJCQUFPNEIsR0FBUDtBQUNBO0FBQ0g7QUFDSixhQTlCYTtBQStCZEMsZ0JBL0JjLGdCQStCVEMsQ0EvQlMsRUErQk47QUFDSjlCLHVCQUFPOEIsQ0FBUDtBQUNBM0IsNEJBQVlBLFNBQVMyQixDQUFULENBQVo7QUFDSCxhQWxDYTtBQW1DZEMsb0JBbkNjLHNCQW1DSDtBQUNQdEIsbUJBQUd1QixXQUFILElBQWtCdkIsR0FBR3VCLFdBQUgsRUFBbEI7QUFDSDtBQXJDYSxTQUFYLENBQVA7QUF1Q0gsS0FyRGtDLENBQXRCO0FBQUEsQ0FBYjs7QUF1REFDLE9BQU9DLE9BQVAsQ0FBZUMsR0FBZixHQUFxQjtBQUFBLHVDQUFJdEMsS0FBSjtBQUFJQSxhQUFKO0FBQUE7O0FBQUEsV0FBY0YsdUJBQUssS0FBTCxTQUFlRSxLQUFmLEVBQWQ7QUFBQSxDQUFyQjs7QUFFQW9DLE9BQU9DLE9BQVAsQ0FBZUUsSUFBZixHQUFzQjtBQUFBLHVDQUFJdkMsS0FBSjtBQUFJQSxhQUFKO0FBQUE7O0FBQUEsV0FBY0YsdUJBQUssTUFBTCxTQUFnQkUsS0FBaEIsRUFBZDtBQUFBLENBQXRCIiwiZmlsZSI6ImFqYXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB0b2FzdCB9IGZyb20gJy4uL3V0aWxzJztcclxuXHJcbmNvbnN0IGhvc3QgPSAnaHR0cHM6Ly95YW9mYS41OC5jb20nO1xyXG5cclxuY29uc3QgaHR0cCA9IChtZXRob2QsIC4uLnByb3BzKSA9PiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICBjb25zdCBbdXJsXSA9IHByb3BzO1xyXG4gICAgbGV0IFtkYXRhLCBjYWxsYmFja10gPSBwcm9wcztcclxuICAgIGlmICh0eXBlb2YgZGF0YSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgIGNhbGxiYWNrID0gZGF0YTtcclxuICAgICAgICBkYXRhID0ge307XHJcbiAgICB9XHJcbiAgICAvLyB0ZXN0PVwidGVzdFwi5a2X5q615piv5Li65YiH5o2i5rWL6K+V5ZKM57q/5LiK546v5aKD55qE77yM5aaC5p6c5o+Q5Lqk5a6h5qC45ZKM5Y+R5biD77yM5bCGdGVzdOaUueS4uicn77yM5qCH6K+G5YiH5o2i5Li657q/5LiK546v5aKDXHJcbiAgICBjb25zdCBzZW5kRGF0YSA9IE9iamVjdC5hc3NpZ24oe30sIGRhdGEsIHsgdGVzdDogJ3Rlc3QnIH0pO1xyXG4gICAgLy8gcHB15Yqg5YWlaGVhZGVyXHJcbiAgICBjb25zdCBwcHUgPSB3eC5nZXRTdG9yYWdlU3luYygncHB1Jyk7XHJcbiAgICBjb25zb2xlLmxvZygn6K+35rGC5o6l5Y+jJywgdXJsKTtcclxuICAgIGNvbnNvbGUubG9nKCfor7fmsYLlj4LmlbAnLCBzZW5kRGF0YSk7XHJcbiAgICB3eC5zaG93TG9hZGluZyAmJiB3eC5zaG93TG9hZGluZyh7IHRpdGxlOiAn5Yqg6L295LitJywgbWFzazogdHJ1ZSB9KTtcclxuICAgIHJldHVybiB3eC5yZXF1ZXN0KHtcclxuICAgICAgICB1cmw6IGhvc3QgKyB1cmwgKyAofnVybC5pbmRleE9mKCc/JykgPyAnJyA6ICc/JykgKyAoK25ldyBEYXRlKCkpLnRvU3RyaW5nKDM2KS5zdWJzdHIoMyksXHJcbiAgICAgICAgZGF0YTogc2VuZERhdGEsXHJcbiAgICAgICAgbWV0aG9kOiBtZXRob2QsXHJcbiAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICAgJ2NvbnRlbnQtdHlwZSc6IG1ldGhvZCA9PT0gJ0dFVCcgPyAnYXBwbGljYXRpb24vanNvbicgOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9dXRmLTgnLFxyXG4gICAgICAgICAgICBQUFU6IHBwdSB8fCAnd2FuZ2hvbmd5dWUnLFxyXG4gICAgICAgICAgICAvLyAnWWt1WWRZOHJrNUFzNFQyUWFKN3YnOiAnNDU3OTc5NjY5NTgxMDAnLFxyXG4gICAgICAgICAgICByZXFmcm9tOiAnYml6X2Fzc2lzdGFudCcsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdWNjZXNzKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdyZXNwb25zZScsIHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgY29uc3QgeyBzdGF0ZSwgbXNnIH0gPSByZXNwb25zZS5kYXRhO1xyXG4gICAgICAgICAgICBpZiAoc3RhdGUgPT09IDEwMCkge1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShyZXNwb25zZS5kYXRhKTtcclxuICAgICAgICAgICAgICAgIC8vIGNhbGxiYWNrICYmIGNhbGxiYWNrKG51bGwsIHJlc3BvbnNlLmRhdGEpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHN0YXRlID09PSAtMTAwMDEpIHtcclxuICAgICAgICAgICAgICAgIHRvYXN0KG1zZyk7XHJcbiAgICAgICAgICAgICAgICAvLyBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vICAgICB3ZXB5LnJlTGF1bmNoKHtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgdXJsOiAnLi4vcGFnZXMvaW50cm8nLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgLy8gfSwgMTAwMCk7XHJcbiAgICAgICAgICAgICAgICByZWplY3QobXNnKTtcclxuICAgICAgICAgICAgICAgIC8vIGNhbGxiYWNrICYmIGNhbGxiYWNrKG51bGwsIHJlc3BvbnNlLmRhdGEpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmVqZWN0KG1zZyk7XHJcbiAgICAgICAgICAgICAgICAvLyBjYWxsYmFjayAmJiBjYWxsYmFjayhtc2cpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBmYWlsKGUpIHtcclxuICAgICAgICAgICAgcmVqZWN0KGUpO1xyXG4gICAgICAgICAgICBjYWxsYmFjayAmJiBjYWxsYmFjayhlKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbXBsZXRlKCkge1xyXG4gICAgICAgICAgICB3eC5oaWRlTG9hZGluZyAmJiB3eC5oaWRlTG9hZGluZygpO1xyXG4gICAgICAgIH0sXHJcbiAgICB9KTtcclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cy5nZXQgPSAoLi4ucHJvcHMpID0+IGh0dHAoJ0dFVCcsIC4uLnByb3BzKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzLnBvc3QgPSAoLi4ucHJvcHMpID0+IGh0dHAoJ1BPU1QnLCAuLi5wcm9wcyk7XHJcbiJdfQ==