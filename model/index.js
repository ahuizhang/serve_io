const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/socket_io', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
//mongodb连接成功的回调
const db = mongoose.connection;
db.once('open', function() {
    console.log("连接数据库成功")
});
const models = {
    user: {
        'username': { type: String, require: true },
        'password': { type: String, require: true },
        'type': { type: String, require: true },
        'avatar': { type: String, require: true },
        'doc': { type: String, require: true },
        'title': { type: String, require: true }
    },
    chat: {
        'chatID': { type: String, require: true },
        'from': { type: String, require: true },
        'to': { type: String, require: true },
        'read': { type: Boolean, default: false },
        'content': { type: String, require: true, default: "" },
        'create_time': { type: Number, default: new Date().getTime() },
    }
}

for (const key in models) {
    if (Object.hasOwnProperty.call(models, key)) {
        const element = models[key];
        mongoose.model(key, mongoose.Schema(element))
    }
}
module.exports = {
    getModel(modelName) {
        return mongoose.model(modelName)
    }
}