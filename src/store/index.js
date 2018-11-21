import wepy from 'wepy';
import { CHAT_CONTACT_LIST } from '../utils/url';
import { formatDateTimeLocal } from '../utils/dateFomate';
import { post } from '../utils/ajax';
import { globalData } from '../utils/globalData';


export const chatContactList = async () => {
    const { token } = globalData.chat;
    if (!token) return;
    const { data } = await post(CHAT_CONTACT_LIST, {
        token,
    });
    let _contactList = data.map((item) => {
        const {
            unReadCount,
            recentMsgs,
            id,
            portrait = 'https://img.58cdn.com.cn/lbg/shangjiaxcxht/zhushou/zhushou-default-avatar.png',
            nickName = '',
        } = item;
        const lastMsg = recentMsgs && recentMsgs.length > 0 ? recentMsgs[recentMsgs.length - 1] : {};
        const {
            content: lastContent = '',
            type: lastType = '',
            sendTime: lastSendTime = ''
        } = lastMsg;
        // 未读消息数特殊处理：超过两位数显示...
        const _unReadCountMsg = `${unReadCount>=100?'...':''}${unReadCount>0&&unReadCount<100?unReadCount:''}`;
        const _item = {
            contactId: id || '', // 联系人Id
            portrait: `${portrait.indexOf('http') === -1?'https://pic1.58cdn.com.cn':''}${portrait}`, // 联系人头像
            nickName: nickName || '', // 联系人昵称
            unReadCount: _unReadCountMsg, // 未读消息数，超过两位数显示...
            sendTime: formatDateTimeLocal(lastSendTime), // 最后发送时间，格式化: 当天只展示时分，非当天且在当年 显示月天，非当年 显示年月日；
            content: lastType == 1 ? '[图片]' : lastContent, // 最后发送内容 ,type =0 文本 type=1图片
        }
        return _item;
    });
    globalData.chat.contactList = _contactList;
};