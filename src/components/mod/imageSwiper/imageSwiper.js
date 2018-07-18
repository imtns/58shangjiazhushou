/*eslint-disable */
const { previewImage } = require('../../../utils/index');

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
  }
};
