const express = require('express')
const utils = require('utility');
const Router = express.Router()
const { getModel } = require('../model')
const User = getModel('user')
const Chat = getModel('chat')
Router.get('/list', function(req, res) {
    User.find({}, { password: 0, __v: 0 }, function(err, doc) {
        return res.json({ userList: doc, code: 0, msg: "success" })
    })
})
Router.get('/getMagsList', function(req, res) {
    Chat.find({}, function(err, doc) {
        return res.json({ magsList: doc, code: 0, msg: "success" })
    })
})
Router.post('/register', function(req, res) {
    const { username, password } = req.body
    User.findOne({
        username
    }, (err, doc) => {
        if (doc) {
            return res.json({ code: 1, msg: "用户已存在" })
        }
        User.create({ username, password: randerString(password) }, function(e, d) {
            if (e) {
                return res.json({ code: 10, msg: "服务器故障" })
            }
            res.cookie('user_id', d._id)
            return res.json({ code: 0, msg: "注册成功", uid: d._id })
        })
    })
})
Router.post('/login', function(req, res) {
    const { username, password } = req.body
    User.findOne({ username, password: randerString(password) }, (err, doc) => {
        if (!doc) {
            return res.json({ code: 1, msg: "账号或密码错误" })
        }
        res.cookie('user_id', doc._id)
        return res.json({ code: 0, msg: "登入成功", uid: doc._id })
    })
})
const randerString = (params) => {
    const str = "@55hf&jjgas8524zbb*unfggg!@"
    return utils.md5(params + str)
}
module.exports = Router