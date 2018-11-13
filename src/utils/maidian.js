const version = '1.0.0';
import { globalData } from './globalData';
/**
 * sendTrackLog 流量track日志发送接口
 * @param
 * appid 当前小程序id
 * uid 用户身份id 【必须传递】例如：openid、thirdKey等，能够保证小程序内用户唯一身份识别
 * _trackURL 页面基本属性变量，支持扩展，例如："{'cate':'1,12','area':'1','pagetype':'special','page':'huodong','qudao':'weixin','自定义key':'自定义val'}"。
 * 内部字段如果影响url解析，请先编码
 *
 * @Tips
 * 统计的参数应该使用字母数字下划线组合，不要出现中文
 * 如果字段key或者value的值包含'&'、'='、'?'等影响url解析的字符，或者必须使用中文的情况，请先用encodeURIComponent()编码后，传入统计接口
 *
 * @example

 */
function SendTrackLog(currentPage) {
    console.log(currentPage);
    const appType = 2; // appType:1:优选壳子 2小程序
    // mpType:小程序类型(1优享 2企业)
    const { appScene, mpType } = globalData;
    const mpId = wx.getStorageSync('current_mpid');
    const cardId = wx.getStorageSync('current_cardId') || '';
    const uid = getUid();
    const paramJson = {
        pagePath: currentPage,
        appBaseSign: 'LBG_BIZMP_XZS',
        appScene,
        appType,
        userId: uid,
        mpId,
        cardId,
        mpType, // mpType:小程序类型(1优享 2企业)
        conKey: uid,
    };
    if (uid) {
        const url = `https://tracklog.58.com/wx/track/empty.js.gif?wxid=${mpId || ''}&uid=${uid}&trackURL=${JSON.stringify(paramJson) || ''}&v=${version}&rand_id=${Math.random()}`;
        wx.request({
            url: url,
            success() {},
        });
    } else {
        console.error('sendTrackLog 方法 uid参数为空，请求被拒绝');
    }
}
/**
 * sendClickLog 点击click日志发送接口
 * @param
 * appid 小程序id
 * uid 用户身份id 【必须传递】例如：openid、thirdKey等，能够保证小程序内用户唯一身份识别
 * _trackURL 页面基本属性变量，支持扩展，例如："{'cate':'1,12','area':'1','pagetype':'special','page':'huodong','qudao':'weixin','自定义key':'自定义val'}"
 * 内部字段如果影响url解析，请先编码
 * clickTag 点击标记，请确保点击标记唯一性。可支持扩展，字段如果影响url解析，请先编码
 *
 * @Tips：
 * 统计的参数应该使用字母数字下划线组合，不要出现中文
 * 如果字段key或者value的值包含'&'、'='、'?'等影响url解析的字符，或者必须使用中文的情况，请先用encodeURIComponent()编码后，传入统计接口
 *
 * @example
 * referrer.sendClickLog('1234','abcd', "{'cate':'1,12','area':'1','pagetype':'special','page':'huodong','qudao':'weixin','自定义key':'自定义val'}", "tz_huodong_fx");
 * referrer.sendClickLog('1234','abcd', "{'cate':'1,12','area':'1','pagetype':'special','page':'huodong','qudao':'weixin','自定义key':'自定义val'}", "tz_huodong_fx&infoid=8976");
 */
function SendClickLog(appid, uid, _trackURL, clickTag) {
    const appType = 2; // appType:1:优选壳子 2小程序
    // mpType:小程序类型(1优享 2企业)
    const { appScene, mpType } = globalData;
    const mpId = wx.getStorageSync('current_mpid');
    const cardId = wx.getStorageSync('current_cardId') || '';
    const paramJson = {
        appBaseSign: 'LBG_BIZMP_XZS',
        appScene,
        appType,
        userId: uid,
        mpId,
        cardId,
        mpType, // mpType:小程序类型(1优享 2企业)
        conKey: uid,
    };
    if (uid) {
        const url = `https://tracklog.58.com/wx/click/empty.js.gif?wxid=${mpId || ''}&uid=${uid}&from=${clickTag || 'default'}&trackURL=${JSON.stringify(paramJson) || ''}&v=${version}&rand_id=${Math.random()}`;
        wx.request({
            url: url,
            success() {},
        });
    } else {
        console.error('SendClickLog 方法 uid参数为空，请求被拒绝');
    }
}

function getUid() { // 商家助手截取ppu作为唯一标识
    try {
        const uid = wx.getStorageSync('ppu').split('UID=')[1].split('&')[0];
        return uid;
    } catch (e) {
        return '';
    }
}

module.exports = {
    SendTrackLog,
    SendClickLog,
    getUid,
};
