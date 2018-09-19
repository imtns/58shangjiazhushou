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

export const sdkLogout = (success, error) => {
    webim.logout(() => {
        success && success();
    }, () => {
        error && error();
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
const pushMsg = async (newMsg) => {
    await chatContactList();

    let ele, content;
    const eles = newMsg.getElems();
    const {currentContactId = '', contactList } = globalData.chat;

    const temp = {};
    let contacts1 = [];
    let contacts2 = [];
    for(let i in eles) {
        ele = eles[i];
        content = Object.prototype.toString.call(ele.getContent().data) ? JSON.parse(ele.getContent().data) : ele.getContent().data;
        const { contactId, content: newContent, sendTime, contactNickName, contactPortrait, type  } = content;
        console.log(content, currentContactId, contactId);

        // 发布当前聊天人的未读，
        if (temp[contactId]) {
            if (temp[contactId].unReadCount !== 0) {
                temp[contactId].unReadCount += 1;
                temp[contactId].content = type == 1 ? '[图片]' : newContent;
                temp[contactId].sendTime = sendTime;
            }
        } else {
            // 如果最近联系人中没有此userId,新建添加至最近联系人
            temp[contactId] = {
                contactId,
                nickName: contactNickName,
                portrait,
                sendTime,
                content: type == 1 ? '[图片]' : newContent,
                unReadCount: 1,
            };
        }
        contacts1.push(temp[contactId]);

        pubsub.publish(contactId, content, +new Date());
    }

    contactList.forEach((item) => {
        if (temp[item.contactId]) {
            temp[item.contactId].unReadCount += item.unReadCount
        } else {
            contacts2.push(item);
        }
    });
    globalData.chat.contactList = contacts1.concat(contacts2);
};

