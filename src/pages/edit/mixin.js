import wepy from 'wepy';
// const { post } = require('../../utils/ajax');
import { toast, picSrcDomain, alertP } from '../../utils';
// import { uploader } from '../../utils/uploader';
import uploadImages from '../../utils/upload';
import { globalData } from '../../utils/globalData';
// import modulesParse from '../../utils/modulesParse';
// import { toast } from '../../utils';
import { uploader } from '../../utils/uploader';

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
        imageLimit: 0,
        tempModules: {},
        noEdit: false,
    }
    onLoad(options) {
        console.log(options);
        this.saveAvaliable = false;
        this.pageId = options.id;
        const result = globalData.pageData.filter(obj => obj.id === this.pageId);
        this.pageIndex = globalData.pageData.findIndex(obj => obj.id === this.pageId);
        // this.pageData = Object.assign({}, this.pageData, {
        //     cfg: result[0].props.cfg, data: result[0].props.data, pageNum: result[0].props.pageNum, pageSize: result[0].props.pageNum, total: result[0].props.total,
        // });
        this.pageData = JSON.parse(JSON.stringify(result));
        if (result[0].name === 'article') {
            this.pageData = Object.assign({}, this.pageData, { params: result[0].params });
        }
        this.modules = globalData.modules;
        this.tempModules = JSON.parse(JSON.stringify(this.modules));
        this.extConfig = globalData.extConfig;
        this.pageList = globalData.pageList.map((item, index) => ({
            id: index,
            key: item.pageKey,
            name: item.pageName,
        }));
        console.log(result);
    }
    // onShow() {
    //     const result = globalData.pageData.filter(obj => obj.id === this.pageId);
    //     this.pageIndex = globalData.pageData.findIndex(obj => obj.id === this.pageId);
    //     this.pageData = JSON.parse(JSON.stringify(result));
    // }
    async addBanner(sourceType, type = 'image') {
        if (type === 'image') {
            const { result, msg } = await uploadImages({
                sourceType,
                count: type === 'image' ? this.imageLimit : 1,
            });
            if (msg) {
                // 错误操作
                toast(msg);
            }

            const { confirm } = await alertP('是否裁剪图片？');

            if (confirm) {
                console.log('跳转');
                wepy.navigateTo({
                    url: `/pages/cropper?url=${picSrcDomain() + result[0]}&ratio=4,3`,
                });
                return;
            }

            console.log(result);
            result.forEach(item => {
                const src = item;
                const name = this.picName;
                this.pageModule.cfg.images.push({
                    src: picSrcDomain() + src,
                    pageKey: '',
                    title: name,
                    linkName: this.linkName,
                });
                this.pageData[0].props.cfg.images.push({
                    src: picSrcDomain() + src,
                    title: name,
                    linkName: this.linkName,
                    pageKey: '',
                });
            });
            this.$apply();
        } else {
            const { tempFilePath, thumbTempFilePath } = await wepy.chooseVideo();
            uploader(tempFilePath, { isVideo: true }, (e, result) => {
                if (e) {
                    toast('上传失败，请重试。');
                    return;
                }
                toast('上传成功。');
                Object.assign(this.video, { src: result.content, cover: thumbTempFilePath });
                this.saveVideo(result.content);
                this.$apply();
            });
        }
    }
    methods = {
        actionSheepTap(e) {
            const that = this;
            const { type = 'image' } = e.currentTarget.dataset;
            wx.showActionSheet({
                itemList: ['拍摄', type === 'video' ? '添加本地视频' : '添加本地照片', type === 'video' ? '去视频库选择' : '去图片库选择'],
                success (tap) {
                    if (tap.tapIndex === 0) {
                        that.addBanner('camera', type);
                    } else if (tap.tapIndex === 1) {
                        that.addBanner('album', type);
                    } else {
                        wepy.navigateTo({
                            url: `../resourceManage?limit=${that.imageLimit}&type=${type}`,
                        });
                    }
                },
            });
        },
    }
}
