/*eslint-disable */
import { globalData } from '../utils/globalData';

const { notSupportTips } = require('../utils/index');

let host = 'https://yaofa.58.com';


const http = (method, ...props) => {

    let [url, data, callback,noLoading] = props;
    if (typeof data === 'function') {
        callback = data;
        data = {};
    }

    let { appId, releaseId,test } = globalData.extConfig;

    if (!appId) {
        notSupportTips();
        return;
    }

    console.log('发送请求：', method, props);
    let mediaor = { appId, releaseId }
    const sendData = Object.assign({}, data, mediaor);

    !noLoading&&wx.showLoading && wx.showLoading({title: '加载中', mask: true});
    return wx.request({
        url: host + url + (~url.indexOf('?') ? '' : '?') + (+new Date()).toString(36).substr(3),
        data: sendData,
        method: method,
        dataType: 'json',
        header: {
            "content-type": method === "GET" ? "application/json" : "application/x-www-form-urlencoded;charset=utf-8"
        },
        success(response) {
            console.log('response:',response);
            const { state, msg, data } = response.data;
            if (state == 100) {
                callback && callback(null, data);
            }else if(state==-110){
                callback && callback(null, msg,data);
            } else {
                callback && callback(msg);
            }
        },
        fail(e) {
            callback && callback(e);
        },
        complete() {
            !noLoading&&wx.hideLoading && wx.hideLoading();
        }
    });
};

module.exports.get = (...props) => {
    return http('GET', ...props);
};

module.exports.post = (...props) => {
    return http('POST', ...props);
};

module.exports.request = () => {
    wx.showNavigationBarLoading && wx.showNavigationBarLoading({title: '加载中'});
    return wx.request({
        url: url,
        complete() {
            wx.hideNavigationBarLoading && wx.hideNavigationBarLoading();
        }
    });
};
