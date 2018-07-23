'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * @desc uploader的Promise版本
 * @tempFilePath 路径
 * @params 参数, type标识上传文件的类型：
 * 视频上传到 /wosMeidaUpload
 * 图片上传到 /fileUpload
 * 其他文件上传到 /wosFileUpload
 * 默认为其他类型文件
 * @noLoading 是否不要加载中弹窗
 */

var uploadUrl = 'https://yaofa.58.com/fileUpload';

exports.default = function (tempFilePath) {
    for (var _len = arguments.length, props = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        props[_key - 1] = arguments[_key];
    }

    var params = props[0],
        noLoading = props[1];


    var formData = params && params.data || {};
    var name = params && params.name || 'content';
    var type = params && params.type || 'image';

    if (type === 'video') {
        uploadUrl = 'https://yaofa.58.com/wosMeidaUpload';
    }

    switch (type) {
        case 'image':
            uploadUrl = 'https://yaofa.58.com/fileUpload';
            break;
        case 'video':
            uploadUrl = 'https://yaofa.58.com/wosMeidaUpload';
            break;
        default:
            uploadUrl = 'https://yaofa.58.com/wosFileUpload';
            break;
    }

    !noLoading && wx.showLoading && wx.showLoading({ title: '上传中', mask: true });
    return new Promise(function (resolve, reject) {
        wx.uploadFile({
            url: uploadUrl,
            name: name,
            formData: formData,
            filePath: tempFilePath,
            success: function success(_ref) {
                var data = _ref.data;

                var nData = JSON.parse(data);
                console.log(nData);
                if (nData.state === 100) {
                    resolve(nData.data);
                } else {
                    reject('上传失败');
                }
            },
            fail: function fail() {
                reject('上传失败');
            },
            complete: function complete() {
                !noLoading && wx.hideLoading && wx.hideLoading();
            }
        });
    });
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVwbG9hZGVyUC5qcyJdLCJuYW1lcyI6WyJ1cGxvYWRVcmwiLCJ0ZW1wRmlsZVBhdGgiLCJwcm9wcyIsInBhcmFtcyIsIm5vTG9hZGluZyIsImZvcm1EYXRhIiwiZGF0YSIsIm5hbWUiLCJ0eXBlIiwid3giLCJzaG93TG9hZGluZyIsInRpdGxlIiwibWFzayIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwidXBsb2FkRmlsZSIsInVybCIsImZpbGVQYXRoIiwic3VjY2VzcyIsIm5EYXRhIiwiSlNPTiIsInBhcnNlIiwiY29uc29sZSIsImxvZyIsInN0YXRlIiwiZmFpbCIsImNvbXBsZXRlIiwiaGlkZUxvYWRpbmciXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7Ozs7Ozs7Ozs7O0FBV0EsSUFBSUEsWUFBWSxpQ0FBaEI7O2tCQUVlLFVBQUNDLFlBQUQsRUFBNEI7QUFBQSxzQ0FBVkMsS0FBVTtBQUFWQSxhQUFVO0FBQUE7O0FBQUEsUUFDbENDLE1BRGtDLEdBQ2JELEtBRGE7QUFBQSxRQUMxQkUsU0FEMEIsR0FDYkYsS0FEYTs7O0FBR3ZDLFFBQU1HLFdBQVdGLFVBQVVBLE9BQU9HLElBQWpCLElBQXlCLEVBQTFDO0FBQ0EsUUFBTUMsT0FBT0osVUFBVUEsT0FBT0ksSUFBakIsSUFBeUIsU0FBdEM7QUFDQSxRQUFNQyxPQUFPTCxVQUFVQSxPQUFPSyxJQUFqQixJQUF5QixPQUF0Qzs7QUFFQSxRQUFJQSxTQUFTLE9BQWIsRUFBc0I7QUFDbEJSLG9CQUFZLHFDQUFaO0FBQ0g7O0FBRUQsWUFBUVEsSUFBUjtBQUNJLGFBQUssT0FBTDtBQUNJUix3QkFBWSxpQ0FBWjtBQUNBO0FBQ0osYUFBSyxPQUFMO0FBQ0lBLHdCQUFZLHFDQUFaO0FBQ0E7QUFDSjtBQUNJQSx3QkFBWSxvQ0FBWjtBQUNBO0FBVFI7O0FBWUEsS0FBQ0ksU0FBRCxJQUFjSyxHQUFHQyxXQUFqQixJQUFnQ0QsR0FBR0MsV0FBSCxDQUFlLEVBQUVDLE9BQU8sS0FBVCxFQUFnQkMsTUFBTSxJQUF0QixFQUFmLENBQWhDO0FBQ0EsV0FBTyxJQUFJQyxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3BDTixXQUFHTyxVQUFILENBQWM7QUFDVkMsaUJBQUtqQixTQURLO0FBRVZPLHNCQUZVO0FBR1ZGLDhCQUhVO0FBSVZhLHNCQUFVakIsWUFKQTtBQUtWa0IsbUJBTFUseUJBS1E7QUFBQSxvQkFBUmIsSUFBUSxRQUFSQSxJQUFROztBQUNkLG9CQUFNYyxRQUFRQyxLQUFLQyxLQUFMLENBQVdoQixJQUFYLENBQWQ7QUFDQWlCLHdCQUFRQyxHQUFSLENBQVlKLEtBQVo7QUFDQSxvQkFBSUEsTUFBTUssS0FBTixLQUFnQixHQUFwQixFQUF5QjtBQUNyQlgsNEJBQVFNLE1BQU1kLElBQWQ7QUFDSCxpQkFGRCxNQUVPO0FBQ0hTLDJCQUFPLE1BQVA7QUFDSDtBQUNKLGFBYlM7QUFjVlcsZ0JBZFUsa0JBY0g7QUFDSFgsdUJBQU8sTUFBUDtBQUNILGFBaEJTO0FBaUJWWSxvQkFqQlUsc0JBaUJDO0FBQ1AsaUJBQUN2QixTQUFELElBQWNLLEdBQUdtQixXQUFqQixJQUFnQ25CLEdBQUdtQixXQUFILEVBQWhDO0FBQ0g7QUFuQlMsU0FBZDtBQXFCSCxLQXRCTSxDQUFQO0FBdUJILEMiLCJmaWxlIjoidXBsb2FkZXJQLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEBkZXNjIHVwbG9hZGVy55qEUHJvbWlzZeeJiOacrFxyXG4gKiBAdGVtcEZpbGVQYXRoIOi3r+W+hFxyXG4gKiBAcGFyYW1zIOWPguaVsCwgdHlwZeagh+ivhuS4iuS8oOaWh+S7tueahOexu+Wei++8mlxyXG4gKiDop4bpopHkuIrkvKDliLAgL3dvc01laWRhVXBsb2FkXHJcbiAqIOWbvueJh+S4iuS8oOWIsCAvZmlsZVVwbG9hZFxyXG4gKiDlhbbku5bmlofku7bkuIrkvKDliLAgL3dvc0ZpbGVVcGxvYWRcclxuICog6buY6K6k5Li65YW25LuW57G75Z6L5paH5Lu2XHJcbiAqIEBub0xvYWRpbmcg5piv5ZCm5LiN6KaB5Yqg6L295Lit5by556qXXHJcbiAqL1xyXG5cclxubGV0IHVwbG9hZFVybCA9ICdodHRwczovL3lhb2ZhLjU4LmNvbS9maWxlVXBsb2FkJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0ICh0ZW1wRmlsZVBhdGgsIC4uLnByb3BzKSA9PiB7XHJcbiAgICBsZXQgW3BhcmFtcywgbm9Mb2FkaW5nXSA9IHByb3BzO1xyXG5cclxuICAgIGNvbnN0IGZvcm1EYXRhID0gcGFyYW1zICYmIHBhcmFtcy5kYXRhIHx8IHt9O1xyXG4gICAgY29uc3QgbmFtZSA9IHBhcmFtcyAmJiBwYXJhbXMubmFtZSB8fCAnY29udGVudCc7XHJcbiAgICBjb25zdCB0eXBlID0gcGFyYW1zICYmIHBhcmFtcy50eXBlIHx8ICdpbWFnZSc7XHJcblxyXG4gICAgaWYgKHR5cGUgPT09ICd2aWRlbycpIHtcclxuICAgICAgICB1cGxvYWRVcmwgPSAnaHR0cHM6Ly95YW9mYS41OC5jb20vd29zTWVpZGFVcGxvYWQnXHJcbiAgICB9XHJcblxyXG4gICAgc3dpdGNoICh0eXBlKSB7XHJcbiAgICAgICAgY2FzZSAnaW1hZ2UnOlxyXG4gICAgICAgICAgICB1cGxvYWRVcmwgPSAnaHR0cHM6Ly95YW9mYS41OC5jb20vZmlsZVVwbG9hZCc7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ3ZpZGVvJzpcclxuICAgICAgICAgICAgdXBsb2FkVXJsID0gJ2h0dHBzOi8veWFvZmEuNTguY29tL3dvc01laWRhVXBsb2FkJztcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgdXBsb2FkVXJsID0gJ2h0dHBzOi8veWFvZmEuNTguY29tL3dvc0ZpbGVVcGxvYWQnO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgIH1cclxuXHJcbiAgICAhbm9Mb2FkaW5nICYmIHd4LnNob3dMb2FkaW5nICYmIHd4LnNob3dMb2FkaW5nKHsgdGl0bGU6ICfkuIrkvKDkuK0nLCBtYXNrOiB0cnVlIH0pO1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICB3eC51cGxvYWRGaWxlKHtcclxuICAgICAgICAgICAgdXJsOiB1cGxvYWRVcmwsXHJcbiAgICAgICAgICAgIG5hbWUsXHJcbiAgICAgICAgICAgIGZvcm1EYXRhLFxyXG4gICAgICAgICAgICBmaWxlUGF0aDogdGVtcEZpbGVQYXRoLFxyXG4gICAgICAgICAgICBzdWNjZXNzKHsgZGF0YSB9KSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBuRGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhuRGF0YSk7XHJcbiAgICAgICAgICAgICAgICBpZiAobkRhdGEuc3RhdGUgPT09IDEwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUobkRhdGEuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdCgn5LiK5Lyg5aSx6LSlJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGZhaWwoKSB7XHJcbiAgICAgICAgICAgICAgICByZWplY3QoJ+S4iuS8oOWksei0pScpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBjb21wbGV0ZSgpIHtcclxuICAgICAgICAgICAgICAgICFub0xvYWRpbmcgJiYgd3guaGlkZUxvYWRpbmcgJiYgd3guaGlkZUxvYWRpbmcoKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59O1xyXG4iXX0=