/*eslint-disable */
import { previewImage } from '../../../utils/index';
import { getRoute, navigateTo } from '../../../utils/getRoute';
import getPage from '../../../utils/getPage';

const ENUM_THEME = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'];
const CLIP_SIZE = [
    '?w=690&h=690',
    '?w=690&h=510',
    '?w=336&h=252',
    '?w=220&h=164',
    [['?w=363&h=482', '?w=309&h=231', '?w=309&h=231'], ['?w=388&h=514', '?w=284&h=214', '?w=284&h=214']],
    ['?w=690&h=388', '?w=336&h=252', '?w=336&h=252'],
    ['?w=690&h=388', '?w=218&h=164', '?w=218&h=164'],
    ['?w=160&h=160'],
    ['?w=336&h=448'],
];

export default {
    imagesViewState(modules = []) {
        for (let i = 0, len = modules.length; i < len; i++) {
            const { name } = modules[i];
            if (name === 'images') {
                const setting = modules[i].props.cfg;
                if (setting.theme === undefined) setting.theme = '2';
                this.imagesConfState(setting);
                this.imageState(setting);
            }
        }
    },
    imagesConfState(setting) {
        const { theme, hasMore = true, images } = setting;
        const viewState = {
            styleName: '',
            maxNum: 0,
            showMore: !0,
        };
        switch (theme) {
            case '1':
            case '2':
            case '3':
                viewState.styleName = ENUM_THEME[theme];
                viewState.showMore = hasMore && images.length > theme * 2;
                viewState.maxNum = viewState.showMore ? theme * 2 : images.length;
                break;
            /* 1左2右 */
            case '4':
                // 转主题小标到样式名称
                viewState.styleName = images[0].title ? `${ENUM_THEME[theme]}plus` : ENUM_THEME[theme];
                viewState.showMore = hasMore && images.length > 3;
                viewState.maxNum = viewState.showMore ? 3 : images.length;
                break;
            /* 1上2下 */
            case '5':
                viewState.styleName = ENUM_THEME[theme];
                viewState.showMore = hasMore && images.length > 3;
                viewState.maxNum = viewState.showMore ? 3 : images.length;
                break;
            /* 1上3下 */
            case '6':
                viewState.styleName = ENUM_THEME[theme];
                viewState.showMore = hasMore && images.length > 4;
                viewState.maxNum = viewState.showMore ? 4 : images.length;
                break;
            /* 1行4张 */
            case '7':
                viewState.styleName = ENUM_THEME[theme];
                viewState.showMore = hasMore && images.length > 4;
                viewState.maxNum = viewState.showMore ? 4 : images.length;
                break;
            /* 双图 */
            case '8':
                viewState.styleName = ENUM_THEME[theme];
                viewState.showMore = hasMore && images.length > 2;
                viewState.maxNum = viewState.showMore ? 2 : images.length;
                break;
        }
        Object.assign(setting, viewState);
    },
    imageState({ images, theme, styleName }) {
        for (let i = 0, len = images.length; i < len; i++) {
            const viewState = {
                src: images[i].src,
                itemClass: '',
                itemIndex: 0,
            };
            let index = ~i % 3 === 0 ? 3 : -(~i % 3);
            switch (theme) {
                case '1':
                case '2':
                case '3':
                    viewState.src += CLIP_SIZE[theme];
                    viewState.itemClass = ~i % theme === 0 ? `mod-li-box-${theme} mod-li-box-last` : `mod-li-box-${theme}`;
                    break;
                /* 1左2右 */
                case '4':
                    viewState.src += CLIP_SIZE[4][styleName.indexOf('plus') > -1 ? 1 : 0][index - 1];
                    viewState.itemIndex = index;
                    viewState.itemClass = index > 1 ? `mod-li-box-${styleName}-${index} mod-li-box-last` : `mod-li-box-${styleName}-${index}`;
                    break;
                /* 1上2下 */
                case '5':
                    viewState.itemIndex = index;
                    viewState.src += CLIP_SIZE[theme][index - 1];
                    viewState.itemClass = index > 2 ? `mod-li-box-${styleName}-${index} mod-li-box-last` : `mod-li-box-${styleName}-${index}`;
                    break;
                /* 1上3下 */
                case '6':
                    index = ~i % 4 === 0 ? 4 : -(~i % 4);
                    viewState.src += CLIP_SIZE[theme][index - 1];
                    viewState.itemIndex = index;
                    viewState.itemClass = index > 3 ? `mod-li-box-${styleName}-${index} mod-li-box-last` : `mod-li-box-${styleName}-${index}`;
                    break;
                /* 1行4张 */
                case '7':
                    viewState.src += CLIP_SIZE[theme];
                    viewState.itemClass = ~i % 4 === 0 ? `mod-li-box-${theme} mod-li-box-last` : `mod-li-box-${theme}`;
                    break;
                /* 双图 */
                case '8':
                    viewState.src += CLIP_SIZE[theme];
                    viewState.itemClass = ~i % 2 === 0 ? `mod-li-box-${theme} mod-li-box-last` : `mod-li-box-${theme}`;
                    break;
            }
            Object.assign(images[i], viewState);
        }
    },
    onImageClick(e) {
        const { index, current, pagekey } = e.currentTarget.dataset;

        if (pagekey && pagekey !== '') {
            const route = getRoute(pagekey);
            const _pagekey = getPage(this.route);
            if (_pagekey === pagekey) return;
            navigateTo(route);
        } else {
            const images = this.data.page_data[current].props.cfg.images.map((img) => img.src);
            previewImage(images, index);
        }
    },
};
