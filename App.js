const express = require('express')
const bodyParser = require('body-parser')
const App = express()
const server = require('http').Server(App);
const io = require('socket.io')(server)
const { getModel } = require('./model')
const Chat = getModel('chat')
io.on('connection', function(socket) {
    socket.on('sendMsg', function(data) {
        const { msg, from, to } = data
        const chatID = [from, to].sort().join("_")
        Chat.create({ chatID, content: msg, from, to }, function(err, doc) {
            io.emit('globalMsg', { ...doc._doc })
        })
    })
})
const cookieParser = require('cookie-parser')
const userRouter = require('./userRouter')
App.use(bodyParser.json());
App.use('/user', userRouter)
App.use(cookieParser())
App.use(express.static('./public/'));
// 监听端口
server.listen(3001, function() {
    console.log("服务开启http://localhost:3001");
});