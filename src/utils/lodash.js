/*eslint-disable*/
/**
 * 暂时没想好文件名，所以就先叫lodash
 * 存放一下通用的方法（无依赖的）
 */

// 判断是否为对象
function _isObject(o) {
    return (typeof o === 'object' || typeof o === 'function') && o !== null
}

// 迭代递归法：深拷贝对象与数组
function cloneDeep(obj) {
    if (!_isObject(obj)) {
        throw new Error('obj 不是一个对象！')
    }

    const isArray = Array.isArray(obj)
    const cloneObj = isArray ? [] : {}
    for (let key in obj) {
        cloneObj[key] = _isObject(obj[key]) ? cloneDeep(obj[key]) : obj[key]
    }

    return cloneObj
}

export {
    cloneDeep,
};