'use strict';

/*eslint-disable */
var _require = require('./../../../utils/index.js'),
    previewImage = _require.previewImage;

module.exports = {
    imageSwiperChange: function imageSwiperChange(e) {
        var index = e.currentTarget.dataset.index;
        var current = e.detail.current;
        var page_data = this.data.page_data;

        var tplData = page_data[index];

        // update title desc & current
        var _tplData$props$cfg$im = tplData.props.cfg.images[current || 0],
            title = _tplData$props$cfg$im.title,
            desc = _tplData$props$cfg$im.desc;

        var newProps = { current: current };
        if (title) newProps.title = title;
        if (desc) newProps.desc = desc;

        Object.assign(tplData.props, newProps);
        this.setData({ page_data: page_data });
    }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImltYWdlU3dpcGVyLmpzIl0sIm5hbWVzIjpbInJlcXVpcmUiLCJwcmV2aWV3SW1hZ2UiLCJtb2R1bGUiLCJleHBvcnRzIiwiaW1hZ2VTd2lwZXJDaGFuZ2UiLCJlIiwiaW5kZXgiLCJjdXJyZW50VGFyZ2V0IiwiZGF0YXNldCIsImN1cnJlbnQiLCJkZXRhaWwiLCJwYWdlX2RhdGEiLCJkYXRhIiwidHBsRGF0YSIsInByb3BzIiwiY2ZnIiwiaW1hZ2VzIiwidGl0bGUiLCJkZXNjIiwibmV3UHJvcHMiLCJPYmplY3QiLCJhc3NpZ24iLCJzZXREYXRhIl0sIm1hcHBpbmdzIjoiOztBQUFBO2VBQ3lCQSxRQUFRLHNCQUFSLEM7SUFBakJDLFksWUFBQUEsWTs7QUFFUkMsT0FBT0MsT0FBUCxHQUFpQjtBQUNmQyxxQkFEZSw2QkFDR0MsQ0FESCxFQUNNO0FBQUEsWUFDWEMsS0FEVyxHQUNERCxFQUFFRSxhQUFGLENBQWdCQyxPQURmLENBQ1hGLEtBRFc7QUFBQSxZQUVYRyxPQUZXLEdBRUNKLEVBQUVLLE1BRkgsQ0FFWEQsT0FGVztBQUFBLFlBSVhFLFNBSlcsR0FJRyxLQUFLQyxJQUpSLENBSVhELFNBSlc7O0FBS25CLFlBQU1FLFVBQVVGLFVBQVVMLEtBQVYsQ0FBaEI7O0FBRUE7QUFQbUIsb0NBUUtPLFFBQVFDLEtBQVIsQ0FBY0MsR0FBZCxDQUFrQkMsTUFBbEIsQ0FBeUJQLFdBQVcsQ0FBcEMsQ0FSTDtBQUFBLFlBUVhRLEtBUlcseUJBUVhBLEtBUlc7QUFBQSxZQVFKQyxJQVJJLHlCQVFKQSxJQVJJOztBQVNuQixZQUFNQyxXQUFXLEVBQUVWLGdCQUFGLEVBQWpCO0FBQ0EsWUFBSVEsS0FBSixFQUFXRSxTQUFTRixLQUFULEdBQWlCQSxLQUFqQjtBQUNYLFlBQUlDLElBQUosRUFBVUMsU0FBU0QsSUFBVCxHQUFnQkEsSUFBaEI7O0FBRVZFLGVBQU9DLE1BQVAsQ0FBY1IsUUFBUUMsS0FBdEIsRUFBNkJLLFFBQTdCO0FBQ0EsYUFBS0csT0FBTCxDQUFhLEVBQUVYLG9CQUFGLEVBQWI7QUFDRDtBQWhCYyxDQUFqQiIsImZpbGUiOiJpbWFnZVN3aXBlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qZXNsaW50LWRpc2FibGUgKi9cclxuY29uc3QgeyBwcmV2aWV3SW1hZ2UgfSA9IHJlcXVpcmUoJy4uLy4uLy4uL3V0aWxzL2luZGV4Jyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICBpbWFnZVN3aXBlckNoYW5nZShlKSB7XHJcbiAgICBjb25zdCB7IGluZGV4IH0gPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldDtcclxuICAgIGNvbnN0IHsgY3VycmVudCB9ID0gZS5kZXRhaWw7XHJcblxyXG4gICAgY29uc3QgeyBwYWdlX2RhdGEgfSA9IHRoaXMuZGF0YTtcclxuICAgIGNvbnN0IHRwbERhdGEgPSBwYWdlX2RhdGFbaW5kZXhdO1xyXG5cclxuICAgIC8vIHVwZGF0ZSB0aXRsZSBkZXNjICYgY3VycmVudFxyXG4gICAgY29uc3QgeyB0aXRsZSwgZGVzYyB9ID0gdHBsRGF0YS5wcm9wcy5jZmcuaW1hZ2VzW2N1cnJlbnQgfHwgMF07XHJcbiAgICBjb25zdCBuZXdQcm9wcyA9IHsgY3VycmVudCB9O1xyXG4gICAgaWYgKHRpdGxlKSBuZXdQcm9wcy50aXRsZSA9IHRpdGxlO1xyXG4gICAgaWYgKGRlc2MpIG5ld1Byb3BzLmRlc2MgPSBkZXNjO1xyXG5cclxuICAgIE9iamVjdC5hc3NpZ24odHBsRGF0YS5wcm9wcywgbmV3UHJvcHMpO1xyXG4gICAgdGhpcy5zZXREYXRhKHsgcGFnZV9kYXRhIH0pXHJcbiAgfVxyXG59O1xyXG4iXX0=