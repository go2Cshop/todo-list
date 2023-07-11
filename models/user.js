const mongoose = require("mongoose")
const Schema = mongoose.Schema
const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createAt: {
    type: Date,
    default: Date.now //伺服器將註冊資料送給資料庫時
  }
})

module.exports = mongoose.model('User', userSchema)