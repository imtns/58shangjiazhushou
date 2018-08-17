/*eslint-disable */
// window.__staticConfig = {
//     cssCdn: 'https://static.58.com',
//     cssCfg: [{
//         name: 'css',
//         version: '20180817',
//         url: '/lbg/shangjiaxcxht/zhushou/css/goods-component-add.css',
//     }],
//     jsCdn: 'https://static.58.com',
//     jsCfg: [{
//         name: 'jq',
//         version: '20180717',
//         url: '/lbg/shangjiaxcxht/zhushou/js/zepto.min.js',
//     }, {
//         name: 'js',
//         version: '20180817',
//         url: '/lbg/shangjiaxcxht/zhushou/js/editor.js',
//     },
//     {
//         name: 'js',
//         version: '20180817',
//         url: '/lbg/shangjiaxcxht/zhushou/js/goods-component-add.js',
//     }
// ],
// };

$("#d").on("click",function(){
    wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
            var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
        }
    });
})