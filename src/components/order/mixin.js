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
        statusSet: [
            '已支付，待接单',
            '已接单，待服务',
            '已完成',
            '已取消',
            '已删除',
            '已下单，待支付',
            '退款成功',
            '退款失败',
            '已取消',
            '已评价',
            '退款中',
            '',
            '退款中',
        ],
        sendParams: {
            pageNum: 1,
            pageSize: 10,
            status: '',
        },
        total: 0,
        serviceOrderList: [],
        productOrderList: [],
        noMore: false,
        listSaver: [],
    };
    events = {
        bindLoadDown() {
            if (this.noMore) return;
            if (this.orderType === 'service' && this.serviceOrderList === this.total.service) {
                return;
            }
            if (this.orderType === 'product' && this.productOrderList === this.total.product) {
                return;
            }
            this.sendParams = Object.assign({}, this.sendParams, {
                pageNum: this.sendParams.pageNum + 1,
            });
            this.getOrderList();
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
    filterOrder(status) {
        if (this.orderType === 'service') {
            this.serviceOrderList =
                status === ''
                    ? this.listSaver.filter(item => item.orderType === 1)
                    : this.listSaver.filter(item => item.status.toString() === status && item.orderType === 1);
        }
        if (this.orderType === 'product') {
            this.productOrderList =
                status === ''
                    ? this.listSaver.filter(item => item.orderType === 4)
                    : this.listSaver.filter(item => item.status.toString() === status && item.orderType === 4);
        }
    }
    async getOrderList(id = '') {
        try {
            SendClickLog(
                'wxf03e52adc4b13448',
                getUid(),
                '{}',
                `sjzh_click_orderList_status_${id}`
            );
            this.noMore = false;
            const mpId = wepy.getStorageSync('current_mpid');
            this.sendParams = Object.assign({}, this.sendParams, {
                mpId,
                status: id,
            });
            const res = await get('/consumerAppointment/queryPageForUser', this.sendParams);

            const data = this.parseOrderList(res.data);
            this.listSaver.push(...data);
            this.total = res.recordsTotal;
            if (this.listSaver.length === this.total) {
                this.noMore = true;
            }
            const filterProduct = data.filter(item => item.orderType === 4);
            this.productOrderList.push(...filterProduct);
            this.productOrderList.forEach(item => {
                if (
                    typeof item.consumerAddressJson !== 'object' &&
                    item.consumerAddressJson !== null
                ) {
                    item.consumerAddressJson = JSON.parse(item.consumerAddressJson);
                }
            });
            const filterService = data.filter(item => item.orderType === 1);
            this.serviceOrderList.push(...filterService);
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
