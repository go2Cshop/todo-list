const express = require('express')
const router = express.Router()

// 引入 h模組程式碼
const home = require('./modules/home')
const todos = require('./modules/todos')
const users = require('./modules/users')
// 將網址結構符合 / 字串的 request 導向模組 
router.use('/', home)
router.use('/todos', todos)
router.use('/users', users)

module.exports = router