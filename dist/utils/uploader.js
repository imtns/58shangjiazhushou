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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVwbG9hZGVyLmpzIl0sIm5hbWVzIjpbInVwbG9hZFVybCIsIm1vZHVsZSIsImV4cG9ydHMiLCJ1cGxvYWRlciIsInRlbXBGaWxlUGF0aCIsInByb3BzIiwicGFyYW1zIiwiY2FsbGJhY2siLCJub0xvYWRpbmciLCJmb3JtRGF0YSIsImRhdGEiLCJuYW1lIiwid3giLCJzaG93TG9hZGluZyIsInRpdGxlIiwibWFzayIsInVwbG9hZEZpbGUiLCJ1cmwiLCJmaWxlUGF0aCIsInN1Y2Nlc3MiLCJuRGF0YSIsIkpTT04iLCJwYXJzZSIsImNvbnNvbGUiLCJsb2ciLCJzdGF0ZSIsImZhaWwiLCJjb21wbGV0ZSIsImhpZGVMb2FkaW5nIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQU1BLFlBQVksaUNBQWxCOztBQUVBQyxPQUFPQyxPQUFQLENBQWVDLFFBQWYsR0FBMEIsVUFBQ0MsWUFBRCxFQUE0QjtBQUFBLHNDQUFWQyxLQUFVO0FBQVZBLGFBQVU7QUFBQTs7QUFBQSxRQUM3Q0MsTUFENkMsR0FDZEQsS0FEYztBQUFBLFFBQ3JDRSxRQURxQyxHQUNkRixLQURjO0FBQUEsUUFDM0JHLFNBRDJCLEdBQ2RILEtBRGM7O0FBRWxELFFBQUksT0FBT0MsTUFBUCxLQUFrQixVQUF0QixFQUFrQztBQUM5QkUsb0JBQVlELFFBQVo7QUFDQUEsbUJBQVdELE1BQVg7QUFDQUEsaUJBQVMsRUFBVDtBQUNIOztBQUVELFFBQU1HLFdBQVdILFVBQVVBLE9BQU9JLElBQWpCLElBQXlCLEVBQTFDO0FBQ0EsUUFBTUMsT0FBT0wsVUFBVUEsT0FBT0ssSUFBakIsSUFBeUIsU0FBdEM7O0FBRUEsS0FBQ0gsU0FBRCxJQUFjSSxHQUFHQyxXQUFqQixJQUFnQ0QsR0FBR0MsV0FBSCxDQUFlLEVBQUVDLE9BQU8sS0FBVCxFQUFnQkMsTUFBTSxJQUF0QixFQUFmLENBQWhDO0FBQ0EsV0FBT0gsR0FBR0ksVUFBSCxDQUFjO0FBQ2pCQyxhQUFLakIsU0FEWTtBQUVqQlcsa0JBRmlCO0FBR2pCRiwwQkFIaUI7QUFJakJTLGtCQUFVZCxZQUpPO0FBS2pCZSxlQUxpQix5QkFLQztBQUFBLGdCQUFSVCxJQUFRLFFBQVJBLElBQVE7O0FBQ2QsZ0JBQU1VLFFBQVFDLEtBQUtDLEtBQUwsQ0FBV1osSUFBWCxDQUFkO0FBQ0FhLG9CQUFRQyxHQUFSLENBQVlKLEtBQVo7QUFDQSxnQkFBSUEsTUFBTUssS0FBTixLQUFnQixHQUFwQixFQUF5QjtBQUNyQmxCLDRCQUFZQSxTQUFTLElBQVQsRUFBZWEsTUFBTVYsSUFBckIsQ0FBWjtBQUNILGFBRkQsTUFFTztBQUNISCx5QkFBUyxNQUFUO0FBQ0g7QUFDSixTQWJnQjtBQWNqQm1CLFlBZGlCLGtCQWNWO0FBQ0huQixxQkFBUyxNQUFUO0FBQ0gsU0FoQmdCO0FBaUJqQm9CLGdCQWpCaUIsc0JBaUJOO0FBQ1AsYUFBQ25CLFNBQUQsSUFBY0ksR0FBR2dCLFdBQWpCLElBQWdDaEIsR0FBR2dCLFdBQUgsRUFBaEM7QUFDSDtBQW5CZ0IsS0FBZCxDQUFQO0FBcUJILENBakNEIiwiZmlsZSI6InVwbG9hZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgdXBsb2FkVXJsID0gJ2h0dHBzOi8veWFvZmEuNTguY29tL2ZpbGVVcGxvYWQnO1xuXG5tb2R1bGUuZXhwb3J0cy51cGxvYWRlciA9ICh0ZW1wRmlsZVBhdGgsIC4uLnByb3BzKSA9PiB7XG4gICAgbGV0IFtwYXJhbXMsIGNhbGxiYWNrLCBub0xvYWRpbmddID0gcHJvcHM7XG4gICAgaWYgKHR5cGVvZiBwYXJhbXMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgbm9Mb2FkaW5nID0gY2FsbGJhY2s7XG4gICAgICAgIGNhbGxiYWNrID0gcGFyYW1zO1xuICAgICAgICBwYXJhbXMgPSB7fTtcbiAgICB9XG5cbiAgICBjb25zdCBmb3JtRGF0YSA9IHBhcmFtcyAmJiBwYXJhbXMuZGF0YSB8fCB7fTtcbiAgICBjb25zdCBuYW1lID0gcGFyYW1zICYmIHBhcmFtcy5uYW1lIHx8ICdjb250ZW50JztcblxuICAgICFub0xvYWRpbmcgJiYgd3guc2hvd0xvYWRpbmcgJiYgd3guc2hvd0xvYWRpbmcoeyB0aXRsZTogJ+S4iuS8oOS4rScsIG1hc2s6IHRydWUgfSk7XG4gICAgcmV0dXJuIHd4LnVwbG9hZEZpbGUoe1xuICAgICAgICB1cmw6IHVwbG9hZFVybCxcbiAgICAgICAgbmFtZSxcbiAgICAgICAgZm9ybURhdGEsXG4gICAgICAgIGZpbGVQYXRoOiB0ZW1wRmlsZVBhdGgsXG4gICAgICAgIHN1Y2Nlc3MoeyBkYXRhIH0pIHtcbiAgICAgICAgICAgIGNvbnN0IG5EYXRhID0gSlNPTi5wYXJzZShkYXRhKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG5EYXRhKTtcbiAgICAgICAgICAgIGlmIChuRGF0YS5zdGF0ZSA9PT0gMTAwKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2sobnVsbCwgbkRhdGEuZGF0YSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKCfkuIrkvKDlpLHotKUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZmFpbCgpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKCfkuIrkvKDlpLHotKUnKTtcbiAgICAgICAgfSxcbiAgICAgICAgY29tcGxldGUoKSB7XG4gICAgICAgICAgICAhbm9Mb2FkaW5nICYmIHd4LmhpZGVMb2FkaW5nICYmIHd4LmhpZGVMb2FkaW5nKCk7XG4gICAgICAgIH0sXG4gICAgfSk7XG59O1xuIl19