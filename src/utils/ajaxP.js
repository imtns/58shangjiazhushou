import wepy from 'wepy';
import { toast } from './index';

const test = 'test';
const host = 'https://yaofa.58.com';
const http = (method, ...props) => {
    const [url, param, showLoading = true] = props;
    const sendData = Object.assign({}, param, { test });
    // ppu加入header
    const ppu = wepy.getStorageSync('ppu');
    console.log('请求接口', url);
    console.log('请求参数', sendData);
    showLoading && wepy.showLoading && wepy.showLoading({ title: '加载中', mask: true });
    return new Promise((resolve) => {
        wepy.request({
            url: host + url + (~url.indexOf('?') ? '' : '?') + (+new Date()).toString(36).substr(3),
            data: sendData,
            method: method,
            dataType: 'json',
            header: {
                'content-type': method === 'GET' ? 'application/json' : 'application/x-www-form-urlencoded;charset=utf-8',
                PPU: ppu || 'wanghongyue',
                reqfrom: 'biz_assistant',
            },
        }).then((response) => {
            console.log('response', response);
            showLoading && wepy.hideLoading && wepy.hideLoading();
            const { state, msg, data } = response.data;
            if (state === 100) {
                resolve([null, data]);
            } else if (state === -10001) {
                toast(msg);
                setTimeout(() => {
                    wepy.reLaunch({
                        url: '../pages/intro',
                    });
                }, 1000);
            } else {
                resolve([msg]);
            }
        }).catch((err) => {
            showLoading && wepy.hideLoading && wepy.hideLoading();
            resolve([err.errMsg]);
        });
    });
};

module.exports.get = (...props) => http('GET', ...props);

module.exports.post = (...props) => http('POST', ...props);
