const moment = require('./moment');
import { autoFixed } from './index';

function formatTime() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();

    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();

    return (
        [year, month, day].map(formatNumber).join('-') +
        ' ' +
        [hour, minute, second].map(formatNumber).join(':')
    );
}
function formatTimeExtra(time, withYear) {
    var date = new Date(time.replace(/-/g, '/'));
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();

    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();

    if (withYear) {
        return (
            [year, month, day].map(formatNumber).join('.') +
            ' ' +
            [hour, minute].map(formatNumber).join(':')
        );
    } else {
        return (
            [month, day].map(formatNumber).join('.') +
            ' ' +
            [hour, minute].map(formatNumber).join(':')
        );
    }
}
function formatNumber(n) {
    n = n.toString();
    return n[1] ? n : '0' + n;
}
function parseTime(dateString) {
    var reg = new RegExp(
        /([0-9]{4})-([0-1]{0,1}[0-9]{1})-([0-3]{0,1}[0-9]{1})\s?([0-6]{0,1}[0-9]{1})?:?([0-6]{0,1}[0-9]{1})?:?([0-6]{0,1}[0-9]{1})?/
    );
    var [
        full,
        year,
        month = 1,
        date = 1,
        hours = 0,
        minutes = 0,
        seconds = 0
    ] = dateString.toString().match(reg);
    var newDate = new Date();
    newDate.setFullYear(year - 0);
    newDate.setMonth(--month);
    newDate.setDate(date - 0);
    newDate.setHours(hours - 0);
    newDate.setMinutes(minutes - 0);
    newDate.setSeconds(seconds - 0);
    return newDate.getTime();
}
function toDateString(date) {
    var temp;
    if (date === undefined) return;
    if (date instanceof Date) {
        temp = date;
    } else if (typeof date === 'string') {
        (temp = new Date()), temp.setTime(parseTime(date));
    } else if (date instanceof Number) {
        (temp = new Date()), temp.setTime(date);
    } else {
        return date;
    }
    var year = temp.getFullYear();
    var month = temp.getMonth() + 1;
    var date = temp.getDate();
    var hours = temp.getHours();
    var minutes = temp.getMinutes();
    return year + '-' + appendZero(month) + '-' + appendZero(date);
}
function appendZero(num) {
    return parseInt(num) < 10 ? '0' + num : num;
}
function addDay(dateString, num) {
    var ret;
    var time = parseTime(dateString);
    var addSecond = num * 24 * 60 * 60 * 1000;
    return (ret = new Date()), ret.setTime(time + addSecond), ret;
}
function addHour(dateString, num) {
    var time, ret;
    if (typeof dateString === 'number') {
        num = dateString;
        time = Date.now();
    } else {
        time = parseTime(dateString);
    }
    var addSecond = num * 60 * 60 * 1000;
    return (ret = new Date()), ret.setTime(time + addSecond), ret;
}

/**
 * 时间格式化：
 *  case1:当天只展示时分，
 *  case2:非当天且在当年 显示月天，
 *  case2:非当年 显示年月日
 * 
 * @param {*} dateTime 时间格式：2018-09-07 14:06:26
 */
const nDay = 24 * 60 * 60 * 1000;
const year = 265 * nDay;

function formatDateTimeLocal(dateString) {
    const date = moment(dateString);
    const dayTime = new Date(dateString.replace(/-/g, '/'));
    const todayTime = new Date();
    const dateTime = date.valueOf();

    const minute = autoFixed(date.minutes());
    const hour = autoFixed(date.hours());

    if (dayTime.setHours(0, 0, 0, 0) === todayTime.setHours(0, 0, 0, 0)) {
        return `${hour}:${minute}`;
    }

    const day = autoFixed(date.date());
    const month = autoFixed(date.month() + 1);
    if (todayTime - dateTime > year) {
        const year = date.year();
        return `${year}/${month}/${day} ${hour}:${minute}`;
    }

    return `${month}/${day} ${hour}:${minute}`;
}

/**
 * 时间格式化：
 * 从现在的开始算，1小时以内显示几分钟以前（一分钟以内就按一分钟算）；
 * 1小时后今天内显示多少个小时以前；
 * 昨天访问过显示昨天；
 * 昨天以前显示年月日；
 * @param {*} dateTime 时间格式：2018-09-07 14:06:26
 */
function formatLogTime(dateString) {
    const dayDate = moment(dateString);
    const dayTime = new Date(dateString.replace(/-/g, '/'));
    const dayYear = autoFixed(dayDate.year());
    const dayMonth = autoFixed(dayDate.month() + 1);
    const dayDay = autoFixed(dayDate.date());
    const dayHour = autoFixed(dayDate.hours()); 
    const dayMinute = autoFixed(dayDate.minutes());

    const todayTime = new Date();
    const yesterDay = todayTime.getFullYear() + "-" + (todayTime.getMonth() + 1) + "-" + (todayTime.getDate() - 1);
    const yesterTime = new Date(yesterDay.replace(/-/g, '/'));
    const todayHour = todayTime.getHours();
    const todayMinute = todayTime.getMinutes();
    if (todayTime.setMinutes(0, 0, 0) === dayTime.setMinutes(0, 0, 0)) {
        const minutes = parseInt(todayMinute - dayMinute + 1);
        return  `${minutes}分钟之前`;
    }
    if (todayTime.setHours(0, 0, 0, 0) === dayTime.setHours(0, 0, 0, 0)) {
        const hours = parseInt(todayHour - dayHour);
        return  `${hours}小时之前`;
    }
    if (yesterTime.setHours(0, 0, 0, 0) === dayTime.setHours(0, 0, 0, 0)) {
        return '昨天';
    }
    return `${dayYear}/${dayMonth}/${dayDay} ${dayHour}:${dayMinute}`;
}

module.exports = {
    addHour,
    addDay,
    parseTime,
    formatTime,
    appendZero,
    toDateString,
    formatTimeExtra,
    formatDateTimeLocal,
    formatLogTime,
};
