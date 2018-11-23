import modulesParse from '../../utils/modulesParse';
import { globalData } from '../../utils/globalData';

const getPage = require('../../utils/getPage');
const {
    get,
} = require('../../utils/ajax');
const {
    picSrcDomain,
} = require('../../utils/index');

let pageDataUrl = '/business/template/loadall';
const pageListUrl = '/business/pageList/';
const loadTabbarUrl = '/business/getReleaseConfig/';
const parseCfgAndData = ({
    modules,
}) => modules.map(({
    id,
    name,
    cfg,
    data,
    params,
}) => {
    try {
    /* eslint-disable no-param-reassign */
        cfg = cfg ? JSON.parse(cfg) : {};
    } catch (error) {
        cfg = {};
    }

    const modData = data[name] || {};

    // data 修改
    if (name === 'information') {
        modData.logo = modData.logo ?
            picSrcDomain() + modData.logo :
            'https://pic2.58cdn.com.cn/bizmp/n_v285d6a16d725a446694db35df23c9db24.png';
        globalData.information = modData;
    }

    if (name === 'coupon') {
        if (modData.data && modData.length) {
            modData.data.forEach(coupon => {
                const reg = /([0-9]{4})-([0-1]{0,1}[0-9]{1})-([0-3]{0,1}[0-9]{1}).+/;
                const couponCondition = JSON.parse(coupon.couponCondition);
                if (coupon.validType === 1) {
                    Object.assign(coupon, {
                        ...couponCondition,
                        validStartDate: coupon.validStarttime.replace(reg, '$1.$2.$3'),
                        validEndDate: coupon.validEndtime.replace(reg, '$1.$2.$3'),
                    });
                } else {
                    Object.assign(coupon, {
                        ...couponCondition,
                    });
                }
            });
        } else {
            const coupon = {
                applyType: 2,
                collectType: '',
                couponCondition: '{"limitAmount":0,"reliefAmount":0}',
                couponType: 2,
                createTime: '2018-00-00 00:00:00',
                id: '',
                couponDiscard: 0,
                limitCount: 1,
                mpId: '1001014495864229888',
                remark: '',
                status: 0,
                subTitle: '满--可用',
                title: '请输入与使用条件 ',
                totalCount: 0,
                updateTime: null,
                userid: '48917864286479',
                validAfterDays: 0,
                validDays: 0,
                validEndtime: '2018-00-00 00:00:00',
                validStarttime: '2018-00-00 00:00:00',
                validType: 1,
            };
            modData.data = [];
            modData.data.push(coupon);
        }
    }
    if (name === 'order') {
        if (!cfg) {
            cfg.hasMore = false;
        }
    }
    if (name === 'images' || name === 'order') {
        cfg.theme = cfg.theme || '1';
    }

    if (name === 'services' || name === 'goods' || name === 'serviceOther') {
        if (modData.data && name !== 'goods') {
            modData.data.forEach(service => {
                service.img = picSrcDomain() + service.img;
            });
        }
        cfg.theme = cfg.theme || '1';
        cfg.themes = [{
            theme: '1',
            styleName: 'one',
            title: '大图',
        },
        {
            theme: '2',
            styleName: 'two',
            title: '中图',
        },
        {
            theme: '3',
            styleName: 'three',
            title: '小图',
        },
        {
            theme: '4',
            styleName: 'four',
            title: '横向滑动',
        },
        {
            theme: '5',
            styleName: 'five',
            title: '横向列表',
        },
        {
            theme: '6',
            styleName: 'six',
            title: '双图',
        },
        {
            theme: '7',
            styleName: 'seven',
            title: '1上2下显示',
        },
        ];
    }

    if (name === 'serviceDetail') {
        if (modData.descPics) {
            modData.descPics = modData.descPics.map(pic => picSrcDomain() + pic);
        }

        const strArr = modData.serviceInfo.split('\n');
        modData.htmlNodes = strArr.map(str => ({
            name: 'p',
            children: [{
                type: 'text',
                text: str,
            }],
        }));
    }

    // 定义模板数据
    const pd = {
        id,
        name,
        props: {
            ...modData,
            cfg,
        },
        params,
    };

    // props & cfg 修改
    // imageSwiper
    if (name === 'imageSwiper') {
        let images = null;
        if (!cfg.images) {
            images = modData.data;
        } else {
            ({
                images,
            } = cfg);
        }
        cfg.images = images.map(img => ({
            ...img,
            src: picSrcDomain() + img.src,
        }));
    }
    if (name === 'goods') {
        modData.data.forEach(img => {
            if (img.img.indexOf('?') > -1) {
                img.img = img.img.substr(0, img.img.indexOf('?'));
            }
        });
    }
    // images 模块图片路径
    if (name === 'images') {
    //  const { theme } = cfg;
    /* eslint no-param-reassign: "error" */
        cfg.images.forEach(img => {
            img.src = picSrcDomain() + img.src;
        });
    }

    // 文章模块图片路径
    if (name === 'article') {
        modData.data.forEach(article => {
            article.cover = picSrcDomain() + article.cover;
        });
    }

    // 文章模块图片路径
    if (name === 'order') {
        modData.data.forEach(order => {
            order.pics = picSrcDomain() + order.pics;
        });
    }
    console.log(name, pd);
    return pd;
});

