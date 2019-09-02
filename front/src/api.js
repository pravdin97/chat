import openSocket from 'socket.io-client'

const socket = openSocket('http://localhost:8080')

function listen() {
    socket.on('message', function(data) {
        console.log(data)
    })
}

function createUser(username, callback) {
    socket.emit('createUser', username)
    socket.on('user', user => callback(user))
}

function getAllRooms(callback) {
    socket.emit('getAllRooms')
    socket.on('getAllRooms', rooms => callback(rooms))
}

function connectViaLink(link, error, callback) {
    socket.emit('subscribeViaLink', link)
    socket.on('invalid link', () => error())
    socket.on('room', room => callback(room))
}

function getMessageHistory(room, callback) {
    socket.emit('messageHistory', room)
    socket.on('messageHistory', messages => {
        console.log(messages)
        callback(messages)
    })
}

function sendMessage(room, data, callback) {
    socket.emit('sendMessage', room, data)
    socket.on('message', data => {
        console.log('new message: ', data.user, ": ", data.text)
        callback(data)
    })
}

function joinRoom(room) {
    socket.emit('subscribe', room)
}

export {
    listen,
    createUser,
    getAllRooms,
    connectViaLink,
    getMessageHistory,
    sendMessage,
    joinRoom
}