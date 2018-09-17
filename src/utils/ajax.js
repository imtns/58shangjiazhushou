/* eslint-disable */

import wepy from 'wepy';
import { toast } from '../utils';

const host = 'https://yaofa.58.com';

const http = (method, ...props) => new Promise((resolve, reject) => {
    let [url, data, callback, loadingControl] = props;
    if (typeof data === 'function') {
        callback = data;
        data = {};
    }
    // loadingControl为控制loading的时间和文案的obj
    // loadingTitle标示loading的文案
    // delay标示 loading关闭时间 需要在请求成功后再次做延迟。
    let loadingTitle = '';
    let delay = 0;
    if (loadingControl) {
        loadingTitle = loadingControl.loadingTitle;
        delay = loadingControl.delay;
    }
    // test="test"字段是为切换测试和线上环境的，如果提交审核和发布，将test改为''，标识切换为线上环境
    // const sendData = Object.assign({}, data, { test: 'test' });
    const sendData = Object.assign({}, data, { test: '' });
    // ppu加入header
    const ppu = wx.getStorageSync('ppu');
    console.log('请求接口', url);
    console.log('请求参数', sendData);
    // wx.showLoading && wx.showLoading({ title: loadingTitle || '加载中', mask: true });
    wepy.showNavigationBarLoading && wepy.showNavigationBarLoading();
    return wx.request({
        url: host + url + (~url.indexOf('?') ? '' : '?') + (+new Date()).toString(36).substr(3),
        data: sendData,
        method: method,
        dataType: 'json',
        header: {
            'content-type': method === 'GET' ? 'application/json' : 'application/x-www-form-urlencoded;charset=utf-8',
            PPU: ppu || 'wanghongyue',
            // 'YkuYdY8rk5As4T2QaJ7v': '45797966958100',
            reqfrom: 'biz_assistant',
        },
        success(response) {
            console.log('response', response);
            const { state, msg, data } = response.data;
            if (state === 100) {
                resolve(response.data);
                // callback && callback(null, response.data);
            } else if (state == -10001) {
                console.log(url);
                toast(msg);
                setTimeout(() => {
                    wepy.reLaunch({
                        url: '../pages/intro',
                    });
                }, 1000);
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
            if (delay) {
                setTimeout(() => {
                    wepy.hideNavigationBarLoading() && wepy.hideNavigationBarLoading();
                }, delay);
            }else {
                wepy.hideNavigationBarLoading && wepy.hideNavigationBarLoading();
            }
        },
    });
});

module.exports.get = (...props) => http('GET', ...props);

module.exports.post = (...props) => http('POST', ...props);