/**
 * 
 * @param {Resource} resource 
 * @returns {boolean}
 * @description
 * 对于某个时刻的系统状态
 * 检查是否存在死锁
 */
function isSafe(resource) {
    resource = JSON.parse(JSON.stringify(resource)); // 不改变外部变量
    let allocation = []; // 存放各个进程已分配的资源
    let need = []; // 存放各个进程还需要分配的资源
    let work = []; // 存放当前系统还可用的资源
    let finish = []; // 标记能否完成
    let processN = resource.allocation.length; // 进程数
    // let safeOrder = [];

    // 初始化
    allocation = resource.allocation;
    need = resource.need;
    work = resource.avaliable;
    finish = Array(processN).fill(false);

    // 算法运行
    // 遍历need，是否有满足 need <= work
    if (!need.some(itemOfNeed => itemOfNeed.every((item, index) => item <= work[index]))) {
        return false;
    }

    while (true) {
        // 对need进行遍历
        for (let i = 0; i < processN; i++) {
            if (!finish[i] && need[i].every((item, index) => item <= work[index])) {
                // 更新数据
                
                work = work.map((item, index) => item + allocation[i][index]);
                allocation[i] = allocation[i].map(() => 0);
                need[i] = need[i].map(() => 0);
                finish[i] = true;
        
                // 更新安全序列
                // safeOrder.push(i);
            }
        }

        // finish 是否全部为 true
        if (finish.every(item => item === true)) {
            // console.log(safeOrder);
            return true;
        } else {
            let tempNeed = need.filter((item, index) => finish[index] === false);
            if (!tempNeed.some(itemOfNeed => itemOfNeed.every((item, index) => item <= work[index]))) {
                return false;
            }
        }
    }
    
}

module.exports = isSafe;