import wepy from 'wepy';
import { get } from '../../utils/ajax';
import { REGIST_PRE_CHECK } from '../../utils/url';
import { getPathName } from '../../utils';

export default class OrderMixin extends wepy.mixin {
    showModal(content, { confirmText } = {}) {
        this.modalShow = true;
        this.modalContent = content;
        this.modalConfirmText = confirmText;
        this.$apply();
    }

    // 检查用户的注册状态
    async checkRegistStatus() {
        const {
            data: {
                vip,
                currentAuditStatus,
                createMp,
                alreadyAuth,
                oldUser,
            } = {},
        } = await get(REGIST_PRE_CHECK) || {};

        // 老用户走原来的流程
        if (oldUser) {
            // 首页check的时候不然他跳转
            if (getPathName() === 'pages/home') {
                return { msg: '' };
            }
            // 如果老用户扫描销售二维码进入到注册页面，让他跳转回原来注册的老流程
            wepy.switchTab({ url: '/pages/home' });
            return { msg: '进入到注册老页面' };
        }

        // 已经授权过，并且已经创建了
        if (alreadyAuth && createMp) {
            return { msg: '' };
        }

        /**
         * 已购买、已创建
         * 已购买、未注册
         * 未购买、未注册
         * 这三个情况都留在当前页面
         */
        if ([(vip && createMp),
            (vip && currentAuditStatus === 0),
            (!vip && currentAuditStatus === 0)].some(v => v)) {
            this.registPrecheck = {
                vip,
                createMp,
                currentAuditStatus,
            };
            this.$apply();
            return { msg: '' };
        }

        if (currentAuditStatus === 1) {
            wx.redirectTo({
                url: '/pages/regist/guide',
            });
            return { msg: '注册资料提交成功' };
        }

        // 审核失败，跳转到 注册成功页 (regist/guide)
        if (currentAuditStatus === -1) {
            wx.redirectTo({
                url: '/pages/regist/guide',
            });
            return { msg: '资料审核失败' };
        }

        // 资料审核通过，但是没购买小程序
        if (!vip && currentAuditStatus === 2 && !createMp) {
            wx.redirectTo({
                url: '/pages/regist/notice',
            });
            return { msg: '去购买' };
        }

        // 资料审核通过，已购买小程序
        if (vip && currentAuditStatus === 2 && !createMp) {
            wx.redirectTo({
                url: '/pages/regist/notice',
            });
            return { msg: '去创建' };
        }

        return { msg: '' };
    }
}
