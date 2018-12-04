// import { SendClickLog } from '../utils/maidian';

const { get } = require('../../utils/http');
const { picSrcDomain } = require('../../utils/index');

const modDataByPageUrl = '/business/template/loadone';
const PIC_FIELD = {
    article: 'cover', images: 'img', services: 'img', order: 'pics',
};


module.exports = {
    loadMore(e) {
        const { index } = e.target.dataset;
        /* eslint-disable camelcase */
        const { page_data } = this.data;
        const { id, name, props } = page_data[index];

        // 查看更多埋点
        // const app = getApp();
        // const { appid, userid } = app.globalData.extConfig;
        // SendClickLog(appid, userid, '{}', `jz_xcx_${name}_checkMore`);
        // 图片加载更多逻辑，将height置为auto
        if (name === 'images') {
            props.cfg.showMore = false;
            props.cfg.maxNum = props.cfg.images.length;
            this.setData({ page_data });
            return;
        }

        // TODO load数据concat在data后面
        const { dataset } = e.target;
        let postData = Object.assign({}, dataset, { bizmoduleid: id });
        if (dataset.type === 'order') {
            postData = Object.assign({}, {
                businessServicePage: dataset.servicePage,
                businessServiceSize: dataset.serviceSize,
            }, { bizmoduleid: id });
        } else {
            postData = Object.assign({}, dataset, { bizmoduleid: id });
        }


        get(modDataByPageUrl, postData, (err, res) => {
            const data = res[dataset.type];
            data.data && data.data.forEach(d => {
                d[PIC_FIELD[name]] = picSrcDomain() + d[PIC_FIELD[name]];
            });

            Object.assign(props, data, {
                data: props.data.concat(data.data),
            });

            page_data[index].props = props;

            this.setData({ page_data });
        });
    },
};
