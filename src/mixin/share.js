module.exports = {
    onShareAppMessage(res) {
        if (res.from === 'button') {
            console.log(res.target);
        }

        const { title, path } = res.target.dataset;

        return {
            title,
            path,
            success() {
                // 转发成功
            },
            fail() {
                // 转发失败
            },
        };
    },
};

