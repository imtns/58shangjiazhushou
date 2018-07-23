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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5hdmlnYXRpb24uanMiXSwibmFtZXMiOlsibW9kdWxlIiwiZXhwb3J0cyIsIm9uTmF2aWdhdGlvblRvIiwiZSIsInBhZ2VrZXkiLCJjdXJyZW50VGFyZ2V0IiwiZGF0YXNldCIsImNvbnNvbGUiLCJsb2ciLCJyb3V0ZSJdLCJtYXBwaW5ncyI6Ijs7QUFDQTs7QUFFQTtBQUNBQSxPQUFPQyxPQUFQLEdBQWlCO0FBQ2JDLGtCQURhLDBCQUNFQyxDQURGLEVBQ0s7QUFBQSxZQUNOQyxPQURNLEdBQ01ELEVBQUVFLGFBQUYsQ0FBZ0JDLE9BRHRCLENBQ05GLE9BRE07O0FBRWRHLGdCQUFRQyxHQUFSLENBQVlKLE9BQVo7QUFDQSxZQUFJLENBQUNBLE9BQUwsRUFBYztBQUNkLFlBQU1LLFFBQVEsd0JBQVNMLE9BQVQsQ0FBZDtBQUNBLGtDQUFXSyxLQUFYO0FBQ0g7QUFQWSxDQUFqQixDLENBSkEiLCJmaWxlIjoibmF2aWdhdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGltcG9ydCB7IHByZXZpZXdJbWFnZSB9IGZyb20gJy4uL3V0aWxzL2luZGV4LmpzJztcclxuaW1wb3J0IHsgZ2V0Um91dGUsIG5hdmlnYXRlVG8gfSBmcm9tICcuLi91dGlscy9nZXRSb3V0ZSc7XHJcblxyXG4vLyDot7PovazpobXpnaJcclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICBvbk5hdmlnYXRpb25UbyhlKSB7XHJcbiAgICAgICAgY29uc3QgeyBwYWdla2V5IH0gPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldDtcclxuICAgICAgICBjb25zb2xlLmxvZyhwYWdla2V5KTtcclxuICAgICAgICBpZiAoIXBhZ2VrZXkpIHJldHVybjtcclxuICAgICAgICBjb25zdCByb3V0ZSA9IGdldFJvdXRlKHBhZ2VrZXkpO1xyXG4gICAgICAgIG5hdmlnYXRlVG8ocm91dGUpO1xyXG4gICAgfSxcclxufTtcclxuIl19