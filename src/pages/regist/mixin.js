import wepy from 'wepy';
import { get } from '../../utils/ajax';
import { REGIST_PRE_CHECK } from '../../utils/url';

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
                vip, currentAuditStatus, createMp, alreadyAuth,
            } = {},
        } = await get(REGIST_PRE_CHECK) || {};

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
        if ([(alreadyAuth && !createMp),
            (vip && createMp),
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
