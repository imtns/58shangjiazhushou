module.exports = {
    detailShowTap(e) {
        const { index } = e.currentTarget.dataset;
        /* eslint-disable camelcase */
        const { page_data } = this.data;
        const tplData = page_data[index];

        // update detailShow
        tplData.props.cfg.detailShow = !tplData.props.cfg.detailShow;

        this.setData({ page_data });
    },
    onShareAppMessage() {

    },
};
