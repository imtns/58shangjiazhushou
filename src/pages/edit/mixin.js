import wepy from 'wepy';

const app = require('../../utils/globalData');


export default class Mixin extends wepy.mixin {
    data = {
        pageData: {},
    }
    onLoad(options) {
        console.log(options);
        const { id } = options;
        const result = app.globalData.pageData.filter(obj => obj.id === id);
        this.pageData = result[0].props.cfg;
        console.log(result);
    }
}
