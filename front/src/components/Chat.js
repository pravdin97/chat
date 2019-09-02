import React, { useEffect, useState } from 'react'
import { getMessageHistory, sendMessage } from '../api'

function Chat({user, room}) {
    
    let [messages, setMessages] = useState()

    let [msgText, setMsgText] = useState()

    useEffect(() => {
        getMessageHistory(room, setMessages)
    }, [room])

    function handleChangeMessageText(event) {
        setMsgText(event.target.value)
    }

    function acceptMsgText() {
        sendMessage(room, {user: user, text: msgText, date: new Date()}, msg => messages.push(msg))
    }
    
    return <div>
        {
            messages !== undefined ?
            messages.map( msg => <div>{msg.user.name} {msg.text}</div> ) :
            null
        }

        <label>
            Текст сообщения:
            <input type="text" onChange={handleChangeMessageText}/>
        </label>
        <input type="submit" value="Отправить" onClick={acceptMsgText}/>
    </div>
}

export default Chat