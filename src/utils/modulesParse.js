import { picSrcDomain } from './index';

export const moduleDataParse = (name, modData = { data: [] }) => {
    if (~['services', 'serviceOther'].indexOf(name)) {
        if (modData.data && modData.data.length > 0) {
            modData.data.forEach((service) => {
                service.img = picSrcDomain() + service.img;
            });
        } else {
            modData = Object.assign({}, {
                page: 0,
                size: 0,
                total: 0,
                data: [],
            }, modData);
        }
    }

    if (name === 'coupon') {
        if (!modData.data) {
            modData.data = [];
        } else {
            for (let i = 0; i < modData.data.length; i += 1) {
                const couponCondition = JSON.parse(modData.data[i].couponCondition);
                Object.keys(couponCondition).forEach((key) => {
                    modData.data[i][key] = couponCondition[key];
                });
            }
        }
    }

    if (name === 'article') {
        if (modData.data.length > 0) {
            modData.data.forEach((art) => {
                art.cover = picSrcDomain() + art.cover;
            });
        }
    }

    if (name === 'order') {
        if (modData.data.length > 0) {
            modData.data.forEach((order) => {
                order.pics = picSrcDomain() + order.pics;
            });
        }
    }
    if (typeof (modData.data) === 'undefined' || modData.data === null) {
        Object.assign(modData, { data: [] });
    }
    return modData;
};


export const moduleCfgParse = (name, cfgObj) => {
    const cfg = typeof cfgObj === 'string' ? JSON.parse(cfgObj) : cfgObj;

    if (~['images', 'imageSwiper', 'banner'].indexOf(name)) {
        cfg.images = cfg.images ? cfg.images : [];
        if (cfg.images.length > 0) {
            cfg.images = cfg.images.filter((img) => {
                img.fullPath = picSrcDomain() + img.src;
                return img.src;
            });
        }
        if (cfg.images.length === 0) {
            cfg.images.push({
                fullPath: '//pic8.58cdn.com.cn/bizmp/n_v285d6a16d725a446694db35df23c9db24.png',
            });
        }
    }
    if (name === 'images') {
        const imagesTheme = [
            { theme: '1', showSize: '2', title: '一行1张显示' },
            { theme: '2', showSize: '4', title: '一行2张显示' },
            { theme: '3', showSize: '6', title: '一行3张显示' },
            { theme: '4', showSize: '3', title: '1左2右显示' },
            { theme: '5', showSize: '3', title: '1上2下显示' },
            { theme: '6', showSize: '4', title: '1上3下显示' },
            { theme: '7', showSize: '4', title: '一行4张显示' },
            { theme: '8', showSize: '2', title: '双图' },
        ];
        cfg.theme = cfg.theme ? cfg.theme.toString() : '1';
        cfg.showSize = imagesTheme[cfg.theme - 1].showSize || 4;
    }

    return cfg;
};

// const emptyFilter = (mods) => {
//     const modM = mods.filter((mod) => {
//         let isEmpty = false;
//         switch (mod.name) {
//             case 'video':
//                 if (!mod.data.length) {
//                     isEmpty = true;
//                 }
//                 break;
//             case 'services':
//                 if (!mod.data.data.length) {
//                     isEmpty = true;
//                 }
//                 break;
//             default:
//                 break;
//         }
//         return !isEmpty;
//     });
//     return modM;
// };

export default {
    parsePageData(pageData) {
        const mods = pageData.map((mod) => {
            let cfgTemp = {};
            let paramsTemp = {};
            try {
                cfgTemp = mod.props.cfg || {};
                paramsTemp = mod.params ? JSON.parse(mod.params) : {};
            } catch (e) {
                console.log('json error\n', mod.props.cfg, 'params error\n', mod.params);
            }
            mod.cfg = cfgTemp;
            mod.params = paramsTemp;

            const { name, cfg, cfg: { title } } = mod;

            cfg.title = title || name;

            // data 修改
            // const modData = mod.props.data[name] || {};
            // mod.data = moduleDataParse(name, modData);

            // cfg 修改
            // 特定配置处理
            // images 模块的url处理
            moduleCfgParse(name, cfg);

            return mod;
        });
        return mods;
    },
    show(pageData) {
        const { modules } = pageData;
        if (!modules) return [];
        const mods = modules.map((mod) => {
            let cfgTemp = {};
            let paramsTemp = {};
            try {
                cfgTemp = mod.cfg ? JSON.parse(mod.cfg) : {};
                paramsTemp = mod.params ? JSON.parse(mod.params) : {};
            } catch (e) {
                console.log('json error\n', mod.cfg, 'params error\n', mod.params);
            }
            mod.cfg = cfgTemp;
            mod.params = paramsTemp;

            const { name, cfg, cfg: { title } } = mod;

            cfg.title = title || name;

            // data 修改
            const modData = mod.data[name] || {};
            mod.data = moduleDataParse(name, modData);

            // cfg 修改
            // 特定配置处理
            // images 模块的url处理
            moduleCfgParse(name, cfg);

            return mod;
        });
        // m版本优享小程序 数据为空的时候特殊处理不显示
        // if (globalData.mVerison) {
        //     const modsM = emptyFilter(mods);
        //     return modsM;
        // }
        return mods;
    },
    save(modData) {
        const mods = modData.map((mod) => {
            const { name, cfg } = mod;
            if (~['images', 'imageSwiper', 'banner'].indexOf(name)) {
                cfg.images = cfg.images || [];
                cfg.images = cfg.images.filter(img => img.src).map((img) => {
                    delete img.fullPath;
                    return img;
                });
            }
            return mod;
        });

        return mods;
    },
};

