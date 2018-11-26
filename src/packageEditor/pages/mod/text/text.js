// 轮播组件函数、事件
module.exports = {
    changeIndicatorDots(e) {
        const { indicator } = e.currentTarget.dataset;
        this.setData({
            indicatorDots: !indicator,
        });
    },
    changeAutoplay() {
        this.setData({
            autoplay: !this.data.cfg.autoplay,
        });
    },
    intervalChange(e) {
        this.setData({
            interval: e.detail.value,
        });
    },
    durationChange(e) {
        this.setData({
            duration: e.detail.value,
        });
    },
};
