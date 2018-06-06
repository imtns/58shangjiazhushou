'use strict';

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _index = require('./index.js');

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

    var sendData = Object.assign({}, param);
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
            }
        }).then(function (response) {
            console.log('response', response);
            showLoading && _wepy2.default.hideLoading && _wepy2.default.hideLoading();
            var _response$data = response.data,
                state = _response$data.state,
                msg = _response$data.msg,
                data = _response$data.data;

            if (state === 100) {
                resolve([null, data]);
            } else if (state === -10001) {
                (0, _index.toast)(msg);
                setTimeout(function () {
                    _wepy2.default.reLaunch({
                        url: '../pages/intro'
                    });
                }, 1000);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFqYXhQLmpzIl0sIm5hbWVzIjpbInRlc3QiLCJob3N0IiwiaHR0cCIsIm1ldGhvZCIsInByb3BzIiwidXJsIiwicGFyYW0iLCJzaG93TG9hZGluZyIsInNlbmREYXRhIiwiT2JqZWN0IiwiYXNzaWduIiwicHB1Iiwid2VweSIsImdldFN0b3JhZ2VTeW5jIiwiY29uc29sZSIsImxvZyIsInRpdGxlIiwibWFzayIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVxdWVzdCIsImluZGV4T2YiLCJEYXRlIiwidG9TdHJpbmciLCJzdWJzdHIiLCJkYXRhIiwiZGF0YVR5cGUiLCJoZWFkZXIiLCJQUFUiLCJyZXFmcm9tIiwidGhlbiIsInJlc3BvbnNlIiwiaGlkZUxvYWRpbmciLCJzdGF0ZSIsIm1zZyIsInNldFRpbWVvdXQiLCJyZUxhdW5jaCIsImNhdGNoIiwiZXJyIiwiZXJyTXNnIiwibW9kdWxlIiwiZXhwb3J0cyIsImdldCIsInBvc3QiXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7QUFDQTs7OztBQUVBLElBQU1BLE9BQU8sTUFBYjtBQUNBLElBQU1DLE9BQU8sc0JBQWI7QUFDQSxJQUFNQyxPQUFPLFNBQVBBLElBQU8sQ0FBQ0MsTUFBRCxFQUFzQjtBQUFBLHNDQUFWQyxLQUFVO0FBQVZBLGFBQVU7QUFBQTs7QUFBQSxRQUN4QkMsR0FEd0IsR0FDVUQsS0FEVjtBQUFBLFFBQ25CRSxLQURtQixHQUNVRixLQURWO0FBQUEsa0JBQ1VBLEtBRFY7QUFBQSxRQUNaRyxXQURZLDJCQUNFLElBREY7O0FBRS9CLFFBQU1DLFdBQVdDLE9BQU9DLE1BQVAsQ0FBYyxFQUFkLEVBQWtCSixLQUFsQixDQUFqQjtBQUNBO0FBQ0EsUUFBTUssTUFBTUMsZUFBS0MsY0FBTCxDQUFvQixLQUFwQixDQUFaO0FBQ0FDLFlBQVFDLEdBQVIsQ0FBWSxNQUFaLEVBQW9CVixHQUFwQjtBQUNBUyxZQUFRQyxHQUFSLENBQVksTUFBWixFQUFvQlQsS0FBcEI7QUFDQUMsbUJBQWVLLGVBQUtMLFdBQXBCLElBQW1DSyxlQUFLTCxXQUFMLENBQWlCLEVBQUVTLE9BQU8sS0FBVCxFQUFnQkMsTUFBTSxJQUF0QixFQUFqQixDQUFuQztBQUNBLFdBQU8sSUFBSUMsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBYTtBQUM1QlAsdUJBQUtRLE9BQUwsQ0FBYTtBQUNUZixpQkFBS0osT0FBT0ksR0FBUCxJQUFjLENBQUNBLElBQUlnQixPQUFKLENBQVksR0FBWixDQUFELEdBQW9CLEVBQXBCLEdBQXlCLEdBQXZDLElBQThDLENBQUMsQ0FBQyxJQUFJQyxJQUFKLEVBQUYsRUFBY0MsUUFBZCxDQUF1QixFQUF2QixFQUEyQkMsTUFBM0IsQ0FBa0MsQ0FBbEMsQ0FEMUM7QUFFVEMsa0JBQU1qQixRQUZHO0FBR1RMLG9CQUFRQSxNQUhDO0FBSVR1QixzQkFBVSxNQUpEO0FBS1RDLG9CQUFRO0FBQ0osZ0NBQWdCeEIsV0FBVyxLQUFYLEdBQW1CLGtCQUFuQixHQUF3QyxpREFEcEQ7QUFFSnlCLHFCQUFLakIsT0FBTyxhQUZSO0FBR0prQix5QkFBUztBQUhMO0FBTEMsU0FBYixFQVVHQyxJQVZILENBVVEsVUFBQ0MsUUFBRCxFQUFjO0FBQ2xCakIsb0JBQVFDLEdBQVIsQ0FBWSxVQUFaLEVBQXdCZ0IsUUFBeEI7QUFDQXhCLDJCQUFlSyxlQUFLb0IsV0FBcEIsSUFBbUNwQixlQUFLb0IsV0FBTCxFQUFuQztBQUZrQixpQ0FHV0QsU0FBU04sSUFIcEI7QUFBQSxnQkFHVlEsS0FIVSxrQkFHVkEsS0FIVTtBQUFBLGdCQUdIQyxHQUhHLGtCQUdIQSxHQUhHO0FBQUEsZ0JBR0VULElBSEYsa0JBR0VBLElBSEY7O0FBSWxCLGdCQUFJUSxVQUFVLEdBQWQsRUFBbUI7QUFDZmQsd0JBQVEsQ0FBQyxJQUFELEVBQU9NLElBQVAsQ0FBUjtBQUNILGFBRkQsTUFFTyxJQUFJUSxVQUFVLENBQUMsS0FBZixFQUFzQjtBQUN6QixrQ0FBTUMsR0FBTjtBQUNBQywyQkFBVyxZQUFNO0FBQ2J2QixtQ0FBS3dCLFFBQUwsQ0FBYztBQUNWL0IsNkJBQUs7QUFESyxxQkFBZDtBQUdILGlCQUpELEVBSUcsSUFKSDtBQUtILGFBUE0sTUFPQTtBQUNIYyx3QkFBUSxDQUFDZSxHQUFELENBQVI7QUFDSDtBQUNKLFNBMUJELEVBMEJHRyxLQTFCSCxDQTBCUyxVQUFDQyxHQUFELEVBQVM7QUFDZC9CLDJCQUFlSyxlQUFLb0IsV0FBcEIsSUFBbUNwQixlQUFLb0IsV0FBTCxFQUFuQztBQUNBYixvQkFBUSxDQUFDbUIsSUFBSUMsTUFBTCxDQUFSO0FBQ0gsU0E3QkQ7QUE4QkgsS0EvQk0sQ0FBUDtBQWdDSCxDQXhDRDs7QUEwQ0FDLE9BQU9DLE9BQVAsQ0FBZUMsR0FBZixHQUFxQjtBQUFBLHVDQUFJdEMsS0FBSjtBQUFJQSxhQUFKO0FBQUE7O0FBQUEsV0FBY0YsdUJBQUssS0FBTCxTQUFlRSxLQUFmLEVBQWQ7QUFBQSxDQUFyQjs7QUFFQW9DLE9BQU9DLE9BQVAsQ0FBZUUsSUFBZixHQUFzQjtBQUFBLHVDQUFJdkMsS0FBSjtBQUFJQSxhQUFKO0FBQUE7O0FBQUEsV0FBY0YsdUJBQUssTUFBTCxTQUFnQkUsS0FBaEIsRUFBZDtBQUFBLENBQXRCIiwiZmlsZSI6ImFqYXhQLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5pbXBvcnQgeyB0b2FzdCB9IGZyb20gJy4vaW5kZXgnO1xuXG5jb25zdCB0ZXN0ID0gJ3Rlc3QnO1xuY29uc3QgaG9zdCA9ICdodHRwczovL3lhb2ZhLjU4LmNvbSc7XG5jb25zdCBodHRwID0gKG1ldGhvZCwgLi4ucHJvcHMpID0+IHtcbiAgICBjb25zdCBbdXJsLCBwYXJhbSwgc2hvd0xvYWRpbmcgPSB0cnVlXSA9IHByb3BzO1xuICAgIGNvbnN0IHNlbmREYXRhID0gT2JqZWN0LmFzc2lnbih7fSwgcGFyYW0pO1xuICAgIC8vIHBwdeWKoOWFpWhlYWRlclxuICAgIGNvbnN0IHBwdSA9IHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ3BwdScpO1xuICAgIGNvbnNvbGUubG9nKCfor7fmsYLmjqXlj6MnLCB1cmwpO1xuICAgIGNvbnNvbGUubG9nKCfor7fmsYLlj4LmlbAnLCBwYXJhbSk7XG4gICAgc2hvd0xvYWRpbmcgJiYgd2VweS5zaG93TG9hZGluZyAmJiB3ZXB5LnNob3dMb2FkaW5nKHsgdGl0bGU6ICfliqDovb3kuK0nLCBtYXNrOiB0cnVlIH0pO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICB3ZXB5LnJlcXVlc3Qoe1xuICAgICAgICAgICAgdXJsOiBob3N0ICsgdXJsICsgKH51cmwuaW5kZXhPZignPycpID8gJycgOiAnPycpICsgKCtuZXcgRGF0ZSgpKS50b1N0cmluZygzNikuc3Vic3RyKDMpLFxuICAgICAgICAgICAgZGF0YTogc2VuZERhdGEsXG4gICAgICAgICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgICAgICBoZWFkZXI6IHtcbiAgICAgICAgICAgICAgICAnY29udGVudC10eXBlJzogbWV0aG9kID09PSAnR0VUJyA/ICdhcHBsaWNhdGlvbi9qc29uJyA6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7Y2hhcnNldD11dGYtOCcsXG4gICAgICAgICAgICAgICAgUFBVOiBwcHUgfHwgJ3dhbmdob25neXVlJyxcbiAgICAgICAgICAgICAgICByZXFmcm9tOiAnYml6X2Fzc2lzdGFudCcsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9KS50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ3Jlc3BvbnNlJywgcmVzcG9uc2UpO1xuICAgICAgICAgICAgc2hvd0xvYWRpbmcgJiYgd2VweS5oaWRlTG9hZGluZyAmJiB3ZXB5LmhpZGVMb2FkaW5nKCk7XG4gICAgICAgICAgICBjb25zdCB7IHN0YXRlLCBtc2csIGRhdGEgfSA9IHJlc3BvbnNlLmRhdGE7XG4gICAgICAgICAgICBpZiAoc3RhdGUgPT09IDEwMCkge1xuICAgICAgICAgICAgICAgIHJlc29sdmUoW251bGwsIGRhdGFdKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc3RhdGUgPT09IC0xMDAwMSkge1xuICAgICAgICAgICAgICAgIHRvYXN0KG1zZyk7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHdlcHkucmVMYXVuY2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiAnLi4vcGFnZXMvaW50cm8nLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShbbXNnXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICAgIHNob3dMb2FkaW5nICYmIHdlcHkuaGlkZUxvYWRpbmcgJiYgd2VweS5oaWRlTG9hZGluZygpO1xuICAgICAgICAgICAgcmVzb2x2ZShbZXJyLmVyck1zZ10pO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzLmdldCA9ICguLi5wcm9wcykgPT4gaHR0cCgnR0VUJywgLi4ucHJvcHMpO1xuXG5tb2R1bGUuZXhwb3J0cy5wb3N0ID0gKC4uLnByb3BzKSA9PiBodHRwKCdQT1NUJywgLi4ucHJvcHMpO1xuIl19