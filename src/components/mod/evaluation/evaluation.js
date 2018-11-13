/*eslint-disable */
const { previewImage } = require('../../../utils/index');

module.exports = {
    evaluationImgTap(e) {
        const { target, currentTarget } = e;
        const { modIndex, evaIdx } = currentTarget.dataset;
        const evaImgIdx = target.dataset.index;

        const { imgs } = this.data.page_data[modIndex].props.data[evaIdx];

        previewImage(imgs.map(img => (url.indexOf('https') > 0 ? '' : 'https:') + url), evaImgIdx);
    },
};

