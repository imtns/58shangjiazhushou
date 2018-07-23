import { previewImage } from '../../../utils/index';
import switchTab from '../../../utils/switchTab';

export default {
    onImageClick(e) {
        const {
            index, current, pagekey, action,
        } = e.currentTarget.dataset;
        if (action === 2) {
            switchTab(pagekey);
        } else if (action === 3) {
            const images = this.data.page_data[current].props.cfg.images.map(img => img.src);
            previewImage(images, index);
        } else if (typeof action === 'undefined' && pagekey) {
            // 老版中没有action字段
            // 兼容老版页面跳转
            switchTab(pagekey);
        } else if (typeof action === 'undefined' && !pagekey) {
            // 老版中没有action字段
            // 兼容老版点击放大
            const images = this.data.page_data[current].props.cfg.images.map(img => img.src);
            previewImage(images, index);
        }
    },
};
