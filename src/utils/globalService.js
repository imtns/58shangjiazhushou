const data = {
    refresh: false, // 刷新页面
    multiSelector: {}, // 用于选择器
    cropperUrl: '',
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
        console.log(data);
    },

    commit(name) {
        foos[name] && foos[name]();
    },
};