import { globalData } from './globalData';
/**
 * 获取userID，从ppu中截取
 */
function getUid() {
    try {
        const uid = wx.getStorageSync('ppu').match(/(?:UID=)([^&]*)/)[1];
        return uid;
    } catch (e) {
        return '';
    }
}
/**
 * 红包埋点日志记录
 * 一、参数说明
 * date:时间                        可不传，后台自动生成
 * page:页面                        页面路径
 * button:按钮                      点击按钮名称
 * ip地址                           ip地址
 * model机型                        model机型
 * brand手机品牌                     手机品牌
 * system系统                       系统
 * action:行为                      点击click、展现show、长按识别longpress、关闭小程序closemp、发送消息sendmsg、分享share
 * openid:openid                   后端通过consumerId来获取
 * consumerId                      商家id
 * appid:appid                     小程序id
 * window:弹出名称                  当前页面弹窗名称
 * scene:场景值                     场景值
 * redPktPlan:红包策略              红包策略
 * extend:扩展字段                  不用管
 */
const host = 'https://yaofa.58.com';
function SendEventLog(params) {
    const uid = getUid();
    const { model, system, brand } = wx.getSystemInfoSync();
    const paramsJSON = Object.assign({}, {
        page: '',
        button: '',
        model: model,
        brand: brand,
        system: system,
        action: 'click',
        openid: '',
        consumerId: uid,
        userid: uid,
        appid: 'wxf03e52adc4b13448',
        window: '',
        scene: globalData.appScene,
        redPktPlan: '',
    }, params || {});

    if (uid) {
        const url = '/eventLog/write';
        wx.request({
            url: host + url + (~url.indexOf('?') ? '' : '?') + (+new Date()).toString(36).substr(3),
            data: paramsJSON,
            method: 'get',
            dataType: 'json',
            header: {
                'content-type': 'application/json',
            },
            success() {},
        });
    } else {
        console.error('SendEventLog 方法 uid参数为空，请求被拒绝');
    }
}
module.exports = {
    SendEventLog,
};
