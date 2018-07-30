/*eslint-disable */
import wepy from 'wepy';
import { LOAD_COUPON_LIST } from '../utils/url';
import { get } from '../utils/ajax';

export default class CouponMixin extends wepy.mixin {
    formatTime(v = '', type = 'YYYY-MM-DD') {
        if (!v) {
            return v;
        }

        const regRes = this.getDateItem(v);
        if (!regRes) {
            return v;
        }

        let result = '';
        const [time, year, month, day] = regRes;

        if (type === 'YYYY.MM.DD') {
            result = [year, month, day].join('.');
        }

        if (type === 'YYYY-MM-DD') {
            result = time;
        }

        return result;
    }

    // 将时间拆分成 year month day
    getDateItem(v) {
        return v.match(/([\d]{4})-([\d]{2})-([\d]{2})/);
    }

    getCurrentDate() {
        const today = new Date();
        return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    }

    getCurrentDateValue() {
        const today = new Date();
        return today.getFullYear() * 1e4 + (today.getMonth() + 1) * 1e2 + today.getDate();
    }

    /**
     * @desc 检查优惠券是否可以使用
     * @param {Object} coupon 优惠券对象
     * @return {Boolean} 可用返回true，不可用返回false
     */
    checkUsable({ validType, validEndtime, totalCount, useCount }) {
        if (validEndtime && validType === 1) {
            // 因为兼容性问题，需要正则拆分字符串比较时间
            const regRes = this.getDateItem(validEndtime);
            if (!regRes) {
                return false;
            }
            const [, year, month, day] = regRes;
            const validTime = (+year) * 1e4 + (+month) * 1e2 + (+day);;

            // 时间过期
            if (validTime - this.getCurrentDateValue() < 0) {
                return false;
            }
        }

        // 优惠券已使用数目和总数相等时
        if (+useCount >= +totalCount) {
            return false;
        }

        return true;
    }

    async getCoupons({ mpId, pageNum, pageSize }) {
        let result = [];

        let { data: coupons } = await get(LOAD_COUPON_LIST, {
            pageNum,
            pageSize,
            mpId,
        });

        if (coupons && coupons.length) {
            coupons = coupons.map(item => {
                const coupon = Object.assign({}, item);
                let { couponCondition } = coupon;
                const { validStarttime, validEndtime, validType } = coupon;

                coupon.usable = this.checkUsable(coupon);

                if (couponCondition) {
                    try {
                        couponCondition = JSON.parse(couponCondition);
                        Object.assign(coupon, couponCondition);
                    } catch (e) {
                        console.log(e);
                    }
                }

                if (validType === 1 && validStarttime && validEndtime) {
                    Object.assign(coupon, {
                        validStarttime: this.formatTime(validStarttime, 'YYYY.MM.DD'),
                        validEndtime: this.formatTime(validEndtime, 'YYYY.MM.DD'),
                    });
                }

                return coupon;
            });

            result = coupons;
        }

        return result;
    }
}
