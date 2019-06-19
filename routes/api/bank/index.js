const fs = require('fs');
const path = require('path');
const getAllSafeOrder = require('./js/getAllSafeOrder');
const locationResource = require('./js/locationResource');
const router = require('express').Router();
const Resource = require('./js/Resource');

// 从json文件读取初始数据
const FILEPATH = './data/data1.json';
let data = fs.readFileSync(path.join(__dirname, FILEPATH), 'utf-8');
let resource = new Resource(data);

// 系统资源请求
router.get('/resource', (req, res) => {
    let { avaliable, allocation, need } = resource;
    allocation = allocation.map((item, index) => ({ processID: index, allocation: item }));
    need = need.map((item, index) => ({ processID: index, need: item }));
    res.render('resource', {
        title: '系统资源',
        resource: { avaliable, allocation, need }
    });
});

// 安全序列请求
router.get('/getSafeOrders', (req, res) => {
    let safeOrders = getAllSafeOrder(resource).map((order, index) => ({ index: index, order: order }));
    console.log(safeOrders);
    res.render('safeOrders', {
        title: '所有的安全序列',
        safeOrders
    })
});

// 请求资源分配POST
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
    if(processID >= resource.allocation.length || resourceNum.length !== resource.avaliable.length) {
        res.render('result/inputError', {
            title: '输入错误',
            message: '非法数据的请求'
        });
        return;
    }

    // 执行函数判断能否分配资源
    let isSuccess = locationResource(resource, processID, resourceNum);

    res.render('result/result', {
        title: '请求结果',
        isSuccess,
        message: isSuccess ? '资源分配成功，快去查看所有安全序列！😀' : '导致系统死锁，资源分配失败！😨',
    })

});

module.exports = router;