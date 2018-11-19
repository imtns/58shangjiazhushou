export const items = [
    {
        iconPath: 'https://static.58.com/lbg/shangjiaxcxht/zhushou/img/home-icon1.png',
        text: '名片管理',
    }, {
        iconPath: 'https://static.58.com/lbg/shangjiaxcxht/zhushou/img/home-icon2.png',
        text: '通知',
    }, {
        iconPath: 'https://static.58.com/lbg/shangjiaxcxht/zhushou/img/home-icon3.png',
        text: '访客记录',
    }, {
        iconPath: 'https://static.58.com/lbg/shangjiaxcxht/zhushou/img/home-icon4.png',
        text: '收款记录',
    },
];

export const nItems = [
    {
        title: '小程序管理',
        items: [
            {
                iconPath: 'https://static.58.com/lbg/shangjiaxcxht/zhushou/img/mpinfo-icon1.png',
                text: '我的小程序',
            }, {
                iconPath: 'https://static.58.com/lbg/shangjiaxcxht/zhushou/img/mpinfo-icon2.png',
                text: '小程序制作',
            }, {
                iconPath: 'https://static.58.com/lbg/shangjiaxcxht/zhushou/img/mpinfo-icon3.png',
                text: '素材管理',
            },
            {
                iconPath: 'https://static.58.com/lbg/shangjiaxcxht/zhushou/img/mpinfo-icon4.png',
                text: '支付开通',
            },
        ],
    },
    {
        title: '发布',
        items: [
            {
                iconPath: 'https://static.58.com/lbg/shangjiaxcxht/zhushou/img/publish-icon1.png',
                text: '服务',
            },
            {
                iconPath: 'https://static.58.com/lbg/shangjiaxcxht/zhushou/img/publish-icon2.png',
                text: '商品',
            },
            {
                iconPath: 'https://static.58.com/lbg/shangjiaxcxht/zhushou/img/publish-icon3.png',
                text: '文章',
            },
            {
                iconPath: 'https://static.58.com/lbg/shangjiaxcxht/zhushou/img/publish-icon4.png',
                text: '优惠劵',
            },
        ],
    },
    {
        title: '开店必做',
        items: [
            {
                iconPath: 'https://static.58.com/lbg/shangjiaxcxht/zhushou/img/icon-buy-mp.png',
                text: '购买小程序',
            },
            {
                iconPath: 'https://static.58.com/lbg/shangjiaxcxht/zhushou/img/icon-regist-mp.png',
                text: '注册小程序',
            }, {
                iconPath: 'https://static.58.com/lbg/shangjiaxcxht/zhushou/img/icon-mp-progress.png',
                text: '进度查询',
            }, {
                iconPath: 'https://static.58.com/lbg/shangjiaxcxht/zhushou/img/icon-feedback-mp.png',
                text: '意见反馈',
            },
        ],
    },
];

export const share = {
    hasPerm: false, // 能不能参加活动
    isAuto: false, // 是不是默认名片
    hasPromptToday: false, // 今天需不需要弹框
    hasShareToday: 0, // 今天分享次数
    hasShareDays: 0, // 一共分享天数
    needShareDays: 3, // 分享多少天达标
    cashTime: '2018-10-18', // 开奖日期
    cashDistance: 0, // 开奖距离，单位秒
    cashTotal: 0, // 奖池金额，单位元，可修改
    cashAmount: 0, // 我的中奖金额，单位元
    timeArray: [], // 开奖倒计时数组
};

export const business = {
    mps: [],
    name: '',
    miniProgramName: '您还没购买小程序',
    unread: 0,
    unreadOrder: 0,
    mpCount: 0,
    progressText: '您还没有购买小程序',
    nexttask: 0,
    changeMP: false,
    canConfirm: false,
    selected: {
        id: 0,
    },
    chosedId: 0,
};