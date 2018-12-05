// import { previewImage } from '../utils/index.js';
import { getRoute, navigateTo } from '../utils/getRoute';

// 跳转页面
module.exports = {
    onNavigationTo(e) {
        const { pagekey } = e.currentTarget.dataset;
        console.log(pagekey);
        if (!pagekey) return;
        const route = getRoute(pagekey);
        navigateTo(route);
    },
};
