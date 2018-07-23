"use strict";

// 轮播组件函数、事件
module.exports = {
    changeIndicatorDots: function changeIndicatorDots(e) {
        var indicator = e.currentTarget.dataset.indicator;

        this.setData({
            indicatorDots: !indicator
        });
    },
    changeAutoplay: function changeAutoplay() {
        this.setData({
            autoplay: !this.data.cfg.autoplay
        });
    },
    intervalChange: function intervalChange(e) {
        this.setData({
            interval: e.detail.value
        });
    },
    durationChange: function durationChange(e) {
        this.setData({
            duration: e.detail.value
        });
    }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRleHQuanMiXSwibmFtZXMiOlsibW9kdWxlIiwiZXhwb3J0cyIsImNoYW5nZUluZGljYXRvckRvdHMiLCJlIiwiaW5kaWNhdG9yIiwiY3VycmVudFRhcmdldCIsImRhdGFzZXQiLCJzZXREYXRhIiwiaW5kaWNhdG9yRG90cyIsImNoYW5nZUF1dG9wbGF5IiwiYXV0b3BsYXkiLCJkYXRhIiwiY2ZnIiwiaW50ZXJ2YWxDaGFuZ2UiLCJpbnRlcnZhbCIsImRldGFpbCIsInZhbHVlIiwiZHVyYXRpb25DaGFuZ2UiLCJkdXJhdGlvbiJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBQSxPQUFPQyxPQUFQLEdBQWlCO0FBQ2JDLHVCQURhLCtCQUNPQyxDQURQLEVBQ1U7QUFBQSxZQUNYQyxTQURXLEdBQ0dELEVBQUVFLGFBQUYsQ0FBZ0JDLE9BRG5CLENBQ1hGLFNBRFc7O0FBRW5CLGFBQUtHLE9BQUwsQ0FBYTtBQUNUQywyQkFBZSxDQUFDSjtBQURQLFNBQWI7QUFHSCxLQU5ZO0FBT2JLLGtCQVBhLDRCQU9JO0FBQ2IsYUFBS0YsT0FBTCxDQUFhO0FBQ1RHLHNCQUFVLENBQUMsS0FBS0MsSUFBTCxDQUFVQyxHQUFWLENBQWNGO0FBRGhCLFNBQWI7QUFHSCxLQVhZO0FBWWJHLGtCQVphLDBCQVlFVixDQVpGLEVBWUs7QUFDZCxhQUFLSSxPQUFMLENBQWE7QUFDVE8sc0JBQVVYLEVBQUVZLE1BQUYsQ0FBU0M7QUFEVixTQUFiO0FBR0gsS0FoQlk7QUFpQmJDLGtCQWpCYSwwQkFpQkVkLENBakJGLEVBaUJLO0FBQ2QsYUFBS0ksT0FBTCxDQUFhO0FBQ1RXLHNCQUFVZixFQUFFWSxNQUFGLENBQVNDO0FBRFYsU0FBYjtBQUdIO0FBckJZLENBQWpCIiwiZmlsZSI6InRleHQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyDova7mkq3nu4Tku7blh73mlbDjgIHkuovku7ZcclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICBjaGFuZ2VJbmRpY2F0b3JEb3RzKGUpIHtcclxuICAgICAgICBjb25zdCB7IGluZGljYXRvciB9ID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQ7XHJcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgaW5kaWNhdG9yRG90czogIWluZGljYXRvcixcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBjaGFuZ2VBdXRvcGxheSgpIHtcclxuICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICBhdXRvcGxheTogIXRoaXMuZGF0YS5jZmcuYXV0b3BsYXksXHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgaW50ZXJ2YWxDaGFuZ2UoZSkge1xyXG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgIGludGVydmFsOiBlLmRldGFpbC52YWx1ZSxcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBkdXJhdGlvbkNoYW5nZShlKSB7XHJcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgZHVyYXRpb246IGUuZGV0YWlsLnZhbHVlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxufTtcclxuIl19