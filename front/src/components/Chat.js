import React, { useEffect, useState } from 'react'
import { getMessageHistory, sendMessage, onlineUsers, leaveRoom } from '../api'

function Chat({user, room, onLeave}) {
    
    let [messages, setMessages] = useState()

    let [msgText, setMsgText] = useState()

    let [online, setOnline] = useState()

    useEffect(() => {
        getMessageHistory(room, setMessages)
    }, [room])

    function handleChangeMessageText(event) {
        setMsgText(event.target.value)
    }

    function acceptMsgText() {
        if (msgText !== '') {
            sendMessage(
                room, 
                {user: user, text: msgText, date: new Date()}, 
                (data) => setMessages(data) 
            )
            document.getElementById('text').value=''
        }
    }

    function updateOnline() {
        onlineUsers(room, setOnline)
    }

    function leave() {
        leaveRoom()
        onLeave()
    }
    
    return <div className="chatArea">
        <div className="online">
            <input type="button" value="Выйти" onClick={leave} />
            <input type="button" value="Обновить список пользователей" onClick={updateOnline}/>
            <p>Онлайн:</p>
            {
                online !== undefined ?
                online.map(o => <p>{o.name}</p>) :
                null
            }
        </div>
        
        <div className="block">
        {/* список сообщений */}
            <ul className="messagesList">
            {
                messages !== undefined ?
                messages.map( 
                    (msg, index) => 
                    <li className="message" key={index}>
                        [{new Date(msg.date).getHours()}:{new Date(msg.date).getMinutes()}:{new Date(msg.date).getSeconds()}]
                        &nbsp;{msg.user.name}:&emsp;{msg.text}
                    </li> 
                    ) :
                <div>Сообщений пока нет :(</div>
            }
            </ul>
            {/* поле ввода текста сообщения */}
            <div className="enterMessage">
                <label>
                    Текст сообщения:
                </label>
                <input type="text" id="text" onChange={handleChangeMessageText}/>
                <input type="submit" value="Отправить" onClick={acceptMsgText}/>
            </div>
        </div>
    </div>
}

export default Chat