// intro 页面的数据
export const business = [{
    src: 'https://static.58.com/lbg/shangjiaxcxht/zhushou/img/code1.png',
    name: '家装服务',
}, {
    src: 'https://static.58.com/lbg/shangjiaxcxht/zhushou/img/code2.png',
    name: '会展策划',
}, {
    src: 'https://static.58.com/lbg/shangjiaxcxht/zhushou/img/code3.png',
    name: '健身培训',
}, {
    src: 'https://static.58.com/lbg/shangjiaxcxht/zhushou/img/code4.png',
    name: '货运物流',
}, {
    src: 'https://static.58.com/lbg/shangjiaxcxht/zhushou/img/code5.png',
    name: '艺术培训',
}, {
    src: 'https://static.58.com/lbg/shangjiaxcxht/zhushou/img/code6.png',
    name: '电脑租赁',
}, {
    src: 'https://static.58.com/lbg/shangjiaxcxht/zhushou/img/code7.png',
    name: '维修服务',
}, {
    src: 'https://static.58.com/lbg/shangjiaxcxht/zhushou/img/code8.png',
    name: '家政保洁',
}, {
    src: 'https://static.58.com/lbg/shangjiaxcxht/zhushou/img/code9.png',
    name: '商务服务',
}];

export const advantage = [{
    title: '自带流量',
    text: '微信超9亿日活，聚拢大量潜在用户',
}, {
    title: '便捷入口',
    text: '50+入口，微信内轻松跳转小程序',
}, {
    title: '突破地域',
    text: '附近5km自动客流，扩大辐射范围',
}, {
    title: '社交裂变',
    text: '基于微信社交，实现广传播和涨用户',
}, {
    title: '微信生态',
    text: '公众号小程序连通，流量增长多途径',
}, {
    title: '使用无门槛',
    text: '无需下载无需注册，即开即用难度低',
}];

// mybizcard页面，我的名片页面的数据
export const myCardItems = [{
    src: 'https://static.58.com/lbg/shangjiaxcxht/zhushou/img/check_mycard.png',
    name: '查看名片',
    type: 'mpJump',
    path: '/pages/index58/index58?mpcardId=',
},{
    src: 'https://static.58.com/lbg/shangjiaxcxht/zhushou/img/mycard_visitor_logs.png',
    name: '访客记录',
    type: 'innerJump',
    path: 'visitorLogs',
}, {
    src: 'https://static.58.com/lbg/shangjiaxcxht/zhushou/img/mycard_chat_msg.png',
    name: '消息',
    type: 'innerJump',
    path: 'chatMessages',
}, {
    src: 'https://static.58.com/lbg/shangjiaxcxht/zhushou/img/mycard_go_share.png',
    name: '分享名片',
    type: 'innerJump',
    path: '',
},{
    src: 'https://static.58.com/lbg/shangjiaxcxht/zhushou/img/mycard_edit_card.png',
    name: '编辑名片',
    type: 'innerJump',
    path: 'newBizCard',
}, {
    src: 'https://static.58.com/lbg/shangjiaxcxht/zhushou/img/mycard_go_pay.png',
    name: '开通支付',
    type: 'innerJump',
    path: 'OpenPay',
}, {
    src: 'https://static.58.com/lbg/shangjiaxcxht/zhushou/img/mycard_go_pics.png',
    name: '线下物料',
    type: 'mpJump',
    path: '/pages/index58/index58?releaseId=',
}, {
    src: 'https://static.58.com/lbg/shangjiaxcxht/zhushou/img/mycard_go_notice.png',
    name: '通知设置',
    type: 'innerJump',
    path: 'noticeSet',
}, {
    src: 'http://c.58cdn.com.cn/lbg/shangjiaxcxht/zhushou/img/mycard_regist_qrcode.png',
    name: '注册码',
    type: 'innerJump',
    path: '/pages/regist/qrcode',
    id: 'regist_qrcode',
}];

// canvas图片分享到朋友圈默认数据
export const firstStyle = {
    width: 530,
    height: 940,
    background: {
        imageResource: 'https://static.58.com/lbg/shangjiaxcxht/zhushou/img/card_style_bg.png',
        dx: 0,
        dy: 0,
        dWidth: 530,
        dHeight: 940,
    },
    layers: [
        {
            type: 'image', // 手机号icon
            imageResource: '/images/chosestyle_phone.png',
            dx: 67,
            dy: 508,
            dWidth: 15,
            dHeight: 24,
        },
        {
            type: 'text', // 手机号text
            textBaseline: 'top',
            textAlign: 'left',
            fontSize: 24,
            text: '手机号',
            x: 100,
            y: 507,
            color: '#999',
            lineHeight: '24',
            maxWidth: '460',
        },
        {
            type: 'image', // 微信号icon
            imageResource: '/images/chosestyle_wechat.png',
            dx: 67,
            dy: 565,
            dWidth: 22,
            dHeight: 18,
        },
        {
            type: 'text', // 微信号text
            textBaseline: 'top',
            textAlign: 'left',
            fontSize: 24,
            text: '微信号',
            x: 100,
            y: 565,
            color: '#999',
            lineHeight: '18',
            maxWidth: '460',
        },
        {
            type: 'image', // 联系地址icon
            imageResource: '/images/chosestyle_location.png',
            dx: 67,
            dy: 618,
            dWidth: 18,
            dHeight: 22,
        },
        {
            type: 'text', // 联系地址text
            textBaseline: 'top',
            textAlign: 'left',
            fontSize: 24,
            text: '联系地址',
            x: 100,
            y: 618,
            color: '#999',
            lineHeight: '22',
            maxWidth: '460',
        },
        {
            type: 'text', // 长按识别二维码text
            textBaseline: 'top',
            textAlign: 'left',
            fontSize: 24,
            text: '长按识别二维码',
            x: 270,
            y: 750,
            color: '#666',
            maxWidth: '460',
        },
        {
            type: 'text', // 查看我的更多信息text
            textBaseline: 'top',
            textAlign: 'left',
            fontSize: 24,
            text: '查看我的更多信息',
            x: 260,
            y: 785,
            color: '#666',
            maxWidth: '460',
        },
    ],
};

export const secondStyle = {
    width: 530,
    height: 940,
    background: {
        imageResource: 'https://static.58.com/lbg/shangjiaxcxht/zhushou/img/card_style_bg.png',
        dx: 0,
        dy: 0,
        dWidth: 560,
        dHeight: 740,
    },
    layers: [],
};