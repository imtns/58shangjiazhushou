// mixins/test.js
import wepy from 'wepy';
import { alertP } from '../utils';
import { get } from '../utils/ajax';

const buySrc = 'https://ordermobile.58.com/ordermobile/app/product/buyMiniApp?fromProductItemCode=871817130073200000&productItemCode=861110090334300017,852215312393800001&source=up_mini_app&os=ios';
const upgradeSrc = 'https://ordermobile.58.com/ordermobile/app/product/buyUpEnterpriseMiniApp?';

export default class Mixin extends wepy.mixin {
    async buyMiniProgram(mpId) {
        try {
            console.log(mpId);
            let targetUrl = buySrc;
            const { platform } = wx.getSystemInfoSync();
            if (~['PC', 'ios', 'android'].indexOf(platform)) {
                this.platform = platform;
            } else {
                this.platform = '';
            }

            if (mpId) {
                // 升级
                const { data = {} } = await get(`/order/getParam/${mpId}`);
                const {
                    cityId, cateId, oldOrderId, userId, platform,
                } = data;
                targetUrl = `${upgradeSrc}productItemCode=861110090334300017&cityId=${cityId}&cateId=${cateId}&newSign=1&oldOrderId=${oldOrderId}&userId=${userId}&source=up_mini_app&os=${platform}#wechat_redirect`;
            }

            const { confirm } = await alertP('购买地址已复制到粘贴板，请您打开浏览器粘贴后进行操作', '提示');
            if (confirm) {
                wepy.setClipboardData({ data: targetUrl });
            }
        } catch (e) {
            console.log(e);
        }
    }
}
