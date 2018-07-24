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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImltYWdlcy5qcyJdLCJuYW1lcyI6WyJvbkltYWdlQ2xpY2siLCJlIiwiY3VycmVudFRhcmdldCIsImRhdGFzZXQiLCJpbmRleCIsImN1cnJlbnQiLCJwYWdla2V5IiwiYWN0aW9uIiwiaW1hZ2VzIiwiZGF0YSIsInBhZ2VfZGF0YSIsInByb3BzIiwiY2ZnIiwibWFwIiwiaW1nIiwic3JjIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7QUFDQTs7Ozs7O2tCQUVlO0FBQ1hBLGdCQURXLHdCQUNFQyxDQURGLEVBQ0s7QUFBQSxvQ0FHUkEsRUFBRUMsYUFBRixDQUFnQkMsT0FIUjtBQUFBLFlBRVJDLEtBRlEseUJBRVJBLEtBRlE7QUFBQSxZQUVEQyxPQUZDLHlCQUVEQSxPQUZDO0FBQUEsWUFFUUMsT0FGUix5QkFFUUEsT0FGUjtBQUFBLFlBRWlCQyxNQUZqQix5QkFFaUJBLE1BRmpCOztBQUlaLFlBQUlBLFdBQVcsR0FBZixFQUFvQjtBQUNoQixxQ0FBVUQsT0FBVjtBQUNILFNBRkQsTUFFTyxJQUFJQyxXQUFXLEdBQWYsRUFBb0I7QUFDdkIsZ0JBQU1DLFNBQVMsS0FBS0MsSUFBTCxDQUFVQyxTQUFWLENBQW9CTCxPQUFwQixFQUE2Qk0sS0FBN0IsQ0FBbUNDLEdBQW5DLENBQXVDSixNQUF2QyxDQUE4Q0ssR0FBOUMsQ0FBa0Q7QUFBQSx1QkFBT0MsSUFBSUMsR0FBWDtBQUFBLGFBQWxELENBQWY7QUFDQSxxQ0FBYVAsTUFBYixFQUFxQkosS0FBckI7QUFDSCxTQUhNLE1BR0EsSUFBSSxPQUFPRyxNQUFQLEtBQWtCLFdBQWxCLElBQWlDRCxPQUFyQyxFQUE4QztBQUNqRDtBQUNBO0FBQ0EscUNBQVVBLE9BQVY7QUFDSCxTQUpNLE1BSUEsSUFBSSxPQUFPQyxNQUFQLEtBQWtCLFdBQWxCLElBQWlDLENBQUNELE9BQXRDLEVBQStDO0FBQ2xEO0FBQ0E7QUFDQSxnQkFBTUUsVUFBUyxLQUFLQyxJQUFMLENBQVVDLFNBQVYsQ0FBb0JMLE9BQXBCLEVBQTZCTSxLQUE3QixDQUFtQ0MsR0FBbkMsQ0FBdUNKLE1BQXZDLENBQThDSyxHQUE5QyxDQUFrRDtBQUFBLHVCQUFPQyxJQUFJQyxHQUFYO0FBQUEsYUFBbEQsQ0FBZjtBQUNBLHFDQUFhUCxPQUFiLEVBQXFCSixLQUFyQjtBQUNIO0FBQ0o7QUFwQlUsQyIsImZpbGUiOiJpbWFnZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBwcmV2aWV3SW1hZ2UgfSBmcm9tICcuLi8uLi8uLi91dGlscy9pbmRleCc7XG5pbXBvcnQgc3dpdGNoVGFiIGZyb20gJy4uLy4uLy4uL3V0aWxzL3N3aXRjaFRhYic7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBvbkltYWdlQ2xpY2soZSkge1xuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICBpbmRleCwgY3VycmVudCwgcGFnZWtleSwgYWN0aW9uLFxuICAgICAgICB9ID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQ7XG4gICAgICAgIGlmIChhY3Rpb24gPT09ICcyJykge1xuICAgICAgICAgICAgc3dpdGNoVGFiKHBhZ2VrZXkpO1xuICAgICAgICB9IGVsc2UgaWYgKGFjdGlvbiA9PT0gJzMnKSB7XG4gICAgICAgICAgICBjb25zdCBpbWFnZXMgPSB0aGlzLmRhdGEucGFnZV9kYXRhW2N1cnJlbnRdLnByb3BzLmNmZy5pbWFnZXMubWFwKGltZyA9PiBpbWcuc3JjKTtcbiAgICAgICAgICAgIHByZXZpZXdJbWFnZShpbWFnZXMsIGluZGV4KTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgYWN0aW9uID09PSAndW5kZWZpbmVkJyAmJiBwYWdla2V5KSB7XG4gICAgICAgICAgICAvLyDogIHniYjkuK3msqHmnIlhY3Rpb27lrZfmrrVcbiAgICAgICAgICAgIC8vIOWFvOWuueiAgeeJiOmhtemdoui3s+i9rFxuICAgICAgICAgICAgc3dpdGNoVGFiKHBhZ2VrZXkpO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBhY3Rpb24gPT09ICd1bmRlZmluZWQnICYmICFwYWdla2V5KSB7XG4gICAgICAgICAgICAvLyDogIHniYjkuK3msqHmnIlhY3Rpb27lrZfmrrVcbiAgICAgICAgICAgIC8vIOWFvOWuueiAgeeJiOeCueWHu+aUvuWkp1xuICAgICAgICAgICAgY29uc3QgaW1hZ2VzID0gdGhpcy5kYXRhLnBhZ2VfZGF0YVtjdXJyZW50XS5wcm9wcy5jZmcuaW1hZ2VzLm1hcChpbWcgPT4gaW1nLnNyYyk7XG4gICAgICAgICAgICBwcmV2aWV3SW1hZ2UoaW1hZ2VzLCBpbmRleCk7XG4gICAgICAgIH1cbiAgICB9LFxufTtcbiJdfQ==