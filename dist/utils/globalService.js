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
        return data[key] || {};
    },
    set: function set(key, v) {
        data[key] = v;
        // console.log(data);
    },
    commit: function commit(name) {
        foos[name] && foos[name]();
    }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdsb2JhbFNlcnZpY2UuanMiXSwibmFtZXMiOlsiZGF0YSIsInJlZnJlc2giLCJtdWx0aVNlbGVjdG9yIiwiZm9vcyIsInJlc2V0Q291cG9uIiwiY291cG9uTWFuYWdlIiwibW9kdWxlIiwiZXhwb3J0cyIsImdldCIsImtleSIsInNldCIsInYiLCJjb21taXQiLCJuYW1lIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQU1BLE9BQU87QUFDVEMsYUFBUyxLQURBLEVBQ087QUFDaEJDLG1CQUFlLEVBRk4sQ0FFVTtBQUZWLENBQWI7O0FBS0EsSUFBTUMsT0FBTztBQUNUQyxlQURTLHlCQUNLO0FBQ1ZKLGFBQUtLLFlBQUwsR0FBb0IsRUFBcEI7QUFDSDtBQUhRLENBQWI7O0FBTUFDLE9BQU9DLE9BQVAsR0FBaUI7QUFDYkMsT0FEYSxlQUNUQyxHQURTLEVBQ0o7QUFDTCxlQUFPVCxLQUFLUyxHQUFMLEtBQWEsRUFBcEI7QUFDSCxLQUhZO0FBS2JDLE9BTGEsZUFLVEQsR0FMUyxFQUtKRSxDQUxJLEVBS0Q7QUFDUlgsYUFBS1MsR0FBTCxJQUFZRSxDQUFaO0FBQ0E7QUFDSCxLQVJZO0FBVWJDLFVBVmEsa0JBVU5DLElBVk0sRUFVQTtBQUNUVixhQUFLVSxJQUFMLEtBQWNWLEtBQUtVLElBQUwsR0FBZDtBQUNIO0FBWlksQ0FBakIiLCJmaWxlIjoiZ2xvYmFsU2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGRhdGEgPSB7XHJcbiAgICByZWZyZXNoOiBmYWxzZSwgLy8g5Yi35paw6aG16Z2iXHJcbiAgICBtdWx0aVNlbGVjdG9yOiB7fSwgLy8g55So5LqO6YCJ5oup5ZmoXHJcbn07XHJcblxyXG5jb25zdCBmb29zID0ge1xyXG4gICAgcmVzZXRDb3Vwb24oKSB7XHJcbiAgICAgICAgZGF0YS5jb3Vwb25NYW5hZ2UgPSB7fTtcclxuICAgIH0sXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIGdldChrZXkpIHtcclxuICAgICAgICByZXR1cm4gZGF0YVtrZXldIHx8IHt9O1xyXG4gICAgfSxcclxuXHJcbiAgICBzZXQoa2V5LCB2KSB7XHJcbiAgICAgICAgZGF0YVtrZXldID0gdjtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgIH0sXHJcblxyXG4gICAgY29tbWl0KG5hbWUpIHtcclxuICAgICAgICBmb29zW25hbWVdICYmIGZvb3NbbmFtZV0oKTtcclxuICAgIH0sXHJcbn07Il19