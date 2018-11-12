/* eslint-disable */

import { toast } from '../utils';
import loginHelper from '../utils/login';

const host = 'https://yaofa.58.com';

const http = (method, ...props) => new Promise((resolve, reject) => {
    let [url, data, callback, loadingControl] = props;
    if (typeof data === 'function') {
        callback = data;
        data = {};
    }
    // loadingControl为控制loading的时间和文案的obj
    // delay标示 loading关闭时间 需要在请求成功后再次做延迟。
    let delay = 0;
    if (loadingControl) {
        delay = loadingControl.delay;
    }
    // test="test"字段是为切换测试和线上环境的，如果提交审核和发布，将test改为''，标识切换为线上环境
    const sendData = Object.assign({}, data, { test: '' });
    // const sendData = Object.assign({}, data, { test: '' });
    // ppu加入header
    const ppu = wx.getStorageSync('ppu');
    console.log('请求接口', url);
    console.log('请求参数', sendData);
    wx.showNavigationBarLoading && wx.showNavigationBarLoading();
    return wx.request({
        url: host + url + (~url.indexOf('?') ? '' : '?') + (+new Date()).toString(36).substr(3),
        data: sendData,
        method: method,
        dataType: 'json',
        header: {
            'content-type': method === 'GET' ? 'application/json' : 'application/x-www-form-urlencoded;charset=utf-8',
            PPU: ppu || 'wanghongyue',
            // 'YkuYdY8rk5As4T2QaJ7v': '47350441209367',
            reqfrom: 'biz_assistant',
            // 'YkuYdY8rk5As4T2QaJ7v': 46160601,
        },
        success(response) {
            console.log('response', response);
            const { state, msg } = response.data;

            if (state === 100) {
                resolve(response.data);

            } else if (state == -10001) {
                const pages = getCurrentPages();
                const len = pages.length;
                const { route } = pages[len - 1];

                console.log('route:', route);
                if (route !== 'pages/home') {
                    toast('登录过期，请重新登录');
                    setTimeout(() => {
                        loginHelper.goLogin();
                    }, 1000);
                }

                reject(msg);

            } else {
                reject(msg);
            }
        },
        fail(e) {
            reject(e);
            callback && callback(e);
        },
        complete() {
            if (delay) {
                setTimeout(() => {
                    wx.hideNavigationBarLoading() && wx.hideNavigationBarLoading();
                }, delay);
            }else {
                wx.hideNavigationBarLoading && wx.hideNavigationBarLoading();
            }
        },
    });
});

module.exports.get = (...props) => http('GET', ...props);

module.exports.post = (...props) => http('POST', ...props);
