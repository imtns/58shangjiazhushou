module.exports = {
    shopScore: {
        taskList: [
            {
                icon: 'https://static.58.com/lbg/shangjiaxcxht/zhushou/img/shop-score-buy.png',
                title: '添加买单组件',
                subTitle: '添加后需开通支付功能',
                score: '+0.7分',
            },
            {
                icon: 'https://static.58.com/lbg/shangjiaxcxht/zhushou/img/shop-score-resource.png',
                title: '丰富图片素材',
                subTitle: '图片越多越清晰分值越高',
                score: '+0.2~0.5分',
            },
            {
                icon: 'https://static.58.com/lbg/shangjiaxcxht/zhushou/img/shop-score-info.png',
                title: '完善企业信息',
                subTitle: '完整的信息更容易吸引客户',
                score: '+0.5分',
            },
            {
                icon: 'https://static.58.com/lbg/shangjiaxcxht/zhushou/img/shop-score-publish.png',
                title: '发布任务',
                subTitle: '添加1~3个预约服务',
                score: '+0.5分',
            },
        ],
        imgs: [
            'https://static.58.com/lbg/shangjiaxcxht/zhushou/img/progress5.png',
            'https://static.58.com/lbg/shangjiaxcxht/zhushou/img/progress10.png',
            'https://static.58.com/lbg/shangjiaxcxht/zhushou/img/progress15.png',
            'https://static.58.com/lbg/shangjiaxcxht/zhushou/img/progress20.png',
            'https://static.58.com/lbg/shangjiaxcxht/zhushou/img/progress25.png',
            'https://static.58.com/lbg/shangjiaxcxht/zhushou/img/progress30.png',
            'https://static.58.com/lbg/shangjiaxcxht/zhushou/img/progress35.png',
            'https://static.58.com/lbg/shangjiaxcxht/zhushou/img/progress40.png',
            'https://static.58.com/lbg/shangjiaxcxht/zhushou/img/progress45.png',
            'https://static.58.com/lbg/shangjiaxcxht/zhushou/img/progress50.png',
        ],
    },
    'order/goodsDetail': {
        statusDesc: {
            0: {
                title: '待接单',
                subtitle: '用户已下单，请您尽快接单，超过15分钟不接单，系统将自动取消订单',
            },
            1: {
                title: '待配送',
                subtitle: '您已接单，请在预计送达时间前送达，配送开始时请点击开始配送按钮进行确认',
            },
            // 商家拒绝接单
            15: {
                title: '已完成',
                subtitle: '您已拒绝接单',
            },
            // 已取消
            3: {
                title: '退款中',
                subtitle: '顾客已在您接单前取消订单，系统将自动退款给顾客',
            },
            4: {
                title: '已删除',
                subtitle: '系统已删除订单',
            },
            // ****这个有没有
            5: {
                title: '已下单，待支付',
                subtitle: '顾客已下单，还未支付订单',
            },
            // 退款成功
            6: {
                title: '已下单，未支付',
                subtitle: '',
            },
            5: {
                title: '配送中',
                subtitle: '',
            },
            6: {
                title: '用户申请退款，退款中',
                subtitle: '',
            },
            7: {
                title: '已配送',
                subtitle: '',
            },
            8: {
                title: '已完成',
                subtitle: '',
            },
            9: {
                title: '退款中',
                subtitle: '',
            },
            10: {
                title: '退款成功',
                subtitle: '',
            },
        },
    },
};
