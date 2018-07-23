'use strict';

/*eslint-disable */
var _require = require('./../../../utils/index.js'),
    previewImage = _require.previewImage;

module.exports = {
    evaluationImgTap: function evaluationImgTap(e) {
        var target = e.target,
            currentTarget = e.currentTarget;
        var _currentTarget$datase = currentTarget.dataset,
            modIndex = _currentTarget$datase.modIndex,
            evaIdx = _currentTarget$datase.evaIdx;

        var evaImgIdx = target.dataset.index;

        var imgs = this.data.page_data[modIndex].props.data[evaIdx].imgs;


        previewImage(imgs.map(function (img) {
            return (url.indexOf('https') > 0 ? '' : 'https:') + url;
        }), evaImgIdx);
    }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV2YWx1YXRpb24uanMiXSwibmFtZXMiOlsicmVxdWlyZSIsInByZXZpZXdJbWFnZSIsIm1vZHVsZSIsImV4cG9ydHMiLCJldmFsdWF0aW9uSW1nVGFwIiwiZSIsInRhcmdldCIsImN1cnJlbnRUYXJnZXQiLCJkYXRhc2V0IiwibW9kSW5kZXgiLCJldmFJZHgiLCJldmFJbWdJZHgiLCJpbmRleCIsImltZ3MiLCJkYXRhIiwicGFnZV9kYXRhIiwicHJvcHMiLCJtYXAiLCJ1cmwiLCJpbmRleE9mIl0sIm1hcHBpbmdzIjoiOztBQUFBO2VBQ3lCQSxRQUFRLHNCQUFSLEM7SUFBakJDLFksWUFBQUEsWTs7QUFFUkMsT0FBT0MsT0FBUCxHQUFpQjtBQUNiQyxvQkFEYSw0QkFDSUMsQ0FESixFQUNPO0FBQUEsWUFDUkMsTUFEUSxHQUNrQkQsQ0FEbEIsQ0FDUkMsTUFEUTtBQUFBLFlBQ0FDLGFBREEsR0FDa0JGLENBRGxCLENBQ0FFLGFBREE7QUFBQSxvQ0FFYUEsY0FBY0MsT0FGM0I7QUFBQSxZQUVSQyxRQUZRLHlCQUVSQSxRQUZRO0FBQUEsWUFFRUMsTUFGRix5QkFFRUEsTUFGRjs7QUFHaEIsWUFBTUMsWUFBWUwsT0FBT0UsT0FBUCxDQUFlSSxLQUFqQzs7QUFIZ0IsWUFLUkMsSUFMUSxHQUtDLEtBQUtDLElBQUwsQ0FBVUMsU0FBVixDQUFvQk4sUUFBcEIsRUFBOEJPLEtBQTlCLENBQW9DRixJQUFwQyxDQUF5Q0osTUFBekMsQ0FMRCxDQUtSRyxJQUxROzs7QUFPaEJaLHFCQUFhWSxLQUFLSSxHQUFMLENBQVM7QUFBQSxtQkFBTyxDQUFDQyxJQUFJQyxPQUFKLENBQVksT0FBWixJQUF1QixDQUF2QixHQUEyQixFQUEzQixHQUFnQyxRQUFqQyxJQUE2Q0QsR0FBcEQ7QUFBQSxTQUFULENBQWIsRUFBZ0ZQLFNBQWhGO0FBQ0g7QUFUWSxDQUFqQiIsImZpbGUiOiJldmFsdWF0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyplc2xpbnQtZGlzYWJsZSAqL1xyXG5jb25zdCB7IHByZXZpZXdJbWFnZSB9ID0gcmVxdWlyZSgnLi4vLi4vLi4vdXRpbHMvaW5kZXgnKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgZXZhbHVhdGlvbkltZ1RhcChlKSB7XHJcbiAgICAgICAgY29uc3QgeyB0YXJnZXQsIGN1cnJlbnRUYXJnZXQgfSA9IGU7XHJcbiAgICAgICAgY29uc3QgeyBtb2RJbmRleCwgZXZhSWR4IH0gPSBjdXJyZW50VGFyZ2V0LmRhdGFzZXQ7XHJcbiAgICAgICAgY29uc3QgZXZhSW1nSWR4ID0gdGFyZ2V0LmRhdGFzZXQuaW5kZXg7XHJcblxyXG4gICAgICAgIGNvbnN0IHsgaW1ncyB9ID0gdGhpcy5kYXRhLnBhZ2VfZGF0YVttb2RJbmRleF0ucHJvcHMuZGF0YVtldmFJZHhdO1xyXG5cclxuICAgICAgICBwcmV2aWV3SW1hZ2UoaW1ncy5tYXAoaW1nID0+ICh1cmwuaW5kZXhPZignaHR0cHMnKSA+IDAgPyAnJyA6ICdodHRwczonKSArIHVybCksIGV2YUltZ0lkeCk7XHJcbiAgICB9LFxyXG59O1xyXG5cclxuIl19