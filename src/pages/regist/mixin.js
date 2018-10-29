import wepy from 'wepy';

export default class OrderMixin extends wepy.mixin {
    showModal(content, { confirmText } = {}) {
        this.modalShow = true;
        this.modalContent = content;
        this.modalConfirmText = confirmText;
        this.$apply();
    }
}
