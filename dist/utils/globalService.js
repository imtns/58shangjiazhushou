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