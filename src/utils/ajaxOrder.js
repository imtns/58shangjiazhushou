import wepy from 'wepy';

const test = 'test';
const host = 'http://yaofa.58.com';
const http = (method, ...props) => {
    const [url, param, showLoading = true] = props;
    const sendData = Object.assign({}, param, { test });
    // ppu加入header
    const ppu = wepy.getStorageSync('ppu');
    console.log('请求接口', url);
    console.log('请求参数', param);
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
                // YkuYdY8rk5As4T2QaJ7v: '15293583575559',
            },
        }).then((response) => {
            console.log('ajaxOrder.response', response);
            showLoading && wepy.hideLoading && wepy.hideLoading();
            const { state, msg } = response.data;
            if (state === 100) {
                resolve([null, response.data]);
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
