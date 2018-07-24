"use strict";

var data = {
    refresh: false, // 刷新页面
    multiSelector: {} // 用于选择器
};

var foos = {
    resetCoupon: function resetCoupon() {
        data.couponManage = {};
    }
};

module.exports = {
    get: function get(key) {

        if (data[key] === undefined) {
            return {};
        }

        return data[key];
    },
    set: function set(key, v) {
        data[key] = v;
        // console.log(data);
    },
    commit: function commit(name) {
        foos[name] && foos[name]();
    }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdsb2JhbFNlcnZpY2UuanMiXSwibmFtZXMiOlsiZGF0YSIsInJlZnJlc2giLCJtdWx0aVNlbGVjdG9yIiwiZm9vcyIsInJlc2V0Q291cG9uIiwiY291cG9uTWFuYWdlIiwibW9kdWxlIiwiZXhwb3J0cyIsImdldCIsImtleSIsInVuZGVmaW5lZCIsInNldCIsInYiLCJjb21taXQiLCJuYW1lIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQU1BLE9BQU87QUFDVEMsYUFBUyxLQURBLEVBQ087QUFDaEJDLG1CQUFlLEVBRk4sQ0FFVTtBQUZWLENBQWI7O0FBS0EsSUFBTUMsT0FBTztBQUNUQyxlQURTLHlCQUNLO0FBQ1ZKLGFBQUtLLFlBQUwsR0FBb0IsRUFBcEI7QUFDSDtBQUhRLENBQWI7O0FBTUFDLE9BQU9DLE9BQVAsR0FBaUI7QUFDYkMsT0FEYSxlQUNUQyxHQURTLEVBQ0o7O0FBRUwsWUFBSVQsS0FBS1MsR0FBTCxNQUFjQyxTQUFsQixFQUE2QjtBQUN6QixtQkFBTyxFQUFQO0FBQ0g7O0FBRUQsZUFBT1YsS0FBS1MsR0FBTCxDQUFQO0FBQ0gsS0FSWTtBQVViRSxPQVZhLGVBVVRGLEdBVlMsRUFVSkcsQ0FWSSxFQVVEO0FBQ1JaLGFBQUtTLEdBQUwsSUFBWUcsQ0FBWjtBQUNBO0FBQ0gsS0FiWTtBQWViQyxVQWZhLGtCQWVOQyxJQWZNLEVBZUE7QUFDVFgsYUFBS1csSUFBTCxLQUFjWCxLQUFLVyxJQUFMLEdBQWQ7QUFDSDtBQWpCWSxDQUFqQiIsImZpbGUiOiJnbG9iYWxTZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgZGF0YSA9IHtcbiAgICByZWZyZXNoOiBmYWxzZSwgLy8g5Yi35paw6aG16Z2iXG4gICAgbXVsdGlTZWxlY3Rvcjoge30sIC8vIOeUqOS6jumAieaLqeWZqFxufTtcblxuY29uc3QgZm9vcyA9IHtcbiAgICByZXNldENvdXBvbigpIHtcbiAgICAgICAgZGF0YS5jb3Vwb25NYW5hZ2UgPSB7fTtcbiAgICB9LFxufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZ2V0KGtleSkge1xuXG4gICAgICAgIGlmIChkYXRhW2tleV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGRhdGFba2V5XTtcbiAgICB9LFxuXG4gICAgc2V0KGtleSwgdikge1xuICAgICAgICBkYXRhW2tleV0gPSB2O1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICB9LFxuXG4gICAgY29tbWl0KG5hbWUpIHtcbiAgICAgICAgZm9vc1tuYW1lXSAmJiBmb29zW25hbWVdKCk7XG4gICAgfSxcbn07Il19