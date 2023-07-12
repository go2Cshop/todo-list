const express = require('express')
const router = express.Router()
// 引用 passport
const passport = require('passport')

const User = require('../../models/user')

router.get('/login', (req, res) => {
  const userInput = req.session.userInput || {}
  // 清除 session 中的使用者輸入
  delete req.session.userInput
  res.render('login', { email: userInput.email, password: userInput.password })
})

// 加入 middleware，驗證 request 登入狀態
router.post('/login', (req, res, next) => {
  const email = req.body.email
  const password = req.body.password
  req.session.userInput = { email, password } // 存儲使用者輸入的值
  next()
}, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
})
)

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  // 取得註冊表單參數 解構賦值語法
  const { name, email, password, confirmPassword } = req.body
  const errors = []
  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: '所有欄位都是必填' })
  }
  if (password !== confirmPassword) {
    errors.push({ message: '密碼與確認密碼不相符！' })
  }
  if (errors.length) {
    return res.render('register', {
      errors,
      name,
      email,
      password,
      confirmPassword
    })
  }
  User.findOne({ email }).then(user => {
    //如已註冊退回本畫面
    if (user) {
      errors.push({ message: '這個Email已經註冊過了。' })
      return res.render('register', {
        errors,
        name,
        email,
        password,
        confirmPassword
      })
    }
    //如未註冊寫入資料庫
    return User.create({
      name,
      email,
      password
    })
      .then(() => res.redirect('/'))
      .catch(err => console.log(err))
  })
})

//登出
router.get('/logout', (req, res) => {
  req.logout()//Passport.jss的函式，會幫你清除 session
  req.flash('success_msg', '你已經成功登出。')
  res.redirect('/users/login')
})

module.exports = router