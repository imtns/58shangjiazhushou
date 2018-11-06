import { get } from './ajax';
import { GET_ASSIST_AUTH, LOAD_ASSIST_AUTH_LIST } from './url';
import { picSrcDomain } from './index';

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
    const { assistInfo = {} } = res;
    const { wechatOpenId, wechatUnionId } = assistInfo;
    store.openId = wechatOpenId;
    store.unionId = wechatUnionId;
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
