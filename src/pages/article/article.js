/*eslint-disable */
const mixin = require('../../mixin/mixin');
const { get } = require('../../utils/http');

const app = getApp();

const articleDetailUrl = '/businessArticle/get/';

Page({
    onReady() {
        get(articleDetailUrl + this.options.id, (e, response) => {
            const pLength = response.content.indexOf(('</p>'));
            if(pLength.length>-1){
            const ps = response.content.split('</p>')
                .filter(p => p)
                .map(p => {
                    const result = /<img src=\"([^<>]+)\"/g.exec(p);
                    if (result) {
                        const src = result[1].replace(/^http:/i, '').split('?');

                        return {
                            type: 'img',
                            content: `${src[0]}?w=750`,
                        };
                    }
                    return {
                        type: 'text',
                        content: `${p}</p>`,
                    };
                });
                this.setData({
                    ps,
                });
            }
            this.setData({
                page_data: response,
            });
        });
    },
    onShareAppMessage() {

    },
});
