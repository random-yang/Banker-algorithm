/**
 * 
 * @param {Resource} resource 
 * @returns {boolean}
 * @description
 * 返回所有的安全序列矩阵
 */
function getAllSafeOrder(resource) {
    resource = JSON.parse(JSON.stringify(resource)); // 不改变外部变量

    let allocation = resource.allocation; // 存放各个进程已分配的资源
    let need = resource.need; // 存放各个进程还需要分配的资源
    let work = resource.avaliable; // 存放当前系统还可用的资源
    let processN = allocation.length; // 进程数
    let finish = Array(processN).fill(false); // 标记能否完成
    let safeOrders = [];
    let safeOrder = [];


    //运行深度遍历
   (function dfs(k = 0) {
        // 找到一个安全序列打印出来
        if(k === processN) {
            safeOrders.push([...safeOrder]);
            return;
        }
        
        // 在当前层进行横向的遍历
        for(let i = 0; i < processN; i++) {
            // 此进程未完成 && 此进程的每一个need都能被系统当前work满足
            if(!finish[i] && need[i].every((item, index) => item <= work[index])) {
                // 将其暂时加入安全序列
                // 更新系统资源
                work = work.map((item, index) => item + allocation[i][index]);
                finish[i] = true;
                safeOrder.push(i);

                dfs(k + 1, safeOrders);

                // 回溯，撤销更改
                work = work.map((item, index) => item - allocation[i][index]);
                finish[i] = false;
                safeOrder.pop();
            }
        }
    })(0);
    return safeOrders;
}

module.exports = getAllSafeOrder;