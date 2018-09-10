const webim = require('../../utils/IM/webim_wx.js');
const { pubsub } = require('../../utils/IM/pubsub');
import { globalData, setTabBar } from '../../utils/globalData';

import { get } from '../../utils/ajax';
import { CHAT_LOGIN } from '../../utils/url';

export const sdkLogin = (userInfo, listeners, options, callBack) => {
    webim.login(userInfo, listeners, options, (resp) => {
        //identifierNick为登录用户昵称(没有设置时，为帐号)，无登录态时为空
        // console.debug(identifierNick);
        webim.Log.info('webim登录成功');
        callBack && callBack();
    }, (err) => {
        console.error(err.ErrorInfo);
    });
};

// 监听实时消息
export const onMsgNotify = (newMsgList) => {
    console.error('list', newMsgList[0]);
    // let session,newMsg;
    // const sessMap = webim.MsgStore.sessMap();
    // console.log()

    const { unReadCount, currentContactId } = globalData.chat;
    globalData.chat.unReadCount = Number(unReadCount) + Number(newMsgList.length);
    if (globalData.chat.unReadCount > 0) {
        setTabBar(globalData.chat.unReadCount);
    }
    console.log();
    // let obj = {};
    newMsgList.forEach((newMsg) => {
        // if (!obj[msg.userId]) {
        //     obj[msg.userId] = [];
        // }
        if (newMsg.getSession().id() == currentContactId) {
            console.log('&&&&&&&');
            pushMsg(newMsg);
        }
    });
    // for (let j in obj) {
    //     newMsgList.forEach((msg) => {
    //         if (Number(j) === msg.userId) {
    //             obj[j].push(msg);
    //         }
    //     });
    // }
    // 发布未读消息
    // for (let userId in obj) {
    //     pubsub.publish(userId, obj[userId], +new Date());
    // }
}
const pushMsg = (newMsg) => {
    console.log('pushMsg');
};

