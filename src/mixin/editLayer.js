
import modulesParse from '../utils/modulesParse';
import { toast } from '../utils';
import { globalData } from '../utils/globalData';
import { getUid, SendClickLog } from '../utils/maidian';

const { post } = require('../utils/ajax');

module.exports = {
    showEdit(e) {
        const { name, title } = e.currentTarget.dataset;
        if (title === 'evaluation' || title === 'information' || title === 'pay' || title === 'branch' || title === 'services') {
            this.setData({
                noEdit: true,
            });
        } else {
            this.setData({
                noEdit: false,
            });
        }
        if (!this.data.isEditing || this.data.editLayer[name]) return;
        this.setData({
            editLayer: {},
        });

        this.setData({
            [`editLayer.${name}`]: !this.data.editLayer[name],
        });
    },
    async cancelClick() {
        SendClickLog('wxf03e52adc4b13448', getUid(), '{}', 'sjzh_editLayer_verifyApp');
        if (!this.data.isEditing) {
            try {
                if (wx.getStorageSync('verify')) {
                    toast('有模板正在审核,不可发布');
                    return;
                }
                await post('/business/templete/releasemp', {
                    id: wx.getStorageSync('releaseId'),
                    mpId: wx.getStorageSync('current_mpid'),
                });
                toast('发布成功');
            } catch (e) {
                toast('发布失败');
            }
            return;
        }
        this.setData({
            editLayer: {},
            layer: false,
            isEditing: false,
        });
    },
    editClick() {
        SendClickLog('wxf03e52adc4b13448', getUid(), '{}', 'sjzh_editLayer_editApp');
        this.setData({
            isEditing: !this.data.isEditing,
        });

        if (this.data.isEditing) {
            console.log('编辑');
            console.log(this.data.page_data);
            const { name, id } = this.data.page_data[0];
            if (name === 'evaluation' || name === 'information' || name === 'pay' || name === 'branch' || name === 'services') {
                this.setData({
                    noEdit: true,
                });
            } else {
                this.setData({
                    noEdit: false,
                });
            }
            if (this.data.page_data.length > 0) {
                this.setData({
                    [`editLayer.${id}`]: true,
                    layer: true,
                });
            }
        } else {
            this.setData({
                editLayer: {},
            });
            this.goSave();
            console.log('保存');
        }
    },
    async goSave() {
        const pageId = globalData.pageList.filter(obj => obj.pageKey === this.data.pageKey)[0].id;
        let modData = globalData.modules.map(({
            id, name, cfg, params,
        }) => {
            if (Array.isArray(params)) params = {};
            return {
                id, name, cfg, params, page_id: pageId,
            };
        });
        modData = JSON.parse(JSON.stringify(modData));
        const emptymodData = [];
        modData.forEach((item) => {
            if (item.name === 'coupon' && item.params && !item.params.couponIds) {
                toast('请补全组件中的优惠券。');
                emptymodData.push(item);
            }
        });
        if (emptymodData.length && emptymodData.length > 0) {
            return;
        }
        try {
            await post('/business/templete/savemodules', {
                businessPageId: pageId,
                modulesJson: JSON.stringify(modulesParse.save(modData)),
                releaseId: wx.getStorageSync('releaseId'),
                mpId: wx.getStorageSync('current_mpid'),
            });
            toast('保存成功');
        } catch (err) {
            toast(err);
        }

    // wx.navigateBack({
    //     delta: 1,
    // });
    },
    goEdit(e) {
        SendClickLog('wxf03e52adc4b13448', getUid(), '{}', 'sjzh_editLayer_goEditApp');
        if (this.data.noEdit) return;
        const {
            id,
            name,
        } = e.currentTarget.dataset;
        wx.navigateTo({
            url: `../edit/${name}?id=${id}`,
        });
    },
};
