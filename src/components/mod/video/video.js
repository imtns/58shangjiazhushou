
/*eslint-disable */
module.exports = {
    onPlayEnd(e) {
        if (e.target.id == this.data.curVideo) {
            this.setData({ curVideo: 0 });
        }
    },
    onPlayVideo(e) {
        const curVideo = wx.createVideoContext(e.target.id, this);
        if (this.data.curVideo && this.data.curVideo != e.target.id) {
            const preVideo = wx.createVideoContext(this.data.curVideo, this);
            preVideo.pause();
            this.setData({ curVideo: e.target.id });
        } else {
            this.setData({ curVideo: e.target.id });
        }
    },
};
