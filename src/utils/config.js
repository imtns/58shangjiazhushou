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
            0: {
                title: '待接单',
                subtitle: '用户已下单，请您尽快接单，超过15分钟不接单，系统将自动取消订单',
            },
            1: {
                title: '待配送',
                subtitle: '您已接单，请在预计送达时间前送达，配送开始时请点击开始配送按钮进行确认',
            },
            // 已完成
            2: {
                title: '退款中',
                subtitle: '顾客已在您接单前取消订单，系统将自动退款给顾客',
            },
            // 已取消，退款成功-用户取消
            3: {
                title: '退款成功',
                subtitle: '顾客已在您接单前取消订单，系统已退款到顾客',
            },
            4: {
                title: '已删除',
                subtitle: '系统已删除订单',
            },
            // 已下单，未支付
            5: {
                title: '',
                subtitle: '',
            },
            // 退款成功
            // ***文案有问题，需要重新给***
            6: {
                title: '退款成功',
                subtitle: '',
            },
            // 退款失败
            7: {
                title: '退款失败',
                subtitle: '您已同意退款，系统退款失败，请到首页联系我们',
            },
            // 已取消，系统自动取消 退款成功-系统取消
            8: {
                title: '退款成功',
                subtitle: '顾客由于您超过15分钟未接单，系统自动取消订单，系统已退款到用户',
            },
            // 已评价
            9: {
                title: '',
                subtitle: '',
            },
            // 退款中 商家确认中
            10: {
                title: '退款中',
                subtitle: '用户申请退款，请您确认是否同意退款',
            },
            // 买单支付
            11: {
                title: '退款中',
                subtitle: '',
            },
            // 退款处理中
            12: {
                title: '退款中',
                subtitle: '您已同意退款，系统正在给顾客处理退款',
            },
            // 开始配送
            13: {
                title: '配送中',
                subtitle: '订单已于08.16 21:00开始配送，送达后请您点击确认配送到达按钮',
            },
            // 订单已送达
            14: {
                title: '已送达',
                subtitle: '商品已送达，请督促顾客确认收货，顾客确认后系统将给您打款',
            },
            // 商家拒绝接单
            15: {
                title: '已完成',
                subtitle: '您已拒绝接单',
            },
        },
    },
};
