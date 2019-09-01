const User = require('./models/User')

const USERS = []
const ROOMS = []

function listen(io) {
    io.on('connection', function(socket){

        // пользователь выбрал комнату
        socket.on('subscribe', function(room) { 
            console.log('joining room', room);
            socket.join(room);
        })

        // пользователь подключился к комнате по ссылке
        socket.on('subscribe', function(link) { 
            let roomObject = ROOMS.find(r => r.link === link)
            if (roomObject !== undefined)
                socket.join(room); 
            else
                socket.emit('invalid link')
        })
        
        // пользователь вышел из комнаты
        socket.on('unsubscribe', function(room) {  
            console.log('leaving room', room);
            socket.leave(room); 
        })
        
        // сообщение отправлено
        socket.on('sendMessage', function(room, data) {
            console.log('sending message');
            io.sockets.in(room).emit('message', data);
            let roomObject = ROOMS.find(r => r.name === room)
            roomObject.messages.push(data)
        })

        // создание пользователя
        socket.on('createUser', function(username) {
            console.log('username recieved: ', username)
            
            let user = new User(socket.id, username)
            USERS.push(user)
            console.log(user.name, 'has created')
    
            socket.emit('user', user)
        })

        // все пользователи в группе
        socket.on('onlineUsers', function(roomName) {
            let onlineUsers = []
            // список всех комнат
            let rooms = io.sockets.adapter.rooms

            // сокеты, подключенные к комнате
            let usersInRoom = Object.keys(rooms[roomName].sockets)

            if (usersInRoom !== undefined)
                for (let i = 0; i < usersInRoom.length; i++) {
                    // получаем объект пользователя
                    let userObject = USERS.find(usr => usr.id === usersInRoom[i])
                    onlineUsers.push(userObject)
                }
            
            socket.emit('onlineUsers', onlineUsers)
        })

        // получить историю сообщений в комнате
        socket.on('messageHistory', function(room) {
            let roomObject = ROOMS.find(r => r.name === room)
            socket.emit('messageHistory', roomObject.messages)
        })

        
    });
}

module.exports.listen = listen