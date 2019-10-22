<template>
    <div class="discount-info" v-if="checkDiscountTime(time)">
        <div class="f-row">
            <h4>限时抢购
                <span class="count-down">距离结束{{countDown.d}}天
                    <span class="count-num">{{countDown.h}}</span> :
                    <span class="count-num">{{countDown.m}}</span> :
                    <span class="count-num">{{countDown.s}}</span></span>
            </h4>
        </div>
        <div class="s-row">
            <span class="discount-price">{{getDiscountPrice(price,discount,time)}} 课程币</span>
            <span class="old-price">{{price}} 课程币</span>
        </div>
    </div>
</template>

<script>
    import moment from 'moment';

    export default {
        name: "CountDown",
        props: {
            price: [Number, String],
            discount: Number,
            time: [String, Date, Number]
        },
        data() {
            return {
                interval: null,
                countDown: {d: "00", h: "00", m: "00", s: "00"}
            }
        },
        methods: {
            checkDiscountTime(time) {
                if (time === null) return false;
                return moment(time).isAfter(moment());
            },
            getDiscountPrice(price, discount, time) {
                if (!discount || !time) return price;
                if (!moment(time).isAfter(moment())) return price;
                this.setCountDown(time);
                let discountPrice = (price * discount / 100).toFixed(2);
                this.$emit('changePrice', discountPrice);
                return discountPrice;
            },
            timeFormat(param) {
                return param < 10 ? '0' + param : param;
            },
            setCountDown(time) {
                this.interval = setInterval(() => {
                    let nowTime = new Date().getTime();
                    let endTime = new Date(time).getTime();
                    let obj = null;
                    if (endTime - nowTime > 0) {
                        let tempTime = (endTime - nowTime) / 1000;
                        let day = parseInt((tempTime / (60 * 60 * 24)).toString());
                        let hou = parseInt((tempTime % (60 * 60 * 24) / 3600).toString());
                        let min = parseInt((tempTime % (60 * 60 * 24) % 3600 / 60).toString());
                        let sec = parseInt((tempTime % (60 * 60 * 24) % 3600 % 60).toString());
                        obj = {
                            day: this.timeFormat(day),
                            hour: this.timeFormat(hou),
                            min: this.timeFormat(min),
                            sec: this.timeFormat(sec)
                        };
                    } else {
                        obj = {
                            day: '00',
                            hour: '00',
                            min: '00',
                            sec: '00'
                        };
                        clearInterval(this.interval);
                        window.location.reload();
                    }
                    this.countDown.d = obj.day;
                    this.countDown.h = obj.hour;
                    this.countDown.m = obj.min;
                    this.countDown.s = obj.sec;
                }, 1000);
            }
        },
        beforeDestroy() {
            clearInterval(this.interval);
        }
    }
</script>
