import wepy from 'wepy';
import { toast, picSrcDomain } from '../../utils';
import { get, post } from '../../utils/ajax';
import { getUid, SendClickLog } from '../../utils/maidian';
import {
    ACCEPT_ORDER,
    DELIVER_ORDER,
    REFUSE_ORDER,
    WHETHER_ACCEPT_REFUND,
    ARRIVE_ORDER,
} from '../../utils/url';


export default class OrderMixin extends wepy.mixin {
    data = {
        statusSet: {
            0: '已支付，待接单',
            1: '已接单，待配送',
            2: '已完成',
            3: '已取消',
            4: '已删除',
            5: '已下单，待支付',
            6: '退款成功',
            7: '退款失败',
            8: '已取消',
            9: '已评价',
            10: '退款中',
            11: '买单支付',
            12: '退款处理中',
            13: '开始配送',
            14: '订单已送达',
            15: '商家拒绝接单',
        },
        sendParams: {
            pageNum: 1,
            pageSize: 10,
            status: '',
        },
        orderList: [],
        total: 0,
        noMore: false,
        noOrder: false,
    };
    events = {
        bindLoadDown() {
            if (this.noMore) return;
            if (this.orderType === 'service' && this.OrderList === this.total) {
                return;
            }
            if (this.orderType === 'product' && this.OrderList === this.total) {
                return;
            }
            this.sendParams = Object.assign({}, this.sendParams, {
                pageNum: this.sendParams.pageNum + 1,
            });
            this.getOrderList(this.orderType, this.status, true);
        },
    };
    parseOrderList(orders) {
        const regDateTime = /(\d{4})-([0-1]?\d{1})-([0-3]?\d{1}) ([0-2]?\d{1}):([0-5]?\d{1}):([0-5]?\d{1}).*/;
        return orders.map(item => {
            const ret = item;
            ret.mpLogo = picSrcDomain() + item.mpLogo;
            if (ret.createTime) {
                ret.createTime = item.createTime.replace(regDateTime, '$2.$3 $4:$5');
            }
            if (ret.startTime) {
                ret.startTime = item.startTime.replace(regDateTime, '$2.$3 $4:$5');
            }
            if (ret.endTime) {
                ret.endTime = item.endTime.replace(regDateTime, '$2.$3 $4:$5');
            }
            return ret;
        });
    }
    async getOrderList(type, id = '', loadMore) {
        type = type === 'product' ? 4 : 1;
        try {
            if (!loadMore) {
                // this.orderList = [];
                this.sendParams.pageNum = 1;
            }
            SendClickLog(
                'wxf03e52adc4b13448',
                getUid(),
                '{}',
                `sjzh_click_orderList_status_${id}`,
            );
            this.noMore = false;
            const mpId = wepy.getStorageSync('current_mpid');
            this.sendParams = Object.assign({}, this.sendParams, {
                mpId,
                orderType: type,
                status: id,
            });
            const res = await get('/consumerAppointment/queryPageForUser', this.sendParams);

            const data = this.parseOrderList(res.data);
            this.orderList.push(...data);
            this.total = res.recordsTotal;
            if (this.orderList.length === this.total && this.sendParams.pageNum !== 1) {
                this.noMore = true;
            }
            if (this.orderList.length === 0 && this.sendParams.pageNum === 1) {
                this.noOrder = true;
            }
            this.$apply();
        } catch (err) {
            toast(err);
        }
    }

    methods = {
        // 商家的各种按钮操作事件处理

        // 拒绝接单
        async handleRefuseOrder(orderId) {
            try {
                const { state } = await post(`${REFUSE_ORDER}${orderId}`);

                if (state !== 100) {
                    throw new Error('取消订单失败');
                }

                await toast('取消订单成功');
                this.loadData();
            } catch (err) {
                console.log(err);
                toast('取消订单失败，请稍后再试');
            }
        },
        // 接单
        async handleAcceptOrder(orderId) {
            try {
                const { state } = await post(`${ACCEPT_ORDER}${orderId}`);

                if (state !== 100) {
                    throw new Error('接单失败');
                }

                await toast('接单成功');
                this.loadData();
            } catch (err) {
                console.log(err);
                toast('接单失败，请稍后再试');
            }
        },
        // 开始配送
        async handleStartDeliver(orderId) {
            try {
                const { state } = await post(`${DELIVER_ORDER}${orderId}`);

                if (state !== 100) {
                    throw new Error('开始配送失败');
                }

                await toast('开始配送成功');
                this.loadData();
            } catch (err) {
                console.log(err);
                toast('开始配送失败，请稍后再试');
            }
        },
        // 平台介入
        async handlePlatformIn(orderId) {
            try {
                const { state } = await post(`${WHETHER_ACCEPT_REFUND}${orderId}`, { action: 'refuse' });

                if (state !== 100) {
                    throw new Error('平台介入失败');
                }

                await toast('平台介入成功');
                this.loadData();
            } catch (err) {
                console.log(err);
                toast('平台介入失败');
            }
        },
        // 同意退款
        async handleAcceptRefund(orderId) {
            try {
                const { state } = await post(`${WHETHER_ACCEPT_REFUND}${orderId}`, { action: 'agree' });

                if (state !== 100) {
                    throw new Error('退款失败');
                }

                await toast('退款成功');
                this.loadData();
            } catch (err) {
                console.log(err);
                toast('退款失败');
            }
        },
        // 已送达
        async handleConfirm(orderId) {
            try {
                const { state } = await post(`${ARRIVE_ORDER}${orderId}`);

                if (state !== 100) {
                    throw new Error('');
                }

                await toast('操作成功');
                this.loadData();
            } catch (err) {
                console.log(err);
                toast('操作失败');
            }
        },
    }
}
