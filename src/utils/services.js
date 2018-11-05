import { get } from '../utils/ajax';
import { GET_ASSIST_AUTH } from '../utils/url';

let openId = '';
let unionId = '';

export const getAssistAuth = async () => {
    const res = get(GET_ASSIST_AUTH);
    const { assistInfo = {} } = res;
    const { wechatOpenId, wechatUnionId } = assistInfo;
    openId = wechatOpenId;
    unionId = wechatUnionId;
    return res;
};

export const getOpenId = async () => {
    if (openId) {
        return openId;
    }

    const res = await getAssistAuth();
    const { assistInfo = {} } = res;
    const { wechatOpenId } = assistInfo;
    return wechatOpenId;
};

export const getUnionId = async () => {
    if (unionId) {
        return unionId;
    }

    const res = await getAssistAuth();
    const { assistInfo = {} } = res;
    const { wechatUnionId } = assistInfo;
    return wechatUnionId;
};
