const webim = require('../../utils/IM/webim_wx.js');
const { pubsub } = require('../../utils/IM/pubsub');
import { globalData, setTabBar } from '../../utils/globalData';

import { get } from '../../utils/ajax';
import { CHAT_LOGIN } from '../../utils/url';
import { chatContactList } from '../../store/index';

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

    const { unReadCount, currentContactId = '' } = globalData.chat;
    globalData.chat.unReadCount = Number(unReadCount) + Number(newMsgList.length);
    if (globalData.chat.unReadCount > 0) {
        setTabBar(globalData.chat.unReadCount);
    }


    newMsgList.forEach((newMsg) => {
        pushMsg(newMsg);
    });
}
const pushMsg = (newMsg) => {
    chatContactList();
    let ele, content;
    const eles = newMsg.getElems();
    const {currentContactId = '', contactList } = globalData.chat;

    const temp = {};
    const contacts1 = [];
    for(let i in eles) {
        ele = eles[i];
        content = Object.prototype.toString.call(ele.getContent().data) ? JSON.parse(ele.getContent().data) : ele.getContent().data;
        const { contactId } = content;
        console.log(content, currentContactId, contactId);

        // 发布当前聊天人的未读，

        pubsub.publish(contactId, content, +new Date());
    }
};