module.exports = {
    async loadData(cb) {
        const page = getPage(this.route, this.options) || 'index';
        // const page = 'index';
        /* global getCurrentPages:true */
        const {
            route,
        } = getCurrentPages()[getCurrentPages().length - 1];
        const pageType = route.split('ptype=')[1] || this.options.ptype || '';
        const postData = {
            pageKey: page,
            releaseId: wx.getStorageSync('releaseId'),
            mpid: wx.getStorageSync('current_mpid'),
        };
        if (page === 'detail') {
            postData.serviceDetailId = this.options.id;
        }
        if (page === 'article') {
            pageDataUrl = `/businessArticle/get/${this.options.id}`;
        }
        if (page === 'custom' && pageType) {
            postData.pageKey = pageType;
        }
        console.log(globalData.extConfig);
        try {
            const response = await get(pageDataUrl, postData);
            const modulesData = JSON.parse(JSON.stringify(response.data));
            globalData.modules = modulesParse.show(modulesData);
            /* eslint-disable camelcase */
            let page_data = null;
            if (page === 'article') {
                page_data = response.data;
                /* eslint no-useless-escape: "error" */
                page_data.content.replace(/^\s?(http|https)?\\:\/\//, 'https://');
            } else {
                page_data = parseCfgAndData(response.data);
            }
            // 图片组件数据
            // this.imagesViewState(page_data);

            const newPageData = {
                pageType: page,
                pageKey: page,
                current: 0,
                page_data: page_data,
            };
            if (!pageType) {
                globalData.pageData = page_data;
            }
            this.setData(newPageData);
            cb && cb();
        } catch (e) {
            console.log(e);
        }
    },
    refreshPage() {
        this.setData({
            page_data: globalData.pageData,
        });
    },
    async loadTabbar() {
        const { data } = await get(`${loadTabbarUrl}/${wx.getStorageSync('releaseId')}`);
        globalData.tabBar = data.tabBar;
    },
    async loadPageList() {
        console.log(wx.getStorageSync('releaseId'));
        const { data } = await get(`${pageListUrl}/${wx.getStorageSync('releaseId')}`);
        globalData.pageList = data;
    },

    getAppTitle(callback) {
        get('/mpBusinessInfo/getTitle', (e, response) => {
            if (e || e === undefined) {
                callback && callback(e);
                return;
            }
            if (response) {
                wx.setNavigationBarTitle({
                    title: response,
                });
            }
            callback && callback(e, response);
        });
    },
};
