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

    const { unReadCount, currentContactId } = globalData.chat;
    globalData.chat.unReadCount = Number(unReadCount) + Number(newMsgList.length);
    if (globalData.chat.unReadCount > 0) {
        setTabBar(globalData.chat.unReadCount);
    }


    newMsgList.forEach((newMsg) => {
        pushMsg(newMsg);
        if (currentContactId && newMsg.getSession().id() == currentContactId) {
            console.log('&&&&&&&');
            pushMsg(newMsg);
        }
    });
    // 发布未读消息
    // for (let userId in obj) {
    //     pubsub.publish(userId, obj[userId], +new Date());
    // }
}
const pushMsg = (newMsg) => {
    let ele, content;
    console.log('pushMsg');
    const eles = newMsg.getElems();
    console.log(eles);
    for(let i in eles) {
        ele = eles[i];
        content = Object.prototype.toString.call(ele.getContent().data) ? JSON.parse(ele.getContent().data) : ele.getContent().data;
        const { contact } = content;
        console.log(content);
        // if (!currentContactId) {
        //     // 遍历
        //     caontactList.forEach((item) => {
        //         if (item.contact != contact) {
        //             // 新建联系人，unshift,更新联系人列表
        //         }
        //     });
        // }
        // 当前聊天人的未读，发布
        if (currentContactId && contact === currentContactId) {
            pubsub.publish(contact, content, +new Date());
        }
    }
};

