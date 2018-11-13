/*eslint-disable */
const { previewImage } = require('../../../utils/index');
import switchTab from '../../../utils/switchTab';
module.exports = {
  imageSwiperChange(e) {
    const { index } = e.currentTarget.dataset;
    const { current } = e.detail;

    const { page_data } = this.data;
    const tplData = page_data[index];

    // update title desc & current
    const { title, desc } = tplData.props.cfg.images[current || 0];
    const newProps = { current };
    if (title) newProps.title = title;
    if (desc) newProps.desc = desc;

    Object.assign(tplData.props, newProps);
    this.setData({ page_data })
  },
  onBannerClick(e) {
    const {
        index, current, pagekey, action,images
    } = e.currentTarget.dataset;
    if (action === '2') {
        switchTab(pagekey);
    } else if (action === '3') {
        previewImage(images, current);
    } else if (typeof action === 'undefined' && pagekey) {
        // 老版中没有action字段
        // 兼容老版页面跳转
        switchTab(pagekey);
    } else if (typeof action === 'undefined' && !pagekey) {
        // 老版中没有action字段
        // 兼容老版点击放大
        previewImage(images, current);
    }
},
};
