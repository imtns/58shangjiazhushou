import wepy from 'wepy';
import { get } from './ajax';
import {
    GET_ASSIST_AUTH,
    LOAD_ASSIST_AUTH_LIST,
    REGIST_PRE_CHECK,
} from './url';
import { picSrcDomain, toast } from './index';

const store = {
    openId: '',
    unionId: '',
};

/**
 * @desc 根据openId，获取对应微信号登录过的58账号
 */
export const getAssistAuthList = async (openId) => {
    const { data } = await get(LOAD_ASSIST_AUTH_LIST, {
        openId,
    });
    return data.map(v => {
        v.portrait = picSrcDomain() + v.portrait;
        return v;
    });
};

/**
 * @desc 获取用户是否关注、userinfo、unionId、openId等信息
 * 传入iv, encryptedData可以获取到对应的openId，
 * 以往openId是根据userId获取的
 */
export const getAssistAuth = async ({ iv = '', encryptedData = '' } = {}) => {
    const { data: res } = await get(GET_ASSIST_AUTH, {
        iv,
        encryptedData,
    });
    const { assistInfo } = res;
    if (assistInfo) {
        const { wechatOpenId, wechatUnionId } = assistInfo;
        store.openId = wechatOpenId;
        store.unionId = wechatUnionId;
    }
    return res;
};

/**
 * @desc 获取openId，可缓存
 */
export const getOpenId = async () => {
    if (store.openId) {
        return store.openId;
    }

    const res = await getAssistAuth();
    const { assistInfo = {} } = res;
    const { wechatOpenId } = assistInfo;
    return wechatOpenId;
};

/**
 * @desc 获取unionId，可缓存
 */
export const getUnionId = async () => {
    if (store.unionId) {
        return store.unionId;
    }

    const res = await getAssistAuth();
    const { assistInfo = {} } = res;
    const { wechatUnionId } = assistInfo;
    return wechatUnionId;
};

/**
 * 封装400电话
 *
 * @param {Object event} e 事件对象
 */
export const makeTelCall = async (e) => {
    const { mobile } = e.currentTarget.dataset;
    const cardid = wepy.getStorageSync('current_cardId');
    const sendData = { mobile, cardid };
    const { data, msg, state } = await get('/other/encrypt/phone', sendData);
    if (state !== 100) {
        toast(msg);
        return;
    }
    wepy.makePhoneCall({ phoneNumber: data });
};

export const getRegistPreCheck = async () => get(REGIST_PRE_CHECK);
// export const getRegistPreCheck = () => ({
//     headImg: 'sdfsd',
//     cate1Name: 'sdfsdf',
//     cate2Name: 'sdfds',
//     nickName: '',
//     signature: '',
// });
