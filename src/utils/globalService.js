const data = {
    refresh: false, // 刷新页面
    multiSelector: {}, // 用于选择器
    cropperUrl: '',
    afterCrop: false, // 是否刚裁剪完，设为true后记得改回false
    'app.pickBusinessHour': {},
};

const foos = {
    resetCoupon() {
        data.couponManage = {};
    },
};

module.exports = {
    get(key) {
        if (data[key] === undefined) {
            return {};
        }

        return data[key];
    },

    set(key, v) {
        data[key] = v;
    },

    commit(name) {
        foos[name] && foos[name]();
    },
};
