let isSafe = require('./isSafe');
/**
 * 
 * @param {number} processID 
 * @param {array[number]} request 
 * @description
 * 根据进程的请求
 * 更新系统资源分配情况
 */
function updateResource(data, processID, request){
    data.avaliable = data.avaliable.map((item, index) => item - request[index]);
    data.allocation[processID] = data.allocation[processID].map((item, index) => item + request[index]);
    data.need[processID] = data.need[processID].map((item, index) => item - request[index]);
}

/**
 * 
 * @param {number} processID 
 * @param {array[number]} request 
 * @description
 * 撤销进程的资源分配
 */
function popbackResource(data, processID, request) {
    data.avaliable = data.avaliable.map((item, index) => item + request[index]);
    data.allocation[processID] = data.allocation[processID].map((item, index) => item - request[index]);
    data.need[processID] = data.need[processID].map((item, index) => item + request[index]);
}

/**
 * 
 * @param {number} processID 
 * @param {array[number]} request 
 * @returns {boolean}
 * @description
 * 返回值描述是否分配成功
 */
function locationResource(data, processID, request) {
    if (request.every((item, index) => (item <= data.need[processID][index]) && (item <= data.avaliable[index]))) {
        // 首先假设能分配
        // 更新资源数据
        updateResource(data, processID, request);

        //死锁检测
        if (isSafe(data)) {
            // console.log('系统不会发生死锁，允许分配');
            return true;
        } else {
            // console.log('系统会发生死锁，不允许分配');
            // 不能分配
            // 资源数据还原
            popbackResource(data, processID, request);
            return false
        }
    } else {
        console.log('不满足基本的分配条件');
        return false;
    }
}

module.exports = locationResource;