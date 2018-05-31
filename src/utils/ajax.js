import wepy from 'wepy';
import { toast } from '../utils';

const host = 'https://yaofa.58.com';

const http = (method, ...props) => new Promise((resolve, reject) => {
    let [url, data, callback] = props;
    if (typeof data === 'function') {
        callback = data;
        data = {};
    }
    const sendData = Object.assign({}, data, {
        test: 'test',
    });
    // ppu加入header
    const ppu = wx.getStorageSync('ppu');
    console.log('请求接口', url);
    console.log('请求参数', sendData);
    wx.showLoading && wx.showLoading({ title: '加载中', mask: true });
    return wx.request({
        url: host + url + (~url.indexOf('?') ? '' : '?') + (+new Date()).toString(36).substr(3),
        data: sendData,
        method: method,
        dataType: 'json',
        header: {
            'content-type': method === 'GET' ? 'application/json' : 'application/x-www-form-urlencoded;charset=utf-8',
            PPU: ppu || 'wanghongyue',
            'reqfrom': 'biz_assistant',
        },
        success(response) {
            console.log('response', response);
            const { state, msg, data } = response.data;
            if (state === 100) {
                resolve(response.data);
                // callback && callback(null, response.data);
            } else if (state == -10001) {
                toast(msg);
                wepy.reLaunch({
                    url: '../pages/intro',
                });
                reject(msg);
                // callback && callback(null, response.data);
            } else {
                reject(msg);
                // callback && callback(msg);
            }
        },
        fail(e) {
            reject(e);
            callback && callback(e);
        },
        complete() {
            wx.hideLoading && wx.hideLoading();
        },
    });
});

module.exports.get = (...props) => http('GET', ...props);

module.exports.post = (...props) => http('POST', ...props);
