const express = require('express')
const router = express.Router()

// 引入 h模組程式碼
const home = require('./modules/home')
const todos = require('./modules/todos')
const users = require('./modules/users')
const { authenticator } = require('../middleware/auth')  // 掛載 middleware
// 將網址結構符合 / 字串的 request 導向模組 
router.use('/todos', authenticator, todos)// 加入驗證程序
router.use('/users', users)
router.use('/', authenticator, home)//定義寬鬆的路由引到清單最下方，避免攔截到其他的路由。

module.exports = router