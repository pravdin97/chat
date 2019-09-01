const uuidv4 = require('uuid/v4')

class Chatroom {
    constructor(name) {
        this.link = uuidv4()
        this.name = name
        this.messages = []
    }
}

module.exports = Chatroom