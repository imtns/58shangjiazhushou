'use strict';

/*eslint-disable */
var uploadUrl = 'https://yaofa.58.com/fileUpload';

module.exports.uploader = function (tempFilePath) {
    for (var _len = arguments.length, props = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        props[_key - 1] = arguments[_key];
    }

    var params = props[0],
        callback = props[1],
        noLoading = props[2];

    if (params && params.isVideo) uploadUrl = 'https://yaofa.58.com/wosMeidaUpload';
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVwbG9hZGVyLmpzIl0sIm5hbWVzIjpbInVwbG9hZFVybCIsIm1vZHVsZSIsImV4cG9ydHMiLCJ1cGxvYWRlciIsInRlbXBGaWxlUGF0aCIsInByb3BzIiwicGFyYW1zIiwiY2FsbGJhY2siLCJub0xvYWRpbmciLCJpc1ZpZGVvIiwiZm9ybURhdGEiLCJkYXRhIiwibmFtZSIsInd4Iiwic2hvd0xvYWRpbmciLCJ0aXRsZSIsIm1hc2siLCJ1cGxvYWRGaWxlIiwidXJsIiwiZmlsZVBhdGgiLCJzdWNjZXNzIiwibkRhdGEiLCJKU09OIiwicGFyc2UiLCJjb25zb2xlIiwibG9nIiwic3RhdGUiLCJmYWlsIiwiY29tcGxldGUiLCJoaWRlTG9hZGluZyJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBLElBQUlBLFlBQVksaUNBQWhCOztBQUVBQyxPQUFPQyxPQUFQLENBQWVDLFFBQWYsR0FBMEIsVUFBQ0MsWUFBRCxFQUE0QjtBQUFBLHNDQUFWQyxLQUFVO0FBQVZBLGFBQVU7QUFBQTs7QUFBQSxRQUM3Q0MsTUFENkMsR0FDZEQsS0FEYztBQUFBLFFBQ3JDRSxRQURxQyxHQUNkRixLQURjO0FBQUEsUUFDM0JHLFNBRDJCLEdBQ2RILEtBRGM7O0FBRWxELFFBQUdDLFVBQVVBLE9BQU9HLE9BQXBCLEVBQTZCVCxZQUFZLHFDQUFaO0FBQzdCLFFBQUksT0FBT00sTUFBUCxLQUFrQixVQUF0QixFQUFrQztBQUM5QkUsb0JBQVlELFFBQVo7QUFDQUEsbUJBQVdELE1BQVg7QUFDQUEsaUJBQVMsRUFBVDtBQUNIOztBQUVELFFBQU1JLFdBQVdKLFVBQVVBLE9BQU9LLElBQWpCLElBQXlCLEVBQTFDO0FBQ0EsUUFBTUMsT0FBT04sVUFBVUEsT0FBT00sSUFBakIsSUFBeUIsU0FBdEM7O0FBRUEsS0FBQ0osU0FBRCxJQUFjSyxHQUFHQyxXQUFqQixJQUFnQ0QsR0FBR0MsV0FBSCxDQUFlLEVBQUVDLE9BQU8sS0FBVCxFQUFnQkMsTUFBTSxJQUF0QixFQUFmLENBQWhDO0FBQ0EsV0FBT0gsR0FBR0ksVUFBSCxDQUFjO0FBQ2pCQyxhQUFLbEIsU0FEWTtBQUVqQlksa0JBRmlCO0FBR2pCRiwwQkFIaUI7QUFJakJTLGtCQUFVZixZQUpPO0FBS2pCZ0IsZUFMaUIseUJBS0M7QUFBQSxnQkFBUlQsSUFBUSxRQUFSQSxJQUFROztBQUNkLGdCQUFNVSxRQUFRQyxLQUFLQyxLQUFMLENBQVdaLElBQVgsQ0FBZDtBQUNBYSxvQkFBUUMsR0FBUixDQUFZSixLQUFaO0FBQ0EsZ0JBQUlBLE1BQU1LLEtBQU4sS0FBZ0IsR0FBcEIsRUFBeUI7QUFDckJuQiw0QkFBWUEsU0FBUyxJQUFULEVBQWVjLE1BQU1WLElBQXJCLENBQVo7QUFDSCxhQUZELE1BRU87QUFDSEoseUJBQVMsTUFBVDtBQUNIO0FBQ0osU0FiZ0I7QUFjakJvQixZQWRpQixrQkFjVjtBQUNIcEIscUJBQVMsTUFBVDtBQUNILFNBaEJnQjtBQWlCakJxQixnQkFqQmlCLHNCQWlCTjtBQUNQLGFBQUNwQixTQUFELElBQWNLLEdBQUdnQixXQUFqQixJQUFnQ2hCLEdBQUdnQixXQUFILEVBQWhDO0FBQ0g7QUFuQmdCLEtBQWQsQ0FBUDtBQXFCSCxDQWxDRCIsImZpbGUiOiJ1cGxvYWRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qZXNsaW50LWRpc2FibGUgKi9cclxubGV0IHVwbG9hZFVybCA9ICdodHRwczovL3lhb2ZhLjU4LmNvbS9maWxlVXBsb2FkJztcclxuXHJcbm1vZHVsZS5leHBvcnRzLnVwbG9hZGVyID0gKHRlbXBGaWxlUGF0aCwgLi4ucHJvcHMpID0+IHtcclxuICAgIGxldCBbcGFyYW1zLCBjYWxsYmFjaywgbm9Mb2FkaW5nXSA9IHByb3BzO1xyXG4gICAgaWYocGFyYW1zICYmIHBhcmFtcy5pc1ZpZGVvKSB1cGxvYWRVcmwgPSAnaHR0cHM6Ly95YW9mYS41OC5jb20vd29zTWVpZGFVcGxvYWQnXHJcbiAgICBpZiAodHlwZW9mIHBhcmFtcyA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgIG5vTG9hZGluZyA9IGNhbGxiYWNrO1xyXG4gICAgICAgIGNhbGxiYWNrID0gcGFyYW1zO1xyXG4gICAgICAgIHBhcmFtcyA9IHt9O1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGZvcm1EYXRhID0gcGFyYW1zICYmIHBhcmFtcy5kYXRhIHx8IHt9O1xyXG4gICAgY29uc3QgbmFtZSA9IHBhcmFtcyAmJiBwYXJhbXMubmFtZSB8fCAnY29udGVudCc7XHJcblxyXG4gICAgIW5vTG9hZGluZyAmJiB3eC5zaG93TG9hZGluZyAmJiB3eC5zaG93TG9hZGluZyh7IHRpdGxlOiAn5LiK5Lyg5LitJywgbWFzazogdHJ1ZSB9KTtcclxuICAgIHJldHVybiB3eC51cGxvYWRGaWxlKHtcclxuICAgICAgICB1cmw6IHVwbG9hZFVybCxcclxuICAgICAgICBuYW1lLFxyXG4gICAgICAgIGZvcm1EYXRhLFxyXG4gICAgICAgIGZpbGVQYXRoOiB0ZW1wRmlsZVBhdGgsXHJcbiAgICAgICAgc3VjY2Vzcyh7IGRhdGEgfSkge1xyXG4gICAgICAgICAgICBjb25zdCBuRGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG5EYXRhKTtcclxuICAgICAgICAgICAgaWYgKG5EYXRhLnN0YXRlID09PSAxMDApIHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKG51bGwsIG5EYXRhLmRhdGEpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2soJ+S4iuS8oOWksei0pScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBmYWlsKCkge1xyXG4gICAgICAgICAgICBjYWxsYmFjaygn5LiK5Lyg5aSx6LSlJyk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb21wbGV0ZSgpIHtcclxuICAgICAgICAgICAgIW5vTG9hZGluZyAmJiB3eC5oaWRlTG9hZGluZyAmJiB3eC5oaWRlTG9hZGluZygpO1xyXG4gICAgICAgIH0sXHJcbiAgICB9KTtcclxufTtcclxuIl19