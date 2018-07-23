import wepy from 'wepy';
// import modulesParse from '../../utils/modulesParse';
// import { toast } from '../../utils';

const app = require('../../utils/globalData');
// const { post } = require('../../utils/ajax');

export default class Mixin extends wepy.mixin {
    data = {
        pageData: {},
        pageList: {},
        selectorIndex: -1,
        pageId: '',
        pageIndex: 0,
        saveAvaliable: false,
        extConfig: {},
        modules: {},
        tempModules: {},
    }
    onLoad(options) {
        console.log(options);
        this.saveAvaliable = false;
        this.pageId = options.id;
        const result = app.globalData.pageData.filter(obj => obj.id === this.pageId);
        this.pageIndex = app.globalData.pageData.findIndex(obj => obj.id === this.pageId);
        // this.pageData = Object.assign({}, this.pageData, {
        //     cfg: result[0].props.cfg, data: result[0].props.data, pageNum: result[0].props.pageNum, pageSize: result[0].props.pageNum, total: result[0].props.total,
        // });
        this.pageData = JSON.parse(JSON.stringify(result));
        if (result[0].name === 'article') {
            this.pageData = Object.assign({}, this.pageData, { params: result[0].params });
        }
        this.modules = app.globalData.modules;
        this.tempModules = JSON.parse(JSON.stringify(this.modules));
        this.extConfig = app.globalData.extConfig;
        this.pageList = app.globalData.pageList.map((item, index) => ({
            id: index,
            key: item.pageKey,
            name: item.pageName,
        }));
        console.log(result);
    }
    methods = {
        // async save() {
        //     const pageId = app.globalData.pageList.filter(obj => obj.pageKey === 'index')[0].id;
        //     let modData = this.modules.map(({
        //         id, name, cfg, params,
        //     }) => {
        //         if (Array.isArray(params)) params = {};
        //         return {
        //             id, name, cfg, params, page_id: pageId,
        //         };
        //     });
        //     modData = JSON.parse(JSON.stringify(modData));
        //     const emptymodData = [];
        //     modData.forEach((item) => {
        //         if (item.name === 'coupon' && item.params && !item.params.couponIds) {
        //             toast('请补全组件中的优惠券。');
        //             emptymodData.push(item);
        //         }
        //     });
        //     if (emptymodData.length && emptymodData.length > 0) {
        //         return;
        //     }
        //     await post('/business/templete/savemodules', {
        //         businessPageId: this.pageId,
        //         modulesJson: JSON.stringify(modulesParse.save(modData)),
        //         releaseId: app.globalData.extConfig.extJson.ext.releaseId,
        //         mpId: app.globalData.extConfig.extJson.ext.mpId,
        //     });
        //     // wx.navigateBack({
        //     //     delta: 1,
        //     // });
        // },
    }
}
