import openSocket from 'socket.io-client'

const socket = openSocket('http://localhost:8080')

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
    socket.on('message', data => callback(data))
}

function joinRoom(room) {
    socket.emit('subscribe', room)
}

function leaveRoom(room) {
    socket.emit('unsubscribe', room)
}

function onlineUsers(room, callback) {
    socket.emit('onlineUsers', room)
    socket.on('onlineUsers', onlineUsers => callback(onlineUsers))
}

function getRoomLink(room, callback) {
    socket.emit('getRoomLink', room)
    socket.on('getRoomLink', link => callback(link))
}

export {
    createUser,
    getAllRooms,
    connectViaLink,
    getMessageHistory,
    sendMessage,
    joinRoom,
    onlineUsers,
    leaveRoom,
    getRoomLink
}