'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _index = require('./../../../utils/index.js');

var _switchTab = require('./../../../utils/switchTab.js');

var _switchTab2 = _interopRequireDefault(_switchTab);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    onImageClick: function onImageClick(e) {
        var _e$currentTarget$data = e.currentTarget.dataset,
            index = _e$currentTarget$data.index,
            current = _e$currentTarget$data.current,
            pagekey = _e$currentTarget$data.pagekey,
            action = _e$currentTarget$data.action;

        if (action === '2') {
            (0, _switchTab2.default)(pagekey);
        } else if (action === '3') {
            var images = this.data.page_data[current].props.cfg.images.map(function (img) {
                return img.src;
            });
            (0, _index.previewImage)(images, index);
        } else if (typeof action === 'undefined' && pagekey) {
            // 老版中没有action字段
            // 兼容老版页面跳转
            (0, _switchTab2.default)(pagekey);
        } else if (typeof action === 'undefined' && !pagekey) {
            // 老版中没有action字段
            // 兼容老版点击放大
            var _images = this.data.page_data[current].props.cfg.images.map(function (img) {
                return img.src;
            });
            (0, _index.previewImage)(_images, index);
        }
    }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImltYWdlcy5qcyJdLCJuYW1lcyI6WyJvbkltYWdlQ2xpY2siLCJlIiwiY3VycmVudFRhcmdldCIsImRhdGFzZXQiLCJpbmRleCIsImN1cnJlbnQiLCJwYWdla2V5IiwiYWN0aW9uIiwiaW1hZ2VzIiwiZGF0YSIsInBhZ2VfZGF0YSIsInByb3BzIiwiY2ZnIiwibWFwIiwiaW1nIiwic3JjIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7QUFDQTs7Ozs7O2tCQUVlO0FBQ1hBLGdCQURXLHdCQUNFQyxDQURGLEVBQ0s7QUFBQSxvQ0FHUkEsRUFBRUMsYUFBRixDQUFnQkMsT0FIUjtBQUFBLFlBRVJDLEtBRlEseUJBRVJBLEtBRlE7QUFBQSxZQUVEQyxPQUZDLHlCQUVEQSxPQUZDO0FBQUEsWUFFUUMsT0FGUix5QkFFUUEsT0FGUjtBQUFBLFlBRWlCQyxNQUZqQix5QkFFaUJBLE1BRmpCOztBQUlaLFlBQUlBLFdBQVcsR0FBZixFQUFvQjtBQUNoQixxQ0FBVUQsT0FBVjtBQUNILFNBRkQsTUFFTyxJQUFJQyxXQUFXLEdBQWYsRUFBb0I7QUFDdkIsZ0JBQU1DLFNBQVMsS0FBS0MsSUFBTCxDQUFVQyxTQUFWLENBQW9CTCxPQUFwQixFQUE2Qk0sS0FBN0IsQ0FBbUNDLEdBQW5DLENBQXVDSixNQUF2QyxDQUE4Q0ssR0FBOUMsQ0FBa0Q7QUFBQSx1QkFBT0MsSUFBSUMsR0FBWDtBQUFBLGFBQWxELENBQWY7QUFDQSxxQ0FBYVAsTUFBYixFQUFxQkosS0FBckI7QUFDSCxTQUhNLE1BR0EsSUFBSSxPQUFPRyxNQUFQLEtBQWtCLFdBQWxCLElBQWlDRCxPQUFyQyxFQUE4QztBQUNqRDtBQUNBO0FBQ0EscUNBQVVBLE9BQVY7QUFDSCxTQUpNLE1BSUEsSUFBSSxPQUFPQyxNQUFQLEtBQWtCLFdBQWxCLElBQWlDLENBQUNELE9BQXRDLEVBQStDO0FBQ2xEO0FBQ0E7QUFDQSxnQkFBTUUsVUFBUyxLQUFLQyxJQUFMLENBQVVDLFNBQVYsQ0FBb0JMLE9BQXBCLEVBQTZCTSxLQUE3QixDQUFtQ0MsR0FBbkMsQ0FBdUNKLE1BQXZDLENBQThDSyxHQUE5QyxDQUFrRDtBQUFBLHVCQUFPQyxJQUFJQyxHQUFYO0FBQUEsYUFBbEQsQ0FBZjtBQUNBLHFDQUFhUCxPQUFiLEVBQXFCSixLQUFyQjtBQUNIO0FBQ0o7QUFwQlUsQyIsImZpbGUiOiJpbWFnZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBwcmV2aWV3SW1hZ2UgfSBmcm9tICcuLi8uLi8uLi91dGlscy9pbmRleCc7XHJcbmltcG9ydCBzd2l0Y2hUYWIgZnJvbSAnLi4vLi4vLi4vdXRpbHMvc3dpdGNoVGFiJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAgIG9uSW1hZ2VDbGljayhlKSB7XHJcbiAgICAgICAgY29uc3Qge1xyXG4gICAgICAgICAgICBpbmRleCwgY3VycmVudCwgcGFnZWtleSwgYWN0aW9uLFxyXG4gICAgICAgIH0gPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldDtcclxuICAgICAgICBpZiAoYWN0aW9uID09PSAnMicpIHtcclxuICAgICAgICAgICAgc3dpdGNoVGFiKHBhZ2VrZXkpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoYWN0aW9uID09PSAnMycpIHtcclxuICAgICAgICAgICAgY29uc3QgaW1hZ2VzID0gdGhpcy5kYXRhLnBhZ2VfZGF0YVtjdXJyZW50XS5wcm9wcy5jZmcuaW1hZ2VzLm1hcChpbWcgPT4gaW1nLnNyYyk7XHJcbiAgICAgICAgICAgIHByZXZpZXdJbWFnZShpbWFnZXMsIGluZGV4KTtcclxuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBhY3Rpb24gPT09ICd1bmRlZmluZWQnICYmIHBhZ2VrZXkpIHtcclxuICAgICAgICAgICAgLy8g6ICB54mI5Lit5rKh5pyJYWN0aW9u5a2X5q61XHJcbiAgICAgICAgICAgIC8vIOWFvOWuueiAgeeJiOmhtemdoui3s+i9rFxyXG4gICAgICAgICAgICBzd2l0Y2hUYWIocGFnZWtleSk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgYWN0aW9uID09PSAndW5kZWZpbmVkJyAmJiAhcGFnZWtleSkge1xyXG4gICAgICAgICAgICAvLyDogIHniYjkuK3msqHmnIlhY3Rpb27lrZfmrrVcclxuICAgICAgICAgICAgLy8g5YW85a656ICB54mI54K55Ye75pS+5aSnXHJcbiAgICAgICAgICAgIGNvbnN0IGltYWdlcyA9IHRoaXMuZGF0YS5wYWdlX2RhdGFbY3VycmVudF0ucHJvcHMuY2ZnLmltYWdlcy5tYXAoaW1nID0+IGltZy5zcmMpO1xyXG4gICAgICAgICAgICBwcmV2aWV3SW1hZ2UoaW1hZ2VzLCBpbmRleCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxufTtcclxuIl19