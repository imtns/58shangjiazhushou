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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVwbG9hZGVyUC5qcyJdLCJuYW1lcyI6WyJ1cGxvYWRVcmwiLCJ0ZW1wRmlsZVBhdGgiLCJwcm9wcyIsInBhcmFtcyIsIm5vTG9hZGluZyIsImZvcm1EYXRhIiwiZGF0YSIsIm5hbWUiLCJ0eXBlIiwid3giLCJzaG93TG9hZGluZyIsInRpdGxlIiwibWFzayIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwidXBsb2FkRmlsZSIsInVybCIsImZpbGVQYXRoIiwic3VjY2VzcyIsIm5EYXRhIiwiSlNPTiIsInBhcnNlIiwiY29uc29sZSIsImxvZyIsInN0YXRlIiwiZmFpbCIsImNvbXBsZXRlIiwiaGlkZUxvYWRpbmciXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7Ozs7Ozs7Ozs7O0FBV0EsSUFBSUEsWUFBWSxpQ0FBaEI7O2tCQUVlLFVBQUNDLFlBQUQsRUFBNEI7QUFBQSxzQ0FBVkMsS0FBVTtBQUFWQSxhQUFVO0FBQUE7O0FBQUEsUUFDbENDLE1BRGtDLEdBQ2JELEtBRGE7QUFBQSxRQUMxQkUsU0FEMEIsR0FDYkYsS0FEYTs7O0FBR3ZDLFFBQU1HLFdBQVdGLFVBQVVBLE9BQU9HLElBQWpCLElBQXlCLEVBQTFDO0FBQ0EsUUFBTUMsT0FBT0osVUFBVUEsT0FBT0ksSUFBakIsSUFBeUIsU0FBdEM7QUFDQSxRQUFNQyxPQUFPTCxVQUFVQSxPQUFPSyxJQUFqQixJQUF5QixPQUF0Qzs7QUFFQSxRQUFJQSxTQUFTLE9BQWIsRUFBc0I7QUFDbEJSLG9CQUFZLHFDQUFaO0FBQ0g7O0FBRUQsWUFBUVEsSUFBUjtBQUNJLGFBQUssT0FBTDtBQUNJUix3QkFBWSxpQ0FBWjtBQUNBO0FBQ0osYUFBSyxPQUFMO0FBQ0lBLHdCQUFZLHFDQUFaO0FBQ0E7QUFDSjtBQUNJQSx3QkFBWSxvQ0FBWjtBQUNBO0FBVFI7O0FBWUEsS0FBQ0ksU0FBRCxJQUFjSyxHQUFHQyxXQUFqQixJQUFnQ0QsR0FBR0MsV0FBSCxDQUFlLEVBQUVDLE9BQU8sS0FBVCxFQUFnQkMsTUFBTSxJQUF0QixFQUFmLENBQWhDO0FBQ0EsV0FBTyxJQUFJQyxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3BDTixXQUFHTyxVQUFILENBQWM7QUFDVkMsaUJBQUtqQixTQURLO0FBRVZPLHNCQUZVO0FBR1ZGLDhCQUhVO0FBSVZhLHNCQUFVakIsWUFKQTtBQUtWa0IsbUJBTFUseUJBS1E7QUFBQSxvQkFBUmIsSUFBUSxRQUFSQSxJQUFROztBQUNkLG9CQUFNYyxRQUFRQyxLQUFLQyxLQUFMLENBQVdoQixJQUFYLENBQWQ7QUFDQWlCLHdCQUFRQyxHQUFSLENBQVlKLEtBQVo7QUFDQSxvQkFBSUEsTUFBTUssS0FBTixLQUFnQixHQUFwQixFQUF5QjtBQUNyQlgsNEJBQVFNLE1BQU1kLElBQWQ7QUFDSCxpQkFGRCxNQUVPO0FBQ0hTLDJCQUFPLE1BQVA7QUFDSDtBQUNKLGFBYlM7QUFjVlcsZ0JBZFUsa0JBY0g7QUFDSFgsdUJBQU8sTUFBUDtBQUNILGFBaEJTO0FBaUJWWSxvQkFqQlUsc0JBaUJDO0FBQ1AsaUJBQUN2QixTQUFELElBQWNLLEdBQUdtQixXQUFqQixJQUFnQ25CLEdBQUdtQixXQUFILEVBQWhDO0FBQ0g7QUFuQlMsU0FBZDtBQXFCSCxLQXRCTSxDQUFQO0FBdUJILEMiLCJmaWxlIjoidXBsb2FkZXJQLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAZGVzYyB1cGxvYWRlcueahFByb21pc2XniYjmnKxcbiAqIEB0ZW1wRmlsZVBhdGgg6Lev5b6EXG4gKiBAcGFyYW1zIOWPguaVsCwgdHlwZeagh+ivhuS4iuS8oOaWh+S7tueahOexu+Wei++8mlxuICog6KeG6aKR5LiK5Lyg5YiwIC93b3NNZWlkYVVwbG9hZFxuICog5Zu+54mH5LiK5Lyg5YiwIC9maWxlVXBsb2FkXG4gKiDlhbbku5bmlofku7bkuIrkvKDliLAgL3dvc0ZpbGVVcGxvYWRcbiAqIOm7mOiupOS4uuWFtuS7luexu+Wei+aWh+S7tlxuICogQG5vTG9hZGluZyDmmK/lkKbkuI3opoHliqDovb3kuK3lvLnnqpdcbiAqL1xuXG5sZXQgdXBsb2FkVXJsID0gJ2h0dHBzOi8veWFvZmEuNTguY29tL2ZpbGVVcGxvYWQnO1xuXG5leHBvcnQgZGVmYXVsdCAodGVtcEZpbGVQYXRoLCAuLi5wcm9wcykgPT4ge1xuICAgIGxldCBbcGFyYW1zLCBub0xvYWRpbmddID0gcHJvcHM7XG5cbiAgICBjb25zdCBmb3JtRGF0YSA9IHBhcmFtcyAmJiBwYXJhbXMuZGF0YSB8fCB7fTtcbiAgICBjb25zdCBuYW1lID0gcGFyYW1zICYmIHBhcmFtcy5uYW1lIHx8ICdjb250ZW50JztcbiAgICBjb25zdCB0eXBlID0gcGFyYW1zICYmIHBhcmFtcy50eXBlIHx8ICdpbWFnZSc7XG5cbiAgICBpZiAodHlwZSA9PT0gJ3ZpZGVvJykge1xuICAgICAgICB1cGxvYWRVcmwgPSAnaHR0cHM6Ly95YW9mYS41OC5jb20vd29zTWVpZGFVcGxvYWQnXG4gICAgfVxuXG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgIGNhc2UgJ2ltYWdlJzpcbiAgICAgICAgICAgIHVwbG9hZFVybCA9ICdodHRwczovL3lhb2ZhLjU4LmNvbS9maWxlVXBsb2FkJztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICd2aWRlbyc6XG4gICAgICAgICAgICB1cGxvYWRVcmwgPSAnaHR0cHM6Ly95YW9mYS41OC5jb20vd29zTWVpZGFVcGxvYWQnO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB1cGxvYWRVcmwgPSAnaHR0cHM6Ly95YW9mYS41OC5jb20vd29zRmlsZVVwbG9hZCc7XG4gICAgICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICAhbm9Mb2FkaW5nICYmIHd4LnNob3dMb2FkaW5nICYmIHd4LnNob3dMb2FkaW5nKHsgdGl0bGU6ICfkuIrkvKDkuK0nLCBtYXNrOiB0cnVlIH0pO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIHd4LnVwbG9hZEZpbGUoe1xuICAgICAgICAgICAgdXJsOiB1cGxvYWRVcmwsXG4gICAgICAgICAgICBuYW1lLFxuICAgICAgICAgICAgZm9ybURhdGEsXG4gICAgICAgICAgICBmaWxlUGF0aDogdGVtcEZpbGVQYXRoLFxuICAgICAgICAgICAgc3VjY2Vzcyh7IGRhdGEgfSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5EYXRhID0gSlNPTi5wYXJzZShkYXRhKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhuRGF0YSk7XG4gICAgICAgICAgICAgICAgaWYgKG5EYXRhLnN0YXRlID09PSAxMDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShuRGF0YS5kYXRhKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoJ+S4iuS8oOWksei0pScpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmYWlsKCkge1xuICAgICAgICAgICAgICAgIHJlamVjdCgn5LiK5Lyg5aSx6LSlJyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY29tcGxldGUoKSB7XG4gICAgICAgICAgICAgICAgIW5vTG9hZGluZyAmJiB3eC5oaWRlTG9hZGluZyAmJiB3eC5oaWRlTG9hZGluZygpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgfSk7XG59O1xuIl19