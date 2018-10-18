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
// const week = 7 * nDay;
const year = 265 * nDay;

function formatDateTimeLocal(dateString) {
    const date = new Date(dateString);
    const dateTime = date * 1;
    const todayTime = new Date() * 1;
    if (todayTime - dateTime < nDay) {
        const minute = date.getMinutes();
        const hour = date.getHours();
        return `${hour}:${minute}`;
    }

    if (todayTime - dateTime > year) {
        const year = date.getFullYear();
        return `${year}`;
    }

    const day = date.getDate();
    const month = date.getMonth() + 1;
    return `${month}/${day}`;
}

module.exports = {
    addHour,
    addDay,
    parseTime,
    formatTime,
    appendZero,
    toDateString,
    formatTimeExtra,
    formatDateTimeLocal
};
