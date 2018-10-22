
/*eslint-disable */
'use strict';
var Page = {
    share: {
        // hasPerm: false, // 能不能参加活动
        // isAuto: false, // 是不是默认名片
        // hasPromptToday: true, // 今天需不需要弹框
        // hasShareToday: 0, // 今天分享次数
        // hasShareDays: 0, // 一共分享天数
        // needShareDays: 3, // 分享多少天达标
        // cashTime: '2018-10-18', // 开奖日期
        // cashDistance: 0, // 开奖距离，单位秒
        // cashTotal: 0, // 奖池金额，单位元，可修改
        // cashAmount: 0, // 我的中奖金额，单位元
        timeArray: [], // 开奖倒计时数组
    },
    loadPrizeData: function(){
        const that = this;
        //$.get('/yunying/getShare', {userId: '33433383496455', platform: 'app',}, function(res){
        const unionid = $(".prize-result").attr("data-unionid");
        $.get('/yunying/getShare',{
            unionId: unionid,
            platform: 'h5',
        },function(res){
            const { data } = JSON.parse(res);
            that.share = data;
            if(!that.share.hasPerm && that.share.cashDistance > 0) { // 没有资格参加活动
                $(".prize-result").css("display","block");
                $(".result-tip").html('有58云名片的商家才能参加这个活动哦，可以去购买名片获取商机、赢大奖');
                return;
            }
            if(that.share.cashDistance > 0 && that.share.hasPerm) { // 还未开奖，并且有资格参加活动
                that.getPrize();
                $(".prize-attend").css("display","block");
                return;
            }
            // 已开奖
            $(".prize-result").css("display","block");
            if(parseInt(that.share.hasShareDays) >= that.share.needShareDays){
                $(".result-title").html('领奖成功');
                $(".result-tip").html('恭喜您！<em>¥' + that.share.cashAmount + '</em>瓜分获得现金奖励');
                $("._withdraw-btn").css("display","inline-block");
            } else{
                $(".result-title").html('非常遗憾');
                $(".result-tip").html('您没有达到累计分享'+that.share.needShareDays+'天的活动要求，<br>再接再厉，期待在之后的活动中赢取大奖');
            }
        })
    },
    // 计时器
    countDown: function(){
        const timeNow = parseInt(new Date().getTime());
        const timeEnd = parseInt(new Date(this.share.cashTime.replace(/-/g, '/')).getTime());
        this.share.timeArray = this.formatDuring(timeEnd - timeNow);
        $(".time-down._days").html(this.share.timeArray[0]);
        $(".time-down._hours").html(this.share.timeArray[1]);
        $(".time-down._minutes").html(this.share.timeArray[2]);
        $(".time-down._seconds").html(this.share.timeArray[3]);
    },
    getPrize: function(){
        const that = this;
        setInterval(() => {
            that.countDown();
        },1000);
    },
    // 倒计时
    formatDuring: function(mss){
        const days = parseInt(mss / (1000 * 60 * 60 * 24));
        const hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = parseInt((mss % (1000 * 60)) / 1000);
        return [days > 9 ? days : '0' + days, hours > 9 ? hours : '0' + hours, minutes > 9 ? minutes : '0' + minutes, seconds > 9 ? seconds : '0' + seconds];
    },
    init: function(){
        this.loadPrizeData();
    },
    initEvent: function() {
        // 立即参加弹出商家助手二维码
        $("._attend-btn").on("click",function(){
            $("._dialoge-code").css("display","block");
        })
        $("._dialoge-code").on("click",function(){
            $("._dialoge-code").css("display","none");
        })
        $("._withdraw-btn").on("click",function(){
            alert('该功能正在开发中！')
        })
    }
};
Page.init();
Page.initEvent();