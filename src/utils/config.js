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
    goodsOrderDetail: {
        /**
         * 缺少
         *
         * 退款中-用户取消
         * 退款失败-用户取消
         * 退款中-系统取消
         * 退款失败-系统取消
         * 退款中-用户申请退款-已拒绝-平台介入
         */
        statusDesc: {
            0: [
                '待接单',
                '用户已下单，请您尽快接单，超过15分钟不接单，系统将自动取消订单',
            ],
            1: [
                '待配送',
                '您已接单，请在预计送达时间前送达，配送开始时请点击开始配送按钮进行确认',
            ],
            2: [
                '已完成',
                '该订单已确认收货',
            ],
            3: [
                '退款成功',
                '顾客已在您接单前取消订单，系统已退款到顾客',
            ],
            4: [
                '已删除',
                '系统已删除订单',
            ],
            5: [
                '',
                '',
            ],
            6: [
                '退款成功',
                '',
            ],
            7: [
                '退款失败',
                '您已同意退款，系统退款失败，请到首页联系我们',
            ],
            8: [
                '退款成功',
                '顾客由于您超过15分钟未接单，系统自动取消订单，系统已退款到用户',
            ],
            9: [
                '',
                '',
            ],
            10: [
                '退款中',
                '用户申请退款，请您确认是否同意退款',
            ],
            11: [
                '退款中',
                '',
            ],
            12: [
                '退款中',
                '您已同意退款，系统正在给顾客处理退款',
            ],
            13: [
                '配送中',
                '订单已于$$开始配送，送达后请您点击确认配送到达按钮',
            ],
            14: [
                '已送达',
                '商品已送达，请督促顾客确认收货，顾客确认后系统将给您打款',
            ],
            15: [
                '已完成',
                '您已拒绝接单',
            ],
        },
    },
};
