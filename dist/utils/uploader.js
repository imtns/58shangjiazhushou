'use strict';

var uploadUrl = 'https://yaofa.58.com/fileUpload';

module.exports.uploader = function (tempFilePath) {
    for (var _len = arguments.length, props = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        props[_key - 1] = arguments[_key];
    }

    var params = props[0],
        callback = props[1],
        noLoading = props[2];

    if (typeof params === 'function') {
        noLoading = callback;
        callback = params;
        params = {};
    }

    var formData = params && params.data || {};
    var name = params && params.name || 'content';

    !noLoading && wx.showLoading && wx.showLoading({ title: '上传中', mask: true });
    return wx.uploadFile({
        url: uploadUrl,
        name: name,
        formData: formData,
        filePath: tempFilePath,
        success: function success(_ref) {
            var data = _ref.data;

            var nData = JSON.parse(data);
            console.log(nData);
            if (nData.state === 100) {
                callback && callback(null, nData.data);
            } else {
                callback('上传失败');
            }
        },
        fail: function fail() {
            callback('上传失败');
        },
        complete: function complete() {
            !noLoading && wx.hideLoading && wx.hideLoading();
        }
    });
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVwbG9hZGVyLmpzIl0sIm5hbWVzIjpbInVwbG9hZFVybCIsIm1vZHVsZSIsImV4cG9ydHMiLCJ1cGxvYWRlciIsInRlbXBGaWxlUGF0aCIsInByb3BzIiwicGFyYW1zIiwiY2FsbGJhY2siLCJub0xvYWRpbmciLCJmb3JtRGF0YSIsImRhdGEiLCJuYW1lIiwid3giLCJzaG93TG9hZGluZyIsInRpdGxlIiwibWFzayIsInVwbG9hZEZpbGUiLCJ1cmwiLCJmaWxlUGF0aCIsInN1Y2Nlc3MiLCJuRGF0YSIsIkpTT04iLCJwYXJzZSIsImNvbnNvbGUiLCJsb2ciLCJzdGF0ZSIsImZhaWwiLCJjb21wbGV0ZSIsImhpZGVMb2FkaW5nIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQU1BLFlBQVksaUNBQWxCOztBQUVBQyxPQUFPQyxPQUFQLENBQWVDLFFBQWYsR0FBMEIsVUFBQ0MsWUFBRCxFQUE0QjtBQUFBLHNDQUFWQyxLQUFVO0FBQVZBLGFBQVU7QUFBQTs7QUFBQSxRQUM3Q0MsTUFENkMsR0FDZEQsS0FEYztBQUFBLFFBQ3JDRSxRQURxQyxHQUNkRixLQURjO0FBQUEsUUFDM0JHLFNBRDJCLEdBQ2RILEtBRGM7O0FBRWxELFFBQUksT0FBT0MsTUFBUCxLQUFrQixVQUF0QixFQUFrQztBQUM5QkUsb0JBQVlELFFBQVo7QUFDQUEsbUJBQVdELE1BQVg7QUFDQUEsaUJBQVMsRUFBVDtBQUNIOztBQUVELFFBQU1HLFdBQVdILFVBQVVBLE9BQU9JLElBQWpCLElBQXlCLEVBQTFDO0FBQ0EsUUFBTUMsT0FBT0wsVUFBVUEsT0FBT0ssSUFBakIsSUFBeUIsU0FBdEM7O0FBRUEsS0FBQ0gsU0FBRCxJQUFjSSxHQUFHQyxXQUFqQixJQUFnQ0QsR0FBR0MsV0FBSCxDQUFlLEVBQUVDLE9BQU8sS0FBVCxFQUFnQkMsTUFBTSxJQUF0QixFQUFmLENBQWhDO0FBQ0EsV0FBT0gsR0FBR0ksVUFBSCxDQUFjO0FBQ2pCQyxhQUFLakIsU0FEWTtBQUVqQlcsa0JBRmlCO0FBR2pCRiwwQkFIaUI7QUFJakJTLGtCQUFVZCxZQUpPO0FBS2pCZSxlQUxpQix5QkFLQztBQUFBLGdCQUFSVCxJQUFRLFFBQVJBLElBQVE7O0FBQ2QsZ0JBQU1VLFFBQVFDLEtBQUtDLEtBQUwsQ0FBV1osSUFBWCxDQUFkO0FBQ0FhLG9CQUFRQyxHQUFSLENBQVlKLEtBQVo7QUFDQSxnQkFBSUEsTUFBTUssS0FBTixLQUFnQixHQUFwQixFQUF5QjtBQUNyQmxCLDRCQUFZQSxTQUFTLElBQVQsRUFBZWEsTUFBTVYsSUFBckIsQ0FBWjtBQUNILGFBRkQsTUFFTztBQUNISCx5QkFBUyxNQUFUO0FBQ0g7QUFDSixTQWJnQjtBQWNqQm1CLFlBZGlCLGtCQWNWO0FBQ0huQixxQkFBUyxNQUFUO0FBQ0gsU0FoQmdCO0FBaUJqQm9CLGdCQWpCaUIsc0JBaUJOO0FBQ1AsYUFBQ25CLFNBQUQsSUFBY0ksR0FBR2dCLFdBQWpCLElBQWdDaEIsR0FBR2dCLFdBQUgsRUFBaEM7QUFDSDtBQW5CZ0IsS0FBZCxDQUFQO0FBcUJILENBakNEIiwiZmlsZSI6InVwbG9hZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgdXBsb2FkVXJsID0gJ2h0dHBzOi8veWFvZmEuNTguY29tL2ZpbGVVcGxvYWQnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMudXBsb2FkZXIgPSAodGVtcEZpbGVQYXRoLCAuLi5wcm9wcykgPT4ge1xyXG4gICAgbGV0IFtwYXJhbXMsIGNhbGxiYWNrLCBub0xvYWRpbmddID0gcHJvcHM7XHJcbiAgICBpZiAodHlwZW9mIHBhcmFtcyA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgIG5vTG9hZGluZyA9IGNhbGxiYWNrO1xyXG4gICAgICAgIGNhbGxiYWNrID0gcGFyYW1zO1xyXG4gICAgICAgIHBhcmFtcyA9IHt9O1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGZvcm1EYXRhID0gcGFyYW1zICYmIHBhcmFtcy5kYXRhIHx8IHt9O1xyXG4gICAgY29uc3QgbmFtZSA9IHBhcmFtcyAmJiBwYXJhbXMubmFtZSB8fCAnY29udGVudCc7XHJcblxyXG4gICAgIW5vTG9hZGluZyAmJiB3eC5zaG93TG9hZGluZyAmJiB3eC5zaG93TG9hZGluZyh7IHRpdGxlOiAn5LiK5Lyg5LitJywgbWFzazogdHJ1ZSB9KTtcclxuICAgIHJldHVybiB3eC51cGxvYWRGaWxlKHtcclxuICAgICAgICB1cmw6IHVwbG9hZFVybCxcclxuICAgICAgICBuYW1lLFxyXG4gICAgICAgIGZvcm1EYXRhLFxyXG4gICAgICAgIGZpbGVQYXRoOiB0ZW1wRmlsZVBhdGgsXHJcbiAgICAgICAgc3VjY2Vzcyh7IGRhdGEgfSkge1xyXG4gICAgICAgICAgICBjb25zdCBuRGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG5EYXRhKTtcclxuICAgICAgICAgICAgaWYgKG5EYXRhLnN0YXRlID09PSAxMDApIHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKG51bGwsIG5EYXRhLmRhdGEpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2soJ+S4iuS8oOWksei0pScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBmYWlsKCkge1xyXG4gICAgICAgICAgICBjYWxsYmFjaygn5LiK5Lyg5aSx6LSlJyk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb21wbGV0ZSgpIHtcclxuICAgICAgICAgICAgIW5vTG9hZGluZyAmJiB3eC5oaWRlTG9hZGluZyAmJiB3eC5oaWRlTG9hZGluZygpO1xyXG4gICAgICAgIH0sXHJcbiAgICB9KTtcclxufTtcclxuIl19