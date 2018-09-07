const webim = require('../../utils/IM/webim_wx.js');
const { pubsub } = require('../../utils/pubsub');

import { get } from '../../utils/ajax';
import { CHAT_LOGIN } from '../../utils/url';

export const IMlogin = (cb) => {
    const { data } = get(CHAT_LOGIN, {
        channel: 1, // channel 身份 1是名片 2是用户
        userId: cardId, // userId 该身份对应的识别id，商家传cardId(名片Id)
    });
    console.log('*****', data);
    cb && cb();
}

export const sdkLogin = (userInfo, listeners, options, callBack) => {
    webim.login(userInfo, listeners, options, (resp) => {
        //identifierNick为登录用户昵称(没有设置时，为帐号)，无登录态时为空
        console.debug(identifierNick);
        webim.Log.info('webim登录成功');
        callBack && callBack();
    }, (err) => {
        console.error(err.ErrorInfo);
    });
};

// 监听实时消息
export const onMsgNotify = (newMsgList) => {
    let obj = {};
    newMsgList.forEach((msg) => {
        if (!obj[msg.userId]) {
            obj[msg.userId] = [];
        }
    });
    for (let j in obj) {
        newMsgList.forEach((msg) => {
            if (Number(j) === msg.userId) {
                obj[j].push(msg);
            }
        });
    }
    // 发布未读消息
    for (let userId in obj) {
        pubsub.publish(userId, obj[userId], +new Date());
    }
}