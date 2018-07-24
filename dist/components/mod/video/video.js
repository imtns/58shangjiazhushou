"use strict";

/*eslint-disable */
module.exports = {
    onPlayEnd: function onPlayEnd(e) {
        if (e.target.id == this.data.curVideo) {
            this.setData({ curVideo: 0 });
        }
    },
    onPlayVideo: function onPlayVideo(e) {
        var curVideo = wx.createVideoContext(e.target.id, this);
        if (this.data.curVideo && this.data.curVideo != e.target.id) {
            var preVideo = wx.createVideoContext(this.data.curVideo, this);
            preVideo.pause();
            this.setData({ curVideo: e.target.id });
        } else {
            this.setData({ curVideo: e.target.id });
        }
    }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZpZGVvLmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJvblBsYXlFbmQiLCJlIiwidGFyZ2V0IiwiaWQiLCJkYXRhIiwiY3VyVmlkZW8iLCJzZXREYXRhIiwib25QbGF5VmlkZW8iLCJ3eCIsImNyZWF0ZVZpZGVvQ29udGV4dCIsInByZVZpZGVvIiwicGF1c2UiXSwibWFwcGluZ3MiOiI7O0FBQ0E7QUFDQUEsT0FBT0MsT0FBUCxHQUFpQjtBQUNiQyxhQURhLHFCQUNIQyxDQURHLEVBQ0E7QUFDVCxZQUFJQSxFQUFFQyxNQUFGLENBQVNDLEVBQVQsSUFBZSxLQUFLQyxJQUFMLENBQVVDLFFBQTdCLEVBQXVDO0FBQ25DLGlCQUFLQyxPQUFMLENBQWEsRUFBRUQsVUFBVSxDQUFaLEVBQWI7QUFDSDtBQUNKLEtBTFk7QUFNYkUsZUFOYSx1QkFNRE4sQ0FOQyxFQU1FO0FBQ1gsWUFBTUksV0FBV0csR0FBR0Msa0JBQUgsQ0FBc0JSLEVBQUVDLE1BQUYsQ0FBU0MsRUFBL0IsRUFBbUMsSUFBbkMsQ0FBakI7QUFDQSxZQUFJLEtBQUtDLElBQUwsQ0FBVUMsUUFBVixJQUFzQixLQUFLRCxJQUFMLENBQVVDLFFBQVYsSUFBc0JKLEVBQUVDLE1BQUYsQ0FBU0MsRUFBekQsRUFBNkQ7QUFDekQsZ0JBQU1PLFdBQVdGLEdBQUdDLGtCQUFILENBQXNCLEtBQUtMLElBQUwsQ0FBVUMsUUFBaEMsRUFBMEMsSUFBMUMsQ0FBakI7QUFDQUsscUJBQVNDLEtBQVQ7QUFDQSxpQkFBS0wsT0FBTCxDQUFhLEVBQUVELFVBQVVKLEVBQUVDLE1BQUYsQ0FBU0MsRUFBckIsRUFBYjtBQUNILFNBSkQsTUFJTztBQUNILGlCQUFLRyxPQUFMLENBQWEsRUFBRUQsVUFBVUosRUFBRUMsTUFBRixDQUFTQyxFQUFyQixFQUFiO0FBQ0g7QUFDSjtBQWZZLENBQWpCIiwiZmlsZSI6InZpZGVvLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4vKmVzbGludC1kaXNhYmxlICovXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBvblBsYXlFbmQoZSkge1xuICAgICAgICBpZiAoZS50YXJnZXQuaWQgPT0gdGhpcy5kYXRhLmN1clZpZGVvKSB7XG4gICAgICAgICAgICB0aGlzLnNldERhdGEoeyBjdXJWaWRlbzogMCB9KTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgb25QbGF5VmlkZW8oZSkge1xuICAgICAgICBjb25zdCBjdXJWaWRlbyA9IHd4LmNyZWF0ZVZpZGVvQ29udGV4dChlLnRhcmdldC5pZCwgdGhpcyk7XG4gICAgICAgIGlmICh0aGlzLmRhdGEuY3VyVmlkZW8gJiYgdGhpcy5kYXRhLmN1clZpZGVvICE9IGUudGFyZ2V0LmlkKSB7XG4gICAgICAgICAgICBjb25zdCBwcmVWaWRlbyA9IHd4LmNyZWF0ZVZpZGVvQ29udGV4dCh0aGlzLmRhdGEuY3VyVmlkZW8sIHRoaXMpO1xuICAgICAgICAgICAgcHJlVmlkZW8ucGF1c2UoKTtcbiAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7IGN1clZpZGVvOiBlLnRhcmdldC5pZCB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7IGN1clZpZGVvOiBlLnRhcmdldC5pZCB9KTtcbiAgICAgICAgfVxuICAgIH0sXG59O1xuIl19