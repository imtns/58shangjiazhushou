'use strict';

var _getRoute = require('./../utils/getRoute.js');

// 跳转页面
module.exports = {
    onNavigationTo: function onNavigationTo(e) {
        var pagekey = e.currentTarget.dataset.pagekey;

        console.log(pagekey);
        if (!pagekey) return;
        var route = (0, _getRoute.getRoute)(pagekey);
        (0, _getRoute.navigateTo)(route);
    }
}; // import { previewImage } from '../utils/index.js';
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5hdmlnYXRpb24uanMiXSwibmFtZXMiOlsibW9kdWxlIiwiZXhwb3J0cyIsIm9uTmF2aWdhdGlvblRvIiwiZSIsInBhZ2VrZXkiLCJjdXJyZW50VGFyZ2V0IiwiZGF0YXNldCIsImNvbnNvbGUiLCJsb2ciLCJyb3V0ZSJdLCJtYXBwaW5ncyI6Ijs7QUFDQTs7QUFFQTtBQUNBQSxPQUFPQyxPQUFQLEdBQWlCO0FBQ2JDLGtCQURhLDBCQUNFQyxDQURGLEVBQ0s7QUFBQSxZQUNOQyxPQURNLEdBQ01ELEVBQUVFLGFBQUYsQ0FBZ0JDLE9BRHRCLENBQ05GLE9BRE07O0FBRWRHLGdCQUFRQyxHQUFSLENBQVlKLE9BQVo7QUFDQSxZQUFJLENBQUNBLE9BQUwsRUFBYztBQUNkLFlBQU1LLFFBQVEsd0JBQVNMLE9BQVQsQ0FBZDtBQUNBLGtDQUFXSyxLQUFYO0FBQ0g7QUFQWSxDQUFqQixDLENBSkEiLCJmaWxlIjoibmF2aWdhdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGltcG9ydCB7IHByZXZpZXdJbWFnZSB9IGZyb20gJy4uL3V0aWxzL2luZGV4LmpzJztcbmltcG9ydCB7IGdldFJvdXRlLCBuYXZpZ2F0ZVRvIH0gZnJvbSAnLi4vdXRpbHMvZ2V0Um91dGUnO1xuXG4vLyDot7PovazpobXpnaJcbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIG9uTmF2aWdhdGlvblRvKGUpIHtcbiAgICAgICAgY29uc3QgeyBwYWdla2V5IH0gPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldDtcbiAgICAgICAgY29uc29sZS5sb2cocGFnZWtleSk7XG4gICAgICAgIGlmICghcGFnZWtleSkgcmV0dXJuO1xuICAgICAgICBjb25zdCByb3V0ZSA9IGdldFJvdXRlKHBhZ2VrZXkpO1xuICAgICAgICBuYXZpZ2F0ZVRvKHJvdXRlKTtcbiAgICB9LFxufTtcbiJdfQ==