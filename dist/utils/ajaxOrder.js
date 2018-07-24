'use strict';

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var test = 'test';
var host = 'https://yaofa.58.com';
var http = function http(method) {
    for (var _len = arguments.length, props = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        props[_key - 1] = arguments[_key];
    }

    var url = props[0],
        param = props[1],
        _props$ = props[2],
        showLoading = _props$ === undefined ? true : _props$;

    var sendData = Object.assign({}, param, { test: test });
    // ppu加入header
    var ppu = _wepy2.default.getStorageSync('ppu');
    console.log('请求接口', url);
    console.log('请求参数', param);
    showLoading && _wepy2.default.showLoading && _wepy2.default.showLoading({ title: '加载中', mask: true });
    return new Promise(function (resolve) {
        _wepy2.default.request({
            url: host + url + (~url.indexOf('?') ? '' : '?') + (+new Date()).toString(36).substr(3),
            data: sendData,
            method: method,
            dataType: 'json',
            header: {
                'content-type': method === 'GET' ? 'application/json' : 'application/x-www-form-urlencoded;charset=utf-8',
                PPU: ppu || 'wanghongyue',
                reqfrom: 'biz_assistant'
                // YkuYdY8rk5As4T2QaJ7v: '15293583575559',
            }
        }).then(function (response) {
            console.log('ajaxOrder.response', response);
            showLoading && _wepy2.default.hideLoading && _wepy2.default.hideLoading();
            var _response$data = response.data,
                state = _response$data.state,
                msg = _response$data.msg;

            if (state === 100) {
                resolve([null, response.data]);
            } else {
                resolve([msg]);
            }
        }).catch(function (err) {
            showLoading && _wepy2.default.hideLoading && _wepy2.default.hideLoading();
            resolve([err.errMsg]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFqYXhPcmRlci5qcyJdLCJuYW1lcyI6WyJ0ZXN0IiwiaG9zdCIsImh0dHAiLCJtZXRob2QiLCJwcm9wcyIsInVybCIsInBhcmFtIiwic2hvd0xvYWRpbmciLCJzZW5kRGF0YSIsIk9iamVjdCIsImFzc2lnbiIsInBwdSIsIndlcHkiLCJnZXRTdG9yYWdlU3luYyIsImNvbnNvbGUiLCJsb2ciLCJ0aXRsZSIsIm1hc2siLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlcXVlc3QiLCJpbmRleE9mIiwiRGF0ZSIsInRvU3RyaW5nIiwic3Vic3RyIiwiZGF0YSIsImRhdGFUeXBlIiwiaGVhZGVyIiwiUFBVIiwicmVxZnJvbSIsInRoZW4iLCJyZXNwb25zZSIsImhpZGVMb2FkaW5nIiwic3RhdGUiLCJtc2ciLCJjYXRjaCIsImVyciIsImVyck1zZyIsIm1vZHVsZSIsImV4cG9ydHMiLCJnZXQiLCJwb3N0Il0sIm1hcHBpbmdzIjoiOztBQUFBOzs7Ozs7QUFFQSxJQUFNQSxPQUFPLE1BQWI7QUFDQSxJQUFNQyxPQUFPLHNCQUFiO0FBQ0EsSUFBTUMsT0FBTyxTQUFQQSxJQUFPLENBQUNDLE1BQUQsRUFBc0I7QUFBQSxzQ0FBVkMsS0FBVTtBQUFWQSxhQUFVO0FBQUE7O0FBQUEsUUFDeEJDLEdBRHdCLEdBQ1VELEtBRFY7QUFBQSxRQUNuQkUsS0FEbUIsR0FDVUYsS0FEVjtBQUFBLGtCQUNVQSxLQURWO0FBQUEsUUFDWkcsV0FEWSwyQkFDRSxJQURGOztBQUUvQixRQUFNQyxXQUFXQyxPQUFPQyxNQUFQLENBQWMsRUFBZCxFQUFrQkosS0FBbEIsRUFBeUIsRUFBRU4sVUFBRixFQUF6QixDQUFqQjtBQUNBO0FBQ0EsUUFBTVcsTUFBTUMsZUFBS0MsY0FBTCxDQUFvQixLQUFwQixDQUFaO0FBQ0FDLFlBQVFDLEdBQVIsQ0FBWSxNQUFaLEVBQW9CVixHQUFwQjtBQUNBUyxZQUFRQyxHQUFSLENBQVksTUFBWixFQUFvQlQsS0FBcEI7QUFDQUMsbUJBQWVLLGVBQUtMLFdBQXBCLElBQW1DSyxlQUFLTCxXQUFMLENBQWlCLEVBQUVTLE9BQU8sS0FBVCxFQUFnQkMsTUFBTSxJQUF0QixFQUFqQixDQUFuQztBQUNBLFdBQU8sSUFBSUMsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBYTtBQUM1QlAsdUJBQUtRLE9BQUwsQ0FBYTtBQUNUZixpQkFBS0osT0FBT0ksR0FBUCxJQUFjLENBQUNBLElBQUlnQixPQUFKLENBQVksR0FBWixDQUFELEdBQW9CLEVBQXBCLEdBQXlCLEdBQXZDLElBQThDLENBQUMsQ0FBQyxJQUFJQyxJQUFKLEVBQUYsRUFBY0MsUUFBZCxDQUF1QixFQUF2QixFQUEyQkMsTUFBM0IsQ0FBa0MsQ0FBbEMsQ0FEMUM7QUFFVEMsa0JBQU1qQixRQUZHO0FBR1RMLG9CQUFRQSxNQUhDO0FBSVR1QixzQkFBVSxNQUpEO0FBS1RDLG9CQUFRO0FBQ0osZ0NBQWdCeEIsV0FBVyxLQUFYLEdBQW1CLGtCQUFuQixHQUF3QyxpREFEcEQ7QUFFSnlCLHFCQUFLakIsT0FBTyxhQUZSO0FBR0prQix5QkFBUztBQUNUO0FBSkk7QUFMQyxTQUFiLEVBV0dDLElBWEgsQ0FXUSxVQUFDQyxRQUFELEVBQWM7QUFDbEJqQixvQkFBUUMsR0FBUixDQUFZLG9CQUFaLEVBQWtDZ0IsUUFBbEM7QUFDQXhCLDJCQUFlSyxlQUFLb0IsV0FBcEIsSUFBbUNwQixlQUFLb0IsV0FBTCxFQUFuQztBQUZrQixpQ0FHS0QsU0FBU04sSUFIZDtBQUFBLGdCQUdWUSxLQUhVLGtCQUdWQSxLQUhVO0FBQUEsZ0JBR0hDLEdBSEcsa0JBR0hBLEdBSEc7O0FBSWxCLGdCQUFJRCxVQUFVLEdBQWQsRUFBbUI7QUFDZmQsd0JBQVEsQ0FBQyxJQUFELEVBQU9ZLFNBQVNOLElBQWhCLENBQVI7QUFDSCxhQUZELE1BRU87QUFDSE4sd0JBQVEsQ0FBQ2UsR0FBRCxDQUFSO0FBQ0g7QUFDSixTQXBCRCxFQW9CR0MsS0FwQkgsQ0FvQlMsVUFBQ0MsR0FBRCxFQUFTO0FBQ2Q3QiwyQkFBZUssZUFBS29CLFdBQXBCLElBQW1DcEIsZUFBS29CLFdBQUwsRUFBbkM7QUFDQWIsb0JBQVEsQ0FBQ2lCLElBQUlDLE1BQUwsQ0FBUjtBQUNILFNBdkJEO0FBd0JILEtBekJNLENBQVA7QUEwQkgsQ0FsQ0Q7O0FBb0NBQyxPQUFPQyxPQUFQLENBQWVDLEdBQWYsR0FBcUI7QUFBQSx1Q0FBSXBDLEtBQUo7QUFBSUEsYUFBSjtBQUFBOztBQUFBLFdBQWNGLHVCQUFLLEtBQUwsU0FBZUUsS0FBZixFQUFkO0FBQUEsQ0FBckI7O0FBRUFrQyxPQUFPQyxPQUFQLENBQWVFLElBQWYsR0FBc0I7QUFBQSx1Q0FBSXJDLEtBQUo7QUFBSUEsYUFBSjtBQUFBOztBQUFBLFdBQWNGLHVCQUFLLE1BQUwsU0FBZ0JFLEtBQWhCLEVBQWQ7QUFBQSxDQUF0QiIsImZpbGUiOiJhamF4T3JkZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcblxuY29uc3QgdGVzdCA9ICd0ZXN0JztcbmNvbnN0IGhvc3QgPSAnaHR0cHM6Ly95YW9mYS41OC5jb20nO1xuY29uc3QgaHR0cCA9IChtZXRob2QsIC4uLnByb3BzKSA9PiB7XG4gICAgY29uc3QgW3VybCwgcGFyYW0sIHNob3dMb2FkaW5nID0gdHJ1ZV0gPSBwcm9wcztcbiAgICBjb25zdCBzZW5kRGF0YSA9IE9iamVjdC5hc3NpZ24oe30sIHBhcmFtLCB7IHRlc3QgfSk7XG4gICAgLy8gcHB15Yqg5YWlaGVhZGVyXG4gICAgY29uc3QgcHB1ID0gd2VweS5nZXRTdG9yYWdlU3luYygncHB1Jyk7XG4gICAgY29uc29sZS5sb2coJ+ivt+axguaOpeWPoycsIHVybCk7XG4gICAgY29uc29sZS5sb2coJ+ivt+axguWPguaVsCcsIHBhcmFtKTtcbiAgICBzaG93TG9hZGluZyAmJiB3ZXB5LnNob3dMb2FkaW5nICYmIHdlcHkuc2hvd0xvYWRpbmcoeyB0aXRsZTogJ+WKoOi9veS4rScsIG1hc2s6IHRydWUgfSk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgIHdlcHkucmVxdWVzdCh7XG4gICAgICAgICAgICB1cmw6IGhvc3QgKyB1cmwgKyAofnVybC5pbmRleE9mKCc/JykgPyAnJyA6ICc/JykgKyAoK25ldyBEYXRlKCkpLnRvU3RyaW5nKDM2KS5zdWJzdHIoMyksXG4gICAgICAgICAgICBkYXRhOiBzZW5kRGF0YSxcbiAgICAgICAgICAgIG1ldGhvZDogbWV0aG9kLFxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgICAgIGhlYWRlcjoge1xuICAgICAgICAgICAgICAgICdjb250ZW50LXR5cGUnOiBtZXRob2QgPT09ICdHRVQnID8gJ2FwcGxpY2F0aW9uL2pzb24nIDogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDtjaGFyc2V0PXV0Zi04JyxcbiAgICAgICAgICAgICAgICBQUFU6IHBwdSB8fCAnd2FuZ2hvbmd5dWUnLFxuICAgICAgICAgICAgICAgIHJlcWZyb206ICdiaXpfYXNzaXN0YW50JyxcbiAgICAgICAgICAgICAgICAvLyBZa3VZZFk4cms1QXM0VDJRYUo3djogJzE1MjkzNTgzNTc1NTU5JyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnYWpheE9yZGVyLnJlc3BvbnNlJywgcmVzcG9uc2UpO1xuICAgICAgICAgICAgc2hvd0xvYWRpbmcgJiYgd2VweS5oaWRlTG9hZGluZyAmJiB3ZXB5LmhpZGVMb2FkaW5nKCk7XG4gICAgICAgICAgICBjb25zdCB7IHN0YXRlLCBtc2cgfSA9IHJlc3BvbnNlLmRhdGE7XG4gICAgICAgICAgICBpZiAoc3RhdGUgPT09IDEwMCkge1xuICAgICAgICAgICAgICAgIHJlc29sdmUoW251bGwsIHJlc3BvbnNlLmRhdGFdKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShbbXNnXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICAgIHNob3dMb2FkaW5nICYmIHdlcHkuaGlkZUxvYWRpbmcgJiYgd2VweS5oaWRlTG9hZGluZygpO1xuICAgICAgICAgICAgcmVzb2x2ZShbZXJyLmVyck1zZ10pO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzLmdldCA9ICguLi5wcm9wcykgPT4gaHR0cCgnR0VUJywgLi4ucHJvcHMpO1xuXG5tb2R1bGUuZXhwb3J0cy5wb3N0ID0gKC4uLnByb3BzKSA9PiBodHRwKCdQT1NUJywgLi4ucHJvcHMpO1xuIl19