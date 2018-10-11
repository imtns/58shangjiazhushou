/* eslint-disable */
Date.prototype.format = function f(format) {
/*
    * format='yyyy-MM-dd hh:mm:ss';
    */

    const o = {
        'M+': this.getMonth() + 1,
        'd+': this.getDate(),
        'h+': this.getHours(),
        'm+': this.getMinutes(),
        's+': this.getSeconds(),
        'q+': Math.floor((this.getMonth() + 3) / 3),
        S: this.getMilliseconds(),
    };

    if (/(y+)/.test(format)) {
        format = format.replace(
            RegExp.$1,
            (`${this.getFullYear()}`).substr(4 - RegExp.$1.length),
        );
    }

    Object.keys(o).forEach((k) => {
        if (new RegExp(`(${k})`).test(format)) {
            format = format.replace(
                RegExp.$1,
                RegExp.$1.length === 1 ? o[k] : (`00${o[k]}`).substr((`${o[k]}`).length),
            );
        }
    });
    return format;
};
