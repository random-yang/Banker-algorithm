function printResource(data) {

    let allocation = data.allocation;
    let need = data.need;

    const TAB = '\t';
    console.log(`Process${TAB}Alloca${TAB.repeat(allocation[0].length)}Need`);

    for(let i = 0; i < allocation.length; i++) {
        let str = '';

        str += `P${i}${TAB}`;

        for(let item of allocation[i]) {
            str += `${item}${TAB}`;
        }

        for(let item of need[i]) {
            str += `${item}${TAB}`;
        }

        console.log(str);
    }
}

/**
 * 
 * @param {object} data 
 * @returns {array[][]}
 * @description
 * 返回所有的安全序列矩阵
 */
function getAllSafeOrder(data) {
    data = JSON.parse(JSON.stringify(data)); // 不改变外部变量

    let allocation = data.allocation; // 存放各个进程已分配的资源
    let need = data.need; // 存放各个进程还需要分配的资源
    let work = data.avaliable; // 存放当前系统还可用的资源
    let processN = allocation.length; // 进程数
    let finish = Array(processN).fill(false); // 标记能否完成
    let safeOrders = [];
    let safeOrder = [];
    let count = 0;


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

module.exports = {printResource, getAllSafeOrder};