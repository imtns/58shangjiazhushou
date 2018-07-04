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

    var sendData = Object.assign({}, param, { test: test });
    // ppu加入header
    var ppu = _wepy2.default.getStorageSync('ppu');
    console.log('请求接口', url);
    console.log('请求参数', sendData);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFqYXhQLmpzIl0sIm5hbWVzIjpbInRlc3QiLCJob3N0IiwiaHR0cCIsIm1ldGhvZCIsInByb3BzIiwidXJsIiwicGFyYW0iLCJzaG93TG9hZGluZyIsInNlbmREYXRhIiwiT2JqZWN0IiwiYXNzaWduIiwicHB1Iiwid2VweSIsImdldFN0b3JhZ2VTeW5jIiwiY29uc29sZSIsImxvZyIsInRpdGxlIiwibWFzayIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVxdWVzdCIsImluZGV4T2YiLCJEYXRlIiwidG9TdHJpbmciLCJzdWJzdHIiLCJkYXRhIiwiZGF0YVR5cGUiLCJoZWFkZXIiLCJQUFUiLCJyZXFmcm9tIiwidGhlbiIsInJlc3BvbnNlIiwiaGlkZUxvYWRpbmciLCJzdGF0ZSIsIm1zZyIsInNldFRpbWVvdXQiLCJyZUxhdW5jaCIsImNhdGNoIiwiZXJyIiwiZXJyTXNnIiwibW9kdWxlIiwiZXhwb3J0cyIsImdldCIsInBvc3QiXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7QUFDQTs7OztBQUVBLElBQU1BLE9BQU8sTUFBYjtBQUNBLElBQU1DLE9BQU8sc0JBQWI7QUFDQSxJQUFNQyxPQUFPLFNBQVBBLElBQU8sQ0FBQ0MsTUFBRCxFQUFzQjtBQUFBLHNDQUFWQyxLQUFVO0FBQVZBLGFBQVU7QUFBQTs7QUFBQSxRQUN4QkMsR0FEd0IsR0FDVUQsS0FEVjtBQUFBLFFBQ25CRSxLQURtQixHQUNVRixLQURWO0FBQUEsa0JBQ1VBLEtBRFY7QUFBQSxRQUNaRyxXQURZLDJCQUNFLElBREY7O0FBRS9CLFFBQU1DLFdBQVdDLE9BQU9DLE1BQVAsQ0FBYyxFQUFkLEVBQWtCSixLQUFsQixFQUF5QixFQUFFTixVQUFGLEVBQXpCLENBQWpCO0FBQ0E7QUFDQSxRQUFNVyxNQUFNQyxlQUFLQyxjQUFMLENBQW9CLEtBQXBCLENBQVo7QUFDQUMsWUFBUUMsR0FBUixDQUFZLE1BQVosRUFBb0JWLEdBQXBCO0FBQ0FTLFlBQVFDLEdBQVIsQ0FBWSxNQUFaLEVBQW9CUCxRQUFwQjtBQUNBRCxtQkFBZUssZUFBS0wsV0FBcEIsSUFBbUNLLGVBQUtMLFdBQUwsQ0FBaUIsRUFBRVMsT0FBTyxLQUFULEVBQWdCQyxNQUFNLElBQXRCLEVBQWpCLENBQW5DO0FBQ0EsV0FBTyxJQUFJQyxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFhO0FBQzVCUCx1QkFBS1EsT0FBTCxDQUFhO0FBQ1RmLGlCQUFLSixPQUFPSSxHQUFQLElBQWMsQ0FBQ0EsSUFBSWdCLE9BQUosQ0FBWSxHQUFaLENBQUQsR0FBb0IsRUFBcEIsR0FBeUIsR0FBdkMsSUFBOEMsQ0FBQyxDQUFDLElBQUlDLElBQUosRUFBRixFQUFjQyxRQUFkLENBQXVCLEVBQXZCLEVBQTJCQyxNQUEzQixDQUFrQyxDQUFsQyxDQUQxQztBQUVUQyxrQkFBTWpCLFFBRkc7QUFHVEwsb0JBQVFBLE1BSEM7QUFJVHVCLHNCQUFVLE1BSkQ7QUFLVEMsb0JBQVE7QUFDSixnQ0FBZ0J4QixXQUFXLEtBQVgsR0FBbUIsa0JBQW5CLEdBQXdDLGlEQURwRDtBQUVKeUIscUJBQUtqQixPQUFPLGFBRlI7QUFHSmtCLHlCQUFTO0FBSEw7QUFMQyxTQUFiLEVBVUdDLElBVkgsQ0FVUSxVQUFDQyxRQUFELEVBQWM7QUFDbEJqQixvQkFBUUMsR0FBUixDQUFZLFVBQVosRUFBd0JnQixRQUF4QjtBQUNBeEIsMkJBQWVLLGVBQUtvQixXQUFwQixJQUFtQ3BCLGVBQUtvQixXQUFMLEVBQW5DO0FBRmtCLGlDQUdXRCxTQUFTTixJQUhwQjtBQUFBLGdCQUdWUSxLQUhVLGtCQUdWQSxLQUhVO0FBQUEsZ0JBR0hDLEdBSEcsa0JBR0hBLEdBSEc7QUFBQSxnQkFHRVQsSUFIRixrQkFHRUEsSUFIRjs7QUFJbEIsZ0JBQUlRLFVBQVUsR0FBZCxFQUFtQjtBQUNmZCx3QkFBUSxDQUFDLElBQUQsRUFBT00sSUFBUCxDQUFSO0FBQ0gsYUFGRCxNQUVPLElBQUlRLFVBQVUsQ0FBQyxLQUFmLEVBQXNCO0FBQ3pCLGtDQUFNQyxHQUFOO0FBQ0FDLDJCQUFXLFlBQU07QUFDYnZCLG1DQUFLd0IsUUFBTCxDQUFjO0FBQ1YvQiw2QkFBSztBQURLLHFCQUFkO0FBR0gsaUJBSkQsRUFJRyxJQUpIO0FBS0gsYUFQTSxNQU9BO0FBQ0hjLHdCQUFRLENBQUNlLEdBQUQsQ0FBUjtBQUNIO0FBQ0osU0ExQkQsRUEwQkdHLEtBMUJILENBMEJTLFVBQUNDLEdBQUQsRUFBUztBQUNkL0IsMkJBQWVLLGVBQUtvQixXQUFwQixJQUFtQ3BCLGVBQUtvQixXQUFMLEVBQW5DO0FBQ0FiLG9CQUFRLENBQUNtQixJQUFJQyxNQUFMLENBQVI7QUFDSCxTQTdCRDtBQThCSCxLQS9CTSxDQUFQO0FBZ0NILENBeENEOztBQTBDQUMsT0FBT0MsT0FBUCxDQUFlQyxHQUFmLEdBQXFCO0FBQUEsdUNBQUl0QyxLQUFKO0FBQUlBLGFBQUo7QUFBQTs7QUFBQSxXQUFjRix1QkFBSyxLQUFMLFNBQWVFLEtBQWYsRUFBZDtBQUFBLENBQXJCOztBQUVBb0MsT0FBT0MsT0FBUCxDQUFlRSxJQUFmLEdBQXNCO0FBQUEsdUNBQUl2QyxLQUFKO0FBQUlBLGFBQUo7QUFBQTs7QUFBQSxXQUFjRix1QkFBSyxNQUFMLFNBQWdCRSxLQUFoQixFQUFkO0FBQUEsQ0FBdEIiLCJmaWxlIjoiYWpheFAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbmltcG9ydCB7IHRvYXN0IH0gZnJvbSAnLi9pbmRleCc7XG5cbmNvbnN0IHRlc3QgPSAndGVzdCc7XG5jb25zdCBob3N0ID0gJ2h0dHBzOi8veWFvZmEuNTguY29tJztcbmNvbnN0IGh0dHAgPSAobWV0aG9kLCAuLi5wcm9wcykgPT4ge1xuICAgIGNvbnN0IFt1cmwsIHBhcmFtLCBzaG93TG9hZGluZyA9IHRydWVdID0gcHJvcHM7XG4gICAgY29uc3Qgc2VuZERhdGEgPSBPYmplY3QuYXNzaWduKHt9LCBwYXJhbSwgeyB0ZXN0IH0pO1xuICAgIC8vIHBwdeWKoOWFpWhlYWRlclxuICAgIGNvbnN0IHBwdSA9IHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ3BwdScpO1xuICAgIGNvbnNvbGUubG9nKCfor7fmsYLmjqXlj6MnLCB1cmwpO1xuICAgIGNvbnNvbGUubG9nKCfor7fmsYLlj4LmlbAnLCBzZW5kRGF0YSk7XG4gICAgc2hvd0xvYWRpbmcgJiYgd2VweS5zaG93TG9hZGluZyAmJiB3ZXB5LnNob3dMb2FkaW5nKHsgdGl0bGU6ICfliqDovb3kuK0nLCBtYXNrOiB0cnVlIH0pO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICB3ZXB5LnJlcXVlc3Qoe1xuICAgICAgICAgICAgdXJsOiBob3N0ICsgdXJsICsgKH51cmwuaW5kZXhPZignPycpID8gJycgOiAnPycpICsgKCtuZXcgRGF0ZSgpKS50b1N0cmluZygzNikuc3Vic3RyKDMpLFxuICAgICAgICAgICAgZGF0YTogc2VuZERhdGEsXG4gICAgICAgICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgICAgICBoZWFkZXI6IHtcbiAgICAgICAgICAgICAgICAnY29udGVudC10eXBlJzogbWV0aG9kID09PSAnR0VUJyA/ICdhcHBsaWNhdGlvbi9qc29uJyA6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7Y2hhcnNldD11dGYtOCcsXG4gICAgICAgICAgICAgICAgUFBVOiBwcHUgfHwgJ3dhbmdob25neXVlJyxcbiAgICAgICAgICAgICAgICByZXFmcm9tOiAnYml6X2Fzc2lzdGFudCcsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9KS50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ3Jlc3BvbnNlJywgcmVzcG9uc2UpO1xuICAgICAgICAgICAgc2hvd0xvYWRpbmcgJiYgd2VweS5oaWRlTG9hZGluZyAmJiB3ZXB5LmhpZGVMb2FkaW5nKCk7XG4gICAgICAgICAgICBjb25zdCB7IHN0YXRlLCBtc2csIGRhdGEgfSA9IHJlc3BvbnNlLmRhdGE7XG4gICAgICAgICAgICBpZiAoc3RhdGUgPT09IDEwMCkge1xuICAgICAgICAgICAgICAgIHJlc29sdmUoW251bGwsIGRhdGFdKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc3RhdGUgPT09IC0xMDAwMSkge1xuICAgICAgICAgICAgICAgIHRvYXN0KG1zZyk7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHdlcHkucmVMYXVuY2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiAnLi4vcGFnZXMvaW50cm8nLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShbbXNnXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICAgIHNob3dMb2FkaW5nICYmIHdlcHkuaGlkZUxvYWRpbmcgJiYgd2VweS5oaWRlTG9hZGluZygpO1xuICAgICAgICAgICAgcmVzb2x2ZShbZXJyLmVyck1zZ10pO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzLmdldCA9ICguLi5wcm9wcykgPT4gaHR0cCgnR0VUJywgLi4ucHJvcHMpO1xuXG5tb2R1bGUuZXhwb3J0cy5wb3N0ID0gKC4uLnByb3BzKSA9PiBodHRwKCdQT1NUJywgLi4ucHJvcHMpO1xuIl19