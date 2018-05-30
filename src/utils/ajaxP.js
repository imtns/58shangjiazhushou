import wepy from 'wepy';
import { toast } from './index';

const test = 'test';
const host = 'https://yaofa.58.com';
const http = (method, ...props) => {
    const [url, param] = props;
    const sendData = Object.assign({}, param, { test });
    // ppu加入header
    const ppu = wepy.getStorageSync('ppu');
    console.log('请求接口', url);
    wepy.showLoading && wepy.showLoading({ title: '加载中', mask: true });
    return new Promise(async (resolve) => {
        try {
            const response = await wepy.request({
                url: host + url + (~url.indexOf('?') ? '' : '?') + (+new Date()).toString(36).substr(3),
                data: sendData,
                method: method,
                dataType: 'json',
                header: {
                    'content-type': method === 'GET' ? 'application/json' : 'application/x-www-form-urlencoded;charset=utf-8',
                    PPU: ppu || 'wanghongyue',
                    reqfrom: 'biz_assistant',
                },
            });
            const { state, msg, data } = response.data;
            wepy.hideLoading && wepy.hideLoading();
            if (state === 100) {
                resolve([null, data]);
            } else if (state === -10001) {
                toast(msg);
                wepy.redirectTo({
                    url: '../pages/intro',
                });
            } else {
                resolve([msg]);
            }
        } catch (e) {
            console.log('ajax catch', e);
            resolve([e]);
            wepy.hideLoading && wepy.hideLoading();
        }
    });
};

module.exports.get = (...props) => http('GET', ...props);

module.exports.post = (...props) => http('POST', ...props);
