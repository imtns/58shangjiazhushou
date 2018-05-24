import wepy from 'wepy';
let host = 'http://wanghongyue.58.com';

const http = (method, ...props) => new Promise((resolve, reject) => {
    let [url, data, callback] = props;
    if (typeof data === 'function') {
        callback = data;
        data = {};
    }

    const sendData = Object.assign({}, data);
    //ppu加入header
    const ppu = wx.getStorageSync('ppu');

    wx.showLoading && wx.showLoading({ title: '加载中', mask: true });
    return wepy.request({
        url: host + url + (~url.indexOf('?') ? '' : '?') + (+new Date()).toString(36).substr(3),
        data: sendData,
        method: method,
        dataType: 'json',
        header: {
            "content-type": method === "GET" ? "application/json" : "application/x-www-form-urlencoded",
            "PPU": ppu || 'wanghongyue',
        },
        success(response) {
            const { state, msg, data } = response.data;
            if (state == 100) {
                resolve(response.data)
                //callback && callback(null, response.data);
            } else if (state == 1) {
                resolve(response.data)
                //callback && callback(null, response.data);
            } else {
                reject(msg);
                //callback && callback(msg);
            }
        },
        fail(e) {
            reject(e);
            callback && callback(e);
        },
        complete() {
            wx.hideLoading && wx.hideLoading();
        }
    });
});

module.exports.get = (...props) => {
    return http('GET', ...props);
};

module.exports.post = (...props) => {
    return http('POST', ...props);
};
