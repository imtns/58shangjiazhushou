'use strict';

module.exports = {
    onShareAppMessage: function onShareAppMessage(res) {
        if (res.from === 'button') {
            console.log(res.target);
        }

        var _res$target$dataset = res.target.dataset,
            title = _res$target$dataset.title,
            path = _res$target$dataset.path;


        return {
            title: title,
            path: path,
            success: function success() {
                // 转发成功
            },
            fail: function fail() {
                // 转发失败
            }
        };
    }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlLmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJvblNoYXJlQXBwTWVzc2FnZSIsInJlcyIsImZyb20iLCJjb25zb2xlIiwibG9nIiwidGFyZ2V0IiwiZGF0YXNldCIsInRpdGxlIiwicGF0aCIsInN1Y2Nlc3MiLCJmYWlsIl0sIm1hcHBpbmdzIjoiOztBQUFBQSxPQUFPQyxPQUFQLEdBQWlCO0FBQ2JDLHFCQURhLDZCQUNLQyxHQURMLEVBQ1U7QUFDbkIsWUFBSUEsSUFBSUMsSUFBSixLQUFhLFFBQWpCLEVBQTJCO0FBQ3ZCQyxvQkFBUUMsR0FBUixDQUFZSCxJQUFJSSxNQUFoQjtBQUNIOztBQUhrQixrQ0FLS0osSUFBSUksTUFBSixDQUFXQyxPQUxoQjtBQUFBLFlBS1hDLEtBTFcsdUJBS1hBLEtBTFc7QUFBQSxZQUtKQyxJQUxJLHVCQUtKQSxJQUxJOzs7QUFPbkIsZUFBTztBQUNIRCx3QkFERztBQUVIQyxzQkFGRztBQUdIQyxtQkFIRyxxQkFHTztBQUNOO0FBQ0gsYUFMRTtBQU1IQyxnQkFORyxrQkFNSTtBQUNIO0FBQ0g7QUFSRSxTQUFQO0FBVUg7QUFsQlksQ0FBakIiLCJmaWxlIjoic2hhcmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBvblNoYXJlQXBwTWVzc2FnZShyZXMpIHtcbiAgICAgICAgaWYgKHJlcy5mcm9tID09PSAnYnV0dG9uJykge1xuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzLnRhcmdldCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB7IHRpdGxlLCBwYXRoIH0gPSByZXMudGFyZ2V0LmRhdGFzZXQ7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHRpdGxlLFxuICAgICAgICAgICAgcGF0aCxcbiAgICAgICAgICAgIHN1Y2Nlc3MoKSB7XG4gICAgICAgICAgICAgICAgLy8g6L2s5Y+R5oiQ5YqfXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZmFpbCgpIHtcbiAgICAgICAgICAgICAgICAvLyDovazlj5HlpLHotKVcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgfSxcbn07XG5cbiJdfQ==