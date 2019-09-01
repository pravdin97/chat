const uuidv4 = require('uuid/v4')

class User {
    constructor(id, name) {
        this.name = name
        this.id = id
    }
}

module.exports = User