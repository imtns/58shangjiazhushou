const data = {};

const foos = {
    resetCoupon() {
        data.couponManage = {};
    },
};

module.exports = {
    get(key) {
        return data[key] || {};
    },

    set(key, v) {
        data[key] = v;
        console.log(data);
    },

    commit(name) {
        foos[name] && foos[name]();
    },
};