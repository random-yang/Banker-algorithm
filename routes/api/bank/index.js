let fs = require('fs');
let unit = require('./js/utils');
let locationResource = require('./js/locationResource');
const router = require('express').Router();

// 从json文件读取初始数据
let data = fs.readFileSync(`${__dirname}/data/data1.json`, 'utf-8');
data = JSON.parse(data);

router.get('/resource', (req, res) => {
    let { avaliable, allocation, need } = data;
    allocation = allocation.map((item, index) => ({ processID: index, allocation: item }));
    need = need.map((item, index) => ({ processID: index, need: item }));
    res.render('resource', {
        title: '系统资源',
        data: { avaliable, allocation, need }
    });
});

router.get('/getSafeOrders', (req, res) => {
    let safeOrders = unit.getAllSafeOrder(data).map((order, index) => ({ index: index, order: order }));
    res.render('safeOrders', {
        title: '所有的安全序列',
        safeOrders
    })
});

router.post('/result', (req, res) => {
    // 拿到返回值
    let { processID, resourceNum } = req.body;

    // 错误输入处理
    if (!processID || !resourceNum) {
        res.render('result/inputError', {
            title: '输入错误',
            message: '请求信息不完整'
        });
        return; // 提前返回
    }

    if([...resourceNum].includes('，')) {
        resourceNum = resourceNum.split('，').map(item => parseInt(item));
    } else {
        resourceNum = resourceNum.split(',').map(item => parseInt(item));
    }
    if(processID >= data.allocation.length || resourceNum.length !== data.avaliable.length) {
        res.render('result/inputError', {
            title: '输入错误',
            message: '非法数据的请求'
        });
        return;
    }

    // 执行函数判断能否分配资源
    let isSuccess = locationResource(data, processID, resourceNum);

    res.render('result/result', {
        title: '请求结果',
        isSuccess,
        message: isSuccess ? '资源分配成功，快去查看所有安全序列！😀' : '导致系统死锁，资源分配失败！😨',
    })

});

module.exports = router;